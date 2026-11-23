import { BrandValues } from "@/features/home/brand-values";
import { VelvetHero } from "@/features/home/hero/velvet-hero";
import { HowToOrder } from "@/features/home/how-to-order";
import { NewArrivals } from "@/features/home/new-arrivals";
import { getHomeContent } from "@/lib/repositories/content";

// Section order (owner, 2026-11-23): hero → values → offers → best sellers →
// new arrivals → about → how to order. Offers, best sellers and about arrive
// in the next steps; sections the owner turns off are not rendered at all.
export default async function HomePage() {
  const content = await getHomeContent();

  return (
    <>
      <VelvetHero background={content.hero.background} />
      <BrandValues />
      {content.new_arrivals.enabled && content.new_arrivals.products.length > 0 && (
        <NewArrivals products={content.new_arrivals.products} />
      )}
      <HowToOrder />
    </>
  );
}
