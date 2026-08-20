import React from "react";
import { useLearningStore } from "./learning.store";
import { LearningView } from "./learning.types";
import { 
  BookOpen, 
  LayoutDashboard, 
  FileText, 
  Bookmark, 
  History, 
  Download, 
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import clsx from "clsx";

export function LearningSidebar() {
  const { currentView, setView } = useLearningStore();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const NAV_ITEMS = [
    { id: LearningView.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { id: LearningView.SUBJECTS, label: "My Subjects", icon: BookOpen },
    { id: LearningView.NOTES, label: "My Notes", icon: FileText },
    { id: LearningView.BOOKMARKS, label: "Bookmarks", icon: Bookmark },
    { id: LearningView.HISTORY, label: "History", icon: History },
    { id: LearningView.DOWNLOADS, label: "Downloads", icon: Download },
    { id: LearningView.SEARCH, label: "Search", icon: Search },
  ];

  const handleNavClick = (viewId: LearningView) => {
    if (viewId === LearningView.DASHBOARD) {
      window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }));
    } else {
      setView(viewId);
    }
  };

  return (
    <aside 
      className={clsx(
        "bg-slate-950 text-slate-300 flex flex-col transition-all duration-300 ease-in-out relative border-r border-slate-800 shadow-xl z-20 h-full",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-slate-800 text-slate-300 p-1 rounded-full border border-slate-700 hover:text-white hover:bg-slate-700 z-30 transition-transform active:scale-90"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={clsx("p-6 flex items-center gap-3 shrink-0 cursor-pointer hover:opacity-80 transition-opacity")} onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'dashboard' }))}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
          <BookOpen className="h-4 w-4 text-white" />
        </div>
        {!isCollapsed && (
          <span className="font-bold text-lg tracking-tight text-white line-clamp-1">Learning</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = currentView === item.id || 
            (item.id === LearningView.SUBJECTS && (currentView === LearningView.SUBJECT_DETAIL || currentView === LearningView.LESSON_PLAYER));
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative outline-none",
                isActive 
                  ? "bg-indigo-500/10 text-indigo-400 font-semibold" 
                  : "hover:bg-slate-800/50 hover:text-slate-100 text-slate-400 font-medium"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={clsx("h-5 w-5 shrink-0 transition-colors", isActive ? "text-indigo-400" : "group-hover:text-indigo-300")} />
              {!isCollapsed && (
                <span className="text-xs truncate text-left flex-1">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
