import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Layers, Sparkles } from "lucide-react";
import type { BlogPost, BlogCategory } from "../../types/blog.types";
import { BlogService } from "../../services/blog.service";
import { generateBlogCategoryStructuredData, sanitizeMetaTitle, sanitizeMetaDescription } from "../../services/seo.schema";
import { SEOHead } from "../SEOHead";
import { BlogCard } from "./BlogCard";

export function BlogCategoryView() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        const cats = await BlogService.getCategories();
        const found = cats.find(c => c.slug === slug);
        setCategory(found || null);

        if (found) {
          const res = await BlogService.getPosts({
            status: "published",
            category: found.id,
            limit: 20
          });
          setPosts(res.posts || []);
        }
      } catch (err) {
        console.error("Error loading category data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse space-y-8">
          <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="w-96 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="text-center max-w-md space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Category Not Found
          </h1>
          <p className="text-xs text-slate-500">
            The article topic you requested does not exist or has been modified.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Blog Hub</span>
          </Link>
        </div>
      </div>
    );
  }

  const structuredData = generateBlogCategoryStructuredData({
    name: category.name,
    slug: category.slug,
    description: category.description
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Category SEO */}
      <SEOHead
        title={sanitizeMetaTitle(`${category.name} Articles & Guides | EBM Education`)}
        description={sanitizeMetaDescription(category.description || `Read research-backed educational perspectives and strategies in ${category.name} from the Ejaz Bukhari Method.`)}
        canonicalUrl={`https://ejazbukharimethod.com/blog/category/${category.slug}`}
        customSchema={structuredData}
      />

      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-600">Blog</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold" aria-current="page">{category.name}</span>
          </nav>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
            <Layers className="w-3.5 h-3.5" />
            <span>Topic Archive</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {category.name}
          </h1>

          {category.description && (
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}

          <div className="text-xs font-mono text-slate-400">
            {posts.length} published {posts.length === 1 ? "article" : "articles"} in this collection
          </div>

        </div>
      </header>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold">No articles currently published in this topic</h3>
            <Link to="/blog" className="text-xs font-bold text-blue-600 hover:underline inline-block">
              Browse all articles in the EBM Blog &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
