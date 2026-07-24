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
- **Duplicate programme descriptions, #7 (`8358b57`).** All 29 programme
  markdowns had an identical generic `seoDescription`. Stripped the dead
  field; each programme now derives its meta description from its unique
  `cardBlurb`. 28/29 programme pages now emit a unique description (see
  known issue below).
- **Social meta + favicons, #6 + #8 (`dcd6f51`).** Added `og:type`,
  `og:site_name`, `og:url`, and `twitter:card/title/description/image`
  to `ContentLayout`; editorial templates (`articles/[slug]`,
  `tutorials/[slug]`) pass `ogType="article"`. Wired up `/favicon.svg` +
  `/favicon.ico` alongside the existing PNG (kept as apple-touch-icon).
  Set a default `openGraph.image` in `site-settings.json` so pages
  without a per-page image still emit an `og:image`. Added a canonical
  to `articles/index` so its `og:image` resolves to the production origin.

## Cutover checklist

Moved to [`docs/deployment.md`](./deployment.md) now that production goes
to Cloudflare Pages while staging stays on GitHub Pages. No code changes
needed at cutover — the only variable is the Cloudflare Pages
`SITE_URL` env var, which is set once in the dashboard.

## Known content issues (not code)

- [ ] **Two programmes share an identical `cardBlurb`**:
      `code-for-fun-ai-workshop.md` and `code-for-fun-baseline-workshop.md`
      both open with "Our CFF 2025 Scheme of Work…". That collapses to the
      same meta description on both pages (the only duplicate left after
      #7). Needs an author pass to give one of them a distinct intro.
- [ ] **Dangling tutorial**: `/tutorials/micropythoncomponents` has no
      hero image, is not in the live sitemap, and isn't linked from any
      index page we generate. Confirm whether it's intentional content or
      a stray import artefact.
- [ ] **Programme `seoTitle` carries the site tagline on every page**
      (e.g. "Mastering the Web: Understand Full-Stack Development -
      Tinkercademy: Coding and Making for Schools and Professionals"),
      which is long and mostly boilerplate. Consider whether the
      programme page `<title>` should be just the programme name.

## Tooling notes

- `docs/screenshots/live/mobile/*.png` is the last committed snapshot of
  the pre-rebuild Framer sitemap. It is a historical archive, not a
  current baseline; do not regenerate it in place.
