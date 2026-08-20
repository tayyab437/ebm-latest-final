import React from "react";
import { 
  User, 
  HeartHandshake, 
  GraduationCap, 
  ShieldAlert, 
  BrainCircuit, 
  FileSpreadsheet, 
  BookOpen, 
  LineChart, 
  Award, 
  Users,
  HelpCircle 
} from "lucide-react";
import { NavigationItem } from "./dashboard.types";
import { NAVIGATION_ITEMS } from "./dashboard.constants";

interface ShowcaseNavigationProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

const getIcon = (name: string, className: string) => {
  switch (name) {
    case "User": return <User className={className} />;
    case "HeartHandshake": return <HeartHandshake className={className} />;
    case "GraduationCap": return <GraduationCap className={className} />;
    case "ShieldAlert": return <ShieldAlert className={className} />;
    case "BrainCircuit": return <BrainCircuit className={className} />;
    case "FileSpreadsheet": return <FileSpreadsheet className={className} />;
    case "BookOpen": return <BookOpen className={className} />;
    case "LineChart": return <LineChart className={className} />;
    case "Award": return <Award className={className} />;
    case "Users": return <Users className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const ShowcaseNavigation: React.FC<ShowcaseNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div id="showcase-navigation" className="space-y-2">
      <p className="text-2xs font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-3 mb-3">
        Select Workspace
      </p>

      {/* Grid on tablet / list on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[600px] overflow-y-auto pr-1 scrollbar-thin">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all duration-200 outline-none relative group ${
                isActive
                  ? "bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-600/10"
                  : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-800 dark:text-slate-100"
              }`}
            >
              {/* Highlight bar */}
              {isActive && (
                <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-md" />
              )}

              <div className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                isActive 
                  ? "bg-white/10 text-white" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-blue-500"
              }`}>
                {getIcon(item.iconName, "h-5 w-5")}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold leading-none tracking-tight">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span className={`inline-flex px-1.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide ${
                      isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className={`text-3xs line-clamp-2 leading-relaxed ${
                  isActive ? "text-blue-100" : "text-slate-400"
                }`}>
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
