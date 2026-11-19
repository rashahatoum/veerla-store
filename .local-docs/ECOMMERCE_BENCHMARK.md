# VEERLA — E-Commerce UX Benchmark

Research date: 2026-11-19
Status: Research findings + recommendations. Nothing here is an approved requirement until the owner approves it.

## 0. Method and limitations (read first)

| Store | Direct access result | What the findings rely on |
|---|---|---|
| SKIMS | `skims.com` homepage fetched (served the `/en-jp` regional version); header + mega-menus readable, hero/grid/footer **not** in the fetched content. Collection pages blocked by fetch tooling. | Direct header/menu observation + SKIMS size-guide page (search result) + press/reviews. |
| ZARA | `zara.com/us/` returned **HTTP 403**. | UXmatters usability audit (Sep 2023) + Pratt IxD design critiques. |
| UNIQLO | `uniqlo.com` timed out / blocked. | Official UNIQLO help-center pages (stock, restock, size charts) + Baymard testing note. |
| ASOS | `asos.com` timed out / blocked. | Baymard ASOS benchmark metadata (public), ASOS's own feature descriptions (Style Match, Fit Assistant) via search. |

Legend used below:
- **[Observed]** — seen directly in fetched page content.
- **[Source]** — reported by a named third-party or official help source (not seen by us directly).
- **[Recommendation]** — industry best practice (mostly Baymard) or our own judgment.

No screenshots, layouts, artwork or copy from these stores are to be reproduced. Only UX principles are extracted.

---

## 1. SKIMS

**[Observed] (skims.com, regional /en-jp)**
- Top announcement bar with three rotating trust messages: free-shipping threshold, duties included, delivery window (3–7 business days).
- Country/currency selector in header.
- Primary nav is category-led and short: New, Holiday Shop, Best Sellers, Clothing, Bras, Underwear, Shapewear, Mens, Accessories, Kids, Sale.
- Mega-menus combine grouped text links (e.g. "Gifts By Recipient", "Style", "Collection", "Compression Level") with **one editorial image tile** (title + short blurb, whole tile clickable, no "Shop now" button).
- "New" menu exposes **color shortcuts** (Merlot, Pink, Espresso, Fog, Currant, Seasonal Prints) — shopping by color as a first-class entry point.
- Utility links inside menus: "The Shapewear Guide", "Bra Size Calculator".
- Wishlist + account as icons (no visible text labels in markup — an accessibility gap).

**[Source]**
- Separate size guides per product type (bras, shapewear, bodysuits, loungewear, swim) with band/bust/waist/hip charts and "between sizes" advice ([SKIMS size guides](https://skims.com/en-yt/pages/size-guides)).
- Product pages carry fit notes such as "runs small, size up 1–2 sizes" ([SKIMS product example](https://skims.com/products/cozy-ballet-slipper-onyx)).
- Frequent sell-outs across colors/sizes; restock demand is high enough that third parties built restock trackers ([Elite Daily](https://www.elitedaily.com/p/when-will-the-skims-core-control-thong-restock-fans-are-patiently-waiting-18800859), [TrackaLacker](https://www.trackalacker.com/articles/news/kim-kardashian-s-skims-are-constantly-selling-out)).

**Works well:** category-first navigation for intimates; color as a discovery entry; product-type-specific size guides; fit notes next to size; trust messages up top.
**Adapt for VEERLA:** short Arabic category nav (بيجامات / لانجري وملابس داخلية / ملابس بيت / أطقم / جديد / عروض); "shop by color" chips using VEERLA's real catalog colors; fit note per product; one trust bar (delivery areas, pickup point, WhatsApp support).
**Do NOT copy:** celebrity-led editorial weight, shapewear/compression taxonomy (not our catalog), unlabeled icon buttons, heavy mega-menus (our catalog is small).

---

## 2. ZARA

**[Source] — UXmatters audit, 2023-09-11** ([link](http://www.uxmatters.com/mt/archives/2023/09/usability-audit-of-the-zara-web-site.php))
- Strengths: grid density toggle (expand to full width; mobile shows ~4 products per screen); search with inline suggestions and compact results; concise bag with quantity edit/remove; short mobile-optimized checkout; visible required-field hints.
- Problems: busy video hero hides nav/search/bag on light frames; non-clickable elements that look clickable; **no sort options**; tiny low-contrast filter button; filters missing useful attributes (e.g. fabric); size options use a "+" that reads like "add to cart"; price/sizes/add-to-bag buried in an accordion on product page; no back affordance in checkout; search for a generic term jumped straight to a single product.

**[Source] — Pratt IxD critiques** ([2023](https://ixd.prattsi.org/2023/09/design-critique-zara-website/), [2026](https://ixd.prattsi.org/2026/09/design-critique-zara-website-2/)): hamburger hides primary navigation; "1 2 3" grid-density control is ambiguous — icons/tooltips suggested.

**Works well:** photography-led minimalism, grid density control, search suggestions, very short checkout.
**Adapt for VEERLA:** let product photography carry the brand; a simple 2-column mobile grid (optionally 1/2 toggle later); short checkout.
**Do NOT copy:** minimalism that hides price, size and CTA; video hero; missing sort; ambiguous icons; low-contrast controls.

---

## 3. UNIQLO

**[Source] — official help center** ([US stock](https://faq-us.uniqlo.com/articles/en_US/FAQ/How-can-I-find-out-if-a-particular-item-is-available-in-store), [SG availability/restock](https://faq-sg.uniqlo.com/articles/en_US/FAQ/Product-Availability-Restock-SG), [UK size](https://faq-uk.uniqlo.com/articles/en_US/Knowledge/How-to-choose-your-size))
- Choose color + size; **stock status shown before add-to-cart**; unavailable color/size is greyed out and cannot be added.
- Tiered stock labels: "In stock" (4+), "Only a few left" (2–3), "Not available".
- When sold out, Add to Cart becomes **"Notify me"** (some regions).
- Per-product size chart with finished garment measurements; cm/inch toggle; explicit note that same size label can fit differently across products.
- Search by product name or product code.
- Official disclaimer that displayed stock may not be real-time.

**[Source] — Baymard**: a UNIQLO test participant couldn't evaluate jeans from the listing because there were no extra thumbnails ([Baymard](https://baymard.com/research-articles/current-state-product-list-and-filtering)).

**Works well:** honest, tiered availability; disabled-but-visible unavailable variants; garment-measurement size charts; "notify me" instead of a dead end.
**Adapt for VEERLA:** availability tiers computed **by Laravel** (never raw counts to the public); greyed sizes with clear text label (not color alone); per-product size chart in cm; WhatsApp-based "اسأليني عند التوفر" later.
**Do NOT copy:** store-locator/in-store stock features (one fixed pickup point only); dense utilitarian visual style.

---

## 4. ASOS

**[Source]**
- Baymard keeps a long-running ASOS benchmark (first 2016, reviewed many times; details paywalled) ([Baymard ASOS](https://baymard.com/ux-benchmark/case-studies/asos)). Baymard's public examples list ASOS for autocomplete suggestions and mobile filtering ([autocomplete](https://baymard.com/ecommerce-design-examples/34-autocomplete-suggestions/4749-asos), [mobile filtering](https://baymard.com/ecommerce-design-examples/filtering-options/18177-asos)) — the specific verdicts are gated, so we do not claim them.
- **Style Match**: visual search from a photo ([ASOS help](https://asos.com/au/customer-care/product-stock/how-does-your-style-match-feature-work)).
- **Fit Assistant**: ML size recommendation from similar shoppers + past purchases/returns ([Computer Weekly](https://www.computerweekly.com/news/252453050/ASOS-launches-digital-assistant-to-help-customers-find-right-size)).

**Works well (principle level):** autocomplete as a core navigation tool; filters that scale to a huge catalog; size help integrated into the purchase decision.
**Adapt for VEERLA:** autocomplete with categories + products (no ML); deterministic "similar products" ranking.
**Do NOT copy:** ML/visual search (catalog too small, cost unjustified); the density of a marketplace with tens of thousands of SKUs.

---

## 5. Cross-store findings backed by research (Baymard)

Sources: [Product list UX 2025](https://baymard.com/blog/current-state-product-list-and-filtering) (updated 2025-09-09), [Size buttons](https://baymard.com/blog/use-buttons-for-size-selection), [Apparel size info](https://baymard.com/research-articles/apparel-size-information) (2022-07-06).

- 78% of mobile sites are mediocre-or-worse at product lists — mobile listing is where we can differentiate.
- Group color variants as **swatches on one product card** (42% of sites don't).
- Product cards in apparel benefit from **multiple images** (≥3).
- Filters must be **multi-select within a type** (size M + L).
- Show an **applied-filters overview** with one-tap removal (mobile: horizontal chip row at top of list).
- Sort essentials: newest, best-selling, price (rating once we have reviews).
- Put the size filter near the top for apparel.
- **Size as buttons, not dropdowns** — dropdowns were overlooked in testing; buttons show availability at a glance.
- 39% of participants discovered their size was unavailable only on the product page → size filter + availability in listing matter.
- 83% of apparel sites lack sufficient size info: product-specific chart, cm, measuring tips, model's size, size-guide link **next to** size selector, Back button closes the guide.

## 6. Arabic search notes

- MySQL has no collation that treats أ/إ/آ/ا as equal ([MySQL bug 118222](https://bugs.mysql.com/bug.php?id=118222)).
- Common approach: store a **normalized search column** (fold أإآٱ→ا, ة→ه, ى→ي, strip tashkeel and tatweel) and normalize the query the same way; rank exact > prefix > contains ([laravel-arabic-search](https://packagist.org/packages/ismailelbery/laravel-arabic-search), [wp-arabic-search](https://packagist.org/packages/mantekio/wp-arabic-search)).
- InnoDB FULLTEXT ignores tokens below `innodb_ft_min_token_size` (3) — short Arabic words need a LIKE fallback.
- Normalization belongs in Laravel (single source of truth); Next.js may apply the same rules only for client-side highlighting.

## 7. Summary of adoptable patterns → VEERLA

| Pattern | Origin | Priority |
|---|---|---|
| Category-first short nav + shop-by-color | SKIMS | MVP |
| Trust bar (delivery / pickup / WhatsApp) | SKIMS | MVP |
| Color swatches on product card, image switches per color | Baymard / all | MVP |
| Size buttons with visible disabled state + text | UNIQLO / Baymard | MVP |
| Tiered availability labels from backend | UNIQLO | MVP |
| Product-specific size chart + fit note near size selector | SKIMS / UNIQLO / Baymard | MVP |
| Mobile filter sheet + applied-filter chips + sort | Baymard (fixing ZARA's gaps) | MVP |
| Autocomplete (categories + products), Arabic normalization | ZARA / ASOS | MVP-lite → v2 |
| Price/size/CTA never hidden in accordions | ZARA (anti-pattern) | MVP |
| Notify-when-available | UNIQLO | Later |
| Grid density toggle | ZARA | Later / optional |
