import React, { useEffect, useState } from "react";
import { useAdminStore } from "./admin.store";
import { 
  Users, Mail, Phone, MapPin, MoreVertical, Search, Filter, Plus, 
  UserCircle, X, Edit2, Trash2, Key, BookOpen, AlertCircle, CheckCircle2 
} from "lucide-react";

export function TeacherManager() {
  const { teachers, fetchTeachers, addTeacher, updateTeacher, deleteTeacher, isLoading } = useAdminStore();
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("Science");
  const [title, setTitle] = useState("");
  
  // Status message states
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load teachers on mount
  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  // Open modal for onboarding
  const handleOpenOnboard = () => {
    setEditingTeacher(null);
    setName("");
    setEmail("");
    setPassword("");
    setDepartment("Science");
    setTitle("");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (teacher: any) => {
    setEditingTeacher(teacher);
    setName(teacher.name || "");
    setEmail(teacher.email || "");
    setPassword(""); // Keep blank unless resetting
    setDepartment(teacher.department || "Science");
    setTitle(teacher.title || "");
    setErrorMsg("");
    setSuccessMsg("");
    setIsModalOpen(true);
  };

  // Handle submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsSubmitting(true);

    if (!name || !email) {
      setErrorMsg("Name and email are required.");
      setIsSubmitting(false);
      return;
    }

    if (!editingTeacher && !password) {
      setErrorMsg("Password is required for onboarding a new teacher.");
      setIsSubmitting(false);
      return;
    }

    const payload: any = {
      name,
      email,
      department,
      title: title || `${department} Educator`,
    };

    if (password) {
      payload.password = password;
    }

    try {
      let success = false;
      if (editingTeacher) {
        success = await updateTeacher(editingTeacher.id, payload);
      } else {
        success = await addTeacher(payload);
      }

      if (success) {
        setSuccessMsg(
          editingTeacher 
            ? "Teacher profile customized successfully." 
            : "New teacher onboarded successfully!"
        );
        setTimeout(() => {
          setIsModalOpen(false);
          setEditingTeacher(null);
        }, 1500);
      } else {
        setErrorMsg("An error occurred. The email may already be in use.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Delete
  const handleDelete = async (teacherId: string, teacherName: string) => {
    if (confirm(`Are you sure you want to delete ${teacherName}? This will permanently revoke their access.`)) {
      try {
        const success = await deleteTeacher(teacherId);
        if (success) {
          alert("Teacher account successfully deleted.");
        } else {
          alert("Failed to delete teacher account.");
        }
      } catch (err: any) {
        alert("Error deleting teacher: " + err.message);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Faculty Management</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Teaching Staff, Departments & Database Records</p>
        </div>
        <button 
          onClick={handleOpenOnboard}
          className="px-5 py-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" /> Onboard Teacher
        </button>
      </div>

      {/* Teachers List State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-4">Syncing faculty database...</p>
        </div>
      ) : teachers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="font-black text-slate-800 text-base uppercase tracking-tight">No Teachers Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">No teacher accounts exist in the database. Use the button above to onboard your first faculty member.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map(teacher => (
            <div key={teacher.id} className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col group hover:shadow-md transition-all duration-300">
              <div className="p-6 flex flex-col items-center text-center border-b border-slate-100 relative">
                {/* Actions row */}
                <div className="absolute top-4 right-4 flex items-center gap-1">
                  <button 
                    onClick={() => handleOpenEdit(teacher)}
                    title="Edit profile"
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(teacher.id, teacher.name)}
                    title="Delete teacher"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <UserCircle className="h-10 w-10" />
                </div>
                
                <h3 className="font-black text-slate-900 text-base uppercase tracking-tight line-clamp-1">{teacher.name}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">{teacher.department}</p>
                
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-emerald-50 text-emerald-700 border-emerald-100">
                    ACTIVE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border bg-slate-50 text-slate-600 border-slate-100 max-w-[150px] truncate">
                    {teacher.title || `${teacher.department} Instructor`}
                  </span>
                </div>
              </div>
              
              <div className="p-5 bg-slate-50/50 space-y-3 flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="font-semibold lowercase truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Active Instructor</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                  <span className="font-bold uppercase tracking-widest text-[10px]">Database-Linked</span>
                </div>
              </div>
              
              <div className="p-4 bg-white border-t border-slate-100">
                <button 
                  onClick={() => handleOpenEdit(teacher)}
                  className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50/20 transition-all cursor-pointer"
                >
                  Customize Profile & Credentials
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modern Modal backdrop & popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="font-black text-slate-900 text-base uppercase tracking-tight">
                  {editingTeacher ? "Customize Profile" : "Onboard Faculty"}
                </h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  {editingTeacher ? `Configuring record for ${editingTeacher.name}` : "Create a new database-backed teacher profile"}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-2 text-rose-700 text-xs font-semibold animate-shake">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-start gap-2 text-emerald-700 text-xs font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Full Name</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Professor Bukhari"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="teacher@ebm.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">
                      {editingTeacher ? "Reset Password (Optional)" : "Set Password"}
                    </label>
                    <div className="relative">
                      <input 
                        type="password"
                        required={!editingTeacher}
                        placeholder={editingTeacher ? "Leave blank to keep same" : "••••••••"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                      />
                      <Key className="absolute left-3 top-3 h-3.5 w-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Department */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Department</label>
                    <select 
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    >
                      <option value="Science">Science</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="English">English</option>
                      <option value="Humanities">Humanities</option>
                      <option value="IT">IT & Computer Science</option>
                      <option value="General">General Education</option>
                    </select>
                  </div>

                  {/* Title / Subject Specialty */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Subject Specialty / Title</label>
                    <input 
                      type="text"
                      placeholder="e.g. Lead Algebra Educator"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest rounded-xl text-xs transition shadow-lg shadow-blue-100 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingTeacher ? "Save Customizations" : "Confirm Onboarding"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
