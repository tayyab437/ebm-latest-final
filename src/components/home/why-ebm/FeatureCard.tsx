import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { FeatureCardData } from "./why-ebm.types";
import { FeatureBadge } from "./FeatureBadge";
import { useReducedMotion } from "./animations";

interface FeatureCardProps {
  feature: FeatureCardData;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const isReduced = useReducedMotion();
  const IconComponent = Icons[feature.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }> || Icons.Compass;

  return (
    <motion.div
      whileHover={isReduced ? {} : { y: -4, transition: { duration: 0.2 } }}
      className="group relative flex flex-col h-full bg-white border border-slate-200/80 hover:border-blue-200 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(37,99,235,0.03)] overflow-hidden transition-all duration-300"
    >
      {/* Absolute Glow Background Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/[0.01] group-hover:to-blue-500/[0.03] transition-all duration-500 pointer-events-none" />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600 group-hover:text-blue-700 group-hover:border-blue-500/20 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.06)] transition-all duration-300">
          <IconComponent className="w-5 h-5" />
        </div>
        {feature.badge && <FeatureBadge badge={feature.badge} />}
      </div>

      {/* Title & Description */}
      <div className="flex-grow space-y-2">
        <h4 className="text-sm font-bold tracking-tight text-slate-800 group-hover:text-blue-900 transition-colors">
          {feature.title}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-sans font-normal">
          {feature.description}
        </p>
      </div>

      {/* Learn More link */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-blue-600 transition-colors cursor-pointer select-none">
        <span>Curriculum Protocol</span>
        <Icons.ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
