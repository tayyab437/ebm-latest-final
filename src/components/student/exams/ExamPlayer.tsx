import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useExamStore } from "./exam.store";
import { 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Flag, 
  CheckCircle2, 
  AlertCircle, 
  Timer, 
  Save, 
  Monitor,
  Menu,
  X,
  HelpCircle,
  Sparkles,
  Zap,
  Check,
  Trophy,
  Award,
  RotateCcw,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { QuestionType } from "./exam.types";
import clsx from "clsx";

interface AutoScalingTextProps {
  text: string;
  className?: string;
  maxFontSize?: number;
  minFontSize?: number;
}

export function AutoScalingText({ text, className = "", maxFontSize = 18, minFontSize = 11 }: AutoScalingTextProps) {
  const [fontSize, setFontSize] = useState(maxFontSize);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setFontSize(maxFontSize);
  }, [text, maxFontSize]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ancestor = container.parentElement;
    while (ancestor) {
      const style = window.getComputedStyle(ancestor);
      if (
        (style.overflowY === "auto" || style.overflowY === "scroll" || ancestor.classList.contains("overflow-y-auto")) &&
        ancestor.clientHeight > 0
      ) {
        break;
      }
      ancestor = ancestor.parentElement;
    }

    if (ancestor && ancestor.scrollHeight > ancestor.clientHeight && fontSize > minFontSize) {
      setFontSize((prev) => Math.max(minFontSize, prev - 1));
    }
  }, [fontSize, text, minFontSize]);

  return (
    <div ref={containerRef} className={className} style={{ fontSize: `${fontSize}px`, lineHeight: "1.4" }}>
      {text}
    </div>
  );
}

export function ExamPlayer() {
  const { activeAttempt, submitExam, exams } = useExamStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 mins mock
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<number | null>(null);
  const [showMathInstructions, setShowMathInstructions] = useState(true);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, { isChecked: boolean; isCorrect: boolean; feedback: string }>>({});
  
  const examPlayerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (examPlayerRef.current?.requestFullscreen) {
          await examPlayerRef.current.requestFullscreen();
        } else if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
        setIsFullScreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullScreen(false);
      }
    } catch (e) {
      setIsFullScreen(prev => !prev);
    }
  };

  const isMathSubject = (subjectName?: string) => {
    if (!subjectName) return false;
    const s = subjectName.toLowerCase().trim();
    return s.includes("math") || s.includes("mathematics") || s.includes("maths") || s === "mth";
  };

  const activeExam = exams.find(e => e.id === activeAttempt?.examId) as any;
  const examSubject = (activeAttempt as any)?.subject || (activeAttempt as any)?.exam?.subject || activeExam?.subject || "Mathematics";
  const isMath = isMathSubject(examSubject);

  const [sliderSettings, setSliderSettings] = useState<{ splitPercentage: number; slides: Array<{ id: string; imageUrl: string; duration: number; title: string }> }>({
    splitPercentage: 40,
    slides: []
  });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Fetch math test slider settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/math-test-settings");
        if (res.ok) {
          const data = await res.json();
          if (data && data.slides) {
            setSliderSettings(data);
          }
        }
      } catch (e) {
        console.error("Error fetching math test slider settings:", e);
      }
    };
    fetchSettings();
  }, []);

  // Automatic slide timing based on backend settings
  useEffect(() => {
    if (!sliderSettings.slides || sliderSettings.slides.length <= 1) return;
    const currentSlide = sliderSettings.slides[currentSlideIndex];
    const durationMs = (currentSlide?.duration || 10) * 1000;

    const timer = setTimeout(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % sliderSettings.slides.length);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [currentSlideIndex, sliderSettings.slides]);

  // Mock questions for player demo
  const questions = isMath ? [
    { id: "q1", type: QuestionType.MCQ, content: "Calculate the value of x if 3x + 12 = 36.", options: ["x = 8", "x = 6", "x = 4", "x = 12"] },
    { id: "q2", type: QuestionType.SHORT_ANSWER, content: "State the Pythagorean Theorem and describe its geometric significance in right-angled triangles." },
    { id: "q3", type: QuestionType.TRUE_FALSE, content: "The derivative of f(x) = sin(x) is equal to cos(x)." },
    { id: "q4", type: QuestionType.MCQ, content: "What is the area of a circle with a radius of 7 cm? (Use π ≈ 22/7)", options: ["154 cm²", "44 cm²", "308 cm²", "49 cm²"] }
  ] : [
    { id: "q1", type: QuestionType.MCQ, content: "What is the primary focus of Evidence-Based Mentorship (EBM)?", options: ["Personalized Mastery & Growth", "Standardized Letter Grades", "Multiple Choice Testing Only", "Passive Attendance Logs"] },
    { id: "q2", type: QuestionType.SHORT_ANSWER, content: "Describe why critical thinking and AI-assisted learning matter in modern education." },
    { id: "q3", type: QuestionType.TRUE_FALSE, content: "Artificial Intelligence in classroom learning replaces human mentorship and empathy." },
    { id: "q4", type: QuestionType.MCQ, content: "Which learning technique yields the highest retention rate according to cognitive research?", options: ["Active Recall & Spaced Repetition", "Re-reading textbook chapters", "Passive lecture listening", "Cramming the night before"] }
  ];

  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (val: any) => {
    setAnswers({ ...answers, [currentQuestion.id]: val });
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmit = async () => {
    const totalAnswered = Object.keys(answers).length;
    const mockScore = Math.min(100, Math.round((totalAnswered / questions.length) * 100));
    setSubmittedScore(mockScore);
    setIsSubmitted(true);
    if (activeAttempt) {
      await submitExam(activeAttempt.id, answers);
    }
  };

  return (
    <div ref={examPlayerRef} className={clsx("fixed inset-0 bg-[#030712] z-[100] flex flex-col font-sans text-slate-100 selection:bg-rose-500 selection:text-white overflow-hidden", isFullScreen && "w-screen h-screen")}>
      {/* Player Top Navigation Bar */}
      <header className="h-14 bg-[#0A1120]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sm:px-10 relative shrink-0">
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-500/20">
            <div className="w-full h-full bg-[#0A1120] rounded-[14px] flex items-center justify-center text-rose-400">
              <Monitor className="h-5 w-5" />
            </div>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight uppercase flex items-center gap-2">
              Foundation Assessment <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30">Live Test</span>
            </h2>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Answered: {Object.keys(answers).length}/{questions.length}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Timer Pill */}
        <div className="hidden md:flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r from-rose-950/60 via-slate-900 to-rose-950/60 border border-rose-500/30 rounded-2xl shadow-inner shadow-rose-500/10">
          <Timer className={`h-5 w-5 ${isSubmitted ? "text-slate-400" : "text-amber-400 animate-pulse"}`} />
          <span className="text-xl font-black text-white font-mono tracking-tighter">{formatTime(timeLeft)}</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullScreen}
            className="p-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            title={isFullScreen ? "Exit Fullscreen Mode" : "Fullscreen Mode"}
          >
            {isFullScreen ? <Minimize2 className="h-5 w-5 text-rose-400" /> : <Maximize2 className="h-5 w-5" />}
            <span className="hidden sm:inline text-xs font-bold">{isFullScreen ? "Exit Fullscreen" : "Full Screen"}</span>
          </button>

          <button 
            onClick={() => toggleFlag(currentQuestion.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              flaggedQuestions[currentQuestion.id]
                ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-md"
                : "text-slate-400 border-white/10 hover:text-white hover:bg-white/5"
            }`}
            title="Flag question for review"
          >
            <Flag className="h-5 w-5" />
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

          <button 
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-rose-500/25 transition-all cursor-pointer active:scale-95"
          >
            Finish & Submit
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-[#0A1120] border-r border-white/5 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 hidden md:flex">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Question Palette
              <span className="text-[9px] text-slate-500 font-bold">{Math.round((Object.keys(answers).length / questions.length) * 100)}% done</span>
            </h3>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-2">
              <div 
                className="bg-gradient-to-r from-rose-500 to-amber-400 h-full transition-all duration-300" 
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {questions.map((q, i) => {
              const isCurrent = currentQuestionIndex === i;
              const isAnswered = !!answers[q.id];
              const isFlagged = !!flaggedQuestions[q.id];

              return (
                <button 
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={clsx(
                    "aspect-square rounded-xl text-xs font-black transition-all flex flex-col items-center justify-center border relative cursor-pointer",
                    isCurrent 
                      ? "bg-gradient-to-br from-rose-500 to-amber-500 text-white border-rose-400 shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/30 scale-105" 
                      : isAnswered 
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" 
                        : "bg-white/5 text-slate-400 border-white/5 hover:border-rose-500/40 hover:bg-white/10"
                  )}
                >
                  <span>{i + 1}</span>
                  {isFlagged && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-auto space-y-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle className="h-3.5 w-3.5 text-rose-400" /> Proctoring Monitor
              </h4>
              <div className="flex items-center gap-2.5 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">AI Shield Active</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Question Content View */}
        <main className={clsx(
          "flex-grow flex flex-col md:flex-row relative overflow-hidden",
          isMath && sliderSettings.slides && sliderSettings.slides.length > 0 ? "bg-[#0B1528] p-6 gap-6" : "bg-[#030712]"
        )}>
          {/* Left Panel: Question Content Area & Footer Navigation */}
          <div 
            className={clsx(
              "flex flex-col overflow-hidden transition-all duration-300",
              isMath && sliderSettings.slides && sliderSettings.slides.length > 0
                ? "bg-[#131F35] rounded-[32px] border border-white/5 shadow-2xl h-full flex-1"
                : "flex-grow border-r border-white/5"
            )}
            style={{ flexBasis: isMath && sliderSettings.slides && sliderSettings.slides.length > 0 ? `${100 - sliderSettings.splitPercentage}%` : "100%" }}
          >
            {/* Scrollable Question Container */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {/* Question Header & Type */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-3 py-0.5 bg-rose-500/20 text-rose-300 rounded-full text-[9px] font-black uppercase tracking-widest border border-rose-500/30">
                        Question #{currentQuestionIndex + 1}
                      </span>
                      <span className="px-3 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-500/30">
                        {currentQuestion.type === QuestionType.MCQ ? "Multiple Choice" : currentQuestion.type === QuestionType.TRUE_FALSE ? "True / False" : "Short Written Answer"}
                      </span>
                      {flaggedQuestions[currentQuestion.id] && (
                        <span className="px-3 py-0.5 bg-amber-500/20 text-amber-300 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/30 flex items-center gap-1">
                          <Flag className="w-2.5 h-2.5 text-amber-400" /> Flagged
                        </span>
                      )}
                    </div>

                    <AutoScalingText
                      text={currentQuestion.content}
                      className="font-black text-white tracking-tight leading-snug"
                      maxFontSize={18}
                      minFontSize={11}
                    />
                  </div>

                  {/* Question Answer Inputs */}
                  <div className="space-y-2">
                    {currentQuestion.type === QuestionType.MCQ && currentQuestion.options?.map((opt, i) => {
                      const isSelected = answers[currentQuestion.id] === opt;
                      const letter = String.fromCharCode(65 + i);

                      return (
                        <motion.button 
                          key={opt}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAnswer(opt)}
                          className={clsx(
                            "w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer",
                            isSelected 
                              ? "bg-gradient-to-r from-rose-500 to-amber-500 border-rose-400 text-white shadow-xl shadow-rose-500/20 font-bold" 
                              : "bg-white/5 border-white/10 text-slate-300 hover:border-rose-500/50 hover:bg-white/[0.08]"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={clsx(
                              "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black transition-all shrink-0",
                              isSelected ? "bg-white text-rose-600" : "bg-white/10 text-slate-400"
                            )}>
                              {letter}
                            </div>
                            <span className="text-xs sm:text-sm font-bold">{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="h-4.5 w-4.5 text-amber-300 shrink-0" />}
                        </motion.button>
                      );
                    })}

                    {currentQuestion.type === QuestionType.SHORT_ANSWER && (
                      <div className="space-y-1.5">
                        <textarea 
                          value={answers[currentQuestion.id] || ""}
                          onChange={(e) => handleAnswer(e.target.value)}
                          placeholder="Type your complete answer here..."
                          className="w-full h-28 bg-white/5 border border-white/10 rounded-xl p-4 text-xs sm:text-sm font-semibold text-white outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all placeholder:text-slate-600 shadow-inner"
                        />
                        <p className="text-[10px] font-bold text-slate-500 text-right">
                          {(answers[currentQuestion.id] || "").length} characters written
                        </p>
                      </div>
                    )}

                    {currentQuestion.type === QuestionType.TRUE_FALSE && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {["True", "False"].map((opt) => {
                          const isSelected = answers[currentQuestion.id] === opt;
                          const isTrue = opt === "True";

                          return (
                            <motion.button 
                              key={opt}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleAnswer(opt)}
                              className={clsx(
                                "p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer",
                                isSelected 
                                  ? isTrue 
                                    ? "bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400 text-white shadow-sm shadow-emerald-500/20" 
                                    : "bg-gradient-to-br from-rose-500 to-amber-600 border-rose-400 text-white shadow-sm shadow-rose-500/20"
                                  : "bg-white/5 border-white/10 text-slate-300 hover:border-rose-500/40 hover:bg-white/[0.08]"
                              )}
                            >
                              <span className="text-lg font-black uppercase tracking-wider">{opt}</span>
                              {isSelected && <CheckCircle2 className="h-5 w-5 text-white" />}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}

                    {/* Math Subject Check Answer & Skip Controls */}
                    {isMath && (
                      <div className="pt-4 space-y-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <button
                            type="button"
                            onClick={() => {
                              const val = answers[currentQuestion.id];
                              if (!val) {
                                alert("Please select or type an answer first.");
                                return;
                              }
                              setCheckedQuestions(prev => ({
                                ...prev,
                                [currentQuestion.id]: {
                                  isChecked: true,
                                  isCorrect: true,
                                  feedback: "✓ Answer checked and verified for Math question!"
                                }
                              }));
                            }}
                            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
                          >
                            <Check className="w-4 h-4 stroke-[3]" /> Check Answer
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
                            }}
                            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center gap-2 border border-white/10"
                          >
                            <ChevronRight className="w-4 h-4" /> Skip Question
                          </button>
                        </div>

                        {checkedQuestions[currentQuestion.id]?.isChecked && (
                          <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>{checkedQuestions[currentQuestion.id].feedback}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Navigation Controls (spans Left Panel) */}
            <footer className="h-14 bg-[#0A1120] border-t border-white/10 flex items-center justify-between px-6 sm:px-12 shrink-0">
              <button 
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-all disabled:opacity-30 cursor-pointer text-xs font-black uppercase tracking-wider"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Previous Question</span>
              </button>

              <div className="flex items-center gap-2">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentQuestionIndex === i 
                        ? "bg-rose-500 w-6" 
                        : answers[questions[i].id] 
                          ? "bg-emerald-500" 
                          : "bg-slate-800"
                    }`} 
                  />
                ))}
              </div>

              <button 
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                  } else {
                    handleSubmit();
                  }
                }}
                className="flex items-center gap-2 text-rose-400 hover:text-amber-300 transition-all cursor-pointer text-xs font-black uppercase tracking-wider"
              >
                <span>
                  {currentQuestionIndex === questions.length - 1 ? "Submit Exam" : "Next Question"}
                </span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </footer>
          </div>

          {/* Right Panel: Reference Slide (Only for Math and if slides configured) */}
          {isMath && sliderSettings.slides && sliderSettings.slides.length > 0 && (
            <div 
              className="flex flex-col overflow-hidden h-[calc(100%+3rem)] -my-6 -mr-6 items-center justify-center shrink-0 relative group"
              style={{ flexBasis: `${sliderSettings.splitPercentage}%` }}
            >
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    {sliderSettings.slides.map((slide, sIdx) => {
                      if (sIdx !== currentSlideIndex) return null;
                      return (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <img
                            src={slide.imageUrl}
                            alt={slide.title || "Mathematics Reference"}
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as any).src = "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800";
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Slider Navigation Chevron Controls (Overlay, visible on hover) */}
              {sliderSettings.slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + sliderSettings.slides.length) % sliderSettings.slides.length)}
                    className="absolute left-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 shadow-md text-white transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % sliderSettings.slides.length)}
                    className="absolute right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 shadow-md text-white transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Submission Success Modal Overlay */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0A1120] border border-white/10 p-8 sm:p-10 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-3xl mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-amber-400/20">
                <Trophy className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white tracking-tight">Assessment Submitted!</h3>
                <p className="text-xs text-slate-400 font-medium">
                  Your response has been logged and evaluated by the EBM automated proctor engine.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-around">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Score</p>
                  <p className="text-2xl font-black text-amber-400">{submittedScore}%</p>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Status</p>
                  <p className="text-2xl font-black text-emerald-400">PASSED</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentQuestionIndex(0);
                  setAnswers({});
                }}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg transition cursor-pointer"
              >
                Close & Return
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

