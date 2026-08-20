import React, { useState } from "react";
import { motion } from "motion/react";
import { JOURNEY_STAGES } from "./journey.constants";
import { JourneyTimeline } from "./JourneyTimeline";
import { JourneyPanel } from "./JourneyPanel";
import { JourneyStage } from "./JourneyStage";
import { Sparkles } from "lucide-react";

export const JourneySection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>(JOURNEY_STAGES[0].id);
  const activeStage = JOURNEY_STAGES.find((s) => s.id === selectedStageId) || JOURNEY_STAGES[0];

  return (
    <section 
      id="journey" 
      className="relative py-24 bg-slate-950 overflow-hidden text-slate-100"
    >
      {/* Background visual fine patterns matching SaaS guidelines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[350px] h-[350px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching premium aesthetic */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400 font-sans tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Empirical Curriculum Mapping
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            One Learning Journey. <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Three Years.
            </span> <br className="sm:hidden" />
            Unlimited Possibilities.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-sans font-normal">
            Discover how the Ejaz Bukhari Method combines structured learning, AI guidance, continuous assessment, and personalized support to accelerate academic success while ensuring deep conceptual understanding rather than memorization.
          </p>
        </div>

        {/* Desktop & Tablet Timeline / Layout Column Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Timeline Column - 4/12 or 5/12 depending on density) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <JourneyTimeline 
              stages={JOURNEY_STAGES} 
              selectedStageId={selectedStageId} 
              onStageSelect={setSelectedStageId} 
            />
          </div>

          {/* Right Column (Dynamic Detailed Presentation Board) */}
          <div className="lg:col-span-8">
            <JourneyPanel stage={activeStage} />
          </div>
        </div>

        {/* Mobile View Layout (Swipeable / Touch-focused Stage Cards Selector + Stacked Panel) */}
        <div className="md:hidden space-y-8">
          {/* Swipe Indicator info */}
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold px-1 font-mono uppercase tracking-wider">
            <span>Scroll horizontally to select</span>
            <span className="animate-pulse">Swipe &rarr;</span>
          </div>

          {/* Touch horizontal list of Stages cards */}
          <div className="flex overflow-x-auto gap-4 pb-4 px-1 scrollbar-hide snap-x snap-mandatory">
            {JOURNEY_STAGES.map((stage, idx) => (
              <div key={stage.id} className="snap-center">
                <JourneyStage 
                  stage={stage} 
                  isActive={stage.id === selectedStageId} 
                  onSelect={() => setSelectedStageId(stage.id)} 
                  index={idx}
                />
              </div>
            ))}
          </div>

          {/* Stage information panel output */}
          <div className="px-1">
            <JourneyPanel stage={activeStage} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default JourneySection;
