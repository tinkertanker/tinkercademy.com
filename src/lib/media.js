import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const FRAMER_IMAGE_URL_RE =
	/https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9._-]+\.(?:png|jpg|jpeg|webp|gif|svg))(?:\?[^"'\s<)]*)?/g;

const LOCAL_IMAGE_DIR = resolve(process.cwd(), 'public/images');
const localAssetCache = new Map();

function hasLocalFramerAsset(filename) {
	if (!filename) return false;
	if (!localAssetCache.has(filename)) {
		localAssetCache.set(filename, existsSync(resolve(LOCAL_IMAGE_DIR, filename)));
	}
	return localAssetCache.get(filename);
}

export function localiseFramerImage(value) {
	if (typeof value !== 'string' || !value.includes('framerusercontent.com/images/')) {
		return value;
	}

	return value.replace(FRAMER_IMAGE_URL_RE, (match, filename) =>
		hasLocalFramerAsset(filename) ? `/images/${filename}` : match
	);
}

export function normaliseFramerMedia(value) {
	if (typeof value === 'string') {
		return localiseFramerImage(value);
	}

	if (Array.isArray(value)) {
		return value.map((item) => normaliseFramerMedia(item));
	}

	if (value && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, normaliseFramerMedia(item)])
		);
	}

	return value;
}
