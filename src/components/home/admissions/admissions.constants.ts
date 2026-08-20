export const BILLING_MODES = {
  MONTHLY: "monthly",
  ANNUAL: "annual",
} as const;

export type BillingModeType = typeof BILLING_MODES[keyof typeof BILLING_MODES];

export const STUDY_MODES = {
  ACCELERATED: "Accelerated Self-Study with AI Guide",
  SUPERVISED: "Expert-Supervised with Socratic Circles",
  HYBRID: "Hybrid Interactive Lab Cohorts",
} as const;

export const LEARNING_GOALS = {
  EXAM_DOMINANCE: "Cambridge O Level Exam Dominance",
  FOUNDATION_ACCELERATION: "STEM Foundation Acceleration",
  SKILLS_PORTFOLIO: "Analytical Portfolio & AI Literacy",
} as const;

export const CURRENT_GRADES = {
  GRADE_8: "Grade 8 / Pre-O Level",
  GRADE_9: "Grade 9 / O Level Yr 1",
  GRADE_10: "Grade 10 / O Level Yr 2",
  GRADE_11: "Grade 11 / O Level Final",
} as const;
