# Live Screenshot Pack

This folder is the live-site reference pack for rebuild and parity work against `https://tinkercademy.com`.

## Coverage

- `desktop/` contains full-page desktop captures for every public URL in the live sitemap.
- `tablet/` contains full-page tablet captures for every public URL in the live sitemap.
- `mobile/` contains full-page mobile captures for every public URL in the live sitemap.
- `states/` contains interaction and reference-state captures such as hover, search-open, and mobile viewport shots.

Current baseline coverage:

- `65` desktop screenshots
- `65` tablet screenshots
- `65` mobile screenshots

The baseline folders match the current `sitemap.xml` exactly, with no missing or extra route files.

## Naming

- `/` maps to `home.png`
- Other routes map to a lowercase hyphenated filename based on the full path
- Nested routes keep their family prefix, for example `programme-swift-accelerator.png` and `tutorial-quick-maths.png`

## Route Families

- Top-level marketing and index pages such as `/about-us`, `/contact-us`, `/courses-all`, `/microbit`, and `/showcase`
- Programme detail pages under `/programmes/*`
- Tutorial detail pages under `/tutorials/*`

## State Pack

The `states/` folder is a smaller targeted set for interaction checks, including:

- desktop hover states for nav, cards, links, and contact elements
- desktop search-open state
- mobile viewport reference shots

See `states/states-manifest.json` for the current state inventory and any failed attempts.

## How To Use

- Compare local rebuilds against the matching viewport folder before changing layout, spacing, typography, imagery, or copy.
- Use `states/` when reproducing hover, open, and other non-default UI behaviour.
- Treat these screenshots as the visual source of truth for parity checks, then record any deltas in the rebuild or parity docs.
