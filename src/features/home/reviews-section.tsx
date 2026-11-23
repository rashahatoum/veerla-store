import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import type { Review } from "@/types/content";

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <span role="img" aria-label={label} className="flex gap-2 text-gold-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** Owner-picked approved reviews (HomeContent.reviews), in the shared Carousel. */
export async function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.reviews;

  const cards = reviews.map((review) => (
    <Card key={review.id} interactive={false} className="flex h-full flex-col gap-14 p-24">
      <div className="flex items-center justify-between gap-12">
        <Stars rating={review.rating} label={format(t.rating, { rating: review.rating })} />
        <svg aria-hidden="true" width="30" height="30" viewBox="0 0 24 24" className="text-gold-500/35">
          <path
            fill="currentColor"
            d="M9.5 6C6.5 7 4.5 9.6 4.5 13v5h6v-6h-3c0-2 1.2-3.6 2.8-4.3zm10 0c-3 1-5 3.6-5 7v5h6v-6h-3c0-2 1.2-3.6 2.8-4.3z"
          />
        </svg>
      </div>
      {/* The customer's own words, in her language. */}
      <blockquote dir="auto" className="flex-1 text-[15px] leading-[1.9] text-plum-900">
        {review.body}
      </blockquote>
      <footer className="flex flex-col gap-2 border-t border-border/70 pt-12 text-sm">
        <span dir="auto" className="font-semibold text-plum-900">
          {review.customer_display_name}
        </span>
        <Link
          href={`/${locale}/products/${review.product.slug}`}
          className="w-fit text-mauve-600 underline-offset-4 transition-colors hover:text-plum-700 hover:underline focus-visible:outline-2 focus-visible:outline-plum-700"
        >
          {localize(review.product.name, locale)}
        </Link>
      </footer>
    </Card>
  ));

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-128 bg-nude-100 py-64 md:py-80">
      <div className="mx-auto w-full max-w-1360 px-16 md:px-32">
        <SectionHeading id="reviews-title" eyebrow="REVIEWS" title={t.title} subtitle={t.subtitle} />
        <Carousel
          label={t.title}
          labels={{ previous: dict.carousel.previous, next: dict.carousel.next }}
          items={cards}
          itemClassName="w-full sm:w-[calc((100%-12px)/2)] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
        />
      </div>
    </section>
  );
}
