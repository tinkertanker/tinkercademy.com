# Deployment

Two-host setup from a single repo. The only environment-dependent value
is the `SITE_URL` env var (read by `astro.config.mjs`); everything else
is identical across builds.

## Environments

| Environment | Host | Platform | Triggered by | `SITE_URL` |
|---|---|---|---|---|
| Staging | `webstaging.tinkercademy.com` | GitHub Pages | Push to `main` (`.github/workflows/deploy.yml`) | *(unset → default)* |
| Production | `tinkercademy.com` | Cloudflare Pages | Git integration in Cloudflare | `https://tinkercademy.com` |

### Why two platforms?

GitHub Pages only allows one custom domain per repo, which is owned by
`public/CNAME` (webstaging). Cloudflare Pages supports multiple custom
domains per project natively and gives us per-PR preview URLs, so it's
the right home for production.

## What changes per environment (only)

`astro.config.mjs` reads `process.env.SITE_URL` and defaults to
`https://webstaging.tinkercademy.com`. The rest of the build is the same.
Four generated files differ between envs:

- `sitemap-index.xml` / `sitemap-0.xml` — hostnames
- `robots.txt` — `Allow: /` on production, `Disallow: /` on anything else
  (keeps staging out of Google's index)
- `/courses/` meta-refresh redirect canonical

Every other page hardcodes the production canonical, `og:url`, and
`og:image` base, so staging's HTML correctly tells crawlers "the real
version lives at tinkercademy.com" and shares on social resolve to
production URLs even from the staging preview.

## Cloudflare Pages: first-time setup

One-time steps done in the Cloudflare dashboard. Repo-level config is
already in place.

1. **Create the Pages project**
   - Dashboard → Workers & Pages → Create → Pages → Connect to Git.
   - Pick the repo. Production branch: `main`.
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version (Environment variable `NODE_VERSION`): `22`

2. **Set the production env var**
   - Settings → Environment variables → Production → add
     `SITE_URL=https://tinkercademy.com`.
   - *(Do not set it on Preview. Preview builds should default to the
     webstaging URL so they're treated as non-production and get
     `robots.txt: Disallow: /`.)*

3. **Add the custom domain**
   - Custom domains → Set up a custom domain → `tinkercademy.com`.
   - Cloudflare creates the DNS record (CNAME-flattened to the Pages
     project) in the zone automatically if the zone is on Cloudflare.

4. **DNS (apex, no www)**
   - If the zone is on Cloudflare, step 3 handles it.
   - Otherwise, at your DNS host, point the apex at the Pages project's
     target (`<project>.pages.dev`) via ALIAS / ANAME / CNAME-flattening.
     Plain `A` records to Cloudflare's anycast IPs (`162.159.140.98`,
     `172.66.0.96`) also work if your registrar doesn't support the above.

5. **Cloudflare proxy / SSL**
   - Cloudflare Pages handles SSL termination automatically. No manual
     cert provisioning, no grey-cloud dance.
   - If the zone has other settings: SSL/TLS mode should be **Full** or
     **Full (strict)**. Never **Flexible** (breaks Pages).

## GitHub Pages (staging) — already wired

No cutover action needed. `public/CNAME` stays `webstaging.tinkercademy.com`;
the existing workflow keeps pushing builds there.

## Smoke-check

`scripts/smoke-check.mjs` hits `/robots.txt`, `/sitemap-index.xml`,
`/sitemap-0.xml`, favicons, and a sample of pages, asserting 200s and
expected content. Crucially, it checks that `robots.txt`'s
`Allow`/`Disallow` rule matches the hostname — catches the "prod build
deployed to staging URL" class of bug.

Run locally:

```
npm run smoke https://webstaging.tinkercademy.com
npm run smoke https://tinkercademy.com
```

### Wiring smoke-check into GitHub Pages CI (manual one-time edit)

Add this job to `.github/workflows/deploy.yml` under the existing
`deploy:` job so every staging deploy is verified automatically:

```yaml
  smoke:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Smoke-check deployed site
        run: node scripts/smoke-check.mjs https://webstaging.tinkercademy.com
```

*(Kept out of this branch because the app credentials I'm committing
under can't touch `.github/workflows/*`. One hand-edit by you is enough.)*

For Cloudflare Pages, add the same check as a deploy hook (Settings →
Deploy hooks / post-build scripts) pointing at
`https://tinkercademy.com` when convenient.

## Cutover checklist

When you're ready to go live:

- [ ] Create the Cloudflare Pages project per "First-time setup" above.
- [ ] Wait for the first successful production build (check env vars
      in the build log show `SITE_URL=https://tinkercademy.com`).
- [ ] Hit the auto-generated `*.pages.dev` URL directly and spot-check.
- [ ] Run `npm run smoke https://<project>.pages.dev` against the
      preview URL. (The hostname won't match prod regex, so the robots
      assertion will fail by design — ignore that line and review the rest.)
- [ ] Attach `tinkercademy.com` as a custom domain.
- [ ] Flip DNS (if not already on Cloudflare).
- [ ] Once cert is live: `npm run smoke https://tinkercademy.com` —
      should be all ✔.
- [ ] Submit the new sitemap in Google Search Console.
