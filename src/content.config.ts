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
		duration: z.string().min(1),
		heroImage: z.string().min(1),
		audienceIds: z.array(z.enum(audienceIds)).min(1),
		domainIds: z.array(z.enum(domainIds)).min(1),
		platformIds: z.array(z.enum(platformIds)).min(1),
		cardBlurb: z.string().min(1),
		weight: z.number().int(),
		homeFeaturedRank: z.number().int().positive().optional(),
		signUpLabel: z.string().min(1).optional(),
		signUpUrl: z.string().min(1).optional(),
		seoTitle: z.string().min(1).optional(),
		seoDescription: z.string().min(1).optional(),
	}),
});

export const collections = {
	programmes,
};
