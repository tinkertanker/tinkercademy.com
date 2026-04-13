## Final Prompt
<taskname="Live sitemap mapping"/>
<task>Verify the live sitemap route inventory at https://tinkercademy.com/sitemap.xml, then produce a concise URL → deterministic mobile screenshot filename inventory for files that should live under docs/screenshots/live/mobile/. Also report slug-normalisation cautions (especially encoded/non-ASCII slugs). Do not modify repo files.

Discovery already found the deterministic naming implementation in `docs/screenshots/live/mobile/capture-mobile-screenshots.spec.js`.

Use this as the current data-derived baseline to cross-check the live sitemap (baseline may be stale, so treat as provisional):
- Static paths (13):
  - / -> home.png
  - /about-us -> about-us.png
  - /contact-us -> contact-us.png
  - /courses-all -> courses-all.png
  - /courses-professionals -> courses-professionals.png
  - /courses-schools -> courses-schools.png
  - /individuals -> individuals.png
  - /infocomm-club -> infocomm-club.png
  - /microbit -> microbit.png
  - /professionals -> professionals.png
  - /schools -> schools.png
  - /showcase -> showcase.png
  - /tinker-x -> tinker-x.png
- Programme slugs (29), each maps to `/programmes/<slug>` -> `programme-<slugifySegment(slug)>.png`:
  - imda-phaser-2025
  - imda-apple-2025-b
  - imda-apple-2025-c
  - imda-apple-2025-a
  - build-for-mobile-with-react-native
  - building-agents-with-openclaw
  - certificate-in-technology-foundations-harnessing-the-power-of-internet-of-things-and-creative-digital-making
  - certificate-in-technology-foundations-unleash-the-potential-of-blockchain-technology
  - code-for-fun-ai-workshop
  - code-for-fun-baseline-workshop
  - code-exp-2025
  - iotmaker
  - imda-microbit-2025
  - digital-making-with-micro-bit-iot
  - unityarvr
  - imda-unity-2025
  - imda-minecraft-2025
  - knowledge-powered-ai-with-chatgpt
  - vibe-coding-for-digital-builders-lovable-replit
  - mastering-the-web
  - microsoft-copilot
  - no-code-machine-learning
  - no-code-web-design-framer
  - professional-certificate-in-mobile-application-development
  - professional-certificate-in-web-application-development
  - ri-futurecreate-maker-programme-2025
  - swift-accelerator
  - imda-figma-2025
  - vibe-coding-for-digital-builders
- Tutorial slugs (23), each maps to `/tutorials/<slug>` -> `tutorial-<slugifySegment(slug)>.png`:
  - access-denied-a-door-entry-tutorial
  - ang-bao-collector
  - build-your-own-micro-bit-security-door
  - coin-sorter
  - create-an-electric-spirit-level
  - create-an-electro-theremin
  - finger-dexerity-micro-bit-game
  - flippy-pancakes-micro-bit-game
  - making-a-waving-fortune-cat
  - maze-runner-micro-bit-game
  - micro-bit-flappy-bird-game
  - micro-bit-snake-game
  - micro-bit-wire-transmission
  - micropython
  - morse-code-transmitter
  - pitch-perfect
  - put-together-the-game-bit
  - put-together-the-krazy-kar-v2
  - quick-maths
  - reaction-time-tester
  - reclusebot
  - shoot-em-up-kit
  - µ-remorse (expected filename segment `mu-remorse`)
</task>

<architecture>- `docs/screenshots/live/mobile/capture-mobile-screenshots.spec.js`: authoritative live sitemap fetch + screenshot naming logic.
- `scripts/crawl-site.mjs`: separate sitemap fetcher (`getSitemapUrls`) used for crawl/import pipeline.
- `scripts/build-crm-data.mjs`: downstream slug decoding (`decodeURIComponent`) and URL slug extraction behaviour relevant to encoded slug edge cases.
- `src/lib/data.js`: programme URL slug extraction from CTAs and site data composition.
- `src/pages/[slug].astro`, `src/pages/programmes/[slug].astro`, `src/pages/tutorials/[slug].astro`: route generation model in Astro (static, programme, tutorial).</architecture>

<selected_context>
docs/screenshots/live/mobile/capture-mobile-screenshots.spec.js: fetches live sitemap, dedupes `<loc>`, captures each URL, computes output filename via `screenshotName(pathname)`.
docs/screenshots/live/mobile/playwright.config.js: Playwright test targeting.
scripts/crawl-site.mjs: `getSitemapUrls()` and crawl pipeline using sitemap as source of public routes.
scripts/build-crm-data.mjs: `decodeSlug()`, `extractProgrammeSlug()`, decode behaviour for encoded paths.
src/lib/data.js: `extractProgrammeSlugsFromCtas()` and CTA URL normalisation.
src/pages/[slug].astro: static page dynamic routing exclusions and path model.
src/pages/programmes/[slug].astro: programme static paths from data slugs.
src/pages/tutorials/[slug].astro: tutorial static paths from data slugs.
src/data/pages/site-settings.json: site base URL/navigation context.</selected_context>

<relationships>
- Live verification flow: sitemap.xml -> URL list -> `screenshotName(pathname)` -> `docs/screenshots/live/mobile/<filename>.png`.
- `screenshotName()` special-cases route groups: `/` -> `home.png`, `/programmes/*` -> `programme-*`, `/tutorials/*` -> `tutorial-*`, all others -> joined slug segments.
- `slugifySegment()` rules: decode URI segment -> replace µ/μ with `mu` -> NFKD -> strip combining marks -> lowercase -> non `[a-z0-9]` to `-` -> trim/collapse hyphens.
- Data pipeline (`crawl-site` + `build-crm-data`) also decodes URL slugs, so encoded sitemap slugs can converge to the same logical slug/filename.</relationships>

<ambiguities>
- No committed snapshot of live sitemap URLs exists in selected files; baseline list above is data-derived and may differ from current live sitemap.
- Filename collisions are possible after normalisation (e.g. `%C2%B5-remorse`, `μ-remorse`, and `mu-remorse` all become `mu-remorse`; accent/diacritic variants can collapse similarly).
- `/programmes/<slug>` and `/tutorials/<slug>` with additional nested segments would be flattened into one hyphen-joined filename suffix.
- Query strings and fragments are ignored (`pathname` only), so distinct URLs differing only by `?`/`#` map to the same filename.
- Both `.capture-mobile-screenshots.spec.js` and `capture-mobile-screenshots.spec.js` exist with equivalent naming logic; hidden-file variant may create confusion about canonical script.
</ambiguities>

## Selection
- Files: 9 total (9 full)
- Total tokens: 14971 (Auto view)
- Token breakdown: full 14971

### Files
### Selected Files
├── docs/
│   └── screenshots/
│       └── live/
│           └── mobile/
│               ├── capture-mobile-screenshots.spec.js — 881 tokens (full)
│               └── playwright.config.js — 30 tokens (full)
├── scripts/
│   ├── build-crm-data.mjs — 5,612 tokens (full)
│   └── crawl-site.mjs — 2,881 tokens (full)
└── src/
    ├── data/
    │   └── pages/
    │       └── site-settings.json — 548 tokens (full)
    ├── lib/
    │   └── data.js — 1,666 tokens (full)
    └── pages/
        ├── programmes/
        │   └── [slug].astro — 1,614 tokens (full)
        ├── tutorials/
        │   └── [slug].astro — 622 tokens (full)
        └── [slug].astro — 1,117 tokens (full)


---

## Generated Plan

## Chat Send ✅
- **Chat**: `live-sitemap-mapping-348D3E` | **Mode**: plan

### Response
The monitor confirmed the results already reported above — no additional data beyond what's in the inventory. The analysis is complete.


> 💡 Continue this plan conversation with ask_oracle(chat_id: "live-sitemap-mapping-348D3E", new_chat: false)