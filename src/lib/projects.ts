import type { LocalizedText, Period } from "./content";

export type Project = {
	slug: "pnlwise" | "healthy" | "portfolio";
	title: string;
	category: LocalizedText;
	summary: LocalizedText;
	role: LocalizedText;
	period?: Period;
	status: LocalizedText;
	ownership: LocalizedText;
	teamSize?: number;
	responsibilities: LocalizedText[];
};

// Public, approved facts only. Long case narratives stay outside Home's client graph.
export const projects = [
	{
		slug: "pnlwise",
		title: "Pnlwise",
		category: { en: "FinTech", ru: "Финансовые технологии" },
		summary: {
			en: "Bank statements to reviewed P&L. Founder and sole full-stack developer.",
			ru: "От банковских выписок к проверенному P&L. Основатель и единственный full-stack разработчик.",
		},
		role: {
			en: "Founder + Full-Stack Developer",
			ru: "Основатель + Full-Stack разработчик",
		},
		period: { start: "2026-09", end: null },
		status: {
			en: "Working implementation; commercial launch readiness not claimed",
			ru: "Рабочая реализация; готовность к коммерческому запуску не заявляется",
		},
		ownership: {
			en: "Dmitry is the sole owner and developer.",
			ru: "Дмитрий — единственный владелец и разработчик.",
		},
		teamSize: 1,
		responsibilities: [
			{
				en: "Full-stack product development, statement processing, review and reporting workflows.",
				ru: "Full-stack разработка продукта, обработка выписок, сценарии проверки и отчётности.",
			},
		],
	},
	{
		slug: "healthy",
		title: "Healthy",
		category: { en: "Healthcare", ru: "Здравоохранение" },
		summary: {
			en: "Healthcare MVP in refinement. Founder, product manager and medical consultant.",
			ru: "Медицинский MVP на этапе доработки. Основатель, продуктовый менеджер и медицинский консультант.",
		},
		role: {
			en: "Founder / Product Manager / Medical Consultant",
			ru: "Основатель / Продуктовый менеджер / Медицинский консультант",
		},
		period: { start: "2026-03", end: null },
		status: {
			en: "MVP nearly complete; refinement only. No public launch.",
			ru: "MVP почти завершён; только доработка. Публичного запуска не было.",
		},
		ownership: {
			en: "Product and medical-domain contribution within a four-person team; not sole engineering authorship.",
			ru: "Продуктовый вклад и медицинская экспертиза в команде из четырёх человек; не единоличное авторство разработки.",
		},
		teamSize: 4,
		responsibilities: [
			{
				en: "Planning, analysis and team coordination.",
				ru: "Планирование, аналитика и координация команды.",
			},
			{
				en: "Medical/domain expertise, investor work and legal coordination.",
				ru: "Медицинская и предметная экспертиза, работа с инвесторами и юридическая координация.",
			},
		],
	},
	{
		slug: "portfolio",
		title: "Portfolio",
		category: { en: "Product platform", ru: "Продуктовая платформа" },
		summary: {
			en: "An EN/RU portfolio foundation. Product direction with AI-assisted engineering.",
			ru: "Основа портфолио EN/RU. Продуктовое руководство и AI-assisted разработка.",
		},
		role: {
			en: "Product direction / Architecture decisions / Acceptance & QA",
			ru: "Продуктовое руководство / Архитектурные решения / Приёмка и QA",
		},
		status: {
			en: "Public application foundation; work in progress, not a completed v1",
			ru: "Основа публичного приложения; в разработке, не завершённая v1",
		},
		ownership: {
			en: "Dmitry owns requirements, architecture decisions, visual direction and acceptance/QA. Codex assists with engineering implementation.",
			ru: "Дмитрий отвечает за требования, архитектурные решения, визуальное направление и приёмку/QA. Codex помогает с инженерной реализацией.",
		},
		responsibilities: [
			{
				en: "Review implementation through documented decisions, tests, browser QA and CI.",
				ru: "Проверка реализации через документированные решения, тесты, browser QA и CI.",
			},
		],
	},
] satisfies Project[];

export type ProjectSlug = Project["slug"];

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
