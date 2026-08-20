import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Paperclip, MoreHorizontal, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import Markdown from 'react-markdown';
import { useAIStore } from "./ai.store";

export function AIChat() {
  const messages = useAIStore((state) => state.chatHistory);
  const setMessages = useAIStore((state) => state.setChatHistory);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageId = useRef<string | null>(null);

  const pendingQuery = useAIStore((state) => state.pendingQuery);
  const setPendingQuery = useAIStore((state) => state.setPendingQuery);

  const scrollToBottom = (instant = false) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: instant ? "auto" : "smooth"
      });
    }
  };

  useEffect(() => {
    if (pendingQuery) {
      handleSend(pendingQuery);
      setPendingQuery(null);
    }
  }, [pendingQuery]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const lastMessage = messages[messages.length - 1];
      const hasNewMessages = lastMessage && lastMessage.id !== lastMessageId.current;
      
      const container = scrollContainerRef.current;
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      const isMyMessage = lastMessage?.role === 'user';

      if (hasNewMessages && (isAtBottom || isMyMessage)) {
        scrollToBottom(false);
      }
      if (lastMessage) lastMessageId.current = lastMessage.id;
    }
  }, [messages]);

  // Initial scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => scrollToBottom(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async (customText?: string) => {
    const textToSend = customText !== undefined ? customText : input;
    if (!textToSend.trim()) return;
    
    const userMsg = { id: Date.now().toString(), role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (customText === undefined) {
      setInput("");
    }
    setIsTyping(true);

    try {
      // Map local messages format to the format expected by the API
      const apiMessages = [...messages, userMsg].map(m => ({
        id: m.id.toString(),
        sender: m.role === 'user' ? 'USER' : 'AI',
        text: m.id === userMsg.id ? textToSend : m.content,
        timestamp: new Date().toISOString()
      }));

      const userStr = localStorage.getItem("ebm_user");
      let userRole = "STUDENT";
      let ebmYear = "YEAR_1";
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          userRole = user.role;
          ebmYear = user.ebmYear;
        } catch(e) {}
      }

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          userRole,
          ebmYear
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'ai', 
          content: data.text 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: 'ai', 
          content: "I apologize, but I am unable to connect to the intelligence matrix right now. Please check your network or try again later." 
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        id: Date.now().toString(), 
        role: 'ai', 
        content: "System offline. Falling back to local diagnostic mode. How can I help you?" 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0 bg-white/80 backdrop-blur-sm z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Bot className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">AI Tutor</h2>
            <p className="text-[10px] font-medium text-emerald-500 uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span> Online
            </p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-100' : 'bg-indigo-100'}`}>
              {msg.role === 'user' ? <User className="h-4 w-4 text-slate-600" /> : <Bot className="h-4 w-4 text-indigo-600" />}
            </div>
            
            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-sm' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                }
              `}>
                {msg.role === 'ai' ? (
                  <div className="markdown-body prose prose-sm max-w-none text-slate-700">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              
              {msg.role === 'ai' && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors" title="Copy">
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors" title="Regenerate">
                    <RefreshCw className="h-3.5 w-3.5" />
                  </button>
                  <div className="w-px h-3 bg-slate-200 mx-1"></div>
                  <button className="p-1 text-slate-400 hover:text-emerald-600 transition-colors">
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1 text-slate-400 hover:text-rose-600 transition-colors">
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-3xl mx-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1 shadow-sm">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
        <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-white border border-slate-300 rounded-2xl p-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors shrink-0">
            <Paperclip className="h-5 w-5" />
          </button>
          
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask a question or request an explanation..."
            className="flex-1 max-h-32 min-h-[44px] bg-transparent border-none focus:outline-none resize-none py-3 text-sm text-slate-700"
            rows={1}
          />
          
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2 font-medium">
          AI responses are generated. Check important information.
        </p>
      </div>
    </div>
  );
}
