import { SubjectData, TopicGroup, LearningResource, SkillLevel, SubjectStatistic, AITool } from "./curriculum.types";
import { CURRICULUM_SUBJECTS } from "./curriculum.constants";

/**
 * Service Layer for Curriculum & Subjects Explorer Module.
 * Pre-configured for future API/DB integration.
 */
export class CurriculumApiService {
  /**
   * Fetch all subjects list
   */
  static async getSubjects(): Promise<SubjectData[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(CURRICULUM_SUBJECTS), 150);
    });
  }

  /**
   * Fetch a single subject details by ID
   */
  static async getSubjectById(id: string): Promise<SubjectData | null> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found || null), 120);
    });
  }

  /**
   * Fetch topics for a specific subject ID
   */
  static async getSubjectTopics(id: string): Promise<TopicGroup[]> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found ? found.topicGroups : []), 100);
    });
  }

  /**
   * Fetch learning resources for a specific subject ID
   */
  static async getSubjectResources(id: string): Promise<LearningResource[]> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found ? found.resources : []), 100);
    });
  }

  /**
   * Fetch skills developed for a specific subject ID
   */
  static async getSubjectSkills(id: string): Promise<SkillLevel[]> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found ? found.overview.skillsDeveloped : []), 100);
    });
  }

  /**
   * Fetch statistics for a specific subject ID
   */
  static async getSubjectStatistics(id: string): Promise<SubjectStatistic[]> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found ? found.statistics : []), 100);
    });
  }

  /**
   * Fetch AI tools for a specific subject ID
   */
  static async getSubjectAITools(id: string): Promise<AITool[]> {
    return new Promise((resolve) => {
      const found = CURRICULUM_SUBJECTS.find((sub) => sub.id === id);
      setTimeout(() => resolve(found ? found.aiTools : []), 100);
    });
  }
}
