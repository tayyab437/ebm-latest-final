import React from "react";
import { BookOpen, Github, HeartHandshake, Lightbulb, HelpCircle } from "lucide-react";
import { COMMUNITY_IMPACT_DATA } from "./success.data";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "./animations";

const getIcon = (name: string, className = "h-5 w-5") => {
  switch (name) {
    case "BookOpen": return <BookOpen className={className} />;
    case "Github": return <Github className={className} />;
    case "HeartHandshake": return <HeartHandshake className={className} />;
    case "Lightbulb": return <Lightbulb className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const CommunityImpact: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Collective Contribution
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Our Shared Community Impact
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          EBM scholars don&apos;t learn in isolation. They actively tutor junior cohorts, submit open-source calculators, and spearhead reading challenges.
        </p>
      </div>

      {/* Grid of Community Metrics */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {COMMUNITY_IMPACT_DATA.map((metric) => (
          <motion.div
            key={metric.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 hover:scale-[1.02] transition-all duration-350"
          >
            <div className="space-y-3">
              <div className="p-2 w-fit bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
                {getIcon(metric.iconName)}
              </div>
              <div className="space-y-1">
                <span className="text-xl font-extrabold text-slate-900 dark:text-slate-50 font-mono">
                  {metric.value}
                </span>
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-205">
                  {metric.title}
                </h4>
              </div>
            </div>
            <p className="text-3xs text-zinc-450 mt-3 pt-3 border-t border-slate-100 dark:border-slate-850">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
