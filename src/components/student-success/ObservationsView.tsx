import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { 
  FileText, Plus, HelpCircle, MessageSquare, Star, 
  Clock, AlertTriangle, CheckCircle, Award, Sparkles, AlertCircle
} from "lucide-react";
import clsx from "clsx";

export function ObservationsView() {
  const { recentObservations, riskProfiles, addObservation, activeStudentId } = useStudentSuccessStore();
  const [showForm, setShowForm] = useState(false);

  const [studentId, setStudentId] = useState(activeStudentId || "s1");
  const [category, setCategory] = useState<any>("ACADEMIC");
  const [observation, setObservation] = useState("");
  const [impactLevel, setImpactLevel] = useState<any>("NEUTRAL");
  const [teacherName, setTeacherName] = useState("Dr. Sarah Jenkins");

  const [filterCategory, setFilterCategory] = useState("ALL");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!observation.trim()) return;

    addObservation({
      studentId,
      teacherName,
      category,
      observation: observation.trim(),
      impactLevel,
    });

    // Reset Form
    setObservation("");
    setShowForm(false);
  };

  const getImpactBadgeStyle = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "CONCERNING":
        return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "POSITIVE":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  const categoriesList = ["ACADEMIC", "BEHAVIOR", "EMOTIONAL", "SOCIAL", "OTHER"];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <FileText className="h-6 w-6 text-rose-500" /> Faculty Observation Journal
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Qualitative Logs, Micro-Behaviors & Contextual Academic Records
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Close Form" : "Log Observation"}
        </button>
      </div>

      {/* Observation form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0A1120] border border-white/5 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
            Log Professional Classroom Observation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Observee / Student</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              >
                {riskProfiles.map(p => (
                  <option key={p.studentId} value={p.studentId}>
                    {p.studentName} ({p.grade})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                >
                  {categoriesList.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Impact Assessment</label>
                <select
                  value={impactLevel}
                  onChange={(e) => setImpactLevel(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                >
                  <option value="POSITIVE">POSITIVE</option>
                  <option value="NEUTRAL">NEUTRAL</option>
                  <option value="CONCERNING">CONCERNING</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Your Name (Faculty / Staff)</label>
              <input
                type="text"
                required
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Observational Details</label>
              <textarea
                required
                rows={3}
                placeholder="Log granular details of the student's behavior, work ethic, or participation notes..."
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl p-4 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Commit Log Entry
            </button>
          </div>
        </form>
      )}

      {/* Observations list with filters */}
      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
          <h3 className="text-xs font-black text-white uppercase tracking-widest">
            Recent Observation Ledger
          </h3>
          <div className="flex gap-2">
            {["ALL", ...categoriesList].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer",
                  filterCategory === cat
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : "bg-black/20 text-slate-500 border-white/5 hover:text-white"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {recentObservations
            .filter(obs => filterCategory === "ALL" || obs.category === filterCategory)
            .map(obs => {
              const profile = riskProfiles.find(p => p.studentId === obs.studentId);
              return (
                <div key={obs.id} className="p-5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-white uppercase tracking-wider">
                        {profile?.studentName || "Alex Mercer"}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">
                        logged by {obs.teacherName}
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-widest bg-black/40 text-rose-500/80 px-2 py-0.5 rounded border border-white/5">
                        {obs.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      {obs.observation}
                    </p>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-600" /> Logged {obs.date}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <span className={clsx("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", getImpactBadgeStyle(obs.impactLevel))}>
                      {obs.impactLevel}
                    </span>
                  </div>
                </div>
              );
            })}

          {recentObservations.filter(obs => filterCategory === "ALL" || obs.category === filterCategory).length === 0 && (
            <div className="text-center py-16 text-slate-500 text-xs font-black uppercase tracking-widest">
              No journal entries found matching criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
