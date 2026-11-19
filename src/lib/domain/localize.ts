import type { Locale } from "@/i18n/config";
import type { Localized } from "@/types/catalog";

/** Picks the active language from API content, falling back to Arabic (always required). */
export function localize(value: Localized, locale: Locale): string {
  return (locale === "en" ? value.en : null) ?? value.ar;
}
