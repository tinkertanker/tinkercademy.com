import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import { load } from 'cheerio';

import {
	BLOG_ORIGIN,
	MEDIUM_PUBLICATION_ID,
	PUBLICATION_LICENSE,
	buildCanonicalUrl,
	buildSourceMediumUrl,
	sha256,
} from './medium.mjs';

const RSS_SOURCE_URL = 'https://medium.com/feed/tinkertanker';
const MARKUP_TYPES = new Map([
	['strong', 1],
	['b', 1],
	['em', 2],
	['i', 2],
	['a', 3],
	['code', 10],
]);

function asIsoDate(value, label) {
	const date = new Date(value);
	if (!Number.isFinite(date.getTime())) throw new Error(`Invalid RSS ${label}`);
	return date.toISOString();
}

function inlineText($, element) {
	let text = '';
	const markups = [];
	const visit = (node) => {
		if (node.type === 'text') {
			text += node.data ?? '';
			return;
		}
		if (node.type !== 'tag') return;
		if (node.tagName === 'br') {
			text += '\n';
			return;
		}
		const start = text.length;
		for (const child of node.children ?? []) visit(child);
		const end = text.length;
		const type = MARKUP_TYPES.get(node.tagName);
		if (type && end > start) {
			const markup = { type, start, end };
			if (type === 3 && $(node).attr('href')) markup.href = $(node).attr('href');
			markups.push(markup);
		}
	};
	for (const child of element.children ?? []) visit(child);
	return { text, markups: markups.sort((a, b) => a.start - b.start || b.end - a.end || a.type - b.type) };
}

function unwrapEmbedly(value) {
	try {
		const url = new URL(value);
		if (url.hostname === 'cdn.embedly.com') return url.searchParams.get('url') || url.searchParams.get('src') || value;
	} catch {
		// The verifier will treat malformed values as non-clickable.
	}
	return value;
}

function imageIdFromUrl(value) {
	try {
		const url = new URL(value);
		const match = url.pathname.match(/\/(?:max|fit)\/\d+\/(.+)$/u);
		if (match?.[1]) return decodeURIComponent(match[1]);
	} catch {
		// Fall through to a clear source error.
	}
	throw new Error(`Unsupported Medium RSS image URL: ${value}`);
}

function parseBody(html) {
	const $ = load(html);
	const paragraphs = [];
	let imageCount = 0;
	for (const element of $('body').children().toArray()) {
		const node = $(element);
		switch (element.tagName) {
			case 'p': {
				const paragraph = inlineText($, element);
				if (/ was originally published in Tinkercademy Build Log on Medium/iu.test(paragraph.text)) break;
				if (paragraph.text.trim()) paragraphs.push({ type: 1, ...paragraph });
				break;
			}
			case 'h3':
			case 'h4':
				paragraphs.push({ type: 13, ...inlineText($, element) });
				break;
			case 'blockquote':
				paragraphs.push({ type: 6, ...inlineText($, element) });
				break;
			case 'pre':
				paragraphs.push({ type: 8, text: node.text(), markups: [] });
				break;
			case 'ul':
			case 'ol': {
				const type = element.tagName === 'ul' ? 9 : 10;
				for (const item of node.children('li').toArray()) paragraphs.push({ type, ...inlineText($, item) });
				break;
			}
			case 'figure': {
				const image = node.find('img').first();
				const src = image.attr('src');
				if (!src) throw new Error('Medium RSS figure has no image source');
				const captionElement = node.find('figcaption').first()[0];
				const caption = captionElement ? inlineText($, captionElement) : { text: '', markups: [] };
				paragraphs.push({
					type: 4,
					...caption,
					metadata: {
						id: imageIdFromUrl(src),
						alt: image.attr('alt') || '',
						isFeatured: imageCount === 0,
					},
				});
				imageCount += 1;
				break;
			}
			case 'iframe': {
				const href = unwrapEmbedly(node.attr('src'));
				const mediaResourceId = `rss-${sha256(href).slice(0, 24)}`;
				paragraphs.push({
					type: 11,
					text: '',
					markups: [],
					iframe: {
						mediaResourceId,
						href,
						iframeWidth: Number(node.attr('width')) || null,
						iframeHeight: Number(node.attr('height')) || null,
					},
				});
				break;
			}
			default:
				// Medium adds a 1×1 tracking image and syndication footer after the body.
				if (!['img', 'hr'].includes(element.tagName)) {
					throw new Error(`Unsupported Medium RSS body element: ${element.tagName}`);
				}
		}
	}
	return paragraphs;
}

function applyTextReplacements(paragraphs, replacements = []) {
	for (const replacement of replacements) {
		if (!replacement?.from || typeof replacement.to !== 'string') {
			throw new Error('RSS text replacements require non-empty from and string to values');
		}
		if (replacement.from.length !== replacement.to.length) {
			throw new Error(`RSS text replacement must preserve inline markup offsets: ${replacement.from}`);
		}
	}
	return paragraphs.map((paragraph) => ({
		...paragraph,
		...(typeof paragraph.text === 'string' ? {
			text: replacements.reduce((text, replacement) => text.replaceAll(replacement.from, replacement.to), paragraph.text),
		} : {}),
	}));
}

function authorFor(item, override = {}) {
	const sourceCreator = item.sourceCreator.trim();
	const handle = Object.hasOwn(override.author ?? {}, 'handle')
		? override.author.handle
		: (/^[A-Za-z0-9_.-]+$/u.test(sourceCreator) ? sourceCreator : null);
	return {
		id: override.author?.id ?? `rss-${sha256(sourceCreator.toLowerCase()).slice(0, 12)}`,
		name: override.author?.name ?? sourceCreator,
		handle,
		...(override.author?.profileUrl || handle ? {
			profileUrl: override.author?.profileUrl ?? `https://medium.com/@${handle}`,
		} : {}),
	};
}

export function parseMediumRss(xml, options = {}) {
	const $ = load(xml, { xmlMode: true });
	return $('channel > item').toArray().map((element) => {
		const item = $(element);
		const guid = item.find('guid').first().text().trim();
		const id = guid.match(/\/p\/([a-f0-9]+)$/u)?.[1];
		if (!id) throw new Error(`Invalid Medium RSS story GUID: ${guid}`);
		const link = new URL(item.find('link').first().text().trim());
		if (link.origin !== BLOG_ORIGIN) throw new Error(`RSS story ${id} has an unexpected origin`);
		const legacyPath = link.pathname.replace(/^\//u, '').replace(/\/$/u, '');
		if (!legacyPath.endsWith(id)) throw new Error(`RSS story ${id} has an invalid legacy path`);
		const sourceCreator = item.find('dc\\:creator').first().text().trim();
		const rssPublishedAt = asIsoDate(item.find('pubDate').first().text(), 'pubDate');
		const rssUpdatedAt = asIsoDate(item.find('atom\\:updated').first().text(), 'atom:updated');
		const override = options.storyOverrides?.[id] ?? {};
		const publishedAt = override.publishedAt ? asIsoDate(override.publishedAt, 'publishedAt override') : rssUpdatedAt;
		const publishedAtPrecision = override.publishedAtPrecision;
		if (publishedAtPrecision && publishedAtPrecision !== 'month') {
			throw new Error(`Unsupported RSS publication-date precision for ${id}`);
		}
		if (publishedAtPrecision === 'month' && !publishedAt.endsWith('-01T00:00:00.000Z')) {
			throw new Error(`Month-precision RSS publication date must use the first UTC day for ${id}`);
		}
		const paragraphs = applyTextReplacements(
			parseBody(item.find('content\\:encoded').first().text()),
			override.textReplacements,
		);
		const words = paragraphs.reduce((total, paragraph) => total + (paragraph.text?.trim().split(/\s+/u).filter(Boolean).length ?? 0), 0);
		const title = override.title ?? item.find('title').first().text().trim();
		if (!title.trim()) throw new Error(`RSS story ${id} has an empty title`);
		const sourceItemXml = $.html(element);
		return {
			id,
			title,
			subtitle: '',
			legacyPath,
			canonicalUrl: buildCanonicalUrl(legacyPath),
			sourceMediumUrl: buildSourceMediumUrl(legacyPath),
			author: authorFor({ sourceCreator }, override),
			sourceCreator,
			createdAt: publishedAt,
			publishedAt,
			...(publishedAtPrecision ? { publishedAtPrecision } : {}),
			latestPublishedAt: publishedAt,
			updatedAt: rssUpdatedAt,
			rssPublishedAt,
			rssUpdatedAt,
			tags: [],
			paragraphs,
			previewImage: null,
			wordCount: words,
			readingTime: words / 265,
			mediumLicenseCode: null,
			license: PUBLICATION_LICENSE,
			rightsStatus: 'review-required',
			sourceKind: 'medium-rss',
			sourceUrl: RSS_SOURCE_URL,
			sourceItemSha256: sha256(sourceItemXml),
			sourceItemXml,
			publicationId: MEDIUM_PUBLICATION_ID,
		};
	});
}

export function parseMediumRssItem(itemXml, options = {}) {
	const xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0"><channel>${itemXml}</channel></rss>`;
	const stories = parseMediumRss(xml, options);
	if (stories.length !== 1) throw new Error('Cached Medium RSS item must contain exactly one story');
	return stories[0];
}

export async function readMediumRssStoryCache({ feedFile, storiesDir, storyOverrides }) {
	const current = parseMediumRss(await readFile(feedFile, 'utf8'), { storyOverrides });
	const stories = new Map(current.map((story) => [story.id, story]));
	let names = [];
	try {
		names = (await readdir(storiesDir)).filter((name) => name.endsWith('.json')).sort();
	} catch (error) {
		if (error?.code !== 'ENOENT') throw error;
	}
	for (const name of names) {
		const record = JSON.parse(await readFile(path.join(storiesDir, name), 'utf8'));
		if (record.version !== 1 || record.sourceKind !== 'medium-rss' || typeof record.itemXml !== 'string') {
			throw new Error(`Invalid cached Medium RSS story: ${name}`);
		}
		if (record.itemSha256 !== sha256(record.itemXml)) throw new Error(`Cached Medium RSS story hash drift: ${name}`);
		const story = parseMediumRssItem(record.itemXml, { storyOverrides });
		if (`${story.id}.json` !== name) throw new Error(`Cached Medium RSS story filename drift: ${name}`);
		stories.set(story.id, story);
	}
	return [...stories.values()];
}
