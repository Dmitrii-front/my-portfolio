export const siteConfig = {
  name: "Dmitry",
  locales: ["en", "ru"],
  defaultLocale: "en",
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];

export function isSiteLocale(value: string): value is SiteLocale {
  return siteConfig.locales.some((locale) => locale === value);
}
