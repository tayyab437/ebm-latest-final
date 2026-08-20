import { Variants } from "motion/react";

export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const FADE_IN_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 18,
    },
  },
};

export const SCALE_HOVER_VARIANTS = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.2 } },
  whileTap: { scale: 0.99 },
};

export const TRANSITION_SMOOTH = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};
