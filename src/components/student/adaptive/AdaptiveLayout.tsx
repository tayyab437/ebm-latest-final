import React, { useState } from "react";
import { AdaptiveView } from "./adaptive.types";
import { useAdaptiveStore } from "./adaptive.store";
import { AdaptiveSidebar } from "./AdaptiveSidebar";
import { AdaptiveDashboard } from "./AdaptiveDashboard";
import { LearningProfile } from "./LearningProfile";
import { MasteryDashboard } from "./MasteryDashboard";
import { GoalManager } from "./GoalManager";
import { HabitTracker } from "./HabitTracker";
import { PredictionDashboard } from "./PredictionDashboard";
import { EBMSkillsRadar } from "./EBMSkillsRadar";
import { AICoachPanel } from "./AICoachPanel";
import { 
  Menu, 
  Bell, 
  Search, 
  Settings, 
  HelpCircle, 
  Sparkles,
  Zap,
  Brain
} from "lucide-react";

export function AdaptiveLayout() {
  const currentView = useAdaptiveStore((state) => state.currentView);
  const setCurrentView = useAdaptiveStore((state) => state.setCurrentView);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-full bg-[#030712] overflow-hidden relative rounded-3xl border border-white/10 shadow-2xl">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-md"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-72 bg-[#050B18] transform transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        border-r border-white/5
      `}>
        <AdaptiveSidebar currentView={currentView} setCurrentView={(view) => {
          setCurrentView(view);
          setIsSidebarOpen(false);
        }} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Intelligence Header */}
        <header className="h-14 bg-[#050B18]/80 backdrop-blur-xl border-b border-white/5 shrink-0 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden lg:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-2xl border border-white/5 w-96">
              <Search className="h-4 w-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search topics, skills, or predictions..."
                className="bg-transparent border-none focus:outline-none text-xs font-bold text-slate-300 w-full placeholder:text-slate-500 uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
               <Zap className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
               <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Adaptive Core v4.0</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all relative group">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#050B18]" />
              </button>
              
              <button className="hidden sm:flex p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-white/5 rounded-xl transition-all">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
            
            <div className="h-8 w-px bg-white/5 mx-2 hidden sm:block" />
            
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10 group">
              <div className="text-right hidden xl:block">
                <p className="text-xs font-black text-white leading-none group-hover:text-indigo-400 transition-colors">Zaid Ali</p>
                <p className="text-[9px] font-black text-indigo-500/60 uppercase tracking-widest mt-1">Accelerated Path</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                ZA
              </div>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide bg-[#030712]">
          <div className="max-w-[1600px] mx-auto">
            {currentView === AdaptiveView.DASHBOARD && <AdaptiveDashboard />}
            {currentView === AdaptiveView.PROFILE && <LearningProfile />}
            {currentView === AdaptiveView.MASTERY && <MasteryDashboard />}
            {currentView === AdaptiveView.GOALS && <GoalManager />}
            {currentView === AdaptiveView.HABITS && <HabitTracker />}
            {currentView === AdaptiveView.PREDICTIONS && <PredictionDashboard />}
            {currentView === AdaptiveView.ANALYTICS && <EBMSkillsRadar />}
            
            {/* Catch-all for construction modules */}
            {[
              AdaptiveView.RECOMMENDATIONS,
              AdaptiveView.STUDY_PLAN,
              AdaptiveView.LEARNING_PATH,
              AdaptiveView.WEAK_TOPICS,
              AdaptiveView.STRENGTHS,
              AdaptiveView.SETTINGS
            ].includes(currentView) && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 relative group">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Brain className="h-12 w-12 text-indigo-500/40 animate-pulse relative z-10" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-2">Neural Link Active</h2>
                <p className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Processing Adaptive Learning Nodes...</p>
                
                <div className="mt-12 flex gap-3">
                  {[0, 1, 2].map(i => (
                    <div 
                      key={i} 
                      className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" 
                      style={{ animationDelay: `${i * 150}ms` }} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
