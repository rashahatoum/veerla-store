import Image from "next/image";

type Props = {
  label: string;
};

// The layers are already-compressed 967×625 WebP files (~60KB), so they skip
// the Next.js image optimizer and are preloaded: the intro waits for them.
const layer = {
  width: 967,
  height: 625,
  unoptimized: true,
  preload: true,
} as const;

/**
 * "The feather writes the logo" (HOME_SPEC.md §4.1). Four stacked layers,
 * animated purely in CSS (styles/motion.css), started by the intro script
 * once both images have loaded. Without JS the final logo is shown as-is.
 */
export function LogoIntro({ label }: Props) {
  return (
    <div className="logo-stage" role="img" aria-label={label}>
      <Image {...layer} alt="" src="/assets/imgs/veerla/logo-words.webp" className="lg-words" />
      <Image {...layer} alt="" src="/assets/imgs/veerla/logo-feather.webp" className="lg-feather" />
      <span className="lg-pen" aria-hidden="true" />
      <span className="lg-sheen" aria-hidden="true" />
    </div>
  );
}
