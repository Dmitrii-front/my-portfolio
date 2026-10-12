# Portfolio 2026

Production portfolio platform for Dmitry: a premium public site, structured case studies, CMS, scoped AI-agent workflows, analytics, and selective 3D interactions.

**Phase 5.0 / 5.1 canonical content is implemented** on the frozen Phase 4.2 working visual baseline, not the final design. EN/RU Home, Projects/cases, About and four-entry Experience use approved shared facts; Lab stays concepts. No Home/Neon/3D redesign, new dependencies, CMS/backend or external deployment. Content awaits owner editorial review; noindex stays enabled. [Content sources, claims and gaps](docs/CANONICAL_CONTENT.md); [dated preparation](docs/PHASE_5_CONTENT_ARCHITECTURE_AUDIT.md). STOP after this block; no later phase auto-started.

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
- [Implemented canonical content / evidence / publication boundaries](docs/CANONICAL_CONTENT.md)

WorkHub contains the cross-project Portfolio status. Detailed technical memory stays in this repository; the verified Obsidian Portfolio folder contains long-term product ideas and roadmap. See `docs/MEMORY.md`; these layers are separate, not automatic mirrors.

## Environment

[`SITE_URL`](.env.example) is the deployment origin used by canonical, hreflang, and Open Graph URLs. It defaults to `http://localhost:3000` locally. Set it to the actual preview origin before building a hosted preview. Secrets stay outside Git.

## Deployment

CI runs all checks and Chromium tests on main pushes/PRs. Screenshots/failure traces are uploaded as `browser-qa`. Local production preview: build, then `npm run start -- --port 3001`; open `/en` or `/ru`. Content captures: `node scripts/phase5-content-review.mjs` → ignored `artifacts/phase5-content/README.md`. No external hosting configured; [preview options](docs/DEVELOPMENT.md#preview-and-hosting) remain undecided. Pages/previews stay noindex.

## Historical Portfolio 2023

The previous static portfolio and its complete Git history are preserved at tag `portfolio-2023`.
