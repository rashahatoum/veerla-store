import Link from "next/link";
import { ProductCard } from "@/components/commerce/product-card";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { cx } from "@/lib/cx";
import { listProducts } from "@/lib/repositories/catalog";
import { PRODUCT_SORTS, type ProductListQuery, type ProductSort } from "@/types/catalog";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

/** Unknown values fall back to defaults, so hand-edited URLs never break the page. */
function parseQuery(params: Awaited<SearchParams>): Required<Pick<ProductListQuery, "sort">> & ProductListQuery {
  const sort = first(params.sort);
  return {
    sort: PRODUCT_SORTS.includes(sort as ProductSort) ? (sort as ProductSort) : "newest",
    tag: first(params.tag) === "offers" ? "offers" : undefined,
  };
}

const CARD_SIZES = "(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 50vw";
const GRID = "grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-24 lg:grid-cols-4";

const chip =
  "inline-flex min-h-40 items-center rounded-btn border px-16 text-sm font-semibold whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum-700";
const chipIdle = "border-border bg-card text-plum-900 hover:border-gold-500 hover:shadow-soft";
const chipActive = "border-plum-900 bg-plum-900 text-ivory-text shadow-soft";

export async function ProductListing({ searchParams }: { searchParams: SearchParams }) {
  const [locale, dict, params] = await Promise.all([getLocale(), getDictionary(), searchParams]);
  const query = parseQuery(params);
  const products = await listProducts(query);
  const t = dict.products;

  const href = (next: ProductListQuery) => {
    const search = new URLSearchParams();
    if (next.tag) search.set("tag", next.tag);
    if (next.sort && next.sort !== "newest") search.set("sort", next.sort);
    const qs = search.toString();
    return `/${locale}/products${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mx-auto w-full max-w-1360 px-16 pt-40 pb-80 md:px-32 md:pt-56">
      <header className="mb-28 flex flex-col gap-6">
        <p dir="ltr" className="font-label text-xs tracking-[0.3em] text-gold-700 rtl:text-end">
          {query.tag === "offers" ? "SPECIAL OFFERS" : "THE COLLECTION"}
        </p>
        <h1 className="text-[clamp(30px,3.4vw,46px)] leading-[1.35] text-plum-900">
          {query.tag === "offers" ? t.offersTitle : t.title}
        </h1>
        <p className="text-sm text-mauve-600">{format(t.count, { count: products.length })}</p>
      </header>

      {/* Filters + sort as plain links: work without JS and are shareable URLs. */}
      <div className="mb-28 flex flex-col gap-14 border-y border-border/70 py-16 md:flex-row md:items-center md:justify-between">
        <nav aria-label={t.filterLabel} className="flex gap-8">
          <Link
            href={href({ sort: query.sort })}
            aria-current={!query.tag ? "page" : undefined}
            className={cx(chip, !query.tag ? chipActive : chipIdle)}
          >
            {t.all}
          </Link>
          <Link
            href={href({ sort: query.sort, tag: "offers" })}
            aria-current={query.tag === "offers" ? "page" : undefined}
            className={cx(chip, query.tag === "offers" ? chipActive : chipIdle)}
          >
            {t.offersOnly}
          </Link>
        </nav>

        <nav aria-label={t.sortLabel} className="-mx-16 flex items-center gap-8 overflow-x-auto px-16 pb-2 scrollbar-none md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-sm text-mauve-600">{t.sortLabel}:</span>
          {PRODUCT_SORTS.map((sort) => (
            <Link
              key={sort}
              href={href({ sort, tag: query.tag })}
              aria-current={query.sort === sort ? "page" : undefined}
              className={cx(chip, query.sort === sort ? chipActive : chipIdle)}
            >
              {t.sort[sort]}
            </Link>
          ))}
        </nav>
      </div>

      {products.length > 0 ? (
        <ul className={GRID}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} sizes={CARD_SIZES} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-card bg-nude-100 px-24 py-56 text-center text-mauve-600">{t.empty}</p>
      )}
    </div>
  );
}

/** Same shape as the real listing, so nothing jumps when it streams in. */
export function ProductListingSkeleton() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-1360 animate-pulse px-16 pt-40 pb-80 md:px-32 md:pt-56">
      <div className="mb-28 flex flex-col gap-10">
        <div className="h-12 w-120 rounded-full bg-nude-100" />
        <div className="h-40 w-240 rounded-full bg-nude-100" />
        <div className="h-14 w-80 rounded-full bg-nude-100" />
      </div>
      <div className="mb-28 h-72 border-y border-border/70" />
      <ul className={GRID}>
        {Array.from({ length: 8 }, (_, index) => (
          <li key={index} className="aspect-3/5 rounded-card bg-nude-100" />
        ))}
      </ul>
    </div>
  );
}
