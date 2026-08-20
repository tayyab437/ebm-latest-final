import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, ArrowRight, FileText, Check, Calculator } from "lucide-react";

interface GradeThreeMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeThreeMathModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeThreeMathModalProps) {
  const [activeTab, setActiveTab] = useState<"contract" | "advantage" | "foundations">("contract");
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
    { num: 3, text: "I will choose a suitable strategy." },
    { num: 4, text: "I will show my working clearly." },
    { num: 5, text: "I will explain with numbers, diagrams or words." },
    { num: 6, text: "I will estimate and check when possible." },
    { num: 7, text: "I will correct mistakes and learn their cause." },
    { num: 8, text: "I will ask for help when I need it." },
    { num: 9, text: "I will try another method when useful." },
    { num: 10, text: "I will practise facts and skills regularly." },
    { num: 11, text: "I will keep my work neat and organised." },
    { num: 12, text: "I will use mathematics in everyday life." },
  ];

  const foundationAreas = [
    {
      title: "NUMBERS",
      subtitle: "to 10,000",
      detail: "Place value, rounding & estimation",
      color: "from-blue-600 to-cyan-600",
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      text: "text-blue-900",
    },
    {
      title: "OPERATIONS",
      subtitle: "add, subtract",
      detail: "Fluent multi-digit calculation & estimation",
      color: "from-teal-600 to-emerald-600",
      border: "border-teal-200",
      bg: "bg-teal-50/70",
      text: "text-teal-900",
    },
    {
      title: "MULTIPLY ÷",
      subtitle: "facts & groups",
      detail: "Multiplication facts, arrays & sharing",
      color: "from-indigo-600 to-violet-600",
      border: "border-indigo-200",
      bg: "bg-indigo-50/70",
      text: "text-indigo-900",
    },
    {
      title: "FRACTIONS",
      subtitle: "equal parts",
      detail: "Comparing fractions & number lines",
      color: "from-amber-600 to-orange-600",
      border: "border-amber-200",
      bg: "bg-amber-50/70",
      text: "text-amber-900",
    },
    {
      title: "MEASUREMENT",
      subtitle: "length, mass",
      detail: "Capacity, volume & metric conversions",
      color: "from-sky-600 to-blue-600",
      border: "border-sky-200",
      bg: "bg-sky-50/70",
      text: "text-sky-900",
    },
    {
      title: "TIME & MONEY",
      subtitle: "elapsed time",
      detail: "Mixed value currencies & analog/digital time",
      color: "from-rose-600 to-pink-600",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      text: "text-rose-900",
    },
    {
      title: "GEOMETRY",
      subtitle: "shapes & angles",
      detail: "Polygons, right angles & perimeter",
      color: "from-emerald-600 to-teal-600",
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      text: "text-emerald-900",
    },
    {
      title: "DATA",
      subtitle: "tables & graphs",
      detail: "Bar/line graphs, pictograms & 2-step analysis",
      color: "from-cyan-600 to-indigo-600",
      border: "border-cyan-200",
      bg: "bg-cyan-50/70",
      text: "text-cyan-900",
    },
  ];

  const learningCycle = [
    { step: "1", title: "LEARN", desc: "Understand concepts clearly before jumping into procedures", color: "bg-[#0288d1]" },
    { step: "2", title: "PRACTISE", desc: "Practise for deep accuracy, automaticity and fluency", color: "bg-teal-600" },
    { step: "3", title: "THINK", desc: "Explain mathematical thinking and compare strategies", color: "bg-indigo-600" },
    { step: "4", title: "APPLY", desc: "Connect math to real situations and two-step problems", color: "bg-amber-600" },
    { step: "5", title: "REFLECT", desc: "Learn constructively from mistakes and verify reasonability", color: "bg-rose-600" },
    { step: "6", GROW: "GROW", title: "GROW", desc: "Build lasting confidence and independent problem-solving", color: "bg-emerald-600" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#01579b] via-[#0288d1] to-[#0097a7] text-white p-5 sm:p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner">
                <span className="text-[9px] font-black tracking-wider text-cyan-200">EBM</span>
                <span className="text-xs font-bold leading-none">MATHS</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-300/20 text-cyan-200 border border-cyan-300/30">
                    Grade Three Curriculum
                  </span>
                  <span className="text-xs text-cyan-100">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade Three Mathematics Framework
                </h2>
                <p className="text-xs text-cyan-100 italic font-serif">
                  A confident step towards independent mathematical thinking
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-cyan-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
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
                  ? "bg-white text-[#01579b] font-bold shadow-md"
                  : "text-cyan-100 hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Contract & Promise</span>
            </button>

            <button
              onClick={() => setActiveTab("advantage")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "advantage"
                  ? "bg-white text-[#01579b] font-bold shadow-md"
                  : "text-cyan-100 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM Advantage (IB & A-Level Ready)</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-white text-[#01579b] font-bold shadow-md"
                  : "text-cyan-100 hover:bg-white/10"
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
              <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4.5">
                <div className="flex items-center space-x-2 text-sky-950 font-serif font-bold text-base mb-1.5">
                  <BookOpen className="w-5 h-5 text-[#0288d1]" />
                  <span>About This Grade Three Programme</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  This book helps Grade Three learners deepen their mathematical understanding step by step. Children build on Grade Two knowledge while developing stronger fluency, accuracy, reasoning, and independence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-sky-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-sky-100">
                    <span className="font-bold text-sky-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Numbers and place value (to 10,000)</li>
                      <li>• Addition, subtraction and estimation</li>
                      <li>• Multiplication and division facts & arrays</li>
                      <li>• Fractions, equal parts, shapes and patterns</li>
                      <li>• Measurement, elapsed time and mixed money</li>
                      <li>• Graphs, tables, and two-step word problems</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-sky-100">
                    <span className="font-bold text-sky-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Understand concepts clearly before procedures</li>
                      <li>• Practise for speed, accuracy and fluency</li>
                      <li>• Explain mathematical thinking out loud</li>
                      <li>• Choose suitable strategies with flexibility</li>
                      <li>• Learn constructively from errors and mistakes</li>
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
                      <Sparkles className="w-5 h-5 text-[#0288d1]" />
                      <span>My EBM Maths Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I know that mathematics becomes easier when I understand, practise, explain, apply and learn from my mistakes."
                    </p>
                  </div>
                  <button
                    onClick={selectAllPromises}
                    className="text-xs font-semibold text-[#0288d1] hover:underline self-start sm:self-auto cursor-pointer"
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
                            ? "bg-sky-50/90 border-sky-300 text-sky-950"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#0288d1] text-white"
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
                    <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>I can use larger numbers with confidence.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>I can solve one-step and two-step problems.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>I can explain why a method works.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>I can check whether an answer is reasonable.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#0288d1] to-[#01579b] text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-cyan-200 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-cyan-50">
                        "I will learn with curiosity. I will think before I answer. I will work accurately and carefully. I will practise with purpose. I will grow into an independent problem-solver."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-cyan-200 mt-3 pt-2 border-t border-white/20">
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
              <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-cyan-300 text-xs font-bold uppercase tracking-widest">
                    The EBM Practice Advantage
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How EBM Mathematics Builds Foundations for IB & A-Level Success
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Building conceptual thinkers who can reason, apply and work accurately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-xl sm:text-2xl font-black text-cyan-200">CONCEPTS FIRST</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Clear meaning first before mechanical procedures
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-[#0288d1] to-[#01579b] text-white rounded-xl p-3.5 shadow-lg border border-cyan-300/40 flex flex-col justify-center">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white">FLUENCY + REASONING</span>
                    <p className="text-[11px] font-semibold text-cyan-100 mt-1">
                      Structured practice across the complete learning cycle
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">3,000+</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Questions in EBM Grade Three Mathematics
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-400 italic mt-4">
                  "Questions progress from understanding and fluency to reasoning, application, reflection and independent problem-solving."
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
                  <div className="bg-cyan-50/90 border-2 border-[#0288d1] rounded-xl p-4 shadow-sm">
                    <span className="font-black text-cyan-950 uppercase tracking-wide block mb-2 text-center border-b border-cyan-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-cyan-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Learn clearly</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Practise purposefully</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Think and explain</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Apply in context</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
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
                        <th className="p-2 rounded-r font-bold">What Grade Three EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Understand concepts</td>
                        <td className="p-2 font-medium text-emerald-900">Use accurate methods</td>
                        <td className="p-2 text-slate-800">Understand why a method works, then practise it accurately.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Explore and ask why</td>
                        <td className="p-2 font-medium text-emerald-900">Solve systematically</td>
                        <td className="p-2 text-slate-800">Compare strategies and organise each step clearly.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Connect learning to life</td>
                        <td className="p-2 font-medium text-emerald-900">Apply mathematics</td>
                        <td className="p-2 text-slate-800">Use number, time, money, measurement and data in real situations.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Communicate reasoning</td>
                        <td className="p-2 font-medium text-emerald-900">Show complete working</td>
                        <td className="p-2 text-slate-800">Explain answers with numbers, diagrams, symbols and words.</td>
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
              {/* Why Grade Three Matters */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-1">
                  Why Grade Three Matters: What Changes From Grade Two?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Grade Three is where learners move from basic arithmetic towards fluent, connected problem-solving. Multiplication and division become related operations; fractions describe equal parts; and measurement, geometry and data require careful interpretation. One-step questions also develop into two-step situations.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Number Range</span>
                    <span className="text-[10px] text-slate-600">Larger numbers (to 10,000), place value, rounding</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Operations</span>
                    <span className="text-[10px] text-slate-600">Fluent + & −; multiplication & division facts</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Problems</span>
                    <span className="text-[10px] text-slate-600">One-step & progressive two-step situations</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Explanation</span>
                    <span className="text-[10px] text-slate-600">Equations, diagrams, tables & written reasoning</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Choose strategy, estimate, check & improve</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#0288d1]" />
                  <span>The 8 Grade Three Foundation Pillars</span>
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
                  The Grade Three EBM Learning Cycle
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

                <div className="mt-4 p-3 bg-cyan-50 rounded-lg border border-cyan-200 text-center">
                  <span className="text-[10px] font-bold text-[#01579b] uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-cyan-950 font-serif italic">
                    "Grade Three strengthens the habits that make advanced learning possible: understanding, fluency, accuracy, reasoning, communication, reflection and confidence."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">EBM – Ejaz Bukhari Method</span> • Strong foundations. Independent thinking. Lifelong mathematical growth.
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
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0288d1] to-[#01579b] hover:from-[#039be5] hover:to-[#0288d1] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 3 Math Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
