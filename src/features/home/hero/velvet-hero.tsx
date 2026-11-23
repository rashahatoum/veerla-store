import Image from "next/image";
import { SilkWave } from "@/components/silk-wave";
import { ButtonLink, ForwardArrow } from "@/components/ui/button";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import type { MediaImage } from "@/types/content";
import { HeroEffects } from "./hero-effects";
import { LogoIntro } from "./logo-intro";

type Props = {
  /** Owner-managed background (dashboard → HomeContent.hero.background). */
  background: MediaImage;
};

/** Home hero: living velvet + the feather writes the logo (HOME_SPEC.md §3.2, §4.1–4.2). */
export async function VelvetHero({ background }: Props) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.hero;
  const alt = localize(background.alt, locale);

  return (
    <section className="relative overflow-hidden bg-plum-950 md:min-h-780">
      <Image
        src={background.url}
        alt={alt}
        aria-hidden={alt ? undefined : true}
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

        <LogoIntro replayLabel={`${dict.brand.name} — ${t.replayIntro}`} />

        <h1 className="rise rise-d1 mt-4 text-[clamp(34px,4vw,56px)] leading-[1.4] font-normal text-ivory-text">
          {t.title}
        </h1>
        <p className="rise rise-d2 max-w-520 text-[17px] leading-[1.9] font-light text-blush-text">
          {t.subtitle}
        </p>

        <div className="rise rise-d3 mt-10 flex flex-wrap justify-center gap-14">
          <ButtonLink href={`/${locale}/products`} size="lg">
            {t.ctaPrimary}
            <ForwardArrow />
          </ButtonLink>
          <ButtonLink href={`/${locale}/products?category=gifts`} variant="outline-light" size="lg">
            {t.ctaSecondary}
          </ButtonLink>
        </div>
      </div>

      <SilkWave position="bottom" color="var(--color-nude-100)" backOpacity={0.45} />
    </section>
  );
}
