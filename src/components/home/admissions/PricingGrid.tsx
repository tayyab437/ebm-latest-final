import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PricingCard } from "./PricingCard";
import { PRICING_PLANS_DATA } from "./admissions.data";
import { STAGGER_CONTAINER_VARIANTS } from "./animations";

interface PricingGridProps {
  onSelectPlan: (planId: string) => void;
}

export const PricingGrid: React.FC<PricingGridProps> = ({ onSelectPlan }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="py-8" id="pricing-plans-section">
      {/* Dynamic Billing Frequency Toggle */}
      <div className="flex flex-col items-center justify-center mb-16 gap-4">
        <div className="relative flex items-center bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          {/* Slider Background */}
          <motion.div
            className="absolute top-1.5 bottom-1.5 left-1.5 w-[140px] bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
            initial={false}
            animate={{
              x: isAnnual ? 140 : 0,
            }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
          
          <button
            onClick={() => setIsAnnual(false)}
            id="billing-monthly-toggle"
            className={`relative z-10 w-[140px] py-2 text-center text-xs font-mono font-medium transition-colors cursor-pointer ${
              !isAnnual ? "text-slate-900 dark:text-white font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Monthly Billing
          </button>
          
          <button
            onClick={() => setIsAnnual(true)}
            id="billing-annual-toggle"
            className={`relative z-10 w-[140px] py-2 text-center text-xs font-mono font-medium transition-colors cursor-pointer ${
              isAnnual ? "text-slate-900 dark:text-white font-semibold" : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            Annual Billing
          </button>
        </div>

        {/* Incentive Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-medium text-blue-400">
          <span>Save up to 25% with annual commitments</span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <motion.div
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch"
      >
        {PRICING_PLANS_DATA.map((plan) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            isAnnual={isAnnual}
            onSelect={onSelectPlan}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PricingGrid;
