import React from "react";
import * as Icons from "lucide-react";
import { SubjectData } from "./curriculum.types";

interface SubjectStatisticsProps {
  subject: SubjectData;
}

export const SubjectStatistics: React.FC<SubjectStatisticsProps> = ({ subject }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/10 border border-slate-900 rounded-2xl p-4">
      {/* Metric 1: Lessons */}
      <div className="p-3 text-center space-y-1.5 border-r border-slate-900 last:border-0">
        <div className="flex justify-center text-amber-500/80 mb-1">
          <Icons.BookOpen className="w-4 h-4" />
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
          {subject.lessonCount}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">
          Lessons
        </div>
      </div>

      {/* Metric 2: Worksheets */}
      <div className="p-3 text-center space-y-1.5 border-r border-slate-900 sm:border-r last:border-0">
        <div className="flex justify-center text-amber-500/80 mb-1">
          <Icons.FileText className="w-4 h-4" />
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
          {subject.worksheetCount}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">
          Worksheets
        </div>
      </div>

      {/* Metric 3: Quizzes */}
      <div className="p-3 text-center space-y-1.5 border-r border-slate-900 last:border-0">
        <div className="flex justify-center text-amber-500/80 mb-1">
          <Icons.Award className="w-4 h-4" />
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
          {subject.quizCount}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">
          Quizzes
        </div>
      </div>

      {/* Metric 4: Diagnostic metrics from metadata */}
      <div className="p-3 text-center space-y-1.5 last:border-0">
        <div className="flex justify-center text-amber-500/80 mb-1">
          <Icons.Clock className="w-4 h-4" />
        </div>
        <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-sans">
          {subject.estimatedDuration}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">
          Duration
        </div>
      </div>
    </div>
  );
};
