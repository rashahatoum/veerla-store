import Image from "next/image";
import Link from "next/link";
import { SilkWave } from "@/components/silk-wave";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { HeroEffects } from "./hero-effects";
import { LogoIntro } from "./logo-intro";

/** Home hero: living velvet + the feather writes the logo (HOME_SPEC.md §3.2, §4.1–4.2). */
export async function VelvetHero() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.hero;

  return (
    <section className="relative overflow-hidden bg-plum-950 md:min-h-780">
      <Image
        src="/assets/imgs/veerla/velvet.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        preload
        className="velvet object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_42%,rgba(31,7,24,0.05)_0%,rgba(31,7,24,0.7)_100%)]"
      />
      <HeroEffects />

      <div className="relative mx-auto flex max-w-1360 flex-col items-center gap-18 px-20 pt-32 pb-112 text-center md:px-32 md:pt-40 md:pb-128">
        <p className="rise flex items-center gap-14 text-sm font-medium text-gold-300">
          <span aria-hidden="true" className="h-px w-36 bg-gold-500" />
          <span>{t.eyebrow}</span>
          <span dir="ltr" className="font-label text-xs tracking-[0.32em]">
            {t.eyebrowLatin}
          </span>
          <span aria-hidden="true" className="h-px w-36 bg-gold-500" />
        </p>

        <LogoIntro label={dict.brand.name} />

        <h1 className="rise rise-d1 mt-4 text-[clamp(30px,3.4vw,48px)] font-normal text-ivory-text">
          {t.title}
        </h1>
        <p className="rise rise-d2 max-w-520 text-[17px] leading-[1.9] font-light text-blush-text">
          {t.subtitle}
        </p>

        <div className="rise rise-d3 mt-10 flex flex-wrap justify-center gap-14">
          <Link
            href={`/${locale}/products`}
            className="btn-gold inline-flex min-h-56 items-center gap-12 rounded-btn bg-gold-500 px-36 text-base font-semibold text-plum-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            {t.ctaPrimary}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ltr:-scale-x-100"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </Link>
          <Link
            href={`/${locale}/products?category=gifts`}
            className="inline-flex min-h-56 items-center rounded-btn border border-ivory-text/50 bg-plum-950/25 px-32 text-base font-medium text-ivory-text transition-colors hover:bg-plum-950/45 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </div>

      <SilkWave position="bottom" color="var(--color-nude-100)" backOpacity={0.45} />
    </section>
  );
}
