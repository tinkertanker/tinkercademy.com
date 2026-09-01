import legacyRedirects from '../data/blog-legacy-redirects.json' with { type: 'json' };

export const LEGACY_BLOG_HOST = 'blog.tinkercademy.com';
export const BLOG_PATH = '/blog';
export const BLOG_404_PATH = `${BLOG_PATH}/404/`;

const APEX_ORIGIN = 'https://tinkercademy.com';
const APEX_PRODUCTION_HOSTS = new Set(['tinkercademy.com', 'www.tinkercademy.com']);
const PRIVATE_BUILD_PREFIX = '/blog-content';
const CANONICAL_STORY_WITHOUT_SLASH = /^\/blog\/\d{4}\/[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const ARCHIVE_YEAR_WITHOUT_SLASH = /^\/blog\/archive\/\d{4}$/u;
const LEGACY_ARCHIVE_YEAR_PATH = /^\/archive\/(\d{4})\/?$/u;
const LEGACY_ASSET_PATH = /^(?:\/blog-media\/|\/assets\/|\/fonts\/|\/images\/|\/[^/]+\.[a-z0-9]+$)/iu;

function redirectToApex(sourceUrl, pathname, status = 308) {
	const target = new URL(pathname, APEX_ORIGIN);
	target.search = sourceUrl.search;
	return { action: 'redirect', location: target.toString(), status };
}

function planLegacyRequest(url) {
	const { pathname } = url;
	if (pathname === '/') return redirectToApex(url, `${BLOG_PATH}/`);
	if (pathname === '/feed' || pathname === '/feed/' || pathname === '/feed.xml') {
		return redirectToApex(url, `${BLOG_PATH}/feed.xml`);
	}
	if (pathname === '/sitemap.xml' || pathname === '/sitemap/sitemap.xml') {
		return redirectToApex(url, `${BLOG_PATH}/sitemap.xml`);
	}
	if (pathname === '/robots.txt') return redirectToApex(url, '/robots.txt');
	if (LEGACY_ASSET_PATH.test(pathname)) return redirectToApex(url, pathname);

	if (pathname === '/all' || pathname === '/all/') {
		const year = url.searchParams.get('year');
		url.searchParams.delete('year');
		return redirectToApex(url, year && /^\d{4}$/u.test(year) ? `${BLOG_PATH}/archive/${year}/` : `${BLOG_PATH}/`);
	}

	if (pathname === '/about' || pathname === '/about/' || pathname === '/followers' || pathname === '/followers/') {
		return redirectToApex(url, `${BLOG_PATH}/`);
	}
	if (pathname.startsWith('/tagged/')) return redirectToApex(url, `${BLOG_PATH}/`);

	const archiveMatch = pathname.match(LEGACY_ARCHIVE_YEAR_PATH);
	if (archiveMatch) return redirectToApex(url, `${BLOG_PATH}/archive/${archiveMatch[1]}/`);
	if (pathname === '/archive' || pathname === '/archive/') return redirectToApex(url, `${BLOG_PATH}/`);

	const legacyPath = pathname.replace(/^\//u, '').replace(/\/$/u, '');
	const destination = legacyRedirects.redirects[legacyPath];
	return destination ? redirectToApex(url, destination) : { action: 'not-found' };
}

export function planHostRequest(input) {
	const url = input instanceof URL ? new URL(input) : new URL(input);
	const host = url.hostname.toLowerCase();
	const { pathname } = url;

	if (host === LEGACY_BLOG_HOST) return planLegacyRequest(url);
	if (!APEX_PRODUCTION_HOSTS.has(host)) return { action: 'pass' };
	if (pathname === PRIVATE_BUILD_PREFIX || pathname.startsWith(`${PRIVATE_BUILD_PREFIX}/`)) return { action: 'not-found' };
	if (host === 'www.tinkercademy.com' && (pathname === BLOG_PATH || pathname.startsWith(`${BLOG_PATH}/`))) {
		return redirectToApex(url, pathname);
	}
	if (pathname === BLOG_PATH) return redirectToApex(url, `${BLOG_PATH}/`);
	if (CANONICAL_STORY_WITHOUT_SLASH.test(pathname) || ARCHIVE_YEAR_WITHOUT_SLASH.test(pathname)) {
		return redirectToApex(url, `${pathname}/`);
	}
	return { action: 'pass' };
}
