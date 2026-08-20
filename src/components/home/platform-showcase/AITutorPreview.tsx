import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  BookOpen, 
  FileText, 
  Award, 
  TrendingUp,
  MessageSquare,
  RefreshCw
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export const AITutorPreview: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello Sarah! Let's explore the Socratic method today. If you have a question about Quadratic Systems or Esters, just let me know. Instead of giving you the flat answers, I'll guide you step-by-step so you discover them yourself!",
      timestamp: "10:15 AM"
    },
    {
      id: "msg-2",
      sender: "user",
      text: "I am having trouble with finding the roots of x² - 5x + 6 = 0.",
      timestamp: "10:16 AM"
    },
    {
      id: "msg-3",
      sender: "ai",
      text: "A classic polynomial! Let's break it down together. Look at the constant term (+6) and the middle coefficient (-5). Can you think of two numbers that multiply to give +6 AND add together to give -5?",
      timestamp: "10:16 AM"
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: "user",
      text: inputVal,
      timestamp: "Just now"
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulated socratic tutor reaction
    setTimeout(() => {
      const aiResponseText = userMsg.text.toLowerCase().includes("3") || userMsg.text.toLowerCase().includes("2")
        ? "Excellent! -2 and -3 fit perfectly. So we rewrite -5x as -2x - 3x. Now, try grouping the terms: (x² - 2x) - (3x - 6). What do you get if you factor out the common elements?"
        : "Let's review the signs. Since they multiply to +6 (positive) and add to -5 (negative), both numbers must be negative. What factors of 6 can we sum?";
      
      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: aiResponseText,
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestion = (promptText: string) => {
    setInputVal(promptText);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Welcome & AI Metrics header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-linear-to-r from-purple-500/10 via-blue-500/5 to-transparent border border-purple-500/10 dark:border-purple-500/20 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Personalized AI Mentor
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 font-sans mt-0.5">
              Interactive Socratic Dialogues
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Guidance via discovery rather than mechanical memorization.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-lg text-2xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Socratic Coach v3.5 Active</span>
          </span>
        </div>
      </div>

      {/* Split chat view + AI generator previews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Double-width Columns: The chat interface itself */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col h-[520px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Active Socratic Session &bull; Math</span>
            <span className="text-2xs text-slate-400">34 Socratic Loops completed today</span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            {messages.map((m) => (
              <div 
                key={m.id}
                className={`flex gap-3 items-start ${m.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  m.sender === "user" 
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200" 
                    : "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400"
                }`}>
                  {m.sender === "user" ? "U" : "AI"}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 text-xs ${
                  m.sender === "user"
                    ? "bg-slate-900 dark:bg-slate-50 text-white dark:text-slate-950"
                    : "bg-slate-50 dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-800"
                }`}>
                  <p className="leading-relaxed">{m.text}</p>
                  <span className="block text-[10px] text-slate-400 mt-2 text-right">
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center text-xs text-slate-400">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-purple-700">AI</div>
                <span className="animate-pulse">Socratic Mentor is analyzing your prompt...</span>
              </div>
            )}
          </div>

          {/* Chat suggestions / prompts quick list */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-semibold uppercase text-slate-400 mb-2 tracking-wider">Suggested Actions</p>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleSuggestion("-2 and -3")}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-zinc-700 hover:border-purple-500 rounded-lg text-2xs text-slate-700 dark:text-slate-300 transition-colors"
              >
                -2 and -3 multiply to +6 and sum to -5
              </button>
              <button 
                onClick={() => handleSuggestion("I am stuck, give me a clue.")}
                className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-zinc-700 hover:border-purple-500 rounded-lg text-2xs text-slate-700 dark:text-slate-300 transition-colors"
              >
                I'm stuck, give me a subtle clue.
              </button>
            </div>
          </div>

          {/* Prompt Entry Box */}
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask the Socratic AI Tutor something..."
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-purple-500 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="p-2.5 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-xl transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Right side panel containing study recommendations & generated works previews */}
        <div className="space-y-6">
          {/* AI generated micro worksheet panel preview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-purple-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">Socratic Worksheets</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time generated worksheets matched exactly to your active focus gaps.
            </p>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <span className="text-3xs uppercase font-bold text-slate-400">Calculated Focus Gap</span>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Negative roots in trinomials</h5>
                <button className="text-3xs text-purple-600 font-semibold hover:underline block pt-1">
                  Download Generated Worksheet PDF &rarr;
                </button>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl space-y-1">
                <span className="text-3xs uppercase font-bold text-slate-400">Daily Recitative Review</span>
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Functional organic polymers</h5>
                <button className="text-3xs text-purple-600 font-semibold hover:underline block pt-1">
                  Launch Interactive Verbal Drill &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* AI recommendations metrics */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-4 w-4 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-50">Intelligent Insights</h4>
            </div>
            <ul className="text-2xs text-slate-500 dark:text-slate-400 space-y-2.5">
              <li className="flex gap-2">
                <span className="text-purple-500 font-bold">✓</span>
                <span>Factorial speed increased by +24% over the last week.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-500 font-bold">✓</span>
                <span>Active attention peak noticed at 15:30 (Cambridge Mechanics hour).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
