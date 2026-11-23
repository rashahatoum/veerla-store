import Link from "next/link";
import { cx } from "@/lib/cx";
import { ForwardArrow } from "./button";

type Props = {
  /** Must match the section's aria-labelledby. */
  id: string;
  title: string;
  /** Small spaced Latin label above the title, e.g. "NEW IN". */
  eyebrow?: string;
  subtitle?: string;
  /** Optional "view all" link shown at the end of the row. */
  action?: { href: string; label: string };
  className?: string;
};

/** Title row shared by every home section. */
export function SectionHeading({ id, title, eyebrow, subtitle, action, className }: Props) {
  return (
    <div className={cx("mb-28 flex flex-wrap items-end justify-between gap-16", className)}>
      <div className="flex flex-col gap-6">
        {eyebrow && (
          <p dir="ltr" className="font-label text-xs tracking-[0.3em] text-gold-700 rtl:text-end">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-[clamp(28px,3vw,40px)] leading-[1.35] text-plum-900">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-mauve-600">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group/action inline-flex min-h-44 items-center gap-8 rounded-btn px-4 text-sm font-semibold text-plum-700 transition-colors hover:text-gold-700 focus-visible:outline-2 focus-visible:outline-plum-700"
        >
          {action.label}
          <span className="transition-transform duration-300 group-hover/action:-translate-x-3 ltr:group-hover/action:translate-x-3">
            <ForwardArrow />
          </span>
        </Link>
      )}
    </div>
  );
}
