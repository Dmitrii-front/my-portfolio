import type { Metadata } from "next";
import { localizedPath } from "./i18n";
import { localeDetails, siteConfig, type SiteLocale } from "./site-config";

export function siteOrigin() {
	const value = process.env.SITE_URL || "http://localhost:3000";
	const url = new URL(value);
	if (
		!["http:", "https:"].includes(url.protocol) ||
		url.pathname !== "/" ||
		url.search ||
		url.hash ||
		url.username ||
		url.password
	) {
		throw new Error(
			"SITE_URL must be an HTTP(S) origin without a path, query, or fragment.",
		);
	}
	return url;
}

export function pageMetadata(
	locale: SiteLocale,
	path: string,
	title: string,
	description: string,
): Metadata {
	const origin = siteOrigin();
	const url = new URL(localizedPath(locale, path), origin);
	const languages = Object.fromEntries(
		siteConfig.locales.map((language) => [
			language,
			new URL(localizedPath(language, path), origin).href,
		]),
	);

	return {
		title,
		description,
		alternates: {
			canonical: url,
			languages: {
				...languages,
				"x-default": new URL(
					localizedPath(siteConfig.defaultLocale, path),
					origin,
				).href,
			},
		},
		openGraph: {
			title: `${title} — Dmitry`,
			description,
			url,
			siteName: "Dmitry — Portfolio",
			type: "website",
			locale: localeDetails[locale].openGraph,
			alternateLocale: siteConfig.locales
				.filter((language) => language !== locale)
				.map((language) => localeDetails[language].openGraph),
		},
		twitter: { card: "summary", title: `${title} — Dmitry`, description },
		// No placeholder pages or previews may be indexed before publishing real content.
		robots: { index: false, follow: false },
	};
}
