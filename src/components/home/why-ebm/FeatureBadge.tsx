import React from "react";
import { FeatureBadgeData as BadgeType } from "./why-ebm.types";

interface FeatureBadgeProps {
  badge: BadgeType;
}

export const FeatureBadge: React.FC<FeatureBadgeProps> = ({ badge }) => {
  const styles = {
    success: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    primary: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono border uppercase tracking-wider ${styles[badge.variant] || styles.primary}`}>
      {badge.text}
    </span>
  );
};
