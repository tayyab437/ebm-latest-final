import { EbmYear, CourseModule, UserRole } from "./types";

export const APP_NAME = "EBM Digital Learning Ecosystem";

export const EBM_ROADMAP_DETAILS = {
  [EbmYear.YEAR_1]: {
    title: "Year 1: Foundation Accelerated",
    targetGrades: "Grades 5, 6, 7 Essentials",
    focus: "Building reading speeds, robust mathematics foundation, English linguistics, and general science analysis.",
    subjects: ["Accelerated Mathematics", "English Communication & Comprehension", "General Science Essentials", "Social Studies Core"],
  },
  [EbmYear.YEAR_2]: {
    title: "Year 2: Pre-O Level Mastery",
    targetGrades: "Grades 8 & 9 Rigor",
    focus: "Deep analytical dive into Sciences, advanced algebraic formulas, Pakistan Studies, Islamiyat, and essay drafting.",
    subjects: ["Algebra & Trigonometry", "Fundamental Physics", "Fundamental Chemistry", "Fundamental Biology", "Pakistan Studies", "Islamiyat Core"],
  },
  [EbmYear.YEAR_3]: {
    title: "Year 3: CIE O Level Mastery",
    targetGrades: "O-Level Exams / Matric Equivalent",
    focus: "Intense O-Level exam pattern preparation, 10-year past papers mastery, Mock Exams, and final evaluation.",
    subjects: ["CIE Syllabus Math (4024)", "CIE Syllabus Physics (5054)", "CIE Syllabus Chemistry (5070)", "CIE Syllabus Biology (5090)", "CIE Past Paper Rigor"],
  },
};

// Seed Course Modules for each EBM Year
export const INITIAL_COURSES: CourseModule[] = [
  // Year 1 Modules
  {
    id: "y1m1",
    title: "Accelerated Arithmetic & Logic",
    description: "Master multi-digit operations, decimal precision, fraction manipulation, and mathematical logical patterns.",
    subject: "Accelerated Mathematics",
    year: EbmYear.YEAR_1,
    weekNumber: 1,
    durationDays: 7,
    progress: 100,
    lessons: [
      { id: "y1m1l1", title: "Conceptual Fractions & Visual Ratios", description: "Understand visual representing of fractional quantities.", durationMinutes: 25, completed: true },
      { id: "y1m1l2", title: "Mental Math & Speed Calculation Techniques", description: "Tricks to calculate decimals and percentages mentally.", durationMinutes: 30, completed: true }
    ],
    quizzes: [{ id: "y1m1q1", title: "Arithmetic Foundations Evaluation", questionsCount: 10, score: 90, completed: true }]
  },
  {
    id: "y1m2",
    title: "Linguistic Precision & Speed Reading",
    description: "Double your reading comprehension and speed while building a highly enriched academic vocabulary.",
    subject: "English Communication & Comprehension",
    year: EbmYear.YEAR_1,
    weekNumber: 2,
    durationDays: 7,
    progress: 40,
    lessons: [
      { id: "y1m2l1", title: "Advanced Contextual Clues in Text", description: "Determine vocabulary meanings based on reading context.", durationMinutes: 35, completed: true },
      { id: "y1m2l2", title: "Speed Reading Drills & Eye Movements", description: "Techniques to scale reading from 150 to 300+ words per minute.", durationMinutes: 20, completed: false }
    ],
    quizzes: [{ id: "y1m2q1", title: "Comprehension & Scanning Quiz", questionsCount: 5, completed: false }]
  },
  {
    id: "y1m3",
    title: "Scientific Method & Core Matter",
    description: "Understand variables, experimental structures, states of matter, and basic chemical structures.",
    subject: "General Science Essentials",
    year: EbmYear.YEAR_1,
    weekNumber: 3,
    durationDays: 7,
    progress: 0,
    lessons: [
      { id: "y1m3l1", title: "Formulating Hypothesis & Variables", description: "Differentiate between dependent and independent scientific variables.", durationMinutes: 40, completed: false },
      { id: "y1m3l2", title: "Atomic Basics & The Periodic Table Intro", description: "Understand neutrons, protons, electrons, and simple symbols.", durationMinutes: 45, completed: false }
    ],
    quizzes: [{ id: "y1m3q1", title: "General Science Quiz 1", questionsCount: 10, completed: false }]
  },

  // Year 2 Modules
  {
    id: "y2m1",
    title: "Algebraic Systems & Complex Equations",
    description: "Learn quadratic equations, simultaneous equations, graph representations, and coordinate geometry.",
    subject: "Algebra & Trigonometry",
    year: EbmYear.YEAR_2,
    weekNumber: 1,
    durationDays: 7,
    progress: 80,
    lessons: [
      { id: "y2m1l1", title: "Solving Quadratic Formulations", description: "Master factoring, complete the square, and using the quadratic formula.", durationMinutes: 45, completed: true },
      { id: "y2m1l2", title: "Simultaneous Equations & Intersections", description: "Solve algebraic systems using substitution and graphical intersections.", durationMinutes: 50, completed: false }
    ],
    quizzes: [{ id: "y2m1q1", title: "Algebraic Reasoning Quiz", questionsCount: 12, score: 83, completed: true }]
  },
  {
    id: "y2m2",
    title: "Kinematics & Force Mechanics",
    description: "Study motion parameters, vectors, Newton's Laws of Motion, and force resolutions.",
    subject: "Fundamental Physics",
    year: EbmYear.YEAR_2,
    weekNumber: 2,
    durationDays: 7,
    progress: 10,
    lessons: [
      { id: "y2m2l1", title: "Scalar and Vector Quantities", description: "Understand distance, displacement, speed, velocity, and vector resolution.", durationMinutes: 55, completed: true },
      { id: "y2m2l2", title: "Newtonian Dynamics & Forces", description: "Analyze the three Laws of Motion and frictional coefficients.", durationMinutes: 60, completed: false }
    ],
    quizzes: [{ id: "y2m2q1", title: "Kinematics Master Test", questionsCount: 15, completed: false }]
  },

  // Year 3 Modules
  {
    id: "y3m1",
    title: "Advanced Calculus & Coordinate Trigonometry",
    description: "Master differentiation, integration basics, trigonometric identities, and CIE 4024 exam setups.",
    subject: "CIE Syllabus Math (4024)",
    year: EbmYear.YEAR_3,
    weekNumber: 1,
    durationDays: 7,
    progress: 60,
    lessons: [
      { id: "y3m1l1", title: "First Principles of Differentiation", description: "Find tangents and rates of change mathematically.", durationMinutes: 60, completed: true },
      { id: "y3m1l2", title: "CIE Trigonometric Application Drills", description: "Practice high-yield Sine/Cosine rule problems from past exams.", durationMinutes: 70, completed: false }
    ],
    quizzes: [{ id: "y3m1q1", title: "Calculus Concept Quiz", questionsCount: 10, score: 95, completed: true }]
  },
  {
    id: "y3m2",
    title: "Electromagnetism & Nuclear Physics CIE",
    description: "CIE Physics 5054 exam prep covering magnetic fields, electromagnetic induction, radioactivity, and half-life calculations.",
    subject: "CIE Syllabus Physics (5054)",
    year: EbmYear.YEAR_3,
    weekNumber: 2,
    durationDays: 7,
    progress: 0,
    lessons: [
      { id: "y3m2l1", title: "Electromagnetic Induction & Lenz's Law", description: "Analyze induced current directions and generator structures.", durationMinutes: 75, completed: false },
      { id: "y3m2l2", title: "Alpha, Beta, Gamma Decay and Radioactivity", description: "Learn balancing nuclear equations and plotting decay curves.", durationMinutes: 80, completed: false }
    ],
    quizzes: [{ id: "y3m2q1", title: "CIE Nuclear Physics Test", questionsCount: 20, completed: false }]
  }
];

export const MOCK_STUDENTS_PROGRESS = {
  "student-y1": {
    studentId: "student-y1",
    currentYear: EbmYear.YEAR_1,
    overallProgress: 68,
    completedModulesCount: 4,
    totalModulesCount: 6,
    attendanceStreak: 12,
    dailyStreak: 8,
    totalStudyMinutes: 2450,
    weeklyProgress: [
      { day: "Mon", minutes: 45 },
      { day: "Tue", minutes: 60 },
      { day: "Wed", minutes: 50 },
      { day: "Thu", minutes: 80 },
      { day: "Fri", minutes: 90 },
      { day: "Sat", minutes: 120 },
      { day: "Sun", minutes: 30 }
    ]
  },
  "student-y2": {
    studentId: "student-y2",
    currentYear: EbmYear.YEAR_2,
    overallProgress: 45,
    completedModulesCount: 3,
    totalModulesCount: 8,
    attendanceStreak: 18,
    dailyStreak: 15,
    totalStudyMinutes: 3890,
    weeklyProgress: [
      { day: "Mon", minutes: 90 },
      { day: "Tue", minutes: 75 },
      { day: "Wed", minutes: 110 },
      { day: "Thu", minutes: 60 },
      { day: "Fri", minutes: 95 },
      { day: "Sat", minutes: 140 },
      { day: "Sun", minutes: 45 }
    ]
  },
  "student-y3": {
    studentId: "student-y3",
    currentYear: EbmYear.YEAR_3,
    overallProgress: 82,
    completedModulesCount: 9,
    totalModulesCount: 11,
    attendanceStreak: 25,
    dailyStreak: 22,
    totalStudyMinutes: 6200,
    weeklyProgress: [
      { day: "Mon", minutes: 120 },
      { day: "Tue", minutes: 130 },
      { day: "Wed", minutes: 90 },
      { day: "Thu", minutes: 150 },
      { day: "Fri", minutes: 140 },
      { day: "Sat", minutes: 180 },
      { day: "Sun", minutes: 60 }
    ]
  }
};

export const MOCK_DAILY_TASKS = [
  { id: "task1", title: "Study: Speed Reading Drills", description: "Perform Lesson 2 of Speed reading. Target WPM is 250.", subject: "English Communication", type: "LESSON", status: "PENDING", estimatedMinutes: 20, date: "2026-06-29" },
  { id: "task2", title: "Practice: Conceptual Fractions Homework", description: "Solve Chapter 3 fractions exercises on page 42.", subject: "Accelerated Mathematics", type: "PRACTICE", status: "PENDING", estimatedMinutes: 30, date: "2026-06-29" },
  { id: "task3", title: "Revision: Atomic Models Flashcards", description: "Review neutrons and protons structures for chemistry revision.", subject: "General Science Essentials", type: "REVISION", status: "COMPLETED", estimatedMinutes: 15, date: "2026-06-29" },
  { id: "task4", title: "Quiz: Arithmetic Concept Check", description: "Complete the fractions assessment quiz on the dashboard.", subject: "Accelerated Mathematics", type: "QUIZ", status: "PENDING", estimatedMinutes: 15, date: "2026-06-29" }
];
