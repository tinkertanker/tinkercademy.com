import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CRAWL_FILE = path.join(ROOT, '_artifacts', 'crawl', 'site.json');
const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CRM_DIR = path.join(DATA_DIR, 'crm');
const PAGES_DIR = path.join(DATA_DIR, 'pages');

function cleanText(value) {
	return value.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

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

function pickLead(page) {
	const richText = page.framer?.structured?.content?.find((entry) => entry.kind === 'richtext')?.text;
	const paragraph = page.contentBlocks?.find((block) => block.tag === 'p')?.text;
	return richText || paragraph || page.seo?.description || null;
}

function pickTitle(page) {
	const contentHeading =
		page.contentBlocks?.find((block) => block.tag === 'h1')?.text ??
		page.contentBlocks?.find((block) => block.tag === 'h2')?.text;

	if (page.framer?.structured?.title) return page.framer.structured.title;
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
	const duration = blocksAfterLabel(page.contentBlocks, 'Duration:')[0] ?? null;
	const audiences = blocksAfterLabel(page.contentBlocks, 'Audiences:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));
	const topics = blocksAfterLabel(page.contentBlocks, 'Type:').map((label) => ({
		id: slugify(label),
		label,
		source_id: slugify(label),
	}));

	return { duration, audiences, topics };
}

function inferLocation(contactPage) {
	const joined = (contactPage?.contentBlocks ?? []).map((block) => block.text).join(' ');
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

	const blocks = [];
	let currentList = null;

	for (const block of page.contentBlocks ?? []) {
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

function toProgrammeRecord(page) {
	const slug = decodeSlug(page.path);
	const fallback = inferProgrammeFallbacks(page);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');
	const resolvedAudiences = audiences.length > 0 ? audiences : fallback.audiences;
	const resolvedTopics = topics.length > 0 ? topics : fallback.topics;

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
		content: makeContentItems(page),
	};
}

function toTutorialRecord(page) {
	const slug = decodeSlug(page.path);
	const audiences = normaliseRelations(page.framer?.structured?.relations, 'audiences');
	const topics = normaliseRelations(page.framer?.structured?.relations, 'topics');

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
		content: makeContentItems(page),
	};
}

function toStaticPage(page) {
	return {
		path: page.path,
		slug: page.path === '/' ? 'home' : page.path.replace(/^\/|\/$/g, ''),
		title: pickTitle(page),
		description: page.seo?.description || pickLead(page),
		hero_image: pickHeroImage(page),
		seo: page.seo,
		ctas: page.ctas ?? [],
		content: makeContentItems(page),
	};
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
			value: contact.value,
		})),
	(contact) => contact.id,
);

const locations = inferLocation(contactPage);

const socialLinks = uniqueBy(
	pages.flatMap((page) => page.socialLinks ?? []).map((link) => ({
		id: slugify(link.platform),
		platform: link.platform,
		label: link.label,
		url: link.url,
	})),
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
