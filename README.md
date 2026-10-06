# Portfolio 2026

Production portfolio platform for Dmitry: a premium public site, structured case studies, CMS, scoped AI-agent workflows, analytics, and selective 3D interactions.

The repository is currently at **Phase 1: application and design foundation**. EN/RU routes, navigation, design tokens, and a responsive Home shell are implemented. Content pages remain unpublished skeletons.

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

## Current stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Biome
- Vitest
- Playwright and axe (development/CI only)

Motion, Three.js, React Three Fiber, Drei, Supabase, Drizzle, and PostHog are baseline technologies but intentionally deferred until a phase uses them.

## Project memory

- [Baseline specification](docs/PORTFOLIO_2026_SPEC.md)
- [Current state and next action](docs/CURRENT_STATE.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Decisions](docs/DECISIONS.md)
- [Development workflow](docs/DEVELOPMENT.md)
- [Codex instructions](AGENTS.md)

WorkHub contains the cross-project Portfolio status. Detailed technical memory stays in this repository.

## Environment

[`SITE_URL`](.env.example) is the deployment origin used by canonical, hreflang, and Open Graph URLs. It defaults to `http://localhost:3000` locally. Set it to the actual preview origin before building a hosted preview. Secrets stay outside Git.

## Deployment

CI runs all checks and Chromium smoke tests on pushes to `main` and pull requests. Screenshots and failure traces are uploaded as the `browser-qa` artifact. Local production preview: `npm run build && npm run start`. No external hosting is configured; see [preview options](docs/DEVELOPMENT.md#preview-and-hosting). Skeletons and previews remain noindex.

## Historical Portfolio 2023

The previous static portfolio and its complete Git history are preserved at tag `portfolio-2023`.
