import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { AIFeature } from "./ai-learning.types";
import { cardFadeInUpVariants, hoverScaleVariants, useReducedMotion } from "./animations";

interface AIFeatureCardProps {
  feature: AIFeature;
}

export const AIFeatureCard: React.FC<AIFeatureCardProps> = ({ feature }) => {
  const isReduced = useReducedMotion();
  const IconComponent =
    (Icons[feature.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Sparkles;

  return (
    <motion.div
      variants={isReduced ? {} : cardFadeInUpVariants}
      whileHover={isReduced ? {} : "hover"}
      initial="rest"
      animate="rest"
      className="relative p-5 rounded-2xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 hover:bg-slate-900/40 transition-all duration-300 flex flex-col justify-between h-full group overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/[0.02] rounded-full blur-xl group-hover:bg-purple-500/[0.04] transition-all duration-300" />

      <div className="space-y-4">
        {/* Header (Icon + Badge) */}
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <IconComponent className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-300" />
          </div>

          {feature.badge && (
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
              {feature.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-left">
          <h4 className="text-xs sm:text-sm font-bold text-slate-100 group-hover:text-white transition-colors">
            {feature.name}
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-normal">
            {feature.description}
          </p>
        </div>
      </div>

      {/* Interactive Micro Indicator */}
      <div className="pt-4 mt-auto border-t border-slate-900/60 flex items-center justify-between text-[9px] font-mono font-bold text-slate-500 group-hover:text-amber-500/80 transition-colors">
        <span className="uppercase tracking-wider">Premium Access</span>
        <Icons.ArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
export default AIFeatureCard;
