import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Target, 
  TrendingUp, 
  Brain, 
  Zap, 
  Sparkles,
  ArrowUpRight,
  Clock,
  Activity,
  Award,
  LineChart
} from "lucide-react";
import clsx from "clsx";

export function PredictionDashboard() {
  const { predictions, stats } = useAdaptiveStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">AI Predictions</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Predictive Learning Models & Performance Forecasts</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Model Confidence: 94.2%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {predictions.map((p, i) => (
               <div key={i} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                  <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-10 transition-opacity">
                     <Brain className="w-32 h-32" />
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                     <div className="p-2.5 rounded-xl bg-white/5 text-indigo-400">
                        <LineChart className="h-5 w-5" />
                     </div>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{p.metric}</span>
                  </div>
                  <div className="text-4xl font-black text-white tracking-tighter mb-2">{p.value}</div>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{p.description}</p>
                  
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Confidence: {p.confidence}%</span>
                     </div>
                     <ArrowUpRight className="h-4 w-4 text-slate-700 group-hover:text-indigo-400 transition-colors" />
                  </div>
               </div>
             ))}
          </div>

          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden">
             <div className="flex items-center justify-between mb-12">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                   <TrendingUp className="h-5 w-5 text-indigo-400" />
                   Performance Forecast
                </h3>
                <div className="flex gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" /> Current
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                      <div className="w-2 h-2 rounded-full bg-indigo-500/30" /> Predicted
                   </div>
                </div>
             </div>
             
             {/* Dynamic Forecast Chart Area */}
             <div className="h-64 flex items-end justify-between px-4 relative">
                <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-white/5">
                   {[100, 75, 50, 25, 0].map(v => (
                     <div key={v} className="flex items-center gap-4 text-[8px] font-black text-slate-700">
                        <span className="w-6 text-right">{v}%</span>
                        <div className="flex-1 h-px bg-white/[0.02]" />
                     </div>
                   ))}
                </div>
                
                {[45, 55, 50, 65, 72, 85, 92, 95].map((val, i) => (
                  <div key={i} className="relative group w-full flex justify-center">
                     <div 
                        className={clsx(
                           "w-4 rounded-t-lg transition-all duration-700",
                           i < 5 ? "bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.3)]" : "bg-indigo-600/30"
                        )} 
                        style={{ height: `${val}%` }} 
                     />
                     <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded shadow-xl z-20">
                        {val}%
                     </div>
                  </div>
                ))}
             </div>
             <div className="flex justify-between px-8 mt-6 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                <span>Month 1</span>
                <span>Month 4</span>
                <span>Month 8 (Forecast)</span>
             </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Award className="w-48 h-48" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-8">Exam Readiness</h3>
              <div className="flex flex-col items-center">
                 <div className="relative w-40 h-40 flex items-center justify-center mb-8">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="80" cy="80" r="72" className="stroke-white/10" strokeWidth="10" fill="none" />
                       <circle 
                          cx="80" cy="80" r="72" 
                          className="stroke-amber-400" strokeWidth="10" fill="none"
                          strokeDasharray={452.39}
                          strokeDashoffset={452.39 * (1 - 0.92)}
                          strokeLinecap="round"
                       />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-4xl font-black tracking-tighter">92%</span>
                       <span className="text-[9px] font-black text-indigo-300 uppercase tracking-widest">Score Prediction</span>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                       <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Status</p>
                       <p className="text-sm font-black mt-1">Accelerated</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                       <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Risk</p>
                       <p className="text-sm font-black mt-1 text-emerald-400">Minimal</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Neural Link Suggestions</h3>
              <div className="space-y-4">
                 {[
                   { label: "Increase Revision", weight: "85%", icon: Activity },
                   { label: "Deep Dive Mechanics", weight: "72%", icon: Brain },
                   { label: "Accelerate Chemistry", weight: "94%", icon: Zap },
                 ].map((sug, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <span className="flex items-center gap-2"><sug.icon className="h-3 w-3" /> {sug.label}</span>
                         <span className="text-white">{sug.weight}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500 rounded-full" style={{ width: sug.weight }} />
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
