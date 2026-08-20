import React, { useState } from "react";
import { useAuth } from "./auth.store";
import { validateRegister } from "./auth.validation";
import { UserRole, EbmYear } from "../../types";
import { Loader2 } from "lucide-react";

interface RegisterFormProps {
  onSuccess: (user: any) => void;
  onNavigateLogin: () => void;
}

export function RegisterForm({ onSuccess, onNavigateLogin }: RegisterFormProps) {
  const { register } = useAuth();
  
  // Input fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [ebmYear, setEbmYear] = useState<EbmYear>(EbmYear.YEAR_1);
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  // Error States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const validationErrors = validateRegister({
      name,
      email,
      password,
      role,
      acceptedTerms,
    });

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      return;
    }

    setIsLoading(true);
    const result = await register(name, email, password, role, role === UserRole.STUDENT ? ebmYear : undefined);
    setIsLoading(false);

    if (result.success && result.user) {
      onSuccess(result.user);
    } else {
      setFormError(result.error || "An error occurred during registration.");
    }
  };

  return (
    <div id="register-form-container" className="space-y-4">
      <form onSubmit={handleSubmit} id="register-form" className="space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded">
            {formError}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-[#4b4b4b] mb-1">
            Full Name
          </label>
          <input
            id="register-name-input"
            type="text"
            required
            placeholder="e.g. Imran Khan"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
            }}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#4b4b4b] focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] ${
              errors.name ? "border-red-400" : ""
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 font-bold mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#4b4b4b] mb-1">
            Username or Email Address
          </label>
          <input
            id="register-email-input"
            type="email"
            required
            placeholder="e.g. student@ebm.edu"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#4b4b4b] focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] ${
              errors.email ? "border-red-400" : ""
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 font-bold mt-1">{errors.email}</p>}
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-sm font-medium text-[#4b4b4b] mb-1">
            I am signing up as a
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: UserRole.STUDENT, label: "Student" },
              { id: UserRole.PARENT, label: "Parent / Guardian" },
              { id: UserRole.TEACHER, label: "Teacher" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setRole(item.id)}
                className={`py-1.5 px-3 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                  role === item.id
                    ? "bg-[#00a3e0] text-white border-[#00a3e0]"
                    : "bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>


        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#4b4b4b] mb-1">
            Create Password
          </label>
          <input
            id="register-password-input"
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            className={`w-full border border-gray-300 rounded px-3 py-2 text-sm text-[#4b4b4b] focus:outline-none focus:border-[#00a3e0] focus:ring-1 focus:ring-[#00a3e0] ${
              errors.password ? "border-red-400" : ""
            }`}
          />
          {errors.password && <p className="text-xs text-red-500 font-bold mt-1">{errors.password}</p>}
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            id="register-terms-checkbox"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="mt-0.5 accent-[#00a3e0] border-gray-300 rounded w-4 h-4"
          />
          <label htmlFor="register-terms-checkbox" className="ml-2 text-xs text-gray-600 leading-normal">
            I agree to EBM academic terms of service and privacy regulations.
          </label>
        </div>

        {/* Submit */}
        <button
          id="register-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#00a3e0] hover:bg-[#008cc0] text-white font-bold py-3 px-8 rounded shadow text-lg transition-colors cursor-pointer flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Join EBM today"}
        </button>
      </form>

      <div className="pt-4 border-t border-gray-100 text-center">
        <p className="text-xs text-gray-600">
          Already have an account?{" "}
          <button
            id="register-login-btn"
            type="button"
            onClick={onNavigateLogin}
            className="text-[#0076a5] hover:underline font-bold cursor-pointer"
          >
            Sign in here!
          </button>
        </p>
      </div>
    </div>
  );
}

