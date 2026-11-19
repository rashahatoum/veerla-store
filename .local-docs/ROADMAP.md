# VEERLA — Roadmap

Last updated: 2026-11-19. Frontend is built first on mocks; the Laravel developer works from `BACKEND_REQUIREMENTS.md` in parallel.

| # | Phase | Scope | Status |
|---|---|---|---|
| 0 | Planning | Research, decisions, docs, backend handoff | ✅ Done |
| 1 | Foundation | i18n routing (ar/en), brand tokens, fonts, root layout, header/footer, currency + locale switch, domain types, repository interfaces + mock data, home page with mock products | 🔍 Built — awaiting owner review |
| 2 | Catalog | Listing page, filters (category/size/color/price/availability), sort, applied-filter chips, mobile filter sheet, product card with swatches | Planned |
| 3 | Product page | Gallery per color, color via URL, size options with availability, size guide, fit note, related products, sticky add-to-cart | Planned |
| 4 | Cart & checkout | Cart (localStorage), validation, checkout form, fulfillment + payment methods, checkout intent, WhatsApp handoff | Planned |
| 5 | Search | Autocomplete, Arabic-aware matching (mock), no-results recovery | Planned |
| 6 | Dashboard shell | Login (BFF), layout, navigation, settings (WhatsApp number, payment methods, delivery fees, exchange rate) | Planned |
| 7 | Dashboard — website management | Products, categories, colors/sizes, variant matrix, images upload, stock/purchase lots | Planned |
| 8 | Dashboard — accounting | Intents → orders confirmation, marketers & per-piece commission, expenses, capital, profit/inventory reports | Planned |
| 9 | Live API | Switch repositories from mock to Laravel per area as endpoints are confirmed | Depends on backend |
| 10 | Hardening | Accessibility, performance, SEO/JSON-LD, security review, deployment | Planned |

Each phase ends with: lint + typecheck + build, manual checks (360px, desktop, RTL/LTR), docs update, and owner review.
