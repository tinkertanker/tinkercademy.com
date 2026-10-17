// Run with `node scripts/optimize-tutorial-media.mjs` (requires ffmpeg).
// Keep the source GIFs for existing inbound links and reproducible conversions.
import { mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const images = fileURLToPath(new URL('../public/images/', import.meta.url));
await mkdir(`${images}tutorials`, { recursive: true });

for (const [source, name, crf] of [
	['pmsl1tHBnpSl79LDhU4ILYgiuVQ.gif', 'fortune-cat', '23'],
	['DDl0KNXbAnRrmhYEZ1XM5mJvy40.gif', 'wire-transmission', '26'],
]) {
	const input = `${images}${source}`;
	const output = `${images}tutorials/${name}`;
	execFileSync('ffmpeg', [
		'-v', 'error', '-y', '-i', input, '-an', '-c:v', 'libx264',
		'-crf', crf, '-preset', 'slow', '-pix_fmt', 'yuv420p',
		'-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2', '-fps_mode', 'vfr',
		'-movflags', '+faststart', `${output}.mp4`,
	], { stdio: 'inherit' });
	await sharp(input).webp({ quality: 85 }).toFile(`${output}.webp`);
}
