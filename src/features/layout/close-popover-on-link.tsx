"use client";
// Client island: the header persists across client-side navigations, so the
// mobile menu popover would stay open after tapping a link. This closes it.

import type { MouseEvent, ReactNode } from "react";

export function ClosePopoverOnLink({ children }: { children: ReactNode }) {
  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("a")) {
      event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
    }
  };

  return <div onClick={onClick}>{children}</div>;
}
