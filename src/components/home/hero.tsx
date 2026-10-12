import Link from "next/link";
import { Fragment } from "react";
import { Arrow } from "@/components/ui/arrow";
import { Container } from "@/components/ui/container";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath } from "@/lib/i18n";
import { profile } from "@/lib/profile";
import type { SiteLocale } from "@/lib/site-config";
import { ProductHub } from "./product-hub";

export function Hero({
	locale,
	dictionary,
}: {
	locale: SiteLocale;
	dictionary: Dictionary;
}) {
	const copy = dictionary.hero;
	return (
		<section className="hero" aria-labelledby="hero-title">
			<Container className="hero-grid">
				<div className="hero-copy">
					<p className="eyebrow light-label">{copy.eyebrow}</p>
					<h1 id="hero-title">{copy.title}</h1>
					<p className="lede">{copy.description}</p>
					<div className="hero-actions">
						<Link className="button button-primary" href="#selected-work">
							{copy.work}
							<Arrow />
						</Link>
						<Link className="text-link" href={localizedPath(locale, "/about")}>
							{copy.about}
							<Arrow diagonal />
						</Link>
					</div>
					<div className="current-focus">
						<p className="eyebrow">{copy.focus}</p>
						<p>
							{profile.focus.map((item, index) => (
								<Fragment key={item.en}>
									{index > 0 && <span aria-hidden="true">/</span>}
									{item[locale]}
								</Fragment>
							))}
						</p>
					</div>
				</div>
				<ProductHub labels={copy} locale={locale} />
			</Container>
		</section>
	);
}
