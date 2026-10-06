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
npm run assets:prepare
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

Playwright starts the production server and saves fresh screenshots under `artifacts/phase4/` (ignored by Git and uploaded by CI). `foundation.spec.ts` retains locale preference precedence, route metadata, 404s, no-JS navigation, keyboard/skip-link and EN/RU axe checks. `home.spec.ts` covers Hub selection (including repeated hashes), active/expanded Hub contrast, verified-only devices and neutral project fallback, image aspect ratios, real Chromium touch swipe, sticky release, independently composed Neon profiles, desktop spacing, SVG Lab glyphs/browsing and Contact keyboard/Escape/outside dismissal/axe. Unit tests also check cubic continuity and asset-driven device resolution.

QA includes 320, 375, 430, 768, 1024, 1200, 1440 and 1920px, plus Phase 1 boundary checks at 767/1199px. Both 500px and 900px heights exercise sticky eligibility/degradation, verified availability, fan clipping and reduced motion. Captures include Home 375/1024/1440, Pnlwise/Healthy/Portfolio states, Lab and Contact open. Phase 3.1 passes 41 browser checks with 19 intentional profile-specific skips. Automated checks supplement, not replace, visual, cross-browser and assistive-technology review.

The initial-Home test records compressed resource bytes, image bytes, external requests and hydration layout shift at 375/768/1440px. Phase 3.1 baseline is approximately 149KB JS, 7.4KB CSS, 0–36.7KB initial images, no external resources, and zero measured initial layout shift. Verified desktop imagery now appears on compact viewports too, always in the correct MacBook frame. Regression guards are 400KB JS, 60KB CSS, 150KB images and layout shift <0.1; these are development checks, not field Core Web Vitals claims. Measurements are attached to test results.

For a running local server and installed Chrome:

```bash
PLAYWRIGHT_CHANNEL=chrome PLAYWRIGHT_DISABLE_WEBSERVER=1 npm run test:e2e
```

## Phase 4 QA additions

Detailed quality/provenance/fallback/performance policy: [`THREE_ENHANCEMENT.md`](THREE_ENHANCEMENT.md). Fresh captures now go to `artifacts/phase4/` (ignored, CI artifact); Phase 3.1 values above are the comparison baseline. `three.spec.ts` adds capability constraints, DOM semantics, persistent texture switching, initialization/draw/chunk/context failure, offscreen pause and DPR/resize checks. Capable-path tests explicitly report eight cores even on low-core CI; constrained visits have separate tests. Chromium test launches permit SwiftShader when hardware WebGL is unavailable in CI; this is testing configuration, not production capability bypass.

```bash
npx playwright install webkit firefox
PLAYWRIGHT_ENGINE=webkit PLAYWRIGHT_DISABLE_WEBSERVER=1 npm run test:e2e -- --project=desktop --workers=1
PLAYWRIGHT_ENGINE=firefox PLAYWRIGHT_DISABLE_WEBSERVER=1 npm run test:e2e -- --project=desktop --workers=1
node scripts/phase4-review.mjs
REVIEW_ENGINE=webkit REVIEW_SMOKE=1 node scripts/phase4-review.mjs
REVIEW_ENGINE=firefox REVIEW_SMOKE=1 node scripts/phase4-review.mjs
```

Run engines sequentially on macOS; native keyboard behavior/preferences differ. Review script uses unmodified capability signals; it reports initial essential JS separately from deferred scene requests, and includes fallback image bytes. Safari proper and physical mobile remain release checks.

Phase 4 final QA: lint, strict typecheck, 18 unit tests, production build (23 prerendered routes), Chromium 54 pass / 33 profile skips, WebKit desktop 27 pass / 2 skips and Firefox desktop 27 pass / 2 skips. Cross-engine cases include 320–1920/short-height 3D, fallback/error injection, texture swaps, offscreen pause, reduced-motion resume and axe. Original image manifest, SelectedWork state/sticky logic, Neon geometry, Lab and Contact have no diff.

## Phase 4.1 Neon QA

Phase 4.1 Neon policy and measured paint cost: [`NEON_INFRASTRUCTURE.md`](NEON_INFRASTRUCTURE.md). `neon.spec.ts` guards absence of container masks/opaque track backgrounds, localized filter bounds, responsive profiles, overflow, static reduced motion and axe. `neon-glow.test.ts` checks exact connected subdivision and bounded filter surfaces.

```bash
node scripts/phase4-1-review.mjs
```

Captures/measurements go to ignored `artifacts/phase4-1/`. The review compares six alternating 90-frame scroll passes with/without halos on identical CSS-fallback pages, separating SVG paint from optional 3D. Run it after other browser processes finish to reduce profiling noise; browser engines must not share an active Playwright output directory.

Final Phase 4.1 checks: 24 unit tests, production build (23 pages), Chromium 56 pass / 37 profile skips, WebKit and Firefox desktop 29 pass / 2 skips each. Full/focused compositions are reviewed separately from isolated filter profiling. Initial-byte tests use fresh pages at every width, keeping error assertions without cache/navigation-abort contamination.

### Reference correction

D-012 adds C2 curvature/compact-radius tests (26 unit tests total). Browser guards reject travelling circles/unfiltered sharp fragments, require a feathered color-matched envelope and preserve the original 1.2px sharp core. Local static filter bounds are now ≤376px; the energy surface is 256px, never document-sized. Section/model/state files remain unchanged.

```bash
REVIEW_DIRECTORY=artifacts/neon-refinement node scripts/phase4-1-review.mjs
REVIEW_DIRECTORY=artifacts/neon-refinement REVIEW_ENGINE=webkit REVIEW_SMOKE=1 node scripts/phase4-1-review.mjs
REVIEW_DIRECTORY=artifacts/neon-refinement REVIEW_ENGINE=firefox REVIEW_SMOKE=1 node scripts/phase4-1-review.mjs
```

This preserves the initial `artifacts/phase4-1/` reference. New captures add Healthy, Selected Work → Lab, visible bloom details and open Contact. Run browser engines and filter profiling sequentially. Analytical before/after minimum radii at identical measured anchors are recorded in `radius-comparison.json`; numbers supplement full-page visual inspection, not replace it.

## Audited image preparation

`npm run assets:prepare` reads only the two audited originals from `~/Desktop/screenshots` (or a directory supplied as its argument), verifies SHA-256 hashes and writes six optimized WebP derivatives to `public/projects`. It reuses Next's installed Sharp offline; no dependency or image hosting provider is added. A changed source must be re-audited before updating the hashes. See `docs/PROJECT_ASSETS.md` for exact mapping, privacy review and missing device variants. Do not commit the full archive, private OCR inventory or contact sheets.

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
