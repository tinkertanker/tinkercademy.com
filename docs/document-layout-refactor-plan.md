# Document-to-Astro Refactor Plan

## Summary

The refactor plan is good to continue, but it needs one important correction before handoff:

- `DocumentLayout.astro` already mounts the shared Astro header and footer.
- The next agent should **not** spend time “adding the Astro shell”.
- The real next step is to **sanitise the embedded Framer document body** so document-driven pages stop carrying duplicate shell markup, brittle hide-by-heuristic behaviour, and Framer-only routing assumptions.

The implementation order should be:

1. Stabilise the current document shell by making shell removal deterministic.
2. Migrate the low-risk static document pages into Astro sections.
3. Migrate the homepage after reusable section primitives exist.
4. Migrate programme pages.
5. Migrate tutorial pages.
6. Remove `DocumentPage` / `getRouteDocument` usage entirely.

## Implementation Changes

### 1. Make `DocumentLayout` deterministic

Treat this as the first blocking task.

- Replace the current runtime “find and hide embedded footer/header” approach in `src/layouts/DocumentLayout.astro` with a build-time/document-transform step in `src/lib/route-documents.js`.
- `getRouteDocument(routePath)` should return a normalised object with:
  - `headHtml`
  - `bodyHtml`
  - `bodyHtmlSansShell`
  - `shellMetadata` with booleans or selectors for removed header/footer blocks
- `DocumentLayout` should render `bodyHtmlSansShell`, not raw `bodyHtml`.
- The transform must remove:
  - embedded Framer desktop/tablet/mobile nav blocks
  - embedded Framer footer/newsletter/footer-social blocks
  - any duplicated shell wrappers whose only purpose is header/footer chrome
- Keep the current path rewriting in `route-documents.js`, but move all shell sanitisation there so `DocumentLayout` becomes thin and predictable.
- Remove the footer-hiding mutation observer once the sanitised body is in use.
- Keep same-origin full-document navigation interception, but only as a small layout concern.

Default chosen:
- Use build-time string/DOM sanitisation in `route-documents.js`, not runtime DOM surgery in the browser.

### 2. Define the reusable Astro section set

Before migrating pages, extract a small section library for the recurring document patterns.

Create Astro-owned section primitives for:
- hero band with title/subtitle/media
- logo rail / partner strip
- proof or stats band
- feature grid / card grid
- CTA band
- content block section with heading/body/media
- testimonial or showcase strip if needed after inspecting `/showcase`

These should live under a single section namespace, e.g. `src/components/sections/`, and take structured props rather than raw HTML where possible.

Default chosen:
- Build page sections first, not page-specific monoliths, so `/professionals`, `/schools`, `/individuals`, and `/showcase` share the same primitives.

### 3. Migrate static document pages first

Use this exact order:

1. `/professionals`
2. `/schools`
3. `/individuals`
4. `/showcase`
5. `/microbit`
6. `/tinker-x`
7. `/infocomm-club`

For each page:
- reproduce the current document layout in Astro using section primitives
- source content from existing structured data where already available
- only add new data shape where the page cannot be represented cleanly from current inputs
- once parity is confirmed, remove that route’s dependency on `DocumentPage`

Acceptance rule per page:
- route no longer imports `DocumentPage`
- route no longer depends on `getRouteDocument`
- screenshot parity holds against the current built baseline on desktop/tablet/mobile

### 4. Migrate the homepage after static primitives exist

Do the homepage only after the static section library is proven.

Break it into these owned Astro sections:
- hero
- partner/proof strip
- flagship or popular courses band
- audience CTA cluster
- any homepage-specific promo band above the shared footer

The homepage should become the canonical shell reference after this migration, but it should no longer be document-driven.

Acceptance rule:
- `/` no longer imports `DocumentPage`
- homepage remains visually canonical for header/footer/search

### 5. Migrate dynamic templates

After static page migration, remove document branches from the dynamic routes.

For `src/pages/programmes/[slug].astro`:
- standardise on the Astro branch only
- formalise the programme layout contract:
  - hero
  - meta strip
  - chips/tags
  - body sections
  - CTA block

For `src/pages/tutorials/[slug].astro`:
- standardise on the Astro branch only
- keep `TutorialStory` as the base and fill any parity gaps via props/styles, not route-document fallback

For `src/pages/[slug].astro`:
- remove remaining generic static-page document branch once the listed static pages are migrated

### 6. Final removal

Only after all routes above are migrated:

- delete `src/components/DocumentPage.astro`
- remove `getRouteDocument(...)` usage from route code
- reduce or delete `src/generated/route-documents.js`
- keep document payloads only if explicitly needed as temporary reference material; otherwise remove them from runtime paths entirely

## Public Interfaces / Contracts

Important contract changes for the implementer:

- `getRouteDocument(routePath)` becomes an internal transitional API returning sanitised document payloads; routes should not grow new dependencies on it.
- New section components must accept structured props, not raw page-sized HTML strings.
- Any new page data added during migration should live in existing data domains where possible; do not create a second parallel content system unless the current shape is genuinely insufficient.

## Test Plan

Run these checks after each migration step:

- `npm run build`
- `npm run check`

For every migrated page, verify:
- desktop/tablet/mobile screenshot parity against the current built baseline
- header and footer match shared Astro shell exactly
- no duplicate nav/footer remains in the DOM
- no page body is hidden by heuristic shell stripping
- same-origin navigation uses correct absolute paths
- local assets resolve from `/assets`, `/fonts`, `/images`, `/sites`, and `/third-party-assets`

Critical route set for every regression pass:
- `/`
- `/courses-all`
- `/showcase`
- `/professionals`
- `/about-us`
- `/contact-us`
- one migrated programme page
- one migrated tutorial page

## Assumptions

- The current shared Astro header/footer are the canonical shell implementation going forward.
- The current built output, not the historical mirror, is the parity baseline for incremental migration.
- The agent should prioritise deterministic shell sanitisation first, because the current heuristic footer hiding is still a fragility point even though it is temporarily working.
- No new design changes are intended during this refactor beyond matching the existing agreed shell and page visuals.
