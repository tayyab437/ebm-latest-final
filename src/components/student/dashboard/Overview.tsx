import React from "react";
import { AttendanceMarkingPrompt } from "./AttendanceMarkingPrompt";
import { ProgressCards } from "./ProgressCards";
import { SubjectGrid } from "./SubjectGrid";
import { AnnouncementsWidget } from "./AnnouncementsWidget";
import { AchievementsWidget } from "./AchievementsWidget";
import { ProgressChart } from "./ProgressChart";
import { DailyStreakWidget } from "./DailyStreakWidget";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { Users, ArrowRight } from "lucide-react";

export function Overview() {
  const { data, setView, isLoading } = useDashboardStore();
  const hasParentEmail = data?.onboardingData?.profile?.parentEmail || data?.parentEmail;

  if (isLoading) return null; // Or a loading skeleton

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500">
      <AttendanceMarkingPrompt />

      {!hasParentEmail && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 shadow-md text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-inner">
              <Users className="h-7 w-7 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-black tracking-tight">Connect your Parent Dashboard</h4>
              <p className="text-white/80 text-xs font-medium max-w-md">
                Add your parent's email to unlock progress monitoring, goal setting, and custom rewards.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => setView(DashboardView.PROFILE)}
            className="px-6 py-3 bg-white text-amber-600 font-black rounded-2xl shadow-lg hover:bg-amber-50 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm relative z-10 shrink-0"
          >
            Add Parent Email <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">Your Metrics</h3>
        <ProgressCards />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">Active Subjects</h3>
          <SubjectGrid limit={4} />
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Daily Learning Streak</h3>
            <DailyStreakWidget />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight">Daily Online Activity</h3>
            <ProgressChart />
          </div>
        </div>
      </div>

      <div className="space-y-4">
         <AchievementsWidget />
      </div>
    </div>
  );
}
