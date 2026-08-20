import React from "react";
import { motion } from "motion/react";
import { HeroButton } from "./HeroButtons";
import { HeroStatistics } from "./HeroStatistics";
import { TRUST_INDICATORS, HERO_STATS_DATA } from "./hero.constants";
import { faderVariants, useReducedMotion } from "./HeroAnimations";
import { Sparkles, ShieldCheck, GraduationCap } from "lucide-react";

interface HeroContentProps {
  onStartLearning: () => void;
  onExploreCurriculum: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  onStartLearning,
  onExploreCurriculum,
}) => {
  const isReduced = useReducedMotion();

  const animationProps = (custom: number) => {
    if (isReduced) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, delay: custom * 0.05 },
      };
    }
    return {
      initial: "hidden",
      animate: "visible",
      custom,
      variants: faderVariants,
    };
  };

  return (
    <div className="flex flex-col space-y-8 max-w-2xl lg:max-w-none text-left z-10 font-sans">
      {/* Upper tag / Micro Accent */}
      <motion.div
        {...animationProps(0)}
        className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-xs font-bold text-blue-700 tracking-wider uppercase shadow-[0_2px_12px_rgba(37,99,235,0.05)]"
      >
        <GraduationCap className="w-4 h-4 text-blue-600" />
        <span>Ejaz Bukhari Method (EBM) Academy</span>
      </motion.div>

      {/* Hero Headline */}
      <motion.div {...animationProps(1)} className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-blue-950 leading-[1.1]">
          Complete Grade 5 to <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
            O Level in Just 3 Years
          </span>
        </h1>
        <p className="text-lg sm:text-xl font-bold text-blue-700/90 tracking-tight">
          Learn Smarter. Think Better. Achieve Faster.
        </p>
      </motion.div>

      {/* Description */}
      <motion.p
        {...animationProps(2)}
        className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal"
      >
        EBM is an elite, AI-powered accelerated learning ecosystem founded on the acclaimed Ejaz Bukhari Method. We empower academic fast-trackers to master core STEM &amp; Humanities, bypassing outdated lockstep school grades through deep Socratic guidance and real-time cognitive progress tracking.
      </motion.p>

      {/* Buttons */}
      <motion.div
        {...animationProps(3)}
        className="flex flex-col sm:flex-row gap-4 sm:items-center"
      >
        <HeroButton
          id="hero-btn-start"
          variant="primary"
          label="Start Your Journey"
          onClick={onStartLearning}
          icon="ChevronRight"
        />
        <HeroButton
          id="hero-btn-explore"
          variant="outline"
          label="Explore Curriculum"
          onClick={onExploreCurriculum}
          icon="Layers"
        />
      </motion.div>

      {/* Reusable trust badge indicators */}
      <motion.div
        {...animationProps(4)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4 border-t border-slate-900/50"
      >
        {TRUST_INDICATORS.map((indicator) => {
          // Strip the raw "✓ " prefix if present in constants for beautiful icon integration
          const labelText = indicator.label.startsWith("✓ ") 
            ? indicator.label.substring(2) 
            : indicator.label;

          return (
            <div
              key={indicator.id}
              aria-label={indicator.ariaLabel}
              className="flex items-start gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors duration-200 cursor-default"
            >
              <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <span>{labelText}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Statistics */}
      <HeroStatistics stats={HERO_STATS_DATA} />
    </div>
  );
};

export default HeroContent;
