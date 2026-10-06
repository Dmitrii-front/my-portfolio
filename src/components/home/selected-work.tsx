import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import type { SiteLocale } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Arrow } from "@/components/ui/arrow";
import { ProjectList } from "@/components/projects/project-list";
import { DeviceShowcase } from "./device-showcase";

export function SelectedWork({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	const copy = dictionary.home;
	return (
		<section
			className="section"
			id="selected-work"
			aria-labelledby="work-title"
		>
			<Container>
				<div className="section-heading">
					<div>
						<p className="eyebrow">{copy.workLabel}</p>
						<h2 id="work-title">{copy.workTitle}</h2>
						<p className="lede">{copy.workDescription}</p>
					</div>
					<Link href={localizedPath(locale, "/projects")} className="text-link">
						{copy.allWork}
						<Arrow />
					</Link>
				</div>
				<div className="work-grid">
					<ProjectList locale={locale} dictionary={dictionary} />
					<DeviceShowcase labels={copy} />
				</div>
			</Container>
		</section>
	);
}
