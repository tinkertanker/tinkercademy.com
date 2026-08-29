// Served as /robots.txt on blog.tinkercademy.com by worker.mjs.
import { BLOG_ORIGIN } from '../../lib/blog';

export function GET() {
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${BLOG_ORIGIN}/sitemap.xml\n`, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
