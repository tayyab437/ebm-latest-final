import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  TrendingUp, 
  Brain, 
  BookOpen, 
  UserCheck, 
  Award, 
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { TIMELINE_DATA } from "./success.data";

export const TransformationTimeline: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = TIMELINE_DATA[activeStageIndex];

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Student Transformation Timeline
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Observe how study habits, cognitive mastery, and confidence levels evolve through EBM&apos;s guided, deliberate learning model.
        </p>
      </div>

      {/* Main Grid: Selector Steps and Deep Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Timeline Navigation Steps (4 cols) */}
        <div className="lg:col-span-4 space-y-3 relative">
          {/* Connecting Line (Vertical on desktop, invisible on mobile) */}
          <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800 hidden lg:block" />

          {TIMELINE_DATA.map((stage, index) => {
            const isActive = index === activeStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(index)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 relative outline-none group ${
                  isActive
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/10"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-800 dark:text-slate-200"
                }`}
              >
                {/* Visual Step Marker */}
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 z-10 transition-colors ${
                    isActive
                      ? "bg-white text-blue-600"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:text-blue-500"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold truncate">
                      {stage.stageName}
                    </h4>
                    <span className={`text-[10px] shrink-0 ${isActive ? "text-blue-100" : "text-slate-400"}`}>
                      {stage.timeframe}
                    </span>
                  </div>
                </div>

                <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                  isActive ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: High Impact Detail Card (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Card Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Stage {activeStageIndex + 1} of 4
                  </span>
                  <h4 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">
                    {activeStage.stageName}
                  </h4>
                  <p className="text-xs font-mono text-slate-400">
                    Target Cycle: {activeStage.timeframe}
                  </p>
                </div>

                <div className="px-3.5 py-1.5 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl border border-blue-500/10 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-xs font-bold text-blue-800 dark:text-blue-400">
                    Interactive Preview
                  </span>
                </div>
              </div>

              {/* Grid of Key Transformation Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Confidence Level */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <UserCheck className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">Confidence Level</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.confidence}
                  </p>
                </div>

                {/* Study Habits */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <BookOpen className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">Study Habits</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.habits}
                  </p>
                </div>

                {/* Academic Growth */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <TrendingUp className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">Academic Performance</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.growth}
                  </p>
                </div>

                {/* Skill Development */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Brain className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">Skills & Mastery</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.skill}
                  </p>
                </div>

                {/* AI Dialogue Usage */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">AI Socratic Integration</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.aiUsage}
                  </p>
                </div>

                {/* Parent Feedback */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <MessageSquare className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-2xs font-bold uppercase tracking-wider">Parent Visibility</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-zinc-250 font-medium">
                    {activeStage.parentFeedback}
                  </p>
                </div>

              </div>

              {/* Bottom Achievement Spotlight Banner */}
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-3 mt-4">
                <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                    Key Achievement Spotlight
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {activeStage.achievement}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
