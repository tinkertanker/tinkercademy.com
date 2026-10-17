// Run against dev or built preview: node scripts/verify-seo-ui.mjs [origin]
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const origin = process.argv[2] ?? 'http://localhost:4321';
const session = `seo-${process.pid}`;
const browser = (...args) => execFileSync('agent-browser', ['--session', session, ...args], { encoding: 'utf8' }).trim();
const evaluate = (source) => {
	const response = JSON.parse(browser('--json', 'eval', source));
	assert.ok(response.success, response.error);
	return response.data.result;
};

try {
	browser('open', origin);
	browser('set', 'viewport', '1280', '900', '2');
	for (const color of ['light', 'dark']) {
		browser('set', 'media', color);
		for (const route of [
			'/tutorials/micropythoncomponents/',
			'/tutorials/micropython/',
			'/blog/2021/curriculum-planning-at-tinkercademy/',
			'/articles/space-launch-system-strategies-corporate-learning/',
			'/programmes/imda-phaser-2025/',
		]) {
			browser('open', new URL(route, origin).href);
			const comparisons = evaluate(`(() => {
				const properties = ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'lineHeight', 'color', 'marginTop', 'marginBottom'];
				const style = node => Object.fromEntries(properties.map(key => [key, getComputedStyle(node)[key]]));
				return [...document.querySelectorAll('[data-heading-style]')].map(heading => {
					const actual = style(heading);
					const original = document.createElement(heading.dataset.headingStyle);
					for (const attr of heading.attributes) if (attr.name !== 'data-heading-style') original.setAttribute(attr.name, attr.value);
					original.innerHTML = heading.innerHTML;
					heading.replaceWith(original);
					const expected = style(original);
					original.replaceWith(heading);
					return { text: heading.textContent.trim(), actual, expected };
				});
			})()`);
			assert.ok(comparisons.length, `${route}: headings to compare`);
			if (route.includes('micropythoncomponents')) {
				for (const title of ['Pin Layout', 'LED: Pin0']) assert.ok(comparisons.some(item => item.text === title));
			}
			for (const { text, actual, expected } of comparisons) assert.deepEqual(actual, expected, `${color} ${route} ${text}`);
		}
	}
	for (const slug of ['making-a-waving-fortune-cat', 'micro-bit-wire-transmission']) {
		browser('set', 'media', 'light', 'reduced-motion');
		browser('open', new URL(`/tutorials/${slug}/`, origin).href);
		assert.equal(evaluate('document.querySelector("video").paused'), true, `${slug}: reduced motion starts paused`);
		assert.equal(evaluate('document.querySelector("video").currentTime'), 0);
		browser('set', 'media', 'light');
		browser('wait', '--fn', 'document.querySelector("video").currentTime > 0');
		assert.equal(evaluate('document.querySelector("video").paused'), false, `${slug}: motion can play`);
		assert.equal(evaluate('document.querySelector("video").error'), null);
	}
	console.log('PASS: source heading typography in light/dark mode; reduced-motion and normal video playback.');
} finally {
	browser('close');
}
