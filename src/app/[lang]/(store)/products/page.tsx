import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductListing, ProductListingSkeleton } from "@/features/catalog/product-listing";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { title: dict.products.title };
}

/**
 * All products. Reads ?sort= and ?tag=offers (header nav links), so the
 * listing streams inside Suspense while the page shell stays static.
 */
export default function ProductsPage({ searchParams }: PageProps<"/[lang]/products">) {
  return (
    <Suspense fallback={<ProductListingSkeleton />}>
      <ProductListing searchParams={searchParams} />
    </Suspense>
  );
}
