import React from "react";
import { BookOpen, Calendar, CheckSquare, Compass } from "lucide-react";
import { JourneyStudyPlanData as StudyPlanType } from "./journey.types";

interface JourneyStudyPlanProps {
  studyPlan: StudyPlanType;
}

export const JourneyStudyPlan: React.FC<JourneyStudyPlanProps> = ({ studyPlan }) => {
  return (
    <div className="space-y-4">
      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
        Bespoke Weekly Study Plan
      </h5>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        
        <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-900 text-center">
          <BookOpen className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
          <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Study Hours</span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">{studyPlan.weeklyHours}h / wk</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-900 text-center">
          <Calendar className="w-5 h-5 text-blue-500 mx-auto mb-1.5" />
          <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Goals Set</span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">{studyPlan.monthlyGoalsCount} / mo</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-900 text-center">
          <CheckSquare className="w-5 h-5 text-sky-500 mx-auto mb-1.5" />
          <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Tasks Set</span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">{studyPlan.assignmentsCount} assignments</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/30 border border-slate-900 text-center">
          <Compass className="w-5 h-5 text-violet-500 mx-auto mb-1.5" />
          <span className="text-[10px] text-slate-500 uppercase font-bold block font-mono">Checkpoints</span>
          <span className="text-base font-bold text-slate-200 mt-0.5 block">{studyPlan.assessmentsCount} diagnostic</span>
        </div>

      </div>

      <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-300 leading-normal flex gap-2 items-start">
        <span className="font-extrabold uppercase font-mono tracking-wider text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">EBM Tip</span>
        <p className="font-sans italic">{studyPlan.recommendation}</p>
      </div>
    </div>
  );
};
