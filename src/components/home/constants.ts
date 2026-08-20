import { 
  JourneyStage, 
  WhyChooseEbmCard, 
  SubjectItem, 
  AiFeature, 
  Testimonial, 
  PricingPlan, 
  FaqItem, 
  HeroStat 
} from "./types";

export const HOME_ANNOUNCEMENT = {
  id: "ann_2026",
  text: "Admissions Open for Session 2026 — Start your Grade 5 to O Level Journey Today!",
  ctaText: "Apply Now",
  ctaUrl: "#pricing",
  isActive: true
};

export const HERO_STATS: HeroStat[] = [
  { id: "stat_students", label: "Active Students", value: "12k+", count: 12400, suffix: "+", iconName: "Users" },
  { id: "stat_lessons", label: "Curated Lessons", value: "1,200+", count: 1200, suffix: "+", iconName: "BookOpen" },
  { id: "stat_ai", label: "AI Tutor Sessions", value: "150k+", count: 150000, suffix: "+", iconName: "Sparkles" },
  { id: "stat_success", label: "CIE O-Level A*s", value: "94.8%", count: 94.8, suffix: "%", iconName: "Award" }
];

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: "journey_y1",
    year: 1,
    title: "Accelerated Foundations",
    grades: "Grades 5, 6, 7 Essentials",
    description: "Build robust learning heuristics. We double standard reading speeds while solidifying mental math, language linguistics, and experimental reasoning.",
    subjects: ["Accelerated Mathematics", "English Linguistics & Speed Reading", "General Science Foundations"],
    outcomes: ["Double standard reading velocity", "Complex fraction & ratio mental manipulation", "Hypothesis formulation & variable isolation"],
    iconName: "Compass"
  },
  {
    id: "journey_y2",
    year: 2,
    title: "Pre-O Level Mastery",
    grades: "Grades 8 & 9 Rigor",
    description: "Transition immediately into rigorous analytical thinking. Deep-dive into simultaneous algebraic formulas, physics kinematics, chemistry matter structures, and social essays.",
    subjects: ["Quadratic Systems & Geometry", "Kinematics & Dynamics Physics", "Atomic Chemistry & Biological Cells", "Pakistan Studies & Islamiyat Core"],
    outcomes: ["Solve systems of simultaneous matrices", "Derive mechanics vector resolutions", "Analyze atomic bonds & structural equations"],
    iconName: "Activity"
  },
  {
    id: "journey_y3",
    year: 3,
    title: "CIE O Level Excellence",
    grades: "O-Level Exams (CIE 4024 / 5054 / 5070 / 5090)",
    description: "Intense preparation for final Cambridge International Examinations. Solve 10 years of past papers, analyze exam grading patterns, and undergo diagnostic mock testing.",
    subjects: ["CIE Syllabus Calculus & Trigs", "Electromagnetism & Nuclear physics", "Organic Chemistry & Genetics", "Comprehensive Exam Masterclass"],
    outcomes: ["A* and A grades on average across final CIE exams", "Exceptional college-level analytical aptitude", "Mastery of 15 years of exam mechanics"],
    iconName: "Award"
  }
];

export const WHY_EBM_CARDS: WhyChooseEbmCard[] = [
  {
    id: "why_faster",
    title: "Learn 3X Faster",
    description: "The Ejaz Bukhari Method condenses redundant elements, focusing purely on high-yield conceptual anchors that skip standard school repetition.",
    iconName: "TrendingUp",
    gradientFrom: "from-blue-500/10",
    gradientTo: "to-indigo-500/10"
  },
  {
    id: "why_ai",
    title: "24/7 Gemini-Powered AI Tutor",
    description: "Every student is assigned an AI study companion that instantly simplifies complex mathematical equations, answers vocabulary queries, and builds custom practice sets.",
    iconName: "Sparkles",
    gradientFrom: "from-amber-500/10",
    gradientTo: "to-orange-500/10"
  },
  {
    id: "why_critical",
    title: "Critical Thinking First",
    description: "We forbid blind memorization. Every concept is learned through proof, physical application, dynamic visualization, and experimental discovery.",
    iconName: "Compass",
    gradientFrom: "from-purple-500/10",
    gradientTo: "to-pink-500/10"
  },
  {
    id: "why_personalized",
    title: "Dynamic Daily Diagnostics",
    description: "Our micro-planners evaluate quiz scores daily, adapting next-day lesson difficulties to patch knowledge weaknesses immediately.",
    iconName: "CheckCircle",
    gradientFrom: "from-blue-500/10",
    gradientTo: "to-sky-500/10"
  },
  {
    id: "why_parent",
    title: "The Parent Command Dashboard",
    description: "Get weekly breakdowns of your child's completed milestones, streak counts, daily learning minutes, and automated alert reports.",
    iconName: "Users",
    gradientFrom: "from-cyan-500/10",
    gradientTo: "to-blue-500/10"
  },
  {
    id: "why_career",
    title: "College & Career Aptitude",
    description: "EBM graduates develop standard-shattering study discipline, critical analysis, and self-organization skills that guarantee top-tier university success.",
    iconName: "Briefcase",
    gradientFrom: "from-rose-500/10",
    gradientTo: "to-red-500/10"
  }
];

export const HOME_SUBJECTS: SubjectItem[] = [
  {
    id: "sub_math",
    title: "Advanced Mathematics",
    description: "Heuristics and proofs covering mental calculations, matrices, calculus, coordinate trigonometry, and standard CIE Syllabus 4024.",
    estimatedDuration: "140 Hours",
    level: "Advanced",
    iconName: "Compass",
    colorClass: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    id: "sub_english",
    title: "English Linguistics & Speed Reading",
    description: "Speed-reading techniques, vocabulary precision, contextual parsing, argumentative essay writing, and comprehension diagnostics.",
    estimatedDuration: "90 Hours",
    level: "Foundation",
    iconName: "BookOpen",
    colorClass: "bg-amber-50 text-amber-700 border-amber-100"
  },
  {
    id: "sub_physics",
    title: "CIE Syllabus Physics (5054)",
    description: "Explore kinematics, mechanics vector resolution, electromagnetism, and radioactive half-life calculations.",
    estimatedDuration: "110 Hours",
    level: "Advanced",
    iconName: "Activity",
    colorClass: "bg-purple-50 text-purple-700 border-purple-100"
  },
  {
    id: "sub_chemistry",
    title: "CIE Syllabus Chemistry (5070)",
    description: "Atomic structures, chemical bonding equations, chemical kinetics, acids & bases, and high-yield organic formulation.",
    estimatedDuration: "110 Hours",
    level: "Advanced",
    iconName: "Layers",
    colorClass: "bg-blue-50 text-blue-700 border-blue-100"
  },
  {
    id: "sub_biology",
    title: "CIE Syllabus Biology (5090)",
    description: "Genetics, cellular structures, photosynthesis mechanisms, physiological processes, and environmental ecosystems.",
    estimatedDuration: "100 Hours",
    level: "Advanced",
    iconName: "Award",
    colorClass: "bg-pink-50 text-pink-700 border-pink-100"
  },
  {
    id: "sub_cs",
    title: "Computer Science Essentials",
    description: "Logical gating, pseudo-coding, dry-running algorithms, binary arithmetic, and structural databases.",
    estimatedDuration: "80 Hours",
    level: "Intermediate",
    iconName: "FileText",
    colorClass: "bg-cyan-50 text-cyan-700 border-cyan-100"
  },
  {
    id: "sub_pak_studies",
    title: "Pakistan Studies Core",
    description: "Comprehensive historical, geographical, and geopolitical landscape analysis of Pakistan for Cambridge syllabus alignment.",
    estimatedDuration: "70 Hours",
    level: "Intermediate",
    iconName: "Users",
    colorClass: "bg-indigo-50 text-indigo-700 border-indigo-100"
  },
  {
    id: "sub_islamiyat",
    title: "Islamiyat Core & Ethics",
    description: "Study ethical frameworks, historical transcripts, and logical philosophical underpinnings of Islamic jurisprudence.",
    estimatedDuration: "60 Hours",
    level: "Foundation",
    iconName: "BookMarked",
    colorClass: "bg-orange-50 text-orange-700 border-orange-100"
  },
  {
    id: "sub_economics",
    title: "Business & Economics Studies",
    description: "Introduction to market forces, macro-economic metrics, business bookkeeping, and global investment strategies.",
    estimatedDuration: "120 Hours",
    level: "Intermediate",
    iconName: "TrendingUp",
    colorClass: "bg-rose-50 text-rose-700 border-rose-100"
  }
];

export const AI_FEATURES: AiFeature[] = [
  { id: "ai_tutor", title: "Instant Socratic AI Tutor", description: "Rather than giving outright answers, our tutor guides students via conceptual prompting to discover equations on their own.", iconName: "Sparkles" },
  { id: "ai_homework", title: "Stuck-Patch Homework Assistant", description: "Upload assignments and get atomic, step-by-step breakdowns of difficult physics vector or arithmetic problems.", iconName: "HelpCircle" },
  { id: "ai_reading", title: "Linguistic Speed Coach", description: "A high-precision visual tool that guides ocular scanning, helping students scale verbal comprehension dynamically.", iconName: "BookOpen" },
  { id: "ai_planner", title: "Proactive Task Planner", description: "Automatically schedules student study durations depending on individual focus rhythms and diagnostic gaps.", iconName: "Calendar" }
];

export const HOME_TESTIMONIALS: Testimonial[] = [
  {
    id: "test_1",
    name: "Dr. Maryam Siddiqui",
    role: "Parent",
    text: "At first, I was skeptical about accelerating my daughter from Grade 5 to O-Levels in 3 years. But the Bukhari method's focus on English speed-reading and structured math gave her such exceptional confidence. She finished her CIEs at age 13 with 5 A*s!",
    rating: 5,
    yearAchieved: "Class of 2025"
  },
  {
    id: "test_2",
    name: "Zain Al-Abideen",
    role: "Student",
    text: "Standard school was incredibly slow. EBM allowed me to study at my own pace. The daily planner goals were highly addictive, and having the AI Tutor explain calculus step-by-step made me fall in love with engineering.",
    rating: 5,
    yearAchieved: "Passed O-Levels in 2.5 Years"
  },
  {
    id: "test_3",
    name: "Professor K. Jamil",
    role: "Educator",
    text: "As an academic examiner, I am amazed by the conceptual clarity of EBM graduates. They do not just memorize formulas; they understand the derivation mechanics. They are better prepared for college than most high school seniors.",
    rating: 5,
    yearAchieved: "Senior CIE Consultant"
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "plan_free",
    name: "Foundation Free",
    priceMonthly: 0,
    description: "Perfect for exploring the EBM syllabus outlines and experiencing core accelerated lectures.",
    features: [
      "Access to Year 1 core arithmetic modules",
      "Limited daily AI Tutor chat (5 queries/day)",
      "Basic Student Daily Checklist",
      "Public 3-Year Syllabus Roadmap"
    ],
    isHighlighted: false,
    ctaText: "Get Started Free"
  },
  {
    id: "plan_premium",
    name: "EBM Full Accelerator",
    priceMonthly: 39,
    description: "Our signature plan covering the full academic fast-track from Grade 5 to O-Levels in 3 years.",
    features: [
      "Full access to Year 1, 2, and 3 Accelerated Modules",
      "Unlimited Gemini-powered 24/7 AI Tutor Chat",
      "Parent Command Hub & Diagnostic Metrics Email Alerts",
      "Automated Daily Planner with Adaptive Diagnostic Patching",
      "Official CIE Mock Exams with Diagnostic Grading Reports",
      "Cloudflare R2 Digital Worksheets & Past Paper Downloads"
    ],
    isHighlighted: true,
    ctaText: "Unlock Premium Access"
  },
  {
    id: "plan_school",
    name: "Institution / School Batch",
    priceMonthly: 199,
    description: "Complete localized classroom deployment. Empowers teachers to track entire groups easily.",
    features: [
      "All Premium Accelerator benefits for up to 30 students",
      "Comprehensive Teacher Portal with Class Metrics Tracking",
      "Direct homework-assignment dispatcher directly into student streams",
      "Dedicated school-success academic advisor support",
      "Multi-user synchronization & group performance diagnostics"
    ],
    isHighlighted: false,
    ctaText: "Enroll School Group"
  }
];

export const HOME_FAQS: FaqItem[] = [
  {
    id: "faq_how",
    question: "Is it really possible to complete Grade 5 to O Level in just 3 years?",
    answer: "Yes, absolutely. Standard schools stretch basic parameters across years using repetitive exercises. The Ejaz Bukhari Method compresses the curriculum by grouping fundamentals logically, maximizing speed-reading capacities in Year 1, and introducing deep analysis early. Our data proves student success yields top grades."
  },
  {
    id: "faq_age",
    question: "Will my child feel overwhelmed or stressed?",
    answer: "No, because EBM replaces brute repetition with enjoyable, gamified daily milestones. The adaptive daily planner dynamically adjusts to individual student comprehension, ensuring children are challenged without experiencing cognitive exhaustion."
  },
  {
    id: "faq_ai",
    question: "How does the AI Tutor help the student?",
    answer: "Our AI Tutor utilizes advanced Gemini model frameworks configured client-side and server-side. It answers questions Socratic-style—prompting students step-by-step rather than spoiling answers, reinforcing critical analytical thinking."
  },
  {
    id: "faq_recognition",
    question: "Is this program accredited and aligned with Cambridge examinations?",
    answer: "Our Year 3 syllabus is completely aligned with the Cambridge Assessment International Examinations (CIE) syllabus codes (4024 for Math, 5054 for Physics, etc.). EBM graduates take their official exams as independent candidates and achieve globally recognized high school equivalents."
  },
  {
    id: "faq_parent",
    question: "How can parents keep track of progress?",
    answer: "The Parent Command Dashboard gives instantaneous metrics on learning streaks, completed milestones, average scores, and active daily study minutes. Parents also receive warning flags if tasks are overdue."
  },
  {
    id: "faq_r2",
    question: "Where are course worksheets, books, and past papers stored?",
    answer: "All official EBM media assets, organic chemistry worksheets, speed reading books, and past paper booklets are securely hosted on Cloudflare R2 distributed storage for quick, lag-free global delivery."
  }
];
