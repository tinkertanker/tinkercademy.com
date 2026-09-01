# Build Log authoring

The Build Log is an Astro content collection served under
`https://tinkercademy.com/blog/`. New work is authored in this repository;
Medium is not a publishing dependency.

## Add a story

Create `src/content/blog/authored/<slug>.md`. The public URL is
`/blog/<publication-year>/<slug>/`. Choose the slug once and keep it stable even
if the headline later changes; the content schema rejects canonical drift.

```md
---
title: A practical story title
subtitle: A short optional introduction
description: A specific search and social description.
slug: a-practical-story-title
canonicalUrl: https://tinkercademy.com/blog/2026/a-practical-story-title/
author:
  id: jane-example
  name: Jane Example
  profileUrl: https://tinkercademy.com/about-us/
publishedAt: 2026-08-29T00:00:00.000Z
tags:
  - name: Education
    slug: education
license: All rights reserved
rightsStatus: author-owned
heroImage: /blog-media/a-practical-story-title.jpg
heroAlt: A student testing a cardboard microcontroller enclosure.
heroAltDecision: meaningful
---

Write ordinary Markdown here.
```

Use `rightsStatus: permission-recorded` when the author or rights holder has
given Tinkertanker permission but retains ownership. Use
`organisation-owned` only when ownership is documented. `review-required` is a
migration hold and fails the strict release verifier.

All stories display “All rights reserved”. This describes the publication
licence; it does not transfer a contributor's copyright to Tinkertanker.

## Images and animation

Put owned or permitted files under `public/blog-media/`. Use a useful filename
for new work and standard Markdown image syntax:

```md
![A micro:bit connected to a cardboard arcade controller.](/blog-media/cardboard-controller.jpg)
```

Every image needs an explicit decision:

- Meaningful image: write concise, specific alt text.
- Decorative image: use empty alt text, `![](...)`, only when the adjacent text
  already conveys everything the image contributes.

Captions and credits are separate from alt text. Put them immediately after the
image as prose or emphasis. Preserve animation when it communicates behavior;
do not replace an animated file with a flattened frame.

Do not hotlink Medium, Embedly, social-network, or other third-party media. Do
not add tracking pixels. Record the source, permission, and checksum for
third-party media in the editorial record before committing it.

## MDX and rich embeds

Use `.md` by default. Use `.mdx` only when a typed component is genuinely
needed. The migration's allowlisted embed component deliberately renders a
labelled link instead of loading third-party scripts or cookies:

```mdx
---
# the same frontmatter fields as Markdown
---

import ArticleEmbed from '../../../components/articles/ArticleEmbed.astro';

<ArticleEmbed
  provider="youtube"
  href="https://www.youtube.com/watch?v=example"
  title="Workshop demonstration"
/>
```

Allowed providers are YouTube, GitHub Gist, Giphy, X/Twitter, and Instagram.
Never paste raw iframes or provider scripts into a story.

## Check before review

```sh
pnpm run check
SITE_URL=https://tinkercademy.com pnpm run build
pnpm run verify:medium -- --dist dist --allow-review-required
```

The final command's temporary exception applies only to unresolved imported
Medium content. A production cutover requires the strict command without
`--allow-review-required` to pass.

Files under `src/content/blog/medium/` are deterministic importer output. Do not
hand-edit them: fix the importer or the reviewed migration metadata, then rerun
`pnpm run import:medium -- --offline`.
