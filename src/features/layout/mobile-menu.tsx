import Link from "next/link";
import type { ReactNode } from "react";
import { iconButtonClass } from "@/components/ui/icon-button";
import { ClosePopoverOnLink } from "./close-popover-on-link";
import { CloseIcon, MenuIcon } from "./header-icons";
import type { NavLink } from "./nav-links";

const MENU_ID = "site-menu";

type Props = {
  links: NavLink[];
  labels: { open: string; close: string; nav: string };
  /** Language + currency switches, shown inside the menu on small screens. */
  switches: ReactNode;
};

/** Mobile menu built on the native Popover API — opening/closing needs no JavaScript. */
export function MobileMenu({ links, labels, switches }: Props) {
  return (
    <>
      <button
        type="button"
        popoverTarget={MENU_ID}
        aria-label={labels.open}
        className={iconButtonClass("glass", "lg:hidden")}
      >
        <MenuIcon />
      </button>

      <div
        id={MENU_ID}
        popover="auto"
        className="m-0 h-dvh max-h-none w-[min(320px,86vw)] border-0 bg-plum-950 p-0 text-ivory-text inset-y-0 inset-e-0 inset-s-auto backdrop:bg-plum-950/60"
      >
        {/* Opens from the end side, next to the menu button. */}
        <div className="flex h-full flex-col gap-24 border-s border-gold-500/40 px-24 py-20">
          {/* Close button sits where the menu button was (end side). */}
          <div className="flex justify-end">
            <button
              type="button"
              popoverTarget={MENU_ID}
              popoverTargetAction="hide"
              aria-label={labels.close}
              className={iconButtonClass("glass")}
            >
              <CloseIcon />
            </button>
          </div>

          <ClosePopoverOnLink>
            <nav aria-label={labels.nav}>
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-gold-500/20">
                    <Link
                      href={link.href}
                      className="flex min-h-48 items-center text-base font-medium hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </ClosePopoverOnLink>

          <div className="mt-auto flex items-center justify-between gap-12">
            {switches}
          </div>
        </div>
      </div>
    </>
  );
}
