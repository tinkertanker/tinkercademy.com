## Cursor Cloud specific instructions

This is a static Astro site (no backend, no database, no Docker). Production deploys to a Cloudflare Worker (static assets) via `wrangler.jsonc`; see `docs/deployment.md`. See `README.md` for the full command reference.

### Key commands

| Task | Command |
|---|---|
| Install deps | `pnpm install` |
| Dev server | `pnpm run dev` (port 4321) |
| Build | `pnpm run build` |
| Type check | `pnpm run check` (runs `astro check`) |
| Re-crawl live data | `pnpm run import:live` (requires internet; data already committed) |
| Enrich from Framer CMS | `pnpm run import:framer` (requires local Framer credentials) |

### Non-obvious notes

- Node.js >= 22.12.0 and pnpm (pinned via `packageManager` in `package.json`) are required.
- Programmes now live in the Astro content collection under `src/content/programmes/`, so the old `[content] Content config not loaded` warning note is obsolete.
- `pnpm run check` reports only hints (CommonJS warnings on Playwright helper scripts in `docs/`, a deprecated `frameborder` attribute); there are zero errors.
- Normal dev/build work does not need any environment variables.
- `pnpm run import:framer` loads `FRAMER_API_KEY` and `FRAMER_PROJECT_URL` from `.env.local` or `.env` in the active worktree. These files are git-ignored; `.env.example` documents the required keys.
- Normal dev/build work does not require `pnpm run import:live` or `pnpm run import:framer`; treat both as legacy migration utilities unless you are deliberately refreshing imported data.
- Programme authoring is Astro-first. Do not extend the Framer programme pipeline unless the user explicitly asks for migration work.
- `pnpm run import:live` still hits the live `tinkercademy.com` site and regenerates legacy structured data for non-programme content.
- Page rendering is now Astro-native; `downloads/rehosted_site/` is no longer a build input.
- High-fidelity document payloads are checked in under `src/generated/route-documents.js`; route files import those payloads directly instead of reading a mirror folder at runtime.
- Runtime assets required by those document payloads live under `public/assets/`, `public/fonts/`, `public/images/`, `public/sites/`, and `public/third-party-assets/`.
- The Framer enrichment step currently backfills richer programme/tutorial metadata and writes additional collections under `src/data/pages/` and `src/data/crm/`, including `platforms`, `domains`, `articles`, and `external-logos`.
- `pnpm run import:framer` also writes a raw inspection snapshot to `scripts/_artifacts/framer-api/export.json`.
- Current page integrations that still depend on imported Framer data:
  homepage uses live domains and platform data;
  `/professionals` uses imported external logos for partner/client bands;
  tutorials and article pages still render imported Framer-backed content.

### Programme authoring notes

- Each programme is one Markdown file under `src/content/programmes/<slug>.md`; the filename is the canonical slug.
- Frontmatter must use stable taxonomy IDs from `src/data/pages/audiences.json`, `domains.json`, and `platforms.json`.
- Programme taxonomy pills and badges link into listing filters via `/courses-all?audience=<id>&domain=<id>&platform=<id>`. The same query format works on `/courses-schools` and `/courses-professionals`.
- Homepage featuring comes from `homeFeaturedRank`; generic list ordering comes from `weight desc, title asc`.

### Deploy

- Production runs on a Cloudflare Worker (static assets). **Every push to `main` builds and uploads a new Worker version but does NOT serve it.** Production stays on the previously-promoted version until someone explicitly promotes the new one.
- `wrangler.jsonc` pins the production account ID (`b8b1032c61d9475cd00229c74db7ec72`, Tinkertanker). Before promoting, run `npx wrangler whoami` and confirm Wrangler is authenticated to the expected Cloudflare account. If you have access to multiple Cloudflare accounts, prefer an account-scoped API token via `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` or your own local wrapper rather than relying on whichever `wrangler login` OAuth context happens to be active.
- When the user says "deploy", "ship it", "go live", "promote", "push to prod", "rollback", or similar, follow `.claude/skills/deploy/SKILL.md`. The short version: run `pnpm run deploy:list` to find the uploaded version, then `npx wrangler versions deploy <id>@100 --yes` to promote it, then `pnpm run smoke https://tinkercademy.com` to verify. Prefix those Wrangler commands with your local account-selection wrapper if your environment needs one.
- "Build" is automatic on push. The user typing "build this" probably means `pnpm run build` locally or a `git push` — not a deploy.
- Rollback is the same mechanism: run `pnpm run deploy:list`, pick an older version ID, then promote it with `npx wrangler versions deploy <id>@100 --yes`.
- Full setup details: `docs/deployment.md`.

### Shared shell parity

- When the user says to apply page A's design onto page B, treat page A as the canonical visual source. Do not "standardise" by changing page A to match page B unless the user explicitly asks for that reversal.
- For shared shell work such as headers, footers, or nav bars, do not rely on generic utility wrappers like `.shell` inside the shared component if those wrappers are also defined by page layouts. Use component-scoped wrappers so document-driven and structured Astro pages render identically.
- Header and nav links must use absolute site paths such as `/contact-us`, not relative `contact-us` or `./contact-us`, to avoid route-dependent navigation bugs.
- For parity fixes, verify both `pnpm run dev` and built output in a real browser on representative routes before declaring success. Check computed styles and layout metrics, not just screenshots.

### Hero / programme image generation

- Any agent generating, regenerating, or replacing hero / flagship / programme images must read [docs/hero-image-brief.md](./docs/hero-image-brief.md) first. It is the canonical brief — art direction, the codex/imagegen invocation contract, the apply-picks workflow, and the running list of prompt-time pitfalls (brand-name leaks like "Tinkercademy" / "CT Hub", back-of-laptop framing, default tudung on Malay faces, composition-uniformity traps, etc.).
- When the user rejects a single image, check the failure mode against the "Confirmed prompt-time pitfalls" section before re-rolling, and update that section if you discover a new failure mode.

### Proposal drafting

- For proposal or quotation drafting, use [docs/writing-style-guide.md](./docs/writing-style-guide.md) as the tone reference, but keep proposals slightly more formal than the website.
- Lead with substance: say what the programme is, who it is for, what participants will do, and why the format fits the audience.
- Prefer concrete outcomes, tools, constraints, and delivery details over broad claims about innovation or transformation.
- Keep reusable company boilerplate consistent, but tailor the overview, outcomes, curriculum shape, and rationale to the client context rather than pasting a generic block.
- Use proof points sparingly and specifically: relevant partners, prior programmes, comparable audiences, or delivery experience. Do not dump the full track record when a shorter tailored proof section will do.
- When reusing proposal copy on the website, strip procurement, admin, and quotation language; keep only the sharp, practical, evidence-backed parts.
