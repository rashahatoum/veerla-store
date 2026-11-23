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

/** An approved customer review (BACKEND_REQUIREMENTS §4 Customer reviews). */
export type Review = {
  id: number;
  /** Never a full name or phone: e.g. "Rania · Damascus". */
  customer_display_name: string;
  /** 1–5 */
  rating: number;
  /** As written by the customer, in her language — not translated. */
  body: string;
  product: { slug: string; name: Localized };
  created_at: string;
};

export type ReviewsSection = {
  enabled: boolean;
  /** Owner-picked approved reviews, in order. */
  items: Review[];
};

export type HomeContent = {
  hero: {
    background: MediaImage;
  };
  offers: CuratedProductsSection;
  best_sellers: CuratedProductsSection;
  new_arrivals: CuratedProductsSection;
  about: AboutSection;
  reviews: ReviewsSection;
};
