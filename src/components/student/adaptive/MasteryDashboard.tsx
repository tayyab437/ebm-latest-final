import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Target, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  TrendingUp,
  ChevronRight,
  Sparkles,
  Award,
  Zap
} from "lucide-react";
import clsx from "clsx";

export function MasteryDashboard() {
  const { masteryRecords } = useAdaptiveStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Mastery Engine</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Granular Concept Tracking & Skill Validation</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Mastered: 42 Concepts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {masteryRecords.map((record) => (
            <div key={record.id} className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 hover:border-indigo-500/30 transition-all group cursor-pointer relative overflow-hidden">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white tracking-tight">{record.subject}</h4>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{record.unit}</p>
                    </div>
                  </div>
                  <div className={clsx(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                    record.status === "MASTERED" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                    record.status === "PROFICIENT" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  )}>
                    {record.status}
                  </div>
               </div>

               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Progress</span>
                    <span className="text-xs font-black text-white tracking-tight">{record.percentage}%</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={clsx(
                        "h-full rounded-full transition-all duration-1000",
                        record.status === "MASTERED" ? "bg-emerald-500" :
                        record.status === "PROFICIENT" ? "bg-blue-500" : "bg-amber-500"
                      )} 
                      style={{ width: `${record.percentage}%` }} 
                    />
                 </div>
               </div>

               <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> Last Active: {record.lastActivity}</span>
                    <span className="flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Velocity: +4.2%</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
               </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Award className="w-40 h-40" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-blue-400">Skill Breakdown</h3>
              <div className="space-y-6 relative z-10">
                 {[
                   { label: "Vocabulary", score: 92, icon: Sparkles },
                   { label: "Logical Proofs", score: 85, icon: Target },
                   { label: "Equation Solving", score: 72, icon: Zap },
                   { label: "Critical Reading", score: 64, icon: BookOpen },
                 ].map((skill, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span className="flex items-center gap-2"><skill.icon className="h-3 w-3" /> {skill.label}</span>
                         <span className="text-white">{skill.score}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                         <div className={`h-full bg-blue-500 rounded-full transition-all duration-1000`} style={{ width: `${skill.score}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Mastery Badges</h3>
              <div className="grid grid-cols-3 gap-4">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group hover:bg-indigo-600 transition-all cursor-pointer">
                      <Award className="h-6 w-6 text-slate-600 group-hover:text-white transition-colors" />
                   </div>
                 ))}
                 <div className="aspect-square rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-[10px] font-black uppercase tracking-widest">
                    +12
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
