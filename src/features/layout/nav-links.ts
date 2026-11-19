import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";

export type NavLink = { href: string; label: string };

/** Main navigation, shared by the desktop bar and the mobile menu. */
export function getNavLinks(locale: Locale, dict: Dictionary): NavLink[] {
  const products = `/${locale}/products`;
  return [
    { href: products, label: dict.nav.products },
    { href: `${products}?tag=offers`, label: dict.nav.offers },
    { href: `${products}?sort=best_selling`, label: dict.nav.bestSellers },
    { href: `${products}?sort=newest`, label: dict.nav.newArrivals },
    { href: `/${locale}#about`, label: dict.nav.about },
  ];
}
