import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { 
  LineChart, TrendingUp, TrendingDown, Clock, HelpCircle, 
  Sparkles, Award, Eye, Activity, User, BookOpen, Calendar
} from "lucide-react";
import clsx from "clsx";

export function ProgressView() {
  const { progressHistories, riskProfiles, activeStudentId } = useStudentSuccessStore();
  const [selectedStudent, setSelectedStudent] = useState(activeStudentId || "s1");

  const studentProfile = riskProfiles.find(p => p.studentId === selectedStudent) || riskProfiles[0];
  const history = progressHistories.filter(h => h.studentId === selectedStudent);

  // Calculate trends
  const calculateTrend = (metric: "academicScore" | "attendanceScore" | "engagementScore") => {
    if (history.length < 2) return { direction: "STABLE", diff: 0 };
    const first = history[0][metric];
    const last = history[history.length - 1][metric];
    const diff = last - first;
    if (diff > 0) return { direction: "UP", diff };
    if (diff < 0) return { direction: "DOWN", diff: Math.abs(diff) };
    return { direction: "STABLE", diff: 0 };
  };

  const academicTrend = calculateTrend("academicScore");
  const attendanceTrend = calculateTrend("attendanceScore");
  const engagementTrend = calculateTrend("engagementScore");

  const renderTrendBadge = (trend: { direction: string, diff: number }) => {
    if (trend.direction === "UP") {
      return (
        <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-lg">
          <TrendingUp className="h-3 w-3" /> +{trend.diff}% Improve
        </span>
      );
    }
    if (trend.direction === "DOWN") {
      return (
        <span className="flex items-center gap-1.5 text-rose-400 text-[10px] font-black uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-lg">
          <TrendingDown className="h-3 w-3" /> -{trend.diff}% Regression
        </span>
      );
    }
    return (
      <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest bg-slate-500/10 border border-slate-500/20 px-2 py-0.5 rounded-lg">
        Stable
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Activity className="h-6 w-6 text-rose-500" /> Progression Analytics
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Historic Learning Curves, Attendance Vectors & Engagement Slopes
          </p>
        </div>

        <div>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="bg-[#0A1120] border border-white/5 rounded-xl px-5 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
          >
            {riskProfiles.map(p => (
              <option key={p.studentId} value={p.studentId}>
                Focus: {p.studentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Academic Card */}
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Vector</h3>
            {renderTrendBadge(academicTrend)}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">{studentProfile?.academicScore}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">current score</span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${studentProfile?.academicScore}%` }} />
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attendance Vector</h3>
            {renderTrendBadge(attendanceTrend)}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">{studentProfile?.attendanceScore}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">current rate</span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${studentProfile?.attendanceScore}%` }} />
          </div>
        </div>

        {/* Engagement Card */}
        <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engagement Slope</h3>
            {renderTrendBadge(engagementTrend)}
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black tracking-tighter text-white">{studentProfile?.engagementScore}%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">AI sandbox</span>
          </div>
          <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${studentProfile?.engagementScore}%` }} />
          </div>
        </div>
      </div>

      {/* Historic Progression Visual Representation */}
      <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6">
          Weekly Metric Progression Grid
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {history.map((entry, idx) => (
            <div key={idx} className="bg-black/20 border border-white/5 rounded-2xl p-6 space-y-4">
              <div className="border-b border-white/5 pb-2 flex items-center justify-between">
                <span className="text-xs font-black text-white uppercase tracking-widest">{entry.week}</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Record</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Academic Score:</span>
                  <span className="font-bold text-white">{entry.academicScore}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${entry.academicScore}%` }} />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Attendance:</span>
                  <span className="font-bold text-white">{entry.attendanceScore}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${entry.attendanceScore}%` }} />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Engagement Rate:</span>
                  <span className="font-bold text-white">{entry.engagementScore}%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${entry.engagementScore}%` }} />
                </div>
              </div>
            </div>
          ))}

          {history.length === 0 && (
            <div className="col-span-4 text-center py-12 text-slate-500 text-xs font-black uppercase tracking-widest">
              No progression data loaded for student
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
