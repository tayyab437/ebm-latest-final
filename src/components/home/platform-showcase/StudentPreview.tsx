import React from "react";
import { motion } from "motion/react";
import { 
  Flame, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  TrendingUp, 
  Award, 
  Compass, 
  ChevronLeft 
} from "lucide-react";
import { WidgetCard } from "./WidgetCard";
import { STUDENT_WIDGETS } from "./dashboard.constants";

export const StudentPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/10 dark:border-blue-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Student Environment
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Welcome back, Sarah! 👋
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            You are currently on track for the O-Level 3-Year Acceleration Path.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-100 dark:bg-orange-950/30 text-orange-800 dark:text-orange-400 rounded-lg text-xs font-semibold">
            <Flame className="h-4 w-4 fill-orange-500 stroke-orange-500" />
            <span>12 Day Streak</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-blue-600/10">
            <span>Continue Lesson</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid containing primary stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STUDENT_WIDGETS.map((widget) => (
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

      {/* Main double column dashboard interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Double-width Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Courses Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Active Accelerated Modules
              </h4>
              <span className="text-xs text-slate-400">3 Core Subjects Active</span>
            </div>

            <div className="space-y-4">
              {/* Mathematics */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/40 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-sm">
                    MA
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      CIE Pure Mathematics 1
                    </h5>
                    <p className="text-xs text-slate-400">Next: Quadratic Function Modeling</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">72% Completed</span>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-sky-500" style={{ width: "72%" }} />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>

              {/* Chemistry */}
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400 font-bold text-sm">
                    CH
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Accelerated Organic Chemistry
                    </h5>
                    <p className="text-xs text-slate-400">Next: Polymerization Socratic Drill</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">48% Completed</span>
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: "48%" }} />
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Progress charts mockup */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>Daily Study Objectives</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Active Time Target</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">45/60 min</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "75%" }} />
                </div>
                <p className="text-2xs text-slate-400">15 minutes more to hit your daily focus reward bonus!</p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">Practice Problems</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">8/10 Drill Sets</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "80%" }} />
                </div>
                <p className="text-2xs text-slate-400">Complete 2 more Socratic equations to rank in the Leaderboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Calendar & Upcoming Side column */}
        <div className="space-y-6">
          {/* Socratic mini achievements */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-500" />
              <span>Active Achievements</span>
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-600">
                  ⚡
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Super Scholar</h5>
                  <p className="text-2xs text-slate-400">Maintained a study streak for 10+ consecutive days.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-950/30 flex items-center justify-center text-sky-600">
                  🎯
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Math Scribe</h5>
                  <p className="text-2xs text-slate-400">Solved 100 socratic quadratic equations without error.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive study calendar view */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-indigo-500" />
                <span>Study Planner</span>
              </h4>
              <div className="flex gap-1 text-slate-400">
                <ChevronLeft className="h-4 w-4 cursor-pointer hover:text-slate-600" />
                <ChevronRight className="h-4 w-4 cursor-pointer hover:text-slate-600" />
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-400 mb-2">June 2026</div>
            <div className="grid grid-cols-7 gap-1 text-center text-2xs mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                <div key={i} className="font-bold text-slate-400">{d}</div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                    i === 11 
                      ? "bg-blue-600 text-white font-bold" 
                      : i % 5 === 0 
                        ? "bg-blue-50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400" 
                        : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-2xs">
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Interactive Socratic Seminar</span>
                </span>
                <span className="text-slate-400">14:00</span>
              </div>
              <div className="flex items-center justify-between text-2xs">
                <span className="flex items-center gap-1 text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>Cambridge Drill Review</span>
                </span>
                <span className="text-slate-400">16:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
