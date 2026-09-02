# Deployment

Two-host setup from a single repo. The only environment-dependent value
is the `SITE_URL` env var (read by `astro.config.mjs`); everything else
is identical across builds.

## Environments

| Environment | Host | Platform | Triggered by | `SITE_URL` |
|---|---|---|---|---|
| Staging | `webstaging.tinkercademy.com` | GitHub Pages | Push to `main` (`.github/workflows/deploy.yml`) | *(unset → default)* |
| Production | `tinkercademy.com` | Cloudflare Workers (static assets) | Push to `main` uploads a version; a `v*` tag promotes it (`.github/workflows/promote-production.yml`) | `https://tinkercademy.com` |
| Legacy Build Log redirects | `blog.tinkercademy.com` | Same production Worker | Temporary Worker Route, then explicit Custom Domain attachment after the apex blog is live | Same production build |

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

Worker versions and triggers are separate Cloudflare resources. Neither
`wrangler versions upload` nor `wrangler versions deploy` applies changes to
routes, Custom Domains, or cron triggers. Apply an intentional trigger change
separately with the dashboard/API or `wrangler triggers deploy`; never replace
the upload-only build command with `wrangler deploy`.

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

## Build Log hostname cutover

The canonical publication lives at `https://tinkercademy.com/blog/`. The same
Worker accepts `blog.tinkercademy.com` only to issue permanent redirects from
the historical Medium custom-domain URLs. `wrangler.jsonc` records the final
two-Custom-Domain topology. Version upload and promotion do not apply that
trigger configuration.

The hostname moves in two stages. A temporary exact-host Worker Route first
switches traffic while leaving Medium's proxied CNAME untouched. That proves the
redirect behavior on the real hostname and rolls back by deleting one route.
Afterward, the CNAME is replaced by the final Worker Custom Domain while the
temporary route remains as a bridge. The route is removed only after the Custom
Domain's DNS and certificate are independently ready.

### Preflight snapshot and stop gate

Before touching the `blog` hostname:

1. Run the repository gates:

   ```sh
   pnpm run test:medium
   pnpm run check
   SITE_URL=https://tinkercademy.com pnpm run build
   pnpm run verify:medium -- --dist dist
   ```

2. In an authenticated Cloudflare session, verify the account ID, active zone,
   Worker name, and least-required DNS/Workers permissions. Save an uncommitted
   timestamped rollback snapshot under `.amp/in/artifacts/` containing:
   - the complete active Worker deployment, including every version and traffic
     percentage, and a prior version that still exists and can be promoted;
   - all zone Worker Routes, Worker Custom Domains, and the existing apex
     mapping, including IDs;
   - the full mutable `blog` DNS record payload and current ID: name, type,
     content, proxied state, TTL, priority, settings, comment, and tags;
   - current edge/Advanced Certificate details, effective inherited CAA answers,
     and Medium's custom-domain state.
3. Treat DNS restoration as semantic restoration: Cloudflare assigns the
   recreated record a new ID. Prepare the exact restore and route/domain removal
   actions before mutation without saving credentials in the snapshot.
4. Stop if the account, zone, Worker, prior version, DNS record, route/domain
   inventory, certificate/CAA state, permissions, or rollback payload is missing
   or ambiguous. Keep this pre-promotion rollback snapshot immutable.
5. Create a separate expected-state ledger and action/result journal. Before
   each mutation, compare actual state field-for-field with its ledger phase:
   - **A — before promotion:** the immutable baseline;
   - **B — before route creation:** the exact promoted deployment at 100%, with
     routes, domains, DNS, certificates, and apex mapping still at baseline;
   - **C — before CNAME deletion:** phase B plus only the recorded bridge route;
   - **D — before Custom Domain attachment:** phase C with only the snapshotted
     CNAME absent;
   - **E — before bridge deletion:** the promoted deployment, recorded bridge,
     recorded Custom Domain and generated DNS, active recorded certificate, and
     unchanged apex mapping;
   - **F — final:** phase E with only the recorded bridge route absent.

   Record each requested mutation and provider result in the journal, then prove
   it produced only the transition declared above. Resolve newly assigned
   version, route, domain, DNS, and certificate IDs in the ledger; never rewrite
   the rollback snapshot. Any undeclared difference is a stop condition.

### Release and verify the apex blog

1. Push the reviewed `main` commit and wait for its upload-only Workers Build.
   Record the uploaded Worker version ID and prove it belongs to that exact
   commit, account, and `tinkercademy-dot-com` service.
2. Tag that exact commit with a unique `v*` tag. Confirm the promotion workflow
   deploys only the recorded version at 100% traffic.
3. Run both production gates before changing any `blog` trigger or DNS:

   ```sh
   pnpm run smoke https://tinkercademy.com
   pnpm run smoke:blog -- --apex-only
   ```

   The blog gate verifies all 72 canonical stories plus the bodies, byte sizes,
   MIME types, and SHA-256 hashes of all 412 local media files. On any failure,
   promote the snapshotted prior deployment at 100%, verify the apex, and stop.

### Switch traffic with a temporary route

The existing `blog` DNS record must be proxied. Leave that CNAME and Medium
unchanged. In Workers & Pages → `tinkercademy-dot-com` → Settings → Domains &
Routes, add only this Route:

```text
blog.tinkercademy.com/*
```

Omit a scheme so both HTTP and HTTPS match, and retain the trailing `*` so
query-bearing URLs match. Record the created route ID and prove the route maps
to `tinkercademy-dot-com` without changing the apex mapping. Do not put this
temporary route in `wrangler.jsonc`; do not run `wrangler deploy` or
`wrangler triggers deploy` during the cutover.

Run the full live-host gate:

```sh
pnpm run smoke:blog
```

It verifies HTTP-to-HTTPS, both slash forms and query preservation for all 72
legacy paths, discovery redirects, every canonical story, local media hashes,
attribution, rights notices, forbidden remote assets, and the intentional 404.
Also inspect Worker exceptions and 5xx responses. Any failure rolls back by
deleting only the recorded temporary route and verifying that the untouched
CNAME serves Medium.

### Convert to the final Custom Domain

1. Re-read DNS, routes, domains, deployment, certificate, and CAA state. Require
   field-for-field agreement with ledger phase C. Confirm effective CAA permits
   Cloudflare's current certificate authorities and that the exact rollback
   actions are ready.
2. In one authenticated change window, delete only the snapshotted `blog` CNAME
   by ID, verify ledger phase D, and immediately attach
   `blog.tinkercademy.com` as a Custom Domain of `tinkercademy-dot-com`. Keep the
   temporary route in place. Do not change code or the apex trigger.
3. Record the Custom Domain ID, Cloudflare-generated DNS record, and generated
   certificate ID. If attachment fails or usable public DNS is absent for 60
   seconds, execute DNS rollback rather than waiting interactively.
4. Before removing the temporary route, independently prove all of these:
   - the Cloudflare account maps exactly `blog.tinkercademy.com` to
     `tinkercademy-dot-com`;
   - the generated proxied DNS record exists and public DNS resolves;
   - HTTPS presents a valid certificate for the hostname and the recorded
     certificate is active;
   - HTTP permanently redirects to HTTPS.
5. A Worker Route takes precedence over a Custom Domain, so passing tests while
   it exists does not prove the final topology. Require ledger phase E, delete
   only the recorded bridge route by ID, then require ledger phase F and rerun
   `pnpm run smoke:blog` in full. This second pass is the Custom Domain proof.

### Rollback

The hostname, bridge route, and Worker version roll back independently:

- **Worker-wide regression:** promote the snapshotted prior deployment at 100%
  and verify provider state plus apex behavior. This affects every hostname and
  is not a substitute for hostname rollback.
- **Bridge failure:** delete only the recorded route, confirm it is absent, and
  verify that the unchanged CNAME serves Medium.
- **Custom Domain conversion failure:** detach only the recorded/partial `blog`
  Custom Domain if present; inspect rather than assume generated-DNS cleanup;
  remove only a remaining generated `blog` record if required; recreate the
  original CNAME from the full saved payload; and verify public DNS and TLS. Keep
  the bridge route if the desired temporary state is Worker-via-Route. Remove it
  only when returning users to Medium.
- **Post-route-removal failure:** re-add the exact bridge route only when the
  generated DNS/TLS state and Worker are known healthy; otherwise perform the
  full hostname rollback to Medium.

Cloudflare does not automatically delete the generated Advanced Certificate
when a Custom Domain is detached. Record that residual certificate during an
emergency rollback and remove it only in a later, separate cleanup after routing
is stable.

Keep the Medium publication/account unchanged for 30–90 days after cutover.
Retain the rollback snapshot through that window. Monitor DNS/TLS, Worker
exceptions and 5xx, redirect status, canonical destinations, and analytics.
Export Medium and decide how to treat potentially dead historical source links
before closing the publication or account.

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
