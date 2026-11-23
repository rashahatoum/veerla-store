"use client";
// Client island: needs the current pathname to link to the same page in the other language.

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

type Props = {
  target: Locale;
  label: string;
  groupLabel: string;
};

export function LocaleSwitch({ target, label, groupLabel }: Props) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");
  const href = `/${target}${rest ? `/${rest}` : ""}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={`${groupLabel}: ${label}`}
      className="flex min-h-44 items-center rounded-full border border-ivory-text/15 bg-ivory-text/8 px-16 text-sm font-medium text-ivory-text backdrop-blur-sm transition-[background-color,color,border-color,box-shadow] duration-300 hover:border-gold-300/60 hover:bg-gold-500/20 hover:text-gold-300 hover:shadow-glow focus-visible:outline-2 focus-visible:outline-gold-300"
    >
      {label}
    </Link>
  );
}
