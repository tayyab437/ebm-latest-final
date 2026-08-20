import React from "react";
import { Layers, Building2, Calendar, MapPin, ChevronRight, Plus, Settings2, ShieldCheck } from "lucide-react";

export function AcademicStructure() {
  const years = ["2023-24", "2024-25", "2025-26"];
  const campuses = [
    { id: "c1", name: "Main Campus", location: "DHA, Lahore", grades: "Grades 5-O Level" },
    { id: "c2", name: "North Campus", location: "Gulberg, Lahore", grades: "Grades 5-8" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Academic Architecture</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Configure Institutions, Campuses & Academic Years</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2">
          <Plus className="h-4 w-4" /> Define Structure
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Campus Infrastructure
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
               {campuses.map(campus => (
                 <div key={campus.id} className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <Building2 className="h-5 w-5" />
                       </div>
                       <button className="text-slate-300 hover:text-slate-900">
                         <Settings2 className="h-4 w-4" />
                       </button>
                    </div>
                    <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{campus.name}</h4>
                    <div className="mt-3 space-y-2">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                         <MapPin className="h-3 w-3" /> {campus.location}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                         <Layers className="h-3 w-3" /> {campus.grades}
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-600" />
                Departments & Wings
              </h3>
            </div>
            <div className="p-6 space-y-3">
               {["Science Wing", "Mathematics Department", "Humanities & Arts", "Language Center"].map((dept, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all cursor-pointer group">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                       <Layers className="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
                     </div>
                     <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{dept}</span>
                   </div>
                   <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500" />
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
             <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
               <Calendar className="h-4 w-4 text-emerald-600" />
               Academic Cycles
             </h3>
             <div className="space-y-4">
                {years.map((year, i) => (
                  <div key={i} className={`p-4 rounded-2xl border flex items-center justify-between ${
                    year === "2023-24" ? "border-emerald-200 bg-emerald-50" : "border-slate-100 bg-white"
                  }`}>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Academic Year</p>
                      <p className="text-sm font-black text-slate-900">{year}</p>
                    </div>
                    {year === "2023-24" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest">Active</span>
                    )}
                  </div>
                ))}
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-500 transition-all">
                  + Add Next Cycle
                </button>
             </div>
           </div>

           <div className="bg-[#0F172A] rounded-3xl p-6 text-white">
             <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest">Global Hierarchy</h3>
             </div>
             <p className="text-xs text-slate-400 leading-relaxed font-medium">
               This configuration defines the structural constraints for all other modules. Changes here will propagate to Curriculums, Gradebooks, and Student Records globally.
             </p>
             <button className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
               Run Integrity Check
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
