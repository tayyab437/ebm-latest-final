import React from "react";
import { GraduationCap, Cpu, MessageSquare, FileSpreadsheet, Sparkles, HelpCircle } from "lucide-react";
import { CAREER_SKILLS_DATA } from "./success.data";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "./animations";

const getIcon = (name: string, className = "h-5 w-5") => {
  switch (name) {
    case "GraduationCap": return <GraduationCap className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "MessageSquare": return <MessageSquare className={className} />;
    case "FileSpreadsheet": return <FileSpreadsheet className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

export const CareerReadiness: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          Future-Proof Competence
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Beyond Exams: University & Career Readiness
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          How EBM prepares learners to excel in premium higher education and the modern, AI-integrated global economy.
        </p>
      </div>

      {/* Grid of Career Skills */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {CAREER_SKILLS_DATA.map((skill) => (
          <motion.div
            key={skill.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 hover:border-slate-300 dark:hover:border-zinc-700 hover:scale-[1.01] transition-all duration-300 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-2xl w-fit">
                {getIcon(skill.iconName)}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-bold text-slate-900 dark:text-slate-50">
                  {skill.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>

            {/* Benefit banner */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-850/80 flex items-start gap-2 text-2xs font-semibold text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{skill.benefit}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
