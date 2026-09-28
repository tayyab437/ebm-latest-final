import React, { useState } from "react";
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Clock, 
  Compass, 
  AlertCircle, 
  Award, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Trophy, 
  Target, 
  Brain,
  Layers,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../SEOHead";
import { EbmYear } from "../../types";
import { EBM_ROADMAP_DETAILS } from "../../constants";
import { TeacherTestimonials } from "../home/success/TeacherTestimonials";

interface ProgramsPageProps {
  selectedYear: EbmYear;
  setSelectedYear: (year: EbmYear) => void;
  onEnterWorkspace: () => void;
}

export function ProgramsPage({ selectedYear, setSelectedYear, onEnterWorkspace }: ProgramsPageProps) {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({
    0: true, // first one open by default
  });

  const toggleFaq = (index: number) => {
    setFaqExpanded(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const selectedDetails = EBM_ROADMAP_DETAILS[selectedYear];

  // Additional detail mock dictionary for rich interactive previews of curriculum subjects
  const SUBJECT_DETAILS: Record<string, { desc: string; modules: string[]; skills: string[] }> = {
    // Year 1
    "Accelerated Mathematics": {
      desc: "Fast-tracked logic-oriented mathematics that merges standard grade arithmetic with modular algebra formulas.",
      modules: ["Advanced Fractions & Ratios", "Pre-Algebraic Expressions", "Mental Heuristic Speed Math", "Geometric Logic Foundations"],
      skills: ["Mental arithmetic with 3-digit precision", "Simplifying complex expressions", "Constructive geometric proofs"]
    },
    "English Communication & Comprehension": {
      desc: "Linguistics program targeting 300+ WPM reading velocity, robust context recognition, and cohesive essay structural blueprints.",
      modules: ["Advanced Speed Reading & Scanning", "Contextual Vocabulary Richness", "Cohesive Narrative Architecture", "Argumentative Discourse Fundamentals"],
      skills: ["Scanning long papers for critical details", "Deconstructing editorial structures", "Advanced vocabulary mastery"]
    },
    "General Science Essentials": {
      desc: "Inquiry-based diagnostics introducing scientific methods, states of matter, basic chemical equations, and fundamental ecology.",
      modules: ["Experimental Variables & Diagnostics", "Atomic Structure & Periodic Table Intro", "Heat Transfer & Matter Phases", "Biological Ecosystem Dynamics"],
      skills: ["Designing valid scientific experiments", "Reading complex diagnostic diagrams", "Differentiating compounds and mixtures"]
    },
    "Social Studies Core": {
      desc: "Analytical geography and historical timelines emphasizing comparative socio-economic progression models.",
      modules: ["Global Geography & Mapping", "Socio-Economic Development Heuristics", "Subcontinent Historical Timelines", "Civilization Frameworks"],
      skills: ["Map projections and coordinates analysis", "Interpreting historical source documents", "Socio-political systems comparison"]
    },
    // Year 2
    "Algebra & Trigonometry": {
      desc: "Comprehensive pre-O-Level algebra mapping equations, simultaneous system matrices, and circular trigonometric functions.",
      modules: ["Quadratic Polynomial Equations", "Simultaneous Equation Intersection", "Right-Triangle Trigonometry Heuristics", "Coordinate Geometry Blueprints"],
      skills: ["Factoring complex algebraic equations", "Modeling systems of linear equations", "Trigonometric height and distance proofs"]
    },
    "Fundamental Physics": {
      desc: "Rigorous mechanics analyzing classical kinematics, Newton's force resolutions, energy transitions, and vector math.",
      modules: ["Kinematics & Speed Acceleration", "Forces & Net Newton Resolution", "Work, Energy & Thermal Efficiencies", "Wave Characteristics & Light Physics"],
      skills: ["Calculating vector displacement and velocity", "Applying Newton's second law in complex planes", "Constructing precise light refraction ray diagrams"]
    },
    "Fundamental Chemistry": {
      desc: "Structured inorganic chemistry studying matter composition, chemical bonding, stoichiometry calculations, and periodic traits.",
      modules: ["Atomic Mass & Stoichiometric Ratios", "Ionic & Covalent Crystal Lattices", "Acids, Bases & Salts Diagnostics", "Reaction Rate Catalysts & Enthalpy"],
      skills: ["Balancing complex chemical equations", "Solving multi-step mole-ratio calculations", "Deducing properties from periodic groupings"]
    },
    "Fundamental Biology": {
      desc: "High-density molecular biology covering cell theory, enzyme kinetics, plant photosynthesis, and organ system operations.",
      modules: ["Cellular Architecture & Transport", "Enzyme Catalysis Profiles", "Plant Nutrition & Photosynthesis Mechanics", "Human Organ System Respiration"],
      skills: ["Microscopic analysis and specimen sketches", "Graphing enzyme rate curves with temperature", "Tracing metabolic energy conversion paths"]
    },
    "Pakistan Studies": {
      desc: "Dense review of the Pakistan Movement timeline, geological resources, governance structures, and international relations.",
      modules: ["Historical Pakistan Movement (1857-1947)", "Topography & Water Resource Auditing", "Constitutional Amendment Timelines", "Geopolitical Strategic Alliances"],
      skills: ["Analyzing historical causal networks", "Topographic map auditing and interpretation", "Evaluating international treaty impacts"]
    },
    "Islamiyat Core": {
      desc: "Academic study of Qur'anic passages, Hadith selections, Islamic history chronology, and ethical consensus frameworks.",
      modules: ["Qur'anic Passage Exegesis", "Chronology of Islamic Caliphates", "Sources of Sharia & Jurisprudence", "Ethical Conflict Resolution Models"],
      skills: ["Textual comparative analysis of ethical sources", "Mapping historic geographical expansion routes", "Synthesizing classical consensus methods"]
    },
    // Year 3
    "CIE Syllabus Math (4024)": {
      desc: "Intensive exam-grade mathematics covering vectors, transformations, statistics, and advanced calculus-ready functions.",
      modules: ["Advanced Vectors & Matrix Transformations", "Probability Distributions & Stats", "Trigonometric Identities & Sine Rules", "Practical Functions & Calculus Intro"],
      skills: ["Solving past CIE exam papers under time constraints", "Performing complex vector algebra proofs", "Interpreting cumulative frequency curves"]
    },
    "CIE Syllabus Physics (5054)": {
      desc: "Exam-oriented physics covering electromagnetism, atomic decay, wave physics, and advanced laboratory practicals.",
      modules: ["Electromagnetic Induction & Circuits", "Radioactivity & Half-Life Physics", "Space Physics & Astrodynamics", "Practical Practical Experimental Skillset"],
      skills: ["Predicting electrical current paths in logic gates", "Solving nuclear decay half-life ratios", "Writing highly accurate experimental write-ups"]
    },
    "CIE Syllabus Chemistry (5070)": {
      desc: "In-depth chemical analysis focusing on organic synthesis, electrolysis, redox reactions, and qualitative analysis tests.",
      modules: ["Electrolysis of Molten & Aqueous Ions", "Redox Reactions & Oxidation States", "Organic Homologous Series & Polymers", "Analytical Chemical Diagnostic Identification"],
      skills: ["Determining oxidation number transitions", "Drawing organic monomer addition polymerization", "Identifying unknown ions using laboratory test tables"]
    },
    "CIE Syllabus Biology (5090)": {
      desc: "Mastery of genetic inheritance models, DNA replication pathways, ecology, and biochemistry processes.",
      modules: ["Monohybrid Cross Genetics & DNA", "Recombinant DNA Biotechnology", "Ecosystem Energy Pyramids & Cycles", "Active & Passive Transport Models"],
      skills: ["Solving complex genetic probability crosses", "Mapping bio-technological plasmid vectors", "Calculating trophic level energy efficiencies"]
    },
    "CIE Past Paper Rigor": {
      desc: "Strategic 10-year past paper marathon with strict grading rubrics, examiner reports auditing, and error-logging diagnostics.",
      modules: ["Time-Trial Diagnostic Simulations", "CIE Examiner Report Synthesis", "Mistake-Log Remediation Cycles", "High-Yield Schema Drills"],
      skills: ["Writing complete, top-grade essay answers in 45 mins", "Avoiding frequent examiner-reported trap answers", "Adapting logical explanations to precise marking keywords"]
    }
  };

  const FAQS = [
    {
      q: "Can an average student handle this accelerated 3-year track?",
      a: "Yes, absolutely. The EBM method is not designed exclusively for 'gifted' students. It succeeds by optimizing the pedagogy. Conventional education introduces years of unnecessary repetition. By focusing heavily on Speed Reading (Year 1) to ingest concepts quickly and Logical Math heuristics, we reduce cognitive friction and build the underlying learning speed of every student."
    },
    {
      q: "Is the curriculum fully compliant with Cambridge (CIE) O-Levels?",
      a: "Yes. Our syllabus is meticulously mapped directly to the Cambridge International Education (CIE) assessment requirements. Year 3 is an intense time-trial and past paper marathon where students solve actual O-Level papers from the last 10 years, ensuring they are extremely well-prepared for official international assessments."
    },
    {
      q: "What support is available if a student struggles with a specific topic?",
      a: "EBM provides a dual-layer support system. First, students have access to our customized, server-side Gemini-powered AI Tutor 24/7, which breaks down complex syllabus checkpoints dynamically. Second, our distinguished faculty (expert Cambridge educators with decades of experience) provide academic oversight, feedback on diagnostic assignments, and direct guidance."
    },
    {
      q: "How does the student performance tracking work?",
      a: "Unlike traditional report cards sent once a term, the EBM system utilizes live algorithmic dashboard tracking. Every lesson, quiz, and past-paper simulation updates a comprehensive cognitive progress model. Parents and teachers can monitor real-time study streaks, topic-level mastery percentages, and predictive exam grades instantly."
    }
  ];

  return (
    <div id="view-programs-redesign" className="space-y-16 animate-fade-in text-slate-100 font-sans selection:bg-blue-600 selection:text-white antialiased">
      <SEOHead 
        title="Academic Programs & Curriculum | Grade 1 to O/A Levels EBM"
        description="Explore personalized academic programs from Grade 1 through Cambridge O/A Levels, covering mathematics, English comprehension, and STEM skill milestones."
        canonicalUrl="https://ejazbukharimethod.com/programs"
      />
      
      {/* ================== PREMIUM PROGRAM HERO BANNER ================== */}
      <section className="relative rounded-[32px] overflow-hidden border border-blue-500/10 text-left bg-gradient-to-b from-[#090f1d] to-[#03050a] p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Decorative Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_0.8px,transparent_0.8px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        <div className="max-w-4xl space-y-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase rounded-full"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse text-blue-400" />
            <span>ACCELERATIVE PEDAGOGY BLUEPRINT</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tight font-sans">
            Complete Grade 5 to O-Level <br />
            <span className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
              In Approximately 3 Years
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            The EBM method replaces repetitive school cycles with a high-density, logically synthesized syllabus. By mastering speed reading techniques, logical math frameworks, and personalized study streams, students graduate years ahead with elite competence.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <button 
              id="btn-pedagogy-student-start-redesign"
              onClick={onEnterWorkspace} 
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-102 active:scale-98 transition shadow-lg shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Enter Student Workspace</span> 
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <a 
              href="#roadmap-interactive-section" 
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-slate-200 font-bold text-xs uppercase tracking-widest rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition flex items-center gap-2"
            >
              <span>Explore Curriculum Map</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================== COGNITIVE CORE HEURISTICS BENTO GRID ================== */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">PEDAGOGICAL CORNERSTONES</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">How the Accelerator Works</h2>
          <p className="text-sm text-slate-400">Three foundational engines driving 3x cognitive speed and retention.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1 */}
          <div className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/30 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group shadow-md flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Activity className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">COGNITIVE ENGINE 01</span>
                <h3 className="text-lg font-black text-white uppercase">1. Accelerated Speed-Reading</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Students start Year 1 focusing heavily on linguistics. Doubling reading speeds unlocks rapid cognitive consumption, letting them analyze advanced physics and chemistry papers early.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900/60 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-bold">
              <span>Core Goal</span>
              <span className="text-blue-400 uppercase">300+ Words Per Minute</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/30 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group shadow-md flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Compass className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">COGNITIVE ENGINE 02</span>
                <h3 className="text-lg font-black text-white uppercase">2. Logical Mathematics First</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Mathematics is the bedrock of science. By eliminating tedious repetitive calculation grids and teaching rigorous logical proofs and mental heuristics, we unlock O-level calculus.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900/60 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-bold">
              <span>Core Goal</span>
              <span className="text-blue-400 uppercase">Logical Proof Competency</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/30 p-8 rounded-3xl relative overflow-hidden transition-all duration-300 group shadow-md flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">COGNITIVE ENGINE 03</span>
                <h3 className="text-lg font-black text-white uppercase">3. Continuous AI Coaching</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Our live server-side Gemini-powered AI Tutor decomposes checkpoints 24/7. It provides hyper-patient study diagnostics, custom review drills, and answers tailored to individual speed.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-900/60 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-bold">
              <span>Core Goal</span>
              <span className="text-blue-400 uppercase">24/7 Real-Time Feedback</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================== INTERACTIVE YEAR-BY-YEAR SYLLABUS PANEL ================== */}
      <section id="roadmap-interactive-section" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">CURRICULUM ARCHITECTURE</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">The 3-Year Syllabus Explorer</h2>
          <p className="text-sm text-slate-400">Click a school year level below to audit subjects and target grade benchmarks.</p>
        </div>

        {/* Year Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-2xl mx-auto">
          {Object.entries(EBM_ROADMAP_DETAILS).map(([yearKey, details]) => {
            const isSelected = selectedYear === yearKey;
            return (
              <button
                key={yearKey}
                id={`btn-tab-select-${yearKey}`}
                onClick={() => {
                  setSelectedYear(yearKey as EbmYear);
                  setActiveSubject(null);
                }}
                className={`w-full sm:flex-1 py-4 px-6 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer border ${
                  isSelected 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20 scale-[1.02]" 
                    : "bg-[#03050a] border-blue-500/10 hover:border-blue-500/30 text-slate-400 hover:text-white"
                }`}
              >
                {yearKey.replace("_", " ")}
              </button>
            );
          })}
        </div>

        {/* Selected Year Display Card */}
        <div className="bg-[#03050a] border border-blue-500/15 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Trophy className="w-48 h-48 text-white" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left side: Overview & Stats (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-[9px] font-black tracking-widest px-3 py-1 bg-blue-500/10 border border-blue-500/25 text-blue-400 rounded-md uppercase">
                  Target: {selectedDetails.targetGrades}
                </span>
                <h3 className="text-2xl font-black text-white mt-3 uppercase tracking-tight">{selectedDetails.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed mt-1">
                  {selectedDetails.focus}
                </p>
              </div>

              {/* Accelerated Stats ring component */}
              <div className="p-5 bg-slate-950/60 border border-slate-900 rounded-2xl space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Relative Syllabus Coverage Speed</span>
                  <span className="text-blue-400 font-black">300% Acceleration</span>
                </div>
                
                {/* Simulated bar chart */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                      <span>EBM Method</span>
                      <span className="text-blue-400">36 Months Complete</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-blue-500 rounded-full w-full" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500">
                      <span>Traditional Schools</span>
                      <span>84 Months Complete (7 Years)</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                      <div className="h-full bg-slate-750 rounded-full w-[42%]" />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed">
                  *EBM maps high-frequency Cambridge core metrics directly into Year 1, shortening structural cycles without reducing learning outcomes.
                </p>
              </div>
            </div>

            {/* Right side: Interactive Modules (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Syllabus Core Courses</h4>
                <p className="text-xs text-slate-500">Click any subject pill below to preview modules, skills, and syllabus detail.</p>
              </div>

              {/* Subject Pills Grid */}
              <div className="flex flex-wrap gap-2.5">
                {selectedDetails.subjects.map((subject, idx) => {
                  const isActive = activeSubject === subject || (!activeSubject && idx === 0);
                  // Auto set first subject if none active
                  if (!activeSubject && idx === 0) {
                    setActiveSubject(subject);
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveSubject(subject)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
                        isActive 
                          ? "bg-blue-500/10 border border-blue-500 text-blue-400" 
                          : "bg-slate-950/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {subject}
                    </button>
                  );
                })}
              </div>

              {/* Selected Subject Detail Display */}
              <AnimatePresence mode="wait">
                {activeSubject && SUBJECT_DETAILS[activeSubject] && (
                  <motion.div
                    key={activeSubject}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 bg-slate-950/50 rounded-2xl border border-slate-900 space-y-5"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">COURSE OVERVIEW</span>
                      <h5 className="text-sm font-black text-white uppercase">{activeSubject}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {SUBJECT_DETAILS[activeSubject].desc}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-2.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1">Core Modules</span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {SUBJECT_DETAILS[activeSubject].modules.map((mod, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                              <span>{mod}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2.5">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1">Target Competencies</span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {SUBJECT_DETAILS[activeSubject].skills.map((skill, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              <span>{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================== VISUAL ACCELERATED TIMELINE ================== */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">STUDENT TIMELINE</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">The EBM Student Pathway</h2>
          <p className="text-sm text-slate-400">Three progressive structural stages mapped over 36 months.</p>
        </div>

        <div className="relative border-l-2 border-blue-500/20 max-w-4xl mx-auto pl-6 sm:pl-8 space-y-12 py-4">
          
          {/* Timeline Node 1 */}
          <div className="relative">
            {/* Pulsing indicator node */}
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/10 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">STAGE 1: MONTHS 01-12</span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Accelerative Cognitive Foundations</h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Primary focus is language competence, vocabulary enrichment, and basic logic loops. Students learn to scan scientific papers quickly and develop mental arithmetic shortcuts to calculate fractions, percentages, and simple matrices without paper calculations.
              </p>
              <div className="flex flex-wrap gap-2 pt-1.5">
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Speed Reading 300+ WPM</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Modular pre-algebra</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Scientific diagnostics</span>
              </div>
            </div>
          </div>

          {/* Timeline Node 2 */}
          <div className="relative">
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/10 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">STAGE 2: MONTHS 13-24</span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Analytical Sciences & Formula Syntheses</h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Core physics, chemistry, and biology syllabi are introduced simultaneously to foster inter-disciplinary connections. Algebraic quadratic equations, trigonometric sine/cosine relations, and constitutional amendment analysis are deconstructed.
              </p>
              <div className="flex flex-wrap gap-2 pt-1.5">
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Kinematics & forces</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Stoichiometric Chemistry</span>
                <span className="px-2.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-bold rounded border border-slate-850 uppercase">Islamiyat & Pak Studies</span>
              </div>
            </div>
          </div>

          {/* Timeline Node 3 */}
          <div className="relative">
            <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/10 flex items-center justify-center animate-[pulse_2s_infinite]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">STAGE 3: MONTHS 25-36</span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Cambridge CIE Exam Mastery & Graduation</h3>
              <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                Intensive preparation for formal CIE examinations. Students analyze past paper questions from the previous 10 years, auditing examiners' feedback reports and logging errors in real time to secure A* ratings across all core metrics.
              </p>
              <div className="flex flex-wrap gap-2 pt-1.5">
                <span className="px-2.5 py-1 bg-slate-900 text-emerald-400/80 text-[10px] font-bold rounded border border-emerald-950/45 uppercase">10-Year series trial</span>
                <span className="px-2.5 py-1 bg-slate-900 text-emerald-400/80 text-[10px] font-bold rounded border border-emerald-950/45 uppercase">CIE rubrics compliance</span>
                <span className="px-2.5 py-1 bg-slate-900 text-emerald-400/80 text-[10px] font-bold rounded border border-emerald-950/45 uppercase">A* predictive threshold</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================== PEDAGOGY COMPARISON METRICS ================== */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">BENCHMARK COMPARISONS</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">EBM vs. Conventional Schools</h2>
          <p className="text-sm text-slate-400">Analyzing completion speed, active feedback loops, and learning efficiency.</p>
        </div>

        <div className="border border-blue-500/15 rounded-3xl overflow-hidden bg-[#03050a] shadow-xl max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-900 uppercase text-[9px] font-black tracking-widest">
                <tr>
                  <th className="py-4 px-6">Evaluation Metric</th>
                  <th className="py-4 px-6 text-blue-400 bg-blue-500/5 border-l border-r border-slate-900">EBM Accelerated Path</th>
                  <th className="py-4 px-6">Traditional School Systems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Completion Duration</td>
                  <td className="py-4 px-6 text-slate-300 font-extrabold bg-blue-500/5 border-l border-r border-slate-900">
                    <span className="text-blue-400 font-bold">~36 Months Total</span> <br />
                    <span className="text-[10px] text-slate-500 font-medium">Focused syllabus pathways</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <span>~84 Months Total (7 Years)</span> <br />
                    <span className="text-[10px] text-slate-500">Long repetitive revision cycles</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Pedagogical Center</td>
                  <td className="py-4 px-6 text-slate-300 font-extrabold bg-blue-500/5 border-l border-r border-slate-900">
                    <span className="text-white font-bold">Logical Proofs & Reading Speed</span> <br />
                    <span className="text-[10px] text-slate-500 font-medium">Syntax logic over memorizing</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <span>Rote Memorizing</span> <br />
                    <span className="text-[10px] text-slate-500">Repetitive worksheet grids</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Mentorship & Feedback</td>
                  <td className="py-4 px-6 text-slate-300 font-extrabold bg-blue-500/5 border-l border-r border-slate-900">
                    <span className="text-white font-bold">Expert Faculty + 24/7 AI Tutor</span> <br />
                    <span className="text-[10px] text-slate-500 font-medium">Instant granular checkpoint correction</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <span>1 Teacher to 35+ Students</span> <br />
                    <span className="text-[10px] text-slate-500">Delayed feedback cycle</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Student Accountability</td>
                  <td className="py-4 px-6 text-slate-300 font-extrabold bg-blue-500/5 border-l border-r border-slate-900">
                    <span className="text-white font-bold">Live Algorithmic Streaks</span> <br />
                    <span className="text-[10px] text-slate-500 font-medium">Daily dashboards & parent audits</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <span>Termly Report Cards</span> <br />
                    <span className="text-[10px] text-slate-500">Historical retro tracking</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================== FACULTY PORTFOLIOS ================== */}
      <section className="py-6 border-t border-slate-900">
        <TeacherTestimonials />
      </section>

      {/* ================== PROGRAM-SPECIFIC FAQs ================== */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-400">COMMON ENQUIRIES</span>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Syllabus Program FAQ</h2>
          <p className="text-sm text-slate-400">Answers to the most frequent parent and student queries.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isExpanded = faqExpanded[idx];
            return (
              <div 
                key={idx}
                className="bg-[#03050a] border border-blue-500/10 hover:border-blue-500/25 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  id={`btn-faq-toggle-${idx}`}
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <span className="text-sm font-black uppercase text-white tracking-tight">{faq.q}</span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-900">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================== ACCELERATED DIAGNOSTIC CTA ================== */}
      <section className="relative rounded-[32px] overflow-hidden text-center bg-gradient-to-b from-[#090f1d] to-[#03050a] border border-blue-500/15 p-8 sm:p-12 shadow-xl">
        <div className="absolute top-[-20%] left-[20%] w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 mb-2">
            <Compass className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Schedule a Diagnostic Learning Audit
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every prospective student undergoes a precise cognitive reading velocity and logical arithmetic diagnostic audit. Let's design their personalized accelerative path today.
          </p>

          <div className="pt-4">
            <button
              id="btn-schedule-diagnostic-audit"
              onClick={onEnterWorkspace}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-xl hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-blue-500/20 inline-flex items-center gap-2"
            >
              <span>Schedule Diagnostic Interview</span>
              <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
