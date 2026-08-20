import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { JourneyStageData as StageType } from "./journey.types";

interface JourneyStageProps {
  stage: StageType;
  isActive: boolean;
  onSelect: () => void;
  index: number;
}

export const JourneyStage: React.FC<JourneyStageProps> = ({
  stage,
  isActive,
  onSelect,
  index,
}) => {
  const IconComponent = Icons[stage.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Compass;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`flex-shrink-0 w-72 sm:w-80 p-5 rounded-2xl border cursor-pointer transition-all duration-300 select-none ${
        isActive
          ? "bg-slate-900 border-amber-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.15)] text-white"
          : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 text-slate-400"
      }`}
      id={`journey-stage-card-${stage.id}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl border-2 ${
          isActive
            ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            : "bg-slate-950 border-slate-800 text-slate-500"
        }`}>
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="text-right">
          <span className={`text-[10px] font-bold tracking-widest uppercase font-mono px-2 py-0.5 rounded ${
            isActive ? "bg-amber-500/15 text-amber-400" : "bg-slate-950 text-slate-500"
          }`}>
            {stage.gradeLevel}
          </span>
          <span className="text-[10px] block text-slate-500 font-semibold font-mono mt-1">
            {stage.duration}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase block font-mono">
          Stage {index + 1}
        </span>
        <h4 className={`text-base font-bold tracking-tight transition-colors ${
          isActive ? "text-slate-100" : "text-slate-300"
        }`}>
          {stage.phaseName}
        </h4>
        <p className="text-xs text-slate-400/90 leading-relaxed mt-2 line-clamp-3">
          {stage.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-bold">
        <span className="text-slate-500">Milestone</span>
        <span className={isActive ? "text-amber-400" : "text-slate-400"}>
          {stage.expectedMilestone.title}
        </span>
      </div>
    </motion.div>
  );
};
