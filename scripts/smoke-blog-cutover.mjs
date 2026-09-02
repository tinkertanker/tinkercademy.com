#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const apexOrigin = new URL(process.env.BLOG_APEX_ORIGIN ?? 'https://tinkercademy.com');
const legacyOrigin = new URL(process.env.BLOG_LEGACY_ORIGIN ?? 'https://blog.tinkercademy.com');
const concurrency = Number.parseInt(process.env.BLOG_SMOKE_CONCURRENCY ?? '12', 10);
const apexOnly = process.argv.includes('--apex-only');

if (apexOrigin.protocol !== 'https:' || legacyOrigin.protocol !== 'https:' || concurrency < 1) {
	console.error('smoke-blog-cutover: HTTPS origins and a positive BLOG_SMOKE_CONCURRENCY are required');
	process.exit(2);
}

const redirectContract = JSON.parse(
	await readFile(new URL('../src/data/blog-legacy-redirects.json', import.meta.url), 'utf8'),
).redirects;
const mediaManifest = JSON.parse(
	await readFile(new URL('../docs/migrations/medium/media-manifest.json', import.meta.url), 'utf8'),
);
const inventory = JSON.parse(
	await readFile(new URL('../docs/migrations/medium/inventory.json', import.meta.url), 'utf8'),
);

const failures = [];
const stories = Object.entries(redirectContract);
const mediaAssets = [...new Map(mediaManifest.assets.map((asset) => [asset.localPath, asset])).values()];

async function request(url, init = {}) {
	try {
		return await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30_000), ...init });
	} catch (error) {
		failures.push(`${url}: ${error.message}`);
		return null;
	}
}

async function runPool(items, check) {
	let next = 0;
	await Promise.all(
		Array.from({ length: Math.min(concurrency, items.length) }, async () => {
			while (next < items.length) {
				const item = items[next++];
				await check(item);
			}
		}),
	);
}

function expectStatus(response, expected, label) {
	if (response && response.status !== expected) failures.push(`${label}: expected ${expected}, got ${response.status}`);
}

async function checkApexStory([legacyPath, destination]) {
	const expectedCanonical = new URL(destination, apexOrigin).toString();
	const response = await request(expectedCanonical);
	expectStatus(response, 200, expectedCanonical);
	if (!response || response.status !== 200) return;

	const html = await response.text();
	for (const marker of [
		`<link rel="canonical" href="${expectedCanonical}">`,
		'class="blog-article__byline"',
		'class="blog-article__source"',
		'All rights reserved.',
	]) {
		if (!html.includes(marker)) failures.push(`${expectedCanonical}: missing ${marker}`);
	}
	for (const forbidden of ['miro.medium.com', 'cdn-images-1.medium.com', 'cdn.embedly.com', 'medium.com/_/stat']) {
		if (html.includes(forbidden)) failures.push(`${expectedCanonical}: contains forbidden remote asset/tracker ${forbidden}`);
	}

	const inventoryStory = inventory.stories.find((story) => story.legacyPath === legacyPath);
	if (!inventoryStory) failures.push(`${expectedCanonical}: missing inventory record`);
	else if (!html.includes(`href="${inventoryStory.sourceMediumUrl}"`)) {
		failures.push(`${expectedCanonical}: missing original Medium source link`);
	}
}

async function checkLegacyStory([legacyPath, destination]) {
	const expected = new URL(destination, apexOrigin);
	const queryUrl = new URL(`/${legacyPath}?source=cutover-smoke`, legacyOrigin);
	expected.search = queryUrl.search;
	const queryResponse = await request(queryUrl);
	expectStatus(queryResponse, 308, queryUrl);
	if (queryResponse?.headers.get('location') !== expected.toString()) {
		failures.push(`${queryUrl}: expected Location ${expected}, got ${queryResponse?.headers.get('location')}`);
	}

	const slashUrl = new URL(`/${legacyPath}/`, legacyOrigin);
	const slashResponse = await request(slashUrl);
	expectStatus(slashResponse, 308, slashUrl);
	const slashExpected = new URL(destination, apexOrigin).toString();
	if (slashResponse?.headers.get('location') !== slashExpected) {
		failures.push(`${slashUrl}: expected Location ${slashExpected}, got ${slashResponse?.headers.get('location')}`);
	}
}

async function checkMedia(asset) {
	const url = new URL(asset.localPath, apexOrigin);
	const response = await request(url, { headers: { 'Accept-Encoding': 'identity' } });
	expectStatus(response, 200, url);
	if (!response || response.status !== 200 || !response.body) return;

	const hash = createHash('sha256');
	let bytes = 0;
	for await (const chunk of response.body) {
		hash.update(chunk);
		bytes += chunk.byteLength;
	}
	const actualHash = hash.digest('hex');
	if (actualHash !== asset.sha256) failures.push(`${url}: expected SHA-256 ${asset.sha256}, got ${actualHash}`);
	if (bytes !== asset.bytes) failures.push(`${url}: expected ${asset.bytes} bytes, got ${bytes}`);
	const contentType = response.headers.get('content-type');
	if (!contentType?.toLowerCase().startsWith(asset.mimeType.toLowerCase())) {
		failures.push(`${url}: expected Content-Type ${asset.mimeType}, got ${contentType}`);
	}
}

async function checkFixedPath(pathname, expectedStatus, markers = []) {
	const url = new URL(pathname, apexOrigin);
	const response = await request(url);
	expectStatus(response, expectedStatus, url);
	if (!response || response.status !== expectedStatus || markers.length === 0) return;
	const body = await response.text();
	for (const marker of markers) {
		if (!body.includes(marker)) failures.push(`${url}: missing ${marker}`);
	}
}

async function checkLegacyRedirect(pathname, destination) {
	const url = new URL(pathname, legacyOrigin);
	const response = await request(url);
	expectStatus(response, 308, url);
	const expected = new URL(destination, apexOrigin).toString();
	if (response?.headers.get('location') !== expected) {
		failures.push(`${url}: expected Location ${expected}, got ${response?.headers.get('location')}`);
	}
}

async function checkLegacyHttpsUpgrade() {
	const url = new URL('/', legacyOrigin);
	url.protocol = 'http:';
	const response = await request(url);
	if (response && response.status !== 301 && response.status !== 308) {
		failures.push(`${url}: expected a permanent HTTPS redirect, got ${response.status}`);
	}
	const location = response?.headers.get('location');
	if (response && (!location || new URL(location, url).protocol !== 'https:')) {
		failures.push(`${url}: expected an HTTPS Location, got ${location}`);
	}
}

console.log(`smoke-blog-cutover: ${stories.length} stories, ${mediaAssets.length} local assets`);

await checkFixedPath('/blog/', 200, ['Tinkercademy Build Log', 'The company we build, by the company we build with.']);
await checkFixedPath('/blog/feed.xml', 200, ['<rss', '<channel>']);
await checkFixedPath('/blog/sitemap.xml', 200, ['<urlset', ...stories.map(([, destination]) => new URL(destination, apexOrigin).toString())]);
await checkFixedPath('/robots.txt', 200, ['Sitemap: https://tinkercademy.com/blog/sitemap.xml']);

await runPool(stories, checkApexStory);
await runPool(mediaAssets, checkMedia);

if (!apexOnly) {
	await Promise.all([
		checkLegacyHttpsUpgrade(),
		checkLegacyRedirect('/', '/blog/'),
		checkLegacyRedirect('/feed', '/blog/feed.xml'),
		checkLegacyRedirect('/sitemap.xml', '/blog/sitemap.xml'),
		checkLegacyRedirect('/archive/2024/', '/blog/archive/2024/'),
		checkLegacyRedirect('/about', '/blog/'),
		checkLegacyRedirect('/followers', '/blog/'),
		checkLegacyRedirect('/tagged/internships', '/blog/'),
	]);
	await runPool(stories, checkLegacyStory);

	const archiveUrl = new URL('/all?year=2024&utm_source=cutover-smoke', legacyOrigin);
	const archiveResponse = await request(archiveUrl);
	expectStatus(archiveResponse, 308, archiveUrl);
	const expectedArchive = new URL('/blog/archive/2024/?utm_source=cutover-smoke', apexOrigin).toString();
	if (archiveResponse?.headers.get('location') !== expectedArchive) {
		failures.push(`${archiveUrl}: expected Location ${expectedArchive}, got ${archiveResponse?.headers.get('location')}`);
	}

	const missingUrl = new URL('/definitely-not-a-migrated-story', legacyOrigin);
	const missingResponse = await request(missingUrl);
	expectStatus(missingResponse, 404, missingUrl);
	if (missingResponse?.status === 404 && !(await missingResponse.text()).includes('Story not found')) {
		failures.push(`${missingUrl}: missing intentional blog 404 content`);
	}
}

if (failures.length > 0) {
	for (const failure of failures) console.error(`✘ ${failure}`);
	console.error(`smoke-blog-cutover: ${failures.length} failure(s)`);
	process.exit(1);
}

console.log(`✔ ${stories.length} canonical stories`);
console.log(`✔ ${mediaAssets.length} local asset bodies, sizes, MIME types, and SHA-256 hashes`);
if (!apexOnly) {
	console.log(`✔ ${stories.length * 2 + 8} legacy redirects`);
	console.log('✔ intentional legacy 404');
}
console.log('smoke-blog-cutover: all pass');
