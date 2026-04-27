import articles from '../data/pages/articles.json';
import assets from '../data/pages/assets.json';
import audiences from '../data/pages/audiences.json';
import contacts from '../data/pages/contacts.json';
import ctaDestinations from '../data/pages/cta-destinations.json';
import domains from '../data/pages/domains.json';
import externalLogos from '../data/pages/external-logos.json';
import forms from '../data/pages/forms.json';
import locations from '../data/pages/locations.json';
import platforms from '../data/pages/platforms.json';
import siteSettings from '../data/pages/site-settings.json';
import socialLinks from '../data/pages/social-links.json';
import staticPages from '../data/pages/static-pages.json';
import topics from '../data/pages/topics.json';
import tutorials from '../data/pages/tutorials.json';
import { normaliseFramerMedia } from './media.js';

const FRAMER_TITLE_SUFFIX_RE = /\s*-\s*My Framer Site$/;
const normalisedArticles = normaliseFramerMedia(articles);
const normalisedAssets = normaliseFramerMedia(assets);
const normalisedAudiences = normaliseFramerMedia(audiences);
const normalisedContacts = normaliseFramerMedia(contacts);
const normalisedCtaDestinations = normaliseFramerMedia(ctaDestinations);
const normalisedDomains = normaliseFramerMedia(domains);
const normalisedExternalLogos = normaliseFramerMedia(externalLogos);
const normalisedForms = normaliseFramerMedia(forms);
const normalisedLocations = normaliseFramerMedia(locations);
const normalisedPlatforms = normaliseFramerMedia(platforms);
const normalisedSiteSettings = normaliseFramerMedia(siteSettings);
const normalisedSocialLinks = normaliseFramerMedia(socialLinks);
const normalisedStaticPages = normaliseFramerMedia(staticPages);
const normalisedTopics = normaliseFramerMedia(topics);
const normalisedTutorials = normaliseFramerMedia(tutorials);

function indexBy(items) {
	return new Map((items ?? []).map((item) => [item.id, item]));
}

function stripFramerTitleSuffix(value) {
	return typeof value === 'string' ? value.replace(FRAMER_TITLE_SUFFIX_RE, '').trim() : value;
}

function normaliseTutorial(tutorial) {
	if (!tutorial) return tutorial;

	return {
		...tutorial,
		title: stripFramerTitleSuffix(tutorial.title),
		seo: tutorial.seo
			? {
					...tutorial.seo,
					title: stripFramerTitleSuffix(tutorial.seo.title),
					openGraph: tutorial.seo.openGraph
						? {
								...tutorial.seo.openGraph,
								title: stripFramerTitleSuffix(tutorial.seo.openGraph.title),
							}
						: tutorial.seo.openGraph,
					twitter: tutorial.seo.twitter
						? {
								...tutorial.seo.twitter,
								title: stripFramerTitleSuffix(tutorial.seo.twitter.title),
							}
						: tutorial.seo.twitter,
				}
			: tutorial.seo,
	};
}

export function getSiteData() {
	const topicById = indexBy(normalisedTopics);
	const domainById = indexBy(normalisedDomains);
	const enrichedPlatforms = normalisedPlatforms.map((platform) => ({
		...platform,
		domains: (platform.domain_ids ?? []).map((id) => domainById.get(id)).filter(Boolean),
	}));

	return {
		siteSettings: normalisedSiteSettings,
		articles: normalisedArticles,
		audiences: normalisedAudiences,
		domains: normalisedDomains,
		topics: normalisedTopics,
		contacts: normalisedContacts,
		externalLogos: normalisedExternalLogos,
		locations: normalisedLocations,
		platforms: enrichedPlatforms,
		socialLinks: normalisedSocialLinks,
		ctaDestinations: normalisedCtaDestinations,
		forms: normalisedForms,
		staticPages: normalisedStaticPages,
		assets: normalisedAssets,
		tutorials: normalisedTutorials.map((tutorial) => {
			const normalisedTutorial = normaliseTutorial(tutorial);

			return {
				...normalisedTutorial,
				audiences: (normalisedTutorial.audience_ids ?? [])
					.map((id) => audienceById.get(id))
					.filter(Boolean),
				topics: (normalisedTutorial.topic_ids ?? [])
					.map((id) => topicById.get(id))
					.filter(Boolean),
			};
		}),
	};
}

export function getStaticPage(pagePath, site = getSiteData()) {
	return site.staticPages.find((page) => page.path === pagePath) ?? null;
}

/**
 * Extract non-programme navigation CTA pills from a page's CTAs.
 * These are internal links that don't point to /programmes/ and aren't
 * footer/utility links (external, form, email, phone).
 */
export function getNavPillsForPage(page) {
	if (!page?.ctas) return [];

	const PROGRAMME_RE = /\/programmes\//;
	return (page.ctas ?? [])
		.filter((cta) => {
			if (cta.type !== 'internal') return false;
			if (PROGRAMME_RE.test(cta.url ?? '')) return false;
			// Skip generic footer links that appear on every page
			const label = (cta.label ?? '').toLowerCase();
			if (['our courses', 'our projects'].includes(label)) return false;
			return true;
		})
		.map((cta) => {
			let url = cta.url ?? '/';
			// Normalise tinkercademy.com URLs to relative paths
			try {
				const parsed = new URL(url, 'https://tinkercademy.com');
				if (parsed.origin === 'https://tinkercademy.com') {
					const path = parsed.pathname || '/';
					url =
						path === '/' || path.endsWith('/') || /\.[^/]+$/.test(path)
							? path
							: `${path}/`;
				}
			} catch {
				// keep as-is
			}
			return { label: cta.label, url };
		});
}
