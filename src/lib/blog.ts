import { getCollection, type CollectionEntry } from 'astro:content';

export const SITE_ORIGIN = 'https://tinkercademy.com';
export const BLOG_PATH = '/blog';
export const BLOG_ORIGIN = `${SITE_ORIGIN}${BLOG_PATH}`;
export const BLOG_TITLE = 'Tinkercademy Build Log';
export const BLOG_DESCRIPTION = 'The company we build, by the company we build with.';
export const BLOG_FEED_URL = `${BLOG_ORIGIN}/feed.xml`;

export type BlogStory = CollectionEntry<'blog'>;

export async function getBlogStories(): Promise<BlogStory[]> {
	return (await getCollection('blog')).sort(
		(a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime() || a.data.title.localeCompare(b.data.title),
	);
}

export function getBlogYears(stories: BlogStory[]): number[] {
	return [...new Set(stories.map((story) => story.data.publishedAt.getUTCFullYear()))].sort((a, b) => b - a);
}

export function formatBlogDate(date: Date, precision?: 'month'): string {
	return new Intl.DateTimeFormat('en-GB', {
		...(precision === 'month' ? {} : { day: 'numeric' }),
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}

export function blogDateTime(date: Date, precision?: 'month'): string {
	return precision === 'month' ? date.toISOString().slice(0, 7) : date.toISOString();
}

export function blogStoryPath(story: BlogStory): string {
	return `/${story.data.publishedAt.getUTCFullYear()}/${story.data.slug}/`;
}

export function blogHref(pathname = '/'): string {
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return `${BLOG_PATH}${path}`;
}
