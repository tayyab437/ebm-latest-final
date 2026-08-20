import React from "react";
import { useGrowthStore } from "./growth.store";
import { GrowthSidebar } from "./GrowthSidebar";
import { GrowthView } from "./growth.types";
import { 
  Menu, 
  Bell, 
  Search, 
  Settings,
  ChevronRight,
  Sparkles,
  Trophy,
  Zap,
  Flame
} from "lucide-react";

import { GrowthDashboard } from "./GrowthDashboard";
import { BadgeGallery } from "./BadgeGallery";
// import { AchievementTimeline } from "./AchievementTimeline";
// import { MissionCenter } from "./MissionCenter";
// import { ChallengeCenter } from "./ChallengeCenter";
// import { HabitTracker } from "./HabitTracker";
// import { CompetencyRadar } from "./CompetencyRadar";
// import { PortfolioViewer } from "./PortfolioViewer";

export function GrowthLayout() {
  const { currentView, setCurrentView, profile, fetchGrowthData } = useGrowthStore();

  React.useEffect(() => {
    fetchGrowthData();
  }, []);

  return (
    <div className="flex h-full bg-[#030712] overflow-hidden">
      <GrowthSidebar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-10 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white uppercase tracking-tight">EBM Growth System</h1>
              <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em]">Holistic Development Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center bg-white/5 border border-white/5 rounded-2xl px-5 py-2.5 w-80 group focus-within:border-rose-500/30 transition-all">
              <Search className="h-4 w-4 text-slate-500 mr-3" />
              <input 
                type="text" 
                placeholder="Search milestones, badges..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
                 <Flame className="h-4 w-4 text-orange-500" />
                 <span className="text-xs font-black text-white">5 Day Streak</span>
              </div>
              <button className="p-3 rounded-2xl bg-white/5 text-slate-400 hover:text-white border border-white/5 transition-all relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]" />
              </button>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 p-0.5 shadow-xl shadow-rose-500/20">
                <div className="w-full h-full rounded-2xl bg-[#030712] flex items-center justify-center overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar scroll-smooth">
          <div className="max-w-[1600px] mx-auto">
            {currentView === GrowthView.DASHBOARD && <GrowthDashboard />}
            {currentView === GrowthView.BADGES && <BadgeGallery />}
            
            {/* Catch-all for modules being implemented */}
            {[
              GrowthView.PROFILE,
              GrowthView.LEVELS,
              GrowthView.XP,
              GrowthView.BADGES,
              GrowthView.ACHIEVEMENTS,
              GrowthView.MISSIONS,
              GrowthView.CHALLENGES,
              GrowthView.HABITS,
              GrowthView.STREAKS,
              GrowthView.LEADERBOARD,
              GrowthView.COMPETENCIES,
              GrowthView.PORTFOLIO,
              GrowthView.REWARDS,
              GrowthView.HISTORY,
              GrowthView.SETTINGS
            ].includes(currentView) && currentView !== GrowthView.DASHBOARD && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 relative group">
                   <div className="absolute inset-0 bg-rose-500/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Sparkles className="h-10 w-10 text-slate-800 group-hover:text-rose-500 transition-colors" />
                </div>
                <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest mb-3">{currentView.replace(/_/g, ' ')} Module</h3>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest max-w-sm text-center leading-relaxed">
                  The EBM Growth Engine is processing your data for this segment. Please check back shortly for deeper insights.
                </p>
                <button 
                  onClick={() => setCurrentView(GrowthView.DASHBOARD)}
                  className="mt-10 px-8 py-3 bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all rounded-xl"
                >
                   Return to Growth Hub
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
