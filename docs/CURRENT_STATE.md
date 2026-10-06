# Current State

**Updated:** 2026-10-06

**Phase:** 4 — Progressive 3D enhancement

**Status:** Phase 3.1 visually accepted. Phase 4 implemented and verified, awaiting owner visual acceptance. STOP: no later phase started.

## Completed

- Lazy Three.js 0.186.1 / R3F 9.8.1 / Drei 10.7.9 enhance only Hub and the persistent DeviceShowcase. DOM controls/content, responsive/sticky selection, SVG Neon geometry, Lab and Contact are untouched. D-010 records the approved scope and conservative quality policy.
- Shared capability/loading/error boundary retains meaningful CSS/HTML until first successful draw. HIGH DPR ≤1.5, STANDARD DPR 1, FALLBACK for constraints/errors/reduced motion. First-draw/render/context/chunk failures are contained; live reduced-motion fallback/resume is tested. Hub idle is visible-only 15/30Hz; device is demand-driven. Project-owned procedural laptop/modules, no external models/HDRs or branded assets; only verified desktop WebP textures. Full details/provenance/budgets: `docs/THREE_ENHANCEMENT.md`.

- Accepted EN/RU foundation and Phase 2 Home architecture are preserved: one persistent device scene, independent project/device selection, sticky narrative and touch-first compact layouts.
- D-008 records local lighting/depth, rectangular Hub, interior Neon Path, quieter Lab and circular 180° Contact fan. No broad decorative backgrounds; these approved 2D presentations remain the fallback.
- D-009 records verified-only public devices and this narrow polish scope. Pnlwise/Healthy offer only MacBook on every viewport; Portfolio uses a neutral project fallback without device controls or hardware frame. Preferred device state remains separate; future verified variants activate from the manifest without section layout changes. The selector slot reserves presentation geometry.
- Read-only screenshot audit: 961 raster files, 685 September candidates; visually reviewed relevant project contact sheets and all 78 non-reference portrait candidates. Two clean desktop screens selected: Pnlwise public landing and Healthy public doctor-search Home. Exact sources, hashes, privacy rationale and missing variants: `docs/PROJECT_ASSETS.md`.
- Six WebP derivatives (640/1280/1920px) total 202,542 bytes, largest 62,326 bytes. Explicit dimensions, responsive srcsets, lazy loading and contain-fit; originals stay outside the repository. Offline preparation is reproducible with source-hash guards.
- Desktop device max-width increased 640→720px (+12.5%); steps 72→63svh (−12.5%); gap 24→20px. Sticky architecture/eligibility/release, compact navigation and local illumination preserved; no photorealistic CSS work. `DeviceShowcase` remains the replaceable R3F boundary.
- Neon Path uses independently authored mobile/tablet/desktop broad lateral S-like curves: Hub → under device → leave in a different direction → Lab → Contact. Smooth cubic joins, foreground occlusion, restrained brightness, scroll illumination and reduced motion; sticky measurement does not chase the moving device.
- Hub retains rounded rectangular nodes and approved selection behavior, adding inner highlights, fine-pointer hover depth and a visible-only active connection pulse.
- Lab keeps horizontal interaction and quiet columns; four coherent 24px technical inline SVG glyphs replace arbitrary Unicode marks.
- Contact exposes confirmed Telegram, LinkedIn, GitHub and Email links, shared by Home and Contact page. Circular trigger/icons, adaptive upward fan, sequential/reverse reveal, keyboard/Escape/outside/focus handling and no-JS links. No public phone/WhatsApp.
- Portfolio 2023 remains at published tag `portfolio-2023` (`0ff4ec1`); accepted Phase 1 (`391fe68`) and Phase 2 (`4455c4f`) history is preserved.

## Validation

- Clean lint, strict typecheck, 18 unit tests and production Webpack build (23 prerendered pages); focused diff review shows no changes to SelectedWork interactions, Neon geometry, Lab, Contact or screen manifest.
- Chromium: 54 browser checks pass, 33 intentional profile-specific skips. WebKit and Firefox desktop: 27 pass / 2 profile skips each. Includes prior foundation/axe checks plus capability constraints, semantic controls, persistent verified texture swaps, live reduced-motion resume, initialization/draw/chunk/context failure, offscreen pause and DPR/resize.
- Widths 320/375/430/768/1024/1200/1440/1920, plus 767/1199 boundaries; heights 500/900. No document overflow or open-fan viewport clipping detected; sticky release and touch swipe preserved.
- EN/RU Home and open Contact axe checks, keyboard/focus, reduced motion and no-JS content/menu/language/contact fallback.
- Fresh artifacts: ignored `artifacts/phase4/`, including Home 375/1024/1440, Hub default/active/expanded, Pnlwise/Healthy, neutral Portfolio, 2D fallbacks and preserved Lab/Contact states. Dedicated browser-prefixed captures distinguish 3D from structural/reduced-motion captures.
- Phase 3.1 baseline ~149KB essential JS / 7.4KB CSS. Phase 4 essential JS ~150KB, deferred renderer/scenes ~252KB; zero binary model transfer, existing 640/1280 WebP textures. Full final local metrics and limitations: `docs/THREE_ENHANCEMENT.md`; not a field performance guarantee.

## Next action

Owner visual acceptance of Phase 4 at `/en` and `/ru`, plus physical-mobile/Safari performance review. Obtain missing verified screen variants; do not fabricate them. Any later phase requires a separate owner task.

## Not implemented

- iPad/iPhone 3D geometry (shared device boundary and existing CSS fallbacks are ready for future verified variants).
- Seven missing screen slots: Pnlwise/Healthy tablet + mobile; Portfolio desktop + tablet + mobile. Missing device choices are not exposed publicly; Portfolio has a neutral project fallback.
- Full case studies, professional timeline and published Lab experiments.
- Supabase/Drizzle, Admin CMS, product AI-agent API, Audit Log or analytics.
- External hosting and production cutover.

## Decisions / blockers

- D-006 locale, D-007 Home scope, D-008 Phase 3 direction, D-009 verified-only devices and D-010 limited progressive 3D are accepted. Contact URLs remain unchanged in `lib/site-config.ts` and D-008.
- No implementation blocker for local review. Missing credible screen variants are not permission to synthesize product UI. Conservative 3D budgets/measurements are documented.
- Production origin and external hosting account/provider remain owner decisions; no paid provider is selected.

## Risks / handoff

- Lab remains temporary concept content and case routes remain skeletons. Keep noindex/robots policy until publication/SEO review.
- Playwright Chromium/WebKit/Firefox automation is not actual Safari, physical-mobile or assistive-technology certification. Those remain release checks; conservative capability hints are not a GPU benchmark.
- Sticky eligibility remains ≥1024×700; canvas bounds and short-height compact degradation are tested. Preserve this boundary with future content/devices.
- WorkHub had unrelated dirty files and 16 unpublished commits before Phase 4. Synchronize only Portfolio summary in isolation; do not push unrelated history.

## Memory and preview

- Architecture: `docs/ARCHITECTURE.md`; decisions: `docs/DECISIONS.md`; images: `docs/PROJECT_ASSETS.md`; 3D/metrics: `docs/THREE_ENHANCEMENT.md`; QA/hosting: `docs/DEVELOPMENT.md`. Fresh artifacts: ignored `artifacts/phase4/`.
- WorkHub: `/Users/macos/Documents/WorkHub/Projects/Portfolio/`.
- Local preview: `http://127.0.0.1:3000/en` and `/ru` after `npm run build && npm run start`.
