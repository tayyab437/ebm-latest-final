import React, { useEffect } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import {
  ShieldAlert,
  Users,
  Activity,
  Target,
  FileText,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";

export function SuccessDashboard() {
  const {
    fetchDashboardData,
    riskProfiles,
    activeCases,
    setCurrentView,
    setActiveStudent,
  } = useStudentSuccessStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const criticalStudents = riskProfiles.filter(
    (p) => p.riskLevel === "CRITICAL" || p.riskLevel === "HIGH_RISK",
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Student Success Hub
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Academic Intervention & Case Management
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView("cases")}
            className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2"
          >
            <ShieldAlert className="h-4 w-4" /> Open New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Students At Risk",
            val: criticalStudents.length,
            icon: AlertTriangle,
            color: "rose",
            action: () => setCurrentView("risk-analysis"),
          },
          {
            label: "Open Cases",
            val: activeCases.length,
            icon: ShieldAlert,
            color: "amber",
            action: () => setCurrentView("cases"),
          },
          {
            label: "Active Plans",
            val: 12,
            icon: Target,
            color: "blue",
            action: () => setCurrentView("action-plans"),
          },
          {
            label: "Parent Meetings",
            val: 3,
            icon: Users,
            color: "emerald",
            action: () => setCurrentView("meetings"),
          },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={stat.action}
            className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group cursor-pointer hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div
                className={clsx(
                  "p-4 rounded-2xl",
                  `bg-${stat.color}-500/10 text-${stat.color}-400`,
                )}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-white transition-colors" />
            </div>
            <p className="text-4xl font-black text-white tracking-tighter mb-1 relative z-10">
              {stat.val}
            </p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-500" /> Critical
                Risk Alerts
              </h3>
              <button
                onClick={() => setCurrentView("risk-analysis")}
                className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {criticalStudents.map((student) => (
                <div
                  key={student.studentId}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-rose-500/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-2">
                        {student.studentName}
                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-rose-500/20 text-rose-400 uppercase tracking-widest">
                          Score: {student.riskScore}
                        </span>
                      </h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 line-clamp-1">
                        {student.criticalAlerts[0] ||
                          "Declining performance detected"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveStudent(student.studentId);
                      setCurrentView("student-profile");
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors shrink-0"
                  >
                    Profile
                  </button>
                </div>
              ))}
              {criticalStudents.length === 0 && (
                <div className="text-center p-8 text-slate-500 text-xs font-bold uppercase tracking-widest">
                  No critical alerts at this time
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <ShieldAlert className="h-4 w-4 text-amber-500" /> Recent Cases
            </h3>
            <div className="space-y-4">
              {activeCases.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {c.studentName}
                    </span>
                    <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-1">
                    {c.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
