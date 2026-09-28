import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, ArrowRight, BookOpen, Facebook, Send, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useBrandingStore } from "../../../lib/branding.store";

interface HeroSliderProps {
  onStartLearning: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onStartLearning, onNavigateToTab }) => {
  const { heroSlides, logoText } = useBrandingStore();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const DEFAULT_HERO_SLIDES = [
    {
      id: "slide-1",
      title: `${logoText || "EBM"} ADMISSION`,
      subtitle: "We offer exciting school admission deals, certified teachers, and tailored learning plans to help you succeed!",
      ctaText: "Enroll Now",
      ctaUrl: "auth-login",
      imageUrl: "https://images.unsplash.com/photo-1525921429624-479b6c294548?auto=format&fit=crop&q=50&fm=webp&w=600"
    },
    {
      id: "slide-2",
      title: "O-LEVEL MASTERY",
      subtitle: "Accelerated 3-year structured paths guided by our learning methodology.",
      ctaText: "Discover More",
      ctaUrl: "roadmap",
      imageUrl: "https://images.unsplash.com/photo-1607013407627-6ee814329547?auto=format&fit=crop&q=50&fm=webp&w=600"
    }
  ];

  const slides = Array.isArray(heroSlides) && heroSlides.length > 0 ? heroSlides : DEFAULT_HERO_SLIDES;

  const getParsedTitle = (title: string) => {
    if (!title) return { main: logoText || "EBM", highlight: "ADMISSION" };
    const words = title.trim().split(/\s+/);
    if (words.length <= 1) {
      return { main: words[0] || "EBM", highlight: "PORTAL" };
    }
    const highlight = words[words.length - 1];
    const main = words.slice(0, -1).join(" ");
    return { main, highlight };
  };

  // Adjust current if slides length reduces dynamically
  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (ctaUrl: string) => {
    if (ctaUrl === "auth-login" || ctaUrl === "auth") {
      onStartLearning();
    } else {
      const cleanUrl = ctaUrl.replace("#", "");
      if (cleanUrl === "roadmap" || cleanUrl === "contact" || cleanUrl === "about" || cleanUrl === "home") {
        onNavigateToTab(cleanUrl);
      } else {
        const el = document.getElementById(cleanUrl);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          onStartLearning();
        }
      }
    }
  };

  const activeSlide = slides[current] || slides[0];

  return (
    <section 
      id="hero-slider-section" 
      className="relative h-[640px] md:h-[700px] w-full overflow-hidden bg-[#0e1118] flex items-center select-none"
    >
      {/* Background ambient light effects matching the premium blue theme */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[5%] right-[20%] w-[380px] h-[380px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_infinite_alternate]" />

      {/* Curved White Panel on the Left - Replicating the Image Layout with High Fidelity */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-full md:w-[58%] lg:w-[53%] xl:w-[48%] bg-white rounded-none md:rounded-r-[280px] lg:rounded-r-[360px] xl:rounded-r-[440px] z-0 shadow-[25px_0_60px_rgba(0,0,0,0.18)] border-r border-white/10"
      />

      {/* Grid Container for Layout Alignment */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full relative z-10">
        
        {/* Left Column: Text, CTAs, Badges and Socials over the White Canvas */}
        <div className="col-span-1 md:col-span-6 lg:col-span-5 flex flex-col justify-center space-y-6 max-w-full md:max-w-[390px] lg:max-w-[440px] xl:max-w-[490px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Optional Active Slide Eyebrow */}
              <div className="inline-flex items-center gap-1.5 text-[10px] font-sans font-extrabold tracking-widest text-blue-600 uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                <span>{logoText ? logoText.toUpperCase() : "EBM ACADEMICS"} • ANNOUNCEMENT</span>
              </div>

              {/* Headline block - custom styled to mimic the image exactly but in BLUE theme */}
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-none text-slate-900 font-sans uppercase">
                {(() => {
                  const { main, highlight } = getParsedTitle(activeSlide?.title);
                  return (
                    <>
                      {main} <br />
                      <span className="text-blue-600 block mt-1">{highlight}</span>
                    </>
                  );
                })()}
              </h1>

              {/* Subtitle / Paragraph */}
              <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-sans font-medium max-w-md">
                {activeSlide?.subtitle}
              </p>

              {/* Action Section containing speech bubble badge & socials */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 pt-4">
                
                {/* Speech-bubble container */}
                <div className="relative inline-block shrink-0">
                  <button
                    onClick={() => handleCtaClick(activeSlide?.ctaUrl || "auth-login")}
                    className="relative z-10 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  >
                    <span>{activeSlide?.ctaText || "Enroll Now"}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                  {/* Bubble diagonal tail to match image structure */}
                  <div className="absolute -bottom-1 left-6 w-3.5 h-3.5 bg-blue-600 rotate-45 transform z-0 rounded-xs" />
                </div>

                {/* Status Indicator & Socials */}
                <div className="flex flex-col space-y-2">
                  <span className="text-blue-600 font-black text-[10px] sm:text-xs uppercase tracking-[0.15em] block">
                    {logoText ? `${logoText.toUpperCase()} IS ACTIVE` : "NOW OPEN FOR REGISTRATION"}
                  </span>
                  
                  {/* Social Circles matching image bottom layout */}
                  <div className="flex items-center gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-md hover:scale-105">
                      <Facebook className="w-4 h-4 fill-white text-transparent" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-md hover:scale-105">
                      <Send className="w-4 h-4 fill-white text-transparent ml-[-1px] mt-[-1px]" />
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition shadow-md hover:scale-105">
                      <Globe className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Dynamic Circular Mascot with Classroom Background & 3D Breakout Overlay */}
        <div className="hidden md:flex md:col-span-6 lg:col-span-7 items-center justify-center relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[340px] lg:max-w-[420px] xl:max-w-[460px] aspect-square flex items-center justify-center"
            >
              {/* Outer rotating dashed ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/20 animate-spin-slow pointer-events-none" />
              
              {/* Inner glowing blue framing ring */}
              <div className="absolute inset-4 rounded-full bg-blue-950/20 border-[6px] border-blue-500/10 pointer-events-none shadow-[0_0_50px_rgba(37,99,235,0.1)]" />
              
              {/* Circle masked background with classroom photography & blue overlay */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-[6px] border-blue-500/40 shadow-2xl bg-[#0d1222]">
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800" 
                  alt="Interactive modern classroom and learning environment" 
                  className="w-full h-full object-cover opacity-25 filter blur-[0.5px]"
                />
                {/* Radial deep blue gradient to make student pop out */}
                <div className="absolute inset-0 bg-blue-600/20 mix-blend-color" />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950 via-blue-900/40 to-transparent" />
              </div>

              {/* Beautiful 3D Breakout Portrait of Student */}
              <div className="absolute inset-x-0 bottom-0 h-[120%] z-20 overflow-visible flex justify-center pointer-events-none">
                <img 
                  src={activeSlide?.imageUrl || "https://images.unsplash.com/photo-1525921429624-479b6c294548?q=80&w=800"} 
                  alt={activeSlide?.title ? `${activeSlide.title} - EBM Learning Student` : "EBM Student achieving academic excellence"} 
                  className="h-[105%] object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.7)] select-none hover:scale-[1.03] transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>



      {/* Auto-play status loop indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-12 z-20 flex items-center gap-4">
        {/* Indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer ${
                current === idx ? "w-6 bg-blue-500" : "w-1.5 bg-slate-500/50 hover:bg-slate-500"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Play/Pause control */}
        {slides.length > 1 && (
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-md bg-slate-900/40 hover:bg-slate-900/80 border border-slate-700/30 text-slate-400 hover:text-white transition cursor-pointer"
            title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-blue-400" /> : <Play className="w-3 h-3 text-amber-500 fill-amber-500" />}
          </button>
        )}
      </div>

    </section>
  );
};

