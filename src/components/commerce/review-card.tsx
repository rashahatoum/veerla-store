import Link from "next/link";
import { Card } from "@/components/ui/card";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import type { Review } from "@/types/content";

export function Stars({ rating, label, size = 16 }: { rating: number; label: string; size?: number }) {
  return (
    <span role="img" aria-label={label} className="flex gap-2 text-gold-500">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          aria-hidden="true"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "currentColor" : "none"}
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

/** One approved review. `showProduct` adds a link to the reviewed product (home slider). */
export async function ReviewCard({ review, showProduct = true }: { review: Review; showProduct?: boolean }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <Card interactive={false} className="flex h-full flex-col gap-14 p-24">
      <div className="flex items-center justify-between gap-12">
        <Stars rating={review.rating} label={format(dict.reviews.rating, { rating: review.rating })} />
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
        {showProduct && (
          <Link
            href={`/${locale}/products/${review.product.slug}`}
            className="w-fit text-mauve-600 underline-offset-4 transition-colors hover:text-plum-700 hover:underline focus-visible:outline-2 focus-visible:outline-plum-700"
          >
            {localize(review.product.name, locale)}
          </Link>
        )}
      </footer>
    </Card>
  );
}
