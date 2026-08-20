export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: "The email or password you entered is incorrect.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  PASSWORD_TOO_WEAK: "Password does not meet the minimum security requirements.",
  EMAIL_NOT_VERIFIED: "Please verify your email address to continue.",
  OTP_INVALID: "The verification code you entered is incorrect or has expired.",
  OTP_EXPIRED: "The verification code has expired. Please request a new one.",
  SESSION_EXPIRED: "Your session has expired. Please log in again.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again later.",
  RATE_LIMIT_EXCEEDED: "Too many attempts. Please try again after 15 minutes.",
  ACCESS_DENIED: "You do not have permission to access this resource.",
};

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: true,
};

export const SECURITY_POLICIES = {
  SESSION_TIMEOUT_MINUTES: 15,
  SESSION_WARNING_SECONDS: 60,
  MFA_OTP_COOLDOWN_SECONDS: 60,
  MFA_OTP_LENGTH: 6,
};
