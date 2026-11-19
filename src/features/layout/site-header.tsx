import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CurrencySwitch } from "@/features/currency/currency-switch";
import { LocaleSwitch } from "@/features/locale/locale-switch";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function SiteHeader() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const otherLocale = locale === "ar" ? "en" : "ar";

  const trustItems = [
    dict.trustBar.delivery,
    dict.trustBar.pickup,
    dict.trustBar.whatsapp,
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ivory/95 backdrop-blur">
      <div className="bg-plum text-ivory">
        <ul className="mx-auto flex max-w-6xl justify-center gap-x-6 overflow-x-auto px-4 py-2 text-[0.7rem] whitespace-nowrap sm:text-xs">
          {trustItems.map((item, index) => (
            <li key={item} className={index > 0 ? "hidden sm:block" : undefined}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3">
        {/* Hidden on small phones: the hero CTA already leads to new arrivals. */}
        <nav
          aria-label={dict.nav.label}
          className="hidden gap-5 text-sm whitespace-nowrap sm:flex"
        >
          <a href="#new-arrivals" className="hover:text-mauve">
            {dict.nav.newArrivals}
          </a>
          <a href="#how-to-order" className="hover:text-mauve">
            {dict.nav.howToOrder}
          </a>
        </nav>

        <Link
          href={`/${locale}`}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <Logo name={dict.brand.name} tagline={dict.brand.tagline} />
        </Link>

        <div className="flex items-center justify-end gap-1.5">
          <LocaleSwitch
            target={otherLocale}
            label={dict.switches.switchTo}
            groupLabel={dict.switches.languageLabel}
          />
          <CurrencySwitch
            labels={{
              group: dict.switches.currencyLabel,
              usd: dict.switches.usd,
              syp: dict.switches.syp,
              usdName: dict.switches.usdName,
              sypName: dict.switches.sypName,
            }}
          />
        </div>
      </div>
    </header>
  );
}
