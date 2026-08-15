#!/usr/bin/env node
// Renders the full prop library as labeled specimen sheets (light + dark)
// to public/images/banners/_specimen-light.webp / _specimen-dark.webp.
// Regenerate after adding props so the library stays reviewable at a glance.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import sharpMod from 'sharp';
import { PROPS, STICKER_PROPS, PALETTE, setTheme } from './generate-banners.mjs';

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
	{ label: 'breadboard', type: 'breadboard', w: 190 },
	{ label: 'gamepad', type: 'gamepad', w: 170 },
	...['dots', 'code', 'zap', 'heart', 'question', 'bulb'].map((k) => ({
		label: `bubble·${k}`,
		type: 'bubble',
		kind: k,
		w: 150,
	})),
	{ label: 'laptop·code+react', type: 'laptop', screen: 'code', logo: 'react', w: 200 },
	{ label: 'browser·canvas+figma', type: 'browser', screen: 'canvas', logo: 'figma', w: 180 },
	{ label: 'terminal+copilot', type: 'terminal', logo: 'githubcopilot', w: 180 },
	{ label: 'blocks', type: 'blocks', w: 130 },
	{ label: 'mug', type: 'mug', w: 80 },
	{ label: 'books', type: 'books', w: 150 },
	{ label: 'sticky', type: 'sticky', w: 130 },
	{ label: 'trophy', type: 'trophy', w: 110 },
	{ label: 'skyline', type: 'skyline', w: 210, opacity: 0.85 },
	{ label: 'diamond', type: 'diamond', w: 80 },
	{ label: 'diamond·outline', type: 'diamond', outline: true, w: 80 },
	{ label: 'face (sticker)', type: 'face', w: 150 },
	{ label: 'microbit (minted)', type: 'microbit', w: 190 },
	{ label: 'robot-buggy (minted)', type: 'robot-buggy', w: 170 },
	{ label: 'printer3d (minted)', type: 'printer3d', w: 130 },
	{ label: 'vr-headset (minted)', type: 'vr-headset', w: 170 },
	{ label: 'marble-run (minted)', type: 'marble-run', w: 140 },
	{ label: 'bee-bot (minted)', type: 'bee-bot', w: 160 },
	{ label: 'drone (minted)', type: 'drone', w: 180 },
	{ label: 'rocket (minted)', type: 'rocket', w: 100 },
	{ label: 'pen3d (minted)', type: 'pen3d', w: 60 },
	{ label: 'croc-clips (minted)', type: 'croc-clips', w: 160 },
	{ label: 'soldering-iron (minted)', type: 'soldering-iron', w: 160 },
	{ label: 'handheld-console (minted)', type: 'handheld-console', w: 110 },
	{ label: 'cardboard-house (minted)', type: 'cardboard-house', w: 140 },
	{ label: 'ultrasonic-sensor (minted)', type: 'ultrasonic-sensor', w: 150 },
	{ label: 'servo (minted)', type: 'servo', w: 130 },
	{ label: 'led-strip (minted)', type: 'led-strip', w: 190 },
	{ label: 'smart-plant (minted)', type: 'smart-plant', w: 120 },
];

// pre-render sticker-based cells (async) into inline <image> markup
const stickerCells = new Map();
for (const item of ITEMS) {
	if (!STICKER_PROPS[item.type]) continue;
	const file = path.join(ROOT, 'reference', 'stickers', STICKER_PROPS[item.type]);
	const { data, info } = await sharpMod(file).trim().png().toBuffer({ resolveWithObject: true });
	const h = (info.height / info.width) * item.w;
	stickerCells.set(
		item.type,
		`<image href="data:image/png;base64,${data.toString('base64')}" x="${-item.w / 2}" y="${-h / 2}" width="${item.w}" height="${h}"/>`
	);
}

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
		const body = stickerCells.get(item.type) ?? PROPS[item.type](item.w, { accent: 'red', ...item });
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
