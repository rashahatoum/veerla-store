import Image from "next/image";
import Link from "next/link";
import { IconLink } from "@/components/ui/icon-button";
import { CurrencySwitch } from "@/features/currency/currency-switch";
import { LocaleSwitch } from "@/features/locale/locale-switch";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { BagIcon, HeartIcon, SearchIcon } from "./header-icons";
import { HeaderLogo } from "./header-logo";
import { MobileMenu } from "./mobile-menu";
import { getNavLinks } from "./nav-links";

type Props = {
  /** The home hero writes the logo itself, so the header hides it there. */
  showLogo?: boolean;
};

export async function SiteHeader({ showLogo = true }: Props) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const links = getNavLinks(locale, dict);
  const announcements = [
    dict.announcement.delivery,
    dict.announcement.pickup,
    dict.announcement.whatsapp,
  ];

  const switches = (
    <>
      <LocaleSwitch
        target={locale === "ar" ? "en" : "ar"}
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
    </>
  );

  return (
    <header className="relative overflow-hidden border-b border-gold-500/45 bg-plum-900 text-ivory-text">
      <Image
        src="/assets/imgs/veerla/velvet.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-plum-950/55" />

      {/* Announcement bar */}
      <div className="relative overflow-hidden bg-[rgba(20,4,15,0.55)] py-8 text-[13px] text-gold-ink">
        {/* Phones: all announcements scroll as a CSS ticker (two identical copies
            make the loop seamless; the copy is hidden from assistive tech). */}
        <div className="announce-ticker flex sm:hidden">
          {[false, true].map((isCopy) => (
            <ul
              key={String(isCopy)}
              aria-label={isCopy ? undefined : dict.announcement.label}
              aria-hidden={isCopy || undefined}
              className="flex shrink-0 items-center gap-22 pe-22"
            >
              {announcements.map((text) => (
                <li key={text} className="flex items-center gap-22 whitespace-nowrap">
                  <span aria-hidden="true" className="size-4 rotate-45 bg-gold-500" />
                  {text}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Tablets and up: everything fits, static and centered. */}
        <ul
          aria-label={dict.announcement.label}
          className="hidden flex-wrap items-center justify-center gap-x-22 gap-y-4 px-16 text-center sm:flex"
        >
          {announcements.map((text, index) => (
            <li key={text} className="flex items-center gap-22">
              {index > 0 && (
                <span aria-hidden="true" className="size-4 rotate-45 bg-gold-500" />
              )}
              {text}
            </li>
          ))}
        </ul>
      </div>

      {/* Main row */}
      <div className="relative mx-auto flex min-h-76 max-w-1360 items-center justify-between gap-20 px-16 py-6 md:px-32">
        <div className="flex items-center gap-32">
          {showLogo && (
            <HeaderLogo href={`/${locale}`} label={dict.brand.homeLabel} />
          )}
          <nav aria-label={dict.nav.label} className="hidden lg:block">
            <ul className="flex gap-x-30 text-[15px] font-medium">
              {links.map((link, index) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-12 transition-colors hover:text-gold-300 ${
                      index === 1 ? "text-gold-300" : "text-ivory-text"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Phones: search / wishlist / bag at the start (right in Arabic), logo in
            the middle, menu at the end (left). Desktop: logo + nav, then actions. */}
        <div className="flex items-center gap-8 max-lg:order-first">
          <div className="me-8 hidden items-center gap-8 lg:flex">{switches}</div>
          <IconLink href={`/${locale}/search`} aria-label={dict.actions.search}>
            <SearchIcon />
          </IconLink>
          <IconLink href={`/${locale}/wishlist`} aria-label={dict.actions.wishlist}>
            <HeartIcon />
          </IconLink>
          <IconLink href={`/${locale}/cart`} aria-label={dict.actions.cart}>
            <BagIcon />
          </IconLink>
        </div>

        <div className="flex lg:hidden">
          <MobileMenu
            links={links}
            labels={{
              open: dict.nav.openMenu,
              close: dict.nav.closeMenu,
              nav: dict.nav.label,
            }}
            switches={switches}
          />
        </div>
      </div>
    </header>
  );
}
