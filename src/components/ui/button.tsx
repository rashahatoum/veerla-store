import Link from "next/link";
import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant =
  | "gold" // primary call to action (gold sheen on hover)
  | "plum" // primary on light backgrounds
  | "outline" // secondary on light backgrounds
  | "outline-light"; // secondary on dark / velvet backgrounds

export type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-10 rounded-btn font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  gold: "btn-gold bg-gold-500 text-plum-900 shadow-soft hover:shadow-glow focus-visible:outline-gold-300",
  plum: "bg-plum-900 text-ivory-text shadow-soft hover:bg-plum-700 hover:shadow-lift focus-visible:outline-plum-700",
  outline:
    "border border-plum-900/25 bg-card text-plum-900 hover:border-gold-500 hover:shadow-soft focus-visible:outline-plum-700",
  "outline-light":
    "border border-ivory-text/45 bg-plum-950/25 font-medium text-ivory-text backdrop-blur-sm hover:border-gold-300 hover:bg-plum-950/45 focus-visible:outline-gold-300",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-44 px-22 text-sm",
  lg: "min-h-56 px-34 text-base",
};

/** Class string for anything that should look like a button. */
export function buttonClass({
  variant = "gold",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cx(base, variants[variant], sizes[size], className);
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function ButtonLink({ variant, size, className, ...props }: LinkProps) {
  return <Link {...props} className={buttonClass({ variant, size, className })} />;
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button {...props} type={type} className={buttonClass({ variant, size, className })} />
  );
}

/** Arrow that points "forward" in both RTL and LTR. */
export function ForwardArrow() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ltr:-scale-x-100"
    >
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}
