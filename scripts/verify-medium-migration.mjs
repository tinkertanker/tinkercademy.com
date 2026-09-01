#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { load } from 'cheerio';
import YAML from 'yaml';

import { placementKey, validateReviewDecisions } from './lib/medium-review.mjs';
import { readMediumRssStoryCache } from './lib/medium-rss.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const INVENTORY_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'inventory.json');
const MEDIA_MANIFEST_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'media-manifest.json');
const EMBED_MANIFEST_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'embed-manifest.json');
const REVIEW_DECISIONS_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'review-decisions.json');
const RAW_STORIES_DIR = path.join(ROOT, 'scripts', '_artifacts', 'medium', 'raw', 'stories');
const RSS_CACHE_PATH = path.join(ROOT, 'scripts', '_artifacts', 'medium', 'raw', 'rss', 'publication.xml');
const RSS_STORIES_DIR = path.join(ROOT, 'scripts', '_artifacts', 'medium', 'raw', 'rss', 'stories');
const RSS_OVERRIDES_PATH = path.join(ROOT, 'docs', 'migrations', 'medium', 'rss-source-overrides.json');
const CONTENT_DIR = path.join(ROOT, 'src', 'content', 'blog', 'medium');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BLOG_ORIGIN = 'https://blog.tinkercademy.com';
const REMOTE_ASSET_PATTERN = /(?:miro\.medium\.com|cdn-images-\d+\.medium\.com|i\.embed\.ly|cdn\.embedly\.com)/iu;
const TRACKING_REDIRECT_PATTERN = /https?:\/\/(?:[^/]+\.)?google\.com\/url\?/iu;

function parseArgs(argv) {
	const options = { allowReviewRequired: false, dist: null, report: null };
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];
		if (argument === '--') continue;
		if (argument === '--allow-review-required') options.allowReviewRequired = true;
		else if (argument === '--dist') options.dist = path.resolve(argv[++index]);
		else if (argument === '--report') options.report = path.resolve(argv[++index]);
		else throw new Error(`Unknown argument: ${argument}`);
	}
	if (options.report && !options.dist) throw new Error('--report requires --dist');
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

function sameValues(actual, expected) {
	return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function compactVisibleText(value) {
	return String(value ?? '').replace(/[\s\u200b\ufeff]+/gu, '');
}

function storyDateTime(story) {
	return story.publishedAtPrecision === 'month' ? story.publishedAt.slice(0, 7) : story.publishedAt;
}

function storyDateLabel(story) {
	return new Intl.DateTimeFormat('en-GB', {
		...(story.publishedAtPrecision === 'month' ? {} : { day: 'numeric' }),
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(story.publishedAt));
}

function safeAuditedHref(value) {
	try {
		return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(value, BLOG_ORIGIN).protocol) ? value : null;
	} catch {
		return null;
	}
}

function sourceContainsHref(bodyHrefs, body, href) {
	return bodyHrefs.includes(href) || body.includes(href) || body.includes(href.replaceAll('&', '&amp;'));
}

function sourceTextParagraphs(source, story) {
	const paragraphs = source?.paragraphs ?? source?.payload?.value?.content?.bodyModel?.paragraphs ?? [];
	let skippedTitle = false;
	return paragraphs.flatMap((paragraph, index) => {
		if (!skippedTitle && paragraph.type === 3 && paragraph.text?.trim() === story.title.trim()) {
			skippedTitle = true;
			return [];
		}
		return paragraph.text?.trim() ? [{ index, type: paragraph.type, text: paragraph.text }] : [];
	});
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
	const placementsByStory = new Map();
	for (const asset of mediaManifest.assets) {
		for (const placement of asset.placements) {
			if (!placementsByStory.has(placement.legacyPath)) placementsByStory.set(placement.legacyPath, []);
			placementsByStory.get(placement.legacyPath).push({ ...placement, asset });
		}
	}
	for (const placements of placementsByStory.values()) placements.sort((a, b) => a.paragraph - b.paragraph);

	for (const [key, expected] of Object.entries(inventory.expectedBaseline ?? {})) {
		expect(inventory.summary[key] === expected, `Expected ${expected} ${key}; found ${inventory.summary[key]}`, errors);
	}
	expect(contentNames.length === inventory.summary.stories, `Expected ${inventory.summary.stories} imported content files; found ${contentNames.length}`, errors);
	expect(mediaManifest.assets.length === inventory.summary.uniqueImages, `Expected ${inventory.summary.uniqueImages} asset records; found ${mediaManifest.assets.length}`, errors);
	expect(mediaManifest.summary.placements === inventory.summary.imagePlacements, `Expected ${inventory.summary.imagePlacements} asset placements; found ${mediaManifest.summary.placements}`, errors);
	expect(embedManifest.resources.length === inventory.summary.uniqueEmbeds, `Expected ${inventory.summary.uniqueEmbeds} embed resources; found ${embedManifest.resources.length}`, errors);
	expect(embedManifest.placements.length === inventory.summary.embedPlacements, `Expected ${inventory.summary.embedPlacements} embed placements; found ${embedManifest.placements.length}`, errors);
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
		expect(data.title === story.title && (data.subtitle || '') === story.subtitle, `Title or subtitle drift for ${story.legacyPath}`, errors);
		expect(data.publishedAt === story.publishedAt && data.updatedAt === story.updatedAt, `Publication date drift for ${story.legacyPath}`, errors);
		expect(data.publishedAtPrecision === story.publishedAtPrecision, `Publication date precision drift for ${story.legacyPath}`, errors);
		expect(JSON.stringify(data.tags) === JSON.stringify(story.tags), `Tag drift for ${story.legacyPath}`, errors);
		expect(data.license === 'All rights reserved', `Wrong licence for ${story.legacyPath}`, errors);
		expect(data.provenance?.sourceSha256 === story.sourceSha256, `Source hash drift for ${story.legacyPath}`, errors);
		if (story.source?.kind === 'medium-rss') {
			expect(data.provenance?.sourceKind === story.source.kind, `RSS source kind drift for ${story.legacyPath}`, errors);
			expect(data.provenance?.sourceUrl === story.source.url, `RSS source URL drift for ${story.legacyPath}`, errors);
			expect(data.provenance?.sourceCreator === story.source.creator, `RSS source creator drift for ${story.legacyPath}`, errors);
		}
		expect(data.migration?.paragraphCount === story.paragraphCount, `Paragraph count drift for ${story.legacyPath}`, errors);
		expect(data.migration?.imageCount === story.images.length, `Image count drift for ${story.legacyPath}`, errors);
		expect(data.migration?.embedCount === story.embeds.length, `Embed count drift for ${story.legacyPath}`, errors);
		const rightsDecision = reviewDecisions.rights[story.legacyPath];
		if (rightsDecision) {
			expect(data.rightsStatus === rightsDecision.status, `Rights review was not imported for ${story.legacyPath}`, errors);
		} else {
			expect(data.rightsStatus === story.rightsStatus, `Unreviewed rights status drift for ${story.legacyPath}`, errors);
		}
		expect(body.includes(story.sourceMediumUrl) === false, `Medium source link leaked into body for ${story.legacyPath}`, errors);
		const bodyImageTags = [...body.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/gu)];
		const bodyImageSources = bodyImageTags.map((match) => match[1]);
		const expectedPlacements = placementsByStory.get(story.legacyPath) ?? [];
		const expectedImageSources = expectedPlacements.map(({ asset }) => asset.localPath);
		const sourceImageIds = [...body.matchAll(/medium-image:([^\s}]+)\s+alt-decision/gu)].map((match) => match[1]);
		expect(sameValues(bodyImageSources, expectedImageSources), `Body image order or local source drift for ${story.legacyPath}`, errors);
		expect(sameValues(sourceImageIds, story.images.map(({ id }) => id)), `Source image ID order drift for ${story.legacyPath}`, errors);
		for (let index = 0; index < expectedPlacements.length; index += 1) {
			const tag = bodyImageTags[index]?.[0] ?? '';
			const { asset, alt } = expectedPlacements[index];
			expect(tag.includes(`alt="${String(alt).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}"`), `Image alt drift at placement ${index} in ${story.legacyPath}`, errors);
			expect(tag.includes(`width="${asset.width}"`) && tag.includes(`height="${asset.height}"`), `Image dimensions missing at placement ${index} in ${story.legacyPath}`, errors);
		}
		bodyImagePlacements += bodyImageSources.length;
		const storyEmbedPlacements = countMatches(body, /<ArticleEmbed\b/gu);
		const linkCardPlacements = countMatches(body, /(?:<aside class="article-link-card">|<ArticleLegacyBlock as="aside")/gu);
		expect(storyEmbedPlacements === story.embeds.length, `Typed embed count drift for ${story.legacyPath}`, errors);
		expect(linkCardPlacements === (story.paragraphTypes['14'] ?? 0), `Link-preview count drift for ${story.legacyPath}`, errors);
		bodyEmbedPlacements += storyEmbedPlacements;
		if (data.rightsStatus === 'review-required') rightsReviewRequired += 1;
		altReviewRequired += data.migration?.altReviewRequired ?? 0;

		const $body = load(body);
		const bodyHrefs = $body('a').map((_, element) => $body(element).attr('href')).get();
		for (const link of story.links) {
			const expectedHref = safeAuditedHref(link.href);
			if (expectedHref) expect(sourceContainsHref(bodyHrefs, body, expectedHref), `Body link ${expectedHref} is missing from ${story.legacyPath}`, errors);
			if (link.internalStoryId) {
				const target = inventory.stories.find(({ id }) => id === link.internalStoryId);
				expect(Boolean(target) && sourceContainsHref(bodyHrefs, body, target.canonicalUrl), `Internal story link ${link.internalStoryId} was not rewritten in ${story.legacyPath}`, errors);
			}
		}
	}
	expect(bodyImagePlacements === inventory.summary.imagePlacements, `Expected ${inventory.summary.imagePlacements} local body image references; found ${bodyImagePlacements}`, errors);
	expect(bodyEmbedPlacements === inventory.summary.embedPlacements, `Expected ${inventory.summary.embedPlacements} typed embed placements; found ${bodyEmbedPlacements}`, errors);

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
			animatedAssets: mediaManifest.summary.animatedAssets,
			embedResources: embedManifest.resources.length,
			embedPlacements: bodyEmbedPlacements,
			linkPlacements: inventory.summary.bodyLinks,
			rightsReviewRequired,
			altReviewRequired,
		},
	};
}

async function verifyDist(dist, inventory, errors) {
	const [mediaManifest, rssOverrides] = await Promise.all([
		readJson(MEDIA_MANIFEST_PATH),
		readJson(RSS_OVERRIDES_PATH),
	]);
	const rssStories = await readMediumRssStoryCache({
		feedFile: RSS_CACHE_PATH,
		storiesDir: RSS_STORIES_DIR,
		storyOverrides: rssOverrides.stories,
	});
	const rssById = new Map(rssStories.map((story) => [story.id, story]));
	const placementsByStory = new Map();
	for (const asset of mediaManifest.assets) {
		for (const placement of asset.placements) {
			if (!placementsByStory.has(placement.legacyPath)) placementsByStory.set(placement.legacyPath, []);
			placementsByStory.get(placement.legacyPath).push({ ...placement, asset });
		}
	}
	for (const placements of placementsByStory.values()) placements.sort((a, b) => a.paragraph - b.paragraph);

	const stories = [];
	const exceptions = [];
	let textParagraphsVerified = 0;
	let safeLinksVerified = 0;
	for (const story of inventory.stories) {
		const storyErrorStart = errors.length;
		const file = path.join(dist, 'blog-content', story.legacyPath, 'index.html');
		let checkedTextParagraphs = 0;
		let unsafeLinks = 0;
		try {
			const html = await readFile(file, 'utf8');
			const source = story.source?.kind === 'medium-rss'
				? rssById.get(story.id)
				: await readJson(path.join(RAW_STORIES_DIR, `${story.id}.json`));
			if (!source) throw new Error(`Missing source for ${story.id}`);
			const $ = load(html);
			const $body = $('.blog-article__body');
			const expectedPlacements = placementsByStory.get(story.legacyPath) ?? [];

			expect($('link[rel="canonical"]').attr('href') === story.canonicalUrl, `Built canonical is wrong for ${story.legacyPath}`, errors);
			expect($('.blog-article__header h1').text().trim() === story.title, `Built title is wrong for ${story.legacyPath}`, errors);
			expect($('.blog-article__byline').text().replace(/\s+/gu, ' ').trim().startsWith(`By ${story.author.name} ·`), `Visible top byline is wrong for ${story.legacyPath}`, errors);
			expect($('.blog-article__byline time').attr('datetime') === storyDateTime(story), `Visible publication datetime is wrong for ${story.legacyPath}`, errors);
			expect($('.blog-article__byline time').text().trim() === storyDateLabel(story), `Visible publication date label is wrong for ${story.legacyPath}`, errors);
		if (story.author.profileUrl) {
			expect($('.blog-article__byline a[rel="author"]').text().trim() === story.author.name, `Linked author name is wrong for ${story.legacyPath}`, errors);
			expect($('.blog-article__byline a[rel="author"]').attr('href') === story.author.profileUrl, `Author profile URL is wrong for ${story.legacyPath}`, errors);
		}
		const builtTags = $('.blog-article__tags li').map((_, element) => $(element).text().trim()).get();
		expect(sameValues(builtTags, story.tags.map(({ name }) => name)), `Visible tags are wrong for ${story.legacyPath}`, errors);
		expect($('.blog-article__footer').text().includes('All rights reserved.'), `Built rights notice is missing for ${story.legacyPath}`, errors);
		expect($('.blog-article__source').text().replace(/\s+/gu, ' ').trim().startsWith('Source:'), `Visible Source: attribution is missing for ${story.legacyPath}`, errors);
		expect($('.blog-article__source a').attr('href') === story.sourceMediumUrl, `Built Medium source link is wrong for ${story.legacyPath}`, errors);
		expect(!/(?:src|srcset)="[^"]*(?:miro\.medium\.com|embedly\.com)/iu.test(html), `Built page hotlinks a Medium/Embedly asset: ${story.legacyPath}`, errors);

		const bodyText = compactVisibleText($body.text());
		let bodyCursor = 0;
		const sourceTexts = sourceTextParagraphs(source, story);
		for (const paragraph of sourceTexts) {
			const expectedText = compactVisibleText(paragraph.text);
			const next = bodyText.indexOf(expectedText, bodyCursor);
			expect(next >= 0, `Source paragraph ${paragraph.index} (type ${paragraph.type}) is missing or out of order in ${story.legacyPath}`, errors);
			if (next >= 0) bodyCursor = next + expectedText.length;
		}
		checkedTextParagraphs = sourceTexts.length;
		textParagraphsVerified += sourceTexts.length;

		const builtImages = $body.find('img').toArray();
		expect(builtImages.length === expectedPlacements.length, `Built image count is wrong for ${story.legacyPath}`, errors);
		for (let index = 0; index < expectedPlacements.length; index += 1) {
			const image = builtImages[index];
			const { asset, alt } = expectedPlacements[index];
			expect($(image).attr('src') === asset.localPath, `Built image ${index} source/order is wrong for ${story.legacyPath}`, errors);
			expect($(image).attr('alt') === alt, `Built image ${index} alt is wrong for ${story.legacyPath}`, errors);
			expect($(image).attr('width') === String(asset.width) && $(image).attr('height') === String(asset.height), `Built image ${index} dimensions are wrong for ${story.legacyPath}`, errors);
		}

		const builtEmbeds = $body.find('.article-embed');
		expect(builtEmbeds.length === story.embeds.length, `Built embed count is wrong for ${story.legacyPath}`, errors);
		story.embeds.forEach((embed, index) => {
			const built = builtEmbeds.eq(index);
			expect(built.find('a').attr('href') === embed.href, `Built embed ${index} link is wrong for ${story.legacyPath}`, errors);
			expect(built.attr('data-provider') === embed.provider, `Built embed ${index} provider is wrong for ${story.legacyPath}`, errors);
		});

		const bodyHrefs = $body.find('a').map((_, element) => $(element).attr('href')).get();
		for (const link of story.links) {
			const expectedHref = safeAuditedHref(link.href);
			if (expectedHref) {
				safeLinksVerified += 1;
				expect(bodyHrefs.includes(expectedHref), `Built body link ${expectedHref} is missing from ${story.legacyPath}`, errors);
			} else {
				unsafeLinks += 1;
				exceptions.push({
					legacyPath: story.legacyPath,
					paragraph: link.paragraph,
					type: 'unsafe-source-link-excluded',
					protocol: String(link.href).split(':', 1)[0] || 'invalid',
					sourceHref: String(link.sourceHref).startsWith('data:') ? 'data:image/jpeg;base64,[omitted]' : link.sourceHref,
					reason: 'The visible source text is preserved, but the non-web URL is not emitted as an active link.',
				});
			}
		}
		} catch {
			errors.push(`Missing or unreadable built story page: ${story.legacyPath}`);
		}
		stories.push({
			legacyPath: story.legacyPath,
			title: story.title,
			canonicalUrl: story.canonicalUrl,
			sourceMediumUrl: story.sourceMediumUrl,
			author: story.author.name,
			status: errors.length === storyErrorStart ? 'pass' : 'fail',
			paragraphs: story.paragraphCount,
			textParagraphsChecked: checkedTextParagraphs,
			images: story.images.length,
			embeds: story.embeds.length,
			links: story.links.length,
			unsafeLinksExcluded: unsafeLinks,
		});
	}

	const homepage = await readFile(path.join(dist, 'blog-content', 'index.html'), 'utf8');
	const $homepage = load(homepage);
	expect($homepage('.story-card').length === inventory.summary.stories, `Built blog homepage does not list all ${inventory.summary.stories} stories`, errors);
	for (const story of inventory.stories) {
		expect($homepage(`.story-card[href="${story.canonicalUrl}"]`).length === 1, `Blog homepage missing or duplicates ${story.legacyPath}`, errors);
	}
	expect($homepage('nav[aria-label="Build Log"]').length === 1, 'Built blog homepage is missing the Build Log menu', errors);
	const sitemap = await readFile(path.join(dist, 'blog-content', 'sitemap.xml'), 'utf8');
	const archiveYears = new Set(inventory.stories.map(({ publishedAt }) => new Date(publishedAt).getUTCFullYear()));
	const expectedSitemapEntries = 1 + archiveYears.size + inventory.summary.stories;
	expect(countMatches(sitemap, /<url>/gu) === expectedSitemapEntries, `Blog sitemap must contain root, ${archiveYears.size} archives, and ${inventory.summary.stories} stories`, errors);
	for (const story of inventory.stories) {
		expect(countMatches(sitemap, new RegExp(`<loc>${story.canonicalUrl.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')}</loc>`, 'gu')) === 1, `Blog sitemap missing or duplicates ${story.legacyPath}`, errors);
	}
	const feed = await readFile(path.join(dist, 'blog-content', 'feed.xml'), 'utf8');
	expect(countMatches(feed, /<item>/gu) === 20, 'Blog feed must contain the latest 20 stories', errors);
	const apexSitemap = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
	expect(!apexSitemap.includes('/blog-content/'), 'Apex sitemap exposes the hidden blog namespace', errors);

	return {
		version: 1,
		summary: {
			stories: stories.length,
			passed: stories.filter(({ status }) => status === 'pass').length,
			failed: stories.filter(({ status }) => status === 'fail').length,
			textParagraphsVerified,
			imagePlacementsVerified: inventory.summary.imagePlacements,
			embedPlacementsVerified: inventory.summary.embedPlacements,
			linkPlacementsVerified: safeLinksVerified,
			exceptions: exceptions.length,
		},
		exceptions,
		stories,
	};
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const result = await verifySource(options);
	const parityReport = options.dist ? await verifyDist(options.dist, result.inventory, result.errors) : null;
	if (options.report && parityReport) {
		parityReport.summary = { ...result.summary, ...parityReport.summary };
		await mkdir(path.dirname(options.report), { recursive: true });
		await writeFile(options.report, `${JSON.stringify(parityReport, null, 2)}\n`);
	}
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
