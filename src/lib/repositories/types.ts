import type { ProductListQuery, ProductSummary } from "@/types/catalog";

/**
 * Contract shared by the mock source and the future Laravel HTTP source.
 * Keep it aligned with BACKEND_REQUIREMENTS.md §9.
 */
export interface CatalogSource {
  listProducts(query: ProductListQuery): Promise<ProductSummary[]>;
}
