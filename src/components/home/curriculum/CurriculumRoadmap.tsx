import React from "react";
import * as Icons from "lucide-react";
import { CurriculumStage } from "./curriculum.types";

interface CurriculumRoadmapProps {
  stages: CurriculumStage[];
}

export const CurriculumRoadmap: React.FC<CurriculumRoadmapProps> = ({ stages }) => {
  return (
    <div className="space-y-6 bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Structured Socratic Pathway
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            The multi-phase journey from basic fundamentals to final Cambridge exam mastery.
          </p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/20 bg-amber-500/10 text-amber-400 font-mono self-start sm:self-center">
          Verified Flow
        </span>
      </div>

      {/* Timeline Layout */}
      <div className="relative pl-6 md:pl-0 md:grid md:grid-cols-3 gap-6">
        
        {/* Desktop timeline horizontal connection line */}
        <div className="hidden md:block absolute top-[26px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber-600/30 via-amber-500/40 to-blue-500/20 z-0" />

        {/* Mobile vertical line */}
        <div className="md:hidden absolute top-4 bottom-4 left-[9px] w-0.5 bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-blue-500/10 z-0" />

        {stages.map((stage, index) => {
          const IconComponent = (Icons[stage.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.CheckCircle2;

          // Distinct bullet styling for progressive visual feedback
          const isFinal = index === stages.length - 1;
          const bulletColor = isFinal
            ? "border-blue-500 text-blue-400 bg-blue-950 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            : "border-amber-500 text-amber-400 bg-amber-950 shadow-[0_0_10px_rgba(245,158,11,0.2)]";

          return (
            <div key={stage.id} className="relative z-10 pb-6 md:pb-0 group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[24px] md:relative md:left-0 md:mx-auto md:mb-4 flex items-center justify-center w-5 h-5 rounded-full border-2 bg-slate-950 z-25 transition-all duration-300 transform group-hover:scale-110">
                <span className={`w-2 h-2 rounded-full ${isFinal ? "bg-blue-400" : "bg-amber-400 animate-pulse-slow"}`} />
              </div>

              {/* Node Card Details */}
              <div className="md:text-center p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-slate-800/80 transition-all duration-300">
                <div className="flex md:flex-col items-center md:justify-center gap-2 mb-2">
                  <span className={`p-1.5 rounded-lg border ${bulletColor}`}>
                    <IconComponent className="w-4 h-4" />
                  </span>
                  <h5 className="text-xs font-bold text-slate-100 group-hover:text-white transition-colors">
                    Stage {index + 1}: {stage.title}
                  </h5>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-normal md:max-w-[200px] md:mx-auto">
                  {stage.description}
                </p>

                {/* Simulated completion indicator */}
                <div className="mt-3 flex items-center md:justify-center gap-1 text-[9px] font-mono font-bold text-slate-500 uppercase">
                  <Icons.Lock className="w-3 h-3 text-slate-600" />
                  <span>Enrolls in premium</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};
