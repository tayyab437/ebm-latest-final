import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { PlayCircle, Clock, BookOpen, AlertCircle } from "lucide-react";

export function TodayLearning() {
  const { data, setView } = useDashboardStore();

  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 lg:p-6 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-50 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Up Next
          </span>
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Est. 45 mins
          </span>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">
          {data.subjects[0]?.nextLessonTitle || "no lessons scheduled"}
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1 mb-6">
          {data.subjects[0]?.name || "General Studies"}
        </p>

        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setView(DashboardView.MY_CLASSES)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <PlayCircle className="h-4 w-4" />
            Continue Learning
          </button>
          <button 
            onClick={() => setView(DashboardView.MY_CLASSES)}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-transform active:scale-95 cursor-pointer"
          >
            View Syllabus
          </button>
        </div>
      </div>

      <div className="md:w-64 flex flex-col justify-center space-y-3 relative z-10 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
        <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100/50">
          <div className="p-1.5 bg-amber-100 rounded-lg shrink-0 mt-0.5">
            <BookOpen className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-800">Daily Goal</h4>
            <p className="text-[10px] font-medium text-slate-600 leading-snug mt-0.5">Complete 2 lessons to maintain your streak.</p>
          </div>
        </div>

        {data.recentAssignments.length > 0 && (
          <div className="flex items-start gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100/50">
            <div className="p-1.5 bg-rose-100 rounded-lg shrink-0 mt-0.5">
              <AlertCircle className="h-4 w-4 text-rose-600" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-800">Pending Assignment</h4>
              <p className="text-[10px] font-medium text-slate-600 leading-snug mt-0.5 truncate w-32 md:w-40">
                {data.recentAssignments[0].title}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
