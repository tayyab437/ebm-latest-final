import React, { useState } from "react";
import { useStudentSuccessStore } from "./student-success.store";
import { CaseStatus, CasePriority } from "./student-success.types";
import { 
  AlertTriangle, CheckCircle, Sparkles, Plus, Clock, BookOpen, 
  User, CheckCircle2, ListFilter, HelpCircle, Lightbulb, AlertCircle
} from "lucide-react";

export function InterventionsView() {
  const { riskProfiles, activeCases, createCase, activeStudentId } = useStudentSuccessStore();
  const [showForm, setShowForm] = useState(false);
  
  const [targetStudent, setTargetStudent] = useState(activeStudentId || "s1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<any>("ACADEMIC");
  const [priority, setPriority] = useState<CasePriority>(CasePriority.MEDIUM);

  const [filterType, setFilterType] = useState<string>("ALL");

  const selectedStudentProfile = riskProfiles.find(p => p.studentId === targetStudent) || riskProfiles[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    createCase({
      studentId: targetStudent,
      studentName: selectedStudentProfile?.studentName || "Alex Mercer",
      title,
      description,
      type,
      priority,
      status: CaseStatus.OPEN,
    });

    // Reset Form
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  const recommendedInterventions = [
    {
      title: "Micro-Assignment Study Routines",
      description: "Divide double-credit tasks into 15-minute intervals. Designed for students experiencing homework fatigue.",
      efficacy: "92% Efficacy",
      category: "ACADEMIC",
    },
    {
      title: "Peer-to-Peer Lab Pairing",
      description: "Partner the student with high-performance peers inside specialized sandbox channels to trigger social learning.",
      efficacy: "85% Efficacy",
      category: "SOCIAL",
    },
    {
      title: "Asynchronous Progress Checklists",
      description: "Configure automatic check-ins from the virtual guide at the start and end of study sessions to keep attendance consistent.",
      efficacy: "88% Efficacy",
      category: "ATTENDANCE",
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-rose-500" /> Intervention Catalog
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Proven Pedagogical Remediation Actions & Strategies
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> {showForm ? "Close Form" : "Deploy Intervention"}
        </button>
      </div>

      {/* Deploy Intervention Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-[#0A1120] border border-white/5 rounded-[2rem] p-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/5 pb-4">
            New Targeted Intervention Plan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Target Student</label>
              <select
                value={targetStudent}
                onChange={(e) => setTargetStudent(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              >
                {riskProfiles.map(p => (
                  <option key={p.studentId} value={p.studentId}>
                    {p.studentName} ({p.grade}) - Risk Score: {p.riskScore}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Intervention Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                >
                  <option value="ACADEMIC">ACADEMIC</option>
                  <option value="ATTENDANCE">ATTENDANCE</option>
                  <option value="BEHAVIOR">BEHAVIOR</option>
                  <option value="PARENT_CONCERN">PARENT CONCERN</option>
                  <option value="AI_RECOMMENDATION">AI PREDICTIVE</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Priority Tier</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
                >
                  <option value={CasePriority.LOW}>LOW</option>
                  <option value={CasePriority.MEDIUM}>MEDIUM</option>
                  <option value={CasePriority.HIGH}>HIGH</option>
                  <option value={CasePriority.URGENT}>URGENT</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Plan Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Weekly Mathematics Catch-Up Blocks"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-rose-500/50 uppercase tracking-wider font-bold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Strategic Description</label>
              <textarea
                required
                rows={3}
                placeholder="Describe the steps, expectations, and metrics of success for this student..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              Confirm Deployment
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recommended catalog list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Sparkles className="h-4 w-4 text-rose-400 animate-pulse" /> AI Recommended Catalog
            </h3>
            <div className="space-y-4">
              {recommendedInterventions.map((rec, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md">
                      {rec.category}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">
                      {rec.efficacy}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">{rec.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{rec.description}</p>
                  <button 
                    onClick={() => {
                      setTitle(rec.title);
                      setDescription(rec.description);
                      setType(rec.category);
                      setShowForm(true);
                    }}
                    className="mt-4 text-[9px] font-black uppercase tracking-widest text-rose-500 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
                  >
                    Load into Deployer &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active deployments status */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Active Intervention Deployments
              </h3>
              <div className="flex items-center gap-2">
                <ListFilter className="h-3.5 w-3.5 text-slate-500" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-black/40 border border-white/5 rounded-lg px-2.5 py-1 text-[9px] font-black text-slate-400 uppercase tracking-widest"
                >
                  <option value="ALL">ALL TYPES</option>
                  <option value="ACADEMIC">ACADEMIC</option>
                  <option value="ATTENDANCE">ATTENDANCE</option>
                  <option value="BEHAVIOR">BEHAVIOR</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {activeCases
                .filter(c => filterType === "ALL" || c.type === filterType)
                .map(c => (
                  <div key={c.id} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wider">{c.studentName}</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{c.title}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {c.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{c.description}</p>
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-600" /> Initiated {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}

              {activeCases.filter(c => filterType === "ALL" || c.type === filterType).length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-black uppercase tracking-widest">
                  No active intervention plans found for filter
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
