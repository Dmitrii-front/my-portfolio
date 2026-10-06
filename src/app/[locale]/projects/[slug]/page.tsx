import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { getDictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/lib/projects";

type ProjectParams = { params: Promise<{ locale: string; slug: string }> };
export function generateStaticParams() {
	return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectParams) {
	const locale = await readLocale(params);
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();
	return pageMetadata(
		locale,
		`/projects/${slug}`,
		project.title,
		getDictionary(locale).projects[project.slug],
	);
}

export default async function CaseStudyPage({ params }: ProjectParams) {
	const locale = await readLocale(params);
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();
	const dictionary = getDictionary(locale);
	const sections = [
		dictionary.content.problem,
		dictionary.content.role,
		dictionary.content.solution,
		dictionary.content.architecture,
		dictionary.content.results,
	];
	return (
		<Container className="inner-page">
			<Link
				className="text-link back-link"
				href={localizedPath(locale, "/projects")}
			>
				← {dictionary.ui.back}
			</Link>
			<PageHeading
				eyebrow={project.category}
				title={project.title}
				description={dictionary.projects[project.slug]}
			/>
			<p className="quiet-placeholder">{dictionary.content.casePending}</p>
			<div className="case-sections">
				{sections.map((title) => (
					<section key={title}>
						<h2>{title}</h2>
						<p>{dictionary.content.caseBody}</p>
					</section>
				))}
			</div>
		</Container>
	);
}
