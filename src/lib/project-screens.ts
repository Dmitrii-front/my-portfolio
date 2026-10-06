import { devices, type ShowcaseDevice } from "./home-content";
import type { projects } from "./projects";
import type { SiteLocale } from "./site-config";

type ProjectSlug = (typeof projects)[number]["slug"];
type Screen = {
	base: string;
	width: number;
	height: number;
	alt: Record<SiteLocale, string>;
};

// Only audited device variants. Absence is deliberate, never a desktop fallback.
const screens: Record<ProjectSlug, Partial<Record<ShowcaseDevice, Screen>>> = {
	pnlwise: {
		MacBook: {
			base: "/projects/pnlwise-desktop",
			width: 3454,
			height: 1990,
			alt: {
				en: "Pnlwise home with bank statement upload and an explicitly labelled sample P&L report",
				ru: "Главная Pnlwise: загрузка выписок и отчёт P&L с явной пометкой Sample report",
			},
		},
	},
	healthy: {
		MacBook: {
			base: "/projects/healthy-desktop",
			width: 3454,
			height: 1990,
			alt: {
				en: "Healthy public home with doctor search and booking introduction",
				ru: "Публичная главная Healthy: поиск врача и введение в запись на приём",
			},
		},
	},
	portfolio: {
		MacBook: {
			base: "/projects/portfolio-desktop",
			width: 1920,
			height: 1106,
			alt: {
				en: "Portfolio 2026 real desktop Home: product headline and Product Hub",
				ru: "Настоящая главная Portfolio 2026 на desktop: заголовок и Product Hub",
			},
		},
	},
};

export function projectScreen(slug: ProjectSlug, device: ShowcaseDevice) {
	return screens[slug][device];
}

export function availableProjectDevices(slug: ProjectSlug) {
	return devices.filter((device) => Boolean(screens[slug][device]));
}

export function resolveProjectDevice(
	slug: ProjectSlug,
	preferred: ShowcaseDevice,
) {
	const available = availableProjectDevices(slug);
	return available.includes(preferred) ? preferred : (available[0] ?? null);
}
