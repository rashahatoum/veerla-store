import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { IconLink } from "@/components/ui/icon-button";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { formatPhone, whatsappUrl } from "@/lib/domain/contact";
import { getPublicSettings } from "@/lib/repositories/settings";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "./header-icons";
import { getNavLinks } from "./nav-links";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-14">
      <h2 className="font-sans text-sm font-bold tracking-wide text-gold-300">{title}</h2>
      <ul className="flex flex-col gap-10 text-sm">{children}</ul>
    </div>
  );
}

const footerLink =
  "inline-flex min-h-32 items-center text-blush-text transition-colors hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300";

/** "Payment: Sham Cash · Cash on delivery" — information, not a control. */
function InfoLine({ icon, label, children }: { icon: ReactNode; label: string; children: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-2">
      <dt className="flex items-center gap-10 font-semibold text-gold-300">
        {icon}
        {label}
      </dt>
      <dd className="text-blush-text">
        {children.map((text, index) => (
          <span key={text}>
            {index > 0 && (
              <span aria-hidden="true" className="mx-8 text-gold-500/70">
                ·
              </span>
            )}
            {text}
          </span>
        ))}
      </dd>
    </div>
  );
}

function SmallIcon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const WalletIcon = () => (
  <SmallIcon>
    <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" />
    <path d="M4 7.5V18a2 2 0 0 0 2 2h14V8H6.5A2.5 2.5 0 0 1 4 7.5z" />
    <path d="M16.5 14h.01" />
  </SmallIcon>
);

const TruckIcon = () => (
  <SmallIcon>
    <path d="M3 6h11v10H3z" />
    <path d="M14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </SmallIcon>
);

/** Site footer (HOME_SPEC §3 #10, adapted in D-006). Contact data comes from public settings. */
export async function SiteFooter() {
  const [locale, dict, settings] = await Promise.all([
    getLocale(),
    getDictionary(),
    getPublicSettings(),
  ]);
  const t = dict.footer;
  const shopLinks = getNavLinks(locale, dict).slice(0, 4); // products, offers, best sellers, new
  const whatsapp = whatsappUrl(settings.whatsapp_number);

  // Only accounts the owner has filled in (null = hidden).
  const socials: { href: string; label: string; icon: ReactNode }[] = [
    { href: settings.social.instagram, label: t.instagram, icon: <InstagramIcon /> },
    { href: settings.social.facebook, label: t.facebook, icon: <FacebookIcon /> },
    { href: whatsapp, label: t.whatsapp, icon: <WhatsAppIcon /> },
  ].flatMap((item) => (item.href ? [{ ...item, href: item.href }] : []));

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-gold-500/45 bg-plum-950 text-ivory-text">
      <Image
        src="/assets/imgs/veerla/velvet.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-plum-950/80" />

      <div className="relative mx-auto max-w-1360 px-16 pt-56 pb-28 md:px-32 md:pt-72">
        <div className="grid gap-40 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-48">
          {/* Brand */}
          <div className="flex flex-col items-start gap-16">
            <Link
              href={`/${locale}`}
              aria-label={dict.brand.homeLabel}
              className="relative block h-80 w-124 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
            >
              <Image src="/assets/imgs/veerla/logo-gold.webp" alt="" fill sizes="124px" className="object-contain" />
            </Link>
            <p className="max-w-360 text-sm leading-[1.9] text-blush-text">{t.about}</p>
            <ul className="flex gap-8" aria-label={t.followUs}>
              {socials.map((item) => (
                <li key={item.label}>
                  <IconLink href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                    {item.icon}
                  </IconLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns: side by side on phones, so the footer stays short. */}
          <div className="grid grid-cols-2 gap-24 lg:contents">
            <Column title={t.shop}>
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </Column>
            <Column title={t.help}>
              <li>
                <Link href={`/${locale}#how-to-order`} className={footerLink}>
                  {dict.howToOrder.title}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#about`} className={footerLink}>
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}#reviews`} className={footerLink}>
                  {dict.reviews.title}
                </Link>
              </li>
            </Column>
          </div>

          {/* Contact */}
          <Column title={t.contact}>
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-8`}>
                <WhatsAppIcon />
                <span dir="ltr">{formatPhone(settings.whatsapp_number)}</span>
              </a>
            </li>
            {settings.returns_window_hours !== null && (
              <li className="text-blush-text">
                {format(t.returns, { hours: settings.returns_window_hours })}
              </li>
            )}
          </Column>
        </div>

        {/* Payment (start) + fulfillment (end) as plain info lines — only what the owner enabled. */}
        <dl className="mt-40 flex flex-col gap-10 border-t border-gold-500/20 pt-24 text-sm md:flex-row md:items-center md:justify-between">
          <InfoLine icon={<WalletIcon />} label={t.paymentLabel}>
            {settings.payment_methods.map((method) => t.paymentMethods[method])}
          </InfoLine>
          <InfoLine icon={<TruckIcon />} label={t.fulfillmentLabel}>
            {settings.fulfillment_methods.map((method) => t.fulfillmentMethods[method])}
          </InfoLine>
        </dl>

        {/* Copyright, centered */}
        <p className="mt-28 border-t border-gold-500/20 pt-20 text-center text-xs text-blush-text/70">
          © 2026 {dict.brand.name}. {t.rights}
          <span aria-hidden="true" className="mx-8 text-gold-500/60">
            ·
          </span>
          <span dir="ltr">{t.credit}</span>
        </p>
      </div>
    </footer>
  );
}
