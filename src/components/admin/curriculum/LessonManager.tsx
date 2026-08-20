import React from "react";
import { Plus, FolderTree, FileText, Video, PenTool } from "lucide-react";

export function LessonManager() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Lesson Builder</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Create and structure lesson content, resources, and metadata.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">
          <Plus className="h-4 w-4" /> New Lesson
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 overflow-hidden flex flex-col h-[600px]">
          <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
            <FolderTree className="h-4 w-4 text-emerald-500" /> Structure
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-2">
             <div className="text-sm font-bold text-slate-700">O Level Physics</div>
             <div className="pl-4 space-y-2 border-l border-slate-200 ml-2 mt-2">
               <div>
                 <div className="text-xs font-bold text-slate-600 mb-1">Unit 1: Kinematics</div>
                 <div className="pl-4 space-y-1 border-l border-slate-100 ml-2">
                    <button className="w-full text-left text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1.5 rounded border border-emerald-100 flex items-center gap-2">
                      <FileText className="h-3 w-3 shrink-0" /> Lesson 1.1: Equations of Motion
                    </button>
                    <button className="w-full text-left text-xs font-medium text-slate-500 hover:bg-slate-50 px-2 py-1.5 rounded flex items-center gap-2">
                      <Video className="h-3 w-3 shrink-0" /> Lesson 1.2: Free Fall
                    </button>
                    <button className="w-full text-left text-xs font-medium text-slate-500 hover:bg-slate-50 px-2 py-1.5 rounded flex items-center gap-2">
                      <PenTool className="h-3 w-3 shrink-0" /> Lesson 1.3: Graphical Analysis
                    </button>
                 </div>
               </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
           <div className="border-b border-slate-100 p-6">
             <div className="flex items-start justify-between mb-4">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                   <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">Physics</span>
                   <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded">Unit 1</span>
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900">Equations of Motion</h2>
               </div>
               <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider border border-amber-200 rounded">
                 Draft Mode
               </span>
             </div>
             
             <div className="flex gap-4 border-b border-slate-200">
               <button className="pb-3 text-sm font-bold text-emerald-600 border-b-2 border-emerald-600">Content & Settings</button>
               <button className="pb-3 text-sm font-bold text-slate-500 hover:text-slate-800">Resources (3)</button>
               <button className="pb-3 text-sm font-bold text-slate-500 hover:text-slate-800">Metadata & AI</button>
             </div>
           </div>

           <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lesson Objectives</label>
                <textarea 
                  className="w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  defaultValue="1. State the equations of uniformly accelerated motion. 2. Solve problems using these equations."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Content Editor</label>
                <div className="border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                  {/* Toolbar */}
                  <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-2">
                     <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 font-bold px-3 text-sm">B</button>
                     <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 italic px-3 text-sm">I</button>
                     <div className="w-px h-5 bg-slate-300 mx-1 my-auto"></div>
                     <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 px-2 text-sm"><FileText className="h-4 w-4" /></button>
                     <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600 px-2 text-sm"><Video className="h-4 w-4" /></button>
                  </div>
                  {/* Editor Area */}
                  <div className="h-64 p-4 text-sm text-slate-700 font-serif leading-relaxed">
                    <h1 className="text-xl font-bold mb-4">Introduction to SUVAT</h1>
                    <p className="mb-4">The kinematic equations, often referred to as SUVAT equations...</p>
                  </div>
                </div>
              </div>
           </div>
           
           <div className="border-t border-slate-100 p-4 bg-slate-50 flex justify-end gap-3 shrink-0">
             <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
               Save Draft
             </button>
             <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors">
               Preview Lesson
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
