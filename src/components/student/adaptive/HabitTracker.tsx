import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Repeat, 
  Zap, 
  Flame, 
  Activity, 
  CheckCircle2, 
  Sparkles,
  TrendingUp,
  BarChart2,
  Calendar
} from "lucide-react";
import clsx from "clsx";

export function HabitTracker() {
  const { habits } = useAdaptiveStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">EBM Habit Streak</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Behavioral Consistency & Neural Priming Track</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
             <Flame className="h-5 w-5 text-amber-500 animate-bounce" />
             <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Legendary Streak: 12 Days</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {habits.map((habit) => (
            <div key={habit.id} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                  <Repeat className="w-40 h-40" />
               </div>
               
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Activity className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white tracking-tight">{habit.title}</h4>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Daily Neural Reinforcement</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-amber-500 font-black text-2xl tracking-tighter">
                       <Flame className="h-6 w-6" /> {habit.streak}
                    </div>
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Day Streak</span>
                  </div>
               </div>

               <div className="grid grid-cols-7 gap-3 mb-8">
                  {habit.history.map((done, i) => (
                    <div key={i} className="space-y-2">
                       <div className={clsx(
                         "aspect-square rounded-2xl border flex items-center justify-center transition-all",
                         done ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-white/5 border-white/5 text-slate-700"
                       )}>
                         {done ? <CheckCircle2 className="h-5 w-5" /> : <Zap className="h-4 w-4" />}
                       </div>
                       <p className="text-center text-[8px] font-black text-slate-600 uppercase tracking-widest">
                         {["M", "T", "W", "T", "F", "S", "S"][i]}
                       </p>
                    </div>
                  ))}
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                       <Calendar className="h-3.5 w-3.5" /> Next: Tomorrow 09:00
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-white/5 hover:bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white rounded-xl transition-all border border-white/5">
                    Mark Completed
                  </button>
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-blue-400">Consistency Insights</h3>
              <div className="space-y-8 relative z-10">
                 <div className="text-center">
                    <p className="text-4xl font-black tracking-tighter">94%</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Weekly Success Rate</p>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: "Best Streak", value: "28 Days", icon: Flame },
                      { label: "Habits Active", value: "6 Total", icon: Activity },
                      { label: "Trend", value: "Improving", icon: TrendingUp },
                    ].map((insight, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <insight.icon className="h-3.5 w-3.5 text-indigo-400" /> {insight.label}
                         </span>
                         <span className="text-xs font-black text-white">{insight.value}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Habit Efficiency</h3>
              <div className="h-40 flex items-end gap-2">
                 {[40, 70, 45, 90, 65, 80, 100].map((val, i) => (
                   <div key={i} className="flex-1 bg-white/5 rounded-t-lg relative group transition-all hover:bg-indigo-600" style={{ height: `${val}%` }}>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                         {val}% Match
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
