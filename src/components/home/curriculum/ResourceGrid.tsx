import React from "react";
import * as Icons from "lucide-react";
import { LearningResource } from "./curriculum.types";

interface ResourceGridProps {
  resources: LearningResource[];
}

export const ResourceGrid: React.FC<ResourceGridProps> = ({ resources }) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-900/60 pb-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Interactive Study Resources
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res) => {
          const IconComponent = (Icons[res.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.BookOpen;

          return (
            <div
              key={res.id}
              className="flex gap-3.5 p-4 rounded-xl border border-slate-900 bg-slate-950/20 hover:border-slate-800/80 transition-all duration-300 group"
            >
              <span className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 group-hover:text-amber-500 group-hover:border-amber-500/20 transition-all duration-300 shrink-0 h-fit">
                <IconComponent className="w-4 h-4" />
              </span>

              <div className="space-y-1 min-w-0">
                <h5 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors truncate">
                  {res.title}
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {res.description}
                </p>
                <div className="pt-1.5 text-[9px] font-bold font-mono text-amber-500/80 uppercase tracking-wide">
                  {res.countLabel}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
