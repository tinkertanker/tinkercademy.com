# Medium Build Log migration

This directory is the reviewable source of truth for moving the public
Tinkercademy Build Log from Medium while preserving every story URL.

No committed configuration attaches `blog.tinkercademy.com` to the Worker.
`wrangler.blog-cutover.jsonc` records the approved end-state shape but must not
be deployed before an explicit cutover request.

## Current baseline

- 68 public stories and 36 exactly attributed authors.
- 397 body-image placements from 395 Medium image IDs.
- 394 physical local files because two source IDs resolve to identical bytes.
- 34 animated local assets; animation is preserved.
- 41 rich-media placements from 39 resources, represented by privacy-conscious
  typed fallback components: 23 YouTube, 9 GitHub Gist, 4 Giphy, 2 X/Twitter,
  and 1 Instagram resource.
- 319 body links. 23 links resolve to another migrated story, including one old
  Google-wrapped link that the earlier inventory did not classify.
- 68 story rights records remain `review-required`.
- 134 image placements have no usable source alt or caption and remain
  `review-required` for a meaningful-alt versus decorative decision.

“All rights reserved” is the chosen publication licence. It is not evidence
that Tinkertanker owns a contributor's copyright. The strict verifier blocks
cutover until the rights and accessibility holds are resolved.

## Artifacts

- `inventory.json`: public story metadata, dates, authors, tags, paragraphs,
  source hashes, links, image placements, and embed placements.
- `media-manifest.json`: source image IDs/URLs/dimensions, local paths, exact
  SHA-256 hashes, byte counts, animation/frame metadata, captions, source alt,
  and per-placement alt decisions.
- `embed-manifest.json`: allowlisted provider metadata and all placements.
- `src/data/blog-authors.json`: exact public Medium attribution records.
- `src/content/blog/medium/`: generated Markdown/MDX.
- `public/blog-media/`: locally stored source bytes, named by SHA-256.

The reviewed raw public JSON baseline is committed under
`scripts/_artifacts/medium/raw/`, so a fresh checkout can reproduce the import
without Medium access. It contains public story bodies and embed metadata but
is not a normal build input after import. Other `scripts/_artifacts/` outputs
remain ignored.

## Reproduce the inventory and import

Online inventory refresh uses public, unauthenticated endpoints and writes the
ignored cache. Medium may return a Cloudflare challenge; never work around that
with account cookies. Retain the reviewed public cache and run offline instead.

```sh
# Public refresh when Medium permits unauthenticated requests
pnpm run inventory:medium

# Deterministic cache-only inventory and import
pnpm run inventory:medium -- --offline
pnpm run import:medium -- --offline

# Exercise without rewriting committed outputs
pnpm run inventory:medium -- --offline --dry-run
pnpm run import:medium -- --offline --dry-run
```

The inventory command fails if the reviewed 68/397/395/41/39 baseline drifts
unless an operator deliberately supplies `--allow-count-change` and reviews the
new public records.

## Host-aware output

Astro builds blog pages into the private static namespace `dist/blog-content/`.
`worker.mjs` is the only host-routing boundary:

| Incoming blog URL | Worker asset/action |
|---|---|
| `/` | `/blog-content/` |
| `/<legacy-slug-and-Medium-ID>` | `/blog-content/<legacy>/` (200; browser URL unchanged) |
| `/<legacy>/` | 308 to the exact no-trailing-slash story URL |
| `/archive/<year>/` | `/blog-content/archive/<year>/` |
| `/feed` and `/feed/` | `/blog-content/feed.xml` |
| `/sitemap.xml` and `/sitemap/sitemap.xml` | `/blog-content/sitemap.xml` |
| `/robots.txt` | `/blog-content/robots.txt` |
| `/all?year=<year>` | 308 to `/archive/<year>/`, preserving other query fields |
| `/about`, `/followers`, `/tagged/*` | 308 to `/` |
| `/blog-media/*`, shared fonts/images/icons | existing static asset path |
| unknown nested path | 404 |

Requests to `tinkercademy.com/blog-content/*` return 404. The apex sitemap excludes
the private namespace. The two existing apex `/articles/...` pages and their
data path are unchanged.

## Verification gates

```sh
pnpm run test:medium
pnpm run check
SITE_URL=https://tinkercademy.com pnpm run build
pnpm run verify:medium -- --dist dist --allow-review-required
```

The temporary flag verifies the implementation while reporting the explicit
rights/alt holds. Before cutover, this must pass without the flag:

```sh
pnpm run verify:medium -- --dist dist
```

The verifier checks all story/media/embed counts, every local SHA-256, exact
author/canonical/source metadata, all internal rewrites, all built story files,
feed/sitemap counts, the apex sitemap boundary, rights notices, and absence of
remote Medium/Embedly assets, Google tracking redirects, or raw embed scripts.

## Cutover — not yet authorised

These are later operator steps, not actions performed by this implementation:

1. Complete the 68-story rights ledger and 134-image alt/decorative review.
2. Run the strict verifier without exceptions and browser-test representative
   image-heavy, GIF, code, and embed stories through `wrangler dev`.
3. Commit and push the reviewed implementation; promote its Worker version by
   the repository's normal `v*` tag workflow. Verify the apex is unchanged.
4. Capture the live Medium feed, sitemap, publication settings, and analytics
   baseline. Keep the Medium publication and stories intact.
5. In a user-operated Medium browser session, explicitly remove/disconnect the
   publication custom domain or obtain Medium Support's supported sequence. Do
   not share credentials, cookies, MFA codes, or session files.
6. In Cloudflare Workers → `tinkercademy-dot-com` → Settings → Domains & Routes,
   add the custom domain `blog.tinkercademy.com`. Resolve the existing Medium DNS
   record only as part of that approved operation. The desired two-domain
   configuration is recorded in `wrangler.blog-cutover.jsonc`.
7. Verify root, all 68 exact story URLs, trailing-slash normalization, archives,
   feed, both sitemap aliases, robots, assets, and unknown 404 behavior. Confirm
   query strings survive story requests and archive redirects.
8. Submit `https://blog.tinkercademy.com/sitemap.xml` and update owned links.
   Medium canonical changes, if desired, must be made by each story author only
   after the new URL returns 200.

Rollback during launch: remove the Worker custom-domain route and restore the
recorded Medium DNS/custom-domain state. Because Medium says re-verification can
take up to three days, also prepare a Cloudflare 302 fallback from
`blog.tinkercademy.com/<path>` to
`https://medium.com/tinkertanker/<path>` before cutover. Do not delete or edit
the Medium copies during the rollback window.
