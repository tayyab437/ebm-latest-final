import React from "react";
import { useExamStore } from "./exam.store";
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Users, 
  Zap, 
  Brain, 
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import clsx from "clsx";

export function ExamAnalytics() {
  const data = [
    { name: 'Jan', score: 65, avg: 60 },
    { name: 'Feb', score: 72, avg: 62 },
    { name: 'Mar', score: 85, avg: 65 },
    { name: 'Apr', score: 78, avg: 68 },
    { name: 'May', score: 92, avg: 70 },
    { name: 'Jun', score: 88, avg: 72 },
  ];

  const competencyData = [
    { name: 'Critical Thinking', value: 85 },
    { name: 'Creativity', value: 72 },
    { name: 'Collaboration', value: 90 },
    { name: 'AI Literacy', value: 65 },
    { name: 'Ethics', value: 80 },
  ];

  const COLORS = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Global Analytics</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Real-time Performance Intelligence & Predictive Modeling</p>
        </div>
        <div className="flex items-center gap-3">
           <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl flex items-center gap-2">
              <Calendar className="h-4 w-4 text-rose-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Last 6 Months</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: "Overall Mastery", val: "84.2%", trend: "+5.4%", icon: Target, color: "rose" },
           { label: "Subject Rank", val: "#4", trend: "Top 2%", icon: Zap, color: "blue" },
           { label: "Improvement Rate", val: "12.5%", trend: "+2.1%", icon: TrendingUp, color: "emerald" },
         ].map((stat, i) => (
            <div key={i} className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-8 relative overflow-hidden group">
               <div className="flex items-center justify-between mb-6">
                  <div className={clsx("p-4 rounded-2xl", `bg-${stat.color}-500/10 text-${stat.color}-400`)}>
                     <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                     <ArrowUpRight className="h-3 w-3" />
                     <span className="text-[9px] font-black">{stat.trend}</span>
                  </div>
               </div>
               <p className="text-4xl font-black text-white tracking-tighter mb-1">{stat.val}</p>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-rose-500" />
                  Performance Velocity
               </h3>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-rose-500" />
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Personal</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-slate-700" />
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Avg</span>
                  </div>
               </div>
            </div>
            <div className="h-[400px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                     <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }}
                     />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '10px', fontWeight: '900' }}
                     />
                     <Area type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorScore)" />
                     <Area type="monotone" dataKey="avg" stroke="#334155" strokeWidth={2} fillOpacity={0} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-10">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10 flex items-center gap-2">
                  <Brain className="h-4 w-4 text-rose-500" /> Competency Split
               </h3>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={competencyData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={100}
                           paddingAngle={8}
                           dataKey="value"
                        >
                           {competencyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                        </Pie>
                        <Tooltip 
                           contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                        />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-8 space-y-3">
                  {competencyData.map((c, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{c.name}</span>
                        </div>
                        <span className="text-xs font-black text-white">{c.value}%</span>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-rose-500/20">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Sparkles className="w-40 h-40" />
               </div>
               <div className="relative z-10">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 text-rose-100">AI Growth Prediction</h4>
                  <p className="text-sm font-bold leading-relaxed mb-8">
                     "At your current trajectory, you are projected to reach 'Innovator' status by mid-August. Maintaining consistent performance in Logic tests will accelerate this by 2 weeks."
                  </p>
                  <button className="w-full py-4 bg-white text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">
                     View Forecast Details
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
