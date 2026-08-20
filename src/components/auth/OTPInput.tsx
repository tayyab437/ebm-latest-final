import React, { useRef, useState, useEffect } from "react";
import { Timer, RotateCcw } from "lucide-react";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (otp: string) => void;
  onResend?: () => void;
  cooldownSeconds?: number;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  onResend,
  cooldownSeconds = 60,
}: OTPInputProps) {
  const [cooldown, setCooldown] = useState(cooldownSeconds);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into characters
  const digits = value.split("").slice(0, length);
  while (digits.length < length) {
    digits.push("");
  }

  // Handle countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index: number, val: string) => {
    // Only accept numbers
    const cleanVal = val.replace(/[^0-9]/g, "");
    if (!cleanVal) {
      const nextDigits = [...digits];
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    const nextDigits = [...digits];
    // Take the last character typed
    nextDigits[index] = cleanVal[cleanVal.length - 1];
    onChange(nextDigits.join(""));

    // Focus next input if available
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Backspace on empty: focus previous and delete
        const nextDigits = [...digits];
        nextDigits[index - 1] = "";
        onChange(nextDigits.join(""));
        inputsRef.current[index - 1]?.focus();
      } else {
        // Delete current digit
        const nextDigits = [...digits];
        nextDigits[index] = "";
        onChange(nextDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    const numbersOnly = pastedData.replace(/[^0-9]/g, "");
    
    if (numbersOnly) {
      const pasteDigits = numbersOnly.split("").slice(0, length);
      onChange(pasteDigits.join(""));
      
      // Focus the last available input
      const lastFocusIndex = Math.min(pasteDigits.length, length - 1);
      inputsRef.current[lastFocusIndex]?.focus();
    }
  };

  const triggerResend = () => {
    if (cooldown > 0) return;
    setCooldown(cooldownSeconds);
    if (onResend) onResend();
  };

  return (
    <div id="otp-container" className="space-y-4">
      <div className="flex justify-between items-center gap-2">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-box-${idx}`}
            ref={(el) => { inputsRef.current[idx] = el; }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onPaste={handlePaste}
            className="w-12 h-14 bg-slate-50 border border-slate-200/80 rounded-xl text-center text-xl font-bold text-slate-900 shadow-sm focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition outline-none"
          />
        ))}
      </div>

      <div className="flex justify-between items-center text-xs">
        {cooldown > 0 ? (
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <Timer className="h-4 w-4" />
            <span>Resend code in {cooldown}s</span>
          </div>
        ) : (
          <button
            id="otp-resend-btn"
            type="button"
            onClick={triggerResend}
            className="flex items-center gap-1.5 text-amber-600 hover:text-amber-700 font-bold transition cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Resend verification OTP</span>
          </button>
        )}
      </div>
    </div>
  );
}
