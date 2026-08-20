import { NavigationItem, DashboardWidget, LibraryResource, ChartData, Certificate, CommunityCard, AssessmentSummary } from "./dashboard.types";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "student",
    title: "Student Dashboard",
    description: "Personalized lesson track, XP meters, interactive calendar and streak tracker.",
    iconName: "User",
    badge: "Core"
  },
  {
    id: "parent",
    title: "Parent Dashboard",
    description: "Continuous feedback telemetry, progress metrics, and direct parent-mentor loops.",
    iconName: "HeartHandshake",
    badge: "Unique"
  },
  {
    id: "teacher",
    title: "Teacher Dashboard",
    description: "AI grading copilots, classroom analytics, and assignment management.",
    iconName: "GraduationCap"
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "Comprehensive registry, operational analytics, health gauges, and support queue.",
    iconName: "ShieldAlert"
  },
  {
    id: "ai-tutor",
    title: "Socratic AI Tutor",
    description: "Dialogue history, prompt worksheets, micro quizzes, and socratic tips.",
    iconName: "BrainCircuit",
    badge: "Active"
  },
  {
    id: "assessments",
    title: "Assessment Centre",
    description: "Scheduled Cambridge mock papers, interactive quizzes, and progress matrices.",
    iconName: "FileSpreadsheet"
  },
  {
    id: "library",
    title: "Digital Library",
    description: "Curated textbook guides, high-density lecture videos, worksheets, and syllabus PDFs.",
    iconName: "BookOpen"
  },
  {
    id: "analytics",
    title: "Progress Analytics",
    description: "Granular weekly cognitive focus logs, time-capsule reports, and skill growth charts.",
    iconName: "LineChart"
  },
  {
    id: "certificates",
    title: "Certificates & Badges",
    description: "Verified academic credentials and gamified milestone achievements.",
    iconName: "Award"
  },
  {
    id: "community",
    title: "Socratic Community",
    description: "Discussion boards, research circles, and peer-to-peer homework help.",
    iconName: "Users"
  }
];

export const STUDENT_WIDGETS: DashboardWidget[] = [
  {
    id: "std-1",
    title: "Current Level",
    value: "Level 14",
    subtitle: "3,400 XP to next Milestone",
    type: "metric",
    iconName: "Award",
    badge: "Gold League"
  },
  {
    id: "std-2",
    title: "Today's Lessons",
    value: "2 Tasks Left",
    subtitle: "Quadratic Systems & Organic Cells",
    type: "list",
    iconName: "BookOpen"
  },
  {
    id: "std-3",
    title: "Next Assessment",
    value: "Physics Quiz",
    subtitle: "In 2 hours &bull; Dynamic Motion",
    type: "alert",
    iconName: "Clock"
  }
];

export const PARENT_WIDGETS: DashboardWidget[] = [
  {
    id: "pr-1",
    title: "Study Streak",
    value: "12 Days",
    subtitle: "Active daily Socratic sessions",
    type: "metric",
    iconName: "Flame"
  },
  {
    id: "pr-2",
    title: "Focus Coefficient",
    value: "94%",
    subtitle: "Excellent attention in Math",
    type: "chart",
    iconName: "Target"
  },
  {
    id: "pr-3",
    title: "Mentor Feedback",
    value: "1 Unread",
    subtitle: "EBM Method adaptation report",
    type: "alert",
    iconName: "Mail"
  }
];

export const TEACHER_WIDGETS: DashboardWidget[] = [
  {
    id: "tc-1",
    title: "Pending Reviews",
    value: "8 Submissions",
    subtitle: "Argumentative English essays",
    type: "metric",
    iconName: "PenTool"
  },
  {
    id: "tc-2",
    title: "Average Class Score",
    value: "88.4%",
    subtitle: "Algebraic Factoring Masterclass",
    type: "chart",
    iconName: "TrendingUp"
  },
  {
    id: "tc-3",
    title: "Assistant Tasks",
    value: "4 Drafted",
    subtitle: "AI generated mock worksheets",
    type: "list",
    iconName: "Sparkles"
  }
];

export const ADMIN_WIDGETS: DashboardWidget[] = [
  {
    id: "ad-1",
    title: "System Status",
    value: "Healthy",
    subtitle: "Uptime 99.98% &bull; All services green",
    type: "alert",
    iconName: "Activity"
  },
  {
    id: "ad-2",
    title: "Active Students",
    value: "1,420 Live",
    subtitle: "Active sessions in past 30 min",
    type: "metric",
    iconName: "Users"
  },
  {
    id: "ad-3",
    title: "Revenue (MRR)",
    value: "$42.5K",
    subtitle: "+12% growth this month",
    type: "chart",
    iconName: "DollarSign"
  }
];

export const LIBRARY_DATA: LibraryResource[] = [
  { id: "lib-1", title: "CIE Syllabus Pure Math 1 Notes", format: "PDF", subject: "Accelerated Mathematics", sizeOrDuration: "4.2 MB" },
  { id: "lib-2", title: "Organic Chemistry: Esterification", format: "Video", subject: "Fundamental Chemistry", sizeOrDuration: "14:20 min" },
  { id: "lib-3", title: "Argumentative Essay Writing Guide", format: "PDF", subject: "O-Level English Comprehension", sizeOrDuration: "2.8 MB" },
  { id: "lib-4", title: "Cell Organelles Interactive Drill", format: "Interactive", subject: "Fundamental Biology", sizeOrDuration: "10 Interactive Steps" }
];

export const ANALYTICS_DATA: ChartData[] = [
  { label: "Mon", value: 45, secondaryValue: 80 },
  { label: "Tue", value: 60, secondaryValue: 85 },
  { label: "Wed", value: 90, secondaryValue: 94 },
  { label: "Thu", value: 75, secondaryValue: 90 },
  { label: "Fri", value: 85, secondaryValue: 92 },
  { label: "Sat", value: 50, secondaryValue: 85 },
  { label: "Sun", value: 30, secondaryValue: 70 }
];

export const CERTIFICATE_DATA: Certificate[] = [
  { id: "cert-1", title: "Quadratic Systems Mastery", subject: "Accelerated Mathematics", issueDate: "June 14, 2026", credentialId: "EBM-MATH-9982" },
  { id: "cert-2", title: "Active Recall Cell Biology", subject: "Fundamental Biology", issueDate: "May 28, 2026", credentialId: "EBM-BIOL-4103" },
  { id: "cert-3", title: "Advanced Argumentative Essayist", subject: "O-Level English Language", issueDate: "April 10, 2026", credentialId: "EBM-ENGL-8192" }
];

export const COMMUNITY_DATA: CommunityCard[] = [
  { id: "post-1", author: "Areeba Shah", role: "Student", content: "Who else is taking the CIE Mock Algebra exam tomorrow? Need some socratic pointers on complex polynomials!", likes: 14, comments: 8, timeAgo: "2 hours ago" },
  { id: "post-2", author: "Mr. Ejaz Bukhari", role: "Mentor", content: "Remember: Do not memorize the organic chemistry reactions! Seek to understand the electron transport flow. I have uploaded a 5-step visual diagram to the Library.", likes: 42, comments: 12, timeAgo: "5 hours ago" },
  { id: "post-3", author: "Bilal Malik", role: "Parent", content: "EBM's live Parent Dashboard feedback has been phenomenal. I can see my daughter's study coefficient curves clearly. Kudos to the development team!", likes: 19, comments: 3, timeAgo: "1 day ago" }
];

export const ASSESSMENTS_DATA: AssessmentSummary[] = [
  { id: "as-1", title: "Quadratic Trinomial Equations Quiz", subject: "Accelerated Mathematics", dueDate: "Today", status: "pending" },
  { id: "as-2", title: "Covalent & Ionic Bonding Mock", subject: "Fundamental Chemistry", dueDate: "In 2 days", status: "pending" },
  { id: "as-3", title: "Socratic Comprehension Exam", subject: "O-Level English Language", dueDate: "Yesterday", status: "graded", score: "92/100" }
];
