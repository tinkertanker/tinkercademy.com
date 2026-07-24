# Visual parity notes

> **Historical migration notes.** The reference pack at `docs/screenshots/live/` captures the retired pre-rebuild Framer site, not the current design.

Reference pack used during the migration: `docs/screenshots/live/` (desktop, tablet, mobile, `states/`).

## Pass 2 — re-check (Popular Courses grid)

- **Verified** against `docs/screenshots/live/desktop/home.png`: the pre-rebuild “Popular Courses” section was a **multi-column grid**, not a horizontal scroller.
- **Change:** `src/pages/index.astro` — replaced the carousel strip with `popular-grid` (`repeat(4, 1fr)` desktop, 2 columns tablet, 1 column mobile), card `width: 100%`, and hover closer to listing cards (lift, shadow, border tint, image scale, title accent).
- **Build:** `npm run build` and `npm run check` run clean after the change.

## Pass 1 — compared

- `docs/screenshots/live/desktop/home.png` — hero imagery, marquee copy, section order
- `docs/screenshots/live/states/home-search-open-desktop.png` — search overlay behaviour
- `docs/screenshots/live/desktop/courses-all.png` — course cards and listing chrome (for cross-check)
- `docs/screenshots/live/desktop/programme-knowledge-powered-ai-with-chatgpt.png` — programme hero and meta bar

## Pass 1 — changes implemented

1. **Homepage (`src/pages/index.astro`)**  
   - Hero background uses `hero_image` from `static-pages.json` (Framer URL) instead of the static `/images/hero-bg.jpg` placeholder.  
   - Partner marquee label, domain bubbles, educator proof text, and institution/certification captions read from `partner_statement`, `domains.json` (via `getProgrammeFilterOptions().domains`), `proof_points`, and `HOME_INSTITUTION_LOGOS` / `HOME_CERTIFICATION_BADGES` when present (fallbacks preserve previous behaviour).

2. **Header / search (`src/components/SiteHeader.astro`, `src/pages/programme-search-index.json.ts`, `src/lib/data.js`)**  
   - Search control opens a full-viewport overlay with dimmed backdrop, pill search field, close control, and a results list — aligned with `home-search-open-desktop.png`.  
   - Programme matches use `getSearchableProgrammes()` at build time to emit `/programme-search-index.json`; the client loads that JSON on first open so HTML payloads stay smaller. Results show audience-coloured badges like the live course cards.  
   - Search icon is a button (no longer a plain link to `/courses-all`).

3. **Programme detail (`src/pages/programmes/[slug].astro`)**  
   - Hero title uses Oswald uppercase styling closer to live; duration line under the title when data provides it.  
   - Meta bar: audience pills with red/blue mapping (students/teachers vs businesses/public); “Type” shows “Corporate training” for business/public audiences (live label), otherwise first topic or audience.  
   - Section headings use Oswald uppercase for closer parity with live content blocks.

## Known gaps / next iterations

- **Home “Popular Courses”** — grid layout aligned; fine-tune column count at very wide viewports (live may use 5-up on ultra-wide) and card min-heights vs screenshot. Re-capture `home-course-card-hover-desktop` once the live Playwright selector is fixed (`states/states-manifest.json`).  
- **Marquee motion** — speed and fade masks may still differ from Framer; tune against `desktop`/`tablet`/`mobile` home captures.  
- **Flagship block** — layout/spacing vs live home still needs pixel pass.  
- **Footer** — column widths, typography scale, and link colours vs `desktop` footer crop not fully matched this pass.  
- **Tutorial template** — not re-checked against a tutorial desktop file in this workspace snapshot; align `tutorial-back-link-hover-desktop` / `tutorial-store-link-hover-desktop` next.  
- **Listing pages** — `/professionals`, `/schools`, `/individuals` and shared `CourseGrid` hover states vs `courses-all-*` state shots.

## Parallel work split (for further cloud agents)

| Agent focus | Scope | Primary files |
|-------------|--------|----------------|
| A | Homepage sections after hero (marquee tuning, flagship spacing) | `index.astro`, `site-media.js` |
| B | Header/footer/nav only | `SiteHeader.astro`, `SiteFooter.astro`, `ContentLayout.astro` |
| C | Course listings + audience pages | `[slug].astro` (listing branch), `CourseGrid.astro`, `ProgrammeCard.astro` |
| D | Programme template body + tables + CTA strip | `[slug].astro`, `CtaBanner.astro` |
| E | Tutorial story layout + banner | `tutorials/[slug].astro`, `TutorialStory.astro`, `HeroMedia.astro` |
