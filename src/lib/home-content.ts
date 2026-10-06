import type { SiteLocale } from "./site-config";
export const projectSelectionEvent = "portfolio:select-project";

// Ordered temporary concepts, not shipped features. Replace with CMS records later.
export const labExperiments = [
	{
		id: "payments",
		title: "Kyrgyzstan Payment Integration",
		mark: "↔",
		description: {
			en: "Exploring payment flows and local integrations.",
			ru: "Исследование платёжных сценариев и локальных интеграций.",
		},
	},
	{
		id: "agent",
		title: "AI Portfolio Agent",
		mark: "✳",
		description: {
			en: "Exploring a scoped assistant for portfolio content.",
			ru: "Идея помощника с ограниченными правами для контента портфолио.",
		},
	},
	{
		id: "parser",
		title: "PDF Parser",
		mark: "≡",
		description: {
			en: "Exploring structured data extraction from documents.",
			ru: "Исследование извлечения структурированных данных из документов.",
		},
	},
	{
		id: "bot",
		title: "Telegram Bot",
		mark: "↗",
		description: {
			en: "Exploring useful conversational workflows.",
			ru: "Исследование полезных сценариев в диалоговом интерфейсе.",
		},
	},
] as const;
export const interactionCopy = {
	en: {
		hub: {
			idea: "Start with the problem. Shape an idea worth building.",
			development: "Connect product decisions with thoughtful engineering.",
			ai: "Use AI where it helps people complete real tasks.",
			users: "Design for people, then learn from how they use the product.",
		},
		hubPrompt: "Explore the path from idea to product.",
		featured: "Featured products",
		close: "Close",
		project: "Project",
		device: "Device",
		previous: "Previous project",
		next: "Next project",
		screen: "Screen placeholder — approved imagery to follow",
		labConcept: "Exploration concept",
		labPrevious: "Previous experiments",
		labNext: "Next experiments",
		contactChannels: "Contact channels",
		unavailable: "Not configured",
		contactNotice:
			"Telegram, LinkedIn and Email await confirmed contact details.",
	},
	ru: {
		hub: {
			idea: "Начать с задачи. Сформировать идею, которую стоит воплотить.",
			development: "Связать продуктовые решения с продуманной инженерией.",
			ai: "Применять AI там, где он помогает решать реальные задачи.",
			users: "Создавать для людей и учиться на опыте использования продукта.",
		},
		hubPrompt: "Исследуйте путь от идеи к продукту.",
		featured: "Избранные продукты",
		close: "Закрыть",
		project: "Проект",
		device: "Устройство",
		previous: "Предыдущий проект",
		next: "Следующий проект",
		screen: "Макет экрана — изображения будут добавлены позже",
		labConcept: "Идея эксперимента",
		labPrevious: "Предыдущие эксперименты",
		labNext: "Следующие эксперименты",
		contactChannels: "Каналы связи",
		unavailable: "Не настроен",
		contactNotice:
			"Telegram, LinkedIn и Email ожидают подтверждённых контактов.",
	},
} satisfies Record<SiteLocale, unknown>;
export const devices = ["MacBook", "iPad", "iPhone"] as const;
export type ShowcaseDevice = (typeof devices)[number];
export function defaultDevice(width: number): ShowcaseDevice {
	return width < 768 ? "iPhone" : width < 1200 ? "iPad" : "MacBook";
}
export function wrapProject(index: number, count: number) {
	return ((index % count) + count) % count;
}
