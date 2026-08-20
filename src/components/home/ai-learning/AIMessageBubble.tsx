import React from "react";
import { motion } from "motion/react";
import { Sparkles, User, Check, RefreshCw } from "lucide-react";
import { AIMessage } from "./ai-learning.types";
import { bubbleVariants, useReducedMotion } from "./animations";

interface AIMessageBubbleProps {
  message: AIMessage;
}

export const AIMessageBubble: React.FC<AIMessageBubbleProps> = ({ message }) => {
  const isReduced = useReducedMotion();
  const isAI = message.sender === "ai";

  return (
    <motion.div
      variants={isReduced ? {} : bubbleVariants}
      className={`flex gap-3 text-xs sm:text-sm text-left max-w-[90%] md:max-w-[85%] ${
        isAI ? "mr-auto" : "ml-auto flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
          isAI
            ? "bg-gradient-to-tr from-purple-600 to-indigo-500 text-white"
            : "bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950"
        }`}
      >
        {isAI ? (
          <Sparkles className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4 font-bold" />
        )}
      </div>

      {/* Bubble Container */}
      <div className="space-y-1.5 min-w-0">
        <div
          className={`p-3.5 rounded-2xl shadow-sm leading-relaxed ${
            isAI
              ? "bg-slate-900/90 border border-slate-800/80 text-slate-200 rounded-tl-none font-sans font-normal"
              : "bg-amber-500 text-slate-950 rounded-tr-none font-sans font-medium"
          }`}
        >
          {/* Main text message */}
          <p className="whitespace-pre-line text-xs sm:text-[13px]">{message.text}</p>
        </div>

        {/* Dynamic sub-triggers or timeline info */}
        <div
          className={`flex items-center gap-1.5 text-[9px] font-mono text-slate-500 ${
            isAI ? "justify-start" : "justify-end"
          }`}
        >
          <span>{message.timestamp}</span>
          {isAI ? (
            <span className="flex items-center gap-1 text-blue-500/80">
              <Check className="w-3 h-3" /> EBM Certified Response
            </span>
          ) : (
            <span className="text-slate-500">Sent</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
