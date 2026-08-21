import React from "react";
import { useLiveStore } from "./live.store";
import { LiveSidebar } from "./LiveSidebar";
import { LiveView } from "./live.types";
import { initWorkspaceAuth } from "../../../lib/google-workspace";
import { 
  Menu, 
  Bell, 
  Search, 
  UserCircle,
  Video,
  Sparkles,
  ChevronRight
} from "lucide-react";

import { LiveDashboard } from "./LiveDashboard";
import { LiveCalendar } from "./LiveCalendar";
import { UpcomingClasses } from "./UpcomingClasses";
import { ClassDetails } from "./ClassDetails";
import { AttendancePanel } from "./AttendancePanel";
import { AISummaryPanel } from "./AISummaryPanel";
import { RecordingPanel } from "./RecordingPanel";

export function LiveLayout() {
  const { 
    currentView, 
    setCurrentView, 
    selectedClassId, 
    fetchClasses, 
    fetchStats,
    setWorkspaceAuth
  } = useLiveStore();

  React.useEffect(() => {
    fetchClasses();
    fetchStats();

    const unsubscribe = initWorkspaceAuth(
      (user, token) => {
        setWorkspaceAuth(user, token);
      },
      () => {
        setWorkspaceAuth(null, null);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#030712] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 shrink-0 hidden md:block">
        <LiveSidebar currentView={currentView} setCurrentView={setCurrentView} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 bg-[#030712]/80 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-400">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-50">EBM LIVE</span>
              <ChevronRight className="h-3 w-3 opacity-30" />
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
                {currentView.replace(/_/g, " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-1.5 w-64 group focus-within:border-rose-500/30 transition-all">
              <Search className="h-3.5 w-3.5 text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search classes, teachers..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#030712]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-rose-500/20">
              ZA
            </div>
          </div>
        </header>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-8 scrollbar-hide bg-[#030712]">
          <div className="max-w-[1600px] mx-auto">
            {currentView === LiveView.DASHBOARD && <LiveDashboard />}
            {currentView === LiveView.CALENDAR && <LiveCalendar />}
            {currentView === LiveView.UPCOMING && <UpcomingClasses />}
            {currentView === LiveView.ATTENDANCE && <AttendancePanel />}
            {currentView === LiveView.AI_SUMMARY && <AISummaryPanel />}
            {currentView === LiveView.RECORDINGS && <RecordingPanel />}
            {(currentView === LiveView.CLASS_DETAILS || selectedClassId) && <ClassDetails />}
            
            {/* Catch-all for other modules */}
            {[
              LiveView.HISTORY,
              LiveView.RESOURCES,
              LiveView.ANALYTICS,
              LiveView.SETTINGS
            ].includes(currentView) && !selectedClassId && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-slate-600 animate-in zoom-in duration-500">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-center mb-8 relative group">
                   <div className="absolute inset-0 bg-rose-500/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   <Video className="h-10 w-10 opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2">Interface Initializing</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Connecting to Google Meet Cluster...</p>
                <div className="mt-8 flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping" />
                   <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping delay-75" />
                   <div className="w-1 h-1 rounded-full bg-rose-500 animate-ping delay-150" />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
