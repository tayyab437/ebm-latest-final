import { PASSWORD_REQUIREMENTS } from "./auth.constants";

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): string | null {
  if (!email) return "Email address is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email address.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters long.`;
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter.";
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter.";
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_NUMBER && !/[0-9]/.test(password)) {
    return "Password must contain at least one number.";
  }
  if (PASSWORD_REQUIREMENTS.REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character.";
  }
  return null;
}

export function getPasswordStrengthScore(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
  // Scale score to 0-4
  if (score <= 2) return 1; // Weak
  if (score <= 4) return 2; // Medium
  if (score === 5) return 3; // Strong
  return 4; // Very Strong
}

export function validateRegister(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  acceptedTerms: boolean;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name.trim()) {
    errors.push({ field: "name", message: "Full name is required." });
  } else if (data.name.trim().length < 2) {
    errors.push({ field: "name", message: "Name must be at least 2 characters." });
  }

  const emailErr = validateEmail(data.email);
  if (emailErr) errors.push({ field: "email", message: emailErr });

  const pwdErr = validatePassword(data.password);
  if (pwdErr) errors.push({ field: "password", message: pwdErr });

  if (!data.role) {
    errors.push({ field: "role", message: "Please select a user role." });
  }

  if (!data.acceptedTerms) {
    errors.push({ field: "acceptedTerms", message: "You must accept the Terms of Service and Privacy Policy." });
  }

  return errors;
}
