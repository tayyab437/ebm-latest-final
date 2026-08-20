import { 
  AI_FEATURES_DATA, 
  QUICK_PROMPTS_DATA, 
  WORKFLOW_STEPS_DATA, 
  STUDENT_PROFILES_DATA, 
  MOCK_RESOURCES_DATA, 
  SECURITY_ITEMS_DATA,
  MOCK_STUDY_DASHBOARD
} from "./ai-learning.constants";
import { 
  AIFeature, 
  QuickPrompt, 
  AIWorkflowStep, 
  StudentProfile, 
  AIResource, 
  SecurityItem,
  StudyDashboard,
  IAILearningService
} from "./ai-learning.types";

export class AILearningService implements IAILearningService {
  /**
   * Fetch all premium AI features (simulating GET /ai/features)
   */
  async getFeatures(): Promise<AIFeature[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(AI_FEATURES_DATA), 50);
    });
  }

  /**
   * Fetch all interactive prompt chips (simulating GET /ai/prompts)
   */
  async getPrompts(): Promise<QuickPrompt[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(QUICK_PROMPTS_DATA), 50);
    });
  }

  /**
   * Fetch all downloadable mock resources (simulating GET /ai/resources)
   */
  async getResources(): Promise<AIResource[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_RESOURCES_DATA), 50);
    });
  }

  /**
   * Fetch horizontal workflow steps (simulating GET /ai/workflow)
   */
  async getWorkflow(): Promise<AIWorkflowStep[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(WORKFLOW_STEPS_DATA), 50);
    });
  }

  /**
   * Fetch customized academic recommendations (simulating GET /ai/recommendations)
   */
  async getRecommendations(studentId: string): Promise<any[]> {
    return new Promise((resolve) => {
      const recommendations = [
        {
          id: "rec-1",
          studentId,
          targetArea: "Mathematics",
          recommendationText: "Consolidate factoring polynomials before moving to high-density calculus.",
          priority: "high",
          suggestedResourceIds: ["res-1"]
        },
        {
          id: "rec-2",
          studentId,
          targetArea: "Chemistry",
          recommendationText: "Review electro-static forces. Flashcard sessions are recommended.",
          priority: "medium",
          suggestedResourceIds: ["res-2"]
        }
      ];
      setTimeout(() => resolve(recommendations), 50);
    });
  }

  /**
   * Fetch mock interactive student profiles
   */
  async getStudentProfiles(): Promise<StudentProfile[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(STUDENT_PROFILES_DATA), 50);
    });
  }

  /**
   * Fetch today's study goal and metrics dashboard
   */
  async getStudyDashboard(): Promise<StudyDashboard> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_STUDY_DASHBOARD), 50);
    });
  }

  /**
   * Fetch safety and security details
   */
  async getSecurityItems(): Promise<SecurityItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(SECURITY_ITEMS_DATA), 50);
    });
  }
}

export const aiLearningService = new AILearningService();
