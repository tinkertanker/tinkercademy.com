import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { load } from 'cheerio';

const read = (path) => readFile(new URL(`../../dist/${path}`, import.meta.url), 'utf8');
const schemas = ($) => $('script[type="application/ld+json"]').toArray().map((el) => JSON.parse($(el).text()));

test('production permits crawlers and advertises both sitemaps', async () => {
	const robots = await read('robots.txt');
	assert.match(robots, /User-agent: \*\nAllow: \/\nDisallow: \/review\//);
	assert.match(robots, /Sitemap: https:\/\/tinkercademy.com\/sitemap-index.xml/);
	assert.match(robots, /Sitemap: https:\/\/tinkercademy.com\/blog\/sitemap.xml/);
});

test('blog index freshness follows the latest story change, not publication ordering', async () => {
	const $ = load(await read('blog/sitemap.xml'), { xmlMode: true });
	const indexDate = $('url').filter((_, el) => $(el).find('loc').text() === 'https://tinkercademy.com/blog/').find('lastmod').text();
	const storyDates = $('url').filter((_, el) => /\/blog\/\d{4}\//.test($(el).find('loc').text()))
		.toArray().map((el) => Date.parse($(el).find('lastmod').text()));
	assert.equal(Date.parse(indexDate), Math.max(...storyDates));
});

test('articles expose their actual publication date and Article schema', async () => {
	const articles = JSON.parse(await readFile(new URL('../../src/data/pages/articles.json', import.meta.url), 'utf8'));
	for (const article of articles) {
		const $ = load(await read(`articles/${article.slug}/index.html`));
		const schema = schemas($).find((item) => item['@type'] === 'Article');
		assert.ok(schema, article.slug);
		assert.equal(schema.headline, article.title);
		assert.equal(schema.url, $('link[rel="canonical"]').attr('href'));
		if (article.date) {
			assert.equal(schema.datePublished, new Date(article.date).toISOString());
			assert.equal($('time').attr('datetime'), schema.datePublished);
		}
		assert.equal($('h1').length, 1, `${article.slug}: single H1`);
		assert.ok($('meta[name="description"]').attr('content'));
	}
});

test('tutorials use truthful TechArticle schema without invented dates or steps', async () => {
	const tutorials = JSON.parse(await readFile(new URL('../../src/data/pages/tutorials.json', import.meta.url), 'utf8'));
	for (const tutorial of tutorials) {
		const $ = load(await read(`tutorials/${tutorial.slug}/index.html`));
		const schema = schemas($).find((item) => item['@type'] === 'TechArticle');
		assert.ok(schema, tutorial.slug);
		assert.equal(schema.headline, tutorial.title);
		assert.equal(schema.url, $('link[rel="canonical"]').attr('href'));
		assert.equal(schema.dateModified, undefined);
		assert.equal(schema.datePublished, undefined);
	}
});
