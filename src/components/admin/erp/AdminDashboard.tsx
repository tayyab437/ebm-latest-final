import React, { useEffect } from "react";
import { useAdminStore } from "./admin.store";
import { useInquiryStore } from "../../../services/inquiries.store";
import { 
  Users, 
  GraduationCap, 
  UserPlus, 
  Activity, 
  ArrowUpRight, 
  History,
  Inbox
} from "lucide-react";
import { AdminView } from "./admin.types";

export function AdminDashboard() {
  const { stats, auditLogs, students, teachers, admissions, fetchAuditLogs, fetchStudents, fetchTeachers, setCurrentView } = useAdminStore();
  const inquiries = useInquiryStore((state) => state.inquiries);
  const fetchInquiries = useInquiryStore((state) => state.fetchInquiries);

  useEffect(() => {
    fetchAuditLogs();
    fetchStudents();
    fetchTeachers();
    fetchInquiries();
  }, [fetchAuditLogs, fetchStudents, fetchTeachers, fetchInquiries]);

  const newInquiriesCount = inquiries.filter((i) => i.status === "NEW").length;

  const cards = [
    { label: "Submitted Inquiries", value: inquiries.length, icon: Inbox, trend: newInquiriesCount > 0 ? `${newInquiriesCount} New` : "Updated", color: "amber", view: AdminView.INQUIRIES },
    { label: "Active Admissions", value: admissions.length, icon: UserPlus, trend: "Pending", color: "indigo", view: AdminView.ADMISSIONS },
    { label: "Total Students", value: students.length, icon: GraduationCap, trend: "Active", color: "blue", view: AdminView.STUDENTS },
    { label: "Faculty Members", value: teachers.length, icon: Users, trend: "Active", color: "emerald", view: AdminView.TEACHERS },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Admin Command Center</h1>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">EBM Global Infrastructure Monitoring</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">System Healthy</span>
          </div>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
            Export Global Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div 
              key={i} 
              onClick={() => card.view && setCurrentView(card.view)}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${card.color}-50 text-${card.color}-600`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-1 text-[11px] font-black ${card.trend.includes("+") ? "text-emerald-600" : "text-slate-500"}`}>
                  {card.trend}
                  {card.trend.includes("+") ? <ArrowUpRight className="h-3 w-3" /> : null}
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 tracking-tight">{card.value}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{card.label}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
            <Activity className="h-4 w-4 text-blue-600" />
            Recent System Activity
          </h3>
          <button 
            onClick={() => setCurrentView(AdminView.AUDIT_LOGS)}
            className="text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest"
          >
            View Full Logs
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <History className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{log.action}</div>
                  <div className="text-xs font-medium text-slate-500 mt-0.5">{log.userName} • {log.module}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900">{new Date(log.timestamp).toLocaleTimeString()}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">{log.ipAddress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
