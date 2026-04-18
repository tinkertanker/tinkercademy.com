// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://webstaging.tinkercademy.com',
	integrations: [
		sitemap({
			filter: (page) => !/\/courses\/?$/.test(new URL(page).pathname),
		}),
	],
});
