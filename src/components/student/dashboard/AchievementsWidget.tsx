import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { Trophy, Star } from "lucide-react";

export function AchievementsWidget() {
  const { data } = useDashboardStore();

  if (!data || data.achievements.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Recent Achievements</h3>
          <p className="text-[10px] font-medium text-slate-500">Badges and milestones earned</p>
        </div>
        <button className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded-md">View All</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.achievements.slice(0, 2).map((achievement) => (
          <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-amber-50/30 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-800 leading-tight">{achievement.title}</h4>
              <p className="text-[9px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                <Star className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                +{achievement.xpAwarded} XP
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
