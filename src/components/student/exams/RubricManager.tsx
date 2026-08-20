import React from "react";
import { useExamStore } from "./exam.store";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Brain, 
  Target, 
  Layers, 
  Star,
  MoreVertical,
  CheckCircle2,
  Trash2,
  Edit3,
  Sparkles
} from "lucide-react";
import clsx from "clsx";

export function RubricManager() {
  const rubrics = [
    { id: "rub-1", title: "Creative Writing Standard", subject: "English", criteriaCount: 5, lastUpdated: "2024-06-25" },
    { id: "rub-2", title: "Scientific Method Proficiency", subject: "Science", criteriaCount: 8, lastUpdated: "2024-06-22" },
    { id: "rub-3", title: "Critical Thinking Framework", subject: "EBM Core", criteriaCount: 12, lastUpdated: "2024-06-20" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Rubric Repository</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Managing Standardized Evaluation Frameworks & AI Scoring Rules</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2">
             <Plus className="h-4 w-4" /> Create Rubric
          </button>
        </div>
      </div>

      <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.01]">
          <div className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 w-full md:w-96 focus-within:border-rose-500/30 transition-all">
            <Search className="h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search rubrics by title or subject..." 
              className="bg-transparent border-none outline-none text-xs font-bold text-white placeholder:text-slate-600 w-full"
            />
          </div>
          <div className="flex items-center gap-2">
             <button className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white border border-white/5 transition-all">
                <Filter className="h-4 w-4" />
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.01]">
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Rubric Title</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Criteria</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Updated</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rubrics.map((rubric) => (
                <tr key={rubric.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                          <FileText className="h-5 w-5" />
                       </div>
                       <p className="text-sm font-black text-white tracking-tight">{rubric.title}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{rubric.subject}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-white">{rubric.criteriaCount} Points of Interest</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-slate-500">{rubric.lastUpdated}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-widest">Active</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-slate-500 hover:text-white transition-colors"><Edit3 className="h-4 w-4" /></button>
                       <button className="p-2 text-slate-500 hover:text-rose-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                       <button className="p-2 text-slate-500 hover:text-white transition-colors"><MoreVertical className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-gradient-to-br from-rose-500/5 to-transparent rounded-[2.5rem] border border-white/5 p-10">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 uppercase flex items-center gap-3">
               <Brain className="h-6 w-6 text-rose-500" />
               AI Rubric Builder
            </h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">
               Generate complex evaluation frameworks automatically by defining learning outcomes. AI rubrics are specifically tuned for EBM Competencies.
            </p>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-3">
               Start AI Rubric Architect <Sparkles className="h-4 w-4" />
            </button>
         </div>

         <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 flex items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Target className="w-40 h-40 text-blue-500" />
            </div>
            <div className="flex-1 relative z-10">
               <h3 className="text-xl font-black text-white tracking-tight mb-4 uppercase">Global Alignment</h3>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  Your rubrics are currently 94% aligned with Cambridge O-Level standards for the 2024-2025 academic cycle.
               </p>
            </div>
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center relative z-10 shrink-0">
               <span className="text-xl font-black text-white">94%</span>
            </div>
         </div>
      </div>
    </div>
  );
}
