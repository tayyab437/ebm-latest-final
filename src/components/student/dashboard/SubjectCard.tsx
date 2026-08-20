import React from "react";
import { SubjectProgress, DashboardView } from "./dashboard.types";
import { useDashboardStore } from "./dashboard.store";
import { PlayCircle, FileText, Sparkles } from "lucide-react";
import clsx from "clsx";

interface SubjectCardProps {
  key?: React.Key;
  subject: SubjectProgress;
  onClick?: () => void;
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
  const { setView } = useDashboardStore();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      const classId = subject.id.split('-')[0];
      setView(DashboardView.MY_CLASSES, { classId, subject: subject.name });
    }
  };

  return (
    <div onClick={handleClick} className={clsx("bg-white rounded-3xl border border-slate-200/50 p-6 shadow-sm group hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 cursor-pointer flex flex-col h-full relative overflow-hidden", onClick && "active:scale-[0.98]")}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md text-white font-black text-sm tracking-widest", subject.color)}>
            <span className="text-white font-black text-sm tracking-widest">{subject.code.substring(0, 2)}</span>
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              {subject.name}
            </h4>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">Code: {subject.code}</p>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Progress</span>
          <span className="text-[10px] font-black text-slate-800">{subject.progressPercentage}%</span>
        </div>
        <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
          <div 
            className={clsx("h-full rounded-full transition-all duration-1000 ease-out", subject.color)} 
            style={{ width: `${subject.progressPercentage}%` }}
          />
        </div>
        <p className="text-[9px] font-bold text-slate-500 mt-2">
          {subject.lessonsCompleted} of {subject.totalLessons} lessons completed
        </p>
      </div>

      <div className="mt-auto space-y-3">
        <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-start gap-2">
          <PlayCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Up Next</p>
            <p className="text-[11px] font-bold text-slate-700 line-clamp-1">{subject.nextLessonTitle}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {subject.pendingAssignments > 0 && (
              <div className="flex items-center gap-1 text-[9px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-100">
                <FileText className="h-3 w-3" />
                {subject.pendingAssignments} task
              </div>
            )}
            <div className="flex items-center gap-1 text-[9px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100" title="AI Mastery Score">
              <Sparkles className="h-3 w-3" />
              {subject.aiMasteryScore}
            </div>
          </div>
          <button className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
            Resume <PlayCircle className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
