import React from "react";
import { useStudentSuccessStore } from "./student-success.store";
import {
  User,
  Activity,
  AlertTriangle,
  ChevronLeft,
  Calendar,
  FileText,
  Target,
} from "lucide-react";
import clsx from "clsx";
import { RiskLevel } from "./student-success.types";

export function StudentProfile() {
  const { activeStudentId, riskProfiles, setCurrentView } =
    useStudentSuccessStore();
  const profile =
    riskProfiles.find((p) => p.studentId === activeStudentId) ||
    riskProfiles[0];

  if (!profile) return <div>No profile selected</div>;

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL:
        return "text-rose-500";
      case RiskLevel.HIGH_RISK:
        return "text-orange-500";
      default:
        return "text-emerald-500";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 border-b border-white/5 pb-6">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="h-10 w-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center">
            <User className="h-8 w-8 text-slate-500" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              {profile.studentName}
            </h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-slate-500 font-black uppercase tracking-[0.2em]">
                {profile.grade}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span
                className={clsx(
                  "text-xs font-black uppercase tracking-widest",
                  getRiskColor(profile.riskLevel),
                )}
              >
                {profile.riskLevel.replace("_", " ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Academic Score", val: profile.academicScore, target: 80 },
          { label: "Attendance", val: profile.attendanceScore, target: 90 },
          { label: "Engagement", val: profile.engagementScore, target: 75 },
          { label: "Behavior", val: profile.behaviorScore, target: 85 },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6"
          >
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
              {stat.label}
            </h3>
            <div className="flex items-end gap-2 mb-2">
              <span
                className={clsx(
                  "text-3xl font-black tracking-tighter",
                  stat.val < stat.target ? "text-rose-500" : "text-emerald-500",
                )}
              >
                {stat.val}%
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                / 100
              </span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className={clsx(
                  "h-full rounded-full",
                  stat.val < stat.target ? "bg-rose-500" : "bg-emerald-500",
                )}
                style={{ width: `${stat.val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <AlertTriangle className="h-4 w-4 text-rose-500" /> Active Alerts
              & Cases
            </h3>
            <div className="space-y-4">
              {profile.criticalAlerts.map((alert, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3"
                >
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-rose-200">{alert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-colors text-left group">
                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center group-hover:text-white text-slate-400 transition-colors">
                  <Target className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-widest">
                  Create Action Plan
                </span>
              </button>
              <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-colors text-left group">
                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center group-hover:text-white text-slate-400 transition-colors">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-widest">
                  Schedule Parent Meeting
                </span>
              </button>
              <button className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center gap-3 transition-colors text-left group">
                <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center group-hover:text-white text-slate-400 transition-colors">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white uppercase tracking-widest">
                  Add Observation
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
