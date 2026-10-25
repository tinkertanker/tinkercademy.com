import type { APIRoute, InferGetStaticPropsType } from 'astro';
import { load } from 'cheerio';
import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';
import { getAllProgrammes } from '../../../lib/programmes.ts';

export async function getStaticPaths() {
	return (await getAllProgrammes()).map((programme) => ({
		params: { slug: programme.slug },
		props: { programme },
	}));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute<Props> = ({ props: { programme } }) => {
	const canonical = `https://tinkercademy.com/programmes/${programme.slug}/`;
	const { fit, publishedAt, updatedAt } = programme.entry.data;
	const html = programme.entry.rendered?.html;
	if (!html) throw new Error(`Missing rendered content for programme: ${programme.slug}`);

	// Convert Astro's rendered body, including legacy embedded HTML, without
	// navigation or forms. Absolute URLs also work outside the original page.
	const $ = load(html, {}, false);
	$('a[href], img[src]').each((_, element) => {
		const attribute = element.tagName === 'a' ? 'href' : 'src';
		$(element).attr(attribute, new URL($(element).attr(attribute)!, canonical).href);
	});
	const converter = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
	converter.use(tables);
	// Imported tables wrap cell text in paragraphs. GFM requires each row
	// on one line, with literal pipes escaped rather than treated as columns.
	converter.addRule('tableCell', {
		filter: ['th', 'td'],
		replacement: (content, node) => {
			const prefix = node.previousElementSibling ? ' ' : '| ';
			return `${prefix}${content.trim().replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|')} |`;
		},
	});

	const facts = [
		`- Audiences: ${programme.audiences.map((item) => item.label).join(', ')}`,
		programme.duration && `- Duration: ${programme.duration}`,
		`- Domains: ${programme.domains.map((item) => item.label).join(', ')}`,
		programme.platforms.length && `- Platforms: ${programme.platforms.map((item) => item.label).join(', ')}`,
		publishedAt && `- Published: ${publishedAt.toISOString().slice(0, 10)}`,
		updatedAt && `- Updated: ${updatedAt.toISOString().slice(0, 10)}`,
	].filter(Boolean).join('\n');
	const body = [
		`# ${programme.title}`,
		`> ${programme.cardBlurb}`,
		`[View programme page](${canonical})`,
		facts,
		fit && `## ${fit.question}\n\n${fit.answer}`,
		converter.turndown($.html()),
		`## Enquiries\n\n[${programme.signUpLabel ?? 'Enquire now'}](${canonical}#enquire)`,
		programme.primaryCta && `[${programme.primaryCta.label}](${programme.primaryCta.url})`,
	].filter(Boolean).join('\n\n');

	return new Response(`${body}\n`, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			Link: `<${canonical}>; rel="canonical", <https://tinkercademy.com/llms.txt>; rel="describedby"`,
		},
	});
};
