import React from "react";
import { Link } from "react-router-dom";
import { AdaptiveView } from "./adaptive.types";
import { 
  Brain, 
  Target, 
  Lightbulb, 
  Calendar, 
  Route, 
  TrendingDown, 
  TrendingUp, 
  Flag, 
  Repeat, 
  LineChart, 
  BarChart, 
  Settings, 
  UserCircle,
  Zap,
  Sparkles
} from "lucide-react";
import clsx from "clsx";

interface AdaptiveSidebarProps {
  currentView: AdaptiveView;
  setCurrentView: (view: AdaptiveView) => void;
}

export function AdaptiveSidebar({ currentView, setCurrentView }: AdaptiveSidebarProps) {
  const menuItems = [
    { id: AdaptiveView.DASHBOARD, label: "Intelligence Hub", icon: Brain },
    { id: AdaptiveView.MASTERY, label: "Mastery Engine", icon: Target },
    { id: AdaptiveView.RECOMMENDATIONS, label: "AI Recommendations", icon: Lightbulb },
    { id: AdaptiveView.STUDY_PLAN, label: "Study Plan", icon: Calendar },
    { id: AdaptiveView.LEARNING_PATH, label: "Learning Path", icon: Route },
    { id: AdaptiveView.WEAK_TOPICS, label: "Weak Topics", icon: TrendingDown },
    { id: AdaptiveView.STRENGTHS, label: "Strengths", icon: TrendingUp },
    { id: AdaptiveView.GOALS, label: "Academic Goals", icon: Flag },
    { id: AdaptiveView.HABITS, label: "Habit Tracker", icon: Repeat },
    { id: AdaptiveView.PREDICTIONS, label: "AI Predictions", icon: LineChart },
    { id: AdaptiveView.ANALYTICS, label: "Advanced Analytics", icon: BarChart },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050B18] text-slate-400">
      <div className="p-6 border-b border-white/5">
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to Home Page"
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Adaptive AI</h2>
            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Learning Intelligence</p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-left relative",
                isActive 
                  ? "bg-indigo-600/10 text-white font-bold" 
                  : "hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-full" />
              )}
              <Icon className={clsx(
                "h-4.5 w-4.5 transition-colors",
                isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span className="text-xs uppercase tracking-wider">{item.label}</span>
              {isActive && <Sparkles className="ml-auto h-3 w-3 text-indigo-400 animate-pulse" />}
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-white/5 bg-[#0A1120]">
        <button 
          onClick={() => setCurrentView(AdaptiveView.SETTINGS)}
          className={clsx(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-2",
            currentView === AdaptiveView.SETTINGS ? "bg-white/10 text-white" : "text-slate-500 hover:text-slate-200"
          )}
        >
          <Settings className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Engine Settings</span>
        </button>
        <div className="p-3 rounded-2xl bg-indigo-600/5 border border-indigo-500/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-white truncate">Zaid Ali</p>
              <p className="text-[9px] text-indigo-400 font-bold uppercase tracking-widest">Accelerated Track</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
