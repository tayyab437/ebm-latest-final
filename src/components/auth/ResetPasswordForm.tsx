import React, { useState } from "react";
import { OTPInput } from "./OTPInput";
import { validatePassword } from "./auth.validation";
import { AuthService } from "./auth.service";
import { PasswordStrength } from "./PasswordStrength";
import { Lock, Loader2, KeyRound } from "lucide-react";

interface ResetPasswordFormProps {
  email: string;
  onSuccess: () => void;
  onNavigateLogin: () => void;
}

export function ResetPasswordForm({ email, onSuccess, onNavigateLogin }: ResetPasswordFormProps) {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Errors
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setConfirmError(null);
    setFormError(null);

    if (otp.length < 6) {
      setFormError("Please enter the complete 6-digit verification code.");
      return;
    }

    const pwdErr = validatePassword(password);
    if (pwdErr) {
      setPasswordError(pwdErr);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    const result = await AuthService.resetPassword(email, otp);
    setIsLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setFormError(result.error || "The recovery code is invalid or has expired.");
    }
  };

  return (
    <div id="reset-password-container" className="space-y-6">
      <form onSubmit={handleSubmit} id="reset-password-form" className="space-y-4">
        {formError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
            {formError}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
            6-Digit Verification Code
          </label>
          <OTPInput value={otp} onChange={setOtp} length={6} />
        </div>

        {/* New Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
            Create New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="reset-password-input"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(null);
              }}
              className={`w-full bg-slate-50 border rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition ${
                passwordError ? "border-red-400 focus:border-red-500" : "border-slate-200/80"
              }`}
            />
          </div>
          {passwordError && <p className="text-xs text-red-500 font-bold mt-1">{passwordError}</p>}
        </div>

        {/* Strength meter */}
        <PasswordStrength password={password} />

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
            Confirm New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="reset-confirm-input"
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmError) setConfirmError(null);
              }}
              className={`w-full bg-slate-50 border rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition ${
                confirmError ? "border-red-400 focus:border-red-500" : "border-slate-200/80"
              }`}
            />
          </div>
          {confirmError && <p className="text-xs text-red-500 font-bold mt-1">{confirmError}</p>}
        </div>

        {/* Submit */}
        <button
          id="reset-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-slate-950/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <KeyRound className="h-4 w-4" />
              <span>Update Password Access</span>
            </>
          )}
        </button>
      </form>

      <button
        id="reset-cancel-btn"
        type="button"
        onClick={onNavigateLogin}
        className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-bold transition cursor-pointer"
      >
        Cancel and Return
      </button>
    </div>
  );
}
