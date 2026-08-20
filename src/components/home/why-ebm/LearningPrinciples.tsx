import React from "react";
import * as Icons from "lucide-react";
import { LearningPrincipleData } from "./why-ebm.types";

interface LearningPrinciplesProps {
  principles: LearningPrincipleData[];
}

export const LearningPrinciples: React.FC<LearningPrinciplesProps> = ({ principles }) => {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">Pedagogical Framework</span>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Core Pillars of the Ejaz Bukhari Method</h3>
        <p className="text-xs text-slate-600 mt-2">
          EBM is structured upon six foundational pillars designed to cultivate critical inquiry and lifelong learning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {principles.map((pr) => {
          const IconComponent = Icons[pr.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Compass;

          return (
            <div
              key={pr.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-200 transition-all duration-300 flex gap-4 items-start shadow-sm"
            >
              <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                <IconComponent className="w-5 h-5" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-800">{pr.title}</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">{pr.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
