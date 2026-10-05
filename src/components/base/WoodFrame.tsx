type WoodFrameProps = {
  src?: string;
  alt?: string;
  size?: number;
};


const WOOD_GRAIN = [
  "repeating-linear-gradient(90deg, rgba(60,32,12,0.35) 0 2px, transparent 2px 9px)",
  "repeating-linear-gradient(90deg, rgba(200,140,70,0.25) 0 1px, transparent 1px 14px)",
  "linear-gradient(180deg, #a8703a 0%, #8f5a2c 50%, #6e4220 100%)",
].join(", ");

export default function WoodFrame({ src, alt = "Avatar", size = 160 }: WoodFrameProps) {
  const border = Math.round(size * 0.1);

  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        filter: "drop-shadow(4px 4px 0 #000)",
      }}
    >

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: WOOD_GRAIN,
          border: "4px solid #3a1f0a",
          boxShadow: "inset 3px 3px 0 #d9a35f, inset -3px -3px 0 #4a2a10",
        }}
      />

      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g stroke="#3a1f0a" strokeWidth="1.2">
          <line x1="0" y1="0" x2="10" y2="10" />
          <line x1="100" y1="0" x2="90" y2="10" />
          <line x1="0" y1="100" x2="10" y2="90" />
          <line x1="100" y1="100" x2="90" y2="90" />
        </g>
      </svg>

      <div
        className="absolute overflow-hidden bg-[#2a1608]"
        style={{
          inset: border,
          border: "3px solid #3a1f0a",
          boxShadow: "inset 4px 4px 0 rgba(0,0,0,0.55)",
        }}
      >
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover [image-rendering:pixelated]" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-[#4a3519] text-[#d9b97a]">
            <span style={{ fontSize: size * 0.28 }}>🖼️</span>
            <span className="font-pixel" style={{ fontSize: Math.max(8, size * 0.07) }}>
              PHOTO
            </span>
          </div>
        )}
      </div>

      {[
        ["left-[3px]", "top-[3px]"],
        ["right-[3px]", "top-[3px]"],
        ["left-[3px]", "bottom-[3px]"],
        ["right-[3px]", "bottom-[3px]"],
      ].map(([h, v], i) => (
        <span
          key={i}
          className={`absolute ${h} ${v} h-2 w-2 bg-[#9a9a9a]`}
          style={{ border: "1px solid #2a2a2a", boxShadow: "inset 1px 1px 0 #e0e0e0" }}
        />
      ))}
    </div>
  );
}