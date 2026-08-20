import React, { useEffect, useState } from "react";
import { History, Search, Filter, ShieldCheck, User, Globe, MoreVertical, Calendar, Users, GraduationCap, UserCircle } from "lucide-react";
import { useAdminStore } from "./admin.store";

type AuditTab = "ADMIN" | "TEACHER" | "STUDENT" | "PARENT";

export function AuditLogViewer() {
  const { auditLogs, fetchAuditLogs } = useAdminStore();
  const [activeTab, setActiveTab] = useState<AuditTab>("ADMIN");

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const filteredLogs = auditLogs.filter(log => {
    const roleMap: Record<AuditTab, string[]> = {
      ADMIN: ["admin", "system", "Curriculum CMS", "Authentication", "Academic ERP", "ADMIN"],
      TEACHER: ["teacher", "TEACHER"],
      STUDENT: ["student", "STUDENT"],
      PARENT: ["parent", "PARENT"]
    };
    return roleMap[activeTab].some(r => log.module?.toLowerCase().includes(r.toLowerCase()) || log.userId?.toLowerCase().includes(r.toLowerCase()));
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Audit & Security Logs</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Immutable Traceability of Platform Governance</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-[#0F172A] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" /> Verify Block Integrity
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-full max-w-2xl">
        {[
          { id: "ADMIN", label: "Admin Logs", icon: ShieldCheck },
          { id: "TEACHER", label: "Teacher Logs", icon: GraduationCap },
          { id: "STUDENT", label: "Student Logs", icon: Users },
          { id: "PARENT", label: "Parent Logs", icon: UserCircle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AuditTab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            <tab.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by action, user, or IP..."
               className="w-full pl-9 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase tracking-widest"
             />
           </div>
           <div className="flex items-center gap-2 w-full md:w-auto">
             <select className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest focus:outline-none">
               <option>All Modules</option>
               <option>Curriculum CMS</option>
               <option>Authentication</option>
               <option>Academic ERP</option>
             </select>
             <button className="p-2.5 border border-slate-200 bg-white text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
               <Filter className="h-4 w-4" />
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-5">Event Action</th>
                <th className="px-6 py-5">Initiator</th>
                <th className="px-6 py-5">Context / IP</th>
                <th className="px-6 py-5">Timestamp</th>
                <th className="px-6 py-5 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <History className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{log.action}</div>
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">{log.module}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-black text-slate-600">
                          {log.userName.split(" ").map(n => n[0]).join("")}
                       </div>
                       <span className="text-xs font-bold text-slate-700">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500">
                      <Globe className="h-3 w-3" /> {log.ipAddress}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-widest">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-slate-100 bg-slate-50/20 text-center">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
             End of Audit Chain • Secure EBM Infrastructure
           </p>
        </div>
      </div>
    </div>
  );
}
