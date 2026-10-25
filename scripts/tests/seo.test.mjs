import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import test from 'node:test';
import { load } from 'cheerio';
import { parse } from 'yaml';

const read = (path) => readFile(new URL(`../../dist/${path}`, import.meta.url), 'utf8');
const schemas = ($) => $('script[type="application/ld+json"]').toArray().map((el) => JSON.parse($(el).text()));

test('large tutorial animations use smaller playable media and static social images', async () => {
	const tutorials = JSON.parse(await readFile(new URL('../../src/data/pages/tutorials.json', import.meta.url), 'utf8'));
	const animated = tutorials.filter((tutorial) => tutorial.hero_video);
	assert.equal(animated.length, 2);
	const listing = load(await read('microbit/index.html'));
	for (const tutorial of animated) {
		const $ = load(await read(`tutorials/${tutorial.slug}/index.html`));
		const video = $('.hero-media video');
		assert.equal(video.length, 1, tutorial.slug);
		assert.equal(video.attr('aria-label'), tutorial.title);
		for (const attr of ['controls', 'muted', 'loop', 'playsinline']) assert.ok(video.is(`[${attr}]`), attr);
		assert.equal(video.attr('poster'), tutorial.hero_poster);
		assert.equal(video.find('source').attr('src'), tutorial.hero_video);
		assert.equal($(`img[src="${tutorial.hero_image}"]`).length, 0, 'original GIF is not downloaded');
		assert.equal($('meta[property="og:image"]').attr('content'), `https://tinkercademy.com${tutorial.hero_poster}`);
		assert.equal(listing(`a[href="/tutorials/${tutorial.slug}/"] img`).attr('src'), tutorial.hero_poster);
		const size = async (path) => (await stat(new URL(`../../dist${path}`, import.meta.url))).size;
		assert.ok(await size(tutorial.hero_video) + await size(tutorial.hero_poster) < await size(tutorial.hero_image) / 3);
	}
});

test('launch discovery fixes preserve crawlable destinations and distinct course summaries', async () => {
	const notFound = load(await read('404.html'));
	assert.match(notFound('meta[name="robots"]').attr('content') ?? '', /\bnoindex\b/);
	const redirects = await read('_redirects');
	assert.match(redirects, /^\/painttinkerer \/showcase\/ 301$/m);
	assert.match(redirects, /^\/tutorials\/finger-dexterity-game\/tutorials\/quick-maths\/ \/tutorials\/quick-maths\/ 301$/m);
	for (const path of ['showcase/index.html', 'tutorials/quick-maths/index.html']) {
		assert.equal(load(await read(path))('h1').length, 1);
	}
	const descriptions = [];
	for (const slug of ['code-for-fun-baseline-workshop', 'code-for-fun-ai-workshop']) {
		const $ = load(await read(`programmes/${slug}/index.html`));
		const description = $('meta[name="description"]').attr('content');
		assert.ok(description?.includes('schools'));
		assert.ok(!description.includes('Scheme of Work'));
		descriptions.push(description);
	}
	assert.notEqual(descriptions[0], descriptions[1]);
	const llms = await read('llms.txt');
	assert.match(llms, /^# Tinkercademy\n/);
	const links = [...llms.matchAll(/\]\((https:\/\/tinkercademy\.com\/[^)]*)\)/g)];
	assert.ok(links.length >= 5);
	for (const [, href] of links) {
		const path = new URL(href).pathname.slice(1);
		if (path.endsWith('/index.md')) {
			assert.match(await read(path), /^# .+\n/);
			continue;
		}
		const $ = load(await read(`${path}index.html`));
		assert.equal($('link[rel="canonical"]').attr('href'), href);
	}
});

test('programme Markdown alternatives preserve content and are discoverable', async () => {
	const sourceDir = new URL('../../src/content/programmes/', import.meta.url);
	const llms = await read('llms.txt');
	for (const file of await readdir(sourceDir)) {
		if (!file.endsWith('.md')) continue;
		const source = await readFile(new URL(file, sourceDir), 'utf8');
		const data = parse(source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '');
		const slug = file.slice(0, -3);
		const path = `programmes/${slug}/index.md`;
		if (data.archived) {
			await assert.rejects(read(path), { code: 'ENOENT' });
			assert.ok(!llms.includes(`/${slug}/index.md`));
			continue;
		}
		const markdown = await read(path);
		const canonical = `https://tinkercademy.com/programmes/${slug}/`;
		const $ = load(await read(`programmes/${slug}/index.html`));
		assert.ok(markdown.startsWith(`# ${data.title}\n`), slug);
		assert.ok(markdown.includes(`[View programme page](${canonical})`), slug);
		assert.ok(markdown.includes(data.cardBlurb), slug);
		if (data.duration) assert.ok(markdown.includes(`Duration: ${data.duration}`), slug);
		if (data.fit) {
			assert.ok(markdown.includes(`## ${data.fit.question}`), slug);
			assert.ok(markdown.includes(data.fit.answer), slug);
		}
		assert.match(markdown, /## Course Overview/);
		assert.doesNotMatch(markdown, /<(?:p|ul|li|table|div)\b|heroImage:|audienceIds:/);
		assert.equal($('head link[rel="alternate"][type="text/markdown"]').attr('href'), `${canonical}index.md`);
		assert.equal($('head link[rel="describedby"]').attr('href'), 'https://tinkercademy.com/llms.txt');
		assert.ok(llms.includes(`${canonical}index.md`), slug);
	}
	const workflows = await read('programmes/agentic-workflows-for-businesses/index.md');
	assert.match(workflows, /### Day 2: Build a reusable agent toolkit/);
	assert.match(workflows, /2 days: S\$960/);
	assert.match(workflows, /\(https:\/\/tinkercademy.com\/programmes\/vibe-coding-for-digital-builders\/\)/);
	const microbit = await read('programmes/imda-microbit-2025/index.md');
	assert.match(microbit, /\| Course \| Course Code \| Hours \| Details \|/);
	assert.match(microbit, /P-MICROSOFT-MAKE-BASIC \/ P-MICROSOFT-MAKE-INTM/);
	const schools = await read('programmes/code-for-fun-ai-workshop/index.md');
	assert.match(schools, /!\[Illustration of an AI chip connected to robotics and data icons\]\(https:\/\/tinkercademy.com\/images\//);
	assert.match(schools, /\(mailto:imda_codesg@imda.gov.sg\)/);
});

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

test('blog index preserves reviewed decorative hero images', async () => {
	const medium = new URL('../../src/content/blog/medium/', import.meta.url);
	const files = (await readdir(medium)).filter((path) => /\.mdx?$/.test(path));
	const decorative = [];

	for (const path of files) {
		const source = await readFile(new URL(path, medium), 'utf8');
		const frontmatter = parse(source.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '');
		if (frontmatter.heroAltDecision === 'decorative') decorative.push(frontmatter);
	}

	const $ = load(await read('blog/index.html'));
	assert.ok(decorative.length > 0, 'expected reviewed decorative hero records');
	for (const story of decorative) {
		const image = $(`a[href$="/${story.slug}/"] img`);
		assert.equal(image.length, 1, `${story.slug}: blog index hero image`);
		assert.equal(image.attr('alt'), '', `${story.slug}: decorative alt`);
	}
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
		assert.equal($('h1').length, 1, `${tutorial.slug}: single H1`);
		const description = $('meta[name="description"]').attr('content') ?? '';
		assert.ok(description.length >= 50 && description.length <= 160, `${tutorial.slug}: description length ${description.length}`);
	}
});

test('indexable HTML pages have complete image and search metadata', async () => {
	const dist = new URL('../../dist/', import.meta.url);
	const files = (await readdir(dist, { recursive: true })).filter((path) => path.endsWith('.html'));

	for (const path of files) {
		const $ = load(await readFile(new URL(path, dist), 'utf8'));
		if (!$('link[rel="canonical"]').length || $('meta[http-equiv="refresh"]').length) continue;

		assert.equal($('h1').length, 1, `${path}: single H1`);
		const description = $('meta[name="description"]').attr('content') ?? '';
		assert.ok(description.length >= 50 && description.length <= 160, `${path}: description length ${description.length}`);
		assert.equal($('img:not([alt])').length, 0, `${path}: image alt attributes`);
		let previousLevel = 0;
		for (const heading of $('main h1, main h2, main h3, main h4, main h5, main h6').toArray()) {
			const level = Number(heading.tagName.slice(1));
			assert.ok(level <= previousLevel + 1, `${path}: skipped level before ${$(heading).text()}`);
			previousLevel = level;
		}
	}
});

test('Bing-reported pages label images except explicitly hidden decorative copies', async () => {
	const paths = [
		'index.html',
		'programmes/swift-accelerator/index.html',
		'articles/space-launch-system-strategies-corporate-learning/index.html',
	];

	for (const path of paths) {
		const $ = load(await read(path));
		assert.equal($('img:not([alt]), img[alt=""]:not([aria-hidden="true"])').length, 0, path);
	}
});
