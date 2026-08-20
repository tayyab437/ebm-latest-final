import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { Calendar as CalendarIcon, Clock, BookOpen, AlertCircle } from "lucide-react";
import clsx from "clsx";

export function CalendarWidget() {
  const { data } = useDashboardStore();

  if (!data || data.calendarEvents.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full flex flex-col items-center justify-center text-slate-400">
        <CalendarIcon className="h-8 w-8 mb-2 opacity-20" />
        <p className="text-sm font-medium">No upcoming events</p>
      </div>
    );
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "LESSON": return <BookOpen className="h-4 w-4 text-emerald-500" />;
      case "DEADLINE": return <AlertCircle className="h-4 w-4 text-rose-500" />;
      case "ASSESSMENT": return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <CalendarIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Learning Calendar</h3>
          <p className="text-[10px] font-medium text-slate-500">Upcoming sessions and deadlines</p>
        </div>
        <button className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded-md">Full Calendar</button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {data.calendarEvents.map((event) => (
          <div key={event.id} className="flex gap-3 items-start group">
            <div className="flex flex-col items-center min-w-[3rem] mt-0.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <span className="text-lg font-black text-slate-700 leading-none mt-1">
                {new Date(event.date).getDate()}
              </span>
            </div>
            
            <div className="flex-1 bg-slate-50 group-hover:bg-slate-100 transition-colors rounded-xl p-3 border border-slate-100 group-hover:border-slate-200 cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{event.title}</h4>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">{event.subjectName}</p>
                </div>
                {getEventIcon(event.type)}
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Clock className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500">{event.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
