import { 
  Trophy, 
  Target, 
  Zap, 
  Flame, 
  Star, 
  LayoutDashboard, 
  User, 
  Award, 
  Compass, 
  ListTodo, 
  BarChart3, 
  Briefcase, 
  Gift, 
  History, 
  Settings,
  Brain,
  MessageSquare,
  Users,
  Lightbulb,
  ShieldCheck,
  Globe
} from "lucide-react";
import { GrowthView } from "./growth.types";

export const GROWTH_MENU_ITEMS = [
  { id: GrowthView.DASHBOARD, label: "Growth Hub", icon: LayoutDashboard },
  { id: GrowthView.PROFILE, label: "My Profile", icon: User },
  { id: GrowthView.LEVELS, label: "Level Progress", icon: Compass },
  { id: GrowthView.XP, label: "XP Tracker", icon: Zap },
  { id: GrowthView.BADGES, label: "Badge Gallery", icon: Award },
  { id: GrowthView.ACHIEVEMENTS, label: "Achievements", icon: Trophy },
  { id: GrowthView.MISSIONS, label: "Daily Missions", icon: Target },
  { id: GrowthView.CHALLENGES, label: "Challenges", icon: Star },
  { id: GrowthView.HABITS, label: "Habit Tracker", icon: ListTodo },
  { id: GrowthView.STREAKS, label: "Streaks", icon: Flame },
  { id: GrowthView.LEADERBOARD, label: "Leaderboards", icon: Users },
  { id: GrowthView.COMPETENCIES, label: "Competencies", icon: BarChart3 },
  { id: GrowthView.PORTFOLIO, label: "Digital Portfolio", icon: Briefcase },
  { id: GrowthView.REWARDS, label: "Rewards Store", icon: Gift },
  { id: GrowthView.HISTORY, label: "Growth History", icon: History },
  { id: GrowthView.SETTINGS, label: "Preferences", icon: Settings },
];

export const EBM_COMPETENCIES = [
  "Critical Thinking",
  "Creativity",
  "Collaboration",
  "Communication",
  "Emotional Intelligence",
  "AI Literacy",
  "Ethics",
  "Leadership"
];

export const LEVEL_NAMES = [
  "Explorer",
  "Learner",
  "Achiever",
  "Innovator",
  "Leader",
  "Mentor",
  "Visionary",
  "EBM Master"
];
