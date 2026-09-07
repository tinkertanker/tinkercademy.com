import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://tinkercademy.com';
const KEY_FILE = '4e5d5df66f220bb32ff72319717fd454.txt';

function productionUrl(value) {
	const url = new URL(value);
	if (url.origin !== ORIGIN || url.username || url.password || url.search || url.hash || url.pathname.startsWith('/review/')) {
		throw new Error(`Refusing non-canonical production URL: ${value}`);
	}
	return url.href;
}

async function getText(url, request) {
	const response = await request(url, { redirect: 'error', signal: AbortSignal.timeout(30_000) });
	if (!response.ok) throw new Error(`GET ${url}: HTTP ${response.status}`);
	return response.text();
}

export async function sitemapUrls(request = fetch) {
	const pending = [`${ORIGIN}/sitemap-index.xml`, `${ORIGIN}/blog/sitemap.xml`];
	const visited = new Set();
	const urls = new Set();
	while (pending.length) {
		const sitemap = productionUrl(pending.shift());
		if (visited.has(sitemap)) continue;
		visited.add(sitemap);
		const xml = await getText(sitemap, request);
		if (!/<(?:sitemapindex|urlset)\b/.test(xml)) throw new Error(`Not a sitemap: ${sitemap}`);
		const locations = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => productionUrl(match[1]));
		if (/<sitemapindex\b/.test(xml)) pending.push(...locations);
		else for (const url of locations) urls.add(url);
	}
	return [...urls];
}

export async function notifyIndexNow(urls, { submit = false, request = fetch } = {}) {
	const urlList = [...new Set(urls.map(productionUrl))];
	if (!urlList.length || urlList.length > 10_000) throw new Error('IndexNow requires 1–10,000 URLs per batch.');
	const key = (await readFile(new URL(`../public/${KEY_FILE}`, import.meta.url), 'utf8')).trim();
	const keyLocation = `${ORIGIN}/${KEY_FILE}`;
	const payload = { host: new URL(ORIGIN).host, key, keyLocation, urlList };
	if (!submit) return { status: 'dry-run', payload };
	if ((await getText(keyLocation, request)).trim() !== key) throw new Error('Live IndexNow key does not match; deploy the key file first.');
	const response = await request('https://api.indexnow.org/indexnow', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		body: JSON.stringify(payload),
		redirect: 'error',
		signal: AbortSignal.timeout(30_000),
	});
	if (![200, 202].includes(response.status)) throw new Error(`IndexNow HTTP ${response.status}; notification failed (deployment is unaffected).`);
	return { status: response.status, payload };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	try {
		const args = process.argv.slice(2);
		if (args.some((arg) => arg.startsWith('--') && arg !== '--submit')) throw new Error('Usage: node scripts/indexnow.mjs [--submit] [https://tinkercademy.com/path/ ...]');
		const explicitUrls = args.filter((arg) => arg !== '--submit');
		const urls = explicitUrls.length ? explicitUrls : await sitemapUrls();
		const result = await notifyIndexNow(urls, { submit: args.includes('--submit') });
		console.log(`IndexNow: ${result.status}; ${result.payload.urlList.length} URLs. Acceptance is not a guarantee of indexing.`);
		if (result.status === 'dry-run') console.log(result.payload.urlList.join('\n'));
	} catch (error) {
		console.error(error.message);
		process.exitCode = 1;
	}
}
