export type OpenSourceTool = {
	name: string;
	tagline: string;
	description: string;
	handyFor: string;
	/** Card thumbnail. Omit to render a terminal mock from `terminal` instead. */
	image?: string;
	/** Lines for the terminal mock when there's no screenshot. */
	terminal?: string[];
	/** Three parallel tags, same axes on every card:
	 *   platform  — what kind of thing it is (featured/accent tag)
	 *   builtWith — one headline language or framework
	 *   access    — how you run it: Hosted | Download | Self-host */
	platform: string;
	builtWith: string;
	access: 'Hosted' | 'Download' | 'Self-host' | 'Import';
	repoUrl: string;
	/** The big button. For self-host tools this is just the repo. */
	primaryLabel: string;
	primaryHref: string;
};

/**
 * Ordered catalogue used by both the full Open Source page and its Showcase preview.
 * The first four entries are featured on /showcase/.
 */
export const openSourceTools: OpenSourceTool[] = [
	{
		name: 'micro:bit MakeCode extensions',
		tagline: 'A decade of open-source blocks for the BBC micro:bit.',
		description:
			"We've maintained MakeCode extensions for the micro:bit community since 2017. Our flagship, the Tinker Kit, is featured on microbit.org; pxt-oled-ssd1306 is one of the most-used OLED drivers around; and we co-maintain kits like the IoT Environment Kit with our partners at ElecFreaks. Twenty-odd extensions, all free to drop into any MakeCode project.",
		handyFor: 'Teachers and makers building micro:bit hardware projects.',
		image: '/images/open-source/pxt-microbit.jpg',
		platform: 'MakeCode',
		builtWith: 'TypeScript',
		access: 'Import',
		repoUrl: 'https://github.com/orgs/tinkertanker/repositories?q=pxt',
		primaryLabel: 'Browse the extensions',
		primaryHref: 'https://github.com/orgs/tinkertanker/repositories?q=pxt',
	},
	{
		name: 'Classroom Widgets',
		tagline: 'An interactive board of classroom widgets, with students joining live.',
		description:
			'Drag timers, polls, randomisers, Q&A, traffic lights and a dozen more widgets onto an infinite board. Students join from their own devices with a short code, so votes, submissions and live feedback update in real time. Dark mode, autosave and voice commands are built in.',
		handyFor: 'Teachers and trainers running live, in-room lessons.',
		image: '/images/open-source/classroom-widgets.jpg',
		platform: 'Web',
		builtWith: 'React',
		access: 'Hosted',
		repoUrl: 'https://github.com/tinkertanker/classroom-widgets',
		primaryLabel: 'Open widgets.tk.sg',
		primaryHref: 'https://widgets.tk.sg',
	},
	{
		name: 'Vibbit',
		tagline: 'Vibe-code your micro:bit: describe it in English, get working MakeCode.',
		description:
			'Bolts an AI assistant onto Microsoft MakeCode for the BBC micro:bit. Describe what you want and Vibbit generates blocks that actually compile, validated against real micro:bit APIs, with revert and error-aware fixes. Students bring their own API key, or a class points at one school-hosted backend.',
		handyFor: 'CS and STEM teachers running micro:bit lessons, and their students.',
		image: '/images/open-source/vibbit.jpg',
		platform: 'MakeCode',
		builtWith: 'JavaScript',
		access: 'Download',
		repoUrl: 'https://github.com/tinkertanker/vibbit',
		primaryLabel: 'Get Vibbit',
		primaryHref: 'https://vibbit.tk.sg',
	},
	{
		name: 'Bamboobot',
		tagline: 'Turn a spreadsheet and a background image into hundreds of certificates.',
		description:
			'Upload a certificate background, drag text fields exactly where you want them, paste in your recipient list, and generate one polished PDF per row. It handles long lists, rich formatting and font control, and can even email each certificate out via Resend or SES.',
		handyFor: 'Event organisers, course and workshop runners, and schools.',
		image: '/images/open-source/bamboobot.jpg',
		platform: 'Web',
		builtWith: 'Next.js',
		access: 'Hosted',
		repoUrl: 'https://github.com/tinkertanker/bamboobot-cert-generator',
		primaryLabel: 'Open bamboobot.tk.sg',
		primaryHref: 'https://bamboobot.tk.sg',
	},
	{
		name: 'JustNow',
		tagline: 'You just closed that window. Now get it back.',
		description:
			'A privacy-first macOS menu-bar app that keeps a short, local history of your screen. Hit a hotkey to scrub back to something you just saw, then drag over any frame to OCR-copy the text (a link, an error message, a 2FA code). Everything stays on your Mac: no cloud, no subscription.',
		handyFor: 'Mac power users and developers who lose context fast.',
		image: '/images/open-source/justnow.jpg',
		platform: 'macOS',
		builtWith: 'Swift',
		access: 'Download',
		repoUrl: 'https://github.com/yjsoon/justnow',
		primaryLabel: 'Download for macOS',
		primaryHref: 'https://justnow.tk.sg',
	},
	{
		name: 'Points Accelerator',
		tagline: 'A group-first points economy for class communities on Discord.',
		description:
			'Tracks shared group points and personal currency side by side, with a configurable per-role reward matrix, a custom shop, wallet transfers, and a submission workflow where approved student work automatically awards points. Ships with a Discord-login admin dashboard.',
		handyFor: 'Instructors gamifying a Discord-based cohort.',
		image: '/images/open-source/points-accelerator.jpg',
		platform: 'Discord',
		builtWith: 'TypeScript',
		access: 'Self-host',
		repoUrl: 'https://github.com/tinkertanker/points-accelerator',
		primaryLabel: 'View on GitHub',
		primaryHref: 'https://github.com/tinkertanker/points-accelerator',
	},
	{
		name: 'Discord Drive Uploader',
		tagline: 'Send photos and videos from Discord straight into Google Drive.',
		description:
			'Watches selected Discord channels and automatically uploads their image and video attachments into mapped Google Drive folders. Files are organised into dated folders and named with the sender, time and message, while a browser-based setup flow handles Google sign-in, folder picking and channel mapping.',
		handyFor: 'Schools, programmes and communities collecting event photos in Discord.',
		image: '/images/open-source/discord-drive-uploader.jpg?v=1',
		platform: 'Discord',
		builtWith: 'Node.js',
		access: 'Self-host',
		repoUrl: 'https://github.com/tinkertanker/discord-drive-uploader',
		primaryLabel: 'View on GitHub',
		primaryHref: 'https://github.com/tinkertanker/discord-drive-uploader',
	},
	{
		name: 'short.io Hoster',
		tagline: 'A password-protected front end for branded short links and QR codes.',
		description:
			'Wraps the short.io API behind one shared password so your whole team can mint branded short links without ever handing out the API key. Custom slugs, auto-generated QR codes (downloadable as PNG or PPTX), and a searchable history come built in.',
		handyFor: 'Small teams and trainers sharing one short.io account.',
		terminal: [
			'$ npm install',
			'$ netlify deploy --prod',
			'',
			'  set PASSWORD, SHORT_IO_API_KEY, SHORT_DOMAIN',
			'  ✓ branded short links, live',
		],
		platform: 'Web',
		builtWith: 'Node.js',
		access: 'Self-host',
		repoUrl: 'https://github.com/tinkertanker/short-io-hoster',
		primaryLabel: 'View on GitHub',
		primaryHref: 'https://github.com/tinkertanker/short-io-hoster',
	},
	{
		name: 'Google Group Maker',
		tagline: 'Create and manage Google Workspace groups without the Admin console.',
		description:
			'A small CLI and matching web app for creating, renaming, deleting and managing membership of Google Groups through the Admin SDK. Spin up a fresh mailing list per cohort in a single command, or hand the web UI to staff behind Google sign-in.',
		handyFor: 'Workspace admins and ops teams who make a lot of groups.',
		terminal: [
			'$ ./groupmaker.py create cohort-2026 trainer@example.com',
			'',
			'  ✓ created cohort-2026@your-domain.com',
			'  + trainer@example.com (owner)',
		],
		platform: 'CLI',
		builtWith: 'Python',
		access: 'Self-host',
		repoUrl: 'https://github.com/tinkertanker/google-group-maker',
		primaryLabel: 'View on GitHub',
		primaryHref: 'https://github.com/tinkertanker/google-group-maker',
	},
];
