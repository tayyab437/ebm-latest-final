import React from "react";
import { Award, ShieldCheck, Sparkles, Globe } from "lucide-react";
import { AWARDS_DATA } from "./success.data";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "./animations";

export const RecognitionAwards: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Global Recognition
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Institutional Recognition & Awards
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          EBM&apos;s digital learning model is validated by leading EdTech panels, curriculum standards federations, and pedagogical experts.
        </p>
      </div>

      {/* Grid of Awards */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {AWARDS_DATA.map((award) => (
          <motion.div
            key={award.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 relative group"
          >
            <span className="absolute top-4 right-4 text-4xs font-mono font-bold text-slate-400">
              {award.year}
            </span>

            <div className="space-y-4">
              <div className="p-2 w-fit bg-amber-500/10 text-amber-500 rounded-xl">
                <Award className="h-4 w-4" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {award.title}
                </h4>
                <p className="text-3xs text-slate-400">
                  {award.institution}
                </p>
              </div>
            </div>

            <p className="text-3xs text-slate-500 dark:text-zinc-450 mt-4 pt-3 border-t border-slate-100 dark:border-slate-850">
              {award.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
