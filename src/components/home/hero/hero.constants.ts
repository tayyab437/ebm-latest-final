import { HeroStatisticItem, HeroBadge, TrustIndicator, DashboardPreviewState } from "./hero.types";

export const TRUST_INDICATORS: TrustIndicator[] = [
  { id: "ti-ai", label: "✓ AI-Powered Socratic Tutoring", ariaLabel: "AI Powered Socratic Tutoring" },
  { id: "ti-curric", label: "✓ Accelerated 3-Year O-Level Path", ariaLabel: "Accelerated 3-Year O-Level Path" },
  { id: "ti-parent", label: "✓ Live Parent Monitoring", ariaLabel: "Live Parent Monitoring" },
  { id: "ti-progress", label: "✓ Verified Progress Trackers", ariaLabel: "Verified Progress Trackers" },
  { id: "ti-teachers", label: "✓ Bukhari Method Certified Educators", ariaLabel: "Bukhari Method Certified Educators" },
  { id: "ti-certs", label: "✓ Blockchain-Verified Certificates", ariaLabel: "Blockchain-Verified Certificates" }
];

export const HERO_STATS_DATA: HeroStatisticItem[] = [
  { id: "stat-students", label: "Active Global Students", value: "12k", count: 12400, suffix: "+", iconName: "Users" },
  { id: "stat-accelerated", label: "O-Level Completion Rate", value: "94.8", count: 94.8, suffix: "%", iconName: "GraduationCap" },
  { id: "stat-hours", label: "Accelerated Learning Hours", value: "1.2M", count: 1200000, suffix: "+", iconName: "Clock" },
  { id: "stat-rating", label: "Socratic AI Tutor Rating", value: "4.9", count: 4.9, suffix: "/5", iconName: "Star" }
];

export const FLOATING_BADGES_DATA: HeroBadge[] = [
  { id: "badge-thinker", label: "Socratic Thinker", iconName: "BrainCircuit", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20", animationDelay: 0.2 },
  { id: "badge-streak", label: "Daily Streak: 18d", iconName: "Flame", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20", animationDelay: 0.6 },
  { id: "badge-performer", label: "Accelerated Learner", iconName: "Zap", colorClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", animationDelay: 0.4 },
  { id: "badge-completed", label: "Math Module Complete", iconName: "Award", colorClass: "bg-blue-500/10 text-blue-400 border-blue-500/20", animationDelay: 0.8 }
];

export const MOCK_DASHBOARD_PREVIEW: DashboardPreviewState = {
  profile: {
    name: "Zain Bukhari",
    role: "Accelerated Student (Year 1)",
    avatarText: "ZB",
    streakDays: 18,
    xpPoints: 3420
  },
  lessons: [
    { id: "les-1", title: "Introduction to Quadratic Equations", subject: "Mathematics", duration: "12m left", completed: false },
    { id: "les-2", title: "Newtonian Mechanics & Force Diagrams", subject: "Physics", duration: "100% done", completed: true },
    { id: "les-3", title: "Cellular Division and Mitosis Basics", subject: "Biology", duration: "Ready to start", completed: false }
  ],
  upcomingQuiz: {
    id: "quiz-chem",
    title: "Stoichiometry & Chemical Equations Quiz",
    subject: "Chemistry",
    questionsCount: 15,
    durationMinutes: 20
  },
  currentGradeProgress: 76,
  completedPercent: 34
};
