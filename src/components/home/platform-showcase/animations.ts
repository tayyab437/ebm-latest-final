import { Variants } from "motion/react";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

export const tabTransitionVariants: Variants = {
  enter: { opacity: 0, x: 20 },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 }
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.15 } }
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};
