import React from "react";
import { Link } from "react-router-dom";
import { useContentStore } from "./content.store";
import { ContentDashboard } from "./ContentDashboard";
import { CurriculumTree } from "./CurriculumTree";
import { LessonEditor } from "./LessonEditor";
import { ContentReview } from "./ContentReview";
import { AIContentGenerator } from "./AIContentGenerator";
import { PublishingWorkflow } from "./PublishingWorkflow";
import {
  LayoutDashboard,
  BookOpen,
  Edit3,
  CheckSquare,
  UploadCloud,
  History,
  Sparkles,
  BarChart2,
  FileText,
  FolderOpen,
  Target,
  ArrowLeft,
} from "lucide-react";
import clsx from "clsx";

export function ContentLayout() {
  const { currentView, setCurrentView } = useContentStore();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "curriculum", label: "Curriculum Tree", icon: BookOpen },
    { id: "editor", label: "Lesson Builder", icon: Edit3 },
    { id: "review", label: "Review & QA", icon: CheckSquare },
    { id: "publishing", label: "Publishing", icon: UploadCloud },
    { id: "version-history", label: "Version History", icon: History },
    { id: "ai-generator", label: "AI Content Studio", icon: Sparkles },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "templates", label: "Templates", icon: FileText },
    { id: "resources", label: "Resources", icon: FolderOpen },
    { id: "outcomes", label: "Learning Outcomes", icon: Target },
  ];

  const handleBackToPortal = () => {
    window.dispatchEvent(new CustomEvent("navigate", { detail: "dashboard" }));
  };

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A1120] flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 space-y-4">
          <button
            onClick={handleBackToPortal}
            className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portal
          </button>
          <Link 
            to="/" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Return to Home Page"
            className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-purple-500" /> Content Studio
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as any)}
                className={clsx(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                  isActive
                    ? "bg-purple-500/10 text-purple-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {currentView === "dashboard" && <ContentDashboard />}
            {currentView === "curriculum" && <CurriculumTree />}
            {currentView === "editor" && <LessonEditor />}
            {currentView === "review" && <ContentReview />}
            {currentView === "publishing" && <PublishingWorkflow />}
            {currentView === "ai-generator" && <AIContentGenerator />}

            {/* Placeholders for others */}
            {[
              "version-history",
              "analytics",
              "templates",
              "resources",
              "outcomes",
            ].includes(currentView) && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-2">
                  Module Under Construction
                </h3>
                <p className="text-sm text-slate-400 max-w-md">
                  This module is currently being developed and will be available
                  in the next platform update.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
