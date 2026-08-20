import { JOURNEY_STAGES } from "./journey.constants";
import { JourneyStageData, JourneySkill, JourneyStatistic, JourneySubject } from "./journey.types";

/**
 * Service Layer for Journey Module (Pre-configured for future API / Database binding)
 */
export class JourneyApiService {
  /**
   * Fetch all stages in the 3-Year Journey
   */
  static async getStages(): Promise<JourneyStageData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(JOURNEY_STAGES), 150);
    });
  }

  /**
   * Fetch a single stage by ID
   */
  static async getStageById(id: string): Promise<JourneyStageData | null> {
    return new Promise((resolve) => {
      const stage = JOURNEY_STAGES.find((s) => s.id === id) || null;
      setTimeout(() => resolve(stage), 100);
    });
  }

  /**
   * Fetch skills for a specific stage
   */
  static async getSkillsByStageId(stageId: string): Promise<JourneySkill[]> {
    return new Promise((resolve) => {
      const stage = JOURNEY_STAGES.find((s) => s.id === stageId);
      setTimeout(() => resolve(stage ? stage.skills : []), 100);
    });
  }

  /**
   * Fetch statistics/metrics
   */
  static async getStatisticsByStageId(stageId: string): Promise<JourneyStatistic[]> {
    return new Promise((resolve) => {
      const stage = JOURNEY_STAGES.find((s) => s.id === stageId);
      setTimeout(() => resolve(stage ? stage.statistics : []), 100);
    });
  }

  /**
   * Fetch subjects
   */
  static async getSubjectsByStageId(stageId: string): Promise<JourneySubject[]> {
    return new Promise((resolve) => {
      const stage = JOURNEY_STAGES.find((s) => s.id === stageId);
      setTimeout(() => resolve(stage ? stage.subjects : []), 100);
    });
  }
}
