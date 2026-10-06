# Neon infrastructure — Phase 4.1

Phase 4 is technically accepted. D-011 fixes continuity, foreground occlusion and light only; no redesign or new dependencies. Approved `neonJourney` output is byte-identical to Phase 4 at 375/768/1024/1440/1920. Model files, Hub/SelectedWork state, track heights, Lab, Contact and locale routes have no implementation diff.

## Three independent geometries

- **Layout/scroll:** sections, `.work-layout`, narrative steps and sticky presentation determine stations, trigger heights and native selection. They do not paint occlusion. The journey still anchors to the device's document station, not its moving sticky viewport box.
- **Visible foreground:** CSS device body/screen/base, actual 3D meshes, Hub surfaces/featured disclosure, Lab columns and circular Contact controls.
- **Occlusion:** opaque pixels of those foreground surfaces above the SVG. Transparent pixels reveal the path. No bounding rectangle is inferred from a section, narrative, canvas, interaction area or padding.

Native DOM/WebGL alpha compositing is sufficient: transparent R3F canvases are already `alpha: true`, pointer-transparent and above the journey. They now expose the underlying line outside the object silhouette. No extra model projection, WebGL readback, duplicate silhouette, dynamic document-sized mask or scroll-driven model update is needed. The same principle works for CSS fallback and all responsive sizes.

## Audit and fixes

| Previous occluder | Resolution |
| --- | --- |
| `.hero-copy`, `.hub-context` SVG rectangles | Remove; text/context wrappers are not solid objects |
| `.section-heading`, `#contact-title` rectangles | Remove; no heading-sized blank space mask |
| `.work-narratives` rectangle | Remove; oversized multi-step scroll geometry never masks |
| `.project-fallback` rectangle/background | Remove; neutral content is not a padded opaque panel |
| `.device-selector`, `.project-controls` row backgrounds | Transparent rows; real selected/hover button surfaces remain |
| `.work-active-label` row background | Transparent label area |
| `.device-showcase`, `.scene-enhancement`, R3F canvas bounds | Already transparent; retain actual foreground alpha, never add rectangle masks |
| Hub, device body, Lab cards, Contact circles | Keep intentional real foreground surfaces; no new masks |

Scroll tracks were not shortened. Lighting/line can pass through empty track space and transparent canvas areas; actual sticky object occlusion moves naturally with the object. Narrative glyphs remain above the restrained line without masking their surrounding empty space. Lab occlusion follows the existing visible column surfaces, not the entire horizontal track/padding.

## Light and motion

- Base thin 1px core plus 1.2px scroll-illuminated core; violet → blue → restrained emerald → violet gradient remains smooth in document coordinates.
- Close inner halo: 2px stroke, 1.6px Gaussian blur, opacity 0.32.
- Soft ambient halo: 4px stroke, 6px blur, opacity 0.16. Black remains dominant; no bloom/environment/rainbow or full-page filter.
- Exact de Casteljau subdivision in `lib/neon-glow.ts` divides existing cubics until each control-hull dimension is ≤320px. With 22px filter padding per edge, each nested SVG/filter surface is ≤364px per side. Clipped local regions permit independent rasterization/caching; core geometry is not approximated.
- Scroll energy: a 48px local path fragment and tiny core point, two slightly stronger halos bounded within 96×96px. `requestAnimationFrame` throttles scroll updates; no perpetual animation loop, React render per scroll or new listeners on project tracks.
- Reduced motion: complete static core/halos, energy hidden; live preference changes tested.
- Existing violet/blue Hub highlights, laptop material reflections and the local CSS base halo retain the light relationship. No physical cross-renderer lighting or model/material redesign.

## Validation and profiling

`npm run check`: clean lint/strict typecheck, 24 unit tests, production build (23 prerendered pages). Chromium 56 pass / 37 intentional profile skips; WebKit/Firefox desktop 29 pass / 2 skips each. Coverage includes prior interactions/axe plus wrapper transparency, filter bounds, responsive light, overflow and reduced-motion pulse removal. Initial-visit measurements now use fresh pages rather than resize/reload of an existing Home: this prevents cached zero byte counts and WebKit errors from aborting a previous Next prefetch, while preserving zero-error assertions for each measured visit.

`node scripts/phase4-1-review.mjs` saves full Home and Hub/device/Lab/Contact compositions at 375/768/1024/1440/1920, plus a reduced-motion Home, under ignored `artifacts/phase4-1/`. `REVIEW_ENGINE=webkit|firefox REVIEW_SMOKE=1` saves 1440 cross-engine captures in matching subdirectories. No screenshot originals, production assets or 3D dependencies change.

The Chrome paint comparison uses identical CSS-fallback visits (reported two cores, normal motion, DPR 1), six alternating 90-frame full-page scroll passes with/without static halos and energy. It records CDP Paint/RasterTask CPU totals and RAF gaps. This isolates filter paint from optional 3D; it is not a physical-mobile benchmark. Raster tasks may overlap across threads, so their sums are CPU work, not elapsed wall time. First-on raster work and warm medians must be reported separately. Run after other browser suites finish.

Final Chrome sample (2026-10-06), after other browser suites finished:

| Width | Glow tiles | Median Paint CPU / 90 frames, off → on | First on-pass Raster CPU |
| --- | --- | --- | --- |
| 375 | 12 | 5.85 → 8.76ms | 31.96ms |
| 1024 | 22 | 13.14 → 17.79ms | 45.16ms |
| 1440 | 25 | 12.09 → 17.65ms | 46.11ms |
| 1920 | 28 | 12.73 → 18.62ms | 44.16ms |

Added Paint CPU is ~0.03–0.07ms per scroll frame in this sample. Later on-passes rasterize ~11–14ms total per 90 frames versus ~8–10ms off; first-pass rasterization costs more. RAF median stays ~16.7ms, p95 ≤17.6ms, zero gaps ≥50ms in these samples. Trace totals include other page paint, and warmed caches/driver scheduling can affect comparisons; do not infer physical-mobile performance from these numbers.

Essential compressed JS: 150,661B at 375 / 150,848B at larger widths, +683B (~0.45%) to Phase 4. CSS: 8,058B, +437B. Lazy 3D policy and separate <300KB guard remain unchanged. Initial Chrome hydration CLS is 0; no external resource requests, route errors or horizontal overflow in reviewed compositions. Both optional scenes reach ready with ordinary local capability signals; WebKit/Firefox 1440 captures also report ready and no errors/overflow.

Raw values: ignored `artifacts/phase4-1/measurements.json`. Physical-device/Safari and cold/high-DPR validation remain release checks. No external deployment or later phase was started.
