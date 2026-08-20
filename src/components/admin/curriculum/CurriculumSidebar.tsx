import React from "react";
import { CurriculumView } from "./curriculum.types";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Bookmark, 
  FileText, 
  List, 
  FileUp, 
  Target, 
  Zap, 
  History, 
  Send, 
  Settings,
  Database
} from "lucide-react";
import clsx from "clsx";

interface CurriculumSidebarProps {
  currentView: CurriculumView;
  setCurrentView: (view: CurriculumView) => void;
}

export function CurriculumSidebar({ currentView, setCurrentView }: CurriculumSidebarProps) {
  const structureItems = [
    { id: CurriculumView.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
    { id: CurriculumView.PROGRAMS, label: "Academic Programs", icon: GraduationCap },
    { id: CurriculumView.SUBJECTS, label: "Subjects", icon: BookOpen },
    { id: CurriculumView.UNITS, label: "Units", icon: Layers },
    { id: CurriculumView.CHAPTERS, label: "Chapters", icon: Bookmark },
    { id: CurriculumView.LESSONS, label: "Lessons", icon: FileText },
    { id: CurriculumView.TOPICS, label: "Topics", icon: List },
  ];

  const contentItems = [
    { id: CurriculumView.RESOURCES, label: "Resources", icon: FileUp },
    { id: CurriculumView.OUTCOMES, label: "Learning Outcomes", icon: Target },
    { id: CurriculumView.EBM_SKILLS, label: "EBM Skills Mapping", icon: Zap },
  ];

  const workflowItems = [
    { id: CurriculumView.VERSION_HISTORY, label: "Version History", icon: History },
    { id: CurriculumView.PUBLISHING, label: "Publishing Queue", icon: Send },
    { id: CurriculumView.SETTINGS, label: "Settings", icon: Settings },
  ];

  const NavItem = ({ item }: { item: any; key?: React.Key }) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    return (
      <button
        onClick={() => setCurrentView(item.id)}
        className={clsx(
          "w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-200 group text-left",
          isActive 
            ? "bg-emerald-50 text-emerald-700 font-semibold" 
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon className={clsx(
            "h-4 w-4 transition-colors",
            isActive ? "text-emerald-600" : "text-slate-400 group-hover:text-emerald-500"
          )} />
          <span className="text-sm">{item.label}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-5 shrink-0 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-200">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 leading-tight">Curriculum CMS</h2>
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Content Engine</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Curriculum Structure</h3>
          <div className="space-y-1">
            {structureItems.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Content & Mapping</h3>
          <div className="space-y-1">
            {contentItems.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>

        <div>
          <h3 className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workflow</h3>
          <div className="space-y-1">
            {workflowItems.map(item => <NavItem key={item.id} item={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
