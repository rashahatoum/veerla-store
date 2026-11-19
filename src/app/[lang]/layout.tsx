import type { Metadata } from "next";
import { Marcellus, Tajawal } from "next/font/google";
import { InlineScript } from "@/components/inline-script";
import { localeDirection, locales } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { CURRENCY_STORAGE_KEY } from "@/features/currency/constants";
import "../globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Applies the saved display currency before first paint so cached pages
// never flash the wrong price (see ARCHITECTURE.md §4).
const currencyScript = `(function(){try{var c=localStorage.getItem("${CURRENCY_STORAGE_KEY}");if(c==="usd"||c==="syp")document.documentElement.setAttribute("data-currency",c)}catch(e){}})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: { default: dict.meta.title, template: `%s | ${dict.brand.name}` },
    description: dict.meta.description,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      data-currency="usd"
      className={`${tajawal.variable} ${marcellus.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={currencyScript} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
