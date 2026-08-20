import React from "react";
import { motion } from "motion/react";
import { SkillLevel } from "./curriculum.types";
import { progressWidthVariants, useReducedMotion } from "./animations";

interface SkillMatrixProps {
  skills: SkillLevel[];
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills }) => {
  const isReduced = useReducedMotion();

  return (
    <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-900/60 pb-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Skill Matrix Developed
        </h4>
        <span className="text-[10px] text-slate-500 font-mono">Verified Metric</span>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{skill.name}</span>
              <span className="font-bold text-amber-500 font-mono">{skill.percentage}%</span>
            </div>
            
            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900/80">
              <motion.div
                variants={isReduced ? undefined : progressWidthVariants(skill.percentage)}
                initial="hidden"
                animate="visible"
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                style={isReduced ? { width: `${skill.percentage}%` } : {}}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
