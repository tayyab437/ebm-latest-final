import React from "react";
import { PlayCircle, FileText, CheckCircle, Calendar, Download, Users, TrendingUp, Sparkles } from "lucide-react";

const ACTIONS = [
  { id: "continue", label: "Continue Learning", icon: PlayCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "ask-ai", label: "Ask AI Tutor", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
  { id: "worksheet", label: "Generate Worksheet", icon: FileText, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "quiz", label: "Take Quick Quiz", icon: CheckCircle, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "calendar", label: "Open Calendar", icon: Calendar, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: "notes", label: "Download Notes", icon: Download, color: "text-rose-500", bg: "bg-rose-50" },
  { id: "community", label: "Community", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50" },
  { id: "progress", label: "View Progress", icon: TrendingUp, color: "text-teal-500", bg: "bg-teal-50" },
];

export function QuickActions() {
  const handleActionClick = (id: string) => {
    if (id === "continue") {
      // Find the App component activeTab setter in a real app, or trigger custom event
      const appRoot = document.getElementById("ebm-root");
      // Fallback for demo navigation:
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'learning' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm">
      <h3 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all text-center gap-2 group outline-none"
            >
              <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <span className="text-[9px] font-bold text-slate-600 leading-tight">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
