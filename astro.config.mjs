// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';

/* SITE_URL is set per environment:
   - Cloudflare Worker (production):  SITE_URL=https://tinkercademy.com
   - GitHub Pages (webstaging):       unset → default below
   - Local dev / PR previews:         unset → default below (or override) */
const SITE_URL = process.env.SITE_URL?.trim() || 'https://webstaging.tinkercademy.com';

/* Programme updatedAt dates become sitemap <lastmod> values. */
/** @type {Map<string, string>} */
const programmeLastmod = new Map();
for (const name of readdirSync('./src/content/programmes')) {
	if (!name.endsWith('.md')) continue;
	const source = readFileSync(`./src/content/programmes/${name}`, 'utf8');
	const updatedAt = source.match(/^updatedAt:\s*["']?(\d{4}-\d{2}-\d{2})/m)?.[1];
	if (updatedAt) programmeLastmod.set(name.replace(/\.md$/, ''), updatedAt);
}

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: 'static',
	trailingSlash: 'always',
	compressHTML: true,
	/* Amp's portal loads the development server through a cross-origin proxy.
	   This site is fully static, so allowing proxied dev origins does not expose
	   server actions or on-demand routes. */
	security: {
		allowedDomains: [{}],
	},
	server: {
		host: true,
		allowedHosts: true,
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: 'viewport',
	},
	build: {
		/* Per-page CSS tops out around ~30 KiB, so inlining everything is
		   cheaper than the render-blocking request Lighthouse flags. */
		inlineStylesheets: 'always',
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname;
				if (path.startsWith('/blog/')) return false;
				if (/\/courses\/?$/.test(path)) return false;
				if (/\/programmes\/advanced-agentic-coding-with-claude-code-or-codex\/?$/.test(path)) return false;
				if (path.startsWith('/review/')) return false;
				return true;
			},
			serialize: (item) => {
				const slug = new URL(item.url).pathname.match(/^\/programmes\/([^/]+)\/?$/)?.[1];
				const lastmod = slug && programmeLastmod.get(slug);
				return lastmod ? { ...item, lastmod: new Date(lastmod).toISOString() } : item;
			},
		}),
	],
});
