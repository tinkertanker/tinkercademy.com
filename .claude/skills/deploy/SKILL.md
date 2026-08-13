---
name: deploy
description: Ship tinkercademy.com to production by tagging the commit that should go live. Use when the user says "deploy", "ship it", "go live", "promote", "push to prod", or similar. Pushes to main only upload a Worker version; a v* tag is what promotes it.
---

# Deploy Skill

Production for `tinkercademy.com` runs on a Cloudflare Worker with static assets.

- **Push to `main`:** Cloudflare Workers Builds runs `pnpm run build` then `npx wrangler versions upload`. That creates a new Worker version and does **not** route traffic to it.
- **Push a `v*` tag:** `.github/workflows/promote-production.yml` waits for the successful upload of that tagged commit, then promotes that exact version to 100% traffic.

Do not change the Cloudflare dashboard deploy command. It must stay `npx wrangler versions upload`. If it is ever changed to `npx wrangler deploy`, every push to `main` ships live.

## When to invoke

User phrasings that should trigger this flow:

- "deploy" / "ship it" / "ship this" / "go live" / "push to prod" / "promote"
- "roll out" / "release"
- "rollback" / "revert the last deploy" — same mechanism, different commit or version

Do **not** invoke for:

- "build" — happens automatically on push; just `git push`.
- "push" — they mean `git push`, not deploy.

When ambiguous (e.g. the user has local changes and says "deploy"), clarify: do they want you to commit+push first, then tag? Or tag what is already on `origin/main`?

## Preflight

1. **The commit you want live is on `origin/main`.** `git status` is clean and `git log origin/main..HEAD` is empty, or you have already pushed the intended commit. Tags on unpushed commits will not have a Workers Build.

2. **The commit actually triggers Workers Builds.** Build watch path excludes are `README.md`, `AGENTS.md`, `docs/**`, `.github/**`, `.claude/**`. A tag on a docs-only commit will fail the promote workflow on purpose rather than shipping some other version.

3. **GitHub repo secrets include `CLOUDFLARE_API_TOKEN`.** Create a **user-scoped** token at [My Profile → API Tokens](https://dash.cloudflare.com/profile/api-tokens) (account-owned tokens return "Invalid token" on the Workers Builds API) with **Workers Builds Configuration: Edit** and **Workers Scripts: Edit**. The "Edit Cloudflare Workers" template is not enough. Never commit the token. `CLOUDFLARE_ACCOUNT_ID` is already public in `wrangler.jsonc` (`b8b1032c61d9475cd00229c74db7ec72`) and is hardcoded in the workflow.

## Ship it

Tag the commit and push the tag. Date tags or semver both match `v*`:

```
git tag vYYYY.MM.DD
git push origin vYYYY.MM.DD
```

Examples: `v2026.08.14`, `v1.2.3`.

The Action then:

1. Takes `GITHUB_SHA` from the tagged commit.
2. Polls `GET /accounts/{account}/builds/workers/f71a28eda02e4d47922ba00cb262e3f7/builds` until that commit has a successful **main** upload (`status=stopped`, `outcome=success`; about 15–20 minutes timeout). A preview-branch upload of the same SHA is not promoted (it does not set `SITE_URL=https://tinkercademy.com`).
3. Resolves that build to a Worker version ID from the `wrangler versions upload` logs (`Worker Version ID: <uuid>`), verified against `GET /builds/builds?version_ids=`. It will not guess "latest version".
4. Runs `npx wrangler versions deploy <version-id>@100 --yes --message "Promote <tag> (<sha>)"`.

Watch the **Promote production** workflow on GitHub. Do not run `npx wrangler deploy` locally as a shortcut.

## Verify

Right after the Action succeeds:

1. `curl -sSI https://tinkercademy.com/` → `HTTP/2 200`.
2. `pnpm run smoke https://tinkercademy.com` → all-green.
3. Spot-check whatever changed in the tagged commit.

If any check fails, roll back immediately.

## Rollback

Either:

```
git tag vYYYY.MM.DD <old-commit>
git push origin vYYYY.MM.DD
```

The old commit must already contain `.github/workflows/promote-production.yml` (GitHub runs the workflow file from the tagged commit). For commits from before that workflow existed, promote by version ID instead:

```
pnpm run deploy:list
npx wrangler versions deploy <old-version-id>@100 --yes --message "Rollback to <id>"
```

Prefix those Wrangler commands with your local account-selection wrapper if your environment needs one.

## Manual promote (break-glass)

If the tag workflow cannot run (missing secret, GitHub Actions down) and the user still wants traffic moved:

```
npx wrangler versions deploy <version-id>@100 --yes --message "<why>"
```

Get the version ID from `pnpm run deploy:list` or from the Workers Builds log line `Worker Version ID:`. Confirm it belongs to the intended commit; the human listing does not show commit hashes.

## What NOT to do

- **Don't** run `npx wrangler deploy` (without `versions deploy`). That uploads-and-promotes from local `dist/` and bypasses the preview/promote split.
- **Don't** change the Cloudflare dashboard deploy command to `npx wrangler deploy`.
- **Don't** promote "the latest version" because a newer `main` push may have landed after the tag.
- **Don't** put `CLOUDFLARE_API_TOKEN` in the repo, in workflow YAML, or in commit messages.

## Config pointers

- Workflow: `.github/workflows/promote-production.yml` (tag promote). Leave `.github/workflows/deploy.yml` (GitHub Pages staging) alone.
- Resolver: `scripts/resolve-worker-version.mjs`.
- Wrangler config: `wrangler.jsonc` (Worker name, assets dir, custom domain routes).
- CI trigger config: Cloudflare dashboard → Workers → `tinkercademy-dot-com` → Settings → Builds. Production deploy command: `npx wrangler versions upload`.
- Full setup doc: `docs/deployment.md`.

## Adding build-skip path excludes — careful

Current excludes (Build watch paths): `README.md`, `AGENTS.md`, `docs/**`, `.github/**`, `.claude/**`. Commits that only touch those paths don't trigger CI at all.

If asked to add more excludes, verify the glob does not match anything that affects build output:

- **Never** use bare `*.md` — `src/content/programmes/*.md` drives programme pages and edits there must trigger a build.
- **Never** exclude `src/**`, `public/**`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `wrangler.jsonc`, or anything under `scripts/` that the build imports.
- Safe to exclude: root-level `.md` docs (listed by name), anything under `docs/`, `.github/`, `.claude/`, and the gitignored scratch dirs.
