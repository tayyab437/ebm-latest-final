import React from "react";
import * as Icons from "lucide-react";
import { SubjectData } from "./curriculum.types";

interface SubjectCardProps {
  subject: SubjectData;
  isSelected: boolean;
  onSelect: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, isSelected, onSelect }) => {
  // Map icons
  const IconComponent = (Icons[subject.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.BookOpen;

  // Difficulty badge colors
  const difficultyStyles = {
    Foundation: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  // Circular progress mock percentage
  const progressPercent = subject.id === "sub-math" ? 75 : subject.id === "sub-science" ? 45 : 0;

  return (
    <button
      id={`subject-card-${subject.id}`}
      onClick={onSelect}
      className={`w-full text-left relative flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm group select-none ${
        isSelected
          ? "bg-slate-900/80 border-amber-500/80 shadow-[0_4px_20px_rgba(245,158,11,0.15)] text-white"
          : "bg-slate-950/40 border-slate-900 hover:border-slate-800 text-slate-300 hover:bg-slate-900/40"
      }`}
    >
      {/* Decorative Selected Aura */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.03] to-amber-500/0 rounded-xl pointer-events-none" />
      )}

      {/* Dynamic Icon */}
      <div
        className={`p-2.5 rounded-xl border transition-all duration-300 shrink-0 ${
          isSelected
            ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
            : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-amber-400 group-hover:border-amber-500/20"
        }`}
      >
        <IconComponent className="w-5 h-5 animate-pulse-slow" />
      </div>

      {/* Title & Info */}
      <div className="flex-grow space-y-1.5 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold tracking-tight text-slate-100 group-hover:text-white truncate">
            {subject.name}
          </h4>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${difficultyStyles[subject.difficultyLevel]}`}>
            {subject.difficultyLevel}
          </span>
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {subject.tagline}
        </p>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-900/60 text-[10px] text-slate-500 font-mono">
          <div className="flex items-center gap-1">
            <Icons.Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{subject.estimatedDuration}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Progress:</span>
            {/* Visual Mini Progress Ring */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  className="stroke-slate-800 fill-none"
                  strokeWidth="2"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  className={`${isSelected ? "stroke-amber-500" : "stroke-amber-500/40"} fill-none`}
                  strokeWidth="2"
                  strokeDasharray={2 * Math.PI * 6}
                  strokeDashoffset={2 * Math.PI * 6 * (1 - progressPercent / 100)}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
