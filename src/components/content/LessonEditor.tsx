import React, { useState } from "react";
import { useContentStore } from "./content.store";
import {
  Save,
  Eye,
  Send,
  MoreVertical,
  Bold,
  Italic,
  List,
  Image as ImageIcon,
  Video,
  Paperclip,
} from "lucide-react";

export function LessonEditor() {
  const [title, setTitle] = useState("New Lesson");
  const [content, setContent] = useState("");

  return (
    <div className="h-full flex flex-col animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-black text-white uppercase tracking-tight bg-transparent border-none outline-none focus:ring-0 p-0 placeholder-slate-600 w-full max-w-xl"
            placeholder="LESSON TITLE..."
          />
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-0.5 rounded bg-slate-500/10 text-slate-400 text-[9px] font-black uppercase tracking-widest">
              Draft
            </span>
            <span className="text-[10px] font-bold text-slate-500">
              Unsaved changes
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
            <Save className="h-4 w-4" /> Save Draft
          </button>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
            <Send className="h-4 w-4" /> Submit for Review
          </button>
          <button className="h-9 w-9 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-400 transition-colors border border-white/5 bg-[#0A1120]">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#0A1120] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col">
        {/* Editor Toolbar */}
        <div className="p-2 border-b border-white/5 bg-black/20 flex items-center gap-1 shrink-0">
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Bold className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Italic className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <List className="h-4 w-4" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-1" />
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <ImageIcon className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Video className="h-4 w-4" />
          </button>
          <button className="p-2 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <Paperclip className="h-4 w-4" />
          </button>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing your lesson content here... Use the toolbar to format or insert media. This is a rich text authoring surface."
            className="w-full h-full min-h-[400px] bg-transparent border-none outline-none resize-none text-sm text-slate-300 leading-relaxed placeholder-slate-600 font-sans"
          />
        </div>
      </div>
    </div>
  );
}
