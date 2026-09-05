---
name: new-programme
description: Create a new tinkercademy.com programme page end-to-end — frontmatter, body copy, a composed layered banner, and any missing platform entries. Use when the user says "new programme", "new course page", "add a course", "draft a programme", or similar. The skill quizzes the user for every required input before writing any files.
---

# New Programme Skill

Tinkercademy programme pages live at `src/content/programmes/<slug>.md`. The filename is the URL slug (`/programmes/<slug>/`). The frontmatter is validated by a Zod schema in `src/content.config.ts:12` — missing or unknown enum values will fail the build.

This skill walks the user through every field we've actually needed to author a page, creates its banner with the deterministic compositor, adds any missing platform entries to `src/data/pages/platforms.json`, and writes the file. It deliberately quizzes the user up front rather than inferring — so you always come back with a plan the user has signed off on before any files change.

## When to invoke

- "new programme", "new course page", "add a programme"
- "draft a course", "put up a new corporate training page"
- "make a programme for X"

Do **not** invoke for:
- Editing an existing programme — use plain edits.
- A one-off copy tweak on an already-drafted page.

## Preflight (before quizzing)

Run these checks in parallel and surface any failures before starting the quiz:

1. **Working directory is this repo.** `git rev-parse --show-toplevel` ends in `tinkercademy.com`.
2. **Banner tooling is ready.** Read `docs/banner-system.md`, confirm `src/data/banner-scenes.json` and `scripts/banner/generate-banners.mjs` exist, and run `pnpm run banners:check` to establish a clean baseline.
3. **Backdrop availability.** Prefer a real or already-approved course photograph. Only require `mmx` (`mmx auth status`) when the user needs a new photographic backdrop; the mascot and props must never be generated.
4. **Branch is clean-ish.** `git status --porcelain` — if there are unrelated WIP changes, flag them so the user knows this programme's commits will be isolated.

Do not start the quiz if preflight fails; fix or get user acknowledgment first.

## The Quiz

Ask these questions **in order**, in small batches (≈3 at a time), letting the user respond before the next batch. Every field maps to a concrete decision made previously when authoring the "Agentic Workflows for Businesses" programme — don't skip any unless the user explicitly says "use the default".

### Batch 1 — Identity and slug

1. **Title.** What's the programme called? Series membership is declared in `src/data/pages/programme-series.json` (AI Engineering: Vibe Coding → Prompting → Agentic Engineering). Parallel titles alone do not put a course in a series — Agentic Workflows for Businesses is a separate business track.
2. **Slug / filename.** Derive a kebab-case slug from the title and confirm. This becomes the URL (`/programmes/<slug>/`) and filename (`src/content/programmes/<slug>.md`).
3. **Subtitle.** For corporate/professional courses the default is `"Corporate training"`. For school programmes it's usually the domain/audience (e.g. `"For secondary schools"`). Confirm or override.

### Batch 2 — Format and logistics

4. **Duration** (shown as the `duration` frontmatter field and on the programme card). Typical values: `"1 day"`, `"2 days"`, `"1-2 days"`, `"6 sessions"`.
5. **Course date(s) / delivery.** Is there a fixed date (e.g. "4 May 2026"), a range, or "on request"? If there's also a flexible alternative format (e.g. "1-day session but 2-day extended available"), capture both — they go in the Details body.
6. **Location.** Typical: `"CT Hub, or on request."`, `"CT HUB 2, 114 Lavender Street."`, or `"Participant's premises (Singapore)."`.

### Batch 3 — Taxonomy (enum-backed)

Before asking, read the three JSON files so you can quote valid IDs verbatim:

```bash
cat src/data/pages/audiences.json  | python3 -c "import json,sys; [print(p['id'], '—', p['label']) for p in json.load(sys.stdin)]"
cat src/data/pages/domains.json    | python3 -c "import json,sys; [print(p['id'], '—', p['label']) for p in json.load(sys.stdin)]"
cat src/data/pages/platforms.json  | python3 -c "import json,sys; [print(p['id'], '—', p['label']) for p in json.load(sys.stdin)]"
```

7. **`audienceIds`.** From `src/data/pages/audiences.json`. Typical combos: `["public", "businesses"]` for professional courses; `["students", "teachers"]` for schools. Minimum one.
8. **`domainIds`.** From `src/data/pages/domains.json`. Usually one (e.g. `["ai"]`, `["webdev"]`). Minimum one.
9. **`platformIds`.** From `src/data/pages/platforms.json`. Minimum one. **If the user names a platform that isn't in the JSON, offer to add it** — see "Adding a missing platform" below. Single-platform courses (e.g. `["claude"]`) are fine.

### Batch 4 — Copy angle

10. **Course overview angle.** One or two paragraphs. Ask what the hook is — the "stop doing X, start doing Y" framing, or the problem the course solves. If it's a sequel to another Tinkercademy course, mention it in the opening line.
11. **Lesson outcomes.** 3–5 bullet points. Ask for:
    - The concrete deliverable each bullet represents (a built artefact, a deployed thing, a produced report).
    - Whether the outcomes should be **generic** (recommended — use phrases like "your company", "a finance system", "public statistical sources") or **customer-specific** (only if the page is explicitly for one organisation's internal use).
    - If generic: ask if Tinkercademy will supply the sample data / templates during the session (if yes, tag each bullet with "_(We'll supply …)_" so participants know the artefacts are provided).
12. **Prerequisites** (optional). E.g. "Participants should have completed _Vibe Coding for Digital Builders_ or have equivalent hands-on experience with generative AI tools." If this course stands alone, skip.
13. **Requirements** (bundled tools/accounts). The pattern is: "Participants will be provided with **[tool]** for the duration of the course." Ask what's bundled (e.g. "Claude Cowork (1 month)", "paid ChatGPT Business and Lovable plans", "Figma Professional"). Laptop boilerplate is standard.

### Batch 5 — Fees

14. **Fees.** Offer three options:
    - **(a) Direct input.** User gives each tier + flat fee directly.
    - **(b) Derive from another course.** Ask which course to base off, and the transform — e.g. "Vibe Coding ÷ 2 then minus $50" or "half of the 2-day price plus $50/pax for Claude".
    - **(c) Standard Tinkercademy professional tiers.** The current reference tiers (2026, 1-day, Claude-bundled):
      - 16+: \$430
      - 12–15: \$485
      - 8–11: \$550
      - 7 or fewer (flat): \$4,250
    Whatever the user picks, **compute the full table and sanity-check two things**:
    - **Tier cliffs** — at each boundary (8, 12, 16), does moving up a tier mean a lower _total_ than the previous tier's max? (Yes is the normal topology — same as every other programme.)
    - **7→8 transition** — `7_or_fewer_flat` should be **slightly below** `8 × tier_8_11`. If not, warn the user: a group of 8 would pay _less_ than a group of 7, which is the opposite of how the flat fee is usually meant to work. Suggest a flat fee ≈ `(8 × tier_8_11) − ~$100` to restore the conventional relationship.
    Always quote prices in SGD, exclusive of GST. The fee block also ends with "Invoicing terms available."

### Batch 6 — Banner direction

15. **Scene story.** Ask which one or two concrete objects best identify the work participants will do. Follow `docs/banner-system.md`: schools/community use the full T Krobot plus a screen and meaningful props; professional/public courses use task-specific accessories with the independent Tinkertanker stamp and no full mascot.
16. **Photographic backdrop.** Ask whether an approved source photograph already exists. If not, ask for a short brief and generate backdrop candidates with:
    ```bash
    mmx image generate \
      --prompt "<brief>" \
      --aspect-ratio 3:2 \
      --n 2 \
      --out-dir public/images \
      --out-prefix <slug>-hero
    ```
    Inspect both candidates, recommend the one with less fake text and a clear environment, and let the user override. Trash the rejected candidate with `trash` (not `rm`). The chosen image remains a source input referenced by `photo.src`; it is not used directly as `heroImage`.
17. **Compose the banner.** Add a scene whose `id` exactly matches the programme slug to `src/data/banner-scenes.json`. Use the chosen photograph as `photo.src`, follow the audience register and prop grammar in `docs/banner-system.md`, then set frontmatter to `heroImage: "/images/banners/<slug>.webp"`. Do not add `heroObjectPosition` for a composed banner. Run `pnpm run banners:generate` and inspect the generated composite before proceeding.

### Batch 7 — Positioning (optional)

18. **`weight`** (default `99` — alongside everything else). To guarantee this programme sorts **first** in any listing, use **200** (current max across all programme files is 100). Tell the user this is the knob for "make this stand out in the full programme list".
19. **`homeFeaturedRank`** (optional, 1+). Adding this makes the card appear in the Popular Courses rail on the homepage. Lower number = earlier; the current range in use is 3–7 for the normal rail, so 1–2 are "jump the queue" slots. Skip if the user doesn't want home-page placement.
20. **SEO overrides.** By convention `seoTitle` follows `"<Programme> - Tinkercademy: Coding and Making for Schools and Professionals"`. `seoDescription` is optional — if omitted, the programme page derives from `cardBlurb`.

### Batch 8 — CTA

21. **Sign-up CTA.** Defaults are `signUpLabel: "Enquire now"` and `signUpUrl: "https://form.jotform.com/232050520776450"` (the generic enquiry Jotform). Override only if there's a dedicated form for this course.

## Adding a missing platform

If a platform the user named isn't in `src/data/pages/platforms.json`, append an entry (keep alphabetical order by `id`):

```json
{
  "id": "<kebab-id>",
  "label": "<Display Name>",
  "icon": "/images/SCbZqPZak9L4pDz7y9XT1mDI.svg",
  "domain_ids": ["ai"],
  "content_html": null,
  "content_text": ""
}
```

Notes:
- `icon` — reuse the generic `/images/SCbZqPZak9L4pDz7y9XT1mDI.svg` placeholder if we don't have a proper logo asset yet. Flag that a real logo should be sourced later.
- `domain_ids` — at least one, from `src/data/pages/domains.json`.
- Do not add a `source_id` (that's a Framer-export field for legacy entries only).
- The Zod enum in `src/content.config.ts:10` is derived from this JSON at build time, so the platform is immediately usable in `platformIds`.

Commit the platform addition as its **own** commit — it's a data change that's reusable by other future programmes. Don't bundle it into the programme commit.

## Writing the programme file

Body-copy conventions (match existing programmes — this is a Framer-migrated codebase):

- Paragraphs use `<p dir="auto">…</p>`.
- Lists use `<ul dir="auto">` with each item as `<li data-preset-tag="p"><p>…</p></li>`. Keep the `data-preset-tag="p"` attribute.
- Three H2 sections, in order: **Course Overview**, **Lesson Outcomes**, **Details**.
- The Details block is a single `<p>` chain, not sub-headers — each line is `<strong>Dates and Times</strong>: …`, `<strong>Location</strong>: …`, etc.
- British spelling everywhere (`organisation`, `recognise`, `visualisation`).
- Currency: always `$` with SGD numbers; include the line `"All quoted prices are in SGD. Invoicing terms available."` after the fee block.
- Keep `cardBlurb` truncated with a trailing `…` — it's displayed in list cards with a max length around 140 chars.

Frontmatter field order (match convention):

```yaml
---
title: "…"
subtitle: "…"
duration: "…"
heroImage: "/images/banners/<slug>.webp"
audienceIds: […]
domainIds: […]
platformIds: […]
cardBlurb: "…"
weight: 99
homeFeaturedRank: 1           # optional
signUpLabel: "Enquire now"
signUpUrl: "https://form.jotform.com/232050520776450"
seoTitle: "…"                 # optional
seoDescription: "…"           # optional
---
```

**Do not add a `draft` field.** It's not in the Zod schema and not filtered on — it has no effect. If the user wants to hide a programme, use a different mechanism (ask first).

## After writing

1. **Verify generated banner coverage.** Run `pnpm run banners:check`. It must reproduce all banner files and the complete manifest, and it rejects any programme whose `heroImage` is not manifest-backed.
2. **Run repository checks.** Run `pnpm run check` and `pnpm run build`.
3. **Preview locally.** If the dev server is already running on `:4321`, verify:
   ```bash
   curl -sI http://localhost:4321/programmes/<slug>/ | head -1
   ```
   Should be `200`. If it's `404`, double-check the filename (slug) and the trailing slash (`astro.config.mjs` has `trailingSlash: 'always'`).
   Inspect the rendered route at desktop and mobile widths. Check title/art clearance, scrim readability, full-bleed background, foreground and stamp placement, and card usage of the flat composite.
4. **Commit atomically**, per the repo's commit policy. A normal new programme is two commits:
   - `feat(platforms): add <Platform>` (only if you added a new platform entry)
   - `feat(programmes): add <Programme Title>` — includes the Markdown, scene JSON, generated banner triplet, manifest, and any new backdrop or locked prop
   Use `-- <path>…` to scope commits to only the touched files.
5. Don't push or deploy unless the user asks. "New programme" requests usually end with the user wanting to review locally first.

## Things NOT to do

- **Don't invent audience/domain/platform IDs.** Only use values from the three JSON files. Unknown enum values fail the build.
- **Don't point `heroImage` directly at the backdrop.** It must use `/images/banners/<slug>.webp`; the backdrop belongs in the scene's `photo.src`.
- **Don't reuse another programme's backdrop** unless the user explicitly asks. Generate a fresh one when no approved photograph exists.
- **Don't forget the trailing slash** when quoting a preview URL. Astro dev server 404s without it.
- **Don't auto-deploy.** The `deploy` skill is a separate, user-triggered step.
- **Don't commit the generated `_001.jpg` / `_002.jpg` candidate you rejected.** Trash it first.
- **Don't put customer-specific names** (e.g. "IMDA", "SingStat", "SharePoint", specific filenames) in the lesson outcomes unless the user explicitly wants a customer-specific page. Default to generic framing ("your company", "a finance system", "public statistical sources") and have Tinkercademy supply the sample data.
- **Don't touch `src/data/crm/*` or `src/data/pages/assets.json`.** Those are Framer-export snapshots and are not the source of truth for programme rendering.
