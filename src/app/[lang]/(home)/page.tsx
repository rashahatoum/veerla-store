import { BestSellersSection } from "@/features/home/best-sellers-section";
import { BrandValues } from "@/features/home/brand-values";
import { VelvetHero } from "@/features/home/hero/velvet-hero";
import { HowToOrder } from "@/features/home/how-to-order";
import { NewArrivals } from "@/features/home/new-arrivals";
import { OffersSection } from "@/features/home/offers-section";
import { getHomeContent } from "@/lib/repositories/content";
import type { CuratedProductsSection } from "@/types/content";

/** A curated section renders only when the owner turned it on and it has products. */
const visible = (section: CuratedProductsSection) =>
  section.enabled && section.products.length > 0;

// Section order (owner, D-005): hero → values → offers → best sellers →
// new arrivals → about → how to order. About arrives in the next step.
export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <VelvetHero background={content.hero.background} />
      <BrandValues />
      {visible(content.offers) && <OffersSection products={content.offers.products} />}
      {visible(content.best_sellers) && (
        <BestSellersSection products={content.best_sellers.products} />
      )}
      {visible(content.new_arrivals) && <NewArrivals products={content.new_arrivals.products} />}
      <HowToOrder />
    </>
  );
}
