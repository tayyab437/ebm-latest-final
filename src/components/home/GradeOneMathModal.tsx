import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, ArrowRight, FileText, Check, Calculator } from "lucide-react";

interface GradeOneMathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeOneMathModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeOneMathModalProps) {
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
    { num: 1, text: "I will listen to each instruction carefully." },
    { num: 2, text: "I will count slowly and carefully." },
    { num: 3, text: "I will look at the whole question before answering." },
    { num: 4, text: "I will use objects, pictures or numbers to show my thinking." },
    { num: 5, text: "I will write numbers neatly and correctly." },
    { num: 6, text: "I will check my answer when I can." },
    { num: 7, text: "I will not be afraid of making a mistake." },
    { num: 8, text: "I will correct my mistakes and learn from them." },
    { num: 9, text: "I will ask for help when I need it." },
    { num: 10, text: "I will practise my maths regularly." },
    { num: 11, text: "I will keep my work neat and organised." },
    { num: 12, text: "I will look for maths in everyday life." },
  ];

  const foundationAreas = [
    {
      title: "NUMBERS",
      subtitle: "count, read & compare",
      detail: "Order numbers, cardinality & number lines",
      color: "from-emerald-600 to-green-600",
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      text: "text-emerald-900",
    },
    {
      title: "PLACE VALUE",
      subtitle: "tens and ones",
      detail: "Base ten blocks, groupings & decomposition",
      color: "from-teal-600 to-emerald-600",
      border: "border-teal-200",
      bg: "bg-teal-50/70",
      text: "text-teal-900",
    },
    {
      title: "ADD +",
      subtitle: "combine and totals",
      detail: "Number bonds, mental facts & visual adding",
      color: "from-green-600 to-lime-600",
      border: "border-green-200",
      bg: "bg-green-50/70",
      text: "text-green-900",
    },
    {
      title: "SUBTRACT −",
      subtitle: "take away & difference",
      detail: "Count back, compare groups & minus symbols",
      color: "from-amber-600 to-orange-600",
      border: "border-amber-200",
      bg: "bg-amber-50/70",
      text: "text-amber-900",
    },
    {
      title: "PATTERNS",
      subtitle: "notice and continue",
      detail: "Repeating sequences, color & shape rules",
      color: "from-cyan-600 to-teal-600",
      border: "border-cyan-200",
      bg: "bg-cyan-50/70",
      text: "text-cyan-900",
    },
    {
      title: "SHAPES",
      subtitle: "2D, 3D and position",
      detail: "Spatial awareness, attributes & orientation",
      color: "from-blue-600 to-indigo-600",
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      text: "text-blue-900",
    },
    {
      title: "MEASURE",
      subtitle: "time, money, length",
      detail: "O'clock time, coins, comparative length",
      color: "from-rose-600 to-pink-600",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      text: "text-rose-900",
    },
    {
      title: "DATA",
      subtitle: "sort, record & solve",
      detail: "Tally marks, object charts & simple graphs",
      color: "from-violet-600 to-purple-600",
      border: "border-violet-200",
      bg: "bg-violet-50/70",
      text: "text-violet-900",
    },
  ];

  const learningCycle = [
    { step: "1", title: "LEARN", desc: "Understand concepts with hands-on objects and pictures", color: "bg-[#388e3c]" },
    { step: "2", title: "PRACTISE", desc: "Practise essential number skills to build confidence", color: "bg-teal-600" },
    { step: "3", title: "THINK", desc: "Explain mathematical thinking with simple words or drawings", color: "bg-emerald-700" },
    { step: "4", title: "APPLY", desc: "Solve simple real-life problems and notice patterns", color: "bg-amber-600" },
    { step: "5", title: "REFLECT", desc: "Learn calmly from mistakes, check work and try again", color: "bg-rose-600" },
    { step: "6", title: "GROW", desc: "Grow step by step into a confident, joyful math learner", color: "bg-green-700" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#388e3c] text-white p-5 sm:p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner">
                <span className="text-[9px] font-black tracking-wider text-emerald-200">EBM</span>
                <span className="text-xs font-bold leading-none">MATHS</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-300/20 text-emerald-200 border border-emerald-300/30">
                    Grade One Curriculum
                  </span>
                  <span className="text-xs text-emerald-100">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade One Mathematics Framework
                </h2>
                <p className="text-xs text-emerald-100 italic font-serif">
                  A joyful beginning to confident mathematical thinking
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-emerald-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
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
                  ? "bg-white text-[#1b5e20] font-bold shadow-md"
                  : "text-emerald-100 hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Contract & Promise</span>
            </button>

            <button
              onClick={() => setActiveTab("advantage")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "advantage"
                  ? "bg-white text-[#1b5e20] font-bold shadow-md"
                  : "text-emerald-100 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM Advantage (IB & A-Level Ready)</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-white text-[#1b5e20] font-bold shadow-md"
                  : "text-emerald-100 hover:bg-white/10"
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
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4.5">
                <div className="flex items-center space-x-2 text-emerald-950 font-serif font-bold text-base mb-1.5">
                  <BookOpen className="w-5 h-5 text-[#388e3c]" />
                  <span>About This Grade One Programme</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  This book helps Grade One learners build a strong and happy beginning in mathematics. Children learn to understand numbers, notice patterns, solve simple problems, explain their thinking and develop the confidence to try, check, correct and try again.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-emerald-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-emerald-100">
                    <span className="font-bold text-emerald-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Counting and number recognition</li>
                      <li>• Place value and number order (tens & ones)</li>
                      <li>• Addition and subtraction basics</li>
                      <li>• Shapes, positions and repeating patterns</li>
                      <li>• Measurement, clock time and coins</li>
                      <li>• Data and simple real-life problems</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-emerald-100">
                    <span className="font-bold text-emerald-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Understand ideas with objects and pictures</li>
                      <li>• Practise important fundamental number skills</li>
                      <li>• Explain answers with simple words or symbols</li>
                      <li>• Notice patterns and make logical connections</li>
                      <li>• Learn calmly from every mistake</li>
                      <li>• Grow in confidence and self-assurance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* My EBM Maths Promise */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#388e3c]" />
                      <span>My EBM Maths Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I know that I can become better at mathematics when I listen carefully, think, practise, ask questions and learn from my mistakes."
                    </p>
                  </div>
                  <button
                    onClick={selectAllPromises}
                    className="text-xs font-semibold text-[#388e3c] hover:underline self-start sm:self-auto cursor-pointer"
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
                            ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#388e3c] text-white"
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
                    <span className="text-[10px] font-bold tracking-widest text-emerald-300 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can count, read and compare numbers.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can add and subtract simple amounts.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can recognise shapes and patterns.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can use time, money and measurement.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>I can explain how I found an answer.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-emerald-200 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-emerald-50">
                        "I will learn with joy. I will think before I answer. I will work with care. I will practise with confidence. I will learn from every mistake. I will grow one step at a time."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-emerald-200 mt-3 pt-2 border-t border-white/20">
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
              <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-emerald-300 text-xs font-bold uppercase tracking-widest">
                    The EBM Practice Advantage
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How Grade One EBM Mathematics Builds Strong Future Foundations
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Building the habits that make later mathematical success possible.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-300">2,156</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Questions in the EBM Grade One Mathematics programme
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-[#2e7d32] to-[#1b5e20] text-white rounded-xl p-3.5 shadow-lg border border-emerald-300/40 flex flex-col justify-center">
                    <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">6-STEP</span>
                    <p className="text-[11px] font-semibold text-emerald-100 mt-1">
                      EBM learning cycle from Learn to Grow
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-400">8 AREAS</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Core mathematical foundation areas
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-400 italic mt-4">
                  "The 2,156 questions are not repetition for its own sake. They progress from recognition and hands-on understanding to fluency, reasoning, application, reflection and growing independence."
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
                        <span>Curiosity and exploration</span>
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
                  <div className="bg-emerald-50/90 border-2 border-[#388e3c] rounded-xl p-4 shadow-sm">
                    <span className="font-black text-emerald-950 uppercase tracking-wide block mb-2 text-center border-b border-emerald-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-emerald-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#388e3c]"></span>
                        <span>Learn clearly</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#388e3c]"></span>
                        <span>Practise purposefully</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#388e3c]"></span>
                        <span>Think and explain</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#388e3c]"></span>
                        <span>Apply in context</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#388e3c]"></span>
                        <span>Reflect and improve</span>
                      </li>
                    </ul>
                  </div>

                  {/* A-Level */}
                  <div className="bg-green-50/70 border border-green-200 rounded-xl p-4">
                    <span className="font-bold text-green-900 uppercase tracking-wide block mb-2 text-center border-b border-green-200 pb-1">
                      A-Level-Ready Habits
                    </span>
                    <ul className="space-y-1.5 text-green-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        <span>Accuracy and fluency</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        <span>Organised working</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        <span>Persistence with problems</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        <span>Independent checking</span>
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
                        <th className="p-2 font-bold">Future A-Level-Ready Habit</th>
                        <th className="p-2 rounded-r font-bold">What Grade One EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Understand concepts</td>
                        <td className="p-2 font-medium text-emerald-900">Use accurate methods</td>
                        <td className="p-2 text-slate-800">Use objects and pictures to understand a number idea before using symbols.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Explore and notice patterns</td>
                        <td className="p-2 font-medium text-emerald-900">Think systematically</td>
                        <td className="p-2 text-slate-800">Sort, compare, continue patterns and explain what they notice.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Connect maths to daily life</td>
                        <td className="p-2 font-medium text-emerald-900">Apply mathematics</td>
                        <td className="p-2 text-slate-800">Use counting, time, money and measurement in familiar situations.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-blue-900">Communicate thinking</td>
                        <td className="p-2 font-medium text-emerald-900">Show working clearly</td>
                        <td className="p-2 text-slate-800">Explain answers with objects, drawings, numbers, symbols and simple words.</td>
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
              {/* Why Grade One Matters */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4.5">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-1">
                  Why Grade One Matters: From Early Skills to Grade One Growth
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Grade One is where children begin turning informal number experiences into organised mathematical thinking. Counting develops into place value; combining and taking away become addition and subtraction; patterns build logical thinking; shapes develop spatial awareness; and time, money, measurement and data connect mathematics with everyday life.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Counting</span>
                    <span className="text-[10px] text-slate-600">Read, write, compare & order numbers</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Operations</span>
                    <span className="text-[10px] text-slate-600">Understand simple addition & subtraction</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Representation</span>
                    <span className="text-[10px] text-slate-600">Pictures/objects to number sentences</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Daily Math</span>
                    <span className="text-[10px] text-slate-600">Solve simple one-step situations</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Begin checking, correcting & self-checking</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#388e3c]" />
                  <span>The 8 Grade One Foundation Pillars</span>
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
                  The Grade One EBM Learning Cycle
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

                <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-center">
                  <span className="text-[10px] font-bold text-[#1b5e20] uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-emerald-950 font-serif italic">
                    "Grade One does not rush children into advanced mathematics. It builds the understanding, accuracy, curiosity, confidence and learning habits that make advanced mathematics possible later."
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
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] hover:from-[#388e3c] hover:to-[#2e7d32] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 1 Math Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
