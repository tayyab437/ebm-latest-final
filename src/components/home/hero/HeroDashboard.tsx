import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import academicPortalMockup from "../../../assets/images/academic_portal_mockup_1784360050225.jpg";
import { 
  BrainCircuit, 
  Award, 
  Flame, 
  Zap, 
  Check, 
  Sparkles, 
  GraduationCap, 
  Star, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Eye
} from "lucide-react";
import { MOCK_DASHBOARD_PREVIEW } from "./hero.constants";
import { useReducedMotion } from "./HeroAnimations";

export const HeroDashboard: React.FC = () => {
  const isReduced = useReducedMotion();
  const [activeSubTab, setActiveSubTab] = useState<"ai-tutor" | "lessons" | "metrics" | "portal-preview">("ai-tutor");
  const [chatStep, setChatStep] = useState(0);
  const [readingSpeed, setReadingSpeed] = useState(480);
  
  // Custom dialogues for Socratic AI Chat flow matching actual EBM physics/math content
  const aiDialogues = [
    { sender: "student", text: "Why do we say acceleration is gravity's direct pull in free fall?" },
    { sender: "ai", text: "Observe a stone dropping. With no air resisting it, why does it gain exactly 9.8m/s of velocity every single second? What holds it?" },
    { sender: "student", text: "Earth's gravitational force. It constantly pulls it down with the same strength." },
    { sender: "ai", text: "Correct! That constant force yields a uniform increase in speed. You just deduced uniform acceleration from gravity. Ready for a challenge on air resistance limits?" }
  ];

  // Rotate through Socratic dialogues
  useEffect(() => {
    if (activeSubTab !== "ai-tutor") return;
    const interval = setInterval(() => {
      setChatStep((prev) => (prev + 1) % aiDialogues.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [activeSubTab]);

  // Simulate a diagnostic cognitive metric over time
  useEffect(() => {
    const interval = setInterval(() => {
      setReadingSpeed(prev => {
        if (prev >= 780) return 480;
        return prev + 50;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [lessons, setLessons] = useState([
    { id: "les-1", title: "Introduction to Quadratic Equations", subject: "Math Core Heuristics", duration: "12m left", completed: false },
    { id: "les-2", title: "Newtonian Mechanics & Force Diagrams", subject: "Physics CIE Preparation", duration: "100% done", completed: true },
    { id: "les-3", title: "Stoichiometry & Chemical Equations", subject: "Chemistry Fast-Track", duration: "Ready to start", completed: false }
  ]);

  const toggleLesson = (id: string) => {
    setLessons(prev => 
      prev.map(l => l.id === id ? { ...l, completed: !l.completed, duration: l.completed ? "Ready" : "Verified" } : l)
    );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto z-10 lg:max-w-none font-sans">
      
      {/* Decorative Elite Academic Badges */}
      <div className="absolute -top-5 -left-5 z-20 hidden sm:block">
        <motion.div
          animate={isReduced ? {} : { y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/60 dark:border-blue-900/40 shadow-[0_8px_30px_rgba(37,99,235,0.06)] text-xs text-blue-700 dark:text-blue-450 font-bold backdrop-blur-md"
        >
          <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>CIE Accelerated Track Verified</span>
        </motion.div>
      </div>

      <div className="absolute -bottom-6 -right-5 z-20 hidden sm:block">
        <motion.div
          animate={isReduced ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-200/60 dark:border-blue-900/40 shadow-[0_8px_30px_rgba(37,99,235,0.06)] text-xs text-indigo-600 dark:text-indigo-450 font-bold backdrop-blur-md"
        >
          <BrainCircuit className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span>Socratic Cognitive Mapping</span>
        </motion.div>
      </div>

      {/* Main Prestigious Blue & White Portal Shell */}
      <div className="w-full rounded-3xl border border-blue-100 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 md:p-8 shadow-[0_20px_50px_rgba(37,99,235,0.06)] dark:shadow-none relative overflow-hidden transition-colors duration-300">
        
        {/* Top Header Row representing actual EBM School Management Portal */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-inner">
              ZB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Zain Bukhari</h4>
                <span className="h-2 w-2 rounded-full bg-blue-500 inline-block animate-pulse" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Accelerated Scholar • Year 1 (Grades 5-7 Essentials)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <div className="flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>18d Streak</span>
            </div>
            <div className="flex-1 sm:flex-initial px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center justify-center gap-1">
              <Award className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>3.4k Mastery</span>
            </div>
          </div>
        </div>

        {/* Portal Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl mb-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <button
            onClick={() => setActiveSubTab("ai-tutor")}
            className={`py-2 rounded-lg transition-all flex justify-center items-center gap-1 cursor-pointer ${
              activeSubTab === "ai-tutor" 
                ? "bg-blue-600 text-white font-bold shadow-sm" 
                : "hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Socratic Coach</span>
          </button>
          
          <button
            onClick={() => setActiveSubTab("lessons")}
            className={`py-2 rounded-lg transition-all flex justify-center items-center gap-1 cursor-pointer ${
              activeSubTab === "lessons" 
                ? "bg-blue-600 text-white font-bold shadow-sm" 
                : "hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Syllabus Track</span>
          </button>

          <button
            onClick={() => setActiveSubTab("metrics")}
            className={`py-2 rounded-lg transition-all flex justify-center items-center gap-1 cursor-pointer ${
              activeSubTab === "metrics" 
                ? "bg-blue-600 text-white font-bold shadow-sm" 
                : "hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Cognitive Stats</span>
          </button>

          <button
            onClick={() => setActiveSubTab("portal-preview")}
            className={`py-2 rounded-lg transition-all flex justify-center items-center gap-1 cursor-pointer ${
              activeSubTab === "portal-preview" 
                ? "bg-blue-600 text-white font-bold shadow-sm" 
                : "hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Portal Preview</span>
          </button>
        </div>

        {/* Interactive Dynamic Tab Panels */}
        <div className="min-h-[225px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {activeSubTab === "ai-tutor" && (
              <motion.div
                key="ai-tutor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-3 max-h-[190px] overflow-y-auto pr-1">
                  {aiDialogues.slice(0, chatStep + 1).map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex flex-col max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                        msg.sender === "student"
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-850 dark:text-slate-100 self-end ml-auto rounded-tr-none border border-slate-200/50 dark:border-slate-700"
                          : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 self-start border border-blue-100/60 dark:border-blue-900/30 rounded-tl-none"
                      }`}
                    >
                      <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1">
                        {msg.sender === "student" ? (
                          <><span>Scholar Zain</span></>
                        ) : (
                          <><Sparkles className="h-2.5 w-2.5 text-blue-500 dark:text-blue-400" /> <span>Socratic AI Guide</span></>
                        )}
                      </span>
                      <span>{msg.text}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500 italic text-right flex items-center justify-end gap-1 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 inline-block animate-ping" />
                  <span>Socratic reasoning cycle running...</span>
                </div>
              </motion.div>
            )}

            {activeSubTab === "lessons" && (
              <motion.div
                key="lessons"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1">
                  <span>Ejaz Bukhari Method Checklist</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono">3X Speed Mode</span>
                </div>

                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => toggleLesson(lesson.id)}
                    className="group flex items-center justify-between p-3 rounded-xl bg-slate-50/40 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-md flex items-center justify-center border transition-all duration-300 ${
                        lesson.completed 
                          ? "bg-blue-500/20 border-blue-500 text-blue-600" 
                          : "border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 group-hover:border-blue-300"
                      }`}>
                        {lesson.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`text-xs font-semibold block transition-colors ${
                          lesson.completed ? "text-slate-400 dark:text-slate-500 line-through" : "text-slate-700 dark:text-slate-200"
                        }`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                          {lesson.subject}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                      lesson.completed ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {lesson.duration}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeSubTab === "metrics" && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="bg-slate-50/40 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Cognitive Reading</span>
                    <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-blue-950 dark:text-white font-mono tracking-tight">
                      {readingSpeed} <span className="text-xs font-medium text-blue-500 dark:text-blue-400">WPM</span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">CIE literature scanning pace (2.5x standard speed)</p>
                  </div>
                </div>

                <div className="bg-slate-50/40 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Math Proof Quotient</span>
                    <Zap className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-blue-950 dark:text-white font-mono tracking-tight">
                      145 <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400 font-sans">MQ</span>
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Fast calculation & heuristic modeling index</p>
                  </div>
                </div>

                <div className="bg-slate-50/40 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Socratic Accuracy</span>
                    <BrainCircuit className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-blue-950 dark:text-white font-mono tracking-tight">
                      96.4%
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Logical verification rate on conceptual milestones</p>
                  </div>
                </div>

                <div className="bg-slate-50/40 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-850 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">CIE Alignment</span>
                    <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-extrabold text-blue-950 dark:text-white font-mono tracking-tight">
                      100%
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Curriculum mappings verified to Cambridge specifications</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeSubTab === "portal-preview" && (
              <motion.div
                key="portal-preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 shadow-inner group aspect-video w-full flex-1"
              >
                <img
                  src={academicPortalMockup}
                  alt="Futuristic Socratic AI Portal Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                  <p className="text-[10px] text-amber-400 font-bold tracking-wider uppercase font-mono">High-Tech Socratic Workspace</p>
                  <h5 className="text-xs font-bold text-white leading-snug">Interactive 3-Year Dynamic Adaptive Learning Portal Layout</h5>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3-Year Miracle Timeline Progress Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            <span>The 3-Year Fast-Track Roadmap Timeline</span>
            <span className="text-blue-600 dark:text-blue-400 font-mono">Bypassing Lockstep Grades</span>
          </div>

          <div className="relative h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full mb-6">
            <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" style={{ width: "38%" }} />
            <div className="absolute top-1/2 -translate-y-1/2 left-[38%] h-3.5 w-3.5 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.3)]">
              <span className="h-1 w-1 rounded-full bg-blue-600 animate-pulse" />
            </div>

            {/* Labels under nodes */}
            <div className="absolute top-4 left-0 -translate-x-1/10 text-center">
              <span className="block text-[10px] font-black text-blue-600 dark:text-blue-400 leading-none">Year 1</span>
              <span className="block text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">Grades 5-7 Essentials</span>
            </div>

            <div className="absolute top-4 left-[50%] -translate-x-1/2 text-center">
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none">Year 2</span>
              <span className="block text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">Grades 8-9 Science Core</span>
            </div>

            <div className="absolute top-4 right-0 text-right">
              <span className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-none">Year 3</span>
              <span className="block text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">CIE O-Level Prep</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroDashboard;
