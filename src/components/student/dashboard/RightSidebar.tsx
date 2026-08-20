import React from "react";
import { QuickActions } from "./QuickActions";
import { StudyTimer } from "./StudyTimer";
import { LearningQuote } from "./LearningQuote";
import { useDashboardStore } from "./dashboard.store";
import { Sparkles, ArrowRight } from "lucide-react";

export function RightSidebar() {
  const { data } = useDashboardStore();

  return (
    <div className="space-y-6">
      <StudyTimer />
      <LearningQuote />
      
      {/* AI Mini Recommendation */}
      {data?.aiRecommendations && data.aiRecommendations.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <h3 className="text-[10px] font-bold tracking-widest text-indigo-100 uppercase">AI Suggestion</h3>
            </div>
            <p className="text-sm font-semibold mb-1">{data.aiRecommendations[0].title}</p>
            <p className="text-[10px] text-indigo-100 mb-4 leading-relaxed line-clamp-2">
              {data.aiRecommendations[0].description}
            </p>
            <button className="flex items-center justify-between w-full bg-white/20 hover:bg-white/30 px-3 py-2 rounded-xl text-xs font-bold transition-colors">
              <span>{data.aiRecommendations[0].actionLabel}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <QuickActions />
    </div>
  );
}
