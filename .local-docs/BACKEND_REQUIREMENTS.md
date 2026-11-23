# VEERLA — Backend Requirements (Laravel REST API)

> **Living document.** Owned by the frontend team, read by the backend developer.
> Every change is logged in the [Changelog](#changelog) at the bottom. Check it before each work session.

Last updated: 2026-11-19

## How to read this document

Each requirement is tagged:

| Tag | Meaning |
|---|---|
| **[CONFIRMED]** | Approved by the owner. Build it. |
| **[PROPOSED]** | Frontend proposal. Backend developer may suggest changes — discuss before building differently. |
| **[OPEN]** | Waiting for an owner decision. Do not build yet. |

When the backend developer implements or changes an endpoint, the final shape goes to `.local-docs/API-CONTRACT.md` (confirmed contracts only). This file is the *requirements*; `API-CONTRACT.md` is the *agreed truth*.

---

## 1. System overview

- **[CONFIRMED]** Two applications:
  - **Next.js app** — public storefront + private owner dashboard (UI only).
  - **Laravel REST API + MySQL** — the single source of truth for all business data, authentication, inventory, orders and financial calculations.
- **[CONFIRMED]** Next.js does not have its own database. It never calculates authoritative prices, stock or profit.
- **[CONFIRMED]** The frontend is being built first against typed mock data that follows this document. The closer the API matches, the cheaper the switch.
- **[CONFIRMED]** One admin user (the owner) at launch. Design auth/roles so marketer accounts can be added later without restructuring (e.g. a `role` column), but do not build marketer login now.

## 2. General API conventions [PROPOSED]

- Base path: `/api/v1`. JSON only. `snake_case` keys.
- **Money:** integers in minor units + currency code, never floats.
  ```json
  { "amount": 2500, "currency": "USD" }
  ```
  Use `DECIMAL`/integer columns in MySQL, never `FLOAT`/`DOUBLE`. Dual-currency rules: see §4 "Currency".
- **Numbers** are displayed with Latin digits (123) **[CONFIRMED]** — formatting is the frontend's job; the API returns raw numbers.
- **Dates:** ISO 8601 in UTC (`2026-11-19T18:30:00Z`).
- **Bilingual content [CONFIRMED: Arabic + English from day one]:** translatable fields are returned as objects:
  ```json
  { "name": { "ar": "طقم نوار المذهّب", "en": "Noir Gilded Set" } }
  ```
  Both languages in one response (simpler caching). Arabic is required; English may be `null` until filled.
- **Pagination:**
  ```json
  { "data": [ ... ], "meta": { "page": 1, "per_page": 24, "total": 87, "last_page": 4 } }
  ```
- **Errors:** consistent shape; Laravel validation errors keep the standard `errors` map.
  ```json
  { "message": "Human readable", "code": "VARIANT_OUT_OF_STOCK", "errors": { "field": ["..."] } }
  ```
  Use stable machine `code` values — the frontend translates them.
- **IDs:** public URLs use `slug`; internal references use numeric `id` (or ULID — backend's choice, keep it consistent).

## 3. Authentication & security

- **[PROPOSED]** Laravel Sanctum **API tokens**. Next.js server stores the token in an httpOnly cookie and calls Laravel with `Authorization: Bearer`. The browser never talks to admin endpoints directly.
  - This works whether or not both apps share a parent domain. Final choice depends on hosting (§13).
- **[CONFIRMED]** Every `/admin/*` endpoint requires auth and authorization server-side. Hidden URLs are not security.
- Rate-limit login and public write endpoints (`/checkout-intents`).
- Validate every input server-side; never trust prices, totals or stock sent by the client.
- Secrets in `.env` only.

## 4. Data model [PROPOSED unless marked]

Column names are suggestions; relationships and rules are the requirement.

### Currency [CONFIRMED: SYP + USD]
- Selling prices are **set in USD** by the owner. Prices in Syrian pounds (SYP) are **derived** from a USD→SYP exchange rate that the owner updates manually from the dashboard; when the rate changes, all SYP prices change automatically.
- **exchange_rates** — append-only history: `id, usd_to_syp, set_by, created_at`. The latest row is the current rate. Never overwrite old rows (needed for historical reports).
- **[CONFIRMED]** SYP means the **new redenominated Syrian pound** (Jan 2026, two zeros removed). Currency code `SYP`; minor units are not used for SYP (store whole pounds).
- **[CONFIRMED]** Derived SYP prices are **rounded to the nearest 10 new SYP** (= 1,000 old). Make the step a setting (`syp_rounding_step`, default `10`). Round each unit price, then multiply by quantity (line totals must equal the sum of displayed unit prices).
- **[CONFIRMED]** The **dashboard works entirely in USD**: selling prices, purchase lot costs, expenses, capital, commissions, delivery fees and reports. SYP exists only for shopper display and in order snapshots.
- **[CONFIRMED]** The shopper chooses the display currency in the storefront; **default is USD**, switchable to SYP. The choice is a frontend concern. The API always returns both:
  ```json
  { "price": { "usd": { "amount": 2500, "currency": "USD" }, "syp": { "amount": 3750, "currency": "SYP" } }, "exchange_rate": 150 }
  ```
  (USD in cents; SYP in whole new pounds, already rounded.)
- **Snapshot on confirmation:** each order stores the `exchange_rate` used plus line prices and totals in **both** USD and SYP, and the shopper's selected display currency. Later rate changes must not alter past orders or reports.

### Catalog
- **categories** — `id, slug, name{ar,en}, parent_id (nullable), sort_order, is_active, image`.
- **products** — `id, slug, name{ar,en}, description{ar,en}, fit_note{ar,en} (e.g. "runs small"), fabric{ar,en}, care{ar,en}, category_id, style_tags[], base_price, compare_at_price (nullable), size_chart_id (nullable), status (draft|active|archived), is_featured, created_at`.
- **colors** — `id, name{ar,en}, hex, slug` (shared palette, e.g. "plum", "navy").
- **product_colors** — `product_id, color_id, sort_order` — a product's available colors. **Images belong here (per product + color).**
- **sizes** — `id, label, system (letter|numeric), sort_order`. **[CONFIRMED]** Both systems can exist at the same time (e.g. S/M/L and 38/40/42); a product uses one or both.
- **size_charts** — per product (or reusable template): rows of measurements in cm.
- **variants** (SKU) — `id, product_id, color_id, size_id, sku (unique), price_override (nullable), is_active`. One row per color × size. **Stock is per variant.**
- **product_images** — `id, product_id, color_id, path, width, height, alt{ar,en}, role (main|back|detail|other), sort_order`.
- **search_synonyms** — `term, synonyms[]` editable from the dashboard (e.g. بيجاما = بجامة = pajama).

### Offers (sale price) [CONFIRMED 2026-11-23]
- On `products`: `offer_price (nullable, USD)`, `offer_ends_at (nullable datetime)`. An offer is **active** when `offer_price` is set, lower than `base_price`, and `offer_ends_at` is null or in the future.
- While active, public endpoints return `price` = the offer price (SYP derived and rounded as usual) and `compare_at_price` = the regular price (both currencies), so the storefront can show the old price struck through and a discount badge. When it expires, `compare_at_price` becomes `null` automatically.
- The order line snapshots the price actually charged (rule §5.3 snapshots), so ending an offer never changes past orders.

### Storefront content (owner-managed home page) [CONFIRMED 2026-11-23]
Single-row settings-like table (or JSON setting) edited from the dashboard:
- `hero_background` — one uploaded image (landscape, recommended ≥ 2400×1350, WebP) + `alt{ar,en}` (may be empty = decorative).
- Three **hand-picked, ordered product lists**, each with an `enabled` switch:
  - `offers` — products shown in the Offers slider. If disabled **or** empty (after filtering), the storefront hides the section entirely.
  - `best_sellers` — chosen by the owner, **not computed from sales** (the owner wants trending pieces to stay visible).
  - `new_arrivals` — also chosen by hand, same reason.
  - Storage: pivot `home_section_products (section, product_id, sort_order)`.
  - Archived/draft products are silently skipped in the public response.
- `about` — `enabled`, `title{ar,en}`, `lead{ar,en}`, `body[]{ar,en}` (paragraphs), `closing{ar,en}`. Plain text only (no HTML) — the storefront handles the styling. Default text is in `src/mocks/home-content.ts`.

### Customer reviews [CONFIRMED 2026-11-23]
- **reviews** — `id, product_id, order_id, customer_display_name (e.g. first name + city initial), rating (1–5), body (plain text, max ~600 chars), status (pending|approved|rejected), created_at, approved_at`.
- Only for a **confirmed order** that contains the product: after confirmation the owner can send the customer a one-time review link (signed token, expires e.g. 30 days, one review per order line). No customer accounts needed.
- Nothing is public until the owner **approves** it in the dashboard. Never expose phone numbers or full names.
- Public product data gains `rating_average` and `rating_count` (approved reviews only).
- Home: the owner picks approved reviews for the home slider → `home_section_reviews (review_id, sort_order)` and `reviews: {enabled, items[]}` in `GET /storefront/home`.

### Inventory & cost
- **[CONFIRMED]** There is **no fixed cost per product/variant**. Each purchased piece/batch has its own cost.
- **purchase_lots** — `id, variant_id, quantity_received, quantity_remaining, unit_cost, supplier (nullable), purchased_at, note`.
- **stock_movements** — append-only ledger: `variant_id, type (purchase|sale|return|adjustment|cancel_restock), quantity (+/-), lot_id (nullable), order_line_id (nullable), reason, created_by, created_at`.
- Available stock = sum of `quantity_remaining` of the variant's lots (or a maintained counter verified against the ledger).
- **[CONFIRMED] FIFO by lot:** on order confirmation, units are consumed from the variant's oldest lot with remaining quantity first (by `purchased_at`, then `id`); a line may span several lots. Each consumed lot + quantity + `unit_cost` is recorded (e.g. `order_line_lots` pivot), and the line's total cost is snapshotted. Cancellation/return restocks into the same lots. Lot costs are in **USD**.

### Customers & orders
- **customers** — `id, name, phone, city, address (nullable), notes`. Private data: never exposed publicly.
- **checkout_intents** — created by the storefront when the shopper sends the WhatsApp message. `id, reference (human-friendly, e.g. VR-24117), lines[], customer info, fulfillment method, status (pending|converted|expired|rejected), created_at`. **An intent is NOT a sale and does NOT reserve stock** **[CONFIRMED]**.
- **orders** — `id, number, source (whatsapp_intent|manual), checkout_intent_id (nullable), customer_id, sale_type (direct|marketer), marketer_id (nullable), fulfillment_method, delivery_fee_charged, delivery_cost_paid, discount, status, payment_status, confirmed_at, cancelled_at, notes`.
- **order_lines** — `order_id, variant_id, quantity, unit_price (snapshot), unit_cost (snapshot from lot), commission_amount (snapshot), product_name_snapshot{ar,en}, color/size snapshot`.
  **[CONFIRMED]** Snapshots are mandatory: later catalog/price/cost/commission edits must never change past orders or profit.

### Marketers
- **marketers** — `id, name, phone, commission_amount, is_active, notes`.
- **[CONFIRMED]** Commission is a **fixed amount per piece sold**, set by the owner per marketer (not a percentage). Order commission = `commission_amount × total quantity` of the order lines. The applied per-piece amount is snapshotted on each order line.

### Finance
- **capital_contributions** — `id, amount, contributed_at, contributor, note`. **[CONFIRMED]** Capital is never revenue or profit.
- **expenses** — `id, category (delivery|packaging|marketing|rent|other), amount, spent_at, note, order_id (nullable)`.
- **refunds/returns** — linked to order lines; returned items create `return` stock movements (restock only if sellable).

## 5. Business rules

1. **[CONFIRMED]** Opening WhatsApp ≠ order. The flow is: storefront creates a `checkout_intent` → shopper sends the WhatsApp message → owner confirms in the dashboard → intent becomes an `order`.
2. **[CONFIRMED]** Stock is deducted **only when the owner confirms the order**. Confirmation runs in a DB transaction with row locks (`lockForUpdate`) on the variants/lots; if any line lacks stock, the whole confirmation fails with `VARIANT_OUT_OF_STOCK` and the affected lines listed.
3. Confirmation must be idempotent (double click / retry must not deduct twice).
4. Cancelling a confirmed order restocks via `cancel_restock` movements back to the original lots.
5. **Fulfillment [CONFIRMED]** — three methods:
   - `pickup` — from the market (fixed location; address configured in settings).
   - `home_delivery` — to the customer's house.
   - `shipping` — via a shipping company.
6. **Delivery money [CONFIRMED]:** the fee charged to the customer is **variable and may be 0 (free)**; the owner pays the delivery company separately. Store `delivery_fee_charged` and `delivery_cost_paid` as **two separate fields**.
   - **[CONFIRMED]** No zones/cities table. Each method has a **default fee in settings (USD, like everything in the dashboard)**, and the owner can **override the fee manually on any order**:
     | Method | Owner's example (old SYP) | Default fee in USD |
     |---|---|---|
     | `pickup` | 0 | 0 |
     | `home_delivery` | 15,000 (≈ 150 new SYP) | **1.00** |
     | `shipping` | ~35,000 (≈ 350 new SYP) | **2.50** (estimate) |
   - The storefront shows the default fee for the chosen method in the shopper's currency; for `shipping` it is labelled as an estimate confirmed by the owner. The final fee is the one saved on the confirmed order.
7. **Payment [CONFIRMED]** — no online payment processing. The shopper picks a payment method on the site; it is included in the WhatsApp message and stored on the intent/order.
   - Methods: `sham_cash` (Sham Cash wallet transfer, done by the shopper outside the site) and `cash_on_delivery` (cash on delivery or on pickup).
   - The owner can **enable/disable each method** from the dashboard settings; the storefront only shows enabled methods (at least one must stay enabled).
   - `payment_status`: `unpaid | paid` — set manually by the owner **[PROPOSED]**. Payment status is independent of order confirmation.
8. Profit formula (reporting only, computed in Laravel):
   ```
   net operating profit = recognized sales − discounts/refunds
                        + delivery fees charged − delivery costs paid
                        − cost of goods sold (lot costs) − marketer commissions
                        − other operating expenses
   ```
   Capital contributions are excluded. Reports must state the period and that figures are management estimates, not audited accounts.

## 6. Search, filters & recommendations [PROPOSED]

### Search
- Maintain a normalized `search_text` per product (ar + en name, category, color names, style tags, synonyms).
- Arabic normalization (apply to stored text **and** the query): `أ إ آ ٱ → ا`, `ة → ه`, `ى → ي`, remove tashkeel and tatweel (ـ), lowercase Latin.
- Ranking: exact match > prefix > contains; boost in-stock products.
- MySQL FULLTEXT ignores tokens shorter than 3 chars → fall back to `LIKE` for short queries.
- No external search service (Algolia/Elastic) unless the catalog grows into thousands of products.

### Filters
`category`, `size[]` (multi), `color[]` (multi), `price_min`, `price_max`, `in_stock`, `sort` (`newest|best_selling|price_asc|price_desc`). Return **facet counts** so the UI can show "(12)" next to each option and hide empty ones.

### Recommendations (`/products/{slug}/related`)
Deterministic score; never invent attributes or stock:
```
hard filter: active, has stock (in the requested size if given), not the current product
score = 40 same category + 25 shared style tag + 20 same color (if requested) + 15 price within ±25%
```
Return a `reasons` array per item (`same_category`, `same_color`, `size_available`, `similar_price`) so the UI can label results honestly.

### Availability tiers
Public endpoints never expose raw stock counts. Return `availability: in_stock | low_stock | out_of_stock` per variant. Low-stock threshold **[PROPOSED]**: ≤ 2, configurable in settings.

## 7. Images [PROPOSED — pending owner image spec agreement]

- Upload accepts JPEG/PNG/WebP, max 10 MB, validate real MIME (not just extension), reject anything else.
- Convert and store as **WebP** (quality ~82), strip EXIF/GPS metadata.
- **Aspect ratio 3:4 (portrait)**, recommended upload ≥ 1500×2000 px. Reject < 900×1200.
- Store original dimensions (`width`, `height`) — Next.js `<Image>` needs them to avoid layout shift.
- Images are attached to **product + color**; a gallery is ordered by `sort_order`, first image = main.
- Serve from a stable public URL (local `storage` + CDN or S3-compatible). Next.js handles responsive resizing on delivery; Laravel only stores the converted original.

## 8. Cache invalidation [PROPOSED]

The storefront caches catalog data. When products, variants, prices, images, categories or stock change, Laravel sends:
```
POST {NEXT_URL}/api/revalidate
Header: X-Revalidate-Secret: <shared secret>
Body: { "tags": ["products", "product:noir-gilded-set", "category:sets"] }
```
Fire-and-forget (queue it); failure must not break the admin action.

Saving the home content (hero, section picks, about text) sends `{ "tags": ["home-content"] }`.

## 9. Endpoints — Public [PROPOSED]

| Method | Path | Purpose |
|---|---|---|
| GET | `/categories` | Category tree |
| GET | `/products` | List + filters + sort + pagination + facets |
| GET | `/products/{slug}` | Product detail: colors, sizes, variants with `availability`, images per color, size chart |
| GET | `/products/{slug}/related?color=&size=` | Recommendations (§6) |
| GET | `/search/suggest?q=` | Autocomplete: up to 5 products + 3 categories |
| POST | `/cart/validate` | Body: `[{variant_id, quantity}]` → current prices, availability, line totals, problems per line |
| POST | `/checkout-intents` | Creates a pending intent; returns `reference` + ready-to-send WhatsApp message text + WhatsApp number |
| GET | `/settings/public` | Store WhatsApp number, pickup location, fulfillment methods, currency |
| GET | `/products/{slug}/reviews?page=` | Approved reviews of a product |
| GET | `/reviews/invite/{token}` · POST `/reviews` | Review form data for a valid invite token; submit a review (status `pending`) |
| GET | `/storefront/home` | Home content in one call: `hero.background {url,width,height,alt}`, `offers`, `best_sellers`, `new_arrivals` (each `{enabled, products: ProductSummary[]}` already resolved and ordered), `about {enabled,title,lead,body[],closing}`. Shape: `src/types/content.ts` |

## 10. Endpoints — Admin (auth required) [PROPOSED]

| Area | Endpoints |
|---|---|
| Auth | `POST /admin/login`, `POST /admin/logout`, `GET /admin/me` |
| Catalog | CRUD `/admin/products`, `/admin/categories`, `/admin/colors`, `/admin/sizes`, `/admin/size-charts`, `/admin/search-synonyms` |
| Variants | `GET/PUT /admin/products/{id}/variants` (bulk matrix save) |
| Images | `POST /admin/products/{id}/images` (multipart, `color_id`), `PATCH` (order/alt/role), `DELETE` |
| Inventory | `POST /admin/purchase-lots`, `GET /admin/stock-movements`, `POST /admin/stock-adjustments` |
| Intents | `GET /admin/checkout-intents?status=pending`, `POST /admin/checkout-intents/{id}/convert`, `POST .../reject` |
| Orders | CRUD `/admin/orders`, `POST /admin/orders/{id}/confirm`, `POST .../cancel`, `POST .../refund`, `PATCH .../status` |
| Customers | `GET /admin/customers`, `GET /admin/customers/{id}` |
| Marketers | CRUD `/admin/marketers`, `GET /admin/marketers/{id}/summary?from&to` |
| Finance | CRUD `/admin/capital-contributions`, CRUD `/admin/expenses` |
| Reports | `GET /admin/reports/profit?from&to`, `GET /admin/reports/inventory`, `GET /admin/reports/sales?from&to&group_by=` |
| Reviews | `GET /admin/reviews?status=pending`, `POST /admin/reviews/{id}/approve`, `POST .../reject`, `POST /admin/orders/{id}/review-invite` (creates the signed link to send on WhatsApp) |
| Home content | `GET/PUT /admin/storefront/home` (about text, section switches, ordered product ids per section), `POST /admin/storefront/home/hero-background` (multipart image) |
| Settings | `GET/PUT /admin/settings` (WhatsApp number, pickup address, low-stock threshold, enabled payment methods, delivery default fees, SYP rounding step) |
| Exchange rate | `GET /admin/exchange-rates` (history), `POST /admin/exchange-rates` (set new USD→SYP rate) |

## 11. Test fixtures the backend should cover

Direct sale · marketer sale · pickup · home delivery · shipping · free delivery · discount · cancellation after confirmation (restock) · refund/return · two lots with different costs (FIFO) · price change after a sale (old order unchanged) · concurrent confirmation of the last unit (one must fail).

## 12. Out of scope (for now)

Online payment gateway, customer accounts/login, marketer login, multi-warehouse, tax calculation, ML/AI search.

## 13. Open questions (owner)

1. **Returns/refund policy** — allowed? Within how many days?
2. **Hosting / domains** — e.g. `veerla.com` (Next.js) + `api.veerla.com` (Laravel)?
3. **Required customer fields** at checkout (name, phone, city, address?).

---

## Changelog

| Date | Change |
|---|---|
| 2026-11-23 | Added **customer reviews**: per product, only for confirmed orders via a signed invite link, owner approval before publishing, rating aggregates on products, owner-picked reviews on the home page. Public `ProductSummary` now includes `compare_at_price` (null without an active offer). |
| 2026-11-23 | Added **offers** (`offer_price` + optional `offer_ends_at`, public `compare_at_price`) and **owner-managed home content** (hero background, hand-picked offers / best sellers / new arrivals with on/off switches, editable About text) with `GET /storefront/home`, admin endpoints and the `home-content` revalidation tag. |
| 2026-11-19 | Confirmed: SYP rounding to nearest 10 new SYP; delivery defaults 1.00 / 2.50 USD; default shopper display currency USD. |
| 2026-11-19 | Payment: no online gateway; methods `sham_cash` and `cash_on_delivery`, each toggleable in settings; chosen method sent in the WhatsApp message and stored on the order. Added exchange-rate admin endpoints. |
| 2026-11-19 | FIFO by lot confirmed. SYP = new redenominated pound; rounding step setting (default 10 new SYP, pending confirmation). Dashboard entirely in USD (prices, costs, expenses, delivery fees). Shopper picks display currency; API returns both. Delivery defaults moved to USD. |
| 2026-11-19 | Dual currency USD + SYP with owner-managed exchange rate and order snapshots (§4). Commission confirmed per piece. Delivery fees: per-method defaults (0 / 15,000 / 35,000 SYP) with manual override per order, no zone table. |
| 2026-11-19 | Initial version. Confirmed: Laravel+MySQL, single admin, AR+EN content, Latin digits, letter+numeric sizes, stock deducted only on confirmation, per-lot cost (no fixed cost), fixed-amount marketer commission, variable/free delivery fee separate from delivery cost, 3 fulfillment methods (pickup at market, home delivery, shipping). |
