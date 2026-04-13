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

/**
 * Extract programme slugs referenced by a static page's CTAs.
 * CTAs whose URL matches `https://tinkercademy.com/programmes/<slug>`
 * are treated as programme references.
 */
function extractProgrammeSlugsFromCtas(ctas) {
	const PROGRAMME_RE = /^https?:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/;
	const slugs = [];
	for (const cta of ctas ?? []) {
		const match = cta.url?.match(PROGRAMME_RE);
		if (match) slugs.push(match[1]);
	}
	return slugs;
}

/**
 * Extract a short description from a CTA label by stripping the known
 * programme title, audience names, "Age Group" artefact, and duration.
 * Returns the remaining text or an empty string.
 */
function extractShortDescription(ctaLabel, programmeTitle, programmeDuration) {
	if (!ctaLabel || !programmeTitle) return '';

	// Everything after the title
	const idx = ctaLabel.indexOf(programmeTitle);
	if (idx < 0) return '';
	let rest = ctaLabel.substring(idx + programmeTitle.length);

	// Strip leading "Age Group" artefact
	rest = rest.replace(/^Age Group/, '');

	// If we know the duration, find it and take everything after
	if (programmeDuration) {
		const durIdx = rest.indexOf(programmeDuration);
		if (durIdx >= 0) {
			return rest.substring(durIdx + programmeDuration.length).trim();
		}
	}

	// Fallback: strip known audience labels
	const AUDIENCE_LABELS = ['Businesses', 'Public', 'Students', 'Teachers'];
	for (const label of AUDIENCE_LABELS) {
		if (rest.startsWith(label)) {
			rest = rest.substring(label.length);
			break;
		}
	}

	return rest.trim();
}

function buildSearchText(values) {
	return values.filter(Boolean).join(' ').trim();
}

/**
 * For a given static page, resolve the list of programmes it references
 * (via CTA URLs), enriched with card-display data.
 *
 * Returns an array of objects ready for <ProgrammeCard> / <CourseGrid>:
 *   { slug, title, heroImage, audienceLabel, audienceId, duration, shortDescription }
 */
export function getProgrammesForPage(page) {
	if (!page?.ctas) return [];

	const site = getSiteData();
	const programmeBySlug = new Map(site.programmes.map((p) => [p.slug, p]));
	const ctaSlugs = extractProgrammeSlugsFromCtas(page.ctas);

	// Build a map from slug → CTA label for short-description extraction
	const ctaLabelBySlug = new Map();
	const PROGRAMME_RE = /^https?:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/;
	for (const cta of page.ctas ?? []) {
		const match = cta.url?.match(PROGRAMME_RE);
		if (match) ctaLabelBySlug.set(match[1], cta.label);
	}

	const explicitCards = new Map((page.course_cards ?? []).map((card) => [card.slug, card]));

	return ctaSlugs.reduce((items, slug) => {
		const prog = programmeBySlug.get(slug);
		if (!prog) return items;

		const primaryAudience = prog.audiences?.[0];
		const ctaLabel = ctaLabelBySlug.get(slug) ?? '';
		const explicit = explicitCards.get(slug);
		const shortDesc =
			explicit?.blurb ||
			prog.card_blurb ||
			extractShortDescription(ctaLabel, prog.title, prog.duration) ||
			prog.description ||
			'';
		const audienceLabel = explicit?.audience_label || primaryAudience?.label || 'Programme';
		const duration = explicit?.duration || prog.duration || '';
		const heroImage = prog.hero_image ?? null;

		items.push({
			slug: prog.slug,
			title: prog.title,
			heroImage,
			audienceLabel,
			audienceId: primaryAudience?.id ?? '',
			duration,
			shortDescription: shortDesc,
			searchText: buildSearchText([
				prog.title,
				audienceLabel,
				duration,
				shortDesc,
				...(prog.topics?.map((topic) => topic.label) ?? []),
			]),
		});

		return items;
	}, []);
}

/**
 * Extract non-programme navigation CTA pills from a page's CTAs.
 * These are internal links that don't point to /programmes/ and aren't
 * footer/utility links (external, form, email, phone).
 */
/**
 * Minimal programme fields for site-wide search (header overlay).
 * Keeps payloads small for inline JSON in the document.
 */
export function getSearchableProgrammes() {
	const site = getSiteData();
	return site.programmes.map((p) => {
		const primary = p.audiences?.[0];
		const topicLabel = p.topics?.[0]?.label ?? '';
		return {
			slug: p.slug,
			title: p.title,
			audienceLabel: primary?.label ?? 'Programme',
			audienceId: primary?.id ?? '',
			topicLabel,
			duration: p.duration ?? '',
			searchText: buildSearchText([
				p.title,
				primary?.label,
				p.duration,
				topicLabel,
				...(p.topics?.map((t) => t.label) ?? []),
				...(p.audiences?.map((a) => a.label) ?? []),
			]),
		};
	});
}

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
					url = parsed.pathname || '/';
				}
			} catch {
				// keep as-is
			}
			return { label: cta.label, url };
		});
}
