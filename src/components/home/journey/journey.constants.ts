import { JourneyStageData } from "./journey.types";

export const JOURNEY_STAGES: JourneyStageData[] = [
  {
    id: "stage-1",
    phaseName: "Foundation Phase",
    gradeLevel: "Grade 5 equivalent",
    duration: "6 Months",
    iconName: "Compass",
    shortDescription: "Cultivate foundational cognitive frameworks, logical reasoning, and structured study routines.",
    longOverview: "The Foundation Phase transitions learners from basic memorization to active inquiry. Students construct foundational mental models in Mathematics, core scientific concepts, and structured essay writing, mastering self-directed studying habits through Bukhari Socratic guidance.",
    completionPercentage: 15,
    motivationalQuote: "The mind is not a vessel to be filled, but a fire to be kindled. — Plutarch",
    expectedMilestone: {
      id: "ms-1",
      title: "Socratic Inquirer Certification",
      description: "Recognizes the capability of independent hypothesis formation and logical discourse formulation.",
      badgeName: "Award"
    },
    subjects: [
      { id: "sub-1", name: "Pre-Algebra Math", category: "STEM" },
      { id: "sub-2", name: "Socratic Scientific Inquiry", category: "STEM" },
      { id: "sub-3", name: "Critical Reading & Analysis", category: "Language" },
      { id: "sub-4", name: "Creative Logic Writing", category: "Language" }
    ],
    skills: [
      { id: "sk-1", name: "Logical Reasoning", percentage: 80 },
      { id: "sk-2", name: "Critical Thinking", percentage: 70 },
      { id: "sk-3", name: "Self Learning", percentage: 75 },
      { id: "sk-4", name: "Time Management", percentage: 65 }
    ],
    aiFeatures: [
      { id: "ai-1", name: "AI Reading Companion", description: "Socratic text breakdown with instant lexical insights", iconName: "BookOpen" },
      { id: "ai-2", name: "AI Workspace Planner", description: "Dynamically allocates revision hours based on comprehension deficits", iconName: "Calendar" }
    ],
    studyPlan: {
      weeklyHours: 15,
      monthlyGoalsCount: 6,
      assignmentsCount: 12,
      assessmentsCount: 3,
      recommendation: "Focus on establishing daily structured studying habits and conversational learning check-ins."
    },
    statistics: [
      { id: "stat-1", label: "Concept Mastery Rate", value: "92%", description: "Verified via objective cognitive checkpoints" },
      { id: "stat-2", label: "Completed Assignments", value: "18", description: "Peer-reviewed logical write-ups" }
    ]
  },
  {
    id: "stage-2",
    phaseName: "Acceleration Phase",
    gradeLevel: "Grade 6 equivalent",
    duration: "6 Months",
    iconName: "Zap",
    shortDescription: "Rapid conceptual acceleration across complex STEM topics and global history narratives.",
    longOverview: "Unlocking advanced critical thinking. Students fast-track through algebraic structures, environmental systems, and chronological global history. Our Socratic AI monitors vocabulary complexity, steering learners towards deep structural reasoning.",
    completionPercentage: 35,
    motivationalQuote: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. — Malcolm X",
    expectedMilestone: {
      id: "ms-2",
      title: "Accelerated Thinker Badge",
      description: "Awarded for demonstrating multi-disciplinary integration across scientific models and linguistic devices.",
      badgeName: "Zap"
    },
    subjects: [
      { id: "sub-5", name: "Linear Algebra & Geometry", category: "STEM" },
      { id: "sub-6", name: "Environmental Systems", category: "STEM" },
      { id: "sub-7", name: "Global Civilizations", category: "Humanities" },
      { id: "sub-8", name: "Analytical Writing", category: "Language" }
    ],
    skills: [
      { id: "sk-5", name: "Logical Reasoning", percentage: 85 },
      { id: "sk-6", name: "Critical Thinking", percentage: 80 },
      { id: "sk-7", name: "Self Learning", percentage: 82 },
      { id: "sk-8", name: "Digital Literacy", percentage: 70 }
    ],
    aiFeatures: [
      { id: "ai-3", name: "Socratic Math Tutor", description: "Steers students with probing questions instead of revealing the answer", iconName: "MessageSquareCode" },
      { id: "ai-4", name: "Interactive Quiz Generator", description: "Generates personalized diagnostic tests based on past errors", iconName: "CheckSquare" }
    ],
    studyPlan: {
      weeklyHours: 18,
      monthlyGoalsCount: 8,
      assignmentsCount: 15,
      assessmentsCount: 4,
      recommendation: "Engage heavily with the AI Socratic Tutor to isolate specific conceptual edge cases."
    },
    statistics: [
      { id: "stat-3", label: "Average Retention Rate", value: "88%", description: "Measured over 30-day staggered spacing recall" },
      { id: "stat-4", label: "Socratic Chats Completed", value: "45", description: "Deep dialectical learning loops" }
    ]
  },
  {
    id: "stage-3",
    phaseName: "Mastery Phase",
    gradeLevel: "Grade 7 equivalent",
    duration: "6 Months",
    iconName: "ShieldAlert",
    shortDescription: "Rigorous deep-dives into advanced physics, molecular chemistry, and corporate accounting principles.",
    longOverview: "Transitioning toward professional competence. Learners construct multi-factor chemical equations, analyze physical mechanics, and decipher standard corporate sheets. Rigorous inquiry ensures students do not memorize, but deeply understand.",
    completionPercentage: 50,
    motivationalQuote: "Quality is not an act, it is a habit. — Aristotle",
    expectedMilestone: {
      id: "ms-3",
      title: "Conceptual Master Certification",
      description: "Validates ability to synthesize multi-layered STEM and accounting calculations independently.",
      badgeName: "ShieldCheck"
    },
    subjects: [
      { id: "sub-9", name: "Advanced Physics & Mechanics", category: "STEM" },
      { id: "sub-10", name: "Inorganic & Physical Chemistry", category: "STEM" },
      { id: "sub-11", name: "Corporate Accounting Basics", category: "Business" },
      { id: "sub-12", name: "Macroeconomics Intro", category: "Business" }
    ],
    skills: [
      { id: "sk-9", name: "Problem Solving", percentage: 90 },
      { id: "sk-10", name: "Critical Thinking", percentage: 85 },
      { id: "sk-11", name: "Self Learning", percentage: 88 },
      { id: "sk-12", name: "Confidence", percentage: 80 }
    ],
    aiFeatures: [
      { id: "ai-5", name: "AI Scientific Simulator", description: "Interactive physics simulations grounded in physical calculations", iconName: "Layers" },
      { id: "ai-6", name: "AI Writing Assistant", description: "Synthesizes structures, rhetorical clarity, and cohesive arguments", iconName: "Edit3" }
    ],
    studyPlan: {
      weeklyHours: 20,
      monthlyGoalsCount: 10,
      assignmentsCount: 18,
      assessmentsCount: 5,
      recommendation: "Utilize the scientific simulations to visualize difficult physics calculations first."
    },
    statistics: [
      { id: "stat-5", label: "Problem Solving Accuracy", value: "91%", description: "Verified across multi-layered formulas" },
      { id: "stat-6", label: "Simulation Labs Completed", value: "24", description: "Guided virtual experiments" }
    ]
  },
  {
    id: "stage-4",
    phaseName: "Advanced Learning",
    gradeLevel: "Grade 8 equivalent",
    duration: "6 Months",
    iconName: "Crown",
    shortDescription: "Tackle computer programming, differential equations, and intricate business microeconomics.",
    longOverview: "High-level cognitive acceleration. Students master computer science paradigms (syntax, algorithms), advanced differential math equations, and intricate corporate microeconomics. Learners establish high-level research behaviors.",
    completionPercentage: 68,
    motivationalQuote: "The beautiful thing about learning is that no one can take it away from you. — B.B. King",
    expectedMilestone: {
      id: "ms-4",
      title: "Advanced Scholarly Award",
      description: "Granted on completion of a comprehensive digital project demonstrating programming logic or financial modeling.",
      badgeName: "Crown"
    },
    subjects: [
      { id: "sub-13", name: "Differential Calculus & Stats", category: "STEM" },
      { id: "sub-14", name: "Algorithms & Programming", category: "STEM" },
      { id: "sub-15", name: "Microeconomic Frameworks", category: "Business" },
      { id: "sub-16", name: "Pakistan & Islamic History", category: "Humanities" }
    ],
    skills: [
      { id: "sk-13", name: "Problem Solving", percentage: 92 },
      { id: "sk-14", name: "Digital Literacy", percentage: 95 },
      { id: "sk-15", name: "Creativity", percentage: 85 },
      { id: "sk-16", name: "Time Management", percentage: 82 }
    ],
    aiFeatures: [
      { id: "ai-7", name: "Socratic Code Coach", description: "Helps debug syntax errors by asking strategic logic questions", iconName: "Code" },
      { id: "ai-8", name: "AI Revision Architect", description: "Designs customized spacing schedules for all history sub-modules", iconName: "Activity" }
    ],
    studyPlan: {
      weeklyHours: 22,
      monthlyGoalsCount: 12,
      assignmentsCount: 20,
      assessmentsCount: 6,
      recommendation: "Spend at least 4 hours weekly writing code and analyzing algorithmic outputs."
    },
    statistics: [
      { id: "stat-7", label: "Coding Projects Compiled", value: "14", description: "Real algorithmic structures created" },
      { id: "stat-8", label: "Mock Assessment Score", value: "93%", description: "First-attempt average score" }
    ]
  },
  {
    id: "stage-5",
    phaseName: "O Level Preparation",
    gradeLevel: "O-Level equivalent (P1)",
    duration: "6 Months",
    iconName: "Rocket",
    shortDescription: "Intense exam preparation through thousands of past papers guided by diagnostic AI analytics.",
    longOverview: "Honing examinations expertise. Transitioning to structured O Level board question types, focusing on speed, structural precision, and rubric mapping. Diagnostic AI models isolate syllabus blindspots, offering hyper-personalized remedial modules.",
    completionPercentage: 85,
    motivationalQuote: "Success is the sum of small efforts, repeated day in and day out. — Robert Collier",
    expectedMilestone: {
      id: "ms-5",
      title: "O-Level Preparedness Badge",
      description: "Acredited after passing full-length, timed mock assessments under board constraints.",
      badgeName: "Award"
    },
    subjects: [
      { id: "sub-17", name: "O-Level Mathematics Syllabus D", category: "STEM" },
      { id: "sub-18", name: "O-Level Physics & Chemistry", category: "STEM" },
      { id: "sub-19", name: "O-Level Business & Accounting", category: "Business" },
      { id: "sub-20", name: "O-Level Economics & Humanities", category: "Business" }
    ],
    skills: [
      { id: "sk-17", name: "Problem Solving", percentage: 96 },
      { id: "sk-18", name: "Critical Thinking", percentage: 94 },
      { id: "sk-19", name: "Confidence", percentage: 90 },
      { id: "sk-20", name: "Time Management", percentage: 92 }
    ],
    aiFeatures: [
      { id: "ai-9", name: "Socratic Paper Grader", description: "Analyzes mock papers against verified rubrics, providing instant diagnostic tips", iconName: "FileCheck" },
      { id: "ai-10", name: "AI Performance Analytics", description: "Traces topic strengths and weaknesses across 10 years of past papers", iconName: "LineChart" }
    ],
    studyPlan: {
      weeklyHours: 25,
      monthlyGoalsCount: 15,
      assignmentsCount: 30,
      assessmentsCount: 8,
      recommendation: "Commit to completing at least two complete past exam papers per subject every single week."
    },
    statistics: [
      { id: "stat-9", label: "Mock Exam Success Rate", value: "96%", description: "Scoring solid A or A* grade projections" },
      { id: "stat-10", label: "Past Exam Papers Analyzed", value: "150+", description: "Grounded in official exam rubrics" }
    ]
  },
  {
    id: "stage-6",
    phaseName: "O Level Success",
    gradeLevel: "O-Level Exams (P2)",
    duration: "4 Months",
    iconName: "Flame",
    shortDescription: "Final refinement, actual board examination execution, and transition to A-Levels.",
    longOverview: "The culmination of the 3-Year accelerated learning journey. Final precision tutoring sessions, physiological readiness protocols, actual Cambridge Board examinations execution, and strategic counseling for A-Level transition.",
    completionPercentage: 100,
    motivationalQuote: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure. — Colin Powell",
    expectedMilestone: {
      id: "ms-6",
      title: "EBM Scholar Laurels",
      description: "Ecosystem's highest academic distinction, signaling successful O-Level achievement in approximately 3 years.",
      badgeName: "GraduationCap"
    },
    subjects: [
      { id: "sub-21", name: "Advanced Board Prep Labs", category: "STEM" },
      { id: "sub-22", name: "Professional Presentation Logic", category: "Language" },
      { id: "sub-23", name: "Next-Gen AI Research Methods", category: "STEM" },
      { id: "sub-24", name: "University Career Counseling", category: "Humanities" }
    ],
    skills: [
      { id: "sk-21", name: "Problem Solving", percentage: 98 },
      { id: "sk-22", name: "Communication", percentage: 95 },
      { id: "sk-23", name: "Self Learning", percentage: 98 },
      { id: "sk-24", name: "Confidence", percentage: 96 }
    ],
    aiFeatures: [
      { id: "ai-11", name: "Career Pathfinder AI", description: "Analyzes performance profile to match A-Level subjects and elite global universities", iconName: "Compass" },
      { id: "ai-12", name: "Stress-Mgmt Coach AI", description: "Bespoke breathing, mental mapping, and logical alignment check-ins", iconName: "Activity" }
    ],
    studyPlan: {
      weeklyHours: 15,
      monthlyGoalsCount: 6,
      assignmentsCount: 10,
      assessmentsCount: 2,
      recommendation: "Focus on mental stamina, timing accuracy, and structural presentation of your steps."
    },
    statistics: [
      { id: "stat-11", label: "EBM O-Level Success Rate", value: "94.8%", description: "A* to B grades in standard tests" },
      { id: "stat-12", label: "Average Age of Graduates", value: "13.5", description: "Completing 4-5 years ahead of global peers" }
    ]
  }
];
