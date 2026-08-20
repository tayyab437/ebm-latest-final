import React from "react";
import { BarChart3, TrendingUp, Users, GraduationCap, DollarSign, ArrowUpRight, ArrowDownRight, Target, Brain, Search, Filter } from "lucide-react";

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Enterprise Analytics</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Strategic Insights, Performance Metrics & Growth Tracking</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none">
             <option>Last 30 Days</option>
             <option>Last Quarter</option>
             <option>Last Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: "Student Retention", value: "98.2%", trend: "+2.1%", icon: Users, color: "blue" },
           { label: "Academic Efficiency", value: "84.5%", trend: "+5.4%", icon: Target, color: "indigo" },
           { label: "AI Engine Impact", value: "72%", trend: "+12%", icon: Brain, color: "purple" },
           { label: "Revenue Growth", value: "18.4%", trend: "-1.2%", icon: DollarSign, color: "emerald" },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center gap-0.5 text-[10px] font-black ${stat.trend.includes("+") ? "text-emerald-600" : "text-rose-600"}`}>
                   {stat.trend}
                   {stat.trend.includes("+") ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                </div>
             </div>
             <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
             <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <div className="flex items-center justify-between mb-8">
               <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Growth Trajectory
               </h3>
               <div className="flex gap-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-blue-500" /> Admissions
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <div className="w-2 h-2 rounded-full bg-slate-200" /> Target
                  </div>
               </div>
            </div>
            {/* Visual Placeholder for Chart */}
            <div className="h-64 flex items-end gap-2 px-4">
               {[40, 60, 45, 70, 85, 65, 90, 75, 95, 80, 100, 85].map((val, i) => (
                 <div key={i} className="flex-1 bg-slate-100 rounded-t-lg relative group transition-all hover:bg-blue-600" style={{ height: `${val}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                       {val}%
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-6 flex justify-between px-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <span>Jan</span>
               <span>Jun</span>
               <span>Dec</span>
            </div>
         </div>

         <div className="bg-[#0F172A] rounded-3xl p-8 text-white">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] mb-8 text-blue-400">Demographic Distribution</h3>
            <div className="space-y-6">
               {[
                 { label: "Middle School (Grades 5-8)", percentage: 45, color: "blue" },
                 { label: "O Level Candidates", percentage: 35, color: "indigo" },
                 { label: "Accelerated Path (3-Year)", percentage: 20, color: "emerald" },
               ].map((dist, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                       <span>{dist.label}</span>
                       <span className="text-white">{dist.percentage}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                       <div className={`h-full bg-${dist.color}-500 rounded-full transition-all duration-1000`} style={{ width: `${dist.percentage}%` }} />
                    </div>
                 </div>
               ))}
            </div>
            <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-3 gap-4">
               <div className="text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Avg. GPA</p>
                  <p className="text-lg font-black text-white mt-1">3.85</p>
               </div>
               <div className="text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grad Rate</p>
                  <p className="text-lg font-black text-white mt-1">99%</p>
               </div>
               <div className="text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Placement</p>
                  <p className="text-lg font-black text-white mt-1">94%</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
