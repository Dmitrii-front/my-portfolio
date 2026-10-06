# PORTFOLIO 2026 — Техническое задание v1.0

*Production portfolio platform • Mobile-first • CMS • AI Agent • Analytics • 3D interactions*

**Статус:** baseline для начала разработки.  
**Дата:** 06.10.2026.

## 1. Цель продукта

- Создать production-портфолио Дмитрия, которое одновременно работает как персональный сайт, демонстрация продуктового мышления и инженерных компетенций, CMS для управления контентом и площадка для технических экспериментов.
- Портфолио не должно выглядеть как типовой developer template или статичное резюме. Публичная часть должна быть визуально премиальной и простой, а техническая часть — показывать полноценную архитектуру: 3D, адаптивность, CMS, API, AI-agent, аналитику, SEO, безопасность и аудит действий.
- GitHub является source of truth с первого коммита. Preview/Sites должен собираться из того же репозитория; независимой второй версии кода быть не должно.

## 2. Основные принципы

- Mobile-first: интерфейс проектируется сначала для мобильного устройства, затем расширяется для tablet и desktop.
- Progressive enhancement: базовый сайт обязан оставаться быстрым и понятным без тяжёлых 3D-эффектов; 3D и сложная анимация подключаются поверх рабочей основы.
- Один непрерывный near-black canvas на Home без визуально склеенных секций. Локальные violet/blue/emerald glow используются около объектов, а не как постоянный фон.
- Контент должен редактироваться через /admin без изменения исходного кода.
- Все значимые действия администратора и AI-agent должны быть прослеживаемыми через Audit Log.
- Не раздувать v1 блогом, комментариями, аккаунтами посетителей, сложным page builder или собственным файловым менеджером.

## 3. Публичная структура

- / — Home.
- /projects — каталог проектов.
- /projects/[slug] — полноценный case study.
- /lab — эксперименты и интеграции.
- /about — профиль, подход, компетенции.
- /experience — опыт и профессиональная история.
- /contact — контакты и доступные способы связи.
- RU/EN локализация публичного интерфейса. Архитектура должна позволять добавить дополнительные языки позднее.

## 4. Home — Hero

- Header: DMITRY; Work, Lab, About, Contact; язык RU/EN; компактная информация о локации/времени допускается только если не создаёт визуальный шум.
- Основной headline: «I build digital products from idea to production.» Короткий supporting copy и CTA Explore my work / About me.
- Current Focus: SaaS / AI / Healthcare / FinTech — значения должны редактироваться из CMS.
- Справа/ниже располагается интерактивный Product Hub из rounded 3D blocks: IDEA, DEVELOPMENT, PRODUCTS, AI, REAL USERS.
- При появлении сначала проявляется PRODUCTS, затем связи и внешние узлы с последовательной задержкой. После — спокойный idle floating.
- Каждый внешний узел интерактивен. Hover/tap подсвечивает соответствующую связь, приглушает остальные узлы и раскрывает короткое содержимое узла.
- PRODUCTS — центральный hub. По активации внешние узлы расходятся, PRODUCTS раскрывается и показывает реальные featured projects. Выбор проекта ведёт к соответствующему проекту в Selected Work.
- Связи между узлами имеют редкие мягкие световые импульсы. На desktop допускается небольшой 3D tilt 2–4°. На touch tilt по курсору отсутствует.
- При уходе из Hero внешние узлы растворяются, а визуальная neon-line логически продолжается из Product Hub к Selected Work.

## 5. Home — Selected Work

- Ключевая механика: одна sticky 3D-сцена устройства, а не отдельное устройство для каждого проекта.
- Desktop: слева scroll narrative текущего проекта; справа закреплённое 3D-устройство. При переходе между шагами меняются текст и экран устройства. После последнего проекта sticky-сцена освобождается.
- Device switcher: MacBook / iPad / iPhone. Переключение сохраняет текущий проект и меняет оболочку устройства с плавной трансформацией/переходом.
- CMS хранит desktop/tablet/mobile screenshot для каждого проекта и список доступных устройств. Если конкретный вариант отсутствует, он не предлагается.
- Home показывает только короткий narrative: номер проекта, название, короткий тезис, описание и View case study. Детали находятся в case study.
- Первоначальные featured projects: Pnlwise, Healthy, Portfolio; дальнейший состав и порядок полностью управляются CMS.
- Переход между проектами не должен создавать scroll-jacking. Native scrolling сохраняется.

## 6. Home — Lab

- Горизонтальная лента экспериментов на Home и отдельная страница /lab.
- Desktop: trackpad/wheel-friendly horizontal interaction, drag и стрелки. Mobile/tablet: естественный swipe.
- Карточки добавляются без изменения layout через CMS.
- Примеры: Kyrgyzstan Payment Integration, AI Portfolio Agent, PDF Parser, Telegram Bot. Это стартовые идеи, а не жёстко зашитые сущности.

## 7. Home — Contact

- Финальный CTA: «Have a project in mind?» и одна основная кнопка Contact me.
- При активации Contact me раскрывает radial menu: Telegram, LinkedIn, GitHub, Email. Элементы появляются последовательно по дуге примерно 160–200°, а при закрытии собираются в обратном порядке.
- Desktop/tablet: radial arc в свободную область. Mobile: компактный веер вверх/диагонально или адаптивная вертикальная floating-композиция, если радиальный вариант не помещается.
- Не дублировать одновременно несколько конкурирующих CTA типа Let's talk + Contact me.

## 8. Непрерывная neon-line

- Одна смысловая линия проходит через Home и визуально связывает Hero → Selected Work → Lab → Contact.
- Линия не должна выглядеть случайной декорацией. Она символизирует путь от идеи к работающему продукту.
- Цветовая логика: violet/blue в Hero и Pnlwise, blue/emerald для health/experiments, затем возврат к violet/blue. Переходы плавные.
- Допускается scroll-progress illumination и медленный travelling pulse. Анимация должна быть спокойной и отключаемой при prefers-reduced-motion.

## 9. Responsive

- Базовые диапазоны: mobile 320–767; tablet/compact 768–1199; desktop 1200+. Использовать fluid sizing/container queries там, где это лучше фиксированных breakpoint.
- Mobile: вертикальный Hero; компактный Product Hub; Selected Work — текст и устройство в последовательной композиции, default device iPhone; Lab swipe; Contact адаптивный radial/fan menu.
- Tablet: split layout при наличии места; default device iPad; sticky Selected Work допускается при достаточной высоте viewport.
- Desktop: полноценный 2-column Hero, cursor interactions, sticky Selected Work, default device MacBook.
- Нельзя просто масштабировать desktop вниз. Mobile является отдельной продуманной композицией.

## 10. Case Study

- Структура: hero/summary, problem, role, solution, architecture, key decisions/trade-offs, challenges, implementation, gallery/device screenshots, results, what could be improved, links.
- Поля должны быть структурированными и управляться CMS. Не требовать заполнения вымышленных метрик.
- Поддержать draft, preview, published, archived.

## 11. Admin CMS

- /admin защищён аутентификацией и не индексируется.
- Overview: ключевые метрики, последние изменения, drafts, популярные проекты, contact conversions.
- Projects: CRUD, статус, featured, порядок, slug, title, short description, case-study sections, technologies, links, device screenshots, gallery, SEO.
- Lab: CRUD экспериментов, icon/media, description, stack/tags, links, publish/order.
- Homepage: hero copy, Current Focus, Product Hub copy, featured projects/order, selected content.
- About/Experience/Content: редактирование структурированного контента.
- Media: загрузка и выбор изображений; без попытки строить полноценный Google Drive.
- SEO: title, description, OG image, canonical/robots controls на уровне сущности.
- Settings: social links, contact data, locale defaults, site settings.
- Audit Log: actor, action, entity, entity id, timestamp, summary/diff metadata.

## 12. AI Agent и долговременная память проекта

- Codex/AI-agent должен работать не как одноразовый исполнитель, а как участник проекта с файловой долговременной памятью.
- Obsidian vault проекта является обязательным источником контекста. Перед началом каждой значимой задачи агент обязан прочитать корневые правила проекта и релевантные заметки, а не полагаться на память текущего чата.
- Агенту разрешается создавать, обновлять и реорганизовывать заметки проекта, если это улучшает восстановление контекста. Изменения должны быть осмысленными, а не превращать vault в лог каждого шага.
- После завершения значимого блока агент обновляет состояние проекта: что сделано, какие решения приняты, какие риски/долги появились, что делать дальше.
- Рекомендуемая память: PROJECT.md/README для карты проекта; DECISIONS.md для ADR-подобных решений; CURRENT_STATE.md; TODO/NEXT; RISKS; CHANGELOG/SESSION_LOG с краткими итогами; отдельные notes по architecture/design/admin/analytics при росте проекта.
- Если существующий WorkHub/Obsidian уже содержит подходящую структуру, агент должен сначала изучить её и встроиться в неё, а не создавать параллельную систему.
- В репозитории должен быть AGENTS.md (или эквивалентный файл инструкций), который заставляет Codex: читать project memory до работы; проверять git status; не менять решения молча; обновлять память после работы; выполнять проверки; коммитить законченными блоками.
- AI Agent API продукта отделён от доступа Codex к рабочей среде. Product AI Agent получает scoped permissions: read, create/update draft, media upload, analytics read. Publish/delete/auth/payment-secret changes по умолчанию запрещены.
- AI-generated content сначала создаётся как draft, если явно не разрешено иное. Все действия Product AI Agent попадают в Audit Log.

## 13. Analytics

- Использовать privacy-conscious product analytics. Стартовый кандидат: PostHog, но интеграция должна быть изолирована adapter/service layer, чтобы аналитический провайдер можно было заменить.
- События v1: page_view, hero_node_open, hero_product_select, selected_work_view, project_change, device_switch, case_study_open, lab_item_view, lab_item_open, contact_menu_open, contact_channel_click, cv_download, language_change.
- Admin Overview: visitors, sessions, top projects, case-study opens, contact menu opens, contact channel clicks, CV downloads, device interactions, traffic sources, engagement.
- Основной funnel: Visit → Selected Work → Case Study → Contact menu → Contact channel click.
- Не использовать fingerprinting или попытки деанонимизировать посетителей.

## 14. Технический стек

- Frontend/App: Next.js + TypeScript.
- Styling: Tailwind CSS; reusable design tokens/components. shadcn/ui допустим точечно в admin, но не должен определять внешний вид публичного сайта.
- Motion: Motion для UI/scroll transitions.
- 3D: Three.js + React Three Fiber + Drei только там, где 3D действительно нужен: Product Hub и Device Showcase.
- Data/Auth/Storage: Supabase PostgreSQL + Supabase Auth + Supabase Storage.
- ORM/schema/migrations: Drizzle ORM.
- Analytics: PostHog через собственный analytics adapter.
- Deployment: GitHub-driven preview/production. Конкретный production host (Vercel Pro или Cloudflare) окончательно выбирается перед cutover на основе требований и стоимости; код не должен искусственно привязываться к одному провайдеру.

## 15. GitHub и workflow

- Репозиторий: Dmitrii-front/my-portfolio.
- Существующую историческую версию сохранить tag/branch как portfolio-2023 перед заменой main новой версией.
- GitHub — единственный source of truth. Preview/Sites всегда строится из GitHub commit.
- Небольшие осмысленные commits после завершённых блоков. Push регулярно, чтобы удалённый репозиторий не отставал от рабочей копии.
- Никаких secrets/API keys в Git. Обязательны .env.example и документация переменных.
- Schema/migrations, конфигурация, тесты и документация хранятся в репозитории.
- README содержит setup, scripts, environment, architecture summary, deployment и ссылки на project memory.
- Перед destructive git operations агент обязан проверить последствия. Не переписывать историю main без явной необходимости.

## 16. Performance и accessibility

- Первый экран не должен ждать загрузки Three.js. HTML/CSS/content отображаются первыми; 3D lazy-load.
- Одновременно активно рендерится только необходимая 3D-сцена/устройство. Не держать три полноценных device scenes ради switcher.
- Оптимизированные GLB/glTF, Meshopt/Draco по необходимости, разумные texture sizes, AVIF/WebP для screenshots.
- Adaptive DPR/quality tiers для слабых устройств. WebGL failure → качественный статический fallback.
- prefers-reduced-motion обязателен. Keyboard navigation и visible focus обязательны для интерактивных элементов.
- Semantic HTML, alt text, контраст, touch targets и отсутствие критичных interactions только по hover.

## 17. SEO и metadata

- SSR/SSG там, где это полезно. Уникальные title/description/OG для основных страниц и case studies.
- sitemap.xml, robots.txt, canonical URLs, Open Graph/Twitter metadata, structured data где уместно.
- Draft/admin страницы не индексируются.

## 18. Security

- Admin доступ только авторизованному владельцу. Server-side authorization для write operations.
- Row-level/security policies для Supabase должны быть минимально необходимыми; public client не получает write-доступ к административным таблицам.
- Uploads валидируются по типу/размеру. Secrets только server-side.
- Agent tokens scoped, revocable и по возможности hashed at rest. Rate limiting для чувствительных endpoints.
- Audit log для admin/agent mutations. Никаких секретов или приватных payload в analytics.

## 19. Тестирование и QA

- Unit tests для критической бизнес-логики/форматирования/permissions.
- Integration/API tests для admin mutations и agent permissions.
- E2E smoke: Home, navigation, project switch, device switch, case study, contact menu, login/admin, create draft/publish.
- Responsive QA минимум на representative mobile/tablet/desktop viewports.
- Performance regression check перед production. Проверка reduced motion и WebGL fallback.
- Каждый законченный этап должен проходить lint, typecheck, tests и production build.

## 20. Этапы разработки

- Phase 0 — сохранить portfolio-2023, создать новую основу, AGENTS.md, project memory, env/schema conventions, CI checks.
- Phase 1 — design system + mobile-first public skeleton + navigation/localization.
- Phase 2 — Home mobile: Hero Hub, Selected Work, Lab, Contact, neon-line fallback.
- Phase 3 — tablet/desktop responsive + sticky Selected Work.
- Phase 4 — 3D Product Hub и Device Showcase + performance fallbacks.
- Phase 5 — Projects/case studies/Lab/About/Experience.
- Phase 6 — Supabase schema/auth/storage + Admin CMS.
- Phase 7 — AI Agent scoped API + Audit Log + Obsidian/Codex operating rules.
- Phase 8 — Analytics/events/funnel/admin metrics.
- Phase 9 — SEO, accessibility, security, performance, QA.
- Phase 10 — production deployment/cutover and documentation.

## 21. Definition of Done v1

- Публичный сайт полностью работает на mobile/tablet/desktop и не зависит от 3D для базовой доступности.
- Контент проектов/Lab/Home можно менять через admin без изменения кода.
- Selected Work использует одну sticky device scene и корректно меняет project/device.
- Product Hub интерактивен и связан с реальными featured projects.
- Contact radial menu работает мышью, клавиатурой и touch.
- RU/EN работает на основных публичных страницах.
- Analytics события и funnel проверены.
- AI-agent имеет scoped draft workflow и audit trail.
- GitHub содержит полную актуальную версию, migrations, env example, tests и документацию.
- Codex может открыть проект в новой сессии, прочитать project memory/AGENTS.md и восстановить текущее состояние без пересказа всей истории пользователем.
- Production build проходит lint/typecheck/tests; отсутствуют критические accessibility/security/performance проблемы.

## 22. Правило изменения ТЗ

- После старта разработки v1.0 является baseline. Новые идеи не внедряются молча: агент фиксирует change request/decision в project memory, оценивает влияние на scope и только затем реализует после подтверждения, если изменение заметно влияет на архитектуру, UX или сроки.
- Мелкие визуальные и контентные правки допускаются в обычном рабочем потоке, но итоговое решение должно быть отражено в соответствующей заметке проекта.

---

## Рекомендуемое размещение в проекте

- `docs/PORTFOLIO_2026_SPEC.md` — эта спецификация.
- `AGENTS.md` — обязательные правила работы Codex.
- Obsidian/WorkHub — долговременная память: current state, decisions, risks, next actions.
- GitHub — source of truth для кода и versioned project documentation.