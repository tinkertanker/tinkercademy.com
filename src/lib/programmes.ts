import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import audiencesData from '../data/pages/audiences.json';
import domainsData from '../data/pages/domains.json';
import platformsData from '../data/pages/platforms.json';
import { localiseFramerImage, normaliseFramerMedia } from './media.js';
import { createProgrammeFilterHref } from './programme-filters.ts';
import { getSeriesMembership, type ProgrammeSeriesMembership } from './programme-series.ts';

type AudienceRecord = {
	id: string;
	label: string;
	source_id?: string;
};

type DomainRecord = {
	id: string;
	label: string;
	source_id?: string;
};

type PlatformRecord = {
	id: string;
	label: string;
	icon?: string | null;
	domain_ids?: string[];
	content_html?: string | null;
	content_text?: string | null;
	source_id?: string;
};

type ProgrammeEntry = CollectionEntry<'programmes'>;

export type ProgrammeSurface = 'all' | 'schools' | 'professionals' | 'individuals';

type FilterLabelMaps = {
	audience: Record<string, string>;
	domain: Record<string, string>;
	platform: Record<string, string>;
};

export type ResolvedTaxonomyRecord = {
	id: string;
	label: string;
};

export type ResolvedPlatformRecord = ResolvedTaxonomyRecord & {
	icon?: string | null;
	domains: ResolvedTaxonomyRecord[];
};

export type ResolvedProgramme = {
	entry: ProgrammeEntry;
	slug: string;
	title: string;
	subtitle: string;
	duration: string;
	heroImage: string;
	cardBlurb: string;
	weight: number;
	homeFeaturedRank: number | null;
	signUpLabel: string | null;
	signUpUrl: string | null;
	seoTitle: string | null;
	seoDescription: string | null;
	audienceIds: string[];
	domainIds: string[];
	platformIds: string[];
	audiences: ResolvedTaxonomyRecord[];
	domains: ResolvedTaxonomyRecord[];
	platforms: ResolvedPlatformRecord[];
	primaryAudience: ResolvedTaxonomyRecord | null;
	series: ProgrammeSeriesMembership | null;
	searchText: string;
};

export type ProgrammeCardData = {
	slug: string;
	title: string;
	heroImage: string | null;
	audienceLabel: string;
	audienceId: string;
	audienceIds: string[];
	domainIds: string[];
	platformIds: string[];
	duration: string;
	shortDescription: string;
	searchText: string;
	badgeHref: string | null;
	seriesCode: string | null;
};

export type ProgrammeCardOverride = {
	slug: string;
	title?: string | null;
	audience_label?: string | null;
	duration?: string | null;
	blurb?: string | null;
};

type ProgrammeCardOptions = {
	badgeBasePath?: string;
};

const SCHOOL_AUDIENCE_IDS = new Set(['students', 'teachers']);
const PROFESSIONAL_AUDIENCE_IDS = new Set(['businesses', 'public']);
const INDIVIDUAL_AUDIENCE_IDS = new Set(['public']);

const normalisedAudiences = normaliseFramerMedia(audiencesData) as AudienceRecord[];
const normalisedDomains = normaliseFramerMedia(domainsData) as DomainRecord[];
const normalisedPlatforms = normaliseFramerMedia(platformsData) as PlatformRecord[];

const audienceById = new Map(normalisedAudiences.map((item) => [item.id, item]));
const audienceByLabel = new Map(
	normalisedAudiences.map((item) => [item.label.trim().toLowerCase(), item]),
);
const domainById = new Map(normalisedDomains.map((item) => [item.id, item]));
const platformById = new Map(normalisedPlatforms.map((item) => [item.id, item]));

const filterLabelMaps: FilterLabelMaps = {
	audience: Object.fromEntries(normalisedAudiences.map((item) => [item.id, item.label])),
	domain: Object.fromEntries(normalisedDomains.map((item) => [item.id, item.label])),
	platform: Object.fromEntries(normalisedPlatforms.map((item) => [item.id, item.label])),
};

function sortProgrammes(left: ResolvedProgramme, right: ResolvedProgramme) {
	return right.weight - left.weight || left.title.localeCompare(right.title) || left.slug.localeCompare(right.slug);
}

function buildSearchText(values: Array<string | null | undefined>) {
	return values.filter(Boolean).join(' ').trim();
}

function resolveTaxonomyRecord<T extends AudienceRecord | DomainRecord>(
	id: string,
	lookup: Map<string, T>,
	kind: 'audience' | 'domain',
) {
	const record = lookup.get(id);

	if (!record) {
		throw new Error(`Unknown ${kind} id "${id}" referenced by programme content.`);
	}

	return {
		id: record.id,
		label: record.label,
	};
}

function resolvePlatformRecord(id: string): ResolvedPlatformRecord {
	const record = platformById.get(id);

	if (!record) {
		throw new Error(`Unknown platform id "${id}" referenced by programme content.`);
	}

	return {
		id: record.id,
		label: record.label,
		icon: record.icon ?? null,
		domains: (record.domain_ids ?? [])
			.map((domainId) => resolveTaxonomyRecord(domainId, domainById, 'domain')),
	};
}

function resolveProgramme(entry: ProgrammeEntry): ResolvedProgramme {
	const audiences = entry.data.audienceIds.map((id) => resolveTaxonomyRecord(id, audienceById, 'audience'));
	const domains = entry.data.domainIds.map((id) => resolveTaxonomyRecord(id, domainById, 'domain'));
	const platforms = entry.data.platformIds.map((id) => resolvePlatformRecord(id));
	const primaryAudience = audiences[0] ?? null;
	const series = getSeriesMembership(entry.id);

	return {
		entry,
		slug: entry.id,
		title: entry.data.title,
		subtitle: entry.data.subtitle,
		duration: entry.data.duration,
		heroImage: localiseFramerImage(entry.data.heroImage),
		cardBlurb: entry.data.cardBlurb,
		weight: entry.data.weight,
		homeFeaturedRank: entry.data.homeFeaturedRank ?? null,
		signUpLabel: entry.data.signUpLabel ?? null,
		signUpUrl: entry.data.signUpUrl ?? null,
		seoTitle: entry.data.seoTitle ?? null,
		seoDescription: entry.data.seoDescription ?? null,
		audienceIds: [...entry.data.audienceIds],
		domainIds: [...entry.data.domainIds],
		platformIds: [...entry.data.platformIds],
		audiences,
		domains,
		platforms,
		primaryAudience,
		series,
		searchText: buildSearchText([
			entry.data.title,
			entry.data.subtitle,
			entry.data.duration,
			entry.data.cardBlurb,
			series?.code,
			series?.label,
			...audiences.map((item) => item.label),
			...domains.map((item) => item.label),
			...platforms.map((item) => item.label),
		]),
	};
}

function loadProgrammes() {
	return getCollection('programmes').then((entries) =>
		entries.map((entry) => resolveProgramme(entry)).sort(sortProgrammes),
	);
}

function matchesSurface(programme: ResolvedProgramme, surface: ProgrammeSurface) {
	switch (surface) {
		case 'schools':
			return programme.audienceIds.some((id) => SCHOOL_AUDIENCE_IDS.has(id));
		case 'professionals':
			return programme.audienceIds.some((id) => PROFESSIONAL_AUDIENCE_IDS.has(id));
		case 'individuals':
			return programme.audienceIds.some((id) => INDIVIDUAL_AUDIENCE_IDS.has(id));
		case 'all':
		default:
			return true;
	}
}

export function getProgrammeFilterLabels() {
	return filterLabelMaps;
}

export function getProgrammeFilterOptions() {
	return {
		audiences: normalisedAudiences.map((item) => ({ id: item.id, label: item.label })),
		domains: normalisedDomains.map((item) => ({ id: item.id, label: item.label })),
		platforms: normalisedPlatforms.map((item) => ({ id: item.id, label: item.label })),
	};
}

function trimText(value: string | null | undefined) {
	return String(value ?? '').trim();
}

function cleanOverrideBlurb(value: string | null | undefined) {
	return trimText(value).replace(/\s*Our Courses Our Projects$/, '').trim();
}

function resolveAudienceFromOverride(
	overrideLabel: string | null | undefined,
	programme: ResolvedProgramme,
) {
	const label = trimText(overrideLabel).toLowerCase();
	if (!label) return programme.primaryAudience;
	return audienceByLabel.get(label) ?? programme.primaryAudience;
}

function normaliseOverride(override: ProgrammeCardOverride) {
	return {
		...override,
		title: trimText(override.title),
		audience_label: trimText(override.audience_label),
		duration: trimText(override.duration),
		blurb: cleanOverrideBlurb(override.blurb),
	};
}

function scoreOverride(override: ProgrammeCardOverride) {
	const normalised = normaliseOverride(override);
	let score = 0;

	if (normalised.title && normalised.title.toLowerCase() !== 'popular courses') score += 4;
	if (normalised.audience_label) score += 3;
	if (normalised.duration) score += 2;
	if (normalised.blurb) score += 5;

	return score;
}

export function buildProgrammeCardOverrides(overrides: ProgrammeCardOverride[] = []) {
	const bestOverrideBySlug = new Map<string, ProgrammeCardOverride>();

	for (const override of overrides) {
		if (!override?.slug) continue;

		const existing = bestOverrideBySlug.get(override.slug);
		if (!existing || scoreOverride(override) >= scoreOverride(existing)) {
			bestOverrideBySlug.set(override.slug, override);
		}
	}

	return bestOverrideBySlug;
}

export function toProgrammeCardData(
	programme: ResolvedProgramme,
	override?: ProgrammeCardOverride | null,
	options: ProgrammeCardOptions = {},
): ProgrammeCardData {
	const normalisedOverride = override ? normaliseOverride(override) : null;
	const audience = resolveAudienceFromOverride(normalisedOverride?.audience_label, programme);
	const badgeHref = audience
		? createProgrammeFilterHref({ audience: audience.id }, options.badgeBasePath ?? '/courses-all')
		: null;
	const title = normalisedOverride?.title || programme.title;
	const audienceLabel = normalisedOverride?.audience_label || audience?.label || 'Programme';
	const duration = normalisedOverride?.duration || programme.duration;
	const shortDescription = normalisedOverride?.blurb || programme.cardBlurb;
	const seriesCode = programme.series?.code ?? null;

	return {
		slug: programme.slug,
		title,
		heroImage: programme.heroImage ?? null,
		audienceLabel,
		audienceId: audience?.id ?? '',
		audienceIds: [...programme.audienceIds],
		domainIds: [...programme.domainIds],
		platformIds: [...programme.platformIds],
		duration,
		shortDescription,
		searchText: buildSearchText([
			title,
			audienceLabel,
			duration,
			shortDescription,
			seriesCode,
			programme.series?.label,
			...programme.audiences.map((item) => item.label),
			...programme.domains.map((item) => item.label),
			...programme.platforms.map((item) => item.label),
		]),
		badgeHref,
		seriesCode,
	};
}

export async function getAllProgrammes() {
	return loadProgrammes();
}

export async function getProgrammeBySlug(slug: string) {
	const programmes = await getAllProgrammes();
	return programmes.find((programme) => programme.slug === slug) ?? null;
}

export async function getProgrammesForSurface(surface: ProgrammeSurface) {
	const programmes = await getAllProgrammes();
	return programmes.filter((programme) => matchesSurface(programme, surface));
}

export async function getProgrammesBySlugs(slugs: string[]) {
	const programmes = await getAllProgrammes();
	const programmeBySlug = new Map(programmes.map((programme) => [programme.slug, programme]));

	return slugs
		.map((slug) => programmeBySlug.get(slug))
		.filter((programme): programme is ResolvedProgramme => Boolean(programme));
}

export async function getHomeFeaturedProgrammes() {
	const programmes = await getAllProgrammes();

	return programmes
		.filter((programme) => programme.homeFeaturedRank != null)
		.sort(
			(left, right) =>
				(left.homeFeaturedRank ?? Number.MAX_SAFE_INTEGER) -
					(right.homeFeaturedRank ?? Number.MAX_SAFE_INTEGER) ||
				sortProgrammes(left, right),
		);
}

export async function getSearchableProgrammes() {
	const programmes = await getAllProgrammes();

	return programmes.map((programme) => ({
		slug: programme.slug,
		title: programme.title,
		audienceLabel: programme.primaryAudience?.label ?? 'Programme',
		audienceId: programme.primaryAudience?.id ?? '',
		topicLabel: programme.domains[0]?.label ?? '',
		duration: programme.duration ?? '',
		searchText: programme.searchText,
	}));
}
