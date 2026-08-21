import React, { useState } from "react";
import { AIView } from "./ai.types";
import { useAIStore } from "./ai.store";
import { AIDashboard } from "./AIDashboard";
import { AIChat } from "./AIChat";
import { WritingCoach } from "./WritingCoach";
import { ReadingCoach } from "./ReadingCoach";
import { SpeakingCoach } from "./SpeakingCoach";
import { PromptLibrary } from "./PromptLibrary";
import { InsightsDashboard } from "./InsightsDashboard";
import { AIHistory } from "./AIHistory";
import { AISettings } from "./AISettings";
import { AISidebar } from "./AISidebar";
import { Menu } from "lucide-react";

export function AILayout() {
  const currentView = useAIStore((state) => state.currentView);
  const setCurrentView = useAIStore((state) => state.setCurrentView);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 relative">
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
        <AISidebar currentView={currentView} setCurrentView={(view) => {
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
            className="p-2 -ml-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="ml-2 font-bold text-slate-800">AI Assistant</span>
        </div>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {currentView === AIView.DASHBOARD && <AIDashboard onViewChange={setCurrentView} />}
          {currentView === AIView.CHAT && <AIChat />}
          {currentView === AIView.WRITING && <WritingCoach />}
          {currentView === AIView.READING && <ReadingCoach />}
          {currentView === AIView.SPEAKING && <SpeakingCoach />}
          {currentView === AIView.PROMPTS && <PromptLibrary />}
          {currentView === AIView.INSIGHTS && <InsightsDashboard />}
          {currentView === AIView.HISTORY && <AIHistory />}
          {currentView === AIView.SETTINGS && <AISettings />}
        </main>
      </div>
    </div>
  );
}
