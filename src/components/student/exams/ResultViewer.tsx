import React from "react";
import { useExamStore } from "./exam.store";
import { 
  FileCheck, 
  Search, 
  Filter, 
  ChevronRight, 
  Download, 
  Star, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Brain
} from "lucide-react";
import clsx from "clsx";

export function ResultViewer() {
  const { exams } = useExamStore();

  const results = [
    { id: "r1", examTitle: "Algebra Basics", date: "2024-06-20", score: 92, status: "PASSED", feedback: "Excellent grasp of quadratic equations." },
    { id: "r2", examTitle: "Physics: Mechanics", date: "2024-06-15", score: 78, status: "PASSED", feedback: "Good, but needs work on friction models." },
    { id: "r3", examTitle: "Global History", date: "2024-06-10", score: 62, status: "RETAKE_RECOMMENDED", feedback: "Struggled with timeline chronology." },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Performance Results</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Detailed Academic Feedback & Progression Tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white border border-white/5 transition-all">
             <Download className="h-4 w-4" />
          </button>
          <div className="flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 group focus-within:border-rose-500/30 transition-all">
             <Search className="h-4 w-4 text-slate-700 mr-3" />
             <input type="text" placeholder="Search results..." className="bg-transparent border-none outline-none text-[10px] font-bold text-white w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {results.map((res) => (
              <div key={res.id} className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 hover:border-rose-500/30 transition-all group">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className={clsx(
                         "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                         res.status === 'PASSED' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                       )}>
                          <FileCheck className="h-8 w-8" />
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{res.date}</span>
                             <div className="w-1 h-1 rounded-full bg-slate-800" />
                             <span className={clsx(
                               "text-[9px] font-black uppercase tracking-widest",
                               res.status === 'PASSED' ? "text-emerald-400" : "text-amber-400"
                             )}>{res.status.replace(/_/g, ' ')}</span>
                          </div>
                          <h4 className="text-xl font-black text-white tracking-tight">{res.examTitle}</h4>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-4xl font-black text-white tracking-tighter mb-1">{res.score}%</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Final Weighted Score</p>
                    </div>
                 </div>

                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                       <h5 className="text-[9px] font-black text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Brain className="h-3 w-3" /> Teacher Insights
                       </h5>
                       <p className="text-xs font-medium text-slate-400 leading-relaxed italic">
                          "{res.feedback}"
                       </p>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                       <button className="px-6 py-3 bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-all border border-white/5">
                          View Answer Script
                       </button>
                       <button className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all border border-white/5">
                          <TrendingUp className="h-4 w-4" />
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-rose-500/5 to-transparent rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-lg font-black text-white tracking-tight mb-6 uppercase">EBM Progression</h3>
              <div className="space-y-6">
                 {[
                   { label: "Critical Thinking", val: 88 },
                   { label: "Conceptual Mastery", val: 94 },
                   { label: "Analytical Skills", val: 72 },
                 ].map((s, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                          <span className="text-xs font-black text-white">{s.val}%</span>
                       </div>
                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${s.val}%` }} />
                       </div>
                    </div>
                 ))}
              </div>
              <p className="mt-8 text-[10px] font-medium text-slate-500 leading-relaxed uppercase tracking-widest">
                 Your progression is measured across EBM competencies, not just subjects. Focus on 'Analytical Skills' to unlock Level 5.
              </p>
           </div>

           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Star className="h-5 w-5" />
                 </div>
                 <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Merit Points</h4>
              </div>
              <p className="text-3xl font-black text-white tracking-tighter mb-1">+450</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Earned from Assessments</p>
              <button className="w-full mt-8 py-3 rounded-xl bg-white/5 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all">
                 Redeem in Growth Hub
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
