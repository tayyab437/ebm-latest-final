import React from "react";
import { useLiveStore } from "./live.store";
import { 
  ChevronLeft, 
  Video, 
  Clock, 
  User, 
  BookOpen, 
  FileText, 
  Sparkles, 
  HelpCircle, 
  PlayCircle,
  Download,
  Share2,
  ExternalLink,
  Users,
  Target
} from "lucide-react";
import { LiveView } from "./live.types";
import clsx from "clsx";

export function ClassDetails() {
  const { selectedClassId, classes, setCurrentView } = useLiveStore();
  const classItem = classes.find(c => c.id === selectedClassId) || classes[0];

  const isLive = classItem.status === "LIVE";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrentView(LiveView.UPCOMING)}
          className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-all"
        >
          <ChevronLeft className="h-4 w-4" /> Back to Schedule
        </button>
        <div className="flex items-center gap-4">
           <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all border border-white/5">
              <Share2 className="h-4 w-4" />
           </button>
           <button className="p-2.5 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all border border-white/5">
              <Download className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5">
                 <Video className="w-80 h-80 text-rose-500" />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                       {classItem.subject}
                    </span>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Clock className="h-3.5 w-3.5" /> 60 Minutes Session
                    </span>
                 </div>
                 <h1 className="text-4xl font-black text-white tracking-tight leading-tight mb-6 max-w-2xl">
                    {classItem.title}
                 </h1>
                 <div className="flex items-center gap-8 mb-10">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-rose-400">
                          <User className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Lead Instructor</p>
                          <p className="text-sm font-black text-white">{classItem.teacherName}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-rose-400">
                          <Users className="h-6 w-6" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Class Size</p>
                          <p className="text-sm font-black text-white">{classItem.currentStudents} Students Enrolled</p>
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.open(classItem.meetLink, '_blank')}
                      className="px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-2xl shadow-rose-500/20 flex items-center gap-3 group"
                    >
                       <Video className="h-5 w-5 group-hover:scale-110 transition-transform" />
                       {isLive ? "Join Live Classroom" : "Class Not Started"}
                    </button>
                    <button className="px-10 py-5 bg-white/5 border border-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 group">
                       <FileText className="h-5 w-5 group-hover:scale-110 transition-transform text-rose-400" />
                       Pre-Class Notes
                    </button>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
                 <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                    <Target className="h-4 w-4 text-rose-500" /> Learning Objectives
                 </h3>
                 <ul className="space-y-4">
                    {[
                      "Understand the core principles of complex numbers",
                      "Apply algebraic rules to imaginary units",
                      "Visualize numbers on the Argand diagram",
                      "Solve quadratic equations with non-real roots"
                    ].map((obj, i) => (
                      <li key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                         <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                         <span className="text-xs font-bold text-slate-400 leading-relaxed">{obj}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
                 <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-rose-500" /> Essential Resources
                 </h3>
                 <div className="space-y-4">
                    {[
                      { title: "Algebra Module PDF", size: "2.4MB", type: "PDF" },
                      { title: "Complex Graph Tools", size: "Link", type: "Web" },
                      { title: "Reference Sheet", size: "1.1MB", type: "PDF" }
                    ].map((res, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-rose-400">
                               <FileText className="h-5 w-5" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-white uppercase tracking-widest">{res.title}</p>
                               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{res.size} • {res.type}</p>
                            </div>
                         </div>
                         <Download className="h-4 w-4 text-slate-700 group-hover:text-rose-400" />
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* AI & Interaction Sidebar */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                 <Sparkles className="w-40 h-40" />
              </div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-rose-400">AI Preparation</h3>
              <div className="space-y-6 relative z-10">
                 <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                          <HelpCircle className="h-5 w-5" />
                       </div>
                       <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Diagnostic Quiz</span>
                    </div>
                    <p className="text-xs font-bold text-slate-300 leading-relaxed mb-4">
                       Take this 5-minute pre-class quiz to help the teacher customize today's session for you.
                    </p>
                    <button className="w-full py-3 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">
                       Start Diagnostic
                    </button>
                 </div>

                 <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                          <Clock className="h-5 w-5" />
                       </div>
                       <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Estimated Prep Time</span>
                    </div>
                    <p className="text-2xl font-black text-white">15 Minutes</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Based on your learning velocity</p>
                 </div>
              </div>
           </div>

           <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Past Sessions In This Series</h3>
              <div className="space-y-4">
                 {[
                   { title: "Introduction to Imaginary Numbers", date: "Jun 24, 2024" },
                   { title: "Algebraic Foundations", date: "Jun 20, 2024" }
                 ].map((prev, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all">
                         <PlayCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[10px] font-black text-white uppercase tracking-widest truncate">{prev.title}</p>
                         <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{prev.date}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-700" />
                   </div>
                 ))}
                 <button className="w-full py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-400 transition-colors">
                    View Entire Series
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
