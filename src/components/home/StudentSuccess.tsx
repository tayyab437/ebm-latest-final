import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Quote, Award, CheckCircle } from "lucide-react";
import { HOME_TESTIMONIALS } from "./constants";

export default function StudentSuccess() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HOME_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HOME_TESTIMONIALS.length) % HOME_TESTIMONIALS.length);
  };

  const current = HOME_TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-blue-600 dark:text-blue-400 text-xs font-mono tracking-widest uppercase font-extrabold px-3 py-1 bg-blue-50 dark:bg-blue-950/40 rounded-full border border-blue-100 dark:border-blue-900/40">
            Alumni Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Verified Success Stories
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            See how the Ejaz Bukhari Method (EBM) has helped students accelerate their academic pathways with confidence and high-scoring results.
          </p>
        </div>

        {/* Carousel Block */}
        <div className="max-w-4xl mx-auto relative bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-sm">
          {/* Double Quote Vector Decors */}
          <div className="absolute top-6 left-6 text-slate-200 dark:text-slate-800 pointer-events-none">
            <Quote className="h-16 w-16 fill-current rotate-180 opacity-50" />
          </div>

          <div className="relative z-10 space-y-6 text-left">
            {/* Rating Stars */}
            <div className="flex gap-1 text-blue-500 dark:text-amber-400">
              {Array.from({ length: current.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 sm:h-5 w-4 sm:w-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Core Text */}
            <blockquote className="text-slate-800 dark:text-slate-200 text-base sm:text-lg lg:text-xl font-medium leading-relaxed italic">
              "{current.text}"
            </blockquote>

            {/* User Bio and Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-black text-xs">
                  {current.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">{current.name}</h4>
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-550 font-mono uppercase tracking-wider">{current.role}</p>
                </div>
              </div>

              {/* Verified Badge */}
              {current.yearAchieved && (
                <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-900/30">
                  <Award className="h-3.5 w-3.5" />
                  <span>{current.yearAchieved}</span>
                </div>
              )}
            </div>
          </div>

          {/* Slider Controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <button 
              id="testimonial-btn-prev"
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center justify-center transition cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              id="testimonial-btn-next"
              onClick={handleNext}
              className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm flex items-center justify-center transition cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Micro Achievements Bar */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-inner">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">100% CIE Pass Rate</h4>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">Every fast-track candidate has successfully passed CIE board exams.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-inner">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">8.4 Average A/A* Grades</h4>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">Students average exceptional distinction scores in Cambridge syllabi.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-inner">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">3-Year Average Acceleration</h4>
              <p className="text-xs text-slate-550 dark:text-slate-400 mt-1">Bypasses secondary redundancies safely without stress.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
