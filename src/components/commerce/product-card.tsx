import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import { discountPercent } from "@/lib/domain/money";
import type { ProductSummary } from "@/types/catalog";
import { Price } from "./price";

type Props = {
  product: ProductSummary;
  /** Card width hint for responsive images. */
  sizes?: string;
  /** Position in a ranked list (Best sellers): shown as a gold numbered badge. */
  rank?: number;
};

export async function ProductCard({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  rank,
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
  const discount = product.compare_at_price
    ? discountPercent(product.price.usd, product.compare_at_price.usd)
    : 0;

  return (
    <Card className="flex h-full flex-col">
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
        {/* Only the short discount badge sits on the photo; everything else is in the card body. */}
        {discount > 0 && (
          // dir="ltr" stays on the inner text: on the outer span it would flip inset-s.
          <span className="absolute inset-s-8 top-8 rounded-full bg-sale px-10 py-3 text-xs font-bold text-ivory-text shadow-soft">
            <bdi dir="ltr">-{discount}%</bdi>
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-6 px-16 pt-12 pb-16">
        {(rank !== undefined || badge) && (
          <div className="flex flex-wrap items-center gap-6">
            {rank !== undefined && (
              <span className="inline-flex h-24 min-w-24 items-center justify-center rounded-full bg-plum-900 px-8 text-xs font-bold text-gold-300 ring-1 ring-gold-500/60">
                #{rank}
              </span>
            )}
            {badge && (
              <span className="inline-flex h-24 items-center rounded-full bg-sale/10 px-10 text-[11px] font-semibold whitespace-nowrap text-sale">
                {badge}
              </span>
            )}
          </div>
        )}
        <h3 className="text-[15px] leading-snug font-semibold">
          {/* The stretched ::after makes the whole card clickable. */}
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-plum-700 focus-visible:outline-none"
          >
            {name}
          </Link>
        </h3>
        <Price
          price={product.price}
          compareAt={product.compare_at_price}
          className="mt-auto text-sm font-semibold text-plum-800"
        />
        <ul className="mt-2 flex items-center gap-8" aria-label={format(dict.product.colorsCount, { count: product.colors.length })}>
          {product.colors.map(({ color }) => {
            const colorName = localize(color.name, locale);
            return (
              <li key={color.id}>
                <span
                  className="block size-20 rounded-full border border-border-strong shadow-[inset_0_0_0_2px_var(--color-card)]"
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
