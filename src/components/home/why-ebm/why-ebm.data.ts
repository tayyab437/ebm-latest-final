import { FEATURE_CARDS, COMPARISON_ITEMS, LEARNING_PILLARS, HOMEPAGE_STATS } from "./why-ebm.constants";
import { FeatureCardData, ComparisonItemData, LearningPrincipleData, StatisticItemData } from "./why-ebm.types";

/**
 * Service Layer for Why Choose EBM Module (Pre-configured for future API/DB integration)
 */
export class WhyEBMApiService {
  /**
   * Fetch EBM feature cards
   */
  static async getFeatures(): Promise<FeatureCardData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FEATURE_CARDS), 150);
    });
  }

  /**
   * Fetch EBM learning principles / pillars
   */
  static async getPrinciples(): Promise<LearningPrincipleData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(LEARNING_PILLARS), 100);
    });
  }

  /**
   * Fetch comparison items (Traditional vs EBM)
   */
  static async getComparisonTable(): Promise<ComparisonItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(COMPARISON_ITEMS), 120);
    });
  }

  /**
   * Fetch statistics/success metrics
   */
  static async getStatistics(): Promise<StatisticItemData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(HOMEPAGE_STATS), 100);
    });
  }
}
