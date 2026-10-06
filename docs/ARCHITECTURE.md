# Architecture

## Status

Phase 4 is technically accepted. Phase 4.1 fixes Neon occlusion/light only (D-011); approved composition, DOM interactions, responsive curve geometry and 3D models remain unchanged. Lazy Hub/device enhancement follows D-010. CMS, analytics, external deployment and backend remain deferred.

## Runtime foundation

- Next.js App Router with React Server Components by default.
- TypeScript in strict mode.
- Tailwind CSS for tokens and styling.
- Node.js 22 for local development and CI.
- GitHub Actions as the initial verification gate.
- Biome, Vitest, and Playwright/axe as validation tools. Playwright and axe are dev-only.

## Locale and rendering

- `app/[locale]/layout.tsx` is the public root layout and renders the correct HTML `lang` on the server.
- Supported locales come from `lib/site-config.ts`; EN is primary. Dictionaries are typed against the shared UI shape.
- `generateStaticParams` prerenders the EN/RU pages and three baseline project skeletons. Invalid locales and unknown project slugs return 404.
- `app/route.ts` implements a non-cacheable 307 root redirect: persisted selection → weighted `Accept-Language` → EN.
- `app/language/route.ts` validates locale/path, sets an HttpOnly first-party preference cookie, and redirects to the equivalent localized path. Ordinary anchors intentionally avoid prefetching this cookie-setting endpoint and work without JavaScript.
- Relative redirects preserve the visitor’s host behind reverse proxies. Locale detection does not require middleware, geolocation, or a provider SDK.
- Add a future locale by extending `siteConfig.locales`, `localeDetails`, and dictionaries. Routing files do not change.

## SEO

`lib/metadata.ts` builds absolute self-canonical URLs, reciprocal locale alternatives, EN `x-default`, Open Graph, and Twitter metadata from `SITE_URL`. Set the origin before a deployment build. All current content skeletons emit noindex/nofollow; `robots.txt` disallows crawling. Review indexing, sitemap, and published content together before a public launch.

## Design system

`app/globals.css` owns typography, spacing, responsive containers, colors, surfaces, borders, local glow, radius, durations/easing, layers, and focus states. Tailwind `@theme` exposes the same values for future utility styling. `styles/home.css`, loaded after the foundation, owns Home composition and interaction geometry.

- Canvas: `#08090b`; text: `#f4f4f6`; muted text: `#a4a5ad`.
- Light: violet `#a78bfa`, blue `#7aa7ff`; emerald `#67d9b0` is reserved for justified contexts.
- Typography: local system sans, fluid display/heading sizes, constrained line lengths. No external font requests.
- Spacing: quarter-rem scale with 24/32/48/64/96/128px composition steps.
- Breakpoints: mobile default; compact/tablet at 768px; desktop at 1200px. Container limit: 84rem.
- Durations: 150/240/500ms with one easing token; reveal/Contact stagger is 65ms. Reduced motion disables animations, staggering and smooth scrolling. Keyboard focus bypasses Contact reveal delay.
- Layers: content 0, navigation 20, overlays 40, skip link 60.
- Shared primitives: `Container`, `PageHeading`, arrow, button/text-link styles, responsive layout classes.

## Home component boundaries

Phase 4: `components/three/enhancement.tsx` owns capability, loading and local React error fallback. Lazy `hub-scene.tsx` / `device-scene.tsx` use project-owned procedural geometry; `scene-runtime.tsx` guards initialization/draw/context failures, visible-only idle and demand rendering. CSS/HTML stays until first successful draw; one persistent device canvas swaps verified textures and hides for Portfolio. No WebGL semantics or new selection/layout ownership. Quality, provenance, budgets and measurements: [`THREE_ENHANCEMENT.md`](THREE_ENHANCEMENT.md). The following interaction descriptions also describe the retained 2D fallback.

- `Hero`, `Lab` and `Contact` remain server compositions. `ProductHub`, `SelectedWork`, `LabTrack`, `ContactRadialMenu` and `NeonPath` are targeted client boundaries; their initial HTML is still prerendered.
- `ProductHub` uses native buttons, central-first CSS reveal, rectangular locally lit nodes, external-node context and highlighted SVG connections. Fine-pointer hover adds subtle elevation/tilt; the active connection pulse runs only while the Hub is visible and motion is permitted. Featured product anchors retain native hash navigation; a small validated `portfolio:select-project` DOM event also supports reselecting an unchanged hash. Selected Work owns the destination state and focus.
- `SelectedWork` owns active project and preferred device separately. Availability and effective device derive from `lib/project-screens.ts`; unsupported preferences resolve to the first verified variant, without erasing the preference. Pnlwise/Healthy expose only MacBook on all viewports. Portfolio resolves to null: neutral project fallback, no hardware frame or device controls. A reserved 44px selector slot keeps the single presentation station stable when choices disappear. Future R3F replaces only `DeviceShowcase`. Static WebP srcsets (640/1280/1920), explicit dimensions, lazy loading and contain-fit preserve original aspect ratios without a runtime image service. Source hashes and audit rationale: `docs/PROJECT_ASSETS.md`; originals stay outside Git.
- At width ≥1024px and height ≥700px, native scroll chooses the nearest narrative step and the single device column is sticky inside the section. It releases at the section end. Smaller/shorter viewports show one active narrative plus device; touch swipe, previous/next and project buttons share selection logic.
- Preferred defaults remain iPhone below 768px, iPad at 768–1199px, MacBook at 1200px+, but only verified variants can render. Initial server HTML already shows the first project's verified MacBook; hydration cannot expose a missing device or shift presentation geometry. Adding a verified tablet/mobile manifest record activates that choice without section layout changes. Desktop steps are 63svh (previously 72), device max-width 720px (previously 640), and column gap 20px; sticky eligibility/release and compact fallback are unchanged.
- `LabTrack` renders ordered temporary concepts from `lib/home-content.ts`, with one small 24px / 1.5-stroke inline SVG family (`LabGlyph`): payment exchange, scoped-agent chip, document extraction and messaging. Decorative glyphs are aria-hidden, never Unicode substitutes. Native horizontal scrolling supports swipe/trackpad/Shift-wheel, keyboard arrows and buttons. Fine-pointer vertical wheel is translated only while the track can scroll in that direction; document scrolling resumes at either end. No drag library or scroll-jacking.
- `ContactRadialMenu` is a non-modal disclosure, not an application menu. One circular trigger opens four circular icon links on an adaptive 180° upward fan, with subtle persistent labels. Trigger → channels follow normal Tab order; Escape restores trigger focus, outside pointer/focus departure closes, and closed links are inert. Opening is sequential; closing reverses the reveal; keyboard focus bypasses the delay. Confirmed Telegram, LinkedIn, GitHub and Email destinations live in `lib/site-config.ts`, shared by Home and the Contact page. Phone/WhatsApp are not public channels.
- `NeonPath` measures interior Hub/device/Lab/Contact anchors with ResizeObserver, using the device's document station rather than its moving sticky box. `lib/neon-geometry.ts` authors separate mobile/tablet/desktop lateral waypoints, joined by smooth cubic tangents with monotonic vertical progression; Phase 4.1 preserves these curves exactly. Layout/scroll boxes do not occlude. Only actual opaque foreground surfaces/pixels above the SVG cover it; transparent canvas pixels expose it. No wrapper-sized masks, opaque control rows or narrative/fallback backgrounds. Thin core + localized inner/ambient halos and a 96px travelling scroll-energy region; exact cubic subdivision bounds every static filter surface to ≤364px per side. Reduced motion draws static light without a travelling pulse. No continuous animation loop, model readback or layout contribution. Audit/performance: [`NEON_INFRASTRUCTURE.md`](NEON_INFRASTRUCTURE.md).
- No-JS fallback keeps all project narratives/case links, one device visual, native Lab browsing, all four contact links and the existing locale/menu foundation. Interactive-only selectors are hidden; full Hub/contact interactions require JS.

## Intended boundaries

```text
src/
  app/          Routes, layouts, metadata, and route-local composition
  components/   Reusable public and admin UI when introduced
  features/     Product capabilities with their own UI and domain logic
  lib/          Small framework-independent utilities and configuration
  server/       Server-only authorization, data access, and integrations
  styles/       Shared design tokens when the system grows beyond globals.css
drizzle/        Versioned schema migrations when persistence is introduced
public/         Optimized static assets and approved fallbacks
```

Directories are created only when real implementation requires them.

## Architectural constraints

- Public HTML/CSS content must render before optional 3D code loads.
- Motion and WebGL are progressive enhancements with reduced-motion and static fallbacks.
- Only necessary visible 3D renders: Hub has one capped, visible-only idle; device is demand-driven with short transition bursts. Offscreen scenes pause while canvases can remain mounted.
- Administrative mutations require server-side authorization and an audit trail.
- Product AI-agent permissions are scoped; publish, delete, auth, and secret changes are denied by default.
- Analytics calls go through a project-owned adapter and contain no secrets or private payloads.
- Content and integration code should not depend directly on one hosting provider.

## Data and external services

Supabase PostgreSQL/Auth/Storage, Drizzle, and PostHog are approved baseline choices but are not installed in Phase 0. Their schemas, policies, adapters, and environment variables will be added with the implementing phases.

## Public routes

Public pages are `/{locale}`, `/{locale}/projects`, `/{locale}/projects/[slug]`, `/{locale}/lab`, `/{locale}/about`, `/{locale}/experience`, and `/{locale}/contact`, with locale `en` or `ru`. `/` and `/language` are redirect utilities, not public content pages. D-006 records the owner-approved locale decision.
