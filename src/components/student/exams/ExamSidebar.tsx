import React from "react";
import { useExamStore } from "./exam.store";
import { ExamView } from "./exam.types";
import { useBrandingStore } from "../../../lib/branding.store";
import { 
  LayoutDashboard, 
  Calendar, 
  Database, 
  PlusCircle, 
  FileCheck, 
  Sparkles, 
  BarChart3, 
  Award, 
  ShieldAlert, 
  Settings,
  ChevronRight,
  LogOut,
  Clock
} from "lucide-react";
import clsx from "clsx";

interface ExamSidebarProps {
  currentView: ExamView;
  setCurrentView: (view: ExamView) => void;
}

export function ExamSidebar({ currentView, setCurrentView }: ExamSidebarProps) {
  const { logoText } = useBrandingStore();
  const { exams } = useExamStore();

  const menuItems = [
    { id: ExamView.DASHBOARD, label: "Assessment Hub", icon: LayoutDashboard },
    { id: ExamView.CALENDAR, label: "Exam Calendar", icon: Calendar },
    { id: ExamView.QUESTION_BANK, label: "Question Bank", icon: Database },
    { id: ExamView.CREATE, label: "Create Exam", icon: PlusCircle },
    { id: ExamView.AI_GENERATOR, label: "AI Generator", icon: Sparkles },
    { id: ExamView.RESULTS, label: "Result Center", icon: FileCheck },
    { id: ExamView.ANALYTICS, label: "Global Analytics", icon: BarChart3 },
    { id: ExamView.CERTIFICATES, label: "Certifications", icon: Award },
    { id: ExamView.MODERATION, label: "Moderation", icon: ShieldAlert },
    { id: ExamView.SETTINGS, label: "Exam Settings", icon: Settings },
  ];

  return (
    <div className="w-80 h-full bg-[#0A1120] border-r border-white/5 flex flex-col hidden lg:flex">
      <div className="p-8 pb-4">
        <div className="bg-gradient-to-br from-rose-500/10 to-transparent rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
             <ShieldAlert className="w-20 h-20 text-rose-500" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-1">{logoText} Assessment</p>
            <h2 className="text-lg font-black text-white tracking-tight">Assessment Portal</h2>
            <div className="mt-4 flex items-center gap-3">
               <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                  <Clock className="h-3 w-3 text-rose-400" />
                  <span className="text-[9px] font-black text-white">{exams.length} Active Exams</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={clsx(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group relative",
                isActive 
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={clsx(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-500 group-hover:text-rose-400"
                )} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="h-4 w-4 text-white/50" />}
            </button>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/5">
         <button className="w-full px-4 py-3 bg-white/5 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all flex items-center gap-4">
            <LogOut className="h-5 w-5" />
            Exit Examiner Mode
         </button>
      </div>
    </div>
  );
}
