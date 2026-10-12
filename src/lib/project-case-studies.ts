import type { LocalizedText } from "./content";
import type { ProjectSlug } from "./projects";

export type CaseStudy = {
	editorial: "ready-for-review";
	localeReadiness: { en: "ready-for-review"; ru: "ready-for-review" };
	problem: LocalizedText[];
	solution?: LocalizedText[];
	process?: LocalizedText[];
	architecture?: LocalizedText[];
	challenges?: LocalizedText[];
	results: LocalizedText[];
	technologies?: string[];
	media: { device: "MacBook"; caption: LocalizedText };
	links?: { label: LocalizedText; href: string }[];
};

// Route/server consumers only: do not import these narratives into interactive Home.
// Field evidence, gaps and publication restrictions: docs/CANONICAL_CONTENT.md.
export const caseStudies: Record<ProjectSlug, CaseStudy> = {
	pnlwise: {
		editorial: "ready-for-review",
		localeReadiness: { en: "ready-for-review", ru: "ready-for-review" },
		problem: [
			{
				en: "Pnlwise is a financial reporting web product for turning bank statement data into a reviewed profit-and-loss report. The work focuses on making extraction, categorization and financial treatment explicit rather than treating an AI answer as the report.",
				ru: "Pnlwise — веб-продукт финансовой отчётности, который превращает данные банковских выписок в проверенный отчёт о прибылях и убытках. Обработка, категоризация и финансовая трактовка должны быть явными: ответ AI не подменяет отчёт.",
			},
		],
		solution: [
			{
				en: "The implemented workflow covers statement upload, processing, transaction review, deterministic P&L calculation and PDF, XLSX and CSV exports. CSV and XLSX import are supported; PDF extraction is text-based and rejects unsupported or ambiguous input rather than promising universal bank compatibility.",
				ru: "Реализованный сценарий включает загрузку выписок, обработку, проверку транзакций, детерминированный расчёт P&L и экспорт в PDF, XLSX и CSV. Поддержан импорт CSV и XLSX; извлечение из PDF работает с текстом и отклоняет неподдерживаемые или неоднозначные файлы, без обещания совместимости со всеми банками.",
			},
			{
				en: "AI-assisted categorization is implemented as an optional, configured integration. Rules and manual review remain usable if the provider is unavailable or not configured. This is an implementation claim, not a claim that a live provider is active for every visit.",
				ru: "AI-категоризация реализована как опциональная настраиваемая интеграция. Правила и ручная проверка остаются доступны, если провайдер недоступен или не настроен. Это описание реализации, а не утверждение о работающем live-провайдере при каждом посещении.",
			},
		],
		architecture: [
			{
				en: "React and TypeScript provide the application UI, using Next.js App Router APIs through Vinext. Cloudflare Workers and D1 provide the server and persistence boundary. Financial amounts are integer cents; deterministic domain logic owns totals, while AI proposes categories and cannot change amounts, dates or payment status.",
				ru: "Интерфейс построен на React и TypeScript с Next.js App Router API через Vinext. Серверный слой и хранение используют Cloudflare Workers и D1. Финансовые суммы хранятся в целых центах; итоги определяет детерминированная предметная логика, а AI предлагает категории и не меняет суммы, даты или платёжный статус.",
			},
			{
				en: "An important boundary is review before export: ownership and export eligibility are checked server-side. Paddle checkout and webhook verification exist in the code, but commercial payment activation and Live transactions are not claimed here.",
				ru: "Важная граница — проверка перед экспортом: право доступа и условия выгрузки проверяются на сервере. Checkout Paddle и проверка webhook реализованы в коде, но здесь не заявляются активация коммерческих платежей или Live-транзакции.",
			},
		],
		results: [
			{
				en: "The result is a working reporting implementation with explicit review and failure paths. Real-bank parsing coverage and commercial launch readiness still require their own verification. No customer, revenue or adoption result is claimed. Figures in the desktop capture are a labelled sample report, not business metrics.",
				ru: "Результат — рабочая реализация отчётности с явными сценариями проверки и обработки ошибок. Поддержка реальных банковских форматов и готовность к коммерческому запуску требуют отдельной проверки. Клиентские, финансовые показатели и adoption не заявляются. Цифры на desktop-снимке — отчёт с пометкой Sample report, а не бизнес-метрики.",
			},
		],
		technologies: [
			"React",
			"TypeScript",
			"Vinext",
			"Cloudflare Workers",
			"D1",
			"Tailwind CSS",
		],
		media: {
			device: "MacBook",
			caption: {
				en: "Approved desktop Home capture: upload introduction and labelled sample P&L, not a current business result.",
				ru: "Утверждённый desktop-снимок главной: вводный экран загрузки и пример P&L, не текущий бизнес-результат.",
			},
		},
	},
	healthy: {
		editorial: "ready-for-review",
		localeReadiness: { en: "ready-for-review", ru: "ready-for-review" },
		problem: [
			{
				en: "Healthy is a healthcare MVP focused on the patient–doctor interaction: finding a doctor, scheduling and booking, with supporting profile and visit context. The product connects patient, doctor and clinic needs, but the scope of each implementation must remain distinct from the broader ecosystem idea.",
				ru: "Healthy — медицинский MVP с фокусом на взаимодействии пациента и врача: поиск врача, расписание и запись, с контекстом профиля и визита. Продукт связывает задачи пациента, врача и клиники, но реализованный объём нельзя смешивать с идеей более широкой экосистемы.",
			},
		],
		solution: [
			{
				en: "Current project documentation records authentication, patient and doctor profiles, appointments and scheduling as implemented API groups. Clinic functionality is partial; supporting notifications, reviews and medical-record functionality are also partial. These are development capabilities, not evidence of production appointments or public usage.",
				ru: "Актуальная документация проекта фиксирует реализованные API-группы авторизации, профилей пациентов и врачей, приёмов и расписания. Функциональность клиник частичная; уведомления, отзывы и медицинские записи также реализованы частично. Это возможности разработки, а не доказательство реальных production-приёмов или публичного использования.",
			},
		],
		architecture: [
			{
				en: "The documented MVP architecture separates React clients from a shared NestJS backend and PostgreSQL. The backend owns business rules and access decisions. Keeping the scope at MVP refinement avoids turning planned ecosystem features into current-product claims. This is documentation-backed context, not an independent audit of every service.",
				ru: "Документированная архитектура MVP отделяет React-клиенты от общего backend на NestJS и PostgreSQL. Бизнес-правила и решения о доступе принадлежат backend. Фокус на доработке MVP не позволяет выдавать планы экосистемы за текущие функции. Это контекст из документации, не независимый аудит каждого сервиса.",
			},
		],
		results: [
			{
				en: "The four-person team has an almost-complete MVP and is refining it, not pursuing work beyond MVP at this stage. There has been no public launch. Doctors, clinics and patients involved so far are test participants; captured catalog figures and historical roadmap targets are not traction. No patient, booking or revenue metrics are claimed.",
				ru: "У команды из четырёх человек почти завершённый MVP; сейчас идёт его доработка, без работы за пределами MVP. Публичного запуска не было. Участвовавшие врачи, клиники и пациенты — тестовые участники; числа в каталоге на снимке и старые цели roadmap не являются traction. Метрики пациентов, записей или выручки не заявляются.",
			},
		],
		technologies: ["React", "NestJS", "PostgreSQL"],
		media: {
			device: "MacBook",
			caption: {
				en: "Approved desktop search introduction captured on 23 September 2026. Catalog count is captured test UI, not public adoption.",
				ru: "Утверждённый desktop-экран поиска от 23 сентября 2026 года. Число в каталоге — содержимое тестового интерфейса, не публичный adoption.",
			},
		},
	},
	portfolio: {
		editorial: "ready-for-review",
		localeReadiness: { en: "ready-for-review", ru: "ready-for-review" },
		problem: [
			{
				en: "Portfolio 2026 is a project for presenting professional identity and work as a coherent, localized application. The constraint is to make the essential content readable before optional visual enhancements, while retaining a consistent mobile-first composition.",
				ru: "Portfolio 2026 — проект для представления профессионального профиля и работ в связном локализованном приложении. Ограничение: основной контент должен читаться до загрузки необязательных визуальных улучшений, при сохранении mobile-first композиции.",
			},
		],
		solution: [
			{
				en: "The implemented foundation includes EN/RU pages, persisted language choice, localized metadata, canonical content and project cases. Home uses native scroll, one persistent project/device presentation, a concept Lab preview and confirmed contact channels. Three.js enhancement is optional; useful HTML/CSS remains available without it.",
				ru: "Реализованная основа включает EN/RU страницы, сохранение выбора языка, локализованные metadata, canonical content и кейсы проектов. Home использует native scroll, одну постоянную сцену проекта/устройства, превью концептов Lab и подтверждённые контакты. Three.js — необязательное улучшение; содержательный HTML/CSS доступен и без него.",
			},
		],
		architecture: [
			{
				en: "Next.js App Router and React Server Components keep content rendering separate from targeted client interactions. Locale-prefixed URLs share stable project slugs; a language switch keeps the current route. Reviewed static records supply Home summaries, case narratives, About and Experience without a database or CMS dependency.",
				ru: "Next.js App Router и React Server Components отделяют рендеринг контента от отдельных клиентских взаимодействий. URL с locale prefix используют общие slug проектов; переключение языка сохраняет текущий маршрут. Проверяемые статические записи питают Home, кейсы, About и Experience без зависимости от базы данных или CMS.",
			},
			{
				en: "Performance and accessibility are implementation constraints: lazy optional scenes, real screenshot availability, reduced-motion fallbacks, semantic controls, keyboard navigation and automated checks. Engineering is AI-assisted through Codex under Dmitry’s product direction and review; this is not a claim of manually authoring every line or of unreviewed autonomous delivery.",
				ru: "Производительность и доступность — ограничения реализации: lazy-загрузка необязательных сцен, только реальные доступные скриншоты, reduced-motion fallback, семантические элементы, клавиатурная навигация и автоматические проверки. Codex помогает с разработкой под продуктовым руководством и проверкой Дмитрия; это не утверждение о ручном написании каждой строки или непроверенной автономной разработке.",
			},
		],
		results: [
			{
				en: "The result is a tested application foundation and reviewable public content, with documented decisions, browser QA and CI. The project is still in progress. CMS, Supabase, analytics, AI Portfolio Agent and Telegram Portfolio Bot remain future work, not current features. Production indexing and external hosting are not enabled by this content phase.",
				ru: "Результат — проверенная основа приложения и публичный контент для review, с документированными решениями, browser QA и CI. Проект остаётся в разработке. CMS, Supabase, аналитика, AI Portfolio Agent и Telegram Portfolio Bot — будущая работа, не текущие функции. Этот контентный этап не включает production-индексацию или внешний хостинг.",
			},
		],
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Tailwind CSS",
			"Three.js",
			"React Three Fiber",
			"Drei",
			"Vitest",
			"Playwright",
		],
		media: {
			device: "MacBook",
			caption: {
				en: "Real desktop Home captured on 6 October 2026 at the accepted earlier baseline. Not a current full-page content capture.",
				ru: "Реальный desktop Home от 6 октября 2026 года на принятом раннем baseline. Не актуальный снимок всего контента страницы.",
			},
		},
		links: [
			{
				label: { en: "Public source repository", ru: "Публичный репозиторий" },
				href: "https://github.com/Dmitrii-front/my-portfolio",
			},
		],
	},
};
