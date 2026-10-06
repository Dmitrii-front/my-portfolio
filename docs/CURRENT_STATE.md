# Current State

**Updated:** 2026-10-06
**Phase:** 4.2 — Selected Work pinning + Neon / Contact polish
**Status:** Implemented; awaiting owner visual acceptance. STOP before external deployment or later phases.

## Completed

- D-013 authorizes one pinned presentation, the real Portfolio desktop source and targeted Neon/Close polish. Supersedes the previous neutral Portfolio/no-hardware rule and device-only sticky narrative.
- Selected Work pins its entire heading/narrative/device/control scene at ≥1024×900. CSS sticky, top 88px, visual frame ≥viewport−104px, native 120svh travel divided into three equal project dwell intervals. One visible narrative; one persistent MacBook. Native forward/reverse scroll updates content, case link, screen and pagination. Controls/Hub links land at the matching interval; release leads normally into Lab. No wheel interception or custom scroll engine.
- Compact widths and shorter windows keep native flow, touch swipe and project controls. No-JS keeps all narratives/case links and the first meaningful device visual.
- All three projects offer only verified MacBook screens. Pnlwise/Healthy originals are untouched. Portfolio uses a real project-owned local Home capture from accepted commit `520c961`, retained unchanged with SHA-256/provenance in `assets/sources/`. Nine WebP derivatives total 278,990B; missing tablet/mobile variants remain unavailable.
- Same project-authored procedural unbranded laptop and Hub models, lazy quality/failure boundaries and dependency stack. Device textures crossfade in the persistent canvas; CSS screenshots retain the previous image through decoding and fade only screen content.
- Neon uses one C2 logical trajectory in visual coordinates, with independently composed mobile/tablet/desktop stations. Invisible pin travel is removed from its geometry; the Work segment shares CSS-sticky space through an SVG portal, with adjoining document-flow portions. Exact same path/gradient/filter definitions are reused, not three separate journeys.
- Global Hero arc starts above the Hub; local network connections remain untouched. Intentional Work-heading, device, Lab-surface and Contact-glyph crossings rely only on real foreground alpha, never section/container rectangles or canvas masks.
- Sharp core remains 1/1.2px. Inner/ambient diffusion is wider/stronger. Scroll energy has a longer, more blurred envelope with ~31% peak gain in gradient opacity, no dot/head/sharp fragment; 320px local energy surface, static filters ≤376px. Reduced motion stays static.
- Open Close surface is 24% smaller; original 92/104px hit box, channel circles, fan/dismissal/focus behavior remain unchanged.
- EN/RU, persisted locale selection, metadata/noindex, navigation, typography, Lab and public route architecture are unchanged. Portfolio 2023 remains at published tag `portfolio-2023`.

## Validation

- Lint, strict typecheck, 27 unit tests, production Webpack build (23 prerendered routes), `npm audit` (0 vulnerabilities), focused diff review.
- Final browser results and local paint measurements are recorded in `docs/DEVELOPMENT.md` and `docs/NEON_INFRASTRUCTURE.md`.
- Chromium 56 pass / 37 intentional profile skips; WebKit and Firefox desktop 29 pass / 2 skips each. Final review has no page errors/overflow and both optional scenes reach ready with ordinary capability signals.
- 320/375/430/768/1024/1200/1440/1920 plus existing 767/1199 boundary checks; short 500/650px and tall windows. Native forward/reverse pin/release, direct selection, stable device/Neon coordinates, actual Portfolio texture, no missing device choices, no horizontal overflow.
- EN/RU axe, keyboard/focus-visible, Escape/outside/focus departure, no-JS and live reduced-motion fallback/resume. 3D init/chunk/draw/context failure and offscreen pause retained.
- Chromium initial resources: 151,688B JS at 375 / 151,875B larger widths (+697B, ~0.46% versus D-012), 8,156B CSS (+122B), unchanged 12,854–36,674B initial images; measured initial CLS 0, no external requests. Deferred 3D remains separately guarded <300KB.
- Fresh review index: ignored `artifacts/phase4-2/README.md`; full Home 375/768/1024/1440/1920, three device states, Hero/device occlusion/Lab→Contact/closed+open Contact, reduced motion and cross-engine captures. Full-page images include technical pin distance; viewport state images and live scroll are the authoritative presentation review.

## Next action / STOP

Owner visual acceptance at local `http://127.0.0.1:3000/en` and `/ru`. No later implementation or deployment without a new task. Physical-mobile, actual Safari, cold/high-DPR and assistive-technology validation remain release checks.

## Not implemented / risks

- Six missing tablet/mobile screen slots; no iPad/iPhone 3D geometry. Future verified manifest records can activate choices without section layout changes.
- Lab concepts and case routes remain placeholders/skeletons; noindex remains until publication/SEO review.
- No Supabase/Drizzle, CMS, product agent API, Audit Log, analytics or external hosting.
- Capability hints are not GPU benchmarks; local automated timing is not field performance certification.
- External preview account/provider and production origin remain owner decisions; no paid provider selected.
- WorkHub has unrelated dirty files and 19 pre-existing unpublished commits. Sync only Portfolio PROJECT/STATUS in a scoped local commit; do not push unrelated history.

## Memory / preview

Repository `docs/ARCHITECTURE.md`, `DECISIONS.md` (D-006 through D-013), `PROJECT_ASSETS.md`, `THREE_ENHANCEMENT.md`, `NEON_INFRASTRUCTURE.md`, `DEVELOPMENT.md` and baseline specification remain the technical source. WorkHub `/Users/macos/Documents/WorkHub/Projects/Portfolio/` holds only a concise control-plane summary.

Local preview uses the same production build: `npm run build`, then `npm run start`. Source/commit truth is GitHub main and Git history; CI verifies each main push.
