import { StudentDashboardData, OnboardingState } from "./dashboard.types";
import { MOCK_DASHBOARD_DATA } from "./dashboard.data";
import { getStudyHoursForCurrentWeek, getStudyHoursForCurrentMonth } from "./studyTracker";

const API_BASE = "/api/student/dashboard";

function loadLocalDashboardData(): StudentDashboardData {
  const cached = localStorage.getItem("ebm_dashboard_data_cache");
  let localData = MOCK_DASHBOARD_DATA;
  if (cached) {
    try {
      localData = JSON.parse(cached);
    } catch (e) {}
  }
  
  if (localData && localData.statistics) {
    localData.statistics.weeklyStudyHours = getStudyHoursForCurrentWeek();
    localData.statistics.monthlyStudyHours = getStudyHoursForCurrentMonth();
  }
  
  return localData;
}

export async function getDashboardData(): Promise<{success: boolean, data?: StudentDashboardData, message?: string}> {
  try {
    const token = localStorage.getItem("ebm_token");
    const response = await fetch(API_BASE, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: true, data: loadLocalDashboardData() };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const serverData = data.data || MOCK_DASHBOARD_DATA;
    
    // Enrich with real-time tracked study hours from local storage
    if (serverData && serverData.statistics) {
      serverData.statistics.weeklyStudyHours = getStudyHoursForCurrentWeek();
      serverData.statistics.monthlyStudyHours = getStudyHoursForCurrentMonth();
    }
    
    // Cache the latest server data locally
    localStorage.setItem("ebm_dashboard_data_cache", JSON.stringify(serverData));
    
    return { success: true, data: serverData };
  } catch (error) {
    console.warn("Failed to fetch dashboard data, using local storage/mock fallback:", error);
    return { success: true, data: loadLocalDashboardData() };
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
