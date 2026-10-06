# Progressive 3D — Phase 4

The owner accepted Phase 3.1 composition and interactions. D-010 limits enhancement to Product Hub and DeviceShowcase; no Home redesign, backend or provider integration.

Phase 4 is technically accepted. Phase 4.1 changes SVG/DOM Neon light/occlusion only, not these models, rendering boundaries or texture policy. Current journey audit/paint measurements: [`NEON_INFRASTRUCTURE.md`](NEON_INFRASTRUCTURE.md). The measurements below remain the Phase 4 comparison baseline.

## Boundaries and failures

`components/three/enhancement.tsx` is the shared DOM-side boundary. It probes capability once per visit, observes proximity/visibility, waits 1.5 seconds near the scene after hydration and then requests a React lazy module. Leaving before that delay cancels the request. Hub loads when visible; device proximity adds 200px. Neither scene module is included in essential route scripts.

Approved CSS surfaces and actual HTML screenshots remain until a scene successfully draws. Transparent, absolutely positioned canvases occupy existing bounds without layout contribution. Native Hub buttons/labels, featured anchors, project narratives, image alternatives and project/device controls stay in DOM. Canvases are decorative, aria-hidden, non-focusable and pointer-transparent. No WebGL-only controls or OrbitControls.

React errors/chunk rejection are caught per enhancement. `useRendererGuard` installs before the first draw: renderer exceptions and context loss restore CSS/static presentation instead of crashing Home. Pending/slow JS retains meaningful HTML. Reduced motion uses accepted stable 2D and does not even allocate a probe context. Failure stays in fallback until reload rather than repeatedly retrying a failing renderer.

## Quality and scheduling

| Tier | Signals | Rendering |
| --- | --- | --- |
| HIGH | Fine pointer, viewport ≥1200, reported ≥8 cores, no constraint | Native DPR capped at 1.5, antialiasing, restrained pointer response; Hub 30Hz while visible |
| STANDARD | Other WebGL2-capable visits; unknown hardware is allowed | DPR 1, no antialiasing/parallax, Hub 15Hz while visible |
| FALLBACK | Reduced motion, Save-Data, reported ≤2 cores/≤2GB RAM, absent WebGL2, scene failure | Approved CSS/HTML; constrained capability never requests 3D chunks |

Browser hints are not a GPU benchmark or device guarantee. Both canvases may remain mounted, but only Hub owns a timed idle; the persistent device renders on demand for selection, resize and short settling/crossfade. Hub timers stop outside the viewport and in hidden tabs. Device pauses away from its presentation; Portfolio hides/pauses the same canvas without remounting. No permanent 60fps device loop, shadows, postprocessing, environment download or future device prefetch.

Antialiasing is selected when a WebGL context initializes. Resizing updates DPR/motion tier without remounting the persistent canvas; it does not recreate a context merely to change antialiasing. Live reduced-motion toggles discard scenes and keep CSS visible until a fresh successful draw on resume.

## Models and provenance

- Project-authored procedural geometry in `hub-scene.tsx` / `device-scene.tsx`; no GLB downloads, Apple logo, external HDR or third-party 3D art. No external model attribution needed. Frameworks retain MIT licenses (Three/Drei packaged LICENSE, Fiber package metadata).
- Hub: five beveled dark modules, physical thickness, restrained rotation/float and violet/blue edge lighting. Measured DOM geometry retains responsive positions. Connections, emphasis, sequential DOM reveal and PRODUCTS disclosure remain unchanged.
- Laptop: thin lid/bezel, hinge, rounded aluminium base, camera, trackpad and 70 instanced keys (one keyboard draw). Unbranded MacBook-like model, no invisible internals.
- Local profile: Hub ~10,040 triangles / 10 draws; laptop ~5,924 triangles / 10 draws. Zero binary model transfer; procedural scene-specific chunks are a few compressed KB, sharing renderer/geometry code.

`SceneProps` carries device + verified screen independently of selection/scroll. Only MacBook geometry exists. Adding approved iPad/iPhone manifest records exposes existing CSS fallback; their 3D renderer can be added inside this boundary without changing Selected Work. Portfolio remains neutral DOM, never a fabricated hardware screenshot.

## Screens

Same audited manifest/derivatives as Phase 3.1; originals untouched. TextureLoader requests only the selected approved screen, caches it for the scene lifetime and disposes on unmount. No speculative preload of missing screens/models. HTML image srcsets remain semantic/failure fallback.

- Texture width: 640 below a 500px presentation; otherwise 1280. These cover current display sizes with DPR caps. sRGB, mipmaps, anisotropy capped at 4; screen materials bypass scene tone mapping.
- Plane fits display bounds at original aspect, no stretch/crop. Retain previous texture while loading, then crossfade in 180ms; no white loading frame.
- Pnlwise: 12,854 / 36,674 B; Healthy: 11,006 / 29,180 B. Native fallback may choose an additional 1280/1920 source on a DPR-2 browser; profiling reports those bytes too.

## Measurement and review

Phase 3.1 essential baseline: 148,656–148,843 B JS, 7,364 B CSS, 0–36,674 B initial images; measured initial CLS 0. Local encoded bytes are not field Core Web Vitals or physical-device certification.

Phase 4 final Chrome sample, 2026-10-06 (DPR 2, unmodified capability signals):

| Viewport | Essential JS | Deferred 3D JS | CSS | Hub request→draw | Device request→draw | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| 375×1000 | 149,978 B | 252,160 B | 7,621 B | ~460ms | ~445ms | 0 |
| 1024×1000 | 150,165 B | 252,160 B | 7,621 B | ~487ms | ~515ms | 0 |
| 1440×1000 | 150,165 B | 252,160 B | 7,621 B | ~463ms | ~464ms | 0.000122 |

Essential JS increase: 1,322 B (~0.9%). Deferred breakdown: shared renderer/geometry chunks 101,106 + 51,368 + 88,748 + 6,702 B; Hub 1,797 B; device 2,439 B. Mobile also requests 374 B of ordinary project-route prefetch code, reported in JSON separately from the 3D sum. No external resources or binary model downloads. Selected textures are 11–37KB each; all downloaded HTML fallback srcsets are included in resource JSON.

Final local sample reports no ≥50ms long tasks; an earlier local run recorded a 62ms task. Repeated QA warms driver/shader caches: these values do not bound cold compilation or slow hardware. First draw includes lazy fetch/parse/renderer/texture setup after the 1.5s essential-UI delay, not just GPU initialization. Verify cold/physical-mobile behavior before release.

Validation: clean lint/strict typecheck, 18 unit tests, 23-route production build; Chromium 54 pass / 33 intentional profile skips, WebKit desktop 27 pass / 2 skips, Firefox desktop 27 pass / 2 skips. 320–1920, short height/orientation, sticky release, axe, verified textures, DOM controls, low capability/no WebGL, live reduced-motion resume, init/chunk/draw/context failure and offscreen pause are covered. Primary 3D and fallback captures were visually inspected. Actual Safari, assistive technology and physical-device/field performance remain release checks.

`node scripts/phase4-review.mjs` uses Chrome, 375/1024/1440×1000, browser DPR 2. It saves Home/Hub/project/fallback captures, resource bytes, request→first-draw marks, geometry/draw stats, CLS and supported long-task entries to ignored `artifacts/phase4/`. `REVIEW_ENGINE=webkit|firefox REVIEW_SMOKE=1` reviews other engines. Cold GPU compilation varies; reproduce on physical mobile before release.

Essential JS guard remains <400KB; deferred 3D guard separately <300KB. CSS <60KB, initial images <150KB, CLS <0.1. Deferral is measured at the first `*-3d-request` mark, not by excluding unexplained resources.

Cross-browser keyboard tests follow native focus. On this macOS host WebKit Tab skips links with current OS settings; Option-Tab passes native navigation without changing preferences ([Apple keyboard preference](https://developer.apple.com/documentation/webkit/wkpreferences/tabfocuseslinks)). Tests focus a disclosed Hub link before Escape instead of assuming mouse click focuses buttons on every engine.
