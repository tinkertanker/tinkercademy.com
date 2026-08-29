import { getCollection, type CollectionEntry } from 'astro:content';

export const BLOG_ORIGIN = 'https://blog.tinkercademy.com';
export const BLOG_TITLE = 'Tinkercademy Build Log';
export const BLOG_DESCRIPTION = 'The inventions, prototypes, lessons, and company we are building at Tinkercademy.';
export const BLOG_FEED_URL = `${BLOG_ORIGIN}/feed`;

export type BlogStory = CollectionEntry<'blog'>;

export async function getBlogStories(): Promise<BlogStory[]> {
	return (await getCollection('blog')).sort(
		(a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.data.title.localeCompare(b.data.title),
	);
}

export function getBlogYears(stories: BlogStory[]): number[] {
	return [...new Set(stories.map((story) => story.data.publishedAt.getUTCFullYear()))].sort((a, b) => b - a);
}

export function formatBlogDate(date: Date): string {
	return new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}
