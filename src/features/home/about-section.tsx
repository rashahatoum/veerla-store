import Image from "next/image";
import { getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import type { AboutSection as AboutContent } from "@/types/content";

/** "About us" — text is owner-managed (HomeContent.about). Anchor: #about. */
export async function AboutSection({ content }: { content: AboutContent }) {
  const locale = await getLocale();
  const t = (value: Parameters<typeof localize>[0]) => localize(value, locale);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative scroll-mt-128 overflow-hidden bg-plum-950"
    >
      <Image
        src="/assets/imgs/veerla/silk.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-plum-950/80 via-plum-900/75 to-plum-950/85" />

      <div className="reveal relative mx-auto grid max-w-1360 items-center gap-40 px-16 py-72 md:px-32 md:py-96 lg:grid-cols-[5fr_7fr] lg:gap-64">
        <div className="overflow-hidden rounded-card shadow-lift ring-1 ring-gold-500/30">
          <Image
            src="/assets/imgs/veerla/feather-gold.jpg"
            alt=""
            width={780}
            height={380}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-780/380 w-full object-cover lg:aspect-4/5"
          />
        </div>

        <div className="flex flex-col gap-20 text-center lg:text-start">
          <p dir="ltr" className="font-label text-xs tracking-[0.3em] text-gold-300 lg:rtl:text-end">
            OUR STORY
          </p>
          <h2 id="about-title" className="text-[clamp(30px,3.4vw,46px)] leading-[1.35] text-ivory-text">
            {t(content.title)}
          </h2>
          <p className="font-accent text-[clamp(20px,2vw,26px)] leading-[1.6] text-gold-300 italic rtl:font-heading rtl:not-italic">
            {t(content.lead)}
          </p>
          {content.body.map((paragraph, index) => (
            <p key={index} className="text-base leading-[1.95] text-blush-text">
              {t(paragraph)}
            </p>
          ))}
          <p className="mt-8 flex items-center justify-center gap-14 text-lg font-semibold text-gold-300 lg:justify-start">
            <span aria-hidden="true" className="h-px w-36 shrink-0 bg-gold-500" />
            {t(content.closing)}
          </p>
        </div>
      </div>
    </section>
  );
}
