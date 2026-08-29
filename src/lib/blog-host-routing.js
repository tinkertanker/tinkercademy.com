export const BLOG_HOST = 'blog.tinkercademy.com';
export const BLOG_BUILD_PREFIX = '/blog-content';

const APEX_PRODUCTION_HOSTS = new Set(['tinkercademy.com', 'www.tinkercademy.com']);
const ARCHIVE_YEAR_PATH = /^\/archive\/(\d{4})\/?$/u;
const SINGLE_SEGMENT_PATH = /^\/[^/]+\/?$/u;
const SHARED_ASSET_PREFIXES = ['/assets/', '/fonts/', '/images/'];
const ROOT_ASSET_PATH = /^\/[^/]+\.[a-z0-9]+$/iu;

function redirect(url, pathname, status = 308) {
	url.pathname = pathname;
	return { action: 'redirect', location: url.toString(), status };
}

export function planHostRequest(input) {
	const url = input instanceof URL ? new URL(input) : new URL(input);
	const host = url.hostname.toLowerCase();
	const { pathname } = url;

	if (host !== BLOG_HOST) {
		if (APEX_PRODUCTION_HOSTS.has(host) && (pathname === BLOG_BUILD_PREFIX || pathname.startsWith(`${BLOG_BUILD_PREFIX}/`))) {
			return { action: 'not-found' };
		}
		return { action: 'pass' };
	}

	if (
		pathname === '/blog-media' ||
		pathname.startsWith('/blog-media/') ||
		SHARED_ASSET_PREFIXES.some((prefix) => pathname.startsWith(prefix))
	) {
		return { action: 'asset', pathname };
	}

	if (pathname === '/') return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}/` };
	if (pathname === '/feed' || pathname === '/feed/') {
		return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}/feed.xml` };
	}
	if (pathname === '/sitemap.xml' || pathname === '/sitemap/sitemap.xml') {
		return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}/sitemap.xml` };
	}
	if (pathname === '/robots.txt') {
		return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}/robots.txt` };
	}
	if (ROOT_ASSET_PATH.test(pathname)) return { action: 'asset', pathname };

	if (pathname === '/all' || pathname === '/all/') {
		const year = url.searchParams.get('year');
		url.searchParams.delete('year');
		return redirect(url, year && /^\d{4}$/u.test(year) ? `/archive/${year}/` : '/');
	}

	if (pathname === '/about' || pathname === '/about/' || pathname === '/followers' || pathname === '/followers/') {
		return redirect(url, '/');
	}

	if (pathname.startsWith('/tagged/')) return redirect(url, '/');

	const archiveMatch = pathname.match(ARCHIVE_YEAR_PATH);
	if (archiveMatch) {
		if (!pathname.endsWith('/')) return redirect(url, `${pathname}/`);
		return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}/archive/${archiveMatch[1]}/` };
	}

	if (pathname === '/archive' || pathname === '/archive/') return redirect(url, '/');

	if (SINGLE_SEGMENT_PATH.test(pathname)) {
		if (pathname.endsWith('/')) return redirect(url, pathname.slice(0, -1));
		return { action: 'asset', pathname: `${BLOG_BUILD_PREFIX}${pathname}/` };
	}

	return { action: 'not-found' };
}
