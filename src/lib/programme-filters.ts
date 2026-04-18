export type ProgrammeFilterState = {
	audience: string | null;
	domain: string | null;
	platform: string | null;
};

type ProgrammeFilterArgs = {
	audience?: string | null;
	domain?: string | null;
	platform?: string | null;
};

export function createProgrammeFilterHref(
	filters: ProgrammeFilterArgs = {},
	basePath = '/courses-all',
) {
	const params = new URLSearchParams();

	if (filters.audience) params.set('audience', filters.audience);
	if (filters.domain) params.set('domain', filters.domain);
	if (filters.platform) params.set('platform', filters.platform);

	const query = params.toString();
	return query ? `${basePath}?${query}` : basePath;
}

export function serialiseProgrammeIds(ids: string[]) {
	return ids.filter(Boolean).join(' ');
}
