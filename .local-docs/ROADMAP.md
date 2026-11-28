# VEERLA — Roadmap

Last updated: 2026-11-28. Frontend is built first on mocks; the Laravel developer works from `BACKEND_REQUIREMENTS.md` in parallel.

**Overall frontend progress: 31%** — sum of (phase weight × phase completion). Weights reflect estimated effort; the owner gets the updated figure after every step.

| # | Phase | Scope | Weight | Done | Status |
|---|---|---|---|---|---|
| 0 | Planning | Research, decisions, docs, backend handoff | 5% | 100% | ✅ Done |
| 1 | Foundation + home | i18n (ar/en), theme, fonts, header/footer, currency + locale switch, types, mock repositories, full home page (D-004–D-006) | 12% | 100% | ✅ Done |
| 2 | Catalog | ✅ listing page, sort, offers filter · ⬜ filters (category/size/color/price/availability), applied-filter chips, mobile filter sheet, pagination | 10% | 30% | 🟡 Partly |
| 3 | Product page | ✅ gallery per color, color via URL, size options with availability, size guide, fit note, reviews, related products, sticky add-to-bag bar, real multi-photo galleries with color switching (2 products) · ⬜ add-to-bag wiring (Phase 4), real size chart | 12% | 90% | 🟡 Built — owner review |
| 4 | Cart & checkout | Cart (localStorage), validation, checkout form, fulfillment + payment methods, checkout intent, WhatsApp handoff | 12% | 0% | Next |
| 5 | Search | Autocomplete, Arabic-aware matching (mock), no-results recovery | 5% | 0% | Planned |
| 6 | Dashboard shell | Login (BFF), layout, navigation, settings (WhatsApp, social, payment methods, delivery fees, exchange rate, returns) | 6% | 0% | Planned |
| 7 | Dashboard — website management | Products, categories, colors/sizes, variant matrix, images, stock/purchase lots, home content (hero, sections, about, reviews) | 14% | 0% | Planned |
| 8 | Dashboard — accounting | Intents → orders confirmation, marketers & per-piece commission, expenses, capital, profit/inventory reports | 12% | 0% | Planned |
| 9 | Live API | Switch repositories from mock to Laravel per area as endpoints are confirmed | 7% | 0% | Depends on backend |
| 10 | Hardening | Accessibility, performance, SEO/JSON-LD, security review, deployment | 5% | 0% | Planned |

Each phase ends with: lint + typecheck + build, manual checks (360px, desktop, RTL/LTR), docs update, and owner review.
