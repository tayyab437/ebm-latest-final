import React, { useEffect, useState } from "react";
import { useAdminStore } from "./admin.store";
import { Search, Filter, MoreHorizontal, Mail, GraduationCap, Calendar, ChevronRight, Download, Plus, X, UserPlus, FileText } from "lucide-react";

export function AdmissionsManager() {
  const { admissions, fetchAdmissions, addAdmission, updateAdmission } = useAdminStore();
  
  const [isAdding, setIsAdding] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    studentName: "",
    email: "",
    gradeLevel: "YEAR_1",
    status: "PENDING",
    parentName: "",
    parentPhone: "",
    notes: ""
  });

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAdmission(formData);
    setIsAdding(false);
    setFormData({ studentName: "", email: "", gradeLevel: "YEAR_1", status: "PENDING", parentName: "", parentPhone: "", notes: "" });
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    await updateAdmission(id, { status: newStatus });
    setReviewingId(null);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "ENROLLED": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REVIEWING": return "bg-blue-100 text-blue-700 border-blue-200";
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
      case "REJECTED": return "bg-rose-100 text-rose-700 border-rose-200";
      case "INTERVIEWED": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "OFFERED": return "bg-purple-100 text-purple-700 border-purple-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Admissions Portal</h2>
          <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-1">Global Application Pipeline & Enrollment</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Manual Application
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
           <div className="relative w-full md:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search by student name or email..."
               className="w-full pl-9 pr-4 py-2.5 text-xs font-bold bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase tracking-widest placeholder:normal-case placeholder:font-medium"
             />
           </div>
           <div className="flex items-center gap-2 w-full md:w-auto">
             <select className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black text-slate-600 uppercase tracking-widest focus:outline-none">
               <option>All Statuses</option>
               <option>Pending</option>
               <option>Reviewing</option>
               <option>Enrolled</option>
             </select>
             <button className="p-2.5 border border-slate-200 bg-white text-slate-500 rounded-xl hover:bg-slate-50 transition-colors">
               <Filter className="h-4 w-4" />
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-5">Applicant Details</th>
                <th className="px-6 py-5">Grade Level</th>
                <th className="px-6 py-5">Applied Date</th>
                <th className="px-6 py-5 text-center">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admissions.map(adm => (
                <tr key={adm.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 border border-blue-100">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{adm.studentName}</div>
                        <div className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5 lowercase">
                          <Mail className="h-3 w-3" /> {adm.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{adm.gradeLevel}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {new Date(adm.appliedDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(adm.status)}`}>
                      {adm.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setReviewingId(adm.id)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                      >
                        Review
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          <span>Showing {admissions.length} applications</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">New Application</h3>
                  <p className="text-xs font-bold text-slate-500">Manual admission entry</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAdding(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Student Name</label>
                  <input required value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Grade Level</label>
                  <select value={formData.gradeLevel} onChange={e => setFormData({...formData, gradeLevel: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500">
                    <option value="YEAR_1">Year 1</option>
                    <option value="YEAR_2">Year 2</option>
                    <option value="YEAR_3">Year 3</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Initial Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500">
                    <option value="PENDING">Pending</option>
                    <option value="REVIEWING">Reviewing</option>
                    <option value="INTERVIEWED">Interviewed</option>
                    <option value="OFFERED">Offered</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Parent Name</label>
                  <input required value={formData.parentName} onChange={e => setFormData({...formData, parentName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Parent Phone</label>
                  <input required value={formData.parentPhone} onChange={e => setFormData({...formData, parentPhone: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Application Notes</label>
                <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 resize-none"></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAdding(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {reviewingId && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Review Application</h3>
                  <p className="text-xs font-bold text-slate-500">Update status</p>
                </div>
              </div>
              <button 
                onClick={() => setReviewingId(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex gap-4 mb-6">
                <button onClick={() => handleUpdateStatus(reviewingId, 'REVIEWING')} className="flex-1 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Mark Reviewing</button>
                <button onClick={() => handleUpdateStatus(reviewingId, 'INTERVIEWED')} className="flex-1 py-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Mark Interviewed</button>
                <button onClick={() => handleUpdateStatus(reviewingId, 'OFFERED')} className="flex-1 py-3 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Offer Admission</button>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleUpdateStatus(reviewingId, 'ENROLLED')} className="flex-1 py-3 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Enroll Student</button>
                <button onClick={() => handleUpdateStatus(reviewingId, 'REJECTED')} className="flex-1 py-3 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-black uppercase tracking-widest transition-colors">Reject</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
