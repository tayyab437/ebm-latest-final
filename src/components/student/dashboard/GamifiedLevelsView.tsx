import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Star, 
  Crown, 
  Lock, 
  Play, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Flame, 
  Gift, 
  HelpCircle, 
  Volume2, 
  VolumeX,
  BookOpen, 
  Clock, 
  Zap, 
  Target,
  ChevronRight,
  Compass,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import clsx from "clsx";

interface GamifiedLevelsViewProps {
  selectedSubject: string;
  selectedClass: {
    id: string;
    name: string;
    gradeLevel: string;
    schedule: string;
    room: string;
  };
  curriculums: any[];
  submissions: any[];
  completedLessons: string[];
  onClose: () => void;
  onStartLesson: (lesson: any) => void;
}

// Retro arcade / candy-crush sound synthesizer using Web Audio API
function playSound(type: 'click' | 'complete' | 'hover', muted: boolean) {
  if (muted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    if (type === 'click') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.12);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'complete') {
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 arpeggio
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        const startTime = ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.005, startTime + 0.18);
        
        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });
    } else if (type === 'hover') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.04);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    }
  } catch (e) {
    // Browser autoplay policy or un-initialized audio context safety
  }
}

export function GamifiedLevelsView({
  selectedSubject,
  selectedClass,
  curriculums = [],
  submissions = [],
  completedLessons = [],
  onClose,
  onStartLesson
}: GamifiedLevelsViewProps) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [muted, setMuted] = useState(() => {
    return localStorage.getItem("gamified_sound_muted") === "true";
  });
  const [activeTab, setActiveTab] = useState<"map" | "rewards">("map");
  const [chestMessage, setChestMessage] = useState<string | null>(null);
  const [chestPoints, setChestPoints] = useState<number>(0);
  
  // Track node coordinate centers dynamically for the SVG line
  const [nodeCoords, setNodeCoords] = useState<{ id: string; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContentRef = useRef<HTMLDivElement>(null);

  // Filter out any diagnostic pre-assessments if they're handled differently,
  // but let's include all curriculum lessons of this subject.
  const lessons = curriculums.filter(curr => curr.isDiagnostic !== 1);

  // Persistent storage for sound setting
  useEffect(() => {
    localStorage.setItem("gamified_sound_muted", String(muted));
  }, [muted]);

  // Recalculate coordinates of level node centers relative to the scrollable map-content area
  const updateNodePositions = () => {
    if (!mapContentRef.current) return;
    const mapRect = mapContentRef.current.getBoundingClientRect();
    const coords: { id: string; x: number; y: number }[] = [];

    lessons.forEach((lesson) => {
      const element = document.getElementById(`node-btn-${lesson.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        coords.push({
          id: lesson.id,
          x: rect.left - mapRect.left + rect.width / 2,
          y: rect.top - mapRect.top + rect.height / 2
        });
      }
    });

    // Add positions for the occasional side decorations / chests too so we can connect them!
    const chests = ["chest-1", "chest-2"];
    chests.forEach((chestId) => {
      const element = document.getElementById(chestId);
      if (element) {
        const rect = element.getBoundingClientRect();
        coords.push({
          id: chestId,
          x: rect.left - mapRect.left + rect.width / 2,
          y: rect.top - mapRect.top + rect.height / 2
        });
      }
    });

    setNodeCoords(coords);
  };

  // Run initial calculation and set up resize listener
  useEffect(() => {
    // Small timeout to allow render completion and style injection
    const timer = setTimeout(() => {
      updateNodePositions();
    }, 400);

    window.addEventListener("resize", updateNodePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateNodePositions);
    };
  }, [lessons.length, activeTab]);

  // Handle keys or double updates
  useEffect(() => {
    updateNodePositions();
  }, [selectedNode]);

  // Calculate user stats for this specific subject
  const totalLessons = lessons.length;
  const lessonsCompleted = lessons.filter(curr => completedLessons.includes(curr.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0;
  
  // Find current active level (first incomplete lesson)
  const currentActiveIndex = lessons.findIndex(curr => !completedLessons.includes(curr.id));
  const activeLevelIndex = currentActiveIndex === -1 ? (lessons.length > 0 ? lessons.length - 1 : 0) : currentActiveIndex;

  // Render continuous curved ribbon path for the levels
  const renderSvgPath = () => {
    if (nodeCoords.length < 2) return null;
    
    // Sort coords based on their chronological lesson layout in the array
    const sortedNodes = lessons.map(l => nodeCoords.find(nc => nc.id === l.id)).filter(Boolean) as { id: string; x: number; y: number }[];
    
    if (sortedNodes.length < 2) return null;

    let pathD = `M ${sortedNodes[0].x} ${sortedNodes[0].y}`;
    
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const current = sortedNodes[i];
      const next = sortedNodes[i + 1];
      
      // Control points for a beautiful, whimsical S-curve (cubic bezier)
      const cpY1 = current.y + (next.y - current.y) / 2;
      const cpY2 = current.y + (next.y - current.y) / 2;
      const cpX1 = current.x;
      const cpX2 = next.x;

      pathD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }

    // Determine completion index to color code parts of the line!
    // But drawing a single colorful line with gradient looks stunning.
    return (
      <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible">
        <defs>
          <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" /> {/* Rose */}
            <stop offset="35%" stopColor="#F59E0B" /> {/* Gold */}
            <stop offset="70%" stopColor="#10B981" /> {/* Emerald */}
            <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.5"/>
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Shadow/Back road line for depth */}
        <path
          d={pathD}
          fill="none"
          stroke="#1E1B4B"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-40"
        />
        
        {/* Outer playful track border */}
        <path
          d={pathD}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />

        {/* Main colorful winding center path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#roadGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shadow-2xl"
        />

        {/* Dynamic moving light dash that follows the curve (gives alive candy vibe!) */}
        <path
          d={pathD}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeDasharray="15, 45"
          strokeLinecap="round"
          className="animate-[dash_4s_linear_infinite]"
          style={{
            strokeDashoffset: 100,
            animationName: "dash",
            animationDuration: "8s",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear"
          }}
        />
      </svg>
    );
  };

  const handleOpenNode = (lesson: any, isLocked: boolean) => {
    if (isLocked) {
      playSound('hover', muted);
      // Give feedback of locked
      return;
    }
    playSound('click', muted);
    setSelectedNode(lesson);
  };

  const triggerChestOpen = (chestIndex: number) => {
    playSound('complete', muted);
    const quotes = [
      "✨ 'The mind is not a vessel to be filled, but a fire to be kindled.' — Plutarch. Keep shining!",
      "🚀 Amazing work! Did you know that consistent daily study of 15 mins boosts long-term retention by 70%?",
      "🍀 'Education is the most powerful weapon which you can use to change the world.' — Nelson Mandela.",
      "🎉 Jackpot of Curiosity! Isaac Newton formulated the laws of motion while in quarantine during the plague!",
      "💎 Smart brains active! Keep clearing lessons to unlock the royal Graduation Crown certificate!"
    ];
    setChestMessage(quotes[chestIndex % quotes.length]);
    setChestPoints(50 + chestIndex * 15);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-gradient-to-b from-[#0F172A] via-[#1E1B4B] to-[#311042] flex flex-col text-white select-none overflow-hidden font-sans">
      
      {/* Dynamic Background Stars and Floating Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden z-0">
        <div className="absolute top-[10%] left-[15%] w-2 h-2 bg-white rounded-full animate-pulse duration-1000"></div>
        <div className="absolute top-[25%] right-[20%] w-3 h-3 bg-amber-400 rounded-full animate-ping duration-2000"></div>
        <div className="absolute top-[50%] left-[8%] w-1.5 h-1.5 bg-sky-300 rounded-full animate-pulse duration-700"></div>
        <div className="absolute bottom-[30%] right-[10%] w-2 h-2 bg-pink-400 rounded-full animate-pulse duration-[1.5s]"></div>
        <div className="absolute bottom-[15%] left-[25%] w-3.5 h-3.5 bg-indigo-300 rounded-full animate-bounce duration-[4s]"></div>
        
        {/* Large atmospheric colorful nebula clouds */}
        <div className="absolute -left-32 top-10 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute -right-32 bottom-20 w-96 h-96 rounded-full bg-pink-600/10 blur-3xl"></div>
        <div className="absolute left-[30%] top-[40%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-3xl"></div>
      </div>

      {/* Floating Header Hud */}
      <header className="relative z-20 shrink-0 bg-slate-900/80 backdrop-blur-md border-b border-indigo-500/20 px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left Back to dashboard */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSound('click', muted);
              onClose();
            }}
            className="p-2 sm:p-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-200 hover:text-white hover:bg-indigo-900 transition-all shadow-md group cursor-pointer active:scale-95"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-black bg-pink-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                MAP PATH
              </span>
              <span className="text-xs text-indigo-300 font-extrabold hidden sm:inline">
                {selectedClass.gradeLevel}
              </span>
            </div>
            <h1 className="text-base sm:text-xl font-black text-white tracking-tight leading-none mt-1 flex items-center gap-2">
              {selectedSubject} Space Quest
            </h1>
          </div>
        </div>

        {/* Center Progress HUD */}
        <div className="hidden md:flex items-center gap-4 bg-indigo-950/60 px-5 py-2 rounded-2xl border border-indigo-500/20 max-w-sm w-full">
          <div className="p-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950">
            <Crown className="h-5 w-5 animate-bounce" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center text-[10px] font-black text-indigo-300 uppercase tracking-widest">
              <span>Path Progress</span>
              <span>{lessonsCompleted}/{totalLessons} Complete</span>
            </div>
            <div className="w-full h-3 bg-indigo-950/80 rounded-full p-0.5 border border-indigo-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 shadow-[0_0_10px_rgba(20,184,166,0.5)] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right audio controls & counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Flame streak indicator */}
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400 text-xs font-black shadow-inner animate-pulse">
            <Flame className="h-4.5 w-4.5 fill-amber-500" />
            <span>XP Boost Active</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              const newMuted = !muted;
              setMuted(newMuted);
              playSound('click', newMuted);
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700 hover:text-white transition-all text-slate-300 cursor-pointer"
            title={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX className="h-4 sm:h-5 w-4 sm:w-5" /> : <Volume2 className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Progress HUD on small screens */}
      <div className="bg-indigo-950/40 px-4 py-2 border-b border-indigo-950 flex items-center justify-between text-xs md:hidden relative z-10">
        <span className="font-extrabold text-indigo-300">Quest Progress:</span>
        <div className="flex items-center gap-2 w-3/5">
          <div className="flex-1 h-2.5 bg-indigo-950/80 rounded-full border border-indigo-800 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="font-black text-white text-[10px]">{progressPercent}%</span>
        </div>
      </div>

      {/* Main Map Scroll Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 flex flex-col items-center relative z-10 custom-scrollbar bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.06)_10%,transparent_100%)]"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Cozy Intro Ribbon */}
        <div className="w-full max-w-md mx-auto text-center mb-8 bg-indigo-950/40 p-4 rounded-2xl border border-indigo-500/20 backdrop-blur-xs relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 text-indigo-500/10 transform rotate-12 scale-150">
            <Compass className="h-20 w-20" />
          </div>
          <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">Your Learning Pathway</p>
          <p className="text-xs text-slate-300 mt-1">
            Tap on any unlocked bubble to play the level, gain stars, and boost your mastery score! Complete levels with <span className="text-emerald-400 font-bold">&gt;=95%</span> to master them.
          </p>
        </div>

        {/* The Gamified Interactive Map Path */}
        {lessons.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 max-w-sm mx-auto">
            <div className="w-20 h-20 rounded-full bg-indigo-950/80 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 animate-pulse">
              <BookOpen className="h-10 w-10" />
            </div>
            <h4 className="text-lg font-bold text-indigo-200">No Content Found</h4>
            <p className="text-sm text-indigo-400/80 mt-2">There are no curriculum lessons scheduled for this subject yet. Speak to your teacher to assign modules!</p>
          </div>
        ) : (
          <div 
            ref={mapContentRef}
            className="relative w-full max-w-xl mx-auto flex flex-col items-center py-10"
            style={{ minHeight: `${lessons.length * 150 + 100}px` }}
          >
            {/* SVG Connecting Tracks */}
            {renderSvgPath()}

            {/* Render Floating Background Cloud Decorations alongside the path */}
            {lessons.map((_, index) => {
              if (index % 3 !== 0) return null;
              const sideLeft = index % 2 === 0;
              return (
                <div 
                  key={`cloud-${index}`}
                  className={clsx(
                    "absolute opacity-20 pointer-events-none transform -translate-y-12 select-none pointer-events-none transition-all hover:opacity-40 animate-[pulse_5s_ease-in-out_infinite]",
                    sideLeft ? "left-[-20px] sm:left-[-80px]" : "right-[-20px] sm:right-[-80px]"
                  )}
                  style={{ top: `${index * 150 + 80}px` }}
                >
                  <div className="relative text-white font-black text-[10px] tracking-widest bg-gradient-to-r from-blue-400 to-indigo-500 p-3 rounded-full blur-xs shadow-xl min-w-[80px] text-center">
                    ☁️ CLOUD
                  </div>
                </div>
              );
            })}

            {/* Render Interactive Chevrons/Chests/Milestone checkpoint boxes along the road */}
            {lessons.length > 3 && (
              <>
                {/* Milestone Chest 1 */}
                <div 
                  id="chest-1"
                  className="absolute transform -translate-x-1/2 z-10 cursor-pointer group"
                  style={{ 
                    top: `${Math.floor(lessons.length / 2) * 150 + 40}px`,
                    left: `${50 - Math.sin(Math.floor(lessons.length / 2) * 1.5) * 22 + 18}%` 
                  }}
                  onClick={() => triggerChestOpen(1)}
                >
                  <div className="relative p-2.5 rounded-2xl bg-indigo-900 border-2 border-amber-400 hover:border-amber-300 hover:bg-indigo-800 transition-all shadow-lg animate-bounce duration-[2s]">
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-amber-400 text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      BONUS CHEST
                    </div>
                    <Gift className="h-6 w-6 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>

                {/* Milestone Chest 2 */}
                <div 
                  id="chest-2"
                  className="absolute transform -translate-x-1/2 z-10 cursor-pointer group"
                  style={{ 
                    top: `${(lessons.length - 1) * 150 + 10}px`,
                    left: `${50 - Math.sin(lessons.length - 1 * 1.5) * 22 - 18}%` 
                  }}
                  onClick={() => triggerChestOpen(2)}
                >
                  <div className="relative p-2.5 rounded-2xl bg-indigo-900 border-2 border-emerald-400 hover:border-emerald-300 hover:bg-indigo-800 transition-all shadow-lg animate-bounce duration-[2.5s]">
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-emerald-400 text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                      CHALLENGE
                    </div>
                    <Trophy className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </>
            )}

            {/* Level Nodes rendered chronologically downwards */}
            {lessons.map((lesson, idx) => {
              const lessonSubmissions = submissions.filter(
                (s) => (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === lesson.id
              );
              
              const maxScore = lessonSubmissions.length > 0 
                ? Math.max(...lessonSubmissions.map(s => s.score || 0)) 
                : null;
              
              const isCompleted = maxScore !== null && maxScore >= 95;
              const isPracticed = maxScore !== null && maxScore < 95;
              
              // Gamified lock logic: a level is unlocked if it is the first level,
              // or if the previous level is completed (score >= 95).
              // Let's make it highly playful and satisfying. If user completed previous, unlock next.
              // For safety and not blocking eager students, let's also allow any lesson that has a score or is unlocked in sequence.
              let isLocked = false;
              if (idx > 0) {
                const prevLesson = lessons[idx - 1];
                const prevSubmissions = submissions.filter(
                  (s) => (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === prevLesson.id
                );
                const prevMaxScore = prevSubmissions.length > 0 ? Math.max(...prevSubmissions.map(s => s.score || 0)) : null;
                const prevCompleted = prevMaxScore !== null && prevMaxScore >= 95;
                
                // Lock if previous is not completed AND student hasn't attempted this current lesson before
                if (!prevCompleted && lessonSubmissions.length === 0) {
                  isLocked = true;
                }
              }

              // Overrides: diagnostic is never in this list. Always unlock first level.
              if (idx === 0) isLocked = false;

              // Winding path horizontal calculation
              const windingFactor = Math.sin(idx * 1.5) * 22; // Alternates left/right offset elegantly
              const leftPercent = 50 + windingFactor;
              const topPx = idx * 150 + 40;

              // Level visual parameters
              const isActiveNode = idx === activeLevelIndex && !isLocked;

              return (
                <div
                  key={lesson.id}
                  className="absolute transform -translate-x-1/2 flex flex-col items-center group"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPx}px`,
                    zIndex: 10
                  }}
                >
                  {/* Floating Pointer Mascot Indicator above the Active Current Level */}
                  {isActiveNode && (
                    <motion.div 
                      className="absolute -top-12 z-30 flex flex-col items-center pointer-events-none"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg border border-white whitespace-nowrap">
                        PLAY HERE!
                      </div>
                      <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-amber-400"></div>
                    </motion.div>
                  )}

                  {/* Level circular Bubble button */}
                  <button
                    id={`node-btn-${lesson.id}`}
                    onClick={() => handleOpenNode(lesson, isLocked)}
                    onMouseEnter={() => { if (!isLocked) playSound('hover', muted); }}
                    className={clsx(
                      "relative w-20 sm:w-24 h-20 sm:h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300",
                      // 3D Playful Box Shadow Effect (border and bottom shadow)
                      isLocked 
                        ? "bg-slate-800/80 border-4 border-slate-700 text-slate-500 shadow-inner cursor-not-allowed"
                        : isCompleted
                          ? "bg-gradient-to-b from-emerald-400 to-emerald-600 border-4 border-emerald-300 text-white shadow-[0_6px_0_#047857,0_12px_20px_rgba(16,185,129,0.3)] hover:scale-105 active:translate-y-1 cursor-pointer active:shadow-[0_2px_0_#047857]"
                          : isPracticed
                            ? "bg-gradient-to-b from-amber-400 to-amber-600 border-4 border-amber-300 text-white shadow-[0_6px_0_#b45309,0_12px_20px_rgba(245,158,11,0.3)] hover:scale-105 active:translate-y-1 cursor-pointer active:shadow-[0_2px_0_#b45309]"
                            : "bg-gradient-to-b from-sky-400 to-blue-600 border-4 border-sky-300 text-white shadow-[0_6px_0_#1d4ed8,0_12px_20px_rgba(59,130,246,0.3)] hover:scale-105 active:translate-y-1 cursor-pointer active:shadow-[0_2px_0_#1d4ed8]",
                      // Current active node gets a glowing pulse ring
                      isActiveNode && "ring-4 ring-amber-400 ring-offset-4 ring-offset-slate-900 animate-pulse"
                    )}
                  >
                    {/* Visual state inside the level circle */}
                    {isLocked ? (
                      <Lock className="h-6 sm:h-8 w-6 sm:w-8 opacity-70" />
                    ) : (
                      <div className="flex flex-col items-center">
                        {/* Golden level number */}
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">
                          LVL
                        </span>
                        <span className="text-xl sm:text-2xl font-black leading-none mt-1">
                          {idx + 1}
                        </span>

                        {/* Stars Indicator underneath or inside the circle */}
                        <div className="flex items-center gap-0.5 mt-1">
                          {isCompleted ? (
                            <>
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 animate-spin-slow" />
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            </>
                          ) : isPracticed ? (
                            <>
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                              <Star className="h-3.5 w-3.5 text-indigo-200 opacity-40" />
                            </>
                          ) : (
                            <>
                              <Star className="h-3 w-3 text-white/40" />
                              <Star className="h-3 w-3 text-white/40" />
                              <Star className="h-3 w-3 text-white/40" />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cute circular shiny light glare on level bubbles */}
                    {!isLocked && (
                      <div className="absolute top-1 left-2 w-4 h-2 bg-white/25 rounded-full transform -rotate-12"></div>
                    )}
                  </button>

                  {/* Level Caption details displayed beneath */}
                  <div className="mt-3.5 text-center max-w-[120px] sm:max-w-[150px]">
                    <p className={clsx(
                      "text-[10px] sm:text-xs font-black line-clamp-1 leading-snug tracking-tight",
                      isLocked ? "text-slate-500 font-semibold" : "text-white"
                    )}>
                      {lesson.title}
                    </p>
                    {isCompleted ? (
                      <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1 inline-block">
                        Completed
                      </span>
                    ) : isPracticed ? (
                      <span className="text-[8px] sm:text-[9px] font-extrabold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 mt-1 inline-block">
                        Practiced ({maxScore}%)
                      </span>
                    ) : isLocked ? (
                      <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1 inline-block">
                        Locked
                      </span>
                    ) : (
                      <span className="text-[8px] sm:text-[9px] font-extrabold text-sky-400 uppercase tracking-widest bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20 mt-1 inline-block">
                        Unstarted
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL / BOTTOM SHEET OVERLAY: LEVEL DETAILS PREVIEW CARD */}
      <AnimatePresence>
        {selectedNode && (() => {
          const nodeSubmissions = submissions.filter(
            (s) => (s.type === "CURRICULUM" || s.type === "curriculum_practice") && s.assessmentId === selectedNode.id
          );
          const maxScore = nodeSubmissions.length > 0 ? Math.max(...nodeSubmissions.map(s => s.score || 0)) : null;
          const isCompleted = maxScore !== null && maxScore >= 95;
          const nodeIndex = lessons.findIndex(l => l.id === selectedNode.id);

          return (
            <motion.div 
              className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-gradient-to-br from-indigo-950 to-slate-900 border-2 border-indigo-500/40 rounded-[2.5rem] shadow-2xl max-w-md w-full overflow-hidden relative"
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0, transition: { type: "spring", damping: 20 } }}
                exit={{ scale: 0.9, y: 30 }}
              >
                {/* Visual Header Decoration */}
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-500"></div>
                
                {/* Close Button */}
                <button
                  onClick={() => {
                    playSound('click', muted);
                    setSelectedNode(null);
                  }}
                  className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Level Detail Card Content */}
                <div className="p-8 pt-10 text-center space-y-6">
                  
                  {/* Decorative Header Badge */}
                  <div className="inline-flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-b from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg mb-2 animate-pulse">
                      <Crown className="h-8 w-8" />
                    </div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-[0.2em]">
                      LEVEL {nodeIndex + 1} QUEST
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                      {selectedNode.title}
                    </h3>
                    <p className="text-xs text-indigo-300 font-extrabold uppercase tracking-widest">
                      Subject: {selectedSubject} • {selectedNode.type || "Core Module"}
                    </p>
                  </div>

                  {/* Level Stats Bubble Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-indigo-950/60 p-4 rounded-3xl border border-indigo-500/20">
                    <div className="flex flex-col items-center justify-center p-2 border-r border-indigo-800/40">
                      <Clock className="h-4 w-4 text-sky-400 mb-1" />
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Duration</span>
                      <span className="text-xs font-extrabold text-white">{selectedNode.duration || 45} Minutes</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2">
                      <Target className="h-4 w-4 text-emerald-400 mb-1" />
                      <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Best Score</span>
                      <span className="text-xs font-extrabold text-white">
                        {maxScore !== null ? `${maxScore}%` : "No attempts"}
                      </span>
                    </div>
                  </div>

                  {/* Level Skill Focus / Reward Box */}
                  <div className="text-left bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-wider block mb-1">Skill Focus</span>
                    <p className="text-xs text-slate-300 font-medium">
                      {selectedNode.skillFocus || "Foundational concepts exploration and advanced mastery exercises."}
                    </p>
                  </div>

                  {/* Stars Milestone Rating inside Detail Card */}
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Mastery Status</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex flex-col items-center gap-1 opacity-90">
                        <Star className={clsx("h-8 w-8", isCompleted ? "fill-yellow-400 text-yellow-400" : "text-slate-700")} />
                        <span className="text-[9px] font-black text-slate-400 uppercase">Clear</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 opacity-90">
                        <Star className={clsx("h-8 w-8", (maxScore !== null && maxScore >= 60) ? "fill-yellow-400 text-yellow-400" : "text-slate-700")} />
                        <span className="text-[9px] font-black text-slate-400 uppercase">Bronze</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 opacity-90">
                        <Star className={clsx("h-8 w-8", isCompleted ? "fill-yellow-400 text-yellow-400" : "text-slate-700")} />
                        <span className="text-[9px] font-black text-slate-400 uppercase">Gold Crown</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Play level buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      onClick={() => {
                        playSound('click', muted);
                        setSelectedNode(null);
                      }}
                      className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer active:scale-98"
                    >
                      Maybe Later
                    </button>
                    
                    <button
                      onClick={() => {
                        playSound('complete', muted);
                        onStartLesson(selectedNode);
                        setSelectedNode(null);
                      }}
                      className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98 border-b-4 border-rose-800"
                    >
                      <Play className="h-4 w-4 fill-white" />
                      {maxScore !== null ? "Replay Level" : "Play Level"}
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* CHEST REWARD OPEN MESSAGE CARD */}
      <AnimatePresence>
        {chestMessage && (
          <motion.div 
            className="fixed inset-0 z-[80] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-indigo-900 to-purple-950 border-4 border-amber-400 rounded-[3rem] shadow-2xl max-w-md w-full p-8 text-center space-y-6 relative overflow-hidden"
              initial={{ scale: 0.6, rotate: -5 }}
              animate={{ scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.4 } }}
              exit={{ scale: 0.6, rotate: 5 }}
            >
              {/* Confetti or sparkles glow effect in chest */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0%,transparent_70%)] animate-pulse pointer-events-none"></div>

              <div className="w-24 h-24 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/20 mx-auto animate-bounce">
                <Gift className="h-12 w-12" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-amber-300 tracking-tight">
                  You Opened a Chest!
                </h3>
                <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                  + {chestPoints} KNOWLEDGE XP UNLOCKED!
                </p>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-5 rounded-2xl border border-indigo-500/20">
                {chestMessage}
              </p>

              <button
                onClick={() => {
                  playSound('click', muted);
                  setChestMessage(null);
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 transition-all cursor-pointer hover:scale-105 active:scale-98 border-b-4 border-orange-700"
              >
                Woohoo! Awesome
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
