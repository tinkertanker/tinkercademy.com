---
name: writing-style-review
description: Review and evolve Tinkercademy's website writing style. Use when asked to audit the copy, produce a new version of the style guide, add voice rules, or evaluate a piece of web copy against house voice. Also use when a request says "does this sound like Tinkercademy?" or "is this on-brand?".
---

# Writing-Style Review Skill

Operational guide for doing (or redoing) a writing-style pass for the Tinkercademy website. Self-contained enough that a future agent or human can rerun the review with confidence.

## What this skill is for

- Auditing Tinkercademy's website copy against the actual house voice.
- Producing or updating the style-guide deliverables under `docs/`.
- Spot-checking a specific page or paragraph: does this sound like Tinkercademy?
- Detecting and flagging new boilerplate / LLM-rewrite drift in the proposal corpus before it reaches the website.

## Deliverables (canonical set under `docs/`)

Every full review should produce, keep, or update:

1. `docs/writing-style-guide.md` — the current source of truth for house voice.
2. `docs/writing-style-templates.md` — reusable templates for homepage, programme blurbs, team bios, proposal overviews.

If you're doing a fresh review, it's fine to rewrite `writing-style-guide.md` in place. Previous versions live in git history. If the review is substantial enough to warrant side-by-side comparison, draft to a scratch file first and swap after review.

## Inputs you must read directly

Always read from source, not via the existing guide.

### Local files (authoritative for institutional and bio voice)
- `src/data/team.yaml` — 8 bios. The gold standard for Voice B.
- `docs/writing-style-guide.md` — current guide (skim, don't copy).
- `docs/writing-style-templates.md` — template exemplars. Cross-check any new guidance against these.

### Live web (for institutional voice and drift-checking)
Use `WebFetch`:
- `https://tinkercademy.com/about-us` — the primary institutional page. Check for boilerplate leakage.
- `https://yjsoon.com/` — YJ's blog index; pick 4–6 recent posts spanning topics. Voice-transplant source.
- `https://yjsoon.com/about/` — personal about page; context for YJ's register.

Sample yjsoon.com posts across: recent + older, technical + reflective. Aim for spread, not volume.

### Google Drive (for proposal voice)

The `TT quotes and proposals` shared drive (driveId `0AA8LxrLEtT54Uk9PVA`). Top-level folders:

- `Proposals` (id `1tUGatNlkvScX04qvyUxUd7kcO0mCMoVM`) — primary source. Organised by topic, not year. Subfolders include: App Development, Artificial Intelligence & Data Science, Cybersecurity, Digital Literacy, Digital Making, Game Development, Robotics & Drones, Specialized Programs & Workshops, Vibe Coding, Web Development.
- `Archive` (id `1cmCN_L8aDHkF5j7KaLwkjLh1SNYUlajB`) — older material. Useful for before/after voice comparisons (2016–2022). Dip in rather than systematically read.
- `Templates` (id `13oy5eRGpMvxXPgYuuvz0g-0MMJ4yC6fw`) — contains the canonical boilerplate and track-record docs. **Read these explicitly to identify what NOT to import to the website.** Key files: `Tinkercademy Instructor Profiles (updated …)` and `Track Record for Tinkercademy Pri and Sec School Programmes`.
- `LLM-assisted Content Templates` (id `1RZTWqp2muF8dLDF82Mnq4dOF1Ap977gw`) — usually skippable; meta/workflow.

## Google Drive setup (`gws`)

### Binary and auth

```bash
# Canonical path on this machine (may change across fnm_multishells versions —
# if missing, search: `ls ~/.local/state/fnm_multishells/*/bin/gws`)
export GWS="/Users/yingjie/.local/state/fnm_multishells/28844_1776857274958/bin/gws"

# Always unset the broken credentials-file env var — keyring-backed auth works.
unset GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE
```

If the path above is stale, `find ~/.local/state/fnm_multishells -name gws -type f` locates it.

### Commands you will actually use

List a folder:

```bash
"$GWS" drive files list --params '{
  "q":"\"FOLDER_ID\" in parents and trashed = false",
  "fields":"files(id,name,mimeType,modifiedTime)",
  "pageSize":200,
  "includeItemsFromAllDrives":true,
  "supportsAllDrives":true,
  "corpora":"drive",
  "driveId":"0AA8LxrLEtT54Uk9PVA",
  "orderBy":"modifiedTime desc"
}'
```

Export a Google Doc as plain text (what you want for prose analysis):

```bash
"$GWS" drive files export --params '{
  "fileId":"FILE_ID",
  "mimeType":"text/plain"
}' -o /tmp/prop_<shortname>.txt
```

For `.docx` / PDFs in the corpus, use `get` with `alt=media`:

```bash
"$GWS" drive files get --params '{
  "fileId":"FILE_ID",
  "alt":"media",
  "supportsAllDrives":true
}' -o /tmp/<name>.docx
```

Prefer Google Docs (most proposals are Docs). Export as text strips the formatting noise.

## Sampling strategy

Aim for 8–12 proposal documents spread across:

- **Time**: at least one each from ≥2026, 2025, 2024, 2023, 2018–2022 (archive).
- **Audience**: at least one each from secondary school, primary school, teacher training, corporate/adult, government, overseas.
- **Topic**: mix Vibe Coding, AI/ML, Digital Literacy, Digital Making/micro:bit, App Dev, Teacher Training.

Don't read every doc in a subfolder. Skim filenames, pick 1–2 representatives per category. Log which ones you sampled in the critique, so the next reviewer can compare.

### A known-good starter set (use these if time is tight)

From the Proposals folder:

- Vibe Coding — Riverside Secondary (id `1WDUnEANu5o_cm_YArC4Fqyvm6-J-GtSxCUFg6Kq0bH8`, Oct 2025). Best-in-class course-description voice.
- Vibe Coding — Chung Cheng High Main (id `11oI6hhcWycmfguc7GIEe0IHk7_ExuyJNTgcsCoQcYpw`, Sep 2025). Same pattern, second example.
- Digital Literacy — Cedar Girls (id `1KNDJNeuH9Q6PKtTE-_tAJfXVARXTobKsh6arVzrg5HQ`, Oct 2025). School digital-literacy voice.
- AI Corporate — Sojitz Asia Knowledge-Powered AI (id `1LxijT3xZunhUZSca6w7upy6sVgHd5rzCHXHt6FhhEv8`, Aug 2025). Corporate register.
- AI Corporate — IMDA Knowledge-Powered AI (id `19Xb07x1cigOgyL9yi-JClRHneasPp8OnrUhps8pe4FQ`, Aug 2025). Government register; compare to Sojitz.
- AI Corporate — DGPC 5-day (id `1LOjdC7ZgEo-AcylHhK6jz5WUw026FC6miWTxwfQEAvU`, Apr 2026). Newest corporate.
- Long-term school — Pathlight 30-week (id `1GQNrEZf3BsZk0JZ7XaMFU1JSrJiF-WOLpe0c-XOgOvI`, Mar 2026). Long-form programme.
- Primary school — Yangzheng STEM (id `1ME4er5TUFDFd5j2NB_EcxAx1y0Y42bCsBbLNknnCL-o`, Nov 2025). Primary register + sustainability theme.
- ALP — Dunman 2026 (id `1_vLxG031Pz_yQpw6HEaPFf7aCyzFfBd6YVMqk01Y9jY`, Mar 2026). **Contains the newest "LLM-rewrite drift" to flag.**
- Excel/adult — NIE PESS Excel (id `1FkI3eVhr1rO1D7a-BBFZYpRA8Ls6Ahl3Ht8TKHvAc5o`, Aug 2025). Unlikely-to-be-flashy topic; check register.
- Teacher training — Bedok Green Sphero (id `19VfOUS78uZMxxdap2z3BSGiAxIxUgxvcmQV_gEiSKO4`, Jan 2023). Pre-AI-era baseline.
- Archive — EDB 2016 (id `1-hcnRCEbnNIioXA_f3_NC5LtCAjjULgBdRHBMqDld_Y`). Oldest tone comparison.

From Templates: `Track Record for Tinkercademy Pri and Sec School Programmes` (id `1aDZHwBVAASrJzra5gR--VdTSkXxtbnS5bBquf6EVHlg`).

## What to look for

### The three voices test

Every paragraph in the source material should be classifiable as one of:

1. **Voice A (institutional website)** — first-person plural "we", concrete anchors, no mission cadence.
2. **Voice B (team bio)** — third-person, appositive credential, ongoing-verb humanising line.
3. **Voice C (proposal course-blurb)** — context → what-it-is → what-participants-do → outcomes.

Anything else is one of:

- **Vendor boilerplate** — the "Tinkercademy is the education programmes brand of…", "Our core strengths are…", "Our vision is that everyone should be empowered…". Quarantine, don't promote.
- **LLM-rewrite drift** — "where pedagogical expertise meets real-world engineering", "tried-and-tested curriculum", "deliberate hybrid", "empower everyone to innovate", "proud pioneers". Reject.
- **Blog voice** (YJ's personal) — first-person "I", nested em-dashes, scripted dialogue, emoji, "anyway,", "send help please", "skibidi". Don't copy to the website.

### Red flags to catch

- Adjective piles without named facts: "unparalleled", "world-class", "dedicated", "passionate".
- Mission/vision cadence: "Our vision is…", "To that end, our mission is…".
- "Empower" as a verb meaning "enable/let/help".
- More than one dry/witty line in a paragraph-sized block (stacking = blog drift).
- "Journey", "unlock", "leverage", "seamless", "holistic", "cutting-edge", "future-ready".
- Superlatives without specificity: "the best", "leading", "trusted".

### Green flags to preserve

- Tool density ("micro:bit, iOS, Python, Arduino, Node, cyber-security, Unity…").
- Appositive credentials ("Stanford EE grad, former CS106 section leader…").
- Deflation modifiers ("from a lifetime ago", "random things", "no reason", "grudgingly").
- Named clients/partners (MOE, IMDA, Apple, Microsoft, Unity, Figma, specific schools).
- "Coders and tinkerers", "teach coding and making", "build the apps and kits we teach with".

## Workflow suggestion (in order)

1. **Read the brief and the existing guide** (don't start editing; form a position first).
2. **Fetch the three canonical web pages.**
3. **Sample 4–6 yjsoon.com posts** across topics/eras.
4. **Sample 8–12 proposals** from Google Drive using `gws`. Log which ones.
5. **Read 1–2 files from `Templates` folder.** Identify the boilerplate blocks. These are the NOT-voice.
6. **Form a position before editing.** Jot notes or a scratch critique — what does the current guide get wrong, what evidence proves it, what must change. Don't start rewriting until you can state the thesis in one paragraph.
7. **Rewrite the guide** (`writing-style-guide.md`). Keep anything that still holds; replace anything that fresh evidence contradicts. Quote real source lines inline as good/bad exemplars.
8. **Update the templates** (`writing-style-templates.md`). Every template should reference a real example from the source pool.
9. **Skill file last.** Update this file with anything you learned that future-you would want to know.

## Output quality bar

- Specific. Every style claim cites a source line.
- Opinionated. "Don't use X" beats "consider avoiding X".
- British spelling throughout (`programme`, `organisation`, `customise`, `analyse`).
- Name real lines you want to deprecate and real lines you want to promote.
- Don't invent examples. Adapt real ones. Attribute them.

## Avoid

- Generic brand-voice advice ("be authentic", "be human").
- Flattening into bland SaaS-y copy advice.
- Treating the proposal boilerplate as "proposal voice" — it's vendor boilerplate, a separate quarantine category.
- Treating YJ's blog cadence as a dial you can "turn down". Either a specific device transfers or it doesn't; list which.

## Maintenance

After any new significant client category gets added (e.g. a new overseas programme, a new sector), sample 1–2 proposals from it and check whether Voice C holds or whether a new voice has emerged. Log new boilerplate patterns in the guide's quarantine list as they appear — the LLM-rewrite pattern in Dunman ALP 2026 is the first known instance of a new drift category; watch for more.

When updating the website, reconcile against `writing-style-guide.md` and deprecate any phrases in its quarantine list.
