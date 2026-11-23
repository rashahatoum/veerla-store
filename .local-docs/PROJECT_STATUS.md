# VEERLA — Project Status

Last updated: 2026-11-23

## Current state — Home revision (D-005), step 1 of 3 done, awaiting owner review
- Foundation (Phase 1): `/ar` (RTL, default) + `/en`, JSON dictionaries, `proxy.ts`, dual-currency display (USD default), typed DTOs + mock repositories, Cache Components. `/ar` and `/en` prerender as static.
- Theme: single source in `src/app/globals.css` (`@theme`), 1px spacing unit, radius/shadow tokens. Fonts in `src/app/fonts.ts`: Aref Ruqaa (AR headings), Cairo (body), Cormorant (EN headings, accents), Cinzel (labels).
- Shared UI: `src/components/ui/` — `Button`/`ButtonLink`, `IconButton`/`IconLink`, `Card`, `SectionHeading`; `lib/cx.ts`.
- Header: velvet, glass round icon buttons, language/currency pills, popover mobile menu.
- Hero: feather-writes-logo intro (once per tab, `?intro` to force); **click the logo to replay**; background from `HomeContent.hero.background`.
- Owner-managed content: `src/types/content.ts` (`HomeContent`), `lib/repositories/content.ts` (`getHomeContent`, tag `home-content`), mock in `src/mocks/home-content.ts` (includes the owner's About text).
- New arrivals grid now renders the owner-picked list with the new `ProductCard` (Card + rounded image + whole-card link).

## Next steps
1. Step 2: shared `ProductCarousel` (CSS scroll-snap, RTL), Offers section (sale badge + struck price, hidden when off/empty), Best sellers section (rank badge); offer price fields in DTOs + mocks.
2. Step 3: About section, restyled How your order works, `/[lang]/products` listing page (sort + `?tag=offers`).
3. After: replace old BrandValues / footer, delete legacy theme aliases and `components/brand/logo.tsx`.
4. Pending owner confirmation: customer reviews (D-005, proposed).

## Known issues / notes
- Links to `/[lang]/products/...`, `/search`, `/wishlist`, `/cart` 404 until those pages exist.
- Wishlist heart on product cards waits for the wishlist feature (no fake buttons).
- Product images are collages; fine for mocks, not for the final gallery.
- Mock exchange rate 150 SYP/USD is illustrative.
- Dev machine is a mechanical HDD: Turbopack dev FS cache disabled; verify visuals with `next build && next start`.
- Headless Chrome on Windows enforces a 500px minimum window; mobile checks use CDP device-metrics emulation.
- Open owner questions (non-blocking): returns policy, hosting/domains, required checkout customer fields — `BACKEND_REQUIREMENTS.md` §13.
