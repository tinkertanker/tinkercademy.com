# Banner unification review — August 2026

Audit of every hero/banner image live on tinkercademy.com (13 static pages, 29 programme pages, 3 flagship cards, 3 popular-course tiles), plus a recommendation for unifying them. Companion to [hero-image-brief.md](./hero-image-brief.md), which documents how the current images were produced.

## TL;DR

The site currently runs **five competing visual systems** side by side. The AI-photo family (30 placements) is the weakest asset despite being the biggest investment: it reads as AI stock, carries visible brand-text leaks in production, and repeats one composition across adjacent cards. The mascot-illustration family (5 placements) is the only ownable, distinctive system on the site — its problems are fixable craft issues, not direction issues.

**Recommendation: make illustration the primary system and demote photography to proof.** Illustrated mascot heroes for every navigational page and programme page; real photography (never AI) only where it evidences something real — showcase, events, testimonials, team. Use the new mascot sticker series as the character reference for a round-3 illustrated sweep.

## What's live today

| System | Where | Count | Verdict |
| --- | --- | --- | --- |
| AI photos (`cdx_`) | Most programme pages + professionals, schools, courses-professionals, infocomm-club, 2 flagship cards | ~30 | Retire progressively |
| Mascot illustrations (`cdx-icon_`) | showcase, about-us, courses-all, individuals, courses-schools | 5 | Keep — fix craft, expand |
| Legacy Framer CDN images | **home**, microbit, tinker-x, contact-us | 4 | Replace + rehost urgently |
| Legacy graphic banners | code-for-fun-baseline (2018-era banner), swift-accelerator (bare Swift logo tile + flagship gradient), ri-futurecreate | 4 | Replace |
| Logo tiles | Popular-course cards: lovable, chatgpt, react-native (white logo on black) | 3 | Restyle to match system |

## Why the AI-photo family fails

1. **It reads as AI stock.** Every image shares one colour temperature, one lighting recipe, one plastic-skin finish. Individually competent; collectively they scream "generated". For an education brand, fake classroom photos are a credibility liability the moment a parent or teacher notices — and they notice.
2. **Brand-text leaks are live in production.** Known pitfall from the brief, visible right now: "TINKERCADEMY SINGAPORE" wall text (certificate-IoT), TINKERCADEMY pegboard banner + mug (digital-making-with-micro-bit-iot), "CT HUB" mug (no-code-web-design-framer), "CODE LIKE A GIRL" mug (no-code-machine-learning), slogan mugs elsewhere, INFOCOMM CLUB chalkboard (that one is arguably fine).
3. **Composition uniformity.** `professionals` and `courses-professionals` are near-identical scenes (facilitator at a wall screen, backs of heads at desks). The IMDA school cards are interchangeable. This is the documented "same photo from a distance" trap.
4. **Events rendered as fiction.** code-exp-2025 and ri-futurecreate are real events with real photos available — representing them with generated imagery wastes the one place we hold genuine proof.

## Why illustration is the right primary

- The mascot is the actual Tinkercademy mark; no competitor can copy the character.
- It sidesteps every AI-photo failure mode at once: no uncanny faces, no fake-screen problem, no ethnicity calibration, no text leaks on mugs.
- It scales to any subject (blockchain, AI, Figma) without staging fake classrooms.
- The 16:9 objection from round 1 is already solved: the `cdx-icon` scene illustrations (and especially the unused `home/cdx-icon_001.webp` with the Singapore skyline) fill the frame properly. The round-1 "drop stickers as a hero family" verdict applied to raw sticker crops on flat backdrops, not to built scenes.

Current craft issues to fix in round 3, so the illustrations become "great" rather than "passable":

- **Prop salad.** Most current icons are "mascot at a desk surrounded by floating objects". Replace with the mascot *doing the course's activity* — a scene with a narrative, max 3–4 meaningful props that identify the course.
- **Odd semantics.** courses-schools has the mascot holding an umbrella; nothing about it says schools.
- **Near-identical layouts.** showcase / courses-all / individuals are variations of one composition. Differentiate by scenario, not by shuffling props.
- **Single character everywhere.** The home candidate proves supporting human characters in the same style work; use them where the story needs people (schools, about-us).

## Proposed system rules

1. **Illustration = promise, photography = proof.** Anything describing an offering (page heroes, programme heroes, flagship cards, course tiles) is illustrated. Anything evidencing reality (showcase, event recaps, testimonials, team) is a real photo. AI-generated photos are banned outright.
2. **One canvas.** Cream background, consistent line weight, palette locked to brand red + black + teal + mustard, sampled from the sticker series.
3. **One composition grammar.** Scene anchored centre-right; left third stays the cleanest negative space for headline overlay (preserves the existing layout contract). Vary the scenario per placement, prescribe distinct geometry where cards sit adjacent.
4. **Accent by domain.** Derive a per-programme accent colour from the existing domain taxonomy (`src/data/pages/domains.json`) so listing pages get systematic variety instead of random variety.
5. **Character fidelity by reference, not description.** mmx `--subject-ref` failed; the codex `image_gen` pipeline with sticker PNGs attached (`codex exec -i ref1.png -i ref2.png -- "<prompt>"`) produced fully on-model mascots. Reuse that pipeline with the **new sticker series** as references.
6. **Course tiles join the system.** Replace white-logo-on-black tiles with small illustrated tiles (mascot + tool motif) or, minimally, brand-coloured grounds.

## Rollout order

1. **Home** — still on a Framer CDN image. Highest-traffic banner on the site; `home/cdx-icon_001.webp` (mascot + kids + SG skyline) is a strong baseline to iterate from with the new stickers.
2. Remaining Framer-CDN pages (microbit, tinker-x, contact-us) — replace and rehost; external CDN dependency should go regardless of art direction.
3. The five live mascot pages — regenerate to round-3 spec with the new sticker refs.
4. Programme pages in batches (schools tracks first, then professional tracks), via the existing `/review/hero-proposals/` picker + `hero-image-decisions.json` + `apply-hero-picks.py` workflow.
5. Swap real photos into showcase / code-exp / ri-futurecreate as they're sourced.
6. Retire `cdx_` photos as each placement flips; keep on disk for comparison as before.

## Blockers / inputs needed

- **Sticker series not in repo.** stickers.tk.sg and cld.tk.sg are blocked by the remote sandbox's network egress policy, and `reference/stickers/` exists only in the other working environment. Commit the new sticker PNGs (with an INVENTORY.md pose map) into the repo so any agent/environment can use them as generation references.
- **Framer CDN also unreachable from the sandbox** — the four legacy heroes couldn't be audited visually here; they're off-system by definition.
- **Real-photo library.** Confirm what genuine classroom/event photography exists (Code EXP, RI FutureCreate, showcases) and where it lives.
- **Decision:** full illustrated switch including programme pages (recommended), or two-tier with photos retained on programme pages.

Once the stickers are in the repo and the direction is confirmed, update `hero-image-brief.md` with a Round-3 section reversing the "drop sticker style" verdict in favour of the built-scene illustration spec above.
