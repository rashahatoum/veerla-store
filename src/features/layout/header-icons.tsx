import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export const SearchIcon = () => (
  <Icon>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Icon>
);

export const HeartIcon = () => (
  <Icon>
    <path d="M12 20s-7-4.5-9-9a4.5 4.5 0 0 1 9-2.5A4.5 4.5 0 0 1 21 11c-2 4.5-9 9-9 9z" />
  </Icon>
);

export const BagIcon = () => (
  <Icon>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </Icon>
);

// Brand glyphs (simplified outlines, same 24px stroke style as the other icons).
export const InstagramIcon = () => (
  <Icon>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </Icon>
);

export const FacebookIcon = () => (
  <Icon>
    <path d="M14.5 8.5H16V5.2c-.3 0-1.3-.2-2.4-.2-2.4 0-4 1.5-4 4.2v2.3H7v3.6h2.6V21h3.4v-5.9h2.6l.4-3.6h-3v-2c0-1 .3-1.5 1.5-1.5z" />
  </Icon>
);

export const WhatsAppIcon = () => (
  <Icon>
    <path d="M20.5 12a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.2-4.3A8.5 8.5 0 1 1 20.5 12z" />
    <path d="M9 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.8 1.5-.6.4-1.5.5-2.8 0-2.2-.8-3.9-2.5-4.8-4.6-.4-1.1-.3-2 .3-2.9z" />
  </Icon>
);

export const MenuIcon = () => (
  <Icon>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = () => (
  <Icon>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);
