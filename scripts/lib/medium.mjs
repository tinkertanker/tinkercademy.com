import { createHash } from 'node:crypto';

export const BLOG_ORIGIN = 'https://tinkercademy.com/blog';
export const LEGACY_BLOG_ORIGIN = 'https://blog.tinkercademy.com';
export const MEDIUM_PUBLICATION_ID = 'ca1fc9543b6f';
export const MEDIUM_PUBLICATION_SLUG = 'tinkertanker';
export const PUBLICATION_LICENSE = 'All rights reserved';

const STORY_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

export function slugifyStoryTitle(title) {
	const slug = String(title)
		.normalize('NFKD')
		.replace(/\p{Mark}/gu, '')
		.toLowerCase()
		.replace(/&/gu, ' and ')
		.replace(/[’']/gu, '')
		.replace(/[^a-z0-9]+/gu, '-')
		.replace(/^-+|-+$/gu, '');
	if (!slug) throw new Error(`Story title does not produce a usable slug: ${title}`);
	return slug;
}

export function buildCanonicalUrl(publishedAt, slug) {
	if (!STORY_SLUG_PATTERN.test(slug)) throw new Error(`Invalid blog story slug: ${slug}`);
	const year = new Date(asIsoDate(publishedAt, 'publishedAt')).getUTCFullYear();
	return `${BLOG_ORIGIN}/${year}/${slug}/`;
}

export function buildLegacyBlogUrl(legacyPath) {
	if (!legacyPath || legacyPath.startsWith('/') || legacyPath.endsWith('/')) {
		throw new Error(`Invalid legacy story path: ${legacyPath}`);
	}
	return `${LEGACY_BLOG_ORIGIN}/${legacyPath}`;
}

export function buildSourceMediumUrl(legacyPath) {
	return `https://medium.com/${MEDIUM_PUBLICATION_SLUG}/${legacyPath}`;
}

export function parseMediumJson(text) {
	const start = text.indexOf('{');
	if (start < 0) throw new Error('Medium response did not contain JSON');
	return JSON.parse(text.slice(start));
}

export function sha256(value) {
	return createHash('sha256').update(value).digest('hex');
}

function asIsoDate(value, label) {
	const date = new Date(value);
	if (!Number.isFinite(date.getTime())) throw new Error(`Invalid ${label}`);
	return date.toISOString();
}

export function normaliseMediumStory(raw) {
	if (!raw?.success || !raw?.payload?.value) throw new Error('Invalid Medium story response');
	const value = raw.payload.value;
	if (value.homeCollectionId !== MEDIUM_PUBLICATION_ID) {
		throw new Error(`Story ${value.id ?? '<unknown>'} belongs to another publication`);
	}
	if (value.visibility !== 0 || value.virtuals?.noIndex === true) {
		throw new Error(`Story ${value.id ?? '<unknown>'} is not a public indexable story`);
	}

	const legacyPath = value.uniqueSlug;
	const legacyUrl = buildLegacyBlogUrl(legacyPath);
	if (value.canonicalUrl !== legacyUrl || value.webCanonicalUrl && value.webCanonicalUrl !== legacyUrl) {
		throw new Error(`Story ${value.id ?? '<unknown>'} canonical does not match its legacy URL`);
	}
	if (!legacyPath.endsWith(value.id)) {
		throw new Error(`Story ${value.id ?? '<unknown>'} legacy path does not contain its Medium ID`);
	}

	const user = raw.payload.references?.User?.[value.creatorId] ?? value.displayAuthor;
	if (!user?.name) throw new Error(`Story ${value.id} has no resolvable author`);
	const handle = user.username || null;
	const publishedAt = asIsoDate(value.firstPublishedAt, 'firstPublishedAt');
	const slug = slugifyStoryTitle(value.title);
	const paragraphs = value.content?.bodyModel?.paragraphs ?? [];
	const candidateSubtitle = value.content?.subtitle || value.virtuals?.subtitle || '';
	// Medium also fills subtitle with an automatic, truncated opening paragraph.
	const normaliseWhitespace = (text) => text.replace(/\s+/gu, ' ').trim();
	const summaryPrefix = normaliseWhitespace(candidateSubtitle.replace(/(?:…|\.{3})$/u, ''));
	const isExcerpt = summaryPrefix && paragraphs.some((paragraph) =>
		paragraph.type !== 4 && paragraph.type !== 13 && normaliseWhitespace(paragraph.text ?? '').startsWith(summaryPrefix),
	);
	const subtitle = isExcerpt ? '' : candidateSubtitle;

	return {
		id: value.id,
		title: value.title,
		subtitle,
		legacyPath,
		legacyUrl,
		slug,
		canonicalUrl: buildCanonicalUrl(publishedAt, slug),
		sourceMediumUrl: buildSourceMediumUrl(legacyPath),
		author: {
			id: value.creatorId,
			name: user.name,
			handle,
			profileUrl: handle ? `https://medium.com/@${handle}` : buildSourceMediumUrl(legacyPath),
		},
		createdAt: asIsoDate(value.createdAt, 'createdAt'),
		publishedAt,
		latestPublishedAt: asIsoDate(value.latestPublishedAt, 'latestPublishedAt'),
		updatedAt: asIsoDate(value.updatedAt, 'updatedAt'),
		tags: (value.virtuals?.tags ?? []).map((tag) => ({ name: tag.name, slug: tag.slug })),
		paragraphs: value.content?.bodyModel?.paragraphs ?? [],
		previewImage: value.virtuals?.previewImage ?? null,
		wordCount: value.virtuals?.wordCount ?? null,
		readingTime: value.virtuals?.readingTime ?? null,
		mediumLicenseCode: value.license,
		license: PUBLICATION_LICENSE,
		rightsStatus: 'review-required',
	};
}

export function rewriteInternalStoryHref(href, destinationsById) {
	if (!href) return null;
	if (/^source:https?:\/\//iu.test(href)) href = href.slice('source:'.length);
	if (/^https?:\/\/get hacking\.com(?:\/|$)/iu.test(href)) href = href.replace('get hacking.com', 'gethacking.com');
	for (const [id, destination] of destinationsById) {
		if (href.includes(id)) return destination;
	}
	try {
		const url = new URL(href);
		if ((url.hostname === 'google.com' || url.hostname.endsWith('.google.com')) && url.pathname === '/url') {
			const target = url.searchParams.get('url') || url.searchParams.get('q');
			if (target && ['http:', 'https:'].includes(new URL(target).protocol)) return target;
		}
	} catch {
		// Leave malformed and relative values for safeHref to validate in context.
	}
	return href;
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function safeHref(value) {
	if (!value) return null;
	try {
		const url = new URL(value, BLOG_ORIGIN);
		return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? value : null;
	} catch {
		return null;
	}
}

function markupTags(markup, destinationsById, usersById) {
	if (markup.type === 1) return ['<strong>', '</strong>'];
	if (markup.type === 2) return ['<em>', '</em>'];
	if (markup.type === 10) return ['<code>', '</code>'];
	if (markup.type !== 3) return ['', ''];

	const mentionedUser = markup.userId ? usersById?.get(markup.userId) : null;
	const sourceHref = markup.href || (mentionedUser?.handle ? `https://medium.com/@${mentionedUser.handle}` : null);
	const href = safeHref(rewriteInternalStoryHref(sourceHref, destinationsById));
	return href ? [`<a href="${escapeHtml(href)}">`, '</a>'] : ['', ''];
}

export function renderInlineHtml(paragraph, destinationsById, usersById = new Map()) {
	const text = String(paragraph.text ?? '');
	const markups = (paragraph.markups ?? []).filter((markup) =>
		Number.isInteger(markup.start) && Number.isInteger(markup.end) && markup.start < markup.end,
	);
	const boundaries = [...new Set([0, text.length, ...markups.flatMap(({ start, end }) => [start, end])])]
		.filter((index) => index >= 0 && index <= text.length)
		.sort((a, b) => a - b);

	let result = '';
	for (let index = 0; index < boundaries.length - 1; index += 1) {
		const start = boundaries[index];
		const end = boundaries[index + 1];
		const active = markups
			.filter((markup) => markup.start <= start && markup.end >= end)
			.sort((a, b) => a.start - b.start || b.end - a.end || a.type - b.type);
		const tags = active.map((markup) => markupTags(markup, destinationsById, usersById));
		result += tags.map(([open]) => open).join('');
		result += escapeHtml(text.slice(start, end)).replaceAll('\n', '<br />');
		result += tags.reverse().map(([, close]) => close).join('');
	}
	return result;
}

export function classifyEmbedProvider(href) {
	try {
		const host = new URL(href).hostname.toLowerCase().replace(/^www\./u, '');
		if (host === 'youtu.be' || host === 'youtube.com' || host.endsWith('.youtube.com')) return 'youtube';
		if (host === 'gist.github.com') return 'github-gist';
		if (host === 'giphy.com' || host.endsWith('.giphy.com')) return 'giphy';
		if (host === 'twitter.com' || host.endsWith('.twitter.com') || host === 'x.com' || host.endsWith('.x.com')) return 'twitter';
		if (host === 'instagram.com' || host.endsWith('.instagram.com')) return 'instagram';
		return 'external-link';
	} catch {
		return 'external-link';
	}
}
