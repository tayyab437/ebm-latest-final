import React from "react";
import { useCurriculumStore } from "./curriculum.store";
import { Plus, MoreVertical, Edit, Copy, Archive, Check } from "lucide-react";

export function ProgramManager() {
  const programs = useCurriculumStore(state => state.programs);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Academic Programs</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage overarching educational tracks and curricula.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> Create Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 bg-gradient-to-br from-emerald-500 to-teal-700 p-4 relative">
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/20">
                  {program.status}
                </span>
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{program.name}</h3>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500 mb-4 flex-1 line-clamp-2">{program.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase">Duration</span>{program.duration}</div>
                <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase">Audience</span>{program.targetAudience}</div>
                <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase">Version</span>v{program.version}</div>
                <div><span className="text-slate-400 block mb-0.5 text-[10px] uppercase">Language</span>{program.language}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </button>
                <button className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors">
                  Manage Subjects
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
