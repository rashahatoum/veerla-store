import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
} from "@/i18n/config";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Locale routing only: every page lives under /ar or /en.
 * - Locale-less URLs redirect to the saved locale (cookie) or the default.
 * - Visiting a localized URL remembers that locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (isLocale(segment)) {
    const response = NextResponse.next();
    if (request.cookies.get(localeCookieName)?.value !== segment) {
      response.cookies.set(localeCookieName, segment, {
        path: "/",
        maxAge: ONE_YEAR,
        sameSite: "lax",
      });
    }
    return response;
  }

  const saved = request.cookies.get(localeCookieName)?.value;
  const locale = isLocale(saved) ? saved : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension (public assets).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
