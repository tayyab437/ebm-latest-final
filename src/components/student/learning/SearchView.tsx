import React from "react";
import { Search, BookOpen, PlayCircle, FileText, ArrowRight } from "lucide-react";

export function SearchView() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">Search Learning Content</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search subjects, lessons, or notes..." 
            className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none shadow-sm"
            autoFocus
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">Ctrl K</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {["Quadratic equations", "Kinematics", "Past papers", "Prime numbers"].map((term, i) => (
              <button key={i} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Suggested Results</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm cursor-pointer group transition-all">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <PlayCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Quadratic Equations (Part 1)</h4>
                <p className="text-[11px] font-medium text-slate-500 truncate">Mathematics • Algebra • Video Lesson</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
            </div>

            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm cursor-pointer group transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">Kinematics Notes</h4>
                <p className="text-[11px] font-medium text-slate-500 truncate">Physics • Notes • PDF Download</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
