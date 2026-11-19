type Props = {
  /** Edge of the parent section the wave sits on. Parent must be `relative`. */
  position: "top" | "bottom";
  /** Color of the neighbouring section (any CSS color or var()). */
  color: string;
  /** Opacity of the slower back layer; omit for a single layer. */
  backOpacity?: number;
};

// Both paths repeat exactly twice over 2880 units, so a 50% drift loops seamlessly.
const BACK_PATH = "M0 34 Q 360 4 720 34 T 1440 34 T 2160 34 T 2880 34 V64 H0 Z";
const FRONT_PATH = "M0 40 Q 360 14 720 40 T 1440 40 T 2160 40 T 2880 40 V64 H0 Z";

/** Animated silk edge between sections (HOME_SPEC.md §4.4). */
export function SilkWave({ position, color, backOpacity }: Props) {
  return (
    <div
      className="wave-box"
      aria-hidden="true"
      style={
        position === "bottom"
          ? { bottom: -1 }
          : { top: -1, transform: "scaleY(-1)" }
      }
    >
      {backOpacity !== undefined && (
        <svg className="wave slow" viewBox="0 0 2880 64" preserveAspectRatio="none">
          <path d={BACK_PATH} style={{ fill: color, fillOpacity: backOpacity }} />
        </svg>
      )}
      <svg className="wave" viewBox="0 0 2880 64" preserveAspectRatio="none">
        <path d={FRONT_PATH} style={{ fill: color }} />
      </svg>
    </div>
  );
}
