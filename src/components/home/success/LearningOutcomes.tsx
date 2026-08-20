import React from "react";
import { OUTCOMES_DATA } from "./success.data";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "./animations";
import { Award, Brain, CheckCircle, Flame, Sparkles } from "lucide-react";

export const LearningOutcomes: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Cognitive Infographics
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Evaluated Cognitive Outcomes
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Unlike traditional exams that only measure memorization, EBM tracks six core dimensions of modern scholastic capability.
        </p>
      </div>

      {/* Main Grid: Info Cards on left, dynamic metric bars on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column (5 cols): Contextual Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <span>Multi-Dimensional Mastery</span>
            </h4>
            <p className="text-xs text-zinc-655 dark:text-zinc-350 leading-relaxed">
              Academic success is a combination of discipline, logical reasoning, and modern digital competence. We constantly evaluate these parameters through standard homework diagnostics and Socratic chatbot inputs.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-150 dark:border-slate-800/80">
              <div className="flex items-center gap-2 text-2xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                <span>94% average resilience index</span>
              </div>
              <div className="flex items-center gap-2 text-2xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                <span>Comprehensive digital prompt fluency</span>
              </div>
              <div className="flex items-center gap-2 text-2xs font-bold text-slate-700 dark:text-slate-300">
                <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                <span>Rigorous structured writing evaluations</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-blue-500 shrink-0" />
            <span className="text-3xs font-mono text-slate-500 dark:text-slate-400">
              *All cognitive diagnostics are updated in real-time within the student&apos;s personal and parent portal dashboards.
            </span>
          </div>
        </div>

        {/* Right column (7 cols): Graphical Gauge Progress Bars */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Average Mastery Indexes
          </h4>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-5"
          >
            {OUTCOMES_DATA.map((outcome) => (
              <motion.div key={outcome.id} variants={itemVariants} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{outcome.title}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{outcome.percentage}%</span>
                </div>
                
                {/* Visual Bar with animated width transition */}
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${outcome.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                    className={`absolute left-0 top-0 bottom-0 rounded-full bg-blue-500`}
                  />
                </div>

                <p className="text-[10px] text-zinc-450 leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
};
