import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { Target, Clock, Zap, TrendingUp } from "lucide-react";

export function ProgressCards() {
  const { data } = useDashboardStore();

  if (!data) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg shrink-0">
            <Target className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">Completion</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{data.statistics.overallCompletionPercentage}%</span>
          <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 mb-1">
            <TrendingUp className="h-3 w-3" /> +2%
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">Study Hours</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{data.statistics.monthlyStudyHours}h</span>
          <span className="text-[10px] font-medium text-slate-400 mb-1">This month</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg shrink-0">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">Total XP</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">
            {(data.statistics.totalXp / 1000).toFixed(1)}k
          </span>
          <span className="text-[10px] font-medium text-slate-400 mb-1">XP Points</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
            <TrendingUp className="h-4 w-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider truncate">Mastery</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{data.statistics.masteryScore}/100</span>
          <span className="text-[10px] font-medium text-slate-400 mb-1">AI Score</span>
        </div>
      </div>
    </div>
  );
}
