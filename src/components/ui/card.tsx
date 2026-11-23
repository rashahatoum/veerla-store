import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

/**
 * Surface card: rounded, soft shadow, lifts on hover.
 * Put `group` on it (already included) to drive child hover effects such as
 * the image zoom in ProductCard.
 */
export function cardClass({
  interactive = true,
  className,
}: { interactive?: boolean; className?: string } = {}) {
  return cx(
    "group relative overflow-hidden rounded-card border border-border/70 bg-card shadow-soft",
    interactive &&
      "transition-[box-shadow,transform,border-color] duration-500 ease-out hover:-translate-y-4 hover:border-gold-500/40 hover:shadow-lift has-focus-visible:shadow-lift has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-plum-700",
    className,
  );
}

type Props = ComponentProps<"article"> & { interactive?: boolean };

export function Card({ interactive, className, ...props }: Props) {
  return <article {...props} className={cardClass({ interactive, className })} />;
}
