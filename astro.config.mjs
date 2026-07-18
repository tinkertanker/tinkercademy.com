// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* SITE_URL is set per environment:
   - Cloudflare Pages (production):   SITE_URL=https://tinkercademy.com
   - GitHub Pages (webstaging):       unset → default below
   - Local dev / PR previews:         unset → default below (or override) */
const SITE_URL = process.env.SITE_URL?.trim() || 'https://webstaging.tinkercademy.com';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: 'static',
	trailingSlash: 'always',
	compressHTML: true,
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
		sitemap({
			filter: (page) => {
				const path = new URL(page).pathname;
				if (/\/courses\/?$/.test(path)) return false;
				if (path.startsWith('/review/')) return false;
				return true;
			},
		}),
	],
});
