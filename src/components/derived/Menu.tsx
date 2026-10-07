import { useCallback, useState, type ReactNode, useEffect, useRef } from "react";
import TextCard from "../base/TextCard";
import AboutCard from "./AboutCard";
import SkillsCard from "./SkillsCard";
import ProjectCard from "./ProjectCard";

const items = [
  { id: "about", label: "Protagonist" },
  { id: "skills", label: "Inventory" },
  { id: "projects", label: "Achievements" },
  { id: "cv", label: "Get Started" },
];

const cards: Record<string, ReactNode> = {
  about: <AboutCard />,
  skills: <SkillsCard />,
  projects: <ProjectCard />,
};

export default function Menu() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState<string | null>(null);

  const wheelLocked = useRef(false);

  const wrap = useCallback((i: number) => {
    return (i + items.length) % items.length;
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setSelected((current) => {
        return wrap(current + dir);
      });
    },
    [wrap],
  );

  const activate = useCallback((n: number) => {
    const id = items[n].id;

    if (id === "cv") {
      const link = document.createElement("a");

      link.href = "/hehe.txt";
      link.download = "CV.pdf";
      link.click();

      return;
    }

    setOpen(id);
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (open !== null || wheelLocked.current) return;

    wheelLocked.current = true;

    step(e.deltaY > 0 ? 1 : -1);

    setTimeout(() => {
      wheelLocked.current = false;
    }, 200);
  };

  const handleClick = (i: number) => {
    if (i === selected) {
      activate(i);
    } else {
      setSelected(i);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        return;
      }

      if (e.key === "Enter") {
        activate(selected);
        return;
      }

      if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        step(-1);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, step, activate]);

  return (
    <>
      <nav
        className="fixed left-4 top-1/2 z-5 flex -translate-y-1/2 flex-col gap-25 py-4 pl-2 pr-6"
        onWheel={(event) => handleWheel(event)}
      >
        <div className="pointer-events-none absolute transparent" />

        {items.map((item, i) => {
          const active = i === selected;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-2 transition-transform duration-300 ${
                active ? "translate-x-3" : ""
              }`}
            >
              <span
                className={`font-pixel text-[#f5c518] ${active ? "opacity-100 animate-arrow" : "opacity-0"}`}
                style={{
                  fontSize: "clamp(20px, 2.4vw, 40px)",
                  width: "clamp(24px, 3vw, 48px)",
                  textShadow: "3px 3px 0 #000",
                }}
              >
                ▶
              </span>
              <TextCard active={active} onClick={() => handleClick(i)}>
                {item.label}
              </TextCard>
            </div>
          );
        })}
      </nav>

      {open !== null && (
        <div
          className="fixed inset-0 z-5 flex items-center justify-center bg-black/60 p4"
          onClick={() => setOpen(null)}
        >
          <div style={{ animation: "pop 0.25s ease-out" }} onClick={(e) => e.stopPropagation()}>
            {cards[open]}
          </div>
        </div>
      )}
      <style>{`@keyframes pop { 
                    from { transform: scale(0.7); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
        }`}</style>
    </>
  );
}
