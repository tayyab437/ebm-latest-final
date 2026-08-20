import React, { useState, useEffect } from "react";
import { useDashboardStore } from "./dashboard.store";
import { SubjectCard } from "./SubjectCard";

interface SubjectGridProps {
  limit?: number;
}

export function SubjectGrid({ limit }: SubjectGridProps) {
  const { data, setView } = useDashboardStore();
  const [classes, setClasses] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [classCurriculums, setClassCurriculums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const token = localStorage.getItem("ebm_token") || "";
        const headers = {
          "Authorization": token ? `Bearer ${token}` : "",
          "Content-Type": "application/json"
        };
        
        // 1. Fetch Classes
        const classesRes = await fetch("/api/student/classes", { headers });
        const classesData = await classesRes.json();
        let fetchedClasses = [];
        if (classesData.success) {
          fetchedClasses = classesData.classes;
          if (isMounted) setClasses(fetchedClasses);
        }

        // 2. Fetch Submissions
        const submissionsRes = await fetch("/api/student/submissions", { headers });
        const submissionsData = await submissionsRes.json();
        if (submissionsData.success && isMounted) {
          setSubmissions(submissionsData.submissions);
        }

        const completedRes = await fetch("/api/student/completed-lessons", { headers });
        const completedData = await completedRes.json();
        if (completedData.success && completedData.completedLessons && isMounted) {
          setCompletedLessons(completedData.completedLessons.map((cl: any) => cl.lessonId));
        }

        // 3. Fetch Curriculums for default class
        if (fetchedClasses.length > 0) {
          const defaultClass = fetchedClasses[0];
          const res = await fetch(`/api/curriculum?classId=${defaultClass.id}`);
          const result = await res.json();
          if (result.success && isMounted) {
            setClassCurriculums(result.curriculum || []);
          }
        }
      } catch (e) {
        console.error("Failed to load SubjectGrid data:", e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllData();

    // Real-time updates polling
    const interval = setInterval(() => {
      fetchAllData();
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [data?.currentGrade]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-[32px] space-y-3">
        <div className="w-8 h-8 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xs font-semibold text-slate-500">Loading your subjects...</p>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-[32px]">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">no lessons scheduled</p>
      </div>
    );
  }

  const defaultClass = classes[0];
  let subjectsList: string[] = [];
  if (Array.isArray(defaultClass.subjects)) {
    subjectsList = defaultClass.subjects;
  } else if (typeof defaultClass.subjects === "string") {
    try {
      const parsed = JSON.parse(defaultClass.subjects);
      if (Array.isArray(parsed)) subjectsList = parsed;
      else if (parsed) subjectsList = [String(parsed)];
    } catch (e) {
      subjectsList = [defaultClass.subjects];
    }
  } else if (defaultClass.subject) {
    subjectsList = [defaultClass.subject];
  }

  const renderedSubjects = subjectsList.filter(Boolean).map((subName, idx) => {
    // Try to find matching subject from dashboard data
    const existingSubject = data?.subjects.find(s => s.name.toLowerCase() === subName.toLowerCase());
    
    // Calculate real-time stats from classCurriculums & student submissions
    const subjectCurriculums = classCurriculums.filter(
      curr => curr.subject && curr.subject.toLowerCase() === subName.toLowerCase()
    );
    
    const totalLessons = subjectCurriculums.length;
    
    const lessonsCompleted = subjectCurriculums.filter(curr => completedLessons.includes(curr.id)).length;

    const progressPercentage = totalLessons > 0 
      ? Math.round((lessonsCompleted / totalLessons) * 100)
      : 0;

    const uncompletedLessons = subjectCurriculums.filter(curr => !completedLessons.includes(curr.id));

    const nextLessonTitle = uncompletedLessons.length > 0 
      ? uncompletedLessons[0].title 
      : (totalLessons > 0 ? "All Modules Completed!" : "no lessons scheduled");

    if (existingSubject) {
      return {
        ...existingSubject,
        totalLessons: totalLessons > 0 ? totalLessons : existingSubject.totalLessons,
        lessonsCompleted: lessonsCompleted,
        progressPercentage: progressPercentage,
        nextLessonTitle: nextLessonTitle,
        realClassId: defaultClass.id,
        realSubjectName: subName
      };
    }

    // Fallback mock subject progress
    const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-rose-500", "bg-amber-500"];
    const codes = ["4024", "5054", "1123", "2210", "3162"];
    return {
      id: `mock_${subName}_${idx}`,
      name: subName,
      code: codes[idx % codes.length],
      progressPercentage: progressPercentage,
      totalLessons: totalLessons > 0 ? totalLessons : 12,
      lessonsCompleted: lessonsCompleted,
      nextLessonTitle: nextLessonTitle,
      pendingAssignments: 0,
      aiMasteryScore: 0,
      color: colors[idx % colors.length],
      realClassId: defaultClass.id,
      realSubjectName: subName
    };
  });

  const finalSubjects = limit ? renderedSubjects.slice(0, limit) : renderedSubjects;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {finalSubjects.map(subject => (
        <SubjectCard 
          key={subject.id} 
          subject={subject} 
          onClick={() => {
            setView('my_classes' as any, { 
              classId: subject.realClassId, 
              subject: subject.realSubjectName 
            });
          }}
        />
      ))}
    </div>
  );
}
