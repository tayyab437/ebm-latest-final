import React from "react";
import { FileText, Search, Edit3 } from "lucide-react";

export function NotesView() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Notes</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Review all your captured learning notes</p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="text-xs border-none outline-none bg-transparent w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <div className="flex items-center justify-between mb-3 pl-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded">Mathematics</span>
            <span className="text-[10px] font-medium text-slate-400">Oct 24, 2026</span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-2 pl-2 group-hover:text-indigo-600 transition-colors">Important formula for finding LCM</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4 pl-2 flex-1 line-clamp-4">
            Using the prime factorization method, you list out the prime factors of each number, then multiply the highest power of each prime factor present in the numbers.
          </p>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between pl-2">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
               @ 01:15 <span className="text-slate-400">| Types of Numbers</span>
            </span>
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <div className="flex items-center justify-between mb-3 pl-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-2 py-1 rounded">Physics</span>
            <span className="text-[10px] font-medium text-slate-400">Oct 22, 2026</span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 mb-2 pl-2 group-hover:text-amber-600 transition-colors">Newton's First Law</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4 pl-2 flex-1 line-clamp-4">
            An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. Also called the law of inertia.
          </p>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between pl-2">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-1">
               @ 05:30 <span className="text-slate-400">| Forces</span>
            </span>
            <button className="text-slate-400 hover:text-amber-600 transition-colors">
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
