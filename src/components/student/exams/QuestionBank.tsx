import React from "react";
import { useExamStore } from "./exam.store";
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  BookOpen, 
  Tags, 
  Brain, 
  Clock,
  Sparkles,
  Database
} from "lucide-react";
import { QuestionType } from "./exam.types";
import clsx from "clsx";

export function QuestionBank() {
  const { questionBank, fetchQuestionBank } = useExamStore();

  React.useEffect(() => {
    fetchQuestionBank();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">EBM Question Bank</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Enterprise-grade Assessment Asset Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2">
             <Plus className="h-4 w-4" /> Add Question
          </button>
          <button className="px-6 py-3 bg-white/5 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
             <Sparkles className="h-4 w-4" /> AI Generate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: "MCQs", count: 1240, color: "blue" },
          { label: "Short Answer", count: 850, color: "emerald" },
          { label: "Case Studies", count: 120, color: "rose" },
          { label: "Speaking", count: 45, color: "amber" },
          { label: "Reading", count: 98, color: "purple" },
          { label: "Listening", count: 62, color: "cyan" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A1120] rounded-2xl border border-white/5 p-4 flex flex-col justify-center items-center text-center hover:border-white/20 transition-all cursor-pointer">
            <span className="text-xl font-black text-white mb-1">{stat.count}</span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 w-full md:w-96 focus-within:border-rose-500/30 transition-all">
            <Search className="h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by topic, learning outcome, or tag..." 
              className="bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-slate-600 w-full"
            />
          </div>
          <div className="flex items-center gap-2">
             <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white border border-white/5 transition-all">
                <Filter className="h-4 w-4" />
             </button>
             <div className="h-10 w-[1px] bg-white/5 mx-2" />
             <div className="bg-white/5 p-1 rounded-xl flex items-center gap-1">
                <button className="p-2 bg-rose-500 text-white rounded-lg"><Grid className="h-4 w-4" /></button>
                <button className="p-2 text-slate-500 hover:text-white transition-all"><List className="h-4 w-4" /></button>
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Question Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject/Topic</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Difficulty</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Usage</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questionBank.map((q) => (
                <tr key={q.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-white leading-relaxed line-clamp-2">{q.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-[8px] font-black text-slate-600 uppercase tracking-widest">
                        <Tags className="h-3 w-3" /> {q.topic || 'General'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 rounded-md bg-white/5 text-slate-400 text-[8px] font-black uppercase tracking-widest border border-white/5">
                      {q.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{q.subject}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className={clsx(
                      "text-[8px] font-black uppercase tracking-widest",
                      q.difficulty === 'HARD' ? "text-rose-400" : q.difficulty === 'MEDIUM' ? "text-amber-400" : "text-emerald-400"
                    )}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-slate-500">12 Exams</span>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
