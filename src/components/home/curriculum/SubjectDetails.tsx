import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { SubjectData } from "./curriculum.types";
import { SubjectStatistics } from "./SubjectStatistics";
import { TopicAccordion } from "./TopicAccordion";
import { SkillMatrix } from "./SkillMatrix";
import { ResourceGrid } from "./ResourceGrid";
import { AIToolsPanel } from "./AIToolsPanel";
import { CurriculumRoadmap } from "./CurriculumRoadmap";
import { contentFadeVariants, useReducedMotion } from "./animations";

interface SubjectDetailsProps {
  subject: SubjectData;
}

export const SubjectDetails: React.FC<SubjectDetailsProps> = ({ subject }) => {
  const isReduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState<"syllabus" | "resources" | "skills-career">("syllabus");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={subject.id}
        variants={isReduced ? undefined : contentFadeVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="space-y-6"
      >
        {/* Header Block with Glow */}
        <div className="relative p-6 rounded-2xl border border-slate-900 bg-slate-950/40 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.02] to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-400 font-mono uppercase tracking-wide">
                <Icons.Sparkles className="w-3.5 h-3.5" />
                Socratic Module Standard
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Code ID: {subject.id.replace("sub-", "CIE-")}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {subject.name} Complete Protocol
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {subject.overview.overview}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono font-bold text-slate-400">
              <span className="bg-slate-950 border border-slate-900 px-2.5 py-1 rounded">
                Prerequisites: {subject.overview.prerequisites?.join(", ") || "None"}
              </span>
              <span className="bg-slate-950 border border-slate-900 px-2.5 py-1 rounded text-amber-500">
                Cert: {subject.overview.certificationName}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Micro Stats Row */}
        <SubjectStatistics subject={subject} />

        {/* Dynamic Tabs Selector */}
        <div className="flex border-b border-slate-900/60 pb-px font-sans font-bold text-xs">
          {(["syllabus", "resources", "skills-career"] as const).map((tab) => (
            <button
              id={`details-tab-${tab}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 border-b-2 capitalize transition-all duration-200 select-none ${
                activeTab === tab
                  ? "border-amber-500 text-amber-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === "skills-career" ? "Skills & Careers" : tab}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <div className="space-y-6">
          {activeTab === "syllabus" && (
            <div className="space-y-6 animate-fade-in">
              {/* Learning Objectives */}
              <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono border-b border-slate-900/60 pb-3">
                  Core Socratic Objectives
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subject.overview.learningObjectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Icons.CheckCircle className="w-4 h-4 text-amber-500/80 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-sans">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable Topic Accordions */}
              <TopicAccordion groups={subject.topicGroups} />

              {/* Roadmap timeline */}
              <CurriculumRoadmap stages={subject.stages} />
            </div>
          )}

          {activeTab === "resources" && (
            <div className="space-y-6 animate-fade-in">
              {/* Resources Grid */}
              <ResourceGrid resources={subject.resources} />

              {/* Integrated AI tools list */}
              <AIToolsPanel tools={subject.aiTools} />

              {/* Core Study Commitment details */}
              <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono border-b border-slate-900/60 pb-3">
                  Active Learning Rhythm
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl text-center space-y-1">
                    <Icons.Calendar className="w-4 h-4 text-amber-500 mx-auto" />
                    <div className="text-[11px] font-bold text-slate-200">Weekly Commitment</div>
                    <p className="text-[10px] text-slate-400">{subject.overview.studyPlan.weeklyCommitment}</p>
                  </div>
                  <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl text-center space-y-1">
                    <Icons.Activity className="w-4 h-4 text-amber-500 mx-auto" />
                    <div className="text-[11px] font-bold text-slate-200">Assessments</div>
                    <p className="text-[10px] text-slate-400">{subject.overview.studyPlan.assessmentFrequency}</p>
                  </div>
                  <div className="p-3 bg-slate-950/40 border border-slate-900/60 rounded-xl text-center space-y-1">
                    <Icons.RotateCcw className="w-4 h-4 text-amber-500 mx-auto" />
                    <div className="text-[11px] font-bold text-slate-200">Revisions</div>
                    <p className="text-[10px] text-slate-400">{subject.overview.studyPlan.revisionStructure}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "skills-career" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              {/* Skill Matrix */}
              <SkillMatrix skills={subject.overview.skillsDeveloped} />

              {/* Career Opportunities */}
              <div className="bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono border-b border-slate-900/60 pb-3">
                    Future Career Pathways
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-normal">
                    This subject provides the analytical basis and accreditation needed to excel in leading scientific and technical domains.
                  </p>
                  <ul className="space-y-2.5">
                    {subject.overview.careerPathways.map((career, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <Icons.Compass className="w-4 h-4 text-amber-500" />
                        <span className="font-semibold">{career}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-900/60 flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <Icons.ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>CIE Board Syllabus Alignment Active</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
export default SubjectDetails;
