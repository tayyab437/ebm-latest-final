import React from "react";
import { useLiveStore } from "./live.store";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  Filter,
  Download,
  Activity,
  TrendingUp
} from "lucide-react";
import clsx from "clsx";

export function AttendancePanel() {
  const { stats } = useLiveStore();

  const history = [
    { date: "Jun 28, 2024", subject: "Mathematics", status: "PRESENT", duration: "60m", joinTime: "10:01 AM" },
    { date: "Jun 26, 2024", subject: "Physics", status: "LATE", duration: "52m", joinTime: "10:08 AM" },
    { date: "Jun 24, 2024", subject: "Chemistry", status: "PRESENT", duration: "60m", joinTime: "09:59 AM" },
    { date: "Jun 22, 2024", subject: "Mathematics", status: "ABSENT", duration: "0m", joinTime: "-" },
    { date: "Jun 20, 2024", subject: "English", status: "EXCUSED", duration: "0m", joinTime: "-" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Attendance Analytics</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Class Presence & Participation Consistency</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
             <Download className="h-4 w-4" /> Export Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 overflow-hidden">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date & Subject</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Join Time</th>
                      <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                   {history.map((item, i) => (
                     <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-xs font-black text-white uppercase tracking-tight">{item.date}</p>
                           <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-0.5">{item.subject}</p>
                        </td>
                        <td className="px-8 py-6">
                           <div className={clsx(
                             "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                             item.status === "PRESENT" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                             item.status === "LATE" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                             item.status === "ABSENT" ? "bg-rose-500/10 text-rose-400 border-rose-500/20" :
                             "bg-slate-500/10 text-slate-400 border-slate-500/20"
                           )}>
                              {item.status === "PRESENT" && <CheckCircle2 className="h-3 w-3" />}
                              {item.status === "LATE" && <Clock className="h-3 w-3" />}
                              {item.status === "ABSENT" && <XCircle className="h-3 w-3" />}
                              {item.status === "EXCUSED" && <AlertCircle className="h-3 w-3" />}
                              {item.status}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-slate-400">{item.joinTime}</td>
                        <td className="px-8 py-6 text-xs font-bold text-white">{item.duration}</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-[#0F172A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Activity className="w-40 h-40" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-rose-400">Monthly Performance</h3>
              <div className="flex flex-col items-center justify-center py-4">
                 <div className="relative w-40 h-40 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="80" cy="80" r="72" className="stroke-white/5" strokeWidth="10" fill="none" />
                       <circle 
                          cx="80" cy="80" r="72" 
                          className="stroke-rose-500" strokeWidth="10" fill="none"
                          strokeDasharray={452.39}
                          strokeDashoffset={452.39 * (1 - stats.attendanceRate / 100)}
                          strokeLinecap="round"
                       />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-4xl font-black tracking-tighter">{stats.attendanceRate}%</span>
                       <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">Attendance</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">On Time</p>
                    <p className="text-lg font-black mt-1">92%</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Excused</p>
                    <p className="text-lg font-black mt-1">2</p>
                 </div>
              </div>
           </div>

           <div className="bg-white/[0.02] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Subject Breakdown</h3>
              <div className="space-y-6">
                 {[
                   { label: "Mathematics", val: 100, color: "rose" },
                   { label: "Physics", val: 85, color: "blue" },
                   { label: "Chemistry", val: 92, color: "emerald" },
                   { label: "English", val: 75, color: "amber" },
                 ].map((s, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                         <span>{s.label}</span>
                         <span className="text-white">{s.val}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className={clsx("h-full rounded-full transition-all duration-1000", `bg-${s.color}-500`)} style={{ width: `${s.val}%` }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
