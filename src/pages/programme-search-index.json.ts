import type { APIRoute } from 'astro';
import { getSearchableProgrammes } from '../lib/data.js';

export const GET: APIRoute = () => {
	const payload = getSearchableProgrammes();
	return new Response(JSON.stringify(payload), {
		status: 200,
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
