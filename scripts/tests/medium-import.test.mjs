import assert from 'node:assert/strict';
import test from 'node:test';

import {
	BLOG_ORIGIN,
	buildCanonicalUrl,
	classifyEmbedProvider,
	normaliseMediumStory,
	renderInlineHtml,
	rewriteInternalStoryHref,
} from '../lib/medium.mjs';
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
			canonicalUrl: `${BLOG_ORIGIN}/a-test-story-abc123def456`,
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

test('normalises the public Medium record without changing attribution or legacy routing', () => {
	const story = normaliseMediumStory(rawStory);
	assert.equal(story.id, 'abc123def456');
	assert.equal(story.legacyPath, 'a-test-story-abc123def456');
	assert.equal(story.canonicalUrl, `${BLOG_ORIGIN}/a-test-story-abc123def456`);
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

test('rejects records that are not public stories in the expected publication', () => {
	const wrongPublication = structuredClone(rawStory);
	wrongPublication.payload.value.homeCollectionId = 'someone-else';
	assert.throws(() => normaliseMediumStory(wrongPublication), /publication/i);

	const wrongCanonical = structuredClone(rawStory);
	wrongCanonical.payload.value.canonicalUrl = 'https://example.com/not-the-story';
	assert.throws(() => normaliseMediumStory(wrongCanonical), /canonical/i);
});

test('builds exact no-trailing-slash blog canonicals', () => {
	assert.equal(
		buildCanonicalUrl('a-test-story-abc123def456'),
		'https://blog.tinkercademy.com/a-test-story-abc123def456',
	);
});

test('rewrites known Medium story links to preserved blog-host canonicals', () => {
	const pathsById = new Map([['200bae67e8f1', 'whats-a-tinkertanker-200bae67e8f1']]);
	assert.equal(
		rewriteInternalStoryHref(
			'https://medium.com/tinkertanker/old-title-200bae67e8f1?source=post_page',
			pathsById,
		),
		'https://blog.tinkercademy.com/whats-a-tinkertanker-200bae67e8f1',
	);
	assert.equal(
		rewriteInternalStoryHref('https://example.com/reference', pathsById),
		'https://example.com/reference',
	);
	assert.equal(
		rewriteInternalStoryHref(
			'https://encrypted.google.com/url?sa=t&url=https%3A%2F%2Fgethacking.com%2Fcollections%2Fmicro-bit&usg=tracker',
			pathsById,
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
