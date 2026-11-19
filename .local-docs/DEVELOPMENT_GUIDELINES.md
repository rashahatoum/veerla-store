# VEERLA — Development Guidelines

Last updated: 2026-11-19

## Workflow
- Explain approach + affected files → wait for owner approval → implement the whole agreed feature → verify → report (changed files, summary, 2–4 learning points, manual checks, docs updated).
- Before using any version-sensitive Next.js API, read `node_modules/next/dist/docs/`. Do not rely on memory of older Next.js versions (e.g. `middleware` is now `proxy`).
- No new dependency without owner approval.
- Never commit/push unless asked.

## Code conventions
- TypeScript strict; no `any`. Import alias `@/` → `src/`.
- Files: `kebab-case.tsx`; components `PascalCase`; hooks `useX`; one exported component per file when practical.
- Server Components by default. `'use client'` only on the smallest interactive island; document why in a one-line comment at the top.
- Prefer native HTML (forms, `<dialog>`, `popover`, `<details>`, radios) before JavaScript. Avoid `useEffect` for derived state.
- URL search params hold shareable state (filters, sort, page, selected color).
- UI never imports mocks; data goes through `lib/repositories`.
- Business/formatting logic lives in pure functions under `lib/domain`.

## i18n
- No hardcoded UI strings. Every label comes from `src/i18n/dictionaries/{ar,en}.json` (same keys in both).
- Use logical spacing/positioning utilities (`ms/me`, `ps/pe`, `inset-s/inset-e`, `text-start`) — never `ml/mr/left/right` for direction-dependent layout. (Tailwind 4.3 canonical names: `inset-s-*` instead of `start-*`.)
- Icons that imply direction (arrows, chevrons) flip in RTL.
- Numbers always Latin digits: format with `Intl.NumberFormat` using a Latin numbering system (`ar-u-nu-latn` / `en`).

## Money
- Never compute authoritative totals, profit or stock in the frontend. Display what the API returns.
- Money values are integers (USD cents, whole SYP). Never use floats for arithmetic; format only for display.
- Prices render both currencies; visibility is controlled by `<html data-currency>`.

## Styling
- Colors, fonts, radii only through theme tokens in `globals.css`. No raw hex in components.
- Mobile-first; verify at 360px.
- Respect `prefers-reduced-motion`.

## Accessibility
- Every interactive element reachable and operable by keyboard with visible focus.
- Icon-only buttons have accessible names (translated).
- Availability/state never conveyed by color alone.
- Images have meaningful `alt` (translated) or `alt=""` when decorative.

## Verification (every feature)
```
npm run lint
npx tsc --noEmit
npm run build
```
Manual: 360px mobile, desktop, `/ar` RTL and `/en` LTR, keyboard navigation, currency switch, plus feature-specific checks. Report failures truthfully.

Unit tests for `lib/domain` pure functions: test runner to be proposed when the first non-trivial pure function lands (needs approval as a dev dependency).

## Documentation
- Update `PROJECT_STATUS.md` after each feature.
- Anything that affects the API or business rules → update `BACKEND_REQUIREMENTS.md` + its Changelog in the same change.
- Only real owner decisions go in `DECISIONS.md`.
