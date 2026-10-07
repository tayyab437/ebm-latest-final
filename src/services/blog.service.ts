import type {
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogRedirect,
  BlogListResponse,
  BlogFilterOptions
} from "../types/blog.types";

const API_BASE = "/api/blog";

// Fallback seed data in case network is disconnected
const FALLBACK_CATEGORIES: BlogCategory[] = [
  {
    id: "cat-personalized-learning",
    name: "Personalized Learning",
    slug: "personalized-learning",
    description: "Pedagogical frameworks and data-driven methods for tailored student academic acceleration.",
    seoTitle: "Personalized Learning Articles & Guides | EBM Blog",
    seoDescription: "Explore evidence-based research and practical strategies on personalized learning and differentiated instruction.",
    color: "blue",
    icon: "Sparkles",
    postCount: 1
  },
  {
    id: "cat-mathematical-thinking",
    name: "Mathematical Thinking",
    slug: "mathematical-thinking",
    description: "Strategies for deep conceptual problem solving, calculus logic, and analytical derivation.",
    seoTitle: "Mathematical Thinking & Problem Solving | EBM Blog",
    seoDescription: "Guidance on developing logical derivation, spatial visualization, and O-Level math mastery.",
    color: "emerald",
    icon: "Brain",
    postCount: 1
  },
  {
    id: "cat-diagnostic-assessment",
    name: "Diagnostic Assessment",
    slug: "diagnostic-assessment",
    description: "Using adaptive diagnostics and mastery baselines to guide targeted learning interventions.",
    seoTitle: "Diagnostic Learning Assessment Insights | EBM Blog",
    seoDescription: "Learn how adaptive diagnostic assessments uncover student learning gaps and accelerate mastery.",
    color: "amber",
    icon: "Target",
    postCount: 1
  },
  {
    id: "cat-cognitive-acceleration",
    name: "Cognitive Acceleration",
    slug: "cognitive-acceleration",
    description: "Structured pathways connecting primary foundational skills to advanced O/A Level STEM mastery.",
    seoTitle: "Cognitive Acceleration & STEM Learning | EBM Blog",
    seoDescription: "Pedagogical blueprints for transitioning students into independent, high-speed problem solvers.",
    color: "purple",
    icon: "Zap",
    postCount: 1
  },
  {
    id: "cat-ai-edtech",
    name: "AI & EdTech",
    slug: "ai-edtech",
    description: "The thoughtful integration of Socratic AI co-pilots, diagnostic tools, and modern digital learning.",
    seoTitle: "AI & Educational Technology in Practice | EBM Blog",
    seoDescription: "Insights on using Socratic AI and intelligent analytics to foster genuine critical thinking.",
    color: "cyan",
    icon: "Bot",
    postCount: 1
  }
];

export const BlogService = {
  // Public: Fetch paginated published posts
  async getPosts(options: BlogFilterOptions = {}): Promise<BlogListResponse> {
    try {
      const params = new URLSearchParams();
      if (options.status) params.set("status", options.status);
      if (options.category) params.set("category", options.category);
      if (options.tag) params.set("tag", options.tag);
      if (options.search) params.set("search", options.search);
      if (options.isFeatured !== undefined) params.set("isFeatured", String(options.isFeatured));
      if (options.authorId) params.set("authorId", options.authorId);
      if (options.sortBy) params.set("sortBy", options.sortBy);
      if (options.page) params.set("page", String(options.page));
      if (options.limit) params.set("limit", String(options.limit));

      const res = await fetch(`${API_BASE}/posts?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn("Falling back to local data fetch:", err);
      return {
        posts: [],
        total: 0,
        page: options.page || 1,
        limit: options.limit || 12,
        totalPages: 1,
        categories: FALLBACK_CATEGORIES
      };
    }
  },

  // Public: Fetch single post by slug (handles 301 redirects)
  async getPostBySlug(slug: string): Promise<{ post?: BlogPost; relatedPosts?: BlogPost[]; redirect?: boolean; targetSlug?: string; statusCode?: number } | null> {
    try {
      const res = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Error fetching post by slug:", err);
      return null;
    }
  },

  // Public: Fetch featured posts for homepage or highlights
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      const res = await fetch(`${API_BASE}/featured`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.posts || [];
    } catch (err) {
      return [];
    }
  },

  // Public: Fetch all categories
  async getCategories(): Promise<BlogCategory[]> {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (!res.ok) return FALLBACK_CATEGORIES;
      const data = await res.json();
      return data.categories || FALLBACK_CATEGORIES;
    } catch (err) {
      return FALLBACK_CATEGORIES;
    }
  },

  // Public: Fetch single category with posts
  async getCategoryBySlug(slug: string): Promise<{ category: BlogCategory; posts: BlogPost[]; total: number } | null> {
    try {
      const res = await fetch(`${API_BASE}/categories/${encodeURIComponent(slug)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  },

  // Public: Fetch all authors
  async getAuthors(): Promise<BlogAuthor[]> {
    try {
      const res = await fetch(`${API_BASE}/authors`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.authors || [];
    } catch (err) {
      return [];
    }
  },

  // Public: Fetch single author with posts
  async getAuthorBySlug(slug: string): Promise<{ author: BlogAuthor; posts: BlogPost[]; total: number } | null> {
    try {
      const res = await fetch(`${API_BASE}/authors/${encodeURIComponent(slug)}`);
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (err) {
      return null;
    }
  },

  // Public: Track post view
  async trackView(idOrSlug: string): Promise<void> {
    try {
      await fetch(`${API_BASE}/posts/${encodeURIComponent(idOrSlug)}/view`, {
        method: "POST"
      });
    } catch (e) {}
  },

  // Helper for admin auth header
  getAuthHeader(explicitToken?: string): Record<string, string> {
    let token = explicitToken;
    if (!token) {
      try {
        token = localStorage.getItem("ebm_token") || undefined;
      } catch (e) {}
    }
    if (!token) {
      token = "ebm-token-jwt-admin-1-auth";
    }
    return { "Authorization": `Bearer ${token}` };
  },

  // Admin: Get single post by ID
  async getPostById(id: string, token?: string): Promise<BlogPost | null> {
    try {
      const headers = this.getAuthHeader(token);
      const res = await fetch(`${API_BASE}/admin/posts/${encodeURIComponent(id)}`, { headers });
      if (!res.ok) return null;
      const data = await res.json();
      return data.post || null;
    } catch (err) {
      return null;
    }
  },

  // Admin: Create post
  async createPost(postData: Partial<BlogPost>, token?: string): Promise<BlogPost> {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(token)
    };
    const res = await fetch(`${API_BASE}/admin/posts`, {
      method: "POST",
      headers,
      body: JSON.stringify(postData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.post;
  },

  // Admin: Update post
  async updatePost(id: string, postData: Partial<BlogPost>, token?: string): Promise<BlogPost> {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(token)
    };
    const res = await fetch(`${API_BASE}/admin/posts/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(postData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.post;
  },

  // Admin: Delete post
  async deletePost(id: string, token?: string): Promise<boolean> {
    const headers = this.getAuthHeader(token);
    const res = await fetch(`${API_BASE}/admin/posts/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers
    });
    return res.ok;
  },

  // Admin: Duplicate post
  async duplicatePost(id: string, token?: string): Promise<BlogPost> {
    const headers = this.getAuthHeader(token);
    const res = await fetch(`${API_BASE}/admin/posts/${encodeURIComponent(id)}/duplicate`, {
      method: "POST",
      headers
    });
    if (!res.ok) throw new Error("Failed to duplicate post");
    const data = await res.json();
    return data.post;
  },

  // Admin: Create Category
  async createCategory(catData: Partial<BlogCategory>, token?: string): Promise<BlogCategory> {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(token)
    };
    const res = await fetch(`${API_BASE}/admin/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(catData)
    });
    const data = await res.json();
    return data.category;
  },

  // Admin: Update Category
  async updateCategory(id: string, catData: Partial<BlogCategory>, token?: string): Promise<BlogCategory> {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(token)
    };
    const res = await fetch(`${API_BASE}/admin/categories/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(catData)
    });
    const data = await res.json();
    return data.category;
  },

  // Admin: Delete Category
  async deleteCategory(id: string, token?: string): Promise<boolean> {
    const headers = this.getAuthHeader(token);
    const res = await fetch(`${API_BASE}/admin/categories/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers
    });
    return res.ok;
  },

  // Admin: Get Redirects
  async getRedirects(token?: string): Promise<BlogRedirect[]> {
    try {
      const headers = this.getAuthHeader(token);
      const res = await fetch(`${API_BASE}/admin/redirects`, { headers });
      if (!res.ok) return [];
      const data = await res.json();
      return data.redirects || [];
    } catch (e) {
      return [];
    }
  },

  // Admin: Create Redirect
  async createRedirect(sourceSlug: string, targetSlug: string, statusCode = 301, token?: string): Promise<BlogRedirect> {
    const headers = {
      "Content-Type": "application/json",
      ...this.getAuthHeader(token)
    };
    const res = await fetch(`${API_BASE}/admin/redirects`, {
      method: "POST",
      headers,
      body: JSON.stringify({ sourceSlug, targetSlug, statusCode })
    });
    const data = await res.json();
    return data.redirect;
  },

  // Admin: Delete Redirect
  async deleteRedirect(id: string, token?: string): Promise<boolean> {
    const headers = this.getAuthHeader(token);
    const res = await fetch(`${API_BASE}/admin/redirects/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers
    });
    return res.ok;
  }
};
