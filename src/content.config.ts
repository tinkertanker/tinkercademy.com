import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import audiences from './data/pages/audiences.json';
import domains from './data/pages/domains.json';
import platforms from './data/pages/platforms.json';

const audienceIds = audiences.map((item) => item.id) as [string, ...string[]];
const domainIds = domains.map((item) => item.id) as [string, ...string[]];
const platformIds = platforms.map((item) => item.id) as [string, ...string[]];

const programmes = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/programmes' }),
	schema: z.object({
		title: z.string().min(1),
		subtitle: z.string().min(1),
		duration: z.string().min(1).optional(),
		heroImage: z.string().min(1),
		// Describes the banner for screen readers and AI agents; falls back to "<title> programme banner".
		heroAlt: z.string().min(1).optional(),
		heroObjectPosition: z
			.string()
			.regex(/^\d{1,3}(?:\.\d+)?%\s+\d{1,3}(?:\.\d+)?%$/, 'Use a CSS object-position pair such as 50% 15%')
			.optional(),
		audienceIds: z.array(z.enum(audienceIds)).min(1),
		domainIds: z.array(z.enum(domainIds)).min(1),
		platformIds: z.array(z.enum(platformIds)),
		courseType: z.enum(['public']).optional(),
		cardBlurb: z.string().min(1),
		weight: z.number().int(),
		archived: z.boolean().optional(),
		homeFeaturedRank: z.number().int().positive().optional(),
		signUpLabel: z.string().min(1).optional(),
		signUpUrl: z.string().min(1).optional(),
		primaryCta: z
			.object({
				label: z.string().min(1),
				url: z.url().refine((value) => value.startsWith('https://'), 'Use an HTTPS URL'),
			})
			.optional(),
		// The reader's main question and a short "it depends" answer, shown as
		// the first H2 under the title.
		fit: z
			.object({
				question: z.string().min(1),
				answer: z.string().min(1).refine((value) => value.split(/\s+/).length <= 100, 'Keep the answer to 100 words or fewer'),
			})
			.optional(),
		// Shown as "Published" / "Updated" on the page and in structured data.
		// Bump updatedAt whenever the course content changes.
		publishedAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		// Machine-readable copies of facts stated in the Details section; they feed
		// the Course structured data so crawlers don't have to parse prose.
		fee: z
			.object({
				amount: z.number().nonnegative(),
				basis: z.string().min(1),
			})
			.optional(),
		location: z.string().min(1).optional(),
		courseMode: z.enum(['onsite', 'online', 'blended']).optional(),
		sessions: z.array(z.object({ start: z.coerce.date(), end: z.coerce.date() })).optional(),
		seoTitle: z.string().min(1).optional(),
		seoDescription: z.string().min(1).optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string().min(1),
		subtitle: z.string().min(1).optional(),
		description: z.string().min(1),
		slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Blog story slugs use lowercase words separated by hyphens'),
		legacyPath: z.string().regex(/^[^/]+$/, 'Legacy blog paths must be one segment without slashes').optional(),
		canonicalUrl: z.url(),
		sourceMediumUrl: z.url().optional(),
		author: z.object({
			id: z.string().min(1),
			name: z.string().min(1),
			handle: z.string().min(1).nullable().optional(),
			profileUrl: z.url().optional(),
		}),
		publishedAt: z.coerce.date(),
		publishedAtPrecision: z.literal('month').optional(),
		updatedAt: z.coerce.date().optional(),
		tags: z.array(z.object({ name: z.string().min(1), slug: z.string().min(1) })).default([]),
		license: z.literal('All rights reserved'),
		rightsStatus: z.enum(['review-required', 'permission-recorded', 'organisation-owned', 'author-owned']),
		heroImage: z.string().startsWith('/blog-media/').optional(),
		heroImageWidth: z.number().int().positive().optional(),
		heroImageHeight: z.number().int().positive().optional(),
		heroAlt: z.string().optional(),
		heroAltDecision: z.enum(['meaningful', 'decorative', 'review-required']).optional(),
		provenance: z.object({
			mediumId: z.string().min(1),
			publicationId: z.string().min(1),
			sourceSha256: z.string().regex(/^[a-f0-9]{64}$/),
			sourceKind: z.enum(['medium-json', 'medium-rss']).optional(),
			sourceUrl: z.url().optional(),
			sourceCreator: z.string().min(1).optional(),
		}).optional(),
		migration: z.object({
			paragraphCount: z.number().int().nonnegative(),
			imageCount: z.number().int().nonnegative(),
			embedCount: z.number().int().nonnegative(),
			altReviewRequired: z.number().int().nonnegative(),
		}).optional(),
	}).superRefine((article, context) => {
		const year = article.publishedAt.getUTCFullYear();
		const expectedCanonical = `https://tinkercademy.com/blog/${year}/${article.slug}/`;
		if (article.canonicalUrl !== expectedCanonical) {
			context.addIssue({
				code: 'custom',
				path: ['canonicalUrl'],
				message: `Canonical must be ${expectedCanonical}`,
			});
		}
		if (article.heroImage && !article.heroAltDecision) {
			context.addIssue({
				code: 'custom',
				path: ['heroAltDecision'],
				message: 'A hero image requires an explicit alt-text decision',
			});
		}
	}),
});

export const collections = {
	programmes,
	blog,
};
