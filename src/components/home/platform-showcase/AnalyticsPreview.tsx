import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  LineChart, 
  TrendingUp, 
  Clock, 
  Flame, 
  Target, 
  ChevronRight, 
  Calendar, 
  BarChart4 
} from "lucide-react";
import { ANALYTICS_DATA } from "./dashboard.constants";

export const AnalyticsPreview: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-sky-500/10 via-blue-500/5 to-transparent border border-sky-500/10 dark:border-sky-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Advanced Socratic Telemetry
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Learning Progress Analytics 📈
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track daily attention coefficients, study hours, active recall progress metrics, and syllabus coverage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Weekly Scope</span>
          </div>
        </div>
      </div>

      {/* Grid Layout: Visual Chart on left, numeric widgets on right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* The Stripe/Linear styled telemetry graph */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Weekly Cognitive Focus Curve (%)
              </h4>
              <p className="text-xs text-slate-400">Attention span performance index matched across all active drills</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Active Recall Attention</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span>Base Study Limit</span>
              </span>
            </div>
          </div>

          {/* Premium visual chart container */}
          <div className="h-[280px] flex items-end justify-between gap-4 pt-10 relative">
            {/* Horizontal guideline markers */}
            <div className="absolute inset-x-0 bottom-0 border-b border-slate-100 dark:border-slate-800 w-full" />
            <div className="absolute inset-x-0 bottom-[25%] border-b border-slate-100 dark:border-slate-850 w-full" />
            <div className="absolute inset-x-0 bottom-[50%] border-b border-slate-100 dark:border-slate-850 w-full" />
            <div className="absolute inset-x-0 bottom-[75%] border-b border-slate-100 dark:border-slate-850 w-full" />
            <div className="absolute inset-x-0 top-0 border-b border-dashed border-slate-150 dark:border-slate-850 w-full" />

            {/* Render bars dynamically */}
            {ANALYTICS_DATA.map((item, index) => (
              <div 
                key={item.label} 
                className="flex-1 flex flex-col items-center group relative z-10 cursor-pointer h-full justify-end"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Secondary metric bar */}
                <div 
                  className="w-5 bg-slate-200 dark:bg-slate-800 rounded-t-lg transition-all duration-300"
                  style={{ height: `${item.secondaryValue}%` }}
                />

                {/* Main active recall bar */}
                <div 
                  className="w-3 bg-blue-500 dark:bg-blue-400 rounded-t-md -mt-2.5 hover:bg-blue-400 dark:hover:bg-blue-300 transition-all duration-300 absolute"
                  style={{ height: `${item.value}%`, bottom: 0 }}
                />

                {/* Floating precise value tooltip on hover */}
                {hoveredIndex === index && (
                  <div className="absolute bottom-full mb-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-3 py-1.5 rounded-lg text-3xs font-semibold shadow-lg z-20 whitespace-nowrap text-center">
                    <p className="font-bold text-xs">{item.value}% Attention</p>
                    <p className="text-slate-400 dark:text-slate-500 font-mono mt-0.5">Base: {item.secondaryValue}%</p>
                  </div>
                )}
                
                <span className="text-3xs font-semibold text-slate-500 dark:text-slate-400 mt-4 font-mono">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column details metrics */}
        <div className="space-y-6">
          {/* Completion Metrics & Subject distribution */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span>Subject Progress Logs</span>
            </h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Accelerated Mathematics</span>
                  <span className="font-bold text-blue-600">72%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "72%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Fundamental Chemistry</span>
                  <span className="font-bold text-sky-600">48%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-sky-500" style={{ width: "48%" }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">O-Level English Comprehension</span>
                  <span className="font-bold text-indigo-600">92%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: "92%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Socratic Attention Analysis feedback block */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cognitive Health</h4>
            <p className="text-2xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your average learning time is optimal at <strong className="text-sky-600 font-bold">2.4 hours/day</strong>. Attention retention is highest during active, dialogue-based worksheets.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
