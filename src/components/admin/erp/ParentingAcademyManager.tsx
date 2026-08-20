import React, { useEffect, useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Clock, 
  ExternalLink, 
  Check, 
  X, 
  AlertCircle,
  FileText,
  Video,
  Volume2,
  Bookmark,
  ChevronRight,
  Sparkles,
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";

interface ParentingResource {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  thumbnailUrl: string;
  content: string;
  createdAt?: string;
}

export function ParentingAcademyManager() {
  const [resources, setResources] = useState<ParentingResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("GUIDE"); // GUIDE, LESSON, VIDEO, AUDIO, BLOG
  const [category, setCategory] = useState("Academic Support");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");

  // Categories list
  const categories = [
    "Academic Support",
    "Productivity",
    "Well-being",
    "Emotional Growth",
    "Parenting Workshops",
    "Digital Safety"
  ];

  const resourceTypes = [
    { value: "GUIDE", label: "Guide Book", icon: BookOpen, color: "bg-indigo-50 text-indigo-700 border-indigo-200" },
    { value: "LESSON", label: "Online Lesson", icon: Bookmark, color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { value: "BLOG", label: "Text Blog", icon: FileText, color: "bg-blue-50 text-blue-700 border-blue-200" },
    { value: "VIDEO", label: "Video Module", icon: Video, color: "bg-amber-50 text-amber-700 border-amber-200" },
    { value: "AUDIO", label: "Audio Lecture", icon: Volume2, color: "bg-rose-50 text-rose-700 border-rose-200" }
  ];

  const fetchResources = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch("/api/admin/parenting-academy", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.resources)) {
        setResources(data.resources);
      } else {
        setError(data.error || "Failed to load parenting resources.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setType("GUIDE");
    setCategory("Academic Support");
    setThumbnailUrl("");
    setContent("");
    setIsFormOpen(false);
  };

  const handleOpenCreate = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleOpenEdit = (res: ParentingResource) => {
    setEditingId(res.id);
    setTitle(res.title);
    setDescription(res.description || "");
    setType(res.type);
    setCategory(res.category || "Academic Support");
    setThumbnailUrl(res.thumbnailUrl || "");
    setContent(res.content || "");
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !type) {
      setError("Title and Resource Type are required.");
      return;
    }

    const payload = {
      title,
      description,
      type,
      category,
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400",
      content
    };

    try {
      const token = localStorage.getItem("ebm_token");
      const url = editingId 
        ? `/api/admin/parenting-academy/${editingId}`
        : "/api/admin/parenting-academy";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(editingId ? "Resource updated successfully!" : "New parenting resource created!");
        resetForm();
        fetchResources();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Operation failed.");
      }
    } catch (err: any) {
      setError(err.message || "Server connection failed.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this resource?")) return;
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("ebm_token");
      const res = await fetch(`/api/admin/parenting-academy/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Resource deleted successfully.");
        fetchResources();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Failed to delete resource.");
      }
    } catch (err: any) {
      setError(err.message || "Deletion failed.");
    }
  };

  const getTypeIcon = (resourceType: string) => {
    switch (resourceType) {
      case "VIDEO": return Video;
      case "AUDIO": return Volume2;
      case "LESSON": return Bookmark;
      case "BLOG": return FileText;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6" id="parenting-academy-manager">
      {/* Banner / Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Parenting Academy Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Author and manage guides, blogs, audio lectures, and video modules to support parents. Updates persist immediately to parent dashboards.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchResources}
            className="p-2.5 text-slate-500 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition"
            title="Refresh list"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition"
          >
            <Plus className="h-4 w-4" />
            Add Content
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-xs text-red-700">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-red-500" />
          <div>
            <span className="font-bold">Error:</span> {error}
          </div>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-xs text-emerald-700">
          <Check className="h-5 w-5 shrink-0 mt-0.5 text-emerald-500" />
          <div>
            <span className="font-bold">Success!</span> {success}
          </div>
        </div>
      )}

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Authoring & Editor Form Sidebar */}
        {isFormOpen && (
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                {editingId ? "Edit Resource" : "Create Resource"}
              </h3>
              <button 
                onClick={resetForm}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Type Selection Grid */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">Content Media Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {resourceTypes.map((t) => {
                    const TIcon = t.icon;
                    const isSelected = type === t.value;
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
                        className={`p-2 rounded-xl border text-[10px] font-bold flex flex-col items-center gap-1 transition-all ${
                          isSelected 
                            ? "bg-blue-600/10 text-blue-600 border-blue-500 shadow-xs" 
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        <TIcon className="h-4 w-4" />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Setting Healthy Screen Time Boundaries"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Academy Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Brief Overview / Abstract</label>
                <textarea
                  rows={2}
                  placeholder="Summarize what parents will gain or learn from this resource module..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Cover / Thumbnail Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  {thumbnailUrl && (
                    <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                      <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>
              </div>

              {/* Rich Content / URLs */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">
                  {["VIDEO", "AUDIO"].includes(type) ? "Media Source URL or Link" : "Resource Body / Full Content"}
                </label>
                <textarea
                  rows={6}
                  placeholder={["VIDEO", "AUDIO"].includes(type) ? "Paste video/audio URL (YouTube, Vimeo, Podcast feed, mp3, etc.)" : "Type guide/blog text or lessons. Supports rich markdown styled text."}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition text-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition text-center cursor-pointer"
                >
                  {editingId ? "Save Changes" : "Publish to Parents"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Resources Grid/List View */}
        <div className={`${isFormOpen ? "lg:col-span-2" : "lg:col-span-3"} space-y-4`}>
          {loading ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200">
              <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs text-slate-500 font-bold">Synchronizing Parenting Academy Data...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-800">No Custom Content Added Yet</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Click 'Add Content' to begin authoring articles, videos, or audio guides for your school's Parent Academy.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 animate-in fade-in duration-300">
              {resources.map((res) => {
                const SelectedType = resourceTypes.find(t => t.value === res.type) || resourceTypes[0];
                const TypeIcon = getTypeIcon(res.type);

                return (
                  <div key={res.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-400 transition flex flex-col h-[320px]">
                    <div className="h-36 relative bg-slate-100 overflow-hidden shrink-0">
                      <img 
                        src={res.thumbnailUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400"} 
                        alt={res.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1 bg-white text-slate-800 border border-slate-100`}>
                          <TypeIcon className="h-3 w-3 text-blue-600" />
                          {res.type}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-sm bg-blue-600 text-white">
                          {res.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-800 line-clamp-1" title={res.title}>{res.title}</h4>
                        <p className="text-[10px] text-slate-500 line-clamp-3 leading-relaxed">
                          {res.description || "No overview provided for this academy resource module."}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <span className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {res.createdAt ? new Date(res.createdAt).toLocaleDateString() : "Just now"}
                        </span>
                        
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(res)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition border border-transparent hover:border-blue-100"
                            title="Edit Resource"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(res.id)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition border border-transparent hover:border-rose-100"
                            title="Delete Resource"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
