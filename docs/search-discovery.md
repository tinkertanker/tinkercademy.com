# Search and AI discovery

Implementation notes for [Ian Nuttall's May 2025 checklist](https://x.com/iannuttall/status/1922215138511487303). These are discoverability improvements, not a promise of ChatGPT citations or higher rankings.

## Coverage

| Recommendation | Site implementation / next action |
| --- | --- |
| Crawlable content | Astro generates full HTML. No SSR migration is needed: static HTML is also readable without JavaScript. Production's wildcard robots rule already allows OAI-SearchBot, ChatGPT-User and GPTBot; `/review/` remains excluded and staging remains disallowed. |
| Bing and sitemaps | Both main and blog sitemaps are advertised in robots.txt. IndexNow notifications run after successful tag-triggered production promotion. Bing Webmaster Tools verification still needs the site's account owner. |
| Structured data | Existing Organization, Course, BreadcrumbList and BlogPosting schemas are retained. Articles now emit Article; tutorials emit TechArticle. No FAQPage or HowTo markup is invented for content that does not have a corresponding structured Q&A or step model. |
| Basic SEO | Existing canonical URLs, descriptions, internal navigation and topic-specific course pages are retained. Imported article titles no longer produce a second hidden H1. Article/tutorial schema uses the full heading, not the shortened search title. |
| Freshness | Imported article publication dates now use `<time datetime>`. Existing blog dates remain authoritative, and the blog index sitemap date follows the most recently changed story rather than the most recently published story. No build-time dates or automatic current-year claims are added. |
| Mentions and backlinks | Requires real outreach and permission to publish externally; see the editorial actions below. |
| Original data | Requires a verified dataset or documented results. Do not invent enrolment, conversion, satisfaction or learning-outcome statistics. |
| Long-tail pages | Existing programme pages already describe specific tools, audiences and outcomes. Expand them for real enquiries before creating additional pages; do not publish combinations of filter parameters as thin landing pages. |
| Buying and support information | Existing `/schools/`, `/professionals/`, programme pages and `/contact-us/` cover audiences, delivery and enquiries. Add prices, prerequisites or support promises only after the business confirms them. A duplicate support page is not needed solely to target a crawler. |
| External platforms | Use genuine, attributed articles and helpful community contributions with affiliation disclosure, not planted endorsements or link schemes. The Build Log already preserves links to original Medium stories. External publishing is not automated. |

[OpenAI's bot documentation](https://platform.openai.com/docs/bots) distinguishes OAI-SearchBot (search) from GPTBot (training). Allowing training is not required for search eligibility. Robots rules also cannot prove that Cloudflare bot protection allows requests; check WAF/security events if crawler failures are reported.

## IndexNow

The root-level `public/4e5d5df66f220bb32ff72319717fd454.txt` file is the publicly served ownership proof, not a Cloudflare credential. The script and file must be deployed together.

```sh
# Read live production sitemaps and print the URL batch; does not submit.
node scripts/indexnow.mjs

# Inspect specific URLs, including removed URLs absent from the sitemap.
node scripts/indexnow.mjs https://tinkercademy.com/programmes/mastering-the-web/

# Only after deployment, with permission to notify the search service:
node scripts/indexnow.mjs --submit
node scripts/indexnow.mjs --submit https://tinkercademy.com/removed-page/
```

The promotion workflow submits the current sitemap inventory once per release (151 URLs at implementation), not on every build or on a recurring schedule. It does not maintain a changed-content inventory; removed URLs require the explicit-URL command. Both sitemaps are traversed, URLs are deduplicated, and non-production origins, review paths and query/fragment URLs are rejected. Before POSTing, the script checks that the live ownership file matches this checkout. HTTP 200 and 202 mean received/pending validation, not indexed. See the [IndexNow protocol](https://www.indexnow.org/documentation).

Notification failure produces a workflow warning and does not roll back a successful promotion. Inspect the log, fix missing keys or rejected URLs, or wait before retrying a 429. Do not redeploy merely to retry a notification. Rolling back to a commit predating these files also removes this integration.

## Account-owner setup

1. In [Bing Webmaster Tools](https://www.bing.com/webmasters/), add or select `https://tinkercademy.com/`. Use an existing verified Search Console property if available, or Bing's offered verification method. Do not create a guessed verification token in the repo.
2. Submit `https://tinkercademy.com/sitemap-index.xml` and `https://tinkercademy.com/blog/sitemap.xml`.
3. Inspect the home page, one programme, one article and one tutorial for indexing/crawl errors. Check IndexNow receipt after the next release. Do not treat receipt as proof that a URL ranks.
4. Track Bing impressions/clicks and GA4 referral traffic from ChatGPT over time. Compare qualified enquiries as well as visits; the post's traffic and conversion numbers are not benchmarks for this site.

## Editorial actions requiring real inputs

- Use actual school and corporate enquiries to identify missing information on existing programme pages: intended learners, prerequisites, equipment, duration, delivery location, take-home work and how quotations are priced. Get confirmation before publishing new claims.
- Turn an approved programme report into a case study: audience and sample size, dates, what was measured, method, limitations, and results. Obtain client permission and anonymise participant data.
- Offer relevant expert quotes and programme evidence to education/technology journalists and partners. Draft an attributed article or useful Reddit answer only for a relevant opportunity; agree on the destination and copy before posting.
- Update publication/modification dates only for genuine editorial changes. For new FAQ or how-to content, render the answers/steps visibly and generate schema from that same source. Do not maintain schema-only answers.

## Local verification

```sh
SITE_URL=https://tinkercademy.com pnpm run build
node --test scripts/tests/seo.test.mjs scripts/tests/indexnow.test.mjs
pnpm run check
```

The SEO tests inspect built HTML for all imported articles/tutorials, date consistency, and production robots/sitemap signals. IndexNow tests mock network requests, including rejection paths; they never notify a real search engine. Use a normal staging build separately to verify `Disallow: /` is preserved. A local build does not validate Bing ownership, Cloudflare WAF rules, ranking or live IndexNow acceptance.
