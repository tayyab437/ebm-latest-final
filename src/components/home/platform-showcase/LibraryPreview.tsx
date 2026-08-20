import React from "react";
import { motion } from "motion/react";
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Video, 
  Layers, 
  Bookmark, 
  ChevronRight 
} from "lucide-react";
import { LIBRARY_DATA } from "./dashboard.constants";

export const LibraryPreview: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Upper Header Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/10 dark:border-blue-500/20 rounded-2xl">
        <div>
          <span className="text-2xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            EBM Knowledge Repository
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-1">
            Socratic Digital Library 📚
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access hundreds of video micro-lectures, high-density study notebooks, worksheets, and syllabus PDFs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search library resources..." 
              className="pl-9 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-blue-500 transition-colors w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Main library double-column list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns - Library Resources */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-4">
              Featured Study Assets & Guides
            </h4>
            <div className="space-y-4">
              {LIBRARY_DATA.map((resource) => (
                <div 
                  key={resource.id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {resource.format === "PDF" ? (
                        <FileText className="h-5 w-5 text-red-500" />
                      ) : resource.format === "Video" ? (
                        <Video className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Layers className="h-5 w-5 text-purple-500" />
                      )}
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                        {resource.title}
                      </h5>
                      <p className="text-xs text-slate-400">
                        {resource.subject} &bull; {resource.sizeOrDuration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-500 transition-colors">
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: syllabus bookmarks and filters */}
        <div className="space-y-6">
          {/* Library categories selector */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-3">
              Explore Resource Categories
            </h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-800 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-zinc-850 transition-colors">
                <span>Video Lectures (84 items)</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-800 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-zinc-850 transition-colors">
                <span>Revision Notes (120 items)</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-800 rounded-xl text-left text-xs text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-zinc-850 transition-colors">
                <span>Socratic Worksheets (45 items)</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Bookmarked resources quick stats */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50 mb-2">Bookmarks</h4>
            <p className="text-2xs text-slate-400">
              You have pinned 4 resources recently for active recall study.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
