# Current State

**Updated:** 2026-10-12 — Phase 5.0 / 5.1 canonical content.
**Application:** Content implementation on the frozen Phase 4.2 working visual baseline.
**Status:** Implemented for owner editorial review. STOP; no later phase or visual polish authorized.

## Completed

- D-016: canonical Project, server case narratives, Profile/education and four Experience records. Home/index/cases/About/Experience render approved facts; Lab records/route remain concepts. Existing contacts/media are reused.
- Owner-approved Pnlwise role/period/sole ownership; Healthy role/period/team4/MVP-only/test-participant limits. Pnlwise technical scope inspected read-only at `2ba3238`; Healthy current documentation backs bounded context, with stale/conflicting stack/future claims excluded. Sources, field ownership and gaps: [CANONICAL_CONTENT.md](CANONICAL_CONTENT.md).
- KGanimation/KOL is one Apr–Dec2025 Team Lead Frontend entry; freelance2023–2025 remains minimal. Dentistry/education belong About only. Portfolio credits Dmitry's direction/acceptance and Codex engineering assistance.
- EN/RU narratives/metadata/labels use shared slugs/dates/references, no whole-case English fallback. Cases are ready for review, not release-certified.
- Copy projections and minimal case image/caption sizing only. No Home stylesheet, Neon, Hub, pinning, model or Contact behavior/design changes. No packages/integrations added. Locale routing/noindex stay unchanged.

## Retained visual baseline

D-013's whole-scene native Work pin at ≥1024×900, one persistent three-screen MacBook, compact swipe/controls, C2 Neon in shared visual coordinates, bounded headless glow and approved Contact fan remain intact. D-010 optional scenes retain capability/error/offscreen/reduced-motion boundaries. Three verified desktop assets only; six responsive slots unavailable, originals/source hashes unchanged. D-015 freezes the working visual baseline, not final visual acceptance. Historical implementation/QA detail: DEVELOPMENT, NEON_INFRASTRUCTURE, THREE_ENHANCEMENT, PROJECT_ASSETS and AUDIT_2026-10-12.

## Fresh validation — 2026-10-12

- `npm run check`: lint, strict typecheck, 33 unit tests in10 files, production build (23 routes).
- Installed Chrome full suite:58 pass /41 intentional profile skips. EN/RU axe on all9 reading routes, internal href resolution, case images and four Experience records; both locales ×9 routes ×375/768/1024/1440 overflow checks. Existing locale/keyboard/no-JS/Work/Neon/Lab/Contact/3D checks pass.
- Content-only desktop WebKit and Firefox: 2 pass each (axe, internal links, EN/RU routes and all four widths); these are not fresh full-engine 3D runs.
- Initial Home JS 152,774–153,377B, CSS 8,260B; initial images 12,854–36,674B, CLS 0, no external requests. Paint timings not reprofiled. Browser automation is not physical-device/field certification.
- Review captures: ignored `artifacts/phase5-content/README.md`; EN/RU Home/index/three cases/About/Experience, extra narrow Home views. Reduced motion gives stable reading captures; full Home includes technical native pin travel.

## Next action / STOP

Owner EN/RU editorial and attribution review. Then separately authorize bounded content/evidence refinement: detailed KGanimation/KOL/freelance facts, optional approved CV and sanitized useful workflow evidence. No automatic 5.8 layout review, CMS, deployment, visual polish or bot work.

## Gaps / risks / not implemented

- No public approved CV, institution expansion/residency institution, detailed freelance/KOL accomplishments or confirmed Pnlwise/Healthy public links; absent facts are omitted.
- Healthy older notes include contradictory future stack/scope; current overview is used only as documentation-backed context, not independent backend certification.
- Sample P&L, captured catalog counts, old targets and test participants are not revenue/traction. No users/customers/seniority invented.
- Lab runtime, CMS/Supabase/Drizzle/Admin/auth/agent/Audit Log/analytics/bot/payment integrations and external hosting are NOT IMPLEMENTED here. Noindex remains pending separate publication/SEO review.
- Six missing tablet/mobile screens; no iPad/iPhone model. Physical-mobile, actual Safari, cold/high-DPR and assistive-technology release QA remains.
- WorkHub began22 commits ahead with unrelated dirty files; only Portfolio summary is synchronized locally, never unrelated history pushed. Obsidian local writes do not certify iCloud replication.

## Memory / preview / delivery

Repository owns technical truth (DECISIONS through D-016, CANONICAL_CONTENT, architecture/development/source/unchanged spec). Preparation/audit are dated snapshots, not current phase gates. Exact Obsidian and WorkHub paths/resumption: MEMORY.md. The four Portfolio notes were read; product index/roadmap/content note reflect this block, Bot note remains Future/Backlog / NOT STARTED.

Local production preview: `npm run start -- --hostname 127.0.0.1 --port 3001`, then `http://127.0.0.1:3001/en` or `/ru`. No external deployment/provider selected. Main commit/push/CI and scoped WorkHub commit are verified/reported after delivery; no force push.
