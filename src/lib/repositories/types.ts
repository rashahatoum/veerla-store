import type { ProductListQuery, ProductSummary } from "@/types/catalog";
import type { HomeContent } from "@/types/content";
import type { PublicSettings } from "@/types/settings";

/**
 * Contracts shared by the mock sources and the future Laravel HTTP sources.
 * Keep them aligned with BACKEND_REQUIREMENTS.md §9.
 */
export interface CatalogSource {
  listProducts(query: ProductListQuery): Promise<ProductSummary[]>;
}

/** Public store settings (GET /settings/public). */
export interface SettingsSource {
  getPublicSettings(): Promise<PublicSettings>;
}

/** Owner-managed storefront content (GET /storefront/home). */
export interface ContentSource {
  getHomeContent(): Promise<HomeContent>;
}
