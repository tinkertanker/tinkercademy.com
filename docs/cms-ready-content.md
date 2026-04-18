# CMS readiness and content authoring

This repo is now a mixed Astro-content plus imported-data setup:

- Programme content is Astro-first under `src/content/programmes/`.
- Taxonomies and other structured page data still live under `src/data/pages/`.
- `src/data/crm/*.yml` remains a generated mirror for inspection only.
- `npm run import:live` and `npm run import:framer` are retained as legacy migration utilities for non-programme content and source snapshots.

## What counts as CMS ready here

For this port, an entity is "CMS ready" if:

1. It lives in a structured collection rather than hard-coded page markup.
2. A new record can be added without editing Astro component code.
3. The runtime reads that structured source directly, instead of depending on a one-off migration step.

## Readiness summary

| Entity | Runtime source | Source of truth | CMS ready? | Notes |
| --- | --- | --- | --- | --- |
| Programmes | `src/content/programmes/*.md` | Astro content collection | Yes | Programme pages, course listings, and the programme search index all read from the collection. |
| Tutorials | `src/data/pages/tutorials.json` | Framer `Tutorials` collection | Yes | `npm run import:framer` still rebuilds this collection. |
| Articles | `src/data/pages/articles.json` | Framer `Articles` collection | Yes | Fully rebuilt from Framer on each import. |
| External logos | `src/data/pages/external-logos.json` | Framer `External Logos` collection | Yes | Used by `/professionals`. |
| Domains | `src/data/pages/domains.json` | Framer `Domains` collection | Yes | Runtime taxonomy source for programme chips and filters. |
| Platforms | `src/data/pages/platforms.json` | Framer `Platforms` collection | Yes | Runtime taxonomy source for programme chips and filters. |
| Static page payloads | `src/data/pages/static-pages.json` | Published site crawl | Partial | Structured, but still refreshed via the crawl/import pipeline rather than authored in-repo. |
| Navigation, contacts, locations, site settings | `src/data/pages/*.json` | Published site crawl | Partial | Structured, but generated from `import:live`. |
| People / team members | `src/data/team.yaml` | Repo file | No | `/about-us` reads this YAML directly; there is no collection or import path. |
| Home/about-us partner badges, certification strips, some imagery | Astro code | Repo code/assets | No | Still hard-coded in `src/lib/site-media.js` and `src/pages/about-us.astro`. |

## Source-of-truth rules

- Edit `src/content/programmes/*.md` for any programme addition or update.
- Edit Framer only for entities that still have a dedicated import-backed collection there.
- Avoid hand-editing generated runtime JSON unless you are intentionally overriding imported data.
- Treat `src/data/pages/programmes.json` and `src/data/crm/programmes.yml` as legacy migration snapshots, not authoritative sources.
- Do not extend the Framer programme import path unless the user explicitly asks for migration work.

## How to add or edit a programme

Programmes are now Astro-first and fully collection-backed.

### File location

Create or edit one Markdown file per programme at:

`src/content/programmes/<slug>.md`

The filename is the canonical programme slug.

### Frontmatter schema

Use this frontmatter shape:

```yaml
---
title: Example Programme
subtitle: Short supporting strapline
duration: 2 days
heroImage: /images/remote/example-programme.webp
audienceIds:
  - public
domainIds:
  - ai
platformIds:
  - chatgpt
cardBlurb: One-sentence listing summary.
weight: 100
homeFeaturedRank: 1
signUpLabel: Sign up now
signUpUrl: https://example.com/signup
seoTitle: Example Programme | Tinkercademy
seoDescription: Short search description.
---
```

Required fields:

- `title`
- `subtitle`
- `duration`
- `heroImage`
- `audienceIds`
- `domainIds`
- `platformIds`
- `cardBlurb`
- `weight`

Optional fields:

- `homeFeaturedRank`
- `signUpLabel`
- `signUpUrl`
- `seoTitle`
- `seoDescription`

### Body structure

Use normal Markdown for the body. The current convention is:

```md
## Course Overview

...

## Lesson Outcomes

...

## Details

...
```

Raw HTML is allowed when direct Markdown conversion would be risky.

### Taxonomy rules

- `audienceIds` must use stable IDs from `src/data/pages/audiences.json`
- `domainIds` must use stable IDs from `src/data/pages/domains.json`
- `platformIds` must use stable IDs from `src/data/pages/platforms.json`

Those IDs drive:

- programme detail chips
- course-card badges
- `/courses-all`, `/courses-schools`, and `/courses-professionals`
- the homepage featured course cards
- `/programme-search-index.json`

### Listing and featuring rules

- Generic programme listings use `weight desc, title asc`.
- Homepage featured programmes use `homeFeaturedRank asc`.
- School-facing listings include programmes with `students` or `teachers`.
- Professional-facing listings include programmes with `businesses` or `public`.
- Individual-facing listings include programmes with `public`.

### Clickable pill/filter format

Programme taxonomy pills and badges link into the listing filters using:

- `/courses-all?audience=<id>`
- `/courses-all?domain=<id>`
- `/courses-all?platform=<id>`

The same query contract also works on:

- `/courses-schools`
- `/courses-professionals`

Filtering behaviour:

- At most one value is supported per dimension.
- Unknown IDs are ignored.
- Multiple dimensions combine with `AND`.
- Text search runs on the already filtered subset.

### Verification workflow

After editing programme content:

1. Run `npm run check`.
2. Run `npm run build`.
3. Verify the affected programme detail page.
4. Verify any impacted filtered listing such as `/courses-all?domain=<id>`.

## Framer import status for programmes

The Framer import is complete as a migration source for programmes. Future programme work should happen in Astro content, not by extending `scripts/import-framer-data.mjs`.

Keep these legacy files only as historical snapshots or migration references:

- `src/data/pages/programmes.json`
- `src/data/crm/programmes.yml`

## How to add a new tutorial

Tutorials are still Framer-backed and effectively CMS ready.

1. Add the tutorial in the Framer `Tutorials` collection.
2. Run `npm run import:framer`.
3. Verify the generated route at `/tutorials/<slug>`.

Importer fields in use:

- `Title`
- `Description`
- `Topic`
- `Final Product`
- `Final Product 2`
- `Goals`
- `Materials`
- `Step 1` to `Step 13`
- `Image 1.1` to `Image 13.10`

## How to add a new article

Articles are Framer-backed and CMS ready.

1. Add the article in the Framer `Articles` collection.
2. Run `npm run import:framer`.
3. Verify `/articles` and `/articles/<slug>`.

Importer fields in use:

- `Title`
- `Date`
- `Image`
- `Filter`
- `Content`

## How to add a new partner/client logo

External logos are Framer-backed and CMS ready for `/professionals`.

1. Add the record in the Framer `External Logos` collection.
2. Run `npm run import:framer`.
3. Verify the `/professionals` logo bands.

Importer fields in use:

- `Organisation`
- `Logo`
- `Partner`
- `Type`
- `Featured`
- `Active`
- `Content`

`Type === "Partner"` is used for the partner strip. Non-partner entries become client logos.

## How to add a new domain or platform

Domains and platforms are still Framer-backed and CMS ready.

1. Add the record in Framer.
2. Run `npm run import:framer`.
3. Link the new domain/platform from programme frontmatter if needed.
4. Verify the affected programme detail pages and listings.

Importer fields in use:

Domains:

- `Title`

Platforms:

- `Title`
- `Icon`
- `Domains`
- `Content`

## How to add a new person

People are not CMS ready yet.

1. Edit `src/data/team.yaml`.
2. Add one entry with this shape:

```yaml
- name: Example Name
  role: Lead Trainer
  bio: >-
    Short biography text.
  photo: /images/remote/example-image.jpg
  linkedin: https://www.linkedin.com/in/example/
```

3. Verify `/about-us`.

Schema:

- `name`
- `role`
- `bio`
- `photo`
- `linkedin` (optional)

Only the team grid is data-driven. Other `/about-us` content such as certification logos, partner/client strips, and stats is still hard-coded in `src/pages/about-us.astro`.

## Other content that still needs code changes

These should not be called CMS ready yet:

- Homepage partner logos, certification badges, flagship image mapping in `src/lib/site-media.js`
- Parts of `/about-us` in `src/pages/about-us.astro`
- Static marketing page layouts that depend on imported copy plus locally curated media
