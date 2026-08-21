import React, { useState } from "react";
import { CurriculumView } from "./curriculum.types";
import { useCurriculumStore } from "./curriculum.store";
import { CurriculumSidebar } from "./CurriculumSidebar";
import { CurriculumDashboard } from "./CurriculumDashboard";
import { ProgramManager } from "./ProgramManager";
import { SubjectManager } from "./SubjectManager";
import { LessonManager } from "./LessonManager";
import { Menu } from "lucide-react";

export function CurriculumLayout() {
  const currentView = useCurriculumStore((state) => state.currentView);
  const setCurrentView = useCurriculumStore((state) => state.setCurrentView);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <CurriculumSidebar currentView={currentView} setCurrentView={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 relative">
        {/* Mobile Header for Sidebar Toggle */}
        <div className="md:hidden flex items-center p-4 bg-white border-b border-slate-200 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-2 font-bold text-slate-800">Curriculum CMS</span>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8">
          {currentView === CurriculumView.DASHBOARD && <CurriculumDashboard />}
          {currentView === CurriculumView.PROGRAMS && <ProgramManager />}
          {currentView === CurriculumView.SUBJECTS && <SubjectManager />}
          {currentView === CurriculumView.LESSONS && <LessonManager />}
          
          {/* Placeholder for other views */}
          {[
            CurriculumView.UNITS, 
            CurriculumView.CHAPTERS, 
            CurriculumView.TOPICS,
            CurriculumView.RESOURCES,
            CurriculumView.OUTCOMES,
            CurriculumView.EBM_SKILLS,
            CurriculumView.VERSION_HISTORY,
            CurriculumView.PUBLISHING,
            CurriculumView.SETTINGS
          ].includes(currentView) && (
            <div className="flex items-center justify-center h-full text-slate-400 font-medium">
              Module under construction
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
