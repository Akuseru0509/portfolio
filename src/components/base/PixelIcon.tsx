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

export const ICONS = {
  book: [
    ".kkkkkk.",
    "knnnnnlk",
    "knwwwnlk",
    "knnnnnlk",
    "knwwwnlk",
    "knnnnnlk",
    "kgggggGk",
    ".kkkkkk.",
  ],
  search: [
    ".kkkk...",
    "kbwbbk..",
    "kwbbbk..",
    "kbbbbk..",
    ".kkkkk..",
    "....kpk.",
    ".....kpk",
    "......kk",
  ],
  castle: [
    "k.k..k.k",
    "kskssksk",
    "kssssssk",
    "kssppssk",
    "kssppssk",
    "kssppssk",
    "kssppssk",
    "kkkkkkkk",
  ],
  rupee: [
    "...kk...",
    "..kllk..",
    ".kllwlk.",
    "kllwlllk",
    "kllwllnk",
    ".kllllk.",
    "..kllk..",
    "...kk...",
  ],
  lock: [
    "..kkkk..",
    ".kGGGGk.",
    ".kG..Gk.",
    "kkkkkkkk",
    "kggggggk",
    "kggkkggk",
    "kggkkggk",
    "kkkkkkkk",
  ],
  python: [
    ".kkkk...",
    "kbwbbk..",
    "kbbbbkkk",
    "kbbkkggk",
    "kkkggggk",
    "..kggwgk",
    "..kgggk.",
    "...kkkk.",
  ],
  team: [
    ".kk..kk.",
    "kwwkkwwk",
    ".kk..kk.",
    "kggkkbbk",
    "kggkkbbk",
    "kggkkbbk",
    "kggkkbbk",
    "kkkkkkkk",
  ],
  english: [
    "..kkkk..",
    ".kbblbk.",
    "kbllbbbk",
    "kblbblbk",
    "kbbbllbk",
    "kbblllbk",
    ".kbbbbk.",
    "..kkkk..",
  ],
  git: [
    "...kk...",
    "..krrk..",
    ".kwgrrk.",
    "krrkrrrk",
    "krrkrwgk",
    ".krkrrk.",
    "..kwgk..",
    "...kk...",
  ],
  framework: [
    "..kkkk..",
    ".kllllk.",
    "kllwlllk",
    "kkkkkkkk",
    "kbbbbbbk",
    "kkkkkkkk",
    "kggggggk",
    "kkkkkkkk",
  ],
  ai: [
    "........",
    "gg....bb",
    "ggk..kbb",
    "..kwlk..",
    "..kllk..",
    "ggk..kbb",
    "gg....bb",
    "........",
  ],
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
