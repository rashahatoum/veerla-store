import { getDictionary } from "@/i18n/get-dictionary";

export async function HowToOrder() {
  const dict = await getDictionary();
  const t = dict.howToOrder;

  const steps = [
    { title: t.step1Title, text: t.step1Text },
    { title: t.step2Title, text: t.step2Text },
    { title: t.step3Title, text: t.step3Text },
  ];

  return (
    <section
      id="how-to-order"
      aria-labelledby="how-to-order-title"
      className="scroll-mt-128 bg-champagne/40"
    >
      <div className="mx-auto max-w-6xl px-16 py-56">
        <h2
          id="how-to-order-title"
          className="mb-40 text-center font-display text-3xl"
        >
          {t.title}
        </h2>
        <ol className="grid gap-32 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col items-center gap-12 text-center">
              <span className="flex size-44 items-center justify-center rounded-full border border-gold font-display text-lg text-gold">
                {index + 1}
              </span>
              <h3 className="text-base font-medium">{step.title}</h3>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
