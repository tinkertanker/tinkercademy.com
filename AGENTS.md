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

### Non-obvious notes

- Node.js >= 22.12.0 is required (`engines` field in `package.json`).
- The `[content] Content config not loaded` warning on `npm run dev` is expected and harmless — the site uses raw YAML/JSON data files under `src/data/`, not Astro content collections.
- `npm run check` reports only hints (CommonJS warnings on Playwright helper scripts in `docs/`, a deprecated `frameborder` attribute); there are zero errors.
- No environment variables or secrets are needed.
- The crawl/import pipeline (`npm run import:live`) hits the live `tinkercademy.com` site — all data is already committed so you do not need to run it for normal dev work.
