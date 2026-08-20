import React from "react";
import * as Icons from "lucide-react";
import { AITool } from "./curriculum.types";

interface AIToolsPanelProps {
  tools: AITool[];
}

export const AIToolsPanel: React.FC<AIToolsPanelProps> = ({ tools }) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-slate-900/60 pb-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Integrated AI Cognitive Tools
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const IconComponent = (Icons[tool.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Bot;

          return (
            <div
              key={tool.id}
              className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-slate-800/80 transition-all duration-300 group flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
                <IconComponent className="w-4 h-4 animate-pulse" />
              </div>

              <div className="space-y-1">
                <h5 className="text-xs font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                  {tool.name}
                </h5>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-normal">
                  {tool.description}
                </p>
                <span className="inline-flex items-center text-[8px] font-bold font-mono text-blue-500/80 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded tracking-wider uppercase">
                  Available 24/7
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
