# VEERLA — Project Requirements (initial draft)

Status: Draft based on owner's initial description; unresolved business rules require approval before implementation.

## Vision
Premium Arabic RTL storefront for VEERLA homewear, pajamas and underwear, matching the supplied plum/champagne feather-and-butterfly visual identity. Simple shopping and WhatsApp order handoff, with a practical private management dashboard.

## Storefront
- Browse products; search and filter.
- Product detail: images, colors, sizes, price, description, stock availability.
- Color-specific image galleries; inventory variants by size/color.
- Cart: multiple items, quantities, chosen variants, totals.
- Fulfillment: delivery or pickup from a fixed market location.
- Send structured order summary/invoice via WhatsApp.

## Dashboard
- Secure owner login.
- Product CRUD, image uploads with automatic WebP conversion, categories, colors, sizes, pricing, inventory.
- Order management and statuses; direct sales or sales attributed to marketers.
- Record capital contributions, acquisition costs, selling prices, marketer commissions, delivery charges/costs, operating expenses and refunds.
- Profit and inventory reporting; preserve historical order costs and prices.

## Critical rules
- A WhatsApp link click is not a completed sale.
- Capital contributions must not be treated as revenue.
- Commission basis and timing must be agreed before calculations.
- Stock and financial data require durable, server-side persistence.

## Open decisions
1. Preferred backend/database/hosting and image storage? (Not yet chosen.)
2. Will sales be entered manually in dashboard, confirmed by the owner after WhatsApp, or both?
3. Is marketer commission a percent of sale price or profit, and does it vary by marketer/product?
4. How are item costs recorded: per purchased batch, per unit, or a fixed cost per product variant?
5. Delivery: fixed or variable customer fee, business cost, areas, and who receives the fee?
6. Pickup location and customer fields required?
7. Inventory: track quantities for each size/color variant? (Recommended: yes.)
8. Payment: cash on delivery/pickup, transfer, or other? (Not yet decided.)
9. Currency, taxes and return/refund policy?
10. Single owner admin or multiple staff/marketer logins?

## Suggested phases (not yet approved)
1. Foundation: brand tokens, layout, domain types, architecture decision.
2. Product catalog, search/filter and variant gallery.
3. Cart, fulfillment selection and WhatsApp order handoff.
4. Secure dashboard, persistence, product CRUD, WebP and stock.
5. Orders, marketer attribution, costs, accounting and reporting.
6. Validation, accessibility, security, deployment.
