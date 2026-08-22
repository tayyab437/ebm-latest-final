import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
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
  ChevronDown,
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
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen">
      
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-sky-100 shadow-sm">
        {/* Background Image */}
        <img
          src="/src/assets/images/analytics_hero_bg_1786525179105.jpg"
          alt="Analytics & Performance Dashboard Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#0076a5] shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>REAL-TIME EBM LEARNING ANALYTICS</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900"
              >
                From Marks to Meaning.<br />From Data to Action.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl"
              >
                EBM Analytics makes the learning process visible—helping teachers, learners and parents understand what was attempted, what was understood, where learning broke down, whether correction took place, what has been mastered, and what should happen next.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
                  onClick={handleScrollToReports}
                  className="bg-[#00a3e0] hover:bg-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-2xl shadow-lg shadow-cyan-500/20 transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>Explore EBM Analytics</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleSeeHowItWorks}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-2xl shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center"
                >
                  <span>See How It Works</span>
                </button>
              </motion.div>

              {/* Micro line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xs font-semibold text-slate-500/80 tracking-wide pt-2 flex flex-wrap items-center gap-x-3 gap-y-1"
              >
                <span>Clarity</span>
                <span className="text-slate-300">•</span>
                <span>Structure</span>
                <span className="text-slate-300">•</span>
                <span>Practice</span>
                <span className="text-slate-300">•</span>
                <span>Reflection</span>
                <span className="text-slate-300">•</span>
                <span>Confidence</span>
              </motion.div>
            </div>

            {/* Right Column: EBM Analytics Dashboard Visualizer */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-white/95 backdrop-blur-md border border-sky-100 shadow-xl rounded-[32px] p-6 sm:p-8 w-full max-w-md relative overflow-hidden"
              >
                {/* Visual Header */}
                <div className="border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">EBM Analytics Engine</span>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active</span>
                    </div>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800 mt-1.5 uppercase tracking-wide">EBM LEARNING EVIDENCE</h4>
                </div>

                {/* Dashboard Stepper Flow */}
                <div className="space-y-5 relative pl-6">
                  {/* Left decorative vertical path showing evidence-to-action pipeline */}
                  <div className="absolute left-2.5 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-sky-200" />

                  {/* 1. EVIDENCE BLOCK */}
                  <div className="relative">
                    <div className="absolute -left-[21.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-sky-500 border-4 border-white shadow flex items-center justify-center" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-sky-600">
                        <span>1. EVIDENCE GATHERED</span>
                        <span className="text-[9px] text-slate-400 font-medium lowercase">real-time inputs</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-left">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Attempted</span>
                          <span className="text-xl font-black text-slate-800 block mt-0.5">84%</span>
                          <div className="w-full bg-slate-200 h-1 rounded-full mt-2 overflow-hidden">
                            <div className="bg-sky-500 h-full rounded-full" style={{ width: "84%" }} />
                          </div>
                        </div>
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-left">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Understanding</span>
                          <div className="flex items-center space-x-1 mt-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-xs font-black text-emerald-700">Secure</span>
                          </div>
                          <span className="text-[8px] text-slate-400 mt-1 block font-medium">Standard proficiency met</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Indicator */}
                  <div className="text-[9px] font-extrabold text-sky-700 bg-sky-50 border border-sky-100/80 rounded-md py-0.5 px-2 w-fit -ml-1 flex items-center space-x-1 select-none">
                    <span>EVIDENCE</span>
                    <span className="text-sky-300">→</span>
                    <span>INSIGHT</span>
                  </div>

                  {/* 2. INSIGHT BLOCK */}
                  <div className="relative">
                    <div className="absolute -left-[21.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#764dbd] border-4 border-white shadow flex items-center justify-center" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#764dbd]">
                        <span>2. PROCESS INSIGHTS</span>
                        <span className="text-[9px] text-slate-400 font-medium lowercase">cognitive check</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-left">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Correction</span>
                          <div className="flex items-center space-x-1 mt-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                            <span className="text-xs font-black text-slate-800">Complete</span>
                          </div>
                          <span className="text-[8px] text-slate-400 mt-1 block font-medium">Active self-corrections</span>
                        </div>
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3 text-left">
                          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Mastery</span>
                          <div className="flex items-center space-x-1 mt-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#764dbd]" />
                            <span className="text-xs font-black text-[#764dbd]">Secure</span>
                          </div>
                          <span className="text-[8px] text-slate-400 mt-1 block font-medium">Concept fully locked</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Flow Arrow Indicator */}
                  <div className="text-[9px] font-extrabold text-[#764dbd] bg-purple-50 border border-purple-100 rounded-md py-0.5 px-2 w-fit -ml-1 flex items-center space-x-1 select-none">
                    <span>INSIGHT</span>
                    <span className="text-purple-300">→</span>
                    <span>NEXT ACTION</span>
                  </div>

                  {/* 3. NEXT ACTION BLOCK */}
                  <div className="relative">
                    <div className="absolute -left-[21.5px] top-1.5 w-4.5 h-4.5 rounded-full bg-amber-500 border-4 border-white shadow flex items-center justify-center" />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-amber-600">
                        <span>3. TARGETED ACTION</span>
                        <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">Automated Decision</span>
                      </div>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50/40 border border-amber-200/60 rounded-xl p-3 flex items-center justify-between text-left">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-black uppercase tracking-wider text-amber-600 block">Personalized Prescription</span>
                          <span className="text-sm font-black text-slate-800 block">Extension Practice</span>
                        </div>
                        <div className="bg-amber-500 text-white rounded-lg p-2 shrink-0 shadow-sm shadow-amber-500/20">
                          <Activity className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION: GO BEYOND SCORES (LEARNING PROCESS VISIBILITY) ================= */}
      <section id="analytics-process-diagnostic" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto space-y-14">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]"
            >
              <Brain className="w-3.5 h-3.5 text-[#764dbd]" />
              <span>Visible Learning Diagnostics</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
              Go Beyond Scores. See the Learning Process.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Every answer becomes evidence. Every mistake becomes an opportunity. EBM Analytics helps you understand what learners know, where they are struggling, whether learning has been corrected, and what should happen next.
            </motion.p>
          </div>

          {/* 6 Cards (3 x 2 Grid with Card #6 Visually Dominant) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 01 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#00a3e0] transition-colors font-mono">01</span>
                  <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a3e0]">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">What Was Attempted</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  See the questions, activities and learning tasks a learner has completed.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/60 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Activity & Engagement Trace</span>
              </div>
            </motion.div>

            {/* Card 02 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-500 transition-colors font-mono">02</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">What Was Understood</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Identify demonstrated understanding and independent performance.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/60 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demonstrated Comprehension</span>
              </div>
            </motion.div>

            {/* Card 03 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-rose-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-rose-500 transition-colors font-mono">03</span>
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Where Learning Broke Down</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Find recurring errors, misconceptions and learning barriers.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/60 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Error Diagnostic & Gaps</span>
              </div>
            </motion.div>

            {/* Card 04 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-[#764dbd] transition-colors font-mono">04</span>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#764dbd]">
                    <Sparkle className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">What Was Corrected</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  See whether mistakes were simply marked or genuinely repaired.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/60 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Metacognitive Repair & Feedback</span>
              </div>
            </motion.div>

            {/* Card 05 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-slate-50/80 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-300 group-hover:text-indigo-600 transition-colors font-mono">05</span>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">What Has Been Mastered</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Distinguish completed work from secure, independent mastery.
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/60 mt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Validated Retention & Fluency</span>
              </div>
            </motion.div>

            {/* Card 06 — VISUALLY DOMINANT */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-[#008fc7] via-[#0076a5] to-[#0b5171] text-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-cyan-900/20 border-2 border-cyan-300/40 relative overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Background ambient accents */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-cyan-200 font-mono">06</span>
                  <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                    <Zap className="w-3 h-3 text-amber-300" />
                    <span>Ultimate Purpose</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>What Happens Next</span>
                  <ChevronRight className="w-5 h-5 text-cyan-200 shrink-0" />
                </h3>
                
                <p className="text-cyan-50/95 text-sm sm:text-base leading-relaxed font-medium">
                  Turn evidence into the next teaching or learning action.
                </p>
              </div>

              <div className="pt-5 border-t border-white/20 mt-4 relative z-10 flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-cyan-200">Actionable Pedagogical Decisions</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= SECTION: EBM MASTERY VIEW ================= */}
      <section id="analytics-mastery-view" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-700"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>EBM Mastery Progression Engine</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight"
            >
              Know What Has Truly Been Mastered
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-600 font-medium text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              EBM distinguishes between encountering a skill, practising it, correcting mistakes, performing independently and truly mastering it.
            </motion.p>
          </div>

          {/* Interactive Mastery Visualization + Profile Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left/Main Column: 5-Stage Interactive Horizontal Progression */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Progression Matrix</span>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide mt-0.5">5 Stages of EBM Mastery</h3>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Interactive Stage Guide</span>
                </div>

                {/* Horizontal Stepper Flow (Clickable) */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 relative">
                  {[
                    { id: "introduced", label: "INTRODUCED", num: "01", color: "sky" },
                    { id: "practising", label: "PRACTISING", num: "02", color: "blue" },
                    { id: "correcting", label: "CORRECTING", num: "03", color: "purple" },
                    { id: "secure", label: "SECURE", num: "04", color: "emerald" },
                    { id: "mastered", label: "MASTERED", num: "05", color: "amber" },
                  ].map((stage, idx) => {
                    const isActive = activeMasteryStage === idx;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => setActiveMasteryStage(idx)}
                        className={`relative rounded-2xl p-2.5 sm:p-3 text-center transition-all duration-200 cursor-pointer border text-left flex flex-col justify-between h-24 sm:h-28 ${
                          isActive 
                            ? "bg-slate-900 text-white border-slate-900 shadow-md transform -translate-y-0.5" 
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-[10px] font-black font-mono ${isActive ? "text-cyan-300" : "text-slate-400"}`}>
                            {stage.num}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                          )}
                        </div>
                        <div>
                          <span className={`text-[9px] sm:text-[10px] font-black uppercase tracking-tight block leading-tight ${
                            isActive ? "text-white" : "text-slate-800"
                          }`}>
                            {stage.label}
                          </span>
                          <span className={`text-[8px] hidden sm:block mt-0.5 font-medium ${
                            isActive ? "text-slate-300" : "text-slate-400"
                          }`}>
                            {idx === 0 && "Encounter"}
                            {idx === 1 && "Fluency"}
                            {idx === 2 && "Repair"}
                            {idx === 3 && "Independent"}
                            {idx === 4 && "Transfer"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Connecting arrow track */}
                <div className="hidden sm:flex items-center justify-between px-6 text-slate-300 font-bold text-xs select-none">
                  <span>INTRODUCED</span>
                  <span>→</span>
                  <span>PRACTISING</span>
                  <span>→</span>
                  <span>CORRECTING</span>
                  <span>→</span>
                  <span>SECURE</span>
                  <span>→</span>
                  <span>MASTERED</span>
                </div>

                {/* Active Stage Deep-Dive Card */}
                <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-sky-100 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00a3e0]" />
                      <span className="text-xs font-black uppercase tracking-widest text-[#0076a5]">
                        Stage {activeMasteryStage + 1} Definition & Diagnostic Meaning
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">EBM Criterion</span>
                  </div>

                  {activeMasteryStage === 0 && (
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Introduced</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        The learner has encountered the concept or skill. Initial cognitive modeling and direct instruction provide the foundational framing.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">First exposure</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Teacher modeled</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Guided discovery</span>
                      </div>
                    </div>
                  )}

                  {activeMasteryStage === 1 && (
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Practising</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        The learner is building accuracy, fluency and understanding through repeated structured tasks with scaffolded guidance.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Active repetition</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Scaffolded prompts</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Fluency building</span>
                      </div>
                    </div>
                  )}

                  {activeMasteryStage === 2 && (
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Correcting</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        Errors or misconceptions are being repaired. The learner receives immediate diagnostic feedback and actively executes corrective steps.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Error diagnosis</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Misconception repair</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Re-attempt verification</span>
                      </div>
                    </div>
                  )}

                  {activeMasteryStage === 3 && (
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Secure</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        The learner performs accurately and independently without prompts or aids across standard benchmark assessments.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Independent execution</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Consistent accuracy</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">No teacher prompts</span>
                      </div>
                    </div>
                  )}

                  {activeMasteryStage === 4 && (
                    <div className="space-y-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Mastered</h4>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">
                        The learner can understand, apply, explain and transfer the skill with confidence across novel problems and interdisciplinary contexts.
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold text-slate-500">
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Deep conceptual understanding</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Skill transfer to novel contexts</span>
                        <span className="bg-white border border-slate-200 px-2 py-1 rounded-md">Can articulate & explain reasoning</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Right Column: EBM MASTERY PROFILE (Diagnostic Action Plan) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-5">
                
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Diagnostic Action Plan</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight mt-1">EBM MASTERY PROFILE</h3>
                  </div>
                  <div className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Live Status
                  </div>
                </div>

                {/* Table Visualization */}
                <div className="overflow-hidden border border-slate-200 rounded-2xl">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-3.5">Skill</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3.5 text-right">Next Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      
                      {/* Row 1: Fractions */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3.5 font-bold text-slate-900">
                          <span>Fractions</span>
                          <span className="block text-[9px] text-slate-400 font-medium">Number Operations</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Mastered
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 text-right">
                          <span className="inline-flex items-center space-x-1 font-bold text-[11px] text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-1 rounded-lg">
                            <span>Progress</span>
                            <ArrowRight className="w-3 h-3 text-blue-500" />
                          </span>
                        </td>
                      </tr>

                      {/* Row 2: Decimals */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3.5 font-bold text-slate-900">
                          <span>Decimals</span>
                          <span className="block text-[9px] text-slate-400 font-medium">Place Value & Models</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 border border-teal-200">
                            Secure
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 text-right">
                          <span className="inline-flex items-center space-x-1 font-bold text-[11px] text-purple-700 bg-purple-50 border border-purple-200/70 px-2.5 py-1 rounded-lg">
                            <span>Extension</span>
                            <ArrowRight className="w-3 h-3 text-purple-500" />
                          </span>
                        </td>
                      </tr>

                      {/* Row 3: Equations */}
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-3.5 font-bold text-slate-900">
                          <span>Equations</span>
                          <span className="block text-[9px] text-slate-400 font-medium">Algebraic Thinking</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                            Developing
                          </span>
                        </td>
                        <td className="py-3.5 px-3.5 text-right">
                          <span className="inline-flex items-center space-x-1 font-bold text-[11px] text-amber-800 bg-amber-50 border border-amber-200/70 px-2.5 py-1 rounded-lg">
                            <span>Correct + Practice</span>
                            <RefreshCw className="w-3 h-3 text-amber-600" />
                          </span>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Diagnostic Action Insight Box */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300">Targeted Diagnostic Rule</span>
                    <Activity className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    EBM connects every status directly to pedagogical prescription: <strong className="text-white">Developing</strong> skills trigger error repair, while <strong className="text-white">Secure</strong> skills immediately unlock higher-order extension tasks.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
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

          {/* Feature 2: Group Differentiation — EBM LEARNING GROUPS */}
          <div className="mb-24 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-10">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]">
                <Users className="w-3.5 h-3.5 text-[#764dbd]" />
                <span>EBM Learning Groups</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                Group Learners by Need, Not Just by Score
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium max-w-2xl mx-auto">
                EBM Analytics helps teachers identify learners who need different kinds of support—and allows those groups to change as new evidence emerges.
              </p>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-[#764dbd] bg-[#764dbd]/5 border border-[#764dbd]/15 px-4 py-2 rounded-xl inline-block">
                  The goal is not to rank students. The goal is to give each learner the right support at the right time.
                </p>
              </div>
            </div>

            {/* 4 Connected Learning-Group Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* GROUP A */}
              <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200/80 px-2.5 py-0.5 rounded-md uppercase font-mono">
                      GROUP A
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-emerald-700 transition-colors">
                      Ready to Progress
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Secure understanding and independent performance.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 mt-5 space-y-1 bg-emerald-50/40 rounded-xl p-3 border border-emerald-100/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                    Teacher Response
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    Move forward or provide extension.
                  </p>
                </div>
              </div>

              {/* GROUP B */}
              <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider text-sky-800 bg-sky-100/80 border border-sky-200/80 px-2.5 py-0.5 rounded-md uppercase font-mono">
                      GROUP B
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a3e0]">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#0076a5] transition-colors">
                      Needs More Practice
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      The concept is understood, but fluency is not yet secure.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 mt-5 space-y-1 bg-sky-50/40 rounded-xl p-3 border border-sky-100/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0076a5] block">
                    Teacher Response
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    Targeted practice and feedback.
                  </p>
                </div>
              </div>

              {/* GROUP C */}
              <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider text-[#764dbd] bg-purple-100/80 border border-purple-200/80 px-2.5 py-0.5 rounded-md uppercase font-mono">
                      GROUP C
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#764dbd]">
                      <Compass className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-[#764dbd] transition-colors">
                      Needs Reteaching
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      A misconception or knowledge gap is evident.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 mt-5 space-y-1 bg-purple-50/40 rounded-xl p-3 border border-purple-100/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#764dbd] block">
                    Teacher Response
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    Re-explain, model and check understanding.
                  </p>
                </div>
              </div>

              {/* GROUP D */}
              <div className="bg-slate-50/80 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-amber-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black tracking-wider text-amber-900 bg-amber-100/80 border border-amber-200/80 px-2.5 py-0.5 rounded-md uppercase font-mono">
                      GROUP D
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 tracking-tight group-hover:text-amber-800 transition-colors">
                      Needs Individual Intervention
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Difficulty remains after guided correction.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/70 mt-5 space-y-1 bg-amber-50/40 rounded-xl p-3 border border-amber-100/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 block">
                    Teacher Response
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    1:1 diagnosis and precise intervention.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Feature 3: EBM 1:1 INTERVENTION / STUDENT LEARNING RECORD */}
          <div className="mb-24 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-10">
            
            {/* Header & Main Two-Column Layout (30% Text / 70% Dashboard) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (Approx 30-35% on Desktop) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex items-center space-x-2 bg-[#764dbd]/10 border border-[#764dbd]/20 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#764dbd]">
                    <Target className="w-3.5 h-3.5 text-[#764dbd]" />
                    <span>1:1 EBM Intervention</span>
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                    What Exactly Is Blocking This Learner?
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium">
                    Open an individual learner profile to see more than an average score. The EBM Student Learning Record brings together the evidence a teacher needs to understand the learner, identify the real difficulty and intervene precisely.
                  </p>
                </div>

                {/* Supporting Motto Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Core Teaching Principle
                  </span>
                  <p className="text-sm font-black text-slate-800">
                    Observe carefully. Guide patiently.
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Technology supports the teacher's professional judgement—it does not replace human guidance.
                  </p>
                </div>

                {/* Evidence → Insight → Action Indicator */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
                      Evidence → Action Flow
                    </span>
                    <Activity className="w-3.5 h-3.5 text-cyan-300" />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start space-x-2">
                      <span className="text-[10px] font-mono font-bold bg-white/20 text-cyan-200 px-1.5 py-0.5 rounded shrink-0">EVID</span>
                      <span className="text-slate-300">Repeated execution errors</span>
                    </div>
                    <div className="flex justify-center text-cyan-400 text-xs">↓</div>
                    <div className="flex items-start space-x-2">
                      <span className="text-[10px] font-mono font-bold bg-white/20 text-amber-200 px-1.5 py-0.5 rounded shrink-0">INSI</span>
                      <span className="text-slate-300">Method understood, execution insecure</span>
                    </div>
                    <div className="flex justify-center text-cyan-400 text-xs">↓</div>
                    <div className="flex items-start space-x-2">
                      <span className="text-[10px] font-mono font-bold bg-white/20 text-emerald-200 px-1.5 py-0.5 rounded shrink-0">ACTN</span>
                      <span className="text-white font-bold">Targeted correction + reattempt</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Large EBM Student Learning Record Dashboard (Approx 65-70% on Desktop) */}
              <div className="lg:col-span-8 bg-slate-50/90 rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
                
                {/* 7. Dashboard Header */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#00a3e0]/10 border border-[#00a3e0]/20 flex items-center justify-center text-[#00a3e0] font-black text-base">
                      A
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                        EBM STUDENT LEARNING RECORD
                      </span>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <h3 className="text-base sm:text-lg font-black text-slate-900">Student: Ali</h3>
                        <span className="text-xs font-semibold text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-600">Grade 9</span>
                        <span className="text-xs font-semibold text-slate-400">•</span>
                        <span className="text-xs font-bold text-slate-600">Mathematics</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold text-slate-500">Status:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-900 border border-amber-200">
                      Developing
                    </span>
                  </div>
                </div>

                {/* 8. Dashboard Summary Row */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 text-left shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                      Questions Attempted
                    </span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">42</span>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 text-left shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                      Questions Correct
                    </span>
                    <span className="text-xl font-black text-emerald-600 mt-1 block">35</span>
                  </div>

                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 text-left shadow-xs">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight block">
                      Time Taken
                    </span>
                    <span className="text-xl font-black text-slate-900 mt-1 block">48 min</span>
                  </div>
                </div>

                {/* 9. Main Dashboard Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* A. STRENGTHS */}
                  <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                        A. Strengths
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Fractions</span>
                        <span className="text-[11px] text-slate-500 font-medium">Strong independent performance</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Number Sense</span>
                        <span className="text-[11px] text-slate-500 font-medium">Secure understanding</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-800">Problem Interpretation</span>
                        <span className="text-[11px] text-slate-500 font-medium">Consistent performance</span>
                      </div>
                    </div>
                  </div>

                  {/* B. RECURRING CHALLENGE */}
                  <div className="bg-white rounded-2xl p-4.5 border border-rose-200/80 bg-rose-50/20 shadow-xs space-y-3">
                    <div className="flex items-center justify-between border-b border-rose-100 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">
                        B. Recurring Challenge
                      </span>
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-black text-slate-900">Equations</h4>
                        <span className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                          Observed across 7 questions
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        The learner understands the basic method but makes repeated execution errors when solving multi-step equations.
                      </p>
                      <div className="pt-1 flex flex-wrap gap-2 text-[10px]">
                        <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded border border-amber-200">
                          Correction status: In progress
                        </span>
                        <span className="bg-white text-slate-700 font-semibold px-2 py-0.5 rounded border border-slate-200">
                          Response: Targeted correction + guided practice
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* C. TEACHER SUPPORT */}
                  <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                        C. Teacher Support
                      </span>
                      <UserCheck className="w-3.5 h-3.5 text-[#764dbd]" />
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Teacher intervention:</span>
                        <span className="font-bold text-slate-800">Guided explanation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Support provided:</span>
                        <span className="font-bold text-slate-800">Step-by-step modelling</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-100">
                        <span className="text-slate-500">Status:</span>
                        <span className="font-black text-amber-700">Recheck required</span>
                      </div>
                    </div>
                  </div>

                  {/* D. CORRECTION STATUS */}
                  <div className="bg-white rounded-2xl p-4.5 border border-slate-200/80 shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                        D. Correction Status
                      </span>
                      <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        Correction in progress
                      </span>
                    </div>
                    
                    {/* Visual Progression */}
                    <div className="grid grid-cols-6 gap-1 text-center py-1">
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-[9px] font-bold text-emerald-800 block">Attempt</span>
                        <span className="text-xs font-black text-emerald-600">✓</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-[9px] font-bold text-emerald-800 block">Identify</span>
                        <span className="text-xs font-black text-emerald-600">✓</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-[9px] font-bold text-emerald-800 block">Understand</span>
                        <span className="text-xs font-black text-emerald-600">✓</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                        <span className="text-[9px] font-bold text-emerald-800 block">Correct</span>
                        <span className="text-xs font-black text-emerald-600">✓</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 opacity-60">
                        <span className="text-[9px] font-bold text-slate-600 block">Reattempt</span>
                        <span className="text-xs font-black text-slate-400">○</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 opacity-60">
                        <span className="text-[9px] font-bold text-slate-600 block">Demonstrate</span>
                        <span className="text-xs font-black text-slate-400">○</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Feature 4 / Step 6: QUESTION-LEVEL LEARNING EVIDENCE */}
          <div className="mb-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-10">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                See What the Learner's Work Reveals
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-medium max-w-2xl mx-auto">
                A score can show that a learner is struggling. Question-level evidence helps reveal where understanding broke down, what kind of difficulty occurred, whether correction took place, and what should happen next.
              </p>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-[#764dbd] bg-[#764dbd]/5 border border-[#764dbd]/15 px-4 py-2 rounded-xl inline-block">
                  Every question becomes part of the learning record.
                </p>
              </div>
            </div>

            {/* 6. Realistic EBM Question Analysis Dashboard */}
            <div className="bg-slate-50/90 rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              
              {/* 7. Dashboard Header */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-[#764dbd] font-black text-base">
                    M
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                      EBM QUESTION ANALYSIS
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-xs">
                      <span className="font-black text-slate-900">Student: Maya</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-slate-600">Mathematics</span>
                      <span className="text-slate-300">•</span>
                      <span className="font-bold text-slate-600">Skill: Solving Multi-Step Equations</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                    Question #18
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-200">
                    Correction Required
                  </span>
                </div>
              </div>

              {/* 8. Question Area Preview */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                      QUESTION 18
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">Target Standard: Multi-step linear equations</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-500 block">Solve for x:</span>
                    <p className="text-lg font-mono font-black text-slate-900 tracking-wide">
                      3x + 7 = 22
                    </p>
                  </div>
                  <div className="text-left sm:text-right bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Learner Answer</span>
                    <span className="text-base font-mono font-black text-rose-600">x = 4</span>
                  </div>
                </div>
              </div>

              {/* 9 & 10. Third Row: Attempt Details & Error Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                
                {/* 9. ATTEMPT AREA (Left: 5 cols) */}
                <div className="md:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Attempt Summary
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">Attempt 1</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase">Response</span>
                        <span className="font-mono font-black text-slate-800 text-sm">x = 4</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
                        <span className="text-[10px] text-rose-600 font-bold block uppercase">Result</span>
                        <span className="font-black text-rose-700 text-sm">Incorrect</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="font-medium flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Time Taken</span>
                      </span>
                      <span className="font-black text-slate-800">1m 24s</span>
                    </div>
                  </div>

                  {/* 21. Micro-Chart: Recent Attempts */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                      Recent Attempts Progression
                    </span>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-rose-50/70 border border-rose-200/60">
                        <span className="font-bold text-rose-800">Attempt 1</span>
                        <span className="text-[10px] font-semibold text-rose-700">Incorrect (Initial)</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-amber-50/70 border border-amber-200/60">
                        <span className="font-bold text-amber-900">Attempt 2</span>
                        <span className="text-[10px] font-semibold text-amber-700">Corrected (Guided)</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-50/70 border border-emerald-200/60">
                        <span className="font-bold text-emerald-900">Attempt 3</span>
                        <span className="text-[10px] font-semibold text-emerald-700">Independent (Pending)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 10 & 11. RESPONSE / ERROR ANALYSIS & VIEW EVIDENCE (Right: 7 cols) */}
                <div className="md:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-purple-700">
                      What Happened?
                    </span>
                    <span className="text-[10px] font-bold bg-purple-50 text-[#764dbd] px-2 py-0.5 rounded-md border border-purple-200">
                      Diagnostic Breakdown
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    The learner applied the correct general method but made an execution error during the final step.
                  </p>

                  {/* Possible Learning Barrier */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                      Possible Learning Barrier
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-bold">Method</span>
                        <span className="font-black text-emerald-700 text-[11px]">Understood</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-amber-200 bg-amber-50/30">
                        <span className="text-[10px] text-amber-700 block font-bold">Execution</span>
                        <span className="font-black text-amber-800 text-[11px]">Developing</span>
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-bold">Independence</span>
                        <span className="font-black text-slate-600 text-[11px]">Not yet secure</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      Identified as an <strong>execution error</strong> rather than a conceptual misunderstanding or missing prerequisite.
                    </p>
                  </div>

                  {/* 11. VIEW EVIDENCE Expandable Panel */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setIsEvidenceExpanded(!isEvidenceExpanded)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-2">
                        <Eye className="w-3.5 h-3.5 text-purple-600" />
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                          View Work Evidence
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-purple-700 font-bold">
                        <span>{isEvidenceExpanded ? "Collapse" : "Expand"}</span>
                        {isEvidenceExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isEvidenceExpanded && (
                      <div className="p-3.5 bg-white border-t border-slate-200 text-xs space-y-2 animate-fadeIn">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Attempt:</span>
                          <span className="font-mono font-bold text-rose-600">x = 4 (from 3x = 15)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-medium">Expected:</span>
                          <span className="font-mono font-bold text-emerald-700">x = 5 (15 ÷ 3 = 5)</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-100 text-slate-600">
                          <span className="font-bold text-slate-700">Observed issue:</span> Final arithmetic step was incorrect (division calculated as 4 instead of 5).
                        </div>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* 12 & 13. Fourth Row: Correction Status & Reflection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* 12. CORRECTION STATUS */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                      Correction Status
                    </span>
                    <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      In Progress
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    Learner is progressing through the structured EBM error repair sequence:
                  </p>

                  {/* 6-Stage Visual Progression */}
                  <div className="grid grid-cols-6 gap-1 text-center py-1">
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[9px] font-bold text-emerald-800 block">Attempt</span>
                      <span className="text-xs font-black text-emerald-600">✓</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[9px] font-bold text-emerald-800 block">Identify</span>
                      <span className="text-xs font-black text-emerald-600">✓</span>
                    </div>
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-[9px] font-bold text-emerald-800 block">Understand</span>
                      <span className="text-xs font-black text-emerald-600">✓</span>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200">
                      <span className="text-[9px] font-bold text-amber-900 block">Correct</span>
                      <span className="text-xs font-black text-amber-600">○</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 opacity-60">
                      <span className="text-[9px] font-bold text-slate-600 block">Reattempt</span>
                      <span className="text-xs font-black text-slate-400">○</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-100 border border-slate-200 opacity-60">
                      <span className="text-[9px] font-bold text-slate-600 block">Demonstrate</span>
                      <span className="text-xs font-black text-slate-400">○</span>
                    </div>
                  </div>
                </div>

                {/* 13. LEARNER REFLECTION */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3.5 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                        Learner Reflection
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Reflection recorded
                      </span>
                    </div>

                    <div className="p-3 bg-purple-50/40 border border-purple-100 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 block uppercase tracking-wider">
                        Prompt: "What did I need to do differently?"
                      </span>
                      <p className="text-xs italic text-slate-800 font-medium">
                        "I made the mistake when completing the final step."
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-medium">Self-awareness recorded</span>
                    <button
                      type="button"
                      onClick={() => setIsReflectionOpen(!isReflectionOpen)}
                      className="text-xs font-bold text-[#0076a5] hover:underline"
                    >
                      {isReflectionOpen ? "Hide Details" : "View reflection →"}
                    </button>
                  </div>

                  {isReflectionOpen && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                      <p><strong>Reflection Stage:</strong> Error recognition & conceptual clarification</p>
                      <p><strong>Student Note:</strong> "I subtracted 7 correctly to get 15, but then divided 15 by 3 and wrote 4 instead of 5."</p>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* 16. THE EVIDENCE CHAIN (Horizontal / Responsive Flow) */}
            <div className="pt-4 space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                  The EBM Evidence Pipeline
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                  7-Stage Question-Level Learning Chain
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
                {[
                  { num: "01", title: "Question", desc: "What was being assessed?" },
                  { num: "02", Attempt: "Attempt", title: "Attempt", desc: "What did the learner do?" },
                  { num: "03", title: "Response", desc: "What answer or work was produced?" },
                  { num: "04", title: "Error", desc: "Where did performance break down?" },
                  { num: "05", title: "Correction", desc: "Was the error understood and repaired?" },
                  { num: "06", title: "Reflection", desc: "What did the learner recognise?" },
                  { num: "07", title: "Reattempt", desc: "Can the learner now perform independently?" },
                ].map((step, idx) => (
                  <div 
                    key={step.num} 
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between space-y-2 ${
                      idx === 6 
                        ? "bg-emerald-50/60 border-emerald-200" 
                        : idx === 3
                        ? "bg-rose-50/40 border-rose-200"
                        : "bg-slate-50 border-slate-200/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black font-mono text-slate-400">{step.num}</span>
                      <span className="text-[9px] font-bold uppercase text-slate-400">Step</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">{step.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 17. Section Message */}
            <div className="text-center max-w-2xl mx-auto py-2 space-y-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                From "wrong" to "why" to "what next."
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                EBM Analytics turns question-level evidence into a clearer understanding of the learner's needs and a more precise next action.
              </p>
            </div>

            {/* 31. Transition to Next Section (Correction Cycle) */}
            <div className="pt-6 border-t border-slate-100 text-center">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl">
                <span>Evidence tells us what happened.</span>
                <span className="text-[#764dbd] font-black">Correction helps turn it into learning.</span>
              </div>
            </div>

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

          {/* ================= THREE CORE QUESTIONS ================= */}
          <div className="space-y-6 pt-4">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                THE CONCEPTUAL FRAMEWORK
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Three Questions Behind Every Learning Action
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 01 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4 text-left flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-[#0076a5] font-black font-mono text-sm flex items-center justify-center">
                    01
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    WHERE IS THE LEARNER NOW?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Establish the current level of understanding, performance and independence.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#0076a5] uppercase tracking-wider">
                    Diagnostic Baseline
                  </span>
                </div>
              </div>

              {/* Card 02 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4 text-left flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-[#764dbd] font-black font-mono text-sm flex items-center justify-center">
                    02
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    WHAT IS PREVENTING PROGRESS?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Identify the misconception, missing prerequisite, weak process or application barrier.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-[#764dbd] uppercase tracking-wider">
                    Barrier Identification
                  </span>
                </div>
              </div>

              {/* Card 03 */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4 text-left flex flex-col justify-between hover:border-slate-300 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 font-black font-mono text-sm flex items-center justify-center">
                    03
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    WHAT SHOULD HAPPEN NEXT?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Choose the next action: teach, practise, correct, reflect, reassess, extend or progress.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    Targeted Next Step
                  </span>
                </div>
              </div>

            </div>

            {/* Visual Sequential Flow Indicator */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-center">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-black text-slate-700">
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">WHERE IS THE LEARNER NOW?</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">WHAT IS PREVENTING PROGRESS?</span>
                <span className="text-slate-400">→</span>
                <span className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">WHAT SHOULD HAPPEN NEXT?</span>
                <span className="text-[#0076a5]">→</span>
                <span className="bg-[#0076a5] text-white px-2.5 py-1 rounded-lg shadow-2xs">ACTION</span>
                <span className="text-[#0076a5]">→</span>
                <span className="bg-purple-100 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-200">NEW EVIDENCE</span>
                <span className="text-[#764dbd]">→</span>
                <span className="text-[#764dbd] font-black uppercase tracking-wider">LOOP CONTINUES</span>
              </div>
            </div>

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
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-[#0096db]" />
                  <h4 className="text-sm font-extrabold text-slate-800">Teacher Success Spotlight</h4>
                </div>
                <button 
                  onClick={() => setSelectedTestimonialForModal(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-full transition text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-4 text-left">
                  <div className="w-14 h-14 rounded-full bg-[#0096db] flex items-center justify-center shrink-0 shadow-md">
                    <Quote className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-lg leading-snug">{selectedTestimonialForModal.name}</h5>
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
  );
}
