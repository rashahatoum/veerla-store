import {
  Amiri,
  Cinzel,
  Cormorant_Garamond,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";

// Font files (HOME_SPEC.md §1). To change a role, edit `@theme inline` in
// globals.css; to swap a typeface, change it here and keep the variable name.

export const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Weight 700 dropped on purpose (unused in the design) to keep font payload down.
export const plex = IBM_Plex_Sans_Arabic({
  variable: "--font-plex",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = [amiri, plex, cinzel, cormorant]
  .map((font) => font.variable)
  .join(" ");
