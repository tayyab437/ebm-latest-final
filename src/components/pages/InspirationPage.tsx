import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SEOHead } from "../SEOHead";
const inspirationHeroBg = "/inspiration-hero-bg-opt.webp";
import { 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Trophy, 
  Video, 
  Users, 
  Download, 
  ArrowRight, 
  Lightbulb, 
  GraduationCap, 
  Compass, 
  FileText, 
  Layout, 
  Award, 
  Rocket, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  FileUp, 
  Library, 
  Presentation, 
  ClipboardList, 
  Settings, 
  Sparkle, 
  Heart, 
  Flame, 
  ShieldCheck,
  X,
  FileCheck,
  UserCheck
} from "lucide-react";

// Subcategory structures for interactive navigation
type SubCategory = "welcome" | "toolkit" | "admin" | "strategies" | "pd" | "get-started" | "printables" | "parent-analytics";

interface ResourceCard {
  title: string;
  description: string;
  ctaText: string;
  icon: React.ReactNode;
}

export function InspirationPage() {
  const [activeGroup, setActiveGroup] = useState<"educators" | "families">("educators");
  const [activeSub, setActiveSub] = useState<SubCategory>("welcome");
  const [selectedResource, setSelectedResource] = useState<ResourceCard | null>(null);

  // Replicating EBM Welcome columns
  const greenResources: ResourceCard[] = [
    {
      title: "Teacher Toolkit",
      description: "New to the EBM Ecosystem? These essential resources will help you and your students hit the ground running with 2-Sigma acceleration!",
      ctaText: "Go to toolkit",
      icon: <Rocket className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Classroom Instruction",
      description: "See how you can use EBM's fun, high-frequency diagnostic and interactive tools to strengthen lesson pacing and conceptual retention.",
      ctaText: "Explore features",
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Printable Resources",
      description: "Get beautiful physical materials, student progress logs, and reward certificates to motivate and celebrate major milestone completions!",
      ctaText: "Download printables",
      icon: <FileText className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "EBM Learning Blog",
      description: "Stay up-to-date with pedagogical announcements, cognitive research findings, load balancing tips, and practical classroom tricks.",
      ctaText: "Get the scoop",
      icon: <Presentation className="w-6 h-6 text-emerald-600" />
    },
    {
      title: "Summer Brain Boosters",
      description: "Keep students sharp and prevent cognitive regression over the summer break with targeted, gamified weekly challenge sheets.",
      ctaText: "Explore resources",
      icon: <Flame className="w-6 h-6 text-emerald-600" />
    }
  ];

  const blueResources: ResourceCard[] = [
    {
      title: "Implementation Guides",
      description: "Get practical ideas for simple ways to seamlessly integrate EBM's accelerated roadmap into your school's daily scheduled sessions.",
      ctaText: "View the guides",
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Diagnostic Resources",
      description: "Learn how to use EBM's real-time Diagnostic Arena to pinpoint student knowledge gaps down to the exact sub-topic level.",
      ctaText: "Learn how to use it",
      icon: <Compass className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Case Studies & Efficacy",
      description: "Read peer-reviewed case studies of classrooms achieving Grade 5 to O-Level acceleration within three years.",
      ctaText: "Hear the stories",
      icon: <Library className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Elite 100 Teachers",
      description: "Get inspired by success stories and pedagogical strategies from top-performing EBM certified educators globally.",
      ctaText: "Meet the Elite 100",
      icon: <Award className="w-6 h-6 text-blue-600" />
    }
  ];

  const purpleResources: ResourceCard[] = [
    {
      title: "Professional Development",
      description: "Let our cognitive architects and senior master trainers help your school staff transition to accelerated, self-paced mastery models.",
      ctaText: "View PD options",
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />
    },
    {
      title: "EBM Minis (Quick Tips)",
      description: "Short 2-minute video clips showing how to unlock advanced math topics for younger students without overwhelm.",
      ctaText: "Watch now",
      icon: <Video className="w-6 h-6 text-purple-600" />
    },
    {
      title: "Interactive Webinars",
      description: "Register for free live webinars led by master educators on maximizing classroom engagement and diagnostic monitoring.",
      ctaText: "Register today",
      icon: <Calendar className="w-6 h-6 text-purple-600" />
    },
    {
      title: "EBM Live Workshops",
      description: "Become an instant expert on the Ejaz Bukhari Method in our full-day, hands-on masterclasses and collaborative clinics.",
      ctaText: "Find an event",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />
    }
  ];

  // Helper to switch main tabs
  const handleGroupSwitch = (group: "educators" | "families") => {
    setActiveGroup(group);
    setActiveSub(group === "educators" ? "welcome" : "get-started");
  };

  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 min-h-screen font-sans pb-16 transition-colors duration-200">
      <SEOHead 
        title="EBM Inspiration & STEM Resources | Educator & Parent Tools"
        description="Access curated teaching strategies, downloadable learning toolkits, printable exercises, and classroom implementation guides from the EBM ecosystem."
        canonicalUrl="https://ejazbukharimethod.com/inspiration"
      />
      {/* ================= HEADER SECTION ================= */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-sky-100 shadow-sm text-center min-h-[320px] flex flex-col justify-center items-center">
        {/* Background Image */}
        <img
          src={inspirationHeroBg}
          alt="EBM Inspiration & Resources Background"
          width="800"
          height="416"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />

        {/* Light Overlay / Glass Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-sky-50/90 to-white/85 backdrop-blur-[2px]" />

        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-sky-100 dark:bg-sky-950/60 border border-sky-300 dark:border-sky-800 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-sky-900 dark:text-sky-200 mx-auto shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Ecosystem Inspiration Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight leading-tight text-slate-900">
            EBM Inspiration & Resources
          </h1>
          <p className="text-slate-700 dark:text-slate-200 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Explore premium pedagogical tools, lesson structures, and acceleration guides designed to maximize student velocity in the Ejaz Bukhari Method.
          </p>
        </div>
      </section>

      {/* ================= SUB-NAVIGATION TABS ================= */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm transition-colors duration-200 min-h-[114px]">
        <div className="max-w-5xl mx-auto px-4">
          {/* Main groups toggler */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleGroupSwitch("educators")}
              className={`flex-1 py-4 text-center font-bold text-sm md:text-base border-b-2 transition cursor-pointer ${
                activeGroup === "educators"
                  ? "border-blue-700 text-blue-700 dark:text-blue-400 font-extrabold"
                  : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              For Educators
            </button>
            <button
              onClick={() => handleGroupSwitch("families")}
              className={`flex-1 py-4 text-center font-bold text-sm md:text-base border-b-2 transition cursor-pointer ${
                activeGroup === "families"
                  ? "border-blue-700 text-blue-700 dark:text-blue-400 font-extrabold"
                  : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`}
            >
              For Families
            </button>
          </div>

          {/* Subcategories checklist nav */}
          <div className="flex space-x-1 md:space-x-3 overflow-x-auto scrollbar-hide py-3 text-xs md:text-sm font-semibold min-h-[58px] items-center">
            {activeGroup === "educators" ? (
              <>
                {[
                  { id: "welcome", label: "Welcome Hub" },
                  { id: "toolkit", label: "Teacher Toolkit" },
                  { id: "admin", label: "Admin Resource Center" },
                  { id: "strategies", label: "Implementation Strategies" },
                  { id: "pd", label: "Professional Development" },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(sub.id as SubCategory)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition cursor-pointer ${
                      activeSub === sub.id
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </>
            ) : (
              <>
                {[
                  { id: "get-started", label: "Get Started Guide" },
                  { id: "printables", label: "Printables & Routines" },
                  { id: "parent-analytics", label: "Parent Analytics Hub" },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSub(sub.id as SubCategory)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap transition cursor-pointer ${
                      activeSub === sub.id
                        ? "bg-blue-600 text-white shadow-sm font-bold"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= VIEWPORT CONTENT ================= */}
      <div className="max-w-5xl mx-auto px-4 mt-10 min-h-[600px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSub}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* ================= WELCOME HUB ================= */}
            {activeSub === "welcome" && (
              <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                    EBM Educator Resources
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    Designed around cognitive load science to help school teachers and tutors fast-track curriculum milestones with maximum retention.
                  </p>
                </div>

                {/* 3-Column Branded Grid for EBM welcome columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                  
                  {/* Column 1: Green Items - Toolkit & Engagement */}
                  <div className="bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-3xl p-6 space-y-6 shadow-xs relative pt-16">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white p-4 rounded-2xl shadow">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <div className="text-center pb-2 border-b border-emerald-200 dark:border-emerald-900/40">
                      <h3 className="font-bold text-emerald-900 dark:text-emerald-300 text-lg">Toolkit & Engagement</h3>
                      <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 block uppercase tracking-wider font-bold">Fast-start essentials</span>
                    </div>
                    <div className="space-y-4">
                      {greenResources.map((res, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedResource(res)}
                          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-xs hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-emerald-100 dark:bg-emerald-950 p-2.5 rounded-xl flex-shrink-0">
                              {res.icon}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition">
                                {res.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {res.description}
                              </p>
                              <span className="text-xs text-emerald-800 dark:text-emerald-300 font-bold inline-flex items-center gap-1 mt-1">
                                {res.ctaText} <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Blue Items - Implementation & Diagnostics */}
                  <div className="bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-3xl p-6 space-y-6 shadow-xs relative pt-16">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white p-4 rounded-2xl shadow">
                      <FileUp className="w-8 h-8" />
                    </div>
                    <div className="text-center pb-2 border-b border-blue-200 dark:border-blue-900/40">
                      <h3 className="font-bold text-blue-900 dark:text-blue-300 text-lg">Pacing & Diagnostics</h3>
                      <span className="text-[11px] font-mono text-blue-800 dark:text-blue-300 block uppercase tracking-wider font-bold">Classroom execution</span>
                    </div>
                    <div className="space-y-4">
                      {blueResources.map((res, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedResource(res)}
                          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-xs hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-blue-100 dark:bg-blue-950 p-2.5 rounded-xl flex-shrink-0">
                              {res.icon}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition">
                                {res.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {res.description}
                              </p>
                              <span className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 mt-1">
                                {res.ctaText} <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 3: Purple Items - Professional Development */}
                  <div className="bg-purple-50/70 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 rounded-3xl p-6 space-y-6 shadow-xs relative pt-16">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white p-4 rounded-2xl shadow">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div className="text-center pb-2 border-b border-purple-200 dark:border-purple-900/40">
                      <h3 className="font-bold text-purple-900 dark:text-purple-300 text-lg">Professional Training</h3>
                      <span className="text-[11px] font-mono text-purple-800 dark:text-purple-300 block uppercase tracking-wider font-bold">Methodology training</span>
                    </div>
                    <div className="space-y-4">
                      {purpleResources.map((res, index) => (
                        <div 
                          key={index}
                          onClick={() => setSelectedResource(res)}
                          className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-purple-100 dark:border-slate-800 shadow-xs hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="bg-purple-100 dark:bg-purple-950 p-2.5 rounded-xl flex-shrink-0">
                              {res.icon}
                            </div>
                            <div className="space-y-1">
                              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition">
                                {res.title}
                              </h4>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                {res.description}
                              </p>
                              <span className="text-xs text-purple-800 dark:text-purple-300 font-bold inline-flex items-center gap-1 mt-1">
                                {res.ctaText} <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Callout Banner for EBM Masterclass */}
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block font-bold">Interactive Educational Workshops</span>
                    <h3 className="text-2xl font-bold font-serif">Join us at EBM Live: Professional Masterclass!</h3>
                    <p className="text-xs text-slate-200 max-w-xl leading-normal">
                      Learn the cognitive load balance science directly from Ejaz Bukhari and our team of senior curriculum architects in Pakistan and internationally.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedResource({
                      title: "EBM Live Masterclass Inquiry",
                      description: "EBM Live sessions cover detailed lesson plan load balancing, syntactic mathematics representation, and ocular reading protocols. Please request institutional booking packages below.",
                      ctaText: "Inquire about workshops",
                      icon: <Sparkles className="w-6 h-6 text-purple-600" />
                    })}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition shrink-0 shadow cursor-pointer"
                  >
                    Request Workshop Booking
                  </button>
                </div>
              </div>
            )}

            {/* ================= TEACHER TOOLKIT ================= */}
            {activeSub === "toolkit" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Teacher Toolkit</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Hit the ground running with EBM's curated starting materials.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Get Started Guide for Educators", desc: "Step-by-step PDF manual on structuring accelerated daily classroom sessions.", icon: <FileText className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "Syllabus Checklist Template", desc: "Printable year-wise milestone charts to keep track of Grade 5 to O-Level acceleration.", icon: <ClipboardList className="text-blue-700 dark:text-blue-400" /> },
                    { title: "EBM Classroom Posters", desc: "High-resolution graphic printables featuring mathematical syntax keys and ocular focus patterns.", icon: <Layout className="text-purple-700 dark:text-purple-400" /> },
                    { title: "Quick-Start Session Slides", desc: "A sleek slide deck to introduce students and co-teachers to EBM's self-paced philosophy.", icon: <Presentation className="text-amber-700 dark:text-amber-400" /> },
                    { title: "Student Goal Tracking Sheets", desc: "Custom physical tracking logs to encourage independent milestone logging.", icon: <CheckCircle2 className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "EBM Method Handbook", desc: "Deep-dive theoretical guide explaining the neuroscientific foundations of 3-year acceleration.", icon: <Library className="text-blue-700 dark:text-blue-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          Download Resource <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= ADMIN RESOURCE CENTER ================= */}
            {activeSub === "admin" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Admin Resource Center</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Empower school administrators with high-fidelity program oversight.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Administrator Onboarding Blueprint", desc: "A complete governance framework on scheduling, load balancing, and curriculum adjustments.", icon: <Settings className="text-blue-700 dark:text-blue-400" /> },
                    { title: "Syllabus Load Balancing Calculator", desc: "An excel-based tracking grid to map EBM Year 1-3 progress milestones with school calendars.", icon: <FileCheck className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "Teacher Observation Rubrics", desc: "Standardized evaluation scorecards to measure classroom self-pacing efficacy and diagnostic execution.", icon: <UserCheck className="text-purple-700 dark:text-purple-400" /> },
                    { title: "District Progress Analytics Kit", desc: "Guides on integrating EBM API outcomes into school ERP databases for broad district monitoring.", icon: <ShieldCheck className="text-amber-700 dark:text-amber-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          Access Portal <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= IMPLEMENTATION STRATEGIES ================= */}
            {activeSub === "strategies" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Implementation Strategies</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Concrete blueprints for accelerated academic progress.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "3-Year Cambridge Acceleration Roadmap", desc: "Detailed month-wise logical mapping from Grade 5 basic concepts up to CIE O-Level physics, chemistry, and maths.", icon: <Compass className="text-purple-700 dark:text-purple-400" /> },
                    { title: "Cognitive Load Balance Guidelines", desc: "Practical strategies on prevention of conceptual overload and maintaining fluid learning speeds.", icon: <Lightbulb className="text-amber-700 dark:text-amber-400" /> },
                    { title: "Diagnostic Error Analysis Guide", desc: "How to read EBM real-time diagnostic curves to pinpoint spatial and mathematical reasoning gaps.", icon: <FileText className="text-blue-700 dark:text-blue-400" /> },
                    { title: "Heuristic Mathematical Practice Guides", desc: "Frameworks on teaching advanced algebraic derivations to students without heavy rote memorization.", icon: <Trophy className="text-emerald-700 dark:text-emerald-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          View Strategy <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= PROFESSIONAL DEVELOPMENT ================= */}
            {activeSub === "pd" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Professional Development</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Become an EBM certified expert and transform your classroom.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "On-Demand Video Modules", desc: "Self-paced training videos on accelerated mathematics, modular syllabus pacing, and diagnostic evaluation.", icon: <Video className="text-purple-700 dark:text-purple-400" /> },
                    { title: "Webinar Schedules", desc: "Check upcoming weekly live webinar schedules hosted by Ejaz Bukhari Method certified master trainers.", icon: <Calendar className="text-blue-700 dark:text-blue-400" /> },
                    { title: "EBM Certified Educator Path", desc: "Syllabus guide and registration portal to earn your official EBM Educator Certification.", icon: <Award className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "Institutional Training Inquiry", desc: "Request custom multi-day on-site training sessions and workshops for your school or district staff.", icon: <Users className="text-amber-700 dark:text-amber-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          Learn More <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= FOR FAMILIES: GET STARTED ================= */}
            {activeSub === "get-started" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Family Quick-Start Guide</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Unlock your child's true academic potential at home.</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Accelerating at Home: The EBM Parent Blueprint</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    EBM allows your child to learn up to twice as fast as traditional schools by balancing conceptual difficulty with immediate feedback loops. Here is how you can support them:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="space-y-2">
                      <div className="bg-amber-100 dark:bg-amber-950 p-3 rounded-2xl w-fit"><Sparkle className="text-amber-700 dark:text-amber-400 w-5 h-5" /></div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">1. Focus on Daily Streaks</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Keep study routines consistent. Just 20-30 minutes of diagnostic matching daily builds a high-frequency habit.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-emerald-100 dark:bg-emerald-950 p-3 rounded-2xl w-fit"><CheckCircle2 className="text-emerald-700 dark:text-emerald-400 w-5 h-5" /></div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">2. Encourage Self-Pacing</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">If your child gets stuck, encourage them to consult the Socratic AI Tutor instead of giving them the answer.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-2xl w-fit"><Trophy className="text-blue-700 dark:text-blue-400 w-5 h-5" /></div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">3. Celebrate Gaps Closed</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">Review the Parent Diagnostics tab weekly to see precise proficiency scores and praise progress milestones.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ================= FOR FAMILIES: PRINTABLES & ROUTINES ================= */}
            {activeSub === "printables" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Printables & Routines</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Download physical resources to structure home learning environments.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Daily Home Study Planner", desc: "A customizable weekly schedule to help children track their daily homework and diagnostic progress.", icon: <Calendar className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "EBM Ocular Exercise Cards", desc: "Printable cards for sensory-motor focus and speed reading practices at home.", icon: <Flame className="text-amber-700 dark:text-amber-400" /> },
                    { title: "At-Home Achievement Certificates", desc: "Printable full-color certificates to award your child as they close academic syllabus gaps.", icon: <Award className="text-purple-700 dark:text-purple-400" /> },
                    { title: "Summer Brain Challenge Logs", desc: "Fun goal-tracking posters to motivate continuous summer study routines.", icon: <Trophy className="text-blue-700 dark:text-blue-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          Download PDF <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= FOR FAMILIES: PARENT ANALYTICS ================= */}
            {activeSub === "parent-analytics" && (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Parent Analytics Hub</h2>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">Understand EBM's diagnostic curves to help guide your child.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Understanding Diagnostic Levels", desc: "A parent-facing guide to understanding mathematical and English level scores.", icon: <FileText className="text-blue-700 dark:text-blue-400" /> },
                    { title: "Spotting Cognitive Gaps Guide", desc: "How to analyze weekly progress logs and determine if your child has specific learning latencies.", icon: <ShieldCheck className="text-emerald-700 dark:text-emerald-400" /> },
                    { title: "Weekly Progress Email Explanation", desc: "Detailed breakdown of parent-facing progress notifications and metrics delivered to your inbox.", icon: <Layout className="text-purple-700 dark:text-purple-400" /> },
                    { title: "Action Plan Intervention Strategies", desc: "Simple tips on how to support your child's action plans without creating academic stress.", icon: <Heart className="text-amber-700 dark:text-amber-400" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition flex items-start space-x-4">
                      <div className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl flex-shrink-0">{item.icon}</div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">{item.desc}</p>
                        <button className="text-xs text-blue-800 dark:text-blue-300 font-bold inline-flex items-center gap-1 pt-2 cursor-pointer">
                          Read Guide <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ================= DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative z-10 text-left"
            >
              <button 
                onClick={() => setSelectedResource(null)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-4">
                <div className="bg-slate-100 dark:bg-slate-850 p-3 rounded-2xl">
                  {selectedResource.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white font-serif">{selectedResource.title}</h3>
                  <span className="text-[11px] font-mono text-slate-600 dark:text-slate-300 font-bold uppercase tracking-widest block mt-0.5">EBM Ecosystem Resource</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedResource.description}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal">
                  All resources, printable worksheets, guides, and schedules are instantly accessible within the EBM Learning Management portal for registered accounts.
                </p>
              </div>

              <div className="flex space-x-3 pt-2">
                <button 
                  onClick={() => setSelectedResource(null)}
                  className="flex-1 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-2xl text-xs font-bold transition text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  Close Window
                </button>
                <button 
                  onClick={() => {
                    setSelectedResource(null);
                    const event = new CustomEvent("navigate", { detail: "auth" });
                    window.dispatchEvent(event);
                  }}
                  className="flex-1 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  Join EBM Ecosystem
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
