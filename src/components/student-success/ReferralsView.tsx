import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { 
  ShieldAlert, Plus, HelpCircle, FileText, Send, 
  CheckCircle, User, Clock, AlertCircle, Sparkles, Inbox
} from "lucide-react";
import clsx from "clsx";

export function ReferralsView() {
  const { referrals, riskProfiles, createReferral, activeStudentId } = useStudentSuccessStore();
  const [showForm, setShowForm] = useState(false);

  const [studentId, setStudentId] = useState(activeStudentId || "s1");
  const [referredTo, setReferredTo] = useState("Counseling Dept");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    const studentProfile = riskProfiles.find(p => p.studentId === studentId);

    createReferral({
      studentId,
      studentName: studentProfile?.studentName || "Alex Mercer",
      referredTo,
      reason: reason.trim(),
    });

    // Reset Form
    setReason("");
    setShowForm(false);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "ACCEPTED":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  const departments = [
    "Counseling Dept",
    "Special Education Specialist",
    "English as a Second Language Team",
    "Academic Support Center",
    "Dean of Students"
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-rose-500" /> Specialist Referral Office
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Escalation to Counseling, Language support, & Targeted Specialists
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Close Form" : "Create Specialist Referral"}
        </button>
      </div>

      {/* Referral form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0A1120] border border-white/5 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
            Submit Formal Referral Request
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Referred Student</label>
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

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Referral Destination Department</label>
              <select
                value={referredTo}
                onChange={(e) => setReferredTo(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Detailed Referral Motive & Context</label>
              <textarea
                required
                rows={4}
                placeholder="Provide objective behavioral, attendance, or emotional metrics outlining why the student requires expert consultation..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
              Dispatch Referral Request
            </button>
          </div>
        </form>
      )}

      {/* Referrals ledger list */}
      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8">
        <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-4">
          Dispatched Referral Inboxes & Outcomes
        </h3>

        <div className="space-y-4">
          {referrals.map(ref => (
            <div key={ref.id} className="p-5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-white uppercase tracking-wider">
                    {ref.studentName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    referred to &rarr;
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {ref.referredTo}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {ref.reason}
                </p>

                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-600" /> Dispatched {ref.date}
                </div>
              </div>

              <div className="shrink-0">
                <span className={clsx("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest", getStatusBadgeStyle(ref.status))}>
                  {ref.status}
                </span>
              </div>
            </div>
          ))}

          {referrals.length === 0 && (
            <div className="text-center py-16 text-slate-500 text-xs font-black uppercase tracking-widest flex flex-col items-center justify-center gap-2">
              <Inbox className="h-8 w-8 opacity-40 mb-2" />
              <span>No outstanding referral requests logged</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
