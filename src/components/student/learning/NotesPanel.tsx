import React, { useState } from "react";
import { Edit3, Bookmark, Search, Clock, Plus } from "lucide-react";
import { useLearningStore } from "./learning.store";

export function NotesPanel() {
  const [activeTab, setActiveTab] = useState<"notes" | "bookmarks">("notes");
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-4 shadow-sm h-[400px] flex flex-col mt-6">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-2 mb-4">
        <button 
          onClick={() => setActiveTab("notes")}
          className={`text-xs font-bold pb-2 border-b-2 transition-colors ${activeTab === "notes" ? "border-indigo-500 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          My Notes
        </button>
        <button 
          onClick={() => setActiveTab("bookmarks")}
          className={`text-xs font-bold pb-2 border-b-2 transition-colors ${activeTab === "bookmarks" ? "border-indigo-500 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-800"}`}
        >
          Bookmarks
        </button>
      </div>

      {activeTab === "notes" ? (
        <>
          <div className="relative mb-4">
            <textarea 
              placeholder="Take a note at the current video time..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none resize-none h-20"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">04:20</span>
              <button className="bg-indigo-600 text-white p-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3">
            {/* Example Note */}
            <div className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded cursor-pointer hover:bg-indigo-100">@ 01:15</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 text-slate-400 hover:text-slate-600"><Edit3 className="h-3 w-3" /></button>
                </div>
              </div>
              <p className="text-xs font-medium text-slate-700 leading-relaxed">
                Important formula for finding the Lowest Common Multiple using prime factorization method.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-2">
          <Bookmark className="h-8 w-8 opacity-20" />
          <p className="text-xs font-medium">No bookmarks yet</p>
          <button className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
            Bookmark Current Time
          </button>
        </div>
      )}
    </div>
  );
}
