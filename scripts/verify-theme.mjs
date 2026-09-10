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
		let lightTrackWidth;
		for (const mode of ['light', 'dark']) {
			browser('set', 'media', mode);
			settle();
			const row = evaluate(`(() => {
				const panel = document.querySelector('.home-educators__logos');
				return { background: getComputedStyle(panel).backgroundColor,
					width: panel.getBoundingClientRect().width, parentWidth: panel.parentElement.getBoundingClientRect().width,
					centreOffset: panel.getBoundingClientRect().left + panel.getBoundingClientRect().width / 2 - innerWidth / 2,
					logos: [...panel.querySelectorAll('img')].map(el => ({name: el.alt, height: el.getBoundingClientRect().height, slotHeight: el.offsetHeight,
						background: getComputedStyle(el).backgroundColor})), overflow: document.documentElement.scrollWidth > innerWidth };
			})()`);
			assert.equal(row.background, mode === 'dark' ? 'rgba(241, 240, 238, 0.91)' : 'rgba(0, 0, 0, 0)');
			assert.equal(row.logos.length, 10);
			assert.ok(Math.abs(row.centreOffset) < 1, 'qualifications panel stays centred');
			if (width === 1280) assert.ok(row.width < row.parentWidth - 100, 'qualifications panel fits content instead of stretching full width');
			for (const logo of row.logos) {
				const scale = { 'Stanford University': 1.1 * 1.1, 'Wharton School': 160 / 124 * 0.97, MIT: 0.9 * 0.9 }[logo.name] ?? 1;
				assert.equal(logo.slotHeight, 48, `${logo.name}: equal-height layout slot`);
				assert.ok(Math.abs(logo.height - 48 * scale) < 0.01, `${logo.name}: requested optical scale`);
				assert.equal(logo.background, 'rgba(0, 0, 0, 0)', `${logo.name}: no individual backplate`);
			}
			assert.equal(row.overflow, false, `${mode} ${width}px: logo panel stays within page`);
			const partners = evaluate(`(() => {
				const panel = document.querySelector('.home-partners__panel');
				const track = panel.querySelector('.home-partners__track');
				const links = [...track.children];
				return { background: getComputedStyle(panel).backgroundColor, width: track.getBoundingClientRect().width,
					repeat: links[10].getBoundingClientRect().left - links[0].getBoundingClientRect().left,
					individualBackplates: [...track.querySelectorAll('img')].some(el => getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)') };
			})()`);
			assert.equal(partners.background, mode === 'dark' ? 'rgba(241, 240, 238, 0.91)' : 'rgba(0, 0, 0, 0)');
			assert.equal(partners.individualBackplates, false);
			assert.ok(Math.abs(partners.repeat - partners.width / 2) < 0.1, 'marquee loop has two equal repeat widths');
			if (mode === 'light') lightTrackWidth = partners.width;
			else assert.equal(partners.width, lightTrackWidth, 'theme change does not shift the marquee by resizing its track');
		}
	}
	console.log('PASS shared logo panels, optical sizing and seamless theme-stable marquee geometry at desktop and mobile widths');

	for (const route of ['/', '/about-us/']) {
		visit(route);
		for (const width of [375, 1280]) {
			browser('set', 'viewport', String(width), '844', '2');
			for (const mode of ['light', 'dark']) {
				browser('set', 'media', mode);
				settle();
				const panels = evaluate(`([...document.querySelectorAll('.logo-panel')].map(panel => {
					const track = panel.querySelector('.home-partners__track, .about-logo-track');
					const items = track?.children;
					return { background: getComputedStyle(panel).backgroundColor, sheen: getComputedStyle(panel, '::before').content,
						glints: getComputedStyle(panel, '::after').content,
						height: panel.getBoundingClientRect().height,
						loopError: track ? Math.abs(items[items.length / 2].getBoundingClientRect().left - items[0].getBoundingClientRect().left - track.getBoundingClientRect().width / 2) : 0 };
				}))`);
				assert.equal(panels.length, 2);
				for (const panel of panels) {
					assert.equal(panel.background, mode === 'dark' ? 'rgba(241, 240, 238, 0.91)' : 'rgba(0, 0, 0, 0)');
					assert.equal(panel.sheen, mode === 'dark' ? '""' : 'none');
					assert.equal(panel.glints, mode === 'dark' ? '""' : 'none');
					assert.ok(panel.loopError < 0.1, `${route}: complete repeat spacing`);
				}
				if (route === '/about-us/') {
					for (const panel of panels) assert.equal(panel.height, mode === 'dark' ? 112 : 80);
					assert.equal(evaluate(`([...document.querySelectorAll('.about-clients__logo')].every(img => {
						const box = img.getBoundingClientRect();
						return Math.round(box.width * 100) / 100 <= 180 && Math.round(box.height * 100) / 100 <= 64;
					}))`), true, 'client logos stay within their optical size limits');
					assert.equal(evaluate(`([2, 3].every(i => document.querySelectorAll('.about-partners__logo')[i].getBoundingClientRect().width >= 150))`), true,
						'SMU and Apple wordmarks use wider space than the old discs');
					assert.equal(evaluate(`document.querySelector('img[src="/images/partners/dunman-secondary.png"]').naturalWidth`), 64,
						'Dunman uses the crest-only asset');
				}
				assert.equal(evaluate('document.documentElement.scrollWidth > innerWidth'), false);
			}
		}
		connection = await cdp();
		await connection.send('Emulation.setEmulatedMedia', { features: [
			{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: 'reduce' },
		] });
		settle();
		assert.equal(evaluate(`([...document.querySelectorAll('.logo-panel')].every(p =>
			['::before', '::after'].every(pseudo => getComputedStyle(p, pseudo).animationName === 'none' && getComputedStyle(p, pseudo).display === 'none')))`), true);
		await connection.send('Emulation.setEmulatedMedia', { media: 'print' });
		settle();
		assert.equal(evaluate(`([...document.querySelectorAll('.logo-panel')].every(p =>
			getComputedStyle(p).backgroundColor === 'rgba(0, 0, 0, 0)' && ['::before', '::after'].every(pseudo => getComputedStyle(p, pseudo).content === 'none')))`), true);
		await connection.send('Emulation.setEmulatedMedia', { media: '', features: [] });
		connection.close();
		connection = undefined;
	}
	console.log('PASS homepage/About glass panels, loop spacing, reduced motion and print fallback');

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
