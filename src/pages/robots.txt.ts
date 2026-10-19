import type { APIRoute } from 'astro';

const PRODUCTION_HOSTS = new Set(['tinkercademy.com', 'www.tinkercademy.com']);

const AI_CRAWLERS = [
	'meta-webindexer',
	'meta-externalagent',
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site).href;
	const blogSitemapUrl = new URL('blog/sitemap.xml', site).href;
	const isProduction = site ? PRODUCTION_HOSTS.has(site.hostname) : false;
	const accessRule = isProduction
		? 'Allow: /\nDisallow: /review/'
		: 'Disallow: /';
	/* AI crawlers are already covered by `*`, but naming them makes the
	   permission explicit. A named group replaces `*` for that bot, so it
	   repeats the same rules rather than just `Allow: /`. */
	const aiAgents = AI_CRAWLERS.map((agent) => `User-agent: ${agent}`).join('\n');
	const body = `User-agent: *\n${accessRule}\n\n${aiAgents}\n${accessRule}\n\nSitemap: ${sitemapUrl}\nSitemap: ${blogSitemapUrl}\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
