import fs from 'fs';

let content = fs.readFileSync('server.ts', 'utf8');

const missingVariables = `

// --- RESTORED VARIABLES ---
const MOCK_DASHBOARD_DATA = {
  studentName: "Alex",
  currentGrade: "Grade 10",
  currentLevel: "O-Level (Year 2)",
  statistics: {
    overallCompletionPercentage: 68,
    currentAcademicYear: "2026-2027",
    weeklyStudyHours: [2, 3.5, 1, 4, 2.5, 5, 0],
    monthlyStudyHours: 42,
    learningTrend: "UP",
    masteryScore: 84,
    totalXp: 12450,
    learningStreakDays: 12,
  },
  subjects: [
    {
      id: "sub-eng",
      name: "English Language",
      code: "1123",
      color: "bg-blue-500",
      progressPercentage: 75,
      lessonsCompleted: 24,
      totalLessons: 32,
      nextLessonTitle: "Directed Writing: Reports",
      pendingAssignments: 1,
      aiMasteryScore: 88,
    },
    {
      id: "sub-math",
      name: "Mathematics",
      code: "4024",
      color: "bg-emerald-500",
      progressPercentage: 60,
      lessonsCompleted: 45,
      totalLessons: 75,
      nextLessonTitle: "Quadratic Equations",
      pendingAssignments: 2,
      aiMasteryScore: 72,
    }
  ],
  recentAssignments: [],
  upcomingAssessments: [],
  calendarEvents: [],
  recentActivity: [],
  achievements: [],
  aiRecommendations: [],
  notifications: []
};

let studentDashboardState: Record<string, any> = {};
let studentOnboardingState: Record<string, any> = {};

`;

const targetStr = '// --- RESTORED STUDENT ROUTES ---';
if (content.includes(targetStr)) {
  content = content.replace(targetStr, missingVariables + targetStr);
  fs.writeFileSync('server.ts', content);
  console.log("Restored missing variables!");
} else {
  console.log("Could not find insertion point for variables.");
}
