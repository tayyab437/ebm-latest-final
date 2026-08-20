import React from "react";
import { useContentStore } from "./content.store";
import {
  ChevronRight,
  ChevronDown,
  BookOpen,
  Folder,
  FileText,
  Plus,
  MoreVertical,
} from "lucide-react";
import { CurriculumNode, ContentType, ContentStatus } from "./content.types";
import clsx from "clsx";

export function CurriculumTree() {
  const { curriculumTree, setCurrentView } = useContentStore();

  const getStatusColor = (status: ContentStatus) => {
    switch (status) {
      case ContentStatus.PUBLISHED:
        return "text-emerald-500 bg-emerald-500/10";
      case ContentStatus.IN_REVIEW:
        return "text-amber-500 bg-amber-500/10";
      case ContentStatus.DRAFT:
        return "text-slate-400 bg-slate-500/10";
      default:
        return "text-slate-400 bg-slate-500/10";
    }
  };

  const getIcon = (type: ContentType) => {
    switch (type) {
      case ContentType.UNIT:
        return <BookOpen className="h-4 w-4" />;
      case ContentType.CHAPTER:
        return <Folder className="h-4 w-4" />;
      case ContentType.LESSON:
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderNode = (node: CurriculumNode, level: number = 0) => {
    return (
      <div key={node.id} className="w-full">
        <div
          className="flex items-center justify-between p-3 hover:bg-white/[0.02] border-b border-white/5 transition-colors group"
          style={{ paddingLeft: `${level * 1.5 + 1}rem` }}
        >
          <div className="flex items-center gap-3">
            {node.children && node.children.length > 0 ? (
              <button className="p-1 hover:bg-white/10 rounded">
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </button>
            ) : (
              <div className="w-5" />
            )}
            <div className="text-slate-400">{getIcon(node.type)}</div>
            <span className="text-xs font-bold text-white">{node.title}</span>
            <span
              className={clsx(
                "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest",
                getStatusColor(node.status),
              )}
            >
              {node.status}
            </span>
          </div>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                if (node.type === ContentType.LESSON) {
                  setCurrentView("editor");
                }
              }}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest transition-colors"
            >
              Edit
            </button>
            <button className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>
        {node.children && node.children.length > 0 && (
          <div className="w-full">
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Curriculum Structure
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Manage Units, Chapters, and Lessons
          </p>
        </div>
        <button className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Unit
        </button>
      </div>

      <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Structure
          </span>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pr-20">
            Actions
          </span>
        </div>
        <div className="w-full">
          {curriculumTree.map((node) => renderNode(node))}
          {curriculumTree.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
              No curriculum structure found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
