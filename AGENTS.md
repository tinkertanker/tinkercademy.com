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
- High-fidelity document payloads are checked in under `src/generated/route-documents.js`; route files import those payloads directly instead of reading a mirror folder at runtime.
- Runtime assets required by those document payloads live under `public/assets/`, `public/fonts/`, `public/images/remote/`, `public/sites/`, and `public/third-party-assets/`.
- The Framer enrichment step currently backfills richer programme/tutorial metadata and writes additional collections under `src/data/pages/` and `src/data/crm/`, including `platforms`, `domains`, `articles`, and `external-logos`.
- `npm run import:framer` also writes a raw inspection snapshot to `scripts/_artifacts/framer-api/export.json`.
- Current page integrations that depend on the Framer enrichment:
  homepage uses live domains and platform data;
  `/professionals` uses imported external logos for partner/client bands;
  programme detail pages use imported domains, platforms, and Framer sign-up CTA data.

### Shared shell parity

- When the user says to apply page A's design onto page B, treat page A as the canonical visual source. Do not "standardise" by changing page A to match page B unless the user explicitly asks for that reversal.
- For shared shell work such as headers, footers, or nav bars, do not rely on generic utility wrappers like `.shell` inside the shared component if those wrappers are also defined by page layouts. Use component-scoped wrappers so document-driven and structured Astro pages render identically.
- Header and nav links must use absolute site paths such as `/contact-us`, not relative `contact-us` or `./contact-us`, to avoid route-dependent navigation bugs.
- For parity fixes, verify both `npm run dev` and built output in a real browser on representative routes before declaring success. Check computed styles and layout metrics, not just screenshots.
