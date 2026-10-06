import type { Dictionary } from "@/lib/dictionaries";
import type { SiteLocale } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { ContactRadialMenu } from "./contact-radial-menu";

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
			id="home-contact"
			aria-labelledby="contact-title"
		>
			<Container>
				<p className="eyebrow">{dictionary.home.contactLabel}</p>
				<h2 id="contact-title">{dictionary.home.contactTitle}</h2>
				<ContactRadialMenu
					locale={locale}
					label={dictionary.home.contactLink}
				/>
			</Container>
		</section>
	);
}
