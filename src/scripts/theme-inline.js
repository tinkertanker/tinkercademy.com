export const themeScript = String.raw`(() => {
	const key = 'tinkercademy-theme';
	const root = document.documentElement;
	const system = window.matchMedia('(prefers-color-scheme: dark)');
	let preference = null;

	try {
		const saved = window.localStorage.getItem(key);
		if (saved === 'light' || saved === 'dark') preference = saved;
	} catch {}

	const applyPreference = () => {
		root.setAttribute('data-theme', preference || (system.matches ? 'dark' : 'light'));
	};

	const resolvedTheme = () => preference || (system.matches ? 'dark' : 'light');
	applyPreference();

	const wireToggle = () => {
		const button = document.querySelector('[data-theme-toggle]');
		if (!button) return;

		const updateButton = () => {
			const resolved = resolvedTheme();
			const label = resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
			button.setAttribute('aria-label', label);
			button.setAttribute('title', label);
			button.setAttribute('data-theme-resolved', resolved);
		};

		button.addEventListener('click', () => {
			preference = resolvedTheme() === 'dark' ? 'light' : 'dark';
			applyPreference();
			updateButton();
			try { window.localStorage.setItem(key, preference); } catch {}
		});

		system.addEventListener('change', () => {
			if (!preference) applyPreference();
			updateButton();
		});

		window.addEventListener('storage', (event) => {
			if (event.key !== key && event.key !== null) return;
			preference = event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null;
			applyPreference();
			updateButton();
		});

		updateButton();
		root.setAttribute('data-theme-ready', '');
	};

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wireToggle, { once: true });
	else wireToggle();
})();`;
