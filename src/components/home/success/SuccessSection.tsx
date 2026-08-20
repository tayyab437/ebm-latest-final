import React from "react";
import { ArrowRight } from "lucide-react";
import { TransformationTimeline } from "./TransformationTimeline";
import { StudentStoryCarousel } from "./StudentStoryCarousel";
import { ParentTestimonials } from "./ParentTestimonials";

interface SuccessSectionProps {
  onEnrollNow?: () => void;
}

const SuccessSection: React.FC<SuccessSectionProps> = ({ onEnrollNow }) => {
  return (
    <section 
      id="student-success-outcomes"
      className="py-24 bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Section 2: Student Transformation Timeline */}
        <div className="pt-4">
          <TransformationTimeline />
        </div>

        {/* Divider line */}
        <hr className="border-slate-150 dark:border-slate-900" />

        {/* Section 3: Featured Student Stories Carousel */}
        <div className="pt-4">
          <StudentStoryCarousel />
        </div>

        {/* Divider line */}
        <hr className="border-slate-150 dark:border-slate-900" />

        {/* Section 4: Parent Testimonials Carousel */}
        <div className="pt-4">
          <ParentTestimonials />
        </div>

        {/* Call to Action Anchor panel */}
        <div className="rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col items-center justify-center gap-8 w-full border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] select-none">
          {/* Plexus & Glow Ambient Background */}
          <div className="absolute inset-0 bg-[#040b19] z-0 overflow-hidden rounded-[32px]">
            <svg className="absolute inset-0 w-full h-full opacity-45 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="card-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#040b19" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#card-glow)" />
              
              {/* Interconnected plexus network */}
              <g stroke="#22d3ee" strokeWidth="0.75" strokeOpacity="0.25">
                <line x1="10%" y1="20%" x2="25%" y2="40%" />
                <line x1="25%" y1="40%" x2="15%" y2="70%" />
                <line x1="15%" y1="70%" x2="35%" y2="80%" />
                <line x1="35%" y1="80%" x2="50%" y2="55%" />
                <line x1="50%" y1="55%" x2="65%" y2="85%" />
                <line x1="65%" y1="85%" x2="85%" y2="60%" />
                <line x1="85%" y1="60%" x2="90%" y2="25%" />
                <line x1="90%" y1="25%" x2="70%" y2="15%" />
                <line x1="70%" y1="15%" x2="50%" y2="35%" />
                <line x1="50%" y1="35%" x2="25%" y2="40%" />
                <line x1="50%" y1="35%" x2="50%" y2="55%" />
                <line x1="70%" y1="15%" x2="85%" y2="60%" />
              </g>
              
              <g fill="#22d3ee" opacity="0.7">
                <circle cx="10%" cy="20%" r="2" />
                <circle cx="25%" cy="40%" r="3" />
                <circle cx="15%" cy="70%" r="2" />
                <circle cx="35%" cy="80%" r="3.5" />
                <circle cx="50%" cy="55%" r="2.5" />
                <circle cx="65%" cy="85%" r="2" />
                <circle cx="85%" cy="60%" r="3" />
                <circle cx="90%" cy="25%" r="2" />
                <circle cx="70%" cy="15%" r="2.5" />
                <circle cx="50%" cy="35%" r="3" />
              </g>
            </svg>
          </div>

          {/* Glowing blur orbs for depth */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-10" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-10" />

          {/* Interactive glass card cover overlay */}
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-md z-10 rounded-[32px] pointer-events-none" />

          {/* Content Wrapper */}
          <div className="relative z-20 w-full flex flex-col items-center gap-6 md:gap-8">
            
            {/* Top Badge (Aligned Left) */}
            <div className="w-full flex justify-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                <span>Admissions Open — Fall 2026</span>
              </div>
            </div>

            {/* Typography Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight leading-tight max-w-4xl text-center font-semibold">
              Shape Your Future: Apply Now for Fall 2026 Intake.
            </h2>

            {/* Description Subtext */}
            <p className="text-sm sm:text-base text-slate-300/90 max-w-2xl text-center font-normal leading-relaxed">
              Join a world-class academic community dedicated to innovation and leadership. Explore our diverse programs and start your <span className="text-white font-medium">journey towards success</span>.
            </p>

            {/* Glowing CTA Button */}
            <button 
              onClick={onEnrollNow}
              className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-slate-950 font-black rounded-lg text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:shadow-[0_0_35px_rgba(34,211,238,0.8)] scale-100 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              Enroll Now
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SuccessSection;
