import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calculator, Sparkles, Calendar, BookOpen, DollarSign, Hourglass } from "lucide-react";
import { CURRENT_GRADES, LEARNING_GOALS, STUDY_MODES } from "./admissions.constants";
import { PRICING_PLANS_DATA } from "./admissions.data";

export const EnrollmentCalculator: React.FC = () => {
  // Select state parameters
  const [grade, setGrade] = useState<string>("GRADE_9");
  const [goal, setGoal] = useState<string>("EXAM_DOMINANCE");
  const [planId, setPlanId] = useState<string>("student");
  const [mode, setMode] = useState<string>("SUPERVISED");

  // Output estimate states
  const [estimate, setEstimate] = useState({
    durationMonths: 12,
    completionDate: "June 2027",
    suggestedPlanName: "Accelerated Student",
    recommendedAITools: ["Socratic Vector Solver", "Diagnostic Skill Mapper"],
    feeEstimate: "$45 / mo",
  });

  // Dynamic recalculation simulation on value change
  useEffect(() => {
    let baseMonths = 12;
    let aiTools = ["Socratic Equation Solver", "Core Diagnostic Engine"];
    let suggestedPlan = "Accelerated Student";
    let fee = "$45 / mo";

    // Tune based on Current Grade select values
    if (grade === "GRADE_8") {
      baseMonths = 24;
      aiTools.push("EBM Foundations Module");
    } else if (grade === "GRADE_10") {
      baseMonths = 12;
      aiTools.push("Exam Predictive Analyzer");
    } else if (grade === "GRADE_11") {
      baseMonths = 6;
      aiTools.push("Crash Mastery Drills");
    }

    // Tune based on goals
    if (goal === "FOUNDATION_ACCELERATION") {
      suggestedPlan = "Starter AI Scholar";
      fee = "$19 / mo";
    } else if (goal === "SKILLS_PORTFOLIO") {
      suggestedPlan = "Socratic Premium";
      fee = "$95 / mo";
    }

    // Tune based on Preferred Plan choice directly
    const foundPlan = PRICING_PLANS_DATA.find((p) => p.id === planId);
    if (foundPlan) {
      suggestedPlan = foundPlan.name;
      fee = foundPlan.monthlyPrice === "Custom" ? "Custom Quote" : `${foundPlan.annualPrice} / mo`;
    }

    // Calculate Completion month from current 2026 baseline
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + baseMonths);
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    const formattedCompletion = targetDate.toLocaleDateString("en-US", options);

    setEstimate({
      durationMonths: baseMonths,
      completionDate: formattedCompletion,
      suggestedPlanName: suggestedPlan,
      recommendedAITools: aiTools,
      feeEstimate: fee,
    });
  }, [grade, goal, planId, mode]);

  return (
    <div className="py-12" id="enrollment-calculator-section">
      <div className="bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
        
        <div className="p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-blue-400" />
              <h4 className="text-lg font-sans font-semibold text-slate-100">
                Interactive Learning Roadmap Calculator
              </h4>
            </div>
            
            <p className="text-xs text-slate-400 font-sans">
              Adjust parameters to preview recommended duration tracks, specialized diagnostic AI modules, and budget estimates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              {/* Grade Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Current Grade Level
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  {Object.entries(CURRENT_GRADES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Target Learning Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  {Object.entries(LEARNING_GOALS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Base Plan */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Base Subscription Tier
                </label>
                <select
                  value={planId}
                  onChange={(e) => setPlanId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  {PRICING_PLANS_DATA.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Study Mode */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Study & Interactive Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-blue-500/40 transition-all cursor-pointer"
                >
                  {Object.entries(STUDY_MODES).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Output Section */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 lg:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest block">
                Recommended Study Vector
              </span>

              {/* Estimated Plan */}
              <div>
                <span className="text-xs text-slate-500 font-sans block">Suggested Plan Target</span>
                <span className="text-lg font-sans font-semibold text-slate-100 flex items-center gap-2 mt-0.5">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  {estimate.suggestedPlanName}
                </span>
              </div>

              {/* Estimate Parameters list */}
              <div className="grid grid-cols-2 gap-4.5 pt-2">
                <div>
                  <span className="text-[11px] text-slate-500 font-sans flex items-center gap-1.5">
                    <Hourglass className="w-3.5 h-3.5 text-slate-500" />
                    Est. Duration
                  </span>
                  <span className="text-sm font-mono font-semibold text-slate-200 block mt-1">
                    {estimate.durationMonths} Months
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500 font-sans flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    Est. Completion
                  </span>
                  <span className="text-sm font-mono font-semibold text-slate-200 block mt-1">
                    {estimate.completionDate}
                  </span>
                </div>
              </div>

              {/* Recommended Copilot Tools */}
              <div className="pt-4 border-t border-slate-800/60">
                <span className="text-xs text-slate-500 font-sans block mb-2.5">AI Tools Configured</span>
                <div className="flex flex-wrap gap-1.5">
                  {estimate.recommendedAITools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-blue-500/5 border border-blue-500/15 text-[10px] font-mono text-blue-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Estimated Budget Banner */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Estimated Fee</span>
                <span className="text-2xl font-sans font-bold text-slate-100 mt-1 block">
                  {estimate.feeEstimate}
                </span>
              </div>
              <button
                id="calculator-apply-roadmap"
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-sans font-medium text-xs rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Apply Dynamic Roadmap
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EnrollmentCalculator;
