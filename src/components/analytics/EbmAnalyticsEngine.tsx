import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "./design-system/EbmMotion";
import { 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  BookOpen, 
  CheckCheck, 
  RotateCcw, 
  Lightbulb, 
  RefreshCw, 
  Award, 
  TrendingUp 
} from "lucide-react";
import { EbmSurface } from "./design-system";

export interface EvidenceNode {
  id: string;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  angle: number; // in degrees for circular layout
  radiusX: number; // in percentage of container
  radiusY: number;
  depthZ: number; // in px
  tag: string;
}

const EVIDENCE_NODES: EvidenceNode[] = [
  {
    id: "diagnose",
    name: "DIAGNOSE",
    shortDesc: "Understand where the learner is now.",
    icon: Compass,
    angle: 270, // Top
    radiusX: 42,
    radiusY: 38,
    depthZ: 15,
    tag: "Baseline Evidence",
  },
  {
    id: "practise",
    name: "PRACTISE",
    shortDesc: "Build understanding through targeted work.",
    icon: BookOpen,
    angle: 315, // Top-Right
    radiusX: 44,
    radiusY: 40,
    depthZ: 25,
    tag: "Active Learning",
  },
  {
    id: "check",
    name: "CHECK",
    shortDesc: "Verify understanding with immediate feedback.",
    icon: CheckCheck,
    angle: 0, // Right
    radiusX: 46,
    radiusY: 42,
    depthZ: 10,
    tag: "Process Verification",
  },
  {
    id: "correct",
    name: "CORRECT",
    shortDesc: "Repair the misconception before progression.",
    icon: RotateCcw,
    angle: 45, // Bottom-Right
    radiusX: 44,
    radiusY: 40,
    depthZ: 30,
    tag: "Error Repair",
  },
  {
    id: "reflect",
    name: "REFLECT",
    shortDesc: "Deepen metacognition and self-assessment.",
    icon: Lightbulb,
    angle: 90, // Bottom
    radiusX: 42,
    radiusY: 38,
    depthZ: 5,
    tag: "Cognitive Check",
  },
  {
    id: "reassess",
    name: "REASSESS",
    shortDesc: "Test retention through fresh reattempts.",
    icon: RefreshCw,
    angle: 135, // Bottom-Left
    radiusX: 44,
    radiusY: 40,
    depthZ: 20,
    tag: "Independent Retest",
  },
  {
    id: "master",
    name: "MASTER",
    shortDesc: "Confirm readiness through verified evidence.",
    icon: Award,
    angle: 180, // Left
    radiusX: 46,
    radiusY: 42,
    depthZ: 35,
    tag: "Proficiency Locked",
  },
  {
    id: "progress",
    name: "PROGRESS",
    shortDesc: "Unlock new challenges with confidence.",
    icon: TrendingUp,
    angle: 225, // Top-Left
    radiusX: 44,
    radiusY: 40,
    depthZ: 20,
    tag: "Advancement",
  },
];

export const EbmAnalyticsEngine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [canTilt, setCanTilt] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Auto-demonstration active node index
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Check hardware pointer support
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setCanTilt(!shouldReduceMotion && !isTouch);
  }, [shouldReduceMotion]);

  // Automated demonstration sequence (loops every 2.8s when not user-hovering)
  useEffect(() => {
    if (shouldReduceMotion || hoveredNodeId !== null) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EVIDENCE_NODES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [shouldReduceMotion, hoveredNodeId]);

  // Pointer movement 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -3; // max ±3 deg
    const rotY = ((x - centerX) / centerX) * 4; // max ±4 deg

    setRotation({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    if (canTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setHoveredNodeId(null);
  };

  const currentActiveNode = hoveredNodeId 
    ? EVIDENCE_NODES.find(n => n.id === hoveredNodeId) || EVIDENCE_NODES[activeIndex]
    : EVIDENCE_NODES[activeIndex];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="EBM Learning Evidence visual showing the continuous process of diagnose, practise, check, correct, reflect, reassess, master and progress."
      className="relative w-full max-w-[620px] aspect-square min-h-[360px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center select-none"
      style={{
        perspective: "1200px",
      }}
    >
      {/* Screen Reader Accessible Announcement */}
      <div className="sr-only">
        Active learning evidence phase: {currentActiveNode.name} - {currentActiveNode.shortDesc}
      </div>

      {/* Atmospheric Radial Blue Glow Centered Behind 3D Core */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div 
          className="w-[75%] h-[75%] rounded-full opacity-70 transition-opacity duration-1000"
          style={{
            background: "radial-gradient(circle, rgba(0, 163, 224, 0.16) 0%, rgba(0, 163, 224, 0.04) 50%, transparent 75%)"
          }}
        />
        {/* Subtle Technical Spatial Grid */}
        <div 
          className="absolute inset-4 rounded-full border border-slate-200/50 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          style={{
            backgroundImage: "radial-gradient(circle, #00a3e0 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* 3D Main Transform Canvas */}
      <div
        className="relative w-full h-full flex items-center justify-center ebm-preserve-3d"
        style={{
          transform: canTilt && isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
            : "rotateX(0deg) rotateY(0deg)",
          transition: isHovered ? "transform 0.12s ease-out" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >

        {/* SVG Connecting Lines with Traveling Data Pulses */}
        <svg 
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          viewBox="0 0 500 500"
        >
          <defs>
            <linearGradient id="ebmLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00a3e0" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00a3e0" stopOpacity="0.6" />
            </linearGradient>
            <radialGradient id="ebmPulseGrad">
              <stop offset="0%" stopColor="#00a3e0" stopOpacity="1" />
              <stop offset="100%" stopColor="#00a3e0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Static Orbital Guide Rings */}
          <circle cx="250" cy="250" r="195" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 4" opacity="0.65" />
          <circle cx="250" cy="250" r="145" fill="none" stroke="#00a3e0" strokeWidth="1" strokeDasharray="2 6" opacity="0.25" />
          <circle cx="250" cy="250" r="95" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />

          {/* Radiating Evidence Vectors */}
          {EVIDENCE_NODES.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const targetX = 250 + Math.cos(rad) * (node.radiusX * 4.4);
            const targetY = 250 + Math.sin(rad) * (node.radiusY * 4.4);
            const isActive = currentActiveNode.id === node.id;

            return (
              <g key={node.id}>
                {/* Connection Line */}
                <line
                  x1="250"
                  y1="250"
                  x2={targetX}
                  y2={targetY}
                  stroke={isActive ? "#00a3e0" : "#cbd5e1"}
                  strokeWidth={isActive ? "1.75" : "1"}
                  strokeDasharray={isActive ? "none" : "3 4"}
                  opacity={isActive ? 0.9 : 0.4}
                  className="transition-all duration-500"
                />

                {/* Animated Light Pulse traveling from Node to Core or vice-versa */}
                {isActive && !shouldReduceMotion && (
                  <circle
                    r="3.5"
                    fill="#00a3e0"
                    className="shadow-sm"
                  >
                    <animateMotion
                      path={`M ${targetX} ${targetY} L 250 250`}
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* ========================================================================= */}
        {/* CENTRAL LEARNING EVIDENCE CORE (4-6 Translucent Layers with 3D Depth) */}
        {/* ========================================================================= */}
        <div 
          className="relative z-10 flex items-center justify-center ebm-preserve-3d"
          style={{ transform: "translateZ(20px)" }}
        >
          {/* Layer 1: Outer Atmospheric Depth Glow Ring */}
          <div 
            className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-sky-200/50 bg-sky-50/40 animate-[spin_60s_linear_infinite]"
            style={{
              boxShadow: "0 0 45px -10px rgba(0,163,224,0.18)",
            }}
          />

          {/* Layer 2: Intermediate Evidence Compass Orbit */}
          <div 
            className="absolute w-48 h-48 sm:w-54 sm:h-54 rounded-full border border-dashed border-[#00a3e0]/30 animate-[spin_40s_linear_infinite_reverse]"
          />

          {/* Layer 3: Glassmorphic State Sphere */}
          <div 
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-b from-white via-white to-sky-50 border border-white shadow-[0_16px_40px_-12px_rgba(0,163,224,0.22),inset_0_2px_6px_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(0,163,224,0.1)] flex flex-col items-center justify-center p-3 text-center transition-all duration-500 hover:shadow-[0_20px_50px_-10px_rgba(0,163,224,0.32)]"
          >
            {/* Tiny Ambient Pulsing Ring inside core */}
            <div className="absolute inset-1.5 rounded-full border border-sky-100/80 pointer-events-none" />

            {/* Core Label */}
            <div className="space-y-0.5 relative z-10">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-[#00a3e0] block">
                EBM
              </span>
              <div className="text-[12px] sm:text-[14px] font-black text-slate-900 leading-tight uppercase tracking-tight">
                LEARNING<br />EVIDENCE
              </div>
              <div className="pt-1 flex items-center justify-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">
                  CONTINUOUSLY UPDATED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EVIDENCE NODES (8 Orbiting Interactive Nodes) */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 pointer-events-none ebm-preserve-3d">
          {EVIDENCE_NODES.map((node, idx) => {
            const rad = (node.angle * Math.PI) / 180;
            // Calculate absolute coordinate % relative to center (50%)
            const leftPercent = 50 + Math.cos(rad) * node.radiusX;
            const topPercent = 50 + Math.sin(rad) * node.radiusY;
            const isActive = currentActiveNode.id === node.id;
            const Icon = node.icon;

            return (
              <div
                key={node.id}
                style={{
                  left: `${leftPercent}%`,
                  top: `${topPercent}%`,
                  transform: `translate(-50%, -50%) translateZ(${isActive ? node.depthZ + 15 : node.depthZ}px)`,
                }}
                className="absolute pointer-events-auto z-20 transition-all duration-300 ease-out"
              >
                <button
                  type="button"
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onFocus={() => setHoveredNodeId(node.id)}
                  onBlur={() => setHoveredNodeId(null)}
                  onClick={() => setActiveIndex(idx)}
                  className={`group relative flex items-center justify-center cursor-pointer transition-all duration-300 rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#00a3e0] focus:ring-offset-2 ${
                    isActive
                      ? "scale-110 shadow-[0_8px_24px_-4px_rgba(0,163,224,0.35)]"
                      : "scale-95 hover:scale-105 opacity-85 hover:opacity-100 shadow-sm"
                  }`}
                  aria-label={`${node.name}: ${node.shortDesc}`}
                >
                  {/* Node Capsule Background */}
                  <div
                    className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? "bg-[#00a3e0] text-white border border-cyan-300/60 shadow-md"
                        : "bg-white text-slate-700 border border-slate-200/90 group-hover:border-[#00a3e0]/50 group-hover:text-[#0076a5]"
                    }`}
                  >
                    <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 ${isActive ? "text-white" : "text-[#00a3e0]"}`} />
                    <span className="whitespace-nowrap">{node.name}</span>
                  </div>

                  {/* Active Aura Wave */}
                  {isActive && !shouldReduceMotion && (
                    <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-35 pointer-events-none" />
                  )}

                  {/* Interactive Floating Tooltip (Visible on Hover / Focus / Active) */}
                  {(hoveredNodeId === node.id || (isActive && !isHovered)) && (
                    <div
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 sm:w-56 bg-slate-900/95 text-white text-left p-2.5 rounded-xl shadow-xl border border-slate-700/80 backdrop-blur-md z-30 pointer-events-none transition-all duration-200"
                      role="tooltip"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-cyan-300">
                          {node.tag}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>
                      <p className="text-[11px] font-medium text-slate-200 leading-snug">
                        {node.shortDesc}
                      </p>
                      {/* Triangle Pointer */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* FLOATING GLASS DATA PANELS (At Distinct Z-Depths) */}
        {/* ========================================================================= */}

        {/* Panel 1: CURRENT STATE (Top Left - Depth Z: +25px) */}
        <div
          className="hidden sm:block absolute top-[6%] left-[4%] z-20 pointer-events-none ebm-preserve-3d"
          style={{ transform: "translateZ(25px)" }}
        >
          <div className="bg-white border border-slate-200/90 rounded-2xl p-3 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08)] space-y-1 w-36">
            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-slate-400">
              <span>CURRENT STATE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm font-black text-amber-900">Developing</span>
            </div>
            <span className="text-[8px] font-bold text-slate-400 block truncate">
              Equations · Active
            </span>
          </div>
        </div>

        {/* Panel 2: NEXT ACTION (Bottom Right - Depth Z: +45px) */}
        <div
          className="hidden sm:block absolute bottom-[8%] right-[4%] z-20 pointer-events-none ebm-preserve-3d"
          style={{ transform: "translateZ(45px)" }}
        >
          <div className="bg-white border border-sky-200 rounded-2xl p-3 shadow-[0_16px_32px_-8px_rgba(0,163,224,0.18)] space-y-1 w-44">
            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider text-[#0076a5]">
              <span>NEXT ACTION</span>
              <Activity className="w-3 h-3 text-[#00a3e0]" />
            </div>
            <div className="text-xs font-black text-slate-900">
              Targeted Practice
            </div>
            <span className="text-[8px] font-medium text-slate-500 block">
              Direct error correction
            </span>
          </div>
        </div>

        {/* Panel 3: EVIDENCE SUMMARY (Bottom Left - Depth Z: -15px / behind) */}
        <div
          className="hidden sm:block absolute bottom-[6%] left-[6%] z-10 pointer-events-none ebm-preserve-3d"
          style={{ transform: "translateZ(-15px)" }}
        >
          <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 shadow-sm text-left w-36 opacity-95">
            <span className="text-[8px] font-black uppercase tracking-wider text-slate-400 block">
              EVIDENCE RECORD
            </span>
            <div className="text-[11px] font-black text-slate-800 mt-0.5">
              3 corrected <span className="text-slate-300">·</span> 2 dev.
            </div>
          </div>
        </div>

      </div>

      {/* Mobile Stacked Demonstration Cards (Below 640px) */}
      <div className="sm:hidden absolute -bottom-6 left-2 right-2 flex items-center justify-between gap-2 z-30 pointer-events-none">
        <div className="bg-white border border-slate-200/90 rounded-xl p-2 shadow-xs flex-1 text-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase block">State</span>
          <span className="text-[10px] font-black text-amber-800 block">Developing</span>
        </div>
        <div className="bg-white border border-sky-200 rounded-xl p-2 shadow-xs flex-1 text-center">
          <span className="text-[8px] font-bold text-[#0076a5] uppercase block">Action</span>
          <span className="text-[10px] font-black text-slate-900 block truncate">Targeted Practice</span>
        </div>
        <div className="bg-white border border-slate-200/90 rounded-xl p-2 shadow-xs flex-1 text-center">
          <span className="text-[8px] font-bold text-slate-400 uppercase block">Phase</span>
          <span className="text-[10px] font-black text-[#00a3e0] block">{currentActiveNode.name}</span>
        </div>
      </div>
    </div>
  );
};
