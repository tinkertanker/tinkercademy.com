import type { APIRoute } from 'astro';
import { getSearchableProgrammes } from '../lib/programmes.ts';

export const GET: APIRoute = async () => {
	const payload = await getSearchableProgrammes();
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
