## Cursor Cloud specific instructions

This is a static Astro site (no backend, no database, no Docker). See `README.md` for the full command reference.

### Key commands

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 4321) |
| Build | `npm run build` |
| Type check | `npm run check` (runs `astro check`) |
| Re-crawl live data | `npm run import:live` (requires internet; data already committed) |
| Enrich from Framer CMS | `npm run import:framer` (requires local Framer credentials) |

### Non-obvious notes

- Node.js >= 22.12.0 is required (`engines` field in `package.json`).
- The `[content] Content config not loaded` warning on `npm run dev` is expected and harmless — the site uses raw YAML/JSON data files under `src/data/`, not Astro content collections.
- `npm run check` reports only hints (CommonJS warnings on Playwright helper scripts in `docs/`, a deprecated `frameborder` attribute); there are zero errors.
- Normal dev/build work does not need any environment variables.
- `npm run import:framer` loads `FRAMER_API_KEY` and `FRAMER_PROJECT_URL` from `.env.local` or `.env` in the active worktree. These files are git-ignored; `.env.example` documents the required keys.
- The crawl/import pipeline (`npm run import:live`) hits the live `tinkercademy.com` site — all data is already committed so you do not need to run it for normal dev work.
- The repo remains crawl-first: `npm run import:live` regenerates the baseline `src/data` payloads from the published site, and `npm run import:framer` optionally enriches those generated files with direct Framer CMS data.
- Page rendering is now Astro-native; `downloads/rehosted_site/` is no longer a build input.
- Structured data and curated page media may still point at remote `framerusercontent.com` URLs, so preserve those URLs unless you are explicitly localising the asset inventory.
- The Framer enrichment step currently backfills richer programme/tutorial metadata and writes additional collections under `src/data/pages/` and `src/data/crm/`, including `platforms`, `domains`, `articles`, and `external-logos`.
- `npm run import:framer` also writes a raw inspection snapshot to `scripts/_artifacts/framer-api/export.json`.
- Current page integrations that depend on the Framer enrichment:
  homepage uses live domains and platform data;
  `/professionals` uses imported external logos for partner/client bands;
  programme detail pages use imported domains, platforms, and Framer sign-up CTA data.
