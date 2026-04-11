import assets from '../data/pages/assets.json';
import audiences from '../data/pages/audiences.json';
import contacts from '../data/pages/contacts.json';
import ctaDestinations from '../data/pages/cta-destinations.json';
import forms from '../data/pages/forms.json';
import locations from '../data/pages/locations.json';
import programmes from '../data/pages/programmes.json';
import siteSettings from '../data/pages/site-settings.json';
import socialLinks from '../data/pages/social-links.json';
import staticPages from '../data/pages/static-pages.json';
import topics from '../data/pages/topics.json';
import tutorials from '../data/pages/tutorials.json';

function indexBy(items) {
	return new Map((items ?? []).map((item) => [item.id, item]));
}

export function getSiteData() {
	const audienceById = indexBy(audiences);
	const topicById = indexBy(topics);
	const ctaById = indexBy(ctaDestinations);

	return {
		siteSettings,
		audiences,
		topics,
		contacts,
		locations,
		socialLinks,
		ctaDestinations,
		forms,
		staticPages,
		assets,
		programmes: programmes.map((programme) => ({
			...programme,
			audiences: (programme.audience_ids ?? []).map((id) => audienceById.get(id)).filter(Boolean),
			topics: (programme.topic_ids ?? []).map((id) => topicById.get(id)).filter(Boolean),
			ctas: (programme.cta_ids ?? []).map((id) => ctaById.get(id)).filter(Boolean),
		})),
		tutorials: tutorials.map((tutorial) => ({
			...tutorial,
			audiences: (tutorial.audience_ids ?? []).map((id) => audienceById.get(id)).filter(Boolean),
			topics: (tutorial.topic_ids ?? []).map((id) => topicById.get(id)).filter(Boolean),
		})),
	};
}

export function getStaticPage(pagePath) {
	return getSiteData().staticPages.find((page) => page.path === pagePath) ?? null;
}
