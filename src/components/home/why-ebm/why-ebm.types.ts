/**
 * TypeScript Interfaces for EBM Why Choose Us Section
 * Fully typed and designed for future API / DB bindings.
 */

export type FeatureCategory = "AI" | "Methodology" | "Management" | "Growth" | "Resources";

export interface FeatureBadgeData {
  id: string;
  text: string;
  variant: "success" | "warning" | "info" | "primary";
}

export interface FeatureCardData {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  iconName: string;
  category: FeatureCategory;
  badge?: FeatureBadgeData;
  learnMorePath?: string;
}

export interface LearningPrincipleData {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface ComparisonItemData {
  id: string;
  featureName: string;
  traditionalValue: string;
  ebmValue: string;
  isEbmAdvantage: boolean;
}

export interface StatisticItemData {
  id: string;
  label: string;
  value: string;
  suffix: string;
  description: string;
  iconName: string;
}
