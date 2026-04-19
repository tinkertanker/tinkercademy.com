import type { APIRoute } from 'astro';

const PRODUCTION_HOSTS = new Set(['tinkercademy.com', 'www.tinkercademy.com']);

export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site).href;
	const isProduction = site ? PRODUCTION_HOSTS.has(site.hostname) : false;
	const accessRule = isProduction ? 'Allow: /' : 'Disallow: /';
	const body = `User-agent: *\n${accessRule}\n\nSitemap: ${sitemapUrl}\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
