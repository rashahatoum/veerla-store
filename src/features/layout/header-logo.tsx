import Image from "next/image";
import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

/** Header logo with a light sweep on hover/focus — pure CSS (.header-logo in motion.css). */
export function HeaderLogo({ href, label }: Props) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="header-logo relative block h-64 w-100 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-300"
    >
      <Image
        src="/assets/imgs/veerla/logo-gold.webp"
        alt=""
        fill
        sizes="100px"
        className="object-contain"
      />
      <Image
        src="/assets/imgs/veerla/logo-gold.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100px"
        className="header-logo-sheen object-contain"
      />
    </Link>
  );
}
