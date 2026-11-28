import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { ProductSummary } from "@/types/catalog";
import { ProductsSection } from "@/components/commerce/products-section";

/** Owner-picked, in order (HomeContent.new_arrivals), as a slider. */
export async function NewArrivals({ products }: { products: ProductSummary[] }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <ProductsSection
      id="new-arrivals"
      eyebrow="NEW IN"
      title={dict.newArrivals.title}
      subtitle={dict.newArrivals.subtitle}
      action={{ href: `/${locale}/products?sort=newest`, label: dict.actions.viewAll }}
      products={products}
      layout="carousel"
    />
  );
}
