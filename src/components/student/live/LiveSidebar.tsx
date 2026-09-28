import React from "react";
import { Link } from "react-router-dom";
import { LiveView } from "./live.types";
import { useLiveStore } from "./live.store";
import { useBrandingStore } from "../../../lib/branding.store";
import { googleWorkspaceSignIn, logoutWorkspace } from "../../../lib/google-workspace";
import { 
  Video, 
  Calendar, 
  History, 
  Users, 
  FileText, 
  PlayCircle, 
  Sparkles, 
  LineChart, 
  Settings,
  LayoutDashboard,
  Clock,
  BookOpen,
  LogOut,
  ShieldCheck
} from "lucide-react";
import clsx from "clsx";

interface LiveSidebarProps {
  currentView: LiveView;
  setCurrentView: (view: LiveView) => void;
}

export function LiveSidebar({ currentView, setCurrentView }: LiveSidebarProps) {
  const { logoText } = useBrandingStore();
  const { workspaceUser, setWorkspaceAuth } = useLiveStore();

  const handleConnect = async () => {
    try {
      const result = await googleWorkspaceSignIn();
      if (result) {
        setWorkspaceAuth(result.user, result.accessToken);
      }
    } catch (err) {
      console.error("Failed to connect Google Workspace", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await logoutWorkspace();
      setWorkspaceAuth(null, null);
    } catch (err) {
      console.error("Failed to disconnect", err);
    }
  };

  const menuItems = [
    { id: LiveView.DASHBOARD, label: "Live Dashboard", icon: LayoutDashboard },
    { id: LiveView.CALENDAR, label: "Class Calendar", icon: Calendar },
    { id: LiveView.UPCOMING, label: "Upcoming Classes", icon: Clock },
    { id: LiveView.HISTORY, label: "Class History", icon: History },
    { id: LiveView.ATTENDANCE, label: "My Attendance", icon: Users },
    { id: LiveView.RESOURCES, label: "Class Resources", icon: BookOpen },
    { id: LiveView.RECORDINGS, label: "Recordings", icon: PlayCircle },
    { id: LiveView.AI_SUMMARY, label: "AI Summaries", icon: Sparkles },
    { id: LiveView.ANALYTICS, label: "Live Analytics", icon: LineChart },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-400">
      <div className="p-6 border-b border-white/5">
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to Home Page"
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <Video className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest group-hover:text-rose-400 transition-colors">{logoText} Live</h2>
            <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Meet Integration</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left",
                isActive 
                  ? "bg-rose-500/10 text-white font-bold" 
                  : "hover:bg-white/5 hover:text-slate-200"
              )}
            >
              <Icon className={clsx(
                "h-4.5 w-4.5 transition-colors",
                isActive ? "text-rose-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span className="text-xs uppercase tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-white/5 space-y-2">
        {!workspaceUser ? (
          <button 
            onClick={handleConnect}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Connect Google Meet</span>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-emerald-500 flex items-center justify-center">
                {workspaceUser.photoURL ? (
                  <img src={workspaceUser.photoURL} alt={workspaceUser.displayName || "Workspace user avatar"} className="w-full h-full object-cover" />
                ) : (
                  <Users className="h-3 w-3 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-white truncate">{workspaceUser.displayName}</p>
                <p className="text-[8px] text-emerald-400 font-medium truncate tracking-tight">Meet Connected</p>
              </div>
              <button onClick={handleDisconnect} className="text-slate-500 hover:text-rose-400 p-1">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        <button 
          onClick={() => setCurrentView(LiveView.SETTINGS)}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
            currentView === LiveView.SETTINGS ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-200"
          )}
        >
          <Settings className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Live Settings</span>
        </button>
      </div>
    </div>
  );
}
