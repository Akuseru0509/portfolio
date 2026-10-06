import type { CSSProperties } from "react";

const NOTCH = `polygon(
  0 var(--n), var(--n) var(--n), var(--n) 0,
  calc(100% - var(--n)) 0, calc(100% - var(--n)) var(--n), 100% var(--n),
  100% calc(100% - var(--n)), calc(100% - var(--n)) calc(100% - var(--n)), calc(100% - var(--n)) 100%,
  var(--n) 100%, var(--n) calc(100% - var(--n)), 0 calc(100% - var(--n))
)`;

type PlateProps = {
  border: string;
  bg: string;
  color: string;
  notch: string;
  fontSize: string;
  padding: string;
  letterSpacing?: string;
  children: React.ReactNode;
};

export default function Plate({
  border,
  bg,
  color,
  notch,
  fontSize,
  padding,
  letterSpacing,
  children,
}: PlateProps) {
  return (
    <div
      className="inline-block"
      style={{ "--n": notch, filter: `drop-shadow(${notch} ${notch} 0 #000)` } as CSSProperties}
    >
      <div style={{ clipPath: NOTCH, backgroundColor: border, padding: "var(--n)" }}>
        <div
          className="font-pixel uppercase leading-relaxed"
          style={{ clipPath: NOTCH, backgroundColor: bg, color, fontSize, padding, letterSpacing }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}