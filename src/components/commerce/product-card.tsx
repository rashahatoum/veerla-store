import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
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
    <Card className="flex flex-col">
      {/* Image link duplicates the title link, so it is hidden from keyboard/AT. */}
      <Link
        href={`/${locale}/products/${product.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative m-8 mb-0 block overflow-hidden rounded-field bg-nude-100"
      >
        <Image
          src={first.image.url}
          alt={localize(first.image.alt, locale)}
          width={first.image.width}
          height={first.image.height}
          sizes={sizes}
          className="aspect-3/4 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {badge && (
          <span className="absolute inset-s-10 top-10 rounded-full bg-card/90 px-12 py-4 text-xs font-semibold text-plum-800 shadow-soft backdrop-blur-sm">
            {badge}
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-6 px-16 pt-12 pb-16">
        <h3 className="text-[15px] leading-snug font-semibold">
          {/* The stretched ::after makes the whole card clickable. */}
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-plum-700 focus-visible:outline-none"
          >
            {name}
          </Link>
        </h3>
        <Price price={product.price} className="text-sm font-semibold text-plum-800" />
        <ul className="flex items-center gap-6" aria-label={format(dict.product.colorsCount, { count: product.colors.length })}>
          {product.colors.map(({ color }) => {
            const colorName = localize(color.name, locale);
            return (
              <li key={color.id}>
                <span
                  className="block size-14 rounded-full border border-border-strong shadow-[inset_0_0_0_2px_var(--color-card)]"
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
    </Card>
  );
}
