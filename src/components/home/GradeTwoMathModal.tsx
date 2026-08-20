import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, Target, Compass, Brain, ArrowRight, ShieldCheck, FileText, Check, Heart, Lightbulb, TrendingUp } from "lucide-react";

interface GradeTwoMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeTwoMathModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeTwoMathModalProps) {
  const [activeTab, setActiveTab] = useState<"contract" | "advantage" | "foundations">("contract");
  const [signedName, setSignedName] = useState("");
  const [completedPromises, setCompletedPromises] = useState<number[]>([]);

  if (!isOpen) return null;

  const togglePromise = (index: number) => {
    if (completedPromises.includes(index)) {
      setCompletedPromises(completedPromises.filter((i) => i !== index));
    } else {
      setCompletedPromises([...completedPromises, index]);
    }
  };

  const selectAllPromises = () => {
    if (completedPromises.length === 12) {
      setCompletedPromises([]);
    } else {
      setCompletedPromises([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }
  };

  const promisesList = [
    { num: 1, text: "I will read every question carefully." },
    { num: 2, text: "I will identify what I need to find." },
    { num: 3, text: "I will show my working clearly." },
    { num: 4, text: "I will use numbers, pictures or words to explain." },
    { num: 5, text: "I will check my calculations and answers." },
    { num: 6, text: "I will not be afraid of mistakes." },
    { num: 7, text: "I will correct mistakes and learn why they happened." },
    { num: 8, text: "I will ask for help when I need it." },
    { num: 9, text: "I will try another method when possible." },
    { num: 10, text: "I will practise mathematics regularly." },
    { num: 11, text: "I will keep my work neat and organised." },
    { num: 12, text: "I will use mathematics in everyday life." },
  ];

  const foundationAreas = [
    {
      title: "NUMBERS",
      subtitle: "to 1,000",
      detail: "Place value, comparing & ordering",
      color: "from-blue-500 to-cyan-500",
      border: "border-blue-200",
      bg: "bg-blue-50/60",
      text: "text-blue-800",
    },
    {
      title: "OPERATIONS",
      subtitle: "add, subtract",
      detail: "Regrouping & borrowing mastery",
      color: "from-emerald-500 to-teal-500",
      border: "border-emerald-200",
      bg: "bg-emerald-50/60",
      text: "text-emerald-800",
    },
    {
      title: "EARLY × ÷",
      subtitle: "equal groups",
      detail: "Repeated addition & sharing",
      color: "from-violet-500 to-purple-500",
      border: "border-violet-200",
      bg: "bg-violet-50/60",
      text: "text-violet-800",
    },
    {
      title: "FRACTIONS",
      subtitle: "halves, thirds",
      detail: "Quarters & visual models",
      color: "from-amber-500 to-orange-500",
      border: "border-amber-200",
      bg: "bg-amber-50/60",
      text: "text-amber-800",
    },
    {
      title: "MEASUREMENT",
      subtitle: "length, weight",
      detail: "Capacity & unit estimation",
      color: "from-indigo-500 to-blue-500",
      border: "border-indigo-200",
      bg: "bg-indigo-50/60",
      text: "text-indigo-800",
    },
    {
      title: "TIME & MONEY",
      subtitle: "clocks, calendars",
      detail: "Coins, notes & practical math",
      color: "from-rose-500 to-pink-500",
      border: "border-rose-200",
      bg: "bg-rose-50/60",
      text: "text-rose-800",
    },
    {
      title: "GEOMETRY",
      subtitle: "2D/3D shapes",
      detail: "Symmetry & spatial reasoning",
      color: "from-teal-500 to-emerald-500",
      border: "border-teal-200",
      bg: "bg-teal-50/60",
      text: "text-teal-800",
    },
    {
      title: "DATA",
      subtitle: "picture & bar graphs",
      detail: "Tally charts & problem solving",
      color: "from-sky-500 to-indigo-500",
      border: "border-sky-200",
      bg: "bg-sky-50/60",
      text: "text-sky-800",
    },
  ];

  const learningCycle = [
    { step: "1", title: "LEARN", desc: "Understand ideas clearly with intuitive visual models", color: "bg-blue-600" },
    { step: "2", title: "PRACTISE", desc: "Reinforce important skills with deliberate repetition", color: "bg-teal-600" },
    { step: "3", title: "THINK", desc: "Explain mathematical thinking and compare methods", color: "bg-indigo-600" },
    { step: "4", title: "APPLY", desc: "Connect mathematics with real life situations", color: "bg-amber-600" },
    { step: "5", title: "REFLECT", desc: "Learn constructively from mistakes and self-check", color: "bg-rose-600" },
    { step: "6", title: "GROW", desc: "Build lasting confidence and true independence", color: "bg-emerald-600" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#1c4966] via-[#163a52] to-[#0f293b] text-white p-5 sm:p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner">
                <span className="text-[9px] font-black tracking-wider text-amber-300">EBM</span>
                <span className="text-xs font-bold leading-none">MATHS</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Grade Two Curriculum
                  </span>
                  <span className="text-xs text-slate-300">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade Two Mathematics Framework
                </h2>
                <p className="text-xs text-slate-300 italic font-serif">
                  A confident beginning to deeper mathematical thinking
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
              title="Close popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* TAB CONTROLS */}
          <div className="flex items-center space-x-2 mt-5 border-t border-white/10 pt-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("contract")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "contract"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-md"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Contract & Promise</span>
            </button>

            <button
              onClick={() => setActiveTab("advantage")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "advantage"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-md"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM Advantage (IB & A-Level Ready)</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-amber-400 text-slate-950 font-bold shadow-md"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>8 Foundation Areas & Learning Cycle</span>
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-800">
          {/* TAB 1: STUDENT CONTRACT */}
          {activeTab === "contract" && (
            <div className="space-y-6 animate-fade-in">
              {/* About this book banner */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4.5">
                <div className="flex items-center space-x-2 text-amber-900 font-serif font-bold text-base mb-1.5">
                  <BookOpen className="w-5 h-5 text-amber-700" />
                  <span>About This Grade Two Programme</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  This curriculum helps Grade Two learners strengthen their mathematical understanding step by step. Children build on Grade One knowledge while developing greater confidence, accuracy, reasoning, and independence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-amber-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                    <span className="font-bold text-amber-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Numbers and place value (to 1,000)</li>
                      <li>• Addition and subtraction with regrouping</li>
                      <li>• Early multiplication and equal division</li>
                      <li>• Fractions, 2D/3D shapes and patterns</li>
                      <li>• Measurement, clock time and money</li>
                      <li>• Graphs, tally data and multi-step problems</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                    <span className="font-bold text-amber-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Understand foundational ideas clearly</li>
                      <li>• Practise important procedural skills</li>
                      <li>• Explain mathematical thinking out loud</li>
                      <li>• Connect mathematics to daily life</li>
                      <li>• Learn constructively from mistakes</li>
                      <li>• Build confidence and lifelong independence</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* My EBM Maths Promise */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-amber-600" />
                      <span>My EBM Maths Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I know that mathematics becomes easier when I listen, think, practise and learn from my mistakes."
                    </p>
                  </div>
                  <button
                    onClick={selectAllPromises}
                    className="text-xs font-semibold text-[#00a3e0] hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    {completedPromises.length === 12 ? "Reset All" : "Commit to All 12"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {promisesList.map((item) => {
                    const isChecked = completedPromises.includes(item.num);
                    return (
                      <div
                        key={item.num}
                        onClick={() => togglePromise(item.num)}
                        className={`flex items-start space-x-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                          isChecked
                            ? "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isChecked ? <Check className="w-3.5 h-3.5" /> : item.num}
                        </div>
                        <span className="font-medium leading-snug">{item.text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Step by Step & Promise Badge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
                  <div className="bg-slate-900 text-white rounded-xl p-4">
                    <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can understand and use numbers.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can explain how I found an answer.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can check my work and try again.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can become a confident maths learner.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-amber-100 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-amber-50">
                        "I will learn with joy. I will think before I answer. I will work with care. I will practise with confidence. I will grow into an independent learner."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-amber-100 mt-3 pt-2 border-t border-white/20">
                      Created by Syed Ejaz Bukhari
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE EBM ADVANTAGE */}
          {activeTab === "advantage" && (
            <div className="space-y-6 animate-fade-in">
              {/* Question Count Metrics Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                    The EBM Practice Advantage
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How EBM Mathematics Builds Foundations for IB & A-Level Success
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Building conceptual thinkers who can also work with accuracy and discipline.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-slate-300">≈ 1,300</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Benchmark question count in typical Grade Two programmes
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 rounded-xl p-3.5 shadow-lg border border-amber-300 flex flex-col justify-center">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight">MORE THAN 2×</span>
                    <p className="text-[11px] font-semibold text-slate-900 mt-1">
                      Structured EBM practice across the full learning cycle
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">3,000+</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Questions in the EBM Grade Two Mathematics programme
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-400 italic mt-4">
                  "The difference is not quantity alone: questions progress from understanding and fluency to reasoning, application, reflection, and independent problem-solving."
                </p>
              </div>

              {/* IB vs EBM Bridge vs A-Level */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 text-center">
                  The Dual-Path Architectural Bridge
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* IB */}
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                    <span className="font-bold text-blue-900 uppercase tracking-wide block mb-2 text-center border-b border-blue-200 pb-1">
                      IB-Style Strengths
                    </span>
                    <ul className="space-y-1.5 text-blue-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Conceptual understanding</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Inquiry and exploration</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Real-life connections</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Reflection & communication</span>
                      </li>
                    </ul>
                  </div>

                  {/* EBM BRIDGE */}
                  <div className="bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 shadow-sm">
                    <span className="font-black text-amber-950 uppercase tracking-wide block mb-2 text-center border-b border-amber-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-amber-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>Learn clearly</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>Practise purposefully</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>Think and explain</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>Apply in context</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                        <span>Reflect and improve</span>
                      </li>
                    </ul>
                  </div>

                  {/* A-Level */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                    <span className="font-bold text-emerald-900 uppercase tracking-wide block mb-2 text-center border-b border-emerald-200 pb-1">
                      A-Level-Ready Habits
                    </span>
                    <ul className="space-y-1.5 text-emerald-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Accuracy and fluency</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Structured working</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Multi-step reasoning</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Independent problem-solving</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Best of both table */}
                <div className="mt-4 pt-4 border-t border-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="p-2 rounded-l font-bold">IB-Style Strength</th>
                        <th className="p-2 font-bold">A-Level-Ready Strength</th>
                        <th className="p-2 rounded-r font-bold">What Grade Two EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Understand concepts</td>
                        <td className="p-2 font-medium text-emerald-900">Use accurate methods</td>
                        <td className="p-2 text-slate-800">Understand what an operation means, then practise the correct procedure.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Explore and ask why</td>
                        <td className="p-2 font-medium text-emerald-900">Solve systematically</td>
                        <td className="p-2 text-slate-800">Compare strategies and organise each step clearly.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Connect learning to life</td>
                        <td className="p-2 font-medium text-emerald-900">Apply mathematics</td>
                        <td className="p-2 text-slate-800">Use time, money, measurement and data in familiar situations.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Communicate reasoning</td>
                        <td className="p-2 font-medium text-emerald-900">Show complete working</td>
                        <td className="p-2 text-slate-800">Explain answers with numbers, drawings, symbols and words.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 8 FOUNDATION AREAS & CYCLE */}
          {activeTab === "foundations" && (
            <div className="space-y-6 animate-fade-in">
              {/* Why Grade Two Matters */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-1">
                  Why Grade Two Matters: What Changes From Grade One?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Grade Two is where children move from basic counting towards connected mathematical thinking. Addition links to subtraction; repeated addition prepares multiplication; equal sharing prepares division; and fractions, measurement and data connect number ideas to the real world.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Number Range</span>
                    <span className="text-[10px] text-slate-600">Larger numbers, place value, comparing</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Operations</span>
                    <span className="text-[10px] text-slate-600">Regrouping, borrowing, early × & ÷</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Problems</span>
                    <span className="text-[10px] text-slate-600">One-step & intro 2-step situations</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Explanation</span>
                    <span className="text-[10px] text-slate-600">Words, pictures, number sentences</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Choose strategy, check & improve</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>The 8 Grade Two Foundation Pillars</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {foundationAreas.map((area, idx) => (
                    <div
                      key={idx}
                      className={`${area.bg} border ${area.border} rounded-xl p-3 text-center transition-all hover:-translate-y-0.5 hover:shadow-xs`}
                    >
                      <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-white/80 shadow-2xs inline-block mb-1 text-slate-800">
                        {area.title}
                      </span>
                      <h5 className={`font-bold text-xs ${area.text} leading-tight`}>{area.subtitle}</h5>
                      <p className="text-[10px] text-slate-600 mt-1 leading-snug">{area.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* The 6 Step Cycle */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 text-center">
                  The Grade Two EBM Learning Cycle
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center">
                  {learningCycle.map((stage) => (
                    <div
                      key={stage.step}
                      className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-between"
                    >
                      <div
                        className={`w-7 h-7 rounded-full ${stage.color} text-white font-bold text-xs flex items-center justify-center mb-1.5 shadow-xs`}
                      >
                        {stage.step}
                      </div>
                      <span className="font-black text-xs text-slate-800 tracking-wider mb-1">
                        {stage.title}
                      </span>
                      <p className="text-[9px] text-slate-500 leading-snug">{stage.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200 text-center">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-amber-950 font-serif italic">
                    "Grade Two does not teach advanced mathematics early. It develops the habits that make advanced mathematics possible: understanding, accuracy, reasoning, communication, reflection and confidence."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">EBM – Ejaz Bukhari Method</span> • Learn. Practise. Think. Apply. Grow.
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onEnrollOrStart) onEnrollOrStart();
              }}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 2 Math Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
