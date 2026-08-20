import React from "react";
import { useStudentSuccessStore } from "./student-success.store";
import {
  ShieldAlert,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Clock,
} from "lucide-react";

export function CaseManager() {
  const { activeCases } = useStudentSuccessStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <ShieldAlert className="h-6 w-6 text-amber-500" /> Case Management
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Intervention Tracking & Resolution
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="SEARCH CASES..."
              className="bg-[#0A1120] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-bold text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 uppercase tracking-widest w-48"
            />
          </div>
          <button className="h-10 w-10 rounded-xl bg-[#0A1120] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
            <Filter className="h-4 w-4" />
          </button>
          <button className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
            <Plus className="h-4 w-4" /> New Case
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban-style columns */}
        {["OPEN", "IN_PROGRESS", "RESOLVED"].map((status) => (
          <div
            key={status}
            className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-4 flex flex-col h-[70vh]"
          >
            <div className="flex items-center justify-between mb-4 px-2">
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest">
                {status.replace("_", " ")}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-[9px] font-black">
                {activeCases.filter((c) => c.status === status).length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
              {activeCases
                .filter((c) => c.status === status)
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {c.priority}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="h-3 w-3" />{" "}
                        {new Date(c.updatedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mb-1">
                      {c.studentName}
                    </h4>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                      {c.type}
                    </p>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {c.title}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[9px] font-black text-slate-400 border border-white/10">
                          {c.owner.name.charAt(0)}
                        </div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest truncate max-w-[100px]">
                          {c.owner.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500 group-hover:text-amber-500 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
