# VEERLA — Project Status

Last updated: 2026-11-23

## Current state — Home revision (D-005) steps 1–3 done, awaiting owner review
- Foundation (Phase 1): `/ar` (RTL, default) + `/en`, JSON dictionaries, `proxy.ts`, dual-currency display (USD default), typed DTOs + mock repositories, Cache Components.
- Theme: single source in `src/app/globals.css`, 1px spacing, radius/shadow tokens. Fonts (`src/app/fonts.ts`): Aref Ruqaa (AR headings), Cairo (body), Cormorant (EN headings, accents), Cinzel (labels).
- Shared UI (`src/components/ui/`): `Button`/`ButtonLink`, `IconButton`/`IconLink`, `Card`, `SectionHeading`, `Carousel` (scroll-snap, RTL-aware arrows, 2 cards on phones).
- Home (`/[lang]`, static), in order:
  1. Velvet header + hero (feather writes the logo; click logo to replay; owner-managed background).
  2. Values strip.
  3. Offers — grid, discount badge + struck price (hidden when off/empty).
  4. Best sellers — slider with `#rank` chips.
  5. New arrivals — slider.
  6. About (`#about`) — owner-managed text on silk/velvet with the gold feather.
  7. How your order works — 3 cards.
  8. Customer reviews — slider of owner-picked approved reviews (mock = labelled placeholders).
- Owner-managed content: `HomeContent` (`src/types/content.ts`) via `getHomeContent()` (tag `home-content`), mock in `src/mocks/home-content.ts`.
- Products page `/[lang]/products` (Partial Prerender: static shell, listing streams in Suspense): all products or `?tag=offers`, sort chips (`newest`, `best_selling`, `price_asc`, `price_desc`) as plain links, empty state, skeleton.

## Next steps
1. Owner review of step 3.
2. New footer (replace the Phase 1 footer), then delete legacy theme aliases and `components/brand/logo.tsx`.
3. Product detail page (gallery per color, sizes, reviews), cart, checkout → WhatsApp (Phases 3–5).
4. Agree the image spec; open questions in `BACKEND_REQUIREMENTS.md` §13.

## Known issues / notes
- `/[lang]/products/[slug]`, `/search`, `/wishlist`, `/cart` are not built yet (404).
- Hero "Discover gifts" links to `?category=gifts`; categories are not implemented yet, so it shows all products.
- Wishlist heart on product cards waits for the wishlist feature (no fake buttons).
- Product images are collages; fine for mocks, not for the final gallery.
- Mock exchange rate 150 SYP/USD is illustrative; mock reviews are placeholders, never real customers.
- Dev machine is a mechanical HDD: Turbopack dev FS cache disabled; verify visuals with `next build && next start`.
- Headless Chrome on Windows enforces a 500px minimum window; mobile checks use CDP device-metrics emulation.
