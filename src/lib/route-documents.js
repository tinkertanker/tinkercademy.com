import { getRouteDocument as getGeneratedRouteDocument } from '../generated/route-documents.js';

const DOCUMENT_PATH_REPLACEMENTS = [
	[/https:\/\/framerusercontent\.com\/assets\//g, '/assets/'],
	[/\/framerusercontent\.com\/assets\//g, '/assets/'],
	[/framerusercontent\.com\/assets\//g, '/assets/'],
	[/https:\/\/framerusercontent\.com\/sites\//g, '/sites/'],
	[/\/framerusercontent\.com\/sites\//g, '/sites/'],
	[/framerusercontent\.com\/sites\//g, '/sites/'],
	[/https:\/\/framerusercontent\.com\/third-party-assets\//g, '/third-party-assets/'],
	[/\/framerusercontent\.com\/third-party-assets\//g, '/third-party-assets/'],
	[/framerusercontent\.com\/third-party-assets\//g, '/third-party-assets/'],
	[/https:\/\/framerusercontent\.com\/images\//g, '/images/remote/'],
	[/\/framerusercontent\.com\/images\//g, '/images/remote/'],
	[/framerusercontent\.com\/images\//g, '/images/remote/'],
	[/\.\.\/framerusercontent\.com\/images\//g, '/images/remote/'],
	[/https:\/\/fonts\.gstatic\.com\//g, '/fonts/'],
	[/\/fonts\.gstatic\.com\//g, '/fonts/'],
	[/fonts\.gstatic\.com\//g, '/fonts/'],
	[/https:\/\/app\.framerstatic\.com\//g, '/fonts/inter/'],
	[/\/app\.framerstatic\.com\//g, '/fonts/inter/'],
	[/app\.framerstatic\.com\//g, '/fonts/inter/'],
];

const documentCache = new Map();

function rewriteDocumentPaths(value = '') {
	let nextValue = value;

	for (const [pattern, replacement] of DOCUMENT_PATH_REPLACEMENTS) {
		nextValue = nextValue.replace(pattern, replacement);
	}

	return nextValue;
}

export function getRouteDocument(routePath) {
	const cachedDocument = documentCache.get(routePath);
	if (cachedDocument) return cachedDocument;

	const document = getGeneratedRouteDocument(routePath);
	if (!document) return null;

	const rewrittenDocument = {
		...document,
		headHtml: rewriteDocumentPaths(document.headHtml),
		bodyHtml: rewriteDocumentPaths(document.bodyHtml),
	};

	documentCache.set(routePath, rewrittenDocument);
	return rewrittenDocument;
}
