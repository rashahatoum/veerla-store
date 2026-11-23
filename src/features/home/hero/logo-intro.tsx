import Image from "next/image";
import { LogoReplay } from "./logo-replay";

type Props = {
  /** Accessible name of the replay button, e.g. "Veerla Store — replay the logo animation". */
  replayLabel: string;
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
 * Clicking the logo replays the intro.
 */
export function LogoIntro({ replayLabel }: Props) {
  return (
    <LogoReplay label={replayLabel}>
      <span className="logo-stage block" aria-hidden="true">
        <Image {...layer} alt="" src="/assets/imgs/veerla/logo-words.webp" className="lg-words" />
        <Image {...layer} alt="" src="/assets/imgs/veerla/logo-feather.webp" className="lg-feather" />
        <span className="lg-pen" />
        <span className="lg-sheen" />
      </span>
    </LogoReplay>
  );
}
