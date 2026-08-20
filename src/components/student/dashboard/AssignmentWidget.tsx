import React from "react";
import { useDashboardStore } from "./dashboard.store";
import { FileText, CheckCircle2, Clock } from "lucide-react";
import clsx from "clsx";

export function AssignmentWidget() {
  const { data } = useDashboardStore();

  if (!data || data.recentAssignments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full flex items-center justify-center text-slate-400">
        <p className="text-sm font-medium">No pending assignments</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Assignments</h3>
          <p className="text-[10px] font-medium text-slate-500">Your recent and upcoming tasks</p>
        </div>
        <button className="text-[10px] font-bold text-slate-500 hover:text-slate-800 bg-slate-50 px-2 py-1 rounded-md">View All</button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {data.recentAssignments.map((assignment) => {
          const isPending = assignment.status === "PENDING";
          const isLate = assignment.status === "LATE";
          const isSubmitted = assignment.status === "SUBMITTED" || assignment.status === "REVIEWED";

          return (
            <div key={assignment.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
              <div className={clsx(
                "p-2 rounded-lg shrink-0 mt-0.5",
                isPending ? "bg-amber-100 text-amber-600" :
                isLate ? "bg-rose-100 text-rose-600" :
                "bg-emerald-100 text-emerald-600"
              )}>
                {isSubmitted ? <CheckCircle2 className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {assignment.title}
                </h4>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5 line-clamp-1">{assignment.subjectName}</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <span className={clsx(
                    "text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
                    isPending ? "bg-amber-50 text-amber-600" :
                    isLate ? "bg-rose-50 text-rose-600" :
                    "bg-emerald-50 text-emerald-600"
                  )}>
                    {assignment.status}
                  </span>
                  
                  {!isSubmitted && (
                    <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Due {new Date(assignment.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
