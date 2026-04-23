---
name: deploy
description: Promote the latest Cloudflare Worker version to serve 100% of traffic on tinkercademy.com. Use when the user says "deploy", "ship it", "go live", "promote", "push to prod", or similar. Pushes to main build and upload a new version automatically; this skill is the explicit step that moves production traffic onto it.
---

# Deploy Skill

Production for `tinkercademy.com` runs on a Cloudflare Worker with static assets. The CI pipeline is set up as **upload-only**: every push to `main` runs `pnpm run build` and then `npx wrangler versions upload`, which creates a new Worker version but does **not** route traffic to it. Production keeps serving the previously-promoted version until someone explicitly promotes the new one.

This skill is the "explicitly promote" step.

## When to invoke

User phrasings that should trigger this flow:

- "deploy" / "ship it" / "ship this" / "go live" / "push to prod" / "promote"
- "roll out" / "release"
- "rollback" / "revert the last deploy" — same mechanism, different version picked

Do **not** invoke for:

- "build" — happens automatically on push; just `git push`.
- "push" — they mean `git push`, not deploy.

When ambiguous (e.g. the user has local changes and says "deploy"), clarify: do they want you to commit+push first, then promote? Or promote what's already in CI?

## Preflight

Before running the deploy, check:

1. **Local is pushed.** `git status` is clean and `git log origin/main..main` shows nothing. If the user has uncommitted or unpushed changes and meant them to go out, commit and push first. Builds won't include them otherwise.

2. **CI has finished building the target commit.** Either:
   - Check the Cloudflare dashboard: https://dash.cloudflare.com/b8b1032c61d9475cd00229c74db7ec72/workers/services/view/tinkercademy-dot-com/production/builds
   - Or, if a `CLOUDFLARE_API_TOKEN` with `Workers Builds Configuration: Read` is available, poll `GET /accounts/{account}/builds/workers/{worker_tag}/builds?page=1&per_page=1` and confirm the latest entry's `status=stopped` + `outcome=success` and `commit_hash` matches the tip of main.
   - If still building: wait, don't promote a stale version.

3. **(Optional) Smoke-check the preview.** Each uploaded version has its own preview URL. The workers.dev URL always points at the currently-*promoted* version, not the most recent upload — so don't confuse them. `pnpm run deploy:list` shows recent versions with their preview URLs.

## Promote

```
pnpm run deploy
```

This invokes `npx wrangler versions deploy`. It is **interactive**:

1. Wrangler lists recent versions.
2. User picks the one to promote. Default is usually fine (most recent).
3. User picks a traffic percentage. `100` for instant cut-over; lower for canary.
4. User confirms.

For fully non-interactive promotion (e.g. from another agent, CI, or a script):

```
npx wrangler versions deploy <version-id>@100 --yes --message "<why>"
```

Get the version ID from `pnpm run deploy:list` first.

## Verify

Right after promotion:

1. `curl -sSI https://tinkercademy.com/` → `HTTP/2 200`.
2. `pnpm run smoke https://tinkercademy.com` → all-green.
3. Spot-check whatever changed in the commit being deployed.

If any check fails, roll back immediately.

## Rollback

```
pnpm run deploy
```

Same command, pick an older version ID from the list. Promotion flips in seconds.

## What NOT to do

- **Don't** run `npx wrangler deploy` (without `versions deploy`). That's the old-world "upload and promote in one go" command; under our current trigger config it'd still work but would bypass the preview/promote split and surprise-ship whatever is in local `dist/`.
- **Don't** promote without checking CI finished. The version list only shows uploaded versions, but a stale version from before the latest push looks identical to a fresh one in the listing.
- **Don't** promote while the build is in progress. Wait for it.

## Config pointers

- Wrangler config: `wrangler.jsonc` (Worker name, assets dir, custom domain routes).
- CI trigger config: Cloudflare dashboard → Workers → `tinkercademy-dot-com` → Settings → Builds. The production trigger's deploy command is `npx wrangler versions upload` (upload-only). If it ever gets changed to `npx wrangler deploy`, the upload-then-promote workflow breaks and every push ships live.
- Full setup doc: `docs/deployment.md`.

## Adding build-skip path excludes — careful

Current excludes (Build watch paths): `README.md`, `AGENTS.md`, `docs/**`, `.github/**`, `.claude/**`. Commits that only touch those paths don't trigger CI at all.

If asked to add more excludes, verify the glob does not match anything that affects build output:

- **Never** use bare `*.md` — `src/content/programmes/*.md` drives programme pages and edits there must trigger a build.
- **Never** exclude `src/**`, `public/**`, `astro.config.mjs`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `wrangler.jsonc`, or anything under `scripts/` that the build imports.
- Safe to exclude: root-level `.md` docs (listed by name), anything under `docs/`, `.github/`, `.claude/`, and the gitignored scratch dirs.
