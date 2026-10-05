import type { ReactNode } from "react";

type Size = "md" | "lg" | "xl";

type TextCardProps = {
  active?: boolean;
  onClick?: () => void;
  size?: Size,
  children: ReactNode;
};

const SIZES: Record<Size, { font: string; padX: string; padY: string; notch: string }> = {
  md: { font: "clamp(12px, 1.3vw, 22px)", padX: "clamp(16px, 2vw, 32px)", padY: "clamp(10px, 1.2vw, 20px)", notch: "clamp(4px, 0.5vw, 8px)" },
  lg: { font: "clamp(20px, 2.6vw, 40px)", padX: "clamp(24px, 3vw, 48px)", padY: "clamp(14px, 1.8vw, 28px)", notch: "clamp(6px, 0.7vw, 12px)" },
  xl: { font: "clamp(28px, 4vw, 64px)", padX: "clamp(32px, 4vw, 64px)", padY: "clamp(18px, 2.4vw, 36px)", notch: "clamp(8px, 1vw, 16px)" },
};

const NOTCH = `polygon(
  0 var(--n), var(--n) var(--n), var(--n) 0,
  calc(100% - var(--n)) 0, calc(100% - var(--n)) var(--n), 100% var(--n),
  100% calc(100% - var(--n)), calc(100% - var(--n)) calc(100% - var(--n)), calc(100% - var(--n)) 100%,
  var(--n) 100%, var(--n) calc(100% - var(--n)), 0 calc(100% - var(--n))
)`;

export default function TextCard({ active = false, onClick, size ="md", children}: TextCardProps) {
  const s = SIZES[size];
  const border = active ? "#f5c518" : "#c9a24b";
  const bg = active ? "#2f5d2a" : "#3b2a1a";

  return (
    <div
      className="group inline-block transition-transform active:translate-x-1 active:translate-y-1"
      style={
        {
          "--n": s.notch,
          filter: `drop-shadow(${s.notch} ${s.notch} 0 #000)`,
        } as React.CSSProperties
      }
    >
      <div
        style={{
          clipPath: NOTCH,
          backgroundColor: border,
          padding: "var(--n)",
        }}
      >
        <div
          onClick={onClick}
          role={onClick ? "button" : undefined}
          className={`font-pixel leading-relaxed ${onClick ? "cursor-pointer" : "pointer-events-none"} ${
            active ? "text-[#f5c518]" : "text-[#f5e6b3] group-hover:text-white"
          }`}
          style={{
            clipPath: NOTCH,
            backgroundColor: bg,
            fontSize: s.font,
            padding: `${s.padY} ${s.padX}`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}