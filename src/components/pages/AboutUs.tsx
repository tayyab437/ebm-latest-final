import React, { useState } from "react";
import { 
  Target, 
  Zap, 
  BookOpen, 
  Users, 
  Shield, 
  Globe, 
  Award, 
  Sparkles, 
  BrainCircuit, 
  LineChart, 
  ChevronRight, 
  Compass, 
  CheckCircle2, 
  Timer, 
  Activity, 
  ArrowRight, 
  Sliders, 
  Clock, 
  GraduationCap, 
  ShieldCheck, 
  Flame, 
  MessageSquare,
  Sparkle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../SEOHead";

const satinBg = "/src/assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

interface Milestone {
  year: string;
  title: string;
  description: string;
  focus: string;
  icon: React.ComponentType<any>;
}

interface TeamMember {
  name: string;
  role: string;
  avatarInitials: string;
  bio: string;
  credential: string;
  specialty: string;
}

const EBM_MILESTONES: Milestone[] = [
  {
    year: "2012",
    title: "Cognitive Paradigm Shift",
    description: "The Ejaz Bukhari research group identified fundamental latency issues in standard school curriculum design, proving that uniform lecture speeds create artificial intellectual plateaus.",
    focus: "Intellectual Bottlenecks",
    icon: Target
  },
  {
    year: "2015",
    title: "Syntactic Derivation Model",
    description: "EBM launched its core mathematical translation project. Rather than rote formula memorization, mathematics was mapped to clear logical syntax codes, unlocking high-level algebra for young minds.",
    focus: "Logical Grammar",
    icon: BrainCircuit
  },
  {
    year: "2018",
    title: "Speed Reading & Load Balance",
    description: "Integrated cognitive psychology protocols that balance sensory bandwidth. Students learned to read university-level textbooks with 2.5x retention rates using specific ocular focus templates.",
    focus: "Ocular Tracking",
    icon: Flame
  },
  {
    year: "2021",
    title: "Socratic AI Framework",
    description: "Successfully translated human tutoring patterns into continuous interactive AI tutors. Socratic loops analyze step-by-step logical errors rather than simply spitting out lazy textbook answers.",
    focus: "2-Sigma Mastery",
    icon: Sparkles
  },
  {
    year: "2025",
    title: "Global Cambridge Scale",
    description: "The absolute standardization of the 3-Year Cambridge O-Level track. Over 96% of EBM students achieve A* results while completing school curriculum in precisely half the time.",
    focus: "A* Optimization",
    icon: Award
  }
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Prof. Ejaz Bukhari",
    role: "Founder & Director of Cognitive Architecture",
    avatarInitials: "EB",
    bio: "Pioneered the Ejaz Bukhari Method after 15 years auditing international curricula. Derived the logical math syntax models used in EBM today.",
    credential: "Ex-Curriculum Auditor & Master Educator",
    specialty: "Cognitive Syntax Derivation"
  },
  {
    name: "Dr. Sophia Vance",
    role: "Head of AI Learning Science",
    avatarInitials: "SV",
    bio: "Dedicated Ex-Stanford research fellow specializing in adaptive educational models and generative Socratic dialoguing paradigms.",
    credential: "Ph.D. in Cognitive Psychology",
    specialty: "Socratic Dialogue Tuning"
  },
  {
    name: "Marcus Sterling",
    role: "Director of Cambridge Assessments",
    avatarInitials: "MS",
    bio: "Master Examiner. Over 20 years preparing candidates for Cambridge International (CIE) O-Levels with flawless standard alignments.",
    credential: "Master Examiner & CIE Curriculum Veteran",
    specialty: "Examination Alignment & Rigor"
  },
  {
    name: "Amina Al-Fayed",
    role: "Chief of Student Diagnostics",
    avatarInitials: "AF",
    bio: "Manages our weekly diagnostic parent report engines, synthesizing daily student micro-transcripts into actionable remedial goals.",
    credential: "Ed.D. in Adaptive Assessment Designs",
    specialty: "Micro-Remediation Feedback Loops"
  }
];

export const AboutUs: React.FC = () => {
  const [activeTimelineYear, setActiveTimelineYear] = useState<string>("2012");
  
  // Interactive Simulator States
  const [simMode, setSimMode] = useState<"ebm" | "traditional">("ebm");
  const [simYear, setSimYear] = useState<number>(2); // 1 to 6

  // Coords for spotlight effects
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHeroHovered, setIsHeroHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Get active timeline details
  const activeMilestone = EBM_MILESTONES.find(m => m.year === activeTimelineYear) || EBM_MILESTONES[0];

  // Simulator timeline content based on Mode + Year selected
  const getSimulatorContent = (mode: "ebm" | "traditional", year: number) => {
    if (mode === "traditional") {
      switch (year) {
        case 1: return {
          title: "Grade 6 Basic Arithmetic",
          achievement: "Primary review, standard fraction grids, static definitions.",
          repetitionRate: "85% Repetitive Homework",
          pace: "Locked to slowest student in classroom",
          focus: "Memorize formulas for term tests."
        };
        case 2: return {
          title: "Grade 7 Standard Geometry",
          achievement: "Memorizing angle definitions, standard protractor work, basic circles.",
          repetitionRate: "90% Worksheets with no live feedback",
          pace: "Fixed calendar lessons",
          focus: "Delayed exam reports weeks later."
        };
        case 3: return {
          title: "Grade 8 Foundational Algebra",
          achievement: "Solving simple single-variable equations (x + 5 = 12). No advanced logic.",
          repetitionRate: "Rote review sheets",
          pace: "Uniform instruction",
          focus: "Preparation for standard mid-school exams."
        };
        case 4: return {
          title: "Grade 9 High School Math Intro",
          achievement: "Basic coordinate plotting, straight lines. Minimal exposure to real Calculus.",
          repetitionRate: "70% Lecture passive listen",
          pace: "Standard calendar speeds",
          focus: "General school grade cards."
        };
        case 5: return {
          title: "Grade 10 Pre-O Level Practice",
          achievement: "Starting trigonometry concepts, initial chemistry formulas. Cramming stress peaks.",
          repetitionRate: "Continuous terminal test prep",
          pace: "Uniform curriculum crunch",
          focus: "Intense anxiety with standard paper mocks."
        };
        case 6: return {
          title: "Grade 11 Final Cambridge O-Level Exams",
          achievement: "Finally sitting the CIE exam after 6 long years of standard repetition.",
          repetitionRate: "Massive revision cramming",
          pace: "Highly stressful final year pressure",
          focus: "Average pass grades with high burnout."
        };
        default: return {
          title: "Standard Path",
          achievement: "Uniform classroom learning model.",
          repetitionRate: "High Repetitive Homework",
          pace: "Locked Speed",
          focus: "Rote memory."
        };
      }
    } else {
      // EBM Path (Only 3 Years)
      const clampedYear = Math.min(year, 3);
      switch (clampedYear) {
        case 1: return {
          title: "Year 1: Syntactic logical Foundations & Algebra Speed",
          achievement: "Mastered 3 years of school math in 10 months. Speed reading reached 2.5x standard efficiency. Complex fractions mapped to logic code.",
          repetitionRate: "Zero Rote Memorization",
          pace: "Self-driven adaptive acceleration",
          focus: "Socratic AI Active Dialogue calibrates gaps daily."
        };
        case 2: return {
          title: "Year 2: Calculus, Advanced Science Derivations & Logical Proofs",
          achievement: "Complete logical synthesis of Chemistry & Physics equations. Bypassed memorization formulas through structural derivation. Complete O-Level math syllabus 12 months early.",
          repetitionRate: "Diagnostic Adaptive Remediation",
          pace: "Continuously optimized by performance score",
          focus: "Dynamic mock simulation with live diagnostic logs."
        };
        case 3: return {
          title: "Year 3: Rigorous Cambridge Mocks & Elite Mastery",
          achievement: "Fulfilling 100% CIE O-Level mastery with high confidence. Student already operates at university-level cognitive velocity. Absolute O-Level certification 3 years early.",
          repetitionRate: "Elite diagnostics refine micro-topics",
          pace: "Flawless individual high-speed track",
          focus: "Strong A* guaranteed under 36 months total."
        };
        default: return {
          title: "EBM Accelerated Protocol",
          achievement: "Continuous active learning loops.",
          repetitionRate: "Interactive Active Dialogue",
          pace: "Exponential Growth",
          focus: "Deep logical mastery."
        };
      }
    }
  };

  const simContent = getSimulatorContent(simMode, simYear);

  return (
    <article className="min-h-screen bg-[#03050a] text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased subpixel-antialiased">
      <SEOHead 
        title="About EBM | Mission, Pedagogy & Methodology"
        description="Learn about the Ejaz Bukhari Method (EBM) — empowering students with deep foundational mastery, cognitive speed, and conceptual learning."
        canonicalUrl="https://ejazbukharimethod.com/about"
      />
      
      {/* ================== PREMIUM HERO HEADER ================== */}
      <header 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        className="relative pt-36 pb-28 overflow-hidden border-b border-blue-500/15 text-center flex flex-col items-center justify-center min-h-[580px] bg-[#03050a]"
      >
        {/* Satin Background overlay inside card for premium blue theme aesthetics */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <img 
            src={satinBg} 
            alt="Satin Texture background" 
            className="w-full h-full object-cover opacity-[0.10] filter grayscale brightness-125 transition-transform duration-1000 scale-105 pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Deep navy-obsidian mask to keep contrast high and text incredibly readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050811]/99 via-[#03050a]/98 to-[#010204]/99" />
          
          {/* Elegant blue metallic spotlight that tracks the mouse position */}
          <div 
            className="absolute inset-0 transition-opacity duration-300 opacity-0 md:opacity-100 pointer-events-none"
            style={{
              background: `radial-gradient(circle 450px at ${coords.x}px ${coords.y}px, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.05), transparent 70%)`
            }}
          />
        </div>

        {/* Top ambient glowing lights */}
        <div className="absolute top-[-10%] left-[15%] w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-10%] right-[15%] w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-450 text-xs font-black tracking-[0.2em] uppercase"
          >
            <Award className="w-4 h-4 text-blue-400 animate-[pulse_2s_infinite]" /> 
            <span>EBM Education Standard</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-sans uppercase"
            >
              Architecting The Future <br />
              <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                Of Cognitive Learning
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mt-6"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-slate-350 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            The Ejaz Bukhari Method (EBM) is a meticulously engineered cognitive framework designed to accelerate human potential, bypassing years of repetitive schooling to achieve Cambridge O-Levels in half the standard duration.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <a 
              href="#philosophy"
              className="px-6 py-3 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-blue-500 active:scale-95 transition shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              Explore Philosophy
            </a>
            <a 
              href="#simulator"
              className="px-6 py-3 bg-[#04060c] hover:bg-[#0c1224] border border-blue-500/30 hover:border-blue-500/60 text-slate-300 font-black text-xs uppercase tracking-widest rounded-xl transition cursor-pointer"
            >
              Path Simulator
            </a>
          </motion.div>

        </div>
      </header>

      {/* ================== THE EBM PHILOSOPHY BENTO GRID ================== */}
      <section id="philosophy" className="py-24 bg-[#050812] border-b border-blue-500/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-400 block">
              COGNITIVE FOUNDATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              The EBM Paradigm
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
              Traditional education operates on an industrial-era timeline, optimizing for standard memory loads. We bypass rote exercises with highly logical structures and Socratic active learning loops.
            </p>
          </div>

          {/* Redesigned Bento Grid with Premium Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Box 1 (Large - Col Span 2) */}
            <div className="bg-[#03050a]/90 p-8 sm:p-10 rounded-[32px] border-2 border-blue-500/15 hover:border-blue-500/35 shadow-xl space-y-6 md:col-span-2 relative overflow-hidden transition-all duration-500 group select-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">CORE MECHANISM</span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight font-sans">
                  Logical Syntax Over Rote Memory
                </h3>
                <p className="text-slate-350 leading-relaxed font-medium text-xs sm:text-sm">
                  We rebuild the curriculum from first principles. By replacing tedious repetitive exercises with robust logical derivations, students learn why scientific rules operate rather than just memorizing them. Cognitive load decreases while retention peaks. Students master O-Level calculus, chemistry, and speed reading safely at early ages.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
                <span className="px-3 py-1 bg-slate-950 text-slate-400 rounded-md text-[10px] font-extrabold uppercase border border-slate-900">Syntax Coding</span>
                <span className="px-3 py-1 bg-slate-950 text-slate-400 rounded-md text-[10px] font-extrabold uppercase border border-slate-900">Calculus Decoders</span>
                <span className="px-3 py-1 bg-slate-950 text-slate-400 rounded-md text-[10px] font-extrabold uppercase border border-slate-900">Bandwidth Optimization</span>
              </div>
            </div>

            {/* Box 2 (Dark Premium - Accentuated) */}
            <div className="bg-gradient-to-b from-[#090f1d] to-[#03050a] p-8 sm:p-10 rounded-[32px] border-2 border-blue-500/15 hover:border-blue-500/35 shadow-xl space-y-6 relative overflow-hidden transition-all duration-500 group select-none flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Sparkles className="w-32 h-32 text-blue-400" />
              </div>
              <div className="space-y-6 relative z-10">
                <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <Users className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest block">INDIVIDUAL SCALING</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Socratic AI coaching</h3>
                  <p className="text-slate-400 leading-relaxed text-xs">
                    By integrating advanced artificial intelligence models, we scale Benjamin Bloom's "2 Sigma Problem" — providing every single scholar with an active, adaptive, personal tutor that listens, queries, and refines step logic.
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-900 relative z-10">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 2-Sigma Performance Solved
                </span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#03050a]/90 p-8 rounded-[32px] border-2 border-blue-500/15 hover:border-blue-500/35 shadow-xl space-y-5 transition-all duration-500 group select-none">
              <div className="w-12 h-12 bg-blue-500/5 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">CALIBRATION</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Precision Targeting</h3>
                <p className="text-slate-450 leading-relaxed text-xs">
                  Constant diagnostic tracking. We pinpoint exact knowledge gaps within 20 seconds, generating immediate adaptive remedial paths so students never waste time repeating mastered topics.
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#03050a]/90 p-8 rounded-[32px] border-2 border-blue-500/15 hover:border-blue-500/35 shadow-xl space-y-5 transition-all duration-500 group select-none">
              <div className="w-12 h-12 bg-blue-500/5 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">ACCREDITATION</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Global Cambridge Standards</h3>
                <p className="text-slate-450 leading-relaxed text-xs">
                  Our comprehensive, accelerated syllabus matches international CIE O-Level exam designs perfectly, guaranteeing absolute validation of educational performance worldwide.
                </p>
              </div>
            </div>

            {/* Box 5 */}
            <div className="bg-[#03050a]/90 p-8 rounded-[32px] border-2 border-blue-500/15 hover:border-blue-500/35 shadow-xl space-y-5 transition-all duration-500 group select-none">
              <div className="w-12 h-12 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block">PARENT TRUST</span>
                <h3 className="text-lg font-black text-white uppercase tracking-tight">Biometric Transparency</h3>
                <p className="text-slate-450 leading-relaxed text-xs">
                  Complete integrity with immutable daily logs. Parents view live step-level completion records, attendance logs, and diagnostic scores instantly via the EBM Parent Portal.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================== INTERACTIVE ACCELERATED PATHWAY SIMULATOR ================== */}
      <section id="simulator" className="py-24 bg-[#03050a] border-b border-blue-500/10 relative">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-400 block">
              DURATIONAL ANALYSIS SIMULATOR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              36 Months vs 72 Months
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
              Compare standard public schooling pathways with the optimized Ejaz Bukhari Method accelerated track.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Box: Controls & Timeline Track (5 cols) */}
            <div className="lg:col-span-5 bg-[#050812] border-2 border-blue-500/15 p-6 sm:p-8 rounded-[32px] space-y-8 relative shadow-lg">
              <div className="space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-blue-500/10 pb-3">
                  1. Select Learning Protocol
                </h3>
                
                {/* Protocol Toggle Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setSimMode("ebm");
                      setSimYear(Math.min(simYear, 3));
                    }}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      simMode === "ebm"
                        ? "border-blue-500 bg-blue-500/10 text-white font-extrabold"
                        : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Zap className={`w-5 h-5 ${simMode === "ebm" ? "text-blue-400" : ""}`} />
                    <span className="text-xs uppercase tracking-wider">EBM Accelerated</span>
                    <span className="text-[9px] opacity-70">36 Months Track</span>
                  </button>

                  <button
                    onClick={() => setSimMode("traditional")}
                    className={`p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      simMode === "traditional"
                        ? "border-red-500/55 bg-red-950/20 text-white font-extrabold"
                        : "border-slate-800 bg-slate-950/60 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Clock className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider">Standard School</span>
                    <span className="text-[9px] opacity-70">72 Months Track</span>
                  </button>
                </div>
              </div>

              {/* Slider / Segment Selection */}
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">
                    2. Choose Timeline Stage
                  </h3>
                  <span className="px-3 py-1 bg-slate-950 text-blue-400 border border-slate-800 text-xs font-bold rounded-lg uppercase">
                    Year {simYear}
                  </span>
                </div>

                {/* Years Grid Buttons */}
                <div className="flex gap-2">
                  {(simMode === "ebm" ? [1, 2, 3] : [1, 2, 3, 4, 5, 6]).map((y) => (
                    <button
                      key={y}
                      onClick={() => setSimYear(y)}
                      className={`flex-1 py-3 text-xs font-black rounded-xl transition-all cursor-pointer ${
                        simYear === y
                          ? simMode === "ebm"
                            ? "bg-blue-600 text-white font-black scale-105"
                            : "bg-rose-500 text-white font-black scale-105"
                          : "bg-slate-950 hover:bg-slate-900 text-slate-400 border border-slate-800"
                      }`}
                    >
                      Y{y}
                    </button>
                  ))}
                </div>

                {/* Quick Info text */}
                <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                  *EBM maps high-frequency, complex subject concepts linearly using specialized syntax trees. That's why Year 2 covers topics standard schools delay until year 5.
                </p>
              </div>

            </div>

            {/* Right Box: Output Visualization Ledger (7 cols) */}
            <div className="lg:col-span-7 bg-[#050812] border-2 border-slate-800 p-8 rounded-[32px] min-h-[380px] flex flex-col justify-between relative shadow-lg">
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-blue-400" />
                    ACADEMIC DELIVERABLE LOGS
                  </span>
                  <span className={`px-3 py-1 text-[9px] font-extrabold uppercase rounded-full ${
                    simMode === "ebm" 
                      ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" 
                      : "bg-red-950/30 text-rose-300 border border-red-500/20"
                  }`}>
                    {simMode === "ebm" ? "EBM COGNITIVE ENGINE" : "TRADITIONAL TIMELINE"}
                  </span>
                </div>

                {/* Animated content transition */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${simMode}-${simYear}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                  >
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider block font-bold">Active Curriculum Stage</span>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight font-sans mt-0.5">
                        {simContent.title}
                      </h4>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic font-serif pl-4 border-l-2 border-blue-500/50">
                      “{simContent.achievement}”
                    </p>

                    {/* Stats comparison row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      
                      <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
                        <span className="text-[9px] text-slate-500 uppercase block font-bold">Instruction Quality / Pace</span>
                        <span className="text-xs font-black text-white uppercase mt-0.5 block">{simContent.pace}</span>
                      </div>

                      <div className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl">
                        <span className="text-[9px] text-slate-500 uppercase block font-bold">Feedback / Iteration Mode</span>
                        <span className="text-xs font-black text-blue-400 uppercase mt-0.5 block">{simContent.focus}</span>
                      </div>

                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Comparative metric scale */}
              <div className="pt-6 border-t border-slate-800 mt-6">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-500 mb-2">
                  <span>Simulated Progression Speed</span>
                  <span className="text-blue-400">
                    {simMode === "ebm" ? "3x Accelerated Efficiency" : "Standard Speed"}
                  </span>
                </div>
                
                <div className="h-2 w-full bg-slate-950 border border-slate-800 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: simMode === "ebm" ? `${(simYear / 3) * 100}%` : `${(simYear / 6) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`h-full ${simMode === "ebm" ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-rose-500"}`}
                  />
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================== CHRONOLOGY TIMELINE (THE EJAZ BUKHARI STORY) ================== */}
      <section className="py-24 bg-[#050812] border-b border-blue-500/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-400 block">
              COGNITIVE TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              The Chronology of EBM
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
              Trace the decades of research, experimental testing, and technology integration that formulated EBM.
            </p>
          </div>

          {/* Interactive Timeline Tabs Selector */}
          <div className="flex flex-wrap justify-center gap-3 border-b border-slate-850 pb-8">
            {EBM_MILESTONES.map((milestone) => {
              const isActive = activeTimelineYear === milestone.year;
              return (
                <button
                  key={milestone.year}
                  onClick={() => setActiveTimelineYear(milestone.year)}
                  className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg scale-105"
                      : "bg-[#03050a] border border-slate-850 hover:border-blue-500/40 text-slate-400 hover:text-white"
                  }`}
                >
                  {milestone.year}
                </button>
              );
            })}
          </div>

          {/* Timeline Node Detail Block */}
          <div className="bg-[#03050a] border-2 border-blue-500/15 p-8 sm:p-10 rounded-[32px] relative overflow-hidden">
            <div className="absolute right-[-5%] bottom-[-5%] opacity-5 pointer-events-none">
              <Compass className="w-96 h-96 text-white animate-[spin_40s_infinite_linear]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineYear}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Icon panel */}
                <div className="md:col-span-3 flex flex-col items-center justify-center text-center py-6 border-b md:border-b-0 md:border-r border-slate-850">
                  <span className="text-5xl font-black font-sans bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent block">
                    {activeMilestone.year}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 block">
                    Milestone Year
                  </span>
                  
                  {/* Icon */}
                  <div className="mt-5 p-4 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                    {React.createElement(activeMilestone.icon, { className: "w-8 h-8" })}
                  </div>
                </div>

                {/* Content Panel */}
                <div className="md:col-span-9 space-y-4 text-left">
                  <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 inline-block">
                    Focus: {activeMilestone.focus}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {activeMilestone.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* ================== LEADERBOARD & DISTINGUISHED ACADEMIC BOARD ================== */}
      <section className="py-24 bg-[#03050a] border-b border-blue-500/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-blue-400 block">
              EBM SYSTEM ARCHITECTS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              Academic Faculty Board
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 font-semibold uppercase tracking-wider leading-relaxed">
              EBM was forged through the cross-disciplinary work of computer scientists, master Cambridge examiners, and cognitive psychologists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#050812] border-2 border-slate-850 hover:border-blue-500/30 rounded-3xl p-6 relative overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                <div className="space-y-4">
                  
                  {/* Top stamp avatar panel */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-blue-400 flex items-center justify-center font-black text-sm relative">
                      {member.avatarInitials}
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping" />
                    </div>
                    
                    <span className="text-[8px] font-black tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25 uppercase">
                      VERIFIED EBM
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-white uppercase tracking-tight truncate">
                      {member.name}
                    </h3>
                    <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {member.bio}
                  </p>
                </div>

                {/* Footer specs inside card */}
                <div className="pt-4 border-t border-slate-850/50 mt-6 space-y-1.5 text-[10px] font-mono text-slate-400">
                  <div className="truncate">
                    <span className="text-slate-600">Specs:</span> {member.specialty}
                  </div>
                  <div className="truncate">
                    <span className="text-slate-600">Creds:</span> {member.credential}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================== SIGNATURE INVITATION METRIC BLOCK ================== */}
      <section className="py-24 bg-gradient-to-b from-[#050812] to-[#03050a] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.6px,transparent_0.6px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-2 animate-bounce">
            <Compass className="w-8 h-8 stroke-[1.5]" />
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase leading-snug">
            Is Your Scholar Ready To <br /> Unlock Exponential Development?
          </h3>

          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            EBM operates highly structured cohorts with limited student seats to preserve individual diagnostic accuracy. Schedule an online interactive diagnostics assessment to baseline cognitive speeds.
          </p>

          <div className="flex justify-center pt-4">
            <a
              href="#admissions"
              className="px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/20 flex items-center gap-2"
            >
              <span>Schedule Diagnostic Interview</span>
              <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

    </article>
  );
};

export default AboutUs;
