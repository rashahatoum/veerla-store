import { ProductCard } from "@/components/commerce/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import type { ProductSummary } from "@/types/catalog";

type Props = {
  /** Owner-picked, in order (HomeContent.new_arrivals). */
  products: ProductSummary[];
};

export async function NewArrivals({ products }: Props) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-title"
      className="mx-auto w-full max-w-1360 scroll-mt-128 px-16 py-64 md:px-32"
    >
      <SectionHeading
        id="new-arrivals-title"
        eyebrow="NEW IN"
        title={dict.newArrivals.title}
        subtitle={dict.newArrivals.subtitle}
        action={{ href: `/${locale}/products?sort=newest`, label: dict.actions.viewAll }}
      />

      <ul className="grid grid-cols-2 gap-x-12 gap-y-20 md:gap-x-24 md:gap-y-32 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
