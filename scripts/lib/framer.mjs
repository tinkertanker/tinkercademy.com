import { load } from 'cheerio';

const DURATION_PATTERN = /\b(\d+|half|full)\b|days?|hours?|sessions?|weeks?|months?/i;
const AUDIENCE_PATTERN = /(public|business|school|student|teacher|professional|individual|parent|club)/i;

function cleanText(text) {
	return text.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function escapeHtml(value) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function escapeAttr(value) {
	return escapeHtml(value).replaceAll("'", '&#39;');
}

function resolveReference(data, ref, seen = new Set()) {
	if (typeof ref !== 'number') return ref;
	if (seen.has(ref)) return '[circular]';

	seen.add(ref);
	const value = data[ref];

	if (Array.isArray(value)) {
		return value.map((entry) => resolveReference(data, entry, new Set(seen)));
	}

	if (value && typeof value === 'object') {
		if (Object.keys(value).length === 2 && 'type' in value && 'value' in value) {
			const type = resolveReference(data, value.type, new Set(seen));
			const resolvedValue = resolveReference(data, value.value, new Set(seen));

			if (
				type === 'string' ||
				type === 'boolean' ||
				type === 'number' ||
				type === 'responsiveimage' ||
				type === 'array' ||
				type === 'richtext' ||
				type === 'enum'
			) {
				return resolvedValue;
			}

			return { type, value: resolvedValue };
		}

		return Object.fromEntries(
			Object.entries(value).map(([key, entry]) => [key, resolveReference(data, entry, new Set(seen))]),
		);
	}

	return value;
}

function renderNode(node) {
	if (node == null) return '';
	if (typeof node === 'string') return escapeHtml(node);
	if (typeof node === 'number') return '';

	if (!Array.isArray(node)) return '';

	const [nodeType, value, _attrs, ...children] = node;

	if (nodeType === 1) {
		return node.slice(1).map(renderNode).join('');
	}

	if (nodeType === 5) {
		return typeof value === 'string' ? escapeHtml(value) : '';
	}

	if (nodeType === 2) {
		const link = value ?? {};
		const href = typeof link.href === 'string' ? link.href : '#';
		const target = link.openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
		return `<a href="${escapeAttr(href)}"${target}>${node.slice(2).map(renderNode).join('')}</a>`;
	}

	if (nodeType === 4) {
		const tag = typeof value === 'string' ? value : 'div';
		const safeTag = /^(a|br|em|h1|h2|h3|h4|h5|h6|li|ol|p|strong|ul)$/i.test(tag) ? tag : 'div';
		if (safeTag === 'br') return '<br />';
		const inner = children.map(renderNode).join('');
		return `<${safeTag}>${inner}</${safeTag}>`;
	}

	return node.slice(1).map(renderNode).join('');
}

export function renderRichTextPointer(pointer) {
	if (!pointer || typeof pointer !== 'string') {
		return { html: '', text: '' };
	}

	try {
		const richTree = JSON.parse(pointer);
		const html = renderNode(richTree);
		const text = cleanText(load(`<div>${html}</div>`).text());
		return { html, text };
	} catch {
		const text = cleanText(pointer);
		return { html: `<p>${escapeHtml(text)}</p>`, text };
	}
}

function parseLeadingJsonObject(value) {
	if (typeof value !== 'string' || !value.startsWith('{')) return null;

	let depth = 0;
	let inString = false;
	let escaped = false;

	for (let index = 0; index < value.length; index += 1) {
		const char = value[index];

		if (inString) {
			if (escaped) {
				escaped = false;
				continue;
			}
			if (char === '\\') {
				escaped = true;
				continue;
			}
			if (char === '"') {
				inString = false;
			}
			continue;
		}

		if (char === '"') {
			inString = true;
			continue;
		}

		if (char === '{') {
			depth += 1;
			continue;
		}

		if (char === '}') {
			depth -= 1;
			if (depth === 0) {
				return value.slice(0, index + 1);
			}
		}
	}

	return null;
}

function parseQueryPairs(data) {
	const pairs = [];

	for (let index = 0; index < data.length - 1; index += 1) {
		const candidate = data[index];
		const next = data[index + 1];
		if (typeof candidate !== 'string' || !candidate.startsWith('{"from"') || !Array.isArray(next)) {
			continue;
		}

		try {
			const query = JSON.parse(parseLeadingJsonObject(candidate) ?? candidate);
			const records = next.map((entry) => resolveReference(data, entry)).filter(Boolean);
			pairs.push({ index, query, records });
		} catch {
			// Ignore malformed fragments.
		}
	}

	return pairs;
}

function isImageAsset(value) {
	return value && typeof value === 'object' && typeof value.src === 'string';
}

function isRichTextAsset(value) {
	return value && typeof value === 'object' && typeof value.pointer === 'string';
}

function classifyLookupKind(records) {
	const joined = records
		.flatMap((record) => Object.values(record))
		.filter((value) => typeof value === 'string')
		.join(' ');

	return AUDIENCE_PATTERN.test(joined) ? 'audiences' : 'topics';
}

function toLookupItems(records) {
	return records.map((record) => {
		const stringValues = Object.entries(record)
			.filter(([key, value]) => key !== 'id' && typeof value === 'string')
			.map(([, value]) => value);

		return {
			id: record.id,
			label: stringValues[0] ?? record.id,
			slug: stringValues[1] ?? cleanText((stringValues[0] ?? record.id).toLowerCase()).replace(/[^a-z0-9]+/g, '-'),
		};
	});
}

function firstTextHeading(html) {
	if (!html) return null;
	const $ = load(html);
	const heading = $('h1, h2, h3, h4').first().text();
	return cleanText(heading) || null;
}

export function parseFramerHandover(raw) {
	if (!raw) return null;

	try {
		const data = JSON.parse(raw);
		const queryPairs = parseQueryPairs(data);
		const mainPair =
			queryPairs.find((pair) => pair.records.length === 1 && Object.keys(pair.records[0] ?? {}).length >= 4) ??
			queryPairs[0];

		const mainRecord = mainPair?.records?.[0];
		if (!mainRecord || typeof mainRecord !== 'object') return null;

		const lookupById = new Map();
		const relationGroups = [];

		for (const pair of queryPairs) {
			if (pair === mainPair || pair.records.length === 0) continue;
			if (!pair.records.every((record) => record && typeof record === 'object' && typeof record.id === 'string')) {
				continue;
			}

			const items = toLookupItems(pair.records);
			const kind = classifyLookupKind(pair.records);
			relationGroups.push({ kind, items });
			for (const item of items) {
				lookupById.set(item.id, { ...item, kind });
			}
		}

		const fieldEntries = [];
		for (const [key, value] of Object.entries(mainRecord)) {
			if (value == null) continue;

			if (typeof value === 'string') {
				fieldEntries.push({ kind: 'string', key, value });
				continue;
			}

			if (Array.isArray(value) && value.every((entry) => typeof entry === 'string')) {
				const mapped = value.map((entry) => lookupById.get(entry)).filter(Boolean);
				fieldEntries.push({
					kind: mapped.length === value.length && mapped.length > 0 ? 'relation' : 'array',
					key,
					value,
					items: mapped,
				});
				continue;
			}

			if (isImageAsset(value)) {
				fieldEntries.push({ kind: 'image', key, ...value });
				continue;
			}

			if (isRichTextAsset(value)) {
				const rendered = renderRichTextPointer(value.pointer);
				fieldEntries.push({
					kind: 'richtext',
					key,
					label: firstTextHeading(rendered.html),
					...rendered,
				});
			}
		}

		const textFields = fieldEntries.filter((entry) => entry.kind === 'string').map((entry) => entry.value);
		const title = textFields[0] ?? null;
		const secondary = textFields[1] ?? null;
		const duration = secondary && DURATION_PATTERN.test(secondary) ? secondary : null;
		const subtitle = secondary && !duration ? secondary : null;

		const images = fieldEntries.filter((entry) => entry.kind === 'image');
		const content = fieldEntries
			.filter((entry) => entry.kind === 'richtext' || entry.kind === 'image')
			.map((entry, index) => ({ ...entry, order: index + 1 }));

		return {
			title,
			subtitle,
			duration,
			heroImage: images[0] ?? null,
			content,
			relations: fieldEntries
				.filter((entry) => entry.kind === 'relation')
				.map((entry) => ({
					key: entry.key,
					kind: entry.items[0]?.kind ?? 'related',
					items: entry.items,
				})),
			relationGroups,
			rawFieldCount: fieldEntries.length,
			queryCount: queryPairs.length,
		};
	} catch {
		return null;
	}
}
