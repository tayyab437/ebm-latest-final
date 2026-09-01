import React, { useState } from "react";
import { 
  Award, 
  Sparkles, 
  MapPin, 
  BookOpen, 
  Cpu, 
  User, 
  MessageSquare,
  ChevronRight,
  Play,
  GraduationCap,
  Compass,
  Zap,
  Target
} from "lucide-react";
import { StudentStory } from "./success.types";
import { motion, AnimatePresence } from "motion/react";

interface StudentStoryCardProps {
  story: StudentStory;
  onOpenVideo?: () => void;
  onReadFullStory?: () => void;
}

import satinBg from "../../../assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

export const StudentStoryCard: React.FC<StudentStoryCardProps> = ({
  story,
  onOpenVideo,
  onReadFullStory
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"journey" | "feedback" | "stats">("journey");
  
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  // Generate dynamic initials for placeholder photo
  const initials = story.name.split(" ").map(n => n[0]).join("");

  // Create an array of particle indexes for the luxury hover effect
  const particles = Array.from({ length: 15 });

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className="relative w-full bg-[#03050a] border-2 border-[#dfb76c]/15 rounded-[32px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row min-h-[520px] transition-all duration-500 ease-out hover:border-[#dfb76c]/45 select-none antialiased subpixel-antialiased group"
    >
      {/* Satin Background overlay inside card for premium gold line aesthetics */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden rounded-[32px]">
        <img 
          src={satinBg} 
          alt="Satin Texture background" 
          className="w-full h-full object-cover opacity-[0.18] mix-blend-lighten transition-transform duration-700 group-hover:scale-105 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        {/* Deep navy-obsidian mask to keep contrast high and text incredibly readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050811]/98 via-[#03050a]/98 to-[#010204]/99" />
        
        {/* Elegant gold metallic spotlight that tracks the mouse position */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
          style={{
            background: `radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(223, 183, 108, 0.08), rgba(194, 147, 63, 0.04), transparent 75%)`
          }}
        />
      </div>

      {/* Floating Interactive Gold Particles on Hover */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((_, i) => {
              const size = Math.random() * 3 + 1;
              const left = Math.random() * 100;
              const delay = Math.random() * 1.5;
              const duration = Math.random() * 3 + 2.5;
              return (
                <motion.span
                  key={i}
                  initial={{ y: "110%", x: `${left}%`, opacity: 0, scale: 0.5 }}
                  animate={{
                    y: "-10%",
                    opacity: [0, 0.7, 0.7, 0],
                    scale: [0.5, 1.2, 0.8, 0.4],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut",
                  }}
                  className="absolute bg-gradient-to-t from-[#dfb76c] to-[#ffecb3] rounded-full blur-[0.5px]"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    boxShadow: "0 0 6px rgba(223, 183, 108, 0.6)",
                  }}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Elegant gold inner trim border with perfect corner nesting math (32px outer - 6px padding = 26px inner) */}
      <div className="absolute inset-1.5 rounded-[26px] border border-[#dfb76c]/5 pointer-events-none z-10 transition-colors duration-500 group-hover:border-[#dfb76c]/15" />

      {/* Left Column: Visual Bio Passport Panel (35% width) */}
      <div className="lg:w-[35%] bg-gradient-to-b from-[#060a14]/90 to-[#020306]/95 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#dfb76c]/10 relative z-10 shrink-0">
        <div className="space-y-8">
          
          {/* Avatar and Bio with luxury orbital lines */}
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer Golden Dash Rotating Orbit */}
              <div className="absolute inset-0 border border-dashed border-[#dfb76c]/20 rounded-full animate-[spin_30s_infinite_linear] pointer-events-none" />
              {/* Inner Gold Dash Rotating Orbit */}
              <div className="absolute inset-2 border border-dashed border-[#dfb76c]/15 rounded-full animate-[spin_15s_infinite_reverse_linear] pointer-events-none" />
              
              {/* Core Initial Stamp Panel */}
              <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-[#12192c] to-[#04060c] border-2 border-[#dfb76c]/30 flex items-center justify-center font-black text-2xl text-white shadow-[0_8px_25px_rgba(223,183,108,0.15)] relative z-10 transition-transform duration-500 group-hover:scale-105 group-hover:border-[#dfb76c]/55">
                <span className="bg-gradient-to-r from-[#ffe8b3] via-[#dfb76c] to-[#a37c3f] bg-clip-text text-transparent">
                  {initials}
                </span>
                
                {/* Floating luxury gold crown badge */}
                <span className="absolute -top-1.5 -right-1.5 p-1 bg-gradient-to-br from-[#ffe082] to-[#b7791f] rounded-lg text-slate-900 shadow-md">
                  <Award className="h-3 w-3 stroke-[2.5]" />
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-xl font-extrabold text-[#faf8f5] font-sans tracking-tight uppercase">
                {story.name}
              </h4>
              <span className="text-[10px] font-black tracking-[0.2em] text-[#dfb76c] uppercase bg-[#dfb76c]/10 px-3.5 py-1 rounded-full border border-[#dfb76c]/25 inline-block">
                {story.currentGrade}
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block pt-1.5">
                🏫 {story.previousSchool}
              </p>
            </div>
          </div>

          {/* Goals & Challenges with refined elegant micro tags */}
          <div className="space-y-5 pt-6 border-t border-[#dfb76c]/10">
            <div className="space-y-2">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#dfb76c]" />
                Focus Goals
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {story.goals.map((g, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 bg-[#dfb76c]/5 hover:bg-[#dfb76c]/15 text-[#e5c17b] rounded-lg text-[10px] font-bold border border-[#dfb76c]/15 transition-all duration-300 hover:scale-[1.03]"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-[#dfb76c]" />
                Initial Obstacles
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {story.challenges.map((c, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 bg-red-950/20 hover:bg-red-950/30 text-rose-300 rounded-lg text-[10px] font-bold border border-rose-500/15 transition-all duration-300 hover:scale-[1.03]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Future Dream Info */}
        <div className="pt-6 border-t border-[#dfb76c]/10 mt-8 lg:mt-0">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
            Future Dream Aspiration
          </span>
          <p className="text-xs font-black text-[#e5c17b] mt-1 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="h-3.5 w-3.5 text-[#dfb76c] animate-[spin_10s_infinite_linear]" />
            {story.futureDream}
          </p>
        </div>

      </div>

      {/* Right Column: Interactive Ledger Panel */}
      <div className="lg:w-[65%] p-8 sm:p-10 flex flex-col justify-between relative z-10">
        
        <div className="space-y-8">
          {/* Narrative Navigation - Sliding Golden Pill Tabs */}
          <div className="flex bg-[#010204] p-1 rounded-2xl border border-[#dfb76c]/10 shadow-inner">
            {(["journey", "feedback", "stats"] as const).map((tab) => {
              const active = activeSubTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`relative flex-1 py-3 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-xl cursor-pointer ${
                    active ? "text-[#03050a]" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeSubTabBg"
                      className="absolute inset-0 bg-gradient-to-r from-[#ffe082] via-[#dfb76c] to-[#b7791f] shadow-md shadow-amber-500/10 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    {tab === "journey" && (
                      <>
                      <Compass className={`h-3 w-3 ${active ? 'text-slate-900' : 'text-[#dfb76c]'}`} />
                        The Journey
                      </>
                    )}
                    {tab === "feedback" && (
                      <>
                        <MessageSquare className={`h-3 w-3 ${active ? 'text-slate-900' : 'text-[#dfb76c]'}`} />
                        Endorsements
                      </>
                    )}
                    {tab === "stats" && (
                      <>
                        <Sparkles className={`h-3 w-3 ${active ? 'text-slate-900' : 'text-[#dfb76c]'}`} />
                        Scholar Stats
                      </>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic narrative tabs with stunning fluid exit-enter animations */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                className="space-y-5"
              >
                {activeSubTab === "journey" && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-[#dfb76c] uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        Adaptive Instructional Pathway
                      </span>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight">
                        Cognitive Restructuring Strategy
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#fcfaf7] font-medium font-serif italic border-l-2 border-[#dfb76c]/40 pl-4 py-1">
                      “{story.journey}”
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#dfb76c]/10">
                      <div className="flex items-center gap-3 p-3 bg-[#010204]/40 border border-[#dfb76c]/10 rounded-xl">
                        <div className="p-2 bg-[#dfb76c]/10 text-[#dfb76c] rounded-lg shrink-0">
                          <BookOpen className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Favourite Domain</span>
                          <span className="text-xs font-extrabold text-[#fcfaf7] uppercase">{story.favouriteSubject}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-[#010204]/40 border border-[#dfb76c]/10 rounded-xl">
                        <div className="p-2 bg-[#dfb76c]/10 text-[#dfb76c] rounded-lg shrink-0">
                          <Cpu className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider block font-bold">Primary AI Instrument</span>
                          <span className="text-xs font-extrabold text-[#fcfaf7] uppercase">{story.favouriteAITool}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSubTab === "feedback" && (
                  <div className="space-y-4">
                    {/* Parent feedback snippet */}
                    <div className="p-5 bg-gradient-to-r from-[#060a14]/60 to-[#010204] border border-[#dfb76c]/10 rounded-2xl relative shadow-md">
                      <span className="absolute right-6 top-4 text-4xl font-serif text-[#dfb76c]/10 pointer-events-none">&ldquo;</span>
                      <span className="text-[9px] font-black text-[#dfb76c] uppercase tracking-widest flex items-center gap-1.5">
                        <User className="h-3 w-3" />
                        Parent Portal Reflection
                      </span>
                      <p className="text-xs italic text-slate-200 leading-relaxed mt-2 font-medium">
                        &ldquo;{story.parentComment}&rdquo;
                      </p>
                    </div>

                    {/* Teacher feedback snippet */}
                    <div className="p-5 bg-gradient-to-r from-[#060a14]/60 to-[#010204] border border-[#dfb76c]/10 rounded-2xl relative shadow-md">
                      <span className="absolute right-6 top-4 text-4xl font-serif text-[#dfb76c]/10 pointer-events-none">&ldquo;</span>
                      <span className="text-[9px] font-black text-[#dfb76c] uppercase tracking-widest flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Educator Assessment Log
                      </span>
                      <p className="text-xs italic text-slate-200 leading-relaxed mt-2 font-medium">
                        &ldquo;{story.teacherComment}&rdquo;
                      </p>
                    </div>
                  </div>
                )}

                {activeSubTab === "stats" && (
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-[#dfb76c] uppercase tracking-widest block">
                      Verified Cambridge Achievements & Milestones
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {story.achievements.map((ach, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 p-4 bg-[#010204]/40 border border-[#dfb76c]/10 rounded-2xl hover:border-[#dfb76c]/25 transition-all duration-300 hover:scale-[1.01]"
                        >
                          <div className="p-1.5 bg-[#dfb76c]/15 text-[#dfb76c] rounded-lg shrink-0 mt-0.5">
                            <Award className="h-4.5 w-4.5 stroke-[2.5]" />
                          </div>
                          <span className="text-xs font-bold text-[#faf8f5] leading-relaxed uppercase tracking-wider">
                            {ach}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Buttons Panel - Luxury interactive triggers */}
        <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#dfb76c]/10 mt-6 shrink-0">
          <button 
            onClick={onOpenVideo}
            className="group/btn flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#ffe082] via-[#dfb76c] to-[#b7791f] hover:brightness-110 active:scale-95 text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-[#dfb76c]/10 cursor-pointer animate-pulse"
          >
            <Play className="h-3.5 w-3.5 fill-current shrink-0 transition-transform duration-300 group-hover/btn:scale-110" />
            <span>Video Interview Walkthrough</span>
          </button>

          <button 
            onClick={onReadFullStory}
            className="flex items-center gap-1 px-5 py-3 bg-[#04060c] hover:bg-[#0c1224] border border-[#dfb76c]/20 hover:border-[#dfb76c]/45 text-slate-300 hover:text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer ml-auto"
          >
            <span>Read Case Study Ledger</span>
            <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>

    </div>
  );
};
