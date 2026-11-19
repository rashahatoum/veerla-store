import { Feather } from "./feather";

type Props = {
  name: string;
  tagline: string;
};

/** Text wordmark until the official logo file is provided. */
export function Logo({ name, tagline }: Props) {
  return (
    <span dir="ltr" className="inline-flex flex-col items-center leading-none">
      <span className="flex items-center gap-1 font-display text-2xl tracking-[0.12em] text-ink">
        {name}
        <Feather className="size-4 text-gold" />
      </span>
      <span className="mt-1 text-[0.55rem] tracking-[0.45em] text-gold">
        {tagline}
      </span>
    </span>
  );
}
