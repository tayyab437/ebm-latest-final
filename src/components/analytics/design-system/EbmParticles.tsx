import React, { useEffect, useState } from "react";

interface EbmEvidenceParticlesProps {
  count?: number;
  className?: string;
}

/**
 * EbmEvidenceParticles renders ultra-subtle floating learning evidence nodes.
 * - Represents continuous learning evidence (not stars or space)
 * - Low opacity (0.15 - 0.35), very slow drift
 * - Respects prefers-reduced-motion
 */
export const EbmEvidenceParticles: React.FC<EbmEvidenceParticlesProps> = ({
  count = 14,
  className = "",
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      setShouldRender(true);
    }
  }, []);

  if (!shouldRender) return null;

  // Stable procedural particle positions
  const particles = Array.from({ length: count }, (_, i) => {
    const top = ((i * 19.3 + 7) % 90) + 5;
    const left = ((i * 23.7 + 13) % 92) + 4;
    const size = (i % 3) + 2.5; // 2.5px to 4.5px
    const duration = 18 + (i % 5) * 4; // 18s - 34s
    const delay = (i % 4) * 2;
    const isBlue = i % 2 === 0;

    return {
      id: i,
      top: `${top}%`,
      left: `${left}%`,
      size,
      duration: `${duration}s`,
      delay: `${delay}s`,
      bg: isBlue ? "bg-[#00a3e0]/30" : "bg-sky-400/25",
    };
  });

  return (
    <div aria-hidden="true" className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.bg}`}
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
