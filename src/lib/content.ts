import type { SiteLocale } from "./site-config";

export type LocalizedText = Record<SiteLocale, string>;
export type Period = { start: string; end: string | null };

// Preserve the confirmed precision: YYYY or YYYY-MM, never invent a day.
export function formatPeriod(period: Period, locale: SiteLocale) {
	const format = (value: string) => {
		if (value.length === 4) return value;
		const [year, month] = value.split("-").map(Number);
		return new Intl.DateTimeFormat(locale, {
			month: "long",
			year: "numeric",
			timeZone: "UTC",
		}).format(new Date(Date.UTC(year, month - 1, 1)));
	};
	return `${format(period.start)} — ${period.end ? format(period.end) : contentLabels[locale].present}`;
}

export const contentLabels = {
	en: {
		present: "Present",
		role: "Role & contribution",
		status: "Current state",
		problem: "Product context",
		solution: "Implemented scope",
		architecture: "Technical decisions",
		results: "Outcome & limits",
		education: "Education & background",
		capabilities: "Areas of work",
		background: "Background",
		evidence: "Project evidence",
		technologies: "Technology",
		team: "Team",
		people: "people",
		ownership: "Ownership",
		experience: "Professional experience",
		concept: "Concept · not implemented",
		source: "Source repository",
		contact: "Contact",
	},
	ru: {
		present: "настоящее время",
		role: "Роль и вклад",
		status: "Текущее состояние",
		problem: "Контекст продукта",
		solution: "Реализованный объём",
		architecture: "Технические решения",
		results: "Результат и ограничения",
		education: "Образование и профессиональный контекст",
		capabilities: "Направления работы",
		background: "Профессиональный контекст",
		evidence: "Примеры проектов",
		technologies: "Технологии",
		team: "Команда",
		people: "человека",
		ownership: "Ответственность",
		experience: "Профессиональный опыт",
		concept: "Концепт · не реализован",
		source: "Репозиторий проекта",
		contact: "Связаться",
	},
} satisfies Record<SiteLocale, Record<string, string>>;
