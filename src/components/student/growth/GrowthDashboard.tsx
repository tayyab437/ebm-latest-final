import React from "react";
import { useGrowthStore } from "./growth.store";
import { 
  Trophy, 
  Target, 
  Zap, 
  Flame, 
  Award, 
  TrendingUp, 
  Sparkles, 
  ChevronRight,
  Brain,
  Star,
  Activity,
  History as HistoryIcon,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import clsx from "clsx";

export function GrowthDashboard() {
  const { profile, competencies, missions, habits, history } = useGrowthStore();

  if (!profile) return null;

  const xpPercentage = (profile.currentXP / profile.nextLevelXP) * 100;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero: Level & XP */}
      <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Trophy className="w-64 h-64 text-rose-500" />
         </div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-rose-500 flex items-center justify-center text-white shadow-xl shadow-rose-500/20">
                     <span className="text-3xl font-black">{profile.level}</span>
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Current Status</p>
                     <h2 className="text-2xl font-black text-white tracking-tight">Master Explorer</h2>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between items-end">
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Experience Points (XP)</p>
                     <p className="text-xs font-black text-white">
                        <span className="text-rose-400">{profile.currentXP}</span> / {profile.nextLevelXP}
                     </p>
                  </div>
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden p-1 border border-white/10">
                     <div 
                        className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full transition-all duration-1000 relative"
                        style={{ width: `${xpPercentage}%` }}
                     >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                     </div>
                  </div>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest text-center">
                     {profile.nextLevelXP - profile.currentXP} XP required to reach Level {profile.level + 1}
                  </p>
               </div>
            </div>
            <div className="bg-white/[0.02] rounded-3xl p-6 border border-white/5 flex flex-col justify-center">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                     <TrendingUp className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Growth Velocity</span>
               </div>
               <p className="text-4xl font-black text-white tracking-tighter mb-1">+{profile.growthScore}</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">EBM Growth Score</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Left Column: Competencies & Habits */}
         <div className="lg:col-span-8 space-y-8">
            {/* Competency Radar */}
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                     <Brain className="h-5 w-5 text-rose-500" />
                     EBM Competency Radar
                  </h3>
                  <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-rose-300 transition-colors">
                     View Deep Analytics
                  </button>
               </div>
               <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competencies}>
                        <PolarGrid stroke="#1E293B" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
                        <Radar
                           name="Student"
                           dataKey="value"
                           stroke="#f43f5e"
                           fill="#f43f5e"
                           fillOpacity={0.3}
                        />
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                           itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: '900' }}
                        />
                     </RadarChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Daily Missions */}
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                     <Target className="h-5 w-5 text-rose-500" />
                     Active Missions
                  </h3>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                     {missions.filter(m => m.status === 'IN_PROGRESS').length} Pending
                  </span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {missions.map((mission) => (
                     <div key={mission.id} className="p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all group">
                        <div className="flex items-center justify-between mb-4">
                           <div className={clsx(
                              "px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest",
                              mission.type === 'DAILY' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                           )}>
                              {mission.type}
                           </div>
                           <span className="text-[10px] font-black text-rose-400">+{mission.xpReward} XP</span>
                        </div>
                        <h4 className="text-sm font-black text-white tracking-tight mb-2">{mission.title}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 leading-relaxed">{mission.description}</p>
                        <button className={clsx(
                           "w-full py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                           mission.status === 'CLAIMED' ? "bg-emerald-500/10 text-emerald-400 cursor-default" : "bg-white/5 text-slate-400 hover:bg-rose-500 hover:text-white"
                        )}>
                           {mission.status === 'CLAIMED' ? 'Completed' : 'Complete Mission'}
                        </button>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Right Column: AI Coach & Streaks */}
         <div className="lg:col-span-4 space-y-8">
            {/* AI Growth Coach */}
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Sparkles className="w-40 h-40" />
               </div>
               <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-rose-400 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> AI Growth Insights
               </h3>
               <div className="space-y-6 relative z-10">
                  <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/10">
                     <p className="text-xs font-bold text-slate-300 leading-relaxed italic mb-4">
                        "Your Critical Thinking score has improved by 15% this week. I recommend focusing on 'Ethics' today to balance your growth profile."
                     </p>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                           <Star className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Coach Gemini</span>
                     </div>
                  </div>
                  <div className="space-y-3">
                     {[
                        { label: "Habit Score", val: 92, color: "rose" },
                        { label: "Focus Rate", val: 84, color: "blue" },
                     ].map((s, i) => (
                        <div key={i} className="space-y-1.5">
                           <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400">
                              <span>{s.label}</span>
                              <span className="text-white">{s.val}%</span>
                           </div>
                           <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className={clsx("h-full rounded-full", `bg-${s.color}-500`)} style={{ width: `${s.val}%` }} />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Habit Streaks */}
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-500" /> Active Streaks
               </h3>
               <div className="space-y-4">
                  {habits.map((habit) => (
                     <div key={habit.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/30 transition-all group">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                              <Flame className="h-5 w-5" />
                           </div>
                           <div>
                              <p className="text-[10px] font-black text-white uppercase tracking-widest">{habit.name}</p>
                              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{habit.currentStreak} Day Streak</p>
                           </div>
                        </div>
                        <CheckCircle2 className={clsx(
                           "h-5 w-5",
                           habit.lastLoggedAt?.split('T')[0] === new Date().toISOString().split('T')[0] ? "text-emerald-500" : "text-slate-800"
                        )} />
                     </div>
                  ))}
               </div>
            </div>

            {/* Recent History */}
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <HistoryIcon className="h-4 w-4 text-rose-500" /> Recent Growth
               </h3>
               <div className="space-y-4">
                  {history.slice(0, 3).map((event) => (
                     <div key={event.id} className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <div>
                           <p className="text-[10px] font-bold text-slate-300 leading-tight mb-1">{event.description}</p>
                           <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest">+{event.xpEarned} XP</p>
                        </div>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-400 transition-colors">
                  View Full History
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
