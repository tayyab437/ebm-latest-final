import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ProgressChart() {
  const { data } = useDashboardStore();

  if (!data) return null;

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartData = data.statistics.weeklyStudyHours.map((hours, index) => ({
    name: days[index],
    hours,
    active: new Date().getDay() === (index + 1) % 7 // Highlight today (approximation for UI)
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Daily Online Time</h3>
          <p className="text-[10px] font-medium text-slate-500">Active study time in hours per day</p>
        </div>
        <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 outline-none">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b', fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
            />
            <Bar dataKey="hours" radius={[4, 4, 4, 4]} maxBarSize={32}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.active ? '#f59e0b' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
