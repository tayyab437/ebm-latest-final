import React from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";

interface HeroButtonProps {
  id: string;
  variant: "primary" | "secondary" | "outline";
  label: string;
  onClick?: () => void;
  icon?: keyof typeof Icons;
  isLoading?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

export const HeroButton: React.FC<HeroButtonProps> = ({
  id,
  variant,
  label,
  onClick,
  icon,
  isLoading = false,
  disabled = false,
  ariaLabel,
}) => {
  const IconComponent = icon ? Icons[icon] as React.ComponentType<{ className?: string }> : null;

  const baseStyles = "relative inline-flex items-center justify-center font-semibold rounded-xl text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none px-6 py-3.5";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_30px_rgba(37,99,235,0.4)] hover:brightness-110 active:scale-98 border border-blue-400/20",
    secondary: "bg-slate-900 text-slate-100 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 shadow-sm active:scale-98",
    outline: "bg-transparent text-slate-300 hover:text-white border border-slate-800 hover:bg-slate-900/50 hover:border-slate-700 active:scale-98"
  };

  return (
    <motion.button
      id={id}
      whileHover={disabled || isLoading ? {} : { y: -2 }}
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={ariaLabel || label}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {label}
          {IconComponent && <IconComponent className="w-4 h-4 text-current transition-transform duration-300 group-hover:translate-x-1" />}
        </span>
      )}
    </motion.button>
  );
};
