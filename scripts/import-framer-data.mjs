/**
 * Legacy migration utility.
 *
 * Programme authoring is now Astro-first under `src/content/programmes/`.
 * Keep this script for Framer-backed collections, audit snapshots, and
 * historical migration work; do not extend it as the ongoing source of truth
 * for programme content unless the user explicitly asks for migration work.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { connect } from 'framer-api';
import YAML from 'yaml';
import { loadLocalEnv } from './lib/load-local-env.mjs';

const SCRIPTS_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(SCRIPTS_DIR);
const ARTIFACTS_DIR = path.join(SCRIPTS_DIR, '_artifacts', 'framer-api');
const PAGES_DIR = path.join(ROOT, 'src', 'data', 'pages');
const CRM_DIR = path.join(ROOT, 'src', 'data', 'crm');
const SITE_ORIGIN = 'https://tinkercademy.com';

const TUTORIAL_TOPIC_MAP = new Map([
	['micro:bit', ['iot']],
	['micropython', ['iot']],
	['app inventor', ['appdev']],
	['game development', ['gamedev']],
	['ui/ux', ['uiux']],
	['web development', ['webdev']],
]);

function cloneJson(value) {
	if (value == null) return value;
	return JSON.parse(JSON.stringify(value));
}

function cleanText(value) {
	return String(value ?? '')
		.replace(/\s+/gu, ' ')
		.replace(/\u00a0/gu, ' ')
		.trim();
}

function looksLikeEmailAddress(value) {
	return /^[^\s@/]+@[^\s@/]+\.[^\s@/]+(?:\?.*)?$/u.test(value);
}

function slugify(value) {
	return cleanText(value)
		.toLowerCase()
		.replace(/['"]/gu, '')
		.replace(/[^a-z0-9]+/gu, '-')
		.replace(/^-+|-+$/gu, '');
}

function unique(values) {
	return [...new Set(values.filter(Boolean))];
}

function htmlToText(html) {
	if (!html) return '';
	return cleanText(load(`<div>${html}</div>`).text());
}

function hasMeaningfulHtml(html) {
	return htmlToText(html).length > 0;
}

function extractHeading(html, fallback) {
	if (!html) return fallback;
	const $ = load(`<div>${html}</div>`);
	const heading = cleanText($('h1, h2, h3, h4').first().text());
	return heading || fallback;
}

function truncateText(value, maxLength = 220) {
	const text = cleanText(value);
	if (text.length <= maxLength) return text;
	const slice = text.slice(0, maxLength);
	const boundary = slice.lastIndexOf(' ');
	return `${(boundary > 120 ? slice.slice(0, boundary) : slice).trim()}…`;
}

function classifyCtaType(url) {
	const normalisedUrl = normaliseCtaUrl(url);
	if (!normalisedUrl) return 'external';
	if (normalisedUrl.startsWith('mailto:')) return 'email';
	if (normalisedUrl.startsWith('tel:')) return 'phone';
	if (/jotform|typeform|hubspot|airtable|formstack/i.test(normalisedUrl)) return 'form';

	try {
		if (new URL(normalisedUrl, SITE_ORIGIN).origin === SITE_ORIGIN) return 'internal';
	} catch {
		return 'external';
	}

	return 'external';
}

function normaliseCtaUrl(url) {
	const value = cleanText(url);
	if (!value) return null;
	if (/^mailto:/i.test(value)) return `mailto:${value.slice('mailto:'.length).trim()}`;
	if (/^tel:/i.test(value)) return `tel:${value.slice('tel:'.length).trim()}`;
	if (!/^[a-z][a-z\d+.-]*:/i.test(value) && looksLikeEmailAddress(value)) return `mailto:${value}`;
	return value;
}

function asString(field) {
	return typeof field?.value === 'string' ? cleanText(field.value) || null : null;
}

function asNumber(field) {
	return typeof field?.value === 'number' ? field.value : null;
}

function asBoolean(field) {
	return typeof field?.value === 'boolean' ? field.value : false;
}

function asLink(field) {
	return typeof field?.value === 'string' ? field.value : null;
}

function asImageUrl(field) {
	return typeof field?.value?.url === 'string' ? field.value.url : null;
}

function asImageAlt(field) {
	return typeof field?.value?.altText === 'string' ? field.value.altText : null;
}

function asRichText(field) {
	return typeof field?.value === 'string' && hasMeaningfulHtml(field.value) ? field.value : null;
}

function asStringArray(field) {
	return Array.isArray(field?.value) ? field.value.filter((entry) => typeof entry === 'string') : [];
}

function readJsonFile(name) {
	return readFile(path.join(PAGES_DIR, name), 'utf8').then((value) => JSON.parse(value));
}

async function writeJsonFile(name, value) {
	await writeFile(path.join(PAGES_DIR, name), JSON.stringify(value, null, 2));
}

async function writeYamlFile(name, value) {
	const document = new YAML.Document(value);
	document.options.indent = 2;
	document.options.lineWidth = 0;
	await writeFile(path.join(CRM_DIR, name), String(document));
}

function buildSeoRecord({ title, description, canonical }, defaults) {
	const resolvedDescription = description || defaults?.description || '';
	const siteTitle = defaults?.title || 'Tinkercademy';
	const resolvedTitle = title ? `${title} - ${siteTitle}` : siteTitle;

	return {
		title: resolvedTitle,
		description: resolvedDescription,
		canonical,
		openGraph: {
			title: resolvedTitle,
			description: resolvedDescription,
			image: null,
		},
		twitter: {
			title: resolvedTitle,
			description: resolvedDescription,
			image: null,
		},
		robots: defaults?.robots ?? 'max-image-preview:large',
	};
}

function buildRichTextItem(label, html) {
	if (!hasMeaningfulHtml(html)) return null;
	return {
		type: 'richtext',
		label: extractHeading(html, label),
		html,
		text: htmlToText(html),
	};
}

function buildTutorialContent(fieldsByName) {
	const content = [];
	const primaryImage = asImageUrl(fieldsByName['Final Product']);
	const secondaryImage = asImageUrl(fieldsByName['Final Product 2']);

	if (primaryImage) {
		content.push({
			type: 'image',
			src: primaryImage,
		});
	}

	for (const fieldName of ['Goals', 'Materials']) {
		const html = asRichText(fieldsByName[fieldName]);
		const item = buildRichTextItem(fieldName.slice(0, -1), html);
		if (item) content.push(item);
	}

	for (let step = 1; step <= 13; step += 1) {
		const richText = buildRichTextItem(`Step ${step}`, asRichText(fieldsByName[`Step ${step}`]));
		if (!richText) continue;
		content.push(richText);

		for (let imageIndex = 1; imageIndex <= 10; imageIndex += 1) {
			const imageUrl = asImageUrl(fieldsByName[`Image ${step}.${imageIndex}`]);
			if (!imageUrl) continue;
			content.push({
				type: 'image',
				src: imageUrl,
			});
		}
	}

	if (!primaryImage && secondaryImage) {
		content.unshift({
			type: 'image',
			src: secondaryImage,
		});
	}

	return content;
}

function buildSectionsFromContent(content) {
	return content
		.filter((item) => item.type === 'richtext' && item.html)
		.map((item) => ({
			heading: item.label ?? 'Section',
			html: item.html,
			text: item.text ?? '',
			kind: 'labelled',
		}));
}

function mergeById(existing, additions) {
	const result = [...existing];
	const indexById = new Map(existing.map((item, index) => [item.id, index]));

	for (const addition of additions) {
		const index = indexById.get(addition.id);
		if (index == null) {
			indexById.set(addition.id, result.length);
			result.push(addition);
			continue;
		}

		result[index] = { ...result[index], ...addition };
	}

	return result;
}

function collectionItemToFieldMap(collection, item) {
	const fieldsByName = {};
	for (const [fieldId, value] of Object.entries(item.fieldData ?? {})) {
		const field = collection.fieldsById.get(fieldId);
		fieldsByName[field?.name ?? fieldId] = cloneJson(value);
	}
	return fieldsByName;
}

function collectionRecordToMap(collection) {
	return new Map(
		collection.items.map((item) => [
			item.slug,
			{
				...item,
				fieldsByName: collectionItemToFieldMap(collection, item),
			},
		]),
	);
}

function buildPlatformRecords(collection) {
	return collection.items
		.map((item) => {
			const fields = collectionItemToFieldMap(collection, item);
			return {
				id: item.slug,
				label: asString(fields.Title) ?? item.slug,
				icon: asImageUrl(fields.Icon),
				domain_ids: asStringArray(fields.Domains),
				content_html: asRichText(fields.Content),
				content_text: htmlToText(asRichText(fields.Content)),
				source_id: item.id,
			};
		})
		.sort((left, right) => left.label.localeCompare(right.label));
}

function buildDomainRecords(collection) {
	return collection.items
		.map((item) => {
			const fields = collectionItemToFieldMap(collection, item);
			return {
				id: item.slug,
				label: asString(fields.Title) ?? item.slug,
				source_id: item.id,
			};
		})
		.sort((left, right) => left.label.localeCompare(right.label));
}

function buildArticleRecords(collection) {
	return collection.items
		.map((item) => {
			const fields = collectionItemToFieldMap(collection, item);
			const contentHtml = asRichText(fields.Content);
			return {
				id: item.id,
				slug: item.slug,
				title: asString(fields.Title) ?? item.slug,
				date: fields.Date?.value ?? null,
				image: asImageUrl(fields.Image),
				filter: asString(fields.Filter),
				content_html: contentHtml,
				content_text: htmlToText(contentHtml),
				source_id: item.id,
			};
		})
		.sort((left, right) => left.title.localeCompare(right.title));
}

function buildExternalLogoRecords(collection) {
	return collection.items
		.map((item) => {
			const fields = collectionItemToFieldMap(collection, item);
			const contentHtml = asRichText(fields.Content);
			return {
				id: item.slug,
				label: asString(fields.Organisation) ?? item.slug,
				logo: asImageUrl(fields.Logo),
				partner: asBoolean(fields.Partner),
				type: asString(fields.Type),
				featured: asBoolean(fields.Featured),
				active: asBoolean(fields.Active),
				content_html: contentHtml,
				content_text: htmlToText(contentHtml),
				source_id: item.id,
			};
		})
		.sort((left, right) => left.label.localeCompare(right.label));
}

function buildSignUpCta(fields) {
	const rawUrl = asLink(fields['Sign up URL']);
	const url = normaliseCtaUrl(rawUrl);
	if (!url) return null;

	const label = asString(fields['Sign up button text']) ?? 'Sign up';
	return {
		id: slugify(`${label}-${rawUrl ?? url}`),
		label,
		url,
		type: classifyCtaType(url),
	};
}

function buildProgrammes(existingProgrammes, programmeCollection, currentTopics, currentAudiences, ctaDestinations) {
	const topicIds = new Set(currentTopics.map((topic) => topic.id));
	const audienceIds = new Set(currentAudiences.map((audience) => audience.id));
	const ctaIds = new Set(ctaDestinations.map((cta) => cta.id));
	const forms = [];
	const extraCtas = [];
	const remoteBySlug = collectionRecordToMap(programmeCollection);

	const programmes = existingProgrammes.map((programme) => {
		const remote = remoteBySlug.get(programme.slug);
		if (!remote) return programme;

		const fields = remote.fieldsByName;
		const signUpCta = buildSignUpCta(fields);
		if (signUpCta && !ctaIds.has(signUpCta.id)) {
			ctaIds.add(signUpCta.id);
			extraCtas.push(signUpCta);
		}

		if (signUpCta?.type === 'form') {
			forms.push({
				id: slugify(signUpCta.url),
				provider: /jotform/i.test(signUpCta.url) ? 'jotform' : 'external-link',
				endpoint: signUpCta.url,
				method: 'link',
			});
		}

		const remoteAudienceIds = asStringArray(fields.Audiences).filter((id) => audienceIds.has(id));
		const remoteDomainIds = asStringArray(fields.Domains);
		const remoteTopicIds = remoteDomainIds.filter((id) => topicIds.has(id));

		const introHtml = asRichText(fields['Intro Paragraph']);
		const objectivesHtml = asRichText(fields['Learning Objectives']);
		const detailsHtml = asRichText(fields.Details);
		const ctaIdList = signUpCta ? unique([signUpCta.id, ...(programme.cta_ids ?? [])]) : programme.cta_ids;

		return {
			...programme,
			subtitle: programme.subtitle ?? asString(fields.Subtitle),
			duration: programme.duration ?? asString(fields['Course Length']),
			hero_image: programme.hero_image ?? asImageUrl(fields['Header Image']),
			audience_ids: unique([...(programme.audience_ids ?? []), ...remoteAudienceIds]),
			topic_ids: unique([...(programme.topic_ids ?? []), ...remoteTopicIds]),
			cta_ids: ctaIdList,
			card_blurb: programme.card_blurb ?? truncateText(htmlToText(introHtml), 180),
			featured: asBoolean(fields.Featured),
			weight: asNumber(fields.Weight),
			icon: asImageUrl(fields.Icon),
			icon_alt: asImageAlt(fields.Icon),
			platform_ids: asStringArray(fields.Platforms),
			domain_ids: remoteDomainIds,
			sign_up_label: signUpCta?.label ?? null,
			sign_up_url: signUpCta?.url ?? null,
			intro_html: introHtml,
			learning_objectives_html: objectivesHtml,
			details_html: detailsHtml,
			source_collection: programmeCollection.name,
			source_id: remote.id,
		};
	});

	return {
		programmes,
		extraCtas,
		extraForms: forms,
	};
}

function buildTutorialSeo(tutorial, siteSettings) {
	return buildSeoRecord(
		{
			title: tutorial.title,
			description: tutorial.description,
			canonical: `${SITE_ORIGIN}/tutorials/${tutorial.slug}`,
		},
		siteSettings.default_seo,
	);
}

function buildTutorialFromRemote(remote, tutorialCollection, siteSettings) {
	const fields = remote.fieldsByName;
	const content = buildTutorialContent(fields);
	const heroImage = asImageUrl(fields['Final Product']) ?? asImageUrl(fields['Final Product 2']);
	const topicValue = cleanText(asString(fields.Topic) ?? '');
	const topicIds = TUTORIAL_TOPIC_MAP.get(topicValue.toLowerCase()) ?? [];

	const tutorial = {
		id: remote.id,
		slug: remote.slug,
		title: asString(fields.Title) ?? remote.slug,
		subtitle: topicValue || null,
		description: asString(fields.Description),
		hero_image: heroImage,
		audience_ids: [],
		topic_ids: topicIds,
		seo: null,
		content,
		sections: buildSectionsFromContent(content),
		source_collection: tutorialCollection.name,
		source_id: remote.id,
	};

	tutorial.seo = buildTutorialSeo(tutorial, siteSettings);
	return tutorial;
}

function buildTutorials(existingTutorials, tutorialCollection, siteSettings) {
	const remoteBySlug = collectionRecordToMap(tutorialCollection);
	const seenSlugs = new Set();

	const tutorials = existingTutorials.map((tutorial) => {
		const remote = remoteBySlug.get(tutorial.slug);
		if (!remote) return tutorial;

		seenSlugs.add(tutorial.slug);
		const fields = remote.fieldsByName;
		const topicValue = cleanText(asString(fields.Topic) ?? '');
		const remoteTopicIds = TUTORIAL_TOPIC_MAP.get(topicValue.toLowerCase()) ?? [];

		return {
			...tutorial,
			subtitle: tutorial.subtitle ?? (topicValue || null),
			topic_ids: unique([...(tutorial.topic_ids ?? []), ...remoteTopicIds]),
			source_collection: tutorialCollection.name,
			source_id: remote.id,
		};
	});

	for (const remote of remoteBySlug.values()) {
		if (seenSlugs.has(remote.slug)) continue;
		tutorials.push(buildTutorialFromRemote(remote, tutorialCollection, siteSettings));
	}

	tutorials.sort((left, right) => left.title.localeCompare(right.title));
	return tutorials;
}

async function fetchCollectionDump(collection) {
	const [fields, items] = await Promise.all([collection.getFields(), collection.getItems()]);

	return {
		id: collection.id,
		name: collection.name,
		fields: fields.map((field) => ({
			id: field.id,
			name: field.name,
			type: field.type,
			collectionId: field.collectionId ?? null,
		})),
		fieldsById: new Map(fields.map((field) => [field.id, field])),
		items: items.map((item) => ({
			id: item.id,
			nodeId: item.nodeId,
			slug: item.slug,
			draft: item.draft,
			fieldData: cloneJson(item.fieldData),
		})),
	};
}

await loadLocalEnv(ROOT);

if (!process.env.FRAMER_API_KEY) {
	throw new Error('FRAMER_API_KEY is required. Add it to .env.local or .env first.');
}

if (!process.env.FRAMER_PROJECT_URL) {
	throw new Error('FRAMER_PROJECT_URL is required. Add it to .env.local or .env first.');
}

const [
	currentProgrammes,
	currentTutorials,
	currentAudiences,
	currentTopics,
	currentCtaDestinations,
	currentForms,
	siteSettings,
] = await Promise.all([
	readJsonFile('programmes.json'),
	readJsonFile('tutorials.json'),
	readJsonFile('audiences.json'),
	readJsonFile('topics.json'),
	readJsonFile('cta-destinations.json'),
	readJsonFile('forms.json'),
	readJsonFile('site-settings.json'),
]);

const framer = await connect(process.env.FRAMER_PROJECT_URL, process.env.FRAMER_API_KEY);

try {
	const [projectInfo, rawCollections, rawPages] = await Promise.all([
		framer.getProjectInfo(),
		framer.getCollections(),
		framer.getNodesWithType('WebPageNode'),
	]);

	const collections = await Promise.all(rawCollections.map((collection) => fetchCollectionDump(collection)));
	const collectionsByName = new Map(collections.map((collection) => [collection.name, collection]));
	const pageSummaries = rawPages
		.map((page) => ({
			id: page.id,
			path: page.path ?? null,
			collectionId: page.collectionId ?? null,
		}))
		.sort((left, right) => (left.path ?? '').localeCompare(right.path ?? ''));

	await mkdir(ARTIFACTS_DIR, { recursive: true });
	await writeFile(
		path.join(ARTIFACTS_DIR, 'export.json'),
		JSON.stringify(
			{
				fetchedAt: new Date().toISOString(),
				projectInfo,
				pages: pageSummaries,
				collections: collections.map((collection) => ({
					id: collection.id,
					name: collection.name,
					fields: collection.fields,
					items: collection.items.map((item) => ({
						id: item.id,
						nodeId: item.nodeId,
						slug: item.slug,
						draft: item.draft,
						fieldDataByName: collectionItemToFieldMap(collection, item),
					})),
				})),
			},
			null,
			2,
		),
	);

	const platforms = buildPlatformRecords(collectionsByName.get('Platforms'));
	const domains = buildDomainRecords(collectionsByName.get('Domains'));
	const articles = buildArticleRecords(collectionsByName.get('Articles'));
	const externalLogos = buildExternalLogoRecords(collectionsByName.get('External Logos'));

	const programmeResult = buildProgrammes(
		currentProgrammes,
		collectionsByName.get('Programmes'),
		currentTopics,
		currentAudiences,
		currentCtaDestinations,
	);
	const tutorials = buildTutorials(currentTutorials, collectionsByName.get('Tutorials'), siteSettings);
	const ctaDestinations = mergeById(currentCtaDestinations, programmeResult.extraCtas);
	const forms = mergeById(currentForms, programmeResult.extraForms);

	await mkdir(PAGES_DIR, { recursive: true });
	await mkdir(CRM_DIR, { recursive: true });

	await Promise.all([
		writeJsonFile('programmes.json', programmeResult.programmes),
		writeJsonFile('tutorials.json', tutorials),
		writeJsonFile('cta-destinations.json', ctaDestinations),
		writeJsonFile('forms.json', forms),
		writeJsonFile('platforms.json', platforms),
		writeJsonFile('domains.json', domains),
		writeJsonFile('articles.json', articles),
		writeJsonFile('external-logos.json', externalLogos),
		writeYamlFile('programmes.yml', programmeResult.programmes),
		writeYamlFile('tutorials.yml', tutorials),
		writeYamlFile('cta-destinations.yml', ctaDestinations),
		writeYamlFile('forms.yml', forms),
		writeYamlFile('platforms.yml', platforms),
		writeYamlFile('domains.yml', domains),
		writeYamlFile('articles.yml', articles),
		writeYamlFile('external-logos.yml', externalLogos),
	]);

	console.log(
		JSON.stringify(
			{
				project: projectInfo.name,
				programmes: programmeResult.programmes.length,
				tutorials: tutorials.length,
				platforms: platforms.length,
				domains: domains.length,
				articles: articles.length,
				externalLogos: externalLogos.length,
				wroteArtifact: path.join(ARTIFACTS_DIR, 'export.json'),
			},
			null,
			2,
		),
	);
} finally {
	await framer.disconnect();
}
