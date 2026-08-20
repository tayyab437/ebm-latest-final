/**
 * TypeScript Interfaces for EBM 3-Year Interactive Journey Section
 * Fully typed & designed for seamless future API / Relational Database binding.
 */

export interface JourneySubject {
  id: string;
  name: string;
  category: "STEM" | "Humanities" | "Language" | "Business";
}

export interface JourneySkill {
  id: string;
  name: string;
  percentage: number; // For visualization
}

export interface JourneyStatistic {
  id: string;
  label: string;
  value: string;
  description: string;
}

export interface JourneyMilestone {
  id: string;
  title: string;
  description: string;
  badgeName: string;
}

export interface JourneyAIFeature {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface JourneyStudyPlanData {
  weeklyHours: number;
  monthlyGoalsCount: number;
  assignmentsCount: number;
  assessmentsCount: number;
  recommendation: string;
}

export interface JourneyStageData {
  id: string;
  phaseName: string; // Foundation, Acceleration, Mastery, Advanced, O-Level Prep, O-Level Success
  gradeLevel: string; // Grade 5, Grade 6, etc.
  duration: string; // e.g., "6 Months"
  iconName: string;
  shortDescription: string;
  longOverview: string;
  completionPercentage: number;
  expectedMilestone: JourneyMilestone;
  motivationalQuote: string;
  subjects: JourneySubject[];
  skills: JourneySkill[];
  aiFeatures: JourneyAIFeature[];
  studyPlan: JourneyStudyPlanData;
  statistics: JourneyStatistic[];
}

export interface JourneyTimelineNode {
  stageId: string;
  phaseName: string;
  gradeLevel: string;
  isActive: boolean;
}
