# tinkercademy.com

Astro rebuild of the live `tinkercademy.com` Framer site. The workflow is crawl-first:

1. Crawl the public site and save raw artefacts under `scripts/_artifacts/`.
2. Normalise the crawl into CRM-like YAML/JSON under `src/data/`.
3. Render Astro routes from those structured files instead of mirroring Framer DOM.

## Commands

- `npm run import:live` crawls the public site and regenerates the structured data files.
- `npm run import:framer` enriches the generated data with direct Framer CMS data from `.env.local` or `.env`.
- `npm run dev` starts the Astro dev server.
- `npm run build` builds the site.
- `npm run check` runs `astro check`.

## Data model

CRM-like files live under `src/data/crm/`:

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
Static route payloads also retain extracted `blocks`, explicit `course_cards`, and normalised `sections` arrays for programme/tutorial detail routes so bespoke pages and course listings can render without parsing CTA labels at runtime.

## Notes

- `scripts/_artifacts/` is generated and ignored.
- `npm run import:framer` is optional and uses `FRAMER_API_KEY` plus `FRAMER_PROJECT_URL` from `.env.local` or `.env`.
- The Framer enrichment step writes a raw export snapshot to `scripts/_artifacts/framer-api/export.json` for inspection.
- The current implementation keeps remote image URLs from Framer while the migration is still in progress.
- `src/lib/site-media.js` maps the current live homepage brand, partner, badge, and compact course imagery used for the higher-fidelity front-page rebuild.
- `/professionals`, `/schools`, and `/individuals` are dedicated Astro routes; they are intentionally excluded from the generic `[slug].astro` renderer.
- Tutorial pages are rendered as grouped story sections from the imported Framer handover sequence rather than a flat HTML dump.
- Visual parity checks should be run against both the live site and the local Astro build after each substantial import/render pass.
