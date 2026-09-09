import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

// Run against either the dev server or built preview. Uses the orb's installed
// agent-browser; CDP is only needed for print and script/storage failure states.
const origin = process.argv[2] ?? 'http://localhost:4321';
const session = `theme-${process.pid}`;
const key = 'tinkercademy-theme';
const browser = (...args) => execFileSync('agent-browser', ['--session', session, ...args], {
	encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
}).trim();
const evaluate = (source) => {
	const result = JSON.parse(browser('--json', 'eval', source));
	assert.equal(result.success, true, result.error);
	return result.data.result;
};
const visit = (path = '/') => browser('open', new URL(path, origin).href);
const theme = () => evaluate('document.documentElement.dataset.theme');
const expectTheme = (expected) => {
	settle();
	assert.equal(theme(), expected);
	assert.equal(evaluate('document.querySelector("[data-theme-toggle]").getAttribute("aria-label")'),
		`Switch to ${expected === 'dark' ? 'light' : 'dark'} mode`);
	assert.equal(evaluate('getComputedStyle(document.body).backgroundColor'),
		expected === 'dark' ? 'rgb(23, 23, 25)' : 'rgb(255, 255, 255)');
	assert.equal(evaluate('getComputedStyle(document.querySelector(".site-header")).backgroundColor'),
		expected === 'dark' ? 'rgb(34, 34, 37)' : 'rgb(255, 255, 255)');
};
const settle = () => evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
let connection;

async function cdp() {
	const endpoint = new URL(browser('get', 'cdp-url'));
	const targets = await (await fetch(`http://${endpoint.host}/json/list`)).json();
	const target = targets.find((entry) => entry.type === 'page' && entry.url.startsWith(origin));
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

try {
	visit();
	assert.equal(evaluate('document.querySelectorAll("[data-theme-toggle]").length'), 1,
		'one theme toggle in the shared header');
	browser('set', 'viewport', '1280', '900', '2');
	evaluate(`localStorage.removeItem('${key}')`);
	browser('set', 'media', 'light');
	browser('reload');
	expectTheme('light');
	browser('set', 'media', 'dark');
	settle();
	expectTheme('dark');
	assert.equal(evaluate(`localStorage.getItem('${key}')`), null, 'system following does not save an override');
	browser('click', '[data-theme-toggle]');
	expectTheme('light');
	assert.equal(evaluate(`localStorage.getItem('${key}')`), 'light');
	browser('set', 'media', 'light');
	browser('set', 'media', 'dark');
	expectTheme('light');
	browser('reload');
	expectTheme('light');
	visit('/courses-all/');
	expectTheme('light');
	browser('click', '[data-theme-toggle]');
	expectTheme('dark');
	browser('reload');
	expectTheme('dark');
	console.log('PASS system following, both toggles, explicit precedence, reload and navigation');

	// Real same-origin storage events, including clear() whose event key is null.
	const activeTab = () => JSON.parse(browser('--json', 'tab', 'list')).data.tabs.find(tab => tab.active).tabId;
	const firstTab = activeTab();
	browser('tab', 'new');
	visit('/blog/');
	const secondTab = activeTab();
	evaluate(`localStorage.setItem('${key}', 'light')`);
	browser('tab', firstTab);
	expectTheme('light');
	browser('tab', secondTab);
	evaluate(`localStorage.removeItem('${key}')`);
	browser('tab', firstTab);
	expectTheme('dark');
	browser('tab', secondTab);
	evaluate(`localStorage.setItem('${key}', 'light')`);
	browser('tab', firstTab);
	expectTheme('light');
	browser('tab', secondTab);
	evaluate('localStorage.clear()');
	browser('tab', firstTab);
	expectTheme('dark');
	browser('tab', secondTab);
	browser('tab', 'close');
	evaluate(`localStorage.setItem('${key}', 'invalid')`);
	browser('reload');
	expectTheme('dark');
	browser('set', 'media', 'light');
	settle();
	expectTheme('light');
	console.log('PASS cross-tab update/removal/clear and invalid preference');

	for (const route of ['/', '/blog/']) {
		visit(route);
		for (const width of [320, 375, 390, 809, 810, 980, 1280]) {
			browser('set', 'viewport', String(width), '844', '2');
			settle();
			const geometry = evaluate(`(() => {
				const visible = el => el && getComputedStyle(el).display !== 'none' && !el.hidden;
				const controls = [...document.querySelectorAll('[data-theme-toggle], .nav-toggle, .nav-search')]
					.filter(visible).map(el => {const r=el.getBoundingClientRect();return {name:el.className,x:r.x,right:r.right,width:r.width,height:r.height};});
				const brand=document.querySelector('.brand').getBoundingClientRect();
				return {controls,brandRight:brand.right,overflow:document.documentElement.scrollWidth>innerWidth};
			})()`);
			assert.equal(geometry.overflow, false, `${route} at ${width}px has no page overflow`);
			for (const control of geometry.controls) {
				assert.ok(control.width >= 44 && control.height >= 44,
					`${route} ${width}px ${control.name} target ${control.width}×${control.height}`);
				assert.ok(control.x >= geometry.brandRight && control.right <= width,
					`${route} ${width}px ${control.name} fits beside logo`);
			}
			for (let i = 1; i < geometry.controls.length; i++) {
				assert.ok(geometry.controls[i].x >= geometry.controls[i - 1].right,
					`${route} ${width}px controls do not overlap`);
			}
		}
	}
	console.log('PASS nonshrinking header controls at 320/375/390/809/810/980/1280px with/without search');

	visit();
	for (const width of [375, 1280]) {
		browser('set', 'viewport', String(width), '844', '2');
		for (const mode of ['light', 'dark']) {
			browser('set', 'media', mode);
			settle();
			const row = evaluate(`(() => {
				const panel = document.querySelector('.home-educators__logos');
				return { background: getComputedStyle(panel).backgroundColor,
					logos: [...panel.querySelectorAll('img')].map(el => ({name: el.alt, height: el.getBoundingClientRect().height, slotHeight: el.offsetHeight,
						background: getComputedStyle(el).backgroundColor})), overflow: document.documentElement.scrollWidth > innerWidth };
			})()`);
			assert.equal(row.background, mode === 'dark' ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, 0)');
			assert.equal(row.logos.length, 10);
			for (const logo of row.logos) {
				const scale = { 'Stanford University': 1.1, 'Wharton School': 1.1, MIT: 0.9 }[logo.name] ?? 1;
				assert.equal(logo.slotHeight, 48, `${logo.name}: equal-height layout slot`);
				assert.ok(Math.abs(logo.height - 48 * scale) < 0.01, `${logo.name}: requested optical scale`);
				assert.equal(logo.background, 'rgba(0, 0, 0, 0)', `${logo.name}: no individual backplate`);
			}
			assert.equal(row.overflow, false, `${mode} ${width}px: logo panel stays within page`);
		}
	}
	console.log('PASS shared institution logo panel, equal layout slots and optical sizing at desktop and mobile widths');

	visit('/programmes/professional-certificate-in-mobile-application-development/');
	browser('set', 'viewport', '375', '844', '2');
	for (const mode of ['light', 'dark']) {
		browser('set', 'media', mode);
		settle();
		assert.equal(evaluate('document.documentElement.scrollWidth'), 375, `${mode}: long course URL wraps`);
	}
	assert.equal(evaluate('document.querySelector(".prog-body a[href*=fee-table]").textContent'),
		'https://academy.smu.edu.sg/courses/professional-certificate-mobile-application-development-pcmob#fee-table');
	console.log('PASS long programme URL retains its text without 375px page overflow in either theme');

	visit();
	connection = await cdp();
	await connection.send('Page.enable');
	evaluate(`localStorage.setItem('${key}', 'dark')`);
	browser('reload');
	expectTheme('dark');
	await connection.send('Emulation.setEmulatedMedia', { media: 'print' });
	const printed = evaluate(`(() => {
		const logos=[...document.querySelectorAll('.brand img')].filter(el=>getComputedStyle(el).display!=='none');
		return {background:getComputedStyle(document.body).backgroundColor,scheme:getComputedStyle(document.documentElement).colorScheme,logos:logos.map(el=>el.currentSrc||el.src)};
	})()`);
	assert.equal(printed.background, 'rgb(255, 255, 255)');
	assert.equal(printed.scheme, 'light');
	assert.ok(printed.logos.length > 0 && printed.logos.every(src => !src.includes('tinkercademy-white')),
		'print shows black wordmark, not white asset');
	await connection.send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
	evaluate('localStorage.clear()');
	await connection.send('Emulation.setScriptExecutionDisabled', { value: true });
	browser('reload');
	assert.equal(evaluate('document.documentElement.hasAttribute("data-theme")'), false);
	assert.equal(evaluate('getComputedStyle(document.body).backgroundColor'), 'rgb(23, 23, 25)');
	assert.equal(evaluate('document.querySelector("[data-theme-toggle]").getBoundingClientRect().width'), 0,
		'nonfunctional no-JS toggle hidden');
	await connection.send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-color-scheme', value: 'light' }] });
	assert.equal(evaluate('getComputedStyle(document.body).backgroundColor'), 'rgb(255, 255, 255)');
	await connection.send('Emulation.setScriptExecutionDisabled', { value: false });
	console.log('PASS print light/black wordmark and no-JS system colours');

	const { identifier } = await connection.send('Page.addScriptToEvaluateOnNewDocument', {
		source: `Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });`,
	});
	browser('reload');
	assert.equal(evaluate('(() => { try { return !!localStorage; } catch (error) { return error.name; } })()'),
		'SecurityError', 'storage failure injection is active');
	expectTheme('light');
	browser('click', '[data-theme-toggle]');
	expectTheme('dark');
	await connection.send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
	await connection.send('Emulation.setEmulatedMedia', { media: 'screen', features: [{ name: 'prefers-color-scheme', value: 'light' }] });
	settle();
	expectTheme('dark');
	await connection.send('Page.removeScriptToEvaluateOnNewDocument', { identifier });
	console.log('PASS blocked storage still toggles and retains in-memory explicit preference');
	console.log(`Dark-mode browser verification passed: ${origin}`);
} finally {
	connection?.close();
	browser('close');
}
