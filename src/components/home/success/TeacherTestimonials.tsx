import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, X, ArrowRight, Award, Briefcase, Sparkles, GraduationCap } from "lucide-react";
import { TEACHER_TESTIMONIALS_DATA } from "./success.data";
import { TeacherTestimonial } from "./success.types";
import { motion, AnimatePresence } from "motion/react";

const satinBg = "/src/assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

export const TeacherTestimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherTestimonial | null>(null);

  // 7 Seconds Autoplay loop
  useEffect(() => {
    if (TEACHER_TESTIMONIALS_DATA.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TEACHER_TESTIMONIALS_DATA.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoplayKey]);

  // Handle manual interaction to reset the autoplay timer
  const handleSelect = (index: number) => {
    setCurrent(index);
    setAutoplayKey((prev) => prev + 1);
  };

  const handleNext = () => {
    if (TEACHER_TESTIMONIALS_DATA.length === 0) return;
    handleSelect((current + 1) % TEACHER_TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    if (TEACHER_TESTIMONIALS_DATA.length === 0) return;
    handleSelect((current - 1 + TEACHER_TESTIMONIALS_DATA.length) % TEACHER_TESTIMONIALS_DATA.length);
  };

  const getCardStatus = (index: number) => {
    const total = TEACHER_TESTIMONIALS_DATA.length;
    if (total === 0) return "hidden";
    const diff = (index - current + total) % total;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    if (diff === total - 1) return "prev";
    return "hidden";
  };

  if (TEACHER_TESTIMONIALS_DATA.length === 0) {
    return (
      <div className="w-full py-16 text-center text-slate-400">
        Loading faculty portfolios...
      </div>
    );
  }

  return (
    <div className="relative w-full py-16 px-4 md:px-12 rounded-[40px] bg-[#03050a] overflow-hidden border border-[#dfb76c]/10 select-none shadow-[inset_0_4px_100px_rgba(223,183,108,0.05)] antialiased subpixel-antialiased">
      {/* Background ambient glowing lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[140px] pointer-events-none animate-[pulse_10s_infinite_alternate]" />

      {/* Elegant Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3 z-10 relative">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#dfb76c] block animate-[pulse_3s_infinite]">
          WORLD-CLASS FACULTY PORTFOLIOS
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight uppercase">
          Supervised by Expert Educators
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
          EBM combines precise AI algorithms with academic oversight from master tutors who have decades of Cambridge curriculum mastery.
        </p>
      </div>

      {/* Floating 3D Gold Graduation Cap Icon */}
      <div className="w-full flex justify-center mb-6 z-20 relative h-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.8 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="flex items-center justify-center"
          >
            <div className="w-12 h-12 bg-linear-to-b from-[#FFE082] via-[#FFB300] to-[#B7791F] rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 animate-[bounce_4s_infinite]">
              <GraduationCap className="h-6 w-6 text-slate-950" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3D Cards Deck Container */}
      <div 
        className="relative h-[480px] sm:h-[420px] md:h-[460px] w-full max-w-5xl mx-auto flex items-center justify-center"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Navigation Arrows on the sides */}
        <button
          onClick={handlePrev}
          className="absolute left-0 md:-left-8 z-30 p-3 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#dfb76c]/20 text-[#dfb76c] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
          aria-label="Previous faculty profile"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-8 z-30 p-3 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#dfb76c]/20 text-[#dfb76c] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
          aria-label="Next faculty profile"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {TEACHER_TESTIMONIALS_DATA.map((teacher, idx) => {
          const status = getCardStatus(idx);
          const isActive = status === "active";
          const isPrev = status === "prev";
          const isNext = status === "next";

          // Calculate Framer Motion animation values for 3D layout
          let xTransform = 0;
          let zTransform = 0;
          let yRotation = 0;
          let cardScale = 0.8;
          let cardOpacity = 0;
          let zIndex = 0;

          if (isActive) {
            xTransform = 0;
            zTransform = 0;
            yRotation = 0;
            cardScale = 1;
            cardOpacity = 1;
            zIndex = 20;
          } else if (isPrev) {
            xTransform = -260;
            zTransform = -100;
            yRotation = 35;
            cardScale = 0.8;
            cardOpacity = 0.45;
            zIndex = 10;
          } else if (isNext) {
            xTransform = 260;
            zTransform = -100;
            yRotation = -35;
            cardScale = 0.8;
            cardOpacity = 0.45;
            zIndex = 10;
          } else {
            // hidden
            xTransform = 0;
            zTransform = -300;
            yRotation = 0;
            cardScale = 0.6;
            cardOpacity = 0;
            zIndex = 0;
          }

          return (
            <motion.div
              key={teacher.id}
              style={{
                transformStyle: isActive ? "flat" : "preserve-3d",
                cursor: isActive ? "default" : "pointer",
                zIndex: zIndex,
                backfaceVisibility: isActive ? "visible" : "hidden",
                WebkitBackfaceVisibility: isActive ? "visible" : "hidden",
              }}
              animate={{
                x: xTransform,
                z: isActive ? 0 : zTransform,
                rotateY: isActive ? 0 : yRotation,
                scale: isActive ? 1 : cardScale,
                opacity: cardOpacity,
              }}
              onClick={() => {
                if (!isActive) handleSelect(idx);
              }}
              transition={{ duration: 0.7, type: "spring", stiffness: 85, damping: 15 }}
              className={`absolute w-[290px] sm:w-[330px] md:w-[380px] h-[360px] md:h-[390px] rounded-3xl overflow-hidden transition-colors duration-300 antialiased subpixel-antialiased ${
                isActive 
                  ? "border-2 border-[#dfb76c] shadow-[0_0_35px_rgba(223,183,108,0.25)]" 
                  : "border border-slate-900 shadow-xl opacity-50"
              }`}
            >
              {/* Satin Blue & Gold Texture Background */}
              <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <img 
                  src={satinBg} 
                  alt="Satin Texture background" 
                  className="w-full h-full object-cover opacity-20 mix-blend-lighten select-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#060a14]/99 via-[#03050a]/99 to-[#020306]/99" />
              </div>

              {/* Glowing inner border frame */}
              {isActive && (
                <div className="absolute inset-1 rounded-2.5xl border border-[#dfb76c]/15 pointer-events-none z-10" />
              )}

              {/* Card Inner Content */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full text-left antialiased subpixel-antialiased">
                <div className="space-y-4">
                  
                  {/* Top Quote Icon inside Card & Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-serif text-[#dfb76c] font-extrabold leading-none opacity-80">
                      “
                    </span>
                    <span className="text-[9px] font-black tracking-[0.2em] text-[#dfb76c] uppercase bg-[#dfb76c]/10 px-3 py-1 rounded-full border border-[#dfb76c]/25 max-w-[180px] truncate" title={teacher.subject}>
                      {teacher.subject}
                    </span>
                  </div>

                  {/* Elegant Title */}
                  <h4 className="text-sm font-extrabold text-[#faf8f5] tracking-widest uppercase font-sans border-b border-[#dfb76c]/10 pb-2 flex items-center justify-between">
                    <span>FACULTY PROFILE</span>
                    <span className="flex items-center gap-1 text-[10px] text-blue-400 font-mono font-bold">
                      <Briefcase className="h-3.5 w-3.5" /> {teacher.experience.split(" ")[0]} Yrs Exp
                    </span>
                  </h4>

                  {/* Philosophy Text Body */}
                  <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed italic line-clamp-4 pt-1">
                    “{teacher.philosophy}”
                  </p>

                  {/* Read More button trigger modal */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTeacher(teacher);
                    }}
                    className="text-2xs font-extrabold tracking-wide text-[#dfb76c] hover:text-[#ffd54f] transition flex items-center gap-1.5 cursor-pointer uppercase pt-1"
                  >
                    <span>- Read Full Bio</span>
                    <ArrowRight className="w-3 h-3 text-[#dfb76c]" />
                  </button>

                </div>

                {/* Bottom Profile Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#dfb76c]/10 mt-2">
                  <div className="w-10 h-10 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/20 flex items-center justify-center font-black text-xs text-[#dfb76c] shrink-0">
                    {teacher.name.split(" ").pop()?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#faf8f5] truncate">
                      {teacher.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-semibold truncate">
                      {teacher.experience}
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Dots Indicator at the Bottom */}
      <div className="flex items-center justify-center gap-2 mt-8 z-10 relative">
        {TEACHER_TESTIMONIALS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx 
                ? "w-8 bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" 
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            title={`Slide to faculty profile ${idx + 1}`}
          />
        ))}
      </div>

      {/* Detailed Modal Popup when "Read Full Bio" clicked */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 antialiased">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTeacher(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg bg-[#03050a] border-2 border-[#dfb76c]/35 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(223,183,108,0.15)] z-10 p-6 md:p-8"
            >
              {/* Satin Texture */}
              <div className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]">
                <img 
                  src={satinBg} 
                  alt="Satin design" 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedTeacher(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 hover:border-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Body Content */}
              <div className="relative z-10 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/25 flex items-center justify-center font-black text-sm text-[#dfb76c]">
                    {selectedTeacher.name.split(" ").pop()?.charAt(0) || "T"}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#faf8f5]">
                      {selectedTeacher.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold">
                      {selectedTeacher.subject} • {selectedTeacher.experience}
                    </p>
                  </div>
                </div>

                {/* Socratic philosophy quote */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-[#dfb76c] uppercase tracking-widest block">Pedagogical Philosophy</span>
                  <p className="text-sm text-slate-100 leading-relaxed italic font-serif">
                    “{selectedTeacher.philosophy}”
                  </p>
                </div>

                {/* Why joined EBM */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-[#dfb76c] uppercase tracking-widest block">Why I Teach At EBM</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedTeacher.whyJoined}
                  </p>
                </div>

                {/* AI integration & Impact metadata */}
                <div className="pt-4 border-t border-slate-900 space-y-3">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-[#dfb76c]/15 flex items-center gap-2.5">
                    <Sparkles className="h-4.5 w-4.5 text-[#dfb76c] shrink-0" />
                    <div>
                      <span className="text-[8px] text-slate-400 block uppercase font-mono">FAVOURITE AI INTEGRATION</span>
                      <span className="text-2xs font-extrabold text-[#faf8f5]">
                        {selectedTeacher.favouriteAIFeature}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                    <Award className="h-4.5 w-4.5 shrink-0" />
                    <span>{selectedTeacher.studentImpact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
