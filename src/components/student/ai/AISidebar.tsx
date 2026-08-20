import React from "react";
import { AIView } from "./ai.types";
import { ArrowLeft, Sparkles, LayoutDashboard, MessageSquare, Lightbulb, FileText, BrainCircuit, Calendar, PenTool, BookOpen, Mic, LineChart, History, Settings } from "lucide-react";
import clsx from "clsx";
import { useBrandingStore } from "../../../lib/branding.store";

import { useDashboardStore } from "../dashboard/dashboard.store";
import { DashboardView } from "../dashboard/dashboard.types";

interface AISidebarProps {
  currentView: AIView;
  setCurrentView: (view: AIView) => void;
}

export function AISidebar({ currentView, setCurrentView }: AISidebarProps) {
  const { logoText } = useBrandingStore();
  const setDashView = useDashboardStore(state => state.setView);
  
  const handleBack = () => {
    // If we are in the student dashboard embedded view, this changes the inner view
    setDashView(DashboardView.OVERVIEW);
    // Go back to the main tab corresponding to the role
    window.dispatchEvent(new CustomEvent('navigate-back'));
  };
  
  const tools = [
    { id: AIView.DASHBOARD, label: "Overview", icon: LayoutDashboard },
    { id: AIView.CHAT, label: "AI Chat", icon: MessageSquare, badge: "New" },
    { id: AIView.PROMPTS, label: "Prompt Library", icon: Lightbulb },
  ];



  const coaches = [
    { id: AIView.WRITING, label: "Writing Coach", icon: PenTool },
    { id: AIView.READING, label: "Reading Coach", icon: BookOpen },
    { id: AIView.SPEAKING, label: "Speaking Coach", icon: Mic },
  ];

  const tracking = [
    { id: AIView.INSIGHTS, label: "Learning Insights", icon: LineChart },
    { id: AIView.HISTORY, label: "History", icon: History },
    { id: AIView.SETTINGS, label: "Settings", icon: Settings },
  ];

  const NavItem = ({ item }: { item: any; key?: React.Key }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    return (
      <button
        onClick={() => setCurrentView(item.id)}
        className={clsx(
          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group text-left",
          isActive 
            ? "bg-indigo-50 text-indigo-700 font-semibold" 
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={clsx(
            "h-5 w-5 transition-colors",
            isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
          )} />
          <span className="text-sm">{item.label}</span>
        </div>
        {item.badge && (
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold uppercase tracking-wider">
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 shrink-0 border-b border-slate-100">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-4 px-2"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">AI Engine</h2>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{logoText} Assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Main</h3>
          <div className="space-y-1">
            {tools.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>



        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Coaches</h3>
          <div className="space-y-1">
            {coaches.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Analysis</h3>
          <div className="space-y-1">
            {tracking.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>
      </div>
      
      <div className="p-4 shrink-0 border-t border-slate-100">
         <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <BrainCircuit className="h-20 w-20 text-white" />
            </div>
            <div className="relative z-10">
              <h4 className="text-white font-bold text-sm mb-1">EBM Plus</h4>
              <p className="text-slate-300 text-xs mb-3">Unlock unlimited AI generation and advanced models.</p>
              <button className="w-full py-2 bg-white text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
                Upgrade Now
              </button>
            </div>
         </div>
      </div>
    </div>
  );
}
