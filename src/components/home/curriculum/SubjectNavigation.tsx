import React from "react";
import { motion } from "motion/react";
import { SubjectData } from "./curriculum.types";
import { SubjectCard } from "./SubjectCard";
import { listContainerVariants, listItemVariants, useReducedMotion } from "./animations";

interface SubjectNavigationProps {
  subjects: SubjectData[];
  selectedId: string;
  onSelectSubject: (id: string) => void;
}

export const SubjectNavigation: React.FC<SubjectNavigationProps> = ({
  subjects,
  selectedId,
  onSelectSubject,
}) => {
  const isReduced = useReducedMotion();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
          Cambridge Syllabus Modules
        </h3>
        <span className="text-[10px] bg-amber-500/10 text-amber-400 font-mono px-2 py-0.5 rounded border border-amber-500/10">
          9 Tracks Active
        </span>
      </div>

      {/* Mobile Horizontal Swipeable Container / Desktop Vertical Sidebar list */}
      <motion.div
        variants={listContainerVariants}
        initial={isReduced ? "visible" : "hidden"}
        animate="visible"
        className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {subjects.map((subj) => (
          <motion.div
            key={subj.id}
            variants={isReduced ? undefined : listItemVariants}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-full"
          >
            <SubjectCard
              subject={subj}
              isSelected={subj.id === selectedId}
              onSelect={() => onSelectSubject(subj.id)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
