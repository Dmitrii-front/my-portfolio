# Canonical content — Phase 5.0 / 5.1

Owner authorization and inspection: 2026-10-12. Static content for review, not a commercial launch or indexing approval. D-016 implements the first content block; the Phase 5 preparation remains a dated proposal, not current runtime status.

## Ownership / public projections

| Source | Owns / consumers |
| --- | --- |
| `src/lib/projects.ts` | Shared slugs, names, localized summaries/category/role/status/ownership/responsibilities, precise periods and confirmed team sizes. Home, Hub identities, index, cases, Experience projections |
| `src/lib/project-case-studies.ts` | Optional narrative groups, shared technology names, review readiness, manifest device reference/caption, approved source link. Server route only; no long case narratives in Home client graph |
| `src/lib/profile.ts` | Approved positioning, short Hero copy/Focus, About/approach, evidence-linked capabilities and education. No inferred location/seniority/language proficiency/availability |
| `src/lib/experience.ts` | Two project references plus KGanimation/KOL and minimal freelance entries. Projects own their role/date facts; no dentistry job in technology chronology |
| `src/lib/home-content.ts` | Four localized Lab concepts with explicit `concept` maturity, plus existing interaction copy/device controls; Home and Lab route share records |
| `src/lib/project-screens.ts`, `site-config.ts` | Existing audited image manifest and confirmed channels, reused rather than copied |
| `src/lib/content.ts`, `dictionaries.ts` | Small shared content labels/date formatting and site UI/editorial copy; no content framework, CMS adapter or provider |

Facts use shared IDs/slugs/dates/technology names/URLs; narrative/roles/status/captions/alt/metadata are EN/RU. No whole-case EN fallback. Year-only and month-level precision are retained. Cases are `ready-for-review` in both locales, not release-certified. Future KG extends locale configuration/translations, not routing. Private evidence and unresolved claims stay in documentation, not public content records or client payloads.

Home only changes copy/projections. `REAL USERS` becomes `USER NEEDS` (RU `ЗАДАЧИ ЛЮДЕЙ`): approach, not traction. Hub geometry/event handling, Work pinning/controls, models, Neon, Contact and Home stylesheet are untouched. Inner pages reuse existing heading/section/list/link patterns; minimal accommodations size an actual case image/caption and separate adjacent About links using existing spacing utilities. No new routes, gallery, filters, effects, packages or infrastructure.

## Evidence and claim classification

**USER APPROVED** means authoritative owner facts supplied in this task, not independently certified employment. **VERIFIED** specifies inspected code/document scope, not business success or field certification.

| Classification | Facts / source / restriction |
| --- | --- |
| USER APPROVED | Full-Stack / Product Developer; development since 2023; KRSU Dentistry 2012–2017, residency 2017–2019, dentist 2017–2021. Institutional expansion/residency institution not verified; use only KRSU. No public approved CV found in the scoped Portfolio notes / named vault-file inventory |
| USER APPROVED | Pnlwise: Founder + Full-Stack Developer, Sep 2026–present; sole owner/developer. Healthy: Founder / Product Manager / Medical Consultant, Mar 2026–present, team4; planning/analysis/coordination/domain expertise/investor work/legal coordination. Nearly complete MVP, refinement only, no public launch; participants are test participants |
| USER APPROVED | KGanimation — KOL project, one Team Lead Frontend record Apr–Dec2025. Freelance Development 2023–2025 only; no clients/stack/achievements. Portfolio: Dmitry owns direction/requirements/architecture/visual acceptance/QA; Codex engineering assistance, reviewed through decisions/tests/browser QA/CI |
| VERIFIED — Pnlwise code | Read-only clean `Money from PET` repository at `2ba3238377c9481ceae438e7ea87e3abda6473f5`; README/package, `lib/ai-core.ts`, `ai.ts`, `report-workflow.ts`, `domain.ts` calculation signatures, `ai-classification.ts` schema, `export-access.ts`, export route and Paddle webhook route. Upload→review→P&L/report implementation, optional configured categorization with rules/manual fallback, PDF/XLSX/CSV export branch and server access gate. No provider calls, credentials, private payloads or fresh Pnlwise test run |
| VERIFIED — Pnlwise documentation | README documents deterministic integer-cent boundary, input limitations, Cloudflare Workers/D1/Vinext, Paddle sandbox/Live cutover restrictions. Described as implementation/documented boundaries, not fresh deployment/provider/security certification. No public Pnlwise source/live link authorized or added |
| VERIFIED — Healthy documentation | Read vault `Healthy/AGENTS.md`, `PROJECT_OVERVIEW.md`, `00_core/MVP_Definition.md` and selected `04_Tech` notes. Current overview distinguishes API implementation/partial/deferred scope and React/NestJS/PostgreSQL. Older Stack/Backend/Frontend notes contain Prisma/AI/Storage/future scope conflicting with current overview. Omit disputed specifics; case explicitly labels architecture as documentation-backed, not independent service audit |
| VERIFIED — Portfolio | Actual repo/main/code/config/decisions/manifest and fresh local QA. EN/RU, native Work, progressive Three enhancement, accessible fallbacks, canonical static content, tests/CI; no provider deployment claimed. Existing imagery provenance unchanged (`PROJECT_ASSETS.md`) |
| NEEDS USER INPUT | Detailed KGanimation/KOL contribution/results and freelance clients/responsibilities; residency institution/full verified university name; optional approved CV/language/location/availability; Pnlwise/Healthy approved public links and sanitized deeper workflow evidence; final EN/RU editorial review |
| FUTURE / NOT IMPLEMENTED here | CMS/Supabase/Drizzle/Admin/auth/analytics/AI Portfolio Agent/Telegram Portfolio Bot/payment integrations, indexing/sitemap/structured data/external hosting. Pnlwise payment/AI implementation belongs to Pnlwise, never imported as Portfolio runtime |
| PRIVATE | Credentials, account settings, financial statements, patient data, internal investor/legal details and private repositories. No such records copied into public content or artifacts |
| DO NOT CLAIM | Users/customers/revenue/traction/production appointments, screenshot catalog counts as adoption, sample P&L as business metrics, old roadmap targets as results, universal PDF support, live commercial payment activation, sole Healthy engineering authorship, every Portfolio line manually written, unsupported seniority/skills/employers |

Healthy owner confirmation governs current launch/MVP status over dated documentation targets. Generic Lab Telegram Bot remains distinct from the backlog Telegram Portfolio Bot; no parser/payment/agent/bot runtime is implied by its title. No inferred Portfolio start date or team size.

## Validation and remaining scope

`content.test.ts`: unique IDs, bilingual required values, case/Project/media relations, exact chronology/team/role boundaries, review readiness, concept maturity, safe links and a small forbidden-claim regression guard. Existing image tests validate actual derivatives. The regex is not semantic verification: manually review changed copy against the matrix above before publication.

`content.spec.ts`: EN/RU routes, no placeholder case/experience copy, four Experience records, source links and rendered case images, axe, internal href resolution and overflow at375/768/1024/1440. Existing full E2E retains locale/no-JS/keyboard/3D/Work/Neon/Lab/Contact behavior. `scripts/phase5-content-review.mjs` writes ignored `artifacts/phase5-content/`; stable reduced-motion captures are reading evidence, not new canonical project screens. Physical-device/Safari/assistive-technology and final editorial/visual acceptance remain release work.

Next is owner review and a separately scoped content refinement/evidence task. Further case process/challenge examples, CV, additional media and distribution review (5.8) are not auto-started. No metrics/empty headings are added to compensate for unavailable evidence.
