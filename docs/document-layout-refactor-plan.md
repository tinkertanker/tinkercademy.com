# Document Layout Refactor Plan

## Goal

Replace the current hybrid "checked-in Framer document payload" approach with shared Astro layout primitives and progressively migrated Astro page sections, while preserving the current high-fidelity visual baseline.

The target end state is:

- one canonical shared header
- one canonical shared footer
- Astro-owned route shells for every page
- Framer payloads used only as temporary reference material or transitional section content
- no route-level behavioural split between document-driven pages and structured Astro pages

## Current architecture

### Structured Astro shell

`src/layouts/ContentLayout.astro` mounts:

- `SiteHeader`
- `SiteFooter`
- shared fonts and global shell styles

This is used by pages such as:

- `/contact-us`
- `/about-us`
- Astro fallback branches in `[slug].astro`, `programmes/[slug].astro`, and `tutorials/[slug].astro`

### Document shell

`src/components/DocumentPage.astro` and `src/layouts/DocumentLayout.astro` inject checked-in Framer `headHtml` and `bodyHtml` verbatim from `src/generated/route-documents.js`.

These pages therefore still carry their own:

- page-specific global CSS
- Framer runtime behaviour
- internal client-side routing assumptions
- large chunks of body markup that Astro does not yet own structurally

The only shared logic currently applied to document-driven pages is the navigation interception in `DocumentLayout.astro` that forces full-document navigation for same-origin routes.

### Route inventory

`src/generated/route-documents.js` currently contains **44** route documents:

- **11 static routes**
- **29 programme routes**
- **4 tutorial routes**

Current direct document routes include:

- `/`
- `/showcase`
- `/professionals`
- `/schools`
- `/individuals`
- `/microbit`
- `/tinker-x`
- `/infocomm-club`
- `/courses-all`
- `/courses-professionals`
- `/courses-schools`

Dynamic routes still branch on `getRouteDocument(...)` in:

- `src/pages/[slug].astro`
- `src/pages/programmes/[slug].astro`
- `src/pages/tutorials/[slug].astro`

## Why this has been awkward

The current implementation still has two competing page models:

1. Structured Astro pages use shared components.
2. Document-driven pages inject a Framer-exported page body and its runtime assumptions.

That means any change to navigation, footer structure, search behaviour, font loading, or spacing can drift unless the corresponding work is done in the shared shell and in the injected document flow. It also makes visual discussions ambiguous because "the page" may still mean two different implementations.

## Refactor principles

1. **Homepage shell is the canonical visual reference.**
   The homepage document defines the shell we match unless the user explicitly chooses another source.

2. **Refactor direction is one-way.**
   Document payload design is ported into shared Astro components. Shared Astro components should not be used to restyle document-driven pages unless that is part of an explicit extraction step.

3. **Shell first, sections second.**
   Unifying header, footer, search, and navigation reduces the most back-and-forth before page-body migration starts.

4. **Keep parity evidence-driven.**
   Every phase should be validated with desktop, tablet, and mobile screenshots against the current document baseline.

5. **Do not delete fallback or reference material until the replacement is proven.**
   Remove document-payload dependencies only after the Astro replacement is already live and verified.

## Recommended phases

### Phase 0: Freeze the reference baseline

Capture a stable reference pack for the canonical shell and high-risk pages.

Required artefacts:

- homepage header crop: desktop, tablet, mobile
- homepage footer crop: desktop, tablet, mobile
- search overlay states
- `/contact-us` top bar crop after parity
- one representative programme page
- one representative tutorial page

Output:

- expand `docs/parity-notes.md` or add a sibling document with canonical screenshot paths and measured layout values

Acceptance criteria:

- the team agrees which header and footer are the visual source of truth
- no further "which version are we matching?" ambiguity remains

### Phase 1: Extract canonical shared shell components

Build shared Astro components that match the homepage document shell exactly:

- `SiteHeader.astro`
- `SiteFooter.astro`
- shared search overlay behaviour
- shared font-loading and spacing tokens

Work items:

- match homepage nav spacing, logo size, search icon, dropdown behaviour, and sticky behaviour
- match footer columns, typography, CTA button styling, and spacing
- isolate shell-specific CSS from page-body CSS

Acceptance criteria:

- `/contact-us` and `/about-us` match the homepage shell visually
- header and footer screenshots are within agreed tolerance on desktop, tablet, and mobile

### Phase 2: Decouple document-driven pages from the embedded shell

Refactor `DocumentLayout.astro` so it can host:

- Astro shared header
- Astro shared footer
- only the inner Framer page body

This requires stripping or suppressing embedded Framer shell elements from the document payload.

Work items:

- define a sanitisation layer for route documents
- remove or hide Framer header nodes
- remove or hide Framer footer nodes
- keep route-safe click interception
- ensure page CSS no longer unexpectedly overrides shared shell styles

Recommended implementation:

- add a transformer in `src/lib/route-documents.js` that can return:
  - `headHtml`
  - `bodyHtmlSansShell`
  - optional metadata about removed shell nodes for debugging

Acceptance criteria:

- homepage and other document-driven pages use the same Astro header and footer as structured Astro pages
- no duplicate nav or footer exists in the DOM
- search and route transitions behave consistently everywhere

### Phase 3: Convert low-risk static document pages to Astro sections

Migrate the static pages that are easiest to decompose after the shell is unified.

Suggested order:

1. `/professionals`
2. `/schools`
3. `/individuals`
4. `/showcase`
5. `/microbit`
6. `/tinker-x`
7. `/infocomm-club`

Reason:

- these pages are finite and easier to verify than the homepage
- they are good candidates for reusable section primitives like hero bands, logo rails, CTA blocks, and feature grids

Recommended output:

- section components under `src/components/sections/`
- data-driven props from `src/data/pages/`

Acceptance criteria:

- each migrated page no longer depends on a route document at runtime
- page screenshots match the pre-migration baseline

### Phase 4: Refactor the homepage last among static pages

The homepage is the hardest page because it mixes:

- hero imagery and overlays
- badge rails and proof bands
- flagship course cards
- multiple promotional sections
- search and nav interactions

Do it after the shared shell and reusable section primitives already exist.

Suggested decomposition:

- hero section
- partner and proof strip
- flagship programmes
- audience CTA cluster
- footer CTA area if it remains distinct from the global footer

Acceptance criteria:

- `/` no longer imports `DocumentPage`
- homepage remains the canonical shell reference after the migration

### Phase 5: Migrate dynamic programme routes

Refactor `src/pages/programmes/[slug].astro` so all currently document-driven programme pages use Astro-owned templates.

Current state:

- 29 programme routes still prefer route documents when available
- fallback Astro rendering already exists, but it is not parity-complete enough to replace the document branch

Approach:

- compare several document-based programme variants and identify the common layout contract
- enrich structured data only where gaps remain
- move repeated visual patterns into shared components:
  - programme hero
  - meta strip
  - chip groups
  - section body renderer
  - CTA area

Acceptance criteria:

- `getRouteDocument('/programmes/...')` is no longer used
- programme pages preserve current visual hierarchy and CTA placement

### Phase 6: Migrate dynamic tutorial routes

Current document tutorial coverage is smaller, so this should follow programme migration.

Approach:

- unify tutorial banner, hero media, story content, and CTA treatment
- keep `TutorialStory.astro` as the base and only add the missing parity details

Acceptance criteria:

- `getRouteDocument('/tutorials/...')` is no longer used
- tutorial pages share the same shell and route behaviour as the rest of the site

### Phase 7: Remove document runtime dependencies

Once all routes are Astro-owned:

- remove `DocumentPage.astro`
- remove `DocumentLayout.astro`
- remove `src/lib/route-documents.js`
- remove `src/generated/route-documents.js`
- remove any now-unused Framer runtime assets from `public/`
- update `README.md` to reflect the fully Astro-native state

Acceptance criteria:

- no page imports `DocumentPage` or `getRouteDocument`
- no runtime depends on embedded Framer documents

## Recommended execution order

This is the order I would actually use:

1. Freeze reference screenshots
2. Extract shared header, footer, and search
3. Make document-driven pages use the shared shell
4. Migrate non-home static pages
5. Migrate homepage
6. Migrate programme template
7. Migrate tutorial template
8. Remove document layout system

## Suggested work breakdown

### Track A: shell parity

- header
- footer
- search
- global font and spacing tokens

### Track B: document sanitisation

- body extraction
- shell suppression
- route interception
- CSS containment and collision fixes

### Track C: static section migration

- audience pages
- showcase-style pages
- homepage

### Track D: dynamic template migration

- programme pages
- tutorial pages
- catch-all static page fallback cleanup

## Risks

### CSS collision risk

Framer page CSS is global and may override shared Astro shell styles unless scoped carefully.

Mitigation:

- establish shared shell styles with high specificity only where needed
- strip shell-related Framer CSS when possible during sanitisation

### Behavioural regression risk

Framer runtime may assume its own header, search, or nav structure exists.

Mitigation:

- move shared interactions into Astro components early
- keep browser validation for navigation and search across every phase

### Data-shape gaps

Some parity details may still exist only in document HTML rather than structured `src/data/`.

Mitigation:

- enrich `src/data/pages/` only when a specific parity gap is discovered
- avoid parsing arbitrary HTML at runtime

## Definition of done

This refactor is complete when all of the following are true:

- every route uses the same Astro header and footer
- no route injects a full Framer page document
- homepage, contact, about, programmes, and tutorials all behave consistently
- there are no remaining `getRouteDocument(...)` branches
- the document payloads are no longer on the runtime path
