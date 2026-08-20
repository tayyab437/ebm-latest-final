import React, { useEffect } from "react";
import { useCommunicationStore } from "../../communication/communication.store";
import { useDashboardStore } from "./dashboard.store";
import { DashboardView } from "./dashboard.types";
import { Megaphone, ArrowRight, Clock, User } from "lucide-react";
import clsx from "clsx";

export function AnnouncementsWidget() {
  const { announcements, fetchAnnouncements, isLoading } = useCommunicationStore();
  const { setView } = useDashboardStore();

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  // Get the last 3 announcements
  const latestAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  if (isLoading && announcements.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-slate-50 rounded-xl"></div>
          <div className="h-16 bg-slate-50 rounded-xl"></div>
          <div className="h-16 bg-slate-50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 p-5 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Latest Announcements</h3>
          <p className="text-[10px] font-medium text-slate-500">Official broadcasts and updates</p>
        </div>
        <button 
          onClick={() => setView(DashboardView.ANNOUNCEMENTS)}
          className="text-[10px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
        >
          View All <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-1">
        {latestAnnouncements.length > 0 ? (
          latestAnnouncements.map((ann) => (
            <div 
              key={ann.id} 
              className="group bg-slate-50 hover:bg-white hover:shadow-md hover:border-rose-100 transition-all rounded-xl p-3 border border-slate-100 cursor-pointer"
              onClick={() => setView(DashboardView.ANNOUNCEMENTS)}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-rose-600 transition-colors">
                  {ann.title}
                </h4>
                <Megaphone className="h-3 w-3 text-rose-500 shrink-0" />
              </div>
              
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                {ann.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="h-2 w-2 text-slate-500" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 truncate max-w-[80px]">
                    {ann.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="h-2.5 w-2.5" />
                  <span className="text-[9px] font-medium">
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-slate-400">
            <Megaphone className="h-8 w-8 mb-2 opacity-20" />
            <p className="text-xs font-medium">No announcements yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
