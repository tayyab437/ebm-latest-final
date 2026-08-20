import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Plus, 
  Calendar, 
  Target, 
  Flag, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Sparkles
} from "lucide-react";
import clsx from "clsx";

export function GoalManager() {
  const { goals } = useAdaptiveStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Academic Goals</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Define, Track & Achieve Learning Milestones</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
          <Plus className="h-4 w-4" /> Create New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 hover:border-indigo-500/30 transition-all group">
               <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <Flag className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white tracking-tight">{goal.title}</h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 py-0.5 bg-white/5 rounded-md">{goal.type}</span>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" /> Target: {goal.targetDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-white tracking-tighter">{goal.progress}%</span>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Completion</span>
                  </div>
               </div>

               <div className="space-y-4">
                 <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(129,140,248,0.5)]" 
                      style={{ width: `${goal.progress}%` }} 
                    />
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>Diagnostic Points</span>
                    <span className="text-indigo-400">Next Milestone in 15%</span>
                 </div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">On Track</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                       <Clock className="h-3.5 w-3.5" /> 12 Days Remaining
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest group-hover:gap-3 transition-all">
                    View Details <ChevronRight className="h-3.5 w-3.5" />
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Target className="w-40 h-40" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-indigo-400">AI Suggested Goals</h3>
              <div className="space-y-4 relative z-10">
                 {[
                   { title: "Master Linear Algebra", reason: "Current mastery at 65%", impact: "High" },
                   { title: "Increase Daily Focus", reason: "Attention span dipped by 10m", impact: "Medium" },
                 ].map((sug, i) => (
                   <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                         <span className="text-[10px] font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">{sug.title}</span>
                         <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">{sug.reason}</p>
                      <button className="w-full py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                         Accept Goal
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Accomplishments</h3>
              <div className="space-y-4">
                 {[
                   { title: "Completed Year 1 Math", date: "Jun 12, 2024" },
                   { title: "Reading Speed 200WPM", date: "May 25, 2024" },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                         <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.title}</p>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{item.date}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
