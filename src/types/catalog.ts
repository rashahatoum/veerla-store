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
  /** Price charged now (the offer price while an offer is active). */
  price: Price;
  /** Regular price while an offer is active, otherwise null (BACKEND_REQUIREMENTS §4 Offers). */
  compare_at_price: Price | null;
  colors: ProductColorOption[];
  availability: Availability;
  is_new: boolean;
};

/** One color of a product with its own ordered gallery (first image = main). */
export type ProductColorGallery = {
  color: Color;
  images: ProductImage[];
};

/** Sellable unit: one color × one size. Public data never exposes stock counts. */
export type ProductVariant = {
  id: number;
  color_id: number;
  size_id: number;
  availability: Availability;
};

/** Body measurements per size, in centimetres. */
export type SizeChart = {
  measurements: Localized[];
  rows: { size: string; values: number[] }[];
};

/** GET /products/{slug} (BACKEND_REQUIREMENTS §9). */
export type ProductDetail = Omit<ProductSummary, "colors"> & {
  description: Localized;
  fabric: Localized | null;
  care: Localized | null;
  /** e.g. "Runs small — take one size up". */
  fit_note: Localized | null;
  colors: ProductColorGallery[];
  sizes: Size[];
  variants: ProductVariant[];
  size_chart: SizeChart | null;
  /** Approved reviews only; null when there are none. */
  rating: { average: number; count: number } | null;
};

export const PRODUCT_SORTS = ["newest", "best_selling", "price_asc", "price_desc"] as const;
export type ProductSort = (typeof PRODUCT_SORTS)[number];

export type ProductListQuery = {
  sort?: ProductSort;
  /** "offers" = only products with an active offer. */
  tag?: "offers";
  limit?: number;
};
