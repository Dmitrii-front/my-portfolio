# Portfolio 2026

Production portfolio platform for Dmitry: a premium public site, structured case studies, CMS, scoped AI-agent workflows, analytics, and selective 3D interactions.

The repository is at **Phase 4.1: Neon visual infrastructure**; Phase 4 is technically accepted. Approved Home composition, interactions and 3D models remain unchanged. Neon separates scroll/layout geometry from actual foreground occlusion and uses localized layered light. Lazy Three.js/R3F/Drei still enhance only Hub/device with meaningful fallbacks; content pages remain unpublished skeletons. Policies/QA: [`docs/NEON_INFRASTRUCTURE.md`](docs/NEON_INFRASTRUCTURE.md), [`docs/THREE_ENHANCEMENT.md`](docs/THREE_ENHANCEMENT.md).

## Requirements

- Node.js 22.14 or newer
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
- `npm run assets:prepare` — reproduce selected WebP derivatives from the external screenshot archive after verifying source hashes.

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

WorkHub contains the cross-project Portfolio status. Detailed technical memory stays in this repository.

## Environment

[`SITE_URL`](.env.example) is the deployment origin used by canonical, hreflang, and Open Graph URLs. It defaults to `http://localhost:3000` locally. Set it to the actual preview origin before building a hosted preview. Secrets stay outside Git.

## Deployment

CI runs all checks and Chromium smoke tests on pushes to `main` and pull requests. Screenshots and failure traces are uploaded as the `browser-qa` artifact. Local production preview: `npm run build && npm run start`. No external hosting is configured; see [preview options](docs/DEVELOPMENT.md#preview-and-hosting). Skeletons and previews remain noindex.

## Historical Portfolio 2023

The previous static portfolio and its complete Git history are preserved at tag `portfolio-2023`.
