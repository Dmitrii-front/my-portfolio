import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import type { SiteLocale } from "@/lib/site-config";
import { Arrow } from "@/components/ui/arrow";

export function ProjectList({
	locale,
	dictionary,
	headingLevel = 3,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
	headingLevel?: 2 | 3;
}) {
	const Title = headingLevel === 2 ? "h2" : "h3";
	return (
		<ol className="project-list">
			{projects.map((project, index) => (
				<li key={project.slug}>
					<Link
						href={localizedPath(locale, `/projects/${project.slug}`)}
						className="project-link"
					>
						<span className="project-number" aria-hidden="true">
							0{index + 1}
						</span>
						<div className="project-info">
							<p className="eyebrow">{project.category}</p>
							<Title className="project-title">{project.title}</Title>
							<p>{dictionary.projects[project.slug]}</p>
						</div>
						<Arrow diagonal />
					</Link>
				</li>
			))}
		</ol>
	);
}
