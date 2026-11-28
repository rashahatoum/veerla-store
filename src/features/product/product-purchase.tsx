"use client";
// Client island of the product page: gallery + color + size + add to bag.
// Everything else on the page (name, price, details, reviews, related) is
// server-rendered and passed in as slots.

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import type { AvailabilityMatrix } from "@/lib/domain/variants";

export type PurchaseColor = {
  slug: string;
  name: string;
  hex: string;
  available: boolean;
  images: { url: string; width: number; height: number; alt: string }[];
};

export type PurchaseLabels = {
  color: string;
  size: string;
  sizeGuide: string;
  chooseSize: string;
  addToCart: string;
  lowStockSize: string;
  outOfStock: string;
  gallery: string;
  /** "Image {n} of {total}" */
  imageOf: string;
};

type ViewProps = {
  colors: PurchaseColor[];
  sizes: string[];
  matrix: AvailabilityMatrix;
  initialColor: string;
  /** Keep ?color= in the URL in sync (only once search params are available). */
  syncUrl: boolean;
  hasSizeGuide: boolean;
  labels: PurchaseLabels;
  /** Server-rendered name, rating and price. */
  header: ReactNode;
  /** Server-rendered price, repeated in the mobile sticky bar. */
  price: ReactNode;
  /** Server-rendered details (description, fabric, care, delivery info). */
  details: ReactNode;
};

/** Reads ?color= from the URL. Must be rendered inside <Suspense>. */
export function ProductPurchase(props: Omit<ViewProps, "syncUrl">) {
  const fromUrl = useSearchParams().get("color");
  const initialColor = props.colors.some((c) => c.slug === fromUrl) ? fromUrl! : props.initialColor;
  return <ProductPurchaseView {...props} initialColor={initialColor} syncUrl />;
}

/** Static version (Suspense fallback / prerendered HTML): first color, no URL sync. */
export function ProductPurchaseView({
  colors,
  sizes,
  matrix,
  initialColor,
  syncUrl,
  hasSizeGuide,
  labels,
  header,
  price,
  details,
}: ViewProps) {
  const [colorSlug, setColorSlug] = useState(initialColor);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const sizeGroupRef = useRef<HTMLFieldSetElement>(null);

  const color = colors.find((c) => c.slug === colorSlug) ?? colors[0];
  const sizeState = (label: string) => matrix[color.slug]?.[label] ?? "out_of_stock";

  function chooseColor(slug: string) {
    setColorSlug(slug);
    // Keep the chosen size only if it is still available in the new color.
    if (size && (matrix[slug]?.[size] ?? "out_of_stock") === "out_of_stock") setSize(null);
    if (syncUrl) {
      const params = new URLSearchParams(window.location.search);
      params.set("color", slug);
      window.history.replaceState(null, "", `?${params}`);
    }
  }

  function addToBag() {
    if (!size) {
      setSizeError(true);
      const group = sizeGroupRef.current;
      group?.scrollIntoView({ block: "center", behavior: "smooth" });
      group?.querySelector<HTMLInputElement>("input:not(:disabled)")?.focus({ preventScroll: true });
      return;
    }
    // Phase 4 (cart): add the variant (color × size) to the bag here.
  }

  return (
    <>
      <div className="grid gap-28 lg:grid-cols-[7fr_5fr] lg:gap-48">
        <Gallery key={color.slug} color={color} labels={labels} />

        <div className="flex flex-col gap-24 lg:sticky lg:top-24 lg:self-start">
          {header}

          {/* Color */}
          <fieldset className="flex flex-col gap-12">
            <legend className="mb-12 text-sm text-mauve-600">
              {labels.color}: <span className="font-semibold text-plum-900">{color.name}</span>
            </legend>
            <div className="flex flex-wrap gap-10">
              {colors.map((option) => (
                <label key={option.slug} className="relative cursor-pointer has-disabled:cursor-not-allowed">
                  <input
                    type="radio"
                    name="color"
                    value={option.slug}
                    checked={option.slug === color.slug}
                    disabled={!option.available}
                    onChange={() => chooseColor(option.slug)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: option.hex }}
                    className="block size-40 rounded-full border border-border-strong shadow-[inset_0_0_0_3px_var(--color-card)] ring-offset-2 ring-offset-ivory transition peer-checked:ring-2 peer-checked:ring-plum-900 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-plum-700 peer-disabled:opacity-35"
                  />
                  <span className="sr-only">{option.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Size */}
          <fieldset ref={sizeGroupRef} className="flex flex-col gap-12" aria-describedby={sizeError ? "size-error" : undefined}>
            <legend className="mb-12 flex w-full items-center justify-between gap-12 text-sm text-mauve-600">
              <span>
                {labels.size}
                {size && <span className="font-semibold text-plum-900">: {size}</span>}
              </span>
              {hasSizeGuide && (
                <button
                  type="button"
                  popoverTarget="size-guide"
                  className="min-h-32 font-semibold text-plum-700 underline underline-offset-4 hover:text-gold-700 focus-visible:outline-2 focus-visible:outline-plum-700"
                >
                  {labels.sizeGuide}
                </button>
              )}
            </legend>
            <div className="flex flex-wrap gap-8">
              {sizes.map((label) => {
                const state = sizeState(label);
                const soldOut = state === "out_of_stock";
                return (
                  <label key={label} className="cursor-pointer has-disabled:cursor-not-allowed">
                    <input
                      type="radio"
                      name="size"
                      value={label}
                      checked={size === label}
                      disabled={soldOut}
                      onChange={() => {
                        setSize(label);
                        setSizeError(false);
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cx(
                        "flex h-48 min-w-56 items-center justify-center rounded-btn border px-16 text-sm font-semibold transition-colors",
                        "border-border-strong bg-card text-plum-900 hover:border-plum-900",
                        "peer-checked:border-plum-900 peer-checked:bg-plum-900 peer-checked:text-ivory-text",
                        "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum-700",
                        "peer-disabled:border-border peer-disabled:bg-transparent peer-disabled:text-mauve-600/50 peer-disabled:line-through",
                      )}
                    >
                      {label}
                    </span>
                    {soldOut && <span className="sr-only">({labels.outOfStock})</span>}
                  </label>
                );
              })}
            </div>
            {size && sizeState(size) === "low_stock" && (
              <p className="text-sm font-semibold text-sale">{labels.lowStockSize}</p>
            )}
            {sizeError && (
              <p id="size-error" role="alert" className="text-sm font-semibold text-sale">
                {labels.chooseSize}
              </p>
            )}
          </fieldset>

          <Button size="lg" onClick={addToBag} className="w-full max-lg:hidden">
            {labels.addToCart}
          </Button>

          {details}
        </div>
      </div>

      {/* Phones: price + add to bag always within reach. */}
      <div data-sticky-buy className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-12 border-t border-border bg-card/95 px-16 py-10 shadow-lift backdrop-blur-md lg:hidden">
        <div className="shrink-0 text-base font-bold text-plum-800">{price}</div>
        <Button size="lg" onClick={addToBag} className="flex-1">
          {labels.addToCart}
        </Button>
      </div>
    </>
  );
}

/** Phones: swipe through the color's photos. Desktop: photos in a 2-column grid. */
function Gallery({ color, labels }: { color: PurchaseColor; labels: PurchaseLabels }) {
  const [index, setIndex] = useState(0);
  const total = color.images.length;

  return (
    <div className="flex flex-col gap-12">
      <ul
        aria-label={labels.gallery}
        onScroll={(event) => {
          const list = event.currentTarget;
          setIndex(Math.round(Math.abs(list.scrollLeft) / list.clientWidth));
        }}
        className={cx(
          "-mx-16 flex snap-x snap-mandatory overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden",
          "lg:mx-0 lg:grid lg:gap-12 lg:overflow-visible",
          total > 1 ? "lg:grid-cols-2" : "lg:mx-auto lg:w-full lg:max-w-600",
        )}
      >
        {color.images.map((image, i) => (
          <li
            key={image.url}
            // Odd count on desktop: the main photo spans both columns so no photo is left alone.
            className={cx("w-full shrink-0 snap-center px-16 lg:px-0", i === 0 && total % 2 === 1 && total > 1 && "lg:col-span-2")}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              preload={i === 0}
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-3/4 w-full rounded-card bg-nude-100 object-cover"
            />
          </li>
        ))}
      </ul>
      {total > 1 && (
        <p className="flex items-center justify-center gap-6 lg:hidden" aria-live="polite">
          {color.images.map((image, i) => (
            <span
              key={image.url}
              aria-hidden="true"
              className={cx("h-6 rounded-full transition-all", i === index ? "w-20 bg-plum-900" : "w-6 bg-border-strong")}
            />
          ))}
          <span className="sr-only">
            {labels.imageOf.replace("{n}", String(index + 1)).replace("{total}", String(total))}
          </span>
        </p>
      )}
    </div>
  );
}
