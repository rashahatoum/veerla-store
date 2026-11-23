"use client";
// Generic horizontal slider: native scroll-snap (touch/trackpad/keyboard work
// without JS); this island only adds the previous/next buttons and hides them
// when there is nothing to scroll. It knows nothing about what it shows —
// product cards, review cards… are passed in as `items` (rendered on the server).

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";
import { iconButtonClass } from "./icon-button";

type Props = {
  items: ReactNode[];
  /** Accessible name of the list, e.g. the section title. */
  label: string;
  labels: { previous: string; next: string };
  /** Width of one slide per breakpoint. Default: 2 on phones, 3 on tablets, 4 on desktop. */
  itemClassName?: string;
};

// Widths subtract the gaps (12px on phones, 24px from md) so whole cards fit exactly.
const defaultItem =
  "w-[calc((100%-12px)/2)] sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)]";

export function Carousel({ items, label, labels, itemClassName = defaultItem }: Props) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    // In RTL scrollLeft is 0 at the start and negative towards the end.
    const offset = Math.abs(list.scrollLeft);
    setEdges({
      start: offset < 4,
      end: offset + list.clientWidth >= list.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [update]);

  function scroll(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    const rtl = getComputedStyle(list).direction === "rtl";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({
      left: direction * (rtl ? -1 : 1) * list.clientWidth * 0.9,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  const scrollable = !(edges.start && edges.end);

  return (
    <div className="relative">
      <ul
        id={listId}
        ref={listRef}
        onScroll={update}
        aria-label={label}
        className="-mx-16 flex snap-x snap-mandatory scroll-px-16 gap-12 overflow-x-auto px-16 pt-6 pb-24 [scrollbar-width:none] md:-mx-32 md:scroll-px-32 md:gap-24 md:px-32 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => (
          <li key={index} className={cx("shrink-0 snap-start", itemClassName)}>
            {item}
          </li>
        ))}
      </ul>

      {scrollable && (
        <div className="mt-4 flex justify-center gap-12">
          <button
            type="button"
            aria-controls={listId}
            aria-label={labels.previous}
            disabled={edges.start}
            onClick={() => scroll(-1)}
            className={iconButtonClass("light", "disabled:pointer-events-none disabled:opacity-35")}
          >
            <Chevron />
          </button>
          <button
            type="button"
            aria-controls={listId}
            aria-label={labels.next}
            disabled={edges.end}
            onClick={() => scroll(1)}
            className={iconButtonClass("light", "disabled:pointer-events-none disabled:opacity-35")}
          >
            <span className="block -scale-x-100">
              <Chevron />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/** Points to the reading start (right in RTL, left in LTR). */
function Chevron() {
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
      className="rtl:-scale-x-100"
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}
