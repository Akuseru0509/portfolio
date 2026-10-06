import { useState } from "react";
import { createPortal } from "react-dom";
import QuestCard from "../base/QuestCard";
import PixelIcon, { ICONS } from "../base/PixelIcon";

type Skill = {
  name: string;
  icon: string[];
  mastery: number;
  description: string;
};

const skills: Skill[] = [
  {
    name: "Communi-mating V",
    icon: ICONS.english,
    mastery: 5,
    description: "The protagonist is proficient in English!",
  },
  {
    name: "All for One V",
    icon: ICONS.team,
    mastery: 5,
    description: "The protagonist can works with others to achieve shared objectives.",
  },
  {
    name: "Talking to Machines IV",
    icon: ICONS.python,
    mastery: 4,
    description: "The protagonist can use Python and C++ to talk to machines!",
  },
  {
    name: "STORAGEEEEE!",
    icon: ICONS.git,
    mastery: 5,
    description: "The protagonist is capable of using Git/Github to store projects!",
  },
  {
    name: "Flame-works!",
    icon: ICONS.framework,
    mastery: 3,
    description: "The protagonist had experiences with React, TailwindCSS, FastAPI, RestAPI.",
  },
  {
    name: "A Machine can also learn!?",
    icon: ICONS.ai,
    mastery: 4,
    description: "The protagonist is familiar with PyTorch, NumPy, Pandas, scikit-learn.",
  },
];

const SLOTS = 12;
const TIP_W = 230;
const TIP_H = 130;

type Tip = { skill: Skill; x: number; y: number } | null;

export default function SkillsCard() {
  const [tip, setTip] = useState<Tip>(null);

  const move = (e: React.MouseEvent, skill: Skill) => {
    setTip({ skill, x: e.clientX, y: e.clientY });
  };

  const pos = tip && {
    left: tip.x + 16 + TIP_W > window.innerWidth ? tip.x - 16 - TIP_W : tip.x + 16,
    top: tip.y + 16 + TIP_H > window.innerHeight ? tip.y - 16 - TIP_H : tip.y + 16,
  };

  return (
    <div className="flex items-center justify-center overflow-visible">
      <QuestCard title="Inventory" size="lg">
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: SLOTS }, (_, i) => {
            const skill = skills[i];
            return (
              <div
                key={i}
                className={`flex aspect-square items-center justify-center border-4 border-[#3a1f0a] bg-[#4a3519] text-3xl transition-colors ${
                  skill ? "cursor-pointer hover:border-[#f5c518] hover:bg-[#6a4a22]" : ""
                }`}
                style={{ boxShadow: "inset 3px 3px rgba(0, 0, 0, 0.4)" }}
                onMouseEnter={skill ? (e) => move(e, skill) : undefined}
                onMouseMove={skill ? (e) => move(e, skill) : undefined}
                onMouseLeave={() => setTip(null)}
              >
                {skill && <PixelIcon grid={skill.icon} size={48} />}
              </div>
            );
          })}
        </div>
      </QuestCard>
      {tip &&
        pos &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 border-4 border-[#f5c518] bg-[#1b1208] p-3 font-pixel"
            style={{ left: pos.left, top: pos.top, width: TIP_W, boxShadow: "4px 4px 0 #000" }}
          >
            <div className="text-[11px] leading-relaxed text-[#f5c518] space-y-2">
              <PixelIcon grid={tip.skill.icon} size={30} /> <span>{tip.skill.name}</span>
            </div>
            <div className="mt-1 text-[15px] tracking-widest text-[#e53935]">
              {"★".repeat(tip.skill.mastery)}
              <span className="text-[#5a4a3a]">{"★".repeat(5 - tip.skill.mastery)}</span>
            </div>
            <p className="mt-2 text-[9px] leading-relaxed text-[#f5e6b3]">
              {tip.skill.description}
            </p>
          </div>,
          document.body,
        )}
    </div>
  );
}
