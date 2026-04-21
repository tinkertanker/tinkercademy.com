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
	const slice = text.slice(0, max + 1);
	const lastSentence = slice.lastIndexOf('. ');
	const lastSpace = slice.lastIndexOf(' ');
	const cut = lastSentence > max - 60 ? lastSentence + 1 : lastSpace;
	return (cut > 0 ? text.slice(0, cut) : text.slice(0, max)).replace(/[,;:\-–—\s]+$/, '') + '…';
}
