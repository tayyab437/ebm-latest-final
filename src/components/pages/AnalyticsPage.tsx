import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../SEOHead";
const analyticsHeroBg = "/analytics-hero-bg-opt.webp";
import { EbmAtmosphericCanvas, EbmEvidenceParticles } from "../analytics/design-system";
import { EbmAnalyticsEngine } from "../analytics/EbmAnalyticsEngine";
import { EbmMasteryExperience } from "../analytics/EbmMasteryExperience";
import { EbmLearningGroups, LearnerNode } from "../analytics/EbmLearningGroups";
import { EbmQuestionAnalysis } from "../analytics/EbmQuestionAnalysis";
import { 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Users, 
  BookOpen, 
  BarChart3, 
  Target, 
  GraduationCap, 
  X, 
  Check, 
  ChevronLeft, 
  Activity, 
  MessageSquare,
  Sparkle,
  TrendingUp,
  AlertTriangle,
  Clock,
  Quote,
  ArrowDown,
  ArrowRight,
  Zap,
  HelpCircle,
  Brain,
  Layers,
  ShieldCheck,
  RefreshCw,
  Award,
  ArrowUpRight,
  UserCheck,
  User,
  Compass,
  FileText,
  Circle,
  Eye,
  Search,
  ChevronUp,
  RotateCcw,
  HeartHandshake,
  CheckCheck
} from "lucide-react";

export function AnalyticsPage() {
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState<"class" | "group" | "student">("class");
  const [selectedStudent, setSelectedStudent] = useState<string | null>("Molly");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);
  const [activeMasteryStage, setActiveMasteryStage] = useState<number>(4); // 0: Introduced, 1: Practising, 2: Correcting, 3: Secure, 4: Mastered
  
  // Pass 4 Diagnostic Interactive State
  const [selectedInterventionLearner, setSelectedInterventionLearner] = useState<LearnerNode | null>(null);

  // Step 6 interactive states
  const [isEvidenceExpanded, setIsEvidenceExpanded] = useState(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState(false);
  const [isReattemptSimulated, setIsReattemptSimulated] = useState(false);

  // Step 16 interactive states
  const [activeLoopStage, setActiveLoopStage] = useState<number>(0);

  const [centerIndex, setCenterIndex] = useState(1);
  const [selectedTestimonialForModal, setSelectedTestimonialForModal] = useState<any | null>(null);

  const handleScrollToReports = () => {
    const el = document.getElementById("analytics-reports");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSeeHowItWorks = () => {
    const el = document.getElementById("analytics-features");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      const reportsEl = document.getElementById("analytics-reports");
      if (reportsEl) {
        reportsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const testimonials = [
    {
      name: "Ian Keough",
      role: "5th grade teacher",
      school: "Tara Hills Elementary School",
      location: "San Pablo, CA",
      quote: (
        <>
          <strong>EBM has transformed my teaching.</strong> It's a different way of looking at data. It gives me concrete information so I know exactly what each student needs and how I should adjust my instruction. It's like night and day, teaching with and without EBM.
        </>
      ),
      fullText: "EBM has transformed my teaching. It's a different way of looking at data. It gives me concrete information so I know exactly what each student needs and how I should adjust my instruction. It's like night and day, teaching with and without EBM. My students look forward to their smart recommendations and tracking their scores. The diagnostic feedback helps me form small intervention groups instantly without manual spreadsheet grading.",
      avatarBg: "bg-[#0096db]"
    },
    {
      name: "Steve Seo",
      role: "5th grade math teacher",
      school: "Alpha: Blanca Alvarado Middle School",
      location: "San Jose, CA",
      quote: (
        <>
          I love how the reports are synchronized with the standards and with my curriculum, not just in broad topics but down to the subtopic level. <strong>It makes it really easy to pinpoint exactly which part they are struggling with</strong>, so I don't have to do so much detective work.
        </>
      ),
      fullText: "I love how the reports are synchronized with the standards and with my curriculum, not just in broad topics but down to the subtopic level. It makes it really easy to pinpoint exactly which part they are struggling with, so I don't have to do so much detective work. I can see the exact misconception a student is having—like forgetting to regroup or making simple decimal errors. EBM gives me the power to address these hurdles during classroom hours.",
      avatarBg: "bg-[#0096db]"
    },
    {
      name: "Beth Mariola",
      role: "Supervisor of innovative programs",
      school: "Twinsburg City School District",
      location: "Twinsburg, OH",
      quote: (
        <>
          <strong>EBM Analytics data is second to none.</strong> We are able to use this data for intervention and coaching with our students. We LOVE to empower our students to track their own EBM progress and learning via EBM templates!
        </>
      ),
      fullText: "EBM Analytics data is second to none. We are able to use this data for intervention and coaching with our students. We LOVE to empower our students to track their own EBM progress and learning via EBM templates! It has created a student-driven environment where pupils have complete ownership of their benchmarks. Our teachers love that they can share beautiful visual reports instantly during parent-teacher conferences.",
      avatarBg: "bg-[#0096db]"
    },
    {
      name: "Sarah Henderson",
      role: "5th Grade Teacher",
      school: "Dallas Public Schools",
      location: "Dallas, TX",
      quote: (
        <>
          <strong>The Real-Time Analytics dashboard completely changed how I plan my lessons.</strong> Now I spend less time analyzing scores and more time giving targeted support to students who need help.
        </>
      ),
      fullText: "The Real-Time Analytics dashboard completely changed how I plan my lessons. Now I spend less time analyzing scores and more time giving targeted support to students who need help. The automated grouping feature suggests groups of 3-4 students struggling with the exact same math concept, making differentiation an absolute breeze.",
      avatarBg: "bg-[#0096db]"
    },
    {
      name: "David Vance",
      role: "Math Coordinator",
      school: "Sunnyside School District",
      location: "Sunnyside, WA",
      quote: (
        <>
          <strong>EBM provides immediate, actionable data that empowers teachers.</strong> It allows us to group students dynamically and assign precision practices that close learning gaps rapidly.
        </>
      ),
      fullText: "EBM provides immediate, actionable data that empowers teachers. It allows us to group students dynamically and assign precision practices that close learning gaps rapidly. In our district, we have seen double-digit increases in standard proficiency within just one semester of adopting the EBM Analytics suite.",
      avatarBg: "bg-[#0096db]"
    }
  ];

  // Video Demo walkthrough items
  const walkthroughSteps = [
    {
      title: "Real-Time Tracking",
      description: "Watch live stats update as students answer questions, highlighting current focus areas dynamically.",
      preview: (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Active Class Session</span>
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Molly B.</p>
                <p className="text-slate-400">Practicing: Equivalence on Number Lines</p>
              </div>
              <div className="text-emerald-400 font-bold">SmartScore: 84</div>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
              <div>
                <p className="font-bold text-white">Cooper K.</p>
                <p className="text-slate-400">Practicing: Linear Equations</p>
              </div>
              <div className="text-amber-400 font-bold">SmartScore: 71</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Smart Grouping",
      description: "EBM automatically groups students based on similar hurdles, letting you offer target reteaching efficiently.",
      preview: (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Formed Intervention Groups</p>
          <div className="bg-amber-950/40 border border-amber-900/50 p-4 rounded-xl">
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold">Trouble Spot Group (3 students)</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-2">Struggling with: Multi-digit subtraction regrouping</p>
            <div className="flex space-x-1">
              {["Alex M.", "Gonia O.", "Ben D."].map((name) => (
                <span key={name} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-medium border border-slate-700">{name}</span>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  const leftIndex = (centerIndex - 1 + testimonials.length) % testimonials.length;
  const middleIndex = centerIndex;
  const rightIndex = (centerIndex + 1) % testimonials.length;

  return (
    <EbmAtmosphericCanvas className="min-h-screen">
      <div className="text-slate-800 font-sans antialiased">
        <SEOHead 
          title="EBM Learning Analytics: Turn Student Data Into Action"
          description="Actionable analytics that uncover student learning curves, mastery tracking, and skill progression with EBM's reporting dashboard."
          canonicalUrl="https://ejazbukharimethod.com/analytics"
        />
        
        {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-18 sm:pb-24 lg:pt-20 lg:pb-28 px-4 sm:px-6 lg:px-8 border-b border-sky-100/80 shadow-xs">
        {/* Background Image with Controlled Diffusion */}
        <img
          src={analyticsHeroBg}
          alt="Analytics & Performance Dashboard Background"
          width="1200"
          height="600"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 opacity-35"
        />

        {/* Multi-Layer Glass Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/99 via-white/98 to-slate-50/95" />

        {/* Subtle Continuous Evidence Particles */}
        <EbmEvidenceParticles count={12} className="opacity-60" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Content (~42% desktop) */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#0076a5] shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>EBM ANALYTICS</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-3.5xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight leading-[1.02] text-slate-900"
              >
                From Marks to <span className="text-[#00a3e0]">Meaning</span>.<br />
                From Data to <span className="text-[#00a3e0]">Action</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-xl"
              >
                EBM Analytics makes the learning process visible—helping teachers, learners and parents understand what was attempted, what was understood, where learning broke down, whether correction took place, what has been mastered, and what should happen next.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5"
              >
                <button
                  onClick={handleScrollToReports}
                  className="ebm-btn-primary font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-2xl cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Explore EBM Analytics</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSeeHowItWorks}
                  className="bg-white/90 hover:bg-white text-slate-800 border border-slate-200/90 hover:border-slate-300 font-extrabold text-xs uppercase tracking-wider py-4 px-7 rounded-2xl shadow-xs hover:shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span>See How It Works</span>
                </button>
              </motion.div>

              {/* Micro line / Evidence Rhythm Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="text-[11px] font-bold text-slate-400 tracking-wide pt-1 flex flex-wrap items-center gap-x-3 gap-y-1"
              >
                <span className="text-slate-600">Clarity</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Structure</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Practice</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Reflection</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600">Confidence</span>
              </motion.div>
            </div>

            {/* Right Column: EBM Analytics Engine (~58% desktop) */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex justify-center lg:justify-end"
              >
                <EbmAnalyticsEngine />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION: GO BEYOND SCORES & MASTERY EXPERIENCE ================= */}
      <section id="analytics-process-diagnostic" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#f7fafd] to-white border-b border-slate-200/80 relative overflow-hidden">
        <EbmMasteryExperience />
      </section>

      {/* ================= MAIN INTERACTIVE REPORT INTERFACE ================= */}
      <main id="analytics-reports" className="max-w-6xl mx-auto px-4 mt-12 relative z-20 pb-20">
        
        {/* Main Content Box containing Features */}
        <div className="bg-[#f7f8fc] rounded-[40px] p-6 sm:p-12 shadow-xl border border-slate-100 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              EBM's reports show you precisely what your class knows and is ready to learn next.<br className="hidden sm:inline" />
              Save time planning and make confident instructional decisions that accelerate growth.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* EBM DIAGNOSTIC JOURNEY BREADCRUMB INDICATOR                                */}
          {/* ========================================================================= */}
          <div className="mb-14 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#0076a5]" />
                <span>Connected Diagnostic Journey:</span>
              </span>

              <div className="flex flex-wrap items-center gap-1.5 font-bold">
                <a href="#ebm-learning-groups-root" className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#764dbd] hover:bg-purple-100 transition-colors">
                  01 Class Need Map
                </a>
                <span className="text-slate-300">→</span>
                <a href="#analytics-question-analysis" className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors">
                  02 Question Evidence &amp; Correction
                </a>
                <span className="text-slate-300">→</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800">
                  03 Demonstrated Mastery
                </span>
              </div>
            </div>
          </div>

          {/* ================= SECTION 1: EBM LEARNING GROUPS ================= */}
          <div className="mb-20">
            <EbmLearningGroups 
              onSelectLearnerForIntervention={(learner) => {
                setSelectedInterventionLearner(learner);
                const el = document.getElementById("analytics-question-analysis");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Pedagogical Transition Divider: Class Patterns to Question Evidence */}
          <div className="my-16 flex flex-col items-center justify-center space-y-3">
            <div className="h-10 w-px bg-gradient-to-b from-[#764dbd]/40 to-amber-500/40" />
            <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-2xs">
              <span>Evidence reveals what happened</span>
              <ArrowDown className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-600 font-black">Question analysis reveals why</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-black">Correction turns it into learning</span>
            </div>
            <div className="h-10 w-px bg-gradient-to-b from-amber-500/40 to-[#0076a5]/40" />
          </div>

          {/* ================= SECTION 2: QUESTION ANALYSIS + LEARNING CHAIN + CORRECTION CYCLE ================= */}
          <div className="mb-8">
            <EbmQuestionAnalysis />
          </div>

        </div>
      </main>

      {/* ================= MORE WAYS SECTION ================= */}
      <section className="bg-[#eaf4fc] pt-32 pb-36 sm:pb-44 px-4 overflow-hidden relative border-b border-blue-50/50">
        
        {/* ================= MULTI-LAYERED ORGANIC WAVES (TOP) ================= */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0] z-0 pointer-events-none">
          <svg viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] sm:h-[100px] md:h-[140px] transform rotate-180">
            {/* Layer 1 (Back wave, translucent light blue) */}
            <path d="M0,0 L1440,0 L1440,85 C1200,135 960,55 720,105 C480,155 240,65 0,125 Z" fill="#d4e8fa" opacity="0.5" />
            {/* Layer 2 (Middle wave, slightly different curve) */}
            <path d="M0,0 L1440,0 L1440,72 C1200,127 960,42 720,92 C480,142 240,52 0,112 Z" fill="#c3ddf8" opacity="0.8" />
            {/* Layer 3 (Front solid wave matching background transition, white) */}
            <path d="M0,0 L1440,0 L1440,60 C1200,120 960,30 720,80 C480,130 240,40 0,100 Z" fill="#ffffff" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-serif font-normal text-center text-[#0070bc] mb-16 tracking-tight">
            More ways teachers use EBM Analytics:
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* ================= LEFT SIDE: HIGH-FIDELITY VECTOR MOCKUPS ================= */}
            <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[440px]">
              <div className="relative w-full max-w-[440px] h-[400px]">
                
                {/* 🍃 Green Leaf Ornament (Top Right Background) */}
                <div className="absolute -top-6 -right-4 w-18 h-18 transform rotate-[15deg] opacity-90 z-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#a3e390]">
                    <path d="M10,90 C40,40 80,30 90,10 C90,10 70,30 40,40 C30,45 10,90 10,90 Z" fill="currentColor" stroke="#3c8227" strokeWidth="2.5" />
                    <path d="M10,90 C35,60 60,40 90,10" fill="none" stroke="#3c8227" strokeWidth="2" />
                    <path d="M40,40 C45,35 55,30 65,28" fill="none" stroke="#3c8227" strokeWidth="1.5" />
                    <path d="M30,50 C38,47 48,42 55,38" fill="none" stroke="#3c8227" strokeWidth="1.5" />
                    <path d="M22,64 C28,60 38,55 45,52" fill="none" stroke="#3c8227" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* 🌿 Purple Twig Ornament (Bottom Left Background) */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 transform -rotate-12 z-0 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#c1aff5]">
                    {/* Main Stem */}
                    <path d="M15,85 Q40,65 80,15" fill="none" stroke="#724cb6" strokeWidth="3" strokeLinecap="round" />
                    {/* Leaf pair 1 */}
                    <path d="M30,70 C15,55 30,45 42,58 C36,74 25,72 30,70 Z" fill="currentColor" stroke="#724cb6" strokeWidth="1.5" />
                    {/* Leaf pair 2 */}
                    <path d="M52,50 C38,35 53,25 64,38 C58,54 47,52 52,50 Z" fill="currentColor" stroke="#724cb6" strokeWidth="1.5" />
                    {/* Leaf pair 3 */}
                    <path d="M68,34 C58,20 70,12 79,23 C75,37 65,36 68,34 Z" fill="currentColor" stroke="#724cb6" strokeWidth="1.5" />
                    {/* Leaf pair 4 opposite */}
                    <path d="M38,62 C52,55 58,70 45,78 C33,75 36,65 38,62 Z" fill="currentColor" stroke="#724cb6" strokeWidth="1.5" />
                    {/* Leaf pair 5 opposite */}
                    <path d="M56,43 C70,36 76,51 63,59 C51,56 54,46 56,43 Z" fill="currentColor" stroke="#724cb6" strokeWidth="1.5" />
                  </svg>
                </div>

                {/* 🟢 Teal Soft Mound Ornament (Bottom Left Behind) */}
                <div className="absolute -bottom-2 -left-3 w-16 h-12 bg-[#4db6ac] rounded-[45%_55%_70%_30%_/_40%_50%_60%_50%] opacity-80 blur-[0.5px] z-0 pointer-events-none" />

                {/* Card 1: Diagnostic Action Plan (Top Layer) */}
                <div className="absolute top-2 left-2 w-[85%] bg-white rounded-[16px] shadow-lg border border-slate-100 p-5 text-left z-10 transition-transform duration-300 hover:scale-[1.01]">
                  {/* Teal Header */}
                  <div className="bg-[#00a3ad] text-white p-4 rounded-t-xl -mx-5 -mt-5 mb-4 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-[11px] font-extrabold tracking-wider uppercase">EBM Flex Diagnostic Action Plan</p>
                      <p className="text-[8px] opacity-90 font-semibold mt-0.5">Your most recent levels and recommendations</p>
                    </div>
                    {/* Angled white brand bar */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest text-white">
                      EBM
                    </div>
                  </div>

                  {/* Student Tag */}
                  <div className="bg-[#e1f5fe] text-[#0288d1] text-[10px] font-bold px-3 py-1.5 rounded-lg mb-3 flex items-center gap-1.5 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0288d1]" />
                    <span>Student: <span className="font-extrabold text-[#01579b]">Mila Alvarez</span></span>
                  </div>

                  {/* Narrative Block */}
                  <p className="text-slate-500 text-[9px] leading-relaxed mb-4 border-b border-slate-100 pb-3">
                    The EBM Flex Diagnostic shows you what you know and what you're ready to learn next. Work on your personalized recommendations to grow.
                  </p>

                  {/* Score Indicator & Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-500">Overall math level</span>
                      <span className="bg-[#0288d1] text-white font-extrabold text-[9px] w-7 h-7 rounded-full flex items-center justify-center shadow-md">530</span>
                    </div>
                    <div className="relative h-1.5 bg-slate-100 rounded-full overflow-visible">
                      <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-[#4db6ac] to-[#0288d1] rounded-full" />
                      <div className="absolute top-1/2 left-[65%] -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-[2.5px] border-[#0288d1] rounded-full shadow" />
                    </div>
                  </div>
                </div>

                {/* Card 2: Score Grid (Bottom Right Overlapping Layer) */}
                <div className="absolute bottom-2 right-2 w-[80%] bg-white rounded-[16px] shadow-2xl border border-slate-150 p-4 text-left z-20 transition-transform duration-300 hover:scale-[1.01]">
                  <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">SCORE GRID</span>
                    <span className="text-[8px] bg-indigo-50 text-indigo-600 font-extrabold px-1.5 py-0.5 rounded">Live view</span>
                  </div>

                  <div className="space-y-2 text-[9px]">
                    <div className="grid grid-cols-4 gap-1 font-bold text-slate-400 pb-1">
                      <div>Student</div>
                      <div className="text-center">Decimals</div>
                      <div className="text-center">Fractions</div>
                      <div className="text-center">Equations</div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1 items-center">
                      <div className="font-semibold text-slate-800">Mila A.</div>
                      <div className="bg-emerald-50 text-emerald-700 font-extrabold text-center py-1 rounded border border-emerald-100">84</div>
                      <div className="bg-emerald-50 text-emerald-700 font-extrabold text-center py-1 rounded border border-emerald-100">90</div>
                      <div className="bg-amber-50 text-amber-700 font-extrabold text-center py-1 rounded border border-amber-100">71</div>
                    </div>

                    <div className="grid grid-cols-4 gap-1 items-center">
                      <div className="font-semibold text-slate-800">Cooper K.</div>
                      <div className="bg-[#e1f3ff] text-blue-700 font-extrabold text-center py-1 rounded border border-blue-100">92</div>
                      <div className="bg-amber-50 text-amber-700 font-extrabold text-center py-1 rounded border border-amber-100">65</div>
                      <div className="bg-rose-50 text-rose-700 font-extrabold text-center py-1 rounded border border-rose-100">42</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ================= RIGHT SIDE: LUXURY SERIF CONTENT BULLETS ================= */}
            <div className="w-full lg:w-1/2 space-y-12">
              
              {/* Bullet 1 */}
              <div className="flex gap-5 items-start">
                {/* Blue Double-Ring Checkmark Icon */}
                <div className="shrink-0 w-10 h-10 rounded-full border border-[#0096db]/30 bg-white flex items-center justify-center p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-full border-2 border-[#0096db] bg-[#e1f3ff] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#0096db] stroke-[3.5]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2.5xl font-serif font-normal text-[#0070bc]">
                    Take post-assessment action
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-lg">
                    After pinpointing their scores in EBM's Diagnostic, students receive personalized action plans that link to the precise skills they should work on to grow.
                  </p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="flex gap-5 items-start">
                {/* Blue Double-Ring Checkmark Icon */}
                <div className="shrink-0 w-10 h-10 rounded-full border border-[#0096db]/30 bg-white flex items-center justify-center p-0.5 shadow-sm">
                  <div className="w-full h-full rounded-full border-2 border-[#0096db] bg-[#e1f3ff] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#0096db] stroke-[3.5]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2.5xl font-serif font-normal text-[#0070bc]">
                    Check for assignment completion
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-lg">
                    From exit tickets to last night's homework, see assignment completion at a glance in one clear grid.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ================= MULTI-LAYERED ORGANIC WAVES (BOTTOM) ================= */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0] z-0 pointer-events-none">
          <svg viewBox="0 0 1440 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[60px] sm:h-[100px] md:h-[140px]">
            {/* Layer 1 (Back wave, translucent light blue) */}
            <path d="M0,80 C240,120 480,40 720,90 C960,140 1200,60 1440,100 L1440,160 L0,160 Z" fill="#d4e8fa" opacity="0.5" />
            {/* Layer 2 (Middle wave, slightly different curve) */}
            <path d="M0,92 C240,132 960,32 720,82 C480,132 1200,52 1440,112 L1440,160 L0,160 Z" fill="#c3ddf8" opacity="0.8" />
            {/* Layer 3 (Front solid wave matching background of next section, white) */}
            <path d="M0,100 C240,140 480,50 720,100 C960,150 1200,60 1440,110 L1440,160 L0,160 Z" fill="#ffffff" />
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* STEP 16 — FINAL EBM ANALYTICS CLOSING SECTION                             */}
      {/* ========================================================================= */}

      {/* ================= PART 1: EBM LEARNING EVIDENCE LOOP ================= */}
      <section className="bg-gradient-to-b from-white via-slate-50/70 to-white py-20 sm:py-28 px-4 border-b border-slate-200/80 relative overflow-hidden" id="evidence-loop">
        {/* Subtle background radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Eyebrow & Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center space-x-2 bg-[#0076a5]/10 border border-[#0076a5]/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#0076a5]">
              <RotateCcw className="w-3.5 h-3.5 text-[#0076a5]" />
              <span>THE EBM LEARNING EVIDENCE LOOP</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Every Question Becomes Evidence.
            </h2>
            <div className="space-y-2 text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              <p className="font-semibold text-slate-800">
                EBM Analytics is built around a continuous learning evidence loop.
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                The goal is not to collect data simply because it can be collected. Every piece of evidence should help explain where the learner is, what is preventing progress and what should happen next.
              </p>
            </div>
          </div>

          {/* ================= MAIN CIRCULAR LOOP VISUAL (DESKTOP) ================= */}
          <div className="hidden lg:block relative py-8">
            <div className="relative w-[760px] h-[760px] mx-auto flex items-center justify-center">
              
              {/* SVG Connecting Track & Orbit */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 760 760">
                {/* Main orbital track */}
                <circle cx="380" cy="380" r="280" fill="none" stroke="#e2e8f0" strokeWidth="2.5" strokeDasharray="8 8" />
                {/* Inner active energy ring */}
                <circle cx="380" cy="380" r="280" fill="none" stroke="url(#loopGradient)" strokeWidth="3" strokeDasharray="20 180" opacity="0.6" className="animate-spin" style={{ animationDuration: "30s" }} />
                
                {/* Curved return path indicator from Progress (stage 8) back to Diagnose (stage 0) */}
                <path
                  d="M 578 182 C 600 240, 600 300, 578 350"
                  fill="none"
                  stroke="#00a3e0"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />

                <defs>
                  <linearGradient id="loopGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0076a5" />
                    <stop offset="50%" stopColor="#764dbd" />
                    <stop offset="100%" stopColor="#00a3e0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Message Core Box */}
              <div className="w-[300px] h-[300px] rounded-full bg-white border-2 border-slate-200/90 shadow-xl flex flex-col items-center justify-center p-6 text-center z-10 space-y-3 relative group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0076a5] to-[#764dbd] flex items-center justify-center text-white shadow-md shadow-[#0076a5]/20">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0076a5] block">
                    CONTINUOUS MASTERY
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight mt-0.5">
                    EBM LEARNING<br />EVIDENCE
                  </h3>
                </div>
                <div className="pt-2 border-t border-slate-100 w-full">
                  <span className="text-[11px] font-black text-[#764dbd] bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                    Stage {activeLoopStage + 1} of 9 Selected
                  </span>
                </div>
              </div>

              {/* 9 Circular Orbit Nodes positioned precisely around 280px radius */}
              {[
                { num: "01", name: "DIAGNOSE", desc: "Understand the learner's current position.", color: "border-sky-500 bg-sky-50 text-sky-700" },
                { num: "02", name: "TEACH", desc: "Provide the explanation, modelling and guidance required.", color: "border-blue-500 bg-blue-50 text-blue-700" },
                { num: "03", name: "PRACTISE", desc: "Build understanding, accuracy and fluency.", color: "border-indigo-500 bg-indigo-50 text-indigo-700" },
                { num: "04", name: "CHECK", desc: "Gather evidence of what the learner can currently do.", color: "border-purple-500 bg-purple-50 text-purple-700" },
                { num: "05", name: "CORRECT", desc: "Identify and repair errors or misconceptions.", color: "border-rose-500 bg-rose-50 text-rose-700" },
                { num: "06", name: "REFLECT", desc: "Help the learner recognise what they understood, where they struggled and what they will do differently.", color: "border-amber-500 bg-amber-50 text-amber-800" },
                { num: "07", name: "REASSESS", desc: "Check whether learning has changed.", color: "border-teal-500 bg-teal-50 text-teal-700" },
                { num: "08", name: "MASTER", desc: "Confirm that the learner can understand, apply and transfer the skill with confidence.", color: "border-emerald-500 bg-emerald-50 text-emerald-800" },
                { num: "09", name: "PROGRESS", desc: "Move forward when the evidence supports readiness.", color: "border-[#0076a5] bg-[#0076a5]/10 text-[#0076a5]" },
              ].map((stage, idx) => {
                // 9 nodes equally spaced around 360 degrees, starting at top (-90 deg)
                const angle = (idx * (360 / 9) - 90) * (Math.PI / 180);
                const radius = 280;
                const x = 380 + radius * Math.cos(angle);
                const y = 380 + radius * Math.sin(angle);
                const isActive = activeLoopStage === idx;

                return (
                  <div
                    key={stage.num}
                    style={{ left: `${x}px`, top: `${y}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveLoopStage(idx)}
                      onMouseEnter={() => setActiveLoopStage(idx)}
                      className={`group p-3.5 rounded-2xl bg-white border transition-all duration-300 flex flex-col items-center text-center shadow-md cursor-pointer ${
                        isActive
                          ? "ring-4 ring-[#0076a5]/20 border-[#0076a5] shadow-xl scale-110 -translate-y-1 z-30"
                          : "border-slate-200/90 hover:border-slate-400 hover:scale-105"
                      } w-36`}
                    >
                      <div className="flex items-center space-x-1.5 mb-1">
                        <span className="text-[10px] font-mono font-black text-slate-400">{stage.num}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#0076a5]" />
                      </div>
                      <span className="text-xs font-black text-slate-900 tracking-wider">
                        {stage.name}
                      </span>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                        {stage.desc}
                      </p>
                    </button>
                  </div>
                );
              })}

            </div>
          </div>

          {/* ================= MAIN VERTICAL LOOP VISUAL (MOBILE & TABLET) ================= */}
          <div className="lg:hidden space-y-3 max-w-md mx-auto">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center shadow-sm mb-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0076a5]">
                EBM LEARNING EVIDENCE
              </span>
              <h3 className="text-lg font-black text-slate-900">9-Stage Continuous Learning Loop</h3>
            </div>

            {[
              { num: "01", name: "DIAGNOSE", desc: "Understand the learner's current position.", color: "border-sky-300 bg-sky-50/50" },
              { num: "02", name: "TEACH", desc: "Provide the explanation, modelling and guidance required.", color: "border-blue-300 bg-blue-50/50" },
              { num: "03", name: "PRACTISE", desc: "Build understanding, accuracy and fluency.", color: "border-indigo-300 bg-indigo-50/50" },
              { num: "04", name: "CHECK", desc: "Gather evidence of what the learner can currently do.", color: "border-purple-300 bg-purple-50/50" },
              { num: "05", name: "CORRECT", desc: "Identify and repair errors or misconceptions.", color: "border-rose-300 bg-rose-50/50" },
              { num: "06", name: "REFLECT", desc: "Help the learner recognise what they understood, where they struggled and what they will do differently.", color: "border-amber-300 bg-amber-50/50" },
              { num: "07", name: "REASSESS", desc: "Check whether learning has changed.", color: "border-teal-300 bg-teal-50/50" },
              { num: "08", name: "MASTER", desc: "Confirm that the learner can understand, apply and transfer the skill with confidence.", color: "border-emerald-300 bg-emerald-50/50" },
              { num: "09", name: "PROGRESS", desc: "Move forward when the evidence supports readiness.", color: "border-[#0076a5]/40 bg-[#0076a5]/5" },
            ].map((stage, idx, arr) => (
              <div key={stage.num} className="space-y-2">
                <div className={`p-4 rounded-2xl bg-white border ${stage.color} shadow-xs flex items-start space-x-3.5 text-left`}>
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-black text-xs flex items-center justify-center shrink-0">
                    {stage.num}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900">{stage.name}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{stage.desc}</p>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div className="flex justify-center text-slate-300 py-0.5">
                    <ArrowDown className="w-4 h-4 text-[#0076a5]" />
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Curved Return Indicator */}
            <div className="pt-3 pb-2 text-center">
              <div className="inline-flex items-center space-x-2 bg-[#0076a5]/10 border border-[#0076a5]/20 text-[#0076a5] px-4 py-2 rounded-xl text-xs font-black">
                <RotateCcw className="w-4 h-4" />
                <span>PROGRESS ↘ CONTINUOUSLY RETURNS TO DIAGNOSE</span>
              </div>
            </div>
          </div>

          {/* Central Prominent Statement */}
          <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-2 border border-slate-800">
            <span className="text-[11px] font-black uppercase tracking-widest text-cyan-300 block">
              THE LOOP NEVER ENDS AT A SCORE.
            </span>
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              Every result becomes evidence for the next learning decision.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PART 2: TECHNOLOGY SERVES THE METHOD ================= */}
      <section className="bg-white py-20 sm:py-28 px-4 border-b border-slate-200/80 relative" id="technology-serves-method">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Section Transition & Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              TECHNOLOGY SHOULD SERVE LEARNING.
            </span>
            <span className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]">
              <HeartHandshake className="w-3.5 h-3.5 text-[#764dbd]" />
              <span>TECHNOLOGY SERVES THE METHOD</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Technology Makes the Learning Process Clearer.
            </h2>
            <div className="space-y-2 text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              <p className="font-semibold text-slate-800">
                EBM Analytics does not replace the teacher.
              </p>
              <p className="text-sm sm:text-base text-slate-600">
                Technology should make the learning process clearer and more responsive while preserving human judgement, explanation, encouragement and intervention.
              </p>
            </div>
          </div>

          {/* Synergy Formula Header */}
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 via-purple-50 to-emerald-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-center shadow-xs">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 text-xs sm:text-sm font-black text-slate-900">
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-[#0076a5]">
                TECHNOLOGY
              </span>
              <span className="text-slate-400 text-base font-normal">+</span>
              <span className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-[#764dbd]">
                TEACHER
              </span>
              <span className="text-slate-400">→</span>
              <span className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl shadow-xs">
                BETTER LEARNING DECISIONS
              </span>
            </div>
          </div>

          {/* Two-Column Complementary Comparison Grid */}
          <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-10 border border-slate-200 space-y-6 shadow-sm">
            
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-slate-200 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-black uppercase tracking-widest text-[#0076a5]">
                <Activity className="w-4 h-4 text-[#0076a5]" />
                <span>Technology Can</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-xs font-black uppercase tracking-widest text-[#764dbd]">
                <UserCheck className="w-4 h-4 text-[#764dbd]" />
                <span>Teachers Provide</span>
              </div>
            </div>

            {/* 7 Complementary Pairs */}
            <div className="space-y-3">
              {[
                { tech: "RECORD", teacher: "JUDGEMENT", context: "Data capture vs professional evaluation" },
                { tech: "ORGANISE", teacher: "EXPLANATION", context: "Pattern structure vs pedagogical instruction" },
                { tech: "IDENTIFY", teacher: "ENCOURAGEMENT", context: "Gap pinpointing vs student motivation & support" },
                { tech: "COMPARE", teacher: "INTERVENTION", context: "Comparative trends vs hands-on remediation" },
                { tech: "HIGHLIGHT", teacher: "HUMAN UNDERSTANDING", context: "Objective signals vs empathetic insight" },
                { tech: "RECOMMEND", teacher: "RELATIONSHIP AND CONTEXT", context: "Algorithmic paths vs individual student connection" },
                { tech: "REMIND", teacher: "PROFESSIONAL DECISION-MAKING", context: "Timely alerts vs authentic educational choices" },
              ].map((pair, idx) => (
                <div
                  key={pair.tech}
                  className="bg-white rounded-2xl p-4 sm:p-4.5 border border-slate-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-center hover:border-slate-300 transition-colors"
                >
                  {/* Left: Technology Can */}
                  <div className="flex items-center justify-between md:justify-start space-x-3 text-left">
                    <span className="w-6 h-6 rounded-lg bg-sky-50 text-[#0076a5] font-mono font-black text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block md:hidden">Technology can</span>
                      <span className="text-sm font-black text-slate-900">{pair.tech}</span>
                    </div>
                  </div>

                  {/* Right: Teachers Provide */}
                  <div className="flex items-center justify-between md:justify-start space-x-3 text-left border-t md:border-t-0 pt-2 md:pt-0 border-slate-100">
                    <div className="hidden md:flex w-6 h-6 rounded-lg bg-purple-50 text-[#764dbd] font-bold text-xs items-center justify-center shrink-0">
                      +
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block md:hidden">Teachers provide</span>
                      <span className="text-sm font-black text-[#764dbd]">{pair.teacher}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Highlighted EBM Position Statement */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 text-center shadow-xl space-y-4 border border-slate-800 max-w-4xl mx-auto">
            <span className="inline-flex items-center space-x-2 bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-cyan-300">
              <span>EBM POSITION</span>
            </span>
            <p className="text-base sm:text-xl font-bold leading-relaxed max-w-3xl mx-auto text-slate-100">
              The purpose of technology within EBM is to make the learning process clearer and more responsive — not to remove the human relationship at the centre of education.
            </p>
          </div>

        </div>
      </section>

      {/* ================= PART 4: FINAL EBM ANALYTICS CTA ================= */}
      <section className="bg-gradient-to-b from-white via-slate-900 to-slate-950 text-white pt-24 pb-28 px-4 text-center relative overflow-hidden" id="final-cta">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          
          {/* Eyebrow & H2 */}
          <div className="space-y-4">
            <span className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-cyan-300">
              <span>EBM ANALYTICS</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
              Make Confident Decisions for Every Learner, Every Day.
            </h2>
          </div>

          {/* Supporting Copy (6 visually distinct lines) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-2xl mx-auto text-left text-xs sm:text-sm font-semibold">
            {[
              "Know what was attempted.",
              "Know what was understood.",
              "Know what went wrong.",
              "Know whether it was corrected.",
              "Know what has been mastered.",
              "Know what should happen next.",
            ].map((line, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center space-x-2">
                <CheckCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="text-slate-200">{line}</span>
              </div>
            ))}
          </div>

          {/* Large Typographic Statement */}
          <div className="py-6 space-y-2 text-center max-w-3xl mx-auto border-y border-white/10">
            <p className="text-xl sm:text-2.5xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 tracking-tight leading-snug">
              FROM MARKS TO MEANING.
            </p>
            <p className="text-xl sm:text-2.5xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-emerald-300 tracking-tight leading-snug">
              FROM MISTAKES TO MASTERY.
            </p>
            <p className="text-xl sm:text-2.5xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-cyan-300 tracking-tight leading-snug">
              FROM DATA TO ACTION.
            </p>
          </div>

          {/* Final Supporting Statement */}
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
            A learning system where every question becomes evidence, every mistake becomes an opportunity for correction, and every next step is based on readiness.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-[#00a3e0] to-[#0076a5] hover:from-[#0092c7] hover:to-[#006690] text-white font-black text-base sm:text-lg px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center space-x-2"
              id="analytics-final-cta-btn"
            >
              <span>JOIN EBM TODAY</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= WALKTHROUGH SIMULATOR MODAL ================= */}
      <AnimatePresence>

        {/* ================= SUCCESS STORY DETAIL MODAL ================= */}
        {selectedTestimonialForModal && (
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-spotlight-title"
            onKeyDown={(e) => {
              if (e.key === "Escape") setSelectedTestimonialForModal(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#0096db]" aria-hidden="true" />
                  <h3 id="modal-spotlight-title" className="text-sm font-extrabold text-slate-800">Teacher Success Spotlight</h3>
                </div>
                <button 
                  onClick={() => setSelectedTestimonialForModal(null)}
                  aria-label="Close success spotlight modal"
                  className="p-1.5 hover:bg-slate-200 rounded-full transition text-slate-500 focus-visible:ring-2 focus-visible:ring-[#0096db] focus-visible:outline-none"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-4 text-left">
                  <div className="w-14 h-14 rounded-full bg-[#0096db] flex items-center justify-center shrink-0 shadow-md">
                    <Quote className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg leading-snug">{selectedTestimonialForModal.name}</h4>
                    <p className="text-slate-600 text-sm font-medium">
                      {selectedTestimonialForModal.role}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {selectedTestimonialForModal.school}, {selectedTestimonialForModal.location}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 my-4" />

                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#0096db] bg-[#0096db]/10 px-2.5 py-1 rounded-full">
                    Detailed Impact Case Study
                  </span>
                  <p className="text-slate-750 text-base leading-relaxed italic text-left pl-4 border-l-4 border-[#0096db]/60">
                    "{selectedTestimonialForModal.fullText}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedTestimonialForModal(null)}
                    className="bg-[#0096db] hover:bg-[#1f87bc] text-white font-extrabold text-xs py-2.5 px-6 rounded-xl shadow-sm cursor-pointer transition-all active:scale-98"
                  >
                    Close Success Spotlight
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      </div>
    </EbmAtmosphericCanvas>
  );
}
