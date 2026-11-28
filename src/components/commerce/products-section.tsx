import { ProductCard } from "@/components/commerce/product-card";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/get-dictionary";
import { cx } from "@/lib/cx";
import type { ProductSummary } from "@/types/catalog";

type Props = {
  /** Section id, also used as the anchor (e.g. "offers"). */
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: { href: string; label: string };
  products: ProductSummary[];
  /** "carousel" = shared slider, "grid" = 2 columns on phones → 4 on desktop. */
  layout: "carousel" | "grid";
  /** Show 1, 2, 3… badges on the cards (Best sellers). */
  ranked?: boolean;
  tone?: "ivory" | "nude";
};

// 2 cards on phones, 3 on tablets, 4 on desktop — same for grid and carousel.
const CARD_SIZES = "(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 50vw";

/** Section that shows products (home: Offers, Best sellers, New arrivals; product page: related). */
export async function ProductsSection({
  id,
  eyebrow,
  title,
  subtitle,
  action,
  products,
  layout,
  ranked = false,
  tone = "ivory",
}: Props) {
  const dict = await getDictionary();
  const titleId = `${id}-title`;

  const cards = products.map((product, index) => (
    <ProductCard
      key={product.id}
      product={product}
      sizes={CARD_SIZES}
      rank={ranked ? index + 1 : undefined}
    />
  ));

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cx("scroll-mt-128 py-64 md:py-80", tone === "nude" ? "bg-nude-100" : "bg-ivory")}
    >
      <div className="mx-auto w-full max-w-1360 px-16 md:px-32">
        <SectionHeading id={titleId} eyebrow={eyebrow} title={title} subtitle={subtitle} action={action} />
        {layout === "carousel" ? (
          <Carousel
            label={title}
            labels={{ previous: dict.carousel.previous, next: dict.carousel.next }}
            items={cards}
          />
        ) : (
          <ul className="grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-24 lg:grid-cols-4">
            {cards.map((card, index) => (
              <li key={products[index].id}>{card}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
