import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import type { SiteLocale } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Arrow } from "@/components/ui/arrow";

export function Contact({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	return (
		<section
			className="section contact-section"
			aria-labelledby="contact-title"
		>
			<Container>
				<p className="eyebrow">{dictionary.home.contactLabel}</p>
				<h2 id="contact-title">{dictionary.home.contactTitle}</h2>
				<Link
					href={localizedPath(locale, "/contact")}
					className="button button-primary"
				>
					{dictionary.home.contactLink}
					<Arrow diagonal />
				</Link>
			</Container>
		</section>
	);
}
