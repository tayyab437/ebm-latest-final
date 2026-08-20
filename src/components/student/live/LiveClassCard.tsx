import React from "react";
import { LiveClass } from "./live.types";
import { Video, Clock, User, ChevronRight, Sparkles, BookOpen } from "lucide-react";
import clsx from "clsx";

interface LiveClassCardProps {
  classItem: LiveClass;
  onClick?: () => void;
  key?: string | number;
}

export function LiveClassCard({ classItem, onClick }: LiveClassCardProps) {
  const isLive = classItem.status === "LIVE";

  return (
    <div 
      onClick={onClick}
      className={clsx(
        "bg-[#0A1120] rounded-[2rem] border transition-all duration-300 group cursor-pointer relative overflow-hidden",
        isLive ? "border-rose-500/50 hover:border-rose-500" : "border-white/5 hover:border-rose-500/30"
      )}
    >
      {isLive && (
        <div className="absolute top-0 right-0 p-4">
           <div className="flex items-center gap-2 px-2 py-1 bg-rose-500 rounded-md text-[8px] font-black text-white uppercase tracking-widest animate-pulse shadow-lg shadow-rose-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              Live Now
           </div>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
           <div className={clsx(
             "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300",
             isLive ? "bg-rose-500 text-white scale-110 shadow-lg shadow-rose-500/30" : "bg-white/5 text-slate-500 group-hover:text-rose-400 group-hover:bg-rose-500/10"
           )}>
             <BookOpen className="h-6 w-6" />
           </div>
           <div>
              <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded-md">
                 {classItem.subject}
              </span>
              <h4 className="text-lg font-black text-white tracking-tight mt-1 group-hover:text-rose-400 transition-colors">
                 {classItem.title}
              </h4>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 text-slate-500">
                 <User className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                 <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Instructor</p>
                 <p className="text-[11px] font-bold text-slate-300 truncate">{classItem.teacherName}</p>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/5 text-slate-500">
                 <Clock className="h-4 w-4" />
              </div>
              <div>
                 <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Duration</p>
                 <p className="text-[11px] font-bold text-slate-300">60 Minutes</p>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0A1120] bg-slate-800 flex items-center justify-center text-[8px] font-black text-slate-500">
                      U{i}
                   </div>
                 ))}
                 <div className="w-6 h-6 rounded-full border-2 border-[#0A1120] bg-rose-500 flex items-center justify-center text-[8px] font-black text-white">
                    +12
                 </div>
              </div>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Enrolled</span>
           </div>
           <button className="flex items-center gap-1.5 text-[10px] font-black text-rose-400 uppercase tracking-widest hover:gap-2.5 transition-all">
              Details <ChevronRight className="h-3.5 w-3.5" />
           </button>
        </div>
      </div>

      {isLive && (
        <div className="px-8 pb-8">
           <button 
             onClick={(e) => {
               e.stopPropagation();
               window.open(classItem.meetLink, '_blank');
             }}
             className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-rose-500/20 flex items-center justify-center gap-2 group/btn"
           >
              <Video className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
              Enter Live Classroom
           </button>
        </div>
      )}
    </div>
  );
}
