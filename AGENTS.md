# Agent notes

Static Astro site (no backend, no database). Production is a Cloudflare Worker serving static assets. `README.md` has the command reference; `docs/deployment.md` has full deploy setup.

## Checks and tooling

- Node.js >= 22.12.0 and the pnpm version pinned in `package.json` are required. Normal dev/build work needs no environment variables.
- `pnpm run check` should report zero errors and zero warnings (a few async-function hints remain).
- `pnpm run check:links` runs after a build and fails on broken internal links or redirect targets. `pnpm run check:freshness` exits 1 if any live course has no `updatedAt` or one older than 90 days.
- `pnpm run test:seo` needs a production build first: `SITE_URL=https://tinkercademy.com pnpm run build`. A default (staging) build correctly emits `Disallow: /`, which fails the production robots assertion.

## Checking the current design

- Build and render the site before making claims about its current fonts, casing, colours, animations or layout; check computed styles. Source files, historical screenshots, `docs/screenshots/live/`, `prompt-exports/`, leftover migration data and public asset files preserve the pre-rebuild Framer site and are not evidence of the current design.
- Current typography: IBM Plex Serif for headings, Rubik for body and UI, Fragment Mono for code accents, and a Lora ampersand subset.

## Legacy Framer data

- Programme authoring is Astro-first. Do not extend the Framer programme pipeline unless the user explicitly asks for migration work.
- `pnpm run import:live` and `pnpm run import:framer` are legacy migration utilities. `import:live` crawled the retired Framer site and now fails, and `build:crm` refuses to overwrite `src/data/` without Framer handover data. Do not work around this; edit the JSON in `src/data/pages/` directly.
- `import:framer` reads `FRAMER_API_KEY` and `FRAMER_PROJECT_URL` from git-ignored `.env.local` or `.env`. It backfills programme/tutorial metadata and the `platforms`, `domains`, `articles` and `external-logos` collections.
- Pages that still depend on imported Framer data: the homepage (live domains and platforms), `/professionals` (partner/client logo bands), and tutorial and article pages.

## Programme authoring

- One Markdown file per programme; the filename is the canonical slug.
- Frontmatter must use the stable taxonomy IDs from `src/data/pages/audiences.json`, `domains.json` and `platforms.json`.
- Taxonomy pills link into listing filters via `/courses-all?audience=<id>&domain=<id>&platform=<id>`; the same query works on `/courses-schools` and `/courses-professionals`.
- Homepage featuring comes from `homeFeaturedRank`; list ordering is `weight desc, title asc`.

## Deploy

- **Every push to `main` builds and uploads a new Worker version but does NOT serve it.** Live traffic moves only when a `v*` tag is pushed.
- When the user says "deploy", "ship it", "go live", "promote", "push to prod", "rollback" or similar, follow `.claude/skills/deploy/SKILL.md`. In short: tag the commit you want live and push the tag (`git tag vYYYY.MM.DD && git push origin vYYYY.MM.DD`). The Action waits for the Workers Builds upload of that commit, then runs `npx wrangler versions deploy <id>@100`.
- Rollback: tag an older known-good commit (it must already contain the promote workflow), or run `npx wrangler versions deploy <old-id>@100 --yes`.
- `wrangler.jsonc` pins the production account ID (`b8b1032c61d9475cd00229c74db7ec72`, Tinkertanker). The Action's `CLOUDFLARE_API_TOKEN` repo secret must be **user-scoped** (My Profile → API Tokens) with **Workers Builds Configuration: Edit** and **Workers Scripts: Edit**; account-owned tokens and the Edit Cloudflare Workers template are rejected or incomplete for the Builds API. Never put the token in the repo. Locally, if you can access multiple Cloudflare accounts, prefer an account-scoped token via `CLOUDFLARE_API_TOKEN`/`CLOUDFLARE_ACCOUNT_ID` over whichever OAuth context is active.
- "Build this" probably means `pnpm run build` locally or a `git push`, not a deploy.

## Shared shell parity

- When the user says to apply page A's design onto page B, page A is the canonical visual source. Do not change page A to match page B unless the user explicitly asks.
- In shared shell components (headers, footers, nav), use component-scoped wrappers, not generic utilities like `.shell` that page layouts also define, so all Astro page types render identically.
- Header and nav links use absolute site paths such as `/contact-us`, never relative ones.
- For parity fixes, verify both `pnpm run dev` and built output in a real browser on representative routes; check computed styles and layout metrics, not just screenshots.

## Hero and programme images

- Article/tutorial body illustrations (hand-drawn 16:9 explainers, xiaohei-style): use the `tkrobot-illustrations` skill in [tinkertanker/tkrobot-stickers](https://github.com/tinkertanker/tkrobot-stickers); sketch-mode T Krobot performs the concept. Save outputs with the consuming page's assets.
- Mascot banners (the preferred direction per `docs/banner-unification-review.md`): use the deterministic compositor described in `docs/banner-system.md`. Edit `src/data/banner-scenes.json` and run `node scripts/banner/generate-banners.mjs`. Do not use image generation for the mascot.
- `docs/hero-image-brief.md` is the superseded brief for AI-photo rounds. Read it only when generating photographic imagery; its "Confirmed prompt-time pitfalls" section (brand-name leaks, back-of-laptop framing, default tudung, composition uniformity) still applies. When the user rejects an image, check that section before re-rolling and add any new failure mode.

## Proposal drafting

- Use `docs/writing-style-guide.md` for tone, but keep proposals slightly more formal than the website.
- Lead with substance: what the programme is, who it is for, what participants will do, and why the format fits the audience.
- Prefer concrete outcomes, tools, constraints and delivery details over broad claims about innovation or transformation.
- Keep company boilerplate consistent, but tailor the overview, outcomes, curriculum shape and rationale to the client.
- Use proof points sparingly and specifically (relevant partners, prior programmes, comparable audiences); do not dump the full track record.
- When reusing proposal copy on the website, strip procurement, admin and quotation language.
