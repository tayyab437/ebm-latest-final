import React, { useRef, useState, useEffect } from "react";

interface Ebm3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees, default 3
  glare?: boolean;
}

/**
 * Ebm3DCard introduces subtle educational 3D depth to interactive analytics panels.
 * - Restricts tilt to subtle ±3°
 * - Automatically disables on touch devices and prefers-reduced-motion
 * - Uses hardware-accelerated CSS perspective & transforms
 */
export const Ebm3DCard: React.FC<Ebm3DCardProps> = ({
  children,
  className = "",
  maxTilt = 3,
  glare = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [canTilt, setCanTilt] = useState(false);

  useEffect(() => {
    // Check for coarse pointer (touch device) or reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setCanTilt(!prefersReducedMotion && !isTouchDevice);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    if (canTilt) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      {...props}
    >
      <div
        style={{
          transform: canTilt && isHovered 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(8px)` 
            : "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="w-full h-full"
      >
        {children}
        {glare && isHovered && canTilt && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + rotation.y * 10}% ${50 - rotation.x * 10}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
