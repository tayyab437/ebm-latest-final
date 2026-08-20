import React from "react";
import * as Icons from "lucide-react";
import { SecurityItem } from "./ai-learning.types";

interface AISecurityPanelProps {
  items: SecurityItem[];
}

export const AISecurityPanel: React.FC<AISecurityPanelProps> = ({ items }) => {
  return (
    <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 text-left space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Safety, Privacy & Parental Governance
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            EBM is fully committed to a secure, private, and mathematically focused educational sanctuary.
          </p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-blue-500/20 bg-blue-500/10 text-blue-400 font-mono self-start sm:self-center">
          ISO Certified Space
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {items.map((item) => {
          const IconComponent =
            (Icons[item.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Shield;

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 transition-all duration-200 space-y-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <IconComponent className="w-4.5 h-4.5" />
              </div>

              <div className="space-y-1">
                <h5 className="text-xs font-bold text-slate-100">{item.title}</h5>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AISecurityPanel;
