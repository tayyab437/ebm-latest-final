import { HERO_STATS_DATA, TRUST_INDICATORS, FLOATING_BADGES_DATA, MOCK_DASHBOARD_PREVIEW } from "./hero.constants";
import { HeroStatisticItem, HeroBadge, TrustIndicator, DashboardPreviewState } from "./hero.types";

/**
 * Service Layer for Hero Module (Pre-configured for future API integration)
 */
export class HeroApiService {
  /**
   * Mock fetching hero stats
   */
  static async getStatistics(): Promise<HeroStatisticItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(HERO_STATS_DATA), 200);
    });
  }

  /**
   * Mock fetching trust indicators
   */
  static async getTrustIndicators(): Promise<TrustIndicator[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(TRUST_INDICATORS), 200);
    });
  }

  /**
   * Mock fetching floating badges
   */
  static async getBadges(): Promise<HeroBadge[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(FLOATING_BADGES_DATA), 200);
    });
  }

  /**
   * Mock fetching dashboard preview
   */
  static async getDashboardPreview(): Promise<DashboardPreviewState> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DASHBOARD_PREVIEW), 200);
    });
  }
}
