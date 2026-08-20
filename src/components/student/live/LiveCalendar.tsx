import React, { useState } from "react";
import { useLiveStore } from "./live.store";
import { googleWorkspaceSignIn } from "../../../lib/google-workspace";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  User,
  MoreVertical,
  Plus,
  Filter,
  ShieldCheck
} from "lucide-react";
import clsx from "clsx";

export function LiveCalendar() {
  const { classes, workspaceUser, setWorkspaceAuth } = useLiveStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSync = async () => {
    if (!workspaceUser) {
      try {
        const result = await googleWorkspaceSignIn();
        if (result) setWorkspaceAuth(result.user, result.accessToken);
      } catch (err) {
        console.error("Failed to sync", err);
      }
      return;
    }
    // Logic for actual calendar sync would go here
    alert("Calendar sync initiated with Google Workspace.");
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Mock calendar grid logic
  const dateGrid = Array.from({ length: 35 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Class Calendar</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Manage & Synchronize Your Learning Schedule</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
             <Filter className="h-4 w-4" /> Filter
           </button>
           <button 
             onClick={handleSync}
             className={clsx(
               "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2",
               workspaceUser 
                 ? "bg-emerald-500 text-white shadow-emerald-500/20" 
                 : "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20"
             )}
           >
             {workspaceUser ? <ShieldCheck className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
             {workspaceUser ? "Google Cal Synced" : "Sync Google Calendar"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Calendar Grid */}
        <div className="lg:col-span-8 bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
           <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                 <h3 className="text-lg font-black text-white uppercase tracking-widest">{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h3>
                 <div className="flex items-center gap-1">
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ChevronLeft className="h-5 w-5" /></button>
                    <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ChevronRight className="h-5 w-5" /></button>
                 </div>
              </div>
              <div className="flex bg-white/5 p-1 rounded-xl">
                 {["Month", "Week", "Day"].map(v => (
                   <button key={v} className={clsx(
                     "px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                     v === "Month" ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" : "text-slate-500 hover:text-slate-300"
                   )}>
                     {v}
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-7 mb-4">
              {days.map(d => (
                <div key={d} className="text-center text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] py-2">{d}</div>
              ))}
           </div>

           <div className="grid grid-cols-7 gap-1">
              {dateGrid.map(d => {
                const isCurrent = d === 30;
                const hasClass = [5, 12, 18, 30].includes(d);
                return (
                  <div key={d} className={clsx(
                    "aspect-square rounded-2xl border flex flex-col p-3 transition-all cursor-pointer group relative overflow-hidden",
                    isCurrent ? "bg-rose-500 border-rose-500" : "bg-white/[0.01] border-white/5 hover:bg-white/[0.04]",
                    d > 30 ? "opacity-20" : "opacity-100"
                  )}>
                    <span className={clsx(
                      "text-[10px] font-black transition-colors",
                      isCurrent ? "text-white" : "text-slate-500 group-hover:text-slate-300"
                    )}>{d}</span>
                    
                    {hasClass && (
                      <div className="mt-auto flex gap-1">
                        <div className={clsx("w-1.5 h-1.5 rounded-full", isCurrent ? "bg-white" : "bg-rose-500")} />
                        {d === 30 && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                      </div>
                    )}

                    {isCurrent && (
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                    )}
                  </div>
                );
              })}
           </div>
        </div>

        {/* Agenda View */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Agenda: June 30, 2024</h3>
              <div className="space-y-6">
                 {classes.map((c, i) => (
                   <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-white/5 group">
                      <div className={clsx(
                        "absolute left-[-4px] top-2 w-2 h-2 rounded-full border-2 border-[#0A1120] transition-colors",
                        c.status === "LIVE" ? "bg-rose-500 animate-pulse" : "bg-slate-700 group-hover:bg-rose-400"
                      )} />
                      <div className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all">
                         <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest">{c.startTime.split('T')[1].substring(0, 5)}</span>
                            <MoreVertical className="h-4 w-4 text-slate-700" />
                         </div>
                         <h4 className="text-sm font-black text-white tracking-tight leading-tight mb-2">{c.title}</h4>
                         <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                               <User className="h-3 w-3 text-rose-500" /> {c.teacherName.split(' ').pop()}
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                               <Clock className="h-3 w-3 text-rose-500" /> 60m
                            </div>
                         </div>
                         {c.status === "LIVE" && (
                           <button 
                             onClick={() => window.open(c.meetLink, '_blank')}
                             className="w-full mt-4 py-2.5 bg-rose-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center gap-2"
                           >
                             <Video className="h-3.5 w-3.5" /> Join Live
                           </button>
                         )}
                      </div>
                   </div>
                 ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5">
                 <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4">
                    <CalendarIcon className="h-5 w-5 text-blue-500 shrink-0 mt-1" />
                    <div>
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Upcoming Milestone</p>
                       <p className="text-xs font-bold text-slate-300 leading-relaxed">
                         Mid-term Physics assessment scheduled for next Monday.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
