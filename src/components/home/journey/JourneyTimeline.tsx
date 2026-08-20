import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { JourneyStageData } from "./journey.types";
import { useReducedMotion } from "./JourneyAnimations";

interface JourneyTimelineProps {
  stages: JourneyStageData[];
  selectedStageId: string;
  onStageSelect: (id: string) => void;
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({
  stages,
  selectedStageId,
  onStageSelect,
}) => {
  const isReduced = useReducedMotion();

  return (
    <div className="relative w-full max-w-md mx-auto">
      
      {/* Decorative Line in Background */}
      <div className="absolute left-[31px] top-6 bottom-6 w-[2px] bg-slate-800/80 hidden md:block" />

      {/* Dynamic Colored active progress bar overlay */}
      <div className="absolute left-[31px] top-6 w-[2px] bg-amber-500 transition-all duration-500 ease-out hidden md:block"
           style={{
             height: `${(stages.findIndex(s => s.id === selectedStageId) / (stages.length - 1)) * 90}%`
           }} 
      />

      <div className="space-y-4 md:space-y-6">
        {stages.map((stage, idx) => {
          const isSelected = stage.id === selectedStageId;
          const IconComponent = Icons[stage.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Compass;

          return (
            <motion.button
              key={stage.id}
              onClick={() => onStageSelect(stage.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl text-left border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                isSelected
                  ? "bg-slate-900/80 border-amber-500/30 shadow-[0_4px_25px_rgba(245,158,11,0.1)] text-white"
                  : "bg-transparent border-transparent hover:bg-slate-900/20 hover:border-slate-800 text-slate-400 hover:text-slate-300"
              }`}
              initial={isReduced ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              aria-label={`Select stage ${idx + 1}: ${stage.phaseName} - ${stage.gradeLevel}`}
              id={`journey-node-${stage.id}`}
            >
              {/* Outer circle / Indicator */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    : "bg-slate-950 border-slate-800 text-slate-500"
                }`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                
                {/* Micro Completion bubble */}
                <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${
                  isSelected ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-400"
                }`}>
                  {idx + 1}
                </span>
              </div>

              {/* Text content */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold tracking-wider uppercase font-mono ${
                    isSelected ? "text-amber-400" : "text-slate-500"
                  }`}>
                    {stage.gradeLevel}
                  </span>
                  <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-950/40 font-semibold font-mono border border-slate-900">
                    {stage.duration}
                  </span>
                </div>
                
                <h3 className={`text-sm font-bold tracking-tight mt-0.5 transition-colors ${
                  isSelected ? "text-slate-100" : "text-slate-300"
                }`}>
                  {stage.phaseName}
                </h3>
                
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {stage.shortDescription}
                </p>
              </div>

              {/* Arrow right indicator */}
              <div className={`hidden md:block transition-all duration-300 ${
                isSelected ? "opacity-100 translate-x-0 text-amber-400" : "opacity-0 -translate-x-2 text-slate-600"
              }`}>
                <Icons.ChevronRight className="w-4 h-4" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
