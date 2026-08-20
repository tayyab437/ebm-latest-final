import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { PlayCircle, Trophy, Award, FileText, Sparkles, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export function ActivityTimeline() {
  const { data } = useDashboardStore();

  if (!data || data.recentActivity.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "LESSON_COMPLETED": return <PlayCircle className="h-4 w-4 text-emerald-500" />;
      case "QUIZ_PASSED": return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case "BADGE_EARNED": return <Trophy className="h-4 w-4 text-amber-500" />;
      case "CERTIFICATE_EARNED": return <Award className="h-4 w-4 text-purple-500" />;
      case "WORKSHEET_DOWNLOADED": return <FileText className="h-4 w-4 text-slate-500" />;
      case "AI_SESSION": return <Sparkles className="h-4 w-4 text-indigo-500" />;
      default: return <CheckCircle2 className="h-4 w-4 text-slate-400" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case "LESSON_COMPLETED": return "bg-emerald-100";
      case "QUIZ_PASSED": return "bg-blue-100";
      case "BADGE_EARNED": return "bg-amber-100";
      case "CERTIFICATE_EARNED": return "bg-purple-100";
      case "WORKSHEET_DOWNLOADED": return "bg-slate-100";
      case "AI_SESSION": return "bg-indigo-100";
      default: return "bg-slate-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm">
      <div className="relative border-l border-slate-200 ml-3 space-y-6 pb-2">
        {data.recentActivity.map((activity, index) => (
          <div key={activity.id} className="relative pl-6">
            <span className={clsx(
              "absolute -left-3 top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10",
              getBg(activity.type)
            )}>
              {getIcon(activity.type)}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div>
                <h4 className="text-xs font-bold text-slate-800">{activity.title}</h4>
                <p className="text-[11px] font-medium text-slate-500 mt-0.5">{activity.description}</p>
              </div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                {new Date(activity.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
