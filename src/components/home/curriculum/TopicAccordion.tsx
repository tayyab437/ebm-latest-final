import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Clock, Activity } from "lucide-react";
import { TopicGroup } from "./curriculum.types";

interface TopicAccordionProps {
  groups: TopicGroup[];
}

export const TopicAccordion: React.FC<TopicAccordionProps> = ({ groups }) => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(
    groups.length > 0 ? groups[0].id : null
  );

  const toggleGroup = (id: string) => {
    setExpandedGroupId((prev) => (prev === id ? null : id));
  };

  const difficultyStyles = {
    Beginner: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-900/60 pb-3">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
          Detailed Syllabus Breakdown
        </h4>
      </div>

      <div className="space-y-3">
        {groups.map((group) => {
          const isExpanded = expandedGroupId === group.id;
          const totalLessons = group.topics.reduce((sum, t) => sum + t.lessonCount, 0);

          return (
            <div
              key={group.id}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-slate-900/40 border-slate-800"
                  : "bg-slate-950/20 border-slate-900/80 hover:border-slate-800/60"
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                id={`accordion-trigger-${group.id}`}
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-4 text-left select-none"
              >
                <div className="space-y-1 min-w-0 pr-4">
                  <h5 className="text-xs font-bold text-slate-100 group-hover:text-white truncate">
                    {group.groupTitle}
                  </h5>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {group.estimatedDuration}
                    </span>
                    <span className="text-slate-700">&bull;</span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      {group.topics.length} core units ({totalLessons} lessons)
                    </span>
                  </div>
                </div>

                <div className="p-1 rounded-md bg-slate-950/80 border border-slate-800 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Accordion Body Content */}
              {isExpanded && (
                <div className="border-t border-slate-900 bg-slate-950/40 p-4 space-y-3 animate-fade-in">
                  {group.topics.map((topic) => (
                    <div
                      key={topic.id}
                      className="flex items-start justify-between gap-4 p-3 rounded-lg bg-slate-950/40 border border-slate-900/60 hover:border-slate-800/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <h6 className="text-[11px] font-bold text-slate-200">
                          {topic.title}
                        </h6>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-600" />
                            {topic.duration}
                          </span>
                          <span>&bull;</span>
                          <span>{topic.lessonCount} interactive steps</span>
                        </div>
                      </div>

                      <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border font-mono ${difficultyStyles[topic.difficulty]}`}>
                        {topic.difficulty}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
