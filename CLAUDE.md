# CLAUDE.md — VEERLA Homewear / Claude Code Instructions

VEERLA is a premium Arabic-first homewear, pajamas and underwear e-commerce store, with WhatsApp checkout and a private operations dashboard for catalog, inventory, orders, costs and profitability. The name is inspired by the Dutch word **veer** (feather). Keep the experience simple for shoppers and accurate for the owner.

## Language — mandatory for every reply

- **Every message to the owner is written in Arabic, preferably clear Levantine (شامي).** This includes plans, explanations of changes, research summaries, test/build results, error reports, questions and status updates — even when the owner writes in English or pastes an English prompt.
- Keep technical terms, identifiers, file paths and commands in English inside the Arabic text.
- Write code, code comments, commit messages and technical documentation (`.local-docs/*`, README) in English.
- Storefront and dashboard are bilingual from the start: Arabic (default, RTL) and English (LTR). No hardcoded UI strings — all copy comes from translation files. Numbers use Latin digits (123).

## Source of truth

1. `.local-docs/VEERLA_PROJECT_REQUIREMENTS.md` is authoritative for agreed scope. Do not silently change requirements or invent business rules.
2. Read only the relevant documentation for the task:

| Need | File |
|---|---|
| Scope, business rules, unanswered decisions | `.local-docs/VEERLA_PROJECT_REQUIREMENTS.md` |
| Current implementation, issues, next task | `.local-docs/PROJECT_STATUS.md` |
| Architecture, models, data flow | `.local-docs/ARCHITECTURE.md` |
| Engineering conventions and testing | `.local-docs/DEVELOPMENT_GUIDELINES.md` |
| Delivery milestones | `.local-docs/ROADMAP.md` |
| Architectural/business decisions | `.local-docs/DECISIONS.md` |
| API contracts, when confirmed | `.local-docs/API-CONTRACT.md` |
| Living handoff for the Laravel developer (keep updated + changelog) | `.local-docs/BACKEND_REQUIREMENTS.md` |
| UX research of reference stores | `.local-docs/ECOMMERCE_BENCHMARK.md` |

Do not put secrets, passwords, tokens, real customer details or private phone numbers in tracked documentation.

## Working with the owner

- Language rules: see "Language — mandatory for every reply" at the top.
- The owner is a frontend developer who wants to understand Next.js architecture and trade-offs, not beginner React explanations.
- **Before changing code**, explain the approach, reasons and affected files, then wait for explicit approval. After approval, complete the agreed feature and verify it without repeatedly interrupting.
- For dependencies, backend choices, schema changes or other difficult-to-reverse decisions, present concise options and wait for approval.
- When reviewing owner-written code, explain the cause and suggest targeted fixes before replacing it.
- Do not expand scope or rewrite unrelated working code.
- After each feature: list changed files, brief summary, 2–4 learning points, manual checks and affected documentation updates.

## Visual identity

- Match the supplied VEERLA brand reference: premium, feminine, warm, soft, understated; feather and delicate butterfly motifs used sparingly.
- Provisional palette (must be calibrated against brand assets): deep plum `#31051F`, dusty mauve `#89505B`, rose nude `#D5A293`, champagne `#E8CCBA`, ivory `#F8EBE2`; restrained metallic-gold accents.
- Typography: Marcellus for English display headings, Tajawal for Arabic. Keep typography legible and avoid excessive ornamentation.
- Storefront: mobile-first, Arabic RTL, accessible, product photography first. Dashboard: clarity, speed, legible tables and financial numbers before decoration.
- Centralize design tokens; do not hardcode brand colors across components.

## Product scope

### Public storefront
- Product listing with search and category/size/color/price filters as approved.
- Product detail with gallery, description, available sizes and colors, variant-specific photos, price and stock availability.
- Cart with quantity, variant selection, line totals and clear order summary.
- Checkout gathers customer information required for fulfillment, and either delivery or pickup at an approved fixed market location.
- WhatsApp handoff generates a structured invoice/order message, but **opening WhatsApp is not proof an order was placed**. Orders must be confirmed/recorded through an explicit workflow.

### Private dashboard
- Authenticated access with server-enforced authorization; never treat a hidden route or client-only password as security.
- CRUD for products, categories, images, colors, sizes, SKU variants, prices, stock and availability.
- Each color can have its own images; selecting a color switches the displayed gallery. Sizes and colors map to inventory variants.
- Uploaded images are validated and processed to WebP, with safe size limits and appropriate persistent storage. Do not confuse Next.js image optimization with conversion of the original stored upload.
- Orders: create/confirm/edit/cancel, delivery/pickup, direct/marketer sale, marketer attribution, payment/fulfillment status, and stock adjustments.
- Accounting: capital contributions, purchase/inventory cost, sales, delivery fees and costs, marketer commissions, refunds/discounts, other expenses, and profit reporting.

## Financial correctness — non-negotiable

- Distinguish **capital**, **cash flow**, **revenue**, **COGS**, **gross profit** and **net profit**. Capital is not revenue or profit.
- Store money in integer minor units or a precise decimal type; never use binary floating point for monetary calculations.
- Record the historical selling price, item cost and applicable commission terms in each confirmed order line; future catalog edits must not change past profits.
- Define marketer commission basis explicitly (percentage of sales, gross profit or another rule) before implementing calculations.
- Define delivery fees charged to customer separately from delivery cost paid by the business.
- Track cancellations, refunds, returns and stock restocking explicitly. Avoid counting unconfirmed WhatsApp intents as sales.
- A simple reporting formula, only after policies are agreed: net operating profit = recognized sales + delivery fees collected - item costs sold - marketer commissions - delivery costs - discounts/refunds adjustments - other operating expenses. Do not subtract capital contributions as an expense.
- Show assumptions and reporting periods; do not claim full formal accounting, tax compliance or audited figures.

## Architecture and security

- Next.js App Router, TypeScript, Tailwind CSS, ESLint, React Compiler as initialized. Verify installed Next.js documentation and actual package version before using version-sensitive APIs.
- Server Components by default. Put `use client` on the smallest genuinely interactive boundary. Use Server Actions/Route Handlers where appropriate, with authorization and validation on every mutation.
- Separate `types`, domain/business rules, repositories/services, components and UI routes. UI components never import mock data directly.
- Keep product/variant/stock/order/ledger models independent of UI; test business calculations with pure functions.
- **Backend is decided (see `DECISIONS.md` D-001):** a separate Laravel REST API with MySQL, built by another developer. Laravel owns business data, auth, inventory, orders, image processing (WebP) and all financial calculations. Next.js must not add its own database, ORM or competing backend logic. Until the API exists, use typed mock repositories behind the same interfaces as the future HTTP client, and keep `BACKEND_REQUIREMENTS.md` in sync.
- Cart may use client persistence; inventory, order status, uploaded media and accounting records require server-side durable persistence and access controls.
- Protect private customer data, credentials, uploads and dashboard endpoints; validate server-side inputs, upload MIME/size, and WhatsApp message content. Keep secrets in environment variables.
- Use atomic order confirmation/stock updates where possible; prevent duplicate submissions and overselling.
- SEO for public pages, noindex for private dashboard; responsive, keyboard accessible, RTL, and reduced-motion friendly.
- Prefer incremental code changes and no premature abstractions or unnecessary animation packages.

## Verification

- Run `npm run lint`, `npx tsc --noEmit` (or the project's approved `typecheck` script), and `npm run build`; report failures truthfully.
- Test mobile (360px), desktop, RTL, keyboard use, variant photo switching, unavailable stock, cart persistence and WhatsApp message formatting.
- Test accounting with concrete fixtures: direct sale, marketer sale, delivery, pickup, discounts, cancellations, refunds, partial stock, and price changes after sale.
- Never mark features DONE without implementation and verification.

## Documentation and Git

- Keep `.local-docs/PROJECT_STATUS.md` concise and current; document only real decisions in `DECISIONS.md`.
- Update only relevant docs after implementing approved features. Never invent API contracts.
- Never commit, push or merge unless explicitly asked.
