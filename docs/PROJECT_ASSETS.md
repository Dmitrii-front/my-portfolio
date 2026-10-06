# Audited project imagery

**Audit date:** 2026-10-06. Source archive: `/Users/macos/Desktop/screenshots` (outside Git).

## Scope and selection

Inventoried 961 raster images (~2.3 GB), including 685 September captures. Native ImageIO decoded all images; OCR was a search aid, not publication approval. Visually reviewed project-matched contact sheets (including false-positive infrastructure/profile screens), all 78 non-reference portrait candidates, named Pnlwise/Healthy bundles and selected images at full size. Private OCR/index/contact sheets remain outside the repository; they must not become public artifacts.

No archive source was edited, renamed or deleted. Six Pnlwise/Healthy WebPs remain unchanged; Phase 4.2 adds three Portfolio WebPs and an unchanged project-owned source PNG outside `public/`.

| Project / device | Selected source relative to archive | Source dimensions | Rationale |
| --- | --- | --- | --- |
| Pnlwise / MacBook | `pnlwise/jpeg/Main.jpeg` | 3454×1990 | Clean public Home; statement upload introduction and explicitly labelled **sample** report. Visually matches `pnlwise/Снимок экрана — 2026-09-23 в 00.15.52.heic`. Main itself has no date in its name. |
| Healthy / MacBook | `healthy/Снимок экрана — 2026-09-23 в 15.03.07.jpeg` | 3454×1990 | Public Home/search introduction, no patient record, private contacts, debug overlay or browser chrome. |

Healthy's September 29 equivalent has the same Home composition with a changed catalog count and added portrait. The September 23 capture preserves the representative UI while avoiding the extra identifiable photograph. No product UI is removed or synthesized. No cropping, retouching, artificial screen recreation or device-specific layout fabrication is used.

Sample Pnlwise financial figures and Healthy's captured catalog count are screenshot content, **not** claims about project revenue, results or current availability.

## Missing verified variants

| Project | Desktop / MacBook | Tablet / iPad | Mobile / iPhone |
| --- | --- | --- | --- |
| Pnlwise | Selected | Missing | Missing |
| Healthy | Selected | Missing | Missing |
| Portfolio / 2026 | Current-site capture (D-013) | Missing | Missing |

Six tablet/mobile asset slots remain missing. Since Phase 3.1 (D-009), unavailable devices are **not public choices**. With the D-013 current-site capture, all three projects offer only MacBook, including on mobile; desktop UI is never disguised as a tablet/phone capture. Adding approved manifest records later enables tablet/mobile choices without changing section layout.

Narrow/square browser windows do not independently establish a device viewport/DPR; older Clearledger transaction captures also have obsolete branding and unverified financial data. Healthy reference phone frames, FlutterFlow/design-editor exports, investor decks and older dashboard concepts are not current product-screen evidence. Portfolio keyword matches in the archive were résumés, profiles or infrastructure, not Portfolio 2026 UI. The explicitly authorized current-site capture below is a new source, not substitute historical archive evidence; no recursive Portfolio device appears in its viewport.

Excluded: account/billing/checkout screens, financial transactions/reports with unverified provenance, medical records/profiles, private messages, admin infrastructure, errors/loading/debug states, unrelated references and obsolete UI.

## Reproducible derivatives

Run `npm run assets:prepare` locally with the archive available; an optional archive root is accepted after `--`. This is an offline preparation step, **not** part of CI/build. The checked-in script verifies exact SHA-256 source bytes before writing derivatives and only reads the archive. It reuses Sharp shipped with Next; no additional runtime package or host-specific optimizer is needed.

Source hashes:

- Pnlwise: `fd55b25415b0eaaeb4c54e27532e50d0a92feecc1cda377037504039552c053b`
- Healthy: `88633c9a9f0bd986aace22b8c838ab8f17c86196c7cd11d186751f6311d76e53`

WebP quality 88, effort 6; widths 640/1280/1920, aspect ratio unchanged (~1.736), metadata stripped. Result sizes:

| Asset | 640×369 | 1280×737 | 1920×1106 |
| --- | --- | --- | --- |
| Pnlwise | 12,854 B | 36,674 B | 62,326 B |
| Healthy | 11,006 B | 29,180 B | 50,502 B |
| Portfolio | 10,818 B | 25,734 B | 39,896 B |

Total: 278,990 B (nine WebPs). Browser-native `srcset`/`sizes`, lazy loading and async decoding; explicit dimensions and reserved device geometry. `object-fit: contain` prevents distortion or lost UI. WebP alone is sufficient for supported modern browsers; another full AVIF set is not needed for these small files.

## Phase 4.2 Portfolio source

Owner explicitly authorized a real capture of this project. `assets/sources/portfolio-desktop.png`: local production `/en`, accepted GitHub commit `520c9618e91147ce3954ede51c13b86d77042ffa`, 2026-10-06, Chrome, 1920×1106 CSS px / DPR 1, supported reduced-motion setting. Real public Home, no editor/browser chrome/private data/debug overlay or invented UI. Source retained unchanged and visually reviewed; project-owned capture, not third-party art.

SHA-256: `5ae2a4764b0f1750f7ebe7412fc2a98fe9118ed151153f38441aaa6e0086e764`. The manifest records its actual dimensions and EN/RU alternatives. Full provenance/re-capture safeguards: `assets/sources/README.md` and `scripts/portfolio-capture.mjs`. `npm run assets:prepare -- --portfolio` recreates the three derivatives without the external archive; full preparation now also includes this hash-verified source. Do not automatically overwrite it when running browser QA.

The manifest lives in `src/lib/project-screens.ts`, independently of project/device state. R3F consumes the same approved mapping and enhances only `DeviceShowcase`; missing variants still need an honest fallback.
