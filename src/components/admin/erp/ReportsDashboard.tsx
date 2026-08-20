import React from "react";
import { FileText, Download, TrendingUp, Users, GraduationCap, DollarSign, ChevronRight, Filter, Calendar, BarChart3, PieChart } from "lucide-react";

export function ReportsDashboard() {
  const reports = [
    { title: "Monthly Academic Progress", category: "Academics", date: "June 2026", type: "PDF" },
    { title: "Annual Revenue Analysis", category: "Finance", date: "FY 2025-26", type: "Excel" },
    { title: "Student Attendance Analytics", category: "Operations", date: "Weekly", type: "PDF" },
    { title: "Faculty Performance Review", category: "HR", date: "Term 2", type: "PDF" },
    { title: "Curriculum Coverage Audit", category: "Academic ERP", date: "Live", type: "PDF" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Reporting Engine</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Enterprise Intelligence, Compliance & Audits</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 flex items-center gap-2">
            <Plus className="h-4 w-4" /> Schedule Automated Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Report Generations", value: "1,240", icon: FileText, color: "blue" },
           { label: "Automated Jobs", value: "45", icon: TrendingUp, color: "emerald" },
           { label: "Compliance Score", value: "98%", icon: BarChart3, color: "indigo" },
           { label: "Storage Used", value: "4.2 GB", icon: PieChart, color: "amber" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
             </div>
             <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Available Reports
              </h3>
              <div className="flex items-center gap-2">
                 <button className="p-2 border border-slate-200 bg-white text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
                    <Filter className="h-4 w-4" />
                 </button>
              </div>
           </div>
           
           <div className="divide-y divide-slate-100">
              {reports.map((report, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                         <FileText className="h-6 w-6 text-slate-400 group-hover:text-white" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">{report.title}</h4>
                         <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{report.category}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{report.date}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                        report.type === "PDF" ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {report.type}
                      </span>
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Download className="h-4 w-4" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-3xl p-8 text-white">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-emerald-400" />
                 Scheduled Jobs
              </h3>
              <div className="space-y-4">
                 {[
                   { label: "Daily Attendance Sync", time: "23:59 PM", status: "Active" },
                   { label: "Term 2 Grade Export", time: "Every Sunday", status: "Active" },
                   { label: "Admission Pipeline Audit", time: "01:00 AM", status: "Paused" },
                 ].map((job, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center justify-between">
                      <div>
                         <p className="text-xs font-black text-white uppercase tracking-tight">{job.label}</p>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{job.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${job.status === "Active" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-600"}`} />
                   </div>
                 ))}
                 <button className="w-full mt-2 py-3 border border-slate-700 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white hover:border-slate-500 transition-all">
                    Manage All Jobs
                 </button>
              </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Export Destinations</h3>
              <div className="grid grid-cols-2 gap-3">
                 {["Local Server", "Admin Email", "Cloudflare R2", "External SFTP"].map((dest, i) => (
                   <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{dest}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return <Download className={className} />;
}
