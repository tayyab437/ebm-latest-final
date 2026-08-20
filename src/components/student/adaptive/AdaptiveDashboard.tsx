import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Brain, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  History,
  Activity,
  Award
} from "lucide-react";
import clsx from "clsx";

export function AdaptiveDashboard() {
  const { stats, recommendations, profile } = useAdaptiveStore();

  const metrics = [
    { label: "Learning Score", value: stats.learningScore, icon: Brain, color: "indigo" },
    { label: "Mastery Level", value: `${stats.masteryPercentage}%`, icon: Target, color: "purple" },
    { label: "Learning Velocity", value: stats.velocity, icon: Zap, color: "amber" },
    { label: "Consistency", value: `${profile.consistencyScore}%`, icon: Activity, color: "emerald" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Intelligence Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            Adaptive Intelligence <Sparkles className="h-6 w-6 text-indigo-400" />
          </h1>
          <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Real-time Learning Personalization Engine</p>
        </div>
        <div className="flex items-center gap-4 bg-[#0A1120] p-4 rounded-3xl border border-white/5">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Predicted Exam Score</p>
            <p className="text-xl font-black text-emerald-400">{stats.predictedExamScore}%</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <TrendingUp className="h-8 w-8 text-indigo-500" />
        </div>
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#0A1120] p-6 rounded-[2.5rem] border border-white/5 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className={`absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity`}>
              <m.icon className="w-24 h-24" />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-xl bg-white/5 text-${m.color}-400`}>
                <m.icon className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
            </div>
            <div className="text-3xl font-black text-white tracking-tighter">{m.value}</div>
            <div className="mt-4 flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              <ArrowUpRight className="h-3 w-3" /> +12% this week
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Recommendations Panel */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="font-black text-white text-sm uppercase tracking-[0.2em] flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                Adaptive Next Steps
              </h3>
              <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                Refresh AI Engine
              </button>
            </div>
            <div className="p-4 space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all group flex items-center gap-6 cursor-pointer">
                  <div className={clsx(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all group-hover:scale-110",
                    rec.type === "VIDEO" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                    rec.type === "AI_CONVERSATION" ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" :
                    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  )}>
                    {rec.type === "VIDEO" ? <History className="h-6 w-6" /> : <Brain className="h-6 w-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[9px] font-black px-2 py-0.5 rounded bg-white/5 text-slate-400 uppercase tracking-widest">{rec.type}</span>
                      {rec.priority === "HIGH" && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-rose-400 uppercase tracking-widest">
                          <Zap className="h-3 w-3" /> Priority
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-black text-white tracking-tight group-hover:text-indigo-400 transition-colors">{rec.title}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 truncate">{rec.reason}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      <Clock className="h-3 w-3" /> {rec.estimatedTime}m
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Intelligence Stats Sidebar */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Brain className="w-40 h-40" />
            </div>
            <h3 className="text-lg font-black uppercase tracking-tight mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-indigo-300" />
              Focus & Retention
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-indigo-200">
                  <span>Deep Work Duration</span>
                  <span className="text-white">82%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-400 rounded-full w-[82%] shadow-[0_0_12px_rgba(129,140,248,0.5)]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-indigo-200">
                  <span>Concept Retention</span>
                  <span className="text-white">78%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full w-[78%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-indigo-200">
                  <span>Revision Efficiency</span>
                  <span className="text-white">91%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full w-[91%]" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10">
                <Award className="h-6 w-6 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Mastery Milestone</p>
                  <p className="text-xs font-bold text-white mt-1">O-Level Physics Readiness</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="font-black text-white text-sm uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <History className="h-4 w-4 text-indigo-400" />
              EBM Habit Streak
            </h3>
            <div className="flex justify-between items-center mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map(d => (
                <div key={d} className="flex flex-col items-center gap-2">
                  <div className={clsx(
                    "w-8 h-8 rounded-xl flex items-center justify-center border transition-all",
                    d < 6 ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400" : "bg-white/5 border-white/10 text-slate-600"
                  )}>
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Day {d}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-3xl text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Streak</p>
              <p className="text-2xl font-black text-white mt-1">12 Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Lightbulb({ className }: { className?: string }) {
  return <Sparkles className={className} />;
}
