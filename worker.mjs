import { BLOG_404_PATH, BLOG_PATH, LEGACY_BLOG_HOST, planHostRequest } from './src/lib/blog-host-routing.js';

function withAssetPath(request, pathname) {
	const url = new URL(request.url);
	url.pathname = pathname;
	return new Request(url, request);
}

async function blogNotFound(request, env) {
	const page = await env.ASSETS.fetch(withAssetPath(request, BLOG_404_PATH));
	return new Response(page.body, { status: 404, statusText: 'Not Found', headers: page.headers });
}

async function videoResponse(request, assets) {
	// Workers Assets can ignore Range, so request the complete representation.
	const assetRequest = new Request(request);
	assetRequest.headers.delete('Range');
	assetRequest.headers.delete('If-Range');
	const response = await assets.fetch(assetRequest);
	if (response.status !== 200 || response.headers.get('Content-Type') !== 'video/mp4'
		|| response.headers.has('Content-Encoding')) return response;

	const headers = new Headers(response.headers);
	headers.set('Accept-Ranges', 'bytes');
	headers.set('Cache-Control', 'public, max-age=0, must-revalidate, no-transform');
	const fullResponse = () => new Response(response.body, { status: 200, headers });
	const range = /^bytes=(\d*)-(\d*)$/i.exec(request.headers.get('Range')?.trim() ?? '');
	if (request.method !== 'GET' || !range || (!range[1] && !range[2])) return fullResponse();
	if (range[1] && range[2] && Number(range[2]) < Number(range[1])) return fullResponse();

	const ifRange = request.headers.get('If-Range');
	if (ifRange) {
		const modified = headers.get('Last-Modified');
		const matches = ifRange.startsWith('"')
			? ifRange === headers.get('ETag')
			: !ifRange.startsWith('W/') && modified && Number.isFinite(Date.parse(ifRange))
				&& Date.parse(ifRange) === Date.parse(modified);
		if (!matches) return fullResponse();
	}

	// These small social clips are size-limited by the SEO tests. Buffer only
	// range requests to derive the real size: Assets can omit Content-Length.
	// An ArrayBuffer also lets Workers emit the exact partial Content-Length.
	const bytes = await response.arrayBuffer();
	const size = bytes.byteLength;
	const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
	const end = Math.min(range[1] && range[2] ? Number(range[2]) : size - 1, size - 1);
	if (start >= size || size === 0) {
		headers.set('Content-Range', `bytes */${size}`);
		headers.set('Content-Length', '0');
		return new Response(null, { status: 416, headers });
	}
	headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
	headers.set('Content-Length', String(end - start + 1));
	return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

export default {
	async fetch(request, env) {
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
		}

		const plan = planHostRequest(request.url);
		if (plan.action === 'pass') {
			const pathname = new URL(request.url).pathname;
			if (pathname.startsWith('/videos/') && pathname.endsWith('.mp4')) {
				return videoResponse(request, env.ASSETS);
			}
			const response = await env.ASSETS.fetch(request);
			return response.status === 404 && new URL(request.url).pathname.startsWith(`${BLOG_PATH}/`)
				? blogNotFound(request, env)
				: response;
		}
		if (plan.action === 'redirect') return Response.redirect(plan.location, plan.status);
		if (plan.action === 'not-found') {
			return new URL(request.url).hostname === LEGACY_BLOG_HOST
				? blogNotFound(request, env)
				: new Response('Not found', { status: 404 });
		}

		const response = await env.ASSETS.fetch(withAssetPath(request, plan.pathname));
		return response.status === 404 && new URL(request.url).pathname.startsWith(`${BLOG_PATH}/`)
			? blogNotFound(request, env)
			: response;
	},
};
