#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
	MEDIUM_PUBLICATION_ID,
	classifyEmbedProvider,
	normaliseMediumStory,
	parseMediumJson,
	rewriteInternalStoryHref,
	sha256,
} from './lib/medium.mjs';
import { parseMediumRss, readMediumRssStoryCache } from './lib/medium-rss.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const DEFAULT_INVENTORY = path.join(ROOT, 'docs', 'migrations', 'medium', 'inventory.json');
const DEFAULT_CACHE = path.join(SCRIPTS_DIR, '_artifacts', 'medium', 'raw');
const DEFAULT_RSS_OVERRIDES = path.join(ROOT, 'docs', 'migrations', 'medium', 'rss-source-overrides.json');
const EXPECTED = Object.freeze({ stories: 72, imagePlacements: 415, uniqueImages: 413, embedPlacements: 42, uniqueEmbeds: 40 });
const RSS_URL = 'https://medium.com/feed/tinkertanker';

function parseArgs(argv) {
	const options = {
		offline: false,
		dryRun: false,
		allowCountChange: false,
		seed: DEFAULT_INVENTORY,
		output: DEFAULT_INVENTORY,
		cacheDir: DEFAULT_CACHE,
	};
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];
		if (argument === '--') continue;
		if (argument === '--offline') options.offline = true;
		else if (argument === '--dry-run') options.dryRun = true;
		else if (argument === '--allow-count-change') options.allowCountChange = true;
		else if (argument === '--seed') options.seed = path.resolve(argv[++index]);
		else if (argument === '--output') options.output = path.resolve(argv[++index]);
		else if (argument === '--cache-dir') options.cacheDir = path.resolve(argv[++index]);
		else throw new Error(`Unknown argument: ${argument}`);
	}
	return options;
}

async function readJson(file) {
	return JSON.parse(await readFile(file, 'utf8'));
}

async function writeJson(file, value) {
	await mkdir(path.dirname(file), { recursive: true });
	await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function storySeeds(value) {
	const records = Array.isArray(value) ? value : value.stories;
	if (!Array.isArray(records)) throw new Error('Seed must be an inventory array or object with stories[]');
	return records.map((story) => ({
		id: story.id,
		legacyPath: story.legacyPath ?? story.uniqueSlug ?? story.slug,
		sourceKind: story.source?.kind ?? 'medium-json',
	}));
}

async function fetchPublicJson(url) {
	const response = await fetch(url, {
		headers: {
			Accept: 'application/json,text/plain;q=0.9,*/*;q=0.1',
			'User-Agent': 'TinkercademyMediumMigration/1.0 (+https://tinkercademy.com)',
		},
		redirect: 'follow',
	});
	if (!response.ok) {
		throw new Error(`${url} returned ${response.status}; rerun with an existing public cache and --offline`);
	}
	return parseMediumJson(await response.text());
}

async function loadStoryRaw(seed, options) {
	const file = path.join(options.cacheDir, 'stories', `${seed.id}.json`);
	try {
		return { raw: await readJson(file), file };
	} catch (error) {
		if (options.offline || error?.code !== 'ENOENT') throw error;
	}
	const raw = await fetchPublicJson(`https://medium.com/tinkertanker/${seed.legacyPath}?format=json`);
	if (!options.dryRun) await writeJson(file, raw);
	return { raw, file };
}

async function loadRssStories(options) {
	const feedFile = path.join(options.cacheDir, 'rss', 'publication.xml');
	const storiesDir = path.join(options.cacheDir, 'rss', 'stories');
	const overrides = await readJson(DEFAULT_RSS_OVERRIDES);
	if (overrides.version !== 1 || !overrides.stories) throw new Error('Invalid RSS source overrides');
	if (options.offline) {
		return readMediumRssStoryCache({ feedFile, storiesDir, storyOverrides: overrides.stories });
	}
	const response = await fetch(RSS_URL, {
		headers: { 'User-Agent': 'TinkercademyMediumMigration/1.0 (+https://tinkercademy.com)' },
		redirect: 'follow',
	});
	if (!response.ok) throw new Error(`${RSS_URL} returned ${response.status}; rerun with --offline`);
	const xml = await response.text();
	const current = parseMediumRss(xml, { storyOverrides: overrides.stories });
	if (!options.dryRun) {
		await mkdir(storiesDir, { recursive: true });
		await writeFile(feedFile, xml);
		for (const story of current) {
			await writeJson(path.join(storiesDir, `${story.id}.json`), {
				version: 1,
				sourceKind: 'medium-rss',
				sourceUrl: RSS_URL,
				feedSha256: sha256(xml),
				itemSha256: story.sourceItemSha256,
				itemXml: story.sourceItemXml,
			});
		}
		return readMediumRssStoryCache({ feedFile, storiesDir, storyOverrides: overrides.stories });
	}
	const cached = await readMediumRssStoryCache({ feedFile, storiesDir, storyOverrides: overrides.stories });
	return [...new Map([...cached, ...current].map((story) => [story.id, story])).values()];
}

async function loadMediaRaw(id, options) {
	const file = path.join(options.cacheDir, 'media', `${id}.json`);
	try {
		return await readJson(file);
	} catch (error) {
		if (options.offline) throw error;
	}
	const raw = await fetchPublicJson(`https://medium.com/_/api/media-resources/${id}`);
	if (!options.dryRun) await writeJson(file, raw);
	return raw;
}

function extractLinks(paragraphs, pathsById) {
	return paragraphs.flatMap((paragraph, paragraphIndex) =>
		(paragraph.markups ?? [])
			.filter((markup) => markup.type === 3 && markup.href)
			.map((markup) => {
				const internalStoryId = [...pathsById.keys()].find((id) => markup.href.includes(id)) ?? null;
				return {
					paragraph: paragraphIndex,
					sourceHref: markup.href,
					href: rewriteInternalStoryHref(markup.href, pathsById),
					internalStoryId,
				};
			}),
	);
}

function extractImages(paragraphs) {
	return paragraphs.flatMap((paragraph, paragraphIndex) => {
		if (paragraph.type !== 4 || !paragraph.metadata?.id) return [];
		return [{
			paragraph: paragraphIndex,
			id: paragraph.metadata.id,
			width: paragraph.metadata.originalWidth,
			height: paragraph.metadata.originalHeight,
			caption: paragraph.text || '',
			sourceAlt: paragraph.metadata.alt || '',
			isFeatured: paragraph.metadata.isFeatured === true,
		}];
	});
}

function extractEmbedSeeds(paragraphs) {
	return paragraphs.flatMap((paragraph, paragraphIndex) => {
		if (paragraph.type !== 11 || !paragraph.iframe?.mediaResourceId) return [];
		return [{
			paragraph: paragraphIndex,
			mediaResourceId: paragraph.iframe.mediaResourceId,
			caption: paragraph.text || '',
			width: paragraph.iframe.iframeWidth ?? null,
			height: paragraph.iframe.iframeHeight ?? null,
			...(paragraph.iframe.href ? { href: paragraph.iframe.href } : {}),
		}];
	});
}

function normaliseMedia(raw, id) {
	const value = raw?.payload?.value;
	if (!value || value.mediaResourceId !== id) throw new Error(`Invalid media resource ${id}`);
	return {
		id,
		provider: classifyEmbedProvider(value.href),
		href: value.href,
		title: value.title || '',
		description: value.description || '',
		width: value.iframeWidth ?? null,
		height: value.iframeHeight ?? null,
	};
}

function assertCounts(summary, allowCountChange) {
	if (allowCountChange) return;
	for (const [key, expected] of Object.entries(EXPECTED)) {
		if (summary[key] !== expected) throw new Error(`Expected ${expected} ${key}; found ${summary[key]}`);
	}
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const seeds = storySeeds(await readJson(options.seed));
	const rssStories = await loadRssStories(options);
	const rssById = new Map(rssStories.map((story) => [story.id, story]));
	const seededIds = new Set(seeds.map(({ id }) => id));
	for (const story of rssStories) {
		if (!seededIds.has(story.id)) {
			seeds.push({ id: story.id, legacyPath: story.legacyPath, sourceKind: 'medium-rss' });
			seededIds.add(story.id);
		}
	}
	const uniqueIds = new Set(seeds.map(({ id }) => id));
	const uniquePaths = new Set(seeds.map(({ legacyPath }) => legacyPath));
	if (uniqueIds.size !== seeds.length || uniquePaths.size !== seeds.length) {
		throw new Error('Seed contains duplicate Medium IDs or legacy paths');
	}
	const pathsById = new Map(seeds.map(({ id, legacyPath }) => [id, legacyPath]));

	const loaded = [];
	for (const seed of seeds) {
		let story;
		let rawText;
		if (seed.sourceKind === 'medium-rss') {
			story = rssById.get(seed.id);
			if (!story) throw new Error(`RSS no longer contains cached story ${seed.id}`);
			rawText = story.sourceItemXml;
		} else {
			const { raw } = await loadStoryRaw(seed, options);
			rawText = JSON.stringify(raw);
			story = normaliseMediumStory(raw);
		}
		if (story.id !== seed.id || story.legacyPath !== seed.legacyPath) {
			throw new Error(`Seed drift for ${seed.id}`);
		}
		loaded.push({ rawText, story, sourceKind: seed.sourceKind });
	}

	const embedSeeds = new Map();
	for (const { story } of loaded) {
		for (const embed of extractEmbedSeeds(story.paragraphs)) {
			if (!embedSeeds.has(embed.mediaResourceId)) embedSeeds.set(embed.mediaResourceId, embed);
		}
	}
	const mediaById = new Map();
	for (const [id, embed] of [...embedSeeds].sort(([a], [b]) => a.localeCompare(b))) {
		mediaById.set(id, embed.href ? {
			id,
			provider: classifyEmbedProvider(embed.href),
			href: embed.href,
			title: '',
			description: '',
			width: embed.width,
			height: embed.height,
		} : normaliseMedia(await loadMediaRaw(id, options), id));
	}

	const stories = loaded.map(({ rawText, story, sourceKind }) => {
		const images = extractImages(story.paragraphs);
		const embeds = extractEmbedSeeds(story.paragraphs).map((embed) => ({ ...embed, ...mediaById.get(embed.mediaResourceId) }));
		const paragraphTypes = Object.fromEntries(
			[...new Set(story.paragraphs.map(({ type }) => type))]
				.sort((a, b) => a - b)
				.map((type) => [type, story.paragraphs.filter((paragraph) => paragraph.type === type).length]),
		);
		return {
			id: story.id,
			legacyPath: story.legacyPath,
			title: story.title,
			subtitle: story.subtitle,
			canonicalUrl: story.canonicalUrl,
			sourceMediumUrl: story.sourceMediumUrl,
			author: story.author,
			createdAt: story.createdAt,
			publishedAt: story.publishedAt,
			latestPublishedAt: story.latestPublishedAt,
			updatedAt: story.updatedAt,
			tags: story.tags,
			wordCount: story.wordCount,
			readingTime: story.readingTime,
			mediumLicenseCode: story.mediumLicenseCode,
			license: story.license,
			rightsStatus: story.rightsStatus,
			...(sourceKind === 'medium-rss' ? { source: {
				kind: sourceKind,
				url: story.sourceUrl,
				...(story.sourceCreator ? { creator: story.sourceCreator } : {}),
				...('rssPublishedAt' in story ? { rssPublishedAt: story.rssPublishedAt, rssUpdatedAt: story.rssUpdatedAt } : {}),
			} } : {}),
			sourceSha256: sha256(rawText),
			paragraphCount: story.paragraphs.length,
			paragraphTypes,
			images,
			embeds,
			links: extractLinks(story.paragraphs, pathsById),
		};
	}).sort((a, b) => a.publishedAt.localeCompare(b.publishedAt) || a.id.localeCompare(b.id));

	const imageIds = stories.flatMap(({ images }) => images.map(({ id }) => id));
	const allEmbeds = stories.flatMap(({ embeds }) => embeds);
	const authors = new Map();
	for (const story of stories) authors.set(story.author.id, story.author);
	const tags = new Set(stories.flatMap((story) => story.tags.map(({ slug }) => slug)));
	const summary = {
		stories: stories.length,
		authors: authors.size,
		tags: tags.size,
		imagePlacements: imageIds.length,
		uniqueImages: new Set(imageIds).size,
		embedPlacements: allEmbeds.length,
		uniqueEmbeds: new Set(allEmbeds.map(({ mediaResourceId }) => mediaResourceId)).size,
		bodyLinks: stories.reduce((total, story) => total + story.links.length, 0),
		internalStoryLinks: stories.reduce(
			(total, story) => total + story.links.filter((link) => link.internalStoryId).length,
			0,
		),
	};
	assertCounts(summary, options.allowCountChange);

	const inventory = {
		version: 1,
		publication: { id: MEDIUM_PUBLICATION_ID, name: 'Tinkercademy Build Log', mediumSlug: 'tinkertanker' },
		expectedBaseline: EXPECTED,
		summary,
		stories,
	};
	if (!options.dryRun) await writeJson(options.output, inventory);
	console.log(JSON.stringify({ output: options.dryRun ? null : options.output, offline: options.offline, ...summary }, null, 2));
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
