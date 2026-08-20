import React from "react";
import { JourneyStatistic } from "./journey.types";

interface JourneyStatisticsProps {
  stats: JourneyStatistic[];
}

export const JourneyStatistics: React.FC<JourneyStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900/50">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="p-4 rounded-xl bg-slate-900/30 border border-slate-900/40 hover:border-slate-800 transition-colors duration-300"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-slate-100 font-sans tracking-tight">
              {stat.value}
            </span>
          </div>
          <span className="text-xs font-semibold text-amber-500 block mt-0.5">
            {stat.label}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block leading-normal">
            {stat.description}
          </span>
        </div>
      ))}
    </div>
  );
};
