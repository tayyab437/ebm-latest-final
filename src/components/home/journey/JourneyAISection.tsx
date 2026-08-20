import React from "react";
import * as Icons from "lucide-react";
import { JourneyAIFeature } from "./journey.types";

interface JourneyAISectionProps {
  features: JourneyAIFeature[];
}

export const JourneyAISection: React.FC<JourneyAISectionProps> = ({ features }) => {
  return (
    <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
      <div className="flex items-center gap-2 mb-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
          Embedded AI Academic Aids
        </h5>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {features.map((feat) => {
          const IconComponent = Icons[feat.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Cpu;

          return (
            <div
              key={feat.id}
              className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/60 transition-colors duration-300"
            >
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
                <IconComponent className="w-4 h-4" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-200 block">
                  {feat.name}
                </span>
                <span className="text-[10px] text-slate-400 leading-normal block mt-0.5">
                  {feat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
