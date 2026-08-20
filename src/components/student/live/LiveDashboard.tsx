import React from "react";
import { useLiveStore } from "./live.store";
import { 
  Video, 
  Clock, 
  Calendar, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import clsx from "clsx";

export function LiveDashboard() {
  const { classes, stats } = useLiveStore();
  
  const activeClass = classes.find(c => c.status === "LIVE");
  const upcomingClasses = classes.filter(c => c.status === "SCHEDULED");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Attendance Rate", value: `${stats.attendanceRate}%`, icon: Users, color: "text-rose-400", bg: "bg-rose-500/10" },
          { label: "Classes Completed", value: stats.totalClasses, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Participation", value: `${stats.participationScore}%`, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Next Class In", value: "45m", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-[#0A1120] p-6 rounded-3xl border border-white/5 hover:bg-white/[0.04] transition-all group">
            <div className={clsx("p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
              <stat.icon className="h-6 w-6" />
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-white mt-1 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Class Hero */}
          {activeClass && (
            <div className="bg-gradient-to-br from-rose-900/40 via-[#0A1120] to-[#0A1120] rounded-[2.5rem] border border-rose-500/30 p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Video className="w-64 h-64 text-rose-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                   <div className="px-3 py-1 bg-rose-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                     Live Now
                   </div>
                   <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
                     Session ID: {activeClass.id}
                   </span>
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight mb-2">{activeClass.title}</h2>
                <p className="text-slate-400 text-sm font-medium mb-8 max-w-xl">
                  This session is currently in progress. Join your classmates and {activeClass.teacherName} for a deep dive into {activeClass.subject}.
                </p>
                <div className="flex flex-wrap items-center gap-6 mb-8">
                   <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300">
                         <Users className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Students</p>
                         <p className="text-xs font-black text-white">{activeClass.currentStudents} / {activeClass.maxStudents}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300">
                         <Clock className="h-5 w-5" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ending In</p>
                         <p className="text-xs font-black text-white">42 Minutes</p>
                      </div>
                   </div>
                </div>
                <button 
                  onClick={() => window.open(activeClass.meetLink, '_blank')}
                  className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 flex items-center gap-3 group/btn"
                >
                   <Video className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                   Join Google Meet Class
                </button>
              </div>
            </div>
          )}

          {/* Upcoming Schedule */}
          <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                   <Calendar className="h-5 w-5 text-rose-500" />
                   Upcoming Classes
                </h3>
                <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-300 transition-colors">
                   View Full Timetable
                </button>
             </div>
             <div className="space-y-4">
                {upcomingClasses.map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all group">
                     <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex flex-col items-center justify-center text-slate-400 group-hover:bg-rose-500/10 group-hover:text-rose-400 transition-all">
                           <span className="text-[10px] font-black">JUN</span>
                           <span className="text-xl font-black">30</span>
                        </div>
                        <div>
                           <h4 className="text-base font-black text-white tracking-tight">{c.title}</h4>
                           <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest px-2 py-0.5 bg-rose-500/10 rounded-md">{c.subject}</span>
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                 <Clock className="h-3 w-3" /> 10:00 AM - 11:00 AM
                              </span>
                           </div>
                        </div>
                     </div>
                     <button className="p-3 rounded-2xl bg-white/5 text-slate-500 hover:bg-rose-500 hover:text-white transition-all">
                        <ExternalLink className="h-5 w-5" />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-8">
           {/* AI Recommendations */}
           <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Sparkles className="w-40 h-40" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-rose-400">AI Live Insights</h3>
              <div className="space-y-6 relative z-10">
                 {[
                   { text: "Your physics attendance is at 100%. Review session 12 recording for exam prep.", type: "PREP" },
                   { text: "Join today's Math class 5 minutes early to clear your algebra doubts.", type: "SUGGESTION" },
                 ].map((rec, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] transition-all cursor-pointer group">
                      <p className="text-xs font-bold text-slate-300 leading-relaxed mb-3 group-hover:text-white">{rec.text}</p>
                      <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
                         Learn More <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Quick Stats / Recent Recordings */}
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Recent Recordings</h3>
              <div className="space-y-4">
                 {[
                   { title: "Chemical Equilibrium", date: "Yesterday", duration: "45m" },
                   { title: "English Literature", date: "2 days ago", duration: "60m" },
                 ].map((rec, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                         <PlayCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[10px] font-black text-white uppercase tracking-widest truncate">{rec.title}</p>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{rec.date} • {rec.duration}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-700" />
                   </div>
                 ))}
              </div>
           </div>

           {/* Announcement */}
           <div className="bg-rose-500/10 border border-rose-500/20 rounded-[2.5rem] p-8 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-rose-500 shrink-0 mt-1" />
              <div>
                 <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Teacher Notice</p>
                 <p className="text-xs font-bold text-slate-300 leading-relaxed">
                   Next week's Physics class will be rescheduled to Wednesday at 4 PM. Please check your calendar.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
