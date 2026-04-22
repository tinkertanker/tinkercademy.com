# Tinkercademy Writing Style Guide

The house style guide for the Tinkercademy website, grounded in the team bios, YJ's blog, and a sampled cross-section of real proposals. Read alongside `writing-style-templates.md`.

## How to use this guide

1. Identify which of the three voices you're writing in (next section).
2. Follow the voice-specific rules.
3. Apply the shared rules for all voices.
4. Run the checklist at the end.

If you were about to write "empower", "unlock", "seamless", "passionate", "dedicated", "unparalleled", "cutting-edge", or "holistic" — stop and rewrite. These are banned on the website regardless of voice.

---

## The three voices

Tinkercademy writes in three distinct registers. They share DNA but have different jobs. Don't flatten them into one "house voice".

### Voice A — Institutional website voice

Used on: homepage, about-us body copy, programme category pages, landing pages.

- First-person plural "we" for Tinkercademy.
- Second-person "you" for the visitor.
- Short sentences, short paragraphs (1–3 sentences).
- Zero boilerplate. Zero mission-statement cadence. No "Our vision is…".
- Concrete: name the tool, name the school, name what gets built.
- One small dry line per page section, maximum. Earn it.

Canonical example (live, already on the site and good):

> "We're coders and tinkerers who teach coding and tinkering to schools, corporations, and the public in Singapore."

Canonical failure (live, also on the site and bad):

> "We bring an unparalleled depth of experience in education and technology to our classes and curriculum."

The first line makes a specific claim about *who we are and who we teach*. The second line makes a vague claim about *how good we are*. V2 rule: the second kind of line does not go on the website.

### Voice B — Team-bio voice

Used on: `/about-us` team grid, any "about the team" block, trainer profile snippets.

- Third-person, present tense.
- Opens with the strongest appositive credential, no copula verb ("Cornell grad (CS & EE, Magna Cum Laude) and former MOE Physics and Maths teacher." — **not** "Akmal is a Cornell graduate who…").
- Middle clause names the current responsibility in the company. No "As our…" wind-up.
- Optional closing line with one concrete humanising detail, expressed as an ongoing verb.
- 2–3 sentences or 3 tight clauses. No adjective stacks. Maximum one exclamation mark per bio, and only when the detail truly earns it.

Canonical example (`team.yaml`):

> "Cornell grad (CS & EE, Magna Cum Laude) and former MOE Physics and Maths teacher. Leads curriculum, operations, and teacher training for schools. Enjoys 3D printing and laser cutting random things all day on the office devices."

This voice does *not* belong in the main body copy of the website. It's for the team grid. Keep it there.

### Voice C — Proposal course-blurb voice

Used on: the top section of every client proposal, and (with light editing) as the draft for programme/course pages on the website. This is the one proposal register worth importing.

- Opens with what the thing is and why it matters now, in ≤2 sentences.
- Second paragraph is what participants will do, in concrete verbs.
- Bullet list of learning outcomes, each starting with an active verb.
- Zero self-congratulation. Credentials go in a later section, not here.

Canonical example (Riverside Secondary Vibe Coding, Oct 2025):

> "Generative AI is transforming how people work across many fields. This workshop shows how 'vibe coding' can be one of the easiest and most practical ways to apply Large Language Models. It gives students a high-level view of web development and the core technologies behind it: HTML, CSS, and JavaScript.
>
> The session is highly hands-on. Students will spend most of the time creating and testing their own web-based games or apps, guided step-by-step as they use AI coding tools such as Google Gemini and ChatGPT to prototype quickly."

For the website, lose the procurement formality ("The session is highly hands-on") and keep everything else. This is the best writing in the corpus and most of it transplants directly.

### What's NOT a voice (and should never appear on the website)

**The Tinkertanker canonical boilerplate block.** Present in 8/8 recently sampled proposals, essentially unchanged since 2021. Examples:

> "Tinkercademy is the education programmes brand of Tinkertanker Pte Ltd, where we teach coding and making to students of all ages. We also build our own tech apps and products, such as GuestDay, an iPad-based guest registration service; Get Hacking…"

> "Our core strengths are in building software, teaching technology, and creating with electronics; essentially, we spend our time making cool stuff with technology, or teaching folks how to do the same…"

> "Our vision is that everyone should be empowered to enjoy creating with technology. To that end, our mission is to inspire delight and wonder with technology, by becoming the best educators and crafters in the field."

> "We believe strongly in differentiated, hands-on learning. For a learner, no amount of listening to lectures about 'how to program'…"

These exist because procurement demands "About the Tenderer" sections. They are not house voice. They are *vendor voice*. Do not copy them to the website. If they're needed somewhere, keep them in a downloadable company-profile PDF.

**The LLM-refreshed boilerplate variant.** Emerging in 2026 proposals (see Dunman ALP "Tenderer Information", March 2026):

> "where pedagogical expertise meets real-world engineering", "tried-and-tested curriculum", "proud pioneers", "empower everyone to innovate", "deliberate hybrid of classroom and code"

This cadence is worse than the old boilerplate, not better. Flag and reject on sight.

---

## Shared rules (apply to all three voices)

### 1. British spelling

- `programme` for a course of study; `program` only for software.
- `organisation`, `analyse`, `customise`, `optimise`, `recognise`, `behaviour`, `centre`, `practise` (verb) / `practice` (noun).
- Exception: where a product/platform name uses US spelling, keep it (e.g. CodePen, Figma plans called "Education").

### 2. Contractions on, always, on public pages

`we're`, `you'll`, `it's`, `don't`, `won't`. The only exception is when not contracting adds genuine emphasis. Otherwise contractions are the default.

### 3. Never use these words

Hard ban, all voices:

- **unparalleled, world-class, industry-leading, best-in-class, next-generation, cutting-edge** — adjective piles with no content.
- **passionate, dedicated, talented, driven** — personality claims the reader can't verify.
- **empower, unlock, leverage, harness** — management vocab.
- **seamless, holistic, transformative, journey, ecosystem, paradigm** — SaaS sludge.
- **future-ready, future-proof** — tender-speak.
- **embark, solutioning** — avoid entirely.

### 4. Use these words gladly

`hands-on`, `build`, `make`, `prototype`, `ship`, `tinker`, `teach`, `learn`, `guide`, `test`, `present`, `design`. If the sentence can use one of these instead of an abstract verb, use one of these.

### 5. Proof beats adjectives

Rule: if you wrote an adjective, ask what *specific fact* could replace it. Then use the fact.

| Instead of | Use |
|---|---|
| "world-class trainers" | "trainers from Cornell, Stanford, MIT, Wharton, NTU, NUS — mostly ex-teachers or ex-engineers." |
| "extensive industry experience" | "former MOE teachers, former PayPal senior engineer, ex-Apple marketing." |
| "cutting-edge AI tools" | "Claude Code, Codex, Gemini, ChatGPT, Figma Make." |
| "trusted by leading institutions" | "IMDA-appointed vendor for Code for Fun (2015–2019) and PlayMaker (160+ preschools)." |

### 6. Name things, densely

Tool density is a style choice, not clutter. The live about-us already does this and it works: "micro:bit, iOS, Python, Arduino, Node, cyber-security, Unity, and more." Good web copy names the specific thing.

### 7. Parentheses are the house aside

Preferred over em-dashes for soft asides. Em-dashes fine in moderation but parentheses are the Tinkercademy move. Observed across bios, blog, and the best proposal leads. Example: "IOI medallist from a lifetime ago" would work as "(IOI medallist, a lifetime ago)" in an institutional context.

### 8. Credentials get named and dismissed in one breath

The house pattern:

- Name the school/employer/award plainly: "Cornell", "Stanford EE grad", "former PayPal senior engineer", "IOI medallist".
- Immediately do the deflation move if the voice calls for it: "from a lifetime ago", "random things", "no reason", "every AI coding plan he comes across".
- Never stack three honours in a row without a working verb between them.

### 9. One dry line per block, max

Humour is rationed. The rhythm across team bios, good proposal leads, and the homepage is *one* small dry detail per paragraph-sized block. Stacking two produces the blog. The website's job is institutional — pick the best line and stop.

### 10. Silence beats filler

When there's no specific detail, *be shorter*. Grace's bio is two sentences, no quirky line, and that's fine. The failure mode is inventing a personality claim to fill the space.

---

## Voice-A specific: the website

### Structure for any page's first screen

Two moves only:

1. **What we do, in plain English.** One sentence, ≤20 words. This is the line someone screenshots.
2. **Who it's for + why we're credible, compressed.** One sentence, naming at least one specific anchor (a named client, a named partner, a number, or a named tool).

Example (proposed rewrite of current live opener):

> We're coders and tinkerers who teach coding and making to schools, companies, and the public in Singapore.  
> We've been doing this since 2011 — with IMDA, Apple, Microsoft, MOE schools, and 160+ preschools — and we still build the apps and kits we teach with.

No mission statement. No "unparalleled". The partners and the builder identity carry the claim.

### What replaces the "Tinkercademy comprises a team of dedicated education specialists…" paragraph

That paragraph is boilerplate with a quoted boilerplate inside it. It should be deleted. The team grid right below it already makes the claim with specifics. The current paragraph is a sentence that explains what the team grid is about to show — which is unnecessary if the grid is well-laid-out.

If a lead-in is structurally needed: one sentence, on what the team actually does. E.g. "We're a team of former teachers and working engineers. Here's who you'll meet." Nothing more.

### Exclamation marks and emoji

- **Exclamation marks**: at most one per page. Reserve for earned delight (see Tracey's bio: "Was featured in Tech in Asia for his mid-career switch to coding instruction!"). Never use two in the same page.
- **Emoji**: not in website body copy. Fine in blog posts on `yjsoon.com`. Not here.

### CTAs

Don't end pages with "Join us for the best…" The live page does this and it's the weakest line on the whole site. Better patterns, all observed in proposals as genuine Tinkercademy voice:

- Direct next step: "Email [hello@tinkercademy.com](mailto:hello@tinkercademy.com) to talk about your programme."
- Specific invitation: "Run a school? We'll scope a programme with you. Run a company? Same."
- Honest and short: "Tell us what you're trying to build. We'll tell you if we can help."

---

## Voice-B specific: team bios

### The formula

Three slots:

1. **Credential clause** — appositive, no "is a". Usually `[School] [subject] grad` or `former [role]`. Stack 2–3 credentials with commas.
2. **Responsibility sentence** — starts with a verb or a verb phrase. "Leads…", "Oversees…", "Develops…", "Works across…".
3. **(Optional) Humanising tail** — one short sentence or clause ending the bio, expressed as an ongoing verb. Must be specific.

### Worked examples with commentary

✅ **Good** (current, Akmal):  
> "Cornell grad (CS & EE, Magna Cum Laude) and former MOE Physics and Maths teacher. Leads curriculum, operations, and teacher training for schools. Enjoys 3D printing and laser cutting random things all day on the office devices."

*Two credentials, parenthetical honour, three leadership responsibilities, one ongoing-verb humanising line. Perfect.*

✅ **Good** (current, Win):  
> "MSc in Automation & Control (NUS), with 10 years in computer R&D and firmware. Comfortable across Arduino, Raspberry Pi, and ESP32, and previously mentored Myanmar's FIRST Global robotics team. Grudgingly fixes devices that students broke."

*Credential, years in industry, tool-density line, one dry humanising clause.*

❌ **Bad** (invented, avoid):  
> "Tracey is a passionate educator with extensive experience in primary school curriculum. He is dedicated to making coding accessible for young learners and is an expert in a variety of platforms."

*Three adjective flags (passionate, extensive, dedicated), no named school, no specific tool, no named scheme. This is instructor-profile-PDF voice creeping into the team grid.*

❌ **Bad** (invented, avoid):  
> "YJ is a co-founder who leverages his deep technical expertise to empower our clients with cutting-edge digital solutions."

*Three banned words in one sentence. The fact is: Stanford EE grad, former CS106 section leader, RI Computing teacher, runs government and tech-company partnerships, specialises in agentic dev, subscribes to every AI plan. Those are all better than "leverages his deep technical expertise".*

### Edge cases

- **No humanising line is fine.** Grace's current bio has none, and the bio reads as clean and professional. Better than a forced quirk.
- **Double-role titles are fine.** "Co-founder / Master Trainer", "Bizdev / Lead Trainer" — these stack with slashes, no "and".
- **The LinkedIn icon is the external credential channel.** No need to restate years-of-experience that LinkedIn already shows.

---

## Voice-C specific: programme blurbs

### Structure

Each programme/course page should have, in order:

1. **Lede paragraph** — 2–3 sentences. First sentence on the trend or context (why this matters). Second sentence on what the programme is. Third optional sentence on who it's for.
2. **What participants will do** — 1–2 sentences of concrete verbs. The actual shape of the sessions.
3. **Outcomes list** — 4–6 bullets, each starting with an active verb. Derived from real learning outcomes, not marketing goals.
4. **Who it's for** — 1 line. Named audience (level, prior experience, device).
5. **Tools** — named, in a row. Not "industry-leading tools". The tools.
6. **Proof anchor** (optional) — where this has run before, named.

### Worked lede, transplanted from real proposal prose

From Riverside 2025, lightly edited for web:

> Generative AI is changing how people work across many fields. This workshop shows how vibe coding — directing AI to generate and adapt code — can be one of the most practical ways to apply large language models for the first time. Students get a working view of web development as they build their own simple games in HTML, CSS, and JavaScript.
>
> Most of the session is hands-on. Students prototype and test their own web games and apps with AI coding tools (Gemini, ChatGPT), and learn enough of the underlying stack to stay in control of what the AI produces.

### Outcome bullets, adapted from real proposal language

Rewrite all "Participants will learn to X" into active verbs:

- **Build** and run a simple interactive web application using HTML, CSS, and JavaScript.
- **Use** an AI coding tool to generate, debug, and improve code.
- **Apply** clear prompting to get usable code snippets.
- **Customise** their project with their own ideas.
- **Reflect** on how generative AI accelerates learning while still requiring human understanding of the code.

These are lightly polished from the actual Riverside outcomes list. Active verbs at the start of every bullet.

### What to drop from proposal prose when it goes on the web

- All "Target Audience and Requirements" tables. Put prose "who it's for" instead.
- All costing structures (obviously).
- The repeated "Our Experience" mini-track-record that appears at the bottom of every vibe-coding proposal. On the web, a named-clients strip is enough.
- The "Tinkercademy is the education programmes brand…" block. Already covered — gone.

---

## Borrowing from YJ's blog: what transfers, what doesn't

Blog source sample: posts from Aug 2025 to Apr 2026 — _A piece of personal software I made_ (2026-04-17), _The Death of Good Enough_ (2026-03-13), _Annoyingly Excited_ (2026-02-19), _Home-Cooked and Barefoot_ (2025-10-10), _Teaching in stick shift_ (2025-09-06), _If you teach the Singaporean on the road_ (2025-09-05).

### Transfers to website

- **Parenthetical credibility-correction.** YJ: "(Windows users have Recall, which had its share of controversy, but is apparently out now, and full of AI.)". Website use: for any claim, a parenthetical concession de-escalates it and makes it more trustworthy. E.g. "Trusted by 500 schools (and we're still grumpy when the Wi-Fi breaks at a new venue)."
- **Tool names as personality.** YJ: "I fired up Claude Code, Codex, XcodeBuildMCP…". Team bio already does this: "Subscribes to every AI coding plan he comes across." Use tool-name density as part of the voice, not just as proof.
- **Self-sufficient closing clause.** YJ's rhythm frequently ends with a short, flat, slightly dry assertion. Website example: "We build the apps and kits we teach with." One clause. Full stop.
- **"Because we enjoy it" framing.** YJ frequently returns to making things for their own sake. The proposal boilerplate also has "we're doing this because we enjoy it" — and it's the one boilerplate line worth keeping. Surface this explicitly somewhere on the site.

### Does NOT transfer

- **Nested em-dash tangents.** Blog: "with AI coding becoming as powerful as it is nowadays — _and, funnily enough, she gave this talk in 2024, pre Claude Code, pre 'vibe coding'…_". Don't.
- **Italic-for-emphasis-on-aside.** Same.
- **Scripted dialogue.** ("**Gijs:** You're making your own app too?"). Blog-only device.
- **Emoji, including ironic ones.** 😬 😄. Not on the website.
- **"Anyway,", "Funny story:", "Shout-out to…", "send help please".** Narrator-forward devices. They reveal a specific first person. Voice A is "we", not "I".
- **Skibidi, "some idiot", "over-enthusiastically sent (spammed)".** Even dry wit has a limit on institutional copy; these are over.
- **Multi-paragraph essay structure with a pull-quote and a reaction.** Blog form. Not a web form.

### Rule of thumb

If the blog device depends on *a specific narrator being present*, it doesn't transfer. If it's a structural move (parentheses, tool density, deflation after a credential, short closing clause), it does.

---

## Deprecated phrases — the quarantine list

These have appeared repeatedly in the proposal corpus or on the live site. Do not use on the website.

Vendor-boilerplate phrases:

- "Tinkercademy is the education programmes brand of Tinkertanker Pte Ltd, where we teach coding and making to students of all ages."
- "Our core strengths are in building software, teaching technology, and creating with electronics."
- "Our vision is that everyone should be empowered to enjoy creating with technology."
- "Our mission is to inspire delight and wonder with technology."
- "We believe strongly in differentiated, hands-on learning."
- "No amount of listening to lectures about 'how to program'…"
- "Our goal is to ensure participants have enough skills to embark on future projects of their own."
- "We're a group of nerds who enjoy building things." *(Exception: the "nerds who enjoy building" concept is right — rewrite it, don't quote it.)*

Live-site phrases to rewrite:

- "We bring an unparalleled depth of experience in education and technology to our classes and curriculum."
- "Tinkercademy comprises a team of dedicated education specialists from top universities worldwide."
- "With our extensive training in technology, design, and educational pedagogy, combined with years of experience creating real-world apps and electronics, we bring an unparalleled breadth and depth of technology education"
- "Join us for the best coding and digital making experiences for students, teachers, and professionals in Singapore and beyond."

Emerging LLM-rewrite cadence (reject on sight):

- "where pedagogical expertise meets real-world engineering"
- "tried-and-tested curriculum"
- "proud pioneers who introduced"
- "a deliberate hybrid of classroom and code"
- "empower everyone to innovate with technology"

---

## Phrases to promote

Use more, not less. All observed in the source pool as genuine voice:

- "coders and tinkerers who teach" — opening line of the current about-us; the best sentence on the site.
- "teach coding and making to students of all ages" — clean, use it.
- "we build the apps and kits we teach with" — recompress the "Technology Experience" block into this.
- Inventory lines with a wink: "micro:bit, iOS, Python, Arduino, Node, cyber-security, Unity, and more."
- "from a lifetime ago", "random things", "for no reason", "grudgingly", "every … he comes across" — deflation verbs/modifiers on credentials.
- "Teaching and coding in Singapore since [year]" — fact, specific, no adjective needed.

---

## Checklist before publishing any web copy

Run through this. If any item fails, rewrite.

- [ ] Does the first line say what this is, in ≤20 plain-English words, without an adjective pile?
- [ ] Is there at least one specific, verifiable anchor on the page (named client, named tool, named programme, number)?
- [ ] Have I deleted every instance of: unparalleled, world-class, empower, unlock, leverage, seamless, holistic, passionate, dedicated, journey, cutting-edge, future-ready, transformative?
- [ ] Have I checked whether any paragraph has crept in from the Tinkertanker canonical boilerplate block? (See the quarantine list.)
- [ ] If there's a humorous line, is it exactly *one* in this block?
- [ ] If there are credentials, do they name the school/employer/award directly, and then move on?
- [ ] British spelling consistent?
- [ ] Contractions in place (`we're`, `you'll`) unless there's a reason not to?
- [ ] If this is a team bio, does it follow: credential appositive → responsibility verb → optional ongoing-verb detail?
- [ ] If this is a programme blurb, does it open with *context → what it is → what they'll do*, and end with a named-tools line?
- [ ] Would this line be the best line on the page, or am I keeping it for the wrong reason?

---

## Source trail

This guide was derived from direct reading of:

- `src/data/team.yaml` (8 bios)
- Live `https://tinkercademy.com/about-us` (fetched 2026-04-22)
- 6 `yjsoon.com` posts, Aug 2025–Apr 2026
- 12 proposals from the Google Drive "Proposals" and "Archive" folders, sampled across: Vibe Coding (Riverside 2025, Chung Cheng 2025, UAE Winter 2025), AI/corporate (Sojitz 2025, IMDA 2025, DGPC 2026), schools (Cedar Girls 2025, Yangzheng 2025, Dunman ALP 2026, Pathlight 2025), teacher training (Bedok Green 2023), and legacy (EDB 2016).
- 2 master templates (`Track Record for Tinkercademy Pri and Sec School Programmes`, `Tinkercademy Instructor Profiles`).

The exact exports are in `/tmp/prop_*.txt` and `/tmp/template_*.txt` for the duration of this review. See `.claude/skills/writing-style-review/SKILL.md` for how to reproduce.
