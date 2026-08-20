import React from "react";
import { motion } from "motion/react";
import { Check, Star, Shield, HelpCircle } from "lucide-react";
import { PRICING_PLANS } from "./constants";

interface MembershipProps {
  onSelectPlan: (planName: string) => void;
}

export default function Membership({ onSelectPlan }: MembershipProps) {
  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-xs font-mono tracking-widest uppercase font-extrabold px-3 py-1 bg-blue-600/10 dark:bg-blue-500/10 rounded-full">
            Fair & Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Choose Your Accelerated Plan
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            All plans are billed monthly. Unlock the full potential of EBM and fast-track Grade 5 to CIE O-Levels with live diagnostics and persistent progress tracking.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {PRICING_PLANS.map((plan, idx) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`rounded-3xl p-8 bg-white dark:bg-slate-950/60 border flex flex-col justify-between relative transition-all duration-300 ${
                  plan.isHighlighted 
                    ? "border-blue-500 ring-2 ring-blue-500/20 shadow-xl scale-105 z-10 md:-translate-y-2" 
                    : "border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular Badge for Highlighted Plan */}
                {plan.isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-700 shadow-sm flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current" /> Most Popular Selection
                  </div>
                )}

                {/* Plan Metadata */}
                <div className="space-y-6 text-left">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                    <p className="text-slate-550 dark:text-slate-400 text-xs mt-1 leading-normal min-h-[40px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing Details */}
                  <div className="flex items-baseline gap-1 py-2 border-y border-slate-100 dark:border-slate-800/60">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
                      ${plan.priceMonthly}
                    </span>
                    <span className="text-slate-400 dark:text-slate-500 text-xs font-mono">/ Month</span>
                  </div>

                  {/* Feature Lists */}
                  <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-350">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-600 dark:text-slate-400 leading-normal">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                  <button
                    id={`btn-select-plan-${plan.id}`}
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-black tracking-wide uppercase transition duration-150 shadow-sm cursor-pointer ${
                      plan.isHighlighted
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white"
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                  <p className="text-[10px] text-slate-400 dark:text-slate-550 mt-2.5 text-center font-mono">
                    Cancel anytime • 14-day refund policy applies
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Trust Guarantee row */}
        <div className="mt-12 max-w-2xl mx-auto bg-white dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-center gap-2.5 text-xs text-slate-550 dark:text-slate-400">
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="font-semibold">Secured payments via Stripe. No hidden student or diagnostic fees.</span>
        </div>

      </div>
    </section>
  );
}
