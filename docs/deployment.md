# Deployment

Two-host setup from a single repo. The only environment-dependent value
is the `SITE_URL` env var (read by `astro.config.mjs`); everything else
is identical across builds.

## Environments

| Environment | Host | Platform | Triggered by | `SITE_URL` |
|---|---|---|---|---|
| Staging | `webstaging.tinkercademy.com` | GitHub Pages | Push to `main` (`.github/workflows/deploy.yml`) | *(unset → default)* |
| Production | `tinkercademy.com` | Cloudflare Workers (static assets) | Push to `main` uploads a version; a `v*` tag promotes it (`.github/workflows/promote-production.yml`) | `https://tinkercademy.com` |

### Why two platforms?

GitHub Pages only allows one custom domain per repo, which is owned by
`public/CNAME` (webstaging). Cloudflare Workers supports multiple custom
domains per project natively and gives us per-PR preview URLs, so it's
the right home for production.

Cloudflare announced in April 2025 that all new investment is going into
Workers rather than Pages; static-site hosting that used to live in Pages
is now served by a Worker with an `assets` binding. The repo ships a
`wrangler.jsonc` at the root that points the Worker at `./dist`. No
server-side adapter is needed — the site is 100% static.

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

## Cloudflare Workers: first-time setup

One-time steps done in the Cloudflare dashboard. Repo-level config
(`wrangler.jsonc`) is already in place and pins the Worker name to
`tinkercademy-dot-com`. Keep the dashboard's Worker name in sync with
that value — mismatches will either create a second Worker or fail.

1. **Create the Worker**
   - Dashboard → Workers & Pages → Create → Import a repository.
   - Pick the repo. Production branch: `main`.
   - Worker name: `tinkercademy-dot-com` (must match `wrangler.jsonc`).
   - Build command: `pnpm run build`
   - Deploy command: `npx wrangler versions upload` (upload-only; do **not** use `npx wrangler deploy`, or every push to `main` goes live).
   - Node version (Environment variable `NODE_VERSION`): `22`.

2. **Set the production env var**
   - Settings → Variables and Secrets → Production → add
     `SITE_URL=https://tinkercademy.com`.
   - *(Do not set it on Preview. Preview builds should default to the
     webstaging URL so they're treated as non-production and get
     `robots.txt: Disallow: /`.)*

3. **Add the custom domain**
   - Settings → Domains & Routes → Add → Custom domain →
     `tinkercademy.com`.
   - Cloudflare creates the DNS record (a special Workers custom-domain
     record type, not a conventional A/AAAA) in the zone automatically.
   - If the apex already has conflicting A/AAAA/CNAME records (e.g. left
     over from a previous host), the attach fails with "A DNS record for
     tinkercademy.com could not be added. Please try again later." —
     delete those apex records in DNS → Records first, then retry. The
     Workers Domains API has no override flag; the dashboard is just as
     strict. Expect a brief (few seconds) apex outage during the swap.

4. **DNS (apex, no www)**
   - If the zone is on Cloudflare, step 3 handles it.
   - Otherwise, at your DNS host, point the apex at the Worker's
     `<worker>.<account>.workers.dev` target via ALIAS / ANAME /
     CNAME-flattening. Plain `A` records to Cloudflare's anycast IPs
     (`162.159.140.98`, `172.66.0.96`) also work if your registrar
     doesn't support the above.

5. **Cloudflare proxy / SSL**
   - Cloudflare Workers handles SSL termination automatically. No manual
     cert provisioning, no grey-cloud dance.
   - If the zone has other settings: SSL/TLS mode should be **Full** or
     **Full (strict)**. Never **Flexible**.
   - SSL/TLS → Edge Certificates → toggle **Always Use HTTPS** to On.
     Without this, plain-HTTP requests to the apex return 200 instead of
     301-ing to HTTPS (HSTS only protects repeat visitors, not the first
     HTTP hit).

6. **www → apex redirect**
   - Workers static-assets `_redirects` does not support domain-level
     redirects (source must be a path, not a full URL), so `www` is
     handled at the zone level via a Single Redirect Rule.
   - DNS → Records → add (or repoint) a CNAME `www` → `tinkercademy.com`,
     proxied (orange cloud). The target doesn't really matter because
     Cloudflare intercepts before the origin is touched — but CNAMEing
     to the apex is tidy and makes the "redirect rule misfires" fallback
     land on the live site rather than a stale third party.
   - Rules → Overview → Create rule → Redirect Rule:
     - When incoming requests match: Wildcard pattern,
       Request URL = `http*://www.tinkercademy.com/*`
     - Then: Type = Static, URL = `https://tinkercademy.com/${1}`,
       Status = 301, Preserve query string = On.
     - Deploy.

## Going live (tag promote)

Pushes to `main` only upload a Worker version. To serve a commit on
`tinkercademy.com`, tag it and push the tag:

```
git tag vYYYY.MM.DD
git push origin vYYYY.MM.DD
```

`.github/workflows/promote-production.yml` waits for the Workers Builds
upload of that commit **on `main`**, resolves its Worker version ID, and runs
`npx wrangler versions deploy <id>@100`. It will not rebuild the site,
will not promote a preview-branch upload of the same SHA, and will not
guess "the latest version" if a newer `main` push has landed.

The workflow needs a `CLOUDFLARE_API_TOKEN` repository secret: a
**user-scoped** token from My Profile → API Tokens, with Workers Builds
Configuration: Edit and Workers Scripts: Edit. Account-owned tokens are
rejected by the Builds API; the Edit Cloudflare Workers template is not
enough. Do not put the token in the repo. `CLOUDFLARE_ACCOUNT_ID` is
already public in `wrangler.jsonc`.

Rollback: tag an older known-good commit (it must already contain the
promote workflow), or `npx wrangler versions deploy <old-id>@100 --yes`.

## GitHub Pages (staging) — already wired

No cutover action needed. `public/CNAME` stays `webstaging.tinkercademy.com`;
the existing workflow keeps pushing builds there. Staging is independent of
the production tag promote.

## Smoke-check

`scripts/smoke-check.mjs` hits `/robots.txt`, `/sitemap-index.xml`,
`/sitemap-0.xml`, favicons, and a sample of pages, asserting 200s and
expected content. Crucially, it checks that `robots.txt`'s
`Allow`/`Disallow` rule matches the hostname — catches the "prod build
deployed to staging URL" class of bug.

Run locally:

```
pnpm run smoke https://webstaging.tinkercademy.com
pnpm run smoke https://tinkercademy.com
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

For the Cloudflare Worker, add the same check as a deploy hook
(Settings → Deploy hooks / post-build scripts) pointing at
`https://tinkercademy.com` when convenient.

## Cutover checklist

When you're ready to go live:

- [ ] Create the Cloudflare Worker per "First-time setup" above.
- [ ] Wait for the first successful production build (check env vars
      in the build log show `SITE_URL=https://tinkercademy.com`).
- [ ] Hit the auto-generated `*.workers.dev` URL directly and spot-check.
- [ ] Run `pnpm run smoke https://<worker>.<account>.workers.dev` against
      the preview URL. (The hostname won't match prod regex, so the robots
      assertion will fail by design — ignore that line and review the rest.)
- [ ] Attach `tinkercademy.com` as a custom domain (delete any conflicting
      apex A/AAAA/CNAME records first — see step 3 above).
- [ ] Flip DNS (if not already on Cloudflare).
- [ ] Toggle SSL/TLS → Edge Certificates → Always Use HTTPS to On.
- [ ] Set up the `www` → apex Redirect Rule (step 6 above).
- [ ] Once cert is live: `pnpm run smoke https://tinkercademy.com` —
      should be all ✔.
- [ ] Submit the new sitemap in Google Search Console.
