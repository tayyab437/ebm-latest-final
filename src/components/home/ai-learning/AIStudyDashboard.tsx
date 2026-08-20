import React from "react";
import { 
  Trophy, 
  Flame, 
  Target, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  CheckCircle2 
} from "lucide-react";
import { StudyDashboard } from "./ai-learning.types";

interface AIStudyDashboardProps {
  dashboard: StudyDashboard;
}

export const AIStudyDashboard: React.FC<AIStudyDashboardProps> = ({ dashboard }) => {
  return (
    <div className="space-y-6 bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 text-left">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Active Cognitive Telemetry
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Real-time visual telemetry calculated based on your daily EBM Socratic sessions.
          </p>
        </div>
        <div className="flex items-center gap-1.5 self-start sm:self-center">
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-ping" />
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Data Sync Active
          </span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metric 1: Streak */}
        <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/[0.01] rounded-full blur-lg" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Active Streak</span>
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{dashboard.studyStreak}</span>
            <span className="text-[10px] text-amber-500 font-bold">Days Active</span>
          </div>
          <p className="text-[9px] text-slate-500 leading-snug">
            Keep this streak alive to unlock certified exam badges!
          </p>
        </div>

        {/* Metric 2: Focus Score */}
        <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/[0.01] rounded-full blur-lg" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Focus Coefficient</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{dashboard.focusScore}%</span>
            <span className="text-[10px] text-purple-400 font-bold">Cognitive</span>
          </div>
          {/* Mock mini bar progress */}
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${dashboard.focusScore}%` }} />
          </div>
        </div>

        {/* Metric 3: Productivity Score */}
        <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500/[0.01] rounded-full blur-lg" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Efficiency</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-white">{dashboard.productivityScore}%</span>
            <span className="text-[10px] text-blue-400 font-bold">Velocity</span>
          </div>
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dashboard.productivityScore}%` }} />
          </div>
        </div>
      </div>

      {/* Target goals and reminders row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
        {/* Goals left column (8/12) */}
        <div className="md:col-span-8 p-4 rounded-xl border border-slate-900 bg-slate-950/20 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <CheckCircle2 className="w-4.5 h-4.5 text-amber-500" />
            <span>Today's Learning Protocol</span>
          </div>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-400 font-bold shrink-0">1</span>
              <p className="leading-relaxed font-sans">{dashboard.todayGoal}</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-500 shrink-0">2</span>
              <p className="leading-relaxed font-sans text-slate-400">Lessons remaining: <strong className="text-slate-200">{dashboard.lessonsRemaining} core units</strong></p>
            </div>
          </div>

          {/* AI Advisor Recommendation */}
          <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10 flex items-start gap-2.5">
            <Sparkles className="w-4.5 h-4.5 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-left">
              <div className="text-[10px] font-mono font-bold text-purple-300 uppercase">Companion's Recommendation</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{dashboard.aiRecommendation}</p>
            </div>
          </div>
        </div>

        {/* Timers & Reminders right column (4/12) */}
        <div className="md:col-span-4 flex flex-col justify-between gap-4">
          {/* Reminder A */}
          <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>CIE Pop Quiz</span>
            </div>
            <div className="text-xs font-bold text-slate-200">{dashboard.quizReminder}</div>
          </div>

          {/* Reminder B */}
          <div className="p-3.5 rounded-xl border border-slate-900 bg-slate-950/40 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase">
              <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
              <span>Spaced Repetition</span>
            </div>
            <div className="text-xs font-bold text-slate-200">{dashboard.revisionTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIStudyDashboard;
