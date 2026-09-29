# Portfolio 2023 — Historical Frontend Project

This repository preserves a personal portfolio site created in 2023 while learning frontend development. It is published as an early-work sample, not as Dmitrii Nadtochii's current canonical portfolio or an up-to-date statement of services and skills.

## Historical context

The project began as a static personal landing page. Its current content has been reduced to factual project context, the technologies demonstrably used in the repository, and the current GitHub profile. Outdated biography, contact, pricing, employment, and proficiency claims were removed from the current page.

## Stack

- HTML5
- SCSS / CSS
- Vanilla JavaScript
- Gulp 4
- BrowserSync
- Autoprefixer and CSS minification

## Features

- Responsive single-page layout
- Off-canvas navigation
- Reusable SCSS blocks and responsive breakpoints
- Small JavaScript interactions for navigation
- Gulp development server, asset copying, SCSS compilation, and HTML/CSS minification
- Favicon and device-icon set

## Structure

```text
src/
  fonts/       Local font files
  icons/       Interface, technology, and favicon assets
  img/         Page images
  js/          Browser JavaScript
  sass/        SCSS source
  index.html   Page source
dist/          Generated static site retained for the historical workflow
gulpfile.js    Build and development tasks
```

## Development workflow

Requirements:

- Node.js compatible with the legacy dependency set
- npm

```bash
npm ci
npm run dev
```

The default Gulp task builds the site, starts BrowserSync from `dist`, and watches source files.

## Build

```bash
npm run build
```

The deterministic build task removes the existing `dist` directory, then compiles styles, minimizes HTML, and copies scripts, fonts, icons, and images.

Dependencies were intentionally not upgraded during publication cleanup. The tracked output was regenerated and verified from the existing lockfile in an isolated environment.

## `dist` policy

`dist` remains tracked because it was part of the original static deployment workflow. Source files remain authoritative. Future maintenance should regenerate and review `dist` after every source change; it can be removed from version control only after a replacement deployment workflow is confirmed.

## Privacy

The current page exposes only the professional name and the verified GitHub username `Dmitrii-front`. Personal family details, obsolete accounts, old direct contact details, and outdated biography were removed from the current site.

## Limitations

- Historical visual design and tooling are intentionally retained.
- There is no automated test suite.
- Dependencies are old and have not been upgraded as part of this cleanup.
- The former portfolio gallery was incomplete and is not presented as working functionality.
- This project does not represent the current breadth of Dmitrii's professional work.

## Archive status

This repository is suitable as an unpinned historical frontend project. Current work should be evaluated through newer repositories on the [Dmitrii-front GitHub profile](https://github.com/Dmitrii-front).
