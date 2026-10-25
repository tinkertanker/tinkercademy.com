#!/usr/bin/env node
// Homepage share card + silent MP4, composed from the locked sticker pack.
// Run: node scripts/banner/generate-social.mjs (requires ffmpeg and woff2_decompress).
// Ordinary site builds use the checked-in outputs; no browser or image model needed.
import { copyFile, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
import { PALETTE, PROPS, setTheme, stripEmanata } from './generate-banners.mjs';
import { LOGO_BLACK } from '../../src/lib/site-media.js';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const W = 1200, H = 630, FPS = 30, SECONDS = 8;
const imagePath = path.join(ROOT, 'public/images/social/tinkercademy-v1.jpg');
const videoPath = path.join(ROOT, 'public/videos/tinkercademy-v1.mp4');
const fonts = {
	heading: ['IBM Plex Serif Medium', 'ibmplexserif/v20/ibm-plex-serif-500-latin.woff2'],
	body: ['Rubik', 'rubik/v31/iJWZBXyIfDnIV5PNhY1KTN7Z-Yh-B4i1VU80V4bVkA.woff2'],
};

async function textLayer(text, face, size, left, top, color = PALETTE.ink) {
	const [family, file] = fonts[face];
	const input = await sharp({ text: {
		text: `<span foreground="${color}">${text}</span>`,
		font: `${family}, ${size}`, fontfile: path.join(scratch, `${path.basename(file, '.woff2')}.ttf`), rgba: true,
	} }).png().toBuffer();
	return { input, left, top };
}

async function generate() {
	// Sharp's bundled FreeType does not decode WOFF2: expand the site's exact
	// fonts rather than silently falling back to a machine-dependent system font.
	for (const [, file] of Object.values(fonts)) {
		const local = path.join(scratch, path.basename(file));
		await copyFile(path.join(ROOT, 'public/fonts/s', file), local);
		execFileSync('woff2_decompress', [local]);
	}
	setTheme('light');
	const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body}</svg>`);
	const logo = await sharp(path.join(ROOT, 'public', LOGO_BLACK)).resize({ width: 310 }).png().toBuffer();
	const background = await sharp(svg(`
	<rect width="${W}" height="${H}" fill="${PALETTE.paper}"/>
	<path d="M64 409 H128" stroke="${PALETTE.red}" stroke-width="6"/>
`)).composite([
		{ input: logo, left: 64, top: 70 },
		// Verbatim homepage headline and lead; only the line breaks differ.
		await textLayer('Illuminate your', 'heading', 58, 64, 207),
		await textLayer('journey into', 'heading', 58, 64, 273),
		await textLayer('tech &amp; AI.', 'heading', 58, 64, 339),
		await textLayer('Learn coding, digital making, and', 'body', 25, 64, 435),
		await textLayer('agentic engineering from expert', 'body', 25, 64, 469),
		await textLayer('teachers and builders.', 'body', 25, 64, 503),
		await textLayer('tinkercademy.com', 'body', 20, 64, 557, PALETTE.teal),
	]).png().toBuffer();

	const mascot = (await stripEmanata(await readFile(path.join(ROOT, 'reference/stickers/greetings.png')))).toString('base64');
	const light = (await sharp(path.join(ROOT, 'reference/social/illumination.webp')).png().toBuffer()).toString('base64');
	// Cut out the existing 900px sticker, not a redrawn character. Limbs sit
	// behind the torso and overlap at the shoulders/hips to conceal the pivots.
	const parts = {
		leftArm: 'M0 140 H300 V295 L402 302 L377 335 L351 385 L340 396 H0 Z',
		rightArm: 'M570 305 L650 340 L765 500 V680 H600 L610 590 L628 500 L615 390 Z',
		leftLeg: 'M355 600 H425 V718 L465 760 V850 H270 V710 H355 Z',
		rightLeg: 'M527 604 H585 V714 L675 750 V850 H490 V735 H527 Z',
		body: 'M300 0 H650 V315 L578 315 C610 350 629 407 631 470 C636 547 610 588 581 604 C527 644 413 642 365 605 C320 581 309 527 319 470 C325 400 356 337 400 302 H300 Z',
	};
	const rigDefs = `<image id="mascot" href="data:image/png;base64,${mascot}" width="900" height="900"/>
		${Object.entries(parts).map(([id, d]) => `<clipPath id="${id}"><path d="${d}"/></clipPath>`).join('')}`;
	const limb = (id, angle, x, y) => `<g transform="rotate(${angle} ${x} ${y})"><use href="#mascot" clip-path="url(#${id})"/></g>`;
	const icons = {};
	for (const name of ['git-fork', 'text-cursor-input', 'brain-circuit', 'braces']) {
		const source = await readFile(path.join(ROOT, 'node_modules/lucide-static/icons', `${name}.svg`), 'utf8');
		icons[name] = source.match(/<(?:path|rect|circle)\b[^>]*\/>/g);
	}
	const attrs = (shape, attributes) => shape.replace('/>', ` ${attributes}/>`);
	const ease = (n) => { const x = Math.max(0, Math.min(1, n)); return x * x * (3 - 2 * x); };
	function symbol(t) {
		const slot = Math.floor(t / 2) % 4;
		const local = t % 2;
		// Hold for 1.6s, then project a half-turn onto the icon's horizontal
		// axis. Swap faces only edge-on; the surrounding bubble never moves.
		const flip = ease((local - 1.6) / 0.4);
		const next = flip >= 0.5;
		const index = (slot + Number(next)) % 4;
		const u = next ? 0 : Math.min(local, 1.6);
		let drawing;
		if (index === 0) {
			const [root, left, right] = icons['git-fork'];
			const branch = (delay) => ease((u - delay) / 0.65);
			// Lucide's fork connector split at its junction so each branch
			// can grow outward, rather than moving the whole workflow glyph.
			drawing = `<g transform="rotate(90 12 12)">
				${attrs(root, `fill="${PALETTE.teal}" fill-opacity="0.16"`)}
				<path d="M12 15v-3"/>
				<path d="M12 12H7c-.6 0-1-.4-1-1V9" stroke="${PALETTE.teal}" stroke-dasharray="${branch(0.1) * 10} 30"/>
				<path d="M12 12h5c.6 0 1-.4 1-1V9" stroke="${PALETTE.teal}" stroke-dasharray="${branch(0.45) * 10} 30"/>
				${attrs(left, `opacity="${0.25 + 0.75 * branch(0.1)}"`)}
				${attrs(right, `opacity="${0.25 + 0.75 * branch(0.45)}"`)}
			</g>`;
		} else if (index === 1) {
			const paths = icons['text-cursor-input'];
			const advance = Math.min(3, Math.floor(u / 0.35)) * 2;
			drawing = `<rect x="2" y="8" width="20" height="8" rx="2"/>
				<path d="M4 12h${1 + advance}" stroke="${PALETTE.teal}"/>
				<g transform="translate(${advance},0)" stroke="${PALETTE.teal}" opacity="${0.65 + 0.35 * Math.cos(u * Math.PI * 2) ** 2}">
					${paths[0]}${paths[3]}${paths[4]}
				</g>`;
		} else if (index === 2) {
			const shapes = icons['brain-circuit'];
			drawing = shapes.join('') + [5, 7, 6].map((i, order) => {
				const progress = ease((u - order * 0.35) / 0.55);
				return attrs(shapes[i], `stroke="${PALETTE.teal}" stroke-dasharray="${progress * 14} 40" opacity="${progress}"`);
			}).join('') + shapes.slice(9).map((node, i) => {
				const pulse = Math.sin(Math.PI * ease((u - i * 0.25) / 0.7));
				return attrs(node, `stroke="${PALETTE.teal}" stroke-width="${2 + pulse}" opacity="${pulse}"`);
			}).join('');
		} else {
			// Type the opening brace, then the closing brace, and hold the pair.
			drawing = icons.braces.slice(0, u < 0.2 ? 0 : u < 0.75 ? 1 : 2).join('');
		}
		const width = Math.abs(Math.cos(Math.PI * flip));
		return `<g transform="scale(${width},1)" opacity="${Math.min(1, width * 4)}">
			<g transform="scale(2.3) translate(-12,-12)" fill="none" stroke="${PALETTE.ink}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${drawing}</g>
		</g>`;
	}

	async function frame(t, staticCard = false) {
		// Every channel completes a whole cycle: no entrance, pose cuts or
		// jump back to a different silhouette when the video repeats.
		t %= SECONDS;
		const phase = t / 4 * Math.PI * 2;
		return sharp(background).composite([{ input: svg(`
		<defs>${rigDefs}</defs>
		<g transform="translate(1125,330) scale(${staticCard ? 1.2 : 1.03 + 0.17 * Math.cos(phase)},${staticCard ? 1.08 : 1 + 0.08 * Math.cos(phase)})">
			<image href="data:image/png;base64,${light}" x="-700" y="-390" width="950" height="780" preserveAspectRatio="none" opacity="${staticCard ? 0.78 : 0.74 + 0.04 * Math.cos(phase)}"/>
		</g>
		${staticCard ? '' : `<g transform="translate(715,135)">
			${PROPS.bubble(155, { kind: 'none', tail: 'right' })}
			${symbol(t)}
		</g>`}
		<g transform="translate(718,${144 + 3 * Math.sin(phase)}) scale(0.49)">
			<g transform="rotate(${0.8 * Math.sin(phase)} 480 450)">
				${limb('leftArm', 7 * Math.sin(phase * 2), 385, 340)}
				${limb('rightArm', 3 * Math.sin(phase + 0.6), 588, 347)}
				${limb('leftLeg', 4 * Math.sin(phase + 0.4), 390, 615)}
				${limb('rightLeg', 4 * Math.sin(phase - 0.4), 554, 615)}
				<use href="#mascot" clip-path="url(#body)"/>
			</g>
		</g>
		`) }]).png().toBuffer();
	}

	await mkdir(path.dirname(imagePath), { recursive: true });
	await mkdir(path.dirname(videoPath), { recursive: true });
	await sharp(await frame(1.3, true)).jpeg({ quality: 92, mozjpeg: true }).toFile(imagePath);
	for (let i = 0; i < FPS * SECONDS; i++) {
		// Include both endpoints; the last source frame is exactly the first.
		const t = i * SECONDS / (FPS * SECONDS - 1);
		await writeFile(path.join(scratch, `${String(i).padStart(3, '0')}.png`), await frame(t));
	}
	execFileSync('ffmpeg', [
		'-hide_banner', '-loglevel', 'error', '-y', '-framerate', String(FPS),
		'-i', path.join(scratch, '%03d.png'), '-an', '-c:v', 'libx264',
		'-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', videoPath,
	], { stdio: 'inherit' });
	console.log(`Created ${W}×${H} JPEG and ${SECONDS}s silent H.264 MP4.`);
}

const scratch = await mkdtemp(path.join(tmpdir(), 'tk-social-'));
try {
	await generate();
} finally {
	await rm(scratch, { recursive: true, force: true });
}
