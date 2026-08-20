import React from "react";
import { 
  Award, 
  BookOpen, 
  Clock, 
  Flame, 
  Target, 
  Mail, 
  PenTool, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  Users, 
  DollarSign,
  HelpCircle
} from "lucide-react";

interface WidgetCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  type: "metric" | "list" | "chart" | "alert" | "custom";
  iconName?: string;
  badge?: string;
}

const getIconComponent = (name?: string) => {
  switch (name) {
    case "Award": return <Award className="h-5 w-5 text-amber-500" />;
    case "BookOpen": return <BookOpen className="h-5 w-5 text-blue-500" />;
    case "Clock": return <Clock className="h-5 w-5 text-rose-500" />;
    case "Flame": return <Flame className="h-5 w-5 text-orange-500" />;
    case "Target": return <Target className="h-5 w-5 text-blue-500" />;
    case "Mail": return <Mail className="h-5 w-5 text-indigo-500" />;
    case "PenTool": return <PenTool className="h-5 w-5 text-violet-500" />;
    case "TrendingUp": return <TrendingUp className="h-5 w-5 text-sky-500" />;
    case "Sparkles": return <Sparkles className="h-5 w-5 text-purple-500" />;
    case "Activity": return <Activity className="h-5 w-5 text-sky-500" />;
    case "Users": return <Users className="h-5 w-5 text-pink-500" />;
    case "DollarSign": return <DollarSign className="h-5 w-5 text-blue-500" />;
    default: return <HelpCircle className="h-5 w-5 text-gray-500" />;
  }
};

export const WidgetCard: React.FC<WidgetCardProps> = ({
  title,
  value,
  subtitle,
  type,
  iconName,
  badge
}) => {
  return (
    <div 
      id={`widget-${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
            {getIconComponent(iconName)}
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </h4>
            {badge && (
              <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-2xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        {value && (
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans tracking-tight">
            {value}
          </p>
        )}
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1" dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
      </div>

      {type === "chart" && (
        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-1000" 
            style={{ width: typeof value === "string" && value.includes("%") ? value : "75%" }}
          />
        </div>
      )}
    </div>
  );
};
