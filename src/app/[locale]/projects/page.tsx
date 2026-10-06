import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { ProjectList } from "@/components/projects/project-list";
import { getDictionary } from "@/lib/dictionaries";
import { readLocale, type LocaleParams } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const copy = getDictionary(locale).pages.projects;
	return pageMetadata(locale, "/projects", copy.eyebrow, copy.description);
}

export default async function ProjectsPage({ params }: LocaleParams) {
	const locale = await readLocale(params);
	const dictionary = getDictionary(locale);
	return (
		<Container className="inner-page">
			<PageHeading {...dictionary.pages.projects} />
			<section aria-label={dictionary.pages.projects.title}>
				<ProjectList locale={locale} dictionary={dictionary} headingLevel={2} />
			</section>
		</Container>
	);
}
