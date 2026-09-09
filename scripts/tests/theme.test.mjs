import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

import { themeScript } from '../../src/scripts/theme-inline.js';

function runTheme({ saved = null, systemDark = false, storageThrows = false, loading = false } = {}) {
	const rootAttributes = new Map();
	const windowListeners = new Map();
	const documentListeners = new Map();
	const mediaListeners = new Set();
	const buttonListeners = new Map();
	const buttonAttributes = new Map();
	const media = {
		matches: systemDark,
		addEventListener(type, listener) {
			if (type === 'change') mediaListeners.add(listener);
		},
	};
	const storage = {
		value: saved,
		getItem() {
			if (storageThrows) throw new Error('blocked');
			return this.value;
		},
		setItem(_key, value) {
			if (storageThrows) throw new Error('blocked');
			this.value = value;
		},
	};
	const button = {
		setAttribute(name, value) { buttonAttributes.set(name, value); },
		addEventListener(type, listener) { buttonListeners.set(type, listener); },
	};
	const documentElement = {
		setAttribute(name, value) { rootAttributes.set(name, value); },
		removeAttribute(name) { rootAttributes.delete(name); },
	};
	const document = {
		readyState: loading ? 'loading' : 'complete',
		documentElement,
		addEventListener(type, listener) { documentListeners.set(type, listener); },
		querySelector(selector) { return selector === '[data-theme-toggle]' ? button : null; },
	};
	const window = {
		localStorage: storage,
		matchMedia() { return media; },
		addEventListener(type, listener) { windowListeners.set(type, listener); },
	};

	vm.runInNewContext(themeScript, { document, window });

	return {
		button,
		buttonAttributes,
		rootAttributes,
		storage,
		click: () => buttonListeners.get('click')(),
		ready: () => documentListeners.get('DOMContentLoaded')(),
		setSystemDark(value) {
			media.matches = value;
			for (const listener of mediaListeners) listener({ matches: value });
		},
		storageEvent(key, newValue) {
			windowListeners.get('storage')({ key, newValue, storageArea: storage });
		},
	};
}

test('valid saved preference wins before controls are wired', () => {
	const theme = runTheme({ saved: 'dark', systemDark: false, loading: true });
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
	assert.equal(theme.rootAttributes.has('data-theme-ready'), false);
	assert.equal(theme.buttonAttributes.size, 0);
	theme.ready();
	assert.equal(theme.rootAttributes.get('data-theme-ready'), '');
	assert.equal(theme.buttonAttributes.get('aria-label'), 'Switch to light mode');
	assert.equal(theme.buttonAttributes.get('title'), 'Switch to light mode');
});

test('invalid preference follows live system changes until clicked', () => {
	const theme = runTheme({ saved: 'sepia', systemDark: false });
	assert.equal(theme.rootAttributes.get('data-theme'), 'light');
	assert.equal(theme.buttonAttributes.get('aria-label'), 'Switch to dark mode');

	theme.setSystemDark(true);
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
	assert.equal(theme.buttonAttributes.get('aria-label'), 'Switch to light mode');

	theme.click();
	assert.equal(theme.rootAttributes.get('data-theme'), 'light');
	assert.equal(theme.storage.value, 'light');
	theme.setSystemDark(false);
	theme.setSystemDark(true);
	assert.equal(theme.rootAttributes.get('data-theme'), 'light');
});

test('blocked storage still retains the explicit in-memory preference', () => {
	const theme = runTheme({ systemDark: false, storageThrows: true });
	theme.click();
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
	theme.setSystemDark(true);
	theme.setSystemDark(false);
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
});

test('same-origin updates sync and key removal or clear returns to system', () => {
	const theme = runTheme({ saved: 'light', systemDark: true });
	theme.storageEvent('tinkercademy-theme', 'dark');
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
	theme.storageEvent('tinkercademy-theme', 'light');
	assert.equal(theme.rootAttributes.get('data-theme'), 'light');
	theme.storageEvent('tinkercademy-theme', null);
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
	assert.equal(theme.buttonAttributes.get('aria-label'), 'Switch to light mode');
	theme.storageEvent('tinkercademy-theme', 'light');
	assert.equal(theme.rootAttributes.get('data-theme'), 'light');
	theme.storageEvent(null, null);
	assert.equal(theme.rootAttributes.get('data-theme'), 'dark');
});

test('foundation declares exact dark tokens, print reset, and an accessible toggle', async () => {
	const layout = await readFile(new URL('../../src/layouts/ContentLayout.astro', import.meta.url), 'utf8');
	const header = await readFile(new URL('../../src/components/SiteHeader.astro', import.meta.url), 'utf8');
	const tokens = {
		page: '#171719', surface: '#222225', 'surface-muted': '#1c1c1f', heading: '#f5f2ee',
		text: '#d8d5d1', muted: '#b6b1ac', border: '#3a3a40', 'control-border': '#85818b',
		link: '#ff8179', hover: '#303035', tint: '#3a2628',
	};
	for (const [name, value] of Object.entries(tokens)) {
		assert.match(layout, new RegExp(`--theme-${name}: ${value}`));
	}
	assert.match(layout, /@media print/);
	assert.match(header, /data-theme-toggle/);
	assert.match(header, /Switch to dark mode/);
});
