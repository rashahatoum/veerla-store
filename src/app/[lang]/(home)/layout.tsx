import { InlineScript } from "@/components/inline-script";
import { introScript } from "@/features/home/hero/intro";
import { SiteFooter } from "@/features/layout/site-footer";
import { SiteHeader } from "@/features/layout/site-header";

/** Home only: the header hides its logo because the hero writes it. */
export default function HomeLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <>
      {/* Runs before the hero is painted on hard loads (intro once per session). */}
      <InlineScript html={introScript} />
      <SiteHeader showLogo={false} />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
