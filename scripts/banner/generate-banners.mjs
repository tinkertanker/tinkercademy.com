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
// Prop specimen sheet: node scripts/banner/prop-specimen.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import * as simpleIcons from 'simple-icons';

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
const THEMES = {
	light: {
		line: PALETTE.ink,
		screen: PALETTE.white,
		device: PALETTE.ink,
		shadow: 'rgba(20,20,20,0.08)',
	},
	dark: {
		line: PALETTE.paper,
		screen: '#FFFDF6',
		device: '#1E1B18',
		shadow: 'rgba(250,243,232,0.07)',
	},
};

let T = THEMES.light; // set per scene in renderScene()

function stroke(w) {
	return Math.max(3, w * 0.035);
}

// ── Lucide icons ──────────────────────────────────────────────────
// Open-source icon set (ISC licence, lucide.dev) vendored via the
// lucide-static package. Icons are 24x24 stroke paths; we scale them and
// restroke to match the library's line weight. Use for bubble glyphs and
// any small symbol — do not hand-draw new glyphs when Lucide has one.

const LUCIDE_DIR = path.join(ROOT, 'node_modules', 'lucide-static', 'icons');
const lucideCache = new Map();

function lucideIcon(name, size, color, weight = 2.2) {
	if (!lucideCache.has(name)) {
		const file = path.join(LUCIDE_DIR, `${name}.svg`);
		if (!fs.existsSync(file)) throw new Error(`Unknown Lucide icon "${name}"`);
		const svg = fs.readFileSync(file, 'utf8');
		const inner = svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1).replace('</svg>', '');
		lucideCache.set(name, inner.trim());
	}
	const s = size / 24;
	return `<g transform="scale(${s}) translate(-12,-12)" fill="none" stroke="${color}" stroke-width="${weight}" stroke-linecap="round" stroke-linejoin="round">${lucideCache.get(name)}</g>`;
}

// ── Tool logos ────────────────────────────────────────────────────
// Official brand marks from simple-icons (CC0). Devices take a `logo` field
// (e.g. "unity", "react", "figma") and render the mark in the window chrome.
// Marks whose official colour is too light for a white screen fall back to ink.

function logoMark(slug, size, onDark = false) {
	const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1);
	const icon = simpleIcons[key];
	if (!icon) throw new Error(`No simple-icons entry for "${slug}"`);
	let fill = `#${icon.hex}`;
	const [r, g, b] = [0, 2, 4].map((i) => parseInt(icon.hex.slice(i, i + 2), 16));
	const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	if (!onDark && luma > 0.72) fill = PALETTE.ink;
	if (onDark && luma < 0.25) fill = PALETTE.paper;
	return `<g transform="scale(${size / 24}) translate(-12,-12)"><path d="${icon.path}" fill="${fill}"/></g>`;
}

// ── Screen contents ───────────────────────────────────────────────
// Decoupled from devices: any screen renders into any device's display
// rect. Each takes the rect's top-left (x0,y0), size (w,h), and accent.
// Combinations multiply: N devices × M screens, one flag in the spec.

export const SCREENS = {
	blocks(x0, y0, w, h, acc) {
		const bars = [
			[PALETTE.teal, 0.52],
			[acc, 0.4],
			[PALETTE.orange, 0.46],
			[PALETTE.teal, 0.3],
		];
		return (
			bars
				.map(
					([fill, bw], i) =>
						`<rect x="${x0 + w * 0.08 + i * w * 0.025}" y="${y0 + h * (0.14 + i * 0.2)}" width="${w * bw}" height="${h * 0.13}" rx="${h * 0.05}" fill="${fill}"/>`
				)
				.join('') +
			`<rect x="${x0 + w * 0.68}" y="${y0 + h * 0.14}" width="${w * 0.24}" height="${h * 0.36}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>`
		);
	},
	code(x0, y0, w, h, acc) {
		return [0.5, 0.66, 0.4, 0.58, 0.3]
			.map(
				(bw, i) =>
					`<rect x="${x0 + w * 0.08}" y="${y0 + h * (0.12 + i * 0.16)}" width="${w * bw}" height="${h * 0.08}" rx="${h * 0.04}" fill="${i === 2 ? acc : PALETTE.midgrey}"/>`
			)
			.join('');
	},
	chat(x0, y0, w, h, acc) {
		return (
			`<rect x="${x0 + w * 0.08}" y="${y0 + h * 0.12}" width="${w * 0.5}" height="${h * 0.18}" rx="${h * 0.09}" fill="${PALETTE.grey}"/>` +
			`<rect x="${x0 + w * 0.38}" y="${y0 + h * 0.38}" width="${w * 0.54}" height="${h * 0.18}" rx="${h * 0.09}" fill="${acc}"/>` +
			`<rect x="${x0 + w * 0.08}" y="${y0 + h * 0.64}" width="${w * 0.4}" height="${h * 0.18}" rx="${h * 0.09}" fill="${PALETTE.grey}"/>`
		);
	},
	canvas(x0, y0, w, h, acc) {
		return (
			`<rect x="${x0 + w * 0.06}" y="${y0 + h * 0.1}" width="${w * 0.88}" height="${h * 0.8}" rx="${h * 0.03}" fill="${PALETTE.grey}"/>` +
			`<rect x="${x0 + w * 0.12}" y="${y0 + h * 0.2}" width="${w * 0.32}" height="${h * 0.56}" rx="${h * 0.03}" fill="${T.screen}"/>` +
			`<rect x="${x0 + w * 0.54}" y="${y0 + h * 0.2}" width="${w * 0.32}" height="${h * 0.36}" rx="${h * 0.03}" fill="${T.screen}"/>` +
			`<rect x="${x0 + w * 0.18}" y="${y0 + h * 0.3}" width="${w * 0.2}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.midgrey}"/>` +
			`<rect x="${x0 + w * 0.18}" y="${y0 + h * 0.44}" width="${w * 0.14}" height="${h * 0.08}" rx="${h * 0.04}" fill="${acc}"/>` +
			`<path d="M ${x0 + w * 0.44} ${y0 + h * 0.4} C ${x0 + w * 0.49} ${y0 + h * 0.32}, ${x0 + w * 0.49} ${y0 + h * 0.32}, ${x0 + w * 0.54} ${y0 + h * 0.36}" fill="none" stroke="${acc}" stroke-width="${h * 0.025}"/>` +
			`<circle cx="${x0 + w * 0.62}" cy="${y0 + h * 0.68}" r="${h * 0.06}" fill="${acc}"/>`
		);
	},
	// 2D platformer: ground, platforms, player block, coins, goal flag
	game(x0, y0, w, h, acc) {
		return (
			`<rect x="${x0}" y="${y0 + h * 0.78}" width="${w}" height="${h * 0.22}" fill="${PALETTE.teal}"/>` +
			`<rect x="${x0 + w * 0.38}" y="${y0 + h * 0.5}" width="${w * 0.22}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.teal}"/>` +
			`<rect x="${x0 + w * 0.12}" y="${y0 + h * 0.62}" width="${w * 0.1}" height="${h * 0.16}" rx="${h * 0.03}" fill="${acc}"/>` +
			`<circle cx="${x0 + w * 0.45}" cy="${y0 + h * 0.36}" r="${h * 0.05}" fill="${PALETTE.orange}"/>` +
			`<circle cx="${x0 + w * 0.55}" cy="${y0 + h * 0.36}" r="${h * 0.05}" fill="${PALETTE.orange}"/>` +
			`<line x1="${x0 + w * 0.84}" y1="${y0 + h * 0.42}" x2="${x0 + w * 0.84}" y2="${y0 + h * 0.78}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.03}"/>` +
			`<path d="M ${x0 + w * 0.84} ${y0 + h * 0.42} l ${w * 0.1} ${h * 0.07} l ${-w * 0.1} ${h * 0.07} Z" fill="${acc}"/>`
		);
	},
	// 3D viewport: perspective grid floor, cube, axis gizmo
	scene3d(x0, y0, w, h, acc) {
		const hz = y0 + h * 0.55;
		let grid = '';
		for (let i = 0; i <= 4; i++) {
			const gx = x0 + (w / 4) * i;
			grid += `<line x1="${gx}" y1="${y0 + h}" x2="${x0 + w / 2 + (gx - x0 - w / 2) * 0.25}" y2="${hz}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.015}"/>`;
		}
		grid += `<line x1="${x0}" y1="${hz}" x2="${x0 + w}" y2="${hz}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.015}"/>`;
		const cs = w * 0.16;
		const cx0 = x0 + w * 0.42;
		const cy0 = y0 + h * 0.38;
		return (
			grid +
			`<rect x="${cx0}" y="${cy0}" width="${cs}" height="${cs}" fill="${acc}"/>` +
			`<path d="M ${cx0} ${cy0} l ${cs * 0.35} ${-cs * 0.3} l ${cs} 0 l ${-cs * 0.35} ${cs * 0.3} Z" fill="${acc}" opacity="0.7"/>` +
			`<path d="M ${cx0 + cs} ${cy0} l ${cs * 0.35} ${-cs * 0.3} l 0 ${cs} l ${-cs * 0.35} ${cs * 0.3} Z" fill="${acc}" opacity="0.45"/>` +
			`<g stroke-width="${h * 0.03}" stroke-linecap="round">` +
			`<line x1="${x0 + w * 0.1}" y1="${y0 + h * 0.24}" x2="${x0 + w * 0.1}" y2="${y0 + h * 0.1}" stroke="${PALETTE.teal}"/>` +
			`<line x1="${x0 + w * 0.1}" y1="${y0 + h * 0.24}" x2="${x0 + w * 0.18}" y2="${y0 + h * 0.24}" stroke="${PALETTE.red}"/>` +
			`<line x1="${x0 + w * 0.1}" y1="${y0 + h * 0.24}" x2="${x0 + w * 0.05}" y2="${y0 + h * 0.3}" stroke="${PALETTE.orange}"/>` +
			`</g>`
		);
	},
	// spreadsheet: grid with header row + one accent column
	sheet(x0, y0, w, h, acc) {
		let g = `<rect x="${x0 + w * 0.06}" y="${y0 + h * 0.1}" width="${w * 0.88}" height="${h * 0.14}" fill="${acc}" rx="${h * 0.02}"/>`;
		for (let r = 0; r < 4; r++)
			g += `<line x1="${x0 + w * 0.06}" y1="${y0 + h * (0.24 + r * 0.17)}" x2="${x0 + w * 0.94}" y2="${y0 + h * (0.24 + r * 0.17)}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.015}"/>`;
		for (let c = 0; c < 4; c++)
			g += `<line x1="${x0 + w * (0.06 + c * 0.22)}" y1="${y0 + h * 0.1}" x2="${x0 + w * (0.06 + c * 0.22)}" y2="${y0 + h * 0.92}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.015}"/>`;
		g += `<rect x="${x0 + w * 0.5}" y="${y0 + h * 0.24}" width="${w * 0.22}" height="${h * 0.68}" fill="${acc}" opacity="0.25"/>`;
		return g;
	},
	// slide deck: title bar, bullets, mini bar chart
	slides(x0, y0, w, h, acc) {
		return (
			`<rect x="${x0 + w * 0.08}" y="${y0 + h * 0.12}" width="${w * 0.5}" height="${h * 0.14}" rx="${h * 0.07}" fill="${PALETTE.ink}" opacity="0.75"/>` +
			[0, 1]
				.map(
					(i) =>
						`<circle cx="${x0 + w * 0.12}" cy="${y0 + h * (0.44 + i * 0.18)}" r="${h * 0.035}" fill="${acc}"/>` +
						`<rect x="${x0 + w * 0.18}" y="${y0 + h * (0.4 + i * 0.18)}" width="${w * 0.32}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.midgrey}"/>`
				)
				.join('') +
			[0.3, 0.55, 0.42]
				.map(
					(bh, i) =>
						`<rect x="${x0 + w * (0.62 + i * 0.1)}" y="${y0 + h * (0.88 - bh)}" width="${w * 0.07}" height="${h * bh}" fill="${i === 1 ? acc : PALETTE.teal}"/>`
				)
				.join('')
		);
	},
};

function screenContent(name, x0, y0, w, h, accent) {
	const fn = SCREENS[name];
	if (!fn) throw new Error(`Unknown screen "${name}" — see SCREENS in generate-banners.mjs`);
	return fn(x0, y0, w, h, PALETTE[accent] ?? PALETTE.red);
}

// ── Prop library ──────────────────────────────────────────────────
// Every prop draws into a group centred on (0,0); the compositor
// translates it to the scene position. `w` is the prop width in px.

function laptop(w, { screen = 'blocks', accent = 'red', logo }) {
	const sw = stroke(w);
	const scrW = w * 0.9;
	const scrH = scrW * 0.64;
	const mark = logo
		? `<g transform="translate(${scrW * 0.38}, ${-scrH * 0.16})">${logoMark(logo, scrH * 0.18)}</g>`
		: '';
	return `
		<rect x="${-scrW / 2}" y="${-scrH}" width="${scrW}" height="${scrH}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -scrW / 2, -scrH, scrW, scrH, accent)}
		${mark}
		<rect x="${-w / 2}" y="${-sw / 2}" width="${w}" height="${w * 0.055}" rx="${w * 0.0275}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>`;
}

function monitor(w, { screen = 'code', accent = 'red', logo }) {
	const sw = stroke(w);
	const scrH = w * 0.6;
	return `
		<rect x="${-w * 0.06}" y="${scrH / 2}" width="${w * 0.12}" height="${w * 0.14}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>
		<rect x="${-w * 0.18}" y="${scrH / 2 + w * 0.14}" width="${w * 0.36}" height="${w * 0.05}" rx="${w * 0.025}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>
		<rect x="${-w / 2}" y="${-scrH / 2}" width="${w}" height="${scrH}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -w / 2 + w * 0.03, -scrH / 2 + w * 0.03, w * 0.94, scrH - w * 0.06, accent)}
		${logo ? `<g transform="translate(${w * 0.4}, ${scrH * 0.36})">${logoMark(logo, scrH * 0.16)}</g>` : ''}`;
}

function tablet(w, { screen = 'canvas', accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 1.33;
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14, accent)}`;
}

function browser(w, { screen, accent = 'red', logo }) {
	const sw = stroke(w);
	const h = w * 0.72;
	const acc = PALETTE[accent];
	const dots = ['red', 'orange', 'teal']
		.map(
			(c, i) =>
				`<circle cx="${-w / 2 + w * 0.08 + i * w * 0.07}" cy="${-h / 2 + h * 0.1}" r="${w * 0.022}" fill="${PALETTE[c]}"/>`
		)
		.join('');
	const content = screen
		? screenContent(screen, -w / 2, -h / 2 + h * 0.2, w, h * 0.8, accent)
		: `<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.3}" width="${w * 0.84}" height="${h * 0.34}" rx="${w * 0.02}" fill="${acc}"/>` +
			`<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.72}" width="${w * 0.56}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.midgrey}"/>` +
			`<rect x="${-w / 2 + w * 0.08}" y="${-h / 2 + h * 0.84}" width="${w * 0.4}" height="${h * 0.08}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>`;
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.04}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		<line x1="${-w / 2}" y1="${-h / 2 + h * 0.2}" x2="${w / 2}" y2="${-h / 2 + h * 0.2}" stroke="${T.line}" stroke-width="${sw * 0.8}"/>
		${dots}${logo ? `<g transform="translate(${w * 0.42}, ${-h / 2 + h * 0.1})">${logoMark(logo, h * 0.13)}</g>` : ''}${content}`;
}

function terminal(w, { accent = 'teal', logo }) {
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
		${logo ? `<g transform="translate(${w * 0.42}, ${-h / 2 + h * 0.09})">${logoMark(logo, h * 0.11, true)}</g>` : ''}
		${rows}`;
}

function phone(w, { screen, accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 2;
	const content = screen
		? screenContent(screen, -w * 0.38, -h * 0.4, w * 0.76, h * 0.8, accent)
		: [0, 1, 2]
				.map(
					(i) =>
						`<rect x="${-w * 0.32}" y="${-h * 0.28 + i * h * 0.18}" width="${w * 0.64}" height="${h * 0.1}" rx="${h * 0.05}" fill="${i === 0 ? PALETTE[accent] : PALETTE.grey}"/>`
				)
				.join('');
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.18}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${content}`;
}

function microbit(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.78;
	const bw = w;
	const bh = h * 0.8;
	const top = -h / 2;
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
	let pins = '';
	const pinN = 20;
	for (let i = 0; i < pinN; i++) {
		const px = -bw / 2 + bw * 0.04 + i * ((bw * 0.92) / pinN);
		pins += `<rect x="${px}" y="${top + bh}" width="${bw * 0.022}" height="${h * 0.2}" fill="${PALETTE.orange}"/>`;
	}
	const pads = [-bw * 0.36, 0, bw * 0.36]
		.map(
			(px) =>
				`<rect x="${px - bw * 0.05}" y="${top + bh}" width="${bw * 0.1}" height="${h * 0.22}" rx="${bw * 0.012}" fill="${PALETTE.orange}" stroke="${T.line}" stroke-width="${sw * 0.5}"/>` +
				`<circle cx="${px}" cy="${top + bh + h * 0.11}" r="${bw * 0.028}" fill="${T.device}"/>`
		)
		.join('');
	return `
		${pins}${pads}
		<rect x="${-bw / 2}" y="${top}" width="${bw}" height="${bh}" rx="${bw * 0.06}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw}"/>
		<circle cx="${-bw * 0.42}" cy="${top + bh * 0.14}" r="${bw * 0.022}" fill="none" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.5}"/>
		<circle cx="${bw * 0.42}" cy="${top + bh * 0.14}" r="${bw * 0.022}" fill="none" stroke="${PALETTE.midgrey}" stroke-width="${sw * 0.5}"/>
		<rect x="${-bw * 0.47}" y="${top + bh * 0.38}" width="${bw * 0.11}" height="${bh * 0.24}" rx="${bw * 0.02}" fill="${PALETTE.grey}" stroke="${T.line}" stroke-width="${sw * 0.6}"/>
		<circle cx="${-bw * 0.415}" cy="${top + bh * 0.5}" r="${bw * 0.026}" fill="${T.device}"/>
		<rect x="${bw * 0.36}" y="${top + bh * 0.38}" width="${bw * 0.11}" height="${bh * 0.24}" rx="${bw * 0.02}" fill="${PALETTE.grey}" stroke="${T.line}" stroke-width="${sw * 0.6}"/>
		<circle cx="${bw * 0.415}" cy="${top + bh * 0.5}" r="${bw * 0.026}" fill="${T.device}"/>
		${leds}`;
}

function breadboard(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.34;
	let holes = '';
	for (let r = 0; r < 4; r++)
		for (let c = 0; c < 12; c++)
			holes += `<circle cx="${-w * 0.44 + c * w * 0.08}" cy="${-h * 0.3 + r * h * 0.2}" r="${w * 0.008}" fill="${PALETTE.midgrey}"/>`;
	const acc = PALETTE[accent];
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		<line x1="${-w / 2}" y1="0" x2="${w / 2}" y2="0" stroke="${PALETTE.grey}" stroke-width="${sw}"/>
		${holes}
		<path d="M ${-w * 0.28} ${-h * 0.3} C ${-w * 0.2} ${-h * 1.1}, ${w * 0.05} ${-h * 1.1}, ${w * 0.12} ${-h * 0.3}" fill="none" stroke="${acc}" stroke-width="${sw * 1.4}" stroke-linecap="round"/>
		<path d="M ${-w * 0.04} ${-h * 0.1} C ${w * 0.05} ${-h * 0.8}, ${w * 0.25} ${-h * 0.8}, ${w * 0.36} ${-h * 0.1}" fill="none" stroke="${PALETTE.teal}" stroke-width="${sw * 1.4}" stroke-linecap="round"/>`;
}

// Connector: a sagging wire between two scene points. Spec: x,y = start,
// x2,y2 = end (fractions); w = thickness fraction. Drawn in scene space.
function wireSVG(p) {
	const x1 = p.x * W;
	const y1 = p.y * H;
	const x2 = p.x2 * W;
	const y2 = p.y2 * H;
	const sag = (p.sag ?? 0.12) * H;
	const mx = (x1 + x2) / 2;
	const my = Math.max(y1, y2) + sag;
	const sw = Math.max(4, (p.w ?? 0.004) * W);
	const acc = PALETTE[p.accent ?? 'red'];
	return `
		<path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" fill="none" stroke="${acc}" stroke-width="${sw}" stroke-linecap="round"/>
		<circle cx="${x1}" cy="${y1}" r="${sw * 1.1}" fill="${acc}" stroke="${T.line}" stroke-width="${sw * 0.4}"/>
		<circle cx="${x2}" cy="${y2}" r="${sw * 1.1}" fill="${acc}" stroke="${T.line}" stroke-width="${sw * 0.4}"/>`;
}

function gamepad(w, { accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 0.52;
	const acc = PALETTE[accent];
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * 0.5}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw}"/>
		<rect x="${-w * 0.3}" y="${-h * 0.08}" width="${w * 0.2}" height="${h * 0.16}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>
		<rect x="${-w * 0.22}" y="${-h * 0.24}" width="${w * 0.04}" height="${h * 0.48}" rx="${h * 0.04}" fill="${PALETTE.grey}"/>
		<circle cx="${w * 0.18}" cy="${-h * 0.05}" r="${h * 0.09}" fill="${acc}"/>
		<circle cx="${w * 0.32}" cy="${h * 0.1}" r="${h * 0.09}" fill="${PALETTE.teal}"/>`;
}

// Speech bubble with an integrated tail (tail is stroked first, then the
// body, then the tail is re-filled to erase the seam — reads as one shape).
// Glyphs come from Lucide (open-source) instead of hand-drawn marks.
const BUBBLE_ICONS = {
	code: 'code',
	heart: 'heart',
	question: 'circle-help',
	bulb: 'lightbulb',
	zap: 'zap',
};

function bubble(w, { kind = 'dots', accent = 'red', tail = 'left' }) {
	const sw = stroke(w) * 1.1;
	const h = w * 0.62;
	const acc = PALETTE[accent];
	const dir = tail === 'left' ? -1 : 1;
	const tx = dir * w * 0.16;
	const tailPath = `M ${tx - w * 0.09} ${h * 0.3} L ${tx + w * 0.05} ${h * 0.3} L ${tx + dir * 0.02 * w - w * 0.02} ${h * 0.62} Z`;
	let inner = '';
	if (kind === 'dots') {
		inner = [-1, 0, 1]
			.map((i) => `<circle cx="${i * w * 0.14}" cy="0" r="${w * 0.038}" fill="${PALETTE.ink}"/>`)
			.join('');
	} else {
		const icon = BUBBLE_ICONS[kind];
		if (!icon) throw new Error(`Unknown bubble kind "${kind}"`);
		const colored = kind === 'heart' || kind === 'bulb' || kind === 'zap';
		inner = lucideIcon(icon, h * 0.52, colored ? acc : PALETTE.ink);
	}
	return `
		<path d="${tailPath}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}" stroke-linejoin="round"/>
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * 0.32}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		<path d="${tailPath}" fill="${T.screen}"/>
		${inner}`;
}

function star(r, fill) {
	const s = r * 0.36;
	return `<path d="M 0 ${-r} Q ${s * 0.3} ${-s * 0.3} ${r} 0 Q ${s * 0.3} ${s * 0.3} 0 ${r} Q ${-s * 0.3} ${s * 0.3} ${-r} 0 Q ${-s * 0.3} ${-s * 0.3} 0 ${-r} Z" fill="${fill}"/>`;
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

function books(w, { accent = 'red' }) {
	const sw = stroke(w);
	const bh = w * 0.16;
	const spines = [
		[PALETTE.teal, 0.95, 0],
		[PALETTE[accent], 1.0, -0.03],
		[PALETTE.orange, 0.85, 0.02],
	];
	return spines
		.map(
			([fill, bw2, dx], i) =>
				`<rect x="${-w * 0.5 + dx * w}" y="${w * 0.24 - (i + 1) * bh}" width="${w * bw2}" height="${bh}" rx="${bh * 0.3}" fill="${fill}" stroke="${T.line}" stroke-width="${sw}"/>`
		)
		.join('');
}


function sticky(w, { accent = 'orange' }) {
	const sw = stroke(w);
	return `
		<rect x="${-w * 0.5}" y="${-w * 0.42}" width="${w * 0.8}" height="${w * 0.8}" rx="${w * 0.04}" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}" transform="rotate(-4)"/>
		<rect x="${-w * 0.18}" y="${-w * 0.28}" width="${w * 0.8}" height="${w * 0.8}" rx="${w * 0.04}" fill="${PALETTE.teal}" stroke="${T.line}" stroke-width="${sw}" transform="rotate(3)"/>
		<line x1="${w * 0.0}" y1="${-w * 0.02}" x2="${w * 0.44}" y2="${-w * 0.02}" stroke="${T.line}" stroke-width="${sw}" transform="rotate(3)"/>
		<line x1="${w * 0.0}" y1="${w * 0.14}" x2="${w * 0.36}" y2="${w * 0.14}" stroke="${T.line}" stroke-width="${sw}" transform="rotate(3)"/>`;
}

function trophy(w, { accent = 'orange' }) {
	const sw = stroke(w);
	const h = w * 1.2;
	return `
		<path d="M ${-w * 0.5} ${-h * 0.42} a ${w * 0.2} ${w * 0.2} 0 1 0 ${w * 0.14} ${h * 0.28}" fill="none" stroke="${T.line}" stroke-width="${sw * 1.6}"/>
		<path d="M ${w * 0.5} ${-h * 0.42} a ${w * 0.2} ${w * 0.2} 0 1 1 ${-w * 0.14} ${h * 0.28}" fill="none" stroke="${T.line}" stroke-width="${sw * 1.6}"/>
		<path d="M ${-w * 0.36} ${-h * 0.5} L ${w * 0.36} ${-h * 0.5} C ${w * 0.36} ${-h * 0.1}, ${w * 0.14} ${h * 0.02}, 0 ${h * 0.02} C ${-w * 0.14} ${h * 0.02}, ${-w * 0.36} ${-h * 0.1}, ${-w * 0.36} ${-h * 0.5} Z" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>
		<rect x="${-w * 0.07}" y="${h * 0.02}" width="${w * 0.14}" height="${h * 0.14}" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>
		<rect x="${-w * 0.26}" y="${h * 0.16}" width="${w * 0.52}" height="${h * 0.12}" rx="${w * 0.03}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw}"/>
		${star(w * 0.12, T.screen).replace('<path', `<path transform="translate(0,${-h * 0.24})"`)}`;
}

// Singapore skyline silhouette band — background dressing for home /
// showcase / event scenes. Draw with `opacity` ≈ 0.1–0.2.
function skyline(w, { accent }) {
	const c = accent ? PALETTE[accent] : T.line;
	const h = w * 0.22;
	const g = [];
	// Marina Bay Sands: three towers + deck
	for (let i = 0; i < 3; i++)
		g.push(
			`<rect x="${-w * 0.5 + i * w * 0.075}" y="${-h * 0.63}" width="${w * 0.05}" height="${h * 0.63}" fill="${c}"/>`
		);
	g.push(
		`<rect x="${-w * 0.52}" y="${-h * 0.72}" width="${w * 0.24}" height="${h * 0.1}" rx="${h * 0.05}" fill="${c}"/>`
	);
	// Singapore Flyer: wheel + spokes + stand
	const fx = -w * 0.1;
	const fr = h * 0.42;
	g.push(
		`<circle cx="${fx}" cy="${-h * 0.5}" r="${fr}" fill="none" stroke="${c}" stroke-width="${h * 0.05}"/>`,
		`<line x1="${fx - fr * 0.7}" y1="${-h * 0.5 - fr * 0.7}" x2="${fx + fr * 0.7}" y2="${-h * 0.5 + fr * 0.7}" stroke="${c}" stroke-width="${h * 0.04}"/>`,
		`<line x1="${fx + fr * 0.7}" y1="${-h * 0.5 - fr * 0.7}" x2="${fx - fr * 0.7}" y2="${-h * 0.5 + fr * 0.7}" stroke="${c}" stroke-width="${h * 0.04}"/>`,
		`<line x1="${fx}" y1="${-h * 0.5 + fr}" x2="${fx}" y2="0" stroke="${c}" stroke-width="${h * 0.05}"/>`
	);
	// generic CBD blocks
	const blocksSpec = [
		[0.06, 0.75], [0.14, 0.5], [0.2, 0.9], [0.28, 0.62], [0.35, 0.8], [0.43, 0.45],
	];
	for (const [bx, bh] of blocksSpec)
		g.push(`<rect x="${w * bx}" y="${-h * bh}" width="${w * 0.055}" height="${h * bh}" fill="${c}"/>`);
	// ground line
	g.push(`<line x1="${-w * 0.54}" y1="0" x2="${w * 0.52}" y2="0" stroke="${c}" stroke-width="${h * 0.05}" stroke-linecap="round"/>`);
	return g.join('');
}

function diamond(w, { accent = 'red', outline = false }) {
	const h = w * 1.45;
	const fill = outline ? 'none' : PALETTE[accent];
	const strokeAttr = outline
		? `stroke="${PALETTE[accent]}" stroke-width="${stroke(w) * 1.2}" stroke-linejoin="round"`
		: `stroke="${T.line}" stroke-width="${stroke(w)}" stroke-linejoin="round"`;
	return `<path d="M 0 ${-h / 2} L ${w / 2} 0 L 0 ${h / 2} L ${-w / 2} 0 Z" fill="${fill}" ${strokeAttr}/>`;
}

export const PROPS = {
	laptop, monitor, tablet, browser, terminal, phone,
	microbit, breadboard, gamepad,
	bubble, blocks, mug, books, sticky, trophy, skyline, diamond,
};

// ── Sticker props ─────────────────────────────────────────────────
// PNG assets from the tkrobot pack (and imagegen-minted object stickers in
// reference/stickers/props/) placed as scene props. Rendered async like the
// mascot; get the dark-mode halo automatically. `w` is width fraction.
export const STICKER_PROPS = {
	face: 'face.png',
};
for (const f of fs.existsSync(path.join(STICKERS, 'props'))
	? fs.readdirSync(path.join(STICKERS, 'props'))
	: []) {
	if (f.endsWith('.png')) STICKER_PROPS[f.replace('.png', '')] = `props/${f}`;
}

async function imagePropSVG(p) {
	const file = path.join(ROOT, p.src);
	if (!fs.existsSync(file)) throw new Error(`image prop src not found: ${p.src}`);
	const { data, info } = await sharp(file).trim().png().toBuffer({ resolveWithObject: true });
	const pw = p.w * W;
	const ph = (info.height / info.width) * pw;
	const x0 = p.x * W - pw / 2;
	const y0 = p.ground ? 0.82 * H - ph : p.y * H - ph / 2;
	const opacity = p.opacity != null ? ` opacity="${p.opacity}"` : '';
	return `<g${opacity}><image href="data:image/png;base64,${data.toString('base64')}" x="${x0}" y="${y0}" width="${pw}" height="${ph}"/></g>`;
}

async function stickerPropSVG(p, mode) {
	const file = path.join(STICKERS, STICKER_PROPS[p.type]);
	const { data, info } = await sharp(file).trim().png().toBuffer({ resolveWithObject: true });
	const pw = p.w * W;
	const ph = (info.height / info.width) * pw;
	const x0 = p.x * W - pw / 2;
	// ground:true sits the sticker's bottom edge on the scene baseline
	const y0 = p.ground ? 0.82 * H - ph : p.y * H - ph / 2;
	const img = (b64) =>
		`<image href="data:image/png;base64,${b64}" x="${x0}" y="${y0}" width="${pw}" height="${ph}"/>`;
	let layers = '';
	if (mode === 'dark') {
		const halo = await stickerHalo(data, info);
		layers += img(halo.toString('base64'));
	}
	layers += img(data.toString('base64'));
	const shadow =
		p.shadow === false
			? ''
			: `<ellipse cx="${p.x * W}" cy="${y0 + ph + 4}" rx="${pw * 0.5}" ry="${pw * 0.06}" fill="${T.shadow}"/>`;
	const opacity = p.opacity != null ? ` opacity="${p.opacity}"` : '';
	return `${shadow}<g${opacity}>${layers}</g>`;
}

// ── Scene assembly ────────────────────────────────────────────────

// Background-dressing prop types: skipped by margin validation and shadows.
const BACKGROUND_TYPES = new Set(['diamond', 'skyline', 'wire', 'face', 'image']);

function propExtent(p) {
	return (p.w * W) / 2 + 8;
}

function validateMargin(scene) {
	const side = scene.headlineSide ?? 'left';
	if (side === 'none') return;
	const boundary = W / 3;
	const items = [...(scene.props ?? [])];
	if (scene.mascot) {
		const mh = scene.mascot.h * H;
		items.push({ type: 'mascot', x: scene.mascot.x, y: scene.mascot.y, w: (mh * 0.9) / W });
	}
	for (const p of items) {
		if (BACKGROUND_TYPES.has(p.type)) continue;
		const cx = p.x * W;
		const ext = propExtent(p);
		const intrudes = side === 'left' ? cx - ext < boundary : cx + ext > W - boundary;
		if (intrudes) {
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
		create: { width: info.width, height: info.height, channels: 3, background: PALETTE.paper },
	})
		.joinChannel(mask)
		.png()
		.toBuffer();
}

// Remove the emanata baked into the sticker PNGs (orange/yellow motion
// marks, exclamation bursts) so the mascot reads clean in banner scenes.
// The character itself has no orange — gem is red, limbs grey — so hue
// filtering is safe. Re-trims afterwards since marks often set the bbox.
async function stripEmanata(pngBuffer) {
	const { data, info } = await sharp(pngBuffer)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const { width, height } = info;
	// 1) knock out orange/yellow mark fills by hue (the character has no orange)
	for (let i = 0; i < data.length; i += 4) {
		const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
		if (a > 0 && r > 170 && g > 85 && b < 140 && r - b > 80 && g - b > 40) {
			data[i + 3] = 0;
		}
	}
	// 2) drop every opaque region not connected to the character's main body —
	// removes mark outlines and any leftover floating shapes wholesale
	const n = width * height;
	const label = new Int32Array(n).fill(-1);
	const sizes = [];
	const stack = [];
	for (let start = 0; start < n; start++) {
		if (label[start] !== -1 || data[start * 4 + 3] < 40) continue;
		const id = sizes.length;
		let size = 0;
		stack.push(start);
		label[start] = id;
		while (stack.length) {
			const px = stack.pop();
			size++;
			const x = px % width, y = (px / width) | 0;
			for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
				const nx = x + dx, ny = y + dy;
				if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
				const np = ny * width + nx;
				if (label[np] === -1 && data[np * 4 + 3] >= 40) {
					label[np] = id;
					stack.push(np);
				}
			}
		}
		sizes.push(size);
	}
	const main = sizes.indexOf(Math.max(...sizes, 0));
	for (let px = 0; px < n; px++) {
		if (data[px * 4 + 3] > 0 && label[px] !== main) data[px * 4 + 3] = 0;
	}
	return sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer();
}

async function mascotImage(scene, mode) {
	const { pose, x, y, h, flip = false, marks = false } = scene.mascot;
	const file = path.join(STICKERS, `${pose}.png`);
	if (!fs.existsSync(file)) throw new Error(`Unknown pose "${pose}" — add it to reference/stickers/`);
	let png = await sharp(file).trim().png().toBuffer();
	if (!marks) png = await stripEmanata(png);
	const { data, info } = await sharp(png).trim().png().toBuffer({ resolveWithObject: true });
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
	// soft radial glow behind the character so the black body separates
	// from the ground in both themes
	const glowId = `glow-${Math.round(cx)}-${Math.round(cy)}`;
	const glowOpacity = mode === 'dark' ? 0.16 : 0.55;
	const glowColor = mode === 'dark' ? PALETTE.paper : PALETTE.white;
	const glow = `
		<radialGradient id="${glowId}" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="${glowColor}" stop-opacity="${glowOpacity}"/>
			<stop offset="0.65" stop-color="${glowColor}" stop-opacity="${glowOpacity * 0.35}"/>
			<stop offset="1" stop-color="${glowColor}" stop-opacity="0"/>
		</radialGradient>
		<ellipse cx="${cx}" cy="${cy}" rx="${pw * 0.85}" ry="${ph * 0.62}" fill="url(#${glowId})"/>`;
	let layers = '';
	if (mode === 'dark') {
		const halo = await stickerHalo(data, info);
		layers += place(halo.toString('base64'));
	}
	layers += place(data.toString('base64'));
	return `
		${glow}
		<ellipse cx="${cx}" cy="${cy + ph / 2 + 6}" rx="${shadowW}" ry="${shadowW * 0.16}" fill="${T.shadow}"/>
		${layers}`;
}

const BOTTOM_OFFSET = {
	laptop: (w) => w * 0.03,
	monitor: (w) => w * 0.3 + w * 0.19,
	tablet: (w) => w * 0.665,
	microbit: (w) => w * 0.78 * 0.42,
	breadboard: (w) => w * 0.17,
	gamepad: (w) => w * 0.26,
	blocks: (w) => w * 0.34,
	mug: (w) => w * 0.55,
	phone: (w) => w * 1.0,
	books: (w) => w * 0.24,
	trophy: (w) => w * 0.34,
};

function propSVG(p) {
	if (p.type === 'wire') return wireSVG(p);
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
			</pattern>
			<linearGradient id="textguard" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0" stop-color="#0C0A09" stop-opacity="0.55"/>
				<stop offset="0.38" stop-color="#0C0A09" stop-opacity="0"/>
			</linearGradient>`,
		layers: `
			<rect width="${W}" height="${H}" fill="url(#ground)"/>
			<rect width="${W}" height="${H}" fill="url(#dots)"/>
			<ellipse cx="${spotX * W}" cy="${spotY * H}" rx="${spotR * W}" ry="${spotR * W * 0.82}" fill="url(#spot)"/>
			<ellipse cx="${spotX * W}" cy="${0.85 * H}" rx="${0.3 * W}" ry="${0.045 * H}" fill="${PALETTE.paper}" opacity="0.05"/>
			<rect width="${W}" height="${H}" fill="url(#textguard)"/>`,
	};
}

export function setTheme(mode) {
	T = THEMES[mode] ?? THEMES.light;
	return T;
}

// Faded-photo backdrop: an existing photo (e.g. a retired cdx hero) heavily
// darkened and desaturated so it reads as environmental texture, with the
// dark-mode atmosphere layered over it. scene.photo = { src, darken?, sat? }.
async function photoLayer(photo) {
	const src = path.join(ROOT, photo.src.startsWith('/') ? `public${photo.src}` : photo.src);
	if (!fs.existsSync(src)) throw new Error(`photo.src not found: ${src}`);
	const buf = await sharp(src)
		.resize(W, H, { fit: 'cover' })
		.modulate({ brightness: photo.darken ?? 0.36, saturation: photo.sat ?? 0.22 })
		.png()
		.toBuffer();
	return `<image href="data:image/png;base64,${buf.toString('base64')}" width="${W}" height="${H}"/>`;
}

// ── Layout templates ──────────────────────────────────────────────
// Named arrangements so scenes don't need hand-tuned coordinates and the
// catalogue stays visually consistent. A template assigns position + size to
// the mascot and to each non-background prop in spec order.
const LAYOUTS = {
	// classic: big mascot centre-right, grounded device far right, bubble
	// upper-left of the mascot, optional small foreground item at its feet
	hero: {
		mascot: { x: 0.6, y: 0.51, h: 0.62 },
		slots: [
			{ x: 0.85, y: 0.8, w: 0.21 },
			{ x: 0.47, y: 0.22, w: 0.09, tail: 'right' },
			{ x: 0.7, y: 0.772, w: 0.08, layer: 'front' },
		],
	},
	// bottom-right trio: three elements stepping down in size toward the
	// corner — large floating window, medium window in front, big mascot
	// grounded at the right edge behind the work
	trio: {
		mascot: { x: 0.89, y: 0.57, h: 0.5 },
		slots: [
			{ x: 0.55, y: 0.4, w: 0.24 },
			{ x: 0.73, y: 0.64, w: 0.18, layer: 'front' },
		],
	},
};

function applyLayout(scene) {
	const layout = LAYOUTS[scene.layout];
	if (!layout) {
		if (scene.layout) throw new Error(`${scene.id}: unknown layout "${scene.layout}"`);
		return scene;
	}
	const out = structuredClone(scene);
	if (out.mascot) Object.assign(out.mascot, layout.mascot);
	let i = 0;
	for (const p of out.props ?? []) {
		if (BACKGROUND_TYPES.has(p.type)) continue;
		if (i < layout.slots.length) {
			Object.assign(p, layout.slots[i++]);
			// grounded prop types sit on the scene baseline regardless of the
			// slot's y (which is tuned for floating windows)
			if (BOTTOM_OFFSET[p.type]) {
				p.y = 0.82 - BOTTOM_OFFSET[p.type](p.w * W) / H;
			}
		}
	}
	return out;
}

export async function renderScene(rawScene) {
	const scene = applyLayout(rawScene);
	validateMargin(scene);
	const mode = scene.mode ?? 'light';
	setTheme(mode);
	const props = (scene.props ?? []).map((p) => ({ accent: scene.accent ?? 'red', ...p }));
	const mascot = scene.mascot ? await mascotImage(scene, mode) : '';
	const rendered = await Promise.all(
		props.map((p) => p.type === 'image' ? imagePropSVG(p) : STICKER_PROPS[p.type] ? stickerPropSVG(p, mode) : Promise.resolve(propSVG(p)))
	);
	const front = rendered.filter((_, i) => props[i].layer === 'front');
	const back = rendered.filter((_, i) => props[i].layer !== 'front');
	let defs = '';
	let ground = `<rect width="${W}" height="${H}" fill="${scene.background ?? PALETTE.paper}"/>`;
	if (mode === 'dark') {
		const g = darkGround(scene);
		defs = g.defs;
		ground = g.layers;
		if (scene.photo) {
			// photo sits under the gradient; the gradient becomes a tint
			const img = await photoLayer(scene.photo);
			ground = ground.replace('<rect width="1600" height="900" fill="url(#ground)"/>',
				`${img}<rect width="${W}" height="${H}" fill="url(#ground)" opacity="0.8"/>`);
		}
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

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	main().catch((e) => {
		console.error(e);
		process.exit(1);
	});
}
