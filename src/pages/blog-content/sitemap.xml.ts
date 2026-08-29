// Served as /sitemap.xml on blog.tinkercademy.com by worker.mjs.
import { BLOG_ORIGIN, getBlogStories, getBlogYears } from '../../lib/blog';

function xmlEscape(value: string): string {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export async function GET() {
	const stories = await getBlogStories();
	const urls = [
		{ loc: `${BLOG_ORIGIN}/`, lastmod: stories[0]?.data.updatedAt ?? stories[0]?.data.publishedAt },
		...getBlogYears(stories).map((year) => ({ loc: `${BLOG_ORIGIN}/archive/${year}/`, lastmod: undefined })),
		...stories.map((story) => ({ loc: story.data.canonicalUrl, lastmod: story.data.updatedAt ?? story.data.publishedAt })),
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
		.map(({ loc, lastmod }) => `  <url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod.toISOString()}</lastmod>` : ''}</url>`)
		.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
