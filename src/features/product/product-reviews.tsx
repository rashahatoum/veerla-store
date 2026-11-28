import { ReviewCard, Stars } from "@/components/commerce/review-card";
import { format, getDictionary } from "@/i18n/get-dictionary";
import type { ProductDetail } from "@/types/catalog";
import type { Review } from "@/types/content";

/** Approved reviews of this product (anchor #reviews from the rating link). */
export async function ProductReviews({ product, reviews }: { product: ProductDetail; reviews: Review[] }) {
  const dict = await getDictionary();
  const t = dict.productPage;

  return (
    <section id="reviews" aria-labelledby="product-reviews-title" className="scroll-mt-96 border-t border-border/70 pt-48">
      <div className="mb-24 flex flex-wrap items-end justify-between gap-16">
        <h2 id="product-reviews-title" className="text-[clamp(26px,2.6vw,34px)] text-plum-900">
          {dict.reviews.title}
        </h2>
        {product.rating && (
          <div className="flex items-center gap-10">
            <span dir="ltr" className="text-2xl font-bold text-plum-900">
              {product.rating.average.toFixed(1)}
            </span>
            <Stars rating={product.rating.average} label={format(dict.reviews.rating, { rating: product.rating.average })} size={18} />
            <span className="text-sm text-mauve-600">{format(t.reviewsCount, { count: product.rating.count })}</span>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <ul className="grid gap-16 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.id}>
              <ReviewCard review={review} showProduct={false} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card bg-nude-100 px-24 py-40 text-center text-mauve-600">{t.noReviews}</p>
      )}
    </section>
  );
}
