import React from "react";
import { Bookmark, PlayCircle, FileText, Search } from "lucide-react";

export function BookmarksView() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Bookmarks</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Quick access to your saved materials</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bookmarks..." 
            className="text-xs border-none outline-none bg-transparent w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder Bookmark Item */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
              <PlayCircle className="h-5 w-5" />
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors">
              <Bookmark className="h-4 w-4 fill-current text-rose-500" />
            </button>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">Video Lesson</div>
            <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">Types of Numbers</h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Mathematics • Unit 1: Number</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <button className="text-slate-300 hover:text-rose-500 transition-colors">
              <Bookmark className="h-4 w-4 fill-current text-rose-500" />
            </button>
          </div>
          <div className="flex-1">
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">Note</div>
            <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-amber-600 transition-colors">Prime Factorization Steps</h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Mathematics • @ 02:45 in Prime Factors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
