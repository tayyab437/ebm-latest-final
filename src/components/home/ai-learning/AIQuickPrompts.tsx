import React from "react";
import * as Icons from "lucide-react";
import { QuickPrompt } from "./ai-learning.types";

interface AIQuickPromptsProps {
  prompts: QuickPrompt[];
  onSelectPrompt: (promptText: string) => void;
  disabled?: boolean;
}

export const AIQuickPrompts: React.FC<AIQuickPromptsProps> = ({
  prompts,
  onSelectPrompt,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 px-0.5">
        <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">
          Suggested Socratic Queries
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => {
          const IconComponent =
            (Icons[p.iconName as keyof typeof Icons] as React.ComponentType<{ className?: string }>) || Icons.Sparkles;

          return (
            <button
              id={`btn-quick-prompt-${p.id}`}
              key={p.id}
              onClick={() => onSelectPrompt(p.promptText)}
              disabled={disabled}
              className={`flex items-center gap-2 text-left text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 px-3 py-2 rounded-xl border border-slate-800 hover:border-amber-500/60 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label={`Prompt option: ${p.label}`}
            >
              <IconComponent className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
              <span>{p.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default AIQuickPrompts;
