import React from "react";
import { useExamStore } from "./exam.store";
import { 
  CheckCircle2, 
  Sparkles, 
  Brain, 
  Clock, 
  Target, 
  ArrowRight,
  TrendingUp,
  Award,
  AlertCircle,
  Zap
} from "lucide-react";
import clsx from "clsx";

export function AIMarkingPanel() {
  const mockMarkingTasks = [
    { id: "tm-1", student: "Alice Johnson", exam: "Physics Midterm", status: "PROCESSING", progress: 65 },
    { id: "tm-2", student: "Bob Smith", exam: "English Essay", status: "READY", score: 88 },
    { id: "tm-3", student: "Charlie Brown", exam: "Math Quiz", status: "READY", score: 92 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">AI Marking Engine</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Automated Evaluation & Diagnostic Feedback Generation</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2">
              <Zap className="h-4 w-4" /> Batch Mark Pending
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-rose-500" /> Active Marking Queue
               </h3>
               <div className="space-y-4">
                  {mockMarkingTasks.map((task) => (
                     <div key={task.id} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all flex items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                              {task.status === 'PROCESSING' ? <TrendingUp className="h-6 w-6 animate-pulse text-rose-500" /> : <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                           </div>
                           <div>
                              <h4 className="text-sm font-black text-white tracking-tight">{task.student}</h4>
                              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{task.exam}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-8">
                           {task.status === 'PROCESSING' ? (
                              <div className="w-40 h-2 bg-white/5 rounded-full overflow-hidden">
                                 <div className="h-full bg-rose-500 rounded-full" style={{ width: `${task.progress}%` }} />
                              </div>
                           ) : (
                              <div className="text-right">
                                 <span className="text-xl font-black text-emerald-400">{task.score}%</span>
                                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">AI Score</p>
                              </div>
                           )}
                           <button className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-xl transition-all border border-white/5">
                              <ArrowRight className="h-4 w-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 h-64 flex flex-col items-center justify-center text-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
               <Brain className="h-12 w-12 text-slate-700 mb-4" />
               <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Marking Moderation Console</h4>
               <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest max-w-sm">
                  Teachers can review and override AI marks here. EBM maintains a 98% accuracy rate with Gemini-driven evaluation.
               </p>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-rose-500/5 to-transparent rounded-[2.5rem] border border-white/5 p-8">
               <h3 className="text-lg font-black text-white tracking-tight mb-8 uppercase flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-rose-500" />
                  Marking Intelligence
               </h3>
               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10">
                     <p className="text-xs font-bold text-slate-300 leading-relaxed italic">
                        "EBM AI marking evaluates linguistic complexity, logical coherence, and conceptual depth—surpassing standard keyword matching."
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-xl font-black text-white">0.8s</span>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">Avg Marking Time</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <span className="text-xl font-black text-white">99.4%</span>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">AI-Human Alignment</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" /> System Alerts
               </h3>
               <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                     <p className="text-[10px] font-bold text-amber-200/60 leading-tight uppercase tracking-widest">
                        Handwriting recognition is currently at 85% confidence for Grade 5 submissions.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
