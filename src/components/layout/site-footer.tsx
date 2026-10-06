import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { siteConfig, type SiteLocale } from "@/lib/site-config";
import { Arrow } from "@/components/ui/arrow";
import { Container } from "@/components/ui/container";

export function SiteFooter({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	return (
		<footer className="site-footer">
			<Container className="footer-content">
				<div>
					<p className="wordmark">
						DMITRY<span aria-hidden="true">.</span>
					</p>
					<p className="footer-note">{dictionary.content.footer}</p>
				</div>
				<nav
					className="footer-links"
					aria-label={
						locale === "en" ? "Footer navigation" : "Навигация в подвале"
					}
				>
					<Link href={localizedPath(locale, "/experience")}>
						{dictionary.navigation.experience}
					</Link>
					<Link href={localizedPath(locale, "/contact")}>
						{dictionary.navigation.contact}
					</Link>
					<a href={siteConfig.github}>
						GitHub <Arrow diagonal />
					</a>
				</nav>
				<p className="copyright">
					© {new Date().getFullYear()} {dictionary.content.rights}
				</p>
			</Container>
		</footer>
	);
}
