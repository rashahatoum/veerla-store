import { CurrencySwitch } from "@/features/currency/currency-switch";
import { LocaleSwitch } from "@/features/locale/locale-switch";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

/** Language + currency switches, shared by the header and the mobile menu. */
export async function SiteSwitches() {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <>
      <LocaleSwitch
        target={locale === "ar" ? "en" : "ar"}
        label={dict.switches.switchTo}
        groupLabel={dict.switches.languageLabel}
      />
      <CurrencySwitch
        labels={{
          group: dict.switches.currencyLabel,
          usd: dict.switches.usd,
          syp: dict.switches.syp,
          usdName: dict.switches.usdName,
          sypName: dict.switches.sypName,
        }}
      />
    </>
  );
}
