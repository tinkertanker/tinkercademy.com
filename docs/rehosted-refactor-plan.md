# Rehosted Page Refactor Plan

## Goal

Replace the current hybrid "raw rehosted Framer document" approach with shared Astro layout primitives and progressively migrated Astro page sections, while preserving the current high-fidelity visual baseline.

The target end state is:

- one canonical shared header
- one canonical shared footer
- Astro-owned route shells for every page
- Framer payloads used only as temporary reference material or transitional section content
- no route-level behavioural split between "rehosted" pages and "custom" pages

## Current architecture

### Astro-owned shell

`src/layouts/BaseLayout.astro` mounts:

- `SiteHeader`
- `SiteFooter`
- shared fonts and global shell styles

This is used by pages such as:

- `/contact-us`
- `/about-us`
- Astro fallback branches in `[slug].astro`, `programmes/[slug].astro`, and `tutorials/[slug].astro`

### Rehosted shell

`src/components/RehostedPage.astro` and `src/layouts/RehostedDocumentLayout.astro` inject checked-in Framer `headHtml` and `bodyHtml` verbatim from `src/generated/rehosted-documents.js`.

These pages therefore still carry their own:

- header markup
- footer markup
- page-specific global CSS
- Framer runtime behaviour
- internal client-side routing assumptions

The only shared logic currently applied to rehosted pages is the click interception in `RehostedDocumentLayout.astro` that forces full-document navigation for same-origin routes.

### Route inventory

As of now, `src/generated/rehosted-documents.js` contains **44** rehosted documents:

- **11 static routes**
- **29 programme routes**
- **4 tutorial routes**

Current direct rehosted routes include:

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

Dynamic routes still branch on `getRehostedDocument(...)` in:

- `src/pages/[slug].astro`
- `src/pages/programmes/[slug].astro`
- `src/pages/tutorials/[slug].astro`

## Why this has been awkward

The current implementation has two competing layout systems:

1. Astro pages use shared components.
2. Rehosted pages use an embedded Framer page that already includes its own header, footer, styles, and runtime.

That means any change to navigation, footer structure, search behaviour, font loading, or spacing has to be made twice unless the page is fully migrated. It also means visual alignment discussions can become ambiguous because there is no single source of truth in code yet.

## Refactor principles

1. **Homepage shell is the canonical visual reference.**
   The rehosted homepage header/footer define the design to match, not the current Astro substitutes.

2. **Refactor direction is one-way.**
   Rehosted design is ported into shared Astro components. Astro components should not be used to restyle rehosted pages unless that is part of an explicit extraction step.

3. **Shell first, sections second.**
   Unifying header/footer/search/navigation yields the biggest reduction in back-and-forth before individual page bodies are migrated.

4. **Keep parity evidence-driven.**
   Every phase should be validated with desktop/tablet/mobile screenshots against the current rehosted baseline.

5. **Do not delete fallback/reference material until the replacement is proven.**
   Remove rehosted dependencies only after the corresponding Astro implementation is already live and verified.

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

- the team agrees which header/footer is the visual source of truth
- no further “which version are we matching?” ambiguity remains

### Phase 1: Extract canonical shared shell components

Build shared Astro components that match the rehosted homepage shell exactly:

- `HeaderParity.astro` or a rewritten `SiteHeader.astro`
- `FooterParity.astro` or a rewritten `SiteFooter.astro`
- shared search overlay behaviour
- shared font-loading and spacing tokens

Work items:

- match homepage nav spacing, logo size, search icon, dropdown behaviour, sticky/non-sticky behaviour
- match footer columns, typography, CTA button styling, and spacing
- isolate shell-specific CSS from page-body CSS

Do not yet touch the page bodies beyond shell integration.

Acceptance criteria:

- `/contact-us` and `/about-us` match the homepage shell visually
- header/footer screenshots are within agreed tolerance on desktop/tablet/mobile

### Phase 2: Decouple rehosted pages from embedded Framer shell

Refactor `RehostedDocumentLayout.astro` so it can host:

- Astro shared header
- Astro shared footer
- only the inner Framer page body

This requires stripping or suppressing embedded Framer shell elements from the rehosted payload.

Work items:

- define a sanitisation layer for rehosted documents
- remove or hide Framer header nodes
- remove or hide Framer footer nodes
- keep route-safe click interception
- ensure page CSS no longer unexpectedly overrides shared shell styles

Recommended implementation:

- add a build-time transformer in `src/lib/rehosted-pages.js` that returns:
  - `headHtml`
  - `bodyHtmlSansShell`
  - metadata about removed shell nodes if needed for debugging

Acceptance criteria:

- homepage and other rehosted pages use the same Astro header/footer as custom pages
- no duplicate nav or footer exists in the DOM
- search and route transitions behave consistently everywhere

### Phase 3: Convert low-risk static rehosted pages to Astro sections

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

- each migrated page no longer depends on a rehosted document at runtime
- page screenshots match the pre-migration baseline

### Phase 4: Refactor the homepage last among static pages

The homepage is the hardest page because it mixes:

- hero imagery and overlays
- badge rails / proof bands
- flagship course cards
- multiple promotional sections
- search/nav interactions

Do it after the shared shell and reusable section primitives already exist.

Suggested decomposition:

- hero section
- partner/proof strip
- flagship programmes
- audience CTA cluster
- footer CTA area if still distinct from global footer

Acceptance criteria:

- `/` no longer imports `RehostedPage`
- homepage remains the canonical shell reference after the migration

### Phase 5: Migrate dynamic programme routes

Refactor `src/pages/programmes/[slug].astro` so all currently rehosted programme pages use Astro-owned templates.

Current state:

- 29 programme routes still prefer rehosted documents when available
- fallback Astro rendering already exists, but it is not parity-complete enough to replace the rehosted branch

Approach:

- compare several rehosted programme variants and identify the common layout contract
- enrich structured data only where gaps remain
- move repeated visual patterns into shared components:
  - programme hero
  - meta strip
  - chip groups
  - section body renderer
  - CTA area

Acceptance criteria:

- `getRehostedDocument('/programmes/...')` is no longer used
- programme pages preserve current visual hierarchy and CTA placement

### Phase 6: Migrate dynamic tutorial routes

Current rehosted tutorial coverage is smaller, so this should follow programme migration.

Approach:

- unify tutorial banner, hero media, story content, and CTA treatment
- keep `TutorialStory.astro` as the base and only add the missing parity details

Acceptance criteria:

- `getRehostedDocument('/tutorials/...')` is no longer used
- tutorial pages share the same shell and route behaviour as the rest of the site

### Phase 7: Remove rehosted runtime dependencies

Once all routes are Astro-owned:

- remove `RehostedPage.astro`
- remove `RehostedDocumentLayout.astro`
- remove `src/lib/rehosted-pages.js`
- remove `src/generated/rehosted-documents.js`
- remove any now-unused Framer runtime assets from `public/`
- update `README.md` to reflect the fully Astro-native state

Acceptance criteria:

- no page imports `RehostedPage` or `getRehostedDocument`
- no runtime depends on embedded Framer documents

## Recommended execution order

This is the order I would actually use:

1. Freeze reference screenshots
2. Extract shared header/footer/search
3. Make rehosted pages use the shared shell
4. Migrate non-home static pages
5. Migrate homepage
6. Migrate programme template
7. Migrate tutorial template
8. Remove rehosted document system

## Suggested work breakdown

### Track A: shell parity

- header
- footer
- search
- global font and spacing tokens

### Track B: rehosted sanitisation

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

Framer runtime may assume its own header/search/nav structure exists.

Mitigation:

- move shared interactions into Astro components early
- keep browser validation for navigation/search across every phase

### Data-shape gaps

Some parity details may still exist only in rehosted HTML rather than structured `src/data/`.

Mitigation:

- enrich `src/data/pages/` only when a specific parity gap is discovered
- avoid parsing arbitrary HTML at runtime

## Definition of done

This refactor is complete when all of the following are true:

- every route uses the same Astro header and footer
- no route injects a full Framer page document
- homepage, contact, about, programmes, and tutorials all behave consistently
- there are no remaining `getRehostedDocument(...)` branches
- the rehosted payloads are no longer on the runtime path
