#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import YAML from 'yaml';

import { placementKey, validateReviewDecisions } from './lib/medium-review.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const INVENTORY_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'inventory.json');
const MEDIA_MANIFEST_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'media-manifest.json');
const EMBED_MANIFEST_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'embed-manifest.json');
const REVIEW_DECISIONS_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'review-decisions.json');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog', 'medium');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BLOG_ORIGIN = 'https://blog.tinkercademy.com';
const REMOTE_ASSET_PATTERN = /(?:miro\.medium\.com|cdn-images-\d+\.medium\.com|i\.embed\.ly|cdn\.embedly\.com)/iu;
const TRACKING_REDIRECT_PATTERN = /https?:\/\/(?:[^/]+\.)?google\.com\/url\?/iu;

function parseArgs(argv) {
	const options = { allowReviewRequired: false, dist: null };
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];
		if (argument === '--') continue;
		if (argument === '--allow-review-required') options.allowReviewRequired = true;
		else if (argument === '--dist') options.dist = path.resolve(argv[++index]);
		else throw new Error(`Unknown argument: ${argument}`);
	}
	return options;
}

async function readJson(file) {
	return JSON.parse(await readFile(file, 'utf8'));
}

function sha256(bytes) {
	return createHash('sha256').update(bytes).digest('hex');
}

function parseContentFile(contents, file) {
	if (!contents.startsWith('---\n')) throw new Error(`${file} has no YAML frontmatter`);
	const end = contents.indexOf('\n---\n', 4);
	if (end < 0) throw new Error(`${file} has unterminated YAML frontmatter`);
	return {
		data: YAML.parse(contents.slice(4, end)),
		body: contents.slice(end + 5),
	};
}

function countMatches(value, pattern) {
	return [...value.matchAll(pattern)].length;
}

function expect(condition, message, errors) {
	if (!condition) errors.push(message);
}

async function verifySource(options) {
	const errors = [];
	const warnings = [];
	const inventory = await readJson(INVENTORY_PATH);
	const mediaManifest = await readJson(MEDIA_MANIFEST_PATH);
	const embedManifest = await readJson(EMBED_MANIFEST_PATH);
	const reviewDecisions = validateReviewDecisions(await readJson(REVIEW_DECISIONS_PATH));
	const contentNames = (await readdir(CONTENT_DIR)).filter((name) => /\.mdx?$/u.test(name)).sort();
	const contentByPath = new Map();
	const inventoryPaths = new Set(inventory.stories.map(({ legacyPath }) => legacyPath));

	expect(inventory.summary.stories === 68, `Expected 68 inventory stories; found ${inventory.summary.stories}`, errors);
	expect(inventory.summary.imagePlacements === 397, `Expected 397 image placements; found ${inventory.summary.imagePlacements}`, errors);
	expect(inventory.summary.uniqueImages === 395, `Expected 395 unique source images; found ${inventory.summary.uniqueImages}`, errors);
	expect(inventory.summary.embedPlacements === 41, `Expected 41 embed placements; found ${inventory.summary.embedPlacements}`, errors);
	expect(inventory.summary.uniqueEmbeds === 39, `Expected 39 unique embeds; found ${inventory.summary.uniqueEmbeds}`, errors);
	expect(contentNames.length === 68, `Expected 68 imported content files; found ${contentNames.length}`, errors);
	expect(mediaManifest.assets.length === 395, `Expected 395 asset records; found ${mediaManifest.assets.length}`, errors);
	expect(mediaManifest.summary.placements === 397, `Expected 397 asset placements; found ${mediaManifest.summary.placements}`, errors);
	expect(embedManifest.resources.length === 39, `Expected 39 embed resources; found ${embedManifest.resources.length}`, errors);
	expect(embedManifest.placements.length === 41, `Expected 41 embed placements; found ${embedManifest.placements.length}`, errors);
	for (const legacyPath of Object.keys(reviewDecisions.rights)) {
		expect(inventoryPaths.has(legacyPath), `Rights review contains unknown story ${legacyPath}`, errors);
	}

	for (const name of contentNames) {
		const file = path.join(CONTENT_DIR, name);
		const contents = await readFile(file, 'utf8');
		const parsed = parseContentFile(contents, file);
		contentByPath.set(parsed.data.legacyPath, { file, contents, ...parsed });
		expect(!REMOTE_ASSET_PATTERN.test(contents), `${name} contains a remote Medium or Embedly asset`, errors);
		expect(!TRACKING_REDIRECT_PATTERN.test(parsed.body), `${name} contains a Google tracking redirect`, errors);
		expect(!/<iframe\b|<script\b/iu.test(parsed.body), `${name} contains a raw iframe or script`, errors);
	}

	let bodyImagePlacements = 0;
	let bodyEmbedPlacements = 0;
	let rightsReviewRequired = 0;
	let altReviewRequired = 0;
	for (const story of inventory.stories) {
		const content = contentByPath.get(story.legacyPath);
		expect(Boolean(content), `Missing content file for ${story.legacyPath}`, errors);
		if (!content) continue;
		const { data, body } = content;
		expect(data.canonicalUrl === `${BLOG_ORIGIN}/${story.legacyPath}`, `Wrong canonical for ${story.legacyPath}`, errors);
		expect(data.canonicalUrl === story.canonicalUrl, `Canonical drift for ${story.legacyPath}`, errors);
		expect(data.sourceMediumUrl === story.sourceMediumUrl, `Medium source URL drift for ${story.legacyPath}`, errors);
		expect(data.author?.id === story.author.id && data.author?.name === story.author.name, `Author drift for ${story.legacyPath}`, errors);
		expect(data.license === 'All rights reserved', `Wrong licence for ${story.legacyPath}`, errors);
		expect(data.provenance?.sourceSha256 === story.sourceSha256, `Source hash drift for ${story.legacyPath}`, errors);
		const rightsDecision = reviewDecisions.rights[story.legacyPath];
		if (rightsDecision) {
			expect(data.rightsStatus === rightsDecision.status, `Rights review was not imported for ${story.legacyPath}`, errors);
		} else {
			expect(data.rightsStatus === story.rightsStatus, `Unreviewed rights status drift for ${story.legacyPath}`, errors);
		}
		expect(body.includes(story.sourceMediumUrl) === false, `Medium source link leaked into body for ${story.legacyPath}`, errors);
		bodyImagePlacements += countMatches(body, /!\[[^\n]*\]\(\/blog-media\/[a-f0-9]{64}\.(?:jpg|png|gif|webp)\)/gu);
		bodyEmbedPlacements += countMatches(body, /<ArticleEmbed\b/gu);
		if (data.rightsStatus === 'review-required') rightsReviewRequired += 1;
		altReviewRequired += data.migration?.altReviewRequired ?? 0;

		for (const link of story.links.filter(({ internalStoryId }) => internalStoryId)) {
			const target = inventory.stories.find(({ id }) => id === link.internalStoryId);
			expect(Boolean(target) && body.includes(target.canonicalUrl), `Internal story link ${link.internalStoryId} was not rewritten in ${story.legacyPath}`, errors);
		}
	}
	expect(bodyImagePlacements === 397, `Expected 397 local body image references; found ${bodyImagePlacements}`, errors);
	expect(bodyEmbedPlacements === 41, `Expected 41 typed embed placements; found ${bodyEmbedPlacements}`, errors);

	const localPaths = new Set();
	const placementKeys = new Set();
	for (const asset of mediaManifest.assets) {
		const file = path.join(PUBLIC_DIR, asset.localPath.replace(/^\//u, ''));
		try {
			const bytes = await readFile(file);
			expect(sha256(bytes) === asset.sha256, `Asset hash mismatch: ${asset.localPath}`, errors);
			localPaths.add(asset.localPath);
		} catch {
			errors.push(`Missing local asset: ${asset.localPath}`);
		}
		for (const placement of asset.placements) {
			const key = placementKey(placement);
			placementKeys.add(key);
			expect(placement.reviewKey === key, `Missing or unstable review key for ${key}`, errors);
			const decision = reviewDecisions.images[key];
			if (!decision) continue;
			expect(placement.decision === decision.decision, `Image review decision was not imported for ${key}`, errors);
			expect(placement.alt === (decision.decision === 'meaningful' ? decision.alt.trim() : ''), `Image review alt text was not imported for ${key}`, errors);
			expect(placement.source === 'editorial-review', `Image review provenance is missing for ${key}`, errors);
			expect((placement.credit || '') === (decision.credit?.trim() || ''), `Image credit was not imported for ${key}`, errors);
		}
	}
	for (const key of Object.keys(reviewDecisions.images)) {
		expect(placementKeys.has(key), `Image review contains unknown placement ${key}`, errors);
	}

	if (rightsReviewRequired || altReviewRequired) {
		const message = `${rightsReviewRequired} stories require rights review; ${altReviewRequired} image placements require an editorial alt/decorative decision`;
		if (options.allowReviewRequired) warnings.push(message);
		else errors.push(`${message}. Re-run with --allow-review-required only for pre-cutover implementation checks.`);
	}

	return {
		errors,
		warnings,
		inventory,
		summary: {
			stories: inventory.summary.stories,
			contentFiles: contentNames.length,
			assetRecords: mediaManifest.assets.length,
			localAssetFiles: localPaths.size,
			imagePlacements: bodyImagePlacements,
			embedResources: embedManifest.resources.length,
			embedPlacements: bodyEmbedPlacements,
			rightsReviewRequired,
			altReviewRequired,
		},
	};
}

async function verifyDist(dist, inventory, errors) {
	for (const story of inventory.stories) {
		const file = path.join(dist, 'blog-content', story.legacyPath, 'index.html');
		try {
			const html = await readFile(file, 'utf8');
			expect(html.includes(`<link rel="canonical" href="${story.canonicalUrl}">`), `Built canonical is wrong for ${story.legacyPath}`, errors);
			expect(html.includes('All rights reserved.'), `Built rights notice is missing for ${story.legacyPath}`, errors);
			expect(html.includes(story.sourceMediumUrl), `Built Medium source link is missing for ${story.legacyPath}`, errors);
			expect(!/(?:src|srcset)="[^"]*(?:miro\.medium\.com|embedly\.com)/iu.test(html), `Built page hotlinks a Medium/Embedly asset: ${story.legacyPath}`, errors);
		} catch {
			errors.push(`Missing built story page: ${story.legacyPath}`);
		}
	}

	const homepage = await readFile(path.join(dist, 'blog-content', 'index.html'), 'utf8');
	expect(countMatches(homepage, /class="story-card"/gu) === 68, 'Built blog homepage does not list all 68 stories', errors);
	const sitemap = await readFile(path.join(dist, 'blog-content', 'sitemap.xml'), 'utf8');
	expect(countMatches(sitemap, /<url>/gu) === 76, 'Blog sitemap must contain root, 7 archives, and 68 stories', errors);
	for (const story of inventory.stories) {
		expect(countMatches(sitemap, new RegExp(`<loc>${story.canonicalUrl.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}</loc>`, 'gu')) === 1, `Blog sitemap missing or duplicates ${story.legacyPath}`, errors);
	}
	const feed = await readFile(path.join(dist, 'blog-content', 'feed.xml'), 'utf8');
	expect(countMatches(feed, /<item>/gu) === 20, 'Blog feed must contain the latest 20 stories', errors);
	const apexSitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
	expect(!apexSitemap.includes('/blog-content/'), 'Apex sitemap exposes the hidden blog namespace', errors);
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const result = await verifySource(options);
	if (options.dist) await verifyDist(options.dist, result.inventory, result.errors);
	for (const warning of result.warnings) console.warn(`WARNING: ${warning}`);
	if (result.errors.length) {
		for (const error of result.errors) console.error(`ERROR: ${error}`);
		console.error(`Medium migration verification failed with ${result.errors.length} error(s).`);
		process.exitCode = 1;
		return;
	}
	console.log(JSON.stringify({ status: 'ok', distVerified: Boolean(options.dist), ...result.summary }, null, 2));
}

main().catch((error) => {
	console.error(error instanceof Error ? error.stack : error);
	process.exitCode = 1;
});
