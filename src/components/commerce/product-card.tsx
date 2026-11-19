import Image from "next/image";
import Link from "next/link";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import type { ProductSummary } from "@/types/catalog";
import { Price } from "./price";

type Props = {
  product: ProductSummary;
  /** Card width hint for responsive images. */
  sizes?: string;
};

export async function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: Props) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const [first] = product.colors;
  const name = localize(product.name, locale);

  const badge =
    product.availability === "low_stock"
      ? dict.product.lowStock
      : product.availability === "out_of_stock"
        ? dict.product.outOfStock
        : null;

  return (
    <article className="group flex flex-col gap-3">
      {/* Image link duplicates the title link, so it is hidden from keyboard/AT. */}
      <Link
        href={`/${locale}/products/${product.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block overflow-hidden rounded-card bg-surface"
      >
        <Image
          src={first.image.url}
          alt={localize(first.image.alt, locale)}
          width={first.image.width}
          height={first.image.height}
          sizes={sizes}
          className="aspect-3/4 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {badge && (
          <span className="absolute inset-s-3 top-3 rounded-full bg-ivory/90 px-3 py-1 text-xs font-medium text-plum">
            {badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="text-sm font-medium leading-snug">
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="hover:text-mauve focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            {name}
          </Link>
        </h3>
        <Price price={product.price} className="text-sm text-ink-muted" />
        <ul className="flex items-center gap-1.5" aria-label={format(dict.product.colorsCount, { count: product.colors.length })}>
          {product.colors.map(({ color }) => {
            const colorName = localize(color.name, locale);
            return (
              <li key={color.id}>
                <span
                  className="block size-3.5 rounded-full border border-line"
                  style={{ backgroundColor: color.hex }}
                  title={colorName}
                />
                <span className="sr-only">
                  {format(dict.product.colorLabel, { name: colorName })}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
