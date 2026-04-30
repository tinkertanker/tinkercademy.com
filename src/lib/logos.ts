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

const CORPORATE_CLIENT_ORDER = [
	'infocomm-media-development-authority',
	'singapore-business-federation',
	'cyber-security-agency',
	'dbs',
	'institute-of-singapore-chartered-accountants',
	'phillipcapital',
];

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
		.sort((a, b) => {
			const aIndex = a.id === undefined ? -1 : CORPORATE_CLIENT_ORDER.indexOf(a.id);
			const bIndex = b.id === undefined ? -1 : CORPORATE_CLIENT_ORDER.indexOf(b.id);
			if (aIndex === -1 && bIndex === -1) return 0;
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;
			return aIndex - bIndex;
		})
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
