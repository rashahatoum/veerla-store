import Link from "next/link";
import type { ReactNode } from "react";
import { Price } from "@/components/commerce/price";
import { Stars } from "@/components/commerce/review-card";
import { format, getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localize } from "@/lib/domain/localize";
import { discountPercent } from "@/lib/domain/money";
import type { ProductDetail } from "@/types/catalog";
import type { PublicSettings } from "@/types/settings";

/** Category, name, rating and price — top of the purchase panel. */
export async function ProductHeader({ product }: { product: ProductDetail }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.productPage;
  const discount = product.compare_at_price
    ? discountPercent(product.price.usd, product.compare_at_price.usd)
    : 0;

  return (
    <div className="flex flex-col gap-10">
      <Link
        href={`/${locale}/products`}
        className="w-fit text-sm font-semibold text-gold-700 hover:text-plum-700"
      >
        {localize(product.category.name, locale)}
      </Link>
      <h1 className="text-[clamp(30px,3.2vw,44px)] leading-[1.3] text-plum-900">
        {localize(product.name, locale)}
      </h1>
      {product.rating && (
        <a href="#reviews" className="flex w-fit items-center gap-8 text-sm text-mauve-600 hover:text-plum-700">
          <Stars rating={product.rating.average} label={format(dict.reviews.rating, { rating: product.rating.average })} />
          <span>{format(t.reviewsCount, { count: product.rating.count })}</span>
        </a>
      )}
      <div className="mt-4 flex flex-wrap items-center gap-12">
        <Price
          price={product.price}
          compareAt={product.compare_at_price}
          className="text-2xl font-bold text-plum-800 [&_s]:text-base"
        />
        {discount > 0 && (
          <span className="rounded-full bg-sale px-10 py-3 text-xs font-bold text-ivory-text">
            <bdi dir="ltr">-{discount}%</bdi>
          </span>
        )}
      </div>
    </div>
  );
}

function Section({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group border-b border-border/80">
      <summary className="flex min-h-56 cursor-pointer list-none items-center justify-between gap-12 font-semibold text-plum-900 [&::-webkit-details-marker]:hidden">
        {title}
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="transition-transform group-open:rotate-180">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="pb-20 text-sm leading-[1.9] text-mauve-600">{children}</div>
    </details>
  );
}

/** Fit note + description, fabric & care, delivery & payment. Native <details>, no JS. */
export async function ProductDetails({ product, settings }: { product: ProductDetail; settings: PublicSettings }) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.productPage;
  const f = dict.footer;

  return (
    <div className="flex flex-col gap-16">
      {product.fit_note && (
        <p className="flex items-start gap-10 rounded-field bg-nude-100 px-16 py-12 text-sm text-plum-900">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="mt-3 shrink-0 text-gold-700">
            <path d="M3 8h18v8H3z" />
            <path d="M7 8v3M11 8v4M15 8v3M19 8v4" />
          </svg>
          <span>
            <strong className="font-semibold">{t.fitNote}: </strong>
            {localize(product.fit_note, locale)}
          </span>
        </p>
      )}

      <div className="border-t border-border/80">
        <Section title={t.description} open>
          <p>{localize(product.description, locale)}</p>
        </Section>
        {(product.fabric || product.care) && (
          <Section title={t.fabricCare}>
            {product.fabric && (
              <p>
                <strong className="font-semibold text-plum-900">{t.fabric}: </strong>
                {localize(product.fabric, locale)}
              </p>
            )}
            {product.care && (
              <p>
                <strong className="font-semibold text-plum-900">{t.care}: </strong>
                {localize(product.care, locale)}
              </p>
            )}
          </Section>
        )}
        <Section title={t.deliveryPayment}>
          <ul className="flex list-disc flex-col gap-4 ps-18">
            <li>
              {f.fulfillmentLabel} {settings.fulfillment_methods.map((m) => f.fulfillmentMethods[m]).join(" · ")}
            </li>
            <li>
              {f.paymentLabel} {settings.payment_methods.map((m) => f.paymentMethods[m]).join(" · ")}
            </li>
            {settings.returns_window_hours !== null && (
              <li>{format(f.returns, { hours: settings.returns_window_hours })}</li>
            )}
            <li>{t.orderNote}</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}

/** Size chart in a native popover (opened by the "Size guide" button). */
export async function SizeGuide({ product }: { product: ProductDetail }) {
  if (!product.size_chart) return null;
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);
  const t = dict.productPage;
  const chart = product.size_chart;

  return (
    <div
      id="size-guide"
      popover="auto"
      aria-labelledby="size-guide-title"
      className="m-auto w-[min(560px,calc(100vw-32px))] rounded-card border-0 bg-card p-20 text-plum-900 sm:p-24 shadow-lift backdrop:bg-plum-950/50"
    >
      <div className="mb-6 flex items-center justify-between gap-12">
        <h2 id="size-guide-title" className="text-2xl">
          {t.sizeGuide}
        </h2>
        <button
          type="button"
          popoverTarget="size-guide"
          popoverTargetAction="hide"
          aria-label={dict.nav.closeMenu}
          className="flex size-44 items-center justify-center rounded-full hover:bg-nude-100 focus-visible:outline-2 focus-visible:outline-plum-700"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <p className="mb-16 text-sm text-mauve-600">{t.measurementsCm}</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="bg-nude-100">
              <th scope="col" className="rounded-s-field px-6 py-10 sm:px-12 font-semibold">
                {t.size}
              </th>
              {chart.measurements.map((m, i) => (
                <th
                  key={m.ar}
                  scope="col"
                  className={`px-6 py-10 sm:px-12 font-semibold ${i === chart.measurements.length - 1 ? "rounded-e-field" : ""}`}
                >
                  {localize(m, locale)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.size} className="border-b border-border/70 last:border-0">
                <th scope="row" className="px-6 py-10 sm:px-12 font-bold">
                  {row.size}
                </th>
                {row.values.map((value, i) => (
                  <td key={i} className="px-6 py-10 sm:px-12 text-mauve-600">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
