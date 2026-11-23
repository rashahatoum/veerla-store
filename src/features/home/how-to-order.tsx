import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDictionary } from "@/i18n/get-dictionary";

function StepIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
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

const icons = [
  // Choose: bag
  <StepIcon key="choose">
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </StepIcon>,
  // Send: chat bubble
  <StepIcon key="send">
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1 1 21 12z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </StepIcon>,
  // Confirm & deliver: check in a box
  <StepIcon key="deliver">
    <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </StepIcon>,
];

/** Compact "how your order works" — WhatsApp is not a confirmed order until we confirm it. */
export async function HowToOrder() {
  const dict = await getDictionary();
  const t = dict.howToOrder;

  const steps = [
    { title: t.step1Title, text: t.step1Text },
    { title: t.step2Title, text: t.step2Text },
    { title: t.step3Title, text: t.step3Text },
  ];

  return (
    <section id="how-to-order" aria-labelledby="how-to-order-title" className="scroll-mt-128 bg-ivory">
      <div className="mx-auto max-w-1360 px-16 py-64 md:px-32 md:py-80">
        <SectionHeading
          id="how-to-order-title"
          eyebrow="HOW IT WORKS"
          title={t.title}
          subtitle={t.subtitle}
          className="justify-center text-center [&>div]:items-center"
        />
        <ol className="grid gap-16 md:grid-cols-3 md:gap-24">
          {steps.map((step, index) => (
            <li key={step.title}>
              <Card interactive={false} className="flex h-full flex-col items-center gap-12 px-24 pt-28 pb-28 text-center">
                <span className="relative flex size-64 items-center justify-center rounded-full bg-nude-100 text-plum-700 ring-1 ring-gold-500/40">
                  {icons[index]}
                  <span className="absolute -top-4 -end-4 flex size-24 items-center justify-center rounded-full bg-plum-900 text-xs font-bold text-gold-300">
                    {index + 1}
                  </span>
                </span>
                <h3 className="text-lg font-bold text-plum-900">{step.title}</h3>
                <p className="max-w-320 text-sm leading-[1.9] text-mauve-600">{step.text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
