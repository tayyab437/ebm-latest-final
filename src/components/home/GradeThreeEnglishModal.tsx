import React, { useState } from "react";
import { X, CheckCircle2, Award, Sparkles, BookOpen, Layers, ArrowRight, FileText, Check } from "lucide-react";

interface GradeThreeEnglishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollOrStart?: () => void;
}

export default function GradeThreeEnglishModal({
  isOpen,
  onClose,
  onEnrollOrStart,
}: GradeThreeEnglishModalProps) {
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
    { num: 1, text: "I will read each passage carefully for meaning." },
    { num: 2, text: "I will identify the main idea and important details." },
    { num: 3, text: "I will use new vocabulary in speaking and writing." },
    { num: 4, text: "I will listen respectfully and respond clearly." },
    { num: 5, text: "I will organise my ideas before writing a paragraph." },
    { num: 6, text: "I will check grammar, spelling and punctuation." },
    { num: 7, text: "I will ask questions and explain what I understand." },
    { num: 8, text: "I will give reasons and use evidence from the text." },
    { num: 9, text: "I will correct mistakes and learn why they happened." },
    { num: 10, text: "I will connect English topics with real knowledge." },
    { num: 11, text: "I will share ideas confidently and respect others." },
    { num: 12, text: "I will practise English regularly and independently." },
  ];

  const foundationAreas = [
    {
      title: "READING",
      subtitle: "fluency, meaning & inference",
      detail: "Longer passages, non-fiction & key details",
      color: "from-sky-600 to-blue-600",
      border: "border-sky-200",
      bg: "bg-sky-50/70",
      text: "text-sky-950",
    },
    {
      title: "WRITING",
      subtitle: "organised paragraphs",
      detail: "Topic sentences, supporting facts & conclusions",
      color: "from-blue-600 to-indigo-600",
      border: "border-blue-200",
      bg: "bg-blue-50/70",
      text: "text-blue-950",
    },
    {
      title: "SPEAKING",
      subtitle: "discussion & clear explanation",
      detail: "Structured reasoning & oral presentation skills",
      color: "from-cyan-600 to-teal-600",
      border: "border-cyan-200",
      bg: "bg-cyan-50/70",
      text: "text-cyan-950",
    },
    {
      title: "LISTENING",
      subtitle: "attention, notes & response",
      detail: "Key detail identification & thoughtful replies",
      color: "from-teal-600 to-emerald-600",
      border: "border-teal-200",
      bg: "bg-teal-50/70",
      text: "text-teal-950",
    },
    {
      title: "VOCABULARY",
      subtitle: "subject words & context clues",
      detail: "Domain terms, synonyms, antonyms & affixes",
      color: "from-indigo-600 to-sky-600",
      border: "border-indigo-200",
      bg: "bg-indigo-50/70",
      text: "text-indigo-950",
    },
    {
      title: "GRAMMAR",
      subtitle: "accurate & varied sentences",
      detail: "Compound sentences, correct tenses & punctuation",
      color: "from-violet-600 to-purple-600",
      border: "border-violet-200",
      bg: "bg-violet-50/70",
      text: "text-violet-950",
    },
    {
      title: "COMPREHENSION",
      subtitle: "main ideas, evidence & connections",
      detail: "Cause & effect, summary, sequence & evaluation",
      color: "from-rose-600 to-pink-600",
      border: "border-rose-200",
      bg: "bg-rose-50/70",
      text: "text-rose-950",
    },
    {
      title: "WORLD KNOWLEDGE",
      subtitle: "science, society, geography & culture",
      detail: "Interdisciplinary themes embedded in reading",
      color: "from-emerald-600 to-teal-600",
      border: "border-emerald-200",
      bg: "bg-emerald-50/70",
      text: "text-emerald-950",
    },
  ];

  const learningCycle = [
    { step: "1", title: "DISCOVER", desc: "Encounter rich non-fiction and literary topics", color: "bg-[#0288d1]" },
    { step: "2", title: "READ & LISTEN", desc: "Read closely for meaning and listen for evidence", color: "bg-sky-600" },
    { step: "3", title: "THINK & CONNECT", desc: "Question, compare ideas and make cross-subject links", color: "bg-cyan-600" },
    { step: "4", title: "SPEAK & DISCUSS", desc: "Discuss perspectives and explain ideas clearly", color: "bg-teal-600" },
    { step: "5", title: "WRITE & APPLY", desc: "Draft structured, cohesive paragraphs with details", color: "bg-indigo-600" },
    { step: "6", title: "REFLECT & GROW", desc: "Self-check work, cite evidence and grow independently", color: "bg-emerald-600" },
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
                <span className="text-[9px] font-black tracking-wider text-sky-200">EBM</span>
                <span className="text-xs font-bold leading-none">ENGLISH</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-300/20 text-sky-200 border border-sky-300/30">
                    Grade Three Curriculum
                  </span>
                  <span className="text-xs text-sky-100">Ejaz Bukhari Method</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
                  Grade Three English Framework
                </h2>
                <p className="text-xs text-sky-100 italic font-serif">
                  Building stronger English while learning more about the world
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-sky-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors cursor-pointer"
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
                  : "text-sky-100 hover:bg-white/10"
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
                  : "text-sky-100 hover:bg-white/10"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>The EBM English Advantage</span>
            </button>

            <button
              onClick={() => setActiveTab("foundations")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === "foundations"
                  ? "bg-white text-[#01579b] font-bold shadow-md"
                  : "text-sky-100 hover:bg-white/10"
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
                  This book helps Grade Three learners strengthen English through purposeful reading, listening, speaking and writing. In EBM, Mathematics is taught separately. Other age-appropriate subjects and topics are taught through English, so learners improve language while building useful knowledge about science, society, health, environment, geography, history, culture and the wider world.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3.5 pt-3.5 border-t border-sky-200/60 text-xs">
                  <div className="bg-white/80 rounded-lg p-3 border border-sky-100">
                    <span className="font-bold text-sky-950 uppercase tracking-wide block mb-1">
                      What Learners Explore:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Reading comprehension and longer texts</li>
                      <li>• Vocabulary, grammar, spelling and word study</li>
                      <li>• Speaking, discussion and careful listening</li>
                      <li>• Sentences, paragraphs and organised writing</li>
                      <li>• Science, society, health and environment</li>
                      <li>• Geography, history, culture & general knowledge</li>
                    </ul>
                  </div>
                  <div className="bg-white/80 rounded-lg p-3 border border-sky-100">
                    <span className="font-bold text-sky-950 uppercase tracking-wide block mb-1">
                      How EBM Learners Grow:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      <li>• Learn English through meaningful subject content</li>
                      <li>• Use new vocabulary accurately and confidently</li>
                      <li>• Identify main ideas, details and relationships</li>
                      <li>• Ask questions, explain ideas and give reasons</li>
                      <li>• Connect new knowledge with real life</li>
                      <li>• Reflect, self-correct and work more independently</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* My EBM English Promise */}
              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-[#0288d1]" />
                      <span>My EBM English Promise</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      "I know that every lesson can strengthen my English, help me think clearly and teach me something useful about people, places, nature, society and the world."
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
                    <span className="text-[10px] font-bold tracking-widest text-sky-300 uppercase block mb-1">
                      I Am Learning Step By Step
                    </span>
                    <ul className="text-xs space-y-1.5 text-slate-200">
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>I can read longer texts with understanding.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>I can use subject vocabulary in context.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>I can discuss ideas and explain my thinking.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>I can write organised, connected paragraphs.</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>I can learn new subjects and topics through English.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-[#0288d1] to-[#01579b] text-white rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-sky-200 block mb-1">
                        My EBM Student Creed
                      </span>
                      <p className="text-xs italic font-serif leading-relaxed text-sky-50">
                        "I will learn with curiosity. I will read to understand and discover. I will speak with clarity and confidence. I will write with purpose and care. I will use English to understand the wider world."
                      </p>
                    </div>
                    <div className="text-right text-[11px] font-semibold text-sky-200 mt-3 pt-2 border-t border-white/20">
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
              <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-md">
                <div className="text-center max-w-xl mx-auto mb-5">
                  <span className="text-sky-300 text-xs font-bold uppercase tracking-widest">
                    Language, Knowledge and Learning
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                    How EBM English Builds Language and Knowledge Together
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    One subject builds language, knowledge and confident thinking.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-base sm:text-lg font-black text-sky-200 block">ENGLISH SKILLS</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Reading, writing, speaking and listening
                    </p>
                  </div>
                  <div className="bg-gradient-to-b from-[#0288d1] to-[#01579b] text-white rounded-xl p-3.5 shadow-lg border border-sky-300/40 flex flex-col justify-center">
                    <span className="text-base sm:text-lg font-black tracking-tight text-white block">SUBJECT KNOWLEDGE</span>
                    <p className="text-[11px] font-semibold text-sky-100 mt-1">
                      Science, society, geography, health, history & culture
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
                    <span className="text-base sm:text-lg font-black text-emerald-400 block">THINKING & EXPRESSION</span>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Question, infer, compare, explain & communicate
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
                  <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
                    <span className="font-bold text-blue-900 uppercase tracking-wide block mb-2 text-center border-b border-blue-200 pb-1">
                      Language Development
                    </span>
                    <ul className="space-y-1.5 text-blue-950">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Reading and comprehension</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Vocabulary and grammar</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Speaking and listening</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Paragraph writing & editing</span>
                      </li>
                    </ul>
                  </div>

                  {/* EBM BRIDGE */}
                  <div className="bg-sky-50/90 border-2 border-[#0288d1] rounded-xl p-4 shadow-sm">
                    <span className="font-black text-sky-950 uppercase tracking-wide block mb-2 text-center border-b border-sky-200 pb-1">
                      ★ The EBM Bridge ★
                    </span>
                    <ul className="space-y-1.5 text-sky-950 font-medium">
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Discover a meaningful topic</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Read or listen for meaning</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
                        <span>Question, compare and infer</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]"></span>
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
                        <span>Society, geography and history</span>
                      </li>
                      <li className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span>Health, environment & citizenship</span>
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
                        <th className="p-2 rounded-r font-bold">What Grade Three EBM Learners Do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      <tr>
                        <td className="p-2 font-medium text-sky-900">Reading comprehension</td>
                        <td className="p-2 font-medium text-emerald-900">Science and nature</td>
                        <td className="p-2 text-slate-800">Find main ideas, details, sequence and simple inference while learning facts.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-sky-900">Vocabulary</td>
                        <td className="p-2 font-medium text-emerald-900">Geography, history and culture</td>
                        <td className="p-2 text-slate-800">Understand subject words in context and use them accurately.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-sky-900">Speaking and listening</td>
                        <td className="p-2 font-medium text-emerald-900">Society and citizenship</td>
                        <td className="p-2 text-slate-800">Ask questions, discuss ideas, listen respectfully and explain clearly.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium text-sky-900">Writing</td>
                        <td className="p-2 font-medium text-emerald-900">Health and environment</td>
                        <td className="p-2 text-slate-800">Write organised paragraphs that communicate useful information and ideas.</td>
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
                  Grade Three is a key stage in using English to learn. Learners read richer texts, build subject vocabulary, make simple inferences, discuss ideas and write organised paragraphs. Stronger English helps them understand more about the wider world.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Reading</span>
                    <span className="text-[10px] text-slate-600">Longer texts; main ideas, details & structure</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Vocabulary</span>
                    <span className="text-[10px] text-slate-600">Richer subject vocabulary from context</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Writing</span>
                    <span className="text-[10px] text-slate-600">Organised paragraphs with details</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="font-bold text-slate-900 block text-[11px]">Comprehension</span>
                    <span className="text-[10px] text-slate-600">Cause/effect, prediction & inference</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="font-bold text-slate-900 block text-[11px]">Independence</span>
                    <span className="text-[10px] text-slate-600">Self-check & cite text evidence</span>
                  </div>
                </div>
              </div>

              {/* 8 Foundation Areas */}
              <div>
                <h4 className="text-sm font-serif font-bold text-slate-900 mb-3 flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#0288d1]" />
                  <span>The 8 Grade Three English Foundation Pillars</span>
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
                  The Grade Three EBM English Learning Cycle
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

                <div className="mt-4 p-3 bg-sky-50 rounded-lg border border-sky-200 text-center">
                  <span className="text-[10px] font-bold text-[#01579b] uppercase tracking-widest block mb-0.5">
                    The Foundation Message
                  </span>
                  <p className="text-xs text-sky-950 font-serif italic">
                    "Grade Three EBM English develops stronger communication, knowledge and independent learning. One subject builds language, knowledge and confident thinking."
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
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0288d1] to-[#01579b] hover:from-[#039be5] hover:to-[#0288d1] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1.5"
            >
              <span>Explore Grade 3 English Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
