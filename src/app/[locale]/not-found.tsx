"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { getDictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { isSiteLocale, siteConfig } from "@/lib/site-config";

export default function NotFound() {
	const params = useParams();
	const locale =
		typeof params.locale === "string" && isSiteLocale(params.locale)
			? params.locale
			: siteConfig.defaultLocale;
	const dictionary = getDictionary(locale);
	return (
		<Container className="inner-page">
			<PageHeading
				eyebrow="404"
				title={dictionary.ui.notFound}
				description={dictionary.ui.notFoundBody}
			/>
			<Link className="button button-primary" href={localizedPath(locale)}>
				{dictionary.ui.home}
			</Link>
		</Container>
	);
}
