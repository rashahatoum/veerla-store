import Image from "next/image";
import { Feather } from "@/components/brand/feather";
import { getDictionary } from "@/i18n/get-dictionary";

export async function Hero() {
  const dict = await getDictionary();

  return (
    <section className="bg-plum text-ivory">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div className="flex flex-col items-start gap-5">
          <p className="flex items-center gap-2 text-sm text-gold-light">
            <Feather className="size-4" />
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-tight text-balance md:text-5xl">
            {dict.hero.title}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-champagne">
            {dict.hero.subtitle}
          </p>
          <a
            href="#new-arrivals"
            className="rounded-full bg-gold px-7 py-3 text-sm font-medium text-plum transition-colors hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
          >
            {dict.hero.cta}
          </a>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:max-w-md">
          <Image
            src="/assets/imgs/products/cocoa-velvet-set-brown.jpg"
            alt={dict.hero.imageAlt}
            width={960}
            height={1280}
            sizes="(min-width: 768px) 28rem, 90vw"
            preload
            className="aspect-3/4 w-full rounded-t-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2 rounded-t-full border border-gold/50"
          />
        </div>
      </div>
    </section>
  );
}
