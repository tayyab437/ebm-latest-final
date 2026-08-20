import React, { useState } from "react";
import { CourseModule, Lesson, Quiz, EbmYear } from "../../../types";
import { EBM_ROADMAP_DETAILS } from "../../../constants";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award, 
  Sparkles, 
  PlayCircle, 
  BarChart3, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Brain, 
  Zap, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  X, 
  ArrowRight,
  TrendingUp,
  FileText,
  Lock,
  RotateCcw,
  Star,
  Flame,
  Layers,
  Compass,
  Check,
  GraduationCap,
  Download,
  Share2,
  Trophy,
  PartyPopper
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CoursePerformanceHubProps {
  courses: CourseModule[];
  selectedYear: EbmYear;
  onSelectYear: (year: EbmYear) => void;
  onUpdateCourses: (updatedCourses: CourseModule[]) => void;
  studentStats?: {
    overallProgress: number;
    studyStreak?: number;
    xpPoints?: number;
  };
}

// Subject color styling palette helper
const getSubjectTheme = (subject: string) => {
  const subLower = subject.toLowerCase();
  if (subLower.includes("math") || subLower.includes("algebra") || subLower.includes("trigonometry")) {
    return {
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      badgeBg: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      pillBg: "bg-blue-600 text-white",
      progressBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      glow: "shadow-blue-500/20",
      border: "border-blue-200 hover:border-blue-400",
      accentText: "text-blue-600"
    };
  }
  if (subLower.includes("science") || subLower.includes("physics") || subLower.includes("chem") || subLower.includes("bio")) {
    return {
      gradient: "from-emerald-600 via-teal-600 to-cyan-600",
      badgeBg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      pillBg: "bg-emerald-600 text-white",
      progressBg: "bg-gradient-to-r from-emerald-400 to-teal-500",
      glow: "shadow-emerald-500/20",
      border: "border-emerald-200 hover:border-emerald-400",
      accentText: "text-emerald-600"
    };
  }
  if (subLower.includes("read") || subLower.includes("speed") || subLower.includes("english") || subLower.includes("essay")) {
    return {
      gradient: "from-amber-500 via-orange-600 to-rose-600",
      badgeBg: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      pillBg: "bg-amber-500 text-slate-950",
      progressBg: "bg-gradient-to-r from-amber-400 to-orange-500",
      glow: "shadow-amber-500/20",
      border: "border-amber-200 hover:border-amber-400",
      accentText: "text-amber-600"
    };
  }
  if (subLower.includes("history") || subLower.includes("social") || subLower.includes("econ")) {
    return {
      gradient: "from-purple-600 via-fuchsia-600 to-pink-600",
      badgeBg: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      pillBg: "bg-purple-600 text-white",
      progressBg: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
      glow: "shadow-purple-500/20",
      border: "border-purple-200 hover:border-purple-400",
      accentText: "text-purple-600"
    };
  }
  return {
    gradient: "from-indigo-600 via-violet-600 to-blue-600",
    badgeBg: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    pillBg: "bg-indigo-600 text-white",
    progressBg: "bg-gradient-to-r from-indigo-500 to-blue-600",
    glow: "shadow-indigo-500/20",
    border: "border-indigo-200 hover:border-indigo-400",
    accentText: "text-indigo-600"
  };
};

// Sample interactive quiz questions generator per subject
const SAMPLE_QUIZ_QUESTIONS: Record<string, Array<{ question: string; options: string[]; answer: number; explanation: string }>> = {
  default: [
    {
      question: "In the EBM Accelerated Heuristic, what is the primary method to double reading comprehension speed?",
      options: ["Sub-vocalization", "Visual contextual scanning & chunking", "Rote memorization", "Syllable spelling"],
      answer: 1,
      explanation: "Visual contextual scanning allows the brain to parse phrases as visual units without inner vocalization."
    },
    {
      question: "Which step in algebraic factorization requires isolating the quadratic discriminant?",
      options: ["b² - 4ac evaluation", "Cross multiplication", "Linear slope calculation", "Matrix inversion"],
      answer: 0,
      explanation: "The discriminant b² - 4ac determines the nature of the roots before solving."
    },
    {
      question: "In Newton's Second Law of Motion, what is the proportional relationship between net force and acceleration?",
      options: ["Inversely proportional to mass", "Directly proportional to mass", "Independent of mass", "Exponential to mass squared"],
      answer: 0,
      explanation: "Acceleration = Net Force / Mass, meaning acceleration is inversely proportional to mass."
    }
  ],
  "Accelerated Mathematics": [
    {
      question: "What is the simplified form of (x² - 9) / (x - 3) where x ≠ 3?",
      options: ["x - 3", "x + 3", "x² + 3", "3x"],
      answer: 1,
      explanation: "x² - 9 factors into (x - 3)(x + 3). Canceling (x - 3) leaves (x + 3)."
    },
    {
      question: "If a speed reading drill increases output by 25% to 350 WPM, what was the original WPM?",
      options: ["250 WPM", "280 WPM", "300 WPM", "310 WPM"],
      answer: 1,
      explanation: "Original = 350 / 1.25 = 280 WPM."
    }
  ],
  "Algebra & Trigonometry": [
    {
      question: "What is the value of sin²(θ) + cos²(θ) for any real angle θ?",
      options: ["0", "0.5", "1", "2"],
      answer: 2,
      explanation: "The Pythagorean trigonometric identity states that sin²(θ) + cos²(θ) = 1."
    },
    {
      question: "Find the roots of the equation x² - 5x + 6 = 0.",
      options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = 0, 5"],
      answer: 1,
      explanation: "(x - 2)(x - 3) = 0 yields roots x = 2 and x = 3."
    }
  ]
};

export function CoursePerformanceHub({
  courses,
  selectedYear,
  onSelectYear,
  onUpdateCourses,
  studentStats = { overallProgress: 68, studyStreak: 14, xpPoints: 3420 }
}: CoursePerformanceHubProps) {
  const [activeTab, setActiveTab] = useState<"syllabus" | "analytics" | "quizzes">("syllabus");
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "IN_PROGRESS" | "COMPLETED">("ALL");
  const [expandedCourseIds, setExpandedCourseIds] = useState<Record<string, boolean>>({
    [courses[0]?.id || ""]: true
  });

  // Modal states
  const [selectedLesson, setSelectedLesson] = useState<{ lesson: Lesson; courseId: string } | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<{ quiz: Quiz; courseId: string; subject: string } | null>(null);
  const [completedCourseModal, setCompletedCourseModal] = useState<CourseModule | null>(null);

  // Gamification celebration pop
  const [xpCelebration, setXpCelebration] = useState<number | null>(null);

  // Quiz execution state inside modal
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizScoreResult, setQuizScoreResult] = useState<number | null>(null);

  const roadmapInfo = EBM_ROADMAP_DETAILS[selectedYear] || EBM_ROADMAP_DETAILS[EbmYear.YEAR_1];
  const yearCourses = courses.filter((c) => c.year === selectedYear);

  // Calculate stats for current year
  const totalLessonsCount = yearCourses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessonsCount = yearCourses.reduce(
    (acc, c) => acc + c.lessons.filter((l) => l.completed).length,
    0
  );
  const totalQuizzesCount = yearCourses.reduce((acc, c) => acc + c.quizzes.length, 0);
  const completedQuizzesCount = yearCourses.reduce(
    (acc, c) => acc + c.quizzes.filter((q) => q.completed).length,
    0
  );

  const yearProgressPercent =
    totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  // Toggle course expand
  const toggleCourseExpand = (id: string) => {
    setExpandedCourseIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle lesson completion dynamically
  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    let wasNewlyCompleted = false;
    let newlyCompletedCourseModule: CourseModule | null = null;

    const updated = courses.map((course) => {
      if (course.id !== courseId) return course;

      const updatedLessons = course.lessons.map((l) => {
        if (l.id === lessonId) {
          if (!l.completed) wasNewlyCompleted = true;
          return { ...l, completed: !l.completed };
        }
        return l;
      });

      const completedCount = updatedLessons.filter((l) => l.completed).length;
      const newProgress =
        updatedLessons.length > 0
          ? Math.round((completedCount / updatedLessons.length) * 100)
          : 0;

      const updatedCourseObj = {
        ...course,
        lessons: updatedLessons,
        progress: newProgress
      };

      // Check if course just reached 100% completion
      if (newProgress === 100 && course.progress < 100) {
        newlyCompletedCourseModule = updatedCourseObj;
      }

      return updatedCourseObj;
    });

    onUpdateCourses(updated);

    if (newlyCompletedCourseModule) {
      setCompletedCourseModal(newlyCompletedCourseModule);
    } else if (wasNewlyCompleted) {
      setXpCelebration(50);
      setTimeout(() => setXpCelebration(null), 2500);
    }

    if (selectedLesson && selectedLesson.lesson.id === lessonId) {
      setSelectedLesson({
        ...selectedLesson,
        lesson: { ...selectedLesson.lesson, completed: !selectedLesson.lesson.completed }
      });
    }
  };

  // Start Quiz Modal
  const handleStartQuiz = (quiz: Quiz, courseId: string, subject: string) => {
    setSelectedQuiz({ quiz, courseId, subject });
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setQuizScoreResult(null);
  };

  // Handle Quiz Option Selection
  const handleSelectQuizOption = (optionIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIdx);
  };

  const questionsList =
    selectedQuiz && SAMPLE_QUIZ_QUESTIONS[selectedQuiz.subject]
      ? SAMPLE_QUIZ_QUESTIONS[selectedQuiz.subject]
      : SAMPLE_QUIZ_QUESTIONS.default;

  const handleNextQuizQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex + 1 < questionsList.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      let correctCount = 0;
      newAnswers.forEach((ans, idx) => {
        if (ans === questionsList[idx].answer) correctCount++;
      });
      const finalScore = Math.round((correctCount / questionsList.length) * 100);
      setQuizScoreResult(finalScore);

      if (selectedQuiz) {
        const updated = courses.map((course) => {
          if (course.id !== selectedQuiz.courseId) return course;
          const updatedQuizzes = course.quizzes.map((q) =>
            q.id === selectedQuiz.quiz.id
              ? { ...q, completed: true, score: finalScore }
              : q
          );
          return { ...course, quizzes: updatedQuizzes };
        });
        onUpdateCourses(updated);
      }
    }
  };

  // Filtered courses
  const filteredCourses = yearCourses.filter((course) => {
    const matchesSubject = subjectFilter === "ALL" || course.subject === subjectFilter;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.lessons.some((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL"
        ? true
        : statusFilter === "COMPLETED"
        ? course.progress === 100
        : course.progress < 100;

    return matchesSubject && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 relative">
      {/* XP Pop Floating Animation */}
      <AnimatePresence>
        {xpCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1.2, y: -40 }}
            exit={{ opacity: 0, scale: 0.8, y: -80 }}
            className="fixed bottom-10 right-10 z-50 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white pointer-events-none"
          >
            <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
            <span className="text-sm uppercase tracking-wider">+{xpCelebration} XP Earned! Heuristic Progress Saved</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Academic Roadmap Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-indigo-500/20"
      >
        {/* Animated Glow Particles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -mr-28 -mt-28 pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-amber-500/15 to-rose-500/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" /> Accelerated Academic Track
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                {roadmapInfo.targetGrades}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {roadmapInfo.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {roadmapInfo.focus}
            </p>

            {/* Year Switcher Pills */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              {[
                { key: EbmYear.YEAR_1, label: "Year 1 (Foundation)" },
                { key: EbmYear.YEAR_2, label: "Year 2 (Pre-O Level)" },
                { key: EbmYear.YEAR_3, label: "Year 3 (CIE O-Level)" }
              ].map((yr) => {
                const isSelected = selectedYear === yr.key;
                return (
                  <motion.button
                    key={yr.key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => onSelectYear(yr.key as EbmYear)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 text-slate-950 shadow-lg shadow-amber-400/20 ring-2 ring-amber-300"
                        : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    {yr.label}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Performance Meter Widget */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 space-y-4 shrink-0 lg:w-80 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-400" /> Overall Track Mastery
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono drop-shadow">
                {yearProgressPercent}%
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full bg-slate-950/60 rounded-full h-3.5 p-0.5 border border-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${yearProgressPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full shadow-md"
              />
            </div>

            {/* Gamified Stat Badges */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
              <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 block font-bold uppercase tracking-wider">Completed</span>
                  <span className="text-xs font-black text-white">{completedLessonsCount}/{totalLessonsCount}</span>
                </div>
              </div>

              <div className="p-2.5 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                  <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 block font-bold uppercase tracking-wider">Passed Quiz</span>
                  <span className="text-xs font-black text-white">{completedQuizzesCount}/{totalQuizzesCount}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Tabs & Filters Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Main View Mode Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl overflow-x-auto">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab("syllabus")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === "syllabus"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Course Syllabus Modules
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Mastery Radar & Analytics
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab("quizzes")}
              className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                activeTab === "quizzes"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Award className="w-4 h-4" /> Diagnostic Checkpoints ({totalQuizzesCount})
            </motion.button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search modules or lessons..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Secondary Filters */}
        {activeTab === "syllabus" && (
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Filter className="w-3 h-3 text-slate-400" /> Subject:
              </span>
              <button
                onClick={() => setSubjectFilter("ALL")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer ${
                  subjectFilter === "ALL"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Subjects
              </button>
              {roadmapInfo.subjects.map((sub) => {
                const theme = getSubjectTheme(sub);
                const isSel = subjectFilter === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setSubjectFilter(sub)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition cursor-pointer ${
                      isSel
                        ? `${theme.pillBg} shadow-sm`
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStatusFilter("ALL")}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition ${
                  statusFilter === "ALL" ? "bg-blue-50 text-blue-700 border border-blue-200" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                All Status
              </button>
              <button
                onClick={() => setStatusFilter("IN_PROGRESS")}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition ${
                  statusFilter === "IN_PROGRESS" ? "bg-amber-50 text-amber-700 border border-amber-200" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setStatusFilter("COMPLETED")}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase transition ${
                  statusFilter === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TAB 1: SYLLABUS MODULES */}
      {activeTab === "syllabus" && (
        <div className="space-y-6">
          {filteredCourses.length === 0 ? (
            <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center space-y-3 shadow-xs">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto animate-bounce" />
              <p className="text-sm font-black text-slate-500 uppercase tracking-wider">
                No course modules found for your search query
              </p>
            </div>
          ) : (
            filteredCourses.map((course, index) => {
              const isExpanded = expandedCourseIds[course.id] ?? false;
              const courseCompletedLessons = course.lessons.filter((l) => l.completed).length;
              const theme = getSubjectTheme(course.subject);
              const isCourseCompleted = course.progress === 100;

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all duration-300 ${
                    isCourseCompleted ? "border-amber-300 ring-2 ring-amber-400/20 shadow-md" : theme.border
                  }`}
                >
                  {/* COMPLETED COURSE ATTRACTIVE CELEBRATION HEADER BANNER */}
                  {isCourseCompleted && (
                    <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-slate-950 px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-slate-950 animate-bounce" />
                        <span className="text-xs font-black uppercase tracking-wider">
                          Course Completed & Mastered • 100% Heuristic Score
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompletedCourseModal(course);
                        }}
                        className="px-3.5 py-1 bg-slate-950 hover:bg-slate-900 text-amber-300 rounded-xl text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-300" /> View Completion Certificate
                      </button>
                    </div>
                  )}

                  {/* Course Module Header */}
                  <div
                    onClick={() => toggleCourseExpand(course.id)}
                    className="p-6 bg-slate-50/40 hover:bg-slate-100/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${theme.badgeBg}`}>
                          {course.subject}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          Week {course.weekNumber} • {course.durationDays} Days Track
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        {course.title}
                        {isCourseCompleted && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                            ✓ Mastered
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Progress Ring / Bar & Expand Toggle */}
                    <div className="flex items-center gap-5 shrink-0">
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-base font-black font-mono text-slate-900">
                            {course.progress}%
                          </span>
                          {isCourseCompleted && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                        </div>
                        <div className="w-32 h-2.5 bg-slate-200/80 rounded-full mt-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 0.8 }}
                            className={`h-full rounded-full ${
                              isCourseCompleted ? "bg-gradient-to-r from-emerald-400 to-teal-500" : theme.progressBg
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold block mt-1">
                          {courseCompletedLessons}/{course.lessons.length} Lessons Complete
                        </span>
                      </div>

                      <div className="p-2.5 text-slate-500 hover:text-slate-900 bg-white rounded-2xl border border-slate-200 shadow-xs">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Lessons & Quizzes List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="p-6 space-y-6 bg-white"
                      >
                        {/* Lessons Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                              <BookOpen className={`w-4 h-4 ${theme.accentText}`} /> Lesson Content ({course.lessons.length})
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">Click mark done to update your progress</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            {course.lessons.map((lesson, idx) => (
                              <motion.div
                                key={lesson.id}
                                whileHover={{ scale: 1.01 }}
                                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                                  lesson.completed
                                    ? "bg-emerald-50/50 border-emerald-300/80"
                                    : "bg-slate-50/80 border-slate-200 hover:border-slate-300"
                                }`}
                              >
                                <div className="space-y-1.5 flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black font-mono text-slate-400">
                                      #{idx + 1}
                                    </span>
                                    <h4
                                      onClick={() => setSelectedLesson({ lesson, courseId: course.id })}
                                      className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                                    >
                                      {lesson.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-2">
                                    {lesson.description}
                                  </p>
                                  <div className="flex items-center gap-3 pt-1 text-[10px] text-slate-400 font-semibold">
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3 h-3 text-slate-400" /> {lesson.durationMinutes} mins
                                    </span>
                                    <span>• Heuristic Study</span>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end gap-2.5 shrink-0">
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleToggleLessonComplete(course.id, lesson.id)}
                                    className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                                      lesson.completed
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                                    }`}
                                  >
                                    {lesson.completed ? (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Done
                                      </>
                                    ) : (
                                      "Mark Done"
                                    )}
                                  </motion.button>

                                  <button
                                    onClick={() => setSelectedLesson({ lesson, courseId: course.id })}
                                    className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                  >
                                    <PlayCircle className="w-3.5 h-3.5" /> Notes
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Quizzes Section */}
                        {course.quizzes.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-slate-100">
                            <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                              <Award className="w-4 h-4 text-amber-500" /> Module Diagnostic Checkpoint
                            </span>

                            <div className="grid grid-cols-1 gap-3">
                              {course.quizzes.map((quiz) => (
                                <div
                                  key={quiz.id}
                                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="p-3 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 rounded-2xl shrink-0 shadow-md">
                                      <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-slate-900 text-sm">{quiz.title}</h4>
                                      <p className="text-xs text-slate-600 mt-0.5">
                                        {quiz.questionsCount} Diagnostic MCQs • Evaluates retention
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                                    {quiz.completed ? (
                                      <div className="flex items-center gap-2">
                                        <span className="px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-black border border-emerald-200">
                                          Passed • {quiz.score}% Score
                                        </span>
                                        <button
                                          onClick={() => handleStartQuiz(quiz, course.id, course.subject)}
                                          className="text-xs text-slate-600 hover:text-slate-900 underline font-bold"
                                        >
                                          Retake
                                        </button>
                                      </div>
                                    ) : (
                                      <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.96 }}
                                        onClick={() => handleStartQuiz(quiz, course.id, course.subject)}
                                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                                      >
                                        <Zap className="w-4 h-4 text-amber-400" /> Start Evaluation
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      )}

      {/* TAB 2: MASTERY & ANALYTICS RADAR */}
      {activeTab === "analytics" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 md:col-span-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-black text-slate-900">Subject Mastery Radar</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Live heuristic evaluation per subject area</p>
                </div>
                <span className="px-3.5 py-1.5 bg-indigo-50 text-indigo-700 font-black text-xs rounded-full border border-indigo-200">
                  Target: 90%+ Mastery
                </span>
              </div>

              <div className="space-y-5 pt-2">
                {roadmapInfo.subjects.map((subj, idx) => {
                  const theme = getSubjectTheme(subj);
                  const subjCourses = yearCourses.filter((c) => c.subject === subj);
                  const totalL = subjCourses.reduce((acc, c) => acc + c.lessons.length, 0);
                  const compL = subjCourses.reduce(
                    (acc, c) => acc + c.lessons.filter((l) => l.completed).length,
                    0
                  );
                  const pct = totalL > 0 ? Math.round((compL / totalL) * 100) : 60 + idx * 8;

                  return (
                    <div key={subj} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-800 font-black">{subj}</span>
                        <span className="text-slate-600 font-mono font-bold">{pct}% Mastered</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className={`h-full ${theme.progressBg} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-5 border border-indigo-500/20 relative overflow-hidden">
              <div className="flex items-center gap-2 text-amber-400">
                <Brain className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-black text-white">AI Tutor Insight</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                You are moving 1.8x faster than average Cambridge targets! Focus on strengthening{" "}
                <strong className="text-amber-300">{roadmapInfo.subjects[0]}</strong> past paper checks this week to maintain your streak.
              </p>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Current Study Velocity</span>
                  <span className="text-amber-400 font-mono">4.2 hrs / day</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Active Retention Rate</span>
                  <span className="text-emerald-400 font-mono">94.5%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 3: QUIZZES ARENA LIST */}
      {activeTab === "quizzes" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">Diagnostic Checkpoints & MCQs</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluate your accelerated understanding under Cambridge marking rubrics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {yearCourses.flatMap((c) =>
              c.quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-100/60 transition flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md">
                        {c.subject}
                      </span>
                      {quiz.completed && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-md">
                          Completed • {quiz.score}%
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">{quiz.title}</h4>
                    <p className="text-xs text-slate-500">
                      Module: {c.title} • {quiz.questionsCount} Multiple Choice Questions
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartQuiz(quiz, c.id, c.subject)}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    {quiz.completed ? "Retake Evaluation" : "Take Evaluation"}
                  </motion.button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}

      {/* COURSE COMPLETION CELEBRATION LAYOUT MODAL */}
      <AnimatePresence>
        {completedCourseModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-amber-300/50 max-h-[90vh] overflow-y-auto"
            >
              {/* Vibrant Gold & Emerald Banner Header */}
              <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-emerald-600 p-8 text-slate-950 relative overflow-hidden text-center space-y-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none" />

                <button
                  onClick={() => setCompletedCourseModal(null)}
                  className="absolute top-4 right-4 p-2 text-slate-950/80 hover:text-slate-950 hover:bg-white/20 rounded-full transition cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 bg-slate-950 text-amber-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl border-4 border-amber-300"
                >
                  <GraduationCap className="w-10 h-10 animate-bounce" />
                </motion.div>

                <div>
                  <span className="px-3.5 py-1 bg-slate-950 text-amber-300 font-black text-[10px] uppercase tracking-widest rounded-full shadow-md inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Official Cambridge Achievement
                  </span>
                  <h2 className="text-3xl font-black text-slate-950 mt-2 tracking-tight">
                    Course Completion Mastered!
                  </h2>
                  <p className="text-xs font-bold text-slate-900/90 mt-1 max-w-md mx-auto">
                    You have successfully completed 100% of the lessons & evaluations in{" "}
                    <strong>{completedCourseModal.title}</strong>!
                  </p>
                </div>
              </div>

              {/* Course Stats & Certificate Preview Body */}
              <div className="p-8 space-y-6 bg-white">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-center space-y-1">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 mx-auto" />
                    <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">Lessons</span>
                    <span className="text-lg font-black text-slate-900 font-mono">
                      {completedCourseModal.lessons.length}/{completedCourseModal.lessons.length}
                    </span>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-center space-y-1">
                    <Award className="w-5 h-5 text-emerald-600 mx-auto" />
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">Bonus XP</span>
                    <span className="text-lg font-black text-slate-900 font-mono">+500 XP</span>
                  </div>

                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200/80 text-center space-y-1">
                    <Flame className="w-5 h-5 text-indigo-600 mx-auto" />
                    <span className="text-[10px] font-black text-indigo-800 uppercase tracking-wider block">Mastery Score</span>
                    <span className="text-lg font-black text-slate-900 font-mono">100%</span>
                  </div>
                </div>

                {/* Simulated Certificate Display Badge */}
                <div className="p-6 bg-slate-950 text-white rounded-3xl border-2 border-amber-400/30 space-y-4 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-black uppercase tracking-widest text-slate-200">
                        EBM Accelerated Certificate of Excellence
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-amber-400 font-bold">VERIFIED #EBM-2026-{completedCourseModal.id.slice(0, 4)}</span>
                  </div>

                  <div className="text-center space-y-1 py-2">
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest">This certifies that</p>
                    <h4 className="text-xl font-black text-white tracking-wide">EBM Student Scholar</h4>
                    <p className="text-xs text-slate-300">has mastered all subject standards in <strong>{completedCourseModal.title}</strong></p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-slate-400">
                    <span>Issued by EBM Academic Council</span>
                    <span className="text-amber-400 font-bold">Grade A* Distinction</span>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      alert(`Downloading official Cambridge Certificate for ${completedCourseModal.title}... Verified PDF generated!`);
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-400" /> Download PDF Certificate
                  </button>

                  <button
                    onClick={() => setCompletedCourseModal(null)}
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-2xl transition cursor-pointer"
                  >
                    Close Celebration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LESSON STUDY MODAL */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    Interactive Study Notes
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    {selectedLesson.lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Est. Duration: {selectedLesson.lesson.durationMinutes} minutes
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                  <Brain className="w-4 h-4" /> Core Heuristic Summary
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedLesson.lesson.description}
                </p>
                <div className="p-3.5 bg-slate-800 rounded-xl text-xs text-slate-300 font-mono border border-slate-700">
                  Key Takeaway: Focus on visual chunking, isolating mathematical variables, and verifying root steps before proceeding to practice problems.
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleToggleLessonComplete(selectedLesson.courseId, selectedLesson.lesson.id)}
                  className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    selectedLesson.lesson.completed
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {selectedLesson.lesson.completed ? "Completed (Click to Undo)" : "Mark as Complete (+50 XP)"}
                </button>

                <button
                  onClick={() => setSelectedLesson(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-900"
                >
                  Close Notes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUIZ RUNNER MODAL */}
      <AnimatePresence>
        {selectedQuiz && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {quizScoreResult !== null ? (
                /* Quiz Score Result View */
                <div className="text-center space-y-6 py-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Award className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">Evaluation Completed!</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Your diagnostic score for <strong>{selectedQuiz.quiz.title}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 inline-block px-12 shadow-sm">
                    <span className="text-5xl font-black text-slate-900 font-mono">{quizScoreResult}%</span>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mt-1">
                      {quizScoreResult >= 70 ? "Passed • Mastered Checkpoint" : "Needs Review"}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedQuiz(null)}
                      className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition cursor-pointer"
                    >
                      Return to Course
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Question View */
                <>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                        Diagnostic Evaluation
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">
                        {selectedQuiz.quiz.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedQuiz(null)}
                      className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Question {currentQuestionIndex + 1} of {questionsList.length}</span>
                      <span>{Math.round(((currentQuestionIndex + 1) / questionsList.length) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questionsList.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                    <h4 className="text-base font-black text-slate-900 leading-snug">
                      {questionsList[currentQuestionIndex].question}
                    </h4>

                    <div className="space-y-2.5">
                      {questionsList[currentQuestionIndex].options.map((opt, oIdx) => {
                        const isSelected = selectedAnswer === oIdx;
                        const isCorrect = oIdx === questionsList[currentQuestionIndex].answer;
                        let btnStyle = "bg-white border-slate-200 text-slate-800 hover:border-slate-300";

                        if (selectedAnswer !== null) {
                          if (isCorrect) {
                            btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                          } else if (isSelected) {
                            btnStyle = "bg-rose-50 border-rose-500 text-rose-900 font-bold";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuizOption(oIdx)}
                            className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {selectedAnswer !== null && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
                        <span className="font-bold block uppercase tracking-wider">Explanation:</span>
                        <p>{questionsList[currentQuestionIndex].explanation}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      disabled={selectedAnswer === null}
                      onClick={handleNextQuizQuestion}
                      className={`px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                        selectedAnswer !== null
                          ? "bg-slate-900 text-white hover:bg-slate-800 shadow-md"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      {currentQuestionIndex + 1 < questionsList.length ? "Next Question" : "Complete & View Results"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
