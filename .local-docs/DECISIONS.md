# VEERLA — Decisions

Only owner-approved decisions are recorded here. Proposals live in the relevant planning docs until approved.

## D-001 — Backend and database (approved 2026-11-19)

- Frontend: Next.js App Router + TypeScript + Tailwind CSS (storefront + private dashboard).
- Backend: separate Laravel REST API; database: MySQL.
- Laravel owns business data, authentication, inventory, order processing and all financial calculations.
- Next.js must not introduce its own database or a competing backend.
- Until the Laravel API is ready, the frontend uses typed mock repositories behind the same interfaces as the live API client.

Supersedes the "backend not decided" note in `CLAUDE.md` → Architecture and security.

## D-002 — Delivery order of work (approved 2026-11-19)

A separate developer builds the Laravel backend. The frontend (storefront + dashboard UI) is built first against mocks. `.local-docs/BACKEND_REQUIREMENTS.md` is the living handoff document for the backend developer and must be updated whenever a frontend decision affects the API.

## D-003 — Business rules answered by the owner (2026-11-19)

| Topic | Decision |
|---|---|
| Digits | Latin digits (123) everywhere. |
| Sizes | Letter (S/M/L) and numeric sizes may both exist, even on the same product. |
| Stock reservation | None at checkout intent. Stock is deducted only when the owner confirms the order. |
| Item cost | No fixed cost per product/variant; each purchase lot has its own cost. **FIFO by lot** (approved). |
| Marketer commission | Fixed amount **per piece**, set by the owner per marketer (not a percentage). |
| Delivery | No zone table. Per-method defaults in USD: pickup 0, home delivery 1.00, shipping 2.50 (estimate); owner can override manually on every order. Delivery cost paid to the company is recorded separately. |
| Currency | Prices set in USD; SYP (new redenominated pound) derived from an owner-updated USD→SYP rate, recalculated automatically and rounded to the nearest 10 new SYP. Rate snapshotted on every confirmed order. |
| Display currency | Default USD; shopper can switch to SYP. |
| Payment | No online payment. Shopper picks Sham Cash or cash on delivery/pickup on the site; the choice goes in the WhatsApp message. Owner can enable/disable each method. |
| Dashboard scope | Two jobs: (1) manage the website content (products, categories, images, stock, settings); (2) accounting (orders, marketers, costs, expenses, capital, profit). |
| Dashboard currency | Everything in the dashboard is in USD (prices, costs, expenses, commissions, delivery fees, reports). |
| Languages | Arabic + English from the start (Arabic default, RTL; English LTR). |
| Dashboard users | Single owner admin for now; marketer accounts possible later. |
| Images | 3:4 portrait direction agreed in principle; detailed image spec pending owner confirmation. |

## D-004 — Home page design (approved 2026-11-20)

- Home page follows `HOME_SPEC.md` + design-reference + owner screenshot notes; fonts and palette replaced accordingly (Amiri / IBM Plex Sans Arabic / Cinzel / Cormorant; plum–gold–nude tokens).
- Header nav: Products · Offers · Best sellers · New arrivals · About us; actions: language, currency, search, wishlist, bag. No customer-account icon (no customer accounts).
- Design copy that conflicts with business decisions is replaced: no "free shipping over X SAR", no installments, prices in USD/SYP only.
- "About us" is a section on the home page (`#about`), not a separate page.
- A compact "How your order works" section stays before the footer (WhatsApp ≠ confirmed order).
- Which home content the owner edits from the dashboard: to be agreed later. → Agreed in D-005.

## D-005 — Home revision: fonts, sections, owner-managed content (approved 2026-11-23)

- **Fonts:** Arabic headings Aref Ruqaa (hand-written Ruqaa); body/UI Cairo (both languages); English headings Cormorant Garamond; Cinzel stays for small Latin labels. Replaces Amiri / IBM Plex Sans Arabic.
- **Look:** pill buttons, 16px card radius, soft shadows and hover lift; reusable UI primitives in `src/components/ui/` (Button, IconButton, Card, SectionHeading).
- **Hero:** clicking the logo replays the whole intro. Background image is owner-managed.
- **Home sections, in order:** hero → values → Offers (grid) → Best sellers (slider) → New arrivals (slider) → About (`#about`) → How your order works → footer.
- **Owner-managed content (dashboard):** hero background; Offers, Best sellers and New arrivals are **hand-picked ordered lists** with on/off switches (Offers is hidden when off or empty); About text editable, owner's default text supplied.
- **Product layout:** sliders and grids show 2 whole cards per row on phones (more products per glance, consistent with the grid), 3 on tablets, 4 on desktop.
- **Offers rule:** per-product offer price in USD (SYP derived) with optional end date; storefront shows the old price struck through.
- **Removed from HOME_SPEC:** categories, gift section, Golden Feather collection, #veerla_at_home gallery, newsletter. Categories may return as filters/tabs on the products page.
- **Products page** (`/products`) lists all products; reads `?tag=offers` and `?sort=` from the nav links.
- **Customer reviews (approved 2026-11-23):** reviews belong to a product (rating 1–5 + text), can be written only for a confirmed order, and are published only after owner approval. The home page gets a "reviews" slider with owner-picked approved reviews, placed after "How your order works", reusing the shared `Carousel`.
