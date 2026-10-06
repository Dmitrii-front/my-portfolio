# Architecture

## Status

Phase 2 preserves the accepted public foundation and implements the complete lightweight Home interaction prototype. The owner brought desktop/eligible-tablet sticky validation into Phase 2 (D-007). CMS, analytics, backend and optional 3D remain deferred.

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

- `Hero`, `Lab` and `Contact` remain server compositions. `ProductHub`, `SelectedWork`, `LabTrack`, `ContactRadialMenu` and `NeonPath` are targeted client boundaries; their initial HTML is still prerendered.
- `ProductHub` uses native buttons, central-first CSS reveal, external-node context and highlighted SVG connections. Featured product anchors retain native hash navigation; a small validated `portfolio:select-project` DOM event also supports reselecting an unchanged hash. Selected Work owns the destination state and focus.
- `SelectedWork` owns active project and device separately. A single `DeviceShowcase` receives those props; future R3F can replace only this presentation boundary. Project screens show names/categories and an explicit imagery-placeholder notice, not fabricated product UI.
- At width ≥1024px and height ≥700px, native scroll chooses the nearest narrative step and the single device column is sticky inside the section. It releases at the section end. Smaller/shorter viewports show one active narrative plus device; touch swipe, previous/next and project buttons share selection logic.
- Defaults: iPhone below 768px, iPad at 768–1199px, MacBook at 1200px+. Explicit device selection remains independent of project switching. CSS reserves presentation height and mirrors initial responsive narrative geometry before hydration.
- `LabTrack` renders ordered temporary concept records from `lib/home-content.ts`. Native horizontal scrolling supports swipe/trackpad/Shift-wheel, keyboard arrows and buttons. Fine-pointer vertical wheel is translated only while the track can scroll in that direction; document scrolling resumes at either end. No drag library or scroll-jacking.
- `ContactRadialMenu` is a non-modal disclosure, not an application menu. Trigger → channels follow normal Tab order; Escape restores trigger focus, outside pointer/focus departure closes, and closed links are inert. Desktop/tablet use an upward fan; narrow screens use a compact two-column floating fan. Closing reverses the reveal sequence. Only GitHub is confirmed; other channel buttons explicitly indicate unavailable destinations.
- `NeonPath` measures Hub/section anchors with ResizeObserver and draws one absolute, decorative SVG path in the outer lane. Scroll illumination is requestAnimationFrame-throttled; reduced motion draws the complete static path. No continuous animation loop, pointer tracking or layout contribution.
- No-JS fallback keeps all project narratives/case links, one device visual, native Lab browsing, GitHub contact and the existing locale/menu foundation. Interactive-only selectors are hidden; full Hub/contact interactions require JS.

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
- Only the necessary 3D scene is active at one time.
- Administrative mutations require server-side authorization and an audit trail.
- Product AI-agent permissions are scoped; publish, delete, auth, and secret changes are denied by default.
- Analytics calls go through a project-owned adapter and contain no secrets or private payloads.
- Content and integration code should not depend directly on one hosting provider.

## Data and external services

Supabase PostgreSQL/Auth/Storage, Drizzle, and PostHog are approved baseline choices but are not installed in Phase 0. Their schemas, policies, adapters, and environment variables will be added with the implementing phases.

## Public routes

Public pages are `/{locale}`, `/{locale}/projects`, `/{locale}/projects/[slug]`, `/{locale}/lab`, `/{locale}/about`, `/{locale}/experience`, and `/{locale}/contact`, with locale `en` or `ru`. `/` and `/language` are redirect utilities, not public content pages. D-006 records the owner-approved locale decision.
