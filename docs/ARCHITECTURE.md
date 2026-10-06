# Architecture

## Status

This document describes the Phase 0 boundaries and intended growth path. Only the application shell and validation infrastructure are implemented.

## Runtime foundation

- Next.js App Router with React Server Components by default.
- TypeScript in strict mode.
- Tailwind CSS for tokens and styling.
- Node.js 22 for local development and CI.
- GitHub Actions as the initial verification gate.

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

The baseline routes are `/`, `/projects`, `/projects/[slug]`, `/lab`, `/about`, `/experience`, and `/contact`, with RU/EN public localization. Locale routing details are a Phase 1 decision.
