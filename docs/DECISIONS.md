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
- **Decision:** Install Next.js, React, TypeScript, Tailwind CSS, ESLint, and Vitest only. Add Motion, Three.js, React Three Fiber, Drei, Supabase, Drizzle, and PostHog when their implementing phases begin.
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
