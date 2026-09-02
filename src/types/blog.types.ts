export type PostStatus = "draft" | "published" | "archived" | "scheduled";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Semantic HTML
  categoryId: string;
  categoryName?: string;
  categorySlug?: string;
  categoryColor?: string;
  secondaryCategoryIds?: string[];
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption?: string;
  authorId: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  authorSlug?: string;
  authorBio?: string;
  status: PostStatus;
  isFeatured: boolean;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  readingTime: number; // in minutes
  tags: string[];
  relatedPostIds?: string[];
  noindex?: boolean;
  views: number;
  ctaType?: "assessment" | "analytics" | "programs" | "learning" | "contact" | "custom";
  ctaLink?: string;
  ctaText?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  color?: string;
  icon?: string;
  postCount?: number;
  createdAt?: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  bio: string;
  role: string;
  avatarUrl?: string;
  email?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  postCount?: number;
  createdAt?: string;
}

export interface BlogRedirect {
  id: string;
  sourceSlug: string;
  targetSlug: string;
  statusCode: number; // 301
  createdAt: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: BlogCategory[];
  featuredPosts?: BlogPost[];
}

export interface BlogFilterOptions {
  search?: string;
  category?: string;
  tag?: string;
  status?: PostStatus | "all";
  isFeatured?: boolean;
  authorId?: string;
  sortBy?: "latest" | "oldest" | "title" | "popular" | "reading_time";
  page?: number;
  limit?: number;
}

export function parseTags(tags: any): string[] {
  if (Array.isArray(tags)) {
    return tags.map(t => String(t).trim()).filter(Boolean);
  }
  if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(t => String(t).trim()).filter(Boolean);
      }
      if (typeof parsed === "string") {
        return parsed.split(",").map(t => t.trim()).filter(Boolean);
      }
    } catch (_) {}
    return trimmed.split(",").map(t => t.trim()).filter(Boolean);
  }
  return [];
}
