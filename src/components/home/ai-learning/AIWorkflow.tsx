import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { AIWorkflowStep } from "./ai-learning.types";
import { workflowStepVariants, useReducedMotion } from "./animations";

interface AIWorkflowProps {
  steps: AIWorkflowStep[];
}

export const AIWorkflow: React.FC<AIWorkflowProps> = ({ steps }) => {
  const isReduced = useReducedMotion();

  return (
    <div className="space-y-6 bg-slate-900/10 border border-slate-900 rounded-2xl p-5 md:p-6">
      {/* Header info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900/60 pb-4">
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            The Socratic Mastery Loop
          </h4>
          <p className="text-[10px] text-slate-500 mt-0.5">
            How EBM's active feedback loop drives complete retention and deep conceptual understanding.
          </p>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-purple-500/20 bg-purple-500/10 text-purple-400 font-mono self-start sm:self-center">
          Adaptive Flow
        </span>
      </div>

      {/* Workflow connector track */}
      <div className="relative pl-6 md:pl-0 md:grid md:grid-cols-6 gap-4">
        {/* Horizontal connect tracks on desktop layout */}
        <div className="hidden md:block absolute top-[22px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-purple-500/40 via-purple-500/25 to-amber-500/30 z-0" />

        {/* Vertical tracks on mobile layout */}
        <div className="md:hidden absolute top-4 bottom-4 left-[9px] w-[1px] bg-gradient-to-b from-purple-500/40 via-purple-500/20 to-amber-500/10 z-0" />

        {steps.map((step, idx) => {
          const IconComponent =
            (Icons[step.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.CheckCircle;

          const isLast = idx === steps.length - 1;
          const nodeColor = isLast
            ? "border-amber-500 text-amber-400 bg-amber-950"
            : "border-purple-500 text-purple-400 bg-purple-950";

          return (
            <motion.div
              variants={isReduced ? undefined : workflowStepVariants}
              key={step.id}
              className="relative z-10 pb-5 md:pb-0 group text-left md:text-center"
            >
              {/* Bullet Node Indicator */}
              <div className="absolute -left-[24px] md:relative md:left-0 md:mx-auto md:mb-3.5 flex items-center justify-center w-5 h-5 rounded-full border-2 bg-slate-950 z-20 transition-all duration-300 transform group-hover:scale-110">
                <span className={`w-1.5 h-1.5 rounded-full ${isLast ? "bg-amber-400" : "bg-purple-400"}`} />
              </div>

              {/* Step info card details */}
              <div className="p-3 rounded-xl border border-slate-900 bg-slate-950/40 hover:border-slate-800 hover:bg-slate-900/20 transition-all duration-200">
                <div className="flex md:flex-col items-center md:justify-center gap-2 mb-1.5">
                  <span className={`p-1.5 rounded-lg border ${nodeColor}`}>
                    <IconComponent className="w-4 h-4" />
                  </span>
                  <div className="text-left md:text-center">
                    <div className="text-[9px] font-mono text-slate-500">STEP 0{step.stepNumber}</div>
                    <h5 className="text-[11px] font-bold text-slate-100 group-hover:text-white transition-colors truncate">
                      {step.title}
                    </h5>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-normal font-sans font-normal md:max-w-[120px] md:mx-auto">
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
export default AIWorkflow;
