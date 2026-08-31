import React from "react";
import { Link } from "react-router-dom";
import { useGrowthStore } from "./growth.store";
import { useBrandingStore } from "../../../lib/branding.store";
import { GROWTH_MENU_ITEMS } from "./growth.constants";
import { GrowthView } from "./growth.types";
import { 
  LogOut, 
  ShieldCheck, 
  Users,
  ChevronRight,
  Zap,
  Award,
  Trophy
} from "lucide-react";
import clsx from "clsx";

interface GrowthSidebarProps {
  currentView: GrowthView;
  setCurrentView: (view: GrowthView) => void;
}

export function GrowthSidebar({ currentView, setCurrentView }: GrowthSidebarProps) {
  const { logoText } = useBrandingStore();
  const { profile } = useGrowthStore();

  return (
    <div className="w-80 h-full bg-[#0A1120] border-r border-white/5 flex flex-col hidden lg:flex">
      {/* Profile Header */}
      <div className="p-8 pb-4">
        <Link 
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="Return to Home Page"
          className="block bg-gradient-to-br from-rose-500/10 to-blue-500/10 rounded-[2rem] p-6 border border-white/5 relative overflow-hidden group cursor-pointer hover:border-rose-500/30 transition-all"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all">
             <Trophy className="w-20 h-20 text-rose-500" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/20 mb-4 group-hover:scale-105 transition-transform">
               <span className="text-xl font-black">{profile?.level || 1}</span>
            </div>
            <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em] mb-1">{logoText} Growth</p>
            <h2 className="text-lg font-black text-white tracking-tight group-hover:text-rose-400 transition-colors">Active Scholar</h2>
            <div className="mt-4 flex items-center gap-3">
               <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                  <Zap className="h-3 w-3 text-amber-400" />
                  <span className="text-[9px] font-black text-white">{profile?.currentXP} XP</span>
               </div>
               <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                  <Award className="h-3 w-3 text-rose-400" />
                  <span className="text-[9px] font-black text-white">{profile?.tokens} Tokens</span>
               </div>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {GROWTH_MENU_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={clsx(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group relative",
                isActive 
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={clsx(
                  "h-5 w-5 transition-transform group-hover:scale-110",
                  isActive ? "text-white" : "text-slate-500 group-hover:text-rose-400"
                )} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </div>
              {isActive && (
                <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-full" />
              )}
              {isActive && <ChevronRight className="h-4 w-4 text-white/50" />}
            </button>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/5">
         <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
               <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
               <p className="text-[10px] font-black text-white uppercase tracking-widest">EBM Certified</p>
               <p className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Growth Tracking Active</p>
            </div>
         </div>
      </div>
    </div>
  );
}
