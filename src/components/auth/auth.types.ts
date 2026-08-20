import { UserRole, EbmYear, User } from "../../types";

export interface SessionInfo {
  deviceId: string;
  deviceType: string;
  ipAddress: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface AuthContextState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  rememberMe: boolean;
  mfaRequired: boolean;
  mfaTempToken: string | null;
  sessions: SessionInfo[];
  verificationEmailSent: boolean;
  otpCooldown: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface RoleWithPermissions {
  role: UserRole;
  permissions: Permission[];
}
