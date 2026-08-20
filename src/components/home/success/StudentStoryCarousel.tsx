import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Sparkles, 
  Award, 
  Database, 
  Plus, 
  Check, 
  Loader2, 
  HelpCircle,
  Pause,
  Play as PlayIcon,
  Compass,
  Zap,
  Target,
  GraduationCap
} from "lucide-react";
import { STUDENT_STORIES_DATA } from "./success.data";
import { StudentStoryCard } from "./StudentStoryCard";
import { AnimatePresence, motion } from "motion/react";

const satinBg = "/src/assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

export const StudentStoryCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Database synchronization states
  const [journeys, setJourneys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbSynced, setDbSynced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Autoplay / interactive slider countdown progress states
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form submission states for syncing new data
  const [formData, setFormData] = useState({
    name: "",
    currentGrade: "O Level / Grade 11",
    previousSchool: "",
    goalsInput: "",
    challengesInput: "",
    journey: "",
    achievementsInput: "",
    favouriteSubject: "",
    favouriteAITool: "",
    futureDream: "",
    parentComment: "",
    teacherComment: ""
  });

  const fetchJourneys = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/featured-journeys");
      const data = await res.json();
      if (data.success && data.journeys && data.journeys.length > 0) {
        const parsed = data.journeys.map((j: any) => ({
          ...j,
          goals: typeof j.goals === "string" ? JSON.parse(j.goals) : (Array.isArray(j.goals) ? j.goals : []),
          challenges: typeof j.challenges === "string" ? JSON.parse(j.challenges) : (Array.isArray(j.challenges) ? j.challenges : []),
          achievements: typeof j.achievements === "string" ? JSON.parse(j.achievements) : (Array.isArray(j.achievements) ? j.achievements : []),
        }));
        setJourneys(parsed);
        setDbSynced(true);
      } else {
        setJourneys(STUDENT_STORIES_DATA);
        setDbSynced(false);
      }
    } catch (e) {
      console.error("Error loading backend student stories:", e);
      setJourneys(STUDENT_STORIES_DATA);
      setDbSynced(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJourneys();
  }, []);

  // Slider controls
  const handleNext = () => {
    if (journeys.length === 0) return;
    setDirection(1);
    setProgress(0);
    setActiveIndex((prev) => (prev + 1) % journeys.length);
  };

  const handlePrev = () => {
    if (journeys.length === 0) return;
    setDirection(-1);
    setProgress(0);
    setActiveIndex((prev) => (prev - 1 + journeys.length) % journeys.length);
  };

  // Autoplay countdown effect with progressive visual bar
  useEffect(() => {
    if (isPaused || showVideoModal || showStoryModal || showShareModal || journeys.length <= 1) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Trigger next slide transition
          setDirection(1);
          setActiveIndex((idx) => (idx + 1) % journeys.length);
          return 0;
        }
        return prev + 1.25; // ~8 seconds total loop
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPaused, showVideoModal, showStoryModal, showShareModal, journeys.length]);

  const activeStory = journeys[activeIndex] || STUDENT_STORIES_DATA[0] || null;

  // Form submit handler to push story into DB
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.journey || !formData.currentGrade) {
      alert("Name, Grade, and the Journey story are strictly required.");
      return;
    }

    try {
      setSubmitting(true);
      
      const goalsArr = formData.goalsInput ? formData.goalsInput.split(",").map(g => g.trim()).filter(Boolean) : ["Socratic Mastery"];
      const challengesArr = formData.challengesInput ? formData.challengesInput.split(",").map(c => c.trim()).filter(Boolean) : ["Examination Stress"];
      const achievementsArr = formData.achievementsInput ? formData.achievementsInput.split(",").map(a => a.trim()).filter(Boolean) : ["Passed diagnostics"];

      const payload = {
        name: formData.name,
        currentGrade: formData.currentGrade,
        previousSchool: formData.previousSchool || "Self-study Pathway",
        goals: JSON.stringify(goalsArr),
        challenges: JSON.stringify(challengesArr),
        journey: formData.journey,
        achievements: JSON.stringify(achievementsArr),
        favouriteSubject: formData.favouriteSubject || "Integrated Science",
        favouriteAITool: formData.favouriteAITool || "Socratic Dialoguing AI",
        futureDream: formData.futureDream || "Scholastic Pioneer",
        parentComment: formData.parentComment || "My child has acquired tremendous study agency using EBM.",
        teacherComment: formData.teacherComment || "An exceptionally resilient mind who welcomes intellectual rigor."
      };

      const res = await fetch("/api/admin/featured-journeys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setFormData({
          name: "",
          currentGrade: "O Level / Grade 11",
          previousSchool: "",
          goalsInput: "",
          challengesInput: "",
          journey: "",
          achievementsInput: "",
          favouriteSubject: "",
          favouriteAITool: "",
          futureDream: "",
          parentComment: "",
          teacherComment: ""
        });
        setShowShareModal(false);
        await fetchJourneys();
        setActiveIndex(0); // Show newly added story
      } else {
        alert("Error saving story: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit story to database.");
    } finally {
      setSubmitting(false);
    }
  };

  // Slider animation variants for horizontal slide
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.99
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as any }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : dir < 0 ? 80 : 0,
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.99,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as any }
    })
  };

  return (
    <div className="space-y-10 relative">
      
      {/* Premium Section Header Deck */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200/60 dark:border-slate-900/60">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[10px] font-black uppercase tracking-[0.15em] text-amber-500 dark:text-amber-400">
              <Sparkles className="h-3 w-3 text-amber-500" />
              Scholastic Spotlight
            </span>
            
            {/* Live Database Sync Badge */}
            <AnimatePresence mode="wait">
              {dbSynced ? (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-[9px] text-cyan-600 dark:text-cyan-400 font-mono font-black uppercase border border-cyan-500/20 shadow-md shadow-cyan-500/5"
                >
                  <Database className="h-3 w-3 animate-pulse text-cyan-500" />
                  Live Cloud Synced
                </motion.span>
              ) : (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-[9px] text-slate-500 dark:text-slate-400 font-mono font-black uppercase border border-slate-200 dark:border-slate-800"
                >
                  <Database className="h-3 w-3 text-slate-400" />
                  Local Sandbox
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase font-sans">
            Featured Student Journeys
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Real evaluations from active scholars who structured their curriculum, solved diagnostic blockages, and earned verified Cambridge competencies.
          </p>
        </div>

        {/* Control Interface Panel */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          
          {/* Action Button: Post Success Story */}
          <button
            onClick={() => setShowShareModal(true)}
            className="group/plus flex items-center gap-2 px-4 py-3 bg-[#0a0f2b] hover:bg-[#121946] border-2 border-amber-400/40 hover:border-amber-400/60 active:scale-95 text-amber-300 hover:text-amber-200 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[2.5] transition-transform duration-300 group-hover/plus:rotate-90" />
            <span>Post Success Story</span>
          </button>

          {/* Play/Pause Auto-advance */}
          <button
            onClick={() => {
              setIsPaused(!isPaused);
              setProgress(0);
            }}
            className={`p-3.5 rounded-xl border transition-all duration-300 active:scale-95 cursor-pointer outline-none ${
              isPaused 
                ? "bg-amber-400 border-amber-400 text-slate-950 shadow-md shadow-amber-500/15" 
                : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
            title={isPaused ? "Play Auto-advance" : "Pause Auto-advance"}
          >
            {isPaused ? <PlayIcon className="h-4 w-4 fill-current" /> : <Pause className="h-4 w-4" />}
          </button>

          {/* Stepper Navigation */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-1 rounded-xl">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-850 active:scale-90 transition-all outline-none cursor-pointer"
              aria-label="Previous Student Story"
            >
              <ChevronLeft className="h-4.5 w-4.5 stroke-[2.5]" />
            </button>
            
            <span className="text-[11px] font-mono font-black text-slate-500 dark:text-slate-400 px-2 select-none min-w-[3.5rem] text-center">
              {activeIndex + 1} &middot; {journeys.length || STUDENT_STORIES_DATA.length}
            </span>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-zinc-850 active:scale-90 transition-all outline-none cursor-pointer"
              aria-label="Next Student Story"
            >
              <ChevronRight className="h-4.5 w-4.5 stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Student Story Card Slider */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {activeStory ? (
          <div className="overflow-hidden rounded-[32px] relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                <StudentStoryCard
                  story={activeStory}
                  onOpenVideo={() => setShowVideoModal(true)}
                  onReadFullStory={() => setShowStoryModal(true)}
                />
              </motion.div>
            </AnimatePresence>

            {/* Countdown Auto-advance progress line */}
            {!isPaused && journeys.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-900/40 overflow-hidden pointer-events-none z-20">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="p-16 text-center bg-[#070b1e] border-2 border-[#1e2a58]/40 rounded-[32px] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-8 w-8 text-amber-400 animate-spin" />
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Synchronizing student scholarship records from database ledger...</p>
          </div>
        )}
      </div>

      {/* Luxury Segment Indicator Dots */}
      <div className="flex justify-center gap-2 pt-2">
        {(journeys.length > 0 ? journeys : STUDENT_STORIES_DATA).map((_, idx) => {
          const active = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
                setProgress(0);
              }}
              className="relative h-2.5 transition-all duration-500 outline-none cursor-pointer rounded-full"
              style={{ width: active ? "32px" : "10px" }}
              aria-label={`Go to student story ${idx + 1}`}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                active 
                  ? "bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-md shadow-amber-500/20" 
                  : "bg-slate-250 dark:bg-slate-850 hover:bg-slate-400 dark:hover:bg-slate-700"
              }`} />
            </button>
          );
        })}
      </div>

      {/* SUBMIT SUCCESS STORY MODAL (Luxury styled) */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative bg-[#070b1e] text-slate-100 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-w-2xl w-full border-2 border-[#1e2a58]/60 my-8"
            >
              {/* Satin overlay for modal header */}
              <div className="absolute inset-x-0 top-0 h-40 pointer-events-none z-0 overflow-hidden opacity-15">
                <img src={satinBg} alt="" className="w-full h-full object-cover mix-blend-lighten" referrerPolicy="no-referrer" />
              </div>

              <div className="p-6 border-b border-[#1e2a58]/40 flex items-center justify-between relative z-10 bg-[#080d28]/95">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                    <Database className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="text-base font-black uppercase tracking-tight text-white">Sync Scholar Success Journey</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pushes record directly to relational cloud database</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowShareModal(false)}
                  className="p-2 rounded-xl hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form container */}
              <form onSubmit={handleFormSubmit} className="p-8 space-y-5 max-h-[500px] overflow-y-auto scrollbar-thin relative z-10 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Liam Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Current Grade */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Current Grade / Cohort *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. O Level / Grade 11"
                      value={formData.currentGrade}
                      onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Previous School */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Previous Institution</label>
                    <input
                      type="text"
                      placeholder="e.g. St. Jude Academy"
                      value={formData.previousSchool}
                      onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Future Dream */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Future Aspiration</label>
                    <input
                      type="text"
                      placeholder="e.g. Quantum Computing Engineer"
                      value={formData.futureDream}
                      onChange={(e) => setFormData({ ...formData, futureDream: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Favorite Subject */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Favourite Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Thermodynamics Physics"
                      value={formData.favouriteSubject}
                      onChange={(e) => setFormData({ ...formData, favouriteSubject: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Favorite AI Tool */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Favourite AI Tool</label>
                    <input
                      type="text"
                      placeholder="e.g. Socratic Logic Decomposer"
                      value={formData.favouriteAITool}
                      onChange={(e) => setFormData({ ...formData, favouriteAITool: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Goals */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Academic Focus Goals</label>
                    <span className="text-[9px] text-slate-500 font-bold">Split by commas</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. A* in Chemistry, Master Calculus, Enter Cambridge"
                    value={formData.goalsInput}
                    onChange={(e) => setFormData({ ...formData, goalsInput: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                  />
                </div>

                {/* Challenges */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Initial Challenges Faced</label>
                  <input
                    type="text"
                    placeholder="e.g. Extreme exam stress, Ineffective homework feedback loops"
                    value={formData.challengesInput}
                    onChange={(e) => setFormData({ ...formData, challengesInput: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                  />
                </div>

                {/* Achievements */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Scholarly Achievements</label>
                  <input
                    type="text"
                    placeholder="e.g. Won Science Fair, 100-Day Study Streak, 98% Algebra Diagnostic"
                    value={formData.achievementsInput}
                    onChange={(e) => setFormData({ ...formData, achievementsInput: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                  />
                </div>

                {/* Journey story */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">The Transformation Narrative *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detail the timeline. How did this student adapt, how did EBM diagnostics identify their misconceptions, and how did their performance shift?"
                    value={formData.journey}
                    onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Parent comment */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Parent Review / Comment</label>
                    <input
                      type="text"
                      placeholder="e.g. Liam has found genuine agency in his study routines."
                      value={formData.parentComment}
                      onChange={(e) => setFormData({ ...formData, parentComment: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>

                  {/* Teacher comment */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-wider text-slate-400 block">Educator Comment</label>
                    <input
                      type="text"
                      placeholder="e.g. He approaches physics problems with rigorous critical deduction."
                      value={formData.teacherComment}
                      onChange={(e) => setFormData({ ...formData, teacherComment: e.target.value })}
                      className="w-full px-4 py-3 text-xs bg-slate-950/60 border border-[#1e2a58]/50 rounded-xl focus:border-amber-400 text-white outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-[#1e2a58]/40 flex items-center justify-end gap-3 bg-[#070b1e]">
                  <button
                    type="button"
                    onClick={() => setShowShareModal(false)}
                    className="px-5 py-2.5 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:from-slate-700 disabled:to-slate-800 disabled:text-slate-500 text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>Syncing to Database...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-4.5 w-4.5 stroke-[2.5]" />
                        <span>Publish & Sync Story</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIDEO DIALOG modal frame */}
      <AnimatePresence>
        {showVideoModal && activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070b1e] text-white rounded-[32px] overflow-hidden shadow-2xl max-w-2xl w-full border-2 border-[#1e2a58]/50"
            >
              <div className="p-5 sm:p-6 border-b border-[#1e2a58]/35 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Video Spotlight</span>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white mt-0.5">{activeStory.name} &mdash; Academic Dialogue</h4>
                </div>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 rounded-xl hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mock Video Container */}
              <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center text-center p-8 relative group">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-slate-950/80 pointer-events-none" />
                
                <div className="space-y-4 z-10 font-sans">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-200">Interactive Student Narrative Simulation</p>
                    <p className="text-[10px] text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      This simulates an active classroom walkthrough representing how EBM's Socratic dialogue model operates in real sessions.
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowVideoModal(false)}
                    className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    Close Playback
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED DIALOG/CASE STUDY modal frame */}
      <AnimatePresence>
        {showStoryModal && activeStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#070b1e] text-slate-100 rounded-[32px] overflow-hidden shadow-2xl max-w-2xl w-full border-2 border-[#1e2a58]/50"
            >
              <div className="p-5 sm:p-6 border-b border-[#1e2a58]/35 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">Full Scholar Case Study</span>
                  <h4 className="text-sm font-black uppercase tracking-tight text-white mt-0.5">Transformation Analysis: {activeStory.name}</h4>
                </div>
                <button 
                  onClick={() => setShowStoryModal(false)}
                  className="p-2 rounded-xl hover:bg-slate-850 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Case Study Details */}
              <div className="p-8 space-y-5 max-h-[380px] overflow-y-auto scrollbar-thin">
                <div className="space-y-1.5 font-sans">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-amber-300">1. Original Assessment Diagnostics</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prior to onboarding EBM, evaluation diagnostics identified underlying knowledge gaps, especially in logic mapping and conceptual modeling. This resulted in performance anxiety under standard timed exams.
                  </p>
                </div>

                <div className="space-y-1.5 font-sans">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-cyan-400">2. Adaptive Socratic Guidance Path</h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    EBM dynamically customized {activeStory.name}&apos;s learning path. By employing interactive step-by-step diagnostic sessions and the Socratic AI companion, {activeStory.name} was prompted with clarifying queries to derive answers logically.
                  </p>
                </div>

                <div className="space-y-1.5 font-sans">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">3. Verified Competencies & Performance</h5>
                  <p className="text-xs text-slate-200 leading-relaxed font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-500 shrink-0" />
                    <span>Scored straight A* averages across all subsequent syllabus milestones.</span>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-slate-950/80 border-t border-[#1e2a58]/30 text-right">
                <button 
                  onClick={() => setShowStoryModal(false)}
                  className="px-5 py-2.5 bg-[#0a0f2b] hover:bg-[#121946] border border-[#1e2a58]/60 text-slate-300 hover:text-white text-2xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
