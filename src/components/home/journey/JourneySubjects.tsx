import React from "react";
import { JourneySubject } from "./journey.types";

interface JourneySubjectsProps {
  subjects: JourneySubject[];
}

export const JourneySubjects: React.FC<JourneySubjectsProps> = ({ subjects }) => {
  return (
    <div className="space-y-3">
      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
        Syllabus Modules Covered
      </h5>
      <div className="flex flex-wrap gap-2">
        {subjects.map((sub) => {
          const categoryColors = {
            STEM: "bg-blue-500/10 text-blue-400 border-blue-500/20",
            Humanities: "bg-violet-500/10 text-violet-400 border-violet-500/20",
            Language: "bg-sky-500/10 text-sky-400 border-sky-500/20",
            Business: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          };

          return (
            <span
              key={sub.id}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-sm transition-all duration-300 hover:scale-102 cursor-default ${
                categoryColors[sub.category] || "bg-slate-800 text-slate-300 border-slate-700"
              }`}
            >
              {sub.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
