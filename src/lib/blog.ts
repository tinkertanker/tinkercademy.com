import { getCollection, type CollectionEntry } from 'astro:content';

export const BLOG_ORIGIN = 'https://blog.tinkercademy.com';
export const BLOG_TITLE = 'Tinkercademy Build Log';
export const BLOG_DESCRIPTION = 'The inventions, prototypes, lessons, and company we are building at Tinkercademy.';
export const BLOG_FEED_URL = `${BLOG_ORIGIN}/feed`;

const previewBasePath = import.meta.env.BLOG_PREVIEW_BASE_PATH?.trim().replace(/\/$/u, '') || '';

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

export function blogHref(pathname = '/'): string {
	if (!previewBasePath) return new URL(pathname, BLOG_ORIGIN).toString();
	if (pathname === '/feed') return `${previewBasePath}/feed.xml`;
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return path === '/' ? `${previewBasePath}/` : `${previewBasePath}${path}`;
}
