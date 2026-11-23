# VEERLA — Project Status

Last updated: 2026-11-23

## Current state — Home revision (D-005), step 2 of 3 done, awaiting owner review
- Step 2: shared `Carousel` (`components/ui/carousel.tsx`, scroll-snap + RTL-aware prev/next island, 2 cards on phones), `ProductsSection` (`layout: "carousel" | "grid"`): Offers = grid (discount badge, struck regular price), Best sellers = slider (rank badges), New arrivals = slider; each hidden when off/empty. Equal-height cards with price pinned to the bottom. `ProductSummary.compare_at_price` + `discountPercent()`; mock offers on 2 products. Values strip moved to `nude-100` (no seam under the hero wave).

### Step 1
- Foundation (Phase 1): `/ar` (RTL, default) + `/en`, JSON dictionaries, `proxy.ts`, dual-currency display (USD default), typed DTOs + mock repositories, Cache Components. `/ar` and `/en` prerender as static.
- Theme: single source in `src/app/globals.css` (`@theme`), 1px spacing unit, radius/shadow tokens. Fonts in `src/app/fonts.ts`: Aref Ruqaa (AR headings), Cairo (body), Cormorant (EN headings, accents), Cinzel (labels).
- Shared UI: `src/components/ui/` — `Button`/`ButtonLink`, `IconButton`/`IconLink`, `Card`, `SectionHeading`; `lib/cx.ts`.
- Header: velvet, glass round icon buttons, language/currency pills, popover mobile menu.
- Hero: feather-writes-logo intro (once per tab, `?intro` to force); **click the logo to replay**; background from `HomeContent.hero.background`.
- Owner-managed content: `src/types/content.ts` (`HomeContent`), `lib/repositories/content.ts` (`getHomeContent`, tag `home-content`), mock in `src/mocks/home-content.ts` (includes the owner's About text).
- New arrivals grid now renders the owner-picked list with the new `ProductCard` (Card + rounded image + whole-card link).

## Next steps
1. Step 3: About section, restyled How your order works, customer reviews slider (mock approved reviews, reuses `Carousel`), `/[lang]/products` listing page (sort + `?tag=offers`).
3. After: replace old BrandValues / footer, delete legacy theme aliases and `components/brand/logo.tsx`.
3. Customer reviews on the product page come with the product detail page (Phase 3).

## Known issues / notes
- Links to `/[lang]/products/...`, `/search`, `/wishlist`, `/cart` 404 until those pages exist.
- Wishlist heart on product cards waits for the wishlist feature (no fake buttons).
- Product images are collages; fine for mocks, not for the final gallery.
- Mock exchange rate 150 SYP/USD is illustrative.
- Dev machine is a mechanical HDD: Turbopack dev FS cache disabled; verify visuals with `next build && next start`.
- Headless Chrome on Windows enforces a 500px minimum window; mobile checks use CDP device-metrics emulation.
- Open owner questions (non-blocking): returns policy, hosting/domains, required checkout customer fields — `BACKEND_REQUIREMENTS.md` §13.
