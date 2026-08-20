import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AIFeature } from "./ai-learning.types";
import { AIFeatureCard } from "./AIFeatureCard";
import { gridContainerVariants, useReducedMotion } from "./animations";

interface AIFeatureGridProps {
  features: AIFeature[];
}

export const AIFeatureGrid: React.FC<AIFeatureGridProps> = ({ features }) => {
  const isReduced = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tutor" | "generator" | "coach" | "assistant">("all");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "tutor", label: "Socratic Tutors" },
    { id: "generator", label: "Custom Generators" },
    { id: "coach", label: "Writing & Speaking Coaches" },
    { id: "assistant", label: "Core Assistants" }
  ] as const;

  const filteredFeatures = selectedCategory === "all"
    ? features
    : features.filter(f => f.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Visual Header & Tab Filter bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-900 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Modular Socratic Engine
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Click on categories to filter through specialized academic modules.
          </p>
        </div>

        {/* Swipeable Tabs on Mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none max-w-full">
          {categories.map((cat) => (
            <button
              id={`feat-filter-tab-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border whitespace-nowrap transition-all duration-200 select-none ${
                selectedCategory === cat.id
                  ? "bg-purple-500/15 border-purple-500/40 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                  : "bg-slate-950/20 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List with staggered enter animations */}
      <motion.div
        variants={isReduced ? {} : gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredFeatures.map((feat) => (
            <motion.div
              key={feat.id}
              layout={isReduced ? false : true}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="h-full"
            >
              <AIFeatureCard feature={feat} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default AIFeatureGrid;
