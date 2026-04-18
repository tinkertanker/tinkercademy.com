import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'public/images';
const MIN_BYTES = 150 * 1024;

const files = readdirSync(DIR)
	.map((name) => join(DIR, name))
	.filter((p) => {
		try {
			if (!statSync(p).isFile()) return false;
		} catch {
			return false;
		}
		const lower = p.toLowerCase();
		if (!/\.(png|jpe?g)$/.test(lower)) return false;
		return statSync(p).size >= MIN_BYTES;
	});

console.log(`Candidates: ${files.length}`);

let totalBefore = 0;
let totalAfter = 0;
let improved = 0;
let skipped = 0;

for (const file of files) {
	const lower = file.toLowerCase();
	const isPng = lower.endsWith('.png');
	const beforeSize = statSync(file).size;
	totalBefore += beforeSize;
	const tmp = `${file}.__tmp__`;
	try {
		if (isPng) {
			await sharp(file, { failOn: 'none' })
				.png({ compressionLevel: 9, palette: true, quality: 80, effort: 7 })
				.toFile(tmp);
		} else {
			await sharp(file, { failOn: 'none' })
				.jpeg({ quality: 82, mozjpeg: true, progressive: true })
				.toFile(tmp);
		}
		const afterSize = statSync(tmp).size;
		if (afterSize < beforeSize) {
			renameSync(tmp, file);
			totalAfter += afterSize;
			improved += 1;
			console.log(
				`  ${(beforeSize / 1048576).toFixed(2)}→${(afterSize / 1048576).toFixed(
					2
				)} MB  ${(((beforeSize - afterSize) * 100) / beforeSize).toFixed(0)}%  ${file}`
			);
		} else {
			unlinkSync(tmp);
			totalAfter += beforeSize;
			skipped += 1;
		}
	} catch (err) {
		try {
			unlinkSync(tmp);
		} catch {}
		totalAfter += beforeSize;
		skipped += 1;
		console.error(`  ERR  ${file}: ${err.message}`);
	}
}

console.log(
	`\nImproved ${improved}, skipped ${skipped}. Total ${(totalBefore / 1048576).toFixed(
		1
	)} → ${(totalAfter / 1048576).toFixed(1)} MB (saved ${(
		(totalBefore - totalAfter) /
		1048576
	).toFixed(1)} MB)`
);
