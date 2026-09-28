import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Markdown from "react-markdown";
import { 
  X, 
  CheckCircle2, 
  XCircle,
  BookOpen, 
  Zap,
  Clock,
  Trophy,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Minimize2,
  FileText,
  ChevronLeft,
  ChevronRight,
  Keyboard,
  ListOrdered,
  RotateCcw,
  AlertTriangle,
  AlertCircle,
  Check,
  Award,
  Sparkles,
  Send
} from "lucide-react";
import { clsx } from "clsx";

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
  id?: string;
  question: string;
  type?: "MCQ" | "SHORT" | "FIB";
  options?: string[];
  correctAnswer?: string;
}

interface Lesson {
  id: string;
  classId?: string;
  title: string;
  content: string;
  questions: string | Question[];
  subject: string;
  duration?: number;
  gradeLevel?: string;
  type?: string;
}

interface InteractiveLessonPlayerProps {
  lesson: Lesson;
  onClose: () => void;
  onSubmit: (id: string, title: string) => void;
}

export function InteractiveLessonPlayer({ lesson, onClose, onSubmit }: InteractiveLessonPlayerProps) {
  const isMath = React.useMemo(() => {
    if (!lesson?.subject) return false;
    const s = lesson.subject.toLowerCase().trim();
    return s.includes("math") || s.includes("mathematics") || s.includes("maths") || s === "mth";
  }, [lesson?.subject]);

  const [currentStep, setCurrentStep] = useState<"study" | "practice" | "complete">("study");
  const [playerStep, setPlayerStep] = useState<"instructions" | "questions">(isMath ? "instructions" : "questions");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [lessonPaletteBatch, setLessonPaletteBatch] = useState(0);

  // Sync lesson palette batch index when current question changes
  useEffect(() => {
    setLessonPaletteBatch(Math.floor(activeQuestionIndex / 10));
  }, [activeQuestionIndex]);

  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, { isChecked: boolean; isCorrect: boolean; feedback: string }>>({});
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [aiEvaluations, setAiEvaluations] = useState<Record<number, { isCorrect: boolean; explanation: string }>>({});
  const [isGrading, setIsGrading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isSplitView, setIsSplitView] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const showSplitPassage = !isMath && isSplitView;
  const hasText = !!lesson?.content && lesson.content.trim().length > 0;

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
        if (playerRef.current?.requestFullscreen) {
          await playerRef.current.requestFullscreen();
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

  // Timer Effect - stops running once test is completed or submitted
  useEffect(() => {
    if (currentStep === "complete" || submitSuccess || isSubmitting) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStep, submitSuccess, isSubmitting]);

  // Prevent parent/dashboard scrolling while playing lesson
  useEffect(() => {
    const dashboardMain = document.getElementById("dashboard-main");
    const originalBodyOverflow = document.body.style.overflow;
    
    if (dashboardMain) {
      dashboardMain.style.overflowY = "hidden";
    }
    document.body.style.overflow = "hidden";
    
    return () => {
      if (dashboardMain) {
        dashboardMain.style.overflowY = "auto";
      }
      document.body.style.overflow = originalBodyOverflow;
    };
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const questions: Question[] = React.useMemo(() => {
    try {
      if (!lesson.questions) return [];
      const parsed = typeof lesson.questions === "string" 
        ? JSON.parse(lesson.questions) 
        : lesson.questions;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error("Error parsing questions:", e);
      return [];
    }
  }, [lesson.questions]);

  const hasQuestions = questions.length > 0;
  // If there's content and questions, default to split view
  const isComprehension = !!lesson.content && lesson.content.trim().length > 150 && hasQuestions;

  // Auto-manage split view state based on comprehension
  useEffect(() => {
    setIsSplitView(isComprehension);
  }, [isComprehension]);

  // Robust answer checking logic
  const checkAnswer = (q: Question, studentAns: string): boolean => {
    if (!q.correctAnswer) return false; // Default to incorrect if no answer specified
    const sAns = (studentAns || "").trim().toLowerCase();
    const cAns = q.correctAnswer.trim().toLowerCase();
    if (sAns === cAns) return true;
    
    const qType = (q.type || (Array.isArray(q.options) && q.options.length > 0 ? "MCQ" : "SHORT")).toUpperCase();
    if (qType === "MCQ" && q.options && Array.isArray(q.options)) {
      const selectedIdx = q.options.findIndex(
        (opt: string) => (opt || "").trim().toLowerCase() === sAns
      );
      if (selectedIdx !== -1) {
        const letter = String.fromCharCode(65 + selectedIdx).toLowerCase();
        if (cAns === letter) return true;
        if (cAns === `${letter}.` || cAns === `${letter})`) return true;
        
        const cleanCAns = cAns.replace(/^[a-f][\.\)\s]+/, "").trim();
        if (sAns === cleanCAns) return true;

        if (cAns.startsWith(`${letter}.`) || cAns.startsWith(`${letter})`)) {
          const rest = cAns.replace(/^[a-f][\.\)]\s*/, "").trim();
          if (rest === sAns) return true;
        }
      }

      // Check if user answered with letter
      const userLetterMatch = sAns.match(/^[a-f]$/i);
      if (userLetterMatch) {
        const uIdx = sAns.charCodeAt(0) - 97;
        if (q.options[uIdx]) {
          const uOptText = q.options[uIdx].trim().toLowerCase();
          if (uOptText === cAns) return true;
          const cleanCAns = cAns.replace(/^[a-f][\.\)\s]+/, "").trim();
          if (uOptText === cleanCAns) return true;
        }
      }
    } else {
      // For short answers, normalize spaces and punctuation
      const norm = (str: string) => str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ");
      const normS = norm(sAns);
      const normC = norm(cAns);
      if (normS === normC) return true;
      if (normS.length > 2 && normC.length > 2) {
        if (normS.includes(normC) || normC.includes(normS)) return true;
      }
    }
    return false;
  };

  const isQuestionCorrect = (idx: number, q: Question): boolean => {
    if (aiEvaluations && aiEvaluations[idx] !== undefined) {
      return aiEvaluations[idx].isCorrect;
    }
    return checkAnswer(q, answers[idx] || "");
  };

  // Memoized stats calculation
  const scoreStats = React.useMemo(() => {
    if (!hasQuestions) return { correctCount: 0, percentage: 100, isCompleted: true };
    
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (isQuestionCorrect(idx, q)) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / questions.length) * 100);
    const isCompleted = percentage >= 95;
    return { correctCount, percentage, isCompleted };
  }, [questions, answers, hasQuestions, aiEvaluations]);

  const handleFinish = async () => {
    // Collect all short-answer questions to grade with AI
    const shortQuestions = questions.map((q, idx) => ({
      id: String(idx), // Use index as key
      question: q.question,
      correctAnswer: q.correctAnswer || "",
      userAnswer: (answers[idx] || "").trim(),
      type: q.type || (Array.isArray(q.options) && q.options.length > 0 ? "MCQ" : "SHORT")
    })).filter(q => {
      const qType = q.type.toUpperCase();
      return qType !== "MCQ" && qType !== "TRUE_FALSE" && q.userAnswer.length > 0;
    });

    if (shortQuestions.length > 0) {
      setIsGrading(true);
      try {
        const res = await fetch("/api/grade-answers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ questions: shortQuestions })
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.evaluations)) {
          const newEvals: Record<number, { isCorrect: boolean; explanation: string }> = {};
          data.evaluations.forEach((item: any) => {
            const idx = Number(item.id);
            newEvals[idx] = {
              isCorrect: !!item.isCorrect,
              explanation: item.explanation || ""
            };
          });
          setAiEvaluations(newEvals);
        }
      } catch (e) {
        console.error("Failed to run AI grading, falling back to local grading:", e);
      } finally {
        setIsGrading(false);
      }
    }

    setCurrentStep("complete");
  };

  const handleRetry = () => {
    setAnswers({});
    setAiEvaluations({});
    setCheckedQuestions({});
    setPlayerStep("instructions");
    setActiveQuestionIndex(0);
    setCurrentStep("study");
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleSubmitResults = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const token = localStorage.getItem("ebm_token") || "";
      const studentName = localStorage.getItem("user_name") || "Student";
      
      const payload = {
        classId: lesson.classId || "class_1",
        assignmentId: null,
        assessmentId: lesson.id,
        type: "CURRICULUM",
        score: scoreStats.percentage,
        status: scoreStats.isCompleted ? "COMPLETED" : "PRACTICED",
        studentName,
        content: JSON.stringify({
          answers,
          scorePercentage: scoreStats.percentage,
          correctCount: scoreStats.correctCount,
          totalCount: questions.length,
          timeTakenSeconds: seconds,
          questions: questions.map((q, idx) => {
            const isCorrect = isQuestionCorrect(idx, q);
            const explanation = aiEvaluations[idx]?.explanation || "";
            return {
              question: q.question,
              correctAnswer: q.correctAnswer || "",
              studentAnswer: answers[idx] || "",
              isCorrect,
              explanation
            };
          })
        })
      };

      const response = await fetch("/api/student/submissions", {
        method: "POST",
        headers: {
          "Authorization": token ? `Bearer ${token}` : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();
      
      if (scoreStats.isCompleted) {
        await fetch("/api/student/completed-lessons", {
          method: "POST",
          headers: {
            "Authorization": token ? `Bearer ${token}` : "",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ lessonId: lesson.id })
        });
      }

      if (resData.success) {
        setSubmitSuccess(true);
        // Let the parent know and trigger update
        setTimeout(() => {
          onSubmit(lesson.id, lesson.title);
        }, 1500);
      } else {
        throw new Error(resData.error || "Failed to submit results to database.");
      }
    } catch (e: any) {
      console.error("Error submitting lesson completion:", e);
      setSubmitError(e.message || "An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).filter(k => answers[Number(k)]?.trim().length > 0).length;
  const progressPercent = hasQuestions 
    ? Math.round((answeredCount / questions.length) * 100)
    : 100;

  if (isGrading) {
    return (
      <div className="fixed inset-0 z-[110] bg-white/95 flex flex-col items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight animate-pulse">AI Grading in Progress</h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Evaluating your short answers for conceptual and semantic correctness. We match closely related synonyms (like "dustbin" and "bin") with high flexibility.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={playerRef} className={clsx("fixed inset-0 z-[100] bg-slate-50 flex flex-col animate-in fade-in duration-300 overflow-hidden font-sans", isFullScreen && "w-screen h-screen")}>
      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-slate-200/80 flex items-center justify-between px-6 md:px-10 bg-white shrink-0 shadow-xs z-20">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all font-bold text-xs md:text-sm border border-slate-100 hover:border-slate-200 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          <div className="h-6 w-[1px] bg-slate-200" />
          <div>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block leading-none mb-1">
              {lesson.subject || "General"} • {lesson.gradeLevel || "Grade Level"}
            </span>
            <h2 className="text-sm md:text-lg font-black text-slate-800 leading-none truncate max-w-[200px] md:max-w-md">
              {lesson.title}
            </h2>
          </div>
        </div>

        {/* Live Active Status / Timer */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Progress Pill */}
          {hasQuestions && currentStep !== "complete" && (
            <div className="hidden lg:flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-2 rounded-2xl">
              <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">
                Progress: {answeredCount}/{questions.length} answered
              </span>
              <div className="w-28 md:w-44 h-2.5 bg-blue-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Active Timer */}
          <div className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-2xl bg-slate-950 text-white border border-slate-900 shadow-md">
            <Clock className={`h-4 w-4 ${currentStep === "complete" || submitSuccess ? "text-slate-400" : "text-emerald-400 animate-pulse"}`} />
            <span className="text-xs md:text-sm font-black font-mono tracking-wider">{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-2">
            {currentStep !== "complete" && (
              <button 
                onClick={toggleFullScreen}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200/80 shadow-xs"
                title={isFullScreen ? "Exit Fullscreen Mode" : "Fullscreen Mode"}
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4 md:h-5 md:w-5 text-blue-600" /> : <Maximize2 className="h-4 w-4 md:h-5 md:w-5 text-slate-700" />}
                <span className="hidden sm:inline text-xs font-bold">{isFullScreen ? "Exit Fullscreen" : "Full Screen"}</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2.5 rounded-xl bg-red-50 text-red-500 hover:text-red-700 hover:bg-red-100 transition-all cursor-pointer border border-red-100"
              title="Close Test"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {currentStep === "complete" ? (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto flex flex-col items-center p-6 md:p-12 bg-slate-50/50"
            >
              <div className="w-full max-w-3xl bg-white rounded-[2rem] border border-slate-200/80 p-8 md:p-12 shadow-xl flex flex-col items-center text-center">
                <div className={clsx(
                  "w-28 h-28 md:w-32 md:h-32 rounded-[2rem] flex items-center justify-center text-white mb-6 relative shadow-lg",
                  scoreStats.isCompleted ? "bg-emerald-500 shadow-emerald-500/20" : "bg-amber-500 shadow-amber-500/20"
                )}>
                  {scoreStats.isCompleted ? (
                    <Trophy className="h-14 w-14 animate-bounce" />
                  ) : (
                    <Award className="h-14 w-14 animate-pulse" />
                  )}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border-4 border-white shadow-md">
                    <Zap className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                  {scoreStats.isCompleted ? "Mastery Achieved!" : "Practice Completed"}
                </h2>
                <p className="text-sm text-slate-500 font-medium max-w-md mb-8">
                  {scoreStats.isCompleted 
                    ? "Fantastic! You scored 95% or above and successfully completed this curriculum module."
                    : "You finished the practice questions! To officially mark this lesson as completed, aim for a score of 95% or higher."
                  }
                </p>
                
                {/* Score Stats Dashboard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mb-8">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">My Score</p>
                    <p className={clsx(
                      "text-xl md:text-2xl font-black",
                      scoreStats.isCompleted ? "text-emerald-600" : "text-amber-500"
                    )}>
                      {scoreStats.percentage}%
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Correct Answers</p>
                    <p className="text-xl md:text-2xl font-black text-slate-800">
                      {scoreStats.correctCount} / {questions.length}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time taken</p>
                    <p className="text-xl md:text-2xl font-black text-slate-800">{formatTime(seconds)}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <span className={clsx(
                      "inline-block px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider mt-1",
                      scoreStats.isCompleted 
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200" 
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    )}>
                      {scoreStats.isCompleted ? "Completed" : "Incomplete"}
                    </span>
                  </div>
                </div>

                {/* Question Breakdown Section */}
                {hasQuestions && (
                  <div className="w-full text-left space-y-4 mb-10">
                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider flex items-center gap-2 px-1">
                      <ListOrdered className="h-4 w-4 text-blue-600" />
                      Detailed Practice Results
                    </h3>                     <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1 border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
                      {questions.map((q, idx) => {
                        const sAns = answers[idx] || "";
                        const isCorrect = isQuestionCorrect(idx, q);
                        const explanation = aiEvaluations[idx]?.explanation || "";

                        return (
                          <div 
                            key={idx}
                            className={clsx(
                              "p-4 rounded-xl border bg-white shadow-xs transition-all flex flex-col md:flex-row justify-between gap-4 items-start md:items-center",
                              isCorrect ? "border-emerald-100" : "border-rose-150 shadow-rose-500/5"
                            )}
                          >
                            <div className="space-y-1">
                              <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Question {idx + 1}</span>
                              <p className="text-xs md:text-sm font-bold text-slate-800">{q.question}</p>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5 text-xs text-slate-500 font-medium">
                                <p>
                                  Your Answer: <span className={clsx(
                                    "font-bold",
                                    isCorrect ? "text-emerald-600" : "text-rose-600"
                                  )}>{sAns || "(Skipped)"}</span>
                                </p>
                                {!isCorrect && q.correctAnswer && (
                                  <p className="text-slate-500">
                                    Correct Answer: <span className="text-emerald-600 font-bold">{q.correctAnswer}</span>
                                  </p>
                                )}
                              </div>

                              {explanation && (
                                <div className="mt-2 bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-slate-600 font-medium leading-relaxed max-w-xl text-left shadow-xs">
                                  <div className="flex items-center gap-1 mb-1">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">AI Feedback</span>
                                  </div>
                                  "{explanation}"
                                </div>
                              )}
                            </div>

                            <span className={clsx(
                              "px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 shrink-0 self-start md:self-auto",
                              isCorrect 
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                : "bg-rose-50 text-rose-700 border border-rose-100"
                            )}>
                              {isCorrect ? (
                                <>
                                  <Check className="h-3 w-3" /> Correct
                                </>
                              ) : (
                                <>
                                  <X className="h-3 w-3" /> Incorrect
                                </>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Save Error message */}
                {submitError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold text-left w-full mb-6 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Submitting Status / Actions */}
                {submitSuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-black w-full max-w-md animate-bounce flex items-center justify-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    Practice Results Saved Successfully!
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                    <button 
                      onClick={handleRetry}
                      disabled={isSubmitting}
                      className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <RotateCcw className="h-4 w-4" /> Retry Practice
                    </button>
                    
                    <button 
                      onClick={handleSubmitResults}
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black text-xs md:text-sm transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? "Saving Result..." : "Submit Results"} 
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : playerStep === "instructions" ? (
            /* STEP 1: INSTRUCTIONS & READING PASSAGE FIRST */
            <motion.div 
              key="instructions-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto p-6 md:p-12 bg-slate-50 flex flex-col items-center"
            >
              <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 md:p-10 space-y-8 my-auto">
                {/* Step Banner */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 via-blue-50 to-amber-50 border border-indigo-200/80 rounded-2xl flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2.5 py-0.5 rounded-full">
                        Step 1 of 2: Instructions & Passage
                      </span>
                      <h3 className="text-sm font-black text-slate-900">
                        Review Lesson Material Before Starting Questionnaire
                      </h3>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        Read through the material below carefully. When you are ready, click <strong>"Start Questions"</strong> to answer questions 1 per screen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reading Passage & Content */}
                <div className="space-y-3 border-t border-slate-100 pt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-600" /> Lesson Passage & Learning Notes
                    </h3>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-1 rounded-md">Read-Only</span>
                  </div>
                  
                  <div className="bg-slate-50/80 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-inner">
                    <article className="prose prose-slate prose-blue max-w-none">
                      <div className="markdown-body text-slate-800 leading-relaxed font-medium text-sm md:text-base space-y-4">
                        <Markdown>
                          {lesson.content || "# No Reading Passage\nPlease proceed directly to practice questions."}
                        </Markdown>
                      </div>
                    </article>
                  </div>
                </div>

                {/* Instructions info box */}
                <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 border border-slate-800">
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" /> Questionnaire Guidelines
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-medium list-disc pl-5">
                    <li>Questions will be displayed <strong>1 by 1</strong> on screen.</li>
                    <li>Use the <strong>Check Answer</strong> button to verify your solution instantly on each question.</li>
                    <li>Use <strong>Skip Question</strong> if you want to answer a question later.</li>
                    <li>Score 95%+ to successfully pass and finish the lesson module.</li>
                  </ul>
                </div>

                {/* Start Questions Action Button */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-500">
                    {hasQuestions ? `${questions.length} questions ready` : "Reading material complete"}
                  </span>
                  
                  {hasQuestions ? (
                    <button
                      onClick={() => {
                        setPlayerStep("questions");
                        setActiveQuestionIndex(0);
                      }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/25 flex items-center gap-3 transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      <span>Start Questions (1 per screen)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinish}
                      className="px-8 py-4 bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl flex items-center gap-3 transition-all cursor-pointer"
                    >
                      <span>Complete Module</span>
                      <Check className="w-4 h-4 text-emerald-400" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* STEP 2: QUESTIONS DISPLAYED ONE BY ONE (1 QUESTION PER SCREEN) */
            <motion.div 
              key="questions-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col bg-white overflow-hidden"
            >
              {/* Header Toolbar (Full Width) */}
              <div className="px-6 py-3.5 border-b border-slate-800 bg-[#0F172A] text-white flex flex-row items-center justify-between gap-3 shrink-0 z-10 shadow-md">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPlayerStep("instructions")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border border-white/5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Passage & Instructions
                  </button>
                  <span className="text-slate-600 font-bold">•</span>
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Question {activeQuestionIndex + 1} of {questions.length}
                  </span>
                </div>

                {/* Question Palette Pills */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {questions.length > 10 && (
                    <button
                      onClick={() => setLessonPaletteBatch(prev => Math.max(0, prev - 1))}
                      disabled={lessonPaletteBatch === 0}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center justify-center"
                      title="Previous Batch"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}

                  <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-hidden scrollbar-hide shrink-0 max-h-10">
                    {questions
                      .slice(lessonPaletteBatch * 10, (lessonPaletteBatch + 1) * 10)
                      .map((q, idxWithinBatch) => {
                        const idx = lessonPaletteBatch * 10 + idxWithinBatch;
                        const isCurrent = activeQuestionIndex === idx;
                        const isAnswered = !!answers[idx]?.trim();
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveQuestionIndex(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center transition cursor-pointer shrink-0 ${
                              isCurrent
                                ? "bg-blue-600 text-white font-black shadow-md scale-110"
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

                  {questions.length > 10 && (
                    <button
                      onClick={() => setLessonPaletteBatch(prev => Math.min(Math.ceil(questions.length / 10) - 1, prev + 1))}
                      disabled={lessonPaletteBatch === Math.ceil(questions.length / 10) - 1}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer flex items-center justify-center"
                      title="Next Batch"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Workspace Content Row */}
              <div className="flex-1 flex flex-col md:flex-row px-6 pt-0 pb-0 gap-6 min-h-0 overflow-y-auto scrollbar-hide bg-white relative">
                {/* Optional Reference Reading Passage Side Pane */}
                {showSplitPassage && (
                  <div className="w-full md:w-1/2 h-1/3 md:h-full bg-white border border-slate-200 rounded-[32px] shadow-sm flex flex-col overflow-hidden">
                    <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-black text-slate-600 uppercase tracking-wider">Lesson Passage Reference</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={toggleFullScreen}
                          className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer"
                          title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Mode"}
                        >
                          {isFullScreen ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
                          <span>{isFullScreen ? "Exit Fullscreen" : "Full Screen"}</span>
                        </button>
                        <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded">Reference</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6">
                      <article className="prose prose-slate prose-blue max-w-none text-xs md:text-sm">
                        <div className="markdown-body text-slate-700 leading-relaxed font-medium space-y-3">
                          <Markdown>
                            {lesson.content || "No reading text provided."}
                          </Markdown>
                        </div>
                      </article>
                    </div>
                  </div>
                )}

                {/* Left Card: Question Container */}
                <div 
                  className="bg-white flex flex-col overflow-hidden h-full min-h-0 flex-1"
                  style={isMath && sliderSettings.slides.length > 0 && !showSplitPassage ? { flexBasis: `${100 - sliderSettings.splitPercentage}%` } : undefined}
                >
                  <div className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-6 flex flex-col justify-start">
                    {questions[activeQuestionIndex] ? (
                      (() => {
                        const q = questions[activeQuestionIndex];
                        const qIdx = activeQuestionIndex;
                        const isMCQ = Array.isArray(q.options) && q.options.length > 0;
                        const currentAnswer = answers[qIdx] || "";
                        const checkedState = checkedQuestions[qIdx];

                        return (
                          <div className="max-w-4xl mx-auto w-full space-y-5 my-auto">
                            {/* Question Header Badge */}
                            <div className="flex items-center justify-between">
                              <span className="px-3.5 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                Question #{qIdx + 1} ({isMCQ ? "Multiple Choice" : "Written Answer"})
                              </span>
                              <span className="text-xs font-bold text-slate-400">
                                Answered: {Object.keys(answers).filter(k => answers[Number(k)]?.trim()).length} / {questions.length}
                              </span>
                            </div>

                            {/* Question Prompt */}
                            <div className="p-5 md:p-6 bg-white border border-slate-100 rounded-3xl shadow-xs border-blue-100 bg-blue-50/20 space-y-2">
                              <AutoScalingText
                                text={q.question}
                                className="font-black text-slate-900 leading-relaxed"
                                maxFontSize={18}
                                minFontSize={12}
                              />
                            </div>

                            {/* Options or Written Input */}
                            {isMCQ ? (
                              <div className={clsx("grid gap-3", showSplitPassage ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>
                                {q.options?.map((option, oIdx) => {
                                  const isSelected = currentAnswer === option;
                                  const letter = String.fromCharCode(65 + oIdx);
                                  return (
                                    <button
                                      key={oIdx}
                                      onClick={() => setAnswers(prev => ({ ...prev, [qIdx]: option }))}
                                      className={`w-full p-4 md:p-5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                        isSelected
                                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md font-bold scale-[1.01]"
                                          : "bg-white border-slate-200/90 hover:border-blue-400 hover:bg-slate-50 text-slate-800 shadow-xs"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                                          isSelected ? "bg-white text-blue-700" : "bg-slate-100 text-slate-600"
                                        }`}>
                                          {letter}
                                        </span>
                                        <span className="text-xs sm:text-sm md:text-base font-semibold leading-snug">{option}</span>
                                      </div>
                                      {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                                  Your Complete Answer:
                                </label>
                                <textarea
                                  key={`answer-textarea-${qIdx}`}
                                  autoFocus
                                  ref={(el) => {
                                    if (el) {
                                      el.focus();
                                      // Move cursor to the end of existing text if any
                                      const len = el.value.length;
                                      el.setSelectionRange(len, len);
                                    }
                                  }}
                                  value={currentAnswer}
                                  onChange={(e) => setAnswers(prev => ({ ...prev, [qIdx]: e.target.value }))}
                                  placeholder="Type your answer here..."
                                  rows={2}
                                  className="w-full text-sm p-3 md:p-3.5 rounded-xl border-2 border-blue-500/80 bg-white text-slate-900 font-bold focus:border-blue-600 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all shadow-sm resize-none"
                                />
                              </div>
                            )}

                            {/* Check Answer & Skip Action Buttons */}
                            <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                              <button
                                onClick={() => {
                                  const userAns = currentAnswer.trim();
                                  if (!userAns) {
                                    alert("Please enter or select an answer first.");
                                    return;
                                  }
                                  const isCorrect = checkAnswer(q, userAns);
                                  setCheckedQuestions(prev => ({
                                    ...prev,
                                    [qIdx]: {
                                      isChecked: true,
                                      isCorrect,
                                      feedback: isCorrect
                                        ? "✓ Correct answer! Excellent job."
                                        : q.correctAnswer
                                          ? `✗ Incorrect. Expected answer: "${q.correctAnswer}". Try again!`
                                          : "✓ Answer evaluated and saved!"
                                    }
                                  }));
                                }}
                                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition cursor-pointer active:scale-95"
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" /> Check Answer
                              </button>

                              <button
                                onClick={() => {
                                  setActiveQuestionIndex((prev) => (prev + 1) % questions.length);
                                }}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-black rounded-lg uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer border border-slate-300"
                              >
                                <ArrowRight className="w-3.5 h-3.5" /> Skip Question
                              </button>
                            </div>

                            {/* Feedback Banner */}
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
                        );
                      })()
                    ) : (
                      <div className="text-center text-slate-500 font-bold text-sm">
                        No questions found.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Card: Slide Reference Image View (Only for Math) */}
                {isMath && sliderSettings.slides && sliderSettings.slides.length > 0 && !showSplitPassage && (
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

              {/* Bottom Navigation Footer (Full Width) */}
              <footer className="h-14 bg-white border-t border-slate-200 px-6 md:px-10 flex items-center justify-between shrink-0 z-10 shadow-xs">
                <button
                  onClick={() => setActiveQuestionIndex(Math.max(0, activeQuestionIndex - 1))}
                  disabled={activeQuestionIndex === 0}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-40 disabled:hover:text-slate-500 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>

                <div className="flex items-center gap-2.5">
                  {activeQuestionIndex < questions.length - 1 ? (
                    <button
                      onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      Next Question <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : null}

                  <button 
                    onClick={handleFinish}
                    className="px-5 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    Finish & Review Module <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
