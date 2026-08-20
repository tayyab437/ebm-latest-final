import React from "react";
import { motion } from "motion/react";
import { FeatureCardData } from "./why-ebm.types";
import { FeatureCard } from "./FeatureCard";
import { cardContainerVariants, cardItemVariants, useReducedMotion } from "./animations";

interface FeatureGridProps {
  features: FeatureCardData[];
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => {
  const isReduced = useReducedMotion();

  return (
    <motion.div
      variants={cardContainerVariants}
      initial={isReduced ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {features.map((feature) => (
        <motion.div key={feature.id} variants={isReduced ? undefined : cardItemVariants}>
          <FeatureCard feature={feature} />
        </motion.div>
      ))}
    </motion.div>
  );
};
