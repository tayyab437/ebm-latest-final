import React, { useState } from "react";
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
  Quote
} from "lucide-react";

export function AnalyticsPage() {
  const [activeReport, setActiveReport] = useState<"class" | "group" | "student">("class");
  const [selectedStudent, setSelectedStudent] = useState<string | null>("Molly");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  const [centerIndex, setCenterIndex] = useState(1);
  const [selectedTestimonialForModal, setSelectedTestimonialForModal] = useState<any | null>(null);

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
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-sky-100 shadow-sm">
        {/* Background Image */}
        <img
          src="/src/assets/images/analytics_hero_bg_1786525179105.jpg"
          alt="Analytics & Performance Dashboard Background"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-[#00a3e0]/10 border border-[#00a3e0]/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0076a5] mx-auto shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Real-Time EBM Learning Analytics</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-slate-900"
          >
            EBM Analytics Hub
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pb-8"
          >
            Discover EBM Analytics: precision data insights and automated student grouping to maximize every minute of class time.
          </motion.p>
        </div>
      </section>

      {/* ================= MAIN INTERACTIVE REPORT INTERFACE ================= */}
      <main className="max-w-6xl mx-auto px-4 -mt-16 relative z-20 pb-20">
        
        {/* Main Content Box containing Features */}
        <div className="bg-[#f7f8fc] rounded-[40px] p-6 sm:p-12 shadow-xl border border-slate-100 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-base sm:text-lg leading-relaxed text-slate-700 font-medium">
              EBM's reports show you precisely what your class knows and is ready to learn next.<br className="hidden sm:inline" />
              Save time planning and make confident instructional decisions that accelerate growth.
            </p>
          </div>

          {/* Feature 1: Whole Class Instruction */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                <img 
                  alt="Standards Proficiency Report" 
                  className="w-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPNbblg50GbBPtxWBbhPJAvoo4UZiYnjSB4zQGuE53ick3-o_gYPAkbynnUYrxIEttTBprXyHRP_5fx0Y-1vqJQgteKyBY9nMEQmVP23-B-3YolIgX38pMw55b82-AgJQG8BfaD4JBKBThpEhmlLzb1dq6NIN9S_bakn2ygsFyEsLVGg3YhP3xdp9_o47o7nsppB_j9tOla90etZCEr2Xgfvb5GWBuG5xMKj6O8WXChwuW75U5TdBVuaMyWsWdcNVQ7Jg" 
                  style={{ height: "300px", objectPosition: "left center" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#764dbd]">Class Insights</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#764dbd] leading-tight">
                Whole-class instruction:<br />What should I teach next?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Track progress to proficiency across state standards—by class, skill, or student. Quickly see what your class understands, and where reteaching will have the biggest impact.
              </p>
            </div>
          </div>

          {/* Feature 2: Small Group Differentiation */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                <img 
                  alt="Trouble Spots Report" 
                  className="w-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyBsmXcbCoB7SeGbFbHs1JWGv2aV9mT8ykVw85yYFAmHbbFE8krbLgdklfQAOp1QKU2d5cj8jX5GjJyP_UBAfijxCt585_4Z-79RJLjjGcg2ZSp_jzdA-Sikr-XwpTnRgT61-ulnpQMXqdsjgYBv6mhG8ePNe3gtqxDNfavoCLzEPFr4xhFYbWdkHST3cxB3NuwH6MBwjLs6QkC3Y4sBQVkSDEvy3Dp1nu9tZqXTZ0qz0efscdMf62MpIjK3onnSYo_aU" 
                  style={{ height: "300px", objectPosition: "right top" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#764dbd]">Group Differentiation</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#764dbd] leading-tight">
                Small group differentiation:<br />Who needs reteaching, and on what?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Instantly view pre-formed small groups and the question types students are missing. Spend less time sorting data and more time targeting instruction.
              </p>
            </div>
          </div>

          {/* Feature 3: Questions Log Intervention */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                <img 
                  alt="Questions Log" 
                  className="w-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr0yKDRQMa_fNWu0dW2Pt7Bzh6QJh5qJBj0RTNm1c3G1oOxNceaZ4Y2kP9el1Bd2k2sNB-Qh2UU8LoIyzzE0ql5MOlTAusVoudyweKityWV3-hyBirLyYm-hF5aQcEGG_BiKJ52PHIYXAAjEcgXOj0y8KmLUDjO0nmnQSVnc2I5jhHAKzApu1eEDzHwrTWUlubOK_Qv0BbMn0FJlWwvyP_Rg8eKro-rrU6TXwNYbw8wvpZkWe9tRL4NhDJp5T0YJi2ZgM" 
                  style={{ height: "300px", objectPosition: "left center" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#764dbd]">1:1 Intervention</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#764dbd] leading-tight">
                1:1 intervention:<br />What misconception is blocking this student?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Review every question a student has answered and pinpoint misconceptions fast. Built-in tools help you streamline review sessions.
              </p>
            </div>
          </div>

          {/* Feature 4: Progress Sharing */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-8">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative group overflow-hidden rounded-2xl shadow-lg border border-slate-200">
                <img 
                  alt="Student Summary" 
                  className="w-full object-cover group-hover:scale-102 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBn6GlVp_1EhJjM7QZR4SrY3zmfDeO32ns-AWN-mI_d2-Kyj-gvR_rv8LNVGUnL7flf4F_IB3_LYShcwl6yBbVali-tVSAXb7d-wxbRozgf1L-ygeMcG5bLljCccpyU1Sq5h81IvFuiE4HWcliVX_D1aP3im4V7xMiRCdXyXQcLkeNJ5g6qh9vnD8Cp4ENhoC6o9Ux_nE2KPHIffcPoHI6XKdviKbCHrfKlOxLmL3MVokecn10aez7Un81y_yWRTvH3c0Y" 
                  style={{ height: "300px", objectPosition: "right bottom" }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent pointer-events-none" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#764dbd]">Growth Reports</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#764dbd] leading-tight">
                Progress sharing:<br />How do I show student growth to families and administrators?
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Share ready-to-go progress reports that highlight students' achievements and support at-home learning. Make parent-teacher conferences more productive and data-driven with clear, structured visualization indicators.
              </p>
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

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="bg-white py-20 pb-32 px-4 select-none relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0096db] mb-12 tracking-tight">
            See how teachers are using EBM Analytics
          </h2>
          
          <div className="relative flex items-center justify-between gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Left navigation chevron */}
            <button 
              onClick={() => setCenterIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer shrink-0 z-20"
              id="testimonial-prev"
              title="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-[#0096db]" />
            </button>

            {/* Testimonial cards grid */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch py-8 relative">
              {[leftIndex, middleIndex, rightIndex].map((idx, position) => {
                const t = testimonials[idx];
                const isMiddle = position === 1;
                
                return (
                  <motion.div
                    key={t.name + "-" + position}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: position * 0.05 }}
                    className={`bg-white rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border border-slate-100 relative ${
                      isMiddle 
                        ? "shadow-xl border-blue-200/60 -translate-y-2 md:-translate-y-6 scale-[1.02] z-10" 
                        : "shadow-md opacity-100 md:opacity-75 hover:opacity-100 hover:scale-[1.01] hidden md:flex"
                    }`}
                  >
                    <div className="space-y-5">
                      {/* Card Header */}
                      <div className="flex items-start gap-4 text-left">
                        {/* Quote Icon circle */}
                        <div className="w-12 h-12 rounded-full bg-[#0096db] flex items-center justify-center shrink-0 shadow-sm shadow-[#0096db]/25">
                          <Quote className="w-5 h-5 text-white fill-white" />
                        </div>
                        {/* Meta Info */}
                        <div className="space-y-0.5">
                          <h4 className="font-extrabold text-slate-850 text-base leading-snug">{t.name}</h4>
                          <p className="text-slate-500 text-[11px] font-semibold leading-tight">
                            {t.role},
                          </p>
                          <p className="text-slate-500 text-[11px] font-medium leading-tight">
                            {t.school}, {t.location}
                          </p>
                        </div>
                      </div>

                      {/* Divider line */}
                      <div className={`border-b ${isMiddle ? "border-[#0096db] border-[1.5px]" : "border-slate-150"}`} />

                      {/* Card Body */}
                      <p className="text-slate-600 text-[13px] leading-relaxed text-left min-h-[140px]">
                        {t.quote}
                      </p>
                    </div>

                    {/* Footer - "Read more testimonials ›" link */}
                    <button
                      onClick={() => setSelectedTestimonialForModal(t)}
                      className="text-[#0096db] hover:text-blue-700 hover:underline font-bold text-xs mt-6 text-left self-start cursor-pointer flex items-center gap-0.5"
                    >
                      Read more testimonials <span className="text-sm font-semibold">›</span>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Right navigation chevron */}
            <button 
              onClick={() => setCenterIndex((prev) => (prev + 1) % testimonials.length)}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer shrink-0 z-20"
              id="testimonial-next"
              title="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-[#0096db]" />
            </button>
          </div>

          {/* Dots pagination indicator */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCenterIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === centerIndex ? "bg-[#0096db] w-6" : "bg-blue-200/60 hover:bg-[#0096db]/50 w-2.5"
                }`}
                title={`Go to testimonial page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER SECTION ================= */}
      <section className="bg-gradient-to-r from-[#0092c4] to-[#443899] py-16 px-4 text-center text-white relative">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-4.5xl font-black tracking-tight leading-tight">
            Make confident decisions for every student, every day.
          </h2>
          <button className="bg-white text-[#0092c4] font-black text-lg px-12 py-4 rounded-full shadow-xl hover:bg-slate-50 hover:shadow-2xl transition-all cursor-pointer">
            Join EBM today
          </button>
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
