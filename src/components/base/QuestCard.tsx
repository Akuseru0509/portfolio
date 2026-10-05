// components/QuestCard.tsx
import type { CSSProperties, ReactNode } from "react";

type Size = "lg" | "xl";

type QuestCardProps = {
  title: string;
  size?: Size;
  children?: ReactNode;
  className?: string;
};

const SIZES: Record<Size, { width: string; notch: string; title: string; label: string; padX: string; padY: string }> = {
  lg: { width: "clamp(360px, 38vw, 620px)", notch: "clamp(8px, 1vw, 16px)", title: "clamp(18px, 2.2vw, 36px)", label: "clamp(8px, 0.8vw, 12px)", padX: "clamp(20px, 2.6vw, 44px)", padY: "clamp(20px, 2.6vw, 40px)" },
  xl: { width: "clamp(420px, 50vw, 820px)", notch: "clamp(10px, 1.3vw, 20px)", title: "clamp(24px, 3vw, 52px)", label: "clamp(10px, 1vw, 16px)", padX: "clamp(28px, 3.4vw, 56px)", padY: "clamp(28px, 3.4vw, 52px)" },
};

const NOTCH = `polygon(
  0 var(--n), var(--n) var(--n), var(--n) 0,
  calc(100% - var(--n)) 0, calc(100% - var(--n)) var(--n), 100% var(--n),
  100% calc(100% - var(--n)), calc(100% - var(--n)) calc(100% - var(--n)), calc(100% - var(--n)) 100%,
  var(--n) 100%, var(--n) calc(100% - var(--n)), 0 calc(100% - var(--n))
)`;

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.1  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const PAPER_BG = [
  NOISE,
  "radial-gradient(ellipse at 18% 22%, rgba(150,100,30,0.28) 0, transparent 22%)", // vết ố
  "radial-gradient(ellipse at 82% 76%, rgba(140,90,25,0.25) 0, transparent 26%)",  // vết ố
  "radial-gradient(ellipse at center, transparent 55%, rgba(110,70,20,0.45) 100%)", // viền cháy sẫm
].join(", ");

export default function QuestCard({ title, size = "lg", children, className = "" }: QuestCardProps) {
  const s = SIZES[size];

  return (
    <div
      className={`relative inline-block ${className}`}
      style={
        {
          "--n": s.notch,
          width: s.width,
          filter: `drop-shadow(${s.notch} ${s.notch} 0 #000)`,
        } as CSSProperties
      }
    >
      <div style={{ clipPath: NOTCH, backgroundColor: "#5a3f1a", padding: "var(--n)" }}>
        <div
          style={{
            clipPath: NOTCH,
            backgroundColor: "#dcc38a",
            backgroundImage: PAPER_BG,
            padding: `${s.padY} ${s.padX}`,
            color: "#3d2a12",
          }}
        >
          <h2
            className="font-pixel uppercase leading-snug text-[#3d2a12]"
            style={{ fontSize: s.title, textShadow: "2px 2px 0 rgba(139,106,47,0.35)" }}
          >
            {title}
          </h2>

    
        <div className="mt-3 flex items-center gap-3">
            <div className="h-2 w-2 shrink-0 bg-[#8b6a2f]" />
            <span
            className="font-pixel uppercase text-[#7a5a22]"
            style={{ fontSize: s.label, letterSpacing: "0.2em" }}
            >
        
            </span>
            <div className="h-0.5 flex-1 bg-[#a98a4a]" />
        </div>

          {children && (
            <div
              className="mt-6 overflow-y-auto font-serif text-[#4a3519] [scrollbar-none] [&::-webkit-scrollbar]:hidden"
              style={{ maxHeight: "50vh" }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}