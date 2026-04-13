# Visual parity notes (pass 1)

Reference pack: `docs/screenshots/live/` (desktop, tablet, mobile, `states/`).

## Compared this pass

- `docs/screenshots/live/desktop/home.png` — hero imagery, marquee copy, section order
- `docs/screenshots/live/states/home-search-open-desktop.png` — search overlay behaviour
- `docs/screenshots/live/desktop/courses-all.png` — course cards and listing chrome (for cross-check)
- `docs/screenshots/live/desktop/programme-knowledge-powered-ai-with-chatgpt.png` — programme hero and meta bar

## Changes implemented

1. **Homepage (`src/pages/index.astro`)**  
   - Hero background uses `hero_image` from `static-pages.json` (Framer URL) instead of the static `/images/hero-bg.jpg` placeholder.  
   - Partner marquee label, domain bubbles, and institution/certification captions read from `partner_statement`, `focus_areas`, and `proof_points` when present (fallbacks preserve previous behaviour).

2. **Header / search (`src/components/SiteHeader.astro`, `src/layouts/BaseLayout.astro`, `src/lib/data.js`)**  
   - Search control opens a full-viewport overlay with dimmed backdrop, pill search field, close control, and a results list — aligned with `home-search-open-desktop.png`.  
   - Programme matches are built from `getSearchableProgrammes()` (structured data only); results show audience-coloured badges like the live course cards.  
   - Search icon is a button (no longer a plain link to `/courses-all`).

3. **Programme detail (`src/pages/programmes/[slug].astro`)**  
   - Hero title uses Oswald uppercase styling closer to live; duration line under the title when data provides it.  
   - Meta bar: audience pills with red/blue mapping (students/teachers vs businesses/public); “Type” shows “Corporate training” for business/public audiences (live label), otherwise first topic or audience.  
   - Section headings use Oswald uppercase for closer parity with live content blocks.

## Known gaps / next iterations

- **Home “Popular Courses”** — still a horizontal scroll strip; live is a multi-row grid with different card aspect and hover (see `home-course-card-hover-desktop` in `states/states-manifest.json`; capture failed on live — verify selector).  
- **Marquee motion** — speed and fade masks may still differ from Framer; tune against `desktop`/`tablet`/`mobile` home captures.  
- **Flagship block** — layout/spacing vs live home still needs pixel pass.  
- **Footer** — column widths, typography scale, and link colours vs `desktop` footer crop not fully matched this pass.  
- **Tutorial template** — not re-checked against a tutorial desktop file in this workspace snapshot; align `tutorial-back-link-hover-desktop` / `tutorial-store-link-hover-desktop` next.  
- **Listing pages** — `/professionals`, `/schools`, `/individuals` and shared `CourseGrid` hover states vs `courses-all-*` state shots.

## Parallel work split (for further cloud agents)

| Agent focus | Scope | Primary files |
|-------------|--------|----------------|
| A | Homepage sections after hero (marquee tuning, popular grid, flagship) | `index.astro`, `site-media.js` |
| B | Header/footer/nav only | `SiteHeader.astro`, `SiteFooter.astro`, `BaseLayout.astro` |
| C | Course listings + audience pages | `[slug].astro` (listing branch), `CourseGrid.astro`, `ProgrammeCard.astro` |
| D | Programme template body + tables + CTA strip | `[slug].astro`, `CtaBanner.astro` |
| E | Tutorial story layout + banner | `tutorials/[slug].astro`, `TutorialStory.astro`, `HeroMedia.astro` |
