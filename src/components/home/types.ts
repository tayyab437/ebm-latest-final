/**
 * Reusable data models for EBM Digital Learning Ecosystem Homepage
 * Designed for future API and MySQL database integrations.
 */

export interface Announcement {
  id: string;
  text: string;
  ctaText: string;
  ctaUrl: string;
  isActive: boolean;
}

export interface HeroStat {
  id: string;
  label: string;
  value: string;
  count: number;
  suffix: string;
  iconName: string;
}

export interface JourneyStage {
  id: string;
  year: number;
  title: string;
  grades: string;
  description: string;
  subjects: string[];
  outcomes: string[];
  iconName: string;
}

export interface WhyChooseEbmCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface SubjectItem {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  level: "Foundation" | "Intermediate" | "Advanced";
  iconName: string;
  colorClass: string;
}

export interface AiFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: "Student" | "Parent" | "Educator";
  text: string;
  rating: number;
  yearAchieved?: string;
  avatarUrl?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  priceMonthly: number;
  description: string;
  features: string[];
  isHighlighted: boolean;
  ctaText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
