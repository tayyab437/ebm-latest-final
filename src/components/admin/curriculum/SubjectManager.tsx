import React, { useState } from "react";
import { useCurriculumStore } from "./curriculum.store";
import { Plus, Search, Filter, MoreHorizontal, BookOpen, Clock, Activity } from "lucide-react";

export function SubjectManager() {
  const subjects = useCurriculumStore(state => state.subjects);
  const programs = useCurriculumStore(state => state.programs);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Subject Management</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Organize and configure specific subjects within programs.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Add Subject
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search subjects by name or code..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
             />
           </div>
           <div className="flex items-center gap-2 w-full md:w-auto">
             <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none">
               <option>All Programs</option>
               {programs.map(p => <option key={p.id}>{p.name}</option>)}
             </select>
             <button className="p-2 border border-slate-200 bg-white text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
               <Filter className="h-4 w-4" />
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Difficulty</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subjects.map(subject => {
                const programName = programs.find(p => p.id === subject.programId)?.name || "Unknown";
                return (
                  <tr key={subject.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{subject.name}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{subject.estimatedHours} Hours • Age {subject.recommendedAge}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-600">
                      {programName}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {subject.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded inline-flex">
                        <Activity className="h-3 w-3" /> {subject.difficulty}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                        {subject.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
