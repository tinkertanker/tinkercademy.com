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

// Dark-mode ground gradients, tinted per accent. The left edge stays
// near-black because the site's hero scrim + white headline live there.
const DARK_GROUNDS = {
	red: ['#131010', '#2A1412'],
	orange: ['#131110', '#291D0C'],
	teal: ['#101313', '#122724'],
};

// Theme = everything the prop library needs to draw legibly on the ground.
// `line` is the outline colour (ink on paper, paper on dark).
const THEMES = {
	light: {
		line: PALETTE.ink,
		screen: PALETTE.white,
		screenMuted: PALETTE.midgrey,
		screenFaint: PALETTE.grey,
		device: PALETTE.ink,
		shadow: 'rgba(20,20,20,0.08)',
	},
	dark: {
		line: PALETTE.paper,
		screen: '#FFFDF6',
		screenMuted: PALETTE.midgrey,
		screenFaint: PALETTE.grey,
		device: '#1E1B18',
		shadow: 'rgba(250,243,232,0.07)',
	},
};

let T = THEMES.light; // set per scene in renderScene()

// ── Prop library ──────────────────────────────────────────────────
// Every prop draws into a group centred on (0,0); the compositor
// translates it to the scene position. `w` is the prop width in px.
// Style contract: flat fills, thick outlines (~3.5% of w), palette only.

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
		content =
			`<rect x="${cx + scrW * 0.1}" y="${cy + scrH * 0.16}" width="${scrW * 0.34}" height="${scrH * 0.6}" rx="${scrH * 0.03}" fill="${T.screen}" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.6}"/>` +
			`<rect x="${cx + scrW * 0.54}" y="${cy + scrH * 0.16}" width="${scrW * 0.34}" height="${scrH * 0.38}" rx="${scrH * 0.03}" fill="${T.screen}" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.6}"/>` +
			`<circle cx="${cx + scrW * 0.62}" cy="${cy + scrH * 0.68}" r="${scrH * 0.07}" fill="${acc}"/>`;
	}
	return `
		<rect x="${-scrW / 2}" y="${-scrH}" width="${scrW}" height="${scrH}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${content}
		<rect x="${-w / 2}" y="${-sw / 2}" width="${w}" height="${w * 0.055}" rx="${w * 0.0275}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>`;
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
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.04}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		<line x1="${-w / 2}" y1="${-h / 2 + h * 0.2}" x2="${w / 2}" y2="${-h / 2 + h * 0.2}" stroke="${T.line}" stroke-width="${sw * 0.8}"/>
		${dots}
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.3}" width="${w * 0.84}" height="${h * 0.34}" rx="${w * 0.02}" fill="${acc}"/>
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.72}" width="${w * 0.56}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.midgrey}"/>
		<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.84}" width="${w * 0.4}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>`;
}

// Dark terminal window — the "pro" counterpart to browser.
function terminal(w, { accent = 'teal' }) {
	const sw = stroke(w);
	const h = w * 0.66;
	const acc = PALETTE[accent];
	const rows = [
		[0.34, acc],
		[0.52, PALETTE.midgrey],
		[0.44, PALETTE.midgrey],
		[0.26, acc],
	]
		.map(
			([bw, fill], i) =>
				`<rect x="${-w / 2 + w * 0.14}" y="${-h / 2 + h * (0.3 + i * 0.15)}" width="${w * bw}" height="${h * 0.06}" rx="${h * 0.03}" fill="${fill}"/>` +
				`<rect x="${-w / 2 + w * 0.07}" y="${-h / 2 + h * (0.3 + i * 0.15)}" width="${w * 0.04}" height="${h * 0.06}" rx="${h * 0.02}" fill="${i % 2 ? PALETTE.grey : acc}"/>`
		)
		.join('');
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.04}" fill="#211E1A" stroke="${T.line}" stroke-width="${sw}"/>
		<line x1="${-w / 2}" y1="${-h / 2 + h * 0.18}" x2="${w / 2}" y2="${-h / 2 + h * 0.18}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>
		<circle cx="${-w / 2 + w * 0.07}" cy="${-h / 2 + h * 0.09}" r="${w * 0.02}" fill="${PALETTE.red}"/>
		<circle cx="${-w / 2 + w * 0.14}" cy="${-h / 2 + h * 0.09}" r="${w * 0.02}" fill="${PALETTE.orange}"/>
		<circle cx="${-w / 2 + w * 0.21}" cy="${-h / 2 + h * 0.09}" r="${w * 0.02}" fill="${PALETTE.teal}"/>
		${rows}`;
}

// micro:bit v2-ish board: rounded PCB, 5x5 LED matrix, A/B buttons,
// gold edge connector with three large pads. Proportions from the real board
// (roughly 5:4), no text anywhere.
function microbit(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.78;
	const bw = w; // board width
	const bh = h * 0.8; // board height above the connector strip
	const top = -h / 2;
	// LED matrix, centred on the board
	const litSet = new Set(
		[[0, 2], [1, 1], [1, 3], [2, 0], [2, 2], [2, 4], [3, 1], [3, 3], [4, 2]].map((p) => p.join())
	);
	let leds = '';
	const cell = bw * 0.052;
	const gapX = bw * 0.075;
	const gapY = bh * 0.14;
	for (let r = 0; r < 5; r++)
		for (let c = 0; c < 5; c++) {
			const on = litSet.has(`${r},${c}`);
			leds += `<rect x="${-2 * gapX + c * gapX - cell / 2}" y="${top + bh * 0.2 + r * gapY - cell / 2}" width="${cell}" height="${cell * 1.25}" rx="${cell * 0.18}" fill="${on ? PALETTE[accent] : '#4A4440'}"/>`;
		}
	// gold edge connector: fine pins with three large pads
	let pins = '';
	const pinN = 20;
	const pinW = bw * 0.022;
	for (let i = 0; i < pinN; i++) {
		const px = -bw / 2 + bw * 0.04 + i * ((bw * 0.92) / pinN);
		pins += `<rect x="${px}" y="${top + bh}" width="${pinW}" height="${h * 0.2}" fill="${PALETTE.orange}"/>`;
	}
	const padXs = [-bw * 0.36, 0, bw * 0.36];
	const pads = padXs
		.map(
			(px) =>
				`<rect x="${px - bw * 0.05}" y="${top + bh}" width="${bw * 0.1}" height="${h * 0.22}" rx="${bw * 0.012}" fill="${PALETTE.orange}" stroke="${T.line}" stroke-width="${sw * 0.5}"/>` +
				`<circle cx="${px}" cy="${top + bh + h * 0.11}" r="${bw * 0.028}" fill="${T.device}"/>`
		)
		.join('');
	return `
		${pins}
		<rect x="${-bw / 2}" y="${top}" width="${bw}" height="${bh}" rx="${bw * 0.06}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw}"/>
		<circle cx="${-bw * 0.42}" cy="${top + bh * 0.14}" r="${bw * 0.022}" fill="none" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.5}"/>
		<circle cx="${bw * 0.42}" cy="${top + bh * 0.14}" r="${bw * 0.022}" fill="none" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.5}"/>
		<rect x="${-bw * 0.47}" y="${top + bh * 0.38}" width="${bw * 0.11}" height="${bh * 0.24}" rx="${bw * 0.02}" fill="${PALETTE.grey}" stroke="${T.line}" stroke-width="${sw * 0.6}"/>
		<circle cx="${-bw * 0.415}" cy="${top + bh * 0.5}" r="${bw * 0.026}" fill="${T.device}"/>
		<rect x="${bw * 0.36}" y="${top + bh * 0.38}" width="${bw * 0.11}" height="${bh * 0.24}" rx="${bw * 0.02}" fill="${PALETTE.grey}" stroke="${T.line}" stroke-width="${sw * 0.6}"/>
		<circle cx="${bw * 0.415}" cy="${top + bh * 0.5}" r="${bw * 0.026}" fill="${T.device}"/>
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
	// bubbles keep a warm-white fill in both themes so their ink glyphs read
	return `
		<path d="M ${tx} ${h * 0.42} l ${tail === 'left' ? -w * 0.08 : w * 0.08} ${h * 0.22} l ${tail === 'left' ? w * 0.14 : -w * 0.14} ${-h * 0.16} Z" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}" stroke-linejoin="round"/>
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h * 0.92}" rx="${h * 0.3}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${inner}`;
}

function star(r, fill) {
	const s = r * 0.36;
	return `<path d="M 0 ${-r} Q ${s * 0.3} ${-s * 0.3} ${r} 0 Q ${s * 0.3} ${s * 0.3} 0 ${r} Q ${-s * 0.3} ${s * 0.3} ${-r} 0 Q ${-s * 0.3} ${-s * 0.3} 0 ${-r} Z" fill="${fill}"/>`;
}

function sparkle(w, { accent = 'orange' }) {
	return star(w / 2, PALETTE[accent]);
}

function blocks(w, { accent = 'red' }) {
	const sw = stroke(w);
	return `
		<rect x="${-w / 2}" y="${-w * 0.1}" width="${w * 0.44}" height="${w * 0.44}" rx="${w * 0.07}" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>
		<circle cx="${w * 0.22}" cy="${w * 0.12}" r="${w * 0.2}" fill="${PALETTE.teal}" stroke="${T.line}" stroke-width="${sw}"/>
		<path d="M ${w * 0.02} ${-w * 0.16} L ${w * 0.3} ${-w * 0.16} L ${w * 0.16} ${-w * 0.44} Z" fill="${PALETTE.orange}" stroke="${T.line}" stroke-width="${sw}" stroke-linejoin="round"/>`;
}

function mug(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 1.05;
	return `
		<path d="M ${w * 0.5} ${-h * 0.3} a ${w * 0.28} ${w * 0.28} 0 1 1 0 ${h * 0.5}" fill="none" stroke="${T.line}" stroke-width="${sw * 2.2}"/>
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.16}" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>`;
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
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.18}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${rows}`;
}

// Flat brand diamond (the mascot's chest gem) — pro scenes use it as a quiet
// background motif or a small badge in place of the full-body mascot.
function diamond(w, { accent = 'red', outline = false }) {
	const h = w * 1.45;
	const fill = outline ? 'none' : PALETTE[accent];
	const strokeAttr = outline
		? `stroke="${PALETTE[accent]}" stroke-width="${stroke(w) * 1.2}" stroke-linejoin="round"`
		: `stroke="${T.line}" stroke-width="${stroke(w)}" stroke-linejoin="round"`;
	return `<path d="M 0 ${-h / 2} L ${w / 2} 0 L 0 ${h / 2} L ${-w / 2} 0 Z" fill="${fill}" ${strokeAttr}/>`;
}

const PROPS = { laptop, browser, terminal, microbit, bubble, sparkle, blocks, mug, phone, diamond };

// ── Scene assembly ────────────────────────────────────────────────

function propExtent(p) {
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
		if (intrudes && !['sparkle', 'diamond'].includes(p.type)) {
			console.warn(
				`  ⚠ ${scene.id}: ${p.type} intrudes into the ${side}-third headline zone (x=${p.x})`
			);
		}
	}
}

// Die-cut sticker keyline: a paper-coloured halo built by dilating the
// sticker's alpha. Separates the black-bodied mascot from dark grounds.
async function stickerHalo(trimmedPng, info) {
	const mask = await sharp(trimmedPng)
		.ensureAlpha()
		.extractChannel(3)
		.blur(14)
		.threshold(30)
		.blur(1.5)
		.toBuffer();
	return sharp({
		create: {
			width: info.width,
			height: info.height,
			channels: 3,
			background: PALETTE.paper,
		},
	})
		.joinChannel(mask)
		.png()
		.toBuffer();
}

async function mascotImage(scene, mode) {
	const { pose, x, y, h, flip = false } = scene.mascot;
	const file = path.join(STICKERS, `${pose}.png`);
	if (!fs.existsSync(file)) throw new Error(`Unknown pose "${pose}" — add it to reference/stickers/`);
	const { data, info } = await sharp(file).trim().png().toBuffer({ resolveWithObject: true });
	const ph = Math.round(h * H);
	const pw = Math.round((info.width / info.height) * ph);
	const cx = x * W;
	const cy = y * H;
	const shadowW = pw * 0.42;
	const place = (b64) => {
		const transform = flip
			? `translate(${cx + pw / 2}, ${cy - ph / 2}) scale(-1,1)`
			: `translate(${cx - pw / 2}, ${cy - ph / 2})`;
		return `<g transform="${transform}"><image href="data:image/png;base64,${b64}" width="${pw}" height="${ph}"/></g>`;
	};
	let layers = '';
	if (mode === 'dark') {
		const halo = await stickerHalo(data, info);
		layers += place(halo.toString('base64'));
	}
	layers += place(data.toString('base64'));
	return `
		<ellipse cx="${cx}" cy="${cy + ph / 2 + 6}" rx="${shadowW}" ry="${shadowW * 0.16}" fill="${T.shadow}"/>
		${layers}`;
}

const BOTTOM_OFFSET = {
	laptop: (w) => w * 0.03,
	microbit: (w) => w * 0.78 * 0.42,
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
			: `<ellipse cx="${p.x * W}" cy="${p.y * H + bottom(w) + 4}" rx="${w * 0.52}" ry="${w * 0.06}" fill="${T.shadow}"/>`;
	const opacity = p.opacity != null ? ` opacity="${p.opacity}"` : '';
	return `${shadow}<g transform="translate(${p.x * W}, ${p.y * H})${rot}"${opacity}>${body}</g>`;
}

// Dark-mode atmosphere: accent-tinted gradient ground, a soft spotlight
// pool behind the subject, a faint dot-grid texture, and a floor glow.
function darkGround(scene) {
	const accent = scene.accent ?? 'red';
	const [g0, g1] = DARK_GROUNDS[accent];
	const spotX = scene.spotlight?.x ?? scene.mascot?.x ?? 0.66;
	const spotY = scene.spotlight?.y ?? 0.45;
	const spotR = scene.spotlight?.r ?? 0.52;
	return {
		defs: `
			<linearGradient id="ground" x1="0" y1="0" x2="1" y2="1">
				<stop offset="0" stop-color="${g0}"/>
				<stop offset="1" stop-color="${g1}"/>
			</linearGradient>
			<radialGradient id="spot" cx="0.5" cy="0.5" r="0.5">
				<stop offset="0" stop-color="${PALETTE.paper}" stop-opacity="0.13"/>
				<stop offset="0.55" stop-color="${PALETTE.paper}" stop-opacity="0.05"/>
				<stop offset="1" stop-color="${PALETTE.paper}" stop-opacity="0"/>
			</radialGradient>
			<pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
				<circle cx="2" cy="2" r="1.3" fill="${PALETTE.paper}" opacity="0.055"/>
			</pattern>`,
		layers: `
			<rect width="${W}" height="${H}" fill="url(#ground)"/>
			<rect width="${W}" height="${H}" fill="url(#dots)"/>
			<ellipse cx="${spotX * W}" cy="${spotY * H}" rx="${spotR * W}" ry="${spotR * W * 0.82}" fill="url(#spot)"/>
			<ellipse cx="${spotX * W}" cy="${0.85 * H}" rx="${0.3 * W}" ry="${0.045 * H}" fill="${PALETTE.paper}" opacity="0.05"/>
			<linearGradient id="textguard" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0" stop-color="#0C0A09" stop-opacity="0.55"/>
				<stop offset="0.38" stop-color="#0C0A09" stop-opacity="0"/>
			</linearGradient>
			<rect width="${W}" height="${H}" fill="url(#textguard)"/>`,
	};
}

export async function renderScene(scene) {
	validateMargin(scene);
	const mode = scene.mode ?? 'light';
	T = THEMES[mode] ?? THEMES.light;
	const props = (scene.props ?? []).map((p) => ({ accent: scene.accent ?? 'red', ...p }));
	const mascot = scene.mascot ? await mascotImage(scene, mode) : '';
	const front = props.filter((p) => p.layer === 'front').map(propSVG);
	const back = props.filter((p) => p.layer !== 'front').map(propSVG);
	let defs = '';
	let ground = `<rect width="${W}" height="${H}" fill="${scene.background ?? PALETTE.paper}"/>`;
	if (mode === 'dark') {
		const g = darkGround(scene);
		defs = g.defs;
		ground = g.layers;
	}
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
		<defs>${defs}</defs>
		${ground}
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
