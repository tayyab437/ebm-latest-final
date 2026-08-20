import {
  Statistic,
  TransformationStage,
  StudentStory,
  ParentTestimonial,
  TeacherTestimonial,
  Achievement,
  Outcome,
  CareerSkill,
  CommunityMetric,
  Award,
} from "./success.types";

export const STATISTICS_DATA: Statistic[] = [
  {
    id: "stat-1",
    value: "14,800+",
    label: "Students Enrolled",
    description: "Accelerated scholars active across 12 countries.",
    iconName: "Users",
  },
  {
    id: "stat-2",
    value: "1.2 Million",
    label: "Learning Hours",
    description: "Spent in deliberate, structured academic engagement.",
    iconName: "Clock",
  },
  {
    id: "stat-3",
    value: "94.6%",
    label: "A-Grade Rate",
    description: "In O Level Mathematics, Chemistry, and Physics.",
    iconName: "Award",
  },
  {
    id: "stat-4",
    value: "450,000+",
    label: "AI Dialogues",
    description: "Custom Socratic sessions generated to resolve queries.",
    iconName: "BrainCircuit",
  },
  {
    id: "stat-5",
    value: "98.2%",
    label: "Completion Rate",
    description: "Consistent follow-through on personalized study plans.",
    iconName: "CheckCircle",
  },
  {
    id: "stat-6",
    value: "3,200+",
    label: "Parents Synced",
    description: "Actively monitoring progress through live parent portals.",
    iconName: "HeartHandshake",
  },
];

export const TIMELINE_DATA: TransformationStage[] = [
  {
    id: "stage-1",
    stageName: "Before EBM",
    timeframe: "Baseline Diagnostics",
    confidence: "Very Low (Under 40%) - Avoided participating in class.",
    habits: "Reactive study; crammed before exams, passive reading.",
    growth: "Consistently scoring C/D grades in STEM.",
    skill: "Struggling with problem decomposition & core equations.",
    aiUsage: "None. No digital co-pilot available.",
    parentFeedback: "Anxious, overwhelmed; lack of visibility into bottlenecks.",
    achievement: "Attempted questions only when forced.",
  },
  {
    id: "stage-2",
    stageName: "First Month",
    timeframe: "Adaptation & Onboarding",
    confidence: "Growing (55%) - Responding to structured Socratic prompts.",
    habits: "Daily 15-min core drills established; concept log created.",
    growth: "Stabilized performance; understanding foundational logic.",
    skill: "Mastered basic factoring, elemental balance, structured grammar.",
    aiUsage: "Utilized Gemini Tutor for real-time hint generation.",
    parentFeedback: "Relieved to see a structured plan and daily progress logs.",
    achievement: "15-Day Study Streak Badge achieved.",
  },
  {
    id: "stage-3",
    stageName: "Three Months",
    timeframe: "Momentum Phase",
    confidence: "High (75%) - Enthusiastically explaining steps to peers.",
    habits: "Pre-class previewing habit; diagnostic drills completed weekly.",
    growth: "Averages increased to B+; rapid mistake correction rate.",
    skill: "Solving complex multi-step algebra and application scenarios.",
    aiUsage: "Deep-dives into error correction logs; custom worksheet generation.",
    parentFeedback: "Noticed proactive homework habits; student displays agency.",
    achievement: "Completed 100% of Chemistry curriculum milestone.",
  },
  {
    id: "stage-4",
    stageName: "One Year",
    timeframe: "Self-Actualized Scholar",
    confidence: "Exceptional (95%) - Acts as a peer tutor in community circles.",
    habits: "Rigorous diagnostic analysis; custom scheduling of revision rounds.",
    growth: "Solid A/A* average across all enrolled subjects.",
    skill: "Strong synthesis, advanced reasoning, fluid problem solving.",
    aiUsage: "Designs personal exam mocks using Socratic parameters.",
    parentFeedback: "Incredibly proud; complete confidence in exam preparedness.",
    achievement: "Recipient of the Golden Scribe Milestone Medallion.",
  },
];

export const STUDENT_STORIES_DATA: StudentStory[] = [
  {
    id: "story-1",
    name: "Aisha Al-Mansoor",
    currentGrade: "O Level / Grade 11",
    previousSchool: "Standard Academy (Private)",
    goals: ["A* in Additional Mathematics", "Admission to MIT", "Master AI Engineering"],
    challenges: [
      "Severely anxious during timed examinations",
      "Struggled to connect abstract formulas to real-world applications",
    ],
    journey:
      "Aisha struggled with Additional Math formulas, viewing them as purely memorized steps. On EBM, she engaged with interactive 3D graphs and consulted the Socratic AI Tutor to break down multi-step calculus. Step-by-step guidance rewired her approach from memorization to logical derivation.",
    achievements: [
      "Achieved raw score of 98/100 in O Level Mathematics Mock exam",
      "Earned EBM Mathematics Scholar Medal",
      "Designed a custom web simulation for mechanics",
    ],
    favouriteSubject: "Additional Mathematics",
    favouriteAITool: "Socratic Equation Decomposer",
    futureDream: "Robotics and AI Researcher at NASA",
    parentComment:
      "Aisha went from crying over algebra papers to teaching our younger son geometry. The confidence change is breathtaking.",
    teacherComment:
      "Aisha now looks at equations as puzzles to solve rather than formulas to memorize. She is an exceptional mathematical thinker.",
  },
  {
    id: "story-2",
    name: "Brandon Vance",
    currentGrade: "O Level / Grade 10",
    previousSchool: "City Central Secondary School",
    goals: ["Boost Chemistry grade from D to A*", "Build an outstanding science portfolio"],
    challenges: [
      "Inattentive in large conventional classes",
      "Failed to grasp molecular bonding concepts through standard textbook visuals",
    ],
    journey:
      "Brandon was easily distracted in a class of 30. EBM's modular, bite-sized curriculum and instant gamified feedback loop captured his attention. He used the organic chemistry 3D visualizers to interactively manipulate chemical structures and utilized AI to simulate lab experiments safely.",
    achievements: [
      "Boosted performance from 42% to 91% within 5 months of joining EBM",
      "Won 1st Place in the Regional Chemistry Olympiad",
      "Accumulated a 120-day persistent learning streak",
    ],
    favouriteSubject: "Organic & Physical Chemistry",
    favouriteAITool: "Molecular Reaction Simulator",
    futureDream: "Cardiothoracic Surgeon & Medical Innovator",
    parentComment:
      "We tried three private tutors and saw no change. EBM's system hooked him instantly. He doesn't need to be nagged to study anymore.",
    teacherComment:
      "Brandon's analytical skills are superb. He utilizes the Socratic tutor to test hypotheses before completing physical assignments.",
  },
  {
    id: "story-3",
    name: "Maya Lin",
    currentGrade: "O Level / Grade 11",
    previousSchool: "Beacon International School",
    goals: ["Overcome severe physics anxiety", "Perfect her analytical essay writing skills"],
    challenges: [
      "Excellent at humanities, but had massive mental block against physics calculations",
      "Lack of structured diagnostic tools to isolate missing concepts",
    ],
    journey:
      "Maya was convinced she lacked the 'math brain'. EBM's diagnostic engine pinpointed that her struggle was not with physics, but with standard fractions and vector manipulation. After 3 targeted mini-drills, physics concepts suddenly clicked.",
    achievements: [
      "Achieved a straight A* in O Level Physics",
      "Published a physics-themed essay in the EBM Scholar Journal",
      "Perfect score in the Mechanics and Dynamics assessment",
    ],
    favouriteSubject: "Thermal & Classical Physics",
    favouriteAITool: "Math Pre-requisite Diagnostic Engine",
    futureDream: "Environmental Architect & Sustainability Designer",
    parentComment:
      "EBM removed the fear of failure. Maya learned that math was just a skill she hadn't practiced correctly, not an innate talent she lacked.",
    teacherComment:
      "Maya's written analyses of thermal systems show a brilliant synthesis of logic and description. She is exceptionally well-prepared.",
  },
];

export const PARENT_TESTIMONIALS_DATA: ParentTestimonial[] = [
  {
    id: "parent-1",
    name: "Dr. Robert Chen",
    occupation: "Senior Consultant Cardiologist",
    childGrade: "Grade 11 (O Level Mathematics & Biology)",
    rating: 5,
    review:
      "As a physician, I value evidence-based methods. EBM's diagnostic analytics are incredibly rigorous. It doesn't just say 'study more'; it shows exactly which sub-concepts my son is struggling with. His scores moved from B to a strong A* in under a semester.",
    location: "Singapore",
    childrenEnrolled: 2,
  },
  {
    id: "parent-2",
    name: "Sarah Jenkins",
    occupation: "Software Engineering Director",
    childGrade: "Grade 10 (O Level Science & English)",
    rating: 5,
    review:
      "The integration of Socratic AI is flawless. Unlike other platforms that just give answers, EBM guides my daughter to find the answer herself. She is developing real critical thinking skills instead of just rote memorization. Highly recommended for parents who care about long-term growth.",
    location: "London, UK",
    childrenEnrolled: 1,
  },
  {
    id: "parent-3",
    name: "Fatimah Al-Mutawa",
    occupation: "Educational Psychologist",
    childGrade: "Grade 11 (O Level Chemistry & Physics)",
    rating: 5,
    review:
      "I was skeptical about another digital platform, but EBM's instructional design is flawless. The cognitive load is perfectly balanced, the feedback is immediate, and the gamified progression is genuinely motivating. It builds deep focus without the dopamine fatigue of cheap study games.",
    location: "Dubai, UAE",
    childrenEnrolled: 2,
  },
  {
    id: "parent-4",
    name: "Marcus Thorne",
    occupation: "Managing Director, Thorne Investments",
    childGrade: "Grade 9 (Pre-O Level Science Foundations)",
    rating: 5,
    review:
      "The EBM parent portal is magnificent. I get actionable weekly reports detailing study habits, mastery percentages, and immediate action items. No more guessing how my kids are doing or waiting for parent-teacher conferences. I can support them dynamically.",
    location: "Cape Town, South Africa",
    childrenEnrolled: 3,
  },
];

export const TEACHER_TESTIMONIALS_DATA: TeacherTestimonial[] = [
  {
    id: "teacher-1",
    name: "Elena Rostova",
    subject: "Physics & Chemistry Lead",
    experience: "14 Years in Cambridge IGCSE / O Levels",
    philosophy: "Demystify complex equations through interactive physical modeling and visual inquiry.",
    whyJoined:
      "Conventional schools restrict how deeply we can customize instruction. EBM gives me the tools to mentor students individually based on precise, live cognitive diagnostics.",
    favouriteAIFeature: "AI Conceptual Misconception Isolator",
    studentImpact:
      "Over 96% of Elena's direct mentees have scored A or A* in final Cambridge O Level Physics exams over the last four cohorts.",
  },
  {
    id: "teacher-2",
    name: "Marcus Aurelius Vance",
    subject: "Lead Mathematics & Mechanics Master",
    experience: "18 Years (Ex-Head of Mathematics at elite Academy)",
    philosophy: "Socratic dialoguing. Never give answers directly; teach the student how to construct them.",
    whyJoined:
      "EBM's platform takes care of standard drill grading, freeing up my time to engage in high-impact intellectual mentoring sessions with students.",
    favouriteAIFeature: "AI Homework Thread Summarizer & Tagging System",
    studentImpact:
      "Mentored three consecutive regional Mathematics Olympiad Gold Medalists and maintained a 100% curriculum completion rate.",
  },
  {
    id: "teacher-3",
    name: "Dr. Amara Okoro",
    subject: "English Literature & Critical Essay Lead",
    experience: "11 Years, Ph.D. in Comparative Education",
    philosophy: "Unlock voice and structural precision. Great writing is structured critical thought.",
    whyJoined:
      "Most digital platforms treat English like multiple-choice grammar. EBM evaluates comprehensive synthesis, structure, and depth.",
    favouriteAIFeature: "AI Semantic Stylistic Feedback engine",
    studentImpact:
      "Helped over 400 English as a Second Language students achieve Grade A* in English Literature and Composition.",
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "ach-1",
    title: "100-Day Study Streak",
    description: "Conducted focused learning sessions daily for 100 consecutive days.",
    iconName: "Flame",
    badgeType: "streak",
  },
  {
    id: "ach-2",
    title: "Top Math Performer",
    description: "Scored 95%+ in the rigorous Advanced O Level Algebra Diagnostic Exam.",
    iconName: "Binary",
    badgeType: "academic",
  },
  {
    id: "ach-3",
    title: "Creative Scribe Winner",
    description: "Published a top-rated academic essay in the EBM Community Journal.",
    iconName: "PenTool",
    badgeType: "creative",
  },
  {
    id: "ach-4",
    title: "Science Lab Master",
    description: "Completed all simulated chemistry lab reactions with perfect precision.",
    iconName: "Beaker",
    badgeType: "science",
  },
  {
    id: "ach-5",
    title: "AI Power Learner",
    description: "Initiated 50 Socratic AI inquiry sessions to decompose complex ideas.",
    iconName: "Cpu",
    badgeType: "ai",
  },
  {
    id: "ach-6",
    title: "Critical Thinker",
    description: "Passed 12 logic and argument-evaluation challenges.",
    iconName: "Lightbulb",
    badgeType: "critical",
  },
  {
    id: "ach-7",
    title: "Community Mentor",
    description: "Provided peer guidance and answered 30 questions in study forums.",
    iconName: "Users",
    badgeType: "community",
  },
  {
    id: "ach-8",
    title: "Perfect Attendance",
    description: "Attended every weekly teacher-led Socratic circle for 6 months.",
    iconName: "Calendar",
    badgeType: "attendance",
  },
];

export const OUTCOMES_DATA: Outcome[] = [
  {
    id: "out-1",
    title: "Critical Thinking",
    description: "Deconstructing complex arguments and analyzing structural assumptions.",
    percentage: 95,
    colorClass: "bg-blue-500",
  },
  {
    id: "out-2",
    title: "Self-Directed Learning",
    description: "Planning revision cycles, using AI for self-testing, and diagnosing errors.",
    percentage: 92,
    colorClass: "bg-indigo-500",
  },
  {
    id: "out-3",
    title: "Problem Solving",
    description: "Applying algebraic and physical models to solve non-linear questions.",
    percentage: 89,
    colorClass: "bg-sky-500",
  },
  {
    id: "out-4",
    title: "Digital & AI Literacy",
    description: "Using AI responsibly for guided learning, prompt design, and data analysis.",
    percentage: 96,
    colorClass: "bg-indigo-500",
  },
  {
    id: "out-5",
    title: "Precision Communication",
    description: "Drafting highly structured academic essays and logical proofs.",
    percentage: 88,
    colorClass: "bg-amber-500",
  },
  {
    id: "out-6",
    title: "Academic Resilience",
    description: "Persisting through difficult multi-part challenges without giving up.",
    percentage: 94,
    colorClass: "bg-rose-500",
  },
];

export const CAREER_SKILLS_DATA: CareerSkill[] = [
  {
    id: "skill-1",
    title: "Academic Excellence",
    description: "Rigorous alignment with Cambridge standards ensures exam dominance and robust foundational knowledge.",
    benefit: "Prepares students to effortlessly ace A Levels, IB, and university entrance exams.",
    iconName: "GraduationCap",
  },
  {
    id: "skill-2",
    title: "AI Literacy & Engineering",
    description: "Students learn to co-work with AI systems, mastering advanced search, prompt styling, and data modeling.",
    benefit: "Equips students for the digital economy, where AI co-pilots are standard workflows.",
    iconName: "Cpu",
  },
  {
    id: "skill-3",
    title: "Socratic Inquiry & Interviewing",
    description: "Bi-weekly verbal discussions build strong presentation, articulation, and quick-thinking under pressure.",
    benefit: "Secures advantages in university interviews, project defenses, and presentation skills.",
    iconName: "MessageSquare",
  },
  {
    id: "skill-4",
    title: "Analytical Portfolio Building",
    description: "Students gather their research essays, physics simulations, and chemistry logs into a public EBM portfolio.",
    benefit: "Creates a tangible asset to stand out in elite university applications and internships.",
    iconName: "FileSpreadsheet",
  },
];

export const COMMUNITY_IMPACT_DATA: CommunityMetric[] = [
  {
    id: "comm-1",
    title: "Reading Marathons Completed",
    value: "12,400+ books",
    description: "Classic literature and scientific papers studied in quarterly reading sprints.",
    iconName: "BookOpen",
  },
  {
    id: "comm-2",
    title: "Open-Source Math Plugins",
    value: "140+ submissions",
    description: "Interactive calculators and visual plots crafted by students for the collective forum.",
    iconName: "Github",
  },
  {
    id: "comm-3",
    title: "Academic Peer Tutoring Hours",
    value: "22,500 hours",
    description: "Students volunteering to answer forum doubts and tutor junior grade cohorts.",
    iconName: "HeartHandshake",
  },
  {
    id: "comm-4",
    title: "Community Innovation Projects",
    value: "85 projects",
    description: "Cross-disciplinary science and history solutions presented to experts.",
    iconName: "Lightbulb",
  },
];

export const AWARDS_DATA: Award[] = [
  {
    id: "award-1",
    title: "EdTech Innovation Excellence Winner",
    institution: "Global Education Consortium & Alliance",
    year: "2025",
    description: "Recognized for pioneering Socratic AI models that prevent academic laziness.",
  },
  {
    id: "award-2",
    title: "Strategic Cambridge Curriculum Endorsement",
    institution: "International STEM Standards Federation",
    year: "2024",
    description: "Validated for complete academic alignment and structural instructional rigor.",
  },
  {
    id: "award-3",
    title: "Outstanding Impact on Digital Equity",
    institution: "UNESCO Education Network Forum",
    year: "2025",
    description: "Awarded for providing premium diagnostics and scholarship learning circles globally.",
  },
  {
    id: "award-4",
    title: "Best-in-Class Student Engagement Portal",
    institution: "Aesthetic Design & UX Association",
    year: "2025",
    description: "Celebrated for clean layouts, beautiful negative space, and focus-promoting aesthetics.",
  },
];
