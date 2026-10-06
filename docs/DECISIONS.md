# Decisions

Durable decisions are recorded here. Proposed changes that materially affect UX, architecture, security, scope, or cost require owner confirmation before implementation.

## D-001 — Preserve Portfolio 2023 with an immutable tag

- **Date:** 2026-10-06
- **Status:** Accepted
- **Decision:** Tag commit `0ff4ec1` as `portfolio-2023` and publish the tag before replacing the `main` working tree.
- **Reason:** Preserve the full historical site and Git history while continuing Portfolio 2026 in the same repository.

## D-002 — Continue Portfolio 2026 on the existing main history

- **Date:** 2026-10-06
- **Status:** Accepted
- **Decision:** Build Portfolio 2026 on `main` after the archival tag. Do not create a separate code copy or rewrite remote history.
- **Reason:** GitHub must remain the single source of truth from the bootstrap phase.

## D-003 — Keep Phase 0 dependencies minimal

- **Date:** 2026-10-06
- **Status:** Accepted
- **Decision:** Install Next.js, React, TypeScript, Tailwind CSS, Biome, and Vitest only. Add Motion, Three.js, React Three Fiber, Drei, Supabase, Drizzle, and PostHog when their implementing phases begin. Biome replaced ESLint during bootstrap to avoid the vulnerable dev-only glob dependency chain.
- **Reason:** Reduce initial dependency surface and avoid unused heavy runtime packages.

## D-004 — Separate repository memory from WorkHub control-plane memory

- **Date:** 2026-10-06
- **Status:** Accepted
- **Decision:** Keep detailed technical state, architecture, decisions, and development rules in this repository. Keep only cross-project status, next actions, blockers, risks, and links in WorkHub.
- **Reason:** Follow the existing WorkHub single-source and project-isolation model without duplicating technical documentation.

## D-005 — Preserve provider portability through boundaries

- **Date:** 2026-10-06
- **Status:** Accepted
- **Decision:** Keep analytics and infrastructure integrations behind project-owned modules and avoid host-specific application design where practical.
- **Reason:** The production host is intentionally undecided until cutover analysis.

## D-006 — Require locale prefixes on every public page

- **Date:** 2026-10-06
- **Status:** Accepted by owner
- **Decision:** All public pages use `/{locale}/...`, including `/en` and `/ru` Home. EN is the primary content locale; EN and RU ship in v1. Adding KG requires locale configuration and translations, without a routing redesign.
- **Resolution:** `/` uses a saved explicit selection first, then browser language preferences, then EN. A directly visited prefixed URL always renders that locale. Geolocation is never used for language selection.
- **Persistence:** A first-party locale-preference cookie stores an explicit switcher selection for one year. Switching preserves the current public path; unknown locale values are rejected.
- **SEO:** Localized pages have self-canonical URLs and reciprocal EN/RU hreflang alternatives; `x-default` points to the EN content URL. A deployment-provided site origin supplies absolute URLs. Unpublished skeletons and previews remain noindex.
- **Reason:** Predictable shareable URLs, stable SEO, respect for explicit preferences, and an extensible locale architecture.

## D-007 — Validate the complete Home interaction model in Phase 2

- **Date:** 2026-10-06
- **Status:** Accepted by owner in the Phase 2 request
- **Decision:** Phase 2 includes desktop/eligible-tablet sticky Selected Work as well as the mobile interaction prototype, bringing this validation forward from the baseline Phase 3. One persistent device surface serves all projects; narrow/short viewports use an active-project touch showcase instead of sticky narrative.
- **Implementation boundary:** Use native scrolling, CSS/SVG and small React client boundaries. Final R3F models, persistence, analytics and provider selection remain deferred. No new runtime dependency is required.
- **Content:** Screens are explicitly labelled placeholders, Lab records are temporary concepts, and unconfirmed contact destinations must not be invented.

## D-008 — Polish the accepted interaction architecture with audited assets

- **Date:** 2026-10-06
- **Status:** Accepted by owner in the Phase 3 request
- **Decision:** Preserve Phase 2 interactions and one persistent project/device scene. Add only verified device imagery; missing variants remain labelled placeholders. Selected source paths, hashes, privacy exclusions and replacements are in `PROJECT_ASSETS.md`.
- **Visual language:** Near-black continuous canvas; object-local violet/blue light. Hub stays rounded rectangular with restrained depth/perspective and a visible-active connection pulse. Contact is a distinct circular 180° upward fan (scaled radius on mobile), sequential open/reverse close. Lab remains a quieter horizontal exploration strip.
- **Journey:** Neon Path runs through interior composition: Hub → behind device → under Lab → Contact. Text masks and opaque foreground objects/controls occlude it; it is never a viewport-edge border. Native scrolling and reduced-motion fallback remain intact.
- **Confirmed channels:** Telegram `https://t.me/to4ka_gr`, LinkedIn `https://www.linkedin.com/in/dmitrii-nadtochii`, GitHub `https://github.com/Dmitrii-front`, Email `mailto:d.nadtochii.dev@gmail.com`. No public phone/WhatsApp.
- **Delivery boundary:** Preoptimized static WebP/srcset, no runtime image provider. No Three.js/R3F, Motion, CMS, analytics or paid hosting commitment in Phase 3. Phase 4 requires a separate owner task and 3D/performance budget.

## D-009 — Limit public device choices to verified assets

- **Date:** 2026-10-06
- **Status:** Accepted by owner in Phase 3.1; Phase 3 architecture accepted
- **Decision:** Derive device availability from the audited project screen manifest, equally on mobile and desktop. Pnlwise/Healthy offer only MacBook; Portfolio has a neutral project fallback without a hardware frame or device controls. Keep preferred device selection separate from project selection, resolving to an available variant only; adding verified tablet/mobile records must not require section layout changes.
- **Polish boundary:** Independently tune mobile/tablet/desktop broad S-like Neon geometry; retain brightness, occlusion, scroll illumination and reduced motion. Desktop device presence +10–15% where space permits, step length −10–15%, slightly smaller gap. Lab uses one restrained inline SVG glyph family. Do not redesign sticky navigation, Contact or temporary Hub/device surfaces; no final 3D in Phase 3.1.

## D-010 — Enhance only Hub and device with optional WebGL

- **Date:** 2026-10-06
- **Status:** Accepted scope by owner in Phase 4; implementation policy
- **Decision:** Phase 3.1 is the accepted visual/interaction baseline. Lazy Three.js/R3F/Drei replace only Hub module surfaces and the persistent DeviceShowcase rendering boundary. DOM controls/content, sticky selection, Lab, Contact and SVG Neon geometry do not change.
- **Assets:** Project-owned procedural rounded modules and unbranded laptop; no downloaded models/HDRs. Only the audited Pnlwise/Healthy desktop WebP assets become screen textures. Portfolio remains neutral; missing variants remain unavailable.
- **Quality:** HIGH on fine-pointer desktop ≥1200px with reported ≥8 cores (DPR capped 1.5); STANDARD on other capable devices (DPR 1), including unknown CPU capability. FALLBACK for reduced motion, Save-Data, reported ≤2 CPU cores/≤2GB memory, absent WebGL2 or scene failure. Missing memory hints do not imply weakness; these conservative signals are not a GPU benchmark.
- **Loading/failure:** Meaningful CSS/static visuals remain until lazy scenes draw successfully, including after live reduced-motion resume. Load after essential UI and near each scene; catch chunk/initialization/draw/context failures locally, guarding before the first GPU draw. Hidden scenes pause; Hub idle is limited to 30Hz HIGH / 15Hz STANDARD while visible, device renders on demand with short settling/texture transitions. No full-page WebGL or provider dependency.
- **Verification:** Compare essential route JS separately from deferred 3D bytes; measure initialization/CLS/long tasks locally. Keep existing initial-content budgets; record the additional deferred cost transparently. Physical-device/field performance remains a release check.
