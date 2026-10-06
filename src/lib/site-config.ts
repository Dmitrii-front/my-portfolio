export const siteConfig = {
	name: "Dmitry",
	locales: ["en", "ru"],
	defaultLocale: "en",
	localeCookie: "portfolio-locale",
	github: "https://github.com/Dmitrii-front",
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];

// Owner-confirmed public channels; intentionally no phone/WhatsApp.
export const publicContacts = [
	{ name: "Telegram", href: "https://t.me/to4ka_gr" },
	{ name: "LinkedIn", href: "https://www.linkedin.com/in/dmitrii-nadtochii" },
	{ name: "GitHub", href: siteConfig.github },
	{ name: "Email", href: "mailto:d.nadtochii.dev@gmail.com" },
] as const;

export const localeDetails = {
	en: { chooseLabel: "Choose English", openGraph: "en_US" },
	ru: { chooseLabel: "Выбрать русский", openGraph: "ru_RU" },
} satisfies Record<SiteLocale, { chooseLabel: string; openGraph: string }>;

export function isSiteLocale(value: string): value is SiteLocale {
	return siteConfig.locales.some((locale) => locale === value);
}
