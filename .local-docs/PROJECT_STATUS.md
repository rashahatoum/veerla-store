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

- Footer (D-006): `SiteFooter` reads `getPublicSettings()` (`src/types/settings.ts`, tag `settings`): social buttons, WhatsApp, returns window, enabled payment/fulfillment info lines, centered copyright + credit; `SiteSwitches` shared by header and mobile menu. Legacy theme aliases and the old text `Logo` removed.
- Mobile header: search / wishlist / bag at the start, logo centered (store pages), menu at the end; the menu sheet opens from the end side. Phones get a CSS announcement ticker.

- Product page (Phase 3, 80%): gallery per color (swipe on phones, 2-column grid on desktop), color in `?color=`, size radios with sold-out/low-stock states, size guide popover (sample chart), fit note, description / fabric & care / delivery-payment-returns accordions, product reviews with rating summary, related products slider, sticky add-to-bag bar on phones. "Add to bag" validates the size; adding to the cart comes in Phase 4.

- Real photos (2026-11-28): `crossover-hood-set` (navy 4, beige 5) and new `rose-set` (rose pink 5, white & gold 5), 1500×2000 WebP, organised as `public/assets/imgs/products/<product-slug>/<color-slug>-NN.<ext>`; old collages moved to the same layout. Color switching verified (URL, gallery, per-color stock). On desktop an odd-sized gallery lets the main photo span both columns.

## Next steps
1. Owner review of the product page; owner to send the real size chart (and photos for the remaining products).
2. Phase 4: cart + checkout + WhatsApp handoff.
3. Then catalog filters + search (Phases 2, 5), dashboard (6–8). Open questions in `BACKEND_REQUIREMENTS.md` §13 (returns details deferred by the owner).

## Known issues / notes
- `/[lang]/products/[slug]`, `/search`, `/wishlist`, `/cart` are not built yet (404).
- Hero "Discover gifts" links to `?category=gifts`; categories are not implemented yet, so it shows all products.
- Wishlist heart on product cards waits for the wishlist feature (no fake buttons).
- Product images are collages; fine for mocks, not for the final gallery.
- Mock exchange rate 150 SYP/USD is illustrative; mock reviews are placeholders, never real customers.
- Dev machine is a mechanical HDD: Turbopack dev FS cache disabled; verify visuals with `next build && next start`.
- Headless Chrome on Windows enforces a 500px minimum window; mobile checks use CDP device-metrics emulation.
