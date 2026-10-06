import QuestCard from "../base/QuestCard";
import WoodFrame from "../base/WoodFrame";

export default function AboutCard() {
  return (
    <div className="flex items-center justify-center overflow-visible">
      <QuestCard title="Inventory" size="xl">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <WoodFrame /* src="/avatar.png" */ size={160} />
          <div className="min-w-0 flex-1">
            <ul className="font-pixel space-y-2">
              <li className="text-xl leading-10">• Undergrad @ HCMUS, Class of '27.</li>
              <li className="text-xl leading-10">• Field of Study: Knowledge Engineering.</li>
              <li className="text-xl leading-10">
                • Currently looking for Internship in SWE or Full-stack Developing.
              </li>
            </ul>
          </div>
        </div>
      </QuestCard>
    </div>
  );
}
