#!/usr/bin/env node
// Deterministic banner compositor for the illustrated hero system.
//
// Reads scene specs from src/data/banner-scenes.json, composes each banner
// from vendored T Krobot sticker PNGs (reference/stickers/) plus a flat SVG
// prop library, and writes 1600x900 webp files to public/images/banners/.
//
// Usage:
//   node scripts/banner/generate-banners.mjs            # all scenes
//   node scripts/banner/generate-banners.mjs home ...   # only these ids
//
// Authoring guide: docs/banner-system.md

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const SCENES = path.join(ROOT, 'src', 'data', 'banner-scenes.json');
const STICKERS = path.join(ROOT, 'reference', 'stickers');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'banners');

export const W = 1600;
export const H = 900;

// Palette sampled from the locked v11 sticker pack (see reference/stickers/README.md).
export const PALETTE = {
	paper: '#FAF3E8',
	ink: '#141414',
	red: '#FB0101',
	orange: '#FCA403',
	teal: '#2E7D74',
	grey: '#E1E1E1',
	midgrey: '#B9B2A6',
	white: '#FFFFFF',
};

const ACCENTS = ['red', 'orange', 'teal'];

// ── Prop library ──────────────────────────────────────────────────
// Every prop draws into a group centred on (0,0); the compositor
// translates it to the scene position. `w` is the prop width in px.
// Style contract: flat fills, thick ink outlines (~3.5% of w), palette only.

function stroke(w) {
	return Math.max(3, w * 0.035);
}

function laptop(w, { screen = 'blocks', accent = 'red' }) {
	const sw = stroke(w);
	const scrW = w * 0.9;
	const scrH = scrW * 0.64;
	const acc = PALETTE[accent];
	let content = '';
	const cx = -scrW / 2;
	const cy = -scrH;
	if (screen === 'blocks') {
		// MakeCode-ish stacked block bars
		const bars = [
			[PALETTE.teal, 0.52],
			[acc, 0.4],
			[PALETTE.orange, 0.46],
			[PALETTE.teal, 0.3],
		];
		content = bars
			.map(
				([fill, bw], i) =>
					`<rect x="${cx + scrW * 0.08 + i * scrW * 0.025}" y="${cy + scrH * (0.14 + i * 0.2)}" width="${scrW * bw}" height="${scrH * 0.13}" rx="${scrH * 0.05}" fill="${fill}"/>`
			)
			.join('');
		content += `<rect x="${cx + scrW * 0.68}" y="${cy + scrH * 0.14}" width="${scrW * 0.24}" height="${scrH * 0.36}" rx="${scrH * 0.04}" fill="${PALETTE.grey}"/>`;
	} else if (screen === 'code') {
		const widths = [0.5, 0.66, 0.4, 0.58, 0.3];
		content = widths
			.map(
				(bw, i) =>
					`<rect x="${cx + scrW * 0.08}" y="${cy + scrH * (0.12 + i * 0.16)}" width="${scrW * bw}" height="${scrH * 0.08}" rx="${scrH * 0.04}" fill="${i === 2 ? acc : PALETTE.midgrey}"/>`
			)
			.join('');
	} else if (screen === 'chat') {
		content =
			`<rect x="${cx + scrW * 0.08}" y="${cy + scrH * 0.12}" width="${scrW * 0.5}" height="${scrH * 0.18}" rx="${scrH * 0.09}" fill="${PALETTE.grey}"/>` +
			`<rect x="${cx + scrW * 0.38}" y="${cy + scrH * 0.38}" width="${scrW * 0.54}" height="${scrH * 0.18}" rx="${scrH * 0.09}" fill="${acc}"/>` +
			`<rect x="${cx + scrW * 0.08}" y="${cy + scrH * 0.64}" width="${scrW * 0.4}" height="${scrH * 0.18}" rx="${scrH * 0.09}" fill="${PALETTE.grey}"/>`;
	} else if (screen === 'canvas') {
		// design-tool canvas: two wireframe frames
		content =
			`<rect x="${cx + scrW * 0.1}" y="${cy + scrH * 0.16}" width="${scrW * 0.34}" height="${scrH * 0.6}" rx="${scrH * 0.03}" fill="${PALETTE.white}" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.6}"/>` +
			`<rect x="${cx + scrW * 0.54}" y="${cy + scrH * 0.16}" width="${scrW * 0.34}" height="${scrH * 0.38}" rx="${scrH * 0.03}" fill="${PALETTE.white}" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.6}"/>` +
			`<circle cx="${cx + scrW * 0.62}" cy="${cy + scrH * 0.68}" r="${scrH * 0.07}" fill="${acc}"/>`;
	}
	return `
		<rect x="${-scrW / 2}" y="${-scrH}" width="${scrW}" height="${scrH}" rx="${w * 0.03}" fill="${PALETTE.white}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		${content}
		<rect x="${-w / 2}" y="${-sw / 2}" width="${w}" height="${w * 0.055}" rx="${w * 0.0275}" fill="${PALETTE.ink}"/>`;
}

function browser(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.72;
	const acc = PALETTE[accent];
	const dots = ['red', 'orange', 'teal']
		.map(
			(c, i) =>
				`<circle cx="${-w / 2 + w * 0.08 + i * w * 0.07}" cy="${-h / 2 + h * 0.1}" r="${w * 0.022}" fill="${PALETTE[c]}"/>`
		)
		.join('');
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.04}" fill="${PALETTE.white}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		<line x1="${-w / 2}" y1="${-h / 2 + h * 0.2}" x2="${w / 2}" y2="${-h / 2 + h * 0.2}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.8}"/>
		${dots}
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.3}" width="${w * 0.84}" height="${h * 0.34}" rx="${w * 0.02}" fill="${acc}"/>
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.72}" width="${w * 0.56}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.midgrey}"/>
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.84}" width="${w * 0.4}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>`;
}

function microbit(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.8;
	let leds = '';
	const lit = [
		[0, 1], [0, 3], [1, 0], [1, 4], [2, 2], [3, 0], [3, 4], [4, 1], [4, 2], [4, 3],
	];
	const litSet = new Set(lit.map(([r, c]) => `${r},${c}`));
	for (let r = 0; r < 5; r++)
		for (let c = 0; c < 5; c++) {
			const on = litSet.has(`${r},${c}`);
			leds += `<rect x="${-w * 0.14 + c * w * 0.07}" y="${-h * 0.28 + r * h * 0.09}" width="${w * 0.045}" height="${h * 0.055}" rx="${w * 0.008}" fill="${on ? PALETTE[accent] : '#3A3A3A'}"/>`;
		}
	let pins = '';
	for (let i = 0; i < 9; i++)
		pins += `<rect x="${-w * 0.42 + i * w * 0.1}" y="${h * 0.34}" width="${w * 0.055}" height="${h * 0.14}" fill="${PALETTE.orange}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.5}"/>`;
	return `
		${pins}
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h * 0.86}" rx="${w * 0.05}" fill="${PALETTE.ink}"/>
		<rect x="${-w * 0.44}" y="${-h * 0.1}" width="${w * 0.09}" height="${h * 0.14}" rx="${w * 0.012}" fill="${PALETTE.grey}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.5}"/>
		<rect x="${w * 0.35}" y="${-h * 0.1}" width="${w * 0.09}" height="${h * 0.14}" rx="${w * 0.012}" fill="${PALETTE.grey}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.5}"/>
		${leds}`;
}

function bubble(w, { kind = 'dots', accent = 'red', tail = 'left' }) {
	const sw = stroke(w);
	const h = w * 0.68;
	const acc = PALETTE[accent];
	const tx = tail === 'left' ? -w * 0.2 : w * 0.2;
	let inner = '';
	if (kind === 'dots') {
		inner = [-1, 0, 1]
			.map((i) => `<circle cx="${i * w * 0.16}" cy="0" r="${w * 0.05}" fill="${PALETTE.ink}"/>`)
			.join('');
	} else if (kind === 'code') {
		inner =
			`<polyline points="${-w * 0.22},${-h * 0.14} ${-w * 0.34},0 ${-w * 0.22},${h * 0.14}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>` +
			`<polyline points="${w * 0.22},${-h * 0.14} ${w * 0.34},0 ${w * 0.22},${h * 0.14}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>` +
			`<line x1="${w * 0.07}" y1="${-h * 0.18}" x2="${-w * 0.07}" y2="${h * 0.18}" stroke="${acc}" stroke-width="${sw}" stroke-linecap="round"/>`;
	} else if (kind === 'spark') {
		inner = star(w * 0.34, acc);
	}
	return `
		<path d="M ${tx} ${h * 0.42} l ${tail === 'left' ? -w * 0.08 : w * 0.08} ${h * 0.22} l ${tail === 'left' ? w * 0.14 : -w * 0.14} ${-h * 0.16} Z" fill="${PALETTE.white}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h * 0.92}" rx="${h * 0.3}" fill="${PALETTE.white}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		${inner}`;
}

function star(r, fill) {
	// four-point emanata star, same family as the sticker pack's motion marks
	const s = r * 0.36;
	return `<path d="M 0 ${-r} Q ${s * 0.3} ${-s * 0.3} ${r} 0 Q ${s * 0.3} ${s * 0.3} 0 ${r} Q ${-s * 0.3} ${s * 0.3} ${-r} 0 Q ${-s * 0.3} ${-s * 0.3} 0 ${-r} Z" fill="${fill}"/>`;
}

function sparkle(w, { accent = 'orange' }) {
	return star(w / 2, PALETTE[accent]);
}

function blocks(w, { accent = 'red' }) {
	const sw = stroke(w);
	return `
		<rect x="${-w / 2}" y="${-w * 0.1}" width="${w * 0.44}" height="${w * 0.44}" rx="${w * 0.07}" fill="${PALETTE[accent]}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		<circle cx="${w * 0.22}" cy="${w * 0.12}" r="${w * 0.2}" fill="${PALETTE.teal}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		<path d="M ${w * 0.02} ${-w * 0.16} L ${w * 0.3} ${-w * 0.16} L ${w * 0.16} ${-w * 0.44} Z" fill="${PALETTE.orange}" stroke="${PALETTE.ink}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}

function mug(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 1.05;
	return `
		<path d="M ${w * 0.5} ${-h * 0.3} a ${w * 0.28} ${w * 0.28} 0 1 1 0 ${h * 0.5}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw * 2.2}"/>
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.16}" fill="${PALETTE[accent]}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>`;
}

function phone(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 2;
	const rows = [0, 1, 2]
		.map(
			(i) =>
				`<rect x="${-w * 0.32}" y="${-h * 0.28 + i * h * 0.18}" width="${w * 0.64}" height="${h * 0.1}" rx="${h * 0.05}" fill="${i === 0 ? PALETTE[accent] : PALETTE.grey}"/>`
		)
		.join('');
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.18}" fill="${PALETTE.white}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>
		${rows}`;
}

const PROPS = { laptop, browser, microbit, bubble, sparkle, blocks, mug, phone };

// ── Scene assembly ────────────────────────────────────────────────

function propExtent(p) {
	// generous horizontal half-extent estimate for margin validation
	return (p.w * W) / 2 + 8;
}

function validateMargin(scene) {
	const side = scene.headlineSide ?? 'left';
	const boundary = W / 3;
	const items = [...(scene.props ?? [])];
	if (scene.mascot) {
		const mh = scene.mascot.h * H;
		items.push({ type: 'mascot', x: scene.mascot.x, y: scene.mascot.y, w: (mh * 0.9) / W });
	}
	for (const p of items) {
		const cx = p.x * W;
		const ext = propExtent(p);
		const intrudes = side === 'left' ? cx - ext < boundary : cx + ext > W - boundary;
		if (intrudes && p.type !== 'sparkle') {
			console.warn(
				`  ⚠ ${scene.id}: ${p.type} intrudes into the ${side}-third headline zone (x=${p.x})`
			);
		}
	}
}

async function mascotImage(scene) {
	const { pose, x, y, h, flip = false } = scene.mascot;
	const file = path.join(STICKERS, `${pose}.png`);
	if (!fs.existsSync(file)) throw new Error(`Unknown pose "${pose}" — add it to reference/stickers/`);
	const trimmed = await sharp(file).trim().toBuffer({ resolveWithObject: true });
	const ph = Math.round(h * H);
	const pw = Math.round((trimmed.info.width / trimmed.info.height) * ph);
	const b64 = trimmed.data.toString('base64');
	const cx = x * W;
	const cy = y * H;
	const shadowW = pw * 0.42;
	const transform = flip
		? `translate(${cx + pw / 2}, ${cy - ph / 2}) scale(-1,1)`
		: `translate(${cx - pw / 2}, ${cy - ph / 2})`;
	return `
		<ellipse cx="${cx}" cy="${cy + ph / 2 + 6}" rx="${shadowW}" ry="${shadowW * 0.16}" fill="rgba(20,20,20,0.10)"/>
		<g transform="${transform}"><image href="data:image/png;base64,${b64}" width="${pw}" height="${ph}"/></g>`;
}

// Distance from a prop's origin to its visual bottom edge, in px — used to
// drop a ground shadow so grounded props sit on the scene baseline.
const BOTTOM_OFFSET = {
	laptop: (w) => w * 0.03,
	microbit: (w) => w * 0.8 * 0.48,
	blocks: (w) => w * 0.34,
	mug: (w) => w * 0.55,
	phone: (w) => w * 1.0,
};

function propSVG(p) {
	const fn = PROPS[p.type];
	if (!fn) throw new Error(`Unknown prop type "${p.type}" — see PROPS in generate-banners.mjs`);
	const w = p.w * W;
	const body = fn(w, p);
	const rot = p.rotate ? ` rotate(${p.rotate})` : '';
	const bottom = BOTTOM_OFFSET[p.type];
	const shadow =
		p.shadow === false || !bottom
			? ''
			: `<ellipse cx="${p.x * W}" cy="${p.y * H + bottom(w) + 4}" rx="${w * 0.52}" ry="${w * 0.06}" fill="rgba(20,20,20,0.08)"/>`;
	return `${shadow}<g transform="translate(${p.x * W}, ${p.y * H})${rot}">${body}</g>`;
}

export async function renderScene(scene) {
	validateMargin(scene);
	// props inherit the scene accent unless they set their own
	const props = (scene.props ?? []).map((p) => ({ accent: scene.accent ?? 'red', ...p }));
	const mascot = scene.mascot ? await mascotImage(scene) : '';
	// mascot sits above back-layer props; props with layer:"front" draw on top
	const front = props.filter((p) => p.layer === 'front').map(propSVG);
	const back = props.filter((p) => p.layer !== 'front').map(propSVG);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
		<rect width="${W}" height="${H}" fill="${scene.background ?? PALETTE.paper}"/>
		${back.join('\n')}
		${mascot}
		${front.join('\n')}
	</svg>`;
	return sharp(Buffer.from(svg)).webp({ quality: 92 }).toBuffer();
}

async function main() {
	const only = process.argv.slice(2);
	const scenes = JSON.parse(fs.readFileSync(SCENES, 'utf8'));
	fs.mkdirSync(OUT_DIR, { recursive: true });
	for (const scene of scenes) {
		if (only.length && !only.includes(scene.id)) continue;
		if (scene.accent && !ACCENTS.includes(scene.accent)) {
			throw new Error(`${scene.id}: accent must be one of ${ACCENTS.join(', ')}`);
		}
		const buf = await renderScene(scene);
		const out = path.join(OUT_DIR, `${scene.id}.webp`);
		fs.writeFileSync(out, buf);
		console.log(`✓ ${scene.id} → ${path.relative(ROOT, out)} (${(buf.length / 1024).toFixed(0)} KB)`);
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
