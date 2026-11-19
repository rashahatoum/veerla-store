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
      className="rounded-full px-2.5 py-1 text-xs font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {label}
    </Link>
  );
}
