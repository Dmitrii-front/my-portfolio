# Current State

**Updated:** 2026-10-12 (Phase 5 preparation; application unchanged)
**Application:** Implemented through Phase 4.2; frozen working visual baseline.
**Current work:** Phase 5 content / information-architecture preparation — planning/documentation only.
**Status:** Preparation complete; awaiting architecture/content approval and prioritized owner facts. Phase 5 implementation NOT STARTED. No further visual polish authorized.

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

## Phase 4.2 validation (2026-10-06)

- Lint, strict typecheck, 27 unit tests, production Webpack build (23 prerendered routes), `npm audit` (0 vulnerabilities), focused diff review.
- Final browser results and local paint measurements are recorded in `docs/DEVELOPMENT.md` and `docs/NEON_INFRASTRUCTURE.md`.
- Chromium 56 pass / 37 intentional profile skips; WebKit and Firefox desktop 29 pass / 2 skips each. Final review has no page errors/overflow and both optional scenes reach ready with ordinary capability signals.
- 320/375/430/768/1024/1200/1440/1920 plus existing 767/1199 boundary checks; short 500/650px and tall windows. Native forward/reverse pin/release, direct selection, stable device/Neon coordinates, actual Portfolio texture, no missing device choices, no horizontal overflow.
- EN/RU axe, keyboard/focus-visible, Escape/outside/focus departure, no-JS and live reduced-motion fallback/resume. 3D init/chunk/draw/context failure and offscreen pause retained.
- Chromium initial resources: 151,688B JS at 375 / 151,875B larger widths (+697B, ~0.46% versus D-012), 8,156B CSS (+122B), unchanged 12,854–36,674B initial images; measured initial CLS 0, no external requests. Deferred 3D remains separately guarded <300KB.
- Fresh review index: ignored `artifacts/phase4-2/README.md`; full Home 375/768/1024/1440/1920, three device states, Hero/device occlusion/Lab→Contact/closed+open Contact, reduced motion and cross-engine captures. Full-page images include technical pin distance; viewport state images and live scroll are the authoritative presentation review.

## Next action / STOP

Review `docs/PHASE_5_CONTENT_ARCHITECTURE_AUDIT.md` and answer its consolidated P0 questionnaire. Approve content ownership/minimum case-study facts, then authorize a separate implementation task. D-015 freezes Phase 4.2 rather than rejects or finally accepts it; its earlier visual-acceptance-first gate is deferred, not a blocker to content preparation. Preserve/reuse existing Home and stop Neon/presentation polishing. No application implementation or deployment in this task. Physical-mobile, actual Safari, cold/high-DPR and assistive-technology validation remain release checks.

## Not implemented / risks

- Six missing tablet/mobile screen slots; no iPad/iPhone 3D geometry. Future verified manifest records can activate choices without section layout changes.
- Lab concepts and case routes remain placeholders/skeletons; noindex remains until publication/SEO review.
- No Supabase/Drizzle, CMS, product agent API, Audit Log, analytics or external hosting.
- Capability hints are not GPU benchmarks; local automated timing is not field performance certification.
- External preview account/provider and production origin remain owner decisions; no paid provider selected.
- WorkHub has unrelated dirty files and 21 unpublished commits at preparation entry (including the prior audit summary). Preparation sync stays a separate Portfolio-only local commit; do not push unrelated history.

## Memory / preview

Repository `docs/ARCHITECTURE.md`, `DECISIONS.md` (through D-015), `PROJECT_ASSETS.md`, `THREE_ENHANCEMENT.md`, `NEON_INFRASTRUCTURE.md`, `DEVELOPMENT.md` and the unchanged baseline specification remain the technical source. The versioned Phase 5 preparation holds route/Home responsibility maps, project gaps, a storage-neutral content proposal, localization/assets/SEO requirements, master matrix and one P0/P1/P2 questionnaire. These are not approved facts or implemented CMS models. WorkHub `/Users/macos/Documents/WorkHub/Projects/Portfolio/` holds only a concise control-plane summary.

Audit: `docs/AUDIT_2026-10-12.md`. The registered Obsidian vault was verified, but no dedicated Portfolio notes/mirror existed before this audit; previous repository/WorkHub updates were **not Obsidian integration**. Three small product-memory notes were created and read back on 2026-10-12. Exact paths/ownership/read workflow: `docs/MEMORY.md`. Telegram Portfolio Bot is Future/Backlog, DEVELOPMENT STATUS: NOT STARTED; no application code, API, token, dependency or infrastructure was added. It is not the automatic next task. Full iCloud text search stalled; unrelated generic mentions and cloud replication/UI visibility are not certified.

Fresh full-audit QA (2026-10-12, prior to this preparation): check passes (27 units / 23-route build), audit 0 vulnerabilities; installed Chrome 56 pass / 37 skips, WebKit and Firefox desktop 29 pass / 2 skips each. Bundled Chromium is absent locally; no browser/dependency download. Source tree is unchanged. Chrome initial JS/CLS remain at the application baseline; historical paint/GPU profiles were not rerun. Final visual acceptance remains pending but is no longer the immediate priority under D-015.

Local preview uses the same production build: `npm run build`, then `npm run start`. Source/commit truth is GitHub main and Git history; CI verifies each main push.
