# Architecture

## Status

Phase 1 implements public route/layout foundations, EN/RU dictionaries, navigation, shared tokens, and static Home compositions. Product features, CMS, and optional 3D remain deferred.

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

`app/globals.css` owns typography, spacing, responsive containers, colors, surfaces, borders, local glow, radius, durations/easing, layers, and focus states. Tailwind `@theme` exposes the same values for future utility styling.

- Canvas: `#08090b`; text: `#f4f4f6`; muted text: `#a4a5ad`.
- Light: violet `#a78bfa`, blue `#7aa7ff`; emerald `#67d9b0` is reserved for justified contexts.
- Typography: local system sans, fluid display/heading sizes, constrained line lengths. No external font requests.
- Spacing: quarter-rem scale with 24/32/48/64/96/128px composition steps.
- Breakpoints: mobile default; compact/tablet at 768px; desktop at 1200px. Container limit: 84rem.
- Durations: 150/240/500ms with one easing token; reduced motion sets durations to zero.
- Layers: content 0, navigation 20, overlays 40, skip link 60.
- Shared primitives: `Container`, `PageHeading`, arrow, button/text-link styles, responsive layout classes.

## Home component boundaries

- `Hero` composes copy/CTA/focus and a static `ProductHub` CSS/SVG diagram.
- `SelectedWork` uses the shared `ProjectList` and one static `DeviceShowcase` media placeholder.
- `Lab` and `Contact` own their current structural sections.
- Phase 2 adds `ContactRadialMenu` within Contact and `NeonPath` as Home-level composition. No empty runtime abstractions are created in advance.
- These components render on the server. Header disclosure enhancements are the small client boundary; its native menu and links still work without JS.

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
