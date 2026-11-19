import { Logo } from "@/components/brand/logo";
import { getDictionary } from "@/i18n/get-dictionary";

export async function SiteFooter() {
  const dict = await getDictionary();

  return (
    <footer className="mt-auto bg-plum text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-12 text-center">
        <div className="rounded-full bg-ivory px-6 py-3">
          <Logo name={dict.brand.name} tagline={dict.brand.tagline} />
        </div>
        <p className="max-w-md text-sm leading-relaxed text-champagne">
          {dict.footer.about}
        </p>
        <p className="text-sm text-gold-light">{dict.footer.payment}</p>
        <p className="text-xs text-champagne/70">
          © 2026 {dict.brand.name}. {dict.footer.rights}
        </p>
      </div>
    </footer>
  );
}
