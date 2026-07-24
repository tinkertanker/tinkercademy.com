# Historical Document-to-Astro Refactor Plan

> **Archived: completed migration record; no steps below are actionable.** The document renderer, `DocumentLayout`, `DocumentPage`, `getRouteDocument`, and generated `route-documents.js` payload have been removed. This file preserves the sequence and decisions considered during the migration; it does not describe current architecture or pending work.

## Historical Summary

At the time this plan was written, it recorded one important correction before the migration continued:

- `DocumentLayout.astro` already mounted the shared Astro header and footer.
- Adding the Astro shell was therefore not part of the remaining migration.
- Sanitising the embedded Framer document body was identified as the next migration step so document-driven pages would stop carrying duplicate shell markup, brittle hide-by-heuristic behaviour, and Framer-only routing assumptions.

The planned implementation order was:

1. Stabilisation of the then-current document shell through deterministic shell removal.
2. Migration of the low-risk static document pages into Astro sections.
3. Migration of the homepage after reusable section primitives existed.
4. Migration of programme pages.
5. Migration of tutorial pages.
6. Removal of `DocumentPage` / `getRouteDocument` usage entirely.

## Historical Implementation Sequence

All six steps in this section were completed or superseded when the document-rendering architecture was removed. They are retained only to explain the original migration sequence.

### 1. Planned shell sanitisation for `DocumentLayout` (completed and removed)

This was originally identified as the first blocking task. It is not a current blocker or task. The proposed change consisted of:

- Replacement of the runtime “find and hide embedded footer/header” approach in `src/layouts/DocumentLayout.astro` with a build-time/document-transform step in `src/lib/route-documents.js`.
- A normalised object from `getRouteDocument(routePath)` containing:
  - `headHtml`
  - `bodyHtml`
  - `bodyHtmlSansShell`
  - `shellMetadata` with booleans or selectors for removed header/footer blocks
- Rendering of `bodyHtmlSansShell`, rather than raw `bodyHtml`, by `DocumentLayout`.
- Removal by the transform of:
  - embedded Framer desktop/tablet/mobile nav blocks
  - embedded Framer footer/newsletter/footer-social blocks
  - any duplicated shell wrappers whose only purpose is header/footer chrome
- Retention of path rewriting in `route-documents.js`, with all shell sanitisation moved there so `DocumentLayout` would become thin and predictable.
- Removal of the footer-hiding mutation observer after adoption of the sanitised body.
- Retention of same-origin full-document navigation interception as a small layout concern.

The selected approach was build-time string/DOM sanitisation in `route-documents.js`, rather than runtime DOM surgery in the browser.

### 2. Planned reusable Astro section set (historical)

The plan proposed extracting a small section library for recurring document patterns before pages were migrated. Proposed Astro-owned section primitives included:

- hero band with title/subtitle/media
- logo rail / partner strip
- proof or stats band
- feature grid / card grid
- CTA band
- content block section with heading/body/media
- testimonial or showcase strip if needed after inspecting `/showcase`

The proposed location was a single section namespace such as `src/components/sections/`, with structured props rather than raw HTML where possible. The selected approach put shared page sections before page-specific monoliths so `/professionals`, `/schools`, `/individuals`, and `/showcase` could share primitives.

### 3. Planned static document page migration (completed)

The proposed order was:

1. `/professionals`
2. `/schools`
3. `/individuals`
4. `/showcase`
5. `/microbit`
6. `/tinker-x`
7. `/infocomm-club`

For each page, the plan called for reproduction of the then-current document layout with Astro section primitives, use of existing structured content where available, and new data shapes only where existing inputs were insufficient. After parity was confirmed, the route's dependency on `DocumentPage` would be removed.

The proposed acceptance criteria required no `DocumentPage` import, no `getRouteDocument` dependency, and desktop/tablet/mobile screenshot parity against the then-current built baseline.

### 4. Planned homepage migration (completed)

The plan placed the homepage after the static section library had been proven.

The planned breakdown used these owned Astro sections:
- hero
- partner/proof strip
- flagship or popular courses band
- audience CTA cluster
- any homepage-specific promo band above the shared footer

The homepage would then become the canonical shell reference without remaining document-driven. Acceptance required `/` to have no `DocumentPage` import while remaining visually canonical for the header, footer, and search.

### 5. Planned dynamic template migration (completed)

The plan called for removing document branches from the dynamic routes after the static page migration.

For `src/pages/programmes/[slug].astro`, the proposed Astro-only programme layout contract covered:
  - hero
  - meta strip
  - chips/tags
  - body sections
  - CTA block

For `src/pages/tutorials/[slug].astro`, the plan retained `TutorialStory` as the Astro-only base and filled parity gaps through props and styles rather than a route-document fallback.

For `src/pages/[slug].astro`, the plan removed the remaining generic static-page document branch after the listed static pages were migrated.

### 6. Planned final removal (completed)

The final planned step, after all routes above had been migrated, consisted of:

- deletion of `src/components/DocumentPage.astro`
- removal of `getRouteDocument(...)` usage from route code
- reduction or deletion of `src/generated/route-documents.js`
- retention of document payloads only when explicitly needed as temporary reference material, with all others removed from runtime paths

## Historical Interface Proposals

The plan proposed these transitional contracts; none describes a current `getRouteDocument` API:

- `getRouteDocument(routePath)` would become an internal transitional API returning sanitised document payloads, without new route dependencies.
- New section components would accept structured props rather than raw page-sized HTML strings.
- New page data would live in existing data domains where possible rather than creating a second parallel content system.

## Historical Test Plan

The migration plan called for these checks after each step:

- `npm run build`
- `npm run check`

The planned per-page verification covered:
- desktop/tablet/mobile screenshot parity against the then-current built baseline
- header and footer match shared Astro shell exactly
- no duplicate nav/footer remains in the DOM
- no page body is hidden by heuristic shell stripping
- same-origin navigation uses correct absolute paths
- local assets resolve from `/assets`, `/fonts`, `/images`, `/sites`, and `/third-party-assets`

The proposed critical route set for each regression pass was:
- `/`
- `/courses-all`
- `/showcase`
- `/professionals`
- `/about-us`
- `/contact-us`
- one migrated programme page
- one migrated tutorial page

## Historical Assumptions

At the time the plan was written, it assumed:

- The shared Astro header/footer would be the canonical shell implementation.
- The then-current built output, not the historical mirror, would be the parity baseline for incremental migration.
- Deterministic shell sanitisation would be prioritised because heuristic footer hiding was still a fragility point.
- The refactor would avoid new design changes beyond matching the agreed shell and page visuals.
