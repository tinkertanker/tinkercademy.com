#!/usr/bin/env node
/* Fails if any page in dist/ links to an internal path that neither exists
   in the build nor matches a public/_redirects rule. Run after `pnpm build`. */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const SITE_HOSTS = new Set(['tinkercademy.com', 'www.tinkercademy.com']);

const redirects = new Map(
	readFileSync('public/_redirects', 'utf8')
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line && !line.startsWith('#'))
		.map((line) => line.split(/\s+/))
		.map(([from, to]) => [from, to]),
);

function* htmlFiles(dir) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* htmlFiles(path);
		else if (name.endsWith('.html')) yield path;
	}
}

function existsInBuild(pathname) {
	const decoded = decodeURIComponent(pathname);
	const base = join(DIST, decoded);
	return (
		existsSync(base) && statSync(base).isFile()
	) || existsSync(join(base, 'index.html')) || existsSync(`${base.replace(/\/$/, '')}.html`);
}

function resolves(pathname) {
	if (existsInBuild(pathname)) return true;
	const target = redirects.get(pathname) ?? redirects.get(pathname.replace(/\/$/, ''));
	return target !== undefined && (target.startsWith('http') || existsInBuild(target.split(/[?#]/)[0]));
}

const broken = new Map();
for (const file of htmlFiles(DIST)) {
	const html = readFileSync(file, 'utf8');
	for (const [, raw] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
		let url;
		try {
			url = new URL(raw.replaceAll('&amp;', '&'), 'https://tinkercademy.com/');
		} catch {
			continue;
		}
		if (!SITE_HOSTS.has(url.hostname) || url.pathname === '/') continue;
		if (!resolves(url.pathname)) {
			const pages = broken.get(url.pathname) ?? new Set();
			pages.add(`/${relative(DIST, file)}`);
			broken.set(url.pathname, pages);
		}
	}
}

for (const [from, to] of redirects) {
	if (!to.startsWith('http') && !existsInBuild(to.split(/[?#]/)[0])) {
		broken.set(`${to} (redirect target of ${from})`, new Set(['public/_redirects']));
	}
}

if (broken.size === 0) {
	console.log('No broken internal links.');
} else {
	for (const [path, pages] of broken) {
		console.log(`${path}\n  linked from ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ` and ${pages.size - 3} more` : ''}`);
	}
	console.log(`\n${broken.size} broken internal link(s).`);
	process.exit(1);
}
