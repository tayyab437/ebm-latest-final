import React from "react";
import { ArrowUpRight, MessageSquare, Sparkles, Shield, Trophy, Zap, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useBrandingStore } from "../../lib/branding.store";

interface CTAProps {
  onStartToday: () => void;
  onContactUs: () => void;
}

import satinBg from "../../assets/images/dark_blue_satin_gold_lines_1785743496085.jpg";

export default function CTA({ onStartToday, onContactUs }: CTAProps) {
  const { logoText } = useBrandingStore();
  const brandName = logoText || "EBM";

  return (
    <section 
      id="cta" 
      className="py-28 bg-[#04081c] text-white relative overflow-hidden border-t-2 border-[#1e2a58]/50"
    >
      {/* Immersive background satin texture overlay */}
      <div className="absolute inset-0 z-0 opacity-20 select-none pointer-events-none mix-blend-lighten">
        <img 
          src={satinBg} 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Dark radial gradients to center visual focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,28,68,0.7),#04081c_80%)] pointer-events-none z-10" />
      
      {/* Immersive soft glowing warm and cyan lights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-10" />

      {/* Luxury Golden Sparkles floating slowly */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 rounded-full pointer-events-none hidden md:block z-20"
          style={{
            top: `${10 + i * 8}%`,
            left: `${5 + (i * 17) % 90}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.9, 0.1],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.35,
          }}
        />
      ))}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Main luxury glassmorphic box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#070d28]/90 border-2 border-amber-400/20 hover:border-amber-400/40 rounded-[2.5rem] p-8 sm:p-14 md:p-16 overflow-hidden backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] group transition-all duration-700"
        >
          {/* Subtle Golden Sheen moving across top */}
          <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent group-hover:via-amber-400/70 transition-all duration-1000" />
          
          {/* Orbits & Orbital Rings inside glass card */}
          <div className="absolute -right-24 -bottom-24 w-80 h-80 border border-amber-500/10 rounded-full pointer-events-none -z-10" />
          <div className="absolute -right-36 -bottom-36 w-[450px] h-[450px] border border-amber-500/5 rounded-full pointer-events-none -z-10 animate-[spin_80s_linear_infinite]" />
          <div className="absolute -right-48 -bottom-48 w-[600px] h-[600px] border border-amber-500/5 rounded-full pointer-events-none -z-10 animate-[spin_150s_linear_infinite]" />

          <div className="max-w-3xl mx-auto text-center space-y-10">
            
            {/* Premium Eyebrow Badge */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#090f2b] border-2 border-amber-400/30 hover:border-amber-400/50 text-amber-300 rounded-full px-5 py-2 text-2xs font-mono font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl"
            >
              <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
              <span>{brandName} ACADEMICS • THE SCHOLASTIC ELITE</span>
            </motion.div>
 
            {/* Elegant luxury headline */}
            <div className="space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none uppercase font-sans"
              >
                Ready to Complete <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(245,158,11,0.15)] font-serif italic font-normal normal-case">
                  School Faster?
                </span>
              </motion.h2>
            </div>

            {/* Highly refined description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-sans"
            >
              Enroll in the <strong className="text-amber-300 font-semibold">{brandName} Digital Learning Ecosystem</strong> today. 
              Bypass years of repetitive curriculum, leverage custom AI cognitive blueprints, 
              and attain your Cambridge O-Levels in half the standard duration.
            </motion.p>

            {/* Interactive feature badge list */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-wrap justify-center gap-3 text-[10px] font-mono font-black uppercase tracking-wider text-slate-400"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 rounded-xl border border-[#1e2a58]/50 hover:text-amber-400 hover:border-amber-400/30 transition-all shadow-md">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Ejaz Bukhari Pedagogy</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 rounded-xl border border-[#1e2a58]/50 hover:text-amber-400 hover:border-amber-400/30 transition-all shadow-md">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Accelerated O-Level Track</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/60 rounded-xl border border-[#1e2a58]/50 hover:text-amber-400 hover:border-amber-400/30 transition-all shadow-md">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Tailored Blueprints</span>
              </div>
            </motion.div>

            {/* Premium luxury button row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6"
            >
              {/* Primary Premium Glowing Button */}
              <motion.button
                id="cta-btn-start"
                onClick={onStartToday}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:via-amber-200 hover:to-amber-400 text-slate-950 font-black px-8 py-4.5 rounded-2xl shadow-[0_0_35px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.55)] flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer"
              >
                <span>Start Your Fast-Track Today</span>
                <ArrowUpRight className="h-4 w-4 stroke-[3] text-slate-950" />
              </motion.button>
              
              {/* Secondary Luxury Glass Button */}
              <motion.button
                id="cta-btn-contact"
                onClick={onContactUs}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-[#0a0f2b] hover:bg-[#121946] text-slate-300 hover:text-white font-extrabold px-8 py-4.5 rounded-2xl border-2 border-[#1e2a58]/60 hover:border-[#2a3c7a]/80 transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer shadow-xl"
              >
                <MessageSquare className="h-4 w-4 text-amber-400" />
                <span>Contact Consultations</span>
              </motion.button>
            </motion.div>

            {/* Custom details at the bottom of the card */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-[9px] sm:text-2xs text-slate-500 font-mono font-bold uppercase tracking-widest pt-4 block"
            >
              No credit card required for registration • Cohort 2026 starts immediately
            </motion.p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}