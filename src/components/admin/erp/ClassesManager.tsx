import React, { useEffect, useState } from "react";
import { 
  Users, BookOpen, MapPin, Calendar, Search, Filter, Plus, 
  X, Edit2, Trash2, Check, AlertCircle, CheckCircle2, Award, 
  GraduationCap, Loader2, RefreshCw, Layers
} from "lucide-react";

interface ClassSection {
  id: string;
  name: string;
  gradeLevel: string;
  room: string;
  schedule: string;
  subjects: string[];
  studentCount: number;
  status: string;
}

export function ClassesManager() {
  const [classes, setClasses] = useState<ClassSection[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("ALL");

  // Notification states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Create/Edit Class modal states
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassSection | null>(null);
  const [className, setClassName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("Grade 10");
  const [room, setRoom] = useState("");
  const [schedule, setSchedule] = useState("Mon-Fri 8:30 AM - 1:30 PM");
  const [status, setStatus] = useState("ACTIVE");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjectInput, setSubjectInput] = useState("");

  // Student Roster modal states
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);
  const [activeClassForRoster, setActiveClassForRoster] = useState<ClassSection | null>(null);
  const [rosterSearch, setRosterSearch] = useState("");
  const [rosterGradeFilter, setRosterGradeFilter] = useState(true); // Toggle to only show same-grade students

  // Faculty Assignment modal states
  const [isFacultyModalOpen, setIsFacultyModalOpen] = useState(false);
  const [activeClassForFaculty, setActiveClassForFaculty] = useState<ClassSection | null>(null);
  const [facultySearch, setFacultySearch] = useState("");

  const presetSubjects = [
    "Mathematics", "English", "Science", "Physics", "Chemistry", 
    "Biology", "History", "Computer Science", "Geography", "Urdu", "Islamiat"
  ];

  const gradeLevels = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", 
    "Class 6", "Class 7", "Class 8", 
    "O Level (Yr 1)", "O Level (Yr 2)", 
    "A Level (AS)", "A Level (A2)", 
    "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", 
    "Grade 6", "Grade 7", "Grade 8", "O Level", "A Level"
  ];

  // Fetch all initial data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch classes
      const classRes = await fetch("/api/teacher/classes");
      const classData = await classRes.json();
      if (classData.success) {
        setClasses(classData.classes || []);
      }

      // 2. Fetch students
      const studentRes = await fetch("/api/teacher/students");
      const studentData = await studentRes.json();
      if (studentData.success) {
        setStudents(studentData.students || []);
      }

      // 3. Fetch teachers
      const teacherRes = await fetch("/api/admin/teachers");
      const teacherData = await teacherRes.json();
      if (teacherData.success) {
        setTeachers(teacherData.teachers || []);
      }
    } catch (e: any) {
      setErrorMsg("Failed to load classes and infrastructure data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Quick helper to show temporary success message
  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // Quick helper to show temporary error message
  const triggerError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 4000);
  };

  // Open Class Modal for creation
  const handleOpenCreateClass = () => {
    setEditingClass(null);
    setClassName("");
    setGradeLevel("Grade 10");
    setRoom("");
    setSchedule("Mon-Fri 8:30 AM - 1:30 PM");
    setStatus("ACTIVE");
    setSelectedSubjects([]);
    setIsClassModalOpen(true);
  };

  // Open Class Modal for editing
  const handleOpenEditClass = (cls: ClassSection) => {
    setEditingClass(cls);
    setClassName(cls.name);
    setGradeLevel(cls.gradeLevel);
    setRoom(cls.room);
    setSchedule(cls.schedule);
    setStatus(cls.status);
    setSelectedSubjects(cls.subjects || []);
    setIsClassModalOpen(true);
  };

  // Submit Class Create or Update
  const handleClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!className.trim()) {
      triggerError("Class Name is required.");
      return;
    }

    const payload = {
      name: className,
      gradeLevel,
      room,
      schedule,
      status,
      subjects: selectedSubjects
    };

    try {
      if (editingClass) {
        const res = await fetch(`/api/teacher/classes/${editingClass.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("Class updated successfully.");
          setIsClassModalOpen(false);
          fetchData();
        } else {
          triggerError(data.error || "Failed to update class.");
        }
      } else {
        const res = await fetch("/api/teacher/classes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess("New class / section created successfully!");
          setIsClassModalOpen(false);
          fetchData();
        } else {
          triggerError(data.error || "Failed to create class.");
        }
      }
    } catch (err: any) {
      triggerError(err.message || "Network error submitting class.");
    }
  };

  // Delete class
  const handleDeleteClass = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? All students in this class will be unassigned.`)) {
      try {
        const res = await fetch(`/api/teacher/classes/${id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (data.success) {
          triggerSuccess(`Class "${name}" deleted successfully.`);
          fetchData();
        } else {
          triggerError(data.error || "Failed to delete class.");
        }
      } catch (err: any) {
        triggerError("Error deleting class: " + err.message);
      }
    }
  };

  // Handle student roster enrollment toggle
  const toggleStudentEnrollment = async (student: any) => {
    if (!activeClassForRoster) return;
    const classId = activeClassForRoster.id;

    let currentClassIds: string[] = [];
    if (Array.isArray(student.classIds)) {
      currentClassIds = student.classIds;
    } else if (typeof student.classIds === "string") {
      try {
        currentClassIds = JSON.parse(student.classIds);
      } catch (e) {
        currentClassIds = [];
      }
    }

    const isEnrolled = currentClassIds.includes(classId);
    let updatedClassIds: string[];

    if (isEnrolled) {
      updatedClassIds = currentClassIds.filter(id => id !== classId);
    } else {
      updatedClassIds = [...currentClassIds, classId];
    }

    try {
      const res = await fetch(`/api/teacher/students/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classIds: updatedClassIds })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state directly to keep UI fast
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, classIds: updatedClassIds } : s));
        
        // Update local class count as well
        setClasses(prev => prev.map(c => {
          if (c.id === classId) {
            return {
              ...c,
              studentCount: isEnrolled ? Math.max(0, c.studentCount - 1) : c.studentCount + 1
            };
          }
          return c;
        }));
      } else {
        triggerError("Failed to update student enrollment.");
      }
    } catch (e: any) {
      triggerError("Network error updating enrollment.");
    }
  };

  // Handle teacher faculty assignment toggle
  const toggleTeacherAssignment = async (teacher: any) => {
    if (!activeClassForFaculty) return;
    const classId = activeClassForFaculty.id;

    let currentClassIds: string[] = [];
    if (Array.isArray(teacher.classIds)) {
      currentClassIds = teacher.classIds;
    } else if (typeof teacher.classIds === "string") {
      try {
        currentClassIds = JSON.parse(teacher.classIds);
      } catch (e) {
        currentClassIds = [];
      }
    }

    const isAssigned = currentClassIds.includes(classId);
    let updatedClassIds: string[];

    if (isAssigned) {
      updatedClassIds = currentClassIds.filter(id => id !== classId);
    } else {
      updatedClassIds = [...currentClassIds, classId];
    }

    try {
      const res = await fetch(`/api/admin/teachers/${teacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classIds: updatedClassIds })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state
        setTeachers(prev => prev.map(t => t.id === teacher.id ? { ...t, classIds: updatedClassIds } : t));
        triggerSuccess(`Updated assignment for ${teacher.name}`);
      } else {
        triggerError("Failed to assign faculty member.");
      }
    } catch (e: any) {
      triggerError("Network error assigning teacher.");
    }
  };

  // Add subject tag helper
  const addSubjectTag = (subjectName: string) => {
    if (!subjectName.trim()) return;
    if (!selectedSubjects.includes(subjectName.trim())) {
      setSelectedSubjects([...selectedSubjects, subjectName.trim()]);
    }
    setSubjectInput("");
  };

  // Remove subject tag
  const removeSubjectTag = (indexToRemove: number) => {
    setSelectedSubjects(selectedSubjects.filter((_, i) => i !== indexToRemove));
  };

  // Filtering classes
  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cls.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (cls.subjects && cls.subjects.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesGrade = gradeFilter === "ALL" || cls.gradeLevel === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  // Calculate high-level stats for UI dashboard counters
  const totalClassesCount = classes.length;
  const activeClassesCount = classes.filter(c => c.status === "ACTIVE").length;
  const totalEnrolledStudents = students.filter(s => {
    let cids = [];
    try {
      cids = typeof s.classIds === "string" ? JSON.parse(s.classIds) : (Array.isArray(s.classIds) ? s.classIds : []);
    } catch (e) { cids = []; }
    return cids.length > 0;
  }).length;
  const assignedTeachersCount = teachers.filter(t => {
    let cids = [];
    try {
      cids = typeof t.classIds === "string" ? JSON.parse(t.classIds) : (Array.isArray(t.classIds) ? t.classIds : []);
    } catch (e) { cids = []; }
    return cids.length > 0;
  }).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Classes & Sections</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Configure sections, student rosters, assigned subjects, and teaching faculty</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchData}
            className="p-3 text-slate-500 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-xs flex items-center justify-center cursor-pointer"
            title="Reload data"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={handleOpenCreateClass}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" /> Create Class / Section
          </button>
        </div>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Classes</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{totalClassesCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Sections</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{activeClassesCount}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Assigned</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{totalEnrolledStudents}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Faculty</p>
            <p className="text-xl font-black text-slate-900 mt-0.5">{assignedTeachersCount}</p>
          </div>
        </div>
      </div>

      {/* Floating Status notifications */}
      {successMsg && (
        <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 text-xs font-bold uppercase tracking-widest animate-in fade-in duration-200">
          <CheckCircle2 className="h-4 w-4" /> {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="fixed bottom-4 right-4 bg-rose-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 text-xs font-bold uppercase tracking-widest animate-in fade-in duration-200">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </div>
      )}

      {/* Search & Filtering bar */}
      <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
          <input 
            type="text"
            placeholder="Search classes by name, subject, room..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Filter className="h-3 w-3 text-slate-400" /> Filter:
          </div>
          <select 
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="ALL">ALL GRADES</option>
            {gradeLevels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid / Class Cards list */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-4">Syncing Class Structure Database...</p>
        </div>
      ) : filteredClasses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
            <Layers className="h-8 w-8" />
          </div>
          <h3 className="font-black text-slate-800 text-base uppercase tracking-tight">No Classes or Sections Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">Create a class or change your search parameters to view existing sections.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map(cls => {
            // Find teachers assigned to this class
            const classTeachers = teachers.filter(t => {
              let cids: string[] = [];
              try {
                cids = typeof t.classIds === "string" ? JSON.parse(t.classIds) : (Array.isArray(t.classIds) ? t.classIds : []);
              } catch (e) { cids = []; }
              return cids.includes(cls.id);
            });

            return (
              <div 
                key={cls.id} 
                className={`bg-white rounded-3xl border ${cls.status === "ACTIVE" ? "border-slate-200" : "border-slate-200 opacity-75"} shadow-xs overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-300 transition-all duration-300`}
              >
                {/* Card Top: Details */}
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border bg-blue-50 text-blue-700 border-blue-100">
                        {cls.gradeLevel}
                      </span>
                      <h3 className="font-black text-slate-950 text-base uppercase tracking-tight mt-1 group-hover:text-blue-600 transition-colors">
                        {cls.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        cls.status === "ACTIVE" 
                          ? "bg-emerald-500 text-white" 
                          : "bg-slate-300 text-slate-700"
                      }`}>
                        {cls.status}
                      </span>
                    </div>
                  </div>

                  {/* Class Stats info */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <MapPin className="h-2.5 w-2.5" /> Room / Lab
                      </p>
                      <p className="text-xs font-black text-slate-800 uppercase mt-0.5 truncate">{cls.room || "Unassigned"}</p>
                    </div>
                    <div className="p-3 bg-slate-50/70 border border-slate-100 rounded-xl">
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Users className="h-2.5 w-2.5" /> Enrollment
                      </p>
                      <p className="text-xs font-black text-slate-800 mt-0.5">{cls.studentCount} Students</p>
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{cls.schedule || "No Schedule Defined"}</span>
                  </div>

                  {/* Subjects Presets */}
                  <div className="space-y-1.5">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Academic Offerings</p>
                    {cls.subjects && cls.subjects.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {cls.subjects.map((sub, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-[9px] font-bold text-slate-600 uppercase tracking-wide">
                            {sub}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider italic">No subjects configured</p>
                    )}
                  </div>

                  {/* Teachers Assigned */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Faculty Instructors</p>
                    {classTeachers.length > 0 ? (
                      <div className="space-y-1">
                        {classTeachers.map(t => (
                          <div key={t.id} className="flex items-center justify-between text-[10px] font-bold text-slate-700 bg-blue-50/45 px-2.5 py-1 rounded-lg border border-blue-100/30">
                            <span>{t.name.toUpperCase()}</span>
                            <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest">{t.department}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider italic">No teacher assigned</p>
                    )}
                  </div>
                </div>

                {/* Card Actions Bottom */}
                <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-2">
                  <button 
                    onClick={() => {
                      setActiveClassForRoster(cls);
                      setIsRosterModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
                  >
                    Roster
                  </button>
                  <button 
                    onClick={() => {
                      setActiveClassForFaculty(cls);
                      setIsFacultyModalOpen(true);
                    }}
                    className="flex-1 py-2 bg-white hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 transition-colors cursor-pointer"
                  >
                    Faculty
                  </button>
                  <button 
                    onClick={() => handleOpenEditClass(cls)}
                    title="Edit Class details"
                    className="p-2 bg-white hover:bg-amber-50 hover:text-amber-600 border border-slate-200 hover:border-amber-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClass(cls.id, cls.name)}
                    title="Delete Class Section"
                    className="p-2 bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL 1: Create or Edit Class Section */}
      {isClassModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">
                  {editingClass ? "Edit Class Details" : "Create Class / Section"}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5">
                  {editingClass ? "Adjust parameters for existing structure" : "Initialize a new section and subjects"}
                </p>
              </div>
              <button 
                onClick={() => setIsClassModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleClassSubmit} className="p-6 space-y-4 flex-1">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Class / Section Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Grade 10 - Science - A"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grade Level</label>
                  <select 
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-blue-500"
                  >
                    {gradeLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>{lvl}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Room / Laboratory</label>
                  <input 
                    type="text"
                    placeholder="e.g. Room 402, Lab-B"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Standard Schedule</label>
                <input 
                  type="text"
                  placeholder="e.g. Mon-Fri 8:30 AM - 1:30 PM"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Subjects / Curriculums Offered</label>
                
                {/* Presets Row */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {presetSubjects.map(preset => {
                    const isSelected = selectedSubjects.includes(preset);
                    return (
                      <button
                        type="button"
                        key={preset}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSubjects(selectedSubjects.filter(s => s !== preset));
                          } else {
                            setSelectedSubjects([...selectedSubjects, preset]);
                          }
                        }}
                        className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all border ${
                          isSelected 
                            ? "bg-blue-600 text-white border-blue-600" 
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {preset}
                      </button>
                    );
                  })}
                </div>

                {/* Custom tag input */}
                <div className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Add other custom subject..."
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSubjectTag(subjectInput);
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => addSubjectTag(subjectInput)}
                    className="px-4 py-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-700 cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                {/* Active tag list */}
                {selectedSubjects.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-wrap gap-1.5 mt-2">
                    {selectedSubjects.map((sub, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white border border-blue-200 rounded-lg text-[10px] font-bold text-blue-700 uppercase">
                        {sub}
                        <button 
                          type="button" 
                          onClick={() => removeSubjectTag(i)}
                          className="text-slate-400 hover:text-slate-900 ml-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase cursor-pointer">
                    <input 
                      type="radio" 
                      name="status"
                      value="ACTIVE"
                      checked={status === "ACTIVE"}
                      onChange={() => setStatus("ACTIVE")}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4 border-slate-300"
                    />
                    Active Section
                  </label>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase cursor-pointer">
                    <input 
                      type="radio" 
                      name="status"
                      value="INACTIVE"
                      checked={status === "INACTIVE"}
                      onChange={() => setStatus("INACTIVE")}
                      className="text-blue-600 focus:ring-blue-500 h-4 w-4 border-slate-300"
                    />
                    Inactive / Suspended
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsClassModalOpen(false)}
                  className="px-5 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-100 cursor-pointer"
                >
                  {editingClass ? "Save Changes" : "Create Class Section"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Student Class Roster Enrollment */}
      {isRosterModalOpen && activeClassForRoster && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-[8px] font-black uppercase tracking-widest">
                  {activeClassForRoster.gradeLevel}
                </span>
                <h3 className="font-black text-slate-950 text-base uppercase tracking-tight mt-1">
                  {activeClassForRoster.name} — Student Roster
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Select and manage student enrollments in this section
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsRosterModalOpen(false);
                  setActiveClassForRoster(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input 
                  type="text"
                  placeholder="Search students by name, email..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none bg-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={rosterGradeFilter}
                    onChange={(e) => setRosterGradeFilter(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  Same Grade Only ({activeClassForRoster.gradeLevel})
                </label>
              </div>
            </div>

            {/* Students List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2 max-h-[50vh]">
              {students.filter(student => {
                const matchesSearch = student.name.toLowerCase().includes(rosterSearch.toLowerCase()) || 
                                      student.email.toLowerCase().includes(rosterSearch.toLowerCase());
                const matchesGrade = !rosterGradeFilter || student.gradeLevel === activeClassForRoster.gradeLevel;
                return matchesSearch && matchesGrade;
              }).length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-black uppercase tracking-widest">No matching students found</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Toggle "Same Grade" filter to view all students</p>
                </div>
              ) : (
                students.filter(student => {
                  const matchesSearch = student.name.toLowerCase().includes(rosterSearch.toLowerCase()) || 
                                        student.email.toLowerCase().includes(rosterSearch.toLowerCase());
                  const matchesGrade = !rosterGradeFilter || student.gradeLevel === activeClassForRoster.gradeLevel;
                  return matchesSearch && matchesGrade;
                }).map(student => {
                  let enrolledIds: string[] = [];
                  try {
                    enrolledIds = typeof student.classIds === "string" ? JSON.parse(student.classIds) : (Array.isArray(student.classIds) ? student.classIds : []);
                  } catch (e) { enrolledIds = []; }
                  
                  const isEnrolled = enrolledIds.includes(activeClassForRoster.id);

                  return (
                    <div 
                      key={student.id} 
                      onClick={() => toggleStudentEnrollment(student)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isEnrolled 
                          ? "bg-blue-50/50 border-blue-300 shadow-xs" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{student.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{student.email}</p>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{student.gradeLevel}</p>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl border transition-all ${
                        isEnrolled 
                          ? "bg-blue-600 text-white border-blue-600" 
                          : "bg-white text-slate-300 border-slate-200 hover:text-slate-600 hover:bg-slate-50"
                      }`}>
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer summary */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
              <div>
                Enrolled Students: <span className="font-black text-slate-900">{activeClassForRoster.studentCount}</span>
              </div>
              <button 
                onClick={() => {
                  setIsRosterModalOpen(false);
                  setActiveClassForRoster(null);
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close Roster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Assign Teachers/Faculty */}
      {isFacultyModalOpen && activeClassForFaculty && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] shadow-2xl border border-slate-100 flex flex-col animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full text-[8px] font-black uppercase tracking-widest">
                  Faculty Assignment
                </span>
                <h3 className="font-black text-slate-950 text-base uppercase tracking-tight mt-1">
                  {activeClassForFaculty.name} — Instructor Pool
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Assign qualified subject instructors to this section
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsFacultyModalOpen(false);
                  setActiveClassForFaculty(null);
                }}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Search */}
            <div className="p-4 bg-slate-50/50 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input 
                  type="text"
                  placeholder="Search faculty members..."
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* Faculty List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-2 max-h-[50vh]">
              {teachers.filter(teacher => {
                return teacher.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
                       teacher.department.toLowerCase().includes(facultySearch.toLowerCase());
              }).length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Users className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs font-black uppercase tracking-widest">No matching faculty members</p>
                </div>
              ) : (
                teachers.filter(teacher => {
                  return teacher.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
                         teacher.department.toLowerCase().includes(facultySearch.toLowerCase());
                }).map(teacher => {
                  let assignedIds: string[] = [];
                  try {
                    assignedIds = typeof teacher.classIds === "string" ? JSON.parse(teacher.classIds) : (Array.isArray(teacher.classIds) ? teacher.classIds : []);
                  } catch (e) { assignedIds = []; }
                  
                  const isAssigned = assignedIds.includes(activeClassForFaculty.id);

                  return (
                    <div 
                      key={teacher.id} 
                      onClick={() => toggleTeacherAssignment(teacher)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isAssigned 
                          ? "bg-indigo-50/50 border-indigo-300 shadow-xs" 
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{teacher.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{teacher.email}</p>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">{teacher.department}</p>
                        </div>
                      </div>

                      <div className={`p-2 rounded-xl border transition-all ${
                        isAssigned 
                          ? "bg-indigo-600 text-white border-indigo-600" 
                          : "bg-white text-slate-300 border-slate-200 hover:text-slate-600 hover:bg-slate-50"
                      }`}>
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => {
                  setIsFacultyModalOpen(false);
                  setActiveClassForFaculty(null);
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
