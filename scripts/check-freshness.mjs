#!/usr/bin/env node
/* Lists live programme pages whose updatedAt is missing or older than
   MAX_AGE_DAYS (default 90), so stale course pages get reviewed. */
import { readFileSync, readdirSync } from 'node:fs';

const MAX_AGE_DAYS = Number(process.env.MAX_AGE_DAYS ?? 90);
const DIR = 'src/content/programmes';
const now = Date.now();

const stale = readdirSync(DIR)
	.filter((name) => name.endsWith('.md'))
	.map((name) => ({ slug: name.replace(/\.md$/, ''), source: readFileSync(`${DIR}/${name}`, 'utf8') }))
	.filter(({ source }) => !/^archived:\s*true/m.test(source))
	.map(({ slug, source }) => {
		const updated = source.match(/^updatedAt:\s*(\S+)/m)?.[1];
		const ageDays = updated ? Math.floor((now - new Date(updated).getTime()) / 86_400_000) : Infinity;
		return { slug, updated: updated ?? 'never', ageDays };
	})
	.filter(({ ageDays }) => ageDays > MAX_AGE_DAYS)
	.sort((a, b) => b.ageDays - a.ageDays);

if (stale.length === 0) {
	console.log(`All live programmes were updated in the last ${MAX_AGE_DAYS} days.`);
} else {
	for (const { slug, updated, ageDays } of stale) {
		console.log(`${slug}: updated ${updated}${Number.isFinite(ageDays) ? ` (${ageDays} days ago)` : ''}`);
	}
	console.log(`\n${stale.length} programme page(s) due for review.`);
	process.exitCode = 1;
}
