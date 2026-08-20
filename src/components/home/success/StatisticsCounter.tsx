import React, { useEffect, useState, useRef } from "react";

interface StatisticsCounterProps {
  valueString: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const StatisticsCounter: React.FC<StatisticsCounterProps> = ({
  valueString,
  label,
  description,
  icon,
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse the target numeric value from the string (e.g., "14,800+" -> 14800, "94.6%" -> 94.6, "1.2 Million" -> 1.2)
    const cleanNum = valueString.replace(/[^\d.]/g, "");
    const targetValue = parseFloat(cleanNum) || 0;
    const isDecimal = valueString.includes(".") && targetValue < 100;
    const suffix = valueString.replace(/[\d.]/g, "");

    let start = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = start + easeProgress * (targetValue - start);

      if (isDecimal) {
        setDisplayValue(currentVal.toFixed(1) + suffix);
      } else {
        setDisplayValue(Math.floor(currentVal).toLocaleString() + suffix);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(valueString);
      }
    };

    // Intersection Observer to start counting when visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animationFrameId = requestAnimationFrame(updateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [valueString]);

  return (
    <div
      ref={countRef}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden group"
    >
      {/* Dynamic light streak on hover */}
      <span className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      
      <div className="space-y-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
          {icon}
        </div>
        <div className="space-y-1">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-mono">
            {displayValue}
          </span>
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 font-sans">
            {label}
          </h4>
        </div>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 border-t border-slate-100 dark:border-slate-800/80 pt-3">
        {description}
      </p>
    </div>
  );
};
