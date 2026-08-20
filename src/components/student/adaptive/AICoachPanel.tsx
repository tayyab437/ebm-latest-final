import React from "react";
import { useAdaptiveStore } from "./adaptive.store";
import { 
  Sparkles, 
  Brain, 
  MessageSquare, 
  Zap, 
  Clock, 
  Activity, 
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Star
} from "lucide-react";
import clsx from "clsx";

export function AICoachPanel() {
  const recommendations = [
    { text: "Your focus duration is up 15% today! Keep it up for 20 more minutes to hit your peak learning state.", type: "MOTIVATION", icon: Sparkles },
    { text: "Detected struggle with Quadratic Graphs. I suggest a 15-minute diagnostic deep-dive session now.", type: "ADVICE", icon: Brain },
    { text: "Hydration Check: You've been active for 90 minutes. Take a 5-minute break and reset your neural link.", type: "HEALTH", icon: Activity },
    { text: "Upcoming CIE Mock: Your velocity suggests you'll be 100% prepared by next Tuesday.", type: "PREDICTION", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Brain className="w-80 h-80 text-indigo-400" />
        </div>
        
        <div className="relative z-10 space-y-10">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 relative group">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20" />
                    <Sparkles className="h-10 w-10 text-white" />
                 </div>
                 <div>
                    <h2 className="text-3xl font-black text-white tracking-tight">EBM Neural Coach</h2>
                    <p className="text-sm text-indigo-300 font-bold uppercase tracking-[0.2em] mt-1">AI-Powered Learning Optimization</p>
                 </div>
              </div>
              <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all flex items-center gap-2">
                 <MessageSquare className="h-4 w-4" /> Start AI Consult
              </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                   <div className="flex items-start gap-6 relative z-10">
                      <div className="p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                         <rec.icon className="h-6 w-6" />
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md">{rec.type}</span>
                         </div>
                         <p className="text-sm font-bold text-slate-300 leading-relaxed group-hover:text-white transition-colors">{rec.text}</p>
                         <button className="mt-6 flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:gap-3 transition-all">
                            Take Action <ArrowRight className="h-3.5 w-3.5" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>

           <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                 <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Lightbulb className="h-8 w-8" />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-white tracking-tight">Pro-Tip for Accelerated Tracks</h4>
                    <p className="text-xs text-indigo-300 font-medium mt-1">Revision in the first 24 hours increases retention by 60%. Schedule your Algebra review now.</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all">
                    Schedule Now
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Daily Habit Calibration</h3>
            <div className="space-y-6">
               {[
                 { label: "Meditation / Reflection", done: true },
                 { label: "Speed Reading Practice", done: true },
                 { label: "Mental Math Sprint", done: false },
                 { label: "Vocabulary Drill", done: true },
               ].map((h, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">{h.label}</span>
                    {h.done ? (
                       <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ) : (
                       <div className="w-4 h-4 rounded-full border-2 border-slate-700" />
                    )}
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-2 bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Personalized Study Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "Use Feynman Technique for Physics concepts.",
                 "Break Algebra problems into logical proofs.",
                 "Listen to Lofi beats during focus blocks.",
                 "Morning sessions are best for retention.",
               ].map((tip, i) => (
                 <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-relaxed">{tip}</p>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
