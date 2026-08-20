import React from "react";
import { useStudentSuccessStore } from "./student-success.store";
import {
  Activity,
  Search,
  Filter,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import clsx from "clsx";
import { RiskLevel } from "./student-success.types";

export function RiskDashboard() {
  const { riskProfiles, setActiveStudent, setCurrentView } =
    useStudentSuccessStore();

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case RiskLevel.CRITICAL:
        return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      case RiskLevel.HIGH_RISK:
        return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case RiskLevel.MODERATE_RISK:
        return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case RiskLevel.LOW_RISK:
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case RiskLevel.EXCELLENT:
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-slate-500 bg-slate-500/10 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Activity className="h-6 w-6 text-rose-500" /> Risk Analysis Engine
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Automated Detection & Scoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="SEARCH STUDENTS..."
              className="bg-[#0A1120] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-bold text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-widest w-64"
            />
          </div>
          <button className="h-10 w-10 rounded-xl bg-[#0A1120] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-black/20 grid grid-cols-12 gap-4 items-center">
          <div className="col-span-3 text-[10px] font-black text-slate-500 uppercase tracking-widest pl-2">
            Student
          </div>
          <div className="col-span-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Risk Level
          </div>
          <div className="col-span-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Critical Alerts
          </div>
          <div className="col-span-2 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right pr-4">
            Action
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {riskProfiles.map((profile) => (
            <div
              key={profile.studentId}
              className="p-4 grid grid-cols-12 gap-4 items-center hover:bg-white/[0.02] transition-colors group"
            >
              <div className="col-span-3 pl-2">
                <h4 className="text-sm font-bold text-white">
                  {profile.studentName}
                </h4>
                <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                  {profile.grade}
                </p>
              </div>

              <div className="col-span-2">
                <span
                  className={clsx(
                    "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                    getRiskColor(profile.riskLevel),
                  )}
                >
                  {profile.riskLevel.replace("_", " ")}
                </span>
              </div>

              <div className="col-span-5">
                {profile.criticalAlerts.length > 0 ? (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white font-medium line-clamp-1">
                        {profile.criticalAlerts[0]}
                      </p>
                      {profile.criticalAlerts.length > 1 && (
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                          +{profile.criticalAlerts.length - 1} more alerts
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    No active alerts
                  </span>
                )}
              </div>

              <div className="col-span-2 flex justify-end pr-4">
                <button
                  onClick={() => {
                    setActiveStudent(profile.studentId);
                    setCurrentView("student-profile");
                  }}
                  className="h-8 w-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
