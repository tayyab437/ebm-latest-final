import React from "react";
import { motion } from "motion/react";
import { Check, Info, Sparkles, Zap } from "lucide-react";
import { PricingPlan } from "./admissions.types";
import { SCALE_HOVER_VARIANTS } from "./animations";

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
  onSelect: (planId: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isAnnual, onSelect }) => {
  const displayPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const billingCycleLabel = plan.monthlyPrice === "Custom" ? "" : isAnnual ? "/ mo, billed annually" : "/ month";

  return (
    <motion.div
      variants={SCALE_HOVER_VARIANTS}
      whileHover="whileHover"
      whileTap="whileTap"
      className={`relative flex flex-col h-full rounded-3xl border transition-all duration-300 overflow-hidden ${
        plan.recommended
          ? "bg-slate-900 border-blue-500 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] md:scale-[1.02] z-10 text-white"
          : "bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 text-slate-800 dark:text-slate-300"
      }`}
      id={`pricing-card-${plan.id}`}
    >
      {/* Decorative gradient flare for premium plans */}
      {plan.recommended && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse" />
      )}

      {/* Recommended/Popular Badges */}
      {plan.badge && (
        <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-semibold tracking-wider uppercase ${
          plan.recommended 
            ? "bg-blue-500/10 border-blue-400/20 text-blue-300" 
            : "bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-400/20 text-blue-800 dark:text-blue-300"
        }`}>
          <Sparkles className="w-3 h-3" />
          {plan.badge}
        </div>
      )}

      {/* Plan Header */}
      <div className={`p-8 pb-6 border-b ${plan.recommended ? "border-slate-850" : "border-slate-200 dark:border-slate-800/60"}`}>
        <h3 className={`text-xl font-sans font-bold mb-2 tracking-tight ${
          plan.recommended ? "text-white" : "text-slate-900 dark:text-white"
        }`}>
          {plan.name}
        </h3>
        <p className={`text-sm font-sans leading-relaxed min-h-[48px] ${
          plan.recommended ? "text-slate-300" : "text-slate-600 dark:text-slate-400"
        }`}>
          {plan.description}
        </p>

        {/* Pricing Layout */}
        <div className="mt-6 flex items-baseline gap-2">
          <span className={`text-4xl font-sans font-bold tracking-tight ${
            plan.recommended ? "text-white" : "text-slate-900 dark:text-slate-100"
          }`}>
            {displayPrice}
          </span>
          {billingCycleLabel && (
            <span className={`text-xs font-mono ${
              plan.recommended ? "text-slate-450" : "text-slate-500 dark:text-slate-400"
            }`}>
              {billingCycleLabel}
            </span>
          )}
        </div>
      </div>

      {/* Features & Specs */}
      <div className="p-8 flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          {/* Main Included Features */}
          <div>
            <span className={`text-xs font-mono font-semibold uppercase tracking-widest block mb-4 ${
              plan.recommended ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
            }`}>
              Core Deliverables
            </span>
            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={`flex items-start gap-3 text-sm font-sans ${
                  plan.recommended ? "text-slate-200" : "text-slate-700 dark:text-slate-300"
                }`}>
                  <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Features Sub-group */}
          <div className={`pt-4 border-t ${plan.recommended ? "border-slate-850" : "border-slate-200 dark:border-slate-800/40"}`}>
            <span className={`text-xs font-mono font-semibold uppercase tracking-widest flex items-center gap-1.5 mb-3 ${
              plan.recommended ? "text-blue-400" : "text-blue-600 dark:text-blue-400"
            }`}>
              <Zap className="w-3.5 h-3.5" />
              Socratic AI Engine
            </span>
            <ul className="space-y-2">
              {plan.aiFeatures.map((aiFeature, idx) => (
                <li key={idx} className={`flex items-center gap-2.5 text-xs font-mono ${
                  plan.recommended ? "text-slate-400" : "text-slate-500 dark:text-slate-400"
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${plan.recommended ? "bg-blue-450" : "bg-blue-500 dark:bg-blue-400"}`} />
                  <span>{aiFeature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SLA Parameters Grid */}
          <div className={`pt-4 border-t space-y-2.5 ${
            plan.recommended ? "border-slate-850" : "border-slate-200 dark:border-slate-800/40"
          }`}>
            <div className="flex justify-between items-center text-xs">
              <span className={plan.recommended ? "text-slate-400" : "text-slate-500"}>Advisor Liaison</span>
              <span className={plan.recommended ? "text-slate-200 font-mono" : "text-slate-700 dark:text-slate-300 font-mono"}>{plan.supportLevel}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className={plan.recommended ? "text-slate-400" : "text-slate-500"}>Learning Resources</span>
              <span className={`font-mono truncate max-w-[160px] ${
                plan.recommended ? "text-slate-200" : "text-slate-700 dark:text-slate-300"
              }`} title={plan.learningResources}>
                {plan.learningResources}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className={plan.recommended ? "text-slate-400" : "text-slate-500"}>Parent Dashboard</span>
              <span className="font-mono">{plan.parentDashboard ? <span className="text-blue-500 dark:text-blue-400">Active</span> : <span className="text-slate-500">Not Included</span>}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className={plan.recommended ? "text-slate-400" : "text-slate-500"}>Certificate Eligibility</span>
              <span className="font-mono">{plan.certificateEligible ? <span className="text-blue-550 dark:text-blue-400">Verifiable</span> : <span className="text-slate-500">None</span>}</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`mt-8 pt-6 border-t ${plan.recommended ? "border-slate-850" : "border-slate-200 dark:border-slate-800/40"}`}>
          <button
            onClick={() => onSelect(plan.id)}
            id={`select-plan-${plan.id}`}
            className={`w-full py-3 px-6 rounded-xl font-sans font-medium text-sm transition-all duration-200 cursor-pointer ${
              plan.recommended
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md shadow-blue-500/10"
                : "bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white border border-slate-300 dark:border-slate-700"
            }`}
          >
            {plan.monthlyPrice === "Custom" ? "Contact Institution Team" : "Initiate Enrollment Journey"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingCard;
