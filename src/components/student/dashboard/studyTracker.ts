// Authoritative student study tracker with server sync, multi-user isolation and zero fake data seeding

export function getStudyStorageKey(): string {
  try {
    const userStr = localStorage.getItem("ebm_user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.id) return `ebm_study_hours_${user.id}`;
    }
  } catch (e) {}
  return "ebm_study_hours_by_day";
}

export function setAuthoritativeStudyHours(hoursMap: Record<string, number>): void {
  if (!hoursMap || typeof hoursMap !== "object") return;
  try {
    const key = getStudyStorageKey();
    localStorage.setItem(key, JSON.stringify(hoursMap));
    localStorage.setItem("ebm_study_hours_by_day", JSON.stringify(hoursMap));
  } catch (e) {}
}

export function getStudyHoursForCurrentWeek(): number[] {
  const key = getStudyStorageKey();
  const cached = localStorage.getItem(key) || localStorage.getItem("ebm_study_hours_by_day");
  let hoursMap: Record<string, number> = {};
  if (cached) {
    try {
      hoursMap = JSON.parse(cached);
    } catch (e) {
      hoursMap = {};
    }
  }

  const current = new Date();
  const day = current.getDay();
  const distanceToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);

  const weeklyHours = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const seconds = hoursMap[dateStr] || 0;
    weeklyHours[i] = Math.round((seconds / 3600) * 100) / 100;
  }

  return weeklyHours;
}

export function getStudyHoursForCurrentMonth(): number {
  const cached = localStorage.getItem("ebm_study_hours_by_day");
  let hoursMap: Record<string, number> = {};
  if (cached) {
    try {
      hoursMap = JSON.parse(cached);
    } catch (e) {
      hoursMap = {};
    }
  }

  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();

  let totalSeconds = 0;
  Object.keys(hoursMap).forEach((dateStr) => {
    const d = new Date(dateStr);
    if (d.getFullYear() === year && d.getMonth() === month) {
      totalSeconds += hoursMap[dateStr] || 0;
    }
  });

  return Math.round((totalSeconds / 3600) * 10) / 10;
}

export function incrementStudyTimeLocally(secondsToAdd: number): { weeklyHours: number[]; monthlyHours: number } {
  if (secondsToAdd <= 0) {
    return {
      weeklyHours: getStudyHoursForCurrentWeek(),
      monthlyHours: getStudyHoursForCurrentMonth(),
    };
  }

  const cached = localStorage.getItem("ebm_study_hours_by_day");
  let hoursMap: Record<string, number> = {};
  if (cached) {
    try {
      hoursMap = JSON.parse(cached);
    } catch (e) {
      hoursMap = {};
    }
  }

  const todayStr = new Date().toISOString().split("T")[0];
  hoursMap[todayStr] = (hoursMap[todayStr] || 0) + secondsToAdd;

  try {
    localStorage.setItem("ebm_study_hours_by_day", JSON.stringify(hoursMap));
  } catch (e) {}

  return {
    weeklyHours: getStudyHoursForCurrentWeek(),
    monthlyHours: getStudyHoursForCurrentMonth(),
  };
}

export async function syncStudyTimeWithServer(secondsToAdd: number): Promise<{ weeklyHours: number[]; monthlyHours: number } | null> {
  const token = localStorage.getItem("ebm_token");
  if (!token || secondsToAdd <= 0) return null;

  try {
    const response = await fetch("/api/student/study-time", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ secondsToAdd }),
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.weeklyStudyHours) {
      return {
        weeklyHours: data.weeklyStudyHours,
        monthlyHours: data.monthlyStudyHours,
      };
    }
  } catch (e) {
    console.warn("Offline or transient failure while syncing study time with server:", e);
  }
  return null;
}
