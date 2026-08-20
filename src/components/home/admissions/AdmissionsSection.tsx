import React from "react";
import { motion } from "motion/react";
import AdmissionTimeline from "./AdmissionTimeline";
import AdmissionFAQ from "./AdmissionFAQ";
import WhyChooseUs from "./WhyChooseUs";

export const AdmissionsSection: React.FC = () => {
  return (
    <section 
      id="admissions" 
      className="relative py-24 md:py-32 bg-[#030712] text-slate-100 overflow-hidden border-t border-slate-900 select-none"
    >
      {/* Absolute Ambient Flares matching the image */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-blue-900/20 via-indigo-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none animate-[pulse_6s_infinite_alternate]" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[250px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-24 md:space-y-32">
        
        {/* Master Section Heading - Meticulously Styled to Match Image */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <span className="text-xs sm:text-sm font-serif font-semibold tracking-[0.25em] text-amber-500/90 uppercase block">
            Admissions & Enrollment
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-50 font-light tracking-wide leading-tight">
            Start Your EBM Journey Today
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto opacity-90 font-light">
            Every program includes access to the EBM learning methodology, AI-powered study support, structured curriculum, progress tracking, and continuous guidance. Follow our simple roadmap to register your student.
          </p>
        </div>

        {/* SECTION 1: Admissions Timeline */}
        <div>
          <AdmissionTimeline />
        </div>

        {/* SECTION 2: Why Choose Us Interactive Showcase */}
        <div>
          <WhyChooseUs />
        </div>

        {/* SECTION 7: Admissions Frequently Asked Questions */}
        <div>
          <AdmissionFAQ />
        </div>

      </div>
    </section>
  );
};

export default AdmissionsSection;
