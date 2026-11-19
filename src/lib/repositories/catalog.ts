import { cacheLife, cacheTag } from "next/cache";
import type { ProductListQuery, ProductSummary } from "@/types/catalog";
import { mockCatalogSource } from "./mock/catalog";
import type { CatalogSource } from "./types";

// Only the mock source exists until the Laravel API is ready (see API-CONTRACT.md).
// The HTTP source will be selected here via the DATA_SOURCE env var.
const source: CatalogSource = mockCatalogSource;

export async function listProducts(
  query: ProductListQuery = {},
): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return source.listProducts(query);
}
