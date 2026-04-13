import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { parseFramerHandover } from './lib/framer.mjs';

const SITE_ORIGIN = 'https://tinkercademy.com';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const ARTIFACTS_DIR = path.join(ROOT, '_artifacts', 'crawl');
const HTML_DIR = path.join(ARTIFACTS_DIR, 'html');

const NAV_TEXT = new Set(['courses', 'about us', 'showcase', 'store', 'contact us']);
const FOOTER_SENTINELS = [
	'Sign up for our mailing list!',
	'Tinkercademy is the education brand of',
	'© 2026 Tinkertanker Pte Ltd.',
	'© 2025 Tinkertanker Pte Ltd.',
];
const SOCIAL_HOSTS = new Set([
	'x.com',
	'twitter.com',
	'facebook.com',
	'instagram.com',
	'linkedin.com',
	'github.com',
	'medium.com',
	'blog.tinkercademy.com',
]);
const SOCIAL_PROFILE_PATTERN =
	/^\/(@?[a-z0-9._-]+\/?)?$/i;

function cleanText(value) {
	return value.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function uniqueBy(items, keyFn) {
	const seen = new Set();
	return items.filter((item) => {
		const key = keyFn(item);
		if (!key || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function slugForPath(pagePath) {
	if (pagePath === '/') return 'index';
	return pagePath.replace(/^\/|\/$/g, '').replace(/\//g, '__');
}

function classifyPath(pagePath) {
	if (pagePath === '/') return 'root';
	if (pagePath.startsWith('/programmes/')) return 'programme';
	if (pagePath.startsWith('/tutorials/')) return 'tutorial';
	return 'static';
}

async function fetchText(url) {
	let lastError = null;

	for (let attempt = 1; attempt <= 4; attempt += 1) {
		try {
			const response = await fetch(url, {
				headers: {
					'user-agent': 'Mozilla/5.0 (compatible; Codex crawler)',
					accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				},
			});

			return {
				status: response.status,
				text: await response.text(),
				finalUrl: response.url,
			};
		} catch (error) {
			lastError = error;
			if (attempt === 4) break;
			await new Promise((resolve) => setTimeout(resolve, attempt * 500));
		}
	}

	throw lastError;
}

async function getSitemapUrls() {
	const { text } = await fetchText(`${SITE_ORIGIN}/sitemap.xml`);
	const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]).filter(Boolean);
	return uniqueBy(urls, (url) => url);
}

function extractHydration($) {
	const raw = $('#main').attr('data-framer-hydrate-v2');
	if (!raw) return null;

	try {
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

function extractSeo($) {
	const meta = (selector, attr = 'content') => $(selector).attr(attr) ?? null;
	return {
		title: cleanText($('title').first().text()),
		description: meta('meta[name="description"]'),
		canonical: meta('link[rel="canonical"]', 'href'),
		openGraph: {
			title: meta('meta[property="og:title"]'),
			description: meta('meta[property="og:description"]'),
			image: meta('meta[property="og:image"]'),
		},
		twitter: {
			title: meta('meta[name="twitter:title"]'),
			description: meta('meta[name="twitter:description"]'),
			image: meta('meta[name="twitter:image"]'),
		},
		robots: meta('meta[name="robots"]'),
	};
}

function extractAnchors($) {
	return uniqueBy(
		$('a[href]')
			.toArray()
			.map((element) => {
				const href = $(element).attr('href');
				if (!href) return null;
				try {
					const url = new URL(href, SITE_ORIGIN);
					return {
						label: cleanText($(element).text()),
						href: url.toString(),
						internal: url.origin === SITE_ORIGIN,
					};
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(anchor) => `${anchor.href}::${anchor.label}`,
	);
}

function extractNavLinks($) {
	return uniqueBy(
		$('nav a[href]')
			.toArray()
			.map((element) => {
				const href = $(element).attr('href');
				const label = cleanText($(element).text());
				if (!href || !label) return null;
				try {
					return { label, href: new URL(href, SITE_ORIGIN).toString() };
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(link) => `${link.href}::${link.label}`,
	);
}

function extractImages($) {
	return uniqueBy(
		$('img')
			.toArray()
			.map((element) => {
				const src = $(element).attr('src');
				if (!src) return null;
				try {
					const url = new URL(src, SITE_ORIGIN);
					return {
						src: url.toString(),
						alt: $(element).attr('alt') ?? '',
						width: $(element).attr('width') ?? null,
						height: $(element).attr('height') ?? null,
					};
				} catch {
					return null;
				}
			})
			.filter(Boolean),
		(image) => image.src,
	);
}

function extractAssetUrls($) {
	const assetUrls = new Set();
	const collect = (value, base = SITE_ORIGIN) => {
		if (!value || value.startsWith('data:') || value.startsWith('javascript:')) return;
		try {
			assetUrls.add(new URL(value, base).toString());
		} catch {
			// Ignore malformed asset references.
		}
	};

	$('[src]').each((_, element) => collect($(element).attr('src')));
	$('link[href], script[src]').each((_, element) => collect($(element).attr('href') ?? $(element).attr('src')));
	$('[srcset]').each((_, element) => {
		const srcset = $(element).attr('srcset') ?? '';
		for (const candidate of srcset.split(',')) {
			const [url] = candidate.trim().split(/\s+/);
			collect(url);
		}
	});

	return [...assetUrls].sort();
}

function extractContacts(anchors) {
	return anchors
		.filter((anchor) => anchor.href.startsWith('mailto:') || anchor.href.startsWith('tel:'))
		.map((anchor) => {
			if (anchor.href.startsWith('mailto:')) {
				return { type: 'email', value: anchor.href.replace('mailto:', '') };
			}
			return { type: 'phone', value: anchor.href.replace('tel:', '') };
		});
}

function isLikelySocialProfile(url) {
	const hostname = url.hostname.replace(/^www\./, '');
	if (!SOCIAL_HOSTS.has(hostname)) return false;
	if (hostname === 'blog.tinkercademy.com') return true;
	if (hostname === 'github.com') {
		return /^\/[a-z0-9._-]+\/?$/i.test(url.pathname);
	}
	return SOCIAL_PROFILE_PATTERN.test(url.pathname);
}

function extractSocialLinks(anchors) {
	return uniqueBy(
		anchors
			.filter((anchor) => {
				try {
					return isLikelySocialProfile(new URL(anchor.href));
				} catch {
					return false;
				}
			})
			.map((anchor) => {
				const hostname = new URL(anchor.href).hostname.replace(/^www\./, '');
				return {
					label: anchor.label || hostname,
					platform: hostname.split('.')[0],
					url: anchor.href,
				};
			}),
		(link) => link.url,
	);
}

function extractForms($, anchors) {
	const formNodes = $('form')
		.toArray()
		.map((element, index) => ({
			id: $(element).attr('id') ?? `form-${index + 1}`,
			action: $(element).attr('action') ?? null,
			method: ($(element).attr('method') ?? 'get').toLowerCase(),
		}));

	const providerLinks = anchors
		.filter((anchor) => /jotform|typeform|hubspot|airtable|formstack/i.test(anchor.href))
		.map((anchor, index) => ({
			id: `external-form-${index + 1}`,
			action: anchor.href,
			method: 'link',
			label: anchor.label,
		}));

	return uniqueBy([...formNodes, ...providerLinks], (form) => `${form.action}::${form.id}`);
}

function extractCtas(anchors) {
	return uniqueBy(
		anchors
			.filter((anchor) => anchor.label)
			.filter((anchor) => !NAV_TEXT.has(anchor.label.toLowerCase()))
			.filter((anchor) => !anchor.href.endsWith('#'))
			.filter((anchor) => !SOCIAL_HOSTS.has(new URL(anchor.href).hostname.replace(/^www\./, '')))
			.map((anchor) => ({
				label: anchor.label,
				url: anchor.href,
				type: anchor.href.startsWith('mailto:')
					? 'email'
					: anchor.href.startsWith('tel:')
						? 'phone'
						: /jotform|typeform|hubspot|airtable|formstack/i.test(anchor.href)
							? 'form'
							: anchor.internal
								? 'internal'
								: 'external',
			})),
		(cta) => `${cta.url}::${cta.label}`,
	);
}

function shouldStart(tag, text) {
	if (/^h[1-4]$/.test(tag)) return true;
	return text.length >= 40;
}

function extractContentBlocks($) {
	const blocks = [];
	let started = false;

	for (const element of $('#main').find('h1, h2, h3, h4, p, li').toArray()) {
		if ($(element).closest('nav').length) continue;
		const tag = element.tagName;
		if (tag === 'p' && $(element).closest('li').length) continue;
		const text = cleanText($(element).text());
		if (!text) continue;
		if (NAV_TEXT.has(text.toLowerCase())) continue;
		if (FOOTER_SENTINELS.some((sentinel) => text.includes(sentinel))) break;
		if (!started) {
			if (!shouldStart(tag, text)) continue;
			started = true;
		}
		const last = blocks.at(-1);
		if (last?.tag === tag && last?.text === text) continue;
		blocks.push({ tag, text });
	}

	return blocks;
}

async function crawlPage(url) {
	const { status, text: html, finalUrl } = await fetchText(url);
	const $ = load(html);
	const finalPath = new URL(finalUrl).pathname || '/';
	const anchors = extractAnchors($);
	const handoverRaw = $('script#\\__framer__handoverData').html() ?? null;

	await writeFile(path.join(HTML_DIR, `${slugForPath(finalPath)}.html`), html);

	return {
		url: finalUrl,
		path: finalPath,
		type: classifyPath(finalPath),
		status,
		seo: extractSeo($),
		hydrate: extractHydration($),
		navLinks: extractNavLinks($),
		links: anchors,
		images: extractImages($),
		assets: extractAssetUrls($),
		contacts: extractContacts(anchors),
		socialLinks: extractSocialLinks(anchors),
		forms: extractForms($, anchors),
		ctas: extractCtas(anchors),
		contentBlocks: extractContentBlocks($),
		framer: {
			hasHandover: Boolean(handoverRaw),
			structured: parseFramerHandover(handoverRaw),
		},
	};
}

async function mapPool(values, concurrency, mapper) {
	const results = new Array(values.length);
	let nextIndex = 0;

	await Promise.all(
		Array.from({ length: Math.min(concurrency, values.length) }, async () => {
			while (nextIndex < values.length) {
				const current = nextIndex;
				nextIndex += 1;
				results[current] = await mapper(values[current], current);
			}
		}),
	);

	return results;
}

await mkdir(HTML_DIR, { recursive: true });

const urls = await getSitemapUrls();
console.log(`Crawling ${urls.length} public routes from the sitemap...`);

const pages = await mapPool(urls, 6, async (url, index) => {
	console.log(`[${index + 1}/${urls.length}] ${url}`);
	return crawlPage(url);
});

const assetReferences = new Map();
for (const page of pages) {
	for (const asset of page.assets) {
		const current = assetReferences.get(asset) ?? { url: asset, pages: [] };
		current.pages.push(page.path);
		assetReferences.set(asset, current);
	}
}

const payload = {
	site: SITE_ORIGIN,
	crawledAt: new Date().toISOString(),
	pageCount: pages.length,
	pages,
	assets: [...assetReferences.values()].map((entry) => ({
		...entry,
		pages: [...new Set(entry.pages)].sort(),
	})),
};

await writeFile(path.join(ARTIFACTS_DIR, 'site.json'), JSON.stringify(payload, null, 2));
console.log(`Saved crawl output to ${path.join(ARTIFACTS_DIR, 'site.json')}`);
