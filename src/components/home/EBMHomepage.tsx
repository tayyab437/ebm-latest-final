import React, { useState, Suspense } from "react";
import { Search, User, ChevronRight, Star, Lock, Award, BookOpen, BarChart3, Target, CheckCircle2, ChevronLeft, ArrowRight, Play, Sparkles, ChevronDown, Calculator, Brain, Users, Heart, Coins, Cpu, MessageSquare, Compass, ShieldCheck, Briefcase } from "lucide-react";
import heroBgImage from "../../assets/images/exact_hero_background_1786353484606.jpg";
import { useBrandingStore } from "../../lib/branding.store";

const GradeOneMathModal = React.lazy(() => import("./GradeOneMathModal"));
const GradeOneEnglishModal = React.lazy(() => import("./GradeOneEnglishModal"));
const GradeTwoMathModal = React.lazy(() => import("./GradeTwoMathModal"));
const GradeTwoEnglishModal = React.lazy(() => import("./GradeTwoEnglishModal"));
const GradeThreeMathModal = React.lazy(() => import("./GradeThreeMathModal"));
const GradeThreeEnglishModal = React.lazy(() => import("./GradeThreeEnglishModal"));
const GradeFourMathModal = React.lazy(() => import("./GradeFourMathModal"));
const GradeFourEnglishModal = React.lazy(() => import("./GradeFourEnglishModal"));

import { SEOHead } from "../SEOHead";
import { SKILL_PLAN_CARDS, GRADES_DATA } from "./EBMHomepageData";

interface EBMHomepageProps {
  onSignIn?: () => void;
  onJoinNow?: () => void;
  onNavigateToTab?: (tabId: string) => void;
  onSelectSkill?: (subject: string, grade: string) => void;
}

export default function EBMHomepage({
  onSignIn,
  onJoinNow,
  onNavigateToTab,
  onSelectSkill,
}: EBMHomepageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [skillCardOffset, setSkillCardOffset] = useState(0);
  const [selectedGradeFilter, setSelectedGradeFilter] = useState<string | null>(null);

  // Dynamic branding settings from backend/store
  const heroBackgroundImage = useBrandingStore((state) => state.heroBackgroundImage);
  const effectiveHeroBackground = (heroBackgroundImage && heroBackgroundImage.trim() !== "") ? heroBackgroundImage : heroBgImage;

  const [visibleCount, setVisibleCount] = useState<number>(() => {
    if (typeof window === "undefined") return 5;
    const isMobileQuery = window.matchMedia("(max-width: 639px)").matches;
    const isTabletQuery = window.matchMedia("(max-width: 1023px)").matches;
    return isMobileQuery ? 2 : isTabletQuery ? 4 : 5;
  });
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 639px)").matches;
  });

  // Welcome Modal state
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeConfig, setWelcomeConfig] = useState<any>(null);

  // Grade 1 Math Interactive Framework Modal state
  const [showGradeOneMathModal, setShowGradeOneMathModal] = useState(false);

  // Grade 1 English Interactive Framework Modal state
  const [showGradeOneEnglishModal, setShowGradeOneEnglishModal] = useState(false);

  // Grade 2 Math Interactive Framework Modal state
  const [showGradeTwoMathModal, setShowGradeTwoMathModal] = useState(false);

  // Grade 2 English Interactive Framework Modal state
  const [showGradeTwoEnglishModal, setShowGradeTwoEnglishModal] = useState(false);

  // Grade 3 Math Interactive Framework Modal state
  const [showGradeThreeMathModal, setShowGradeThreeMathModal] = useState(false);

  // Grade 3 English Interactive Framework Modal state
  const [showGradeThreeEnglishModal, setShowGradeThreeEnglishModal] = useState(false);

  // Grade 4 Math Interactive Framework Modal state
  const [showGradeFourMathModal, setShowGradeFourMathModal] = useState(false);

  // Grade 4 English Interactive Framework Modal state
  const [showGradeFourEnglishModal, setShowGradeFourEnglishModal] = useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mobileMql = window.matchMedia("(max-width: 639px)");
    const tabletMql = window.matchMedia("(max-width: 1023px)");

    const updateLayout = () => {
      const mobile = mobileMql.matches;
      const tablet = tabletMql.matches;
      setIsMobile(mobile);
      setVisibleCount(mobile ? 2 : tablet ? 4 : 5);
    };

    mobileMql.addEventListener("change", updateLayout);
    tabletMql.addEventListener("change", updateLayout);
    return () => {
      mobileMql.removeEventListener("change", updateLayout);
      tabletMql.removeEventListener("change", updateLayout);
    };
  }, []);

  React.useEffect(() => {
    const checkWelcomeModal = async () => {
      if (typeof window !== "undefined") {
        const hasVisitedBefore = localStorage.getItem("ebm_welcome_visited_v1");
        if (hasVisitedBefore) return;
      }

      try {
        const res = await fetch("/api/welcome-modal-settings");
        if (res.ok) {
          const config = await res.json();
          setWelcomeConfig(config);
          
          if (config && config.showWelcomeModal) {
            const hasVisitedBefore = localStorage.getItem("ebm_welcome_visited_v1");
            if (!hasVisitedBefore) {
              setShowWelcome(true);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching welcome modal settings:", err);
      }
    };

    window.addEventListener("ebm_check_welcome", checkWelcomeModal);
    return () => window.removeEventListener("ebm_check_welcome", checkWelcomeModal);
  }, []);

  const handleCloseWelcome = () => {
    localStorage.setItem("ebm_welcome_visited_v1", "true");
    setShowWelcome(false);
  };

  const skillPlanCards = SKILL_PLAN_CARDS;

  const handleNextSkillPlan = () => {
    const maxIdx = skillPlanCards.length - visibleCount;
    setSkillCardOffset((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  const handlePrevSkillPlan = () => {
    const maxIdx = skillPlanCards.length - visibleCount;
    setSkillCardOffset((prev) => (prev <= 0 ? maxIdx : prev - 1));
  };

  const grades = GRADES_DATA;

  const filteredGrades = selectedGradeFilter
    ? grades.filter((g) => g.id === selectedGradeFilter)
    : grades;

  return (
    <div className="bg-[#f2f4f5] text-[#4a4a4a] font-sans antialiased min-h-screen">
      <SEOHead 
        title="EBM Personalized Learning Platform | Grade 1 to O/A Level"
        description="Personalized learning platform for students from Grade 1 to O/A Levels, featuring structured curricula, diagnostic assessments, and AI-powered tutoring."
        canonicalUrl="https://ejazbukharimethod.com/"
      />
      {/* ================= HERO BANNER ================= */}
      <section 
        className="relative z-0 overflow-hidden flex flex-col items-center justify-between pt-8 pb-10 px-4 min-h-[560px] sm:min-h-[540px] md:min-h-[520px]"
      >
        {/* LCP Critical Hero Background Image with High Priority */}
        <img 
          src={effectiveHeroBackground} 
          alt="EBM Personalized Learning Platform Banner"
          width="1200"
          height="600"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
        />

        {/* Semi-transparent soft tint overlay for text legibility */}
        <div className="absolute inset-0 bg-emerald-950/10 backdrop-blur-[1px] pointer-events-none z-1" />

        {/* Content Container */}
        <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
          {/* Main Title: "EBM: A Personalized Learning Platform for Every Student" */}
          <h1 
            id="ebm-hero-title"
            className="text-3xl md:text-[48px] font-serif text-[#005d8f] font-bold tracking-wide text-center mb-3 drop-shadow-[0_4px_12px_rgba(255,255,255,1)]"
            style={{
              textShadow: "0 0 20px #ffffff, 0 0 35px #ffffff, 0 0 10px #ffffff, 0 0 4px #ffffff, 0 2px 10px rgba(0, 32, 64, 0.6)"
            }}
          >
            EBM: A Personalized Learning Platform for Every Student
          </h1>

          {/* Subtitle Paragraph */}
          <p
            id="ebm-hero-subtitle"
            className="text-base sm:text-lg md:text-[19px] text-slate-800 font-medium text-center max-w-3xl mx-auto mb-8 px-4 leading-relaxed"
          >
            EBM combines structured learning, personalized guidance, and AI-enhanced tools to help students build strong academic foundations and progress with confidence.
          </p>

          {/* Three Feature Clouds Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full items-stretch">
            {/* Cloud 1: Comprehensive Grade 1 to O/A Levels curriculum */}
            <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 min-h-[220px] max-w-sm mx-auto w-full filter drop-shadow-md">
              <svg viewBox="0 0 340 210" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                  d="M 60,65 C 50,30 100,20 140,38 C 160,12 215,12 235,38 C 275,20 315,35 310,70 C 335,95 330,140 300,155 C 295,185 250,195 225,182 C 200,200 145,200 120,182 C 90,195 45,185 45,155 C 15,135 20,85 60,65 Z"
                  fill="#ffffff"
                  fillOpacity="0.97"
                  stroke="#0077aa"
                  strokeWidth="3.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative z-10 w-full max-w-[245px] sm:max-w-[260px] mx-auto flex flex-col items-center justify-center h-full py-2 px-1">
                <div>
                  <h2 className="text-[19px] sm:text-[21px] lg:text-[22px] font-serif text-[#006699] font-bold leading-[1.2] tracking-tight mb-2">
                    Learning Support from<br />Grade 1 to O/A Levels
                  </h2>
                  <p className="text-slate-700 text-[11px] sm:text-xs leading-snug font-sans font-medium">
                    Mathematics <span className="text-sky-600 mx-0.5">•</span> English
                  </p>
                </div>
              </div>
            </div>

            {/* Cloud 2: Proven Impact & Educator Trust */}
            <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 min-h-[220px] max-w-sm mx-auto w-full filter drop-shadow-md">
              <svg viewBox="0 0 340 210" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                  d="M 60,65 C 50,30 100,20 140,38 C 160,12 215,12 235,38 C 275,20 315,35 310,70 C 335,95 330,140 300,155 C 295,185 250,195 225,182 C 200,200 145,200 120,182 C 90,195 45,185 45,155 C 15,135 20,85 60,65 Z"
                  fill="#ffffff"
                  fillOpacity="0.97"
                  stroke="#7b1fa2"
                  strokeWidth="3.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative z-10 w-full max-w-[245px] sm:max-w-[260px] mx-auto flex flex-col items-center justify-center h-full py-2 px-1">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] lg:text-[21px] font-serif text-[#6a1b9a] font-bold leading-[1.2] tracking-tight mb-2">
                    Build Skills for Academic<br />and Real-World Success
                  </h2>
                  <p className="text-slate-700 text-[11px] sm:text-xs leading-snug font-sans font-medium">
                    Practical Methods <span className="text-purple-600 mx-0.5">•</span> Educator Support<br />Learner Growth
                  </p>
                </div>
              </div>
            </div>

            {/* Cloud 3: AI Diagnostics & Adaptive Learning */}
            <div className="relative p-5 sm:p-6 lg:p-7 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 min-h-[220px] max-w-sm mx-auto w-full filter drop-shadow-md">
              <svg viewBox="0 0 340 210" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                <path
                  d="M 60,65 C 50,30 100,20 140,38 C 160,12 215,12 235,38 C 275,20 315,35 310,70 C 335,95 330,140 300,155 C 295,185 250,195 225,182 C 200,200 145,200 120,182 C 90,195 45,185 45,155 C 15,135 20,85 60,65 Z"
                  fill="#ffffff"
                  fillOpacity="0.97"
                  stroke="#0077aa"
                  strokeWidth="3.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="relative z-10 w-full max-w-[245px] sm:max-w-[260px] mx-auto flex flex-col items-center justify-center h-full py-2 px-1">
                <div>
                  <h2 className="text-[18px] sm:text-[20px] lg:text-[21px] font-serif text-[#006699] font-bold leading-[1.2] tracking-tight mb-2">
                    AI-Enhanced Personalized Learning
                  </h2>
                  <p className="text-slate-700 text-[11px] sm:text-xs leading-snug font-sans font-medium">
                    Personalized Guidance <span className="text-sky-600 mx-0.5">•</span> Smart Learning Support<br />
                    Learning Insights <span className="text-sky-600 mx-0.5">•</span> AI-Powered Tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Become a member Button */}
          <div className="mt-8 text-center relative z-20">
            <button
              id="ebm-become-member-btn"
              onClick={onJoinNow}
              className="bg-[#0077aa] hover:bg-[#006692] text-white font-bold py-3.5 px-10 rounded-xl shadow-lg text-lg transition-transform transform hover:scale-105 cursor-pointer border border-[#005d85] animate-ebm-pulse"
            >
              Become a member!
            </button>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* BANNERS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-4">
          {/* High School Banner */}
          <div className="bg-[#d8f5d0] border-2 border-[#a8e09e] rounded-l-[60px] rounded-r-[20px] p-4 sm:p-5 flex items-center shadow-xs relative overflow-visible transition-transform hover:-translate-y-0.5">
            {/* Graphic Container */}
            <div className="flex-shrink-0 w-32 h-24 relative mr-3 sm:mr-4 flex items-end justify-center">
              {/* Shooting Stars & Light Rays */}
              <div className="absolute -top-7 left-2 w-24 h-16 pointer-events-none z-0">
                {/* Ray background */}
                <div className="absolute top-2 left-6 w-12 h-10 bg-sky-200/50 rounded-full blur-xs transform -rotate-12"></div>
                {/* Stars */}
                <svg className="w-full h-full" viewBox="0 0 100 60" fill="none">
                  {/* Teal star */}
                  <polygon points="25,25 28,32 35,32 30,36 32,43 25,39 18,43 20,36 15,32 22,32" fill="#0077aa" transform="rotate(-15 25 30) scale(0.7)" />
                  {/* Light blue top star */}
                  <polygon points="50,10 54,19 63,19 56,25 58,34 50,29 42,34 44,25 37,19 46,19" fill="#1976d2" transform="rotate(5 50 20) scale(0.9)" />
                  {/* Orange star */}
                  <polygon points="75,20 78,26 84,26 80,30 81,36 75,32 69,36 70,30 66,26 72,26" fill="#e65100" transform="rotate(15 75 25) scale(0.7)" />
                </svg>
              </div>

              {/* O Level Card (Back Left) */}
              <div className="w-16 h-20 bg-white rounded-lg shadow-md border border-gray-200/80 p-1 transform -rotate-12 absolute left-1 bottom-1 z-10 flex flex-col items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-pink-700 via-rose-700 to-purple-800 flex flex-col items-center justify-center text-white text-[8px] font-extrabold tracking-tighter text-center leading-none p-0.5">
                  <span className="text-[6px] opacity-90">CAMBRIDGE</span>
                  <span className="text-[10px] font-black">O LEVEL</span>
                  <span className="text-[6px] opacity-90">IGCSE</span>
                </div>
              </div>

              {/* A Level Card (Front Right) */}
              <div className="w-16 h-20 bg-white rounded-lg shadow-lg border border-gray-200/80 p-1 transform rotate-8 absolute left-9 bottom-2 z-20 flex flex-col items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-center text-white text-[8px] font-extrabold tracking-tighter text-center leading-none p-0.5">
                  <span className="text-[6px] opacity-90">ADVANCED</span>
                  <span className="text-[11px] font-black tracking-tight">A LEVEL</span>
                  <span className="text-[6px] opacity-90">AS & A2</span>
                </div>
              </div>
            </div>

            {/* Banner Text Content */}
            <div className="flex-1 pr-2">
              <h2 className="text-[23px] sm:text-[26px] font-serif text-[#1b5e20] font-bold leading-tight tracking-tight">
                EBM for O & A Levels
              </h2>
              <p className="text-slate-800 text-xs sm:text-[14px] leading-snug my-1 font-sans">
                EBM provides full Cambridge & Edexcel syllabus mastery for O Level and A Level students.
              </p>
              <button
                onClick={() => onNavigateToTab?.("roadmap")}
                className="text-[#1b5e20] hover:underline text-xs sm:text-[15px] font-bold inline-flex items-center gap-1.5 mt-0.5 cursor-pointer group"
              >
                <span>Explore Roadmap</span>
                <span className="w-5 h-5 rounded-full bg-[#1b5e20] text-white flex items-center justify-center text-[12px] font-bold group-hover:bg-[#145217] transition-colors">
                  ›
                </span>
              </button>
            </div>
          </div>

          {/* Independent Learners Banner */}
          <div className="bg-[#c9f2d8] border-2 border-[#9be0c3] rounded-r-[60px] rounded-l-[20px] p-4 sm:p-5 flex items-center shadow-xs relative overflow-visible transition-transform hover:-translate-y-0.5">
            {/* Graphic Container */}
            <div className="flex-shrink-0 w-32 h-24 relative mr-3 sm:mr-4 flex items-end justify-center">
              {/* Geometric Shapes Top Left */}
              <div className="absolute -top-3 left-1 flex items-center space-x-1 z-0">
                <div className="w-2.5 h-2.5 bg-amber-400 transform rotate-45"></div>
                <div className="w-3 h-3 bg-teal-800 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-xs"></div>
              </div>

              {/* Foundation Prep Card (Front Left) */}
              <div className="w-16 h-20 bg-white rounded-lg shadow-lg border border-gray-200/80 p-1 transform -rotate-8 absolute left-2 bottom-2 z-20 flex flex-col items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-[#0077aa] flex items-center justify-center text-white text-[10px] font-black tracking-tight transform -rotate-6 text-center leading-none">
                  CLASS<br />1–8
                </div>
              </div>

              {/* O/A Card (Back Right) */}
              <div className="w-16 h-20 bg-white rounded-lg shadow-md border border-gray-200/80 p-1 transform rotate-10 absolute left-10 bottom-3 z-10 flex flex-col items-center justify-center">
                <div className="w-13 h-13 rounded-full bg-[#1c4966] flex items-center justify-center text-white text-[10px] font-black tracking-tight transform rotate-3 text-center leading-none">
                  O & A<br />LEVEL
                </div>
              </div>

              {/* Plant & Badge Bottom Right */}
              <div className="absolute -bottom-1 right-0 z-30 flex items-end">
                <div className="w-6 h-8 text-emerald-800 flex items-end">
                  {/* Plant leaves */}
                  <svg viewBox="0 0 24 32" className="w-full h-full fill-current text-emerald-800">
                    <path d="M6 32 C 6 20, 2 12, 0 8 C 8 8, 12 16, 12 32 Z" />
                    <path d="M12 32 C 12 18, 18 10, 24 6 C 22 18, 16 24, 12 32 Z" />
                  </svg>
                </div>
                <div className="bg-amber-400 border border-amber-500 rounded p-0.5 text-[9px] text-gray-900 shadow-xs -ml-2 -mb-1 flex items-center justify-center font-bold">
                  👤🔒
                </div>
              </div>
            </div>

            {/* Banner Text Content */}
            <div className="flex-1 pr-2">
              <h2 className="text-[23px] sm:text-[26px] font-serif text-[#004d40] font-bold leading-tight tracking-tight">
                EBM for independent learners
              </h2>
              <p className="text-slate-800 text-xs sm:text-[14px] leading-snug my-1 font-sans">
                Adaptive pacing for self-study, homeschoolers, and competitive exams.
              </p>
              <button
                onClick={() => onNavigateToTab?.("roadmap")}
                className="text-[#004d40] hover:underline text-xs sm:text-[15px] font-bold inline-flex items-center gap-1.5 mt-0.5 cursor-pointer group"
              >
                <span>Explore Roadmap</span>
                <span className="w-5 h-5 rounded-full bg-[#004d40] text-white flex items-center justify-center text-[12px] font-bold group-hover:bg-[#00382e] transition-colors">
                  ›
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* GRADE LEVEL GRID */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-serif font-bold text-slate-800">
                Explore by Class & Level
              </h2>
              <p className="text-xs text-slate-700 font-sans mt-0.5">First Grade through Eighth Grade, Cambridge O Levels, and A Levels</p>
            </div>
            {selectedGradeFilter && (
              <button
                onClick={() => setSelectedGradeFilter(null)}
                className="text-xs text-[#006699] font-bold hover:underline cursor-pointer"
              >
                Show all classes & levels
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                className={`bg-white border-2 ${grade.borderColor} rounded-xl p-4 sm:p-5 relative pt-8 shadow-xs hover:shadow-md transition-shadow group flex flex-col justify-between`}
              >
                <div>
                  {/* Badge */}
                  <div
                    className={`absolute -top-3.5 -left-3 w-10 h-10 rounded-full ${grade.badgeBg} text-white flex items-center justify-center font-bold text-lg shadow-md`}
                  >
                    {grade.badge}
                  </div>

                  <h3 className={`text-2xl sm:text-3xl font-serif font-bold ${grade.titleColor} mb-2`}>
                    {grade.title}
                  </h3>

                  <p className="text-gray-600 text-xs mb-4 sm:mb-5 min-h-[40px] sm:min-h-[50px] leading-relaxed">
                    {grade.description}
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                  {grade.subjects.map((sub, sIdx) => {
                    const isGradeOneMath = grade.id === "1" && sub.name === "Math";
                    const isGradeOneEnglish = grade.id === "1" && (sub.name.includes("English") || sub.name === "Language arts");
                    const isGradeTwoMath = grade.id === "2" && sub.name === "Math";
                    const isGradeTwoEnglish = grade.id === "2" && (sub.name.includes("English") || sub.name === "Language arts");
                    const isGradeThreeMath = grade.id === "3" && sub.name === "Math";
                    const isGradeThreeEnglish = grade.id === "3" && (sub.name.includes("English") || sub.name === "Language arts");
                    const isGradeFourMath = grade.id === "4" && sub.name === "Math";
                    const isGradeFourEnglish = grade.id === "4" && (sub.name.includes("English") || sub.name === "Language arts");

                    if (isGradeOneMath) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeOneMathModal(true)}
                          className="group/math1 relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/15 border-2 border-emerald-500/80 hover:border-[#2e7d32] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/math1:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2e7d32] to-[#388e3c] text-white flex items-center justify-center shadow-xs group-hover/math1:rotate-6 group-hover/math1:scale-110 transition-transform duration-300 shrink-0">
                              <Calculator className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/math1:text-[#2e7d32] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#2e7d32] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Foundations"}
                                </span>
                              </div>
                              <span className="text-[10px] text-emerald-800/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/math1:bg-[#2e7d32] group-hover/math1:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/math1:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeOneEnglish) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeOneEnglishModal(true)}
                          className="group/eng1 relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/15 border-2 border-emerald-500/80 hover:border-[#2e7d32] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/eng1:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2e7d32] to-[#388e3c] text-white flex items-center justify-center shadow-xs group-hover/eng1:rotate-6 group-hover/eng1:scale-110 transition-transform duration-300 shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/eng1:text-[#2e7d32] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#2e7d32] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Phonics"}
                                </span>
                              </div>
                              <span className="text-[10px] text-emerald-800/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/eng1:bg-[#2e7d32] group-hover/eng1:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/eng1:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeTwoMath) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeTwoMathModal(true)}
                          className="group/math relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/15 border-2 border-orange-400/80 hover:border-[#bf360c] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/math:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d84315] to-[#bf360c] text-white flex items-center justify-center shadow-xs group-hover/math:rotate-6 group-hover/math:scale-110 transition-transform duration-300 shrink-0">
                              <Calculator className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/math:text-[#d84315] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#d84315] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Arithmetic"}
                                </span>
                              </div>
                              <span className="text-[10px] text-orange-900/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/math:bg-[#d84315] group-hover/math:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/math:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeTwoEnglish) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeTwoEnglishModal(true)}
                          className="group/eng2 relative overflow-hidden bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-red-500/15 border-2 border-orange-400/80 hover:border-[#bf360c] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/eng2:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#d84315] to-[#bf360c] text-white flex items-center justify-center shadow-xs group-hover/eng2:rotate-6 group-hover/eng2:scale-110 transition-transform duration-300 shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/eng2:text-[#bf360c] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#d84315] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Vocabulary"}
                                </span>
                              </div>
                              <span className="text-[10px] text-orange-900/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/eng2:bg-[#bf360c] group-hover/eng2:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/eng2:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeThreeMath) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeThreeMathModal(true)}
                          className="group/math3 relative overflow-hidden bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-cyan-500/15 border-2 border-sky-400/80 hover:border-[#0288d1] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/math3:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0288d1] to-[#0097a7] text-white flex items-center justify-center shadow-xs group-hover/math3:rotate-6 group-hover/math3:scale-110 transition-transform duration-300 shrink-0">
                              <Calculator className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/math3:text-[#0288d1] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#0288d1] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Multiplication"}
                                </span>
                              </div>
                              <span className="text-[10px] text-sky-800/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/math3:bg-[#0288d1] group-hover/math3:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/math3:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeThreeEnglish) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeThreeEnglishModal(true)}
                          className="group/eng3 relative overflow-hidden bg-gradient-to-r from-sky-500/10 via-blue-500/10 to-indigo-500/15 border-2 border-sky-400/80 hover:border-[#01579b] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/eng3:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0288d1] to-[#01579b] text-white flex items-center justify-center shadow-xs group-hover/eng3:rotate-6 group-hover/eng3:scale-110 transition-transform duration-300 shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/eng3:text-[#01579b] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#01579b] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Grammar"}
                                </span>
                              </div>
                              <span className="text-[10px] text-sky-900/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/eng3:bg-[#01579b] group-hover/eng3:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/eng3:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeFourMath) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeFourMathModal(true)}
                          className="group/math4 relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-violet-500/15 border-2 border-purple-400/80 hover:border-[#7b1fa2] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/math4:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7b1fa2] to-[#9c27b0] text-white flex items-center justify-center shadow-xs group-hover/math4:rotate-6 group-hover/math4:scale-110 transition-transform duration-300 shrink-0">
                              <Calculator className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/math4:text-[#7b1fa2] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#7b1fa2] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Fractions"}
                                </span>
                              </div>
                              <span className="text-[10px] text-purple-900/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/math4:bg-[#7b1fa2] group-hover/math4:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/math4:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    if (isGradeFourEnglish) {
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setShowGradeFourEnglishModal(true)}
                          className="group/eng4 relative overflow-hidden bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-violet-500/15 border-2 border-purple-400/80 hover:border-[#4a148c] rounded-xl p-2.5 -mx-1 cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] flex items-center justify-between gap-2"
                        >
                          {/* Animated Shimmer Flare on Hover */}
                          <div className="absolute inset-0 -translate-x-full group-hover/eng4:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7b1fa2] to-[#4a148c] text-white flex items-center justify-center shadow-xs group-hover/eng4:rotate-6 group-hover/eng4:scale-110 transition-transform duration-300 shrink-0">
                              <BookOpen className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-slate-900 font-extrabold text-[13px] tracking-tight group-hover/eng4:text-[#4a148c] transition-colors break-words">
                                  {sub.name}
                                </span>
                                <span className="inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#4a148c] text-white shadow-2xs animate-pulse shrink-0">
                                  <Sparkles className="w-2.5 h-2.5" />
                                  {sub.tag || "Comprehension"}
                                </span>
                              </div>
                              <span className="text-[10px] text-purple-900/90 font-medium block truncate">
                                Syed Ejaz Bukhari Method
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 text-right shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 font-bold text-[11px] shadow-xs group-hover/eng4:bg-[#4a148c] group-hover/eng4:text-white transition-all flex items-center gap-1">
                              <span>Open</span>
                              <ArrowRight className="w-3 h-3 group-hover/eng4:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={sIdx}
                        onClick={() => {
                          if (onSelectSkill) onSelectSkill(sub.name, grade.title);
                          else if (onSignIn) onSignIn();
                        }}
                        className="flex justify-between items-center hover:bg-gray-50 p-2.5 -mx-1.5 rounded-lg cursor-pointer transition-colors group/sub gap-2"
                      >
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0 flex-1">
                          <span className="text-gray-800 font-semibold text-[13px] group-hover/sub:text-[#006699] transition-colors break-words">{sub.name}</span>
                          {sub.tag && (
                            <span className={`inline-flex items-center gap-0.5 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${grade.badgeBg} text-white shadow-2xs shrink-0`}>
                              <Sparkles className="w-2.5 h-2.5" />
                              {sub.tag}
                            </span>
                          )}
                        </div>
                        <div className="text-[#006699] flex items-center space-x-1 font-bold text-xs group-hover/sub:translate-x-0.5 transition-transform shrink-0">
                          <span>Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ================= CUSTOM SKILL PLANS CAROUSEL ================= */}
      <section className="bg-[#e4f6f8] pt-10 pb-12 text-center relative overflow-hidden border-t border-b border-[#c8ebf0]">
        {/* Soft Wave Background Header */}
        <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden pointer-events-none opacity-60">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 C200,80 400,-20 600,60 C800,140 1000,20 1200,50 L1200,0 L0,0 Z" fill="#f2f4f5" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#006699] font-bold mb-3 tracking-wide">
            Build the Academic and Life Skills You Need to Succeed
          </h2>
          <p className="text-slate-700 mb-10 max-w-3xl mx-auto text-sm sm:text-base font-sans font-medium">
            We've custom-built EBM skills to perfectly match each concept within your textbooks, state standards, and assessments.
          </p>

          {/* Cards Carousel Grid */}
          <div className="relative max-w-5xl mx-auto flex items-center justify-center mb-10 px-6 sm:px-12">
            {/* Left Chevron Arrow */}
            <button
              onClick={handlePrevSkillPlan}
              className="absolute left-0 top-1/2 -translate-y-1/2 text-[#006699] hover:text-[#004e75] text-4xl sm:text-5xl font-bold transition-transform hover:scale-125 cursor-pointer z-20 p-2 select-none"
              aria-label="Previous skill plans"
            >
              ‹
            </button>

            {/* Viewport for math-perfect card layout with absolutely NO slide bar and NO half-visible cards */}
            <div className="w-[236px] sm:w-[560px] lg:w-[704px] overflow-hidden py-2">
              <div 
                className="flex items-center gap-3 sm:gap-4 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${skillCardOffset * (isMobile ? 124 : 144)}px)` }}
              >
                {skillPlanCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={onSignIn}
                    className="w-28 sm:w-32 flex-shrink-0 bg-white rounded-2xl p-2.5 shadow-sm border border-gray-200 flex flex-col items-center justify-between text-center cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-1.5 hover:shadow-lg active:scale-[0.98] h-[160px] sm:h-[170px] group"
                  >
                    {card.icon}
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-tight mt-2 line-clamp-2">
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Chevron Arrow */}
            <button
              onClick={handleNextSkillPlan}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#006699] hover:text-[#004e75] text-4xl sm:text-5xl font-bold transition-transform hover:scale-125 cursor-pointer z-20 p-2 select-none"
              aria-label="Next skill plans"
            >
              ›
            </button>
          </div>

          {/* Build your skills Button */}
          <button
            onClick={onJoinNow}
            className="bg-[#0077aa] hover:bg-[#006692] text-white font-bold py-2.5 px-8 rounded-lg shadow-md text-base transition-transform hover:scale-105 cursor-pointer border border-[#005d85]"
          >
            Build your skills
          </button>
        </div>
      </section>

      {/* ================= DISCOVER EBM SECTION ================= */}
      <section 
        className="relative py-16 text-center text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 102, 153, 0.90), rgba(0, 80, 128, 0.90)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200')",
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            A Better Way to Help Every Learner Grow and Succeed
          </h2>
          <p className="text-base md:text-lg mb-12 opacity-95 max-w-4xl mx-auto">
            EBM brings together practical learning strategies, modern teaching methods, and personalized guidance to help educators and learners achieve better outcomes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {/* Card 1: Modern Learning Methods */}
            <div className="bg-white text-slate-800 rounded-xl p-6 flex flex-col items-center shadow-md border border-sky-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full border-2 border-[#0077aa] flex items-center justify-center mb-4 bg-sky-50 shadow-xs">
                <BookOpen className="w-8 h-8 text-[#006699]" />
              </div>
              <h3 className="text-[#006699] text-xl font-serif font-bold text-center mb-3 min-h-[50px] flex items-center justify-center leading-tight">
                Modern Learning Methods
              </h3>
              <p className="text-xs text-slate-700 text-center leading-relaxed">
                Interactive pedagogy, evidence-based instructional frameworks, and engaging digital resources designed to inspire deep conceptual understanding.
              </p>
            </div>

            {/* Card 2: Personalized Learning */}
            <div className="bg-white text-slate-800 rounded-xl p-6 flex flex-col items-center shadow-md border border-emerald-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full border-2 border-[#2e7d32] flex items-center justify-center mb-4 bg-emerald-50 shadow-xs">
                <Target className="w-8 h-8 text-[#1b5e20]" />
              </div>
              <h3 className="text-[#1b5e20] text-xl font-serif font-bold text-center mb-3 min-h-[50px] flex items-center justify-center leading-tight">
                Personalized Learning
              </h3>
              <p className="text-xs text-slate-700 text-center leading-relaxed">
                Adaptive skill paths and targeted recommendations tailored to each learner's unique pace, strengths, and personal growth goals.
              </p>
            </div>

            {/* Card 3: Teacher & Educator Development */}
            <div className="bg-white text-slate-800 rounded-xl p-6 flex flex-col items-center shadow-md border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full border-2 border-[#6a1b9a] flex items-center justify-center mb-4 bg-purple-50 shadow-xs">
                <Award className="w-8 h-8 text-[#6a1b9a]" />
              </div>
              <h3 className="text-[#6a1b9a] text-xl font-serif font-bold text-center mb-3 min-h-[50px] flex items-center justify-center leading-tight">
                Teacher & Educator Development
              </h3>
              <p className="text-xs text-slate-700 text-center leading-relaxed">
                Comprehensive tools, professional development resources, and actionable analytics to empower teachers in every classroom.
              </p>
            </div>

            {/* Card 4: AI-Powered Education */}
            <div className="bg-white text-slate-800 rounded-xl p-6 flex flex-col items-center shadow-md border border-amber-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full border-2 border-[#c2410c] flex items-center justify-center mb-4 bg-amber-50 shadow-xs">
                <Cpu className="w-8 h-8 text-[#b43403]" />
              </div>
              <h3 className="text-[#b43403] text-xl font-serif font-bold text-center mb-3 min-h-[50px] flex items-center justify-center leading-tight">
                AI-Powered Education
              </h3>
              <p className="text-xs text-slate-700 text-center leading-relaxed">
                Cutting-edge intelligence engines that deliver instant feedback, automated grading insights, and smart tutoring assistants.
              </p>
            </div>
          </div>

          <button
            onClick={onJoinNow}
            className="bg-[#0077aa] hover:bg-[#006692] text-white font-bold py-2.5 px-8 rounded-full shadow-md text-base transition-colors cursor-pointer border border-[#005d85]"
          >
            Join now
          </button>
        </div>
      </section>

      {/* ================= IMPACT SECTION ================= */}
      <section 
        className="relative py-16 sm:py-20 text-center text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0, 163, 224, 0.85), rgba(0, 163, 224, 0.85)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1200')",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-14 tracking-tight drop-shadow-xs" style={{ fontFamily: 'Georgia, serif' }}>
            See How EBM Supports Student Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Impact 1: Proven effective */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[4px] border-[#33c3f0] mb-5 bg-white/10 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=50&fm=webp&w=150&h=150" 
                  alt="Proven effective student learning outcomes at EBM" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight font-serif text-white">Proven effective</h3>
              <p className="text-[13px] sm:text-sm mb-7 px-4 opacity-95 font-medium leading-relaxed max-w-[280px]">
                Research has shown over and over that EBM produces real results.
              </p>
              <button
                onClick={() => onNavigateToTab?.("about")}
                className="w-full max-w-[190px] border-2 border-white hover:bg-white hover:text-[#00a3e0] text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md bg-transparent cursor-pointer"
              >
                See the research
              </button>
            </div>

            {/* Impact 2: Flexible for any classroom */}
            <div className="flex flex-col items-center relative">
              <div className="relative mb-5">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[4px] border-[#33c3f0] bg-white/10 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=50&fm=webp&w=150&h=150" 
                    alt="Flexible personalized learning tools for any classroom teacher" 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md whitespace-nowrap border border-amber-300">
                  Example
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight font-serif text-white">Flexible for any classroom</h3>
              <p className="text-[13px] sm:text-sm mb-7 px-4 opacity-95 font-medium leading-relaxed max-w-[280px]">
                Read our case studies to see how EBM drives success in classrooms nationwide.
              </p>
              <button
                onClick={() => onNavigateToTab?.("casestudies")}
                className="w-full max-w-[190px] border-2 border-white hover:bg-white hover:text-[#00a3e0] text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md bg-transparent cursor-pointer"
              >
                Hear their stories
              </button>
            </div>

            {/* Impact 3: Trusted by top teachers */}
            <div className="flex flex-col items-center">
              {/* 2x2 collage of diverse teachers */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-[4px] border-[#33c3f0] mb-5 bg-white/10 grid grid-cols-2 gap-0 shadow-lg transform hover:scale-105 transition-all duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=50&fm=webp&w=80&h=80" 
                  alt="EBM certified STEM educator reviewing student progress" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover border-b border-r border-[#33c3f0]/30"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=50&fm=webp&w=80&h=80" 
                  alt="EBM primary education lead guiding young learners" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover border-b border-[#33c3f0]/30"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=50&fm=webp&w=80&h=80" 
                  alt="EBM senior secondary mentor specializing in O and A Levels" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover border-r border-[#33c3f0]/30"
                  referrerPolicy="no-referrer"
                />
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=50&fm=webp&w=80&h=80" 
                  alt="EBM science curriculum specialist coaching students" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight font-serif text-white">Trusted by top teachers</h3>
              <p className="text-[13px] sm:text-sm mb-7 px-4 opacity-95 font-medium leading-relaxed max-w-[280px]">
                The Elite 100 share why they turn to EBM to help their students grow.
              </p>
              <button
                onClick={() => onNavigateToTab?.("inspiration")}
                className="w-full max-w-[190px] border-2 border-white hover:bg-white hover:text-[#00a3e0] text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all shadow-md bg-transparent cursor-pointer"
              >
                Get inspired
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-16 bg-slate-900 relative text-center px-4 overflow-hidden">
        {/* Deep Background Grid Collage - 9 columns wide */}
        <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-1.5 opacity-60 pointer-events-none z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="High school students collaborating on personalized learning coursework" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Elementary school student engaged in foundational learning and reading activities" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Secondary school students participating in interactive classroom learning" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Students studying curriculum materials in academic learning library" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Diverse student study group celebrating academic success and progress" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Online education student accessing digital learning modules and quizzes" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Modern interactive classroom prepared for personalized instruction" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Teacher mentoring high school student with personalized academic guidance" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Collaborative peer learning group discussing mathematics coursework" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Students using educational technology for interactive STEM studies" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Students and educators reviewing diagnostic test performance results" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-15090625222463755977927d7?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Experienced teacher providing one-on-one instruction at whiteboard" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Curriculum textbooks and learning reference materials for exam preparation" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Educational consultant analyzing student learning pathways and analytics" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Student taking structured revision notes for O and A level examination prep" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Dedicated tutor supporting student mastery in foundational subjects" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Learners actively engaged in structured classroom discussions" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
          <img 
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=45&fm=webp&w=150&h=100" 
            alt="Instructor presenting comprehensive lecture in academic learning session" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer" 
          />
        </div>
        
        {/* Neutral low-opacity dark overlay to protect white text block contrast and let grid stand out natively */}
        <div className="absolute inset-0 bg-black/35 z-10" />

        <div className="max-w-4xl mx-auto bg-white/95 p-8 md:p-12 rounded-xl shadow-xl border border-white/10 relative z-20 backdrop-blur-xs">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#00a3e0] mb-6">
            What Students, Parents, and Educators Say About EBM
          </h2>
          <p className="text-base md:text-lg italic text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Considering the amount of content we have to cover in a year, we have very little time to get in adequate practice before moving on. EBM has solved that problem. It has also allowed us <strong className="font-bold text-gray-900">a VERY easy way to go back and review skills throughout the year</strong> we have already covered.
          </p>
          <p className="text-slate-700 text-xs md:text-sm font-semibold mb-6">
            Sandye Kabalen, 6th grade teacher<br />
            Richmond, Kentucky
          </p>
          <button
            onClick={() => onNavigateToTab?.("about")}
            className="text-[#006699] hover:underline text-xs md:text-sm font-bold cursor-pointer"
          >
            Read more ›
          </button>
        </div>
      </section>



      {/* Welcome Modal for First-time Visitors */}
      {showWelcome && welcomeConfig && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-300">
          {/* Thick outer gray frame mimicking the physical-card aesthetic from the screenshot */}
          <div className="relative bg-white rounded-[24px] max-w-lg w-full border-[10px] sm:border-[12px] border-slate-700/60 shadow-2xl transition-all transform scale-100 animate-in zoom-in-95 duration-200">
            
            {/* Custom Side Illustrations floating off the edges (visible on screens larger than mobile) */}
            {/* Left Side: Trophy + Certificate + Pencil */}
            <div className="hidden sm:block absolute -left-20 top-12 w-44 h-44 pointer-events-none select-none z-30">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                {/* Pencil */}
                <g transform="rotate(-35, 30, 130)">
                  <rect x="25" y="60" width="12" height="60" fill="#facc15" rx="1" />
                  <polygon points="25,120 31,132 37,120" fill="#ffedd5" />
                  <polygon points="28,126 31,132 34,126" fill="#1e293b" />
                  <rect x="25" y="52" width="12" height="8" fill="#fda4af" rx="1" />
                  <rect x="25" y="50" width="12" height="2" fill="#94a3b8" />
                </g>

                {/* Certificate */}
                <g transform="rotate(-15, 60, 80)">
                  <rect x="20" y="30" width="70" height="90" rx="6" fill="#ffffff" stroke="#c084fc" strokeWidth="4" />
                  <line x1="32" y1="48" x2="78" y2="48" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  <line x1="32" y1="60" x2="68" y2="60" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  <line x1="32" y1="72" x2="78" y2="72" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  <line x1="32" y1="84" x2="58" y2="84" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="70" cy="100" r="10" fill="#facc15" />
                  <polygon points="66,108 70,118 74,108" fill="#fb923c" />
                  <polygon points="63,105 70,100 77,105" fill="#facc15" />
                </g>

                {/* Gold Trophy */}
                <g transform="rotate(-10, 80, 80) translate(25, 20)">
                  <path d="M15,10 L55,10 L50,45 C48,55 38,60 35,60 L35,70 L45,70 L45,75 L25,75 L25,70 L35,70 L35,60 C32,60 22,55 20,45 Z" fill="url(#goldGrad)" />
                  <path d="M15,18 C5,18 5,35 17,35" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                  <path d="M55,18 C65,18 65,35 53,35" fill="none" stroke="#fbbf24" strokeWidth="4" strokeLinecap="round" />
                  <polygon points="35,22 38,29 45,29 40,34 42,41 35,37 28,41 30,34 25,29 32,29" fill="#ffffff" />
                  <defs>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </div>

            {/* Right Side: Beaker + Leaves + Book */}
            <div className="hidden sm:block absolute -right-20 top-16 w-44 h-44 pointer-events-none select-none z-30">
              <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-md">
                {/* Leaves Background */}
                <g opacity="0.95">
                  <path d="M80,80 C60,60 50,30 70,20 C90,10 110,40 100,60 Z" fill="#4ade80" />
                  <path d="M110,85 C95,70 90,45 105,35 C120,25 135,50 125,70 Z" fill="#22c55e" />
                  <path d="M120,110 C105,95 110,75 125,70 C140,65 145,90 135,105 Z" fill="#86efac" />
                </g>

                {/* Blue Book Binder */}
                <g transform="rotate(15, 110, 90)">
                  <rect x="75" y="40" width="55" height="75" rx="5" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                  <rect x="80" y="43" width="47" height="69" rx="2" fill="#ffffff" />
                  <path d="M110,40 L118,40 L118,65 L114,58 L110,65 Z" fill="#facc15" />
                  <polygon points="102,75 104,80 110,80 105,84 107,90 102,86 97,90 99,84 94,80 100,80" fill="#3b82f6" />
                </g>

                {/* Chemical Beaker / Flask */}
                <g transform="rotate(-5, 60, 95) translate(15, 15)">
                  <path d="M30,20 L30,40 L12,85 C9,92 14,100 22,100 L58,100 C66,100 71,92 68,85 L50,40 L50,20 Z" fill="#ffffff" fillOpacity="0.85" stroke="#94a3b8" strokeWidth="4" strokeLinejoin="round" />
                  <ellipse cx="40" cy="20" rx="10" ry="3" fill="#ffffff" stroke="#94a3b8" strokeWidth="4" />
                  <path d="M18,80 C16,84 19,96 26,96 L54,96 C61,96 64,84 62,80 L56,70 C40,70 40,75 18,80 Z" fill="url(#fluidGrad)" />
                  <circle cx="35" cy="55" r="4" fill="#fb7185" opacity="0.8" />
                  <circle cx="48" cy="45" r="3" fill="#f43f5e" opacity="0.6" />
                  <circle cx="38" cy="35" r="2.5" fill="#fda4af" opacity="0.9" />
                  <defs>
                    <linearGradient id="fluidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#be123c" />
                    </linearGradient>
                  </defs>
                </g>
              </svg>
            </div>

            {/* Modal Header */}
            <div 
              className="relative p-8 pb-12 text-center text-white rounded-t-xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${welcomeConfig.headerBgGradientStart || '#0077aa'}, ${welcomeConfig.headerBgGradientEnd || '#005d8f'})`
              }}
            >
              <button 
                onClick={handleCloseWelcome}
                className="absolute top-4 right-4 text-white/90 hover:text-white text-xl font-bold transition-all w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center cursor-pointer z-40"
              >
                ✕
              </button>
              <h3 className="text-3xl font-black tracking-tight drop-shadow-sm select-none" style={{ fontFamily: 'system-ui, sans-serif' }}>
                {welcomeConfig.title || "First time here?"}
              </h3>
              
              {/* Double wavy curved bottom separator just like the screenshot */}
              <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden pointer-events-none z-10">
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-full w-full">
                  <path d="M-5.07,70.55 C164.78,141.60 315.46,14.30 503.39,83.39 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff" />
                  <path d="M-3.38,40.95 C149.54,122.86 339.16,34.04 502.82,106.08 L500.00,150.00 L0.00,150.00 Z" fill="#ffffff" opacity="0.35" />
                </svg>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 text-center space-y-6 bg-white rounded-b-xl relative z-20">
              
              {/* Colorful stylized main copy matching the screenshot colors */}
              <p className="text-base sm:text-lg text-slate-700 font-bold leading-relaxed px-1">
                <span className="text-[#b91c1c] font-black">{welcomeConfig.highlightText || "1 in 4 students"}</span>{' '}
                <span className="font-semibold text-slate-700">{welcomeConfig.middleText || "uses EBM Digital Learning for academic"}</span>{' '}
                <span className="text-[#b91c1c] font-black">{welcomeConfig.boldText || "help and enrichment."}</span>
              </p>

              {/* Horizontal rule with centered grade details */}
              <div className="flex items-center justify-center gap-4 py-1">
                <span className="h-[1px] bg-slate-300 w-16 sm:w-24" />
                <span className="text-xs font-bold text-slate-700 select-none">
                  {welcomeConfig.gradeRangeText || "Pre-K through 12th grade"}
                </span>
                <span className="h-[1px] bg-slate-300 w-16 sm:w-24" />
              </div>

              {/* Horizontal Button Layout Side-by-Side as in the screenshot */}
              <div className="flex items-center justify-center gap-4 px-2 pt-2">
                <button 
                  onClick={() => {
                    handleCloseWelcome();
                    if (onJoinNow) {
                      onJoinNow();
                    } else if (onNavigateToTab) {
                      onNavigateToTab("auth-register");
                    } else {
                      window.location.hash = "#/register";
                    }
                  }}
                  className="flex-1 py-3 text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition shadow-lg hover:brightness-105 active:scale-95 cursor-pointer text-center"
                  style={{ backgroundColor: welcomeConfig.headerBgGradientStart || '#0077aa' }}
                >
                  {welcomeConfig.ctaText || "Sign up now"}
                </button>
                
                <button 
                  onClick={handleCloseWelcome}
                  className="flex-1 py-3 border-2 text-[#005d8f] font-black uppercase tracking-wider rounded-xl transition cursor-pointer text-center text-xs sm:text-sm hover:bg-slate-50"
                  style={{ 
                    borderColor: welcomeConfig.headerBgGradientStart || '#0077aa',
                    color: welcomeConfig.headerBgGradientStart || '#005d8f'
                  }}
                >
                  {welcomeConfig.exploreText || "Keep exploring"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        {showGradeOneMathModal && (
          <GradeOneMathModal
            isOpen={showGradeOneMathModal}
            onClose={() => setShowGradeOneMathModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("Math", "Class 1 (Grade 1)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeOneEnglishModal && (
          <GradeOneEnglishModal
            isOpen={showGradeOneEnglishModal}
            onClose={() => setShowGradeOneEnglishModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("English", "Class 1 (Grade 1)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeTwoMathModal && (
          <GradeTwoMathModal
            isOpen={showGradeTwoMathModal}
            onClose={() => setShowGradeTwoMathModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("Math", "Class 2 (Grade 2)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeTwoEnglishModal && (
          <GradeTwoEnglishModal
            isOpen={showGradeTwoEnglishModal}
            onClose={() => setShowGradeTwoEnglishModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("English", "Class 2 (Grade 2)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeThreeMathModal && (
          <GradeThreeMathModal
            isOpen={showGradeThreeMathModal}
            onClose={() => setShowGradeThreeMathModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("Math", "Class 3 (Grade 3)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeThreeEnglishModal && (
          <GradeThreeEnglishModal
            isOpen={showGradeThreeEnglishModal}
            onClose={() => setShowGradeThreeEnglishModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("English", "Class 3 (Grade 3)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeFourMathModal && (
          <GradeFourMathModal
            isOpen={showGradeFourMathModal}
            onClose={() => setShowGradeFourMathModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("Math", "Class 4 (Grade 4)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
        {showGradeFourEnglishModal && (
          <GradeFourEnglishModal
            isOpen={showGradeFourEnglishModal}
            onClose={() => setShowGradeFourEnglishModal(false)}
            onEnrollOrStart={() => {
              if (onSelectSkill) {
                onSelectSkill("English", "Class 4 (Grade 4)");
              } else if (onSignIn) {
                onSignIn();
              }
            }}
          />
        )}
      </Suspense>
    </div>
  );
}
