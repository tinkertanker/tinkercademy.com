import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, mkdir, readFile, writeFile, copyFile, cp, rm, symlink } from 'node:fs/promises';
import { request } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { build } from 'astro';
import { load } from 'cheerio';

const root = fileURLToPath(new URL('../../', import.meta.url));

test('rendered JSON-LD preserves hostile metadata as data', { timeout: 30000 }, async (t) => {
	const fixture = await mkdtemp(path.join(tmpdir(), 'json-ld-'));
	t.after(() => rm(fixture, { recursive: true, force: true }));
	await mkdir(path.join(fixture, 'src/pages'), { recursive: true });
	await symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'));
	for (const directory of ['components', 'layouts', 'lib', 'data', 'scripts', 'styles']) {
		await cp(path.join(root, 'src', directory), path.join(fixture, 'src', directory), { recursive: true });
	}
	const schema = {
		'@type': 'Article',
		headline: '</ScRiPt><script id="injected">globalThis.injected = true</script>',
		author: { name: '<!-- <script> & " Unicode 雪' },
	};
	await writeFile(path.join(fixture, 'src/pages/index.astro'), `---
import ContentLayout from '../layouts/ContentLayout.astro';
const schema = ${JSON.stringify(schema)};
---
<ContentLayout structuredData={[schema]}><p id="after-schema">Intact</p></ContentLayout>`);
	await build({ root: fixture, configFile: false, logLevel: 'silent', site: 'https://example.test' });
	const $ = load(await readFile(path.join(fixture, 'dist/index.html'), 'utf8'));
	assert.equal($('#injected').length, 0, 'metadata must not create executable markup');
	const schemas = $('script[type="application/ld+json"]').toArray().map((el) => JSON.parse($(el).text()));
	assert.deepEqual(schemas.find((value) => value['@type'] === 'Article'), schema);
	assert.equal($('#after-schema').text(), 'Intact');
});

test('review server is local-only and rejects foreign browser requests without changing decisions', { timeout: 30000 }, async (t) => {
	const fixture = await mkdtemp(path.join(tmpdir(), 'medium-review-'));
	t.after(() => rm(fixture, { recursive: true, force: true }));
	await mkdir(path.join(fixture, 'scripts/lib'), { recursive: true });
	await copyFile(path.join(root, 'scripts/review-medium-migration.mjs'), path.join(fixture, 'scripts/review-medium-migration.mjs'));
	await cp(path.join(root, 'scripts/lib'), path.join(fixture, 'scripts/lib'), { recursive: true });
	const dataDir = path.join(fixture, 'docs/migrations/medium');
	await mkdir(dataDir, { recursive: true });
	await writeFile(path.join(dataDir, 'inventory.json'), JSON.stringify({ stories: [] }));
	await writeFile(path.join(dataDir, 'media-manifest.json'), JSON.stringify({ assets: [] }));
	const decisions = { version: 1, rights: {}, images: {} };
	const reviewPath = path.join(dataDir, 'review-decisions.json');
	await writeFile(reviewPath, JSON.stringify(decisions));
	const child = spawn(process.execPath, ['scripts/review-medium-migration.mjs'], {
		cwd: fixture, env: { ...process.env, HOST: '', PORT: '0' }, stdio: ['ignore', 'pipe', 'pipe'],
	});
	t.after(async () => { if (child.exitCode === null) { child.kill(); await once(child, 'exit'); } });
	let output = '';
	for await (const chunk of child.stdout) {
		output += chunk;
		if (output.includes('listening on')) break;
	}
	assert.match(output, /http:\/\/127\.0\.0\.1:\d+/, 'default listener must be loopback');
	const origin = output.match(/http:\/\/127\.0\.0\.1:\d+/)[0];
	assert.notEqual(new URL(origin).port, '0');
	assert.equal((await fetch(`${origin}/api/review`)).status, 200);
	for (const headers of [
		{ Origin: 'https://attacker.test' },
		{ Host: 'attacker.test' },
		{ Origin: 'null' },
		{ 'Sec-Fetch-Site': 'cross-site' },
	]) {
		// node:http preserves Host and Fetch Metadata exactly, unlike fetch.
		const status = await new Promise((resolve, reject) => {
			const req = request(`${origin}/api/review`, {
				method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
			}, (response) => { response.resume(); resolve(response.statusCode); });
			req.on('error', reject);
			req.end(JSON.stringify(decisions));
		});
		assert.equal(status, 403, JSON.stringify(headers));
		assert.equal(await readFile(reviewPath, 'utf8'), JSON.stringify(decisions));
	}
	const saved = await fetch(`${origin}/api/review`, {
		method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(decisions),
	});
	assert.equal(saved.status, 200, await saved.text());
	assert.deepEqual(JSON.parse(await readFile(reviewPath, 'utf8')), decisions);

	const exposed = spawn(process.execPath, ['scripts/review-medium-migration.mjs'], {
		cwd: fixture, env: { ...process.env, HOST: '0.0.0.0', PORT: '0' }, stdio: 'ignore',
	});
	t.after(() => { if (exposed.exitCode === null) exposed.kill(); });
	assert.notEqual((await once(exposed, 'exit'))[0], 0, 'non-loopback binding must fail closed');
});
