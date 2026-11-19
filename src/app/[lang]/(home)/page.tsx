import { BrandValues } from "@/features/home/brand-values";
import { Hero } from "@/features/home/hero";
import { HowToOrder } from "@/features/home/how-to-order";
import { NewArrivals } from "@/features/home/new-arrivals";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandValues />
      <NewArrivals />
      <HowToOrder />
    </>
  );
}
