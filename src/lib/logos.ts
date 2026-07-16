export interface ExternalLogo {
	id?: string;
	label?: string;
	logo?: string;
	active?: boolean;
	partner?: boolean;
	type?: string;
}

export interface LogoItem {
	id?: string;
	label: string;
	src: string;
	type?: string;
}

const CORPORATE_CLIENT_IDS = new Set([
	'dbs',
	'infocomm-media-development-authority',
	'institute-of-singapore-chartered-accountants',
	'phillipcapital',
]);

function isRenderableLogo(logo: ExternalLogo) {
	return logo.active !== false && Boolean(logo.logo);
}

export function isPartnerLogo(logo: ExternalLogo) {
	return isRenderableLogo(logo) && (logo.partner === true || logo.type === 'Partner');
}

function toLogoItem(logo: ExternalLogo): LogoItem {
	return {
		id: logo.id,
		label: logo.label ?? '',
		src: logo.logo ?? '',
		type: logo.type,
	};
}

export function getPartnerLogoItems(logos: ExternalLogo[]) {
	return logos.filter(isPartnerLogo).map(toLogoItem);
}

export function getClientLogoItems(logos: ExternalLogo[]) {
	return logos.filter((logo) => isRenderableLogo(logo) && !isPartnerLogo(logo)).map(toLogoItem);
}

export function getCorporateClientLogoItems(logos: ExternalLogo[]) {
	return logos
		.filter(
			(logo) =>
				isRenderableLogo(logo) &&
				(logo.type === 'Corporate Client' ||
					(logo.id !== undefined && CORPORATE_CLIENT_IDS.has(logo.id))),
		)
		.sort((a, b) =>
			(a.label ?? '')
				.replace(/^the\s+/i, '')
				.localeCompare((b.label ?? '').replace(/^the\s+/i, ''), 'en-SG', {
					sensitivity: 'base',
				}),
		)
		.map(toLogoItem);
}

export function getSchoolClientLogoItems(logos: ExternalLogo[]) {
	return logos
		.filter(
			(logo) =>
				isRenderableLogo(logo) &&
				!isPartnerLogo(logo) &&
				logo.type === 'School Client' &&
				(logo.id === undefined || !CORPORATE_CLIENT_IDS.has(logo.id)),
		)
		.map(toLogoItem);
}
