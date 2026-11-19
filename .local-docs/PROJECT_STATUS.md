# VEERLA — Project Status

Last updated: 2026-11-19

## Current state — Phase 1 (Foundation) implemented, awaiting owner review
- i18n: `/ar` (default, RTL) and `/en` (LTR) via `src/app/[lang]` root layout + `next/root-params`; JSON dictionaries in `src/i18n/dictionaries`; `src/proxy.ts` redirects locale-less URLs (cookie → default `ar`).
- Brand tokens in `src/app/globals.css` (`@theme`), fonts Tajawal + Marcellus via `next/font`.
- Display currency: both USD and SYP server-rendered; `<html data-currency>` set before paint from `localStorage` (`veerla:currency`), default USD; `CurrencySwitch` client island.
- Data: DTO types (`src/types/catalog.ts`), `CatalogSource` interface, mock source + 4 mock lounge sets, cached `listProducts` (`use cache` + `cacheTag('products')`).
- Home page: trust bar, header (logo wordmark, locale + currency switches), hero, brand values, new arrivals grid (ProductCard), how-to-order steps, footer.
- `/ar` and `/en` prerender as static. lint / tsc / build pass. Visually checked at 360px (AR + EN) and 1280px (AR).

## Next task
Owner review of Phase 1 → Phase 2 (Catalog listing + filters).

## Known issues / notes
- Product card and header nav links point to routes not built yet (`/[lang]/products/...`) → 404 until Phases 2–3.
- Product images are collages (front/back/details in one frame); fine for mocks, not for the final gallery.
- Logo is a text wordmark until the official logo file (SVG preferred) is provided.
- Mock exchange rate 150 SYP/USD is illustrative.
- Headless Chrome on Windows enforces a 500px minimum viewport; mobile screenshots are taken inside a 360px iframe.
- Open owner questions (non-blocking): returns policy, hosting/domains, required checkout customer fields — see `BACKEND_REQUIREMENTS.md` §13.
