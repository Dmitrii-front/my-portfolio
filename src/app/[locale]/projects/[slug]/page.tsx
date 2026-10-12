import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { contentLabels, formatPeriod } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { readLocale } from "@/lib/locale-params";
import { pageMetadata } from "@/lib/metadata";
import { caseStudies } from "@/lib/project-case-studies";
import { projectScreen } from "@/lib/project-screens";
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
		project.summary[locale],
	);
}

export default async function CaseStudyPage({ params }: ProjectParams) {
	const locale = await readLocale(params);
	const { slug } = await params;
	const project = getProject(slug);
	if (!project) notFound();
	const dictionary = getDictionary(locale);
	const labels = contentLabels[locale];
	const study = caseStudies[project.slug];
	const screen = projectScreen(project.slug, study.media.device);
	const sections = ["problem", "solution", "architecture", "results"] as const;
	return (
		<Container className="inner-page">
			<Link
				className="text-link back-link"
				href={localizedPath(locale, "/projects")}
			>
				← {dictionary.ui.back}
			</Link>
			<PageHeading
				eyebrow={project.category[locale]}
				title={project.title}
				description={project.summary[locale]}
			/>
			<div className="case-sections">
				<section>
					<h2>{labels.role}</h2>
					<p>{project.role[locale]}</p>
					{project.period && <p>{formatPeriod(project.period, locale)}</p>}
					<p>{project.ownership[locale]}</p>
					{project.teamSize && (
						<p>
							{labels.team}: {project.teamSize}
							{project.teamSize > 1 && ` ${labels.people}`}
						</p>
					)}
					{project.responsibilities.map((text) => (
						<p key={text.en}>{text[locale]}</p>
					))}
				</section>
				<section>
					<h2>{labels.status}</h2>
					<p>{project.status[locale]}</p>
				</section>
				{sections.map((key) =>
					study[key]?.length ? (
						<section key={key}>
							<h2>{labels[key]}</h2>
							{study[key]?.map((text) => (
								<p key={text.en}>{text[locale]}</p>
							))}
						</section>
					) : null,
				)}
				{study.technologies?.length && (
					<section>
						<h2>{labels.technologies}</h2>
						<p>{study.technologies.join(" · ")}</p>
					</section>
				)}
				{screen && (
					<figure className="case-media">
						{/* biome-ignore lint/performance/noImgElement: approved static srcset, no image provider */}
						<img
							src={`${screen.base}-1280.webp`}
							srcSet={`${screen.base}-640.webp 640w, ${screen.base}-1280.webp 1280w, ${screen.base}-1920.webp 1920w`}
							sizes="(min-width: 848px) 768px, 100vw"
							width={screen.width}
							height={screen.height}
							alt={screen.alt[locale]}
							loading="lazy"
							decoding="async"
						/>
						<figcaption>{study.media.caption[locale]}</figcaption>
					</figure>
				)}
				{study.links?.map((link) => (
					<a key={link.href} className="text-link" href={link.href}>
						{link.label[locale]}
					</a>
				))}
				<Link className="text-link" href={localizedPath(locale, "/contact")}>
					{labels.contact}
				</Link>
			</div>
		</Container>
	);
}
