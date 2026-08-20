import { create } from "zustand";
import { DashboardView, StudentDashboardData, OnboardingState } from "./dashboard.types";
import { MOCK_DASHBOARD_DATA } from "./dashboard.data";
import { getDashboardData, updateDashboardData, promoteStudent, updateOnboardingData } from "./dashboard.service";

interface DashboardState {
  currentView: DashboardView;
  viewContext?: any;
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  data: StudentDashboardData | null;
  isLoading: boolean;
  error: string | null;
  showCelebration: boolean;
  newGrade: string;

  setView: (view: DashboardView, context?: any) => void;
  setShowCelebration: (show: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileNav: () => void;
  fetchData: () => Promise<void>;
  promoteStudent: () => Promise<void>;
  updateStudentData: (updates: Partial<StudentDashboardData>) => void;
  updateOnboardingData: (updates: Partial<OnboardingState>) => Promise<void>;
  updateStudyHoursLocally: (weeklyHours: number[], monthlyHours: number) => void;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  currentView: DashboardView.OVERVIEW,
  viewContext: null,
  isSidebarCollapsed: false,
  isMobileNavOpen: false,
  data: null,
  isLoading: true,
  error: null,
  showCelebration: false,
  newGrade: "",

  setView: (view, context) => set((state) => ({ 
    currentView: view, 
    viewContext: context,
    isSidebarCollapsed: view === DashboardView.AI_TUTOR ? true : state.isSidebarCollapsed
  })),
  setShowCelebration: (show) => set({ showCelebration: show }),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  promoteStudent: async () => {
    set({ isLoading: true });
    try {
      const response = await promoteStudent();
      if (response.success) {
        // Fetch new data to reflect the promotion
        const dashboardResponse = await getDashboardData();
        if (dashboardResponse.success) {
          set({ 
            data: dashboardResponse.data, 
            isLoading: false, 
            showCelebration: true, 
            newGrade: response.nextGrade || dashboardResponse.data?.currentGrade || "" 
          });
          // Force a small delay then reload to ensure full ecosystem sync if needed,
          // though store update should handle it, the user reported needing a manual reload.
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          set({ isLoading: false });
        }
      } else {
        set({ error: response.message || "Promotion failed", isLoading: false });
      }
    } catch (e: any) {
      set({ error: e.message, isLoading: false });
    }
  },
  updateStudyHoursLocally: (weeklyHours, monthlyHours) => {
    set((state) => {
      if (!state.data) return {};
      return {
        data: {
          ...state.data,
          statistics: {
            ...state.data.statistics,
            weeklyStudyHours: weeklyHours,
            monthlyStudyHours: monthlyHours
          }
        }
      };
    });
  },
  updateStudentData: (updates) => {
    set((state) => {
      const updatedData = state.data ? { ...state.data, ...updates } : null;
      if (updatedData) {
        // Asynchronously update server and local cache
        updateDashboardData(updates);
      }
      return { data: updatedData };
    });
  },
  updateOnboardingData: async (updates) => {
    const currentState = useDashboardStore.getState().data?.onboardingData;
    if (!currentState) return;

    const updatedOnboarding = { ...currentState, ...updates };
    
    // Optimistic update
    set((state) => ({
      data: state.data ? { ...state.data, onboardingData: updatedOnboarding } : null
    }));

    try {
      await updateOnboardingData(updates);
    } catch (e) {
      console.error("Failed to update onboarding data", e);
    }
  },
  
  fetchData: async () => {
    const previousGrade = useDashboardStore.getState().data?.currentGrade;
    set({ isLoading: true, error: null });
    try {
      const response = await getDashboardData();
      if (response.success) {
        const newData = response.data;
        const currentGrade = newData.currentGrade;
        
        // Check for promotion
        if (previousGrade && currentGrade && previousGrade !== currentGrade) {
          // Detect numeric promotion (e.g. Grade 1 -> Grade 2)
          const prevNum = parseInt(previousGrade.replace("Grade ", ""));
          const currNum = parseInt(currentGrade.replace("Grade ", ""));
          if (!isNaN(prevNum) && !isNaN(currNum) && currNum > prevNum) {
            set({ showCelebration: true, newGrade: currentGrade });
          }
        }

        set({ data: newData, isLoading: false });
      } else {
        throw new Error(response.message || "Failed to load dashboard data");
      }
    } catch (error: any) {
      console.error("Dashboard fetch error:", error);
      // Fallback to mock data for development if API fails
      set({ data: MOCK_DASHBOARD_DATA, isLoading: false });
    }
  },
  markNotificationRead: async (id) => {
    set((state) => {
      if (!state.data) return {};
      const updatedNotifications = state.data.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        data: {
          ...state.data,
          notifications: updatedNotifications,
        },
      };
    });

    try {
      const token = localStorage.getItem("ebm_token");
      await fetch("/api/student/notifications/read", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
    } catch (e) {
      console.warn("Error marking notification read on server:", e);
    }
  },
  markAllNotificationsRead: async () => {
    set((state) => {
      if (!state.data) return {};
      const updatedNotifications = state.data.notifications.map((n) => ({
        ...n,
        read: true,
      }));
      return {
        data: {
          ...state.data,
          notifications: updatedNotifications,
        },
      };
    });

    try {
      const token = localStorage.getItem("ebm_token");
      await fetch("/api/student/notifications/read-all", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
    } catch (e) {
      console.warn("Error marking all notifications read on server:", e);
    }
  }
}));
