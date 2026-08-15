import seriesData from '../data/pages/programme-series.json';

export type ProgrammeSeriesCourse = {
	slug: string;
	shortTitle: string;
};

export type ProgrammeSeries = {
	id: string;
	label: string;
	courses: ProgrammeSeriesCourse[];
};

export type ProgrammeSeriesMembership = {
	id: string;
	label: string;
	shortTitle: string;
	courses: ProgrammeSeriesCourse[];
};

const seriesList = seriesData as ProgrammeSeries[];

const membershipBySlug = new Map<string, ProgrammeSeriesMembership>();

for (const series of seriesList) {
	for (const course of series.courses) {
		membershipBySlug.set(course.slug, {
			id: series.id,
			label: series.label,
			shortTitle: course.shortTitle,
			courses: series.courses,
		});
	}
}

export function getSeriesMembership(slug: string) {
	return membershipBySlug.get(slug) ?? null;
}
