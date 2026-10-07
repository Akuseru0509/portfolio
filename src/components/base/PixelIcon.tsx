const PALETTE: Record<string, string> = {
  k: "#3a1f0a",
  g: "#f5c518",
  G: "#c9a24b",
  w: "#fff3c4",
  n: "#2f5d2a",
  l: "#7bc74d",
  b: "#4fc3f7",
  p: "#8f5a2c",
  s: "#9a9a9a",
  r: "#e53935",
};

type PixelIconProps = { grid: string[]; size?: number };

export default function PixelIcon({ grid, size = 40 }: PixelIconProps) {
  if (!Array.isArray(grid)) return null;
  return (
    <svg viewBox="0 0 8 8" width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      {grid.flatMap((row, y) =>
        [...row].map((c, x) =>
          PALETTE[c] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={PALETTE[c]} />
          ) : null,
        ),
      )}
    </svg>
  );
}
