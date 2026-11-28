import type { Availability, ProductDetail } from "@/types/catalog";

/** colorSlug → sizeLabel → availability. Missing variant = out_of_stock. */
export type AvailabilityMatrix = Record<string, Record<string, Availability>>;

export function availabilityMatrix(product: ProductDetail): AvailabilityMatrix {
  const matrix: AvailabilityMatrix = {};
  for (const { color } of product.colors) {
    matrix[color.slug] = {};
    for (const size of product.sizes) {
      const variant = product.variants.find(
        (item) => item.color_id === color.id && item.size_id === size.id,
      );
      matrix[color.slug][size.label] = variant?.availability ?? "out_of_stock";
    }
  }
  return matrix;
}

/** A color is selectable when at least one of its sizes can be bought. */
export function isColorAvailable(matrix: AvailabilityMatrix, colorSlug: string): boolean {
  return Object.values(matrix[colorSlug] ?? {}).some((value) => value !== "out_of_stock");
}
