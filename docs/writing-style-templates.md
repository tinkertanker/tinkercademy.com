# Writing Style Templates

Reusable templates for Tinkercademy website copy, derived from observed patterns in the existing source pool (team bios, the better proposal leads, the current about-us). Each template:

- has a structural skeleton
- has one strong filled example taken from or adapted from real material
- names one common failure mode

Use alongside `writing-style-guide.md`. Don't invent from this; use it to reshape real material.

---

## 1. Homepage / landing-page intro

### Skeleton

```
Line 1 (≤20 words): What we do, plainly. Subject + verb + object.
Line 2 (≤25 words): Who we do it with + the specific credibility anchor.
(Optional) Line 3 (≤15 words): One small dry detail, or one concrete builder claim.
```

Rules:
- No adjective pile in Line 1. "We're coders and tinkerers…" good. "We deliver transformative…" dead on arrival.
- Line 2 names at least one: a year, a client, a partner, a number, a tool.
- Line 3 is optional. If there's no real detail, stop at Line 2.

### Strong example (adapted from current about-us + house rules)

> We're coders and tinkerers who teach coding and making to schools, companies, and the public in Singapore.
>
> We've been at it since 2011, with IMDA, Apple, Microsoft, and MOE schools — and we still build the apps and kits we teach with.

*Why it works: Line 1 is the best sentence already on the site. Line 2 swaps the current "unparalleled depth of experience" adjective-sentence for four named partners + a founding year + a concrete build claim. No Line 3 needed.*

### Common failure mode

Pivoting from the plain Line 1 into mission-statement cadence in Line 2:

> ❌ We're coders and tinkerers who teach coding and making. Our mission is to inspire delight and wonder with technology, by empowering every learner to unlock their potential.

This is what happens when the boilerplate "mission/vision" block gets pulled up into the web intro. Three banned words ("inspire delight and wonder", "empowering", "unlock") + mission-statement voice. Never do this on the web.

---

## 2. Programme / course blurb

### Skeleton

```
Lede paragraph (2–3 sentences):
  - S1: Context — why this topic matters now.
  - S2: What this programme is. One concrete sentence.
  - S3 (optional): Who it's for, if not obvious.

Action paragraph (1–2 sentences):
  - What participants do. Active verbs. Named tool or named deliverable.

Outcomes list (4–6 bullets):
  - Each bullet starts with an active verb: Build, Use, Apply, Customise, Reflect, Ship, Present, Test.

Fact row (1 line):
  - Level · Duration · Platform / devices · Named tools

Proof anchor (optional, 1 line):
  - Where it has run. Name the clients.
```

Rules:
- Never open with "In this exciting programme…". Start on the topic, not on the promotion.
- Tools are named in-line, not abstracted ("AI coding tools" → "Gemini, ChatGPT, Claude Code").
- If there is no real proof anchor, omit the line. Don't fill it with "trusted by many schools".

### Strong example (adapted from Riverside Vibe Coding 2025)

> **Vibe Coding Workshop**
>
> Generative AI is changing how people work across many fields. This workshop shows how vibe coding — directing AI to generate and adapt code — is one of the most practical ways to use a large language model for real. It gives students a working view of web development without asking them to memorise HTML first.
>
> Most of the session is hands-on. Students prototype their own web games and apps using Gemini and ChatGPT, and learn enough HTML, CSS, and JavaScript to stay in control of what the AI produces.
>
> By the end, participants will:
>
> - Build and run a simple interactive web app in HTML, CSS, and JavaScript.
> - Use an AI coding tool to generate, debug, and improve code.
> - Apply clear prompting to get usable code back.
> - Customise a working project with their own ideas.
> - Reflect on what vibe coding is good for, and where it still needs human judgement.
>
> **For:** Secondary 1 students, no prior coding required · **Duration:** 2 hours per class · **Platform:** CodePen + an AI coding assistant (Gemini, ChatGPT) · **Devices:** iPad with keyboard.
>
> Run with Riverside Secondary, TKGS Applied Coding, MGS Infocomm Club, and IMDA Bring Your Kids To Work Day.

*Why it works: directly adapted from real proposal prose, losing the procurement stiffness ("The session is highly hands-on") and the generic sign-offs. The proof line is real — those were the actual schools and clients in the "Our Experience" section of the Riverside proposal.*

### Common failure mode

Importing the full proposal "Our Experience" block verbatim:

> ❌ Our Experience: Although vibe coding is a new and fast-emerging approach, we have already introduced it in several contexts for both students and professionals: IMDA "Bring Your Kids to Work Day"…

The proposal form with "Our Experience:" headers and bullet-groups-per-audience is designed for a tender reader scanning for credibility. On the web, compress to one proof line. One clean sentence beats a three-level nested list.

---

## 3. Team bio

### Skeleton

```
Line 1 (credential appositive, no "is a"):
  [School/employer] [subject/focus] [optional honour/year] [and] [second credential].

Line 2 (responsibility verb + scope):
  [Verb]s [activity 1], [activity 2], [activity 3].  OR
  Works across [domain 1], [domain 2], and [domain 3].  OR
  Specialises in [named area].

Line 3 (optional ongoing-verb detail, one dry line):
  [Ongoing-verb] [specific behaviour]. Present tense.
```

Rules:
- Maximum three sentences, or two sentences + a tight tail clause.
- No adjective stacks. Zero "passionate", "dedicated", "talented", "skilled", "experienced".
- Maximum one exclamation mark per bio; reserve for a genuinely unexpected fact.
- Line 3 is optional. Shorter beats filler.

### Strong example (current, Yixue — already house voice)

> NTU Interactive Media grad (First Class Honours) with a background in animation and motion graphics. Works across video, carpentry, electronics, and digital making to build installations, custom kits, and hands-on learning experiences. Can (and will) build things for the office for no reason.

*Why it works: named school + subject + honour parenthetical (Line 1 pattern). "Works across" + four named crafts (Line 2). "For no reason" is the exact Tinkercademy deflation move (Line 3).*

### Strong example (current, Steven — pure two-line version)

> MIT grad in EECS, former PayPal senior engineer, IOI medallist from a lifetime ago. Leads special projects and product development for Tinkertanker, the parent company, building new ways to teach and learn coding and electronics.

*Why it works: three stacked credentials in Line 1, immediately deflated with "from a lifetime ago". Line 2 is the responsibility. No Line 3 needed — and the bio is stronger for it.*

### Common failure mode

Writing for a freelance-trainer PDF instead of the team grid:

> ❌ Win is a passionate and dedicated educator with extensive experience in automation, control systems, and firmware development. With over a decade of industry expertise, he brings deep technical expertise to the classroom and is committed to making complex concepts accessible for learners of all ages.

This is real freelance-trainer-profile cadence — six banned words in two sentences. Compare with the actual current bio for Win:

> ✅ MSc in Automation & Control (NUS), with 10 years in computer R&D and firmware. Comfortable across Arduino, Raspberry Pi, and ESP32, and previously mentored Myanmar's FIRST Global robotics team. Grudgingly fixes devices that students broke.

Same information, none of the adjective pile, one closing dry line. This is the house pattern.

---

## 4. Proposal overview (website-facing version)

This template is for the *public summary of a programme* on the website — the version a reader might see on a landing page linking to "For schools" or "For companies". The internal proposal document is a separate artefact and does need the tender formatting; don't confuse the two.

### Skeleton

```
Opening paragraph (3 sentences):
  - S1: The need / context / why a client would want this.
  - S2: What we offer, named plainly.
  - S3: How we tend to deliver it (named format + named tools).

Fit paragraph (1–2 sentences):
  - Who we've done this for before. Name clients or categories.
  - What the typical scope looks like (hours, sessions, audience size).

What you'd get (3–5 bullets):
  - Each bullet names a concrete deliverable or activity type.
  - No bullet starts with "A world-class…" or "Transformative…".

Closing line (optional):
  - One line that either sets up the next step (enquire, download sample) or
  - One line that admits where we're honestly not the right fit.
```

### Strong example (adapted from DGPC 2026 AI upskilling, converted to web voice)

> **AI upskilling for engineering teams**
>
> Your engineers already know how to build software. What they need now is a direct, production-focused bridge into machine learning, generative AI, and agentic workflows — without weeks of theory before anyone writes code.
>
> Our AI upskilling programme is a week-long intensive for working engineers. It's 70% coding, 30% instruction, built around deploying real mini-projects in Python, PyTorch, Hugging Face, LangGraph, and cloud compute. Teams leave with code they can point at, not slides they'll lose.
>
> We've run versions of this for Druk Green Power Corporation, Sojitz Asia, HDB, ISCA, SBF, and ASPIAL. Scope ranges from a 1-day intensive to a 5-day deep-dive, for 2–20 engineers.
>
> - Daily hands-on exercises deploying models, not just training them.
> - Each participant ships a working artefact — an API, an agent, or a small developer tool.
> - Pair programming with our trainers, who are building with these tools in their own work.
> - An end-of-week capstone that combines the week's concepts on a real problem.
>
> Tell us what your team already builds and we'll shape the week around it.

*Why it works: opens on the client's reality, not on the product. Names the specific stack. Names the specific past clients. Bullets are deliverables, not claims. Closing line invites a conversation without "unlock your team's potential".*

### Common failure mode

Starting with the company instead of the client's problem:

> ❌ At Tinkercademy, we are proud to offer world-class AI upskilling programmes for enterprise teams. Leveraging our unparalleled expertise in emerging technologies, we empower engineering organisations to unlock their innovation potential through a tailored, end-to-end learning journey.

This is the DGPC proposal refracted through every banned word in the guide. It names no client, no tool, no duration, no deliverable, no scope. Every sentence is about the seller. It reads like a thousand other consultancy landing pages. The good version above reads like the Tinkercademy team wrote it.

---

## Cross-template rule: the one-line test

Before publishing any block of copy, apply this test:

> Could this line appear on any other technology training company's website?

If yes, rewrite. The thing that makes Tinkercademy copy recognisable is specificity — named clients, named tools, specific deflation moves after credentials, one dry line per block. Generic lines fail the one-line test and should go.

---

## A final note on tone calibration

Three anchors from the source pool, which you can re-read if you're losing the register:

1. **Team bio benchmark** — `src/data/team.yaml`. Aim for this rhythm for anything personality-adjacent.
2. **Proposal lede benchmark** — Riverside Secondary Vibe Coding (Oct 2025), opening two paragraphs. Aim for this for programme blurbs.
3. **Opening-line benchmark** — the first line of the live `/about-us`: *"We're coders and tinkerers who teach coding and tinkering to schools, corporations, and the public in Singapore."* Aim for this density and plainness for any hero line.

If a draft matches one of these three benchmarks in rhythm, it's on-voice. If it reads like the "Our vision is…" paragraph or the "Tinkercademy comprises a team of dedicated education specialists from top universities worldwide" paragraph, it's off-voice, and rewriting beats polishing.
