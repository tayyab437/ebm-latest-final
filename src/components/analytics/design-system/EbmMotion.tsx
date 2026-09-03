import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export function useReducedMotion(): boolean {
  const [shouldReduce, setShouldReduce] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduce(mq.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setShouldReduce(e.matches);
    };

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    } else if ((mq as any).addListener) {
      (mq as any).addListener(onChange);
      return () => (mq as any).removeListener(onChange);
    }
  }, []);

  return shouldReduce;
}

interface EbmRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

/**
 * EbmReveal coordinates smooth entrance reveals across analytics components.
 * Adheres to EBM Design System:
 * - 600–800ms duration with smooth [0.22, 1, 0.36, 1] easing
 * - 24px initial offset
 * - Automatic prefers-reduced-motion bypass
 */
export const EbmReveal: React.FC<EbmRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  duration = 0.7,
  className = "",
  viewportMargin = "-40px",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance, x: 0 };
      case "down":
        return { y: -distance, x: 0 };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
        return { x: 0, y: 0 };
    }
  };

  const initial = {
    opacity: 0,
    ...getInitialPosition(),
  };

  return (
    <motion.div
      initial={initial}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface EbmStaggerContainerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  viewportMargin?: string;
  once?: boolean;
}

export const EbmStaggerContainer: React.FC<EbmStaggerContainerProps> = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  className = "",
  viewportMargin = "-40px",
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface EbmStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}

export const EbmStaggerItem: React.FC<EbmStaggerItemProps> = ({
  children,
  className = "",
  distance = 20,
  duration = 0.65,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
