import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  RefreshCw, 
  Check, 
  X, 
  User, 
  Briefcase, 
  GraduationCap, 
  Star, 
  MapPin, 
  Users, 
  AlertCircle 
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  occupation: string;
  childGrade: string;
  rating: number;
  review: string;
  location: string;
  childrenEnrolled: number;
}

export function ParentsJourneyConfig() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/parent-testimonials");
      const data = await res.json();
      if (data.success) {
        setTestimonials(data.testimonials || []);
      } else {
        setError(data.error || "Failed to load parent testimonials");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (t: Testimonial) => {
    setEditingTestimonial({ ...t });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingTestimonial({
      id: "",
      name: "",
      occupation: "",
      childGrade: "",
      rating: 5,
      review: "",
      location: "",
      childrenEnrolled: 1
    });
    setIsNew(true);
  };

  const handleCancel = () => {
    setEditingTestimonial(null);
    setIsNew(false);
  };

  const handleSave = async () => {
    if (!editingTestimonial?.name || !editingTestimonial?.occupation || !editingTestimonial?.review) {
      alert("Name, occupation, and review text are required!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/admin/parent-testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingTestimonial,
          rating: editingTestimonial.rating !== undefined ? Number(editingTestimonial.rating) : 5,
          childrenEnrolled: editingTestimonial.childrenEnrolled !== undefined ? Number(editingTestimonial.childrenEnrolled) : 1
        })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(isNew ? "Created testimonial successfully!" : "Updated testimonial successfully!");
        setEditingTestimonial(null);
        setIsNew(false);
        fetchTestimonials();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to save testimonial");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while saving");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this parent testimonial?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/admin/parent-testimonials/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Deleted testimonial successfully!");
        fetchTestimonials();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to delete testimonial");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while deleting");
    } finally {
      setLoading(false);
    }
  };

  const handleResetDefaults = async () => {
    if (!confirm("This will erase all custom parent testimonials and sync/reset back to the 4 standard default parent testimonials. Continue?")) return;

    try {
      setLoading(true);
      const res = await fetch("/api/admin/parent-testimonials/reset", {
        method: "POST"
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Synced and reset default testimonials successfully!");
        fetchTestimonials();
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        alert(data.error || "Failed to reset testimonials");
      }
    } catch (err: any) {
      alert(err.message || "An error occurred while resetting");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            Parents Journey Section Configuration (Home Page Sync)
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Manage the parent testimonials and journeys shown in the "Parents Journey" section on the home page.
          </p>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
            title="Reset/sync back to the default 4 testimonials in the database"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset Defaults
          </button>
          
          {!editingTestimonial && (
            <button
              onClick={handleAddNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md shadow-emerald-100"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Testimonial
            </button>
          )}
        </div>
      </div>

      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl flex items-center gap-2 text-xs font-bold animate-pulse">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex items-center gap-2 text-xs font-bold">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {/* Editor Form */}
      {editingTestimonial ? (
        <div className="space-y-6 border border-slate-200 rounded-2xl p-6 bg-slate-50/50 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
              {isNew ? <Plus className="h-4 w-4 text-emerald-500" /> : <Edit className="h-4 w-4 text-emerald-500" />}
              {isNew ? "Create New Parent Testimonial" : `Edit Testimonial: ${editingTestimonial.name}`}
            </h4>
            <button
              onClick={handleCancel}
              className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Parent Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingTestimonial.name || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                  placeholder="e.g. Dr. Robert Chen"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Occupation / Title</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingTestimonial.occupation || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, occupation: e.target.value })}
                  placeholder="e.g. Senior Consultant Cardiologist"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Child's Grade & Subjects</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingTestimonial.childGrade || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, childGrade: e.target.value })}
                  placeholder="e.g. Grade 11 (O Level Mathematics)"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={editingTestimonial.location || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, location: e.target.value })}
                  placeholder="e.g. Singapore"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Rating (1 to 5 Stars)</label>
              <div className="relative">
                <Star className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <select
                  value={editingTestimonial.rating || 5}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                  <option value={3}>⭐⭐⭐ (3 Stars)</option>
                  <option value={2}>⭐⭐ (2 Stars)</option>
                  <option value={1}>⭐ (1 Star)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Children Enrolled at EBM</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={editingTestimonial.childrenEnrolled || 1}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, childrenEnrolled: Number(e.target.value) })}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Review / Feedback Description</label>
              <textarea
                rows={4}
                value={editingTestimonial.review || ""}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                placeholder="Write the full testimonial about their experience, the diagnostic reporting benefits, Socratic feedback, or their student's results..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-black uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-100"
            >
              <Save className="h-4 w-4" />
              Save Testimonial
            </button>
          </div>
        </div>
      ) : (
        /* Testimonials List View */
        <div className="space-y-4">
          {loading && testimonials.length === 0 ? (
            <div className="py-12 text-center text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-emerald-500" />
              Fetching parent testimonials...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-3xl p-8 bg-slate-50">
              <Sparkles className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-widest">No Parent Testimonials Found</h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Create a custom parent testimonial or sync with defaults to get started.
              </p>
              <button
                onClick={handleAddNew}
                className="mt-4 inline-flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase tracking-wider rounded-xl transition-all"
              >
                <Plus className="h-4 w-4" /> Add Testimonial
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center font-black text-sm">
                          {t.name.split(" ").pop()?.charAt(0) || t.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide leading-none">{t.name}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                            {t.occupation}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                        <button
                          onClick={() => handleEdit(t)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                          title="Edit parent testimonial"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-rose-600 hover:bg-rose-50"
                          title="Delete parent testimonial"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed line-clamp-4">
                      "{t.review}"
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-bold text-slate-500">
                        🎓 Child: {t.childGrade}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[9px] font-bold text-slate-500">
                        👥 Enrolled: {t.childrenEnrolled} {t.childrenEnrolled === 1 ? 'Child' : 'Children'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-300" /> {t.location}
                    </span>
                    <span className="text-emerald-500 font-extrabold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> Synced to Home
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
