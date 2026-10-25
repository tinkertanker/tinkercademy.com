import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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

test('social video serves exact byte ranges even when Assets omits Content-Length', async () => {
	const bytes = await readFile(new URL('../../public/videos/tinkercademy-v1.mp4', import.meta.url));
	const env = { ASSETS: { fetch: async () => new Response(bytes, {
		headers: { 'Content-Type': 'video/mp4', ETag: '"social-v1"' },
	}) } };
	for (const [range, start, end] of [
		['bytes=0-1', 0, 1],
		['bytes=123-1047', 123, 1047],
		[`bytes=${bytes.length - 7}-`, bytes.length - 7, bytes.length - 1],
		['bytes=-13', bytes.length - 13, bytes.length - 1],
		[`bytes=${bytes.length - 3}-999999999999999999999`, bytes.length - 3, bytes.length - 1],
		['bytes=-999999999999999999999', 0, bytes.length - 1],
	]) {
		const response = await worker.fetch(new Request('https://tinkercademy.com/videos/tinkercademy-v1.mp4', {
			headers: { Range: range },
		}), env);
		assert.equal(response.status, 206, range);
		assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
		assert.equal(response.headers.get('Content-Range'), `bytes ${start}-${end}/${bytes.length}`);
		assert.equal(response.headers.get('Content-Length'), String(end - start + 1));
		assert.equal(response.headers.get('Content-Type'), 'video/mp4');
		assert.equal(response.headers.get('ETag'), '"social-v1"');
		assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes.subarray(start, end + 1));
	}
});

test('video ranges preserve full responses, validators and unsatisfiable-range semantics', async () => {
	const modified = 'Wed, 21 Oct 2026 07:28:00 GMT';
	const env = { ASSETS: { fetch: async (request) => {
		const headers = { 'Content-Type': 'video/mp4', ETag: '"v1"', 'Last-Modified': modified };
		if (request.headers.get('If-None-Match') === '"v1"') return new Response(null, { status: 304, headers });
		return new Response(request.method === 'HEAD' ? null : '0123456789', { headers });
	} } };
	for (const [headers, method, status, body, contentRange = null] of [
		[{}, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=0-1' }, 'HEAD', 200, ''],
		[{ Range: 'bytes=10-' }, 'GET', 416, '', 'bytes */10'],
		[{ Range: 'bytes=-0' }, 'GET', 416, '', 'bytes */10'],
		[{ Range: 'bytes=999999999999999999999-' }, 'GET', 416, '', 'bytes */10'],
		[{ Range: 'bytes=9-2' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=-' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=0-1,4-5' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=2-5', 'If-Range': '"v1"' }, 'GET', 206, '2345', 'bytes 2-5/10'],
		[{ Range: 'bytes=2-5', 'If-Range': '"stale"' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=2-5', 'If-Range': 'W/"v1"' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=2-5', 'If-Range': modified }, 'GET', 206, '2345', 'bytes 2-5/10'],
		[{ Range: 'bytes=2-5', 'If-Range': 'Tue, 20 Oct 2026 07:28:00 GMT' }, 'GET', 200, '0123456789'],
		[{ Range: 'bytes=2-5', 'If-None-Match': '"v1"' }, 'GET', 304, ''],
		[{}, 'POST', 405, 'Method not allowed'],
	]) {
		const response = await worker.fetch(new Request('https://tinkercademy.com/videos/test.mp4', { headers, method }), env);
		assert.equal(response.status, status, JSON.stringify({ headers, method }));
		assert.equal(response.headers.get('Content-Range'), contentRange);
		assert.equal(await response.text(), body);
		if ([200, 206, 416].includes(status)) {
			assert.equal(response.headers.get('Accept-Ranges'), 'bytes');
			assert.match(response.headers.get('Cache-Control'), /no-transform/);
		}
	}
});

test('video range handling leaves errors and other asset types unchanged', async () => {
	for (const [path, body, status, headers] of [
		['/videos/missing.mp4', 'missing', 404, {}],
		['/videos/wrong-type.mp4', 'poster', 200, { 'Content-Type': 'image/jpeg' }],
		['/images/card.jpg', 'poster', 200, { 'Content-Type': 'image/jpeg' }],
	]) {
		const env = { ASSETS: { fetch: async () => new Response(body, { status, headers }) } };
		const response = await worker.fetch(new Request(`https://tinkercademy.com${path}`, { headers: { Range: 'bytes=0-1' } }), env);
		assert.equal(response.status, status);
		assert.equal(await response.text(), body);
		assert.equal(response.headers.get('Accept-Ranges'), null);
	}
});
