import React, { useState } from "react";
import { 
  Flame, 
  Binary, 
  PenTool, 
  Beaker, 
  Cpu, 
  Lightbulb, 
  Users, 
  Calendar,
  Sparkles,
  Search,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { ACHIEVEMENTS_DATA } from "./success.data";
import { motion, AnimatePresence } from "motion/react";
import { containerVariants, itemVariants } from "./animations";

const getIcon = (name: string, className = "h-5 w-5") => {
  switch (name) {
    case "Flame": return <Flame className={className} />;
    case "Binary": return <Binary className={className} />;
    case "PenTool": return <PenTool className={className} />;
    case "Beaker": return <Beaker className={className} />;
    case "Cpu": return <Cpu className={className} />;
    case "Lightbulb": return <Lightbulb className={className} />;
    case "Users": return <Users className={className} />;
    case "Calendar": return <Calendar className={className} />;
    default: return <HelpCircle className={className} />;
  }
};

const getBadgeColors = (type: string) => {
  switch (type) {
    case "streak":
      return "from-orange-500/10 to-amber-500/5 text-orange-600 dark:text-orange-400 border-orange-500/20";
    case "academic":
      return "from-blue-500/10 to-indigo-500/5 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "creative":
      return "from-purple-500/10 to-pink-500/5 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "science":
      return "from-sky-500/10 to-indigo-500/5 text-sky-600 dark:text-sky-400 border-sky-500/20";
    case "ai":
      return "from-indigo-500/10 to-blue-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    case "critical":
      return "from-amber-500/10 to-yellow-500/5 text-amber-600 dark:text-amber-400 border-amber-500/20";
    case "community":
      return "from-indigo-500/10 to-cyan-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    case "attendance":
      return "from-rose-500/10 to-red-500/5 text-rose-600 dark:text-rose-400 border-rose-500/20";
    default:
      return "from-slate-500/10 to-slate-500/5 text-zinc-650 dark:text-zinc-405 border-slate-500/20";
  }
};

export const AchievementWall: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          The Achievement Wall
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          Gamified Scholastic Badges
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          EBM incorporates behavior-design principles to reward consistency, curiosity, and critical writing milestones with collectible badges.
        </p>
      </div>

      {/* Grid of badges */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {ACHIEVEMENTS_DATA.map((ach) => {
          const isSelected = selectedBadge === ach.id;
          const badgeColors = getBadgeColors(ach.badgeType);

          return (
            <motion.button
              key={ach.id}
              variants={itemVariants}
              onClick={() => setSelectedBadge(isSelected ? null : ach.id)}
              className={`p-5 rounded-2xl border text-center flex flex-col items-center justify-between transition-all duration-350 cursor-pointer relative group outline-none min-h-[170px] ${
                isSelected
                  ? "bg-slate-50 dark:bg-slate-800 border-blue-500 shadow-lg shadow-blue-500/5"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:scale-[1.02]"
              }`}
            >
              {/* Star corner indicator on hover */}
              <Sparkles className="absolute top-3 right-3 h-3.5 w-3.5 text-slate-300 dark:text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Circle Avatar wrapper */}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${badgeColors} flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                {getIcon(ach.iconName, "h-5 w-5")}
              </div>

              {/* Title & Description */}
              <div className="space-y-1 mt-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {ach.title}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 max-w-[150px] mx-auto">
                  {ach.description}
                </p>
              </div>

              {/* Click to expand hint */}
              <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {isSelected ? "Click to collapse" : "Click to inspect"}
              </span>

            </motion.button>
          );
        })}
      </motion.div>

      {/* Detail Showcase Panel of Selected Badge */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {(() => {
              const activeBadge = ACHIEVEMENTS_DATA.find(b => b.id === selectedBadge);
              if (!activeBadge) return null;
              const badgeColors = getBadgeColors(activeBadge.badgeType);

              return (
                <div className="p-6 bg-linear-to-r from-blue-500/5 via-indigo-500/5 to-transparent border border-blue-500/10 dark:border-blue-500/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${badgeColors} flex items-center justify-center border shrink-0`}>
                    {getIcon(activeBadge.iconName, "h-6 w-6")}
                  </div>
                  <div className="space-y-1 text-center sm:text-left">
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      Badge Specification: {activeBadge.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeBadge.description} This credential maps directly to the student&apos;s public EBM portfolio, validating their persistent self-study, analytical thinking speed, and collaborative peer achievements.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBadge(null)}
                    className="px-3 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-zinc-750 dark:text-slate-300 text-3xs font-bold rounded-lg transition-colors ml-auto cursor-pointer"
                  >
                    Clear Filter
                  </button>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
