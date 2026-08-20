import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  Mic, 
  Paperclip, 
  Clock, 
  Maximize2, 
  RefreshCw, 
  BrainCircuit, 
  MoreVertical,
  Activity
} from "lucide-react";
import { AIMessage, QuickPrompt } from "./ai-learning.types";
import { AIMessageBubble } from "./AIMessageBubble";
import { AIQuickPrompts } from "./AIQuickPrompts";
import { QUICK_PROMPTS_DATA } from "./ai-learning.constants";
import { chatContainerVariants, useReducedMotion } from "./animations";

export const AIChatPreview: React.FC = () => {
  const isReduced = useReducedMotion();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "init-ai",
      sender: "ai",
      text: "Assalam-o-Alaikum! I am your interactive EBM AI Tutor. Ask me any question about organic chemistry, quadratic equations, speed reading, or translation, and I'll guide you step-by-step!",
      timestamp: "Just Now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(14); // minutes
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Update mock session study timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll inside chat container on new messages without scrolling main window
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (chatBottomRef.current && chatBottomRef.current.parentElement) {
      const parent = chatBottomRef.current.parentElement;
      parent.scrollTo({
        top: parent.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    const userMessageId = `msg-${Date.now()}`;
    const userMessage: AIMessage = {
      id: userMessageId,
      sender: "student",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Look up response in preloaded QUICK_PROMPTS_DATA
    const matchedPreset = QUICK_PROMPTS_DATA.find(
      (p) => p.promptText.toLowerCase() === textToSend.toLowerCase()
    );

    const replyText = matchedPreset
      ? matchedPreset.responseText
      : "Excellent socratic inquiry! In the live EBM dashboard, I will immediately scan your curriculum gaps, fetch active-recall materials, and outline a custom worksheet to ensure concept mastery. Let's try factoring the quadratic x² - 5x + 6 = 0!";

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "ai",
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "init-ai-reset",
        sender: "ai",
        text: "Session restarted. I am ready for your next study topic. Select a suggested prompt below or type your own concept!",
        timestamp: "Just Now"
      }
    ]);
  };

  return (
    <motion.div
      variants={isReduced ? {} : chatContainerVariants}
      initial="hidden"
      animate="visible"
      className="bg-slate-950/60 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[520px]"
    >
      {/* Top Header Controls */}
      <div className="bg-slate-950/90 border-b border-slate-900/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 animate-ping" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950" />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-black text-slate-100">
                EBM Gemini Companion
              </h4>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold uppercase">
                2.0-Flash
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Socratic Guidance Model &bull; Online
            </p>
          </div>
        </div>

        {/* Cognitive Study Telemetry Indicators */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Study Timer: {sessionTime}m</span>
          </div>

          <button
            id="chat-btn-reset"
            onClick={handleReset}
            className="p-1.5 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-transparent hover:border-slate-800 transition"
            title="Reset Chat"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Message Screen (Scrollable) */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto max-h-[290px] min-h-[200px] scrollbar-thin scrollbar-thumb-slate-900">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <AIMessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="flex gap-3 text-xs text-left max-w-[85%] mr-auto">
            <div className="w-8 h-8 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="bg-slate-900/90 border border-slate-800/80 p-3.5 rounded-2xl rounded-tl-none text-slate-400 font-mono text-[11px] flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
              <span>EBM Companion is formulating query...</span>
            </div>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Prompts, Inputs & Action Footer */}
      <div className="p-4 bg-slate-950 border-t border-slate-900/80 space-y-4">
        {/* Suggestion Chips */}
        <AIQuickPrompts
          prompts={QUICK_PROMPTS_DATA}
          onSelectPrompt={handleSendMessage}
          disabled={isTyping}
        />

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-xl px-2 py-1.5 focus-within:border-amber-500/50 transition-all duration-200"
        >
          {/* File attachment toggle (Mock) */}
          <button
            id="chat-btn-attach"
            type="button"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition"
            title="Attach Worksheet File"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Query your Socratic mentor on any concept..."
            disabled={isTyping}
            className="flex-grow bg-transparent text-xs sm:text-[13px] text-white placeholder-slate-500 focus:outline-none py-1 px-1.5 disabled:opacity-50"
          />

          {/* Voice input toggle (Mock) */}
          <button
            id="chat-btn-voice"
            type="button"
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-300 transition"
            title="Voice Socratic Prompting"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Send Action */}
          <button
            id="chat-btn-send"
            type="submit"
            disabled={isTyping || !inputValue.trim()}
            className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send query"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};
export default AIChatPreview;
