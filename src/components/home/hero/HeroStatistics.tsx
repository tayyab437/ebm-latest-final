import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { HeroStatisticItem as StatsType } from "./hero.types";

interface HeroStatisticsProps {
  stats: StatsType[];
}

export const HeroStatistics: React.FC<HeroStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-slate-900/50 dark:border-slate-800/50">
      {stats.map((stat, idx) => {
        // Safe access to the Lucide icon
        const IconComponent = Icons[stat.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Award;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            className="flex flex-col p-4 rounded-xl bg-slate-900/30 border border-slate-900/50 backdrop-blur-sm hover:border-slate-800 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded bg-blue-500/10 text-blue-500">
                <IconComponent className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium text-slate-400 font-sans tracking-wide">
                {stat.label}
              </span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-bold text-slate-100 font-sans tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-blue-500">
                {stat.suffix}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
