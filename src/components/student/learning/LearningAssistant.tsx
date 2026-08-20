import React, { useState } from "react";
import { Sparkles, Send, Bot, User, X } from "lucide-react";
import { AI_ASSISTANT_ACTIONS } from "./learning.constants";
import { useLearningStore } from "./learning.store";

export function LearningAssistant() {
  const { isAssistantOpen, toggleAssistant } = useLearningStore();
  const [messages, setMessages] = useState<{role: "user" | "ai", content: string}[]>([
    { role: "ai", content: "Hi! I'm your AI Tutor. Need help understanding this lesson?" }
  ]);
  const [input, setInput] = useState("");

  if (!isAssistantOpen) return null;

  return (
    <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full shrink-0 animate-in slide-in-from-right duration-300 z-10 relative shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.1)]">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2 text-indigo-600">
          <Sparkles className="h-4 w-4" />
          <span className="font-bold text-sm">AI Tutor</span>
        </div>
        <button onClick={toggleAssistant} className="p-1 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-3 border-b border-slate-100 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {AI_ASSISTANT_ACTIONS.map(action => (
          <button 
            key={action.id}
            className="whitespace-nowrap px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full transition-colors border border-indigo-100"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${msg.role === "ai" ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-600"}`}>
              {msg.role === "ai" ? <Bot className="h-3 w-3" /> : <User className="h-3 w-3" />}
            </div>
            <div className={`p-3 rounded-2xl text-xs font-medium leading-relaxed max-w-[85%] ${msg.role === "ai" ? "bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm" : "bg-indigo-600 text-white rounded-tr-sm shadow-sm"}`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-200 bg-white">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full bg-slate-100 border-none rounded-xl pl-4 pr-10 py-2.5 text-xs font-medium focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                setMessages([...messages, { role: "user", content: input.trim() }]);
                setInput("");
                // Simulate AI response
                setTimeout(() => {
                  setMessages(prev => [...prev, { role: "ai", content: "That's a great question! Based on the current video timestamp, here is the explanation..." }]);
                }, 1000);
              }
            }}
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Send className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
