/**
 * TypeScript Interfaces for EBM Hero Section
 * Fully typed & designed for seamless future API / Database binding.
 */

export interface HeroStatisticItem {
  id: string;
  label: string;
  value: string;
  count: number;
  suffix: string;
  iconName: string;
}

export interface HeroBadge {
  id: string;
  label: string;
  iconName: string;
  colorClass: string;
  animationDelay: number;
}

export interface TrustIndicator {
  id: string;
  label: string;
  ariaLabel: string;
}

export interface DashboardProfile {
  name: string;
  role: string;
  avatarText: string;
  streakDays: number;
  xpPoints: number;
}

export interface DashboardLesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  completed: boolean;
}

export interface DashboardQuiz {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  durationMinutes: number;
}

export interface DashboardPreviewState {
  profile: DashboardProfile;
  lessons: DashboardLesson[];
  upcomingQuiz: DashboardQuiz;
  currentGradeProgress: number;
  completedPercent: number;
}
