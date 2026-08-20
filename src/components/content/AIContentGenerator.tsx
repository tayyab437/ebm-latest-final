import React, { useState } from "react";
import { useContentStore } from "./content.store";
import { Sparkles, Loader2, Copy, Check, FileText } from "lucide-react";

export function AIContentGenerator() {
  const { generateAIContent, isLoading } = useContentStore();
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("LESSON_DRAFT");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    const result = await generateAIContent(prompt, type);
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-purple-500" /> AI Studio
          </h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">
            Generative Learning Content
          </p>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        <div className="w-1/3 flex flex-col gap-6 shrink-0 overflow-y-auto custom-scrollbar">
          <div className="bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 flex flex-col gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Generation Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500/50 uppercase tracking-wider font-bold"
              >
                <option value="LESSON_DRAFT">Lesson Draft</option>
                <option value="WORKSHEET">Worksheet Questions</option>
                <option value="VOCABULARY">Vocabulary List</option>
                <option value="RUBRIC">Grading Rubric</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col min-h-[200px]">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Instructions / Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Generate a Grade 8 Science lesson on Force Vectors. Include learning objectives and 3 interactive examples."
                className="w-full flex-1 bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-300 focus:outline-none focus:border-purple-500/50 resize-none font-sans"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-4 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isLoading ? "Generating..." : "Generate Content"}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#0A1120] rounded-[2rem] border border-white/5 p-6 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-4 shrink-0 border-b border-white/5 pb-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-500" /> Output
            </h3>
            {output && (
              <button
                onClick={handleCopy}
                className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20 rounded-xl p-6 border border-white/5">
            {output ? (
              <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                <Sparkles className="h-8 w-8 mb-4 opacity-50" />
                <p className="text-xs font-bold uppercase tracking-widest max-w-xs">
                  Configure your prompt and click generate to create AI-assisted
                  content.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
