# Portfolio 2026 Project Instructions

These rules apply to the entire repository. Keep changes focused, maintainable, and consistent with the baseline specification.

## Sources of truth

- GitHub repository `Dmitrii-front/my-portfolio` is the source of truth for code and versioned technical documentation.
- [`docs/PORTFOLIO_2026_SPEC.md`](docs/PORTFOLIO_2026_SPEC.md) is the product baseline.
- [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) is the current technical handoff.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) records durable product and architecture decisions.
- WorkHub project `Projects/Portfolio/` is the cross-project control-plane summary. Do not duplicate repository details there.

## Before work

1. Find the repository root and read this file.
2. Run `git status --short --branch`; preserve unrelated user changes.
3. Read `docs/CURRENT_STATE.md` and the documents relevant to the task.
4. Read the WorkHub Portfolio summary when status, blockers, risks, or cross-project context matters.
5. Restore task context before changing code.
6. Check `docs/DECISIONS.md` for an existing decision that the task could violate.

## During work

1. Follow the specification and recorded decisions.
2. Do not silently make decisions that materially change UX, architecture, security, scope, or cost. Record the question or proposed decision and tell the owner.
3. Do not leave important decisions only in chat.
4. Record durable rules in the smallest appropriate project-memory document.
5. Keep documentation concise; do not maintain a step-by-step activity log.
6. Do not commit secrets. Add environment variable names and safe examples to `.env.example` when variables are introduced.
7. Keep provider integrations behind project-owned adapters when practical. Enforce authorization server-side.

## After work

1. Run the relevant checks. For a finished block, run `npm run check` unless the task cannot affect the application.
2. Review `git diff` and the staged file list.
3. Update `docs/CURRENT_STATE.md` with the completed state, next action, blockers, and risks.
4. Update `docs/DECISIONS.md` only for durable decisions.
5. Synchronize a concise status to WorkHub when the phase, next action, blockers, risks, or waiting decisions changed.
6. Commit a completed block with a short imperative English message.
7. Push when it is safe and authentication is available; verify that GitHub contains the completed commit.
8. Report what changed, checks, commit, push/deployment status, next action, and any decision needed from the owner.

## Scope safeguards

- Preserve the Portfolio 2023 history. It is archived at tag `portfolio-2023`.
- Do not rewrite `main` history or use destructive Git operations without explicit approval.
- Do not start a later product phase as a side effect of the current task.
- Add Motion, Three.js, React Three Fiber, Drei, Supabase, Drizzle, and PostHog only when the implementing phase uses them.
