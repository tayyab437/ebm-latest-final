import { MOCK_SUBJECTS, MOCK_UNITS, MOCK_LESSONS, MOCK_PROGRESS } from "./learning.data";
import { Subject, Unit, Lesson, LearningProgress } from "./learning.types";

// In production, these will hit the NestJS backend
export const learningService = {
  getSubjects: async (): Promise<Subject[]> => {
    // For now, still return mock subjects as we don't have a specific API for it, 
    // but the lessons should be real
    return MOCK_SUBJECTS;
  },
  
  getSubjectDetails: async (subjectId: string): Promise<Subject | undefined> => {
    return MOCK_SUBJECTS.find(s => s.id === subjectId);
  },

  getUnits: async (subjectId: string): Promise<Unit[]> => {
    // In this app, curriculum items act as units/lessons
    // We fetch curriculum items for the subject
    try {
      const res = await fetch(`/api/curriculum?subject=${subjectId}`);
      const data = await res.json();
      if (data.success && data.curriculum) {
        // Group by unitTitle if exists, otherwise treat as one unit
        const units: Unit[] = [];
        const unitsSet = new Set<string>();
        
        data.curriculum.forEach((item: any) => {
          const unitTitle = item.unitTitle || "General Lessons";
          if (!unitsSet.has(unitTitle)) {
            unitsSet.add(unitTitle);
            units.push({
              id: `unit_${unitTitle.replace(/\s+/g, '_')}`,
              subjectId: subjectId,
              title: unitTitle,
              description: `Lessons for ${unitTitle}`,
              orderIndex: units.length + 1,
              totalLessons: data.curriculum.filter((i: any) => (i.unitTitle || "General Lessons") === unitTitle).length
            });
          }
        });
        return units;
      }
    } catch (e) {
      console.error("Failed to fetch units:", e);
    }
    return MOCK_UNITS[subjectId] || [];
  },

  getLessons: async (unitId: string): Promise<Lesson[]> => {
    // If unitId is derived from unitTitle, we need to fetch all and filter
    try {
      const res = await fetch(`/api/curriculum`);
      const data = await res.json();
      if (data.success && data.curriculum) {
        const filtered = data.curriculum.filter((item: any) => {
          const itemUnitId = `unit_${(item.unitTitle || "General Lessons").replace(/\s+/g, '_')}`;
          return itemUnitId === unitId;
        });
        
        return filtered.map((item: any, index: number) => ({
          id: item.id,
          unitId: unitId,
          title: item.title,
          description: item.skillFocus || "",
          type: item.type === "COMPREHENSION" ? "TEXT" : "INTERACTIVE",
          durationMinutes: item.duration || 20,
          orderIndex: index + 1,
          content: item.content,
          isCompleted: false, // This would need a separate join
          isDiagnostic: item.isDiagnostic,
          price: item.price,
          whatsappNumber: item.whatsappNumber,
          thumbnailUrl: item.thumbnailUrl
        }));
      }
    } catch (e) {
      console.error("Failed to fetch lessons:", e);
    }
    return MOCK_LESSONS[unitId] || [];
  },

  getProgress: async (subjectId: string): Promise<LearningProgress | null> => {
    return MOCK_PROGRESS[subjectId] || null;
  }
};
