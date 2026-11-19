// DTOs mirroring the API described in .local-docs/BACKEND_REQUIREMENTS.md.
// Keys stay snake_case to match the Laravel JSON responses 1:1.

export type Localized = {
  ar: string;
  en: string | null;
};

export type CurrencyCode = "USD" | "SYP";

/** USD amounts are in cents; SYP amounts are whole (new) pounds, already rounded by the API. */
export type Money = {
  amount: number;
  currency: CurrencyCode;
};

export type Price = {
  usd: Money;
  syp: Money;
};

export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export type Color = {
  id: number;
  slug: string;
  name: Localized;
  hex: string;
};

export type Size = {
  id: number;
  label: string;
  system: "letter" | "numeric";
  sort_order: number;
};

export type ProductImage = {
  id: number;
  url: string;
  width: number;
  height: number;
  alt: Localized;
  role: "main" | "back" | "detail" | "other";
};

export type CategoryRef = {
  slug: string;
  name: Localized;
};

/** One color option on a product card, with its main image. */
export type ProductColorOption = {
  color: Color;
  image: ProductImage;
};

export type ProductSummary = {
  id: number;
  slug: string;
  name: Localized;
  category: CategoryRef;
  price: Price;
  colors: ProductColorOption[];
  availability: Availability;
  is_new: boolean;
};

export type ProductListQuery = {
  sort?: "newest" | "best_selling" | "price_asc" | "price_desc";
  limit?: number;
};
