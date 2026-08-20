import { useState, useEffect } from "react";
import { User, UserRole } from "../../types";
import { AuthService } from "./auth.service";
import { SessionInfo } from "./auth.types";

// Global listeners for reactive updates without full Zustand dependencies
type AuthListener = (state: AuthStoreState) => void;
const listeners = new Set<AuthListener>();

interface AuthStoreState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  rememberMe: boolean;
  mfaRequired: boolean;
  sessions: SessionInfo[];
}

let globalState: AuthStoreState = {
  user: JSON.parse(localStorage.getItem("ebm_user") || "null"),
  token: localStorage.getItem("ebm_token"),
  isLoading: false,
  error: null,
  rememberMe: localStorage.getItem("ebm_remember_me") === "true",
  mfaRequired: false,
  sessions: [
    {
      deviceId: "dev-curr",
      deviceType: "Desktop Browser",
      ipAddress: "192.168.1.42",
      lastActive: new Date().toISOString(),
      isCurrent: true,
    },
    {
      deviceId: "dev-tablet",
      deviceType: "iPad Pro",
      ipAddress: "110.37.12.185",
      lastActive: new Date(Date.now() - 3600000 * 2).toISOString(),
      isCurrent: false,
    },
  ],
};

function updateGlobalState(nextState: Partial<AuthStoreState>) {
  globalState = { ...globalState, ...nextState };
  listeners.forEach((listener) => listener(globalState));
}

export function useAuth() {
  const [state, setState] = useState<AuthStoreState>(globalState);

  useEffect(() => {
    const handleUpdate = (next: AuthStoreState) => setState(next);
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const login = async (email: string, password: string) => {
    updateGlobalState({ isLoading: true, error: null });
    const result = await AuthService.login(email, password);

    if (result.success && result.user && result.token) {
      // Simulate MFA for Demo/Verification path on specific emails
      if (email.toLowerCase().includes("mfa") || email.toLowerCase().includes("otp")) {
        updateGlobalState({
          isLoading: false,
          mfaRequired: true,
        });
        return { success: true, mfaRequired: true };
      }

      updateGlobalState({
        user: result.user,
        token: result.token,
        isLoading: false,
        error: null,
      });

      if (globalState.rememberMe) {
        localStorage.setItem("ebm_remember_me", "true");
      } else {
        localStorage.removeItem("ebm_remember_me");
      }

      return { success: true, mfaRequired: false };
    } else {
      updateGlobalState({
        isLoading: false,
        error: result.error || "Authentication failed.",
      });
      return { success: false, error: result.error };
    }
  };

  const register = async (name: string, email: string, password: string | undefined, role: UserRole, ebmYear?: any) => {
    updateGlobalState({ isLoading: true, error: null });
    const result = await AuthService.register({ name, email, password, role, ebmYear });

    if (result.success && result.user) {
      updateGlobalState({
        isLoading: false,
        error: null,
      });
      return { success: true, user: result.user };
    } else {
      updateGlobalState({
        isLoading: false,
        error: result.error || "Registration failed.",
      });
      return { success: false, error: result.error };
    }
  };

  const logout = () => {
    AuthService.clearSession();
    updateGlobalState({
      user: null,
      token: null,
      mfaRequired: false,
      error: null,
    });
  };

  const setRememberMe = (val: boolean) => {
    updateGlobalState({ rememberMe: val });
  };

  const setMfaRequired = (val: boolean) => {
    updateGlobalState({ mfaRequired: val });
  };

  const terminateSession = (deviceId: string) => {
    const remaining = globalState.sessions.filter((s) => s.deviceId !== deviceId);
    updateGlobalState({ sessions: remaining });
  };

  return {
    ...state,
    login,
    register,
    logout,
    setRememberMe,
    setMfaRequired,
    terminateSession,
  };
}
