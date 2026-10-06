export const siteConfig = {
	name: "Dmitry",
	locales: ["en", "ru"],
	defaultLocale: "en",
	localeCookie: "portfolio-locale",
	github: "https://github.com/Dmitrii-front",
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];

export const localeDetails = {
	en: { chooseLabel: "Choose English", openGraph: "en_US" },
	ru: { chooseLabel: "Выбрать русский", openGraph: "ru_RU" },
} satisfies Record<SiteLocale, { chooseLabel: string; openGraph: string }>;

export function isSiteLocale(value: string): value is SiteLocale {
	return siteConfig.locales.some((locale) => locale === value);
}
