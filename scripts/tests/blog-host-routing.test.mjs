import assert from 'node:assert/strict';
import test from 'node:test';

import legacyRedirects from '../../src/data/blog-legacy-redirects.json' with { type: 'json' };
import { planHostRequest } from '../../src/lib/blog-host-routing.js';

test('the generated redirect contract covers all 72 migrated story paths', () => {
	const entries = Object.entries(legacyRedirects.redirects);
	assert.equal(entries.length, 72);
	for (const [legacyPath, destination] of entries) {
		assert.deepEqual(planHostRequest(`https://blog.tinkercademy.com/${legacyPath}`), {
			action: 'redirect',
			location: `https://tinkercademy.com${destination}`,
			status: 308,
		});
	}
});

test('redirects every known legacy story URL to its apex year-and-slug canonical', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1?ref=old-blog'),
		{
			action: 'redirect',
			location: 'https://tinkercademy.com/blog/2017/whats-a-tinkertanker/?ref=old-blog',
			status: 308,
		},
	);
});

test('redirects both forms of a legacy story path to one canonical destination', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1/?ref=test'),
		{
			action: 'redirect',
			location: 'https://tinkercademy.com/blog/2017/whats-a-tinkertanker/?ref=test',
			status: 308,
		},
	);
});

test('redirects legacy discovery endpoints to their apex /blog equivalents', () => {
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/feed'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/feed.xml',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/sitemap/sitemap.xml'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/sitemap.xml',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/archive/2023/'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/archive/2023/',
		status: 308,
	});
});

test('redirects legacy archive queries without dropping unrelated query parameters', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/all?year=2023&utm_source=old-blog'),
		{
			action: 'redirect',
			location: 'https://tinkercademy.com/blog/archive/2023/?utm_source=old-blog',
			status: 308,
		},
	);
});

test('serves canonical /blog routes on apex and normalises their trailing slashes', () => {
	assert.deepEqual(planHostRequest('https://tinkercademy.com/blog'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://tinkercademy.com/blog/2017/whats-a-tinkertanker'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog/2017/whats-a-tinkertanker/',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://tinkercademy.com/blog/2017/whats-a-tinkertanker/'), { action: 'pass' });
	assert.deepEqual(planHostRequest('https://tinkercademy.com/blog-content/'), { action: 'not-found' });
	assert.deepEqual(planHostRequest('https://tinkercademy.com/articles/example/'), {
		action: 'pass',
	});
});

test('redirects legacy-host assets to the same apex asset path', () => {
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/blog-media/abc.gif'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/blog-media/abc.gif',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/fonts/example.woff2'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/fonts/example.woff2',
		status: 308,
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/favicon.svg'), {
		action: 'redirect',
		location: 'https://tinkercademy.com/favicon.svg',
		status: 308,
	});
});
