import { mockProducts } from "@/mocks/catalog";
import type { ProductSummary } from "@/types/catalog";
import type { CatalogSource } from "../types";

const sorters: Record<
  NonNullable<Parameters<CatalogSource["listProducts"]>[0]["sort"]>,
  (a: ProductSummary, b: ProductSummary) => number
> = {
  newest: (a, b) => b.id - a.id,
  best_selling: (a, b) => a.id - b.id,
  price_asc: (a, b) => a.price.usd.amount - b.price.usd.amount,
  price_desc: (a, b) => b.price.usd.amount - a.price.usd.amount,
};

export const mockCatalogSource: CatalogSource = {
  async listProducts({ sort = "newest", limit } = {}) {
    const sorted = [...mockProducts].sort(sorters[sort]);
    return limit ? sorted.slice(0, limit) : sorted;
  },
};
