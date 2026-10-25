import type { APIRoute } from 'astro';
import { getProgrammesForSurface } from '../lib/programmes.ts';

const SITE_BASE = 'https://tinkercademy.com';

const pageLinks = (pages: [string, string, string][]) =>
	pages.map(([label, path, note]) => `- [${label}](${SITE_BASE}${path}): ${note}`).join('\n');

export const GET: APIRoute = async () => {
	const [schools, professionals] = await Promise.all([
		getProgrammesForSurface('schools'),
		getProgrammesForSurface('professionals'),
	]);
	const courseLinks = (programmes: typeof schools) =>
		programmes
			.map((programme) => {
				const duration = programme.duration ? ` (${programme.duration})` : '';
				return `- [${programme.title}](${SITE_BASE}/programmes/${programme.slug}/index.md)${duration}: ${programme.cardBlurb}`;
			})
			.join('\n');

	const body = `# Tinkercademy

> Singapore-based coders and makers teaching coding and digital making to schools, companies, and individuals. Courses in micro:bit, Swift, Python, and AI.

Programme links below provide Markdown versions of the website's course content, with links back to the original pages.

## Company and programmes

${pageLinks([
	['Home', '/', 'Teaching areas and featured programmes.'],
	['About us', '/about-us/', 'Company background and team.'],
	['All courses', '/courses-all/', 'Programme catalogue with audience, domain, and platform filters.'],
	['Schools', '/schools/', 'Programmes for schools.'],
	['Professionals', '/professionals/', 'Training for companies and professionals.'],
	['Individuals', '/individuals/', 'Learning opportunities for individuals.'],
	['Contact', '/contact-us/', 'Programme enquiries and contact details.'],
])}

## Courses for schools

${courseLinks(schools)}

## Courses for companies and professionals

${courseLinks(professionals)}

## Projects and learning resources

${pageLinks([
	['Showcase', '/showcase/', 'Projects and student work.'],
	['micro:bit', '/microbit/', 'micro:bit resources and tutorials.'],
	['Build Log', '/blog/', 'Stories about teaching, learning, and building.'],
	['Open source', '/open-source/', 'Open-source projects.'],
])}
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
