# Tinkercademy Hero Image Brief — Round 2

This is the active brief for any agent regenerating tinkercademy.com hero / flagship / programme images.

It supersedes the round-1 prompt envelope baked into `scripts/gen-hero-batch.sh`. The round-1 candidates live under `public/images/generated/hero-review/<id>/v2_*.jpg` and `v3_*.jpg` and stay on disk for comparison, but **do not reuse the round-1 prompt envelope**.

## What failed in round 1 (read this first)

User reviewed all 119 round-1 candidates. The dominant problems:

1. **Lighting was too cinematic.** "Dark room, glow from screens, single key light" — moody editorial. This is itself an AI tell. Looks inauthentic. Unusable.
2. **Screens were unrealistic.** Either generic glowy "code-ish" gibberish, or app-launcher icon grids that don't match what is being taught. Often blurred so badly the editor identity is gone.
3. **Faces were too foreign.** Generic Western / Caucasian / mixed-European features dominated. Did not read as Singapore.
4. **Backgrounds didn't read as Singapore.** Either anonymous global "modern co-working" or generic loft classroom — none had MOE classroom or Singapore-office cues.
5. **Sticker direction was wrong as a hero family.**
   - Stickers don't fill 16:9 — they sit on a flat backdrop with negative space, not heroes.
   - Inconsistent characters across placements (different mascots, different proportions, different styling).
   - Did not use the actual Tinkercademy robot character.
6. **Logo / icon explorations were off-brand.** A hex-T mark is not the Tinkercademy mark. The mark is the robot. Do not invent.

## Round-2 art direction

### Lighting

- **Default to bright, diffuse daylight or fluorescent room light.** Even illumination across faces and surfaces. Multiple sources visible (windows, panel lights, ceiling tubes).
- **No moody single-key-light setups.** No "screen glow on faces in a dark room". No "warm spotlight in dim workshop". No "cinematic shadows".
- Slight overexposure on highlights is fine — it reads as "shot under fluorescent ceiling" which is the truth of most Singapore classrooms and offices.
- Acceptable directional cues: bright window light from the side, especially if it's afternoon-tropical, but the **room overall stays bright**.

### Faces and people

- **South-East Asian / Singaporean.** Chinese, Malay, Indian, Eurasian features. Mix is fine but the dominant read should be local.
- Students: school uniforms — pale-coloured polo shirts, dark long pants/shorts/skorts, sometimes a school pinafore. Adults: smart-casual office wear, lanyards, pragmatic not aspirational.
- Avoid the "model" face. Real-looking people, slight asymmetry, uneven complexions, small imperfections. Not heavily retouched.
- Hands and fingers must be plausible — round 1 had a few six-fingered / melted-hand AI-tells that the agents flagged but a few slipped through.

### Backgrounds

- **Singapore school classroom**: square fluorescent ceiling tiles, whiteboard or chalkboard, posters and student work pinned along walls, plastic-topped trapezoidal classroom tables, classroom chairs, sometimes carpet tiles. Not minimalist — these rooms are lived-in.
- **Singapore office / training room**: glass partitions, fluorescent panel lighting, simple grey/white desks, a TV monitor on the wall, a plant in the corner, no exposed-brick or hipster-loft cues. Think CT Hub / Lavender Street, not WeWork.
- **Singapore makerspace**: pegboard tools, Tinkercademy red accents on a stool or wall panel, microcontroller storage tubs, soldering mats — still bright overhead lighting.

### Screens

The screen content must visibly match the tool being taught. Pick the closest realistic editor for the placement:

- **Code For Fun, micro:bit (school), MakeCode arcade tracks** → MakeCode block editor (coloured drag-and-drop blocks: events, loops, variables, basic) and MakeCode Arcade game preview. Or Scratch 3 stage with sprites. Block editors only — these courses do not teach typed code.
- **IMDA Apple tracks** → Swift Playgrounds layout (lesson sidebar, code on the left, live app preview on the right with a clear UI). Not Xcode for the school tracks.
- **IMDA Figma 2025** → Figma canvas with frames, an inspector sidebar on the right, a layer tree on the left. Wireframe content, not finished UI.
- **IMDA Phaser** → VS Code with a JavaScript file open + a small canvas window showing a 2D game.
- **IMDA Unity / unityarvr** → Unity editor with Scene/Game tabs, a Hierarchy panel, an Inspector panel, a 3D scene visible.
- **IMDA Minecraft** → Minecraft Education Edition world (block aesthetic, no logo). Acceptable to also show a code-builder window on a separate screen.
- **Mastering the Web / no-code Framer / web certs** → Browser with a clear web app (sidebar, table, form), a code editor (HTML/CSS/JS or React), or for Framer specifically: a no-code visual editor with component panel + canvas + breakpoints toolbar.
- **React Native / mobile cert** → VS Code with .tsx/.swift file, plus a phone or simulator showing the app running.
- **Agentic AI / Knowledge-Powered AI / vibe-coding / Copilot** → A chat panel (assistant turn-and-response, no readable text), source documents on the desk or screen, and either an output app or a dashboard.
- **Knowledge-Powered AI** → spreadsheet rows + a chat panel + cited "source cards" — no glowing robot imagery.
- **Blockchain** → whiteboard sketches of blocks/transactions/signatures + a laptop with a node graph. **Never** glowing chains, coins, Bitcoin orange.

When in doubt about screen text, render it as **abstract grey blocks** rather than fake gibberish. Garbled text is the cardinal AI tell.

### Composition

- 16:9 aspect ratio.
- Subject grouping centre-right or right; **left third should be the cleanest available negative space** (could be a wall, a window, a whiteboard). Headlines overlay there.
- Real-world clutter is OK if it's specific (a mug, a pencil case, sticky notes, a labelled drawer) — not abstract clutter.
- Composition should feel like a documentary photographer in the room, not a posed marketing shoot.

### Stickers

**Drop sticker style as a hero family.** Stickers are accent / spot illustration only — they cannot fill a 16:9 hero without looking awkward.

If sticker work is needed for a separate purpose (UI accents, social cards, programme card flourishes), the only acceptable mascot is the existing Tinkercademy robot:

- Source the actual asset PNGs from **https://cld.tk.sg/collections/Rzf65o/Stickers** (Zight CDN, not Cloudinary).
- The character is a black blob with big white round eyes, white stick limbs ending in black hands/feet, and a red diamond gem on the chest.
- mmx `--subject-ref` did **not** transfer this character convincingly in round 1. Don't try to regenerate the mascot from a reference; reuse the source PNGs as-is, or ask a human illustrator.
- No "kawaii eyes" variants, no "hex with a T" lockups. Those are not the Tinkercademy mark.

### Logo / icon work

Out of scope for image generation. The Tinkercademy mark is the robot. If a logo asset is needed, source it from the brand pack, not from mmx / imagegen.

## What to regenerate

All 44 placements documented in `src/data/hero-image-review.json` should be re-attempted under the round-2 brief. The placement-level concept blurbs in that JSON are still valid — the failure was in the prompt envelope, not the per-placement direction.

Special cases (preserve their existing direction in the JSON):

- `code-for-fun-flagship` and `imda-learn-flagship` need a **3D editorial illustration** style (clay-render kit composition / modular roadmap), not a photograph. Round-1 v3 candidates for these two are decent baselines — keep them on the comparison shortlist; the new round can iterate on the same direction.
- `contact-us` — round-1 v3_001 already nails warm reception. New round can simply iterate from there with a brighter, more-Singapore variant.

## Round-2 prompt scaffold (replace the round-1 envelope)

```
Bright Singapore <classroom|office|makerspace> photograph, daylight or fluorescent overhead lighting, even illumination across the whole frame, multiple light sources visible. Real photograph by a documentary photographer in the room — not a posed marketing shoot, not cinematic. South-East Asian / Singaporean people <students in pale school polos | adults in smart-casual office wear>, plausible faces and hands, slight asymmetry, no AI plastic skin. <Specific room cues: square fluorescent ceiling tiles, whiteboard, classroom posters | glass partitions, panel lights, plain grey desks, monitor on wall>.

Subject: <PLACEMENT-SPECIFIC CONCEPT FROM hero-image-review.json>.

Screen content must clearly read as <SPECIFIC EDITOR FROM "Screens" SECTION ABOVE — name it explicitly, e.g. "Microsoft MakeCode block editor with coloured drag-and-drop blocks (events, loops, variables) and a small simulator window showing a micro:bit">.

Composition: subject grouping on the right, clean negative space on the left third for a headline overlay. Real-world clutter where appropriate (mug, pencil case, sticky notes). 16:9.

Hard nos: dark room with screens as the only light source; cinematic single-key lighting; moody editorial low-key; generic glowy code text; foreign / Western / Caucasian dominant faces; hipster-loft co-working aesthetic; readable text or fake signage; logos; watermarks; six fingers; melted hands.
```

## Workflow for the next agent

1. Read this brief and `src/data/hero-image-review.json` (44 placements, with concept blurbs and original prompts).
2. Build a new prompt envelope per the scaffold above. **Do not reuse `scripts/gen-hero-batch.sh` as-is** — its envelope is the round-1 envelope. Either edit the script or write a new `scripts/gen-hero-batch-v2.sh`.
3. For each placement, look up the editor / room cue specific to that placement using the "Screens" mapping above plus the placement's family field.
4. Generate 2 candidates per placement at 16:9. Save under `public/images/generated/hero-review/<id>/r2_001.jpg` and `r2_002.jpg` — `r2_` prefix so the picker can sort them ahead of `v2`/`v3`.
5. Visually review each pair before reporting. Flag any item where neither candidate is usable; do not promote anything.
6. Skip the sticker direction entirely.
7. Update `src/pages/review/hero-proposals.astro` to recognise `r2_*` as the newest source (highest priority in the sort order).

## Reference data

- Placement metadata (id, route, current image, concept, original prompt): `src/data/hero-image-review.json`
- Round-1 picks and AI-tell flags: `docs/hero-image-proposals.md`
- Round-1 candidates on disk: `public/images/generated/hero-review/<id>/v2_*.jpg` and `v3_*.jpg`, plus `public/images/generated/hero-review/seed/`
- Picker page: `src/pages/review/hero-proposals.astro` (route `/review/hero-proposals/`)
- mmx CLI: `mmx image generate --prompt "<text>" --aspect-ratio 16:9 --n 2 --out-dir <path> --out-prefix r2 --output json --quiet --timeout 180`

## Round-2 generation log (2026-04-30)

After two failed mmx rounds (round-1 `v2_*` and round-2 `r2_*`, both rejected for moody/Fujifilm-cinematic output that ignored the bright-classroom direction), the production track is **codex with its built-in `image_gen` skill**. mmx is retired. The picker `src/pages/review/hero-proposals.astro` ranks sources top-down: cdx → cdx-icon → v3 → seed → sticker.

Final tracks:

| Track | Tool | Script | Prefix | Coverage |
| --- | --- | --- | --- | --- |
| Bright SG photo | codex / built-in `image_gen` | `scripts/gen-hero-codex-sweep.sh` | `cdx_` | 44 / 44 placements |
| Mascot icon | codex / `image_gen` with sticker PNG attached via `codex exec -i <png> --` | `scripts/gen-hero-codex-icons.sh` | `cdx-icon_` | 19 curated placements (`/tmp/hero-batches-r2/icon.json`) |

Prompt build is centralised in `scripts/_hero_round2_build_batches.py`:

- Reads `src/data/hero-image-review.json`, applies the round-2 envelope and a per-placement `SCREEN_BY_ID` editor cue (MakeCode, Scratch, Swift Playgrounds, Figma, VS Code, Unity, Minecraft EE, etc.), and emits batch JSONs into `/tmp/hero-batches-r2/` (`all.json`, `codex.json`, `icon.json`, plus `half-a.json` / `half-b.json` for the retired mmx tracks).
- Hard-truncates each prompt at 1500 chars (the mmx limit, kept for safety even though mmx is no longer used).
- Icon prompts (`icon_prompt`) are short, family-specific, and assume a sticker reference is attached.

Quality:

- `cdx` photos: real Microsoft MakeCode / Scratch 3 / Swift Playgrounds UIs visible on the laptop screens, MOE-classroom whiteboards with legible "Learning Goals" handwriting, students in pale polos and tudung, micro:bit kit boxes labelled correctly, "Welcome to our workshop" wall-TV graphics. Tropes the user objected to in mmx (moody Fujifilm, generic dark "code" gibberish, Western faces, hipster loft) are absent.
- `cdx-icon` mascots: fully on-model — black blob body, big round white eyes, white stick limbs ending in BLACK mitten hands and oval feet, red triangular chest gem. The fix that made this work is attaching two sticker PNGs as references via `codex exec -i ref1.png -i ref2.png -- "<prompt>"` — without the `--` separator the prompt gets eaten by the variadic `-i FILE...` flag.

Codex driver lessons (see `~/.claude/projects/.../memory/feedback_hero_image_tooling.md`):

- Frame the task as **EXACTLY two tool calls**, with the first one explicitly REQUIRED ("STEP 1 (REQUIRED, do this first): make ONE call to your built-in image_gen tool …"). Without that framing, codex will skip `image_gen` and go straight to the shell step.
- Tell codex to skip docs ("DO NOT read SKILL.md") — otherwise it spends ~15 min reading its own docs each session.
- Use `${CODEX_HOME:-$HOME/.codex}` fallback in the inline shell — `$CODEX_HOME` is not set in the spawned shell.
- Build prompts via `python3 - <<'PYEOF'` rather than bash heredocs — bash heredocs in `$(cat <<EOF ...)` choke on backticks (used for code fences) and parens (used for numbered lists).
- Per-item wall-clock when prompted correctly: ~3 min. Run multiple sweeps in parallel as separate background bash tasks.

Re-running:

- Rebuild prompts: `python3 scripts/_hero_round2_build_batches.py` (writes `/tmp/hero-batches-r2/*.json`).
- Re-run photo sweep: `./scripts/gen-hero-codex-sweep.sh` (idempotent — skips placements that already have `cdx_001.jpg`; logs to `/tmp/codex-hero-logs/<id>.log`).
- Re-run icon sweep: `./scripts/gen-hero-codex-icons.sh` (idempotent — skips placements that already have `cdx-icon_001.jpg`; logs to `/tmp/codex-icon-logs/<id>.log`).
- Sticker source pack lives in `reference/stickers/` (12 PNGs + `INVENTORY.md` mapping each file to a pose). Default mascot references are `9Zu07ZnG.png` (shrug, front-facing) and `6quxyqll.png` (waving).
- Retired: `scripts/gen-hero-batch-v2.sh`, `scripts/gen-hero-icons.sh`, `scripts/gen-hero-codex.sh`, `scripts/_run_codex_one.sh` — kept on disk for reference but not part of the production pipeline.

## Applying picks (2026-04-30)

The user reviewed `/review/hero-proposals/` and froze a manifest of decisions in `src/data/hero-image-decisions.json`. Each entry is `{"id": "...", "image": "..."}` (new hero) or `{"id": "...", "keep": true}` (retain current). Optional `alternates` carries any non-picked candidates the user wanted preserved on the review page.

Apply / re-apply the manifest:

- `python3 scripts/apply-hero-picks.py` — rewrites three places idempotently:
  - `src/data/pages/static-pages.json` → `hero_image` field per top-level page (home, about-us, schools, etc.)
  - `src/content/programmes/<slug>.md` → `heroImage:` frontmatter line per programme. Two manifest ids map to long slug names (`certificate-iot-creative-digital-making`, `certificate-blockchain-technology`); the script handles the mapping.
  - `src/lib/site-media.js` → `HOME_FLAGSHIP_IMAGES` for the three flagship cards on /schools.
- After editing the JSON, rerun `apply-hero-picks.py`. The picker page reflects the manifest live (no localStorage state).

Page-screenshot previews on the review page:

- `python3 scripts/screenshot-pages.py` — uses headless Chrome (`/Applications/Google Chrome.app/...`) against `http://localhost:4321` to capture each placement's route to `public/images/generated/hero-page-screenshots/<id>.png`. Runs `CONCURRENCY=3` Chromes in parallel by default; `TIMEOUT=120` seconds each (data-heavy pages like /schools and /courses-* need the long deadline). Idempotent — delete a `.png` to re-screenshot that placement.
- The dev server must be running before invoking the script. The `/review/hero-proposals/` page reads screenshots from disk; missing ones surface a "No screenshot yet" placeholder.

## Round 2.5 (2026-05-01) — single-placement re-spins

When the user objects to specific cards on a live page and asks for one-off alternates (rather than a full sweep), use a per-placement prompt overlay alongside the standard envelope. Save outputs to `public/images/generated/hero-review/<slug>/alt_001.jpg` so they appear automatically on `/review/hero-proposals/`. Promote a pick by overwriting `cdx_001.webp` (`ffmpeg -y -i alt_001.jpg -c:v libwebp -quality 85 -compression_level 6 cdx_001.webp`) — the programme frontmatter already references that path.

### Confirmed prompt-time pitfalls (and their fixes)

These are failure modes the user has called out in production. They reproduce reliably in codex/imagegen unless the prompt actively works against them.

- **Brand names in scene descriptors get rendered as scene text.** "CT Hub vibe" → literal "CT Hub" on a coffee mug. "Tinkercademy makerspace" → "Tinkercademy" silk-screened across a t-shirt. Don't name the brand in the prompt at all. Use generic SG descriptors ("Singapore office training room with glass partitions", "Singapore makerspace with pegboard wall"). Add an explicit ban in the negative-prompt list: `the words 'Tinkercademy' or 'CT Hub' anywhere`. Pair it with `all clothing must be plain, unbranded, solid-coloured — no text/logos on any garment`.

- **Single negative on "back of laptop" is not enough.** "DO NOT show the back of the laptop" still produces over-the-shoulder framing where the visible monitor faces away from the viewer and the people stare at a screen we can't see. The fix is to specify the geometry positively, not negatively: e.g. "two laptops back-to-back on a shared meeting table, hinges touching, screens facing opposite directions; the closer screen faces the camera, the farther screen faces the seated people". Or: drop the laptop entirely and pivot to a hands-on hardware shot (works for maker / IoT placements). Keep the negative phrase in the deny list as a backstop, but do not rely on it.

- **Default Malay-coded faces come with a tudung.** If you need a Malay person without a headscarf (e.g. the user has flagged a specific image), write it explicitly: `Malay woman with hair uncovered — NO tudung, NO headscarf, NO hijab`. Pair with a banlist entry: `headscarves, tudung, hijab`.

- **"Subject right + clean left-third negative space" produces uniform compositions across placements.** Six adjacent professional cards using that envelope all read as the same photo from a distance. For variety, prescribe distinct geometry per card: top-down flat-lay; low-angle from below the desk; subject on the LEFT facing right; full-frame subjects with no large negative space; etc. Differentiate at the composition level, not just the subject level.

- **Cups and stickers are a recurring text-leak surface.** Even when the prompt says "lived-in clutter (mug, sticky notes)", the model writes brand names on them. Always specify "plain unbranded solid-coloured ceramic mug; no text, no words, no logos on any mug, cup, sticker, or surface".

When the user rejects a single image, before regenerating: check the failure mode against this list and tighten the relevant clause. Don't just re-roll the dice with the same prompt.
