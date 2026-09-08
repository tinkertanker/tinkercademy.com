/**
 * Clip a long description string to fit inside Google's SERP snippet budget
 * without cutting mid-word. Prefers a sentence boundary if one falls within
 * the last ~60 chars of the clipped text, otherwise falls back to the last
 * whitespace. Adds an ellipsis when truncation happens, and strips any
 * trailing punctuation left dangling by the cut.
 */
export function clipDescription(raw: string | null | undefined, max = 160): string {
	const text = (raw ?? '').replace(/\s+/g, ' ').trim();
	if (text.length <= max) return text;
	const contentMax = Math.max(1, max - 1);
	const slice = text.slice(0, contentMax + 1);
	const lastSentence = slice.lastIndexOf('. ');
	const lastSpace = slice.lastIndexOf(' ');
	const cut = lastSentence > contentMax - 60 ? lastSentence + 1 : lastSpace;
	return (cut > 0 ? text.slice(0, cut) : text.slice(0, contentMax)).replace(/[,;:\-–—\s]+$/, '') + '…';
}

/**
 * Keep a useful authored description, but supplement fragments that are too
 * short to explain a page in a search result. The caller supplies truthful,
 * page-specific context rather than relying on generic site boilerplate.
 */
export function completeDescription(
	raw: string | null | undefined,
	context: string,
	{ min = 50, max = 160 }: { min?: number; max?: number } = {},
): string {
	const description = (raw ?? '').replace(/\s+/g, ' ').trim();
	const combined = description.length >= min
		? description
		: [description.replace(/[.!?]+$/, ''), context].filter(Boolean).join('. ');
	return clipDescription(combined, max);
}
