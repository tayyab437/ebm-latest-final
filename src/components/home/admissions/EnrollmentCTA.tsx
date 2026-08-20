import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Compass } from "lucide-react";

export const EnrollmentCTA: React.FC = () => {
  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="py-12" id="enrollment-cta-section">
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/60 p-10 md:p-16 text-center">
        {/* Sleek moving mesh backdrop simulation */}
        <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent opacity-70 pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-400/20 text-[10px] font-mono font-semibold tracking-wider text-blue-800 dark:text-blue-300 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Empower Your Child's Academic Potential
          </div>

          <h3 className="text-3xl md:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Your Learning Journey Starts Here
          </h3>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-sans">
            Give your student immediate access to personalized O-Level diagnostic calibration, Socratic dialogue co-pilots, and parent dashboard analytics. Let's build elite confidence together.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4.5">
            {/* Primary Action */}
            <button
              onClick={() => handleScrollToId("admissions-timeline-section")}
              id="cta-enroll-apply-now"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-sans font-semibold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              Initiate Diagnostic Flow
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Curriculum explore mock */}
            <button
              onClick={() => {
                const cur = document.getElementById("curriculum-section") || document.getElementById("curriculum");
                if (cur) cur.scrollIntoView({ behavior: "smooth" });
              }}
              id="cta-enroll-explore-curric"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-sans font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              Explore Curriculum
            </button>
          </div>

          {/* Verification parameter list */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-550 dark:text-slate-500 font-sans">
            <span className="flex items-center gap-1.5">✓ 14-Day Full Diagnostic Trial</span>
            <span className="flex items-center gap-1.5">✓ Secured Socratic Credentials</span>
            <span className="flex items-center gap-1.5">✓ Instant Advisor Alignment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCTA;
