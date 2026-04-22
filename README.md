# tinkercademy.com

Astro rebuild of the live `tinkercademy.com` Framer site.

Programme content is now Astro-first:

1. Author each programme as Markdown under `src/content/programmes/`.
2. Resolve audience/domain/platform labels from the structured JSON taxonomies under `src/data/pages/`.
3. Render Astro routes from that content, plus checked-in document HTML/CSS/JS payloads for the pages that still need Framer-level visual parity.

The crawl and Framer import scripts remain in the repo as legacy migration infrastructure for other structured data and audit snapshots. They are no longer the source of truth for programme authoring.

## Commands

- `pnpm install` installs dependencies.
- `pnpm run dev` starts the Astro dev server.
- `pnpm run build` builds the site.
- `pnpm run check` runs `astro check`.
- `pnpm run import:live` re-crawls the public site and regenerates legacy structured data files.
- `pnpm run import:framer` refreshes legacy Framer-backed structured data from `.env.local` or `.env`.

## Deployment

Production deploys to a Cloudflare Worker (static assets) on pushes to `main`. The repo ships a `wrangler.jsonc` at the root; see [docs/deployment.md](./docs/deployment.md) for the dashboard-side setup and the per-environment `SITE_URL` behaviour.

## Data model

Legacy CRM-like mirror files live under `src/data/crm/`:

- `programmes.yml`
- `tutorials.yml`
- `audiences.yml`
- `topics.yml`
- `platforms.yml`
- `domains.yml`
- `articles.yml`
- `external-logos.yml`
- `contacts.yml`
- `locations.yml`
- `social-links.yml`
- `cta-destinations.yml`
- `forms.yml`
- `site-settings.yml`

Static page payloads and asset inventories live under `src/data/pages/`.

The imported home page payload now carries explicit landing-page fields such as hero copy, focus areas, flagship cards, and featured course ordering so the Astro front end does not have to infer those from raw Framer blocks at render time.
Static route payloads also retain extracted `blocks`, explicit `course_cards`, and normalised `sections` arrays for tutorial/detail routes so bespoke pages and course listings can render without parsing CTA labels at runtime.

## Content authoring

See [docs/cms-ready-content.md](./docs/cms-ready-content.md) for the current CMS-readiness audit and the add/edit workflow for programmes, tutorials, articles, logos, and team members.

Short version:

- Programmes live in `src/content/programmes/*.md` and are the canonical source for programme pages, programme listings, and the programme search index.
- `src/data/pages/*.json` remains the runtime source for taxonomies and other structured page data.
- `src/data/crm/*.yml` is a generated mirror for easier inspection, not a runtime source.
- Some entities are still Framer-backed (`tutorials`, `articles`, `external-logos`, `domains`, `platforms`).
- Static page payloads, navigation, contact data, and site settings still come from the crawl/import pipeline.
- Team members for `/about-us` are still repo-managed in `src/data/team.yaml`.

### Adding or editing a programme

1. Create or update a Markdown file at `src/content/programmes/<slug>.md`.
2. Use this frontmatter shape:

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

3. Write the long-form body in Markdown. The current convention is:

```md
## Course Overview

...

## Lesson Outcomes

...

## Details

...
```

4. Run `pnpm run check` and `pnpm run build`.

Programme taxonomy pills and badges link into the listing filters using `/courses-all?audience=<id>&domain=<id>&platform=<id>`. Those query params are also honoured on `/courses-schools` and `/courses-professionals`.

## Notes

- `scripts/_artifacts/` is generated and ignored.
- `pnpm run import:framer` is optional and uses `FRAMER_API_KEY` plus `FRAMER_PROJECT_URL` from `.env.local` or `.env`.
- The Framer export step writes a raw snapshot to `scripts/_artifacts/framer-api/export.json` for inspection.
- Page rendering is Astro-native; `downloads/rehosted_site/` and `src/mirror-html/` are not part of the runtime or build path.
- The high-fidelity document routes now import checked-in HTML/CSS/JS payloads from `src/generated/route-documents.js` and local runtime assets under `public/assets/`, `public/fonts/`, `public/images/`, `public/sites/`, and `public/third-party-assets/`.
- Framer-hosted media used by those document payloads is rewritten to local assets so the rendered site does not depend on `framerusercontent.com` at runtime.
- `src/lib/site-media.js` maps the current live homepage brand, partner, badge, and compact course imagery used for the higher-fidelity front-page rebuild.
- `/professionals`, `/schools`, and `/individuals` are dedicated Astro routes; they are intentionally excluded from the generic `[slug].astro` renderer.
- Tutorial/static routes that exist in the extracted document source use the imported HTML/CSS/JS payloads; missing routes still fall back to the structured Astro implementations.
- Visual parity checks should be run against both the live site and the local Astro build after each substantial import/render pass.
