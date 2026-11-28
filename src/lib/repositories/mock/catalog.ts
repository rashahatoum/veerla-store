import { mockProducts } from "@/mocks/catalog";
import { mockProductDetails } from "@/mocks/product-details";
import { placeholderReviews } from "@/mocks/reviews";
import type { ProductSort, ProductSummary } from "@/types/catalog";
import type { CatalogSource } from "../types";

const sorters: Record<ProductSort, (a: ProductSummary, b: ProductSummary) => number> = {
  newest: (a, b) => b.id - a.id,
  best_selling: (a, b) => a.id - b.id,
  price_asc: (a, b) => a.price.usd.amount - b.price.usd.amount,
  price_desc: (a, b) => b.price.usd.amount - a.price.usd.amount,
};

export const mockCatalogSource: CatalogSource = {
  async listProducts({ sort = "newest", tag, limit } = {}) {
    const filtered =
      tag === "offers"
        ? mockProducts.filter((product) => product.compare_at_price !== null)
        : mockProducts;
    const sorted = [...filtered].sort(sorters[sort]);
    return limit ? sorted.slice(0, limit) : sorted;
  },

  async getProduct(slug) {
    return mockProductDetails.find((product) => product.slug === slug) ?? null;
  },

  // Simplified stand-in for the API's scoring (§6): same category first, then the rest.
  async listRelatedProducts(slug, limit) {
    const current = mockProducts.find((product) => product.slug === slug);
    const others = mockProducts.filter((product) => product.slug !== slug);
    const sameCategory = others.filter((p) => p.category.slug === current?.category.slug);
    const rest = others.filter((p) => p.category.slug !== current?.category.slug);
    return [...sameCategory, ...rest].slice(0, limit);
  },

  async listProductReviews(slug) {
    return placeholderReviews.filter((review) => review.product.slug === slug);
  },
};
