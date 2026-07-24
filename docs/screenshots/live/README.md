# Pre-rebuild Framer Screenshot Archive

> **Historical archive — not the current design.** These screenshots capture the retired Framer site before the Astro rebuild. The folder retains its original `live` name only to avoid a large binary rename and broken historical references.

Use this pack only for migration history and intentional comparisons with the old site. To inspect the current design, build and render the current Astro source.

## Coverage

- `desktop/` contains full-page desktop captures from the pre-rebuild sitemap.
- `tablet/` contains full-page tablet captures from the pre-rebuild sitemap.
- `mobile/` contains full-page mobile captures from the pre-rebuild sitemap.
- `states/` contains historical interaction states such as hover, search-open, and mobile viewport shots.

Archived crawl coverage:

- `65` desktop screenshots
- `65` tablet screenshots
- `65` mobile screenshots

The baseline folders matched `sitemap.xml` at capture time. They are not expected to match the current route inventory.

## Naming

- `/` maps to `home.png`
- Other routes map to a lowercase hyphenated filename based on the full path
- Nested routes keep their family prefix, for example `programme-swift-accelerator.png` and `tutorial-quick-maths.png`

## Route Families

- Top-level marketing and index pages such as `/about-us`, `/contact-us`, `/courses-all`, `/microbit`, and `/showcase`
- Programme detail pages under `/programmes/*`
- Tutorial detail pages under `/tutorials/*`

## State Pack

The `states/` folder is a smaller targeted set of old-site interactions, including:

- desktop hover states for nav, cards, links, and contact elements
- desktop search-open state
- mobile viewport reference shots

See `states/states-manifest.json` for the archived state inventory and any failed attempts.

## How To Use

- Use these screenshots only when investigating migration history or intentionally comparing the Astro site with its Framer predecessor.
- Do not use them to infer current layout, typography, casing, imagery, or interaction behaviour.
- Do not run the bundled capture scripts in place: that would mix current captures into this historical archive. Create a new dated pack for any future baseline.
