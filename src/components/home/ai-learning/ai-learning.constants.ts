import { 
  AIFeature, 
  QuickPrompt, 
  AIWorkflowStep, 
  StudentProfile, 
  AIResource, 
  SecurityItem,
  StudyDashboard
} from "./ai-learning.types";

export const AI_FEATURES_DATA: AIFeature[] = [
  {
    id: "feat-1",
    name: "AI Tutor",
    description: "24/7 active Socratic guide that prompts you with deep questions to trigger aha-moments instead of giving answers directly.",
    iconName: "BrainCircuit",
    category: "tutor",
    badge: "Socratic Core"
  },
  {
    id: "feat-2",
    name: "Worksheet Generator",
    description: "Instantly draft bespoke algebraic or scientific drill worksheets, calibrated to your current knowledge gaps.",
    iconName: "FileSpreadsheet",
    category: "generator"
  },
  {
    id: "feat-3",
    name: "Quiz Generator",
    description: "Generate structured multiple choice or short answer tests based directly on custom syllabus guidelines.",
    iconName: "GraduationCap",
    category: "generator"
  },
  {
    id: "feat-4",
    name: "Writing Coach",
    description: "Deep text analyzer offering detailed mechanics, structure, and clarity evaluations on O/A-level English essays.",
    iconName: "PenTool",
    category: "coach"
  },
  {
    id: "feat-5",
    name: "Reading Coach",
    description: "Accelerate your vocabulary, speed reading capabilities, and reading comprehension with real-time feedback.",
    iconName: "BookOpen",
    category: "coach"
  },
  {
    id: "feat-6",
    name: "Speaking Coach",
    description: "Speech and delivery evaluator tracking fluency, speed, and logical progression for spoken Urdu and English.",
    iconName: "Mic",
    category: "coach",
    badge: "Beta"
  },
  {
    id: "feat-7",
    name: "Study Planner",
    description: "Algorithmic time-block manager dynamically adapting based on current daily speeds, streaks, and focus times.",
    iconName: "CalendarRange",
    category: "assistant"
  },
  {
    id: "feat-8",
    name: "Revision Assistant",
    description: "Leverages active-recall principles and spaced-repetition loops to ensure retention of CIE exam topics.",
    iconName: "History",
    category: "assistant"
  },
  {
    id: "feat-9",
    name: "Exam Coach",
    description: "Syllabus checker comparing student responses with actual Cambridge marking schemes to maximize score metrics.",
    iconName: "Award",
    category: "coach",
    badge: "Premium"
  },
  {
    id: "feat-10",
    name: "Homework Helper",
    description: "Instant, friendly assistant to untangle complex formulas, chemical structures, or historical timelines after hours.",
    iconName: "Sparkles",
    category: "assistant"
  }
];

export const QUICK_PROMPTS_DATA: QuickPrompt[] = [
  {
    id: "qp-1",
    label: "Explain like I'm 10",
    promptText: "Can you explain quadratic equations like I'm 10 years old?",
    responseText: "Imagine you have a square sandbox. If we expand the sides by a little bit, how much extra space do we get? A quadratic equation helps us find that secret missing side length when we only know the total sandbox area! Let's build a small visual box step-by-step to show you. Ready?",
    iconName: "Baby"
  },
  {
    id: "qp-2",
    label: "Create a worksheet",
    promptText: "Generate a custom worksheet on factoring quadratic trinomials.",
    responseText: "Perfect! I have generated a custom 5-problem worksheet targeting standard factoring of form x² + bx + c = 0. Here is Problem #1: Factor x² - 5x + 6 = 0. Try factoring it and send me your final steps, and I will check your logic!",
    iconName: "FileText"
  },
  {
    id: "qp-3",
    label: "Test my understanding",
    promptText: "Give me a quick pop quiz on chemical bonding.",
    responseText: "Let's test your covalent vs. ionic knowledge! True or False: In a covalent bond, atoms transfer electrons completely from one outer shell to another. Think carefully about sharing versus transfer!",
    iconName: "CheckSquare"
  },
  {
    id: "qp-4",
    label: "Explain this topic",
    promptText: "Explain how photosynthesis transfers energy.",
    responseText: "Photosynthesis is nature's solar power grid! Chloroplasts inside the plant's cells absorb light photons, using that precise quantum kinetic energy to split water molecules. This releases oxygen as a byproduct while locking hydrogen and carbon into dense energy-rich glucose molecules. Ready to trace the light-dependent reactions?",
    iconName: "Lightbulb"
  },
  {
    id: "qp-5",
    label: "Translate to Urdu",
    promptText: "How do you explain gravity in Urdu?",
    responseText: "کشش ثقل (Gravity) وہ قدرتی قوت ہے جو مادی اشیاء کو ایک دوسرے کی طرف کھینچتی ہے۔ جیسے زمین ہر اس چیز کو اپنی طرف کھینچتی ہے جس میں وزن ہو، اسی لیے جب آپ کوئی چیز اوپر پھینکتے ہیں تو وہ نیچے واپس آتی ہے۔ کیا آپ کو اس کا سائنسی نظریہ سمجھنا ہے؟",
    iconName: "Languages"
  }
];

export const WORKFLOW_STEPS_DATA: AIWorkflowStep[] = [
  {
    id: "flow-1",
    stepNumber: 1,
    title: "Ask Question",
    description: "Query our AI mentor anytime on any CIE textbook concept, formula, or history topic.",
    iconName: "HelpCircle"
  },
  {
    id: "flow-2",
    stepNumber: 2,
    title: "AI Explains",
    description: "Receives an active Socratic prompt that explains concepts step-by-step to uncover absolute truths.",
    iconName: "MessageSquareCode"
  },
  {
    id: "flow-3",
    stepNumber: 3,
    title: "Practice Drills",
    description: "The platform dynamically compiles interactive, personalized problem worksheets on the fly.",
    iconName: "PenTool"
  },
  {
    id: "flow-4",
    stepNumber: 4,
    title: "AI Assessment",
    description: "Immediate checking of your steps, logic pathways, mechanics, and spelling constraints.",
    iconName: "LineChart"
  },
  {
    id: "flow-5",
    stepNumber: 5,
    title: "Rich Feedback",
    description: "Get personalized visual breakdowns detailing precisely where you made core structural or logical slip-ups.",
    iconName: "FileCheck2"
  },
  {
    id: "flow-6",
    stepNumber: 6,
    title: "Targeted Mastery",
    description: "Unlock modular progression and earn certified performance records recognized globally.",
    iconName: "Trophy"
  }
];

export const STUDENT_PROFILES_DATA: StudentProfile[] = [
  {
    id: "prof-1",
    name: "Zainab Ali",
    needsPracticeIn: ["Mathematics", "Physics Practical Drills"],
    excelsIn: ["Creative Writing", "English Grammar"],
    academicTarget: "Targeting Straight A* in CIE O-Levels",
    aiPersonaAdaptation: "Launches visual geometry sandboxes and custom algebraic worksheets. Tone: Encouraging, visual, and rigorous."
  },
  {
    id: "prof-2",
    name: "Hamza Malik",
    needsPracticeIn: ["Urdu Translation", "Chemical Stoichiometry"],
    excelsIn: ["Mental Mathematics", "Computer Science"],
    academicTarget: "Preparing for Elite Science Track A-Levels",
    aiPersonaAdaptation: "Speeds up chemical equation balancers, delivers code sandboxes, and offers Urdu-English parallel audio guides. Tone: Direct, analytical, and fast-paced."
  },
  {
    id: "prof-3",
    name: "Ayesha Omer",
    needsPracticeIn: ["History Chronology", "Biology Diagrams"],
    excelsIn: ["Geometrical Proofs", "Essay Flow"],
    academicTarget: "Applying for International STEM Scholarship",
    aiPersonaAdaptation: "Leverages spaced-repetition historical flashcards, creates dynamic biology flowcharts, and drafts essay feedback panels. Tone: Structured, editorial, and inquisitive."
  }
];

export const MOCK_RESOURCES_DATA: AIResource[] = [
  {
    id: "res-1",
    title: "Quadratic Factoring Practice Sheet",
    type: "Worksheet",
    subjectName: "Accelerated Mathematics",
    downloadsCount: 1420,
    estimatedStudyTime: "25 min study time",
    description: "Custom generated drill sheet detailing 15 algebraic polynomials with a comprehensive step-by-step key."
  },
  {
    id: "res-2",
    title: "Covalent & Ionic Bonding Flashcards",
    type: "Flash Cards",
    subjectName: "Fundamental Chemistry",
    downloadsCount: 890,
    estimatedStudyTime: "15 min review",
    description: "Interlocking card set highlighting outer shell electron structures and electro-static forces."
  },
  {
    id: "res-3",
    title: "Cambridge English Essay Blueprint",
    type: "Writing Feedback",
    subjectName: "O-Level English Comprehension",
    downloadsCount: 2150,
    estimatedStudyTime: "40 min study time",
    description: "A-grade argumentative writing formats analyzed by our Writing Coach with structure indicators."
  },
  {
    id: "res-4",
    title: "Socratic Cell Biology Mind Map",
    type: "Mind Map",
    subjectName: "Fundamental Biology",
    downloadsCount: 1120,
    estimatedStudyTime: "20 min overview",
    description: "Interactive visual map tying organelles, photosynthesis, and respiration under cohesive hierarchies."
  }
];

export const SECURITY_ITEMS_DATA: SecurityItem[] = [
  {
    id: "sec-1",
    title: "Secure Student Data",
    description: "All academic data is isolated and safely stored in end-to-end encrypted databases.",
    iconName: "ShieldCheck"
  },
  {
    id: "sec-2",
    title: "Private Conversations",
    description: "Socratic tutoring logs are accessible only to the student and verified parents, never shared.",
    iconName: "Lock"
  },
  {
    id: "sec-3",
    title: "Safe AI Environment",
    description: "Advanced toxicity filtration guarantees a focused, positive, and strictly academic dialog.",
    iconName: "EyeOff"
  },
  {
    id: "sec-4",
    title: "Parent Controls",
    description: "Real-time feeds and visual telemetry allow parents to view chats, speed metrics, and prompts.",
    iconName: "Users"
  }
];

export const MOCK_STUDY_DASHBOARD: StudyDashboard = {
  id: "dash-current",
  todayGoal: "Factor 5 Trinomials & Complete Chemistry Bonding Quiz",
  lessonsRemaining: 2,
  quizReminder: "Bonding Drill in 1 hour",
  revisionTime: "15 min active recall",
  aiRecommendation: "Review carbon double covalent bonds. Your focus dips slightly during late chemistry drills.",
  studyStreak: 12,
  focusScore: 94,
  productivityScore: 88
};
