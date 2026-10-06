# Neon infrastructure — Phase 4.1

Phase 4 is technically accepted. D-011 separates foreground occlusion from layout; D-012 authorizes the subsequent curve/thickness/internal-energy correction. No redesign or dependencies. Models, Hub/SelectedWork state, track heights, Lab, Contact and locale routes remain unchanged. The initial Phase 4.1 reference remains in `artifacts/phase4-1/`; refinement artifacts are separate.

## Curve refinement

Independent responsive control polygons use paired turning stations spanning almost half the neighboring vertical intervals. Uniform cubic B-spline conversion produces identical first and second derivatives at adjacent segment boundaries (C2), starts turning before the station and distributes curvature. No round-join workaround or single-point turnaround. Convex hulls prevent overshoot; Y remains monotonic. Hub/Contact endpoints are exact; interior measured stations guide rather than constrain interpolation. Compact Work (including short-height desktop) has one broad device → Lab departure, not waves compressed from a three-step scroll track.

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
- Blended inner halo: 2.7px stroke, 1.9px Gaussian blur, opacity 0.42; ambient: 6px stroke, 8px blur, opacity 0.20. Sharp core remains 1/1.2px. Combined stroke-weight × opacity rises approximately 45% (a tuning proxy, not a perceptual measurement); most added light is diffusion. Black remains dominant, no environment/rainbow or full-page filter.
- Exact de Casteljau subdivision in `lib/neon-glow.ts` divides cubics until each control-hull dimension is ≤320px. With 28px padding per edge, each static nested SVG/filter is ≤376px per side. Local regions rasterize/cache independently; core geometry is not approximated.
- Scroll energy: only two blurred layers, feathered radially to zero, colored from the existing journey gradient at that station. No circle, sharp pulse core, head or unfiltered fragment. A 320px sampled support (41 points) exceeds the visible envelope even around bends, so fragment ends are invisible. Radius 88px mobile / 112px otherwise gives approximately 86/110px half-peak length on a straight segment, with diffuse tails. Local filter surface: 256×256px. `requestAnimationFrame` throttles scroll updates; no perpetual loop, React render per scroll or new track listeners.
- Reduced motion: complete static core/halos, energy hidden; live preference changes tested.
- Existing violet/blue Hub highlights, laptop material reflections and the local CSS base halo retain the light relationship. No physical cross-renderer lighting or model/material redesign.

## Initial Phase 4.1 baseline validation and profiling

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

## Reference correction — geometry measurements

Analytical cubic curvature sampled at 0.005 parameter intervals, identical real document anchors at height 1000px. Minimum radius within device → Lab (including joins); initial reference `be29d01` versus D-012. Interior station interpolation is intentionally replaced by a convex-hull-guided curve.

| Width | Minimum radius before → after, CSS px |
| --- | --- |
| 375 | 33.2 → 91.5 |
| 768 | 11.6 → 98.5 |
| 1024 | 63.8 → 135.3 |
| 1440 | 57.6 → 124.0 |
| 1920 | 48.4 → 106.3 |

Raw anchors/radii: `artifacts/neon-refinement/radius-comparison.json`. These measurements verify geometry change; perceived thickness, broad flow and absence of a separate energy shape still require owner visual acceptance.

## Reference correction — final QA and paint profile

Lint/typecheck, 26 unit tests, production build (23 pages), Chrome 56 pass / 37 profile skips; WebKit and Firefox desktop 29 pass / 2 skips each. Browser guards cover the unchanged core, zero-end envelope, color matching, absence of any circle/unfiltered energy fragment, bounded filters, responsive alpha continuity and reduced motion. Existing locale, no-JS, sticky/touch, fallback/3D and axe suites pass.

Fresh full/focused captures: `artifacts/neon-refinement/` at 375/768/1024/1440/1920; both scenes reach ready with ordinary capability signals. No overflow or page errors. Cross-engine 1440 captures and a static reduced-motion Home supplement Chrome. The earlier reference is not overwritten.

Same isolated six-pass Chrome method as above, after browser suites finished:

| Width | Tiles | Median Paint CPU / 90 frames, off → on | First on-pass Raster CPU |
| --- | --- | --- | --- |
| 375 | 17 | 5.49 → 10.52ms | 30.51ms |
| 1024 | 25 | 12.31 → 20.03ms | 41.04ms |
| 1440 | 25 | 11.29 → 17.82ms | 40.68ms |
| 1920 | 29 | 11.67 → 18.95ms | 41.82ms |

Added Paint CPU ~0.06–0.09ms per scroll frame; RAF median ~16.7ms, maximum p95 17.6ms, no gaps ≥50ms. Warm raster work is much lower than first-on work; raw samples are in `measurements.json`. Whole-page Script CPU totals are ~475–855ms per 90-frame pass; hiding halos does **not** disable energy sampling/other scroll callbacks, so this comparison isolates visual paint, not incremental JavaScript cost. Physical mobile, cold/high-DPR and Safari release QA remain necessary.

Essential compressed JS: 150,991B mobile / 151,178B larger, +330B (~0.22%) versus initial Phase 4.1. CSS 8,034B. Optional 3D policy/budgets remain unchanged. No external requests or measured initial hydration layout shift. No external deployment or later phase.
