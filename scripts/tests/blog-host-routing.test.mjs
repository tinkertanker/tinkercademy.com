import assert from 'node:assert/strict';
import test from 'node:test';

import { planHostRequest } from '../../src/lib/blog-host-routing.js';

test('serves blog stories from the isolated build namespace without changing the legacy URL', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1'),
		{
			action: 'asset',
			pathname: '/blog-content/whats-a-tinkertanker-200bae67e8f1/',
		},
	);
});

test('normalises a story trailing slash to the exact historical path', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1/?ref=test'),
		{
			action: 'redirect',
			location: 'https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1?ref=test',
			status: 308,
		},
	);
});

test('maps blog discovery endpoints and archives into the isolated namespace', () => {
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/'), {
		action: 'asset',
		pathname: '/blog-content/',
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/feed'), {
		action: 'asset',
		pathname: '/blog-content/feed.xml',
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/sitemap/sitemap.xml'), {
		action: 'asset',
		pathname: '/blog-content/sitemap.xml',
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/archive/2023/'), {
		action: 'asset',
		pathname: '/blog-content/archive/2023/',
	});
});

test('redirects legacy archive queries without dropping unrelated query parameters', () => {
	assert.deepEqual(
		planHostRequest('https://blog.tinkercademy.com/all?year=2023&utm_source=old-blog'),
		{
			action: 'redirect',
			location: 'https://blog.tinkercademy.com/archive/2023/?utm_source=old-blog',
			status: 308,
		},
	);
});

test('does not expose isolated blog pages on the apex production host', () => {
	assert.deepEqual(planHostRequest('https://tinkercademy.com/blog-content/'), { action: 'not-found' });
	assert.deepEqual(planHostRequest('https://tinkercademy.com/articles/example/'), {
		action: 'pass',
	});
});

test('leaves namespaced local blog media available without rewriting it', () => {
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/blog-media/abc.gif'), {
		action: 'asset',
		pathname: '/blog-media/abc.gif',
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/fonts/example.woff2'), {
		action: 'asset',
		pathname: '/fonts/example.woff2',
	});
	assert.deepEqual(planHostRequest('https://blog.tinkercademy.com/favicon.svg'), {
		action: 'asset',
		pathname: '/favicon.svg',
	});
});
