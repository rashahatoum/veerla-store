import type { ReactNode } from "react";
import { Feather } from "@/components/brand/feather";
import { getDictionary } from "@/i18n/get-dictionary";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-32"
    >
      {children}
    </svg>
  );
}

export async function BrandValues() {
  const dict = await getDictionary();

  const values = [
    { label: dict.values.soft, icon: <Feather className="size-32" /> },
    {
      label: dict.values.breathable,
      icon: (
        <Icon>
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </Icon>
      ),
    },
    {
      label: dict.values.quality,
      icon: (
        <Icon>
          <path d="M6 3h12l4 6-10 13L2 9Z" />
          <path d="M11 3 8 9l4 13 4-13-3-6" />
          <path d="M2 9h20" />
        </Icon>
      ),
    },
    {
      label: dict.values.comfort,
      icon: (
        <Icon>
          <path d="M3 10.5 12 3l9 7.5V21H3z" />
          <path d="M12 17.5s-3-1.8-3-3.8a1.6 1.6 0 0 1 3-.8 1.6 1.6 0 0 1 3 .8c0 2-3 3.8-3 3.8z" />
        </Icon>
      ),
    },
  ];

  return (
    <section aria-labelledby="values-title" className="border-y border-line bg-cream">
      <h2 id="values-title" className="sr-only">
        {dict.values.title}
      </h2>
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-32 px-16 py-40 md:grid-cols-4">
        {values.map((value) => (
          <li
            key={value.label}
            className="flex flex-col items-center gap-12 text-center text-sm text-ink"
          >
            <span className="text-mauve">{value.icon}</span>
            {value.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
