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
      className="mx-auto w-full max-w-6xl scroll-mt-32 px-4 py-14"
    >
      <div className="mb-8 flex flex-col items-center gap-2 text-center">
        <h2 id="new-arrivals-title" className="font-display text-3xl">
          {dict.newArrivals.title}
        </h2>
        <p className="text-sm text-ink-muted">{dict.newArrivals.subtitle}</p>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
