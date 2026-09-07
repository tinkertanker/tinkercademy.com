import assert from 'node:assert/strict';
import test from 'node:test';
import { notifyIndexNow, sitemapUrls } from '../indexnow.mjs';

const origin = 'https://tinkercademy.com';
const key = '4e5d5df66f220bb32ff72319717fd454';

test('dry-run deduplicates and never makes a request', async () => {
	const result = await notifyIndexNow([`${origin}/`, `${origin}/`], {
		request: () => assert.fail('dry run must not call the network'),
	});
	assert.equal(result.status, 'dry-run');
	assert.deepEqual(result.payload.urlList, [`${origin}/`]);
});

test('rejects staging, external, private, query and empty URL batches', async () => {
	for (const urls of [[], ['https://webstaging.tinkercademy.com/'], ['https://example.com/'], [`${origin}/review/test/`], [`${origin}/?domain=ai`]]) {
		await assert.rejects(notifyIndexNow(urls));
	}
});

test('walks both sitemaps and deduplicates URLs', async () => {
	const documents = {
		'/sitemap-index.xml': `<sitemapindex><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`,
		'/sitemap-0.xml': `<urlset><url><loc>${origin}/</loc></url></urlset>`,
		'/blog/sitemap.xml': `<urlset><url><loc>${origin}/blog/</loc></url><url><loc>${origin}/</loc></url></urlset>`,
	};
	const urls = await sitemapUrls(async (url) => new Response(documents[new URL(url).pathname]));
	assert.deepEqual(urls.sort(), [`${origin}/`, `${origin}/blog/`]);
	await assert.rejects(sitemapUrls(async () => new Response('<html>Error</html>')), /Not a sitemap/);
});

test('submission verifies the live key and accepts 200 and 202 only', async () => {
	for (const status of [200, 202, 403, 429, 500]) {
		const calls = [];
		const request = async (url, options) => {
			calls.push(url);
			if (url === `${origin}/${key}.txt`) return new Response(key);
			assert.equal(url, 'https://api.indexnow.org/indexnow');
			assert.equal(options.method, 'POST');
			assert.deepEqual(JSON.parse(options.body).urlList, [`${origin}/`]);
			return new Response('', { status });
		};
		const result = notifyIndexNow([`${origin}/`], { submit: true, request });
		if (status < 300) assert.equal((await result).status, status);
		else await assert.rejects(result, new RegExp(`HTTP ${status}`));
		assert.equal(calls.length, 2);
	}
	await assert.rejects(notifyIndexNow([`${origin}/`], {
		submit: true,
		request: async () => new Response('wrong key'),
	}), /Live IndexNow key does not match/);
});
