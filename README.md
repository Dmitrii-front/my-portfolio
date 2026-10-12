# Portfolio 2026

Production portfolio platform for Dmitry: a premium public site, structured case studies, CMS, scoped AI-agent workflows, analytics, and selective 3D interactions.

Application code remains at **Phase 4.2**, now a frozen working visual baseline under D-015, not the final design. Preserve the existing Home/persistent MacBook, Neon and lazy Hub/device enhancement; do not continue visual polish. Current work is **Phase 5 preparation: information architecture and real content**, planning only; implementation and external deployment have not started. Other public pages still largely contain skeletons. [Preparation and questionnaire](docs/PHASE_5_CONTENT_ARCHITECTURE_AUDIT.md); technical policies/QA: [`docs/NEON_INFRASTRUCTURE.md`](docs/NEON_INFRASTRUCTURE.md), [`docs/THREE_ENHANCEMENT.md`](docs/THREE_ENHANCEMENT.md).

## Requirements

- Node.js 22.12 or newer (package engine); local/CI baseline is 22.14.
- npm (bundled with Node.js)

## Setup

```bash
npm ci
npm run dev
```

Open `http://localhost:3000/en` or `/ru`. `/` resolves the saved language choice, browser preferences, then EN.

## Scripts

- `npm run dev` — local Next.js development server.
- `npm run lint` — Biome linting.
- `npm run typecheck` — regenerate Next.js route types and run strict TypeScript checks.
- `npm test` — unit tests with Vitest.
- `npm run build` — production build using Webpack.
- `npm run check` — lint, typecheck, unit tests, and production build.
- `npm run test:e2e` — browser smoke checks against the production build.
- `npm run assets:prepare` — reproduce WebPs from hash-verified archive originals and the retained Portfolio source. `-- --portfolio` needs no external archive.

## Current stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Biome
- Vitest
- Playwright and axe (development/CI only)
- Three.js, React Three Fiber and Drei (lazy progressive enhancement)

Motion, Supabase, Drizzle and PostHog remain deferred until a phase uses them.

## Project memory

- [Baseline specification](docs/PORTFOLIO_2026_SPEC.md)
- [Current state and next action](docs/CURRENT_STATE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Decisions](docs/DECISIONS.md)
- [Development workflow](docs/DEVELOPMENT.md)
- [Audited project asset sources and missing variants](docs/PROJECT_ASSETS.md)
- [Codex instructions](AGENTS.md)
- [Verified memory architecture and Obsidian paths](docs/MEMORY.md)
- [Full project/spec/memory audit — 2026-10-12](docs/AUDIT_2026-10-12.md)
- [Phase 5 content / information-architecture preparation](docs/PHASE_5_CONTENT_ARCHITECTURE_AUDIT.md)

WorkHub contains the cross-project Portfolio status. Detailed technical memory stays in this repository; the verified Obsidian Portfolio folder contains long-term product ideas and roadmap. See `docs/MEMORY.md`; these layers are separate, not automatic mirrors.

## Environment

[`SITE_URL`](.env.example) is the deployment origin used by canonical, hreflang, and Open Graph URLs. It defaults to `http://localhost:3000` locally. Set it to the actual preview origin before building a hosted preview. Secrets stay outside Git.

## Deployment

CI runs all checks and Chromium smoke tests on pushes to `main` and pull requests. Screenshots and failure traces are uploaded as the `browser-qa` artifact. Local production preview: `npm run build && npm run start`. No external hosting is configured; see [preview options](docs/DEVELOPMENT.md#preview-and-hosting). Skeletons and previews remain noindex.

## Historical Portfolio 2023

The previous static portfolio and its complete Git history are preserved at tag `portfolio-2023`.
