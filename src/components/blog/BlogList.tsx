import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Sparkles,
  Rss,
  Layers,
  ArrowRight,
  TrendingUp,
  Filter,
  CheckCircle2,
  Calendar,
  Clock,
  User
} from "lucide-react";
import type { BlogPost, BlogCategory } from "../../types/blog.types";
import { BlogService } from "../../services/blog.service";
import { BlogCard } from "./BlogCard";
import { SEOHead } from "../SEOHead";

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchBlogData = async () => {
      setIsLoading(true);
      try {
        const catFilter = selectedCategory === "all" ? undefined : selectedCategory;
        const res = await BlogService.getPosts({
          status: "published",
          category: catFilter,
          search: searchQuery || undefined,
          page: currentPage,
          limit: 9,
          sortBy: "latest"
        });

        setPosts(res.posts || []);
        setTotalPages(res.totalPages || 1);
        setTotalPosts(res.total || 0);

        if (categories.length === 0) {
          const cats = await BlogService.getCategories();
          setCategories(cats || []);
        }
      } catch (err) {
        console.error("Error loading blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [selectedCategory, searchQuery, currentPage]);

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const regularPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Route-Aware SEO & Structured Data */}
      <SEOHead
        title="EBM Blog | Educational Perspectives, Mathematics & Learning Insights"
        description="Explore research-backed educational perspectives, mathematical problem-solving strategies, and personalized learning insights from the Ejaz Bukhari Method."
        canonicalUrl="https://ejazbukharimethod.com/blog"
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-bold" aria-current="page">Blog</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The EBM Publication & Pedagogical Insights</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
                Evidence-Based Learning, Mathematics & Cognitive Acceleration
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Explore deep educational insights, problem-solving methodologies, diagnostic frameworks, and Socratic AI perspectives curated by Syed Ejaz Bukhari and the EBM academic team.
              </p>
            </div>

            {/* RSS and Fast Search Widget */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search articles & topics..."
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
                />
              </div>

              <a
                href="/rss.xml"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 bg-slate-50 dark:bg-slate-800 transition flex items-center justify-center gap-2 shadow-xs"
                title="Subscribe to RSS Feed"
              >
                <Rss className="w-4 h-4 text-amber-500" />
                <span>RSS Feed</span>
              </a>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              All Topics ({totalPosts})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-xs flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <span>{cat.name}</span>
                {cat.postCount !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.id ? "bg-blue-700 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                  }`}>
                    {cat.postCount}
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Articles Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        
        {/* Top Featured Post Highlight (when on page 1 with no heavy search) */}
        {!searchQuery && selectedCategory === "all" && currentPage === 1 && featuredPost && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Image Side */}
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[440px] bg-slate-900 overflow-hidden">
                {featuredPost.featuredImage ? (
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.featuredImageAlt || featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 text-white/50 text-sm font-bold">
                    Featured EBM Educational Perspective
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  ★ Lead Editorial Story
                </div>
              </div>

              {/* Text Side */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                      {featuredPost.categoryName || "Education"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime || 5} min read
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link to={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {featuredPost.authorAvatar ? (
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.authorName || "Author"}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                        EB
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {featuredPost.authorName || "Syed Ejaz Bukhari"}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition hover:translate-x-0.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== "all" ? `${categories.find(c => c.id === selectedCategory)?.name || "Category"} Articles` : "Recent Publications"}
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Showing {posts.length} of {totalPosts} articles
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                  <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                  <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="w-full h-6 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="w-3/4 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No matching articles found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try adjusting your search query or selecting a different category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                    currentPage === pageNum
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* EBM Diagnostic Assessment Banner Callout */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-blue-900/50 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Personalized Learning Baseline
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Identify Exactly Where Your Child Excels & Where Gaps Exist
            </h3>
            <p className="text-sm text-blue-200/80 leading-relaxed">
              Take the research-backed EBM Diagnostic Assessment. Uncover cognitive baselines, conceptual retention, and receive an instant personalized academic roadmap.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/assessment"
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition hover:translate-x-0.5"
              >
                <span>Take Diagnostic Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/analytics"
                className="px-6 py-3 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition"
              >
                <span>Explore Learning Analytics</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
