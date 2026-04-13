import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import YAML from 'yaml';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CRAWL_FILE = path.join(ROOT, '_artifacts', 'crawl', 'site.json');
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CRM_DIR = path.join(DATA_DIR, 'crm');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

function cleanText(value) {
	return value.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

const AUDIENCE_TEXT = new Set([
	'Businesses',
	'Business',
	'Public',
	'Students',
	'Teachers',
	'Individuals',
	'Professionals',
	'Schools',
	'Parents',
]);
const DURATION_RE = /(\d+|½|half|full).*(hours?|days?|weeks?|months?|years?|module|sessions?)/i;
const CANONICAL_SOCIALS = [
	{ id: 'x', platform: 'x', matcher: /x\.com\/tinkercademy\/?$/i },
	{ id: 'facebook', platform: 'facebook', matcher: /facebook\.com\/tinkercademy\/?$/i },
	{ id: 'instagram', platform: 'instagram', matcher: /instagram\.com\/tinkercademy\/?$/i },
	{ id: 'linkedin', platform: 'linkedin', matcher: /linkedin\.com\/company\/tinkertanker\/?$/i },
	{ id: 'blog', platform: 'blog', matcher: /blog\.tinkercademy\.com\/?$/i },
];

function slugify(value) {
	return cleanText(value.toLowerCase()).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function decodeSlug(pagePath) {
	return decodeURIComponent(pagePath.split('/').at(-1) ?? '');
}

function ensureArray(value) {
	return Array.isArray(value) ? value : [];
}

function uniqueBy(items, keyFn) {
	const seen = new Set();
	return items.filter((item) => {
		const key = keyFn(item);
		if (!key || seen.has(key)) return false;
		seen.add(key);
		return true;
	});
}

function uniqueStrings(values) {
	return [...new Set((values ?? []).filter(Boolean))];
}

function isProbablySlug(value) {
	return /^[a-z0-9-]+$/.test(value ?? '');
}

function sameBlock(left, right) {
	return left?.tag === right?.tag && left?.text === right?.text;
}

function sameChunk(blocks, leftStart, rightStart, size) {
	if (rightStart + size > blocks.length) return false;

	for (let index = 0; index < size; index += 1) {
		if (!sameBlock(blocks[leftStart + index], blocks[rightStart + index])) {
			return false;
		}
	}

	return true;
}

function collapseRepeatedChunks(blocks) {
	const source = blocks ?? [];
	const collapsed = [];

	for (let cursor = 0; cursor < source.length; ) {
		let matchedChunk = false;
		const maxChunkSize = Math.min(12, Math.floor((source.length - cursor) / 2));

		for (let size = maxChunkSize; size >= 2; size -= 1) {
			if (!sameChunk(source, cursor, cursor + size, size)) continue;

			let nextCursor = cursor + size;
			while (sameChunk(source, cursor, nextCursor, size)) {
				nextCursor += size;
			}

			collapsed.push(...source.slice(cursor, cursor + size));
			cursor = nextCursor;
			matchedChunk = true;
			break;
		}

		if (!matchedChunk) {
			collapsed.push(source[cursor]);
			cursor += 1;
		}
	}

	return collapsed;
}

function getBlocks(page) {
	return collapseRepeatedChunks(page.contentBlocks ?? []);
}

function pickLead(page) {
	const headings = uniqueStrings(
		getBlocks(page)
			.filter((block) => block.tag === 'h1')
			.map((block) => block.text),
	);
	if (headings.length > 1) return headings[1];

	const firstRichText = page.framer?.structured?.content?.find((entry) => entry.kind === 'richtext');
	const richParagraph = firstRichText?.html ? cleanText(load(firstRichText.html)('p').first().text()) : '';
	const richText = richParagraph || firstRichText?.text;
	const paragraph = getBlocks(page).find((block) => block.tag === 'p' && block.text.length > 32)?.text;
	return richText || paragraph || page.seo?.description || null;
}

function pickTitle(page) {
	const blocks = getBlocks(page);
	const heroHeading = blocks.find((block) => block.tag === 'h1')?.text ?? null;
	const contentHeading = heroHeading ?? blocks.find((block) => block.tag === 'h2')?.text;
	const framerTitle = page.framer?.structured?.title;

	if (page.type === 'static' || page.type === 'root') {
		if (heroHeading) return heroHeading;
		if (framerTitle && !isProbablySlug(framerTitle)) return framerTitle;
	}

	if (framerTitle && !isProbablySlug(framerTitle)) return framerTitle;
	if (contentHeading) return contentHeading;
	return (page.seo?.title ?? page.path).replace(/\s+-\s+Tinkercademy.*$/, '');
}

function pickHeroImage(page) {
	return (
		page.framer?.structured?.heroImage?.src ||
		page.images?.find((image) => !/OHbHnfvpGLsxcntGKsueCChDt4|Hpib447RIgaq1OV8VQAc9Vxhac/.test(image.src))?.src ||
		page.images?.[0]?.src ||
		null
	);
}

function blocksAfterLabel(blocks, label) {
	const index = (blocks ?? []).findIndex((block) => block.text === label);
	if (index === -1) return [];

	const values = [];
	for (let cursor = index + 1; cursor < (blocks ?? []).length; cursor += 1) {
		const block = blocks[cursor];
		if (/^h[1-4]$/.test(block.tag)) break;
		if (block.tag === 'p') values.push(block.text);
	}

	return values;
}

function inferProgrammeFallbacks(page) {
	const blocks = getBlocks(page);
	const duration = blocksAfterLabel(blocks, 'Duration:')[0] ?? null;
	const audiences = blocksAfterLabel(blocks, 'Audiences:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));
	const topics = blocksAfterLabel(blocks, 'Type:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));

	return { duration, audiences, topics };
}

function inferLocation(contactPage) {
	const joined = getBlocks(contactPage ?? {}).map((block) => block.text).join(' ');
	const match = joined.match(/59 Jalan Pemimpin #04-01,\s*L&Y Building,\s*Singapore 577218/i);
	if (!match) return [];

	return [
		{
			id: 'jalan-pemimpin-office',
			name: 'Tinkercademy Office',
			address: '59 Jalan Pemimpin #04-01, L&Y Building, Singapore 577218',
			delivery_modes: ['in-person'],
		},
	];
}

function classifyCtaType(url) {
	if (url.startsWith('mailto:')) return 'email';
	if (url.startsWith('tel:')) return 'phone';
	if (/jotform|typeform|hubspot|airtable|formstack/i.test(url)) return 'form';
	if (url.startsWith('https://tinkercademy.com')) return 'internal';
	return 'external';
}

function normaliseRelations(relations, kind) {
	return ensureArray(relations)
		.filter((relation) => relation.kind === kind)
		.flatMap((relation) => relation.items)
		.map((item) => ({
			id: item.slug || slugify(item.label),
			label: item.label,
			source_id: item.id,
		}));
}

function makeContentItems(page) {
	if (page.framer?.structured?.content?.length) {
		return page.framer.structured.content.map((entry) => {
			if (entry.kind === 'image') {
				return {
					type: 'image',
					src: entry.src,
					width: entry.pixelWidth ?? null,
					height: entry.pixelHeight ?? null,
				};
			}

			return {
				type: 'richtext',
				label: entry.label || null,
				html: entry.html,
				text: entry.text,
			};
		});
	}

	const sourceBlocks = getBlocks(page);
	const blocks = [];
	let currentList = null;

	for (const block of sourceBlocks) {
		if (block.tag === 'li') {
			currentList ??= [];
			currentList.push(block.text);
			continue;
		}

		if (currentList?.length) {
			blocks.push({ type: 'list', items: currentList });
			currentList = null;
		}

		blocks.push({ type: block.tag, text: block.text });
	}

	if (currentList?.length) {
		blocks.push({ type: 'list', items: currentList });
	}

	for (let size = Math.floor(blocks.length / 2); size >= 2; size -= 1) {
		const left = JSON.stringify(blocks.slice(0, size));
		const right = JSON.stringify(blocks.slice(size, size * 2));
		if (left === right) {
			return [...blocks.slice(0, size), ...blocks.slice(size * 2)];
		}
	}

	return blocks;
}

function extractProgrammeSlug(url) {
	const match = url?.match(/^https?:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/);
	return match ? decodeURIComponent(match[1]) : null;
}

function looksLikeCourseAudience(text) {
	return AUDIENCE_TEXT.has(text);
}

function looksLikeDuration(text) {
	return DURATION_RE.test(text);
}

function extractCourseCards(page) {
	const blocks = getBlocks(page);
	const programmeRefs = uniqueBy(
		(page.ctas ?? [])
			.map((cta) => ({
				slug: extractProgrammeSlug(cta.url),
				label: cta.label,
			}))
			.filter((item) => item.slug),
		(item) => item.slug,
	);

	if (programmeRefs.length === 0) return [];

	const shouldStartImmediately = /^\/courses-/.test(page.path);
	const startIndex = shouldStartImmediately
		? 0
		: blocks.findIndex((block) => /^Professional Courses$|^School Courses$/.test(block.text));
	if (startIndex === -1) return [];

	const cards = [];
	let current = null;

	for (const block of blocks.slice(startIndex + (shouldStartImmediately ? 0 : 1))) {
		if (block.text === "Let's Work Together!") break;
		if (block.text === 'Search' || /^Professional Courses$|^School Courses$|^All Courses$/.test(block.text)) {
			continue;
		}

		if (block.tag === 'h2') {
			if (current?.title) cards.push(current);
			current = {
				slug: null,
				title: block.text,
				audience_label: '',
				duration: '',
				blurb: '',
			};
			continue;
		}

		if (!current || block.tag !== 'p') continue;
		if (!current.audience_label && looksLikeCourseAudience(block.text)) {
			current.audience_label = block.text;
			continue;
		}
		if (looksLikeCourseAudience(block.text)) continue;
		if (!current.duration && looksLikeDuration(block.text)) {
			current.duration = block.text;
			continue;
		}
		if (block.text === current.audience_label || block.text === current.duration) continue;
		current.blurb = current.blurb ? `${current.blurb} ${block.text}` : block.text;
	}

	if (current?.title) cards.push(current);

	return cards
		.map((card, index) => {
			const byTitle = programmeRefs.find((ref) => ref.label?.includes(card.title));
			const byIndex = programmeRefs[index];
			return {
				...card,
				slug: byTitle?.slug ?? byIndex?.slug ?? null,
			};
		})
		.filter((card) => card.slug);
}

function normaliseSections(contentItems) {
	return ensureArray(contentItems)
		.filter((item) => item.type === 'richtext' && item.html)
		.map((item) => ({
			heading: item.label || null,
			html: item.html,
			text: item.text ?? '',
			kind: item.label ? 'labelled' : 'richtext',
		}));
}

function toRenderedCta(cta) {
	return {
		label: cta.label,
		url: cta.url,
		type: classifyCtaType(cta.url),
	};
}

function pickCtasByLabel(ctas, labels) {
	const uniqueCtas = uniqueBy(ctas ?? [], (cta) => `${cta.label}::${cta.url}`);
	return labels
		.map((label) => uniqueCtas.find((cta) => cta.label === label))
		.filter(Boolean)
		.map(toRenderedCta);
}

function extractFlagshipItems(page, blocks) {
	const startIndex = blocks.findIndex((block) => /^Our Flagship/.test(block.text));
	if (startIndex === -1) return [];

	const endIndex = blocks.findIndex((block, index) => index > startIndex && /^Popular Courses?$/.test(block.text));
	const slice = blocks.slice(startIndex + 1, endIndex === -1 ? blocks.length : endIndex);
	const images = (page.images ?? [])
		.filter((image) => {
			const width = Number(image.width);
			const height = Number(image.height);
			return Number.isFinite(width) && Number.isFinite(height) && width >= 320 && width <= 720 && height >= 320 && height <= 720;
		})
		.slice(0, 3);
	const items = [];
	let currentItem = null;

	for (const block of slice) {
		if (block.tag === 'h3') {
			if (currentItem) items.push(currentItem);
			currentItem = { title: block.text, description: '' };
			continue;
		}

		if (currentItem && block.tag === 'p' && block.text !== 'Read More') {
			currentItem.description = currentItem.description
				? `${currentItem.description} ${block.text}`
				: block.text;
		}
	}

	if (currentItem) items.push(currentItem);

	return items.slice(0, 3).map((item, index) => ({
		...item,
		image: images[index]?.src ?? null,
	}));
}

function extractHomePageData(page) {
	const blocks = getBlocks(page);
	const heroHeadings = uniqueStrings(blocks.filter((block) => block.tag === 'h1').map((block) => block.text));
	const partnerStatement =
		uniqueStrings(
			blocks
				.filter((block) => /Official training partner/.test(block.text))
				.map((block) => block.text),
		)[0] ?? null;
	const focusStart = blocks.findIndex(
		(block) => block.tag === 'p' && block.text === 'Courses available in a wide variety of modern, practical domains.',
	);
	const focusAreas = [];

	for (let index = focusStart + 1; index < blocks.length; index += 1) {
		const block = blocks[index];
		if (/^Led by experts/.test(block.text) || /^Our Flagship/.test(block.text)) break;
		if (block.tag === 'p') focusAreas.push(block.text);
	}

	const proofPoints = uniqueStrings(
		blocks
			.filter((block) => /^(Led by experts|Curriculum designed)/.test(block.text))
			.map((block) => block.text),
	).slice(0, 2);

	const featuredProgrammeSlugs = uniqueBy(
		(page.ctas ?? [])
			.map((cta) => {
				const match = cta.url.match(/^https:\/\/tinkercademy\.com\/programmes\/([^/?#]+)/);
				return match ? { slug: decodeURIComponent(match[1]) } : null;
			})
			.filter(Boolean),
		(item) => item.slug,
	).map((item) => item.slug);

	const closingStatement =
		uniqueStrings(
			blocks
				.filter((block) => /^Join us for the best coding and digital making experiences/.test(block.text))
				.map((block) => block.text),
		)[0] ?? null;

	const partnerStripImage =
		(page.images ?? []).find((image, index) => {
			const width = Number(image.width);
			const height = Number(image.height);
			return index > 1 && Number.isFinite(width) && Number.isFinite(height) && width / Math.max(height, 1) > 2.5;
		})?.src ?? null;

	return {
		hero_title: heroHeadings[0] ?? pickTitle(page),
		hero_lead: heroHeadings[1] ?? page.seo?.description ?? null,
		hero_actions: pickCtasByLabel(page.ctas, ['Programmes', 'Professionals', 'Schools', 'Individuals']),
		partner_statement: partnerStatement,
		partner_strip_image: partnerStripImage,
		focus_areas: uniqueStrings(focusAreas),
		proof_points: proofPoints,
		flagship_items: extractFlagshipItems(page, blocks),
		featured_programme_slugs: featuredProgrammeSlugs,
		closing_statement: closingStatement,
		closing_ctas: pickCtasByLabel(page.ctas, ['Our Courses', 'Our Projects']),
	};
}

function toProgrammeRecord(page) {
	const slug = decodeSlug(page.path);
	const fallback = inferProgrammeFallbacks(page);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');
	const resolvedAudiences = audiences.length > 0 ? audiences : fallback.audiences;
	const resolvedTopics = topics.length > 0 ? topics : fallback.topics;
	const content = makeContentItems(page);

	return {
		id: slug,
		slug,
		title: pickTitle(page),
		subtitle: page.framer?.structured?.subtitle || null,
		duration: page.framer?.structured?.duration || fallback.duration,
		description: pickLead(page),
		hero_image: pickHeroImage(page),
		audience_ids: resolvedAudiences.map((audience) => audience.id),
		topic_ids: resolvedTopics.map((topic) => topic.id),
		cta_ids: uniqueBy(page.ctas ?? [], (cta) => `${cta.label}::${cta.url}`).map((cta) => slugify(`${cta.label}-${cta.url}`)),
		seo: page.seo,
		content,
		sections: normaliseSections(content),
	};
}

function toTutorialRecord(page) {
	const slug = decodeSlug(page.path);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');
	const content = makeContentItems(page);

	return {
		id: slug,
		slug,
		title: pickTitle(page),
		subtitle: page.framer?.structured?.subtitle || null,
		description: pickLead(page),
		hero_image: pickHeroImage(page),
		audience_ids: audiences.map((audience) => audience.id),
		topic_ids: topics.map((topic) => topic.id),
		seo: page.seo,
		content,
		sections: normaliseSections(content),
	};
}

function toStaticPage(page) {
	const blocks = getBlocks(page);
	const record = {
		path: page.path,
		slug: page.path === '/' ? 'home' : page.path.replace(/^\/|\/$/g, ''),
		title: pickTitle(page),
		description: pickLead(page) || page.seo?.description,
		hero_title: pickTitle(page),
		hero_lead: pickLead(page),
		hero_image: pickHeroImage(page),
		seo: page.seo,
		ctas: page.ctas ?? [],
		blocks,
		content: makeContentItems(page),
		course_cards: extractCourseCards(page),
	};

	if (page.path === '/') {
		return {
			...record,
			...extractHomePageData(page),
		};
	}

	return record;
}

async function writeYamlFile(fileName, value) {
	const document = new YAML.Document(value);
	document.options.indent = 2;
	document.options.lineWidth = 0;
	await writeFile(path.join(CRM_DIR, fileName), String(document));
}

async function writeJsonFile(fileName, value) {
	await writeFile(path.join(PAGES_DIR, fileName), JSON.stringify(value, null, 2));
}

const crawl = JSON.parse(await readFile(CRAWL_FILE, 'utf8'));
const pages = crawl.pages ?? [];
const programmePages = pages.filter((page) => page.type === 'programme');
const tutorialPages = pages.filter((page) => page.type === 'tutorial');
const staticPages = pages.filter((page) => page.type === 'static' || page.type === 'root');

const contactPage = pages.find((page) => page.path === '/contact-us');
const homePage = pages.find((page) => page.path === '/');

const programmes = programmePages.map(toProgrammeRecord).sort((a, b) => a.title.localeCompare(b.title));
const tutorials = tutorialPages.map(toTutorialRecord).sort((a, b) => a.title.localeCompare(b.title));
const staticPageData = staticPages.map(toStaticPage);

const audiences = uniqueBy(
	programmePages
		.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'audiences'))
		.concat(programmePages.flatMap((page) => inferProgrammeFallbacks(page).audiences))
		.concat(tutorialPages.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'audiences'))),
	(item) => item.id,
).sort((a, b) => a.label.localeCompare(b.label));

const topics = uniqueBy(
	programmePages
		.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'topics'))
		.concat(programmePages.flatMap((page) => inferProgrammeFallbacks(page).topics))
		.concat(tutorialPages.flatMap((page) => normaliseRelations(page.framer?.structured?.relations, 'topics'))),
	(item) => item.id,
).sort((a, b) => a.label.localeCompare(b.label));

const contacts = uniqueBy(
	pages
		.flatMap((page) => page.contacts ?? [])
		.map((contact) => ({
			id: slugify(`${contact.type}-${contact.value}`),
			label: contact.type === 'email' ? 'Email' : 'Phone',
			channel_type: contact.type,
			value: contact.value.trim(),
		})),
	(contact) => contact.id,
);

const locations = inferLocation(contactPage);

const socialLinks = uniqueBy(
	CANONICAL_SOCIALS.map((expected) => {
		const match = pages
			.flatMap((page) => page.socialLinks ?? [])
			.find((link) => expected.matcher.test(link.url));
		if (!match) return null;
		return {
			id: expected.id,
			platform: expected.platform,
			label: match.label,
			url: match.url,
		};
	}).filter(Boolean),
	(link) => link.url,
);

const forms = uniqueBy(
	pages.flatMap((page) => page.forms ?? []).map((form) => ({
		id: slugify(`${form.action ?? form.id}`),
		provider: /jotform/i.test(form.action ?? '') ? 'jotform' : form.method === 'link' ? 'external-link' : 'native-form',
		endpoint: form.action,
		method: form.method,
	})),
	(form) => form.endpoint ?? form.id,
);

const ctaDestinations = uniqueBy(
	pages
		.flatMap((page) => page.ctas ?? [])
		.map((cta) => ({
			id: slugify(`${cta.label}-${cta.url}`),
			label: cta.label,
			url: cta.url,
			type: classifyCtaType(cta.url),
		})),
	(cta) => `${cta.label}::${cta.url}`,
);

const siteSettings = {
	site_name: 'Tinkercademy',
	base_url: crawl.site,
	default_seo: homePage?.seo ?? null,
	breakpoints: homePage?.hydrate?.breakpoints ?? [],
	navigation: homePage?.navLinks ?? [],
	contact_ids: contacts.map((contact) => contact.id),
	location_ids: locations.map((location) => location.id),
	social_link_ids: [...new Set(socialLinks.map((link) => link.id))],
};

await mkdir(CRM_DIR, { recursive: true });
await mkdir(PAGES_DIR, { recursive: true });

await writeYamlFile('programmes.yml', programmes);
await writeYamlFile('tutorials.yml', tutorials);
await writeYamlFile('audiences.yml', audiences);
await writeYamlFile('topics.yml', topics);
await writeYamlFile('contacts.yml', contacts);
await writeYamlFile('locations.yml', locations);
await writeYamlFile('social-links.yml', socialLinks);
await writeYamlFile('cta-destinations.yml', ctaDestinations);
await writeYamlFile('forms.yml', forms);
await writeYamlFile('site-settings.yml', siteSettings);
await writeJsonFile('static-pages.json', staticPageData);
await writeJsonFile('assets.json', crawl.assets ?? []);
await writeJsonFile('programmes.json', programmes);
await writeJsonFile('tutorials.json', tutorials);
await writeJsonFile('audiences.json', audiences);
await writeJsonFile('topics.json', topics);
await writeJsonFile('contacts.json', contacts);
await writeJsonFile('locations.json', locations);
await writeJsonFile('social-links.json', socialLinks);
await writeJsonFile('cta-destinations.json', ctaDestinations);
await writeJsonFile('forms.json', forms);
await writeJsonFile('site-settings.json', siteSettings);

console.log(`Wrote CRM-like data files to ${CRM_DIR}`);
