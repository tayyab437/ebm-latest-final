import React from "react";
import { History, PlayCircle, CheckCircle2, Clock } from "lucide-react";
import clsx from "clsx";

export function HistoryView() {
  const historyItems = [
    { id: 1, title: "Types of Numbers", subject: "Mathematics", type: "VIDEO", time: "2 hours ago", duration: "15m" },
    { id: 2, title: "Set Theory Introduction", subject: "Mathematics", type: "QUIZ", time: "Yesterday", score: "85%" },
    { id: 3, title: "Kinematics Equations", subject: "Physics", type: "VIDEO", time: "2 days ago", duration: "25m" },
    { id: 4, title: "Grammar Rules", subject: "English Language", type: "LESSON", time: "3 days ago", duration: "40m" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Learning History</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Track your recent learning activities</p>
        </div>
        <button className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
          Clear History
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 p-6 shadow-sm">
        <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
          
          {historyItems.map((item, idx) => (
            <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-50 text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors">
                {item.type === "VIDEO" ? <PlayCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              </div>
              
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">{item.subject}</span>
                  <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.time}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded-md">
                    {item.type === "QUIZ" ? `Score: ${item.score}` : `Duration: ${item.duration}`}
                  </span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
