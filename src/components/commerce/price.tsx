import { getDictionary } from "@/i18n/get-dictionary";
import { formatMoney } from "@/lib/domain/money";
import type { Price as PriceDto } from "@/types/catalog";

type Props = {
  price: PriceDto;
  className?: string;
};

/**
 * Renders both currencies; CSS shows the one chosen in <html data-currency>.
 * Keeps pages cacheable without reading cookies on the server.
 */
export async function Price({ price, className }: Props) {
  const dict = await getDictionary();
  const suffix = dict.money.sypSuffix;

  return (
    <span className={className}>
      <span data-price="usd" dir="ltr">
        {formatMoney(price.usd, suffix)}
      </span>
      <span data-price="syp">{formatMoney(price.syp, suffix)}</span>
    </span>
  );
}
