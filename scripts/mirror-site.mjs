import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_OUTPUT_ROOT = path.join(ROOT, '..', 'output', 'mirrors');
const USER_AGENT = 'Mozilla/5.0 (compatible; tinkercademy mirror bot)';
const PAGE_CONCURRENCY = 6;
const ASSET_CONCURRENCY = 12;
const RETRIES = 3;
const RETRY_DELAY_MS = 500;
const REQUEST_TIMEOUT_MS = 20_000;
const ASSET_EXTENSIONS = new Set([
	'.avif', '.bmp', '.css', '.eot', '.gif', '.ico', '.jpeg', '.jpg', '.js', '.json', '.mjs', '.mp3', '.mp4',
	'.ogg', '.otf', '.pdf', '.png', '.svg', '.ttf', '.txt', '.wasm', '.webm', '.webmanifest', '.webp', '.woff', '.woff2', '.xml',
]);
const ASSET_MIME_SNIPPETS = [
	'application/javascript', 'application/json', 'application/manifest+json', 'application/wasm',
	'image/', 'text/css', 'text/javascript', 'text/xml', 'font/', 'audio/', 'video/',
];
const HTML_MIME_SNIPPETS = ['text/html', 'application/xhtml+xml'];
const XML_MIME_SNIPPETS = ['application/xml', 'text/xml'];

function parseArgs(argv) {
	const options = { origin: null, output: null };
	for (let index = 2; index < argv.length; index += 1) {
		const token = argv[index];
		if (token === '--origin') {
			options.origin = argv[index + 1] ?? null;
			index += 1;
			continue;
		}
		if (token === '--output') {
			options.output = argv[index + 1] ?? null;
			index += 1;
			continue;
		}
		if (!options.origin && !token.startsWith('--')) options.origin = token;
	}
	if (!options.origin) throw new Error('Usage: node scripts/mirror-site.mjs --origin <url> [--output <dir>]');
	const originUrl = new URL(options.origin);
	originUrl.hash = '';
	originUrl.pathname ||= '/';
	return {
		origin: originUrl.origin,
		startUrl: originUrl.toString(),
		outputDir: options.output ? path.resolve(process.cwd(), options.output) : path.join(DEFAULT_OUTPUT_ROOT, originUrl.hostname),
	};
}

function stripHash(url) {
	const next = new URL(url.toString());
	next.hash = '';
	return next.toString();
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function cleanQuerySuffix(search) {
	if (!search) return '';
	return `__q_${Buffer.from(search).toString('base64url').slice(0, 24)}`;
}

function extensionForContentType(contentType) {
	const mime = contentType.split(';', 1)[0].trim().toLowerCase();
	if (mime === 'text/html') return '.html';
	if (mime === 'text/css') return '.css';
	if (mime === 'application/javascript' || mime === 'text/javascript') return '.js';
	if (mime === 'application/json') return '.json';
	if (mime === 'application/manifest+json') return '.webmanifest';
	if (mime === 'application/xml' || mime === 'text/xml') return '.xml';
	if (mime === 'image/svg+xml') return '.svg';
	if (mime === 'image/png') return '.png';
	if (mime === 'image/jpeg') return '.jpg';
	if (mime === 'image/webp') return '.webp';
	if (mime === 'image/x-icon') return '.ico';
	if (mime === 'font/woff2') return '.woff2';
	if (mime === 'font/woff') return '.woff';
	if (mime === 'font/ttf') return '.ttf';
	if (mime === 'font/otf') return '.otf';
	if (mime === 'application/wasm') return '.wasm';
	return '';
}

function looksLikeHtml(url) {
	const { pathname } = new URL(url);
	const extension = path.extname(pathname).toLowerCase();
	return !extension || extension === '.html';
}

function looksLikeAsset(url) {
	const { pathname } = new URL(url);
	const extension = path.extname(pathname).toLowerCase();
	return Boolean(extension && ASSET_EXTENSIONS.has(extension));
}

function isHtmlContentType(contentType) {
	const value = contentType.toLowerCase();
	return HTML_MIME_SNIPPETS.some((snippet) => value.includes(snippet));
}

function isXmlContentType(contentType) {
	const value = contentType.toLowerCase();
	return XML_MIME_SNIPPETS.some((snippet) => value.includes(snippet));
}

function isCssContentType(contentType) {
	return contentType.toLowerCase().includes('text/css');
}

function isJsContentType(contentType) {
	const value = contentType.toLowerCase();
	return value.includes('javascript') || value.includes('ecmascript');
}

function isAssetContentType(contentType) {
	const value = contentType.toLowerCase();
	return ASSET_MIME_SNIPPETS.some((snippet) => value.includes(snippet));
}

function shouldIgnoreUrl(raw) {
	return !raw || raw.startsWith('data:') || raw.startsWith('javascript:') || raw.startsWith('mailto:') || raw.startsWith('tel:');
}

function normaliseUrl(raw, base) {
	if (shouldIgnoreUrl(raw)) return null;
	try {
		return stripHash(new URL(raw, base));
	} catch {
		return null;
	}
}

function safePathForUrl(url, contentType = '', origin = '') {
	const parsed = new URL(url);
	let pathname = decodeURIComponent(parsed.pathname);
	if (!pathname || pathname.endsWith('/')) pathname = `${pathname || '/'}index`;
	const querySuffix = cleanQuerySuffix(parsed.search);
	if (!path.extname(pathname)) pathname += extensionForContentType(contentType) || (looksLikeHtml(url) ? '.html' : '');
	if (querySuffix) {
		const extension = path.extname(pathname);
		const basename = pathname.slice(0, pathname.length - extension.length);
		pathname = `${basename}${querySuffix}${extension}`;
	}
	const relativePath = pathname.replace(/^\//, '');
	if (parsed.origin === origin) return relativePath;
	return path.join(parsed.hostname, relativePath);
}

function unique(items) {
	return [...new Set(items.filter(Boolean))];
}

function extractFromCss(cssText, baseUrl) {
	const discovered = [];
	for (const match of cssText.matchAll(/@import\s+(?:url\()?['"]?([^'"\)\s]+)['"]?\)?/g)) {
		discovered.push(normaliseUrl(match[1], baseUrl));
	}
	for (const match of cssText.matchAll(/url\(([^)]+)\)/g)) {
		const raw = match[1].trim().replace(/^['"]|['"]$/g, '');
		discovered.push(normaliseUrl(raw, baseUrl));
	}
	return unique(discovered);
}

function extractFromJs(scriptText, baseUrl) {
	const discovered = [];
	const patterns = [
		/\bimport\s+(?:[^'"()]+?\s+from\s+)?['"]([^'"]+)['"]/g,
		/\bexport\s+[^'"()]+?\s+from\s+['"]([^'"]+)['"]/g,
		/\bimport\(\s*['"]([^'"]+)['"]\s*\)/g,
		/new\s+URL\(\s*['"]([^'"]+)['"]\s*,\s*import\.meta\.url\s*\)/g,
		/\bfetch\(\s*['"]([^'"]+)['"]\s*\)/g,
		/\b(?:Worker|SharedWorker)\(\s*['"]([^'"]+)['"]\s*\)/g,
	];
	for (const pattern of patterns) {
		for (const match of scriptText.matchAll(pattern)) discovered.push(normaliseUrl(match[1], baseUrl));
	}
	return unique(discovered);
}

function extractPageLinks(html, pageUrl, origin) {
	const $ = load(html);
	const pages = [];
	const assets = [];
	const addAsset = (raw, base = pageUrl) => {
		const next = normaliseUrl(raw, base);
		if (next) assets.push(next);
	};
	const addPage = (raw) => {
		const next = normaliseUrl(raw, pageUrl);
		if (!next) return;
		const url = new URL(next);
		if (url.origin !== origin || !looksLikeHtml(next)) return;
		pages.push(next);
	};
	$('a[href]').each((_, element) => addPage($(element).attr('href')));
	$('img[src], script[src], iframe[src], source[src], video[src], audio[src], embed[src], object[data]').each((_, element) => {
		addAsset($(element).attr('src') ?? $(element).attr('data'));
	});
	$('link[href]').each((_, element) => {
		const rel = ($(element).attr('rel') ?? '').toLowerCase();
		if (rel.includes('preconnect') || rel.includes('dns-prefetch') || rel.includes('canonical') || rel.includes('alternate')) return;
		addAsset($(element).attr('href'));
	});
	$('meta[content]').each((_, element) => {
		const value = $(element).attr('content') ?? '';
		if (/^https?:\/\//i.test(value)) addAsset(value);
	});
	$('[srcset]').each((_, element) => {
		const srcset = $(element).attr('srcset') ?? '';
		for (const candidate of srcset.split(',')) {
			const [raw] = candidate.trim().split(/\s+/);
			addAsset(raw);
		}
	});
	$('[style]').each((_, element) => {
		for (const asset of extractFromCss($(element).attr('style') ?? '', pageUrl)) assets.push(asset);
	});
	$('style').each((_, element) => {
		for (const asset of extractFromCss($(element).html() ?? '', pageUrl)) assets.push(asset);
	});
	return { pages: unique(pages), assets: unique(assets) };
}

async function fetchWithRetries(url) {
	let lastError = null;
	for (let attempt = 1; attempt <= RETRIES; attempt += 1) {
		try {
			return await fetch(url, {
				signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
				redirect: 'follow',
				headers: { 'user-agent': USER_AGENT, accept: '*/*' },
			});
		} catch (error) {
			lastError = error;
			if (attempt === RETRIES) break;
			await sleep(RETRY_DELAY_MS * attempt);
		}
	}
	throw lastError;
}

async function exists(filepath) {
	try {
		const info = await stat(filepath);
		return info.size > 0;
	} catch {
		return false;
	}
}

async function saveResponse(outputDir, finalUrl, contentType, buffer) {
	const relativePath = safePathForUrl(finalUrl, contentType);
	const absolutePath = path.join(outputDir, relativePath);
	await mkdir(path.dirname(absolutePath), { recursive: true });
	await writeFile(absolutePath, buffer);
	return relativePath;
}

async function maybeReadText(buffer, contentType) {
	if (isHtmlContentType(contentType) || isCssContentType(contentType) || isJsContentType(contentType) || isXmlContentType(contentType) || contentType.includes('json')) {
		return buffer.toString('utf8');
	}
	return null;
}

function rewriteCssUrls(value, pageUrl, absolutePath, pathForUrl) {
	return value.replace(/url\(([^)]+)\)/g, (full, rawValue) => {
		const unwrapped = rawValue.trim().replace(/^['"]|['"]$/g, '');
		const resolved = normaliseUrl(unwrapped, pageUrl);
		if (!resolved) return full;
		const targetPath = pathForUrl(resolved);
		if (!targetPath) return full;
		const next = path.relative(path.dirname(absolutePath), targetPath) || '.';
		const quote = rawValue.trim().startsWith('"') ? '"' : rawValue.trim().startsWith("'") ? "'" : '';
		return `url(${quote}${next}${quote})`;
	});
}

async function runQueue(items, concurrency, worker) {
	const queue = [...items];
	let active = 0;
	await new Promise((resolve, reject) => {
		const pump = () => {
			if (queue.length === 0 && active === 0) return resolve();
			while (active < concurrency && queue.length > 0) {
				const item = queue.shift();
				active += 1;
				Promise.resolve(worker(item)).then(() => {
					active -= 1;
					pump();
				}).catch(reject);
			}
		};
		pump();
	});
}

class MirrorCrawler {
	constructor({ origin, startUrl, outputDir }) {
		this.origin = origin;
		this.startUrl = startUrl;
		this.outputDir = outputDir;
		this.manifestPath = path.join(outputDir, 'manifest.json');
		this.pagesToVisit = [];
		this.assetsToVisit = [];
		this.seenPages = new Set();
		this.seenAssets = new Set();
		this.entries = [];
	}

	pathForUrl(url, contentType = '') {
		return safePathForUrl(url, contentType, this.origin);
	}

	enqueuePage(url, referrer = null) {
		const next = stripHash(url);
		if (this.seenPages.has(next)) return;
		this.seenPages.add(next);
		this.pagesToVisit.push({ url: next, referrer });
	}

	enqueueAsset(url, referrer = null) {
		const next = stripHash(url);
		if (this.seenAssets.has(next)) return;
		this.seenAssets.add(next);
		this.assetsToVisit.push({ url: next, referrer });
	}

	async seedFromSitemap() {
		const sitemapUrl = `${this.origin}/sitemap.xml`;
		try {
			const response = await fetchWithRetries(sitemapUrl);
			if (!response.ok) return;
			const text = await response.text();
			for (const match of text.matchAll(/<loc>(.*?)<\/loc>/g)) {
				const candidate = normaliseUrl(match[1], sitemapUrl);
				if (candidate && new URL(candidate).origin === this.origin && looksLikeHtml(candidate)) this.enqueuePage(candidate, sitemapUrl);
			}
		} catch {
			// Missing sitemap support is fine.
		}
	}

	async fetchEntry(kind, job) {
		const response = await fetchWithRetries(job.url);
		const finalUrl = stripHash(response.url);
		const contentType = response.headers.get('content-type') ?? 'application/octet-stream';
		const buffer = Buffer.from(await response.arrayBuffer());
		const relativePath = this.pathForUrl(finalUrl, contentType);
		const absolutePath = path.join(this.outputDir, relativePath);
		await mkdir(path.dirname(absolutePath), { recursive: true });
		await writeFile(absolutePath, buffer);
		const entry = { kind, url: finalUrl, status: response.status, contentType, path: relativePath, referrer: job.referrer };
		this.entries.push(entry);
		return { entry, finalUrl, contentType, buffer };
	}

	async processPage(job) {
		let fetched;
		try {
			fetched = await this.fetchEntry('page', job);
		} catch (error) {
			this.entries.push({ kind: 'page', url: job.url, status: null, error: String(error), referrer: job.referrer });
			return null;
		}
		const { entry, finalUrl, contentType, buffer } = fetched;
		const text = await maybeReadText(buffer, contentType);
		if (!text || !isHtmlContentType(contentType)) return entry;
		const { pages, assets } = extractPageLinks(text, finalUrl, this.origin);
		for (const page of pages) this.enqueuePage(page, finalUrl);
		for (const asset of assets) this.enqueueAsset(asset, finalUrl);
		return entry;
	}

	async processAsset(job) {
		const cachedPath = path.join(this.outputDir, this.pathForUrl(job.url));
		if (await exists(cachedPath)) {
			this.entries.push({ kind: 'asset', url: job.url, status: 200, contentType: 'cached', path: path.relative(this.outputDir, cachedPath), referrer: job.referrer, cached: true });
			return;
		}
		let fetched;
		try {
			fetched = await this.fetchEntry('asset', job);
		} catch (error) {
			this.entries.push({ kind: 'asset', url: job.url, status: null, error: String(error), referrer: job.referrer });
			return null;
		}
		const { entry, finalUrl, contentType, buffer } = fetched;
		const text = await maybeReadText(buffer, contentType);
		if (!text) return entry;
		let discovered = [];
		if (isCssContentType(contentType)) discovered = extractFromCss(text, finalUrl);
		else if (isJsContentType(contentType)) discovered = extractFromJs(text, finalUrl);
		else if (isXmlContentType(contentType) && finalUrl.endsWith('/sitemap.xml')) {
			for (const match of text.matchAll(/<loc>(.*?)<\/loc>/g)) {
				const candidate = normaliseUrl(match[1], finalUrl);
				if (candidate && new URL(candidate).origin === this.origin && looksLikeHtml(candidate)) this.enqueuePage(candidate, finalUrl);
			}
		}
		for (const discoveredUrl of discovered) {
			if (!discoveredUrl) continue;
			const parsed = new URL(discoveredUrl);
			if (parsed.origin === this.origin && looksLikeHtml(discoveredUrl)) {
				this.enqueuePage(discoveredUrl, finalUrl);
				continue;
			}
			if (looksLikeAsset(discoveredUrl) || parsed.origin !== this.origin || isAssetContentType(contentType)) this.enqueueAsset(discoveredUrl, finalUrl);
		}
		return entry;
	}

	async rewriteMirroredFiles() {
		const successfulEntries = this.entries.filter((entry) => entry.path && !entry.error);
		const urlToPath = new Map(successfulEntries.map((entry) => [entry.url, entry.path]));
		const pathForUrl = (url) => {
			const mapped = urlToPath.get(url);
			if (mapped) return path.join(this.outputDir, mapped);
			return path.join(this.outputDir, this.pathForUrl(url, looksLikeHtml(url) ? 'text/html' : ''));
		};
		const textEntries = successfulEntries.filter((entry) => {
			const contentType = entry.contentType ?? '';
			return isHtmlContentType(contentType) || isCssContentType(contentType) || isJsContentType(contentType) || isXmlContentType(contentType) || contentType.includes('json');
		});

		for (const entry of textEntries) {
			const absolutePath = path.join(this.outputDir, entry.path);
			let text = await readFile(absolutePath, 'utf8');
			text = text.replace(/<script>try\{if\(localStorage\.get\("__framer_force_showing_editorbar_since"\)\)\{const n=document\.createElement\("link"\);n\.rel = "modulepreload";n\.href="https:\/\/framer\.com\/edit\/init\.mjs";document\.head\.appendChild\(n\)\}\}catch\(e\)\{\}<\/script>/g, '');
			for (const [url, targetPath] of urlToPath) {
				if (!text.includes(url)) continue;
				const next = path.relative(path.dirname(absolutePath), path.join(this.outputDir, targetPath)) || '.';
				text = text.split(url).join(next);
			}

			if (isHtmlContentType(entry.contentType)) {
				const $ = load(text);
				$('script[src*="googletagmanager.com"], script[src*="events.framer.com"]').remove();
				$('link[rel*="preconnect"], link[rel*="dns-prefetch"]').remove();
				const rewriteAttr = (element, attr, baseUrl = entry.url) => {
					const raw = $(element).attr(attr);
					const resolved = normaliseUrl(raw, baseUrl);
					if (!resolved) return;
					const mapped = urlToPath.get(resolved);
					const targetPath = mapped
						? path.join(this.outputDir, mapped)
						: new URL(resolved).origin === this.origin
							? path.join(this.outputDir, this.pathForUrl(resolved, looksLikeHtml(resolved) ? 'text/html' : ''))
							: null;
					if (!targetPath) return;
					const next = path.relative(path.dirname(absolutePath), targetPath) || '.';
					$(element).attr(attr, next);
				};

				$('a[href]').each((_, element) => rewriteAttr(element, 'href'));
				$('img[src], script[src], iframe[src], source[src], video[src], audio[src], embed[src]').each((_, element) => rewriteAttr(element, 'src'));
				$('object[data]').each((_, element) => rewriteAttr(element, 'data'));
				$('link[href]').each((_, element) => rewriteAttr(element, 'href'));
				$('meta[content]').each((_, element) => rewriteAttr(element, 'content'));
				$('[srcset]').each((_, element) => {
					const srcset = $(element).attr('srcset') ?? '';
					const next = srcset.split(',').map((candidate) => {
						const parts = candidate.trim().split(/\s+/);
						const resolved = normaliseUrl(parts[0], entry.url);
						if (!resolved) return candidate.trim();
						const mapped = urlToPath.get(resolved);
						const targetPath = mapped
							? path.join(this.outputDir, mapped)
							: new URL(resolved).origin === this.origin
								? path.join(this.outputDir, this.pathForUrl(resolved))
								: null;
						if (!targetPath) return candidate.trim();
						parts[0] = path.relative(path.dirname(absolutePath), targetPath) || '.';
						return parts.join(' ');
					}).join(', ');
					$(element).attr('srcset', next);
				});
				$('[style]').each((_, element) => {
					$(element).attr('style', rewriteCssUrls($(element).attr('style') ?? '', entry.url, absolutePath, pathForUrl));
				});
				$('style').each((_, element) => {
					$(element).text(rewriteCssUrls($(element).text(), entry.url, absolutePath, pathForUrl));
				});
				text = $.html();
			}

			await writeFile(absolutePath, text);
		}
	}

	async run() {
		await mkdir(this.outputDir, { recursive: true });
		this.enqueuePage(this.startUrl);
		await this.seedFromSitemap();
		while (this.pagesToVisit.length > 0 || this.assetsToVisit.length > 0) {
			const pages = this.pagesToVisit.splice(0, this.pagesToVisit.length);
			if (pages.length) {
				console.log(`Fetching ${pages.length} page(s)...`);
				await runQueue(pages, PAGE_CONCURRENCY, (job) => this.processPage(job));
			}
			const assets = this.assetsToVisit.splice(0, this.assetsToVisit.length);
			if (assets.length) {
				console.log(`Fetching ${assets.length} asset(s)...`);
				await runQueue(assets, ASSET_CONCURRENCY, (job) => this.processAsset(job));
			}
		}
		await this.rewriteMirroredFiles();
		const summary = {
			origin: this.origin,
			startUrl: this.startUrl,
			generatedAt: new Date().toISOString(),
			pageCount: this.entries.filter((entry) => entry.kind === 'page').length,
			assetCount: this.entries.filter((entry) => entry.kind === 'asset').length,
			entries: this.entries.sort((left, right) => left.url.localeCompare(right.url)),
		};
		await writeFile(this.manifestPath, `${JSON.stringify(summary, null, 2)}\n`);
		return summary;
	}
}

const options = parseArgs(process.argv);
const crawler = new MirrorCrawler(options);
const summary = await crawler.run();
console.log(`Mirrored ${summary.pageCount} page(s) and ${summary.assetCount} asset(s) to ${options.outputDir}`);
