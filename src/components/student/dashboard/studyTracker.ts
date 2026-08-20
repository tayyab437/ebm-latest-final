export function seedStudyHours() {
  if (localStorage.getItem("ebm_study_hours_seeded") === "true") {
    return;
  }
  
  const hoursMap: Record<string, number> = {};
  const current = new Date();
  
  // Get days of the current week (Monday to Sunday)
  const day = current.getDay();
  const distanceToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(current);
  monday.setDate(current.getDate() + distanceToMonday);
  
  // Seed past days of this week with random but realistic hours (e.g. 1-5 hours in seconds)
  // 1 hour = 3600 seconds
  const seedValues = [7920, 12600, 6480, 14760, 9360, 18000, 4320]; // Mon-Sun baseline seconds
  
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    
    // Only seed if it is strictly in the past
    if (d < current && dateStr !== current.toISOString().split("T")[0]) {
      hoursMap[dateStr] = seedValues[i];
    } else {
      hoursMap[dateStr] = 0;
    }
  }
  
  localStorage.setItem("ebm_study_hours_by_day", JSON.stringify(hoursMap));
  localStorage.setItem("ebm_study_hours_seeded", "true");
}

export function getStudyHoursForCurrentWeek(): number[] {
  seedStudyHours();
  const cached = localStorage.getItem("ebm_study_hours_by_day");
  const hoursMap = cached ? JSON.parse(cached) : {};
  
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
    weeklyHours[i] = Math.round((seconds / 3600) * 100) / 100; // hours with 2 decimal places
  }
  
  return weeklyHours;
}

export function getStudyHoursForCurrentMonth(): number {
  seedStudyHours();
  const cached = localStorage.getItem("ebm_study_hours_by_day");
  const hoursMap = cached ? JSON.parse(cached) : {};
  
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  
  let totalSeconds = 0;
  Object.keys(hoursMap).forEach(dateStr => {
    const d = new Date(dateStr);
    if (d.getFullYear() === year && d.getMonth() === month) {
      totalSeconds += hoursMap[dateStr];
    }
  });
  
  return Math.round((totalSeconds / 3600) * 10) / 10;
}

export function incrementStudyTime(secondsToAdd = 1): { weeklyHours: number[], monthlyHours: number } {
  seedStudyHours();
  
  const cached = localStorage.getItem("ebm_study_hours_by_day");
  const hoursMap = cached ? JSON.parse(cached) : {};
  
  const todayStr = new Date().toISOString().split("T")[0];
  hoursMap[todayStr] = (hoursMap[todayStr] || 0) + secondsToAdd;
  
  localStorage.setItem("ebm_study_hours_by_day", JSON.stringify(hoursMap));
  
  return {
    weeklyHours: getStudyHoursForCurrentWeek(),
    monthlyHours: getStudyHoursForCurrentMonth()
  };
}
