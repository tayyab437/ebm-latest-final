import React, { useState } from "react";
import { Sparkles, Compass } from "lucide-react";
import { SubjectNavigation } from "./SubjectNavigation";
import { SubjectDetails } from "./SubjectDetails";
import { CURRICULUM_SUBJECTS } from "./curriculum.constants";

export const CurriculumSection: React.FC = () => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    CURRICULUM_SUBJECTS[0].id
  );

  const selectedSubject = CURRICULUM_SUBJECTS.find(
    (subj) => subj.id === selectedSubjectId
  ) || CURRICULUM_SUBJECTS[0];

  return (
    <section
      id="subjects-curriculum"
      className="relative py-24 bg-slate-950 overflow-hidden text-slate-100 border-t border-slate-900"
    >
      {/* Background patterns matching SaaS aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 font-sans tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Rigorous Socratic Pathway
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Explore Your Learning Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-sans font-normal">
            Every subject is carefully designed using the Ejaz Bukhari Method to
            develop conceptual understanding, critical thinking, real-world
            problem solving, and examination success.
          </p>
        </div>

        {/* Desktop: Two columns layout (Left sidebar 35% & Right content panel 65%) */}
        {/* Tablet: Top-Down layout */}
        {/* Mobile: Horizontal swipe list & Content below */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Subject Selection list/tabs) */}
          <div className="lg:col-span-4 space-y-4 max-w-full overflow-hidden">
            <SubjectNavigation
              subjects={CURRICULUM_SUBJECTS}
              selectedId={selectedSubjectId}
              onSelectSubject={(id) => setSelectedSubjectId(id)}
            />
          </div>

          {/* Right Column (Dynamic details of selected subject) */}
          <div className="lg:col-span-8">
            <SubjectDetails subject={selectedSubject} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
