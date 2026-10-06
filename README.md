# Portfolio 2026

Production portfolio platform for Dmitry: a premium public site, structured case studies, CMS, scoped AI-agent workflows, analytics, and selective 3D interactions.

The repository is currently at **Phase 0: foundation**. It contains a minimal application shell and engineering infrastructure, not the final Home experience.

## Requirements

- Node.js 22.14 or newer
- npm (bundled with Node.js)

## Setup

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` — local Next.js development server.
- `npm run lint` — ESLint.
- `npm run typecheck` — strict TypeScript check.
- `npm test` — unit tests with Vitest.
- `npm run build` — production build.
- `npm run check` — all Phase 0 checks in CI order.

## Current stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest

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

Phase 0 has no environment variables. When an integration is introduced, its variable names and safe placeholders must be added to `.env.example`; secrets stay outside Git.

## Deployment

CI runs on pushes to `main` and pull requests. Preview and production hosting will be GitHub-driven. The production provider remains an explicit pre-cutover decision; the application must remain portable where practical.

## Historical Portfolio 2023

The previous static portfolio and its complete Git history are preserved at tag `portfolio-2023`.
