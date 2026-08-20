export const SUCCESS_TABS = {
  OVERVIEW: "overview",
  TIMELINE: "timeline",
  STORIES: "stories",
  TESTIMONIALS: "testimonials",
  OUTCOMES: "outcomes",
  RECOGNITION: "recognition",
} as const;

export type SuccessTabType = typeof SUCCESS_TABS[keyof typeof SUCCESS_TABS];
