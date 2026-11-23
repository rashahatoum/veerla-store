// Owner-managed storefront content (dashboard → Laravel → GET /storefront/home).
// Mirrors BACKEND_REQUIREMENTS.md §4 "Storefront content". snake_case on purpose.

import type { Localized, ProductSummary } from "./catalog";

export type MediaImage = {
  url: string;
  width: number;
  height: number;
  alt: Localized;
};

/**
 * A home section whose products the owner picks by hand, in order
 * (offers, best sellers, new arrivals). The API returns the resolved,
 * still-published products; when `enabled` is false or the list is empty
 * the storefront hides the section entirely.
 */
export type CuratedProductsSection = {
  enabled: boolean;
  products: ProductSummary[];
};

export type AboutSection = {
  enabled: boolean;
  title: Localized;
  lead: Localized;
  /** Paragraphs, in order. */
  body: Localized[];
  closing: Localized;
};

export type HomeContent = {
  hero: {
    background: MediaImage;
  };
  offers: CuratedProductsSection;
  best_sellers: CuratedProductsSection;
  new_arrivals: CuratedProductsSection;
  about: AboutSection;
};
