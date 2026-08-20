import React from "react";
import { motion } from "motion/react";
import { 
  GraduationCap, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Plus, 
  PenTool, 
  MessageSquare, 
  UserCheck, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";
import { WidgetCard } from "./WidgetCard";
import { TEACHER_WIDGETS } from "./dashboard.constants";

export const TeacherPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-violet-500/10 via-indigo-500/5 to-transparent border border-violet-500/10 dark:border-violet-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Mentor & Educator Workspace
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Dr. Amna Bukhari &bull; Lead Physics Mentor 🧑‍🏫
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Accelerated Cambridge Stream &bull; Socratic Curriculum Engine
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-100 dark:bg-violet-950/30 text-violet-800 dark:text-violet-400 rounded-lg text-xs font-semibold">
            <Sparkles className="h-4 w-4 text-violet-500" />
            <span>AI Copilot Active</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-violet-600/10">
            <Plus className="h-4 w-4" />
            <span>New Socratic Quiz</span>
          </button>
        </div>
      </div>

      {/* Grid containing Teacher widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TEACHER_WIDGETS.map((widget) => (
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

      {/* Grid Layout for Active Classes & Students Needing Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns - Active Classes and Submissions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Accelerated Classes */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4">
              Today's Accelerated Socratic Classes
            </h4>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold text-sm">
                    PH
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      Cambridge Mechanics Section 1
                    </h5>
                    <p className="text-xs text-slate-400">14:00 - 15:30 &bull; 14 Students Live</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 rounded-lg text-2xs font-bold">
                    Ongoing
                  </span>
                  <button className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-50 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-lg text-2xs font-semibold">
                    Launch Interactive Classroom
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-950/40 flex items-center justify-center text-sky-700 dark:text-sky-400 font-bold text-sm">
                    MA
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                      CIE Accelerated Pure Mathematics
                    </h5>
                    <p className="text-xs text-slate-400">16:30 - 18:00 &bull; 18 Students Registered</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-2xs font-bold">
                    Upcoming
                  </span>
                  <button className="px-3 py-1.5 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-2xs font-semibold">
                    Review Lecture Slides
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Teaching Assistant (Curriculum generator helper mockup) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-violet-500" />
                <span>AI Teacher Assistant</span>
              </h4>
              <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">Drafting Assistant ready</span>
            </div>
            <div className="p-4 bg-violet-500/5 border border-violet-500/10 rounded-xl space-y-3">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Generate Socratic Quiz on Newtonian Motion:
              </div>
              <div className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-100 dark:border-slate-900 text-2xs text-slate-500 font-mono space-y-2">
                <p className="font-bold text-slate-800 dark:text-slate-200">Drafted Question #1 (Socratic Recitation):</p>
                <p>"An object decelerates uniformly at 2.5 m/s². Describe, using your own words, how this affects the final kinetic momentum curve."</p>
                <div className="flex gap-2 text-3xs pt-1 border-t border-slate-100 dark:border-slate-900">
                  <span className="text-indigo-500">Includes Active Recall Check</span>
                  <span className="text-blue-500">Expected Score threshold: 85%</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-2xs font-semibold">
                  Publish to Class
                </button>
                <button className="px-3 py-1.5 border border-violet-200 dark:border-violet-800 hover:bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-lg text-2xs font-semibold">
                  Regenerate Socratic Prompts
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Attention Alerts, Submissions queue */}
        <div className="space-y-6">
          {/* Students Needing Attention Metric Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              <span>Priority Alerts (2 Students)</span>
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3 items-center p-3 bg-rose-500/5 rounded-xl border border-rose-500/10">
                <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950/30 flex items-center justify-center text-rose-600 font-bold text-xs">
                  ZH
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Zayn Hashmi</h5>
                  <p className="text-3xs text-rose-600">Streak broken &bull; 2 homeworks late</p>
                </div>
              </div>

              <div className="flex gap-3 items-center p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center text-amber-600 font-bold text-xs">
                  AY
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Ayyan Yousuf</h5>
                  <p className="text-3xs text-amber-600">Cognitive Focus log dropped below 80%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Socratic Discussion Center alerts */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-indigo-500" />
              <span>Recent Community Questions</span>
            </h4>
            <div className="space-y-3">
              <div className="text-2xs border-b border-slate-100 dark:border-slate-800 pb-2">
                <p className="font-bold text-slate-700 dark:text-slate-300">"Socratic pointers on complex polynomials?"</p>
                <p className="text-slate-400 mt-0.5">Asked by Areeba Shah in Mathematics Circle &bull; 2h ago</p>
              </div>
              <div className="text-2xs">
                <p className="font-bold text-slate-700 dark:text-slate-300">"Help with carboxylic acids equation loop?"</p>
                <p className="text-slate-400 mt-0.5">Asked by Daniyal Latif in Chemistry Lab &bull; 4h ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
