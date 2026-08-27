import React from "react";

export type EbmSurfaceLevel = "1" | "2" | "3" | "glass" | "dark" | "dark-accent";

interface EbmSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: EbmSurfaceLevel;
  className?: string;
  children?: React.ReactNode;
  interactive?: boolean;
}

/**
 * EbmSurface provides a consistent 3-level depth + glass/dark intelligence hierarchy.
 * Level 1: Flat content / base card (subtle border, light neutral)
 * Level 2: Elevated surface (crisp border, soft diffuse shadow)
 * Level 3: Floating intelligence panel (translucent layered depth, blue-tinged soft glow)
 * Glass: Selective glassmorphism (backdrop-blur-xl, translucent border)
 * Dark: Deep slate intelligence surface (slate-950, atmospheric blue glow, hairline border)
 */
export const EbmSurface: React.FC<EbmSurfaceProps> = ({
  level = "2",
  className = "",
  children,
  interactive = false,
  ...props
}) => {
  const getLevelClasses = () => {
    switch (level) {
      case "1":
        return "bg-white/80 border border-slate-200/80 rounded-[20px] shadow-xs";
      case "2":
        return `bg-white border border-slate-200/90 rounded-[22px] shadow-sm ${
          interactive ? "hover:border-slate-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5" : ""
        }`;
      case "3":
        return `bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-[24px] shadow-[0_16px_40px_-16px_rgba(0,163,224,0.12),0_4px_16px_-4px_rgba(15,23,42,0.04)] ${
          interactive ? "hover:border-[#00a3e0]/40 hover:shadow-[0_20px_48px_-12px_rgba(0,163,224,0.18)] transition-all duration-300 hover:-translate-y-1" : ""
        }`;
      case "glass":
        return "bg-white/75 backdrop-blur-xl border border-white/70 rounded-[22px] shadow-[0_8px_32px_0_rgba(15,23,42,0.06)]";
      case "dark":
        return "bg-slate-950 text-white border border-slate-800/80 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden";
      case "dark-accent":
        return "bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white border border-cyan-500/20 rounded-[24px] shadow-[0_20px_50px_-12px_rgba(0,163,224,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden";
      default:
        return "bg-white border border-slate-200/90 rounded-[22px] shadow-sm";
    }
  };

  return (
    <div className={`${getLevelClasses()} ${className}`} {...props}>
      {children}
    </div>
  );
};
