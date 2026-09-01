import assert from 'node:assert/strict';
import test from 'node:test';

import worker from '../../worker.mjs';

function assetEnvironment() {
	const requestedPaths = [];
	return {
		requestedPaths,
		env: {
			ASSETS: {
				async fetch(request) {
					const pathname = new URL(request.url).pathname;
					requestedPaths.push(pathname);
					if (pathname === '/blog/404/') return new Response('<h1>Story not found</h1>');
					return new Response('missing', { status: 404 });
				},
			},
		},
	};
}

test('serves the blog-specific 404 page for unknown apex blog paths', async () => {
	for (const pathname of ['/blog/unknown-story/', '/blog/unknown/nested/path/']) {
		const { env, requestedPaths } = assetEnvironment();
		const response = await worker.fetch(new Request(`https://tinkercademy.com${pathname}`), env);
		assert.equal(response.status, 404);
		assert.match(await response.text(), /Story not found/);
		assert.equal(requestedPaths.at(-1), '/blog/404/');
	}
});

test('does not expose the blog 404 namespace on the apex host', async () => {
	const { env, requestedPaths } = assetEnvironment();
	const response = await worker.fetch(new Request('https://tinkercademy.com/blog-content/404/'), env);
	assert.equal(response.status, 404);
	assert.equal(await response.text(), 'Not found');
	assert.deepEqual(requestedPaths, []);
});
