import manifest from '../generated/banner-assets.json';

export type BannerAsset = {
	background: string;
	foreground: string;
	backgroundWidth: number;
	backgroundHeight: number;
	foregroundWidth: number;
	foregroundHeight: number;
	stamp?: string;
	stampWidth?: number;
	stampHeight?: number;
};

export function getBannerAsset(src: string | null | undefined): BannerAsset | null {
	if (!src) return null;
	return (manifest.images as Record<string, BannerAsset>)[src] ?? null;
}
