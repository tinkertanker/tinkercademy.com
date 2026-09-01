import rss from '@astrojs/rss';

import { BLOG_DESCRIPTION, BLOG_ORIGIN, BLOG_TITLE, getBlogStories } from '../../lib/blog';

export async function GET() {
	const stories = (await getBlogStories()).slice(0, 20);
	return rss({
		title: BLOG_TITLE,
		description: BLOG_DESCRIPTION,
		site: `${BLOG_ORIGIN}/`,
		items: stories.map((story) => ({
			title: story.data.title,
			description: story.data.description,
			link: story.data.canonicalUrl,
			pubDate: story.data.publishedAt,
			author: story.data.author.name,
			categories: story.data.tags.map(({ name }) => name),
			customData: `<guid isPermaLink="true">${story.data.canonicalUrl}</guid>`,
		})),
	});
}
