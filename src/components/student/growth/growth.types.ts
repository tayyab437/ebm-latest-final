import { LucideIcon } from "lucide-react";

export enum GrowthView {
  DASHBOARD = "DASHBOARD",
  PROFILE = "PROFILE",
  LEVELS = "LEVELS",
  XP = "XP",
  BADGES = "BADGES",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  MISSIONS = "MISSIONS",
  CHALLENGES = "CHALLENGES",
  HABITS = "HABITS",
  STREAKS = "STREAKS",
  LEADERBOARD = "LEADERBOARD",
  COMPETENCIES = "COMPETENCIES",
  PORTFOLIO = "PORTFOLIO",
  REWARDS = "REWARDS",
  HISTORY = "HISTORY",
  SETTINGS = "SETTINGS"
}

export interface GrowthProfile {
  id: string;
  userId: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  growthScore: number;
  tokens: number;
  rank?: string;
  title?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: "ACADEMIC" | "CRITICAL_THINKING" | "CREATIVITY" | "LEADERSHIP" | "HABIT" | "AI_LITERACY" | "COMMUNITY";
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
  iconUrl?: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  criteria: string;
  xpReward: number;
  unlockedAt?: string;
  progress?: number; // 0-100
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: "DAILY" | "WEEKLY" | "MONTHLY" | "TEACHER" | "AI";
  xpReward: number;
  tokenReward?: number;
  status: "AVAILABLE" | "IN_PROGRESS" | "COMPLETED" | "CLAIMED";
  deadline?: string;
}

export interface Habit {
  id: string;
  name: string;
  category: string;
  currentStreak: number;
  longestStreak: number;
  lastLoggedAt: string | null;
  targetFrequency: "DAILY" | "WEEKLY";
  icon: string;
}

export interface CompetencyData {
  subject: string; // e.g. "Critical Thinking"
  value: number; // 0-100
  fullMark: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  type: "PROJECT" | "ASSIGNMENT" | "CERTIFICATE" | "REFLECTIONS";
  url?: string;
  date: string;
  tags: string[];
}

export interface GrowthEvent {
  id: string;
  type: string;
  description: string;
  xpEarned: number;
  timestamp: string;
}
