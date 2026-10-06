interface PixelSquareProps {
  color?: string;
  pixelSize?: number;
  className?: string;
  map?: string[];
}

const DEFAULT_MAP = ["1111", "1111", "1111", "1111"];

export default function PixelSquare({
  color = "black",
  pixelSize = 2,
  className = "",
  map = DEFAULT_MAP,
}: PixelSquareProps) {
  const cols = map[0].length;
  const rows = map.length;

  return (
    <svg
      className={className}
      style={{ filter: `drop-shadow(${pixelSize}px ${pixelSize}px 0 rgba(0,0,0,0.4))` }}
      width={cols * pixelSize}
      height={rows * pixelSize}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
    >
      {map.flatMap((row, y) =>
        [...row].map((pixel, x) =>
          pixel === "1" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
          ) : null,
        ),
      )}
    </svg>
  );
}
