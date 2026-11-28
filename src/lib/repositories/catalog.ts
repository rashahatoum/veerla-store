import { cacheLife, cacheTag } from "next/cache";
import type { ProductDetail, ProductListQuery, ProductSummary } from "@/types/catalog";
import type { Review } from "@/types/content";
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

/** Tags: `products` (any catalog change) + `product:{slug}` (this product). */
export async function getProduct(slug: string): Promise<ProductDetail | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);
  return source.getProduct(slug);
}

export async function listRelatedProducts(slug: string, limit = 8): Promise<ProductSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");
  return source.listRelatedProducts(slug, limit);
}

export async function listProductReviews(slug: string): Promise<Review[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("reviews", `product:${slug}`);
  return source.listProductReviews(slug);
}
