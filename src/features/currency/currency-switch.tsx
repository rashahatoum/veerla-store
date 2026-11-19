"use client";
// Client island: toggles <html data-currency> and remembers the choice.
// Prices are already server-rendered in both currencies, so nothing re-renders.

import { useSyncExternalStore } from "react";
import {
  CURRENCY_STORAGE_KEY,
  DEFAULT_DISPLAY_CURRENCY,
  type DisplayCurrency,
} from "./constants";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-currency"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): DisplayCurrency {
  return document.documentElement.dataset.currency === "syp" ? "syp" : "usd";
}

function getServerSnapshot(): DisplayCurrency {
  return DEFAULT_DISPLAY_CURRENCY;
}

function setCurrency(currency: DisplayCurrency) {
  document.documentElement.dataset.currency = currency;
  try {
    localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
  } catch {
    // Storage unavailable (private mode): the choice lasts for this page view only.
  }
}

type Props = {
  labels: {
    group: string;
    usd: string;
    syp: string;
    usdName: string;
    sypName: string;
  };
};

export function CurrencySwitch({ labels }: Props) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const options: { value: DisplayCurrency; short: string; name: string }[] = [
    { value: "usd", short: labels.usd, name: labels.usdName },
    { value: "syp", short: labels.syp, name: labels.sypName },
  ];

  return (
    <div
      role="group"
      aria-label={labels.group}
      className="flex rounded-full border border-line p-0.5 text-xs"
    >
      {options.map((option) => {
        const active = current === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            aria-label={option.name}
            onClick={() => setCurrency(option.value)}
            className={`min-w-9 rounded-full px-2.5 py-1 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              active ? "bg-plum text-ivory" : "text-ink-muted hover:text-ink"
            }`}
          >
            {option.short}
          </button>
        );
      })}
    </div>
  );
}
