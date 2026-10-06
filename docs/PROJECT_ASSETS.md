# Audited project imagery

**Audit date:** 2026-10-06. Source archive: `/Users/macos/Desktop/screenshots` (outside Git).

## Scope and selection

Inventoried 961 raster images (~2.3 GB), including 685 September captures. Native ImageIO decoded all images; OCR was a search aid, not publication approval. Visually reviewed project-matched contact sheets (including false-positive infrastructure/profile screens), all 78 non-reference portrait candidates, named Pnlwise/Healthy bundles and selected images at full size. Private OCR/index/contact sheets remain outside the repository; they must not become public artifacts.

No source was edited, renamed or deleted. Only the six selected WebP derivatives enter `public/projects/`.

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
| Portfolio / 2026 | Missing | Missing | Missing |

These seven asset slots remain missing. Since Phase 3.1 (D-009), unavailable devices are **not public choices**: Pnlwise/Healthy offer only MacBook, including on mobile; their desktop screen is shown as a desktop device, never disguised as tablet/phone UI. Portfolio has no device selector/frame and uses a restrained project fallback. Adding approved manifest records later enables tablet/mobile choices without changing section layout.

Narrow/square browser windows do not independently establish a device viewport/DPR; older Clearledger transaction captures also have obsolete branding and unverified financial data. Healthy reference phone frames, FlutterFlow/design-editor exports, investor decks and older dashboard concepts are not current product-screen evidence. Portfolio keyword matches were résumés, GitHub/Upwork/LinkedIn profiles or infrastructure, not Portfolio 2026 UI. Do not substitute a recursive screenshot of this newly built Home for archive evidence.

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

Total: 202,542 B. Browser-native `srcset`/`sizes`, lazy loading and async decoding; explicit dimensions and reserved device geometry. `object-fit: contain` prevents distortion or lost UI. WebP alone is sufficient for supported modern browsers; another full AVIF set is not needed for these small files.

The manifest lives in `src/lib/project-screens.ts`, independently of project/device state. Future R3F should consume the same approved mapping and replace only `DeviceShowcase`; missing variants still need an honest fallback.
