"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { localizedPath, stripLocale } from "@/lib/i18n";
import { localeDetails, siteConfig, type SiteLocale } from "@/lib/site-config";

type HeaderLabels = Pick<Dictionary, "navigation" | "ui">;

export function SiteHeader({
	locale,
	labels,
}: {
	locale: SiteLocale;
	labels: HeaderLabels;
}) {
	const pathname = usePathname();
	const disclosure = useRef<HTMLDetailsElement>(null);
	const trigger = useRef<HTMLElement>(null);
	const navigation = [
		{ path: "/projects", label: labels.navigation.work },
		{ path: "/lab", label: labels.navigation.lab },
		{ path: "/about", label: labels.navigation.about },
		{ path: "/contact", label: labels.navigation.contact },
	];

	useEffect(() => {
		const close = (event: KeyboardEvent) => {
			if (event.key === "Escape" && disclosure.current?.open) {
				disclosure.current.open = false;
				trigger.current?.focus();
			}
		};
		const outside = (event: PointerEvent) => {
			if (
				event.target instanceof Node &&
				!disclosure.current?.contains(event.target) &&
				disclosure.current
			) {
				disclosure.current.open = false;
			}
		};
		const desktop = window.matchMedia("(min-width: 1200px)");
		const resize = () => {
			if (desktop.matches && disclosure.current)
				disclosure.current.open = false;
		};
		document.addEventListener("keydown", close);
		document.addEventListener("pointerdown", outside);
		desktop.addEventListener("change", resize);
		return () => {
			document.removeEventListener("keydown", close);
			document.removeEventListener("pointerdown", outside);
			desktop.removeEventListener("change", resize);
		};
	}, []);

	useEffect(() => {
		if (pathname && disclosure.current) disclosure.current.open = false;
	}, [pathname]);

	function navLinks() {
		return navigation.map(({ path, label }) => {
			const href = localizedPath(locale, path);
			return (
				<Link
					key={path}
					href={href}
					aria-current={pathname === href ? "page" : undefined}
					onClick={() => {
						if (disclosure.current?.open) {
							disclosure.current.open = false;
							if (pathname === href) trigger.current?.focus();
						}
					}}
				>
					{label}
				</Link>
			);
		});
	}

	return (
		<header className="site-header">
			<div className="container header-row">
				<Link
					href={localizedPath(locale)}
					className="wordmark"
					aria-label={`Dmitry — ${labels.ui.home}`}
				>
					DMITRY<span aria-hidden="true">.</span>
				</Link>
				<nav className="desktop-navigation" aria-label={labels.ui.navigation}>
					{navLinks()}
				</nav>
				<div className="header-controls">
					<nav className="language-switcher" aria-label={labels.ui.language}>
						{siteConfig.locales.map((language) => (
							<a
								key={language}
								href={`/language?locale=${language}&path=${encodeURIComponent(stripLocale(pathname))}`}
								hrefLang={language}
								lang={language}
								aria-current={language === locale ? "true" : undefined}
								aria-label={localeDetails[language].chooseLabel}
							>
								{language.toUpperCase()}
							</a>
						))}
					</nav>
					<details className="mobile-navigation" ref={disclosure}>
						<summary ref={trigger} aria-label={labels.ui.menu}>
							<span>{labels.ui.menu}</span>
							<span className="menu-icon" aria-hidden="true">
								<i />
								<i />
							</span>
						</summary>
						<nav className="mobile-panel" aria-label={labels.ui.navigation}>
							{navLinks()}
						</nav>
					</details>
				</div>
			</div>
		</header>
	);
}
