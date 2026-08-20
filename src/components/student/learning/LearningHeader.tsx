import React from "react";
import { Search, Bell, ArrowLeft } from "lucide-react";
import { useLearningStore } from "./learning.store";
import { LearningView } from "./learning.types";

export function LearningHeader() {
  const { currentView, setView } = useLearningStore();
  const isPlayer = currentView === LearningView.LESSON_PLAYER;

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/50 px-4 md:px-6 h-16 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        {isPlayer && (
          <button 
            onClick={() => setView(LearningView.SUBJECT_DETAIL)}
            className="flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-sm font-bold text-slate-900 hidden sm:block">
          {isPlayer ? "Lesson Player" : "Learning Space"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50">
          <Search className="h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search learning materials..." 
            className="bg-transparent border-none outline-none text-xs w-48 focus:w-64 transition-all"
          />
        </div>
        <button className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
