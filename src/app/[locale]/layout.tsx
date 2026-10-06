import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getDictionary } from "@/lib/dictionaries";
import { readLocale, type LocaleParams } from "@/lib/locale-params";
import { siteOrigin } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

export const metadata: Metadata = {
	metadataBase: siteOrigin(),
	title: { default: "Dmitry — Portfolio", template: "%s — Dmitry" },
	robots: { index: false, follow: false },
};
export const viewport: Viewport = {
	themeColor: "#08090b",
	colorScheme: "dark",
};

export function generateStaticParams() {
	return siteConfig.locales.map((locale) => ({ locale }));
}

export default async function PublicLayout({
	children,
	params,
}: LocaleParams & { children: ReactNode }) {
	const locale = await readLocale(params);
	const dictionary = getDictionary(locale);
	return (
		<html lang={locale}>
			<body>
				<a className="skip-link" href="#main-content">
					{dictionary.ui.skip}
				</a>
				<SiteHeader
					locale={locale}
					labels={{ navigation: dictionary.navigation, ui: dictionary.ui }}
				/>
				<main id="main-content" tabIndex={-1}>
					{children}
				</main>
				<SiteFooter locale={locale} dictionary={dictionary} />
			</body>
		</html>
	);
}
