import React, { useState, useEffect } from "react";
import { Star, MapPin, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  childGrade: string;
  rating: number;
  review: string;
  location: string;
  childrenEnrolled: number;
}

const satinBg = "/src/assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

export const ParentTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoplayKey, setAutoplayKey] = useState(0);
  const [selectedReview, setSelectedReview] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch parent testimonials from backend
  const loadTestimonials = async () => {
    try {
      const res = await fetch("/api/parent-testimonials");
      const data = await res.json();
      if (data.success && data.testimonials && data.testimonials.length > 0) {
        setTestimonials(data.testimonials);
      } else {
        // Use default fallback if database is empty or error
        useFallback();
      }
    } catch (err) {
      console.error("Error loading parent testimonials:", err);
      useFallback();
    } finally {
      setLoading(false);
    }
  };

  const useFallback = () => {
    setTestimonials([
      {
        id: "parent-1",
        name: "Dr. Robert Chen",
        occupation: "Senior Consultant Cardiologist",
        childGrade: "Grade 11 (O Level Mathematics & Biology)",
        rating: 5,
        review: "As a physician, I value evidence-based methods. EBM's diagnostic analytics are incredibly rigorous. It doesn't just say 'study more'; it shows exactly which sub-concepts my son is struggling with. His scores moved from B to a strong A* in under a semester.",
        location: "Singapore",
        childrenEnrolled: 2
      },
      {
        id: "parent-2",
        name: "Sarah Jenkins",
        occupation: "Software Engineering Director",
        childGrade: "Grade 10 (O Level Science & English)",
        rating: 5,
        review: "The integration of Socratic AI is flawless. Unlike other platforms that just give answers, EBM guides my daughter to find the answer herself. She is developing real critical thinking skills instead of just rote memorization. Highly recommended for parents who care about long-term growth.",
        location: "London, UK",
        childrenEnrolled: 1
      },
      {
        id: "parent-3",
        name: "Fatimah Al-Mutawa",
        occupation: "Educational Psychologist",
        childGrade: "Grade 11 (O Level Chemistry & Physics)",
        rating: 5,
        review: "I was skeptical about another digital platform, but EBM's instructional design is flawless. The cognitive load is perfectly balanced, the feedback is immediate, and the gamified progression is genuinely motivating. It builds deep focus without the dopamine fatigue of cheap study games.",
        location: "Dubai, UAE",
        childrenEnrolled: 2
      },
      {
        id: "parent-4",
        name: "Marcus Thorne",
        occupation: "Managing Director, Thorne Investments",
        childGrade: "Grade 9 (Pre-O Level Science Foundations)",
        rating: 5,
        review: "The EBM parent portal is magnificent. I get actionable weekly reports detailing study habits, mastery percentages, and immediate action items. No more guessing how my kids are doing or waiting for parent-teacher conferences. I can support them dynamically.",
        location: "Cape Town, South Africa",
        childrenEnrolled: 3
      }
    ]);
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  // 7 Seconds Autoplay loop
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoplayKey, testimonials]);

  // Handle manual interaction to reset the autoplay timer
  const handleSelect = (index: number) => {
    setCurrent(index);
    setAutoplayKey((prev) => prev + 1);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    handleSelect((current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    handleSelect((current - 1 + testimonials.length) % testimonials.length);
  };

  const getCardStatus = (index: number) => {
    const total = testimonials.length;
    if (total === 0) return "hidden";
    const diff = (index - current + total) % total;
    if (diff === 0) return "active";
    if (diff === 1) return "next";
    if (diff === total - 1) return "prev";
    return "hidden";
  };

  if (testimonials.length === 0) {
    return (
      <div className="w-full py-16 text-center text-slate-400">
        Loading parents journey testimonials...
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
          PREMIUM PARENTAL ENDORSEMENT
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-sans tracking-tight uppercase">
          Parents Journey
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider">
          Real experiences shared by managing directors, educators, and cardiologists about EBM's diagnostic academic outcomes.
        </p>
      </div>

      {/* Floating 3D Gold Quotation Mark above the active card */}
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
            <svg 
              viewBox="0 0 100 80" 
              className="w-16 h-12 text-[#dfb76c] drop-shadow-[0_12px_20px_rgba(223,183,108,0.25)] animate-[bounce_4s_infinite] select-none" 
              fill="url(#goldGradient3D)"
            >
              <defs>
                <linearGradient id="goldGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="25%" stopColor="#FFD54F" />
                  <stop offset="50%" stopColor="#FFB300" />
                  <stop offset="75%" stopColor="#FF8F00" />
                  <stop offset="100%" stopColor="#B7791F" />
                </linearGradient>
              </defs>
              <path d="M20 0 C 8 0, 0 12, 0 30 C 0 55, 12 70, 25 70 C 35 70, 42 62, 42 50 C 42 38, 34 32, 26 32 C 24 32, 20 34, 18 36 C 18 20, 28 10, 38 4 L 20 0 Z" />
              <path d="M70 0 C 58 0, 50 12, 50 30 C 50 55, 62 70, 75 70 C 85 70, 92 62, 92 50 C 92 38, 84 32, 76 32 C 74 32, 70 34, 68 36 C 68 20, 78 10, 88 4 L 70 0 Z" />
            </svg>
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
          aria-label="Previous review"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 md:-right-8 z-30 p-3 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-[#dfb76c]/20 text-[#dfb76c] hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
          aria-label="Next review"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {testimonials.map((testimonial, idx) => {
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
            zTransform = 0; // Keeping 0 for the active card completely removes 3D raster blurring!
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
              key={testimonial.id}
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
                {/* Sleek radial background to overlay text with zero fuzziness */}
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
                    {/* Golden quote marker inside card */}
                    <span className="text-3xl font-serif text-[#dfb76c] font-extrabold leading-none opacity-80">
                      “
                    </span>
                    <span className="text-[9px] font-black tracking-[0.2em] text-[#dfb76c] uppercase bg-[#dfb76c]/10 px-3 py-1 rounded-full border border-[#dfb76c]/25">
                      PARENTS OF ALUMNI
                    </span>
                  </div>

                  {/* Elegant Title */}
                  <h4 className="text-sm font-extrabold text-[#faf8f5] tracking-widest uppercase font-sans border-b border-[#dfb76c]/10 pb-2 flex items-center justify-between">
                    <span>LATEST REVIEW</span>
                    <span className="flex items-center gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                      ))}
                    </span>
                  </h4>

                  {/* Review Text Body - Crystal clear, no filter blur */}
                  <p className="text-xs md:text-sm text-slate-100 font-medium leading-relaxed italic line-clamp-5 pt-1">
                    “{testimonial.review}”
                  </p>

                  {/* Read More button trigger modal */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedReview(testimonial);
                    }}
                    className="text-2xs font-extrabold tracking-wide text-[#dfb76c] hover:text-[#ffd54f] transition flex items-center gap-1.5 cursor-pointer uppercase pt-1"
                  >
                    <span>- Read More</span>
                    <ArrowRight className="w-3 h-3 text-[#dfb76c]" />
                  </button>

                </div>

                {/* Bottom Profile Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#dfb76c]/10 mt-2">
                  {/* User Profile Circular Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#dfb76c]/10 border border-[#dfb76c]/20 flex items-center justify-center font-black text-xs text-[#dfb76c] shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#faf8f5] truncate">
                      {testimonial.name}
                    </h5>
                    <p className="text-[10px] text-slate-400 font-semibold truncate">
                      {testimonial.occupation}
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
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              current === idx 
                ? "w-8 bg-[#dfb76c] shadow-[0_0_8px_#dfb76c]" 
                : "w-2 bg-slate-700 hover:bg-slate-500"
            }`}
            title={`Slide to parent review ${idx + 1}`}
          />
        ))}
      </div>

      {/* Detailed Modal Popup when "Read More" clicked */}
      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 antialiased">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
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
                onClick={() => setSelectedReview(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800 hover:border-slate-700 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Body Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#dfb76c]/15 border border-[#dfb76c]/25 flex items-center justify-center font-black text-sm text-[#dfb76c]">
                    {selectedReview.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#faf8f5]">
                      {selectedReview.name}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold">
                      {selectedReview.occupation} • {selectedReview.location}
                    </p>
                  </div>
                </div>

                {/* Rating Representation */}
                <div className="flex items-center gap-1">
                  {[...Array(selectedReview.rating)].map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400 shrink-0" />
                  ))}
                </div>

                {/* Full Review Text Block */}
                <p className="text-sm text-slate-100 leading-relaxed italic font-serif">
                  “{selectedReview.review}”
                </p>

                {/* Statistics Meta Row */}
                <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-y-3 gap-x-6 justify-between items-center text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span>Location: {selectedReview.location}</span>
                  </div>
                  <div>
                    <span>Children Enrolled: {selectedReview.childrenEnrolled} scholar(s)</span>
                  </div>
                  <div className="px-3 py-1 bg-[#dfb76c]/10 rounded-md border border-[#dfb76c]/20 text-[#dfb76c] font-sans font-bold text-xs">
                    {selectedReview.childGrade}
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
