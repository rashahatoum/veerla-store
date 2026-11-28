import { ReviewCard } from "@/components/commerce/review-card";
import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Review } from "@/types/content";

/** Owner-picked approved reviews (HomeContent.reviews), in the shared Carousel. */
export async function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const dict = await getDictionary();
  const t = dict.reviews;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-128 bg-nude-100 py-64 md:py-80">
      <div className="mx-auto w-full max-w-1360 px-16 md:px-32">
        <SectionHeading id="reviews-title" eyebrow="REVIEWS" title={t.title} subtitle={t.subtitle} />
        <Carousel
          label={t.title}
          labels={{ previous: dict.carousel.previous, next: dict.carousel.next }}
          items={reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          itemClassName="w-full sm:w-[calc((100%-12px)/2)] md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
        />
      </div>
    </section>
  );
}
