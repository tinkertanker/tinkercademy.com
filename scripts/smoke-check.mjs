#!/usr/bin/env node
/* Post-deploy smoke check.
   Usage: node scripts/smoke-check.mjs <base-url>
     e.g. node scripts/smoke-check.mjs https://webstaging.tinkercademy.com
          node scripts/smoke-check.mjs https://tinkercademy.com
   Exits 0 on pass, non-zero on any failure. */

const site = (process.env.SMOKE_SITE ?? process.argv[2] ?? '').trim();
if (!site) {
	console.error('smoke-check: base URL required. Pass as the first argument after the script name or set SMOKE_SITE env.');
	process.exit(2);
}

const isProd = /^https:\/\/(www\.)?tinkercademy\.com\/?$/i.test(site);

/* Every ContentLayout-rendered page includes these, so they're robust
   page-agnostic signals that routing + build produced real content. */
const LAYOUT_MARKERS = ['og:site_name', 'Tinkercademy'];

const checks = [
	{
		path: '/robots.txt',
		contains: ['Sitemap:'],
		/* Catches the "we forgot to flip site: at cutover" class of bug. */
		mustMatch: isProd ? /^Allow: \/$/m : /^Disallow: \/$/m,
	},
	{ path: '/sitemap-index.xml', contains: ['<sitemapindex', 'sitemap-0.xml'] },
	{ path: '/sitemap-0.xml', contains: ['<urlset', '<loc>'] },
	{ path: '/favicon.svg' },
	{ path: '/favicon.ico' },
	{ path: '/favicon.png' },
	{ path: '/apple-touch-icon.png' },
	{ path: '/', contains: LAYOUT_MARKERS },
	{ path: '/about-us', contains: LAYOUT_MARKERS },
	{ path: '/courses-all', contains: LAYOUT_MARKERS },
	{ path: '/programmes/mastering-the-web', contains: [...LAYOUT_MARKERS, 'Mastering the Web'] },
	{ path: '/tutorials/micropython', contains: LAYOUT_MARKERS },
	{ path: '/articles', contains: LAYOUT_MARKERS },
	/* Every page must carry the GA4 tag; catches the "GA dropped from the
	   global layout" class of regression. */
	{ path: '/about-us', contains: ['id=G-8PXL6RTPR4'] },
	/* 404.html must exist so Cloudflare Pages doesn't fall back to SPA-style
	   behaviour and serve the homepage for every unmatched path. */
	{ path: '/404.html', contains: LAYOUT_MARKERS },
];

async function check({ path, contains, mustMatch }) {
	const url = new URL(path, site).toString();
	const res = await fetch(url, { redirect: 'follow' });
	if (res.status !== 200) {
		return { path, ok: false, reason: `status ${res.status}` };
	}
	if (!contains && !mustMatch) return { path, ok: true };
	const body = await res.text();
	const missing = (contains ?? []).filter((s) => !body.includes(s));
	if (missing.length) {
		return { path, ok: false, reason: `missing: ${missing.join(', ')}` };
	}
	if (mustMatch && !mustMatch.test(body)) {
		return { path, ok: false, reason: `regex not matched: ${mustMatch}` };
	}
	return { path, ok: true };
}

console.log(`smoke-check: ${site} (${isProd ? 'production' : 'staging'})`);
const results = await Promise.all(checks.map(check));
let fails = 0;
for (const r of results) {
	console.log(`${r.ok ? '✔' : '✘'} ${r.path}${r.ok ? '' : ` — ${r.reason}`}`);
	if (!r.ok) fails++;
}
if (fails) {
	console.error(`smoke-check: ${fails} failure(s)`);
	process.exit(1);
}
console.log('smoke-check: all pass');
