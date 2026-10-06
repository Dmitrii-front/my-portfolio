# Development

## Working cycle

Before changing code:

1. Read `AGENTS.md`.
2. Check `git status --short --branch`.
3. Read `docs/CURRENT_STATE.md`, `docs/DECISIONS.md`, and task-relevant documentation.
4. Consult the WorkHub Portfolio summary when cross-project status matters.
5. Confirm that the task does not conflict with an accepted decision.

After a completed block:

1. Run relevant checks; use `npm run check` for application changes.
2. Review `git diff` and staged files.
3. Update current state, decisions, risks, blockers, and next action where they changed.
4. Synchronize the concise WorkHub status when needed.
5. Commit the completed block and push when safe.

## Local commands

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm run check
npm run test:e2e
```

## Code conventions

- Prefer React Server Components; add `"use client"` only for real client-side behavior.
- Keep domain logic independent from components and providers.
- Use semantic HTML, visible focus, keyboard support, adequate targets, and reduced-motion behavior.
- Lazy-load optional 3D and provide a non-WebGL fallback.
- Add tests for permissions, mutations, formatting, and other critical logic as those features appear.
- Avoid abstractions until at least two concrete consumers justify them.
- Public routes always carry the locale prefix; derive links from `localizedPath` and translate shared UI through dictionaries.
- Keep cookie-setting locale links as ordinary anchors; Next.js prefetch must not change language preferences.
- `npm run typecheck` regenerates route types to avoid stale `.next` references after route changes.
- Production builds use the supported Webpack builder because Turbopack’s local CSS worker sockets failed in the restricted execution environment. Runtime architecture is unchanged.

## Browser QA and screenshots

After `npm run build`:

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production server, checks representative mobile/tablet/desktop compositions, and saves EN/RU screenshots under `artifacts/phase1/` (ignored by Git). CI also checks breakpoints at 320, 375, 767, 768, 1199, 1200, and 1920px. It tests locale preference precedence, route metadata, 404s, native navigation without JS, keyboard/skip link, and reduced motion. Automated axe checks cover Home in both locales; they supplement visual/keyboard checks rather than guarantee a complete accessibility audit.

For a running local server and installed Chrome:

```bash
PLAYWRIGHT_CHANNEL=chrome PLAYWRIGHT_DISABLE_WEBSERVER=1 npm run test:e2e
```

## Preview and hosting

**Investigated:** 2026-10-06. There is no checked-in provider configuration or GitHub deployment record. Local `npm run build && npm run start` previews the same repository code. An external preview must deploy a GitHub commit and set `SITE_URL` to its real origin; placeholders stay noindex.

Recommendation: use a GitHub-connected Vercel preview for the shortest path to reviewing native Next.js, if the account and permitted plan fit this project. Vercel creates deployments from Git branches ([official documentation](https://vercel.com/docs/git)). Its free Hobby plan is limited to non-commercial personal use; do not silently select a paid plan or assume a client-facing portfolio qualifies ([plan documentation](https://vercel.com/docs/plans/hobby)). This recommendation does not select the production provider.

Cloudflare Workers remains an alternative to evaluate. Its current documentation recommends the beta vinext runtime and also documents other Next.js deployment paths; validate exact Next.js 16 compatibility before introducing an adapter ([official documentation](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)). Do not migrate the framework solely for a Phase 1 preview.

A standard Node host can run `next start` and avoids a provider adapter, while requiring more deployment operations ([Next.js self-hosting](https://nextjs.org/docs/app/guides/self-hosting)). A static-only host cannot supply the request-dependent cookie/language redirects or future Admin/API runtime without extra server infrastructure.

## Environment and secrets

- Never commit credentials, tokens, service-role keys, or private payloads.
- Add public variable names and safe placeholders to `.env.example` when first introduced.
- Keep privileged keys server-only and validate uploads and mutations on the server.

## Git

- `main` is the GitHub-backed source of truth.
- Portfolio 2023 is preserved at tag `portfolio-2023`.
- Use small, coherent commits with short imperative English messages.
- Do not force-push or rewrite `main`.
- Verify remote state after pushing a finished block.
