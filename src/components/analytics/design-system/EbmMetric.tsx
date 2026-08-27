import React from "react";

interface EbmMetricProps {
  value: string | number;
  unit?: string;
  label?: string;
  trend?: "up" | "down" | "neutral" | "amber";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  valueClassName?: string;
  variant?: "primary" | "amber" | "neutral" | "dark";
}

/**
 * EbmMetric standardizes numerical analytics presentations:
 * - Employs tabular numerals (font-variant-numeric: tabular-nums)
 * - Large, crisp typographic contrast separating data from prose
 * - Color signals: Blue (primary evidence), Amber (developing/attention), Neutral (standard)
 */
export const EbmMetric: React.FC<EbmMetricProps> = ({
  value,
  unit,
  label,
  size = "lg",
  className = "",
  valueClassName = "",
  variant = "neutral",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xl sm:text-2xl font-black";
      case "md":
        return "text-2xl sm:text-3xl font-black";
      case "lg":
        return "text-3xl sm:text-4xl lg:text-5xl font-black";
      case "xl":
        return "text-4xl sm:text-5xl lg:text-6xl font-black";
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "text-[#0076a5]";
      case "amber":
        return "text-amber-800";
      case "dark":
        return "text-white";
      case "neutral":
      default:
        return "text-slate-900";
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          {label}
        </span>
      )}
      <div className="flex items-baseline space-x-1">
        <span 
          style={{ fontVariantNumeric: "tabular-nums" }}
          className={`tracking-tight ${getSizeClasses()} ${getVariantClasses()} ${valueClassName}`}
        >
          {value}
        </span>
        {unit && (
          <span className="text-xs sm:text-sm font-bold text-slate-500 font-sans">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};
