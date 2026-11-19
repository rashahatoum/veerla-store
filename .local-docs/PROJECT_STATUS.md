# VEERLA — Project Status

Last updated: 2026-11-19

## Current state — Phase 1 (Foundation) implemented, awaiting owner review
- i18n: `/ar` (default, RTL) and `/en` (LTR) via `src/app/[lang]` root layout + `next/root-params`; JSON dictionaries in `src/i18n/dictionaries`; `src/proxy.ts` redirects locale-less URLs (cookie → default `ar`).
- Brand tokens in `src/app/globals.css` (`@theme`), fonts Tajawal + Marcellus via `next/font`.
- Display currency: both USD and SYP server-rendered; `<html data-currency>` set before paint from `localStorage` (`veerla:currency`), default USD; `CurrencySwitch` client island.
- Data: DTO types (`src/types/catalog.ts`), `CatalogSource` interface, mock source + 4 mock lounge sets, cached `listProducts` (`use cache` + `cacheTag('products')`).
- Home page: trust bar, header (logo wordmark, locale + currency switches), hero, brand values, new arrivals grid (ProductCard), how-to-order steps, footer.
- `/ar` and `/en` prerender as static. lint / tsc / build pass. Visually checked at 360px (AR + EN) and 1280px (AR).

## In progress — Home page per HOME_SPEC.md (step 1 of the home rebuild)
- Done, awaiting owner review: new fonts + palette tokens, `styles/motion.css`, velvet `SiteHeader` (announcement bar, nav, language/currency, search/wishlist/bag, popover mobile menu, logo hidden on home), `VelvetHero` with `LogoIntro` (feather writes the logo, once per session), `HeroEffects` client island (pointer light, off-screen pause), `SilkWave`.
- Home moved to `app/[lang]/(home)`; `(store)` layout kept for other pages.
- Next (after review): values → categories → products → gifts → golden feather → #veerla_at_home → about → how-to-order (compact) → newsletter → footer.

## Next task
Owner review of the header + hero.

## Known issues / notes
- Product card and header nav links point to routes not built yet (`/[lang]/products/...`) → 404 until Phases 2–3.
- Product images are collages (front/back/details in one frame); fine for mocks, not for the final gallery.
- Logo is a text wordmark until the official logo file (SVG preferred) is provided.
- Mock exchange rate 150 SYP/USD is illustrative.
- Headless Chrome on Windows enforces a 500px minimum viewport; mobile screenshots are taken inside a 360px iframe.
- Open owner questions (non-blocking): returns policy, hosting/domains, required checkout customer fields — see `BACKEND_REQUIREMENTS.md` §13.
