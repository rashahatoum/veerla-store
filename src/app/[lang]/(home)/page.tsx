import { BrandValues } from "@/features/home/brand-values";
import { VelvetHero } from "@/features/home/hero/velvet-hero";
import { HowToOrder } from "@/features/home/how-to-order";
import { NewArrivals } from "@/features/home/new-arrivals";

// Sections below the hero are the Phase 1 versions; they will be replaced
// one by one following HOME_SPEC.md §3 after the hero is reviewed.
export default function HomePage() {
  return (
    <>
      <VelvetHero />
      <BrandValues />
      <NewArrivals />
      <HowToOrder />
    </>
  );
}
