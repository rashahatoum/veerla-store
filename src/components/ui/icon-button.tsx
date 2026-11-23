import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

/**
 * Round icon buttons.
 * - "glass": on velvet / dark backgrounds (header).
 * - "light": on light backgrounds or floating over photos (wishlist on cards).
 */
export type IconButtonTone = "glass" | "light";

const base =
  "relative inline-flex size-44 shrink-0 items-center justify-center rounded-full transition-[background-color,color,box-shadow,transform] duration-300 hover:-translate-y-1 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2";

const tones: Record<IconButtonTone, string> = {
  glass:
    "border border-ivory-text/15 bg-ivory-text/8 text-ivory-text backdrop-blur-sm hover:border-gold-300/60 hover:bg-gold-500/20 hover:text-gold-300 hover:shadow-glow focus-visible:outline-gold-300",
  light:
    "bg-card/90 text-plum-700 shadow-soft backdrop-blur-sm hover:bg-card hover:text-sale hover:shadow-lift focus-visible:outline-plum-700",
};

export function iconButtonClass(tone: IconButtonTone = "glass", className?: string) {
  return cx(base, tones[tone], className);
}

type LinkProps = ComponentProps<typeof Link> & {
  tone?: IconButtonTone;
  /** Accessible name — icon buttons have no visible text. */
  "aria-label": string;
};

export function IconLink({ tone, className, ...props }: LinkProps) {
  return <Link {...props} className={iconButtonClass(tone, className)} />;
}

type ButtonProps = ComponentProps<"button"> & {
  tone?: IconButtonTone;
  "aria-label": string;
};

export function IconButton({ tone, className, type = "button", ...props }: ButtonProps) {
  return <button {...props} type={type} className={iconButtonClass(tone, className)} />;
}
