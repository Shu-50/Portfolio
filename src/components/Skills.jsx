import React from "react";
import { Star } from "lucide-react";
import SkillBar from "./SkillBar";
import SectionHeader from "./ui/SectionHeader";
import { useContent } from "../context/ContentContext";
import { RevealGroup, RevealItem, TiltCard } from "./ui/motion";

const Skills = () => {
  const { content } = useContent();
  const skills = content.skills || [];
  const total = skills.reduce((n, c) => n + (c.skills?.length || 0), 0);

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={Star}
        title="Technical Skills"
        subtitle={`${total} skills across ${skills.length} categories`}
      />

      <RevealGroup className="grid grid-cols-1 xl:grid-cols-2 gap-5" stagger={0.1}>
        {skills.map((cat, i) => (
          <RevealItem key={`${cat.category}-${i}`}>
            <TiltCard className="h-full glass rounded-2xl p-5 sm:p-6 card-glow" max={4}>
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center justify-between gap-2">
                <span className="text-white">{cat.category}</span>
                <span className="text-[11px] font-medium text-sky-400 bg-sky-500/10 border border-sky-500/25 px-2 py-0.5 rounded-full shrink-0">
                  {cat.skills?.length || 0}
                </span>
              </h3>

              <div className="divide-y divide-white/5">
                {(cat.skills || []).map((s, idx) => (
                  <SkillBar
                    key={`${s.name}-${idx}`}
                    skill={s.name}
                    level={s.level}
                    category={cat.type}
                    index={idx}
                  />
                ))}
              </div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
};

export default Skills;
