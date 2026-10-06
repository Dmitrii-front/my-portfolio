import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import type { SiteLocale } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Arrow } from "@/components/ui/arrow";

export function Lab({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	const copy = dictionary.home;
	return (
		<section className="section lab-section" aria-labelledby="lab-title">
			<Container>
				<div className="section-heading">
					<div>
						<p className="eyebrow">{copy.labLabel}</p>
						<h2 id="lab-title">{copy.labTitle}</h2>
						<p className="lede">{copy.labDescription}</p>
					</div>
					<Link href={localizedPath(locale, "/lab")} className="text-link">
						{copy.labLink}
						<Arrow />
					</Link>
				</div>
				<p className="quiet-placeholder">
					{dictionary.content.experimentsPending}
				</p>
			</Container>
		</section>
	);
}
