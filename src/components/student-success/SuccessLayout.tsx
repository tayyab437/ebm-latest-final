import React from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { SuccessDashboard } from "./SuccessDashboard";
import { RiskDashboard } from "./RiskDashboard";
import { StudentProfile } from "./StudentProfile";
import { CaseManager } from "./CaseManager";
import { AISuccessAssistant } from "./AISuccessAssistant";
import { InterventionsView } from "./InterventionsView";
import { ActionPlansView } from "./ActionPlansView";
import { ObservationsView } from "./ObservationsView";
import { MeetingsView } from "./MeetingsView";
import { ReferralsView } from "./ReferralsView";
import { ProgressView } from "./ProgressView";
import {
  LayoutDashboard,
  ShieldAlert,
  Target,
  Users,
  Activity,
  MessageSquare,
  Sparkles,
  BarChart2,
  AlertTriangle,
  FileText,
  ArrowLeft,
} from "lucide-react";
import clsx from "clsx";

export function SuccessLayout() {
  const { currentView, setCurrentView, fetchDashboardData } = useStudentSuccessStore();

  React.useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "risk-analysis", label: "Risk Analysis", icon: Activity },
    { id: "cases", label: "Case Manager", icon: ShieldAlert },
    { id: "interventions", label: "Interventions", icon: AlertTriangle },
    { id: "action-plans", label: "Action Plans", icon: Target },
    { id: "observations", label: "Observations", icon: FileText },
    { id: "meetings", label: "Parent Meetings", icon: Users },
    { id: "referrals", label: "Referrals", icon: MessageSquare },
    { id: "progress", label: "Progress Tracker", icon: BarChart2 },
    { id: "ai-assistant", label: "AI Success Engine", icon: Sparkles },
  ];

  const handleBackToPortal = () => {
    // Assuming teacher portal or admin portal is the entry point
    window.dispatchEvent(new CustomEvent("navigate", { detail: "dashboard" }));
  };

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden selection:bg-rose-500/30 selection:text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0A1120] flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5 space-y-4">
          <button
            onClick={handleBackToPortal}
            className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portal
          </button>
          <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" /> Success Hub
          </h2>
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
                    ? "bg-rose-500/10 text-rose-400"
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
            {currentView === "dashboard" && <SuccessDashboard />}
            {currentView === "risk-analysis" && <RiskDashboard />}
            {currentView === "cases" && <CaseManager />}
            {currentView === "ai-assistant" && <AISuccessAssistant />}
            {currentView === "student-profile" && <StudentProfile />}
            {currentView === "interventions" && <InterventionsView />}
            {currentView === "action-plans" && <ActionPlansView />}
            {currentView === "observations" && <ObservationsView />}
            {currentView === "meetings" && <MeetingsView />}
            {currentView === "referrals" && <ReferralsView />}
            {currentView === "progress" && <ProgressView />}
          </div>
        </div>
      </main>
    </div>
  );
}
