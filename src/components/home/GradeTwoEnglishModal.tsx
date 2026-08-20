import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, ArrowRight, FileText, Check } from "lucide-react";

interface GradeTwoEnglishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeTwoEnglishModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeTwoEnglishModalProps) {
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
    { num: 1, text: "I will listen carefully and follow instructions." },
    { num: 2, text: "I will read every passage slowly and carefully." },
    { num: 3, text: "I will use new words in complete sentences." },
    { num: 4, text: "I will speak clearly, kindly and respectfully." },
    { num: 5, text: "I will organise my ideas before I write." },
    { num: 6, text: "I will check capitals, punctuation and spelling." },
    { num: 7, text: "I will ask questions when I do not understand." },
    { num: 8, text: "I will not be afraid of making mistakes." },
    { num: 9, text: "I will correct my mistakes and learn from them." },
    { num: 10, text: "I will connect each topic with real life." },
    { num: 11, text: "I will share ideas and listen to others." },
    { num: 12, text: "I will practise English a little every day." },
  ];

  const foundationAreas = [
    {
      title: "READING",
      subtitle: "fluency and understanding",
      detail: "Topic-based passages, story elements & decoding",
      color: "from-amber-600 to-orange-600",
      border: "border-amber-200",
      bg: "bg-amber-50/70",
      text: "text-amber-950",
    },
    {
      title: "WRITING",
      subtitle: "sentences & short paragraphs",
      detail: "Complete sentences, connecting words & ideas",
      color: "from-orange-600 to-amber-600",
      border: "border-orange-200",
      bg: "bg-orange-50/70",
      text: "text-orange-950",
    },
    {
      title: "SPEAKING",
      subtitle: "clear & confident expression",
      detail: "Participate in discussions & express thoughts",
      color: "from-yellow-600 to-amber-600",
      border: "border-yellow-200",
      bg: "bg-yellow-50/70",
      text: "text-yellow-950",
    },
    {
      title: "LISTENING",
      subtitle: "attention and response",
      detail: "Attentive listening & respectful responses",
      color: "from-teal-600 to-emerald-600",
      border: "border-teal-200",
      bg: "bg-teal-50/70",
      text: "text-teal-950",
    },
    {
      title: "VOCABULARY",
      subtitle: "meaning & use in context",
      detail: "Curriculum word bank & contextual definitions",
      color: "from-amber-700 to-orange-700",
      border: "border-amber-300",
      bg: "bg-amber-50/90",
      text: "text-amber-950",
    },
    {
      title: "GRAMMAR",
      subtitle: "correct & meaningful sentences",
      detail: "Parts of speech, tense consistency & punctuation",
      color: "from-red-600 to-orange-600",
      border: "border-red-200",
      bg: "bg-red-50/70",
      text: "text-red-950",
    },
    {
      title: "COMPREHENSION",
      subtitle: "main ideas, details & inference",
      detail: "Prediction, sequencing, compare & contrast",
      color: "from-rose-600 to-pink-600",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      text: "text-rose-950",
    },
    {
      title: "WORLD KNOWLEDGE",
      subtitle: "science, society, health & nature",
      detail: "Real-world themes integrated with language",
      color: "from-emerald-600 to-green-600",
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      text: "text-emerald-950",
    },
  ];

  const learningCycle = [
    { step: "1", title: "DISCOVER", desc: "Encounter an engaging topic from nature, health or society", color: "bg-[#d84315]" },
    { step: "2", title: "READ & LISTEN", desc: "Read passages carefully and listen for key details", color: "bg-amber-600" },
    { step: "3", title: "THINK", desc: "Think and discuss ideas, question and make connections", color: "bg-orange-600" },
    { step: "4", title: "SPEAK", desc: "Express thoughts clearly, kindly and with confidence", color: "bg-yellow-600" },
    { step: "5", title: "WRITE & APPLY", desc: "Write complete sentences and short structured paragraphs", color: "bg-red-600" },
    { step: "6", title: "REFLECT & GROW", desc: "Review spelling, punctuation, learn from mistakes and grow", color: "bg-emerald-600" },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-slate-950/70 animate-fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-[#bf360c] via-[#d84315] to-[#f4511e] text-white p-5 sm:p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center p-1 shadow-inner">
                <span className="text-[9px] font-black tracking-wider text-amber-200">EBM</span>
                <span className="text-xs font-bold leading-none">ENGLISH</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-300/20 text-amber-200 border border-amber-300/30">
                    Grade Two Curriculum
                  </span>
                  <span className="text-xs text-amber-100">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade Two English Framework
                </h2>
                <p className="text-xs text-amber-100 italic font-serif">
                  Learning English while discovering more about the world
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-amber-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
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
                  ? "bg-white text-[#bf360c] font-bold shadow-md"
                  : "text-amber-100 hover:bg-white/10"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Student Contract & Promise</span>
            </button>

            <button
              onClick={() => setActiveTab("advantage")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "advantage"
                  ? "bg-white text-[#bf360c] font-bold shadow-md"
                  : "text-amber-100 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM English Advantage</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-white text-[#bf360c] font-bold shadow-md"
                  : "text-amber-100 hover:bg-white/10"
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
                <div className="flex items-center space-x-2 text-amber-950 font-serif font-bold text-base mb-1.5">
                  <BookOpen className="w-5 h-5 text-[#d84315]" />
                  <span>About This Grade Two Programme</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                  This book helps Grade Two learners improve English through meaningful reading, listening, speaking and writing. In EBM, Mathematics is taught separately. Other age-appropriate subjects and topics are taught through English, so every lesson strengthens language and helps children learn something new about science, society, health, environment, culture and the wider world.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-amber-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                    <span className="font-bold text-amber-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Reading comprehension and stories</li>
                      <li>• Vocabulary, grammar and spelling</li>
                      <li>• Speaking and careful listening</li>
                      <li>• Sentences and short paragraphs</li>
                      <li>• Science, society, health and nature</li>
                      <li>• Culture, environment & general knowledge</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-amber-100">
                    <span className="font-bold text-amber-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Learn English in meaningful contexts</li>
                      <li>• Use new words in complete sentences</li>
                      <li>• Ask questions and think about ideas</li>
                      <li>• Connect language with real knowledge</li>
                      <li>• Learn constructively from mistakes</li>
                      <li>• Express ideas with growing confidence</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* My EBM English Promise */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#d84315]" />
                      <span>My EBM English Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I know that every lesson can help me improve my English and learn something new about people, nature and the world."
                    </p>
                  </div>
                  <button
                    onClick={selectAllPromises}
                    className="text-xs font-semibold text-[#d84315] hover:underline self-start sm:self-auto cursor-pointer"
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
                            ? "bg-amber-50/90 border-amber-300 text-amber-950"
                            : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? "bg-[#d84315] text-white"
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
                    <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>I can read with growing understanding.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>I can learn and use new words.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>I can speak in clear, complete sentences.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>I can write connected ideas with care.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>I can learn about the world through English.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#d84315] to-[#bf360c] text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-amber-200 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-amber-50">
                        "I will learn with curiosity. I will read with understanding. I will speak with confidence. I will write with care. I will use English to discover the world."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-amber-200 mt-3 pt-2 border-t border-white/20">
                      Created by Syed Ejaz Bukhari
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: THE EBM ENGLISH ADVANTAGE */}
          {activeTab === "advantage" && (
            <div className="space-y-6 animate-fade-in">
              {/* Double Learning Advantage Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-amber-300 text-xs font-bold uppercase tracking-widest">
                    Language, Knowledge and Learning
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How EBM English Builds Language and Knowledge Together
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    One subject develops language, knowledge, curiosity and confident expression.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-base sm:text-lg font-black text-amber-200 block">ENGLISH SKILLS</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Reading, writing, speaking and listening
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-[#d84315] to-[#bf360c] text-white rounded-xl p-3.5 shadow-lg border border-amber-300/40 flex flex-col justify-center">
                    <span className="text-base sm:text-lg font-black tracking-tight text-white block">SUBJECT KNOWLEDGE</span>
                    <p className="text-[11px] font-semibold text-amber-100 mt-1">
                      Science, society, health, environment, culture & more
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-base sm:text-lg font-black text-amber-300 block">THINKING & EXPRESSION</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Question, connect, explain & communicate confidently
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-center text-slate-300 italic mt-4">
                  "THE EBM DOUBLE-LEARNING ADVANTAGE: Learners do not practise English through empty sentences alone. They use English to understand meaningful topics, discuss ideas, explain knowledge and communicate with purpose."
                </p>
              </div>

              {/* Language Development vs Bridge vs Knowledge Development */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 text-center">
                  Language and Knowledge Working Together
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Language Development */}
                  <div className="bg-orange-50/70 border border-orange-200 rounded-xl p-4">
                    <span className="font-bold text-orange-900 uppercase tracking-wide block mb-2 text-center border-b border-orange-200 pb-1">
                      Language Development
                    </span>
                    <ul className="space-y-1.5 text-orange-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                        <span>Reading and comprehension</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                        <span>Vocabulary and grammar</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                        <span>Speaking and listening</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-600"></span>
                        <span>Writing and punctuation</span>
                      </li>
                    </ul>
                  </div>

                  {/* EBM BRIDGE */}
                  <div className="bg-amber-50/90 border-2 border-[#d84315] rounded-xl p-4 shadow-sm">
                    <span className="font-black text-amber-950 uppercase tracking-wide block mb-2 text-center border-b border-amber-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-amber-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d84315]"></span>
                        <span>Discover a meaningful topic</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d84315]"></span>
                        <span>Read or listen carefully</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d84315]"></span>
                        <span>Think and discuss</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d84315]"></span>
                        <span>Speak, write and apply</span>
                      </li>
                    </ul>
                  </div>

                  {/* Knowledge Development */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                    <span className="font-bold text-emerald-900 uppercase tracking-wide block mb-2 text-center border-b border-emerald-200 pb-1">
                      Knowledge Development
                    </span>
                    <ul className="space-y-1.5 text-emerald-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Science and nature</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>People and communities</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Health and environment</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Culture and the wider world</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Practical Table */}
                <div className="mt-4 pt-4 border-t border-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700">
                        <th className="p-2 rounded-l font-bold">English Skill</th>
                        <th className="p-2 font-bold">Knowledge Connection</th>
                        <th className="p-2 rounded-r font-bold">What Grade Two EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-amber-900">Reading comprehension</td>
                        <td className="p-2 font-medium text-emerald-900">Science and nature</td>
                        <td className="p-2 text-slate-800">Find the main idea and details while learning accurate facts.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-amber-900">Vocabulary</td>
                        <td className="p-2 font-medium text-emerald-900">The world around us</td>
                        <td className="p-2 text-slate-800">Understand new words in context and use them correctly.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-amber-900">Speaking and listening</td>
                        <td className="p-2 font-medium text-emerald-900">Community and citizenship</td>
                        <td className="p-2 text-slate-800">Discuss ideas, listen respectfully and answer clearly.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-amber-900">Writing</td>
                        <td className="p-2 font-medium text-emerald-900">Health and environment</td>
                        <td className="p-2 text-slate-800">Write connected sentences about meaningful topics.</td>
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
                  Grade Two is the stage where children begin using English more confidently to learn. They read longer texts, build wider vocabulary, discuss ideas and write connected sentences. Meaningful subject topics make language purposeful while knowledge grows alongside communication.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Reading</span>
                    <span className="text-[10px] text-slate-600">Longer topic texts with main ideas</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Vocabulary</span>
                    <span className="text-[10px] text-slate-600">Wider cross-subject word bank</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Writing</span>
                    <span className="text-[10px] text-slate-600">Complete sentences & short paragraphs</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Comprehension</span>
                    <span className="text-[10px] text-slate-600">Sequence, prediction & simple inference</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Use context clues; check punctuation</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#d84315]" />
                  <span>The 8 Grade Two English Foundation Pillars</span>
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
                  The Grade Two EBM English Learning Cycle
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
                  <span className="text-[10px] font-bold text-[#bf360c] uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-amber-950 font-serif italic">
                    "One subject develops language, knowledge, curiosity and confident expression. Grade Two EBM English builds communication while discovering and understanding the wider world."
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
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#d84315] to-[#bf360c] hover:from-[#f4511e] hover:to-[#d84315] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 2 English Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
