# Current State

**Updated:** 2026-10-06

**Phase:** 4.1 — Neon visual infrastructure

**Status:** Phase 4 technically accepted. Phase 4.1 implemented and verified, awaiting owner visual acceptance. Approved Home composition/interactions/models preserved. STOP before external deployment or later product phases.

## Completed

- D-011 separates document/scroll geometry, visible foreground and actual Neon occlusion. Removed wrapper-sized text/narrative/fallback masks; invisible control rows and labels no longer paint opaque rectangles. Real CSS/HTML surfaces and alpha-transparent WebGL provide exact visual occlusion without model readback or duplicated silhouettes. Scroll tracks/heights and scene models are unchanged.
- Neon uses unchanged mobile/tablet/desktop curves with a thin core, close inner halo and restrained ambient halo. Exact cubic subdivision bounds static filter surfaces to ≤364px per side; travelling scroll-energy glow stays within 96×96px. Reduced motion is static, without a travelling pulse. Details/paint profile: `docs/NEON_INFRASTRUCTURE.md`.

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

- Clean lint, strict typecheck, 24 unit tests and production Webpack build (23 prerendered pages). Approved journey paths are byte-identical at 375/768/1024/1440/1920; focused diff review shows no changes to SelectedWork interactions/scroll heights, 3D models, Lab, Contact or screen manifest.
- Chromium: 56 browser checks pass, 37 intentional profile-specific skips. WebKit and Firefox desktop: 29 pass / 2 profile skips each. Prior foundation/axe/3D/fallback/sticky checks plus transparent scroll/control backgrounds, bounded glow surfaces, continuity profiles and static reduced-motion light.
- Widths 320/375/430/768/1024/1200/1440/1920, plus 767/1199 boundaries; heights 500/900. No document overflow or open-fan viewport clipping detected; sticky release and touch swipe preserved.
- EN/RU Home and open Contact axe checks, keyboard/focus, reduced motion and no-JS content/menu/language/contact fallback.
- Fresh artifacts: ignored `artifacts/phase4-1/`, including full Home 375/768/1024/1440/1920, focused Hub/device/Lab/Contact continuity and reduced motion; WebKit/Firefox full/focused 1440 captures. Earlier Phase 4 3D/texture artifacts remain available.
- Phase 4.1 essential JS ~151KB (+683B to Phase 4), CSS ~8.1KB; optional 3D loading/budgets unchanged. Local filter-paint comparison and limitations: `docs/NEON_INFRASTRUCTURE.md`; Phase 4 comparison baseline: `docs/THREE_ENHANCEMENT.md`. No field performance guarantee.

## Next action

Owner visual acceptance of Phase 4.1 at `/en` and `/ru`, plus physical-mobile/Safari performance review. Obtain missing verified screen variants; do not fabricate them. External deployment and any later implementation require a separate owner task.

## Not implemented

- iPad/iPhone 3D geometry (shared device boundary and existing CSS fallbacks are ready for future verified variants).
- Seven missing screen slots: Pnlwise/Healthy tablet + mobile; Portfolio desktop + tablet + mobile. Missing device choices are not exposed publicly; Portfolio has a neutral project fallback.
- Full case studies, professional timeline and published Lab experiments.
- Supabase/Drizzle, Admin CMS, product AI-agent API, Audit Log or analytics.
- External hosting and production cutover.

## Decisions / blockers

- D-006 locale, D-007 Home scope, D-008 Phase 3 direction, D-009 verified-only devices, D-010 limited progressive 3D and D-011 object-only Neon occlusion/local light are accepted. Contact URLs remain unchanged in `lib/site-config.ts` and D-008.
- No implementation blocker for local review. Missing credible screen variants are not permission to synthesize product UI. Conservative 3D budgets/measurements are documented.
- Production origin and external hosting account/provider remain owner decisions; no paid provider is selected.

## Risks / handoff

- Lab remains temporary concept content and case routes remain skeletons. Keep noindex/robots policy until publication/SEO review.
- Playwright Chromium/WebKit/Firefox automation is not actual Safari, physical-mobile or assistive-technology certification. Those remain release checks; conservative capability hints are not a GPU benchmark.
- Sticky eligibility remains ≥1024×700; canvas bounds and short-height compact degradation are tested. Preserve this boundary with future content/devices.
- WorkHub had unrelated dirty files and 17 unpublished commits before Phase 4.1. Synchronize only Portfolio summary in isolation; do not push unrelated history.

## Memory and preview

- Architecture: `docs/ARCHITECTURE.md`; decisions: `docs/DECISIONS.md`; images: `docs/PROJECT_ASSETS.md`; 3D: `docs/THREE_ENHANCEMENT.md`; Neon/metrics: `docs/NEON_INFRASTRUCTURE.md`; QA/hosting: `docs/DEVELOPMENT.md`. Fresh artifacts: ignored `artifacts/phase4-1/`.
- WorkHub: `/Users/macos/Documents/WorkHub/Projects/Portfolio/`.
- Local preview: `http://127.0.0.1:3000/en` and `/ru` after `npm run build && npm run start`.
