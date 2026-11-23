import {
  Aref_Ruqaa,
  Cairo,
  Cinzel,
  Cormorant_Garamond,
} from "next/font/google";

// Font files. To change which font plays a role, edit globals.css
// (`--font-heading-face` and the `@theme inline` block); to swap a typeface,
// change it here and keep the variable name.

/** Arabic headings: hand-written Ruqaa calligraphy (owner choice, D-005). */
export const arefRuqaa = Aref_Ruqaa({
  variable: "--font-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

/** Body text and UI, Arabic + Latin. Variable font: every weight in one file. */
export const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** English headings + soft italic phrases. */
export const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontVariables = [arefRuqaa, cairo, cinzel, cormorant]
  .map((font) => font.variable)
  .join(" ");
