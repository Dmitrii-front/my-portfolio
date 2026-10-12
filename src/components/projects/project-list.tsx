import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { formatPeriod } from "@/lib/content";
import { localizedPath } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import type { SiteLocale } from "@/lib/site-config";

export function ProjectList({
	locale,
	headingLevel = 3,
}: {
	locale: SiteLocale;
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
							<p className="eyebrow">{project.category[locale]}</p>
							<Title className="project-title">{project.title}</Title>
							<p>
								{project.role[locale]}
								{project.period && (
									<> · {formatPeriod(project.period, locale)}</>
								)}
							</p>
							<p>
								{project.summary[locale]} {project.status[locale]}
							</p>
						</div>
						<Arrow diagonal />
					</Link>
				</li>
			))}
		</ol>
	);
}
