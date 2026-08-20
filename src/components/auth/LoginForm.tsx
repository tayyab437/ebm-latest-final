import React, { useState } from "react";
import { useAuth } from "./auth.store";
import { validateEmail, validatePassword } from "./auth.validation";
import { Loader2 } from "lucide-react";

interface LoginFormProps {
  onSuccess: () => void;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
}

export function LoginForm({
  onSuccess,
  onNavigateRegister,
  onNavigateForgotPassword,
}: LoginFormProps) {
  const { login, setRememberMe, rememberMe } = useAuth();
  
  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);

    const emailErr = validateEmail(email);
    const pwdErr = validatePassword(password);

    if (emailErr || pwdErr) {
      if (emailErr) setEmailError(emailErr);
      if (pwdErr) setPasswordError(pwdErr);
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      onSuccess();
    } else {
      setFormError(result.error || "The username or password you entered is incorrect.");
    }
  };

  return (
    <div id="login-form-container" className="space-y-4">
      <form onSubmit={handleSubmit} id="login-form" className="space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded leading-relaxed">
            {formError}
          </div>
        )}

        {/* Username / Email Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-[#4b4b4b]" htmlFor="login-email-input">
              Username or Email
            </label>
            <button
              id="forgot-username-link"
              type="button"
              onClick={onNavigateForgotPassword}
              className="text-xs text-[#0076a5] hover:underline cursor-pointer"
            >
              Forgot username?
            </button>
          </div>
          <input
            id="login-email-input"
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(null);
            }}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#4b4b4b] focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] ${
              emailError ? "border-red-400" : ""
            }`}
          />
          {emailError && <p className="text-xs text-red-500 font-bold mt-1">{emailError}</p>}
        </div>

        {/* Password Field */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-[#4b4b4b]" htmlFor="login-password-input">
              Password
            </label>
            <button
              id="forgot-password-link"
              type="button"
              onClick={onNavigateForgotPassword}
              className="text-xs text-[#0076a5] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <input
            id="login-password-input"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError(null);
            }}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#4b4b4b] focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] ${
              passwordError ? "border-red-400" : ""
            }`}
          />
          {passwordError && <p className="text-xs text-red-500 font-bold mt-1">{passwordError}</p>}
        </div>

        {/* Submit Button & Remember Me */}
        <div className="flex items-center justify-between pt-2">
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="bg-[#00a3e0] hover:bg-[#008cc0] text-white font-bold py-2.5 px-8 rounded shadow text-lg transition-colors cursor-pointer flex items-center justify-center min-w-[130px]"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in"}
          </button>

          <label className="flex items-center space-x-2 text-sm text-gray-600 cursor-pointer">
            <input
              id="remember-me-checkbox"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-[#00a3e0] border-gray-300 rounded w-4 h-4"
            />
            <span>Remember</span>
          </label>
        </div>
      </form>

      <div className="pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-600">
          Not a member yet?{" "}
          <button
            id="register-navigation-btn"
            type="button"
            onClick={onNavigateRegister}
            className="text-[#0076a5] hover:underline font-bold cursor-pointer"
          >
            Sign up here!
          </button>
        </p>
      </div>
    </div>
  );
}

