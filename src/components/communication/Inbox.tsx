import React, { useState, useEffect, useMemo, useRef } from "react";
import { useCommunicationStore } from "./communication.store";
import { 
  MessageSquare, Search, Edit3, Send, Paperclip, MoreVertical, 
  CheckCircle2, CheckCheck, X, User, Users, Megaphone, Sparkles, GraduationCap 
} from "lucide-react";
import clsx from "clsx";

export function Inbox() {
  const { 
    conversations, 
    activeConversation, 
    setActiveConversation, 
    messages, 
    sendMessage,
    contacts,
    fetchContacts,
    fetchConversations,
    startConversation,
    createAnnouncement
  } = useCommunicationStore();

  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [contactSearch, setContactSearch] = useState("");
  const [composeFilter, setComposeFilter] = useState<"ALL" | "TEACHERS" | "STUDENTS">("ALL");
  const [isBroadcastToggle, setIsBroadcastToggle] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageId = useRef<string | null>(null);
  const lastConversationId = useRef<string | null>(null);

  const activeUser = useMemo(() => {
    try {
      const saved = localStorage.getItem("ebm_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          id: parsed.id || parsed.userId || "u1",
          name: parsed.name || "You",
          role: parsed.role || "STUDENT"
        };
      }
    } catch (e) {}
    return { id: "u1", name: "You", role: "STUDENT" };
  }, []);

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
    if (activeConversation && scrollContainerRef.current) {
      const isNewConversation = lastConversationId.current !== activeConversation.id;
      const lastMessage = messages[messages.length - 1];
      const hasNewMessages = lastMessage && lastMessage.id !== lastMessageId.current;
      
      // Check if user is near bottom (within 150px)
      const container = scrollContainerRef.current;
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 150;
      const isMyMessage = lastMessage?.sender.id === activeUser?.id;

      if (isNewConversation) {
        // Use a small timeout to ensure content is rendered before scrolling
        const timer = setTimeout(() => {
          scrollToBottom(true);
        }, 100);
        lastConversationId.current = activeConversation.id;
        if (lastMessage) lastMessageId.current = lastMessage.id;
        return () => clearTimeout(timer);
      } else if (hasNewMessages && (isAtBottom || isMyMessage)) {
        scrollToBottom(false);
      }
      
      if (lastMessage) lastMessageId.current = lastMessage.id;
    }
  }, [messages, activeConversation, activeUser?.id]);

  useEffect(() => {
    fetchContacts();
    fetchConversations();
    
    // Set up polling for real-time updates
    const interval = setInterval(() => {
      // Poll conversations and messages silently
      fetchConversations(true);
      
      const currentActiveConv = useCommunicationStore.getState().activeConversation;
      if (currentActiveConv) {
        useCommunicationStore.getState().fetchMessages(currentActiveConv.id, true);
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [fetchContacts, fetchConversations]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !activeConversation) return;

    // Send direct message
    sendMessage(activeConversation.id, input.trim());

    // If teacher toggled "broadcast to student", also register an announcement targeting this student ID
    if (isBroadcastToggle && (activeUser.role === "TEACHER" || activeUser.role === "ADMIN")) {
      const otherParticipant = activeConversation.participants.find(p => p.id !== activeUser.id);
      if (otherParticipant) {
        createAnnouncement({
          title: `Direct Broadcast: ${activeUser.name}`,
          content: input.trim(),
          targetAudience: [otherParticipant.id], // Target this student ID specifically
          priority: "INFO" as any
        });
      }
      setIsBroadcastToggle(false);
    }

    setInput("");
  };

  const handleContactSelect = async (contact: any) => {
    await startConversation({
      id: contact.id,
      name: contact.name,
      role: contact.role
    });
    setIsComposeOpen(false);
    setContactSearch("");
  };

  // Filter contacts for Compose popup
  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      // Don't show current user
      if (c.id === activeUser.id) return false;

      const matchesSearch = c.name.toLowerCase().includes(contactSearch.toLowerCase()) || 
                            c.email.toLowerCase().includes(contactSearch.toLowerCase());
      
      let matchesFilter = true;
      if (composeFilter === "TEACHERS") {
        matchesFilter = c.role === "TEACHER" || c.role === "ADMIN";
      } else if (composeFilter === "STUDENTS") {
        matchesFilter = c.role === "STUDENT";
      }

      return matchesSearch && matchesFilter;
    });
  }, [contacts, contactSearch, composeFilter, activeUser.id]);

  // Filter existing conversations based on search
  const filteredConversations = useMemo(() => {
    return conversations.filter(conv => {
      if (conv.type === "GROUP") {
        return conv.groupName?.toLowerCase().includes(searchQuery.toLowerCase());
      }
      const otherPart = conv.participants.find(p => p.id !== activeUser.id) || conv.participants[0];
      return otherPart?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [conversations, searchQuery, activeUser.id]);

  // Find the other participant in active conversation
  const otherParticipant = useMemo(() => {
    if (!activeConversation) return null;
    return activeConversation.participants.find(p => p.id !== activeUser.id) || activeConversation.participants[0];
  }, [activeConversation, activeUser.id]);

  return (
    <div className="h-[80vh] flex gap-6 animate-in fade-in duration-500 relative">
      {/* Conversation List */}
      <div className="w-80 flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden shrink-0 shadow-sm">
        <div className="p-6 border-b border-slate-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-rose-500" /> Inbox
            </h3>
            <button 
              onClick={() => setIsComposeOpen(true)}
              className="h-8 w-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
              title="Compose New Conversation"
            >
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH MESSAGES..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-[10px] font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 uppercase tracking-widest"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conv => {
              const other = conv.participants.find(p => p.id !== activeUser.id) || conv.participants[0] || { id: "fallback", name: "Chat", role: "STUDENT" as any, avatarUrl: undefined as string | undefined };
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversation(conv)}
                  className={clsx(
                    "w-full flex items-start gap-3 p-3 rounded-2xl text-left transition-all",
                    activeConversation?.id === conv.id 
                      ? "bg-rose-50 border border-rose-100" 
                      : "hover:bg-slate-50 border border-transparent"
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                    {conv.type === "GROUP" ? (
                      <span className="text-xs font-black text-rose-500">G</span>
                    ) : other.avatarUrl ? (
                      other.avatarUrl.length <= 4 ? (
                        <span className="text-xl">{other.avatarUrl}</span>
                      ) : (
                        <img src={other.avatarUrl} alt={other.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      )
                    ) : (
                      <span className="text-xs font-black text-rose-500">
                        {other.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {conv.type === "GROUP" ? conv.groupName : other.name}
                      </span>
                      <span className="text-[9px] font-black text-slate-400 uppercase">
                        {new Date(conv.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500 truncate">
                      {conv.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">No active conversations.</div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm">
        {activeConversation && otherParticipant ? (
          <>
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {activeConversation.type === "GROUP" ? (
                    <span className="text-sm font-black text-rose-500">G</span>
                  ) : otherParticipant.avatarUrl ? (
                    otherParticipant.avatarUrl.length <= 4 ? (
                      <span className="text-2xl">{otherParticipant.avatarUrl}</span>
                    ) : (
                      <img src={otherParticipant.avatarUrl} alt={otherParticipant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )
                  ) : (
                    <span className="text-sm font-black text-rose-500">
                      {otherParticipant.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {activeConversation.type === "GROUP" ? activeConversation.groupName : otherParticipant.name}
                  </h3>
                  <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-0.5">
                    {activeConversation.type === "GROUP" ? `${activeConversation.participants.length} Participants` : otherParticipant.role}
                  </p>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            {/* Messages body */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {messages.map(msg => {
                const isMine = msg.sender.id === activeUser.id;
                return (
                  <div key={msg.id} className={clsx("flex flex-col max-w-[70%]", isMine ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div className="flex items-end gap-2 mb-1">
                      {!isMine && (
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{msg.sender.name}</span>
                      )}
                    </div>
                    <div className={clsx(
                      "px-5 py-3 rounded-2xl text-xs font-medium leading-relaxed relative group",
                      isMine ? "bg-rose-500 text-white rounded-br-sm shadow-sm" : "bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-sm"
                    )}>
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                      {isMine && (
                        msg.status === "READ" 
                        ? <CheckCheck className="h-3 w-3 text-emerald-500" />
                        : <CheckCircle2 className="h-3 w-3 text-rose-500/50" />
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <form onSubmit={handleSend} className="space-y-3">
                {/* Special broadcast toggle for Teachers/Admins */}
                {(activeUser.role === "TEACHER" || activeUser.role === "ADMIN") && (
                  <div className="flex items-center justify-between px-3 py-2 bg-rose-50 border border-rose-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-3.5 w-3.5 text-rose-600" />
                      <span className="text-[10px] font-black text-rose-900 uppercase tracking-wider">Broadcast as Formal Announcement</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isBroadcastToggle} 
                        onChange={(e) => setIsBroadcastToggle(e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-500"></div>
                    </label>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button type="button" className="h-10 w-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 transition-colors">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isBroadcastToggle ? "Type broadcast announcement to student..." : "Type a message..."}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 transition-colors shadow-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 flex items-center justify-center text-white shrink-0 transition-colors shadow-lg shadow-rose-200"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
              <MessageSquare className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Your Messages</h3>
            <p className="text-xs text-slate-500 max-w-xs">Select a conversation from the list or start a new chat with any classmate or instructor.</p>
            <button 
              onClick={() => setIsComposeOpen(true)}
              className="mt-6 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-200"
            >
              Compose New Chat
            </button>
          </div>
        )}
      </div>

      {/* Compose Message Slide-Over Modal */}
      {isComposeOpen && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl flex flex-col h-[60vh] max-h-[500px]">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h4 className="text-xs font-black text-rose-600 uppercase tracking-widest">New Message</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Select recipient to start chat</p>
              </div>
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="p-4 space-y-4 bg-slate-50/50 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  placeholder="SEARCH RECIPIENTS..."
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-[10px] font-bold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500/50 uppercase tracking-widest shadow-sm"
                />
              </div>

              {/* Filtering */}
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
                {[
                  { id: "ALL", label: "All Contacts" },
                  { id: "TEACHERS", label: activeUser.role === "STUDENT" ? "Instructors" : "Co-Teachers" },
                  { id: "STUDENTS", label: activeUser.role === "STUDENT" ? "Classmates" : "Students" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setComposeFilter(tab.id as any)}
                    className={clsx(
                      "flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all",
                      composeFilter === tab.id 
                        ? "bg-white text-rose-600 shadow-sm border border-slate-200" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <button
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-left transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                        {contact.profilePictureUrl ? (
                          contact.profilePictureUrl.length <= 4 ? (
                            <span className="text-xl">{contact.profilePictureUrl}</span>
                          ) : (
                            <img src={contact.profilePictureUrl} alt={contact.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )
                        ) : contact.role === "TEACHER" || contact.role === "ADMIN" ? (
                          <GraduationCap className="h-4 w-4 text-rose-500" />
                        ) : (
                          <User className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{contact.name}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-wider mt-0.5">
                          {contact.role === "TEACHER" || contact.role === "ADMIN" ? contact.department : contact.gradeLevel}
                        </p>
                      </div>
                    </div>
                    <span className="text-[8px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      {contact.role}
                    </span>
                  </button>
                ))
              ) : (
                <div className="text-center py-12 text-xs text-slate-400">No contacts found matching criteria.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
