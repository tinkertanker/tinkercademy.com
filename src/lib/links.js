const SITE_ORIGIN = 'https://tinkercademy.com';

export function toSiteHref(href) {
	if (!href) return '/';
	if (href.startsWith('#')) return href;

	try {
		const url = new URL(href, SITE_ORIGIN);
		if (url.origin !== SITE_ORIGIN) return href;

		const path = `${url.pathname}${url.search}${url.hash}`;
		return path || '/';
	} catch {
		return href;
	}
}
