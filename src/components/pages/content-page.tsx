import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { Container } from "@/components/ui/container";
import { PageHeading } from "@/components/ui/page-heading";
import { contentLabels, formatPeriod } from "@/lib/content";
import { getDictionary } from "@/lib/dictionaries";
import { experience, experienceRecord } from "@/lib/experience";
import { labExperiments } from "@/lib/home-content";
import { localizedPath } from "@/lib/i18n";
import { profile } from "@/lib/profile";
import { getProject } from "@/lib/projects";
import { publicContacts, type SiteLocale } from "@/lib/site-config";

export type ContentPageName = "lab" | "about" | "experience" | "contact";

export function ContentPage({
	locale,
	page,
}: {
	locale: SiteLocale;
	page: ContentPageName;
}) {
	const dictionary = getDictionary(locale);
	const labels = contentLabels[locale];
	return (
		<Container className="inner-page">
			<PageHeading {...dictionary.pages[page]} />
			{page === "about" && (
				<div className="case-sections">
					<section>
						<h2>{dictionary.content.approach}</h2>
						<p>{profile.approach[locale]}</p>
					</section>
					<section>
						<h2>{labels.capabilities}</h2>
						{profile.capabilities.map((capability) => (
							<div key={capability.text.en}>
								<p>{capability.text[locale]}</p>
								<div className="flex flex-wrap gap-6">
									{capability.projects.map((slug) => (
										<Link
											className="text-link"
											key={slug}
											href={localizedPath(locale, `/projects/${slug}`)}
										>
											{getProject(slug)?.title}
											<Arrow diagonal />
										</Link>
									))}
								</div>
							</div>
						))}
					</section>
					<section>
						<h2>{labels.background}</h2>
						<p>{profile.background[locale]}</p>
					</section>
					<section>
						<h2>{labels.education}</h2>
						{profile.education.map((item) => (
							<p key={item.id}>
								{item.institution && `${item.institution} — `}
								{item.subject[locale]} · {formatPeriod(item.period, locale)}
							</p>
						))}
					</section>
					<Link
						className="text-link"
						href={localizedPath(locale, "/experience")}
					>
						{labels.experience}
						<Arrow diagonal />
					</Link>
				</div>
			)}
			{page === "experience" && (
				<div className="case-sections">
					{experience.map((entry) => {
						const record = experienceRecord(entry);
						return (
							<section key={record.id} data-experience={record.id}>
								<h2>
									{record.organization[locale]}
									{!record.projectSlug &&
										record.context &&
										` — ${record.context[locale]}`}
								</h2>
								{record.role[locale] !== record.organization[locale] && (
									<p>{record.role[locale]}</p>
								)}
								<p>
									<time dateTime={record.period.start}>
										{formatPeriod(record.period, locale)}
									</time>
								</p>
								{record.responsibilities.map((text) => (
									<p key={text.en}>{text[locale]}</p>
								))}
								{record.projectSlug && (
									<Link
										className="text-link"
										href={localizedPath(
											locale,
											`/projects/${record.projectSlug}`,
										)}
									>
										{dictionary.home.caseStudy}
										<Arrow diagonal />
									</Link>
								)}
							</section>
						);
					})}
				</div>
			)}
			{page === "lab" && (
				<div className="case-sections">
					{labExperiments.map((item) => (
						<section key={item.id}>
							<h2>{item.title[locale]}</h2>
							<p>{labels.concept}</p>
							<p>{item.description[locale]}</p>
						</section>
					))}
				</div>
			)}
			{page === "contact" && (
				<section className="content-section">
					<p>{dictionary.content.contactPending}</p>
					{publicContacts.map((channel) => (
						<a key={channel.name} className="text-link" href={channel.href}>
							{channel.name}
							<Arrow diagonal />
						</a>
					))}
				</section>
			)}
		</Container>
	);
}
