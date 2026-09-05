import assert from 'node:assert/strict';
import test from 'node:test';

import {
	BLOG_ORIGIN,
	LEGACY_BLOG_ORIGIN,
	buildCanonicalUrl,
	classifyEmbedProvider,
	normaliseMediumStory,
	renderInlineHtml,
	rewriteInternalStoryHref,
	slugifyStoryTitle,
} from '../lib/medium.mjs';
import { parseMediumRss } from '../lib/medium-rss.mjs';
import {
	applyImageReview,
	applyRightsReview,
	emptyReviewDecisions,
	placementKey,
	validateReviewDecisions,
} from '../lib/medium-review.mjs';

const rawStory = {
	success: true,
	payload: {
		value: {
			id: 'abc123def456',
			title: 'A test story',
			uniqueSlug: 'a-test-story-abc123def456',
			creatorId: 'author123',
			homeCollectionId: 'ca1fc9543b6f',
			canonicalUrl: `${LEGACY_BLOG_ORIGIN}/a-test-story-abc123def456`,
			createdAt: 1_499_999_999_000,
			firstPublishedAt: 1_500_000_000_000,
			latestPublishedAt: 1_500_000_001_000,
			updatedAt: 1_500_000_002_000,
			visibility: 0,
			license: 0,
			virtuals: {
				noIndex: false,
				subtitle: 'A useful summary.',
				tags: [{ name: 'Testing', slug: 'testing' }],
			},
			content: {
				bodyModel: {
					paragraphs: [{ type: 3, text: 'A test story', markups: [] }],
					sections: [],
				},
			},
		},
		references: {
			User: {
				author123: {
					userId: 'author123',
					name: 'Exact Author Name',
					username: 'exact-author',
				},
			},
		},
	},
};

test('normalises the public Medium record while preserving legacy provenance', () => {
	const story = normaliseMediumStory(rawStory);
	assert.equal(story.id, 'abc123def456');
	assert.equal(story.legacyPath, 'a-test-story-abc123def456');
	assert.equal(story.legacyUrl, `${LEGACY_BLOG_ORIGIN}/a-test-story-abc123def456`);
	assert.equal(story.slug, 'a-test-story');
	assert.equal(story.canonicalUrl, `${BLOG_ORIGIN}/2017/a-test-story/`);
	assert.equal(story.sourceMediumUrl, 'https://medium.com/tinkertanker/a-test-story-abc123def456');
	assert.deepEqual(story.author, {
		id: 'author123',
		name: 'Exact Author Name',
		handle: 'exact-author',
		profileUrl: 'https://medium.com/@exact-author',
	});
	assert.equal(story.rightsStatus, 'review-required');
	assert.equal(story.license, 'All rights reserved');
});

test('discards automatic opening excerpts but retains distinct editorial summaries', () => {
	const raw = structuredClone(rawStory);
	raw.payload.value.content.bodyModel.paragraphs.push({ type: 1, text: 'The opening paragraph continues here.' });
	for (const subtitle of ['The opening paragraph…', 'The opening paragraph...', 'The opening paragraph continues here.']) {
		raw.payload.value.content.subtitle = subtitle;
		assert.equal(normaliseMediumStory(raw).subtitle, '');
	}
	raw.payload.value.content.subtitle = 'A distinct editorial summary.';
	assert.equal(normaliseMediumStory(raw).subtitle, 'A distinct editorial summary.');
});

test('detects excerpts after editor introductions and normalises their whitespace', () => {
	const raw = structuredClone(rawStory);
	raw.payload.value.content.bodyModel.paragraphs.push(
		{ type: 1, text: 'An introduction from the editor.' },
		{ type: 1, text: 'My internship\u2009—\u2009a chance to learn new things.' },
	);
	raw.payload.value.content.subtitle = 'My internship — a chance to learn…';
	assert.equal(normaliseMediumStory(raw).subtitle, '');
});

test('preserves authored subheadings and does not mistake image captions for excerpts', () => {
	for (const type of [13, 4]) {
		const raw = structuredClone(rawStory);
		raw.payload.value.content.subtitle = 'An authored summary';
		raw.payload.value.content.bodyModel.paragraphs.push({ type, text: 'An authored summary' });
		assert.equal(normaliseMediumStory(raw).subtitle, 'An authored summary');
	}
});

test('rejects records that are not public stories in the expected publication', () => {
	const wrongPublication = structuredClone(rawStory);
	wrongPublication.payload.value.homeCollectionId = 'someone-else';
	assert.throws(() => normaliseMediumStory(wrongPublication), /publication/i);

	const wrongCanonical = structuredClone(rawStory);
	wrongCanonical.payload.value.canonicalUrl = 'https://example.com/not-the-story';
	assert.throws(() => normaliseMediumStory(wrongCanonical), /canonical/i);
});

test('builds stable year-and-clean-slug blog canonicals', () => {
	assert.equal(slugifyStoryTitle('From Vue.js to micro:bit: Twelve Weeks Building EdTech'), 'from-vue-js-to-micro-bit-twelve-weeks-building-edtech');
	assert.equal(
		buildCanonicalUrl('2025-08-01T00:00:00.000Z', 'from-vue-js-to-micro-bit-twelve-weeks-building-edtech'),
		'https://tinkercademy.com/blog/2025/from-vue-js-to-micro-bit-twelve-weeks-building-edtech/',
	);
});

test('rewrites known Medium story links to apex blog canonicals', () => {
	const destinationsById = new Map([['200bae67e8f1', 'https://tinkercademy.com/blog/2017/whats-a-tinkertanker/']]);
	assert.equal(
		rewriteInternalStoryHref(
			'https://medium.com/tinkertanker/old-title-200bae67e8f1?source=post_page',
			destinationsById,
		),
		'https://tinkercademy.com/blog/2017/whats-a-tinkertanker/',
	);
	assert.equal(
		rewriteInternalStoryHref('https://example.com/reference', destinationsById),
		'https://example.com/reference',
	);
	assert.equal(
		rewriteInternalStoryHref('source:https://example.com/image-credit', destinationsById),
		'https://example.com/image-credit',
	);
	assert.equal(
		rewriteInternalStoryHref('http://get hacking.com', destinationsById),
		'http://gethacking.com',
	);
	assert.equal(
		rewriteInternalStoryHref(
			'https://encrypted.google.com/url?sa=t&url=https%3A%2F%2Fgethacking.com%2Fcollections%2Fmicro-bit&usg=tracker',
			destinationsById,
		),
		'https://gethacking.com/collections/micro-bit',
	);
});

test('renders escaped inline markup and safe rewritten links', () => {
	const html = renderInlineHtml(
		{
			text: 'Use <this> guide',
			markups: [
				{ type: 1, start: 0, end: 3 },
				{ type: 3, start: 11, end: 16, href: 'https://example.com' },
			],
		},
		new Map(),
	);
	assert.equal(html, '<strong>Use</strong> &lt;this&gt; <a href="https://example.com">guide</a>');
});

test('classifies only allowlisted embed providers', () => {
	assert.equal(classifyEmbedProvider('https://youtu.be/Zgs7llg84dM'), 'youtube');
	assert.equal(classifyEmbedProvider('https://gist.github.com/example/123'), 'github-gist');
	assert.equal(classifyEmbedProvider('https://twitter.com/example/status/1'), 'twitter');
	assert.equal(classifyEmbedProvider('https://unknown.invalid/item'), 'external-link');
});

test('normalises public RSS stories without trackers or Embedly wrappers', () => {
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
		<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel><item>
				<title>A new story</title>
				<link>https://blog.tinkercademy.com/a-new-story-abc123def456?source=rss</link>
				<guid>https://medium.com/p/abc123def456</guid>
				<dc:creator>OddHandle</dc:creator>
				<pubDate>Tue, 01 Sep 2026 04:08:01 GMT</pubDate>
				<atom:updated>2026-09-01T04:08:00.078Z</atom:updated>
				<content:encoded><![CDATA[
					<p>Text with <strong>emphasis</strong> and <a href="https://example.com">a link</a>.</p>
					<h3>A heading</h3>
					<figure><img alt="" src="https://cdn-images-1.medium.com/max/1024/1*example.png" /><figcaption>A useful caption</figcaption></figure>
					<iframe src="https://cdn.embedly.com/widgets/media.html?url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dexample" width="640" height="480"></iframe>
					<img src="https://medium.com/_/stat?event=post.clientViewed&amp;postId=abc123def456" width="1" height="1" alt="">
					<hr><p>A new story was originally published in Tinkercademy Build Log on Medium.</p>
				]]></content:encoded>
			</item></channel></rss>`;
	const [story] = parseMediumRss(rss, {
		storyOverrides: {
			abc123def456: {
				title: 'A clearer story title',
				publishedAt: '2025-08-01T00:00:00.000Z',
				publishedAtPrecision: 'month',
				textReplacements: [{ from: 'Text', to: 'Copy' }],
				author: { name: 'Exact Author', handle: 'OddHandle' },
			},
		},
	});

	assert.equal(story.id, 'abc123def456');
	assert.equal(story.legacyPath, 'a-new-story-abc123def456');
	assert.equal(story.title, 'A clearer story title');
	assert.equal(story.publishedAt, '2025-08-01T00:00:00.000Z');
	assert.equal(story.publishedAtPrecision, 'month');
	assert.equal(story.author.name, 'Exact Author');
	assert.equal(story.sourceCreator, 'OddHandle');
	assert.deepEqual(story.paragraphs.map(({ type }) => type), [1, 13, 4, 11]);
	assert.equal(story.paragraphs[0].text, 'Copy with emphasis and a link.');
	assert.deepEqual(story.paragraphs[0].markups, [
		{ type: 1, start: 10, end: 18 },
		{ type: 3, start: 23, end: 29, href: 'https://example.com' },
	]);
	assert.equal(story.paragraphs[2].metadata.id, '1*example.png');
	assert.equal(story.paragraphs[2].text, 'A useful caption');
	assert.equal(story.paragraphs[3].iframe.href, 'https://www.youtube.com/watch?v=example');
});

test('builds stable review keys and accepts an unresolved review ledger', () => {
	assert.equal(
		placementKey({ storyId: 'abc123def456', paragraph: 7, imageId: '1*source-image.jpeg' }),
		'abc123def456:7:1*source-image.jpeg',
	);
	assert.deepEqual(validateReviewDecisions(emptyReviewDecisions()), { version: 1, rights: {}, images: {} });
});

test('requires evidence and an audit trail for completed rights reviews', () => {
	const review = emptyReviewDecisions();
	review.rights['a-test-story-abc123def456'] = { status: 'permission-recorded' };
	assert.throws(() => validateReviewDecisions(review), /rights basis or evidence/i);
	review.rights['a-test-story-abc123def456'].basis = 'Written contributor approval dated 2026-08-30';
	assert.throws(() => validateReviewDecisions(review), /reviewer name/i);
	review.rights['a-test-story-abc123def456'].reviewer = 'Editorial reviewer';
	review.rights['a-test-story-abc123def456'].reviewedAt = '2026-08-30T10:00:00.000Z';
	assert.equal(applyRightsReview('review-required', review.rights['a-test-story-abc123def456']), 'permission-recorded');
	assert.doesNotThrow(() => validateReviewDecisions(review));
});

test('requires meaningful alt text and keeps decorative alt empty', () => {
	const review = emptyReviewDecisions();
	const audit = { reviewer: 'Accessibility reviewer', reviewedAt: '2026-08-30T10:00:00.000Z' };
	review.images['story:1:image'] = { decision: 'meaningful', alt: '', ...audit };
	assert.throws(() => validateReviewDecisions(review), /meaningful alt text/i);
	review.images['story:1:image'] = { decision: 'decorative', alt: 'Not empty', ...audit };
	assert.throws(() => validateReviewDecisions(review), /must have empty alt text/i);
});

test('applies reviewed image decisions with explicit provenance', () => {
	const source = { decision: 'review-required', alt: '', source: null };
	assert.deepEqual(
		applyImageReview(source, {
			decision: 'meaningful',
			alt: 'A student testing a cardboard robot on a classroom table.',
			credit: 'Photo by Example Person',
			notes: 'Reviewed in article context',
		}),
		{
			decision: 'meaningful',
			alt: 'A student testing a cardboard robot on a classroom table.',
			source: 'editorial-review',
			credit: 'Photo by Example Person',
			notes: 'Reviewed in article context',
		},
	);
	assert.deepEqual(applyImageReview(source, { decision: 'decorative' }), {
		decision: 'decorative',
		alt: '',
		source: 'editorial-review',
		credit: '',
		notes: '',
	});
});
