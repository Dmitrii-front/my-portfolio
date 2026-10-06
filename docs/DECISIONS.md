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
