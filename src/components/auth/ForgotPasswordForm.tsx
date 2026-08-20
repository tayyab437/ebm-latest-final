import React, { useState } from "react";
import { AuthService } from "./auth.service";
import { validateEmail } from "./auth.validation";
import { Mail, ArrowLeft, Loader2, Send } from "lucide-react";

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
  onNavigateLogin: () => void;
}

export function ForgotPasswordForm({ onSuccess, onNavigateLogin }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setFormError(null);

    const emailErr = validateEmail(email);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }

    setIsLoading(true);
    const result = await AuthService.sendPasswordResetEmail(email);
    setIsLoading(false);

    if (result.success) {
      onSuccess(email);
    } else {
      setFormError(result.error || "Could not process password reset request.");
    }
  };

  return (
    <div id="forgot-password-container" className="space-y-6">
      <form onSubmit={handleSubmit} id="forgot-password-form" className="space-y-4">
        {formError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
            {formError}
          </div>
        )}

        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Provide your registered EBM admission email. We will dispatch a 6-digit Multi-Factor recovery code to securely reconfigure your password.
        </p>

        {/* Email Field */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 font-mono tracking-wider uppercase">
            Admission Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              id="forgot-email-input"
              type="email"
              placeholder="student@ebm.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
              }}
              className={`w-full bg-slate-50 border rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition ${
                emailError ? "border-red-400 focus:border-red-500" : "border-slate-200/80"
              }`}
            />
          </div>
          {emailError && <p className="text-xs text-red-500 font-bold mt-1">{emailError}</p>}
        </div>

        {/* Submit */}
        <button
          id="forgot-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold py-3.5 rounded-xl text-sm transition shadow-lg shadow-slate-950/10 flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Recovery Code</span>
            </>
          )}
        </button>
      </form>

      <button
        id="forgot-back-login-btn"
        type="button"
        onClick={onNavigateLogin}
        className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-bold transition cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Login</span>
      </button>
    </div>
  );
}
