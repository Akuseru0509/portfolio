// components/Background.tsx
import { useEffect, useRef } from "react";

const PIXEL = 4;

const SKY = ["#4a9be8", "#5aa9f0", "#6db8f5", "#82c6f8", "#9ad3fa", "#b4e0fc"];
const LEAF_DARK = ["#2f7d32", "#3a8a2e"];
const LEAF_LIGHT = ["#4caf50", "#5fbf3f"];

type Cloud = { x: number; y: number; w: number; speed: number };
type Tree = { x: number; r: number; h: number; tone: number };

export default function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    let W = 0;
    let H = 0;
    let groundY = 0;
    let clouds: Cloud[] = [];
    let trees: Tree[] = [];
    let raf = 0;
    let last = performance.now();

    const rect = (x: number, y: number, w: number, h: number, c: string) => {
      ctx.fillStyle = c;
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
    };

    const resize = () => {
      W = Math.ceil(window.innerWidth / PIXEL);
      H = Math.ceil(window.innerHeight / PIXEL);
      canvas.width = W;
      canvas.height = H;
      groundY = H - 16;

      clouds = Array.from({ length: Math.max(3, Math.floor(W / 60)) }, () => ({
        x: Math.random() * W,
        y: 6 + Math.random() * H * 0.35,
        w: 18 + Math.random() * 20,
        speed: 1.5 + Math.random() * 3,
      }));

      trees = Array.from({ length: Math.floor(W / 40) }, () => ({
        x: Math.random() * W,
        r: 10 + Math.floor(Math.random() * 5),
        h: 16 + Math.floor(Math.random() * 8),
        tone: Math.random() < 0.5 ? 0 : 1,
      }));
    };

    const drawSky = () => {
      const bh = Math.ceil(groundY / SKY.length);
      SKY.forEach((c, i) => rect(0, i * bh, W, bh + 1, c));
    };

    const drawCloud = (c: Cloud) => {
      const { x, y, w } = c;
      rect(x + w * 0.3, y, w * 0.4, 3, "#ffffff");
      rect(x + w * 0.1, y + 3, w * 0.8, 3, "#ffffff");
      rect(x, y + 6, w, 2, "#ffffff");
      rect(x, y + 8, w, 1, "#cfe8fb");
    };

    const drawHill = (base: number, amp: number, freq: number, off: number, color: string) => {
      ctx.fillStyle = color;
      for (let x = 0; x < W; x++) {
        const h = Math.floor(
          amp * (0.6 * Math.sin(x * freq + off) + 0.4 * Math.sin(x * freq * 2.3 + off * 1.7)),
        );
        const top = base - h;
        ctx.fillRect(x, top, 1, H - top);
      }
    };

    const drawTree = (t: Tree, now: number) => {
      const x = Math.floor(t.x);

      rect(x - 1, groundY - t.h, 3, t.h, "#6b4423");
      rect(x + 1, groundY - t.h, 1, t.h, "#4e3219");

      const cy = groundY - t.h - t.r + 2;
      const ox = Math.floor(now / 700 + t.x) % 2;
      for (let dy = -t.r; dy <= t.r; dy++) {
        const hw = Math.floor(Math.sqrt(t.r * t.r - dy * dy) * 1.15);
        rect(x - hw + ox, cy + dy, hw * 2, 1, LEAF_DARK[t.tone]);
        if (dy < 0) rect(x - hw + ox, cy + dy, Math.floor(hw * 1.1), 1, LEAF_LIGHT[t.tone]);
      }
    };

    const drawGround = () => {
      rect(0, groundY, W, H - groundY, "#3f8f3c");
      rect(0, groundY, W, 2, "#7bc74d");
      for (let x = 0; x < W; x += 3) {
        const n = (x * 37) % 7;
        if (n < 3) rect(x, groundY + 3 + n * 2, 2, 1, "#2f7d32");
      }
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      drawSky();

      for (const c of clouds) {
        c.x += c.speed * dt;
        if (c.x > W) c.x = -c.w;
        drawCloud(c);
      }

      drawHill(groundY - 18, 10, 0.02, 1, "#8ccf7a");
      drawHill(groundY - 8, 7, 0.035, 4, "#5fae5a");

      for (const t of trees) drawTree(t, now);
      drawGround();

      raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={ref} className="fixed inset-0 z-0 h-full w-full [image-rendering:pixelated]" />
  );
}
