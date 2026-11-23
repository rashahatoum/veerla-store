import type { Money } from "@/types/catalog";

// Latin digits with comma grouping in both locales (owner decision D-003).
const integerFormat = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});
const centsFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Whole-percent discount of an offer, computed on USD cents (the source
 * currency). Returns 0 when there is no real discount.
 */
export function discountPercent(price: Money, compareAt: Money): number {
  if (compareAt.amount <= 0 || price.amount >= compareAt.amount) return 0;
  return Math.round(((compareAt.amount - price.amount) * 100) / compareAt.amount);
}

/**
 * Display-only formatting. Never use the result for arithmetic.
 * USD amounts are cents; SYP amounts are whole pounds.
 */
export function formatMoney(money: Money, sypSuffix: string): string {
  if (money.currency === "USD") {
    const dollars = money.amount / 100;
    const text = Number.isInteger(dollars)
      ? integerFormat.format(dollars)
      : centsFormat.format(dollars);
    return `$${text}`;
  }
  return `${integerFormat.format(money.amount)} ${sypSuffix}`;
}
