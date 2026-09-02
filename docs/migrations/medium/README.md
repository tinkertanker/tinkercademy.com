# Medium Build Log migration

This directory is the reviewable source of truth for moving the public
Tinkercademy Build Log from Medium to `tinkercademy.com/blog/`, with a permanent
redirect from every historical story URL.

`wrangler.jsonc` records the approved end state: the same production Worker owns
both `tinkercademy.com` and `blog.tinkercademy.com`. Cloudflare treats routes and
domains as triggers, so the normal `wrangler versions upload` and
`wrangler versions deploy` flow does not attach the legacy hostname. That
separate trigger change is the final, independently reversible cutover step.

## Current baseline

- 72 public stories and 40 exactly attributed authors.
- 415 body-image placements from 413 Medium image IDs.
- 412 physical local files because two source IDs resolve to identical bytes.
- 34 animated local assets; animation is preserved.
- 42 rich-media placements from 40 resources, represented by privacy-conscious
  typed fallback components: 24 YouTube, 9 GitHub Gist, 4 Giphy, 2 X/Twitter,
  and 1 Instagram resource.
- 320 body links. 23 links resolve to another migrated story, including one old
  Google-wrapped link that the earlier inventory did not classify.
- All 72 story rights records are reviewed: 18 stories credited to the
  Tinkercademy publication account are `organisation-owned`; 54 externally
  credited stories are `permission-recorded`, with original article URLs in
  the evidence records.
- 152 image placements have been visually reviewed in story context: 145 are
  meaningful and have authored alt text; 7 are explicitly decorative. This
  includes all 18 images in the four RSS-sourced stories, not only the four that
  lacked usable captions.

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
- `src/data/blog-legacy-redirects.json`: the generated one-to-one mapping from
  all 72 historical Medium paths to their apex year-and-slug destinations.
- `review-decisions.json`: human rights and image accessibility decisions,
  evidence references, reviewer names, timestamps, credits, and internal notes.
- `src/data/blog-authors.json`: exact public Medium attribution records.
- `src/content/blog/medium/`: generated Markdown/MDX.
- `public/blog-media/`: locally stored source bytes, named by SHA-256.

The reviewed public source baseline is committed under
`scripts/_artifacts/medium/raw/`, so a fresh checkout can reproduce the import
without Medium access. It contains public Medium JSON for the original 68
stories, embed metadata, and the exact public publication RSS response used for
the four newer stories. RSS source overrides (including the user-confirmed
Claire Phay attribution, her editorial title and brand-casing corrections, and
the original 2024 date of Marcuschen's story) are audited in
`rss-source-overrides.json`. Chavonz's August 2025 and Tan Boon Leong's April
2025 fallback dates retain month precision in the content schema and visible
date labels; the first UTC day is used internally for deterministic sorting and
feed compatibility. These caches are not normal build inputs after import.
Other `scripts/_artifacts/` outputs remain ignored.

## Reproduce the inventory and import

Online inventory refresh fetches the public, unauthenticated publication RSS,
caches it, and discovers stories not already present in the inventory. Existing
public JSON snapshots remain the higher-fidelity source for the original 68
stories. Medium's JSON endpoint may return a Cloudflare challenge; never work
around that with account cookies. Retain the reviewed public cache and run
offline instead.

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

The inventory command fails if the reviewed 72/415/413/42/40 baseline drifts
unless an operator deliberately supplies `--allow-count-change` and reviews the
new public records.

## Complete the private release review

Do not edit generated story Markdown or `media-manifest.json` to clear a hold;
the next import overwrites them. Use the repository-local review application:

```sh
pnpm run review:medium
```

It serves a private review UI (port 4174 by default) for all 72 story rights
records and 415 image placements, defaulting to unresolved images. It
shows local thumbnails, source captions and alt, nearby story text, exact
attribution, and original Medium links. Completed decisions require a reviewer
name; rights decisions require an evidence reference. Bulk-by-author and
identical-image actions are available, but should be used only when the same
evidence or contextual description genuinely applies.

**Rights statuses:**

- `organisation-owned`: use only when supporting records establish ownership.
- `permission-recorded`: use when the contributor retains copyright and
  republication permission is documented.
- `author-owned`: use only when the credited author is personally recording
  their approval for publication.
- `review-required`: keep this status when ownership or permission is uncertain.

“All rights reserved” is not evidence for any of these choices. Do not paste
credentials, cookies, or unnecessary personal data into the evidence field;
store a concise reference to the appropriate internal record.

For each unresolved image, choose `meaningful` and write context-appropriate
alt text, or choose `decorative` when surrounding text conveys everything the
image contributes. Add a visible credit where needed. Saving writes only
`review-decisions.json`; it does not contact or change Medium or production.
After saving, regenerate and verify the imported output:

```sh
pnpm run import:medium -- --offline
SITE_URL=https://tinkercademy.com pnpm run build
pnpm run verify:medium -- --dist dist --allow-review-required
```

Leave the temporary verifier flag in place until all legitimate holds are
resolved. The strict command without that flag remains the cutover gate.

## Routes and permanent legacy redirects

Astro builds the canonical publication directly under `dist/blog/`:

| Canonical URL | Output |
|---|---|
| `/blog/` | complete story grid and year selector |
| `/blog/<year>/<clean-slug>/` | story page |
| `/blog/archive/<year>/` | year archive |
| `/blog/feed.xml` | latest 20 stories |
| `/blog/sitemap.xml` | publication root, archives, and all stories |

The story slug is generated from the reviewed headline on first inventory and
then persisted. A later headline edit does not silently change the permalink.
The publication year and clean slug are collision-checked across all 72 stories.
Medium IDs remain in provenance and `legacyPath`, not in canonical URLs.

`worker.mjs` uses `src/data/blog-legacy-redirects.json` when the old host is
eventually attached. Both trailing-slash forms of every exact historical story
path receive a 308 to the same apex canonical URL, preserving query strings.
Legacy root, archive, feed, sitemap, robots, and asset URLs also redirect to
their apex equivalents. Unknown legacy paths and unknown `/blog/` paths return
the Build Log 404. Requests to the retired `/blog-content/*` implementation
namespace return 404.

The dedicated blog sitemap owns `/blog/` URLs, so the general Astro sitemap
excludes that subtree and root `robots.txt` advertises both sitemap files. The
two existing apex `/articles/...` pages and their data path are unchanged.

## Verification gates

```sh
pnpm run test:medium
pnpm run check
SITE_URL=https://tinkercademy.com pnpm run build
pnpm run verify:medium -- --dist dist
```

This strict cutover gate passes without a review exception. The verifier checks
all story/media/embed counts, every local SHA-256, exact
author/canonical/source metadata, all internal rewrites, all built story files,
all 72 generated legacy redirects, feed/sitemap counts, the sitemap ownership
boundary, rights notices, and absence of remote Medium/Embedly assets, Google
tracking redirects, or raw embed scripts.

## Production cutover

The code release and hostname move are deliberately separate. The complete,
operator-ready sequence and rollback fields live in
[`docs/deployment.md`](../../deployment.md#build-log-hostname-cutover). In
summary:

1. Confirm the reviewed 72-story rights ledger and 152-image accessibility
   decisions still have no holds. Run the strict verifier without exceptions.
2. Before promotion, snapshot the complete active Worker deployment and prior
   rollback version, all zone routes/domains and apex mappings, the full mutable
   `blog` DNS payload, certificate/CAA state, and Medium custom-domain state.
   Keep that rollback snapshot immutable. Track the intended baseline,
   promoted, bridged, CNAME-removed, Custom-Domain-ready, and final states in a
   separate expected-state ledger and action/result journal; stop on every
   undeclared delta.
3. Push the reviewed implementation and wait for its upload-only Workers Build.
   Promote only that exact version with the normal `v*` tag workflow.
4. Before changing the legacy hostname, run
   `pnpm run smoke:blog -- --apex-only` to verify the canonical `/blog/`
   homepage, all 72 stories, all 412 local files and hashes, archives, feed, and
   sitemap. Also check the two unchanged `/articles/` pages on production.
5. Leave the proxied Medium CNAME untouched and add the exact temporary Worker
   Route `blog.tinkercademy.com/*`. Run the complete `pnpm run smoke:blog` gate;
   failure removes only that route and returns traffic to Medium.
6. Require the ledger's promoted-plus-bridge state, delete only the recorded
   CNAME, verify that this is the sole delta, and attach the final
   `blog.tinkercademy.com` Custom Domain while keeping the route. Require the
   exact domain-to-Worker mapping, generated DNS, public resolution, active
   certificate, valid HTTPS, and HTTP upgrade before continuing.
7. Delete only the temporary route and rerun the complete smoke gate. This
   post-route pass proves the Custom Domain rather than the bridge.
8. Submit `https://tinkercademy.com/blog/sitemap.xml` in Search Console and
   review Cloudflare request errors, redirect status, analytics, and 404s.

Rollback is state-aware: remove only recorded route/domain IDs, inspect generated
DNS cleanup, recreate the full original CNAME payload, and verify Medium before
removing a bridge route. The generated Advanced Certificate is separate deferred
cleanup. Roll back apex code independently by promoting the snapshotted prior
Worker deployment.

Keep Medium intact but disconnected for 30–90 days. Export the publication and
record its administrators before eventual closure. Closing Medium may make the
visible `medium.com/tinkertanker/...` source links unavailable, so decide whether
to preserve them as historical destinations or supplement them with archived
references before deleting the publication or account.
