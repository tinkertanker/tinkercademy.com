/**
 * One-off image optimisation pass for Lighthouse.
 *
 * 1. Generates responsive WebP variants of the homepage hero into
 *    public/images/hero/ (the original JPEG stays untouched as the
 *    og:image and fallback source).
 * 2. Downscales and recompresses oversized logo rasters in place —
 *    these render at ≤160 CSS px, so anything wider than the cap
 *    ships wasted bytes. Files already within bounds are left alone.
 * 3. Downscales the external partner/client logos referenced by
 *    src/data/pages/external-logos.json (logo carousels).
 * 4. Generates responsive WebP variants for programme hero images and
 *    writes src/generated/responsive-images.json, consumed by
 *    src/lib/responsive-images.js for srcset markup.
 *
 * Run manually with `node scripts/optimize-images.mjs`; commit the results.
 */
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC = path.join(ROOT, 'public');

/** Recompress a file in place, keeping its format; keeps the smaller file. */
async function shrinkInPlace(filePath, resizeOpts, label) {
	const before = (await stat(filePath)).size;
	const tmp = `${filePath}.tmp`;
	const pipeline = sharp(filePath).resize(resizeOpts);
	if (/\.png$/i.test(filePath)) {
		await pipeline.png({ compressionLevel: 9, palette: true }).toFile(tmp);
	} else if (/\.webp$/i.test(filePath)) {
		await pipeline.webp({ quality: 82 }).toFile(tmp);
	} else {
		await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(tmp);
	}
	const after = (await stat(tmp)).size;
	if (after < before) {
		await rename(tmp, filePath);
		console.log(`${label}: ${Math.round(before / 1024)} → ${Math.round(after / 1024)} KiB`);
	} else {
		await rm(tmp);
	}
}

/* ── 1. Homepage hero variants ────────────────────────────────────── */
const HERO_SOURCE = path.join(PUBLIC, 'images/zsqswc6Bglsfla2SlsbfXQbK7yY.jpg');
const HERO_OUT_DIR = path.join(PUBLIC, 'images/hero');
const HERO_WIDTHS = [640, 1024, 1600, 2400];

await mkdir(HERO_OUT_DIR, { recursive: true });
const heroSourceMeta = await sharp(HERO_SOURCE).metadata();
for (const width of HERO_WIDTHS) {
	/* Never upscale: if the source has been replaced with something
	   narrower, keep the existing committed variant rather than
	   regenerating a blurry enlargement. */
	if (width > (heroSourceMeta.width ?? 0)) {
		console.warn(`hero ${width}w skipped: source is only ${heroSourceMeta.width}px wide`);
		continue;
	}
	const out = path.join(HERO_OUT_DIR, `home-hero-${width}.webp`);
	await sharp(HERO_SOURCE).resize({ width }).webp({ quality: 64 }).toFile(out);
	const { size } = await stat(out);
	console.log(`hero ${width}w → ${Math.round(size / 1024)} KiB`);
}

/* ── 2. Logo rasters: cap intrinsic size, recompress ──────────────────
   Caps are ~2.6× the largest CSS display size in each band, covering
   high-DPR mobile without shipping print-resolution logos. */
const LOGO_DIR_CAPS = {
	'images/partners': { width: 380, height: 120 }, // displayed ≤140×44 CSS px
	'images/institutions': { width: 380, height: 160 }, // displayed ≤140×60 CSS px
	'images/certifications': { width: 440, height: 220 }, // displayed ≤160×80 CSS px
};
const LOGO_DIRS = Object.keys(LOGO_DIR_CAPS);

for (const dir of LOGO_DIRS) {
	const { width: LOGO_MAX_WIDTH, height: LOGO_MAX_HEIGHT } = LOGO_DIR_CAPS[dir];
	const abs = path.join(PUBLIC, dir);
	for (const file of await readdir(abs)) {
		if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
		const filePath = path.join(abs, file);
		const meta = await sharp(filePath).metadata();
		if ((meta.width ?? 0) <= LOGO_MAX_WIDTH && (meta.height ?? 0) <= LOGO_MAX_HEIGHT) continue;

		await shrinkInPlace(
			filePath,
			{ width: LOGO_MAX_WIDTH, height: LOGO_MAX_HEIGHT, fit: 'inside', withoutEnlargement: true },
			`${dir}/${file}`,
		);
	}
}

/* ── 3. External partner/client logos (logo carousels) ────────────────
   Rendered at ≤170×80 CSS px; cap at ~2.6× that for high-DPR screens. */
const EXTERNAL_LOGOS = JSON.parse(
	await readFile(path.join(ROOT, 'src/data/pages/external-logos.json'), 'utf8'),
);
const externalLogoDims = {};
for (const entry of EXTERNAL_LOGOS) {
	const raw = entry.logo ?? '';
	const filename = raw.split('/').pop()?.split('?')[0] ?? '';
	if (!filename || /\.svg$/i.test(filename)) continue;
	/* Framer URLs are localised to /images/<filename> at render time. */
	const local = raw.startsWith('/images/')
		? path.join(PUBLIC, raw)
		: path.join(PUBLIC, 'images', filename);
	if (!existsSync(local)) continue;
	const meta = await sharp(local).metadata();
	if ((meta.width ?? 0) > 440 || (meta.height ?? 0) > 220) {
		await shrinkInPlace(
			local,
			{ width: 440, height: 220, fit: 'inside', withoutEnlargement: true },
			`external-logo ${filename}`,
		);
	}
	const finalMeta = await sharp(local).metadata();
	externalLogoDims['/' + path.relative(PUBLIC, local)] = {
		width: finalMeta.width,
		height: finalMeta.height,
	};
}

/* ── 4. Responsive variants for programme/course hero images ────────── */
const RESPONSIVE_WIDTHS = [480, 960, 1600];
const RESPONSIVE_OUT_DIR = path.join(PUBLIC, 'images/responsive');
const EXTRA_RESPONSIVE_SOURCES = [
	'/images/generated/hero-review/showcase/cdx_001.webp', // courses-all hero
	'/images/flagship/swift-accelerator.webp',
	'/images/generated/hero-review/imda-learn-flagship/cdx_001.webp',
	'/images/generated/hero-review/code-for-fun-flagship/cdx_001.webp',
];

const programmeDir = path.join(ROOT, 'src/content/programmes');
const heroSources = new Set(EXTRA_RESPONSIVE_SOURCES);
for (const file of await readdir(programmeDir)) {
	if (!file.endsWith('.md')) continue;
	const text = await readFile(path.join(programmeDir, file), 'utf8');
	const match = text.match(/^heroImage:\s*"([^"]+)"/m);
	if (match) heroSources.add(match[1]);
}

await mkdir(RESPONSIVE_OUT_DIR, { recursive: true });
const manifest = {};
for (const src of [...heroSources].sort()) {
	if (/\.svg$/i.test(src)) continue;
	const abs = path.join(PUBLIC, src.replace(/^\//, ''));
	if (!existsSync(abs)) {
		console.warn(`responsive: missing source ${src}`);
		continue;
	}
	const meta = await sharp(abs).metadata();
	const flat = src
		.replace(/^\/images\//, '')
		.replace(/\.[a-z]+$/i, '')
		.replace(/[^a-z0-9]+/gi, '-');
	const variants = [];
	for (const width of RESPONSIVE_WIDTHS) {
		if (width >= (meta.width ?? 0)) break;
		const out = path.join(RESPONSIVE_OUT_DIR, `${flat}-${width}.webp`);
		await sharp(abs).resize({ width }).webp({ quality: 70 }).toFile(out);
		variants.push({ w: width, src: `/images/responsive/${flat}-${width}.webp` });
	}
	manifest[src] = { width: meta.width, height: meta.height, variants };
}

/* ── 5. Tutorial/article/page content images ──────────────────────────
   Framer-imported content JPGs ship at up to ~2900px wide but render
   inside a ≤1160px shell (tutorial columns are ~560px). Cap at 1400px
   wide — ≥2× every display size — and recompress. */
const CONTENT_DATA_FILES = [
	'src/data/pages/tutorials.json',
	'src/data/pages/articles.json',
	'src/data/pages/static-pages.json',
];
const FRAMER_FILE_RE = /framerusercontent\.com\/images\/([A-Za-z0-9._-]+\.(?:png|jpe?g|webp))/g;
const contentImages = new Set();
for (const dataFile of CONTENT_DATA_FILES) {
	const text = await readFile(path.join(ROOT, dataFile), 'utf8');
	for (const match of text.matchAll(FRAMER_FILE_RE)) contentImages.add(match[1]);
}
for (const filename of [...contentImages].sort()) {
	const local = path.join(PUBLIC, 'images', filename);
	if (!existsSync(local)) continue;
	/* The homepage hero source must stay full-resolution — it feeds the
	   2400w responsive variant generated above. */
	if (path.resolve(local) === path.resolve(HERO_SOURCE)) continue;
	const meta = await sharp(local).metadata();
	if ((meta.width ?? 0) <= 1400) continue;
	await shrinkInPlace(
		local,
		{ width: 1400, withoutEnlargement: true },
		`content ${filename}`,
	);
}

await mkdir(path.join(ROOT, 'src/generated'), { recursive: true });
await writeFile(
	path.join(ROOT, 'src/generated/responsive-images.json'),
	JSON.stringify({ images: manifest, logoDims: externalLogoDims }, null, '\t') + '\n',
);
console.log(
	`responsive manifest: ${Object.keys(manifest).length} images, ${Object.keys(externalLogoDims).length} logo dims`,
);

/* ── 3. Report intrinsic dimensions for width/height attributes ───── */
for (const dir of LOGO_DIRS) {
	const abs = path.join(PUBLIC, dir);
	for (const file of (await readdir(abs)).sort()) {
		if (!/\.(png|jpe?g|webp|svg)$/i.test(file)) continue;
		const meta = await sharp(path.join(abs, file)).metadata();
		console.log(`DIM ${dir}/${file} ${meta.width}x${meta.height}`);
	}
}
const heroMeta = await sharp(HERO_SOURCE).metadata();
console.log(`DIM hero ${heroMeta.width}x${heroMeta.height}`);
const logoBlack = await sharp(
	path.join(PUBLIC, 'images/OHbHnfvpGLsxcntGKsueCChDt4__q_P3NjYWxlLWRvd24tdG89MjA0.png'),
).metadata();
console.log(`DIM logo-black ${logoBlack.width}x${logoBlack.height}`);
const logoWhite = await sharp(path.join(PUBLIC, 'images/logos/tinkercademy-white.png')).metadata();
console.log(`DIM logo-white ${logoWhite.width}x${logoWhite.height}`);
