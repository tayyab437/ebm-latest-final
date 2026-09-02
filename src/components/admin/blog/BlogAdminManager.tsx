import React, { useState, useEffect } from "react";
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  Settings,
  ArrowLeft,
  Save,
  Sparkles,
  Link as LinkIcon,
  Tag,
  Calendar,
  User,
  FolderPlus,
  RefreshCw,
  AlertCircle,
  Check,
  Shield,
  Layers,
  Image as ImageIcon
} from "lucide-react";
import type { BlogPost, BlogCategory, BlogAuthor, BlogRedirect } from "../../../types/blog.types";
import { parseTags } from "../../../types/blog.types";
import { BlogService } from "../../../services/blog.service";
import { RichTextEditor } from "./RichTextEditor";
import { SEOPreviewPanel } from "./SEOPreviewPanel";

// Curated educational unsplash images for fast presets
const IMAGE_PRESETS = [
  {
    url: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80",
    alt: "Mathematical geometry, equations and compass on drafting desk",
    title: "Math Equations & Geometry"
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    alt: "Student learning with structured notebook and study materials",
    title: "Student Structured Study"
  },
  {
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    alt: "Classroom diagnostic learning and focused student engagement",
    title: "Classroom Diagnostic Learning"
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    alt: "Digital educational technology, interactive analytics and data",
    title: "EdTech & Analytics"
  },
  {
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    alt: "Global network visualization representing cognitive acceleration",
    title: "Cognitive Acceleration"
  }
];

export function BlogAdminManager() {
  const [view, setView] = useState<"list" | "editor" | "categories" | "redirects">("list");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [authors, setAuthors] = useState<BlogAuthor[]>([]);
  const [redirects, setRedirects] = useState<BlogRedirect[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Filter state for list view
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Form State for Editing/Creating
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    authorId: "",
    featuredImage: "",
    featuredImageAlt: "",
    status: "draft",
    isFeatured: false,
    publishedAt: new Date().toISOString().split("T")[0],
    seoTitle: "",
    seoDescription: "",
    canonicalUrl: "",
    noindex: false,
    tags: []
  });

  const [tagInput, setTagInput] = useState("");
  const [editorTab, setEditorTab] = useState<"content" | "seo" | "preview">("content");
  const [isSaving, setIsSaving] = useState(false);

  // Category Modal State
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [newCatColor, setNewCatColor] = useState("blue");

  // Redirect Modal State
  const [newRedirSource, setNewRedirSource] = useState("");
  const [newRedirTarget, setNewRedirTarget] = useState("");

  const showToast = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Fetch posts (all statuses for admin)
      const data = await BlogService.getPosts({ status: undefined, limit: 100, sortBy: "latest" });
      setPosts(data.posts || []);
      
      const cats = await BlogService.getCategories();
      setCategories(cats || []);

      const auths = await BlogService.getAuthors();
      setAuthors(auths || []);

      const redirs = await BlogService.getRedirects();
      setRedirects(redirs || []);
    } catch (e) {
      console.error("Error loading blog admin data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateNew = () => {
    const defaultAuthor = authors[0]?.id || "author-syed-ejaz-bukhari";
    const defaultCat = categories[0]?.id || "cat-personalized-learning";
    
    setEditingPostId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "<h2>Introduction</h2><p>Provide evidence-based pedagogical insights...</p>",
      categoryId: defaultCat,
      authorId: defaultAuthor,
      featuredImage: IMAGE_PRESETS[0].url,
      featuredImageAlt: IMAGE_PRESETS[0].alt,
      status: "draft",
      isFeatured: false,
      publishedAt: new Date().toISOString().split("T")[0],
      seoTitle: "",
      seoDescription: "",
      canonicalUrl: "",
      noindex: false,
      tags: ["Pedagogy", "Education", "EBM Method"]
    });
    setEditorTab("content");
    setView("editor");
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      ...post,
      tags: parseTags(post.tags),
      publishedAt: post.publishedAt ? post.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0]
    });
    setEditorTab("content");
    setView("editor");
  };

  const handleDuplicate = async (postId: string) => {
    try {
      const duplicated = await BlogService.duplicatePost(postId);
      showToast("success", `Article duplicated as draft: "${duplicated.title}"`);
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to duplicate article");
    }
  };

  const handleDelete = async (postId: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}"?`)) return;
    try {
      await BlogService.deletePost(postId);
      showToast("success", `Article "${title}" deleted successfully.`);
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to delete article");
    }
  };

  const handleAutoSlug = () => {
    if (!formData.title) return;
    const generated = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData(prev => ({ ...prev, slug: generated }));
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const clean = tagInput.trim();
    const currentTags = parseTags(formData.tags);
    if (!currentTags.includes(clean)) {
      setFormData(prev => ({
        ...prev,
        tags: [...currentTags, clean]
      }));
    }
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const currentTags = parseTags(formData.tags);
    setFormData(prev => ({
      ...prev,
      tags: currentTags.filter(t => t !== tagToRemove)
    }));
  };

  const handleSave = async (targetStatus?: "draft" | "published") => {
    if (!formData.title?.trim()) {
      showToast("error", "Article title is required.");
      return;
    }
    if (!formData.slug?.trim()) {
      showToast("error", "URL slug is required.");
      return;
    }

    setIsSaving(true);
    try {
      const payload: Partial<BlogPost> = {
        ...formData,
        status: targetStatus || formData.status || "draft",
        seoTitle: formData.seoTitle?.trim() || `${formData.title} | EBM Blog`,
        seoDescription: formData.seoDescription?.trim() || formData.excerpt?.trim()
      };

      if (editingPostId) {
        await BlogService.updatePost(editingPostId, payload);
        showToast("success", "Article updated successfully!");
      } else {
        await BlogService.createPost(payload);
        showToast("success", "New article created successfully!");
      }

      await loadData();
      setView("list");
    } catch (e: any) {
      showToast("error", e.message || "Failed to save article");
    } finally {
      setIsSaving(false);
    }
  };

  // Category Actions
  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      await BlogService.createCategory({
        name: newCatName.trim(),
        description: newCatDesc.trim(),
        color: newCatColor
      });
      setNewCatName("");
      setNewCatDesc("");
      showToast("success", "Category created successfully!");
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to create category");
    }
  };

  const handleDeleteCategory = async (catId: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await BlogService.deleteCategory(catId);
      showToast("success", "Category removed.");
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to delete category");
    }
  };

  // Redirect Actions
  const handleCreateRedirect = async () => {
    if (!newRedirSource.trim() || !newRedirTarget.trim()) return;
    try {
      await BlogService.createRedirect(newRedirSource.trim(), newRedirTarget.trim(), 301);
      setNewRedirSource("");
      setNewRedirTarget("");
      showToast("success", "301 Redirect created successfully!");
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to create redirect");
    }
  };

  const handleDeleteRedirect = async (redirId: string) => {
    try {
      await BlogService.deleteRedirect(redirId);
      showToast("success", "Redirect removed.");
      await loadData();
    } catch (e: any) {
      showToast("error", e.message || "Failed to delete redirect");
    }
  };

  // Filtered posts for list
  const filteredPosts = posts.filter(p => {
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    const matchCategory = categoryFilter === "all" || p.categoryId === categoryFilter;

    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="space-y-6">
      
      {/* Notification Toast */}
      {notification && (
        <div className={`p-4 rounded-2xl flex items-center justify-between text-sm font-semibold shadow-lg transition-all ${
          notification.type === "success"
            ? "bg-emerald-50 border border-emerald-200 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 dark:border-emerald-800"
            : "bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200 dark:border-rose-800"
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === "success" ? <CheckCircle className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-xs opacity-75 hover:opacity-100">
            Dismiss
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. LIST VIEW (Articles Management Dashboard) */}
      {/* ========================================================================= */}
      {view === "list" && (
        <div className="space-y-6">
          
          {/* Header & Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                  EBM CMS Engine
                </span>
                <span className="text-xs text-slate-500 font-mono">• {posts.length} total articles</span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                Educational Blog & Publication Manager
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Author, schedule, edit, and optimize SEO-ready pedagogical articles for the EBM publication.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setView("categories")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-xs"
              >
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Categories</span>
              </button>

              <button
                type="button"
                onClick={() => setView("redirects")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-2 shadow-xs"
              >
                <LinkIcon className="w-4 h-4 text-slate-500" />
                <span>301 Redirects</span>
              </button>

              <button
                type="button"
                onClick={handleCreateNew}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition flex items-center gap-2 shadow-md hover:shadow-blue-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
            </div>
          </div>

          {/* Filters & Search Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, slug, or topic..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400">
                <Filter className="w-3.5 h-3.5" />
                <span>Status:</span>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="scheduled">Scheduled</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={loadData}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 transition"
                title="Refresh articles list"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-blue-600" : ""}`} />
              </button>
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-4 py-4">Category</th>
                    <th className="px-4 py-4">Author</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Published Date</th>
                    <th className="px-4 py-4 text-center">Views</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {filteredPosts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                        No articles match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                        <td className="px-6 py-4 max-w-sm">
                          <div className="flex items-center gap-3">
                            {post.featuredImage ? (
                              <img
                                src={post.featuredImage}
                                alt={post.title}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-400">
                                <FileText className="w-5 h-5" />
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1 text-sm hover:text-blue-600 transition">
                                {post.title}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                                <span>/blog/{post.slug}</span>
                                {post.isFeatured && (
                                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-1.5 py-0.5 rounded">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {post.categoryName || "Education"}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                          {post.authorName || "Syed Ejaz Bukhari"}
                        </td>

                        <td className="px-4 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                            post.status === "published"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                              : post.status === "draft"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                              : post.status === "scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                              : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                          }`}>
                            {post.status === "published" && <CheckCircle className="w-3 h-3" />}
                            {post.status === "draft" && <Clock className="w-3 h-3" />}
                            {post.status}
                          </span>
                        </td>

                        <td className="px-4 py-4 text-slate-500 font-mono text-[11px]">
                          {post.publishedAt ? post.publishedAt.split("T")[0] : "—"}
                        </td>

                        <td className="px-4 py-4 text-center">
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                            title={`${post.views ?? 0} authentic article views`}
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>{post.views ?? 0}</span>
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {post.status === "published" && (
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                                title="View public article in new tab"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDuplicate(post.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                              title="Duplicate as draft"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleEdit(post)}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition"
                              title="Edit article"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id, post.title)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition"
                              title="Delete article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. POST EDITOR VIEW */}
      {/* ========================================================================= */}
      {view === "editor" && (
        <div className="space-y-6">
          
          {/* Top Bar Navigation & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView("list")}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                title="Back to articles list"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {editingPostId ? "Editing Article" : "Create New Publication"}
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white line-clamp-1">
                  {formData.title || "Untitled Article"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Editor View Mode Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setEditorTab("content")}
                  className={`px-3 py-1.5 rounded-lg transition ${editorTab === "content" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                >
                  Editor & Content
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab("seo")}
                  className={`px-3 py-1.5 rounded-lg transition ${editorTab === "seo" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                >
                  SEO & Meta
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab("preview")}
                  className={`px-3 py-1.5 rounded-lg transition ${editorTab === "preview" ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs" : "text-slate-600 dark:text-slate-400"}`}
                >
                  SERP & Social Preview
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Save as Draft
              </button>

              <button
                type="button"
                onClick={() => handleSave("published")}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition flex items-center gap-2 shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Publish Article"}</span>
              </button>
            </div>
          </div>

          {/* Editor Tabs Body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left/Main Column (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* TAB 1: Content Editor */}
              {editorTab === "content" && (
                <div className="space-y-6">
                  
                  {/* Article Title */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Article Title (Single H1 on public page) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        onBlur={!formData.slug ? handleAutoSlug : undefined}
                        placeholder="e.g. How Socratic AI Co-Pilots Accelerate Early Mathematics Derivation"
                        className="w-full text-lg font-bold px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Slug input with auto button */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          URL Slug <span className="text-rose-500">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={handleAutoSlug}
                          className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" />
                          Auto-generate from title
                        </button>
                      </div>
                      <div className="flex items-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-xs font-mono text-slate-500">
                        <span>https://ejazbukharimethod.com/blog/</span>
                        <input
                          type="text"
                          value={formData.slug || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") }))}
                          placeholder="article-slug"
                          className="bg-transparent text-slate-900 dark:text-white font-bold focus:outline-none flex-1 ml-0.5"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        If you modify a published slug, a 301 redirect will automatically be established from the old slug.
                      </p>
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Summary / Excerpt (Used in blog cards, RSS feeds, and default meta description)
                      </label>
                      <textarea
                        value={formData.excerpt || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                        placeholder="Write a clear, concise 2-sentence summary of what educators and parents will learn from this article..."
                        className="w-full text-xs px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Rich Text Editor */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Article Body (Rich Text & Semantic Markup)
                    </label>
                    <RichTextEditor
                      value={formData.content || ""}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    />
                  </div>

                </div>
              )}

              {/* TAB 2: SEO Meta Settings */}
              {editorTab === "seo" && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Search Engine Optimization Settings
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Configure custom meta tags, social sharing cards, canonical tags, and indexing rules.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Custom SEO Meta Title (Optional)
                        </label>
                        <span className="text-[11px] font-mono text-slate-400">
                          {(formData.seoTitle || formData.title || "").length} / 60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.seoTitle || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                        placeholder={formData.title ? `${formData.title} | EBM Blog` : "e.g. Socratic AI in Math Education | EBM"}
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Custom SEO Meta Description (Optional)
                        </label>
                        <span className="text-[11px] font-mono text-slate-400">
                          {(formData.seoDescription || formData.excerpt || "").length} / 160 chars
                        </span>
                      </div>
                      <textarea
                        value={formData.seoDescription || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                        rows={3}
                        placeholder={formData.excerpt || "Enter specific search description..."}
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Canonical URL (Optional override)
                      </label>
                      <input
                        type="text"
                        value={formData.canonicalUrl || ""}
                        onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                        placeholder={`https://ejazbukharimethod.com/blog/${formData.slug || "article-slug"}`}
                        className="w-full text-xs px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="noindex-toggle"
                        checked={formData.noindex || false}
                        onChange={(e) => setFormData(prev => ({ ...prev, noindex: e.target.checked }))}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                      />
                      <label htmlFor="noindex-toggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        Apply <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">noindex, nofollow</code> (Exclude this specific article from search engine indexes)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SERP & Social Preview */}
              {editorTab === "preview" && (
                <SEOPreviewPanel
                  title={formData.title || ""}
                  seoTitle={formData.seoTitle || ""}
                  slug={formData.slug || ""}
                  excerpt={formData.excerpt || ""}
                  seoDescription={formData.seoDescription || ""}
                  content={formData.content || ""}
                  featuredImage={formData.featuredImage || ""}
                  featuredImageAlt={formData.featuredImageAlt || ""}
                  categoryName={categories.find(c => c.id === formData.categoryId)?.name || "Education"}
                  canonicalUrl={formData.canonicalUrl}
                  noindex={formData.noindex}
                />
              )}

            </div>

            {/* Right Sidebar Column (Publishing & Metadata options) */}
            <div className="space-y-6">
              
              {/* Publishing Controls */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>Publishing & Status</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={formData.status || "draft"}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="published">Published (Live to public & sitemap)</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Publication Date
                    </label>
                    <input
                      type="date"
                      value={formData.publishedAt || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="featured-toggle"
                      checked={formData.isFeatured || false}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <label htmlFor="featured-toggle" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Pin as Featured Article (Highlight on Blog Home & Homepage)
                    </label>
                  </div>
                </div>
              </div>

              {/* Taxonomy: Category & Author */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Category & Author</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Primary Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.categoryId || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Article Author
                    </label>
                    <select
                      value={formData.authorId || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorId: e.target.value }))}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      {authors.map((auth) => (
                        <option key={auth.id} value={auth.id}>
                          {auth.name} ({auth.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Tags
                    </label>
                    <div className="flex items-center gap-1.5 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                        placeholder="Add tag and press Enter..."
                        className="w-full text-xs px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddTag}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-bold hover:bg-slate-300"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {parseTags(formData.tags).map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        >
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(t)}
                            className="hover:text-rose-500"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image Selector */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-emerald-600" />
                  <span>Featured Image & Alt Text</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Image URL
                    </label>
                    <input
                      type="text"
                      value={formData.featuredImage || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Image Alt Text (Accessibility & SEO) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.featuredImageAlt || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImageAlt: e.target.value }))}
                      placeholder="Describe the image content accurately..."
                      className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.featuredImage && (
                    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img
                        src={formData.featuredImage}
                        alt={formData.featuredImageAlt || "Article thumbnail preview"}
                        className="w-full h-32 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Preset Library Buttons */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1.5">
                      Or choose from educational presets:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5">
                      {IMAGE_PRESETS.map((preset) => (
                        <button
                          key={preset.title}
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            featuredImage: preset.url,
                            featuredImageAlt: preset.alt
                          }))}
                          className="text-left p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-[10px] font-semibold text-slate-700 dark:text-slate-300 transition line-clamp-1"
                        >
                          {preset.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CATEGORIES MANAGER VIEW */}
      {/* ========================================================================= */}
      {view === "categories" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView("list")}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Blog Categories Manager
                </h2>
                <p className="text-xs text-slate-500">
                  Organize publication topics and maintain dedicated category landing pages.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Create Category Form */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Create New Category</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Category Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Cognitive Acceleration"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    rows={3}
                    placeholder="Brief description of the pedagogical topic..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Color Accent
                  </label>
                  <select
                    value={newCatColor}
                    onChange={(e) => setNewCatColor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  >
                    <option value="blue">Blue</option>
                    <option value="emerald">Emerald</option>
                    <option value="amber">Amber</option>
                    <option value="purple">Purple</option>
                    <option value="cyan">Cyan</option>
                    <option value="rose">Rose</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleCreateCategory}
                  disabled={!newCatName.trim()}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-50 transition shadow-xs"
                >
                  Create Category
                </button>
              </div>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-2 space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {cat.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        /blog/category/{cat.slug}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {cat.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {cat.postCount || 0} articles
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. REDIRECTS (301) MANAGER VIEW */}
      {/* ========================================================================= */}
      {view === "redirects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setView("list")}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  301 Permanent Redirects Engine
                </h2>
                <p className="text-xs text-slate-500">
                  Manage URL redirects to preserve link equity and ensure 0 broken links when slugs are modified.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Create Redirect Form */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Create 301 Redirect</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Old Slug (Source) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRedirSource}
                    onChange={(e) => setNewRedirSource(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="old-article-slug"
                    className="w-full px-3 py-2 font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                    Target Slug (Destination) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newRedirTarget}
                    onChange={(e) => setNewRedirTarget(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    placeholder="new-optimized-slug"
                    className="w-full px-3 py-2 font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleCreateRedirect}
                  disabled={!newRedirSource.trim() || !newRedirTarget.trim()}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs disabled:opacity-50 transition shadow-xs"
                >
                  Create 301 Rule
                </button>
              </div>
            </div>

            {/* Redirects Table */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Source Old Path</th>
                    <th className="px-6 py-4">Destination Target</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {redirects.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400 font-sans">
                        No active 301 redirects recorded.
                      </td>
                    </tr>
                  ) : (
                    redirects.map((redir) => (
                      <tr key={redir.id}>
                        <td className="px-6 py-3.5 text-slate-600 dark:text-slate-300">
                          /blog/{redir.sourceSlug}
                        </td>
                        <td className="px-6 py-3.5 text-blue-600 font-bold">
                          /blog/{redir.targetSlug}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {redir.statusCode || 301} Permanent
                          </span>
                        </td>
                        <td className="px-6 py-3.5 text-right font-sans">
                          <button
                            type="button"
                            onClick={() => handleDeleteRedirect(redir.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
