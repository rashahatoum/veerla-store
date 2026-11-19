import { ProductCard } from "@/components/commerce/product-card";
import { getDictionary } from "@/i18n/get-dictionary";
import { listProducts } from "@/lib/repositories/catalog";

export async function NewArrivals() {
  const [dict, products] = await Promise.all([
    getDictionary(),
    listProducts({ sort: "newest", limit: 8 }),
  ]);

  return (
    <section
      id="new-arrivals"
      aria-labelledby="new-arrivals-title"
      className="mx-auto w-full max-w-6xl scroll-mt-128 px-16 py-56"
    >
      <div className="mb-32 flex flex-col items-center gap-8 text-center">
        <h2 id="new-arrivals-title" className="font-display text-3xl">
          {dict.newArrivals.title}
        </h2>
        <p className="text-sm text-ink-muted">{dict.newArrivals.subtitle}</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-16 gap-y-32 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
