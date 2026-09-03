import React from "react";

interface EbmAtmosphericCanvasProps {
  children: React.ReactNode;
  className?: string;
  showWarmth?: boolean;
}

/**
 * EbmAtmosphericCanvas provides a multi-layer educational atmosphere:
 * - Base: Crisp light slate/neutral
 * - Atmospheric Layer: Ultra-subtle radial blue (#00a3e0) atmospheric glow
 * - Secondary Warmth: Controlled amber (#f59e0b) warmth
 * - Soft diffuse white lighting centers
 */
export const EbmAtmosphericCanvas: React.FC<EbmAtmosphericCanvasProps> = ({
  children,
  className = "",
  showWarmth = true,
}) => {
  return (
    <div className={`relative bg-slate-50/95 text-slate-800 selection:bg-[#00a3e0]/20 selection:text-[#0076a5] overflow-hidden ${className}`}>
      {/* Layer 1: Ambient Top-Left Blue Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 left-[-10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(0, 163, 224, 0.08) 0%, rgba(0, 163, 224, 0.02) 45%, transparent 70%)"
        }}
      />

      {/* Layer 2: Mid-Right Subtle Blue/Teal Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-[30%] right-[-15%] w-[60vw] h-[60vw] max-w-[850px] max-h-[850px] rounded-full opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(0, 163, 224, 0.07) 0%, rgba(14, 165, 233, 0.015) 50%, transparent 75%)"
        }}
      />

      {/* Layer 3: Occasional Subtle Amber Learning Warmth */}
      {showWarmth && (
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute top-[60%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-50"
          style={{
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 65%)"
          }}
        />
      )}

      {/* Layer 4: Lower Atmospheric Depth */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-[10%] right-[-5%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(0, 163, 224, 0.06) 0%, transparent 70%)"
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
