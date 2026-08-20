import React, { useState, useEffect } from "react";
import { Mail, CheckCircle2, RotateCcw, Timer, LogIn } from "lucide-react";

interface VerifyEmailProps {
  email: string;
  onNavigateLogin: () => void;
}

export function VerifyEmail({ email, onNavigateLogin }: VerifyEmailProps) {
  const [cooldown, setCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((c) => c - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    setIsResending(true);
    setResendStatus(null);
    
    // Simulate resending email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsResending(false);
    setCooldown(60);
    setResendStatus("A new verification link has been sent to your inbox!");
  };

  return (
    <div id="verify-email-container" className="text-center space-y-6">
      <div className="flex justify-center">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-full text-amber-500 shadow-sm animate-bounce">
          <Mail className="h-10 w-10" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900">Confirm Your Admission Email</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
          We have sent an authentication verification link to <strong className="text-slate-800">{email}</strong>. 
          Click on the link within the email to verify your admission and unlock your portal access.
        </p>
      </div>

      {resendStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2 justify-center">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{resendStatus}</span>
        </div>
      )}

      <div className="space-y-4">
        {cooldown > 0 ? (
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium font-mono">
            <Timer className="h-4 w-4" />
            <span>Resend available in {cooldown}s</span>
          </div>
        ) : (
          <button
            id="resend-verification-btn"
            type="button"
            disabled={isResending}
            onClick={handleResend}
            className="flex items-center justify-center gap-1.5 mx-auto text-xs text-amber-600 hover:text-amber-700 font-bold transition disabled:opacity-50 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Resend verification email link</span>
          </button>
        )}

        <button
          id="verify-login-btn"
          type="button"
          onClick={onNavigateLogin}
          className="w-full bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogIn className="h-4 w-4" />
          <span>Proceed to Login</span>
        </button>
      </div>
    </div>
  );
}
