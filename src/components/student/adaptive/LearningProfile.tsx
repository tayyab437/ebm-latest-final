import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  UserCircle, 
  Clock, 
  Zap, 
  Eye, 
  Activity, 
  Brain,
  Sparkles,
  TrendingUp,
  BarChart2
} from "lucide-react";

export function LearningProfile() {
  const { profile } = useAdaptiveStore();

  const metrics = [
    { label: "Learning Style", value: profile.learningStyle, icon: Eye, color: "text-blue-400" },
    { label: "Learning Speed", value: profile.learningSpeed, icon: Zap, color: "text-amber-400" },
    { label: "Attention Span", value: `${profile.attentionSpan}m`, icon: Clock, color: "text-indigo-400" },
    { label: "Motivation", value: `${profile.motivationLevel}/10`, icon: Activity, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-900/40 via-purple-900/40 to-blue-900/40 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        <div className="px-8 pb-8 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="w-32 h-32 rounded-3xl bg-[#050B18] p-1 border-4 border-[#0A1120] shadow-2xl">
               <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-3xl font-black">
                 ZA
               </div>
            </div>
            <div className="flex-1 mb-2">
              <h2 className="text-3xl font-black text-white tracking-tight">Zaid Ali <Sparkles className="inline h-6 w-6 text-indigo-400 ml-2" /></h2>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">Accelerated Track</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" /> Est. Graduation: Oct 2026
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:bg-white/[0.04] transition-all group">
                <div className={`p-3 rounded-2xl bg-white/5 ${m.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <m.icon className="h-6 w-6" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</p>
                <p className="text-lg font-black text-white mt-1">{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Brain className="h-5 w-5 text-indigo-400" />
            Behavioral Intelligence
          </h3>
          <div className="space-y-6">
             {[
               { label: "Preferred Study Window", value: profile.preferredStudyTime, icon: Clock },
               { label: "Peak Performance Time", value: "Morning (09:00 - 11:00)", icon: TrendingUp },
               { label: "Revision Frequency", value: "Every 48 Hours", icon: BarChart2 },
               { label: "AI Tutor Usage", value: "High (12 sessions/week)", icon: Sparkles },
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-slate-400">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-black text-slate-300 uppercase tracking-widest">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-white tracking-tight">{item.value}</span>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <TrendingUp className="w-64 h-64" />
          </div>
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
            <Activity className="h-5 w-5 text-emerald-400" />
            Consistency Score
          </h3>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-white/5" strokeWidth="12" fill="none"
                />
                <circle 
                  cx="96" cy="96" r="88" 
                  className="stroke-indigo-500" strokeWidth="12" fill="none"
                  strokeDasharray={552.92}
                  strokeDashoffset={552.92 * (1 - profile.consistencyScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black text-white">{profile.consistencyScore}%</span>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Efficiency</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 font-medium text-center mt-8 max-w-xs">
              Your learning consistency is higher than 92% of students on the Accelerated O-Level track.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
