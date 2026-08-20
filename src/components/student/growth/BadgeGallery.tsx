import React from "react";
import { useGrowthStore } from "./growth.store";
import { Award, ShieldCheck, Star, Zap, Lock, Info, ExternalLink } from "lucide-react";
import clsx from "clsx";

export function BadgeGallery() {
  const { badges } = useGrowthStore();

  const categories = ["ALL", "ACADEMIC", "CRITICAL_THINKING", "AI_LITERACY", "COMMUNITY", "LEADERSHIP"];
  const [activeCategory, setActiveCategory] = React.useState("ALL");

  const filteredBadges = activeCategory === "ALL" 
    ? badges 
    : badges.filter(b => b.category === activeCategory);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Badge Gallery</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Celebrating Your EBM Milestones & Specialized Skills</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                activeCategory === cat 
                  ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20" 
                  : "bg-white/5 text-slate-500 border-white/5 hover:border-rose-500/30"
              )}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredBadges.map((badge) => (
          <div key={badge.id} className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 flex flex-col items-center text-center group hover:border-rose-500/30 transition-all cursor-pointer relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Info className="h-4 w-4 text-slate-700" />
             </div>
             
             <div className={clsx(
               "w-24 h-24 rounded-[2rem] flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform duration-500",
               badge.rarity === 'LEGENDARY' ? "bg-amber-500/20 text-amber-500 shadow-2xl shadow-amber-500/20" :
               badge.rarity === 'EPIC' ? "bg-purple-500/20 text-purple-500 shadow-xl shadow-purple-500/20" :
               badge.rarity === 'RARE' ? "bg-blue-500/20 text-blue-500 shadow-lg shadow-blue-500/20" :
               "bg-slate-500/20 text-slate-500"
             )}>
                <Award className="h-12 w-12" />
                <div className="absolute inset-0 bg-white/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
             </div>

             <h4 className="text-sm font-black text-white tracking-tight mb-2 uppercase group-hover:text-rose-400 transition-colors">{badge.name}</h4>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed mb-6 h-12 overflow-hidden">
                {badge.description}
             </p>

             <div className="mt-auto w-full pt-4 border-t border-white/5 flex items-center justify-between">
                <span className={clsx(
                  "text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md",
                  badge.rarity === 'LEGENDARY' ? "bg-amber-500/10 text-amber-500" :
                  badge.rarity === 'EPIC' ? "bg-purple-500/10 text-purple-500" :
                  badge.rarity === 'RARE' ? "bg-blue-500/10 text-blue-400" :
                  "bg-slate-500/10 text-slate-500"
                )}>
                  {badge.rarity}
                </span>
                <span className="text-[9px] font-black text-rose-400">+{badge.xpReward} XP</span>
             </div>
          </div>
        ))}

        {/* Locked Badges Placeholder */}
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white/[0.01] rounded-[2rem] border border-white/5 border-dashed p-6 flex flex-col items-center text-center opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
             <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-6">
                <Lock className="h-10 w-10 text-slate-700" />
             </div>
             <h4 className="text-sm font-black text-slate-600 tracking-tight mb-2 uppercase">Hidden Milestone</h4>
             <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest leading-relaxed">
                Continue your EBM journey to unlock this mysterious achievement.
             </p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-rose-500/10 via-[#0A1120] to-rose-500/10 rounded-[2.5rem] p-10 border border-white/5 flex flex-col md:flex-row items-center gap-10">
         <div className="flex-1">
            <h3 className="text-xl font-black text-white tracking-tight mb-4 uppercase">EBM Badge System</h3>
            <p className="text-xs font-bold text-slate-400 leading-relaxed max-w-2xl uppercase tracking-widest">
               Unlike traditional grades, EBM Badges represent verifiable skills and character traits. 
               Earn badges through consistent habits, leadership in live sessions, and creative excellence in your portfolio projects.
            </p>
         </div>
         <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] hover:bg-rose-500 transition-all flex items-center gap-3">
            View Ranking System <ExternalLink className="h-4 w-4" />
         </button>
      </div>
    </div>
  );
}
