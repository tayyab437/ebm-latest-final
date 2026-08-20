export enum AdaptiveView {
  DASHBOARD = "DASHBOARD",
  MASTERY = "MASTERY",
  RECOMMENDATIONS = "RECOMMENDATIONS",
  STUDY_PLAN = "STUDY_PLAN",
  LEARNING_PATH = "LEARNING_PATH",
  WEAK_TOPICS = "WEAK_TOPICS",
  STRENGTHS = "STRENGTHS",
  GOALS = "GOALS",
  HABITS = "HABITS",
  PREDICTIONS = "PREDICTIONS",
  ANALYTICS = "ANALYTICS",
  SETTINGS = "SETTINGS",
  PROFILE = "PROFILE",
}

export interface LearningProfile {
  preferredStudyTime: string;
  learningSpeed: "FAST" | "AVERAGE" | "STEADY";
  learningStyle: "VISUAL" | "AUDITORY" | "READING" | "PRACTICE";
  attentionSpan: number; // in minutes
  motivationLevel: number; // 1-10
  consistencyScore: number; // 0-100
}

export interface MasteryRecord {
  id: string;
  subject: string;
  unit: string;
  percentage: number;
  lastActivity: string;
  status: "MASTERED" | "PROFICIENT" | "LEARNING" | "STRUGGLING";
}

export interface Recommendation {
  id: string;
  type: "LESSON" | "VIDEO" | "WORKSHEET" | "QUIZ" | "AI_CONVERSATION" | "REVISION";
  title: string;
  reason: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  estimatedTime: number; // minutes
}

export interface LearningGoal {
  id: string;
  title: string;
  type: "ACADEMIC" | "HABIT" | "SKILL";
  targetDate: string;
  progress: number;
  isCompleted: boolean;
}

export interface Habit {
  id: string;
  title: string;
  streak: number;
  lastCompleted: string | null;
  history: boolean[]; // last 7 days
}

export interface Prediction {
  metric: string;
  value: string;
  confidence: number;
  description: string;
}

export interface EBMSkillProgress {
  skill: string;
  score: number; // 0-100
  level: string;
}

export interface AdaptiveStats {
  learningScore: number;
  masteryPercentage: number;
  velocity: number; // topics per week
  predictedExamScore: number;
  focusScore: number;
  retentionScore: number;
}
