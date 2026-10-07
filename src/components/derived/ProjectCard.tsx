import QuestCard from "../base/QuestCard";
import PixelIcon from "../base/PixelIcon";
import { ICONS } from "../base/Icon";

type Project = {
  title: string;
  description: string;
  tags: string[];
  icon: string[];
  done: boolean;
  link?: string;
};

const projects: Project[] = [
  {
    title: "A New Chapter",
    description: "The Fundamentals.",
    tags: ["Python", "C++", "OOP", "DSA"],
    icon: ICONS.book,
    done: true,
  },
  {
    title: "Diving Deeper",
    description: "Project NLP",
    tags: ["Python", "FastAPI", "NLP", "ChromaDB"],
    icon: ICONS.search,
    done: true,
    link: "link git gan sau",
  },
  {
    title: "SWEEEEEEEEEEE!",
    description: "New Moodle",
    tags: ["MERN", "SWE"],
    icon: ICONS.castle,
    done: false,
  },
  {
    title: "Cash-pitalism",
    description: "Looking for J*bs",
    tags: ["Internship", "SWE", "Full-stack"],
    icon: ICONS.rupee,
    done: false,
  },
];

export default function ProjectCard() {
  const completed = projects.filter((p) => p.done).length;

  return (
    <div className="flex items-center justify-center overflow-visible">
      <QuestCard title="Achievements" size="lg">
        <div className="mb-3 flex justify-end">
          <div
            className="flex items-center gap-2 border-4 border-[#3a1f0a] bg-[#1b1208] px-2 py-1 font-pixel text-[#f5c518]"
            style={{ fontSize: "clamp(9px, 0.9vw, 14px)", boxShadow: "3px 3px 0 #000" }}
          >
            <span>🏆</span>
            <span>{completed}/∞</span>
          </div>
        </div>
        <ul className="pixel-scroll max-h-[40vh] space-y-3 overflow-y-auto pr-3">
          {projects.map((p) => (
            <li
              key={p.title}
              className={`flex items-center gap-4 border-4 p-3 transition ${
                p.done
                  ? "border-[#c9a24b] bg-[#4a3519]"
                  : "border-[#3a1f0a] bg-[#3a3228] opacity-60 grayscale"
              }`}
              style={{ boxShadow: "inset 3px 3px 0 rgba(0,0,0,0.4)" }}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center border-4 text-3xl ${
                  p.done ? "border-[#f5c518] bg-[#2f5d2a]" : "border-[#3a1f0a] bg-[#2a2a2a]"
                }`}
              >
                <PixelIcon grid={p.done ? p.icon : ICONS.lock} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="font-pixel text-xs text-[11px] leading-relaxed text-[#f5e6b3]">
                  {p.title}
                </div>
                <p className="font-pixel mt-1 text-[9px] text-[#d9c79a]">{p.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className={`px-1.5 font-pixel text-[8px] leading-relaxed ${
                        p.done ? "bg-[#f5c518] text-[#3b2a1a]" : "bg-[#888] text-[#222]"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.done && p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block font-pixel text-[9px] text-[#f5c518] underline"
                  >
                    Take a look
                  </a>
                )}
              </div>
              <div
                className={`shrink-0 font-pixel text-[11px] ${p.done ? "text-[#f5c518]" : "text-[#9a9a9a]"}`}
              >
                {p.done ? "1/1" : "0/1"}
              </div>
            </li>
          ))}
        </ul>
      </QuestCard>
    </div>
  );
}
