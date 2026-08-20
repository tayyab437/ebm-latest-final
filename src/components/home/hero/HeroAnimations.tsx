import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return reducedMotion;
}

export const faderVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const, // Custom premium cubic-bezier easeOut
      delay: custom * 0.1,
    },
  }),
};

export const floatingAnimation = (delay: number) => ({
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay,
    },
  },
});
