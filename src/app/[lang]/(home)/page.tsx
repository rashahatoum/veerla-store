import { AboutSection } from "@/features/home/about-section";
import { BestSellersSection } from "@/features/home/best-sellers-section";
import { BrandValues } from "@/features/home/brand-values";
import { VelvetHero } from "@/features/home/hero/velvet-hero";
import { HowToOrder } from "@/features/home/how-to-order";
import { NewArrivals } from "@/features/home/new-arrivals";
import { OffersSection } from "@/features/home/offers-section";
import { ReviewsSection } from "@/features/home/reviews-section";
import { getHomeContent } from "@/lib/repositories/content";
import type { CuratedProductsSection } from "@/types/content";

/** A curated section renders only when the owner turned it on and it has products. */
const visible = (section: CuratedProductsSection) =>
  section.enabled && section.products.length > 0;

// Section order (owner, D-005): hero → values → offers → best sellers →
// new arrivals → about → how to order → reviews. Owner-disabled sections are not rendered.
export default async function HomePage() {
  const content = await getHomeContent();
  const { offers, best_sellers, new_arrivals, about, reviews } = content;

  return (
    <>
      <VelvetHero background={content.hero.background} />
      <BrandValues />
      {visible(offers) && <OffersSection products={offers.products} />}
      {visible(best_sellers) && <BestSellersSection products={best_sellers.products} />}
      {visible(new_arrivals) && <NewArrivals products={new_arrivals.products} />}
      {about.enabled && <AboutSection content={about} />}
      <HowToOrder />
      {reviews.enabled && reviews.items.length > 0 && <ReviewsSection reviews={reviews.items} />}
    </>
  );
}
