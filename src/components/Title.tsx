import type { CSSProperties } from "react";

type TitleProps = {
  name?: string;
  subtitle?: string;
};
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

function Plate({
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

export default function Title({ name, subtitle }: TitleProps) {
  if (!name && !subtitle) return null;

  return (
    <div className="pointer-events-none fixed right-0 top-[12.5%] z-10 flex flex-col items-end pr-10">
      {name && (
        <Plate
          border="#f5c518"
          bg="#2f5d2a"
          color="#f5c518"
          notch="clamp(8px, 1vw, 16px)"
          fontSize="clamp(24px, 2.6vw, 56px)"
          padding="clamp(14px, 1.8vw, 28px) clamp(24px, 3vw, 48px)"
        >
          <span style={{ textShadow: "4px 4px 0 #000" }}>{name}</span>
        </Plate>
      )}

      {subtitle && (
        <div className={name ? "-mt-1 mr-[clamp(16px,3vw,48px)]" : ""}>
          <Plate
            border="#c9a24b"
            bg="#3b2a1a"
            color="#f5e6b3"
            notch="clamp(4px, 0.5vw, 8px)"
            fontSize="clamp(10px, 1vw, 20px)"
            padding="clamp(8px, 1vw, 16px) clamp(16px, 2vw, 32px)"
            letterSpacing="0.15em"
          >
            {subtitle}
          </Plate>
        </div>
      )}
    </div>
  );
}
