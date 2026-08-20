import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, ArrowRight, FileText, Check, Calculator } from "lucide-react";

interface GradeFourMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeFourMathModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeFourMathModalProps) {
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
    { num: 1, text: "I will read each question and identify the important information." },
    { num: 2, text: "I will decide which operation or strategy is suitable." },
    { num: 3, text: "I will estimate before calculating when it is helpful." },
    { num: 4, text: "I will organise multi-step working clearly." },
    { num: 5, text: "I will use correct mathematical vocabulary and symbols." },
    { num: 6, text: "I will explain and justify how I reached an answer." },
    { num: 7, text: "I will compare methods and choose an efficient one." },
    { num: 8, text: "I will check answers using an inverse or another method." },
    { num: 9, text: "I will study mistakes and record what they teach me." },
    { num: 10, text: "I will persist when a problem is unfamiliar or challenging." },
    { num: 11, text: "I will manage my time and present work neatly." },
    { num: 12, text: "I will apply mathematics to real-life decisions." },
  ];

  const foundationAreas = [
    {
      title: "NUMBERS",
      subtitle: "to 100,000",
      detail: "Place value, rounding & high-range estimation",
      color: "from-purple-600 to-indigo-600",
      border: "border-purple-200",
      bg: "bg-purple-50/70",
      text: "text-purple-900",
    },
    {
      title: "OPERATIONS",
      subtitle: "multi-step + and −",
      detail: "Multi-digit operations & order of operations",
      color: "from-fuchsia-600 to-pink-600",
      border: "border-fuchsia-200",
      bg: "bg-fuchsia-50/70",
      text: "text-fuchsia-900",
    },
    {
      title: "MULTIPLY ÷",
      subtitle: "1- & 2-digit factors",
      detail: "Long division, factors, multiples & primes",
      color: "from-violet-600 to-purple-600",
      border: "border-violet-200",
      bg: "bg-violet-50/70",
      text: "text-violet-900",
    },
    {
      title: "FRACTIONS",
      subtitle: "equivalence & operations",
      detail: "Comparing, adding and subtracting fractions",
      color: "from-amber-600 to-orange-600",
      border: "border-amber-200",
      bg: "bg-amber-50/70",
      text: "text-amber-900",
    },
    {
      title: "DECIMALS",
      subtitle: "tenths & hundredths",
      detail: "Fraction-decimal links & money connections",
      color: "from-teal-600 to-emerald-600",
      border: "border-teal-200",
      bg: "bg-teal-50/70",
      text: "text-teal-900",
    },
    {
      title: "MEASUREMENT",
      subtitle: "conversions & metrics",
      detail: "Area, perimeter, units & real-life measuring",
      color: "from-blue-600 to-cyan-600",
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      text: "text-blue-900",
    },
    {
      title: "GEOMETRY",
      subtitle: "angles & shapes",
      detail: "Coordinate grids, symmetry & classified polygons",
      color: "from-indigo-600 to-blue-600",
      border: "border-indigo-200",
      bg: "bg-indigo-50/70",
      text: "text-indigo-900",
    },
    {
      title: "DATA",
      subtitle: "graphs & probability",
      detail: "Line graphs, frequency tables & chance",
      color: "from-rose-600 to-pink-600",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      text: "text-rose-900",
    },
  ];

  const learningCycle = [
    { step: "1", title: "LEARN", desc: "Understand concepts & relationships deeply before rules", color: "bg-[#7b1fa2]" },
    { step: "2", title: "PRACTISE", desc: "Build automaticity and fluency across multi-digit skills", color: "bg-violet-600" },
    { step: "3", title: "THINK", desc: "Select efficient strategies, justify and explain working", color: "bg-indigo-600" },
    { step: "4", title: "APPLY", desc: "Solve complex, unfamiliar real-life and multi-step tasks", color: "bg-amber-600" },
    { step: "5", title: "REFLECT", desc: "Analyse errors, self-check and evaluate sensible outcomes", color: "bg-rose-600" },
    { step: "6", title: "GROW", desc: "Attain strategic mathematical thinking and independence", color: "bg-emerald-600" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#4a148c] via-[#7b1fa2] to-[#9c27b0] text-white p-5 sm:p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner">
                <span className="text-[9px] font-black tracking-wider text-purple-200">EBM</span>
                <span className="text-xs font-bold leading-none">MATHS</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-300/20 text-purple-200 border border-purple-300/30">
                    Grade Four Curriculum
                  </span>
                  <span className="text-xs text-purple-100">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade Four Mathematics Framework
                </h2>
                <p className="text-xs text-purple-100 italic font-serif">
                  A purposeful step towards advanced mathematical independence
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-purple-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
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
                  ? "bg-white text-[#4a148c] font-bold shadow-md"
                  : "text-purple-100 hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Contract & Promise</span>
            </button>

            <button
              onClick={() => setActiveTab("advantage")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "advantage"
                  ? "bg-white text-[#4a148c] font-bold shadow-md"
                  : "text-purple-100 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM Advantage (IB & A-Level Ready)</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-white text-[#4a148c] font-bold shadow-md"
                  : "text-purple-100 hover:bg-white/10"
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
              <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4.5">
                <div className="flex items-center space-x-2 text-purple-950 font-serif font-bold text-base mb-1.5">
                  <BookOpen className="w-5 h-5 text-[#7b1fa2]" />
                  <span>About This Grade Four Programme</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  This book helps Grade Four learners strengthen mathematical understanding, fluency and reasoning. Children build on Grade Three knowledge while learning to organise multi-step work, select efficient strategies, justify conclusions and solve unfamiliar problems with growing independence.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-purple-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-purple-100">
                    <span className="font-bold text-purple-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Whole numbers and place value to 100,000</li>
                      <li>• Addition, subtraction and smart estimation</li>
                      <li>• Multiplication, division & order of operations</li>
                      <li>• Fractions, decimals and number relationships</li>
                      <li>• Measurement, time, money and unit conversions</li>
                      <li>• Geometry, coordinates, data and probability</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-purple-100">
                    <span className="font-bold text-purple-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Understand ideas before using procedures</li>
                      <li>• Build fluency through purposeful practice</li>
                      <li>• Select and compare suitable strategies</li>
                      <li>• Explain and justify mathematical reasoning</li>
                      <li>• Analyse errors and improve independently</li>
                      <li>• Apply learning to complex real-life situations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* My EBM Maths Promise */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#7b1fa2]" />
                      <span>My EBM Maths Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I understand that progress comes from thinking deeply, practising purposefully, showing complete working, checking carefully and learning from every challenge."
                    </p>
                  </div>
                  <button
                    onClick={selectAllPromises}
                    className="text-xs font-semibold text-[#7b1fa2] hover:underline self-start sm:self-auto cursor-pointer"
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
                            ? "bg-purple-50/90 border-purple-300 text-purple-950"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#7b1fa2] text-white"
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
                    <span className="text-[10px] font-bold tracking-widest text-purple-300 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>I can work confidently with numbers to 100,000.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>I can solve and explain multi-step problems.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>I can connect fractions, decimals and measurement.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>I can interpret data and judge whether answers are reasonable.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#7b1fa2] to-[#4a148c] text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-purple-200 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-purple-50">
                        "I will learn with curiosity and discipline. I will think before choosing a method. I will show accurate and organised working. I will reflect, correct and improve. I will become a confident and responsible problem-solver."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-purple-200 mt-3 pt-2 border-t border-white/20">
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
              <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-purple-300 text-xs font-bold uppercase tracking-widest">
                    The EBM Practice Advantage
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How EBM Mathematics Builds Foundations for IB & A-Level Success
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Developing accurate, reflective and independent mathematical thinkers.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-xl sm:text-2xl font-black text-purple-200">CONCEPTUAL DEPTH</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Understand relationships before applying rules
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-[#7b1fa2] to-[#4a148c] text-white rounded-xl p-3.5 shadow-lg border border-purple-300/40 flex flex-col justify-center">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white">FLUENCY + APPLICATION</span>
                    <p className="text-[11px] font-semibold text-purple-100 mt-1">
                      Structured practice from skill to challenge
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">3,000+</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Questions in EBM Grade Four Mathematics
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-400 italic mt-4">
                  "Grade Four questions progress from concept-building and fluency to multi-step reasoning, application, error analysis, reflection and independent problem-solving."
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
                  <div className="bg-purple-50/90 border-2 border-[#7b1fa2] rounded-xl p-4 shadow-sm">
                    <span className="font-black text-purple-950 uppercase tracking-wide block mb-2 text-center border-b border-purple-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-purple-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b1fa2]"></span>
                        <span>Learn clearly</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b1fa2]"></span>
                        <span>Practise purposefully</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b1fa2]"></span>
                        <span>Think and explain</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b1fa2]"></span>
                        <span>Apply in context</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7b1fa2]"></span>
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
                        <th className="p-2 rounded-r font-bold">What Grade Four EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Understand relationships</td>
                        <td className="p-2 font-medium text-emerald-900">Use accurate procedures</td>
                        <td className="p-2 text-slate-800">Explain why a rule works, then apply it accurately and efficiently.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Investigate and generalise</td>
                        <td className="p-2 font-medium text-emerald-900">Solve systematically</td>
                        <td className="p-2 text-slate-800">Recognise patterns, compare strategies and organise multi-step solutions.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Connect concepts and contexts</td>
                        <td className="p-2 font-medium text-emerald-900">Apply mathematics</td>
                        <td className="p-2 text-slate-800">Use number, fractions, decimals, measurement, geometry and data in real situations.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Reflect and communicate</td>
                        <td className="p-2 font-medium text-emerald-900">Show complete reasoning</td>
                        <td className="p-2 text-slate-800">Justify conclusions, analyse errors and improve the quality of working.</td>
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
              {/* Why Grade Four Matters */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-1">
                  Why Grade Four Matters: What Changes From Grade Three?
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Grade Four is a major bridge between basic arithmetic and upper-primary mathematics. Learners work with larger numbers and multi-digit operations, explore factors and multiples, connect fractions with decimals, convert measurements, examine geometric relationships and interpret data. They also learn to plan multi-step solutions, justify choices and evaluate whether an answer is sensible.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Number Sense</span>
                    <span className="text-[10px] text-slate-600">Numbers to 100,000, place value, rounding</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Operations</span>
                    <span className="text-[10px] text-slate-600">Multi-digit +, −, ×, ÷ and order of ops</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Relationships</span>
                    <span className="text-[10px] text-slate-600">Factors, multiples, primes, fraction-decimals</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Problem-Solving</span>
                    <span className="text-[10px] text-slate-600">Multi-step situations, equations, error analysis</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Choose efficient methods, justify, self-check</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#7b1fa2]" />
                  <span>The 8 Grade Four Foundation Pillars</span>
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
                  The Grade Four EBM Learning Cycle
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

                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                  <span className="text-[10px] font-bold text-[#4a148c] uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-purple-950 font-serif italic">
                    "Grade Four strengthens the habits required for advanced learning: conceptual understanding, fluency, precision, strategic thinking, multi-step reasoning, communication, reflection and independence."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">EBM – Ejaz Bukhari Method</span> • Understand deeply. Work accurately. Think independently.
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
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#7b1fa2] to-[#4a148c] hover:from-[#8e24aa] hover:to-[#7b1fa2] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 4 Math Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
