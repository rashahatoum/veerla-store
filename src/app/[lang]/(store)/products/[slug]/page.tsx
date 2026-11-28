import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Price } from "@/components/commerce/price";
import { ProductsSection } from "@/components/commerce/products-section";
import { ProductDetails, ProductHeader, SizeGuide } from "@/features/product/product-info";
import {
  ProductPurchase,
  ProductPurchaseView,
  type PurchaseColor,
  type PurchaseLabels,
} from "@/features/product/product-purchase";
import { ProductReviews } from "@/features/product/product-reviews";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import { availabilityMatrix, isColorAvailable } from "@/lib/domain/variants";
import {
  getProduct,
  listProductReviews,
  listProducts,
  listRelatedProducts,
} from "@/lib/repositories/catalog";
import { getPublicSettings } from "@/lib/repositories/settings";

/** Prerender every product; new slugs added later render on demand. */
export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [locale, product] = await Promise.all([getLocale(), getProduct(slug)]);
  if (!product) return {};
  const main = product.colors[0]?.images[0];
  return {
    title: localize(product.name, locale),
    description: localize(product.description, locale),
    openGraph: main ? { images: [{ url: main.url, width: main.width, height: main.height }] } : undefined,
  };
}

export default async function ProductPage({ params }: PageProps<"/[lang]/products/[slug]">) {
  const { slug } = await params;
  const [locale, dict, product, settings] = await Promise.all([
    getLocale(),
    getDictionary(),
    getProduct(slug),
    getPublicSettings(),
  ]);
  if (!product) notFound();

  const [reviews, related] = await Promise.all([listProductReviews(slug), listRelatedProducts(slug)]);
  const t = dict.productPage;
  const name = localize(product.name, locale);
  const matrix = availabilityMatrix(product);

  const colors: PurchaseColor[] = product.colors.map(({ color, images }) => ({
    slug: color.slug,
    name: localize(color.name, locale),
    hex: color.hex,
    available: isColorAvailable(matrix, color.slug),
    images: images.map((image) => ({
      url: image.url,
      width: image.width,
      height: image.height,
      alt: localize(image.alt, locale),
    })),
  }));

  const labels: PurchaseLabels = {
    color: t.color,
    size: t.size,
    sizeGuide: t.sizeGuide,
    chooseSize: t.chooseSize,
    addToCart: t.addToCart,
    lowStockSize: t.lowStockSize,
    outOfStock: dict.product.outOfStock,
    gallery: t.gallery,
    imageOf: t.imageOf,
  };

  const purchase = {
    colors,
    sizes: product.sizes.map((size) => size.label),
    matrix,
    initialColor: colors.find((c) => c.available)?.slug ?? colors[0].slug,
    hasSizeGuide: product.size_chart !== null,
    labels,
    header: <ProductHeader product={product} />,
    price: <Price price={product.price} />,
    details: <ProductDetails product={product} settings={settings} />,
  };

  return (
    <>
    <div className="mx-auto flex w-full max-w-1360 flex-col gap-56 px-16 pt-20 pb-64 md:px-32 md:pt-28">
      <div className="flex flex-col gap-20">
        <nav aria-label={t.breadcrumb}>
          <ol className="flex flex-wrap items-center gap-8 text-sm text-mauve-600">
            <li>
              <Link href={`/${locale}`} className="hover:text-plum-700">
                {t.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/${locale}/products`} className="hover:text-plum-700">
                {dict.nav.products}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-plum-900">
              {name}
            </li>
          </ol>
        </nav>

        {/* ?color= is read on the client; the prerendered HTML shows the first available color. */}
        <Suspense fallback={<ProductPurchaseView {...purchase} syncUrl={false} />}>
          <ProductPurchase {...purchase} />
        </Suspense>
        <SizeGuide product={product} />
      </div>

      <ProductReviews product={product} reviews={reviews} />
    </div>

    {related.length > 0 && (
      <ProductsSection
        id="related"
        eyebrow="YOU MAY ALSO LIKE"
        title={t.related}
        products={related}
        layout="carousel"
        tone="nude"
      />
    )}
    </>
  );
}
