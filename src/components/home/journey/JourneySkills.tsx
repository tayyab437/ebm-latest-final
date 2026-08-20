import React from "react";
import { motion } from "motion/react";
import { JourneySkill } from "./journey.types";
import { useReducedMotion } from "./JourneyAnimations";

interface JourneySkillsProps {
  skills: JourneySkill[];
}

export const JourneySkills: React.FC<JourneySkillsProps> = ({ skills }) => {
  const isReduced = useReducedMotion();

  return (
    <div className="space-y-4">
      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
        Cognitive Skill Development
      </h5>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((sk) => (
          <div key={sk.id} className="space-y-1.5">
            <div className="flex justify-between items-baseline text-xs font-semibold">
              <span className="text-slate-300 font-sans">{sk.name}</span>
              <span className="text-amber-500 font-mono text-[10px]">{sk.percentage}% Mastery</span>
            </div>
            
            {/* Fine line progress bar */}
            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                initial={isReduced ? { width: `${sk.percentage}%` } : { width: 0 }}
                animate={{ width: `${sk.percentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
