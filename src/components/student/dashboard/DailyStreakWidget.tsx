import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { Flame, AlertCircle, CheckCircle2, Circle } from "lucide-react";

export function DailyStreakWidget() {
  const { data } = useDashboardStore();

  if (!data) return null;

  const streakDays = data.statistics.learningStreakDays || 0;
  const loginHistory = data.statistics.loginHistory || [];

  // Generate the last 7 days dynamically
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i)); // From 6 days ago up to today
    const dateStr = d.toISOString().split("T")[0];
    const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
    const isToday = i === 6;
    const hasLoggedIn = loginHistory.includes(dateStr);
    return {
      dateStr,
      dayName,
      isToday,
      hasLoggedIn,
    };
  });

  const isActiveToday = last7Days[6].hasLoggedIn;

  return (
    <div id="daily-streak-widget" className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg shrink-0">
              <Flame className="h-4 w-4 animate-bounce" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Daily Learning Streak</h3>
          </div>
          {isActiveToday ? (
            <span className="text-[10px] font-black bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Active
            </span>
          ) : (
            <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Inactive
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-black text-slate-900 tracking-tight">
            {streakDays} {streakDays === 1 ? "Day" : "Days"}
          </span>
          <span className="text-xl">🔥</span>
        </div>

        <p className="text-xs text-slate-500 leading-normal mb-5">
          {streakDays > 1 
            ? "Fantastic! Keep logging in and studying daily to increase your streak count and earn bonus XP rewards."
            : "You have started a fresh streak today! Be sure to log in tomorrow to build your streak."}
        </p>

        {/* 7 Days History Timeline */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            Last 7 Days Activity
          </p>
          <div className="grid grid-cols-7 gap-1">
            {last7Days.map((day) => (
              <div key={day.dateStr} className="flex flex-col items-center">
                <span className={`text-[9px] font-bold mb-1.5 ${day.isToday ? 'text-orange-600 font-extrabold' : 'text-slate-400'}`}>
                  {day.dayName}
                </span>
                <div 
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    day.hasLoggedIn 
                      ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20" 
                      : day.isToday 
                        ? "border-2 border-dashed border-orange-300 text-orange-400 bg-white" 
                        : "bg-slate-200/60 text-slate-400"
                  }`}
                  title={`${day.dateStr}: ${day.hasLoggedIn ? 'Logged in' : 'No activity'}`}
                >
                  {day.hasLoggedIn ? (
                    <Flame className="h-4 w-4" />
                  ) : (
                    <span className="text-[9px] font-semibold">{day.isToday ? "!" : ""}</span>
                  )}
                </div>
                {day.isToday && (
                  <span className="text-[8px] font-black text-orange-600 mt-1 uppercase tracking-tighter">
                    Today
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 bg-amber-50/70 border border-amber-200/50 rounded-xl p-3">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[10px] font-medium text-amber-800 leading-normal">
          <span className="font-bold">Streak Rule:</span> If you do not login for 1 day, your daily streak will break and reset to 1 day! Make daily learning a habit.
        </p>
      </div>
    </div>
  );
}
