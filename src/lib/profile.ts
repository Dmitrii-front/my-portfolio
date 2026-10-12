import type { LocalizedText, Period } from "./content";
import type { ProjectSlug } from "./projects";

export const profile = {
	name: { en: "Dmitry", ru: "Дмитрий" },
	position: {
		en: "Full-Stack / Product Developer",
		ru: "Full-Stack / Product Developer",
	},
	heroTitle: {
		en: "I build digital products from idea to implementation.",
		ru: "Создаю цифровые продукты — от идеи до реализации.",
	},
	heroSummary: {
		en: "Full-stack web applications, MVPs and product execution — with evidence in the work below.",
		ru: "Full-stack веб-приложения, MVP и работа над продуктом — с примерами в проектах ниже.",
	},
	intro: {
		en: "I’m Dmitry, a Full-Stack / Product Developer. I work on web products, from planning an MVP to building its application and integrations.",
		ru: "Я Дмитрий, Full-Stack / Product Developer. Работаю над веб-продуктами: от планирования MVP до разработки приложения и интеграций.",
	},
	background: {
		en: "My background is in dentistry: education at KRSU, residency and clinical work in 2017–2021. Since 2023 I have worked in technology and development. That medical-domain context informs my product and consulting work on Healthy.",
		ru: "Мой профессиональный контекст — стоматология: обучение в КРСУ, ординатура и клиническая работа в 2017–2021 годах. С 2023 года работаю в технологиях и разработке. Медицинская экспертиза помогает в продуктовой и консультационной работе над Healthy.",
	},
	approach: {
		en: "Define the task and the MVP boundary, make decisions explicit, then implement and review. Pnlwise demonstrates full-stack ownership; Healthy demonstrates product coordination and medical-domain contribution; Portfolio documents architecture and acceptance decisions.",
		ru: "Определить задачу и границы MVP, явно зафиксировать решения, затем реализовать и проверить. Pnlwise показывает full-stack ответственность; Healthy — продуктовую координацию и медицинский вклад; Portfolio — архитектурные решения и приёмку.",
	},
	focus: [
		{ en: "MVP / SaaS", ru: "MVP / SaaS" },
		{ en: "API / AI", ru: "API / AI" },
		{ en: "Healthcare", ru: "Здравоохранение" },
		{ en: "FinTech", ru: "Финтех" },
	],
	capabilities: [
		{
			text: {
				en: "Full-stack web products and API / AI integrations",
				ru: "Full-stack веб-продукты и API / AI интеграции",
			},
			projects: ["pnlwise"],
		},
		{
			text: {
				en: "MVP planning and product execution",
				ru: "Планирование MVP и работа над продуктом",
			},
			projects: ["healthy", "pnlwise"],
		},
		{
			text: {
				en: "Modern web application architecture and review",
				ru: "Архитектура и проверка современных веб-приложений",
			},
			projects: ["portfolio"],
		},
	] satisfies { text: LocalizedText; projects: ProjectSlug[] }[],
	education: [
		{
			id: "krsu",
			institution: "KRSU",
			subject: { en: "Dentistry", ru: "Стоматология" },
			period: { start: "2012", end: "2017" },
		},
		{
			id: "residency",
			subject: { en: "Residency", ru: "Ординатура" },
			period: { start: "2017", end: "2019" },
		},
	] satisfies {
		id: string;
		institution?: string;
		subject: LocalizedText;
		period: Period;
	}[],
};
