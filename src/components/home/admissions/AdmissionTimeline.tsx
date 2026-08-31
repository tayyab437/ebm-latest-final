import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { ADMISSION_STEPS_DATA } from "./admissions.data";
import { STAGGER_CONTAINER_VARIANTS, FADE_IN_UP_VARIANTS } from "./animations";

import satinBg from "../../../assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

// Type-safe Lucide dynamic icon retriever
const StepIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export const AdmissionTimeline: React.FC = () => {
  return (
    <div className="relative py-8 select-none" id="admissions-timeline-section">
      
      {/* Background ambient light effects */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[350px] bg-gradient-to-r from-blue-500/10 via-amber-500/5 to-purple-500/10 blur-[120px] pointer-events-none" />

      <motion.div 
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-14 relative z-10"
      >
        {ADMISSION_STEPS_DATA.map((step, index) => {
          // Glow style per column
          const colIndex = index % 3;
          let glowColorClass = "";
          let lineGradientClass = "";
          
          if (colIndex === 0) {
            // Neon cyan/blue glow for left column
            glowColorClass = "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]";
            lineGradientClass = "bg-gradient-to-b from-cyan-400/0 via-cyan-400/40 to-cyan-400/0";
          } else if (colIndex === 1) {
            // Neon gold/amber glow for middle column
            glowColorClass = "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]";
            lineGradientClass = "bg-gradient-to-b from-amber-400/0 via-amber-400/40 to-amber-400/0";
          } else {
            // Warm orange/bronze glow for right column
            glowColorClass = "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.25)]";
            lineGradientClass = "bg-gradient-to-b from-orange-400/0 via-orange-400/40 to-orange-400/0";
          }

          return (
            <motion.div
              key={step.id}
              variants={FADE_IN_UP_VARIANTS}
              whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.3 } }}
              className={`group relative flex flex-col items-center text-center p-8 rounded-[28px] overflow-hidden border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-300 bg-cover bg-center ${glowColorClass}`}
              style={{ backgroundImage: `url(${satinBg})` }}
            >
              {/* Dark luxury gradient overlays for text readability & rich contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/60 to-slate-950/90 pointer-events-none z-0" />
              <div className="absolute inset-0 bg-slate-950/15 backdrop-blur-[0.5px] pointer-events-none z-0" />

              {/* Laser glow accent line at the left side */}
              <div className={`absolute left-0 top-0 bottom-0 w-[1.5px] ${lineGradientClass} z-10`} />
              
              {/* Laser glow accent line at the right side */}
              <div className={`absolute right-0 top-0 bottom-0 w-[1.5px] ${lineGradientClass} z-10`} />

              {/* Step indicator metal-badge top left */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-b from-[#e2e8f0]/95 to-[#cbd5e1]/90 dark:from-slate-800/95 dark:to-slate-900/90 border border-white/20 dark:border-white/5 rounded-[6px] text-[10px] font-mono font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase shadow-md shadow-black/30">
                STEP 0{step.stepNumber}
              </div>

              {/* Concentric Double Circle Wreath with Laurel leaves wrapper */}
              <div className="relative w-20 h-20 flex items-center justify-center mb-5 z-10">
                {/* Rotating decorative dashed circle */}
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 animate-[spin_55s_linear_infinite]" />
                
                {/* Gold inner glow circles */}
                <div className="absolute inset-1.5 rounded-full border border-amber-500/35 shadow-[0_0_15px_rgba(245,158,11,0.2)]" />
                <div className="absolute inset-2.5 rounded-full border border-amber-500/10" />

                {/* Classical Laurel Wreath Branches SVG */}
                <svg className="absolute inset-0 w-full h-full text-amber-500/40" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  {/* Left Wreath Branch */}
                  <path d="M 32,72 C 22,62 22,38 32,28" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 30,66 L 25,63" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 27,56 L 22,54" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 28,46 L 23,45" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 30,36 L 25,36" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Right Wreath Branch */}
                  <path d="M 68,72 C 78,62 78,38 68,28" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 70,66 L 75,63" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 73,56 L 78,54" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 72,46 L 77,45" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 70,36 L 75,36" strokeWidth="1.5" strokeLinecap="round" />
                </svg>

                {/* Glowing Icon */}
                <div className="relative z-10 flex items-center justify-center p-3 bg-white/5 dark:bg-slate-900/40 backdrop-blur-md rounded-full shadow-[inset_0_1px_3px_rgba(255,255,255,0.15)] border border-white/15">
                  <StepIcon name={step.iconName} className="w-6 h-6 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
                </div>
              </div>

              {/* Title & Description */}
              <div className="relative z-10 space-y-2 mb-6 flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-serif text-white tracking-wide font-normal group-hover:text-amber-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/80 font-sans leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Duration badge rounded button at the bottom */}
              <div className="relative z-10 mt-auto px-4.5 py-1.5 bg-[#070b13]/85 dark:bg-[#02060f]/90 border border-white/10 dark:border-slate-800 rounded-full text-[11px] font-mono font-semibold tracking-wider text-amber-200 uppercase shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]">
                {step.duration}
              </div>
            </motion.div>
          );
        })}
      </motion.div>



    </div>
  );
};

export default AdmissionTimeline;
