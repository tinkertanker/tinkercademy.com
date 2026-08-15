#!/usr/bin/env node
// Renders the full prop library as labeled specimen sheets (light + dark)
// to public/images/banners/_specimen-light.webp / _specimen-dark.webp.
// Regenerate after adding props so the library stays reviewable at a glance.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { PROPS, SCREENS, PALETTE, setTheme } from './generate-banners.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'banners');

const CELL = 240;
const LABEL = 34;
const PAD = 16;

// what to showcase: every device × a representative screen, every screen on
// the laptop (to show the matrix), then the rest of the library
const ITEMS = [
	...['blocks', 'code', 'chat', 'canvas', 'game', 'scene3d', 'sheet', 'slides'].map((s) => ({
		label: `laptop·${s}`,
		type: 'laptop',
		screen: s,
		w: 200,
	})),
	{ label: 'monitor·scene3d', type: 'monitor', screen: 'scene3d', w: 170 },
	{ label: 'tablet·canvas', type: 'tablet', screen: 'canvas', w: 110 },
	{ label: 'browser·hero', type: 'browser', w: 180 },
	{ label: 'browser·chat', type: 'browser', screen: 'chat', w: 180 },
	{ label: 'browser·blocks', type: 'browser', screen: 'blocks', w: 180 },
	{ label: 'browser·sheet', type: 'browser', screen: 'sheet', w: 180 },
	{ label: 'monitor·game', type: 'monitor', screen: 'game', w: 170 },
	{ label: 'terminal', type: 'terminal', w: 180 },
	{ label: 'phone·chat', type: 'phone', screen: 'chat', w: 80 },
	{ label: 'microbit', type: 'microbit', w: 170 },
	{ label: 'breadboard', type: 'breadboard', w: 190 },
	{ label: 'gamepad', type: 'gamepad', w: 170 },
	...['dots', 'code', 'zap', 'heart', 'question', 'bulb'].map((k) => ({
		label: `bubble·${k}`,
		type: 'bubble',
		kind: k,
		w: 150,
	})),
	{ label: 'blocks', type: 'blocks', w: 130 },
	{ label: 'mug', type: 'mug', w: 80 },
	{ label: 'books', type: 'books', w: 150 },
	{ label: 'plant', type: 'plant', w: 100 },
	{ label: 'sticky', type: 'sticky', w: 130 },
	{ label: 'trophy', type: 'trophy', w: 110 },
	{ label: 'skyline', type: 'skyline', w: 210, opacity: 0.85 },
	{ label: 'diamond', type: 'diamond', w: 80 },
	{ label: 'diamond·outline', type: 'diamond', outline: true, w: 80 },
	{ label: 'glasses', type: 'glasses', w: 150 },
	{ label: 'robohead', type: 'robohead', w: 150 },
];

function sheetSVG(mode) {
	const T = setTheme(mode);
	const cols = 6;
	const rows = Math.ceil(ITEMS.length / cols);
	const width = cols * (CELL + PAD) + PAD;
	const height = rows * (CELL + LABEL + PAD) + PAD;
	const bg = mode === 'dark' ? '#191512' : PALETTE.paper;
	const label = mode === 'dark' ? PALETTE.paper : PALETTE.ink;
	let cells = '';
	ITEMS.forEach((item, i) => {
		const r = Math.floor(i / cols);
		const c = i % cols;
		const x = PAD + c * (CELL + PAD) + CELL / 2;
		const y = PAD + r * (CELL + LABEL + PAD) + CELL / 2;
		const body = PROPS[item.type](item.w, { accent: 'red', ...item });
		const op = item.opacity != null ? ` opacity="${item.opacity}"` : '';
		cells += `
			<rect x="${x - CELL / 2}" y="${y - CELL / 2}" width="${CELL}" height="${CELL}" fill="none" stroke="${label}" stroke-opacity="0.15"/>
			<g transform="translate(${x}, ${y + (item.type === 'laptop' ? 60 : 0)})"${op}>${body}</g>
			<text x="${x}" y="${y + CELL / 2 + 24}" text-anchor="middle" font-family="DejaVu Sans, sans-serif" font-size="17" fill="${label}">${item.label}</text>`;
	});
	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
		<rect width="${width}" height="${height}" fill="${bg}"/>
		${cells}
	</svg>`;
}

for (const mode of ['light', 'dark']) {
	const buf = await sharp(Buffer.from(sheetSVG(mode))).webp({ quality: 90 }).toBuffer();
	const out = path.join(OUT_DIR, `_specimen-${mode}.webp`);
	fs.writeFileSync(out, buf);
	console.log(`✓ ${out} (${(buf.length / 1024).toFixed(0)} KB)`);
}
