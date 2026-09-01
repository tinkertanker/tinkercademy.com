#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';
import YAML from 'yaml';

import {
	MEDIUM_PUBLICATION_ID,
	normaliseMediumStory,
	renderInlineHtml,
	sha256,
} from './lib/medium.mjs';
import { readMediumRssStoryCache } from './lib/medium-rss.mjs';
import {
	applyImageReview,
	applyRightsReview,
	emptyReviewDecisions,
	placementKey,
	validateReviewDecisions,
} from './lib/medium-review.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const DEFAULT_CACHE = path.join(SCRIPTS_DIR, '_artifacts', 'medium', 'raw');
const DEFAULT_INVENTORY = path.join(ROOT, 'docs', 'migrations', 'medium', 'inventory.json');
const DEFAULT_CONTENT = path.join(ROOT, 'src', 'content', 'blog', 'medium');
const DEFAULT_MEDIA = path.join(ROOT, 'public', 'blog-media');
const DEFAULT_MEDIA_MANIFEST = path.join(ROOT, 'docs', 'migrations', 'medium', 'media-manifest.json');
const DEFAULT_EMBED_MANIFEST = path.join(ROOT, 'docs', 'migrations', 'medium', 'embed-manifest.json');
const DEFAULT_AUTHORS = path.join(ROOT, 'src', 'data', 'blog-authors.json');
const DEFAULT_REVIEW_DECISIONS = path.join(ROOT, 'docs', 'migrations', 'medium', 'review-decisions.json');
const DEFAULT_RSS_CACHE = path.join(DEFAULT_CACHE, 'rss', 'publication.xml');
const DEFAULT_RSS_STORIES = path.join(DEFAULT_CACHE, 'rss', 'stories');
const DEFAULT_RSS_OVERRIDES = path.join(ROOT, 'docs', 'migrations', 'medium', 'rss-source-overrides.json');

function parseArgs(argv) {
	const options = {
		offline: false,
		dryRun: false,
		inventory: DEFAULT_INVENTORY,
		cacheDir: DEFAULT_CACHE,
		contentDir: DEFAULT_CONTENT,
		mediaDir: DEFAULT_MEDIA,
		reviewDecisions: DEFAULT_REVIEW_DECISIONS,
	};
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index];
		if (argument === '--') continue;
		if (argument === '--offline') options.offline = true;
		else if (argument === '--dry-run') options.dryRun = true;
		else if (argument === '--inventory') options.inventory = path.resolve(argv[++index]);
		else if (argument === '--cache-dir') options.cacheDir = path.resolve(argv[++index]);
		else if (argument === '--content-dir') options.contentDir = path.resolve(argv[++index]);
		else if (argument === '--media-dir') options.mediaDir = path.resolve(argv[++index]);
		else if (argument === '--review-decisions') options.reviewDecisions = path.resolve(argv[++index]);
		else throw new Error(`Unknown argument: ${argument}`);
	}
	return options;
}

async function readJson(file) {
	return JSON.parse(await readFile(file, 'utf8'));
}

async function loadReviewDecisions(file) {
	try {
		return validateReviewDecisions(await readJson(file));
	} catch (error) {
		if (error?.code === 'ENOENT') return emptyReviewDecisions();
		throw error;
	}
}

async function writeJson(file, value) {
	await mkdir(path.dirname(file), { recursive: true });
	await writeFile(file, `${JSON.stringify(value, null, 2)}\n`);
}

function contentExtension(mimeType) {
	const extensions = new Map([
		['image/jpeg', 'jpg'],
		['image/png', 'png'],
		['image/gif', 'gif'],
		['image/webp', 'webp'],
	]);
	const extension = extensions.get(mimeType.toLowerCase());
	if (!extension) throw new Error(`Unsupported image content type: ${mimeType}`);
	return extension;
}

async function downloadImage(image, options) {
	const sourceUrl = `https://miro.medium.com/v2/${encodeURI(image.id)}`;
	const response = await fetch(sourceUrl, {
		headers: { 'User-Agent': 'TinkercademyMediumMigration/1.0 (+https://tinkercademy.com)' },
		redirect: 'follow',
	});
	if (!response.ok) throw new Error(`${sourceUrl} returned ${response.status}`);
	const bytes = Buffer.from(await response.arrayBuffer());
	if (bytes.length > 50 * 1024 * 1024) throw new Error(`Image ${image.id} exceeds the 50 MiB import limit`);
	const metadata = await sharp(bytes, { animated: true, limitInputPixels: 1_000_000_000 }).metadata();
	const responseType = (response.headers.get('content-type') || '').split(';')[0].toLowerCase();
	const inferredTypes = new Map([
		['jpeg', 'image/jpeg'],
		['png', 'image/png'],
		['gif', 'image/gif'],
		['webp', 'image/webp'],
	]);
	const mimeType = responseType.startsWith('image/') ? responseType : inferredTypes.get(metadata.format);
	if (!mimeType) throw new Error(`Could not identify image content type for ${image.id}`);
	const extension = contentExtension(mimeType);
	const digest = createHash('sha256').update(bytes).digest('hex');
	const filename = `${digest}.${extension}`;
	const destination = path.join(options.mediaDir, filename);
	const downloadedHeight = metadata.pageHeight ?? metadata.height;
	if (image.width && image.height && metadata.width && downloadedHeight) {
		const sourceRatio = image.width / image.height;
		const downloadedRatio = metadata.width / downloadedHeight;
		if (Math.abs(sourceRatio - downloadedRatio) / sourceRatio > 0.02) {
			throw new Error(`Downloaded aspect ratio for ${image.id} does not match ${image.width}×${image.height}`);
		}
	}
	if (!options.dryRun) {
		await mkdir(options.mediaDir, { recursive: true });
		try {
			const existing = await readFile(destination);
			if (createHash('sha256').update(existing).digest('hex') !== digest) throw new Error(`Hash collision at ${destination}`);
		} catch (error) {
			if (error?.code !== 'ENOENT') throw error;
			await writeFile(destination, bytes);
		}
	}
	return {
		sourceImageId: image.id,
		sourceUrl,
		localPath: `/blog-media/${filename}`,
		sha256: digest,
		mimeType,
		bytes: bytes.length,
		sourceWidth: image.width,
		sourceHeight: image.height,
		width: metadata.width ?? image.width,
		height: downloadedHeight ?? image.height,
		animated: mimeType === 'image/gif' && (metadata.pages ?? 1) > 1,
		frames: metadata.pages ?? 1,
	};
}

async function loadExistingAssets() {
	try {
		const manifest = await readJson(DEFAULT_MEDIA_MANIFEST);
		return new Map(manifest.assets.map((asset) => [asset.sourceImageId, asset]));
	} catch {
		return new Map();
	}
}

async function resolveAssets(stories, options) {
	const byImageId = new Map();
	for (const story of stories) {
		for (const image of story.images) {
			if (!byImageId.has(image.id)) byImageId.set(image.id, image);
		}
	}
	const existing = await loadExistingAssets();
	const assets = new Map();
	for (const [id, image] of [...byImageId].sort(([a], [b]) => a.localeCompare(b))) {
		const prior = existing.get(id);
		if (prior) {
			try {
				const file = path.join(ROOT, 'public', prior.localPath.replace(/^\//u, ''));
				const bytes = await readFile(file);
				if (sha256(bytes) !== prior.sha256) throw new Error(`Local asset hash mismatch: ${prior.localPath}`);
				assets.set(id, prior);
				continue;
			} catch (error) {
				if (options.offline) throw error;
			}
		}
		if (options.offline) throw new Error(`Offline media is missing ${id}`);
		assets.set(id, await downloadImage(image, options));
	}
	return assets;
}

function yamlFrontmatter(value) {
	return `---\n${YAML.stringify(value, { lineWidth: 0 }).trimEnd()}\n---\n`;
}

function imageAltDecision(paragraph) {
	const sourceAlt = paragraph.metadata?.alt?.trim();
	if (sourceAlt) return { decision: 'meaningful', alt: sourceAlt, source: 'medium-alt' };
	const caption = paragraph.text?.trim();
	if (caption) return { decision: 'meaningful', alt: caption, source: 'caption' };
	return { decision: 'review-required', alt: '', source: null };
}

function escapeHtmlAttribute(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('"', '&quot;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;');
}

function escapeCodeFence(text) {
	const longest = Math.max(0, ...[...text.matchAll(/`+/gu)].map(([run]) => run.length));
	return '`'.repeat(Math.max(3, longest + 1));
}

function renderStoryBody({ story, assetsById, mediaById, pathsById, usersById, reviewDecisions, usesMdx }) {
	const blocks = [];
	const altDecisions = [];
	let embedCount = 0;
	let skippedTitle = false;
	let index = 0;
	const block = (as, html, className = null) => usesMdx
		? `<ArticleLegacyBlock as="${as}" html={${JSON.stringify(html)}}${className ? ` className="${className}"` : ''} />`
		: `<${as}${className ? ` class="${className}"` : ''}>${html}</${as}>`;
	const listBlock = (as, items) => usesMdx
		? `<ArticleLegacyBlock as="${as}" items={${JSON.stringify(items)}} />`
		: `<${as}>\n${items.map((item) => `<li>${item}</li>`).join('\n')}\n</${as}>`;

	while (index < story.paragraphs.length) {
		const paragraph = story.paragraphs[index];
		const inline = () => renderInlineHtml(paragraph, pathsById, usersById);

		if (paragraph.type === 3 && !skippedTitle && paragraph.text.trim() === story.title.trim()) {
			skippedTitle = true;
			index += 1;
			continue;
		}

		if (paragraph.type === 9 || paragraph.type === 10) {
			const type = paragraph.type;
			const items = [];
			while (index < story.paragraphs.length && story.paragraphs[index].type === type) {
				items.push(renderInlineHtml(story.paragraphs[index], pathsById, usersById));
				index += 1;
			}
			const listTag = type === 9 ? 'ul' : 'ol';
			blocks.push(listBlock(listTag, items));
			continue;
		}

		switch (paragraph.type) {
			case 1:
				blocks.push(block('p', inline()));
				break;
			case 3:
				blocks.push(block('h2', inline()));
				break;
			case 4: {
				const asset = assetsById.get(paragraph.metadata?.id);
				if (!asset) throw new Error(`No local asset for ${paragraph.metadata?.id} in ${story.id}`);
				const reviewKey = placementKey({ storyId: story.id, paragraph: index, imageId: paragraph.metadata.id });
				const alt = applyImageReview(imageAltDecision(paragraph), reviewDecisions.images[reviewKey]);
				altDecisions.push({
					paragraph: index,
					imageId: paragraph.metadata.id,
					reviewKey,
					caption: paragraph.text || '',
					sourceAlt: paragraph.metadata.alt || '',
					sourceWidth: paragraph.metadata.originalWidth,
					sourceHeight: paragraph.metadata.originalHeight,
					isFeatured: paragraph.metadata.isFeatured === true,
					...alt,
				});
				const imageComment = story.embeds.length > 0
					? `{/* medium-image:${paragraph.metadata.id} alt-decision:${alt.decision} */}`
					: `<!-- medium-image:${paragraph.metadata.id} alt-decision:${alt.decision} -->`;
				const lines = [
					imageComment,
					`<img src="${asset.localPath}" alt="${escapeHtmlAttribute(alt.alt)}" width="${asset.width}" height="${asset.height}" loading="lazy" decoding="async" />`,
				];
				if (paragraph.text?.trim()) lines.push(block('p', `<em>${renderInlineHtml(paragraph, pathsById, usersById)}</em>`, 'medium-image-caption'));
				if (alt.credit) lines.push(block('p', `<em>Credit: ${renderInlineHtml({ text: alt.credit, markups: [] }, pathsById)}</em>`, 'medium-image-credit'));
				blocks.push(lines.join('\n\n'));
				break;
			}
			case 6:
			case 7:
				blocks.push(block('blockquote', inline()));
				break;
			case 8: {
				const fence = escapeCodeFence(paragraph.text || '');
				const language = paragraph.codeBlockMetadata?.lang || 'text';
				blocks.push(`${fence}${language}\n${paragraph.text || ''}\n${fence}`);
				break;
			}
			case 11: {
				const resourceId = paragraph.iframe?.mediaResourceId;
				const media = mediaById.get(resourceId);
				if (!media) throw new Error(`No cached embed metadata for ${resourceId}`);
				embedCount += 1;
				blocks.push(`<ArticleEmbed provider="${media.provider}" href={${JSON.stringify(media.href)}} title={${JSON.stringify(media.title || 'Embedded media')}} description={${JSON.stringify(media.description)}} captionHtml={${JSON.stringify(renderInlineHtml(paragraph, pathsById, usersById))}} />`);
				break;
			}
			case 13:
				blocks.push(block('h3', inline()));
				break;
			case 14: {
				blocks.push(block('aside', inline(), 'article-link-card'));
				break;
			}
			default:
				throw new Error(`Unsupported Medium paragraph type ${paragraph.type} in ${story.id}`);
		}
		index += 1;
	}

	return {
		body: blocks.join('\n\n').replace(/[ \t]+$/gmu, ''),
		altDecisions,
		embedCount,
		renderedParagraphs: story.paragraphs.length - (skippedTitle ? 1 : 0),
	};
}

async function main() {
	const options = parseArgs(process.argv.slice(2));
	const [inventory, reviewDecisions, rssOverrides] = await Promise.all([
		readJson(options.inventory),
		loadReviewDecisions(options.reviewDecisions),
		readJson(DEFAULT_RSS_OVERRIDES),
	]);
	if (inventory.publication?.id !== MEDIUM_PUBLICATION_ID) {
		throw new Error('Inventory is not the Tinkercademy Medium publication');
	}
	for (const [key, expected] of Object.entries(inventory.expectedBaseline ?? {})) {
		if (inventory.summary?.[key] !== expected) throw new Error(`Inventory baseline drift for ${key}`);
	}

	const rssStories = await readMediumRssStoryCache({
		feedFile: DEFAULT_RSS_CACHE,
		storiesDir: DEFAULT_RSS_STORIES,
		storyOverrides: rssOverrides.stories,
	});
	const rssById = new Map(rssStories.map((story) => [story.id, story]));
	const stories = [];
	for (const record of inventory.stories) {
		let source;
		let sourceText;
		if (record.source?.kind === 'medium-rss') {
			source = rssById.get(record.id);
			if (!source) throw new Error(`Cached RSS is missing ${record.id}`);
			sourceText = source.sourceItemXml;
		} else {
			const raw = await readJson(path.join(options.cacheDir, 'stories', `${record.id}.json`));
			sourceText = JSON.stringify(raw);
			source = normaliseMediumStory(raw);
		}
		if (sha256(sourceText) !== record.sourceSha256) throw new Error(`Source hash drift for ${record.id}`);
		stories.push({ ...record, ...source });
	}
	const pathsById = new Map(stories.map((story) => [story.id, story.legacyPath]));
	const usersById = new Map(stories.map((story) => [story.author.id, story.author]));

	const mediaById = new Map();
	for (const story of stories) {
		for (const embed of story.embeds) {
			const existing = mediaById.get(embed.mediaResourceId);
			if (existing && existing.href !== embed.href) throw new Error(`Embed metadata drift for ${embed.mediaResourceId}`);
			mediaById.set(embed.mediaResourceId, {
				id: embed.mediaResourceId,
				provider: embed.provider,
				href: embed.href,
				title: embed.title || '',
				description: embed.description || '',
				width: embed.width ?? null,
				height: embed.height ?? null,
			});
		}
	}

	const assetsById = await resolveAssets(stories, options);
	const placementsByImageId = new Map([...assetsById].map(([id]) => [id, []]));
	const embedPlacements = [];
	const contentFiles = [];
	let altReviewRequired = 0;
	let rightsReviewRequired = 0;
	let renderedParagraphs = 0;

	for (const story of stories) {
		const usesMdx = story.embeds.length > 0;
		const rendered = renderStoryBody({ story, assetsById, mediaById, pathsById, usersById, reviewDecisions, usesMdx });
		altReviewRequired += rendered.altDecisions.filter(({ decision }) => decision === 'review-required').length;
		const rightsStatus = applyRightsReview(story.rightsStatus, reviewDecisions.rights[story.legacyPath]);
		if (rightsStatus === 'review-required') rightsReviewRequired += 1;
		renderedParagraphs += rendered.renderedParagraphs;
		for (const decision of rendered.altDecisions) {
			placementsByImageId.get(decision.imageId).push({ storyId: story.id, legacyPath: story.legacyPath, ...decision });
		}
		for (const embed of story.embeds) embedPlacements.push({ storyId: story.id, legacyPath: story.legacyPath, ...embed });

		const featured = story.images.find(({ isFeatured }) => isFeatured) ?? story.images[0] ?? null;
		const featuredAsset = featured ? assetsById.get(featured.id) : null;
		const featuredDecision = featured
			? rendered.altDecisions.find(({ paragraph, imageId }) => paragraph === featured.paragraph && imageId === featured.id)
			: null;
		const frontmatter = {
			title: story.title,
			subtitle: story.subtitle || undefined,
			description: (story.subtitle || story.title).slice(0, 300),
			legacyPath: story.legacyPath,
			canonicalUrl: story.canonicalUrl,
			sourceMediumUrl: story.sourceMediumUrl,
			author: story.author,
			publishedAt: story.publishedAt,
			updatedAt: story.updatedAt,
			tags: story.tags,
			license: story.license,
			rightsStatus,
			heroImage: featuredAsset?.localPath,
			heroImageWidth: featuredAsset?.width,
			heroImageHeight: featuredAsset?.height,
			heroAlt: featuredDecision?.alt,
			heroAltDecision: featuredDecision?.decision,
			provenance: {
				mediumId: story.id,
				publicationId: MEDIUM_PUBLICATION_ID,
				sourceSha256: story.sourceSha256,
				...(story.source?.kind === 'medium-rss' ? {
					sourceKind: story.source.kind,
					sourceUrl: story.source.url,
					sourceCreator: story.source.creator,
				} : {}),
			},
			migration: {
				paragraphCount: story.paragraphs.length,
				imageCount: story.images.length,
				embedCount: story.embeds.length,
				altReviewRequired: rendered.altDecisions.filter(({ decision }) => decision === 'review-required').length,
			},
		};
		const importLine = usesMdx
			? "\nimport ArticleEmbed from '../../../components/articles/ArticleEmbed.astro';\nimport ArticleLegacyBlock from '../../../components/articles/ArticleLegacyBlock.astro';\n"
			: '';
		const contents = `${yamlFrontmatter(frontmatter)}${importLine}\n${rendered.body.trim()}\n`;
		const filename = `${story.legacyPath}.${usesMdx ? 'mdx' : 'md'}`;
		contentFiles.push({ filename, contents });
	}

	const assets = [...assetsById.values()].map((asset) => ({
		...asset,
		placements: placementsByImageId.get(asset.sourceImageId),
	})).sort((a, b) => a.sourceImageId.localeCompare(b.sourceImageId));
	const authors = [...new Map(stories.map(({ author }) => [author.id, author])).values()].sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
	const embedManifest = {
		version: 1,
		resources: [...mediaById.values()].sort((a, b) => a.id.localeCompare(b.id)),
		placements: embedPlacements,
	};
	const mediaManifest = {
		version: 1,
		summary: {
			assets: assets.length,
			placements: [...placementsByImageId.values()].reduce((total, placements) => total + placements.length, 0),
			animatedAssets: assets.filter(({ animated }) => animated).length,
			altReviewRequired,
		},
		assets,
	};

	if (!options.dryRun) {
		await rm(options.contentDir, { recursive: true, force: true });
		await mkdir(options.contentDir, { recursive: true });
		for (const file of contentFiles) await writeFile(path.join(options.contentDir, file.filename), file.contents);
		await writeJson(DEFAULT_MEDIA_MANIFEST, mediaManifest);
		await writeJson(DEFAULT_EMBED_MANIFEST, embedManifest);
		await writeJson(DEFAULT_AUTHORS, authors);
	}

	console.log(JSON.stringify({
		dryRun: options.dryRun,
		offline: options.offline,
		stories: contentFiles.length,
		markdown: contentFiles.filter(({ filename }) => filename.endsWith('.md')).length,
		mdx: contentFiles.filter(({ filename }) => filename.endsWith('.mdx')).length,
		uniqueAssets: assets.length,
		imagePlacements: mediaManifest.summary.placements,
		animatedAssets: mediaManifest.summary.animatedAssets,
		embedResources: embedManifest.resources.length,
		embedPlacements: embedManifest.placements.length,
		altReviewRequired,
		rightsReviewRequired,
		renderedParagraphs,
		authors: authors.length,
	}, null, 2));
}

main().catch((error) => {
	console.error(error instanceof Error ? error.stack : error);
	process.exitCode = 1;
});
