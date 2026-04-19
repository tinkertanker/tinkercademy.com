# Pre-launch follow-ups

Audit of the Astro rebuild against the live `tinkercademy.com/sitemap.xml`
and the built `dist/` output, run on the `claude/pre-launch-qa-check-hGQ9s`
branch. This file tracks what was fixed and what still needs attention
before (and during) go-live.

## Parity with the live sitemap

Live sitemap has 65 URLs (13 static + 29 programmes + 23 tutorials). All 65
are present locally. Extras vs. live that should be confirmed before launch:

- `/tutorials/micropythoncomponents` — local only. Keep or delete?
- `/articles/`, `/articles/create-a-landing-page-that-performs-great`,
  `/articles/space-launch-system-strategies-corporate-learning` — local
  only. New content, or should they be hidden?
- `/courses` — local meta-refresh redirect to `/courses-all`. Excluded from
  sitemap; fine.

## Fixed on this branch

- **Programme image paths (`a424f9a`).** 29 programme markdowns referenced
  `/images/remote/…`, but `0393adf` had already flattened those into
  `/images/`. Every programme page was serving a 404 for its hero and for
  its `og:image`. Rewrote 31 refs in 29 files.
- **Sitemap + robots (`3e51d4f`).** Added `@astrojs/sitemap` (filtering out
  the `/courses` redirect) and a build-time `src/pages/robots.txt.ts` that
  derives the `Sitemap:` URL from `astro.config.site`.
- **Absolute `og:image` + staging not indexed (`1feabcb`).**
  `ContentLayout.astro` now resolves relative images against the canonical
  URL before emitting `og:image`. `robots.txt` emits `Disallow: /` on any
  non-production host (anything that isn't `tinkercademy.com` /
  `www.tinkercademy.com`).
- **Broken Rubik 300 `@font-face` (`fd28d6f`).** Pointed at a woff2 that
  wasn't shipped; nothing in the site actually requests Rubik 300. Removed
  the face; build now has zero warnings.

## Cutover checklist (must do at go-live)

- [ ] Flip `astro.config.mjs` `site:` from
      `https://webstaging.tinkercademy.com` to `https://tinkercademy.com`.
      This single change causes `sitemap-index.xml`, `sitemap-0.xml`, and
      `robots.txt` to switch to the production origin automatically
      (robots.txt also flips from `Disallow: /` to `Allow: /`).
- [ ] Update `public/CNAME` from `webstaging.tinkercademy.com` to
      `tinkercademy.com` (or `www.tinkercademy.com`).
- [ ] After DNS cutover, submit the new `https://tinkercademy.com/sitemap-index.xml`
      to Google Search Console and Bing Webmaster.

## Remaining polish items (from audit)

Numbered to match the original report.

- [ ] **#6 Missing social meta.** No `og:type`, no `og:url`, no
      `twitter:card` / `twitter:image`. Preview cards on X/Twitter will be
      plain links rather than rich cards.
- [ ] **#7 Duplicate descriptions.** Programme and tutorial pages whose
      `seoDescription` / `cardBlurb` is missing fall through to the
      site-level default description. Produces many pages with identical
      meta descriptions. Worth a pass over the content to give each page a
      unique description.
- [ ] **#8 Unused favicons.** `public/favicon.svg` and `public/favicon.ico`
      are shipped but never linked. Layout only references
      `/images/logos/favicon.png`. Add the SVG + ICO links for broader
      client support.
- [ ] **Pages with no `og:image` at all.** `/articles/` index,
      `/tutorials/micropythoncomponents`, and `/courses` (redirect, noindex)
      emit no `og:image`. Could supply a site-level default from
      `site-settings.json` → `default_seo.openGraph.image`, which is
      currently `null`.

## Tooling notes

- `docs/screenshots/live/mobile/*.png` is our last committed snapshot of
  the live sitemap. `capture-mobile-screenshots.spec.js` regenerates them
  from `tinkercademy.com/sitemap.xml` via Playwright.
- `public/sites/nYHde9VjOGeoz41IditJr/…mjs` (rehosted Framer microsite
  bundle) still references `/fonts/s/rubik/v30/…WYi1VU80V4bVkA.woff2` —
  the file is present and this JS is not loaded by any Astro page, so
  it's benign. Worth a cleanup pass if the rehosted microsites are fully
  retired.
