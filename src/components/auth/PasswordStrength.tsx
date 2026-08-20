import React from "react";
import { getPasswordStrengthScore } from "./auth.validation";

interface PasswordStrengthProps {
  password?: string;
}

export function PasswordStrength({ password = "" }: PasswordStrengthProps) {
  const score = getPasswordStrengthScore(password);

  const getLabel = () => {
    switch (score) {
      case 1:
        return { text: "Weak", color: "text-red-500", barColor: "bg-red-500" };
      case 2:
        return { text: "Medium", color: "text-amber-500", barColor: "bg-amber-500" };
      case 3:
        return { text: "Strong", color: "text-blue-500", barColor: "bg-blue-500" };
      case 4:
        return { text: "Very Strong", color: "text-emerald-500", barColor: "bg-emerald-500" };
      default:
        return { text: "None", color: "text-slate-300", barColor: "bg-slate-200" };
    }
  };

  const label = getLabel();

  return (
    <div id="password-strength" className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-500 font-medium">Password Strength</span>
        <span className={`font-bold ${label.color}`}>{label.text}</span>
      </div>

      <div className="flex gap-1 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-full flex-1 transition-all duration-300 rounded-full ${
              score >= step ? label.barColor : "bg-slate-100"
            }`}
          ></div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 font-normal leading-normal">
        Include at least 8 characters with numbers, special characters, uppercase and lowercase letters.
      </p>
    </div>
  );
}
