import React from "react";
import { motion } from "motion/react";

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white">
      {/* Scholastic Fine Grid Pattern resembling classic blueprints and textbook grids */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)] opacity-[0.07]" 
      />

      {/* Warm Soft Atmospheric Lights to represent academic depth and clarity */}
      <motion.div
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[-10%] right-[15%] h-[450px] w-[450px] rounded-full bg-indigo-400/15 blur-[130px] pointer-events-none"
      />

      {/* Scholastic circular light ring accent for prestige branding */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[700px] w-[700px] rounded-full border border-blue-500/[0.04] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_30%,rgba(0,0,0,0)_100%)] pointer-events-none" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full border border-blue-500/[0.04] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_20%,rgba(0,0,0,0)_100%)] pointer-events-none" />

      {/* Blue top accent line representing excellence */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </div>
  );
};

