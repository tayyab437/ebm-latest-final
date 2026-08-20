import { StudentDashboardData } from "./dashboard.types";

export const MOCK_DASHBOARD_DATA: StudentDashboardData = {
  studentName: "Student",
  currentGrade: "Grade 1",
  parentEmail: "",
  currentLevel: "Primary (Year 1)",
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
    },
    {
      id: "sub-phy",
      name: "Physics",
      code: "5054",
      color: "bg-amber-500",
      progressPercentage: 82,
      lessonsCompleted: 35,
      totalLessons: 42,
      nextLessonTitle: "Electromagnetism",
      pendingAssignments: 0,
      aiMasteryScore: 91,
    },
    {
      id: "sub-cs",
      name: "Computer Science",
      code: "2210",
      color: "bg-indigo-500",
      progressPercentage: 45,
      lessonsCompleted: 18,
      totalLessons: 40,
      nextLessonTitle: "Logic Gates",
      pendingAssignments: 1,
      aiMasteryScore: 65,
    }
  ],
  recentAssignments: [
    {
      id: "ass-1",
      title: "Algebraic Fractions Worksheet",
      subjectName: "Mathematics",
      dueDate: "2026-07-02T23:59:00Z",
      status: "PENDING"
    },
    {
      id: "ass-2",
      title: "Kinematics Lab Report",
      subjectName: "Physics",
      dueDate: "2026-06-28T23:59:00Z",
      status: "SUBMITTED"
    }
  ],
  upcomingAssessments: [
    {
      id: "test-1",
      title: "Mid-Term Mock Exam",
      subjectName: "Computer Science",
      date: "2026-07-15T09:00:00Z",
      status: "UPCOMING"
    }
  ],
  calendarEvents: [
    {
      id: "ev-1",
      title: "Math Live Session",
      date: "2026-06-29",
      time: "15:00",
      type: "LESSON",
      subjectName: "Mathematics"
    },
    {
      id: "ev-2",
      title: "Assignment Due",
      date: "2026-07-02",
      time: "23:59",
      type: "DEADLINE",
      subjectName: "Mathematics"
    }
  ],
  recentActivity: [
    {
      id: "act-1",
      type: "LESSON_COMPLETED",
      title: "Completed Lesson",
      description: "Forces and Motion",
      timestamp: "2026-06-29T10:30:00Z"
    },
    {
      id: "act-2",
      type: "BADGE_EARNED",
      title: "Earned Badge",
      description: "7-Day Streak Master",
      timestamp: "2026-06-28T14:20:00Z"
    }
  ],
  achievements: [
    {
      id: "ach-1",
      title: "First Steps",
      description: "Completed your first lesson",
      iconUrl: "sparkles",
      earnedAt: "2026-06-15T00:00:00Z",
      xpAwarded: 500
    }
  ],
  certificates: [],
  aiRecommendations: [
    {
      id: "rec-1",
      type: "WEAK_TOPIC",
      title: "Review Set Theory",
      description: "Your recent quiz scores indicate a need to review Set Theory.",
      actionLabel: "Start Revision",
      actionUrl: "/student/learning/math/sets"
    },
    {
      id: "rec-2",
      type: "PRACTICE",
      title: "Physics Past Papers",
      description: "Try a customized past paper to test your kinematics knowledge.",
      actionLabel: "Generate Paper",
      actionUrl: "/student/assessments/generate"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      title: "New Assignment",
      message: "Algebraic Fractions Worksheet has been assigned.",
      type: "ASSIGNMENT",
      timestamp: "2026-06-29T08:00:00Z",
      read: false
    }
  ]
};
