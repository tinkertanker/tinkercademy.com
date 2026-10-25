// Run against dev or built preview: node scripts/verify-testimonials.mjs [origin]
// Requires agent-browser, matching the other browser verification scripts.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const origin = process.argv[2] ?? 'http://localhost:4321';
const session = `quotes-${process.pid}`;
const testimonials = JSON.parse(readFileSync(new URL('../src/data/testimonials.json', import.meta.url), 'utf8'));
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

// CDP exposes the real accessibility tree and disables page scripts before reload.
async function cdp() {
	const endpoint = new URL(browser('get', 'cdp-url'));
	const targets = await (await fetch(`http://${endpoint.host}/json/list`)).json();
	const target = targets.find(entry => entry.type === 'page' && entry.url.startsWith(origin));
	assert.ok(target, 'current page CDP target');
	const socket = new WebSocket(target.webSocketDebuggerUrl);
	await new Promise((resolve, reject) => {
		socket.addEventListener('open', resolve, { once: true });
		socket.addEventListener('error', reject, { once: true });
	});
	let id = 0;
	const pending = new Map();
	socket.addEventListener('message', ({ data }) => {
		const message = JSON.parse(data);
		const callbacks = pending.get(message.id);
		if (!callbacks) return;
		pending.delete(message.id);
		if (message.error) callbacks.reject(new Error(JSON.stringify(message.error)));
		else callbacks.resolve(message.result);
	});
	return {
		close: () => socket.close(),
		send: (method, params = {}) => new Promise((resolve, reject) => {
			pending.set(++id, { resolve, reject });
			socket.send(JSON.stringify({ id, method, params }));
		}),
	};
}

let connection;
const expectAccessibleQuotes = async (all, expected) => {
	const { nodes } = await connection.send('Accessibility.getFullAXTree');
	const text = nodes.filter(node => !node.ignored && node.role?.value === 'StaticText').map(node => node.name?.value);
	for (const quote of all) {
		assert.equal(text.includes(quote), expected.includes(quote), `accessibility exposure: ${quote}`);
	}
};

try {
	for (const [slug, set] of [['agentic-workflows-for-businesses', 'adults'], ['code-for-fun-baseline-workshop', 'schools']]) {
		const allQuotes = testimonials[set].map(({ quote }) => quote);
		browser('open', new URL(`/programmes/${slug}/`, origin).href);
		connection ??= await cdp();
		evaluate('document.fonts.ready.then(() => true)');
		// Resize without reloading to catch stale, one-time height measurements.
		for (const width of [1280, 390, 720, 721, 1280]) {
			browser('set', 'viewport', String(width), '900', '2');
			evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
			const first = geometry();
			const pages = Number(first.status.split('/')[1]);
			assert.ok(pages > 1);
			assert.equal(first.visible.length, 2);
			await expectAccessibleQuotes(allQuotes, allQuotes.slice(0, 2));
			for (let page = 1; page <= pages; page++) {
				browser('click', '[aria-label="Next quotes"]');
				const current = geometry();
				const start = (page % pages) * 2;
				await expectAccessibleQuotes(allQuotes, allQuotes.slice(start, start + 2));
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
			console.log(`PASS ${slug} at ${width}px: stable height/footer, visible and accessible pairs, wraparound and keyboard`);
		}
		await connection.send('Emulation.setScriptExecutionDisabled', { value: true });
		browser('reload');
		evaluate('document.fonts.ready.then(() => true)');
		for (const width of [1280, 390]) {
			browser('set', 'viewport', String(width), '900', '2');
			assert.deepEqual(geometry().visible, allQuotes, 'without JavaScript every quote remains visible in order');
			assert.equal(evaluate(`document.querySelector('[data-quotes-controls]').checkVisibility({ visibilityProperty: true })`), false,
				'nonfunctional paging controls stay hidden without JavaScript');
			await expectAccessibleQuotes(allQuotes, allQuotes);
			console.log(`PASS ${slug} at ${width}px without JavaScript: all quotes visible and accessible, controls hidden`);
		}
		await connection.send('Emulation.setScriptExecutionDisabled', { value: false });
	}
} finally {
	connection?.close();
	browser('close');
}
