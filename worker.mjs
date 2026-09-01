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

export default {
	async fetch(request, env) {
		if (request.method !== 'GET' && request.method !== 'HEAD') {
			return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
		}

		const plan = planHostRequest(request.url);
		if (plan.action === 'pass') {
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
