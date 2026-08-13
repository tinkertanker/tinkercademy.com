#!/usr/bin/env node
/* Resolve the Cloudflare Worker version uploaded for a git commit.
   Used by .github/workflows/promote-production.yml.

   Mapping (investigated against live tinkercademy-dot-com data + public APIs):
   - GET /builds/workers/{tag}/builds includes commit_hash, not version_id.
   - wrangler versions list / GET .../scripts/{name}/versions has no commit hash
     (wrangler 4.122 human listing confirmed).
   - `npx wrangler versions upload` prints `Worker Version ID: <uuid>` in
     Workers Builds logs. That is the forward mapping we use.
   - GET /builds/builds?version_ids= is the documented reverse map
     (version → build → commit_hash) and is the fallback / verifier.

   Usage:
     COMMIT_SHA=<sha> node scripts/resolve-worker-version.mjs
     node scripts/resolve-worker-version.mjs --self-test
*/

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'b8b1032c61d9475cd00229c74db7ec72';
const WORKER_TAG = process.env.WORKER_TAG || 'f71a28eda02e4d47922ba00cb262e3f7';
const WORKER_NAME = process.env.WORKER_NAME || 'tinkercademy-dot-com';
const API_BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}`;
const VERSION_ID_RE = /Worker Version ID:\s*([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const IN_PROGRESS = new Set(['queued', 'initializing', 'running']);
const FAILED_OUTCOMES = new Set(['fail', 'failed', 'cancelled', 'canceled', 'terminated']);

export function commitsMatch(left, right) {
	const a = String(left || '').trim().toLowerCase();
	const b = String(right || '').trim().toLowerCase();
	if (!a || !b) return false;
	return a === b || a.startsWith(b) || b.startsWith(a);
}

export function commitHashOf(build) {
	return (
		build?.commit_hash ||
		build?.commitHash ||
		build?.build_trigger_metadata?.commit_hash ||
		build?.build_trigger_metadata?.commitHash ||
		''
	);
}

export function buildUuidOf(build) {
	return build?.build_uuid || build?.buildUUID || '';
}

export function outcomeOf(build) {
	return String(build?.build_outcome || build?.buildOutcome || '').toLowerCase();
}

export function statusOf(build) {
	return String(build?.status || '').toLowerCase();
}

export function createdOnOf(build) {
	return build?.created_on || build?.createdOn || '';
}

export function branchOf(build) {
	return String(build?.branch || build?.build_trigger_metadata?.branch || '').trim();
}

export function flattenLogText(payload) {
	const result = payload?.result ?? payload;
	if (typeof result === 'string') return result;
	const lines = result?.lines ?? (Array.isArray(result) ? result : null);
	if (Array.isArray(lines)) {
		return lines
			.map((line) => {
				if (typeof line === 'string') return line;
				if (Array.isArray(line)) return line.map(String).join(' ');
				if (line && typeof line === 'object') {
					return line.message ?? line.line ?? line.text ?? JSON.stringify(line);
				}
				return String(line ?? '');
			})
			.join('\n');
	}
	return typeof payload === 'string' ? payload : JSON.stringify(payload ?? '');
}

export function extractVersionIdFromLogs(text) {
	const match = String(text || '').match(VERSION_ID_RE);
	return match?.[1] || '';
}

export function buildsFromVersionLookup(payload) {
	const builds = payload?.result?.builds ?? payload?.builds ?? payload?.result ?? payload;
	if (Array.isArray(builds)) {
		return builds.map((build) => ({
			versionId: build?.version_id || build?.versionId || '',
			build,
		}));
	}
	if (builds && typeof builds === 'object') {
		return Object.entries(builds).map(([versionId, build]) => ({ versionId, build }));
	}
	return [];
}

export function classifyCommitBuilds(builds, sha) {
	const matches = (builds || []).filter((build) => commitsMatch(commitHashOf(build), sha));
	const newest = (list) =>
		[...list].sort((a, b) => String(createdOnOf(b)).localeCompare(String(createdOnOf(a))))[0];
	const mainMatches = matches.filter((build) => branchOf(build).toLowerCase() === 'main');
	// Same SHA can be built on a PR branch (preview, no SITE_URL) and later on
	// main (production SITE_URL). Live example: 84f655e3 on both
	// cursor/update-agentic-engineering-aug-dates-c490 and main. If any main
	// build exists, only that upload is promotable. If we can see a branch
	// but none of them is main, keep waiting rather than shipping preview.
	const sawBranch = matches.some((build) => branchOf(build));
	const considered = mainMatches.length ? mainMatches : sawBranch ? [] : matches;

	if (!considered.length && sawBranch) {
		const pending = matches.filter((build) => IN_PROGRESS.has(statusOf(build)));
		if (pending.length) return { state: 'pending', build: newest(pending), matches, reason: 'preview_only' };
		return { state: 'missing', build: newest(matches), matches, reason: 'preview_only' };
	}

	const successes = considered.filter((build) => statusOf(build) === 'stopped' && outcomeOf(build) === 'success');
	if (successes.length) return { state: 'success', build: newest(successes), matches };

	const pending = considered.filter((build) => IN_PROGRESS.has(statusOf(build)));
	if (pending.length) return { state: 'pending', build: newest(pending), matches };

	const failures = considered.filter((build) => FAILED_OUTCOMES.has(outcomeOf(build)));
	if (failures.length) return { state: 'failed', build: newest(failures), matches };

	const skipped = considered.filter((build) => outcomeOf(build) === 'skipped');
	if (skipped.length) return { state: 'skipped', build: newest(skipped), matches };

	return { state: 'missing', build: null, matches };
}

function fail(message) {
	console.error(message);
	process.exit(1);
}

async function writeOutput(versionId) {
	console.log(`Resolved Worker version ${versionId}`);
	if (process.env.GITHUB_OUTPUT) {
		const { appendFileSync } = await import('node:fs');
		appendFileSync(process.env.GITHUB_OUTPUT, `version_id=${versionId}\n`);
	}
}

async function cfFetch(path, { query } = {}) {
	const token = process.env.CLOUDFLARE_API_TOKEN;
	if (!token) {
		fail(
			'CLOUDFLARE_API_TOKEN is not set. Add a user-scoped token (My Profile → API Tokens) with Workers Builds Configuration: Edit and Workers Scripts: Edit as a GitHub Actions secret. Account-owned tokens are rejected by the Builds API. Do not commit the token.',
		);
	}
	const url = new URL(`${API_BASE}${path}`);
	if (query) {
		for (const [key, value] of Object.entries(query)) {
			if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
		}
	}
	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${token}` },
	});
	const body = await response.json().catch(() => ({}));
	if (!response.ok || body.success === false) {
		const detail = JSON.stringify(body.errors || body, null, 2);
		const hint =
			response.status === 401 || response.status === 403
				? ' The GitHub secret CLOUDFLARE_API_TOKEN must be a user-scoped token (My Profile → API Tokens) with Workers Builds Configuration: Edit and Workers Scripts: Edit. Account-owned tokens and the Edit Cloudflare Workers template are not enough for the Builds API.'
				: '';
		fail(`Cloudflare API ${response.status} ${url.pathname}: ${detail}.${hint}`);
	}
	return body;
}

function listResult(body) {
	if (Array.isArray(body?.result)) return body.result;
	if (Array.isArray(body?.result?.builds)) return body.result.builds;
	return [];
}

function pageInfo(body) {
	return body?.result_info || body?.pagination_info || body?.result?.pagination_info || {};
}

async function listAllBuilds() {
	const builds = [];
	for (let page = 1; page <= 50; page += 1) {
		const body = await cfFetch(`/builds/workers/${WORKER_TAG}/builds`, {
			query: { page, per_page: 25 },
		});
		const batch = listResult(body);
		builds.push(...batch);
		const info = pageInfo(body);
		const totalPages = Number(info.total_pages || info.totalPages || 0);
		const nextPage = info.next_page ?? info.nextPage;
		if (batch.length === 0) break;
		if (totalPages && page >= totalPages) break;
		if (nextPage === false || nextPage === null) break;
		if (!totalPages && !nextPage && batch.length < 25) break;
	}
	return builds;
}

async function readBuildLogs(buildUuid) {
	let cursor = '';
	const chunks = [];
	for (let i = 0; i < 20; i += 1) {
		const body = await cfFetch(`/builds/builds/${buildUuid}/logs`, {
			query: cursor ? { cursor } : undefined,
		});
		chunks.push(flattenLogText(body));
		const result = body?.result ?? {};
		if (!result.truncated) break;
		cursor = result.cursor || '';
		if (!cursor) break;
	}
	return chunks.join('\n');
}

async function versionIdFromLogs(build) {
	const uuid = buildUuidOf(build);
	if (!uuid) return '';
	const text = await readBuildLogs(uuid);
	return extractVersionIdFromLogs(text);
}

async function verifyVersionCommit(versionId, sha) {
	const body = await cfFetch('/builds/builds', { query: { version_ids: versionId } });
	const entries = buildsFromVersionLookup(body);
	if (!entries.length) return { ok: true, verified: false };
	const match = entries.find((entry) => commitsMatch(commitHashOf(entry.build), sha));
	if (match) return { ok: true, verified: true };
	return { ok: false, verified: false };
}

async function versionIdFromVersionIndex(sha) {
	const versionsBody = await cfFetch(`/workers/scripts/${WORKER_NAME}/versions`, {
		query: { deployable: true },
	});
	const versions = versionsBody?.result?.items || versionsBody?.result || [];
	const ids = versions.map((version) => version.id).filter((id) => UUID_RE.test(id));
	for (let i = 0; i < ids.length; i += 20) {
		const batch = ids.slice(i, i + 20);
		const body = await cfFetch('/builds/builds', { query: { version_ids: batch.join(',') } });
		const match = buildsFromVersionLookup(body).find((entry) =>
			commitsMatch(commitHashOf(entry.build), sha),
		);
		if (match?.versionId && UUID_RE.test(match.versionId)) return match.versionId;
	}
	return '';
}

function describeBuild(build) {
	if (!build) return 'none';
	return [
		`uuid=${buildUuidOf(build) || '?'}`,
		`branch=${branchOf(build) || '?'}`,
		`status=${statusOf(build) || '?'}`,
		`outcome=${outcomeOf(build) || '?'}`,
		`commit=${commitHashOf(build) || '?'}`,
	].join(' ');
}

async function waitForSuccessfulBuild(sha, timeoutMs, intervalMs) {
	const deadline = Date.now() + timeoutMs;
	let lastState = 'missing';
	let lastReason = '';
	while (Date.now() <= deadline) {
		const builds = await listAllBuilds();
		const classified = classifyCommitBuilds(builds, sha);
		lastState = classified.state;
		lastReason = classified.reason || '';
		if (classified.state === 'success') {
			console.log(`Workers Build succeeded for ${sha} (${describeBuild(classified.build)})`);
			return classified.build;
		}
		if (classified.state === 'failed') {
			fail(
				`Workers Build for ${sha} finished without uploading a version (${describeBuild(classified.build)}). Not promoting.`,
			);
		}
		if (classified.state === 'skipped') {
			fail(
				`Workers Build for ${sha} was skipped (${describeBuild(classified.build)}). The tagged commit likely only touched excluded watch paths (docs, .github, .claude). Not promoting a different version.`,
			);
		}
		const remaining = Math.max(0, deadline - Date.now());
		console.log(
			`Waiting for Workers Build of ${sha} (${classified.state}; ${describeBuild(classified.build)}; ${Math.ceil(remaining / 1000)}s left)`,
		);
		if (Date.now() + intervalMs > deadline) break;
		await new Promise((resolve) => setTimeout(resolve, intervalMs));
	}

	if (lastState === 'pending') {
		fail(
			`Timed out after ${Math.round(timeoutMs / 60000)} minutes waiting for Workers Build of ${sha} to finish. Not promoting.`,
		);
	}
	if (lastReason === 'preview_only') {
		fail(
			`No successful main/production Workers Build for ${sha} after ${Math.round(timeoutMs / 60000)} minutes. A preview-branch upload exists, but that build does not set SITE_URL=https://tinkercademy.com. Not promoting a preview version.`,
		);
	}
	fail(
		`No Workers Build found for ${sha} after ${Math.round(timeoutMs / 60000)} minutes. The tagged commit may only have touched excluded watch paths (README.md, AGENTS.md, docs/**, .github/**, .claude/**), so Cloudflare never uploaded a version. Not promoting a different version.`,
	);
}

async function resolveVersionId(sha, build) {
	const fromLogs = await versionIdFromLogs(build);
	if (fromLogs) {
		const check = await verifyVersionCommit(fromLogs, sha);
		if (!check.ok) {
			console.warn(
				`Log-parsed version ${fromLogs} did not map back to ${sha}; scanning version index instead.`,
			);
		} else {
			if (!check.verified) {
				console.warn(
					`GET /builds/builds?version_ids=${fromLogs} returned no build; using the version ID from this commit's upload logs.`,
				);
			}
			return fromLogs;
		}
	} else {
		console.warn('Upload logs did not contain a Worker Version ID; scanning version index.');
	}

	const fromIndex = await versionIdFromVersionIndex(sha);
	if (fromIndex) return fromIndex;

	fail(
		`Could not resolve a Worker version ID for ${sha} (build ${buildUuidOf(build)}). wrangler versions list has no commit hashes; refusing to guess the latest version.`,
	);
}

function runSelfTest() {
	const { equal } = { equal(actual, expected, label) {
		if (actual !== expected) {
			throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
		}
	} };

	equal(commitsMatch('A2C3D18A', 'a2c3d18a3410'), true, 'prefix sha match');
	equal(commitsMatch('deadbeef', 'cafebabe'), false, 'distinct shas');

	const logText = flattenLogText({
		result: {
			lines: [
				[1755088515000, 'Uploaded tinkercademy-dot-com (2.82 sec)'],
				[1755088515001, 'Worker Version ID: 9c3d640e-0384-404b-8eb2-f0578ed854cb'],
			],
		},
	});
	equal(
		extractVersionIdFromLogs(logText),
		'9c3d640e-0384-404b-8eb2-f0578ed854cb',
		'parse version id from wrangler upload logs',
	);

	const lookup = buildsFromVersionLookup({
		result: {
			builds: {
				'9c3d640e-0384-404b-8eb2-f0578ed854cb': {
					build_trigger_metadata: { commit_hash: '84f655e3e084e6b57325e821bc19abded99d058e' },
				},
			},
		},
	});
	equal(lookup[0].versionId, '9c3d640e-0384-404b-8eb2-f0578ed854cb', 'version_ids map key');
	equal(commitsMatch(commitHashOf(lookup[0].build), '84f655e3e084e6b57325e821bc19abded99d058e'), true, 'lookup commit');

	const sha = '84f655e3e084e6b57325e821bc19abded99d058e';
	const classified = classifyCommitBuilds(
		[
			{ commit_hash: sha, status: 'stopped', build_outcome: 'fail', created_on: '2026-08-13T12:00:00Z' },
			{ commit_hash: sha, status: 'stopped', build_outcome: 'success', created_on: '2026-08-13T12:34:22Z', build_uuid: '6de860eb-03e4-4d22-882d-9e5d278c1783' },
			{ commit_hash: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', status: 'stopped', build_outcome: 'success' },
		],
		sha,
	);
	equal(classified.state, 'success', 'prefer successful build');
	equal(buildUuidOf(classified.build), '6de860eb-03e4-4d22-882d-9e5d278c1783', 'newest success');

	const pending = classifyCommitBuilds(
		[{ commit_hash: sha, status: 'running', build_outcome: '' }],
		sha,
	);
	equal(pending.state, 'pending', 'running is pending');

	const missing = classifyCommitBuilds(
		[{ commit_hash: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb', status: 'stopped', build_outcome: 'success' }],
		sha,
	);
	equal(missing.state, 'missing', 'other commits are ignored');

	const race = classifyCommitBuilds(
		[
			{ commit_hash: sha, branch: 'cursor/update-agentic-engineering-aug-dates-c490', status: 'stopped', build_outcome: 'success', created_on: '2026-08-13T11:57:06Z', build_uuid: 'preview' },
			{ commit_hash: sha, branch: 'main', status: 'running', created_on: '2026-08-13T12:34:00Z', build_uuid: 'main-pending' },
		],
		sha,
	);
	equal(race.state, 'pending', 'wait for main even if preview already succeeded');
	equal(buildUuidOf(race.build), 'main-pending', 'pending build is the main one');

	const bothDone = classifyCommitBuilds(
		[
			{ commit_hash: sha, branch: 'cursor/x', status: 'stopped', build_outcome: 'success', created_on: '2026-08-13T13:00:00Z', build_uuid: 'newer-preview' },
			{ commit_hash: sha, branch: 'main', status: 'stopped', build_outcome: 'success', created_on: '2026-08-13T12:34:22Z', build_uuid: 'older-main' },
		],
		sha,
	);
	equal(bothDone.state, 'success', 'main success wins over newer preview');
	equal(buildUuidOf(bothDone.build), 'older-main', 'promote the main upload');

	const previewOnly = classifyCommitBuilds(
		[{ commit_hash: sha, branch: 'cursor/x', status: 'stopped', build_outcome: 'success', build_uuid: 'preview-only' }],
		sha,
	);
	equal(previewOnly.state, 'missing', 'preview-only success is not promotable');
	equal(previewOnly.reason, 'preview_only', 'preview-only reason');

	const noBranch = classifyCommitBuilds(
		[{ commit_hash: sha, status: 'stopped', build_outcome: 'success', build_uuid: 'unbranched' }],
		sha,
	);
	equal(noBranch.state, 'success', 'builds with no branch field still resolve');
	equal(buildUuidOf(noBranch.build), 'unbranched', 'unbranched success');

	console.log('self-test ok');
}

async function main() {
	if (process.argv.includes('--self-test')) {
		runSelfTest();
		return;
	}

	const sha = (process.env.COMMIT_SHA || process.argv[2] || '').trim();
	if (!sha) fail('COMMIT_SHA is required (the tagged commit, usually GITHUB_SHA).');

	const timeoutMs = Number(process.env.POLL_TIMEOUT_MS || 18 * 60 * 1000);
	const intervalMs = Number(process.env.POLL_INTERVAL_MS || 20 * 1000);
	const build = await waitForSuccessfulBuild(sha, timeoutMs, intervalMs);
	const versionId = await resolveVersionId(sha, build);
	if (!UUID_RE.test(versionId)) fail(`Resolved version ID is not a UUID: ${versionId}`);
	await writeOutput(versionId);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
