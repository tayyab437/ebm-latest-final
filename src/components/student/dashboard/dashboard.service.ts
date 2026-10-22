import { StudentDashboardData, OnboardingState } from "./dashboard.types";
import { MOCK_DASHBOARD_DATA } from "./dashboard.data";
import { getStudyHoursForCurrentWeek, getStudyHoursForCurrentMonth } from "./studyTracker";

const API_BASE = "/api/student/dashboard";

export function loadLocalDashboardData(): StudentDashboardData | null {
  const cached = localStorage.getItem("ebm_dashboard_data_cache");
  if (!cached) return null;
  try {
    const localData = JSON.parse(cached);
    if (localData && localData.statistics) {
      const localWeek = getStudyHoursForCurrentWeek();
      const localMonth = getStudyHoursForCurrentMonth();
      if (localWeek.some((h) => h > 0)) {
        localData.statistics.weeklyStudyHours = localWeek;
      }
      if (localMonth > 0) {
        localData.statistics.monthlyStudyHours = localMonth;
      }
    }
    return localData;
  } catch (e) {
    return null;
  }
}

export async function getDashboardData(): Promise<{ success: boolean; data?: StudentDashboardData; message?: string }> {
  try {
    const token = localStorage.getItem("ebm_token");
    const response = await fetch(API_BASE, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!response.ok) {
      const cached = loadLocalDashboardData();
      if (cached) {
        return { success: true, data: cached, message: "Cached data (offline)" };
      }
      throw new Error(`HTTP ${response.status}: Failed to fetch student data`);
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      throw new Error(json.error || "Failed to retrieve student records");
    }

    const serverData: StudentDashboardData = json.data;
    
    // Cache the latest verified server data locally
    try {
      localStorage.setItem("ebm_dashboard_data_cache", JSON.stringify(serverData));
    } catch (e) {}

    return { success: true, data: serverData };
  } catch (error: any) {
    console.warn("Failed to fetch dashboard data:", error);
    const cached = loadLocalDashboardData();
    if (cached) {
      return { success: true, data: cached, message: "Using locally cached progress" };
    }
    return { success: false, message: error.message || "Could not load learning records" };
  }
}

export async function updateDashboardData(updates: Partial<StudentDashboardData>): Promise<{success: boolean, message?: string}> {
  try {
    const token = localStorage.getItem("ebm_token");
    
    // 1. Update localStorage cache immediately so it's persistent across reloads
    const cached = localStorage.getItem("ebm_dashboard_data_cache");
    let currentData = cached ? JSON.parse(cached) : MOCK_DASHBOARD_DATA;
    currentData = { ...currentData, ...updates };
    localStorage.setItem("ebm_dashboard_data_cache", JSON.stringify(currentData));

    // 2. Send update to backend server
    const response = await fetch(API_BASE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, message: data.message };
  } catch (error) {
    console.warn("Failed to persist dashboard updates to server, cached locally:", error);
    return { success: true, message: "Saved locally (offline mode)" };
  }
}

export async function promoteStudent(): Promise<{success: boolean, message?: string, nextGrade?: string}> {
  try {
    const token = localStorage.getItem("ebm_token");
    const response = await fetch("/api/student/promote", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Failed to promote student:", error);
    return { success: false, message: error.message };
  }
}

export async function getOnboardingData(): Promise<{success: boolean, data?: OnboardingState, message?: string}> {
  return { success: true, data: {} };
}

export async function updateOnboardingData(onboardingData: Partial<OnboardingState>): Promise<{success: boolean, message?: string}> {
  return { success: true };
}
