export const RIGHTS_STATUSES = Object.freeze([
	'review-required',
	'permission-recorded',
	'organisation-owned',
	'author-owned',
]);

export const IMAGE_DECISIONS = Object.freeze(['review-required', 'meaningful', 'decorative']);

export function emptyReviewDecisions() {
	return { version: 1, rights: {}, images: {} };
}

export function placementKey({ storyId, paragraph, imageId }) {
	if (!storyId || !Number.isInteger(paragraph) || !imageId) throw new Error('Invalid image placement key fields');
	return `${storyId}:${paragraph}:${imageId}`;
}

function requireReviewAudit(entry, label) {
	if (!entry.reviewer?.trim()) throw new Error(`${label} requires a reviewer name`);
	if (!entry.reviewedAt || !Number.isFinite(new Date(entry.reviewedAt).getTime())) {
		throw new Error(`${label} requires a valid reviewedAt date`);
	}
}

export function validateReviewDecisions(value) {
	if (!value || value.version !== 1 || !value.rights || !value.images) {
		throw new Error('Review decisions must contain version 1, rights, and images');
	}
	if (Array.isArray(value.rights) || typeof value.rights !== 'object') throw new Error('Review rights must be an object');
	if (Array.isArray(value.images) || typeof value.images !== 'object') throw new Error('Review images must be an object');

	for (const [legacyPath, entry] of Object.entries(value.rights)) {
		if (!entry || !RIGHTS_STATUSES.includes(entry.status)) throw new Error(`Invalid rights status for ${legacyPath}`);
		if (entry.status !== 'review-required') {
			if (!entry.basis?.trim()) throw new Error(`${legacyPath} requires a rights basis or evidence reference`);
			requireReviewAudit(entry, legacyPath);
		}
	}

	for (const [key, entry] of Object.entries(value.images)) {
		if (!entry || !IMAGE_DECISIONS.includes(entry.decision)) throw new Error(`Invalid image decision for ${key}`);
		if (entry.decision === 'meaningful' && !entry.alt?.trim()) {
			throw new Error(`${key} requires meaningful alt text`);
		}
		if (entry.decision === 'decorative' && entry.alt?.trim()) {
			throw new Error(`${key} is decorative and must have empty alt text`);
		}
		if (entry.decision !== 'review-required') requireReviewAudit(entry, key);
	}

	return value;
}

export function applyRightsReview(defaultStatus, entry) {
	return entry?.status ?? defaultStatus;
}

export function applyImageReview(sourceDecision, entry) {
	if (!entry) return sourceDecision;
	if (entry.decision === 'meaningful') {
		return {
			decision: 'meaningful',
			alt: entry.alt.trim(),
			source: 'editorial-review',
			credit: entry.credit?.trim() || '',
			notes: entry.notes?.trim() || '',
		};
	}
	if (entry.decision === 'decorative') {
		return {
			decision: 'decorative',
			alt: '',
			source: 'editorial-review',
			credit: entry.credit?.trim() || '',
			notes: entry.notes?.trim() || '',
		};
	}
	return {
		decision: 'review-required',
		alt: '',
		source: 'editorial-review',
		credit: entry.credit?.trim() || '',
		notes: entry.notes?.trim() || '',
	};
}
