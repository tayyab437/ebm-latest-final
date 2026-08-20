import React from "react";
import { useLiveStore } from "./live.store";
import { 
  PlayCircle, 
  Clock, 
  Calendar, 
  Download, 
  Share2, 
  Search, 
  Filter,
  Video,
  Sparkles,
  ChevronRight,
  MoreVertical,
  Activity
} from "lucide-react";
import clsx from "clsx";

export function RecordingPanel() {
  const recordings = [
    { id: "r1", title: "Advanced Calculus: Integration", date: "Jun 28, 2024", duration: "58m", size: "245MB", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=225&fit=crop" },
    { id: "r2", title: "The Laws of Motion", date: "Jun 26, 2024", duration: "45m", size: "180MB", thumbnail: "https://images.unsplash.com/photo-1516339901600-2e1a62dc0c45?w=400&h=225&fit=crop" },
    { id: "r3", title: "Chemistry: Atomic Structure", date: "Jun 24, 2024", duration: "62m", size: "290MB", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=225&fit=crop" },
    { id: "r4", title: "English: Shakespearean Drama", date: "Jun 22, 2024", duration: "55m", size: "210MB", thumbnail: "https://images.unsplash.com/photo-1491843384429-171f1f0dca3d?w=400&h=225&fit=crop" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Class Recordings</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Review Past Sessions & AI-Enhanced Playback</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden lg:flex items-center bg-white/5 border border-white/5 rounded-xl px-4 py-2 w-64 group focus-within:border-rose-500/30 transition-all">
              <Search className="h-3.5 w-3.5 text-slate-500 mr-2" />
              <input 
                type="text" 
                placeholder="Find a recording..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-200 placeholder:text-slate-600 w-full"
              />
            </div>
           <button className="px-4 py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
             <Filter className="h-4 w-4" /> Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {recordings.map((rec) => (
           <div key={rec.id} className="bg-[#0A1120] rounded-[2rem] border border-white/5 overflow-hidden hover:border-rose-500/30 transition-all group flex flex-col">
              <div className="relative aspect-video">
                 <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-12 w-12 text-white" />
                 </div>
                 <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[8px] font-black text-white uppercase tracking-widest">
                    {rec.duration}
                 </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest px-2 py-0.5 bg-rose-500/10 rounded-md">
                       Mathematics
                    </span>
                    <button className="text-slate-700 hover:text-white"><MoreVertical className="h-4 w-4" /></button>
                 </div>
                 <h4 className="text-sm font-black text-white tracking-tight leading-tight mb-4 group-hover:text-rose-400 transition-colors">
                    {rec.title}
                 </h4>
                 <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                       <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {rec.date}</span>
                    </div>
                    <div className="flex gap-2">
                       <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-all"><Download className="h-3.5 w-3.5" /></button>
                       <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-all"><Share2 className="h-3.5 w-3.5" /></button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Sparkles className="w-64 h-64 text-rose-500" />
            </div>
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-8 flex items-center gap-2">
               <Sparkles className="h-4 w-4 text-rose-400" /> AI-Enhanced Playback
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: "Smart Skips", desc: "Skip silence and small talk automatically.", icon: Activity },
                 { label: "Topic Marker", desc: "Jump directly to specific sub-topics.", icon: ChevronRight },
                 { label: "Quiz Integration", desc: "Pause for AI quizzes at key points.", icon: Activity },
               ].map((feat, i) => (
                 <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 w-fit mb-4">
                       <feat.icon className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{feat.label}</p>
                    <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">{feat.desc}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Storage Stats</h3>
            <div className="space-y-6">
               <div className="text-center py-4">
                  <p className="text-4xl font-black text-white tracking-tighter">1.2 GB</p>
                  <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mt-1">Cloud Storage Used</p>
               </div>
               <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "45%" }} />
               </div>
               <p className="text-center text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                  45% of allocated study cloud storage used.
               </p>
               <button className="w-full py-3 bg-white/5 border border-white/5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Manage Storage
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
