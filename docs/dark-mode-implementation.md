# Dark mode

## Product contract

One shared-header button toggles light/dark. It uses standard Lucide Moon (switch to dark) and Sun (switch to light) icons, with an action label and a 44px hit target. It remains visible outside mobile navigation and when search is disabled.

Use compact, component-scoped header actions with nonshrinking 44px theme/menu targets and reduce the logo width where necessary. Verify 320/375/390/809/810px widths with search enabled and disabled: the existing 195px logo and 24px gaps cannot simply accommodate another button.

Without a valid `tinkercademy-theme` localStorage value, follow the system preference and its changes. A click saves an explicit `light` or `dark` override, including an in-memory override if writing storage fails. Synchronise same-origin tabs; removing the key or clearing storage returns to system following. Storage failures must not break current-page toggling or let subsequent OS changes undo the click. There is no third state or settings menu.

Resolve the theme before paint in the shared layout. CSS supplies system-following colours only when `data-theme` is absent; hide the toggle until wired. Preserve native control styling through `color-scheme`. Scope dark overrides to screen media so print uses original light fallbacks, `color-scheme: light`, and the black site wordmark regardless of saved state. Empty custom-property values are not a valid reset; use undefined/guaranteed-invalid values if explicit resetting is necessary. No theme animation or image inversion.

## Colour contract

Preserve each existing light declaration as its `var()` fallback. Define the following overrides only in dark mode, so light-mode colours do not drift while multiple owners migrate styles. Apply the same overrides to explicit dark and system-dark without an explicit preference. Reset them for print.

| Token | Dark value | Use |
| --- | --- | --- |
| `--theme-page` | `#171719` | Main page background |
| `--theme-surface` | `#222225` | Raised cards, menus, forms |
| `--theme-surface-muted` | `#1c1c1f` | Alternating sections, recessed content |
| `--theme-heading` | `#f5f2ee` | Headings and strong text |
| `--theme-text` | `#d8d5d1` | Body text |
| `--theme-muted` | `#b6b1ac` | Supporting text and placeholders |
| `--theme-border` | `#3a3a40` | Decorative dividers and card edges |
| `--theme-control-border` | `#85818b` | Required input/control boundaries |
| `--theme-link` | `#ff8179` | Links, accent text and focus indicators |
| `--theme-hover` | `#303035` | Neutral interactive hover surface |
| `--theme-tint` | `#3a2628` | Coral-tinted selected/label surfaces |

Example: `color: var(--theme-muted, rgb(110, 110, 110))`.

Do not change `--accent-dark`: existing white-on-red buttons and audience badges rely on that darker red. Migrate text/link uses to `var(--theme-link, var(--accent-dark))`. Do not replace white foregrounds on photographic heroes or deliberate dark bands with body text tokens. Do not change image scrims, mask colours, mascot outlines or photographs. Review logos individually and use the existing white Tinkercademy wordmark; retain original partner colours with light backplates where required.

Additional local surface variables are appropriate only when a specific gradient or translucent overlay cannot use these roles without altering light mode. Keep exceptions scoped to their component, not global element overrides.

## Work ownership

All workers use low-mode orbs, perform their assigned work themselves and return files to the parent thread for integration. No push, merge or deployment is part of this request.

1. **Foundation:** `ContentLayout.astro`, `SiteHeader.astro`, `SiteFooter.astro`, theme-only script/style files and focused preference tests. Own the variables above, pre-paint state, global prose and header controls. Exercise system/override, invalid/blocked storage, cross-tab reset and no-JS behaviour.
2. **Reusable components:** `ProgrammeCard`, `CourseGrid`, `ContactForm`, `LogoCarouselSection`, `ProgrammeSeriesNav`, `HeroMedia`, `CtaBanner`, `HeroEmailAction`, `HomeProjectInfo`, `BannerLayers`, `articles/BlogNav`, `articles/ArticleEmbed`. Review intentional dark/art surfaces without gratuitous changes.
3. **Core pages:** `pages/index.astro`, `pages/[slug].astro`, `pages/programmes/[slug].astro`, `pages/professionals.astro`, `pages/schools.astro`, `pages/individuals.astro`. Own page-local logo handling, metadata and lower content.
4. **Remaining pages and prose:** other visual pages, `ContentBlocks`, `TutorialStory`, `RichContent`, `articles/ArticleLegacyBlock`. Include articles, tutorials, Build Log, contact/about/showcase and 404s. Inspect imported inline colour styling through renderer-scoped rules; do not rewrite legacy source data.

Workers must not edit another group's files. The parent integrates and resolves cross-group issues, checks all token names, and runs combined verification.

## Acceptance

- `pnpm run check`, `pnpm run build`, focused preference tests and existing relevant tests pass.
- Browser tests cover fresh system-light/dark, both toggle directions, reload/navigation, live system changes before/after override, invalid/blocked storage, same-origin tab updates/reset, no JavaScript, and print.
- Test visible button name/focus and header fit at narrow widths and around the desktop navigation breakpoint. Search-disabled pages still have the toggle.
- Inspect both themes on homepage, catalogue and programme detail, including lower content, filter selection, enquiry focus, search results and mobile menu. Inspect a long-form article and remaining page families for forced-white surfaces and unreadable assets.
- Measure text and required controls against WCAG AA, rather than relying on Painter. Normal text needs 4.5:1, large text 3:1, required control/focus graphics 3:1 against adjacent colours.
- Verify dev and built output. Keep light layout, colours, text, ordering and assets unchanged except the added toggle, required room for it, and demonstrated legibility fixes from the user's requested final page review.

## Review status

Independent review approved with required changes: [Astra High review](https://ampcode.com/threads/T-01a085b7-60f1-704c-899a-cd4765ef9427), `gpt-6-astra-high`, `openai/gpt-6-astra`, high reasoning, no extra features. Reviewer and parent share the same starting commit, `73969634b66b2a56c69fbca1c86a2331bcf7043a`.

Accepted required fixes: explicit narrow-header sizing and reliable print/light fallback including black wordmark. Incorporated above. Palette approved; control-border remains distinct from decorative borders. Preserve transparent diagram backings, recognisable partner logos and existing matched syntax-highlighting foreground/background colours. No design blocker or additional theme UI requested.

## Integrated verification and review fixes

Commands: `node --test scripts/tests/theme.test.mjs`, `node scripts/verify-theme.mjs <dev-or-preview-origin>`, `pnpm run check`, `pnpm run build`, `pnpm run test:medium`, `git diff --check`.

The browser harness verifies real persisted state, real same-origin storage events, invalid/blocked storage, system changes, computed page/header colours, 44px controls at seven widths, no-JS and print. It uses installed agent-browser plus CDP for print/script-failure emulation; no browser dependency was added to the site. Wait two animation frames after theme/viewport changes before reading computed styles or capturing screenshots.

Integration fixes include stable accessible home-link names across logo swaps, the existing `--text` alias following dark text, styled runtime-generated filter chips, and hidden programme cards actually disappearing in the no-results state. The final general-legibility review also corrected pre-existing light active-navigation contrast, showcase byline/read-more contrast, CTA-button white-text contrast (3.27:1 to 5.50:1), CTA wrapping at 320px and long programme prose-link wrapping at 375px without changing URL text or destinations. These are the intentional exceptions to preserving light values.

All 155 generated pages were scanned for graphics, with 911 unique referenced image assets. Only two decorative illustrations warranted removal trials. Both rembg cutouts and a Painter background-edit trial were rejected for fidelity loss or colour/texture changes. Original image bytes remain unchanged; the certificate and Code for Fun body illustrations receive explicit light media panels instead. Screenshots, diagrams, code syntax and partner branding are preserved.

Final independent Astra High verdict: **approved for dark-mode/general visual legibility**, with no outstanding material introduced theme issue. Coverage accounted for 153 content/error routes in both themes and two verified redirects: 306 desktop axe/DOM runs and full-page captures, plus 306 mobile DOM audits. All 153 dark pages were visually inspected through labelled contact sheets and enlarged suspect sections; light visual inspection focused on flagged sections. Dark automated contrast violations: zero. Five final affected routes passed both-theme targeted rechecks after the contrast, link-wrap and illustration-panel fixes.

Limits: 143 routes have automated contrast checks requiring manual review for gradients/images/overlap; this is not pixelwise WCAG certification. No Safari/real-device or every-route interaction audit was performed, and external iframe interiors were excluded. The 54 pre-existing unnamed links across 21 imported blog/tutorial routes remain separate accessibility debt. The complete route ledger and evidence are in `.amp/in/artifacts/dark-mode-route-coverage.md`, `dark-mode-route-coverage.json.gz` and `dark-mode-targeted-recheck.json`. Approval does not authorise deployment.

The final PR code review found a startup race distinct from the visual audit: OS/storage events before `DOMContentLoaded` were missed. The bootstrap now registers state listeners immediately and updates the button when available, keeping page state and action label together. Two new loading-state regressions failed against the original implementation and pass after the fix, covering OS changes and cross-tab set/invalid/remove/clear before readiness. The theme suite now has seven passing tests; the full check/build, existing 24 tests and dev/built browser harness also pass after the fix.
