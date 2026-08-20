import { FeatureCardData, LearningPrincipleData, ComparisonItemData, StatisticItemData } from "./why-ebm.types";

export const FEATURE_CARDS: FeatureCardData[] = [
  {
    id: "f-1",
    title: "Accelerated Progression",
    description: "EBM compresses standard curriculum years through high-efficiency Socratic learning pathways without skipping topics.",
    category: "Methodology",
    iconName: "Zap",
    badge: { id: "fb-1", text: "3x Faster", variant: "success" }
  },
  {
    id: "f-2",
    title: "AI Learning Assistant",
    description: "Personalized Socratic AI that helps verify concepts, guide homework, and formulate customized retrieval schedules.",
    category: "AI",
    iconName: "Cpu",
    badge: { id: "fb-2", text: "24/7 Support", variant: "primary" }
  },
  {
    id: "f-3",
    title: "Critical Thinking First",
    description: "We completely eliminate rote learning. Students learn the structural 'why' behind formulas, theories, and calculations.",
    category: "Methodology",
    iconName: "Brain",
    badge: { id: "fb-3", text: "Concept-First", variant: "info" }
  },
  {
    id: "f-4",
    title: "Adaptive Learning Paths",
    description: "Our system detects precise comprehension deficits and routes learners into targeted micro-remedial plans.",
    category: "AI",
    iconName: "GitBranch",
    badge: { id: "fb-4", text: "Adaptive", variant: "warning" }
  },
  {
    id: "f-5",
    title: "Real-Time Parent Portal",
    description: "Parents track live performance dashboards, verified checkpoint transcripts, and detailed study-streak analytics.",
    category: "Management",
    iconName: "ShieldAlert"
  },
  {
    id: "f-6",
    title: "Teacher-Led, AI-Enhanced",
    description: "Certified educators direct the journey using AI-driven diagnostic insights, giving focused support where needed.",
    category: "Management",
    iconName: "Users"
  },
  {
    id: "f-7",
    title: "Daily Learning Planner",
    description: "Automated, achievable micro-schedules with built-in spacing and retrieval cycles optimized for memory retention.",
    category: "Management",
    iconName: "Calendar"
  },
  {
    id: "f-8",
    title: "Granular Progress Analytics",
    description: "Beautiful visual dashboards detailing subject-specific mastery ratios, average review times, and performance trends.",
    category: "Resources",
    iconName: "LineChart"
  },
  {
    id: "f-9",
    title: "Gamified Academic Loop",
    description: "Earn experience points (XP), collect beautiful milestone badges, and maintain streaks that encourage active habit building.",
    category: "Growth",
    iconName: "Flame"
  },
  {
    id: "f-10",
    title: "Global Future Skills",
    description: "Intertwined modules teaching logical reasoning, digital literacy, self-directed research, and academic confidence.",
    category: "Growth",
    iconName: "Compass"
  },
  {
    id: "f-11",
    title: "All-In-One Study Materials",
    description: "Access curated diagnostic worksheets, structured summary maps, AI writing feedback, and unlimited practice tests.",
    category: "Resources",
    iconName: "FileText"
  },
  {
    id: "f-12",
    title: "Global Peers Community",
    description: "Interact with highly motivated students worldwide through controlled, collaborative forums and academic challenges.",
    category: "Growth",
    iconName: "Globe"
  }
];

export const COMPARISON_ITEMS: ComparisonItemData[] = [
  {
    id: "c-1",
    featureName: "Primary Focus",
    traditionalValue: "Rote Memorization & Exam Drills",
    ebmValue: "Deep Conceptual Understanding & Logical Inquiry",
    isEbmAdvantage: true
  },
  {
    id: "c-2",
    featureName: "Progression Pace",
    traditionalValue: "Fixed calendar speed, same for everyone",
    ebmValue: "Self-paced accelerated completion (Grade 5 to O-Level in 3 Years)",
    isEbmAdvantage: true
  },
  {
    id: "c-3",
    featureName: "Feedback Loop",
    traditionalValue: "Delayed test results with minimal insights",
    ebmValue: "Instant AI-driven diagnostic feedback and instant step corrections",
    isEbmAdvantage: true
  },
  {
    id: "c-4",
    featureName: "Curriculum Customization",
    traditionalValue: "Rigid, one-size-fits-all classroom flow",
    ebmValue: "Dynamically tailored lessons targeting comprehension gaps",
    isEbmAdvantage: true
  },
  {
    id: "c-5",
    featureName: "Performance Tracking",
    traditionalValue: "Scattered paper files and end-of-term cards",
    ebmValue: "Real-time, interactive parent/teacher digital dashboards",
    isEbmAdvantage: true
  },
  {
    id: "c-6",
    featureName: "Technology Role",
    traditionalValue: "Passive video lectures or PDF files",
    ebmValue: "Active Socratic conversational tutors and AI simulator modules",
    isEbmAdvantage: true
  },
  {
    id: "c-7",
    featureName: "Assessment Frequency",
    traditionalValue: "High-stress terminal exams with zero spacing",
    ebmValue: "Continuous diagnostic micro-checks mapping overall mastery",
    isEbmAdvantage: true
  }
];

export const LEARNING_PILLARS: LearningPrincipleData[] = [
  {
    id: "p-1",
    title: "Learn to Understand",
    description: "Understand the core mathematical and scientific derivations.",
    iconName: "BookOpen"
  },
  {
    id: "p-2",
    title: "Learn to Think",
    description: "Develop structural questioning habits to approach unknown problems.",
    iconName: "Lightbulb"
  },
  {
    id: "p-3",
    title: "Learn with AI",
    description: "Co-pilot learning processes with instant personalized socratic tutoring.",
    iconName: "Bot"
  },
  {
    id: "p-4",
    title: "Build Positive Habits",
    description: "Standardize micro-habits and consistent retrieval sessions daily.",
    iconName: "Calendar"
  },
  {
    id: "p-5",
    title: "Practice Consistently",
    description: "Engage with staggered spacing worksheets to cement long-term memory.",
    iconName: "CheckCircle2"
  },
  {
    id: "p-6",
    title: "Apply in Real Life",
    description: "Connect physical formulas, economic trends, and systems to real-world datasets.",
    iconName: "Globe"
  }
];

export const HOMEPAGE_STATS: StatisticItemData[] = [
  {
    id: "s-1",
    label: "Study Hours Managed",
    value: "1.2",
    suffix: "M+",
    description: "Highly focused, structured academic study hours logged globally",
    iconName: "Clock"
  },
  {
    id: "s-2",
    label: "Lessons Completed",
    value: "450",
    suffix: "k+",
    description: "Socratic modular lessons completed successfully",
    iconName: "BookOpen"
  },
  {
    id: "s-3",
    label: "Active AI Dialogs",
    value: "2.4",
    suffix: "M+",
    description: "Inquiry chats facilitated by the Socratic Tutor",
    iconName: "Cpu"
  },
  {
    id: "s-4",
    label: "Student Satisfaction",
    value: "98.4",
    suffix: "%",
    description: "Direct feedback gathered on course clarity and comfort",
    iconName: "Smile"
  },
  {
    id: "s-5",
    label: "Parent Engagement",
    value: "95.2",
    suffix: "%",
    description: "Active weekly tracking of the live performance index",
    iconName: "Activity"
  },
  {
    id: "s-6",
    label: "Assessment Accuracy",
    value: "94.8",
    suffix: "%",
    description: "Syllabus mapping correlation with Cambridge exam results",
    iconName: "CheckCircle"
  }
];
