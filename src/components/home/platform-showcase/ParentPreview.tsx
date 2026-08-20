import React from "react";
import { motion } from "motion/react";
import { 
  LineChart, 
  Flame, 
  Target, 
  Mail, 
  HeartHandshake, 
  MessageSquare, 
  Bell, 
  ArrowRight, 
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";
import { WidgetCard } from "./WidgetCard";
import { PARENT_WIDGETS } from "./dashboard.constants";

export const ParentPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-indigo-500/10 via-pink-500/5 to-transparent border border-indigo-500/10 dark:border-indigo-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Parent Monitoring & Support Environment
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Guardian Portal &bull; Sarah Malik 👧
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Active monitoring of Sarah's accelerated Cambridge path and continuous assessment feedback.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-400 rounded-lg text-xs font-semibold">
            <HeartHandshake className="h-4 w-4 text-indigo-500" />
            <span>Weekly Progress Sync</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-indigo-600/10">
            <span>Socratic Mentor Chat</span>
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid containing Parent Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PARENT_WIDGETS.map((widget) => (
          <WidgetCard
            key={widget.id}
            title={widget.title}
            value={widget.value}
            subtitle={widget.subtitle}
            type={widget.type}
            iconName={widget.iconName}
            badge={widget.badge}
          />
        ))}
      </div>

      {/* Main dashboard body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Learning Habits & Progress Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Learning Stats Summary */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Performance Telemetry & Metrics
              </h4>
              <span className="px-2 py-0.5 rounded-full text-3xs font-semibold bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400">
                Excellent Pace
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-2xs font-bold uppercase text-slate-400">Attendance Rate</span>
                <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400">98.6%</p>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "98.6%" }} />
                </div>
                <p className="text-3xs text-slate-400">Zero missed classes in past 30 days.</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-2xs font-bold uppercase text-slate-400">Average Quiz Score</span>
                <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">91.2%</p>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: "91.2%" }} />
                </div>
                <p className="text-3xs text-slate-400">Highest Score: Math Drill (98%).</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-2xs font-bold uppercase text-slate-400">Active Study Hours</span>
                <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">18.5 hrs</p>
                <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: "85%" }} />
                </div>
                <p className="text-3xs text-slate-400">Avg. 2.6 hours of active recall per day.</p>
              </div>
            </div>
          </div>

          {/* Socratic Learning Habits Analysis */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span>Socratic Cognitive Habits Map</span>
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Self-Correction Skill</span>
                  <span className="text-blue-500 font-bold">92% &bull; Advanced</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "92%" }} />
                </div>
                <p className="text-2xs text-slate-400">
                  Sarah identifies her own math factoring errors immediately when prompted by the AI Tutor.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Active Recitation Index</span>
                  <span className="text-indigo-500 font-bold">85% &bull; Proficient</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: "85%" }} />
                </div>
                <p className="text-2xs text-slate-400">
                  Engages thoroughly in spoken essay reasoning practices on the EBM chat console.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Alerts, Communications, Monthly PDF Reports */}
        <div className="space-y-6">
          {/* Notifications & Action items */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4 text-rose-500" />
              <span>Recent Alerts</span>
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-l-4 border-l-indigo-500 border border-slate-100 dark:border-slate-800 rounded-r-xl">
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className="font-bold text-indigo-600">Socratic Report</span>
                  <span className="text-slate-400">2h ago</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  Chemistry Organic Chain Quiz completed with score: <strong className="text-blue-600">95%</strong>.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-l-4 border-l-amber-500 border border-slate-100 dark:border-slate-800 rounded-r-xl">
                <div className="flex items-center justify-between text-2xs mb-1">
                  <span className="font-bold text-amber-600">Upcoming Test</span>
                  <span className="text-slate-400">1 day ago</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  CIE Mock Pure Math quiz scheduled for June 30th at 14:00.
                </p>
              </div>
            </div>
          </div>

          {/* Monthly Socratic Reports & PDFs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
              Monthly Academic Reports
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              Verified evaluations signed by Lead EBM Academic Mentors.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">May 2026 EBM Audit</h5>
                  <p className="text-3xs text-slate-400">Pace: Accelerated Math & Chemistry</p>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-indigo-500">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">April 2026 EBM Audit</h5>
                  <p className="text-3xs text-slate-400">Pace: Baseline Cognitive Setup</p>
                </div>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-indigo-500">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
