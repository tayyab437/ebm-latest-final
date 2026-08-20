import React from "react";
import { LineChart, BarChart2, TrendingUp, AlertTriangle, Zap, Target } from "lucide-react";

export function InsightsDashboard() {
  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Learning Insights</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Deep analysis of your learning patterns and performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Best Study Time</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">4:00 PM - 6:00 PM</div>
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +15% focus score
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Attention Span</h3>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Target className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mb-1">45 Minutes</div>
          <p className="text-xs text-slate-500 font-medium">Optimal session length</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800 text-sm">Risk Alert</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-sm font-bold text-slate-900 mb-1">Physics Conceptual Gap</div>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Struggling with 'Work & Energy' concepts across 3 recent assessments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80 flex flex-col">
           <h3 className="font-bold text-slate-800 text-sm mb-6">Subject Performance Trend</h3>
           <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
             <div className="flex items-center gap-2 text-slate-400">
               <LineChart className="h-5 w-5" /> <span className="text-sm font-medium">Chart Visualization</span>
             </div>
           </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-80 flex flex-col">
           <h3 className="font-bold text-slate-800 text-sm mb-6">AI Tool Usage</h3>
           <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center">
             <div className="flex items-center gap-2 text-slate-400">
               <BarChart2 className="h-5 w-5" /> <span className="text-sm font-medium">Chart Visualization</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
