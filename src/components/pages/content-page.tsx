import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { Arrow } from "@/components/ui/arrow";
import { getDictionary } from "@/lib/dictionaries";
import { siteConfig, type SiteLocale } from "@/lib/site-config";

export type ContentPageName = "lab" | "about" | "experience" | "contact";

export function ContentPage({
	locale,
	page,
}: {
	locale: SiteLocale;
	page: ContentPageName;
}) {
	const dictionary = getDictionary(locale);
	return (
		<Container className="inner-page">
			<PageHeading {...dictionary.pages[page]} />
			{page === "about" && (
				<section className="content-section">
					<h2>{dictionary.content.approach}</h2>
					<p>{dictionary.content.approachBody}</p>
				</section>
			)}
			{page === "experience" && (
				<p className="quiet-placeholder">
					{dictionary.content.experiencePending}
				</p>
			)}
			{page === "lab" && (
				<p className="quiet-placeholder">
					{dictionary.content.experimentsPending}
				</p>
			)}
			{page === "contact" && (
				<section className="content-section">
					<p>{dictionary.content.contactPending}</p>
					<a className="button button-primary" href={siteConfig.github}>
						{dictionary.content.github}
						<Arrow diagonal />
					</a>
				</section>
			)}
		</Container>
	);
}
