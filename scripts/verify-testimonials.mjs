// Run against dev or built preview: node scripts/verify-testimonials.mjs [origin]
// Requires agent-browser, matching the other browser verification scripts.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const origin = process.argv[2] ?? 'http://localhost:4321';
const session = `quotes-${process.pid}`;
const browser = (...args) => execFileSync('agent-browser', ['--session', session, ...args], {
	encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
}).trim();
const evaluate = (source) => {
	const response = JSON.parse(browser('--json', 'eval', source));
	assert.ok(response.success, response.error);
	return response.data.result;
};
const geometry = () => evaluate(`(() => {
	const root = document.querySelector('[data-quotes]');
	return {
		height: root.getBoundingClientRect().height,
		footerTop: document.querySelector('footer').getBoundingClientRect().top + scrollY,
		visible: [...root.querySelectorAll('blockquote')].filter(el => el.checkVisibility({ visibilityProperty: true })).map(el => el.textContent.trim()),
		status: root.querySelector('[aria-live]').textContent.trim(),
	};
})()`);

try {
	for (const slug of ['agentic-workflows-for-businesses', 'code-for-fun-baseline-workshop']) {
		browser('open', new URL(`/programmes/${slug}/`, origin).href);
		evaluate('document.fonts.ready.then(() => true)');
		// Resize without reloading to catch stale, one-time height measurements.
		for (const width of [1280, 390, 720, 721, 1280]) {
			browser('set', 'viewport', String(width), '900', '2');
			evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
			const first = geometry();
			const pages = Number(first.status.split('/')[1]);
			assert.ok(pages > 1);
			assert.equal(first.visible.length, 2);
			for (let page = 1; page <= pages; page++) {
				browser('click', '[aria-label="Next quotes"]');
				const current = geometry();
				assert.equal(current.status, `${page % pages + 1} / ${pages}`);
				assert.equal(current.visible.length, 2, 'only the active pair is visible');
				assert.equal(current.height, first.height, `${slug} at ${width}px: carousel height must not change`);
				assert.ok(Math.abs(current.footerTop - first.footerTop) < 1, 'footer must not move');
				if (page < pages) assert.notDeepEqual(current.visible, first.visible);
				else assert.deepEqual(current.visible, first.visible, 'next wraps to the first pair');
			}
			browser('click', '[aria-label="Previous quotes"]');
			assert.equal(geometry().status, `${pages} / ${pages}`, 'previous wraps to the last pair');
			browser('press', 'Enter');
			assert.equal(geometry().status, `${pages - 1} / ${pages}`, 'keyboard activation pages backward');
			browser('click', '[aria-label="Next quotes"]');
			browser('click', '[aria-label="Next quotes"]');
			console.log(`PASS ${slug} at ${width}px: stable height/footer, visible pairs, wraparound and keyboard`);
		}
	}
} finally {
	browser('close');
}
