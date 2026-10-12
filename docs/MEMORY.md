# Verified memory architecture

Audited: 2026-10-12. D-014 records the owner-authorized documentation repair.

## Ownership / exact paths

| Layer | Filesystem location | Owns |
| --- | --- | --- |
| Repository | `/Users/macos/Documents/ChatGPT/My_Portfolio` | Code, canonical spec, AGENTS, CURRENT_STATE, ARCHITECTURE, DECISIONS, DEVELOPMENT, asset/3D/Neon docs, audit |
| Obsidian registered vault | `/Users/macos/Library/Mobile Documents/iCloud~md~obsidian/Documents` | Long-term product reasoning, ideas and future planning |
| Portfolio product folder | Vault-relative `Projects/Portfolio/` | `README.md`, `Roadmap.md`, `Portfolio Content Architecture.md`, `Future/Telegram Portfolio Bot.md` |
| WorkHub | `/Users/macos/Documents/WorkHub/Projects/Portfolio/` | PROJECT registration, `Core/STATUS.md`, cross-project phase/next action/blockers/risks |

Obsidian vault is confirmed by the application's `obsidian.json` vault path and its `.obsidian/` directory. The repository and WorkHub have no `.obsidian/` directory and are not vault symlinks or technical-memory mirrors. Repository docs stay separate. External notes are not protected by Portfolio Git; cloud synchronization/backups are not certified by a successful local write.

## Existing gap / repair

Before this audit, no Portfolio-named vault directory/note, repository-memory mirror or symlink was found. Verified phase work read/updated repository docs and WorkHub, not dedicated Portfolio Obsidian notes. A full-text scan of unrelated iCloud Markdown stalled and was stopped, so generic mentions are not exhaustively excluded; they would not establish a maintained Portfolio memory workflow anyway.

The three Portfolio notes above were first created and read back on 2026-10-12. There was no verifiable prior Portfolio-related Obsidian update to report. This repairs references and preserves the future idea; it does not retroactively turn prior "project memory updated" claims into Obsidian integration. No existing notes were migrated or copied.

## Resume without chat history

1. Read root AGENTS, git status, CURRENT_STATE and relevant repository docs/decisions.
2. Read the verified vault's `Projects/Portfolio/README.md`, `Roadmap.md` and relevant idea notes. Report unavailable/dehydrated/unreadable files; do not substitute WorkHub and claim Obsidian was read.
3. Read WorkHub Portfolio PROJECT/STATUS when phase/operational context matters.
4. Distinguish implemented code, documented intentions and unstarted backlog. Do not promote an idea into the active phase.
5. After work update only the owning layer, with concise links from the others. Verify exact external files after writes. Commit code-adjacent docs with the repository; never publish unrelated WorkHub history.

## Future bot / discoverability

Exact note: `/Users/macos/Library/Mobile Documents/iCloud~md~obsidian/Documents/Projects/Portfolio/Future/Telegram Portfolio Bot.md`.

Status: Future / Backlog / DEVELOPMENT STATUS: NOT STARTED. Referenced by the Obsidian index and roadmap. Potential classic bot/Mini App/hybrid and controlled-data AI remain open questions. Existing public Lab "Telegram Bot" is only a concept label, not this bot's implementation.

Future consideration: Portfolio content should support Website / Admin-CMS / Telegram Bot / AI Portfolio Agent without manual duplication of core content. Consider that boundary when the future structured content layer is designed; no API/schema/backend is introduced by this audit.

## Audit / drift controls

Full verified baseline: `AUDIT_2026-10-12.md`. Canonical spec remains unchanged; later D-006–D-013 explain intentional departures. README's stale Phase 4.1 label was repaired. Historical QA sections remain explicitly historical; local URLs require a running server, and historical success is not a claim of fresh physical-device validation.

Current strategy: D-015 freezes the visual baseline; D-016 implements the first canonical content block. Preparation/audit remain dated snapshots, not current phase gates. Repository CANONICAL_CONTENT.md owns sources/claim rules/field ownership/gaps. Obsidian index/roadmap/content note record product-level progress and approved boundaries only, not copied case bodies or technical schemas. Bot note remains unchanged backlog. Owner editorial review and separate authorization are needed for further work.
