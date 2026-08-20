import React from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { JourneyStageData } from "./journey.types";
import { JourneySubjects } from "./JourneySubjects";
import { JourneyAISection } from "./JourneyAISection";
import { JourneySkills } from "./JourneySkills";
import { JourneyStudyPlan } from "./JourneyStudyPlan";
import { JourneyStatistics } from "./JourneyStatistics";
import { panelFadeVariants, useReducedMotion } from "./JourneyAnimations";

interface JourneyPanelProps {
  stage: JourneyStageData;
}

export const JourneyPanel: React.FC<JourneyPanelProps> = ({ stage }) => {
  const isReduced = useReducedMotion();
  const MilestoneIcon = Icons[stage.expectedMilestone.badgeName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Award;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={isReduced ? { opacity: 1 } : "hidden"}
        animate="visible"
        exit="hidden"
        variants={panelFadeVariants}
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl space-y-8"
      >
        {/* Stage Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded">
                {stage.gradeLevel}
              </span>
              <span className="text-[11px] font-semibold text-slate-500 font-mono">
                Duration: {stage.duration}
              </span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2 font-sans">
              {stage.phaseName}
            </h3>
          </div>

          {/* Socratic Completion Percentage indicator */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest block font-mono">Curriculum Node</span>
              <span className="text-sm font-bold text-slate-300">{stage.completionPercentage}% Complete</span>
            </div>
            <div className="relative h-12 w-12 flex items-center justify-center bg-slate-950/40 rounded-full border border-slate-800">
              <svg className="absolute transform -rotate-90" width="48" height="48">
                <circle className="text-slate-900" strokeWidth="2.5" stroke="currentColor" fill="transparent" r="18" cx="24" cy="24" />
                <circle className="text-amber-500" strokeWidth="3" strokeDasharray={`${2 * Math.PI * 18}`} strokeDashoffset={`${2 * Math.PI * 18 * (1 - stage.completionPercentage / 100)}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="18" cx="24" cy="24" />
              </svg>
              <span className="text-xs font-bold text-slate-200">{stage.completionPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Long Overview & Quote */}
        <div className="space-y-4">
          <p className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
            {stage.longOverview}
          </p>

          <div className="p-4 rounded-xl bg-slate-950/45 border-l-2 border-amber-500 italic text-slate-400 text-xs sm:text-sm leading-relaxed">
            {stage.motivationalQuote}
          </div>
        </div>

        {/* Milestone Badge Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-950/40 border border-slate-800 flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500 flex-shrink-0 border border-amber-500/20">
            <MilestoneIcon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-mono">Stage Milestone Achievement</span>
            <h4 className="text-sm font-extrabold text-slate-200 mt-0.5">{stage.expectedMilestone.title}</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{stage.expectedMilestone.description}</p>
          </div>
        </div>

        {/* Subjects & Skill Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <JourneySubjects subjects={stage.subjects} />
          <JourneySkills skills={stage.skills} />
        </div>

        {/* Embedded Socratic AI Academic Helpers */}
        <JourneyAISection features={stage.aiFeatures} />

        {/* Weekly Study Planner summary */}
        <JourneyStudyPlan studyPlan={stage.studyPlan} />

        {/* Dynamic Success statistics from API service */}
        <JourneyStatistics stats={stage.statistics} />

      </motion.div>
    </AnimatePresence>
  );
};
