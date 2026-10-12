import { profile } from "./profile";
import type { SiteLocale } from "./site-config";

export const dictionaries = {
	en: {
		navigation: {
			work: "Work",
			lab: "Lab",
			about: "About",
			contact: "Contact",
			experience: "Experience",
		},
		ui: {
			skip: "Skip to content",
			menu: "Menu",
			close: "Close menu",
			navigation: "Main navigation",
			language: "Language",
			home: "Home",
			back: "Back to projects",
			notFound: "Page not found",
			notFoundBody: "This page doesn’t exist. Explore the work or return home.",
		},
		hero: {
			eyebrow: profile.position.en,
			title: profile.heroTitle.en,
			description: profile.heroSummary.en,
			work: "Explore my work",
			about: "About me",
			focus: "Current focus",
			hub: "Product thinking: idea, development, AI and user needs",
			idea: "IDEA",
			development: "DEVELOPMENT",
			products: "PRODUCTS",
			ai: "AI",
			users: "USER NEEDS",
		},
		home: {
			workLabel: "01 / SELECTED WORK",
			workTitle: "Ideas, made real.",
			workDescription: "A selection of products and the thinking behind them.",
			allWork: "All projects",
			caseStudy: "View case study",
			labLabel: "02 / LAB",
			labTitle: "Room to experiment.",
			labDescription:
				"Small explorations at the intersection of products, engineering, and emerging technology.",
			labLink: "Explore the lab",
			contactLabel: "03 / CONTACT",
			contactTitle: "Have a project in mind?",
			contactLink: "Contact me",
			preview: "Project preview",
			previewPending: "Project imagery in preparation",
		},
		pages: {
			projects: {
				eyebrow: "WORK",
				title: "Selected projects.",
				description:
					"Products, the problems they address, and the decisions that shape them.",
			},
			lab: {
				eyebrow: "LAB",
				title: "Ideas worth exploring.",
				description:
					"A space for focused experiments, integrations, and small tools.",
			},
			about: {
				eyebrow: "ABOUT",
				title: "From the first question to the final detail.",
				description: profile.intro.en,
			},
			experience: {
				eyebrow: "EXPERIENCE",
				title: "A perspective built through practice.",
				description:
					"Professional history, responsibilities, and the lessons behind the work.",
			},
			contact: {
				eyebrow: "CONTACT",
				title: "Have a project in mind?",
				description:
					"Start with the idea. We’ll find the right way to bring it to life.",
			},
		},
		content: {
			approach: "Approach",
			contactPending: "Choose the channel that works best for you.",
			github: "Find me on GitHub",
			footer: "From idea to production.",
			rights: "Dmitry",
		},
		experiments: {
			payments: "Payment integrations",
			agent: "AI portfolio agent",
			parser: "PDF parsing",
			bot: "Telegram tools",
		},
	},
	ru: {
		navigation: {
			work: "Проекты",
			lab: "Lab",
			about: "Обо мне",
			contact: "Контакты",
			experience: "Опыт",
		},
		ui: {
			skip: "Перейти к содержимому",
			menu: "Меню",
			close: "Закрыть меню",
			navigation: "Основная навигация",
			language: "Язык",
			home: "Главная",
			back: "К проектам",
			notFound: "Страница не найдена",
			notFoundBody:
				"Такой страницы нет. Посмотрите проекты или вернитесь на главную.",
		},
		hero: {
			eyebrow: profile.position.ru,
			title: profile.heroTitle.ru,
			description: profile.heroSummary.ru,
			work: "Смотреть проекты",
			about: "Обо мне",
			focus: "Сейчас в фокусе",
			hub: "Продуктовый подход: идея, разработка, AI и задачи людей",
			idea: "ИДЕЯ",
			development: "РАЗРАБОТКА",
			products: "ПРОДУКТЫ",
			ai: "AI",
			users: "ЗАДАЧИ ЛЮДЕЙ",
		},
		home: {
			workLabel: "01 / ПРОЕКТЫ",
			workTitle: "Идеи становятся реальностью.",
			workDescription: "Избранные продукты и решения, которые за ними стоят.",
			allWork: "Все проекты",
			caseStudy: "Смотреть кейс",
			labLabel: "02 / LAB",
			labTitle: "Пространство для экспериментов.",
			labDescription:
				"Небольшие исследования на пересечении продуктов, инженерии и новых технологий.",
			labLink: "Перейти в Lab",
			contactLabel: "03 / КОНТАКТЫ",
			contactTitle: "Есть идея проекта?",
			contactLink: "Связаться со мной",
			preview: "Превью проекта",
			previewPending: "Изображения проекта готовятся",
		},
		pages: {
			projects: {
				eyebrow: "ПРОЕКТЫ",
				title: "Избранные проекты.",
				description:
					"Продукты, задачи, которые они решают, и решения, которые их формируют.",
			},
			lab: {
				eyebrow: "LAB",
				title: "Идеи, которые стоит исследовать.",
				description:
					"Пространство для экспериментов, интеграций и небольших инструментов.",
			},
			about: {
				eyebrow: "ОБО МНЕ",
				title: "От первого вопроса до последней детали.",
				description: profile.intro.ru,
			},
			experience: {
				eyebrow: "ОПЫТ",
				title: "Подход, сформированный практикой.",
				description:
					"Профессиональная история, ответственность и выводы из работы над продуктами.",
			},
			contact: {
				eyebrow: "КОНТАКТЫ",
				title: "Есть идея проекта?",
				description:
					"Начнём с идеи. Вместе найдём подходящий способ воплотить её в жизнь.",
			},
		},
		content: {
			approach: "Подход",
			contactPending: "Выберите удобный канал связи.",
			github: "Мой GitHub",
			footer: "От идеи до запуска.",
			rights: "Дмитрий",
		},
		experiments: {
			payments: "Платёжные интеграции",
			agent: "AI-агент портфолио",
			parser: "Обработка PDF",
			bot: "Инструменты Telegram",
		},
	},
} satisfies Record<SiteLocale, unknown>;

export type Dictionary = typeof dictionaries.en;

export function getDictionary(locale: SiteLocale): Dictionary {
	return dictionaries[locale];
}
