# VEERLA — Frontend Architecture

Last updated: 2026-11-19 · Next.js 16.4 (App Router, Cache Components, Partial Prefetching, React 19.3, Tailwind CSS 4)

Status legend: **[APPROVED]** owner-approved · **[PLANNED]** part of the approved plan, not built yet.

## 1. System context [APPROVED]

```
Browser ──► Next.js (storefront + dashboard UI, server rendering, BFF)
                 │  server-to-server HTTP (JSON)
                 ▼
            Laravel REST API + MySQL  (source of truth: catalog, stock, orders, money, auth, images)
```

- Next.js owns UI, routing, i18n, rendering, caching and the BFF layer for dashboard auth.
- Laravel owns all business data and calculations. See `BACKEND_REQUIREMENTS.md`.
- Until Laravel exists, a **mock data source** implements the same repository interfaces.

## 2. Folder structure [PLANNED]

```
src/
  proxy.ts                     # locale redirect + optimistic dashboard auth check (no real security)
  app/
    [lang]/                    # root param: "ar" | "en"
      layout.tsx               # root layout: <html lang dir>, fonts, currency script
      (store)/                 # storefront route group (shared header/footer layout)
        layout.tsx
        page.tsx               # home
        products/page.tsx      # listing (searchParams: filters/sort/page)
        products/[slug]/page.tsx
        search/page.tsx
        cart/page.tsx
        checkout/page.tsx
      (dashboard)/dashboard/   # owner dashboard (noindex), own layout
    api/revalidate/route.ts    # webhook from Laravel → revalidateTag
  i18n/
    config.ts                  # locales, default locale, dir per locale
    dictionaries/ar.json, en.json
    get-dictionary.ts          # uses next/root-params `lang`
  components/
    ui/                        # stable primitives (Button, Chip, Dialog, FormField, EmptyState)
    commerce/                  # shared commerce pieces (ProductCard, Price, ColorSwatches, SizeOptions…)
  features/                    # feature-owned components: catalog/, product/, cart/, checkout/, dashboard/*
  lib/
    api/http-client.ts         # server-only fetch wrapper for Laravel (base URL, auth header, error mapping)
    repositories/              # interfaces + mock/ + http/ implementations
    domain/                    # pure functions: money formatting, WhatsApp message, Arabic normalization, variant helpers
  types/                       # DTOs mirroring BACKEND_REQUIREMENTS (Product, Variant, Price, Order…)
  mocks/                       # typed fixtures (uses public/assets/imgs/products/*)
public/assets/imgs/            # static brand + mock product images
```

Rules:
- UI never imports `mocks/` directly — only repositories do.
- A component moves from `features/` to `components/` on its **second real use**.
- `lib/domain/*` is pure (no React, no fetch) and unit-testable.

## 3. Internationalization [APPROVED: AR + EN]

- Sub-path routing: `/ar/...` (default, RTL) and `/en/...` (LTR). No i18n library — Next.js native pattern from `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`.
- `app/[lang]/layout.tsx` is the root layout and declares `generateStaticParams() → [{lang:'ar'},{lang:'en'}]` (required with Cache Components).
- Locale is read anywhere on the server via `import { lang } from 'next/root-params'` (Next ≥ 16.3) — no prop drilling, and `use cache` keys include it automatically. Not available in Client Components, Server Actions or Route Handlers: pass strings/locale as props or arguments there.
- `proxy.ts` redirects locale-less URLs to the saved `locale` cookie, otherwise `/ar`.
- Dictionaries are JSON loaded on the server only; Client Components receive just the strings they need as props.
- Translatable API content arrives as `{ ar, en }`; a helper picks the active locale with Arabic fallback.
- Layout uses CSS logical properties / Tailwind logical utilities (`ms-*`, `pe-*`, `start-*`, `text-start`) so the same markup works in RTL and LTR.

## 4. Currency display [APPROVED: default USD, switchable to SYP]

Goal: keep pages static/cached while each shopper sees their chosen currency.

- The API returns both prices (`usd`, `syp` already rounded). The server renders **both** values inside a `<Price>` component, each with a currency class.
- An inline script in `<head>` (pattern from the "preventing flash before hydration" guide) reads the saved choice from `localStorage` (`veerla:currency`) and sets `<html data-currency="usd|syp">` before first paint. CSS hides the inactive currency. Default `usd`. (The server never needs the choice, so `localStorage` is used instead of a cookie.)
- A tiny Client Component `CurrencySwitch` updates storage and the attribute (it reads the attribute via `useSyncExternalStore` + `MutationObserver`) — no re-render of the page, no server round trip.
- Trade-off: slightly larger HTML (two numbers per price) in exchange for fully cacheable pages and zero dynamic rendering for prices. Reading the cookie on the server instead would make every page dynamic.

## 5. Data access [PLANNED]

- `lib/repositories/catalog.ts` defines interfaces (e.g. `listProducts(query)`, `getProduct(slug)`, `getRelated(slug, opts)`).
- `DATA_SOURCE=mock|api` env selects the implementation. Mock implementation simulates filtering/sorting and returns the same DTOs.
- Catalog reads use `'use cache'` + `cacheLife(...)` + `cacheTag('products', 'product:<slug>')`. Laravel calls `/api/revalidate` → `revalidateTag(tag, 'max')`.
- Availability is short-lived; the final truth is always `/cart/validate` and order confirmation in Laravel.
- Errors from Laravel are mapped to typed errors with stable `code`s; UI shows translated messages.

## 6. Server / Client boundaries [APPROVED principles]

Server Components by default. Client islands only for real interactivity:

| Island | Why client |
|---|---|
| `AddToCartForm` (size radios + qty + button) | Needs cart state |
| `CartProvider` / `CartBadge` / `CartLines` | Cart persisted in `localStorage` (`[{variantId, qty}]` only — never prices) |
| `SearchAutocomplete` | Debounced suggestions, keyboard navigation (falls back to GET form) |
| `CurrencySwitch`, `LocaleSwitch` | Update cookie/attribute |
| `SortSelect` (optional) | Auto-submit; otherwise a plain form button |

Zero-JS by design: product gallery (CSS scroll-snap + anchors), color selection (`<Link>` to `?color=`), mobile filter sheet (`popover` attribute + `<form method="get">`), applied-filter chips (links). Providers wrap `children` so server content stays server-rendered.

## 7. Checkout flow [APPROVED rules]

1. Cart page validates lines through a Server Action → `POST /cart/validate` (prices/stock from the API, never from the browser).
2. Checkout form (customer info, fulfillment method, payment method — only enabled methods) → Server Action → `POST /checkout-intents`.
3. Response contains `reference` + WhatsApp text → shopper is sent to `https://wa.me/<number>?text=...`.
4. The intent is **pending**; nothing is sold or deducted until the owner confirms in the dashboard.

## 8. Dashboard & auth [PLANNED]

- Two areas: **Website management** (products, categories, images, variants, stock, exchange rate, settings) and **Accounting** (orders, marketers, purchase lots, expenses, capital, reports). All amounts in USD.
- BFF auth: login Server Action → Laravel Sanctum token → stored in httpOnly, Secure, SameSite=Lax cookie. Server code attaches it as Bearer. The browser never sees the token.
- `proxy.ts` only redirects anonymous users away from `/dashboard` (optimistic). Every Server Action re-checks the session, and Laravel enforces authorization on every endpoint.
- Dashboard pages: `robots: noindex`, not cached publicly.

## 9. Styling & brand [PLANNED]

- Tailwind v4 `@theme` tokens in `globals.css` (HOME_SPEC.md §2): plum 950–700, mauve, gold 500/300/700, nude, ivory, card, sale; radii. `--spacing: 1px`. Components never use hex values.
- Fonts via `next/font/google` in `src/app/fonts.ts`: Aref Ruqaa (Arabic headings), Cairo (body), Cormorant Garamond (English headings, accents), Cinzel (labels); roles mapped in `@theme inline` (`font-heading`, `font-sans`, `font-label`, `font-accent`). `font-heading` switches face per language via `--font-heading-face` (`:root:lang(en)`).
- Product listing `/[lang]/products` (`features/catalog/product-listing.tsx`): Partial Prerender — static shell, the listing reads `searchParams` (`sort`, `tag=offers`) inside `Suspense` with a same-shape skeleton; filters/sort are plain links (no client JS, shareable URLs); unknown params fall back to defaults.
- Product page `/[lang]/products/[slug]`: every slug prerendered via `generateStaticParams` (unknown slugs render on demand; missing ones call `notFound()` — with streaming that returns 200 + `noindex`). Server parts: `features/product/product-info.tsx` (header, details in native `<details>`, size guide in a native popover), `product-reviews.tsx`, related via shared `components/commerce/products-section.tsx`. The only client island is `product-purchase.tsx` (gallery, color/size radios, add-to-bag, mobile sticky bar); it reads `?color=` with `useSearchParams` inside `Suspense`, whose fallback is the same view with the first available color, so the prerendered HTML is complete. Variant availability logic is pure (`lib/domain/variants.ts`).
- Public store settings: `PublicSettings` (`src/types/settings.ts`) via `getPublicSettings()` (`lib/repositories/settings.ts`, cache tag `settings`) — WhatsApp number, social links, enabled payment/fulfillment methods, returns window. Used by `SiteFooter`; display helpers in `lib/domain/contact.ts`.
- Owner-managed home content: `HomeContent` (`src/types/content.ts`) via `getHomeContent()` (`lib/repositories/content.ts`, cache tag `home-content`).
- Motion in `src/styles/motion.css`, CSS only; `prefers-reduced-motion` stops everything. Home logo intro is gated by `<html data-intro>` (pending → play → seen) set by an inline script, so it waits for the logo images and plays once per tab.

## 10. Images [PLANNED]

- `next/image` everywhere with explicit `width/height` (from API) and `sizes`.
- Product photos 3:4 portrait. Mock images live in `public/assets/imgs/products/`; production images come from Laravel storage (add its host to `images.remotePatterns`).
- Laravel converts uploads to WebP; Next.js only optimizes delivery.

## 11. SEO & accessibility [PLANNED]

- `generateMetadata` per page with `alternates.languages` (ar/en) and canonical URLs; Product JSON-LD on product pages.
- Semantic HTML, visible focus, labelled icon buttons, color never the only signal (sold-out sizes have text), 360px mobile baseline.
