import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { ProductSummary } from "@/types/catalog";
import { ProductsSection } from "./products-section";

/** Owner-picked offers (HomeContent.offers), as a grid. The page hides it when off or empty. */
export async function OffersSection({ products }: { products: ProductSummary[] }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <ProductsSection
      id="offers"
      eyebrow="SPECIAL OFFERS"
      title={dict.offers.title}
      subtitle={dict.offers.subtitle}
      action={{ href: `/${locale}/products?tag=offers`, label: dict.actions.viewAll }}
      products={products}
      layout="grid"
    />
  );
}
