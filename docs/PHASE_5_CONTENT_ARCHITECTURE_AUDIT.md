# Phase 5 preparation — content and information architecture

Date: 2026-10-12. Inspected baseline: `0ac6327672ff4953c6aa7b8143a46aa6978aac9a`; application unchanged since `0c6fca8`. D-015 accepts the **strategy**, not every proposal below. Analysis/planning/documentation only; Phase 5 implementation NOT STARTED.

**Subsequent implementation:** Owner authorized Phase 5.0 / 5.1 and supplied P0 facts in a later task on2026-10-12 (D-016). Canonical content now renders Home/index/cases/About/Experience. Current facts/answers/claim limits/gaps: CANONICAL_CONTENT.md; handoff: CURRENT_STATE.md. Matrices below remain the preparation snapshot, not a claim that implementation is still absent. Later stages/CMS/backend/publication require separate authorization.

## A. Executive summary / evidence rules

Freeze/reuse the existing Hero, Hub, Work, MacBook, Lab, Contact, Neon and responsive/3D foundation. This is neither rejection nor final visual acceptance. No more presentation polishing now. Priority: structure → IA → real content → useful assets → complete working public site → distribution/layout review → final visual polish.

The current seven localized content routes are sufficient; no new pages, filters, blog, skill catalog, separate CV page or Lab-detail route is justified yet. The main blocker is credible project/profile evidence, not another layout. Keep technical case-study details deeper than Home and reuse approved facts rather than repeat identical paragraphs.

Fact classifications throughout the preparation:

- **VERIFIED:** directly inspected code/docs/media or a clearly attributed owner confirmation. Record source/date/scope. Seeing a screenshot verifies the captured UI, not its backend, real users, revenue or Dmitry's responsibility.
- **NEEDS USER INPUT:** a known required missing fact/approval; questionnaire R owns all questions, referenced elsewhere without duplicates.
- **UNKNOWN:** no reliable evidence in the scoped Portfolio sources. Do not silently turn an existing marketing sentence into fact.
- **NOT APPLICABLE:** owner/evidence confirms a field does not apply; absence alone is UNKNOWN, not N/A.

IA/model/stages are **PROPOSED**, not implemented. Never publish unknown fields, invented metrics, roles, seniority, dates or AI/backend claims. Qualitative verified outcomes can make a credible case; metrics are optional.

## B. Recommended IA / audience paths

| Visitor | First question | Evidence path | Current gap |
| --- | --- | --- | --- |
| Employer | Which role could Dmitry fill, and what did he personally deliver? | Home → relevant case → Experience / CV → Contact | Role/ownership, chronology and CV absent |
| Freelance client | Can he solve my kind of problem and finish the work? | Home → Projects → case problem/contribution/outcome → Contact | Scope, shipped state and contribution unverified |
| Technical recruiter | What technologies did he actually use, in which context? | Projects / Experience → case technical facts → About / CV | No canonical capabilities linked to evidence |
| Partner | How does he think, collaborate and own a product? | About → case decisions/team context → Contact | Background, collaboration boundaries and ownership absent |
| Experience evaluator | What is real versus concept, screenshot or future plan? | Projects → implementation/evidence; Lab → explicit maturity | Concepts and screen captures must not be treated as shipped products |

Recommended browse order in content, not a navigation redesign: identity/value → project evidence → human context/chronology → contact. Preserve routes and existing navigation in this task. Experience is currently discoverable in the footer; later About-to-Experience/CV links can improve its information relationship without inventing a new route.

## C. Route responsibility map (EN/RU)

`/` is a locale redirect, not a duplicate Home. Content lives at `/en` and `/ru`; D-006 remains unchanged. The table applies to both localized variants.

| Route | Purpose / audience / question | Actual content / missing | Duplication / content that belongs elsewhere | CTAs / relationships / necessity |
| --- | --- | --- | --- | --- |
| `/` | All visitors; reach the right locale | Saved preference/browser/EN redirect is implemented | No independent copy, SEO landing or geolocation | Redirect only; necessary utility |
| `/{locale}` | All; who/what, strongest proof and next step | Generic positioning, Focus, Hub, 3 project summaries/screens, 4 Lab concepts, Contact; missing approved role/context | Current same project sentence reused in index/case; repeated product-thinking slogans. Full process, chronology, stack lists and biography belong deeper | Existing Work/About/case/Lab/Contact destinations; necessary overview |
| `/{locale}/projects` | Recruiter/client/evaluator; which project is relevant? | Names/category/one-line summaries; missing role, period/status and evidence-led comparison | It should summarize, not paste each case. Same canonical facts, distinct short editorial summary | Open case; Contact as secondary exit; necessary browseable index even with3 projects; no filters needed |
| `/{locale}/projects/[slug]` | Employer/client/partner; what problem, role, decisions and proof? | Five generic placeholder sections and repeated summary; missing real story/ownership/technical details/outcome | Own project depth; do not duplicate About biography or entire Experience chronology. Replace repeated `caseBody` boilerplate later | Back to index, approved live/source links where available, discuss relevant work; necessary for each credible project |
| `/{locale}/lab` | Technical/partner; what is being explored and how mature is it? | Heading/pending message; four concepts only on Home | Own hypothesis/maturity/evidence; Home is preview, not copy of every entry. Production case studies belong Projects | Project-related links and real demos only if verified; Contact optional for collaboration. Useful but secondary, not essential to employment proof; curate concepts, no forced new detail pages |
| `/{locale}/about` | All, especially partner; who is Dmitry and how does he work? | Generic intro/approach; no verified background/strengths/transition | Own human positioning and short professional bridge. Jobs/dates belong Experience; project technical depth belongs cases | Relevant cases, Experience/CV if ready, Contact; necessary human context |
| `/{locale}/experience` | Employer/recruiter; where/when/in what responsibility? | Pending chronology | Own canonical role records and education/selected achievements. Link projects instead of retelling cases; CV is a projection of these facts | Cases, verified CV, Contact; conditionally justified by real distinct chronology. Keep current route; if owner has no such content, agree honest project-based scope or a future merge explicitly, never delete silently |
| `/{locale}/contact` | Qualified visitor; how to reach him? | Four confirmed links and generic intro; no confirmed availability | Repeat usable channels, not About/whole service sales pitch. GitHub is evidence, not the principal conversation action | Telegram/Email primary candidates, LinkedIn employer context, GitHub source; necessary shareable/deep-link destination |

No route changes are approved by this proposal. No new CTA behavior, form or contact flow is implemented.

## D. Home content responsibility

| Existing section | Owns | Needs / must not claim | Deeper destination |
| --- | --- | --- | --- |
| Hero | Concise approved professional identity/value, relevant Focus and existing entry CTAs | Q01/Q02; interest is not expertise. No unsupported seniority/years or autobiography | About; Work |
| Hub | Compact areas/approach/capabilities and project entry navigation | Keep current interactions. AI/REAL USERS labels are not proof of an implemented Portfolio AI agent or real usage of each project | Evidence-bearing cases; About working approach |
| Selected Work / MacBook | Strongest project entry points: problem/value, honest contribution cue when approved, real preview, case target | Existing layout stays. Do not put full tech/process/result narrative into sticky text or force long prose into its bounds | Canonical case study; Projects index |
| Lab | A small preview of curated exploration with explicit maturity | Current four entries are CONCEPT in this repository, not shipped integrations | Lab |
| Contact | One clear invitation and existing channels | Availability/service promises only if confirmed; no competing form/CTA | Contact route for shareable details |
| Neon | Visual journey only | Frozen; not content inventory, not evidence, no new headings/sections to fill space | None |

Current duplication: the same `dictionary.projects[slug]` appears in Work, index and case hero; this is shared data, not three separately maintained records, but the editorial depth is identical. Later use one Project aggregate with approved `shortSummary` and case narrative, not copied facts. Hero/supporting/Approach/footer repeat generic product-thinking phrases; consolidate their meanings during authorized content cleanup, not here. Home and Contact repeating channel links is purposeful, not a reason to invent another conversion mechanism. No obvious excessively long Home copy; the real issue is specificity and evidence. All public copy remains unchanged now.

## E. Canonical Project / Case Study proposal

One Project aggregate with a nested case study is enough for Phase5; separate ProjectCaseStudy storage is unnecessary until there is a real independent lifecycle. No database schema, interfaces or application files are created.

| Group | Proposed fields | Fact state / publish rule |
| --- | --- | --- |
| Identity | Stable id/shared slug, name, project type/category, short summary, long description, product status, timeframe | Name/slugs exist; Pnlwise/Healthy timeframe/status/type beyond category need input. Product maturity and editorial publication state are separate |
| Role | Dmitry's role, responsibilities/deliverables, ownership boundary, collaborators/team/context | Do not infer founder/sole author/full-stack from Git authorship, screenshots or title. Allow explicit solo context when confirmed |
| Problem | Target user, actual pain/task, business/product context | Screenshot marketing is capture evidence, not validated discovery/customer research |
| Solution | What was actually built, core functions, own contribution, product decisions | Distinguish functioning features, UI previews, and roadmap. Label the captured state accurately |
| Process | Relevant discovery/planning/design/development/testing/iteration and participation | Optional stages; never fabricate a complete UX research process because the model lists it |
| Technical | Stack actually used, architecture, owned API/services/integrations, important decisions and trade-offs | Portfolio stack verified; others UNKNOWN. Link decisions to constraints/evidence; not a tool-logo inventory |
| Challenges | Real constraint/problem, chosen approach, alternatives/trade-off | At least one concrete example supports credibility; do not manufacture difficulty/scale |
| Results | Delivered outcome/current state, optional verified metric with source/date/unit/context, lessons/improvements | Successful build/working artifact is a technical outcome; not users/revenue. Omit unavailable metrics; separate planned improvements |
| Media | Approved hero/reference capture, device-specific screens when useful, supporting evidence, optional diagram | Each has provenance, capture date/view/device, dimensions/variants, alt/caption, privacy/publication status. Hero may reuse current capture; no mandatory separate asset |
| Links | Case target from slug, owner-approved live/source/resource links | Live URLs/private repositories currently unknown for Pnlwise/Healthy; no guessed domain or dead placeholder |
| Editorial | Draft/ready-for-review/published/archived intention, EN/RU review readiness, field evidence/approval checklist | Simple internal checklist, not an evidence database. Public outputs exclude private notes, UNKNOWN facts and unapproved metadata |

Minimum credible case gate: identity + problem/user + exact role/ownership + actual delivered solution/status/timeframe + attributable technical facts + at least one decision/challenge + verified qualitative outcome + one approved evidence item + owner review. Metrics, tablet/mobile captures, a logo, diagrams and a live link are **not mandatory** when absent/unhelpful. NOT APPLICABLE must be explicit, e.g. confirmed no public source link. Unknown optional fields are omitted, not fabricated.

## F. Pnlwise content gaps

VERIFIED in Portfolio sources: name `Pnlwise`, slug `pnlwise`, category FinTech; desktop Home capture shows statement-upload / sample P&L presentation. Inspected WebP; sample financial figures are not project revenue/results. Sources: `projects.ts`, `project-screens.ts`, `PROJECT_ASSETS.md`. Three optimized desktop size variants are one logical screenshot, not three product screens.

Existing text says "AI-assisted P&L" in dictionaries; this is **verified existing copy**, not verified AI/backend implementation. No Pnlwise source/API/architecture, personal role, team, timeline, deployment, customer data or metrics exists in the scoped Portfolio repository/docs. UNKNOWN beyond captured UI; use Q04/Q05 and optional Q11 evidence. No other project's private vault/repository was silently treated as authoritative Portfolio content.

| Surface | Proposed content after confirmation |
| --- | --- |
| Home | Short target-task/value statement + own contribution cue + existing screen + case CTA; no unsupported AI claim |
| Projects index | Short summary, approved role/type/status/period and case link; no full upload/financial narrative |
| Case | User/problem, owned delivery, actual upload/review/report flow, confirmed stack/AI mechanism if real, constraint/decision, outcome, public evidence and approved links |

Missing useful evidence: a sanitized actual workflow/output example if it materially explains the implementation; responsive captures only if a real responsive experience exists and is worth showing. No bank/account/private transaction material requested.

## G. Healthy content gaps

VERIFIED: name/slug `healthy`, category Healthcare, public desktop Home capture with doctor search and booking-introduction copy. The phone illustration inside that desktop screenshot is not a verified mobile product screenshot. Captured catalog count is not a current operational/traction metric. Three desktop variants exist. Sources: the same manifest/asset docs and inspected media.

Existing summary describes connecting patients/doctors/clinics; verified as text, not proof of delivered clinic workflows or real appointments. No actual Healthy stack/backend/API, responsibility/team, dates, launched functions, usage/outcomes or public live/source links is verified here. Do not infer Supabase from the Portfolio's future stack or patient-data functionality from the image. Q06/Q07 unlock the case.

| Surface | Proposed content after confirmation |
| --- | --- |
| Home | Approved healthcare user/task + contribution cue + current screen + case CTA |
| Projects index | Role/status/period/type plus concise relevant summary |
| Case | Exact patient/doctor/clinic scope implemented, problem/context, Dmitry's responsibilities, architecture/constraints, verified outcome and sanitized supporting screens |

Useful extra evidence may be actual search→profile→booking behavior, but only if implemented/publicly shareable. Never obtain or publish patient records, private contacts or administrative medical data merely to fill a gallery.

## H. Portfolio 2026 content gaps

VERIFIED: personal Portfolio product intent in spec; public repository `Dmitrii-front/my-portfolio`; preserved 2023 history; phase commits and code through4.2; EN/RU routing, mobile-first shell, native scene, procedural optional 3D, failures/a11y/testing/CI, documented decisions/assets/memory. Source capture is real Home at `520c961` (2026-10-06); current app baseline `0c6fca8`. `AUDIT_2026-10-12.md` distinguishes delivered foundation from unstarted CMS/agent/analytics/hosting. No need to ask again for the stack, verified tests, locale decision, asset origin or current feature status.

NEEDS USER INPUT: how to accurately describe Dmitry's personal product/technical ownership versus AI-assisted execution/other contributions (Q08). Repo authorship/owner intent alone does not establish he manually implemented every line. Optional personal lessons/outcomes not recorded are Q09. Project is work in progress, not fully shipped v1; current qualitative outcome is the verified application foundation/CI, not business impact.

| Surface | Proposed content |
| --- | --- |
| Home | Concise current portfolio foundation; do not call it a working CMS/AI platform |
| Projects index | Display name Portfolio 2026, shared existing slug `portfolio`, owner-approved role and honest current maturity |
| Case | Problem/constraints → content/localization architecture → selective enhancement/native scroll/fallback/accessibility decisions → verified quality evidence → current limits and future work; not a phase-by-phase chat transcript |

Evidence already sufficient for a technical outline: source/CI, D-006/D-010/D-013, real screen, memory policy. User role attribution is the main missing core fact. No actual multi-channel CMS/API exists; bot note is future context only.

## I. About / professional profile

Proposed content sequence: approved professional positioning → short relevant background-to-technology bridge → strengths backed by project examples → working approach/collaboration → current focus → optional useful location/languages/availability. Not autobiography and not a long list of unproven skills.

VERIFIED current public display is Dmitry/DMITRY and generic product-thinking copy. Full public name, previous professional background, transition dates, employment, seniority, language proficiency, location and availability are UNKNOWN in the inspected Portfolio notes. Environment timezone Asia/Bishkek is **not evidence of residence**. Do not infer unusual biography from the prompt. Q01/Q02/Q03 provide usable facts; About can link Q10 chronology rather than restate it.

Strength claims should point to actual contribution/evidence. Differentiate "used in shipped/working project", "learning/exploring" and "current interest". Existing Focus SaaS/AI/Healthcare/FinTech is positioning text, not a certification of expertise in every area. Portrait is optional; no biography/photos are fabricated.

## J. Experience / CV / canonical ownership

Recommend role-based records ordered reverse-chronologically, with explicit engagement type: employment, contract/freelance, own product/project, education or other confirmed experience. A visual timeline is not decided. Record organization/context, role, dates (honest precision), own responsibilities/outcome and related Project IDs. No fabricated employment to make the chronology look conventional.

| Content | Canonical owner | Reuse rule |
| --- | --- | --- |
| Positioning / professional bridge / approach | Profile → About | Home/CV use approved concise projections |
| Role/organization/dates/responsibilities | Experience records | Experience/CV reuse; project-specific contribution links to Project role, not competing paragraphs |
| Project problem/technical story/results | Project.caseStudy | Experience points to it; no full case duplication |
| Education / selected achievements | Profile.education / relevant Experience entry | Optional public records; CV references same facts |
| Downloadable CV | Versioned approved projection / media | EN/RU files if available/useful; generated from approved facts later, not a separately maintained biography |

Q10 supplies chronology without repeating Q04/Q06 project briefs. Q12 education and Q15 CV are valuable but optional for the first credible case. Never expose a private CV/address/phone or fabricate a degree. Keep Experience route unless a later approved content decision removes/merges it; honest project-based experience is acceptable if confirmed.

## K. Lab architecture / maturity

| Current entry | Verified state in this Portfolio | Missing evidence / publication guidance |
| --- | --- | --- |
| Kyrgyzstan Payment Integration | CONCEPT label/description/glyph | No SDK/payment flow/demo/results; not integrated payments |
| AI Portfolio Agent | CONCEPT | No API/scoped implementation; planned editorial assistant is not a public chatbot |
| PDF Parser | CONCEPT | No parser/benchmarks/sample extraction demo here |
| Telegram Bot | CONCEPT, generic conversational idea | No bot/API/token/demo; not proven identical to the dedicated Portfolio Bot idea |
| Telegram Portfolio Bot (Obsidian) | FUTURE/BACKLOG, NOT STARTED | Separate ecosystem note, no implementation; not auto-promoted into Home/Lab or Phase5 |

Proposed explicit maturity definitions: CONCEPT = hypothesis only; EXPERIMENT = documented test/investigation with evidence; PROTOTYPE = a partial working artifact; WORKING DEMO = accessible demonstrable scope; SHIPPED = delivered/released in a stated context. Maturity is not changed by a nicer screenshot or the name of a library. Any external progress requires evidence/permission under Q13.

Lab entry fields: id/title/translated short purpose, hypothesis/user/task, maturity, actual tested/built scope, date/status, findings/limitations, optional stack/media/demo/source links, related Project IDs. For concepts, purpose/maturity may be enough; do not render empty technical/result headings. Curate what deserves public attention; it is valid to show fewer concepts. No demand to build four experiments to complete this page.

## L. Contact / conversion

VERIFIED configured and owner-confirmed destinations (D-008 / `site-config.ts`): Telegram `https://t.me/to4ka_gr`; LinkedIn `https://www.linkedin.com/in/dmitrii-nadtochii`; GitHub `https://github.com/Dmitrii-front`; Email `mailto:d.nadtochii.dev@gmail.com`. This audit verifies the source values, not live account reachability, email delivery or response time. No Telegram APIs or messages called. Phone/WhatsApp are intentionally not public; do not ask again for already-confirmed links.

Keep current four-channel architecture. Recommend Telegram/Email for conversation; LinkedIn for recruiting context; GitHub as evidence/source. Additional form/payment/donation/booking CTA is not justified. Q14 only covers priority/availability wording, not destination rediscovery.

CTA placement proposal: Home existing conversion; Projects/case end after evidence (specific discuss-work action, not repeated generic sales blocks); About after context; Experience/CV after relevant role proof; Lab collaboration only if suitable. Secondary source/demo/CV links answer evidence/recruiter questions rather than compete with every primary CTA. Do not add repeated CTA sections or implement fan changes now.

## M. Storage-neutral shared content proposal

Small content aggregates/value objects; **no schema, storage choice, CMS code or service abstraction**. Stable IDs and public approved facts are sufficient for a later first static implementation. Internal evidence/approval notes never become public AI/bot payload automatically.

| Entity / scope | Purpose and key fields | Relationships / reuse | Multilingual fields | Future CMS? |
| --- | --- | --- | --- | --- |
| Profile | Public name, approved positioning/bridge/approach, current focus, optional public location/languages/availability | References capabilities, education, channels/CV; About/Home/Experience/CV projections | Positioning, narrative, labels/availability copy; factual dates/IDs/shared name not duplicated | Yes |
| Project with nested ProjectCaseStudy | Fields in E; editorial summaries separated from factual story | Referenced by Home selection, Projects, Experience, Lab; one case aggregate, not separate normalized tables | Summaries, role/context/problem/story/results/SEO and captions; stack/links/time shared | Yes |
| Experience | Engagement type, organization, role, dates, contribution/outcome | Profile chronology; Project references; CV projection | Role labels/narrative; dates/project IDs shared | Yes |
| Education (Profile value objects) | Institution, qualification/subject, dates, relevance, approved link | Profile/Experience/CV; no independent site page | Qualification/relevance narrative; proper institution names can stay original | Yes as nested records |
| Skill/Capability (Profile value objects) | Name, category, context/proficiency wording if approved, evidence Project/Experience IDs | Recruiter-readable evidence; do not derive expertise merely from installed packages | Descriptions/categories; technical product names stable | Yes as nested records |
| LabExperiment | Fields/maturity in K | Preview/catalog, related projects/evidence/links | Purpose/hypothesis/findings/limitations; maturity has translated labels | Yes |
| ContactChannel (Profile/Site value objects) | Kind, approved destination, public label, optional priority | Same links across Home/Contact/CV; no new contact system | Optional helper/availability copy; URLs shared | Yes |
| MediaAsset | Logical asset id/source/public variant refs, dimensions, capture scope/date, permission/privacy, alt/caption | Existing3 sources/9 renditions; project/CV references. Keep original evidence private unless approved | Alt/caption; dimensions/hash/publication flags shared | Yes later, without custom media platform now |
| ExternalLink (inline value) | Kind, URL, label, public/approved scope | Project/Experience/Lab/Profile; contact destinations already canonical | Label when needed; URL shared | Yes with owner record; not separate table |
| SiteContent | Page intro/SEO/editorial copy and ordered selected Project/Lab IDs | Presentation selection, not a second copy of core project/person facts | Editorial text/title/description; relation IDs shared | Yes |

One source per **fact**, not one identical paragraph per surface. Short summaries are approved editorial projections, not automatic truncations. Merge facts from one owner rather than invent a flexible page builder. Reuse across Website → future CMS editing → future Agent/Bot read projections is an intention; no API contract/export runtime exists yet.

## N. EN/RU strategy

VERIFIED UI dictionaries are keyed by locale; shared project names/slugs/categories and Lab titles are currently often English. Project summaries, UI, descriptive labels and image alts already have EN/RU strings. Full cases/profile/chronology are absent in both locales.

PROPOSED: shared stable IDs/slugs `pnlwise`, `healthy`, `portfolio`; one factual record, EN/RU reviewed narratives. Translate positioning, summaries, case body, role/context descriptions, About/Experience/Lab copy, alt/captions, CTA helpers and page/OG metadata. Keep brands, technology/API/library names and URLs original; translate sector/maturity labels where helpful, not proper names mechanically. No duplicate locale-specific fact records.

Primary EN remains. Draft review can use EN as a source, but **no silent English whole-case fallback pretending to be RU**: incomplete optional sections can be omitted; an explicitly labelled EN excerpt/link requires agreed editorial policy; full EN/RU publication readiness is reviewed before launch. Current same-path language switch/cookie routing remains untouched. Adding future KG extends locale configuration/translations and readiness, not route topology; no third locale or mass translation now.

## O. Asset requirements / value audit

AVAILABLE means an inspected approved public file/provenance, MISSING means not currently verified, OPTIONAL means not inherently needed. Missing tablet/mobile evidence does not become mandatory just because an old device checklist named it.

| Project | Desktop | Tablet / mobile | Logo / brand | Hero | Supporting screens | Architecture diagram | Other evidence / acquisition priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pnlwise | AVAILABLE: approved desktop Home, 3 WebPs | MISSING: both; obtain only useful real responsive views | MISSING separate asset; OPTIONAL, screenshot branding is not a separately approved standalone logo asset | AVAILABLE reuse Home capture; custom hero OPTIONAL | MISSING verified actual workflow/output; useful P1 if publishable and non-private | MISSING; OPTIONAL only to explain a real technical relationship | Sample report is captured UI, not financial outcome. Role/status/stack sources P0; live/source links UNKNOWN |
| Healthy | AVAILABLE: approved desktop Home,3 WebPs | MISSING both; phone artwork inside desktop is not evidence | MISSING separate asset; OPTIONAL | AVAILABLE reuse; custom illustration OPTIONAL | MISSING actual user flow evidence; P1 if scope implemented/privacy-safe | MISSING; OPTIONAL, no fabricated backend | Capture supports search/booking introduction, not real appointment/clinic metrics. Role/status/stack P0; links UNKNOWN |
| Portfolio 2026 | AVAILABLE: real source PNG +3 WebPs | MISSING both as approved manifest variants; test screenshots are review artifacts, not automatically publication-approved project assets | Site icon/wordmark exists; dedicated project-brand export OPTIONAL | AVAILABLE reuse current approved capture; refresh later only if genuinely misleading after content changes | Review artifacts AVAILABLE locally but not canonical case gallery; choose/approve evidence later | MISSING public diagram; OPTIONAL for locale/enhancement/content boundaries | GitHub/code/CI/decisions AVAILABLE. Human contribution attribution P0; field performance/user/business impact UNKNOWN |

No need for3×3 galleries, logo badges, diagrams for every project, portrait or CV visual mockups. Highest value: facts/role proof, one explanatory screen per case, selective additional evidence for a real challenge. Obtain mobile first if it shows a materially different/important flow; tablet is lower priority unless justified. Owner can mark genuinely irrelevant variants N/A later; absent assets remain unavailable device choices. Preserve existing sources, hashes and privacy exclusions; do not generate fake UI or alter originals.

## P. SEO / structured-content preparation

Existing self-canonical/hreflang/EN x-default/OG/Twitter metadata and global noindex/disallow are VERIFIED. No sitemap/JSON-LD/custom OG artwork/production origin is implemented. **Noindex remains unchanged in this task and is not automatically removed in Phase5.**

| Output | Required approved content / unresolved inputs |
| --- | --- |
| Page title/description | Accurate public name/positioning and route purpose; distinct useful EN/RU summaries rather than generic repeated copy |
| Project metadata | Project name/type, problem/value, own contribution, honest current status; no "shipped SaaS"/AI claim until verified |
| OpenGraph | Title/description, correct locale/canonical link, publication-approved representative image/alt; asset may reuse existing screen if legible, no new design now |
| Structured data | Later choose types suited to actual public facts; accurate Profile/person identity and creative/software work fields only if warranted. No invented employers, dates, reviews, ratings or users |
| Sitemap | Later list only real approved public canonical locale URLs/content states; exclude draft/private/admin; publication dates must be real |
| Canonical URLs | Shared approved slugs plus real owner-selected production origin; current localhost metadata is not launch-ready |

Publication/indexing, structured-data implementation and production origin/provider remain later explicit decisions. Internal verification status/private sources do not belong in search snippets or AI/bot output.

## Q. Master content completeness matrix

Readiness is a planning judgment, not permission to start coding. "Conditional" means facts/approval missing; no row implies production-ready indexing.

| Area | Current state | Required content | Missing information | Assets needed | User input | Priority | Ready for implementation? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Home | Working frozen visual overview | Approved identity + concise honest project/capability summaries | Target role/audience, contribution/claim accuracy | Existing previews suffice; no new decoration | Q01/02/04–08 | P0 content accuracy | Conditional; no redesign |
| Projects |3 static entries | Role/type/status/period/summary and case links | Project core facts | Existing evidence enough for first pass | Q04–08 | P0 | Conditional |
| Pnlwise | Summary + placeholder case | Minimum case gate E | Role/context/dates/delivered scope/AI/stack/outcome | Existing desktop sufficient; selected flow P1 | Q04/05 | P0 | No credible full case until brief |
| Healthy | Summary + placeholder case | Minimum case gate E | Role/context/dates/scope/stack/outcome | Existing desktop; sanitized flow optional | Q06/07 | P0 | No credible full case until brief |
| Portfolio | Code/docs/CI and placeholder case | Technical outline + truthful human attribution | Personal ownership/collaboration disclosure | Existing source + approved code/CI | Q08; Q09 optional | P0 attribution | Closest to ready; after approval |
| About | Generic intro/approach | Approved identity/bridge/strengths/evidence | Biography/role/public facts | Portrait OPTIONAL | Q01/02; Q03 optional | P0 core | Conditional |
| Experience | Pending text | Real role/chronology, project links, optional education/CV | Record facts/engagement types | No required illustration; CV optional | Q10; Q11/12/15 optional | P0 chronology | Conditional or explicit reduced scope |
| Lab |4 Home concepts; empty page | Curated purposes/maturity and honest limits | Owner selection; external maturity evidence if any | None needed for concepts | Q13 | P1 | Can use verified CONCEPT scope after approval, no software builds |
| Contact |4 confirmed channels | Concise conversion/helpers | Optional priority/availability | No new asset/form | Q14 optional | P1 | Existing facts ready; cleanup only after authorization |
| EN | UI/short summaries | Full approved English narratives/metadata/alts | Core facts and editorial review | Reuse approved media | Project/profile P0 | P0 | UI yes; substantive content conditional |
| RU | UI/short summaries | Reviewed equivalent narratives/labels | Same facts + translation review | Same media, localized alt | Same P0 facts, later review | P0 completeness | UI yes; full content not yet |
| SEO | Foundation noindex | Accurate metadata/approved content; later publishing/origin | Full identity/project facts, public URLs/dates/origin | Optional approved OG derivatives later | Core facts; later origin decision | P1 planning / later release | Metadata content conditional; launch no |

## R. ONE consolidated questionnaire for Dmitry

Answer P0 first. It is fine to write UNKNOWN, not public, or N/A with a reason; no invented metric is required. Reuse the same approved role/date records by reference rather than retyping them. P1/P2 are not prerequisites for the first credible case. For each project attach only public/sanitized evidence and approved links; no secrets, private financial/medical records or private CV.

### PROFILE

- **Q01 — P0:** Как вы хотите позиционироваться сейчас: публичное имя/профессиональная роль, основной тип возможностей (работа, freelance, партнёрство) и 2–3 задачи, которые вы действительно готовы решать? Текущий display «Dmitry» уже известен; не требуется повторять контактные ссылки.
- **Q02 — P0:** Какие 2–3 факта о предыдущем профессиональном опыте и переходе в технологии важно публично объяснить, чтобы понять ваш подход? Можно сослаться на записи Q10; без автобиографии и вымышленных «лет коммерческой разработки».
- **Q03 — P1:** Какие языки/уровни и location/remote context полезны посетителю и разрешены к публикации? Если не нужны — пропускаем. Timezone среды не считаем местом проживания.

### PNLWISE

- **Q04 — P0:** Дайте короткий project brief: для кого/какой реальной задачи; тип проекта и период; ваша точная роль/ответственность/границы ownership и команда; фактический текущий статус и что нельзя публиковать. Captured Home/upload/sample P&L уже известны — нужен контекст и личный вклад, не описание картинки.
- **Q05 — P0:** Какие функции реально работают и что из них сделали вы; какой stack/API/integrations действительно используется, включая точную роль AI, если он реализован? Назовите один реальный constraint/decision и подтверждаемый результат (можно без чисел); приложите доступное публичное доказательство/live/source link или отметьте отсутствие. Не выдаём sample report за revenue.

### HEALTHY

- **Q06 — P0:** Дайте такой же краткий brief: реальный user/problem, тип/период, ваша роль/ownership/команда, текущий статус и публикационные ограничения. Desktop search/booking introduction уже видны, но не доказывают реализованный backend/приёмы.
- **Q07 — P0:** Какие patient/doctor/clinic flows реально реализованы, каков ваш вклад и фактический stack/services? Один инженерный/product trade-off и подтверждаемый результат; публичные/sanitized evidence/links либо «нет». Без пациентских данных и вымышленных operational metrics.

### PORTFOLIO

- **Q08 — P0:** Как корректно описать ваш личный product/technical ownership, вклад других людей и использование Codex/AI-assisted execution? Не нужно заново сообщать stack, locale rules или current implementation — они подтверждены репозиторием. Нужна честная attribution, не утверждение о ручном написании каждой строки.
- **Q09 — P1:** Есть ли важный личный вывод/подтверждаемый эффект работы над Portfolio, которого ещё нет в DECISIONS/audit? Если нет, используем известные технические результаты и не придумываем бизнес-метрики.

### EXPERIENCE

- **Q10 — P0:** Дайте краткие реальные role records: организация/контекст, employment/freelance/own project/другое, роль, период, ответственность и 1 результат. Pnlwise/Healthy не пересказывайте — свяжите с Q04/Q06. Если уместен только project experience, подтвердите это; традиционное employment не выдумываем.
- **Q11 — P2:** Есть ли 1–2 проверяемых достижения/отзыва/результата, которые реально усиливают профиль и разрешены к публикации? Источник/контекст важнее числа; отсутствие нормально.

### EDUCATION

- **Q12 — P1:** Какое образование/qualification или выбранное обучение существенно для профессионального профиля: учреждение, направление, период и relevance? Можно отметить «не публиковать»/N/A; не нужен список каждого курса или private diploma.

### LAB

- **Q13 — P1:** Какие из нынешних концептов стоит показывать публично? Есть ли вне этого Portfolio проверяемый experiment/prototype/demo, разрешённый к показу, который меняет maturity? Если нет, сохраняем CONCEPT. Generic Telegram Bot и future Telegram Portfolio Bot не отождествляем без evidence.

### CONTACT

- **Q14 — P1:** Какой из уже подтверждённых каналов приоритетен для работы/проектов и стоит ли вообще публиковать availability/remote формат? Если не хотите — сохраняем нейтральный контакт без обещаний response time. URL/phone/WhatsApp заново не запрашиваются.

### CV

- **Q15 — P1:** Есть ли актуальная public CV-версия EN/RU с датой/разрешением на download, или позже подготовим её из утверждённых Profile/Experience фактов? Private CV не нужен; отсутствие CV не блокирует первый кейс.

Progressive unlock: IA/claim policy approval + Q04/Q05 can unlock the first Pnlwise case under a separate task; Q06/Q07 the Healthy case; Q08 plus existing repo evidence the Portfolio case. Q01/Q02 unlock credible positioning/About, Q10 Experience. Completing the entire public-site scope requires all relevant P0 facts or an explicit approved exclusion; do not hold a verified case hostage to optional portraits/metrics/tablet assets.

## S. Proposed Phase 5 stages — NOT EXECUTED

| Stage | Scope / dependency | Exit evidence |
| --- | --- | --- |
|5.0 Approval | Approve IA/fact ownership/case minimum, answer P0 progressively, agree exclusions and EN/RU review; no design gate/Neon work | Approved brief/evidence for at least first case; explicit new implementation authorization |
|5.1 Canonical content | Later simple typed/static public records fitting approved model; separate facts/UI copy/editorial summaries; no CMS/DB/API platform | Approved facts with source/visibility, stable IDs and references, absent claims omitted |
|5.2 Projects/cases | First credible case (Portfolio is best evidenced, subject to Q08; project order decided from actual briefs), then remaining cases/index | Role/problem/solution/technical decision/outcome/evidence readable; no empty boilerplate |
|5.3 About/Experience/CV | Use Q01/Q02/Q10 records; optional education/public CV | Professional bridge and truthful chronology, no duplicate case narrative/private data |
|5.4 Lab/Contact/content cleanup | Curate true maturity, links/CTAs; align short Home copy from same facts in existing components | No concept-as-shipped/unsupported AI/availability claim; no new fan/visual elements |
|5.5 EN/RU review | Author/translate alongside5.1–5.4; final parity pass, not leave RU as a late placeholder | Both locales factual/complete, shared IDs/slugs, reviewed metadata/alt/labels |
|5.6 Useful asset completion | Inventory starts at5.0; evidence acquired alongside cases, final selection/alt/provenance audit | Enough honest evidence, no forced9-screen gallery/fake responsive UI; unknown variants unavailable |
|5.7 Content/route/responsive QA | Fact/link/locale/CTA/semantics plus existing engineering/browser/a11y checks | Complete working public content within approved scope, no regression; noindex still controlled separately |
|5.8 Distribution/layout review | Inspect real reading lengths, information hierarchy and mobile/desktop distribution | Record minimal content-driven layout needs for separate approval; no visual redesign, animation, Neon or3D polish bundled into Phase5 |

Final visual polish follows content/distribution later. Supabase/Admin/CMS/analytics/Agent/Bot/deployment are not automatically part of Phase5. Publication/indexing also needs its own release review. The stages define sequence/dependencies, not active implementation tasks.

## T. Future CMS boundary

Eventually edit approved Profile/Project/case/Experience/Lab/SiteContent, channels and public media/SEO through CMS. Avoid hardcoding the same core facts into separate page files when Phase5 is later authorized; lightweight shared static content is enough until then. Keep publication/locale readiness and provenance/permissions discernible so migration does not rely on parsing JSX paragraphs.

Website reads approved public projections; future Admin edits draft records; future Agent scoped read/draft mutations require authorization/Audit Log; future Bot reads the same approved facts without copying them manually. Those security/publishing/data boundaries are **future intentions**, not implemented safeguards/APIs. No generic adapters, database tables, media system, bot export or schema is created now.

## U. Documentation / Obsidian / WorkHub

Strategy D-015 accepted; this IA/content model/stages await owner approval. Detailed preparation and ONE questionnaire stay in this repository. CURRENT_STATE/README/ARCHITECTURE/MEMORY reference the changed priority, preserving historical audit/ТЗ. Obsidian Portfolio index/roadmap and a concise `Portfolio Content Architecture.md` hold strategy/references only. Bot note stays BACKLOG unchanged. WorkHub PROJECT/STATUS only receive phase/next action/input blockers, not copied models.

## V. Git / scope / verification

At entry main/local tracking/actual GitHub main match `0ac6327`, clean Portfolio worktree. WorkHub starts21 commits ahead with unrelated dirty/untracked material; never push/stage that unrelated history. Only documentation/memory is changed by this preparation; canonical spec, app/src/styles/assets/public/scripts/package/lock/tests/config are unchanged. No product dependencies/services/Telegram or AI API calls are introduced; no runtime tests requiring installation. Document/link/diff/source-identity checks govern this documentation-only delivery; prior full-audit QA remains a dated baseline, not a new test claim. Commit/push/remote/CI and scoped local WorkHub sync are reported after delivery. STOP; do not implement Phase5.
