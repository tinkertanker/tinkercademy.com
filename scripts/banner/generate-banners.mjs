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
			`<rect x="${x0 + w * 0.1}" y="${y0 + h * 0.16}" width="${w * 0.34}" height="${h * 0.6}" rx="${h * 0.03}" fill="${T.screen}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.02}"/>` +
			`<rect x="${x0 + w * 0.54}" y="${y0 + h * 0.16}" width="${w * 0.34}" height="${h * 0.38}" rx="${h * 0.03}" fill="${T.screen}" stroke="${PALETTE.midgrey}" stroke-width="${h * 0.02}"/>` +
			`<circle cx="${x0 + w * 0.62}" cy="${y0 + h * 0.68}" r="${h * 0.07}" fill="${acc}"/>`
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

function laptop(w, { screen = 'blocks', accent = 'red' }) {
	const sw = stroke(w);
	const scrW = w * 0.9;
	const scrH = scrW * 0.64;
	return `
		<rect x="${-scrW / 2}" y="${-scrH}" width="${scrW}" height="${scrH}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -scrW / 2, -scrH, scrW, scrH, accent)}
		<rect x="${-w / 2}" y="${-sw / 2}" width="${w}" height="${w * 0.055}" rx="${w * 0.0275}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>`;
}

function monitor(w, { screen = 'code', accent = 'red' }) {
	const sw = stroke(w);
	const scrH = w * 0.6;
	return `
		<rect x="${-w * 0.06}" y="${scrH / 2}" width="${w * 0.12}" height="${w * 0.14}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>
		<rect x="${-w * 0.18}" y="${scrH / 2 + w * 0.14}" width="${w * 0.36}" height="${w * 0.05}" rx="${w * 0.025}" fill="${T.device}" stroke="${T.line}" stroke-width="${sw * 0.7}"/>
		<rect x="${-w / 2}" y="${-scrH / 2}" width="${w}" height="${scrH}" rx="${w * 0.03}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -w / 2 + w * 0.03, -scrH / 2 + w * 0.03, w * 0.94, scrH - w * 0.06, accent)}`;
}

function tablet(w, { screen = 'canvas', accent = 'red' }) {
	const sw = stroke(w);
	const h = w * 1.33;
	return `
		<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${w * 0.1}" fill="${T.screen}" stroke="${T.line}" stroke-width="${sw}"/>
		${screenContent(screen, -w / 2 + w * 0.07, -h / 2 + w * 0.07, w * 0.86, h - w * 0.14, accent)}`;
}

function browser(w, { screen, accent = 'red' }) {
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
		${dots}${content}`;
}

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
	} else if (kind === 'heart') {
		const s = w * 0.36;
		inner = `<path d="M 0 ${s * 0.35} C ${-s * 0.9} ${-s * 0.4}, ${-s * 0.35} ${-s * 0.95}, 0 ${-s * 0.4} C ${s * 0.35} ${-s * 0.95}, ${s * 0.9} ${-s * 0.4}, 0 ${s * 0.35} Z" fill="${acc}"/>`;
	} else if (kind === 'question') {
		inner =
			`<path d="M ${-w * 0.1} ${-h * 0.12} a ${w * 0.11} ${w * 0.11} 0 1 1 ${w * 0.16} ${w * 0.13} l ${-w * 0.05} ${w * 0.05}" fill="none" stroke="${PALETTE.ink}" stroke-width="${sw * 1.3}" stroke-linecap="round"/>` +
			`<circle cx="${w * 0.01}" cy="${h * 0.22}" r="${sw * 0.9}" fill="${PALETTE.ink}"/>`;
	} else if (kind === 'bulb') {
		inner =
			`<circle cx="0" cy="${-h * 0.06}" r="${w * 0.13}" fill="${PALETTE.orange}" stroke="${PALETTE.ink}" stroke-width="${sw}"/>` +
			`<rect x="${-w * 0.05}" y="${h * 0.06}" width="${w * 0.1}" height="${h * 0.12}" rx="${w * 0.02}" fill="${PALETTE.grey}" stroke="${PALETTE.ink}" stroke-width="${sw * 0.7}"/>`;
	}
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

function plant(w, { accent = 'teal' }) {
	const sw = stroke(w);
	const h = w * 1.1;
	return `
		<path d="M 0 ${-h * 0.05} C ${-w * 0.5} ${-h * 0.35}, ${-w * 0.4} ${-h * 0.62}, ${-w * 0.05} ${-h * 0.5} Z" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>
		<path d="M 0 ${-h * 0.05} C ${w * 0.5} ${-h * 0.4}, ${w * 0.35} ${-h * 0.68}, ${w * 0.03} ${-h * 0.52} Z" fill="${PALETTE[accent]}" stroke="${T.line}" stroke-width="${sw}"/>
		<path d="M 0 ${-h * 0.02} C ${-w * 0.08} ${-h * 0.45}, ${w * 0.08} ${-h * 0.55}, 0 ${-h * 0.7}" fill="none" stroke="${T.line}" stroke-width="${sw}"/>
		<path d="M ${-w * 0.35} ${-h * 0.05} L ${w * 0.35} ${-h * 0.05} L ${w * 0.26} ${h * 0.5} L ${-w * 0.26} ${h * 0.5} Z" fill="${PALETTE[accent === 'teal' ? 'red' : 'teal']}" stroke="${T.line}" stroke-width="${sw}" stroke-linejoin="round"/>`;
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
			`<rect x="${-w * 0.5 + i * w * 0.075}" y="${-h * 0.55}" width="${w * 0.05}" height="${h * 0.55}" fill="${c}"/>`
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
	bubble, sparkle, blocks, mug, books, plant, sticky, trophy, skyline, diamond,
};

// ── Scene assembly ────────────────────────────────────────────────

// Background-dressing prop types: skipped by margin validation and shadows.
const BACKGROUND_TYPES = new Set(['sparkle', 'diamond', 'skyline', 'wire']);

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
	monitor: (w) => w * 0.3 + w * 0.19,
	tablet: (w) => w * 0.665,
	microbit: (w) => w * 0.78 * 0.42,
	breadboard: (w) => w * 0.17,
	gamepad: (w) => w * 0.26,
	blocks: (w) => w * 0.34,
	mug: (w) => w * 0.55,
	phone: (w) => w * 1.0,
	books: (w) => w * 0.24,
	plant: (w) => w * 0.55,
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

export async function renderScene(scene) {
	validateMargin(scene);
	const mode = scene.mode ?? 'light';
	setTheme(mode);
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

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	main().catch((e) => {
		console.error(e);
		process.exit(1);
	});
}
