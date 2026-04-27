const SITE_ORIGIN = 'https://tinkercademy.com';

function withCanonicalTrailingSlash(path) {
	if (
		path === '/' ||
		path.endsWith('/') ||
		path.startsWith('#') ||
		/[?#]|\.[^/]+$/.test(path)
	) {
		return path;
	}
	return `${path}/`;
}

export function toSiteHref(href) {
	if (!href) return '/';
	if (href.startsWith('#')) return href;

	try {
		const url = new URL(href, SITE_ORIGIN);
		if (url.origin !== SITE_ORIGIN) return href;

		const path = withCanonicalTrailingSlash(url.pathname || '/');
		return `${path}${url.search}${url.hash}`;
	} catch {
		return withCanonicalTrailingSlash(href);
	}
}
