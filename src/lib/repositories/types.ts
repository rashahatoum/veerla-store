import type { ProductDetail, ProductListQuery, ProductSummary } from "@/types/catalog";
import type { HomeContent, Review } from "@/types/content";
import type { PublicSettings } from "@/types/settings";

/**
 * Contracts shared by the mock sources and the future Laravel HTTP sources.
 * Keep them aligned with BACKEND_REQUIREMENTS.md §9.
 */
export interface CatalogSource {
  listProducts(query: ProductListQuery): Promise<ProductSummary[]>;
  /** null when the slug does not exist or the product is not published. */
  getProduct(slug: string): Promise<ProductDetail | null>;
  /** GET /products/{slug}/related */
  listRelatedProducts(slug: string, limit: number): Promise<ProductSummary[]>;
  /** GET /products/{slug}/reviews (approved only) */
  listProductReviews(slug: string): Promise<Review[]>;
}

/** Public store settings (GET /settings/public). */
export interface SettingsSource {
  getPublicSettings(): Promise<PublicSettings>;
}

/** Owner-managed storefront content (GET /storefront/home). */
export interface ContentSource {
  getHomeContent(): Promise<HomeContent>;
}
