import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { ProductSummary } from "@/types/catalog";
import { ProductsSection } from "@/components/commerce/products-section";

/** Owner-picked, ranked in the chosen order (HomeContent.best_sellers). */
export async function BestSellersSection({ products }: { products: ProductSummary[] }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <ProductsSection
      id="best-sellers"
      eyebrow="BEST SELLERS"
      title={dict.bestSellers.title}
      subtitle={dict.bestSellers.subtitle}
      action={{ href: `/${locale}/products?sort=best_selling`, label: dict.actions.viewAll }}
      products={products}
      layout="carousel"
      ranked
      tone="nude"
    />
  );
}
