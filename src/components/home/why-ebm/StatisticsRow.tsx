import React from "react";
import * as Icons from "lucide-react";
import { StatisticItemData } from "./why-ebm.types";

interface StatisticsRowProps {
  statistics: StatisticItemData[];
}

export const StatisticsRow: React.FC<StatisticsRowProps> = ({ statistics }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 pt-10 border-t border-slate-200">
      {statistics.map((stat) => {
        const IconComponent = Icons[stat.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Compass;

        return (
          <div
            key={stat.id}
            className="p-4 rounded-xl bg-white border border-slate-200/80 text-center flex flex-col items-center justify-between shadow-sm"
          >
            <div className="text-blue-600 mb-2">
              <IconComponent className="w-5 h-5" />
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-extrabold tracking-tight text-slate-800 font-sans">
                {stat.value}
                <span className="text-blue-600 text-base">{stat.suffix}</span>
              </div>
              
              <div className="text-[11px] font-semibold text-slate-500 font-sans leading-tight">
                {stat.label}
              </div>
            </div>

            <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};
