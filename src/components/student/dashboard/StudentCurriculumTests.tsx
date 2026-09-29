import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { 
  BookOpen, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  Lock, 
  Trophy, 
  Sparkles, 
  Clock, 
  Play, 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Zap,
  Brain,
  FileText,
  Type,
  Flame,
  Star,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useDashboardStore } from "./dashboard.store";

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

interface Question {
  id: string;
  question: string;
  type: "MCQ" | "SHORT" | "FIB";
  options?: string[];
  correctAnswer?: string;
}

interface CurriculumTest {
  id: string;
  title: string;
  testNumber?: string;
  subject: string;
  gradeLevel: string;
  type?: string;
  unitTitle?: string;
  skillFocus?: string;
  lifeConnection?: string;
  content?: string;
  questions?: string | Question[];
  duration?: number;
  thumbnailUrl?: string;
  highestScore: number | null;
  passed: boolean;
}

export function StudentCurriculumTests() {
  const { fetchData: reloadDashboard, data } = useDashboardStore();
  const [loading, setLoading] = useState(true);
  const [currentGrade, setCurrentGrade] = useState("Grade 1");
  const [tests, setTests] = useState<CurriculumTest[]>([]);
  const [totalTests, setTotalTests] = useState(0);
  const [passedTests, setPassedTests] = useState(0);
  const [isEligible, setIsEligible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active quiz state
  const [selectedTest, setSelectedTest] = useState<CurriculumTest | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [readerFontSize, setReaderFontSize] = useState<"sm" | "base" | "lg">("base");
  const [mathStep, setMathStep] = useState<"reading" | "questions">("reading");
  const [currentMathQuestionIndex, setCurrentMathQuestionIndex] = useState(0);
  const [mathPaletteBatch, setMathPaletteBatch] = useState(0);

  // Sync math palette batch index when current question changes
  useEffect(() => {
    setMathPaletteBatch(Math.floor(currentMathQuestionIndex / 10));
  }, [currentMathQuestionIndex]);

  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, { isChecked: boolean; isCorrect: boolean; feedback: string }>>({});
  const [submitResult, setSubmitResult] = useState<{
    score: number;
    promoted: boolean;
    currentGradeLevel: string;
    nextGradeLevel: string;
    results: Array<{ questionId: string; userAnswer: string; correctAnswer: string; isCorrect: boolean; explanation?: string }>;
  } | null>(null);

  // Math slider settings and state
  const [sliderSettings, setSliderSettings] = useState<{ splitPercentage: number; slides: Array<{ id: string; imageUrl: string; duration: number; title: string }> }>({
    splitPercentage: 40,
    slides: []
  });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear auto-advance timer on math question change
  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [currentMathQuestionIndex]);

  const mathInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus and select ONE time when entering a question or moving to a new question
  useEffect(() => {
    const el = mathInputRef.current;
    if (el) {
      el.focus();
      const len = el.value.length;
      el.setSelectionRange(len, len);
    }
  }, [currentMathQuestionIndex]);

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

  // Math subject identifier helper
  const isMathSubject = (subjectName?: string) => {
    if (!subjectName) return false;
    const s = subjectName.toLowerCase().trim();
    return s.includes("math") || s.includes("mathematics") || s.includes("maths") || s === "mth";
  };

  // Fetch student curriculum progress
  const fetchCurriculumStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/student/curriculum-status", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to load curriculum status");
      const data = await res.json();
      if (data.success) {
        setCurrentGrade(data.currentGrade);
        setTests(data.curriculums);
        setTotalTests(data.totalTests);
        setPassedTests(data.passedTests);
        setIsEligible(data.isEligibleForPromotion);
      } else {
        throw new Error(data.error || "Failed to load curriculum status");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurriculumStatus();
  }, [data?.currentGrade]);

  // Prevent parent scrollbar from interfering with the quiz layout
  useEffect(() => {
    if (selectedTest) {
      const dashboardMain = document.getElementById("dashboard-main");
      if (dashboardMain) {
        dashboardMain.style.overflowY = "hidden";
      }
      return () => {
        if (dashboardMain) {
          dashboardMain.style.overflowY = "auto";
        }
      };
    }
  }, [selectedTest]);

  const handleSelectTest = (test: CurriculumTest) => {
    setSelectedTest(test);
    setUserAnswers({});
    setQuizSubmitted(false);
    setSubmitResult(null);
    setMathStep("reading");
    setCurrentMathQuestionIndex(0);
    setCheckedQuestions({});
  };

  const handleAnswerChange = (qId: string, value: string) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: value
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedTest) return;
    
    // Parse questions list safely
    let questionsList: Question[] = [];
    if (typeof selectedTest.questions === "string") {
      try {
        questionsList = JSON.parse(selectedTest.questions);
      } catch (e) {
        questionsList = [];
      }
    } else if (Array.isArray(selectedTest.questions)) {
      questionsList = selectedTest.questions;
    }

    // Check if at least one question is answered
    const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k].trim()).length;
    if (answeredCount === 0) {
      alert("Please answer at least one question before submitting.");
      return;
    }

    try {
      setSubmittingQuiz(true);
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/student/submit-practice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          curriculumId: selectedTest.id,
          answers: userAnswers
        })
      });

      if (!res.ok) throw new Error("Failed to submit practice test");
      const data = await res.json();
      if (data.success) {
        setSubmitResult(data);
        setQuizSubmitted(true);
        
        // Refresh curriculum data
        await fetchCurriculumStatus();
        // Also refresh student dashboard store to sync grade and active subjects
        await reloadDashboard();

        // Close test view on promotion
        if (data.promoted) {
          setSelectedTest(null);
        }
      } else {
        throw new Error(data.error || "Failed to process practice test submission");
      }
    } catch (err: any) {
      alert(err.message || "Could not submit practice test");
    } finally {
      setSubmittingQuiz(false);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setSubmitResult(null);
  };

  // Safe parsing of questions for active view
  const getActiveQuestions = (): Question[] => {
    if (!selectedTest) return [];
    if (typeof selectedTest.questions === "string") {
      try {
        return JSON.parse(selectedTest.questions);
      } catch (e) {
        return [];
      }
    } else if (Array.isArray(selectedTest.questions)) {
      return selectedTest.questions;
    }
    return [];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 text-sm font-semibold">Loading grade checkpoints...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-4 text-rose-700">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <div>
          <h4 className="font-bold">Error loading checkpoints</h4>
          <p className="text-xs mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 animate-fade-in relative">
      
      {/* Header section with overall progress */}
      {!selectedTest && (
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 lg:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-50 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                Current Level
              </span>
              <span className="text-sm font-bold text-slate-700">{currentGrade}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
              Curriculum Checkpoints
            </h1>
            <p className="text-slate-500 text-xs max-w-xl font-medium">
              Complete and clear all checkpoint practice tests of your current grade with a score <span className="text-amber-600 font-bold">95% or above</span> to earn dynamic promotion to the next grade!
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 w-full md:w-80 shrink-0 relative z-10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>PROMOTION PROGRESS</span>
              <span className="text-slate-950">{passedTests} / {totalTests} Passed</span>
            </div>
            
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${totalTests > 0 ? (passedTests / totalTests) * 100 : 0}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 font-semibold leading-snug">
              {isEligible 
                ? "🎉 Fantastic! You completed all tests. Grade Promotion unlocked!" 
                : `${totalTests - passedTests} more checkpoint test(s) to pass with 95% or above score.`}
            </p>
          </div>
        </div>
      )}

      {/* Main split-screen layout or test viewer */}
      {selectedTest ? (
        isMathSubject(selectedTest.subject) ? (
          /* ================================================================
             MATH / MATHEMATICS CUSTOM LAYOUT (Step 1: Reading -> Step 2: 1 Question at a time full width)
             ================================================================ */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="w-full max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[560px] gap-4 overflow-hidden"
          >
            {/* Math Header Bar */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-xs">
                    📐 {selectedTest.subject}
                  </span>
                  <span className="text-slate-400 text-xs font-bold">•</span>
                  <span className="text-indigo-200 text-xs font-bold">{selectedTest.gradeLevel} Checkpoint</span>
                  <span className="text-slate-400 text-xs font-bold">•</span>
                  <span className="text-emerald-400 text-[10px] font-black uppercase tracking-wider bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    {mathStep === "reading" ? "Step 1: Reading Material & Instructions" : "Step 2: Live Test (1 Question at a time)"}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">{selectedTest.title}</h2>
              </div>

              <div className="flex items-center gap-3">
                {/* Font selector */}
                <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1 border border-white/10 shrink-0">
                  <span className="text-[9px] text-slate-300 font-bold px-2 uppercase tracking-wider">Font:</span>
                  <button onClick={() => setReaderFontSize("sm")} className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "sm" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}>A-</button>
                  <button onClick={() => setReaderFontSize("base")} className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "base" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}>A</button>
                  <button onClick={() => setReaderFontSize("lg")} className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "lg" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}>A+</button>
                </div>

                <button 
                  onClick={() => setSelectedTest(null)}
                  className="px-4 py-2 hover:bg-white/10 rounded-xl text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
                >
                  <ArrowLeft className="h-4 w-4" /> Exit Test
                </button>
              </div>
            </div>

            {/* STEP 1: MATH READING CONTENT / INSTRUCTIONS */}
            {mathStep === "reading" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8 flex-1 overflow-y-auto min-h-0"
              >
                <div className="p-4 bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200/80 rounded-2xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Math Course Reading & Instructions First
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      Please read the formula guidelines, reference notes, and problem context below carefully. When you are ready, click <strong>"Start Questions"</strong> to proceed to the 1-question-per-screen evaluation.
                    </p>
                  </div>
                </div>

                {selectedTest.skillFocus && (
                  <div className="p-4 bg-indigo-50/80 border border-indigo-200 rounded-2xl">
                    <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <Brain className="h-4 w-4 text-indigo-600" /> Primary Skill Focus
                    </h4>
                    <p className="text-xs text-slate-700 font-semibold">{selectedTest.skillFocus}</p>
                  </div>
                )}

                {selectedTest.lifeConnection && (
                  <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl">
                    <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <BookOpen className="h-4 w-4 text-amber-600" /> Real-World Life Connection
                    </h4>
                    <p className="text-xs text-slate-700 font-semibold">{selectedTest.lifeConnection}</p>
                  </div>
                )}

                {/* Reading Passage Content */}
                <div className="space-y-3 border-t border-slate-100 pt-6">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" /> Math Passage / Reference Notes
                  </h3>
                  <div className={`text-slate-800 leading-relaxed whitespace-pre-wrap font-medium bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-inner ${
                    readerFontSize === "sm" ? "text-xs" : readerFontSize === "lg" ? "text-base" : "text-sm"
                  }`}>
                    {selectedTest.content || "No reading text provided for this topic. Click next to start questions."}
                  </div>
                </div>

                {/* Instructions box */}
                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 border border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Math Test Instructions
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-medium list-disc pl-5">
                    <li>Questions appear 1 at a time on screen.</li>
                    <li>Use the <strong>Check Answer</strong> button to verify your solution instantly.</li>
                    <li>Use the <strong>Skip</strong> button if you want to skip a question and return to it later.</li>
                    <li>Requires 95%+ score to pass checkpoint.</li>
                  </ul>
                </div>

                {/* Action button to proceed */}
                <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setMathStep("questions");
                      setCurrentMathQuestionIndex(0);
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 transition-all cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Start Questions (1 per screen)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: MATH 1 QUESTION PER SCREEN */}
            {mathStep === "questions" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden flex flex-col flex-1 h-full min-h-0"
              >
                {/* Top Question Toolbar */}
                <div className="p-5 border-b border-slate-100 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setMathStep("reading")}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Reading Content
                    </button>
                    <span className="text-slate-500 font-bold">•</span>
                    <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                      Question {currentMathQuestionIndex + 1} of {getActiveQuestions().length}
                    </span>
                  </div>

                  {/* Question Palette Pills */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {getActiveQuestions().length > 10 && (
                      <button
                        onClick={() => setMathPaletteBatch(prev => Math.max(0, prev - 1))}
                        disabled={mathPaletteBatch === 0}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center justify-center"
                        title="Previous Batch"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    )}

                    <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-hidden scrollbar-hide shrink-0 max-h-10">
                      {getActiveQuestions()
                        .slice(mathPaletteBatch * 10, (mathPaletteBatch + 1) * 10)
                        .map((q, idxWithinBatch) => {
                          const idx = mathPaletteBatch * 10 + idxWithinBatch;
                          const isCurrent = currentMathQuestionIndex === idx;
                          const isAnswered = !!userAnswers[q.id];
                          return (
                            <button
                              key={q.id}
                              onClick={() => setCurrentMathQuestionIndex(idx)}
                              className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition cursor-pointer shrink-0 ${
                                isCurrent
                                  ? "bg-amber-400 text-slate-950 font-black shadow-md scale-110"
                                  : isAnswered
                                    ? "bg-emerald-500 text-white"
                                    : "bg-white/10 text-slate-300 hover:bg-white/20"
                              }`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                    </div>

                    {getActiveQuestions().length > 10 && (
                      <button
                        onClick={() => setMathPaletteBatch(prev => Math.min(Math.ceil(getActiveQuestions().length / 10) - 1, prev + 1))}
                        disabled={mathPaletteBatch === Math.ceil(getActiveQuestions().length / 10) - 1}
                        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center justify-center"
                        title="Next Batch"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Main Question Display Area */}
                {getActiveQuestions().length > 0 ? (
                  (() => {
                    const questionsList = getActiveQuestions();
                    const q = questionsList[currentMathQuestionIndex] || questionsList[0];
                    const currentVal = userAnswers[q.id] || "";
                    const checkedState = checkedQuestions[q.id];

                    return (
                      <div className="flex-1 flex flex-col md:flex-row gap-6 bg-white px-6 pt-0 pb-0 min-h-0 overflow-y-auto scrollbar-hide relative">
                        {/* Left Panel: Question Form & Evaluation Controls */}
                        <div 
                          className="flex-1 bg-white flex flex-col overflow-hidden h-full min-h-0"
                          style={sliderSettings.slides && sliderSettings.slides.length > 0 ? { flexBasis: `${100 - sliderSettings.splitPercentage}%` } : undefined}
                        >
                          <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 flex flex-col justify-between space-y-4">
                            <div className="space-y-4 max-w-3xl mx-auto w-full">
                              {/* Question Badge */}
                              <div className="flex items-center justify-between flex-wrap gap-2">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="px-3 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-[9px] font-black uppercase tracking-widest">
                                    Question #{currentMathQuestionIndex + 1} ({q.type})
                                  </span>
                                  {((q as any).sectionTitle || (q as any).section) && (
                                    <span className="px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-[9px] font-black uppercase tracking-wider">
                                      {(q as any).sectionTitle || (q as any).section}
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] font-bold text-slate-400">
                                  Answered: {Object.keys(userAnswers).length} / {questionsList.length}
                                </span>
                              </div>

                              {/* Context Data Table / Stimulus if present */}
                              {(q as any).context && (
                                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 shadow-2xs space-y-1.5">
                                  <div className="flex items-center gap-1.5 text-[11px] font-black text-indigo-700 uppercase tracking-wider">
                                    <FileText className="h-3.5 w-3.5 text-indigo-600" />
                                    <span>Reference Table / Data</span>
                                  </div>
                                  <div className="font-mono text-xs whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200 leading-relaxed text-slate-900 font-semibold shadow-inner">
                                    {(q as any).context}
                                  </div>
                                </div>
                              )}

                              {/* Math Question Text / Prompt */}
                              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/90 rounded-2xl shadow-inner space-y-2">
                                <AutoScalingText
                                  text={q.question}
                                  className="font-bold text-slate-900 leading-relaxed font-serif tracking-wide"
                                  maxFontSize={16}
                                  minFontSize={10}
                                />
                              </div>

                              {/* Inputs */}
                              {q.type === "MCQ" && q.options && (
                                <div className="grid grid-cols-1 gap-2">
                                  {q.options.map((opt, optIdx) => {
                                    const isSelected = currentVal === opt;
                                    const letter = String.fromCharCode(65 + optIdx);
                                    return (
                                      <button
                                        key={opt}
                                        onClick={() => handleAnswerChange(q.id, opt)}
                                        className={`w-full p-3 sm:p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                          isSelected
                                            ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-sm font-bold"
                                            : "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800"
                                        }`}
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                                            isSelected ? "bg-white text-indigo-700" : "bg-slate-100 text-slate-600"
                                          }`}>
                                            {letter}
                                          </span>
                                          <span className="text-xs sm:text-sm font-semibold">{opt}</span>
                                        </div>
                                        {isSelected && <CheckCircle2 className="w-4.5 h-4.5 text-amber-300 shrink-0" />}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}

                              {(q.type === "SHORT" || q.type === "FIB") && (
                                <div className="space-y-2.5">
                                  {q.type === "FIB" && q.options && q.options.length > 0 && (
                                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex flex-wrap gap-1.5 items-center">
                                      <span className="text-[9px] font-black uppercase text-amber-800 tracking-wider">Word Bank:</span>
                                      {q.options.map((opt) => (
                                        <button
                                          key={opt}
                                          type="button"
                                          onClick={() => handleAnswerChange(q.id, opt)}
                                          className="px-2.5 py-0.5 bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-amber-300 rounded-lg font-bold text-xs transition cursor-pointer shadow-3xs"
                                        >
                                          {opt}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                  
                                  {/* Clean math input box with focus ring matching screenshot style */}
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                                      Your Math Answer:
                                    </label>
                                    <input
                                      key={`math-input-${q.id}`}
                                      type="text"
                                      ref={mathInputRef}
                                      value={currentVal}
                                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                      placeholder="Type your answer or numerical value here..."
                                      className="w-full text-sm p-3 sm:p-3.5 rounded-xl border-2 border-indigo-500/80 bg-white text-slate-900 font-bold focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all shadow-sm"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Check Answer & Skip Action Buttons */}
                              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                                <button
                                  onClick={() => {
                                    const userAns = currentVal.trim();
                                    if (!userAns) {
                                      alert("Please enter or select an answer first.");
                                      return;
                                    }

                                    if (autoAdvanceTimeoutRef.current) {
                                      clearTimeout(autoAdvanceTimeoutRef.current);
                                    }

                                    const normalizeFrac = (str: string) => str.replace(/½/g, "1/2").replace(/⅓/g, "1/3").replace(/¼/g, "1/4").replace(/¾/g, "3/4").replace(/⅔/g, "2/3").replace(/1 whole/gi, "1").trim();
                                    const correct = (q.correctAnswer || "").trim();
                                    const normUser = normalizeFrac(userAns.toLowerCase());
                                    const normCorrect = normalizeFrac(correct.toLowerCase());
                                    const accepted = (q as any).acceptedAnswers;
                                    
                                    const isCorrect = 
                                      q.type === "ACTIVITY" ||
                                      correct.toLowerCase().includes("activity") ||
                                      (correct ? normUser === normCorrect : true) ||
                                      (Array.isArray(accepted) && accepted.some((a: string) => normalizeFrac(String(a).toLowerCase()) === normUser));
                                    setCheckedQuestions(prev => ({
                                      ...prev,
                                      [q.id]: {
                                        isChecked: true,
                                        isCorrect: isCorrect,
                                        feedback: isCorrect 
                                          ? "✓ Correct! Excellent mathematical reasoning. Moving to next question..." 
                                          : correct 
                                            ? `✗ Incorrect. The model answer is "${correct}". Try recalculating!`
                                            : "✗ Incorrect answer. Try recalculating!"
                                      }
                                    }));

                                    // If correct, auto advance to next question after 1 second
                                    if (isCorrect) {
                                      autoAdvanceTimeoutRef.current = setTimeout(() => {
                                        setCurrentMathQuestionIndex((prev) => (prev + 1) % questionsList.length);
                                      }, 1000);
                                    }
                                  }}
                                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition cursor-pointer active:scale-95"
                                >
                                  <Check className="w-3.5 h-3.5 stroke-[3]" /> Check Answer
                                </button>

                                <button
                                  onClick={() => {
                                    if (autoAdvanceTimeoutRef.current) {
                                      clearTimeout(autoAdvanceTimeoutRef.current);
                                    }
                                    setCurrentMathQuestionIndex((prev) => (prev + 1) % questionsList.length);
                                  }}
                                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border border-slate-200"
                                >
                                  <ArrowRight className="w-3.5 h-3.5" /> Skip Question
                                </button>
                              </div>

                              {/* Checked Feedback Banner */}
                              {checkedState?.isChecked && (
                                <motion.div
                                  initial={{ opacity: 0, y: 3 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2.5 ${
                                    checkedState.isCorrect 
                                      ? "bg-emerald-50 text-emerald-900 border-emerald-300" 
                                      : "bg-rose-50 text-rose-900 border-rose-300"
                                  }`}
                                >
                                  {checkedState.isCorrect ? (
                                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                                  ) : (
                                    <XCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
                                  )}
                                  <span>{checkedState.feedback}</span>
                                </motion.div>
                              )}
                            </div>

                            {/* Bottom Navigation Toolbar */}
                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 max-w-3xl mx-auto w-full shrink-0">
                              <button
                                onClick={() => setCurrentMathQuestionIndex(Math.max(0, currentMathQuestionIndex - 1))}
                                disabled={currentMathQuestionIndex === 0}
                                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 disabled:cursor-not-allowed"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" /> Previous
                              </button>

                              {currentMathQuestionIndex < questionsList.length - 1 ? (
                                <button
                                  onClick={() => setCurrentMathQuestionIndex(currentMathQuestionIndex + 1)}
                                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                                >
                                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  onClick={handleSubmitQuiz}
                                  disabled={submittingQuiz}
                                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 shadow-md"
                                >
                                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                                  {submittingQuiz ? "Evaluating..." : "Submit Math Test"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Right Panel: Reference Slide (Only for Math and if slides configured) */}
                        {sliderSettings.slides && sliderSettings.slides.length > 0 && (
                          <div 
                            className="flex flex-col overflow-hidden h-full items-center justify-center shrink-0 relative z-20 group bg-slate-50/50 rounded-2xl border border-slate-200/80 p-2 shadow-xs"
                            style={{ flexBasis: `${sliderSettings.splitPercentage}%` }}
                          >
                            <div className="w-full h-full flex items-center justify-center relative z-20 overflow-hidden">
                              <div className="w-full h-full flex items-center justify-center overflow-hidden relative z-20">
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
                                        className="w-full h-full flex items-center justify-center p-1 z-20"
                                      >
                                        <img
                                          src={slide.imageUrl}
                                          alt={slide.title || "Mathematics Reference"}
                                          className="max-w-full max-h-full w-auto h-auto object-contain relative z-20 rounded-lg shadow-xs"
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
                                  className="absolute left-4 p-2.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-30"
                                >
                                  <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % sliderSettings.slides.length)}
                                  className="absolute right-4 p-2.5 rounded-full bg-white border border-slate-200 shadow-md text-slate-600 hover:text-slate-900 transition-all hover:scale-105 active:scale-95 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100 z-30"
                                >
                                  <ChevronRight className="w-5 h-5" />
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="p-12 text-center text-slate-500 font-bold text-sm">
                    No questions available for this math test.
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* ================================================================
             NON-MATH SUBJECTS: STANDARD SPLIT-SCREEN VIEW (Unchanged)
             ================================================================ */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="flex flex-col lg:flex-row gap-6"
          >
          {/* Back button header for mobile & layout comfort */}
          <div className="w-full lg:hidden">
            <button 
              onClick={() => setSelectedTest(null)}
              className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-black rounded-2xl flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="h-4 w-4 text-indigo-600" /> Back to Checkpoints List
            </button>
          </div>

          {/* Left panel: Reading text & Passage */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col h-[calc(100vh-140px)] min-h-[520px]">
            {/* Header with vibrant subject styling */}
            <div className="p-5 md:p-6 border-b border-slate-100 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-xs">
                    {selectedTest.subject}
                  </span>
                  <span className="text-slate-400 text-xs font-bold">•</span>
                  <span className="text-indigo-200 text-xs font-bold">{selectedTest.gradeLevel} Checkpoint</span>
                  {selectedTest.type && (
                    <>
                      <span className="text-slate-400 text-xs font-bold">•</span>
                      <span className="text-cyan-300 text-[10px] font-black uppercase tracking-wider bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                        {selectedTest.type === "COMPREHENSION" ? "Reading Comprehension" : "Practice Assessment"}
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-lg md:text-xl font-black text-white tracking-tight">{selectedTest.title}</h2>
              </div>

              <div className="flex items-center gap-2">
                {/* Font Size Selector Controls */}
                <div className="bg-white/10 p-1 rounded-xl flex items-center gap-1 border border-white/10 shrink-0">
                  <span className="text-[9px] text-slate-300 font-bold px-2 uppercase tracking-wider">Font:</span>
                  <button
                    onClick={() => setReaderFontSize("sm")}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "sm" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setReaderFontSize("base")}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "base" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => setReaderFontSize("lg")}
                    className={`px-2 py-1 rounded-lg text-xs font-bold transition ${readerFontSize === "lg" ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:text-white"}`}
                  >
                    A+
                  </button>
                </div>

                <button 
                  onClick={() => setSelectedTest(null)}
                  className="hidden lg:flex px-3.5 py-2 hover:bg-white/10 rounded-xl text-slate-200 hover:text-white text-xs font-bold items-center gap-1.5 transition-all cursor-pointer border border-white/10"
                >
                  <ArrowLeft className="h-4 w-4" /> Exit
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {selectedTest.skillFocus && (
                <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-200/80 rounded-2xl shadow-2xs">
                  <h4 className="text-[10px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                    <Sparkles className="h-4 w-4 text-indigo-600 animate-spin" /> Primary Skill Focus
                  </h4>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{selectedTest.skillFocus}</p>
                </div>
              )}

              {selectedTest.lifeConnection && (
                <div className="p-4 bg-gradient-to-r from-amber-50/80 to-orange-50/80 border border-amber-200/80 rounded-2xl shadow-2xs">
                  <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                    <BookOpen className="h-4 w-4 text-amber-600" /> Real-World Life Connection
                  </h4>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">{selectedTest.lifeConnection}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-600" /> Reading Passage / Source Material
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Read carefully before answering</span>
                </div>
                <div className={`text-slate-800 leading-relaxed whitespace-pre-wrap font-medium bg-slate-50/60 p-6 rounded-2xl border border-slate-200/60 shadow-inner ${
                  readerFontSize === "sm" ? "text-xs" : readerFontSize === "lg" ? "text-base" : "text-sm"
                }`}>
                  {selectedTest.content}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Active Test Questions */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col h-[calc(100vh-140px)] min-h-[520px]">
            {/* Header & Live Progress Gauge */}
            <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl shadow-md">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-wider">
                    Interactive Evaluation
                  </h3>
                  <p className="text-[10px] text-slate-300 font-medium">
                    {Object.keys(userAnswers).length} of {getActiveQuestions().length} Questions Answered
                  </p>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-3">
                <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${getActiveQuestions().length > 0 ? (Object.keys(userAnswers).length / getActiveQuestions().length) * 100 : 0}%` 
                    }}
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                  />
                </div>
                {quizSubmitted && submitResult && (
                  <span className={`px-3 py-1 rounded-full text-xs font-black tracking-wider shadow-md ${
                    submitResult.score >= 95 
                      ? "bg-emerald-500 text-white" 
                      : "bg-rose-500 text-white"
                  }`}>
                    {submitResult.score}%
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {/* Submission Result Celebration Banner */}
              <AnimatePresence>
                {quizSubmitted && submitResult && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`p-6 rounded-3xl border shadow-lg relative overflow-hidden ${
                      submitResult.score >= 95
                        ? "bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white border-emerald-400"
                        : "bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white border-amber-400"
                    }`}
                  >
                    <div className="flex items-start gap-4 relative z-10">
                      <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shrink-0 text-white shadow-md">
                        {submitResult.score >= 95 ? (
                          <Trophy className="h-8 w-8 text-amber-300 animate-bounce" />
                        ) : (
                          <Flame className="h-8 w-8 text-amber-200" />
                        )}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <h4 className="font-black text-lg tracking-tight">
                            {submitResult.score >= 95 
                              ? "🎉 Checkpoint Mastered & Cleared!" 
                              : "Review Your Responses & Retake"}
                          </h4>
                          <span className="px-3 py-1 bg-black/30 backdrop-blur-md text-amber-300 text-xs font-black rounded-full font-mono">
                            Final Score: {submitResult.score}%
                          </span>
                        </div>
                        <p className="text-xs text-white/90 font-medium leading-relaxed">
                          {submitResult.score >= 95 
                            ? "Spectacular performance! You passed with 95%+ score. Your grade level promotion counter has been updated." 
                            : "You need a score of 95% or higher to count towards grade promotion. Review the detailed AI feedback below and try again!"}
                        </p>
                        <div className="pt-2">
                          <button 
                            onClick={handleResetQuiz}
                            className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-100 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                          >
                            <RotateCcw className="h-3.5 w-3.5 text-indigo-600" /> Re-take Checkpoint
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Questions List Render */}
              <div className="space-y-6">
                {getActiveQuestions().map((q, index) => {
                  const currentVal = userAnswers[q.id] || "";
                  const questionResult = submitResult?.results.find(r => r.questionId === q.id);
                  const isAnswerCorrect = questionResult?.isCorrect;

                  return (
                    <motion.div 
                      key={q.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-6 rounded-3xl border transition-all shadow-sm ${
                        quizSubmitted 
                          ? isAnswerCorrect 
                            ? "bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-500/10" 
                            : "bg-rose-50/40 border-rose-300 ring-2 ring-rose-500/10"
                          : currentVal 
                            ? "bg-indigo-50/30 border-indigo-300 ring-2 ring-indigo-500/10" 
                            : "bg-slate-50/50 border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3.5 mb-5">
                        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0 shadow-md">
                          {index + 1}
                        </span>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
                            {q.type === "MCQ" ? "Multiple Choice" : q.type === "FIB" ? "Fill in the Blank" : "Short Answer"}
                          </span>
                          <h4 className="text-sm md:text-base font-bold text-slate-900 leading-relaxed">{q.question}</h4>
                        </div>
                      </div>

                      {/* Options if MCQ */}
                      {q.type === "MCQ" && q.options && (
                        <div className="grid grid-cols-1 gap-3 pl-2 sm:pl-11">
                          {q.options.map((option, optIndex) => {
                            const isSelected = currentVal === option;
                            const optionLetter = String.fromCharCode(65 + optIndex);

                            return (
                              <motion.button
                                key={option}
                                disabled={quizSubmitted}
                                whileHover={{ scale: quizSubmitted ? 1 : 1.01 }}
                                whileTap={{ scale: quizSubmitted ? 1 : 0.98 }}
                                onClick={() => handleAnswerChange(q.id, option)}
                                className={`text-left text-xs p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                                  isSelected
                                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-md shadow-indigo-500/20 font-bold"
                                    : "border-slate-200 bg-white hover:bg-slate-100/80 text-slate-800 hover:border-indigo-300"
                                } disabled:cursor-not-allowed`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition ${
                                    isSelected ? "bg-white text-indigo-700" : "bg-slate-100 text-slate-600"
                                  }`}>
                                    {optionLetter}
                                  </span>
                                  <span className="font-semibold text-xs sm:text-sm">{option}</span>
                                </div>
                                {isSelected && <CheckCircle2 className="h-5 w-5 text-amber-300 shrink-0" />}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}

                      {/* Text input if SHORT or FIB */}
                      {(q.type === "SHORT" || q.type === "FIB") && (
                        <div className="pl-2 sm:pl-11 space-y-3">
                          {q.type === "FIB" && q.options && q.options.length > 0 && (
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border border-amber-200/80 space-y-2">
                              <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider flex items-center gap-1">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Interactive Word Bank:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {q.options.map((opt) => (
                                  <motion.button
                                    key={opt}
                                    type="button"
                                    disabled={quizSubmitted}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAnswerChange(q.id, opt)}
                                    className="px-3 py-1.5 bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-800 border border-amber-300 rounded-xl font-bold text-xs transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
                                  >
                                    {opt}
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          )}
                          <input
                            type="text"
                            disabled={quizSubmitted}
                            value={currentVal}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={q.type === "FIB" ? "Click word above or type fill-in answer..." : "Type your answer here..."}
                            className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-slate-300 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all disabled:opacity-75 disabled:cursor-not-allowed shadow-xs font-semibold text-slate-900"
                          />
                        </div>
                      )}

                      {/* Answer Feedback After Submission */}
                      {quizSubmitted && questionResult && (
                        <div className="mt-4 pl-2 sm:pl-11 text-xs border-t border-slate-200 pt-3 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-slate-500 font-bold">Your Response:</span>
                            <span className="text-slate-900 font-black bg-slate-100 px-2.5 py-1 rounded-md">{currentVal || "(no response)"}</span>
                            {isAnswerCorrect ? (
                              <span className="text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md font-black flex items-center gap-1">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Correct
                              </span>
                            ) : (
                              <span className="text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md font-black flex items-center gap-1">
                                <XCircle className="h-4 w-4 text-rose-600" /> Incorrect
                              </span>
                            )}
                          </div>
                          {!isAnswerCorrect && q.correctAnswer && (
                            <div className="flex items-center gap-2 pt-1">
                              <span className="text-rose-600 font-bold">Model Answer:</span>
                              <span className="text-emerald-800 font-black bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">{q.correctAnswer}</span>
                            </div>
                          )}
                          {questionResult.explanation && (
                            <div className="mt-2 bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 text-slate-700 font-medium leading-relaxed shadow-xs">
                              <div className="flex items-center gap-1.5 mb-1 text-indigo-700">
                                <Brain className="w-4 h-4 text-indigo-600" />
                                <span className="text-[10px] font-black uppercase tracking-wider">AI Evaluation & Tutor Explanation</span>
                              </div>
                              "{questionResult.explanation}"
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 flex-wrap gap-3">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                {quizSubmitted ? "CHECKPOINT COMPLETED" : "ANSWER ALL QUESTIONS BEFORE SUBMITTING"}
              </span>

              {quizSubmitted ? (
                <button 
                  onClick={() => setSelectedTest(null)}
                  className="bg-slate-950 hover:bg-slate-900 text-white px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  Return to Checkpoints List <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSubmitQuiz}
                  disabled={submittingQuiz}
                  className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:bg-slate-300 disabled:text-slate-500 text-white px-9 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  {submittingQuiz ? "Evaluating Checkpoint..." : "Submit Practice Test"} <ArrowRight className="h-4 w-4" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )) : (
        /* Left/Right grid showing the items available for current grade level */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">
              {currentGrade} Available Tests
            </h3>
            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
              {tests.length} tests in current Grade
            </span>
          </div>

          {tests.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/50 p-12 text-center text-slate-400">
              <BookOpen className="h-16 w-16 mx-auto text-slate-300 stroke-1 mb-4" />
              <h3 className="font-bold text-slate-700 text-lg">No curriculum tests configured for {currentGrade}</h3>
              <p className="text-sm max-w-sm mx-auto mt-1">
                Ask your teacher or administrator to upload curriculum content and practice tests for {currentGrade}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...tests].sort((a, b) => {
                const parseTestNum = (str?: string | null) => {
                  if (!str) return 999999;
                  const match = str.match(/\d+/);
                  return match ? parseInt(match[0], 10) : 999999;
                };
                const numA = parseTestNum(a.testNumber);
                const numB = parseTestNum(b.testNumber);
                if (numA !== numB) return numA - numB;
                return (a.testNumber || "").localeCompare(b.testNumber || "", undefined, { numeric: true });
              }).map((test, index) => {
                const hasScore = test.highestScore !== null;
                const isCleared = test.passed;

                return (
                  <div 
                    key={test.id} 
                    className={`bg-white rounded-[2rem] border border-slate-200/50 p-6 shadow-sm hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between group min-h-80 relative ${
                      isCleared ? "bg-emerald-50/5 border-emerald-200/50" : ""
                    }`}
                  >
                    <div>
                      {/* Badge / Status row */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {test.testNumber ? (
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider bg-indigo-600 text-white shadow-xs border border-indigo-500">
                              Test #{test.testNumber}
                            </span>
                          ) : (
                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider ${
                              test.subject === "MATH" 
                                ? "bg-rose-50 text-rose-600 border border-rose-100" 
                                : "bg-blue-50 text-blue-600 border border-blue-100"
                            }`}>
                              Module {index + 1}
                            </span>
                          )}
                          <span className="text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
                            {test.subject}
                          </span>
                        </div>

                        {hasScore ? (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                            isCleared 
                              ? "bg-emerald-100 text-emerald-800" 
                              : "bg-rose-100 text-rose-800"
                          }`}>
                            {isCleared ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                            Score: {test.highestScore}%
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                            <Clock className="h-3 w-3" /> Not Started
                          </span>
                        )}
                      </div>

                      {/* Header and description */}
                      <h4 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1 mt-2">
                        {test.title}
                      </h4>

                      {test.testNumber && (
                        <div className="bg-gradient-to-r from-indigo-50 to-slate-50 border border-indigo-100/80 rounded-xl p-2.5 my-2 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                              #
                            </div>
                            <div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider leading-none">Test Card</p>
                              <p className="text-xs font-black text-indigo-950 mt-0.5">Test #{test.testNumber}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-white text-indigo-600 rounded-md border border-indigo-100 shadow-2xs">
                            Card #{index + 1}
                          </span>
                        </div>
                      )}

                      {test.unitTitle && (
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                          {test.unitTitle}
                        </p>
                      )}
                      
                      {test.skillFocus && (
                        <p className="text-xs text-slate-500 mt-2 font-medium line-clamp-2 leading-relaxed">
                          {test.skillFocus}
                        </p>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" /> {test.duration || 15} Mins
                      </span>

                      <button
                        onClick={() => handleSelectTest(test)}
                        className={`px-5 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCleared 
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-700" 
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-500/15"
                        }`}
                      >
                        {isCleared ? "Practice Again" : hasScore ? "Re-try Practice" : "Start Practice"}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
