import { getDictionary } from "@/i18n/get-dictionary";
import { formatMoney } from "@/lib/domain/money";
import { cx } from "@/lib/cx";
import type { Price as PriceDto } from "@/types/catalog";

type Props = {
  price: PriceDto;
  /** Regular price while an offer is active: shown struck through. */
  compareAt?: PriceDto | null;
  className?: string;
};

/**
 * Renders both currencies; CSS shows the one chosen in <html data-currency>.
 * Keeps pages cacheable without reading cookies on the server.
 */
export async function Price({ price, compareAt, className }: Props) {
  const dict = await getDictionary();
  const suffix = dict.money.sypSuffix;

  const amounts = (value: PriceDto) => (
    <>
      <span data-price="usd" dir="ltr">
        {formatMoney(value.usd, suffix)}
      </span>
      <span data-price="syp">{formatMoney(value.syp, suffix)}</span>
    </>
  );

  if (!compareAt) {
    return <span className={className}>{amounts(price)}</span>;
  }

  return (
    <span className={cx("inline-flex flex-wrap items-baseline gap-x-8", className)}>
      <span className="text-sale">
        <span className="sr-only">{dict.product.nowPrice} </span>
        {amounts(price)}
      </span>
      <s className="text-xs font-normal text-mauve-600/80">
        <span className="sr-only">{dict.product.wasPrice} </span>
        {amounts(compareAt)}
      </s>
    </span>
  );
}
