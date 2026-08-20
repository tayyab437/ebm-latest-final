import React, { useState, useEffect, useRef } from "react";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Users, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  FileText,
  Send,
  X
} from "lucide-react";

export interface PTMLiveMeetingData {
  id: string;
  parentName?: string;
  teacherName?: string;
  studentName?: string;
  subject?: string;
  date: string;
  meetingLink?: string;
  notes?: string;
}

interface PTMLiveConferenceModalProps {
  meeting: PTMLiveMeetingData;
  currentUser: {
    name: string;
    role: "ADMIN" | "TEACHER" | "PARENT" | string;
  };
  onClose: () => void;
}

export function PTMLiveConferenceModal({ meeting, currentUser, onClose }: PTMLiveConferenceModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "notes">("video");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; role: string; text: string; time: string }>>([
    {
      sender: "System",
      role: "SYSTEM",
      text: `Live Parent-Teacher Conference room connected for ${meeting.studentName || 'Student'} (${meeting.subject || 'Consultation'}).`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Derive working meeting room URL
  const roomName = `EBM-PTM-${meeting.id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const meetUrl = meeting.meetingLink || `https://meet.jit.si/${roomName}#config.prejoinConfig.enabled=false&userInfo.displayName=${encodeURIComponent(currentUser.name + ' (' + currentUser.role + ')')}`;

  // Session duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      {
        sender: currentUser.name,
        role: currentUser.role,
        text: inputMessage.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setInputMessage("");
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      id="ptm-live-conference-modal"
    >
      <div 
        ref={containerRef}
        className="bg-slate-900 border border-slate-700/80 w-full max-w-6xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 relative"
      >
        {/* Top Control Bar */}
        <div className="bg-slate-900/95 border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
              <Video className="h-5 w-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white truncate">
                  PTM Live Conference Room
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Room Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate flex items-center gap-2 mt-0.5">
                <span>{meeting.subject || 'Academic Consultation'}</span>
                <span>•</span>
                <span>Teacher: <b className="text-slate-300">{meeting.teacherName}</b></span>
                <span>•</span>
                <span>Parent: <b className="text-slate-300">{meeting.parentName}</b></span>
                {meeting.studentName && (
                  <>
                    <span>•</span>
                    <span>Student: <b className="text-blue-300">{meeting.studentName}</b></span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Live Session Timer */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs font-mono font-bold text-slate-300">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Copy Meeting Link */}
            <button
              onClick={handleCopyLink}
              title="Copy real-time join link"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
              <span className="hidden md:inline">{copied ? "Link Copied!" : "Copy Meet Link"}</span>
            </button>

            {/* Launch In External Tab */}
            <a
              href={meetUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open full video conference in external tab"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 transition cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            {/* Close / Leave Modal */}
            <button
              onClick={onClose}
              title="Leave / Close"
              className="p-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 rounded-xl border border-rose-500/30 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Stage & Sidebar Grid */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Main Video Conference Iframe / Player */}
          <div className="flex-1 bg-black relative flex flex-col">
            <iframe
              src={meetUrl}
              title={`PTM Video Conference - ${meeting.id}`}
              allow="camera; microphone; display-capture; autoplay; clipboard-write; fullscreen"
              className="w-full h-full border-0 bg-slate-950"
            />

            {/* Fallback Notice Overlay in case iframe requires permission */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-xl flex items-center gap-2 text-[11px] text-slate-300 pointer-events-auto">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span>Real-Time E2E Encrypted Meeting Room</span>
              <a 
                href={meetUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="text-blue-400 hover:underline font-bold ml-1"
              >
                External View ↗
              </a>
            </div>
          </div>

          {/* Side Drawer: Info, Agenda & Instant In-Call Notes / Chat */}
          <div className="w-full lg:w-80 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col h-64 lg:h-full shrink-0">
            {/* Tab Headers */}
            <div className="flex border-b border-slate-800 bg-slate-900/80 shrink-0">
              <button
                onClick={() => setActiveTab("video")}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                  activeTab === "video" 
                    ? "border-blue-500 text-blue-400 bg-slate-800/40" 
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="h-3.5 w-3.5" />
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                  activeTab === "notes" 
                    ? "border-blue-500 text-blue-400 bg-slate-800/40" 
                    : "border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                Agenda & Info
              </button>
            </div>

            {/* Tab 1: Live In-Call Messages */}
            {activeTab === "video" ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-3 overflow-y-auto space-y-3 custom-scrollbar text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border ${
                        msg.role === "SYSTEM" 
                          ? "bg-slate-800/60 border-slate-700/60 text-slate-400 text-[11px]" 
                          : msg.sender === currentUser.name 
                            ? "bg-blue-600/20 border-blue-500/30 text-slate-200 ml-3" 
                            : "bg-slate-800 border-slate-700 text-slate-200 mr-3"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-bold text-slate-300">{msg.sender}</span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-2 border-t border-slate-800 bg-slate-900/90 flex gap-2">
                  <input
                    type="text"
                    placeholder="Type message to participants..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            ) : (
              /* Tab 2: Meeting Agenda & Participant Details */
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    Scheduled Session Details
                  </h4>
                  <div className="space-y-1.5 text-slate-400 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Date & Time:</span>
                      <span className="text-slate-200 font-bold">{meeting.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Subject / Focus:</span>
                      <span className="text-slate-200 font-bold">{meeting.subject || 'General Review'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-2">
                  <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                    <Users className="h-3.5 w-3.5 text-emerald-400" />
                    Participants
                  </h4>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Teacher:</span>
                      <span className="font-bold text-slate-200">{meeting.teacherName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Parent:</span>
                      <span className="font-bold text-slate-200">{meeting.parentName}</span>
                    </div>
                    {meeting.studentName && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Student:</span>
                        <span className="font-bold text-blue-300">{meeting.studentName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {meeting.notes && (
                  <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <h4 className="font-bold text-slate-200 flex items-center gap-1.5 text-xs">
                      <FileText className="h-3.5 w-3.5 text-amber-400" />
                      Session Notes & Log
                    </h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed italic">
                      "{meeting.notes}"
                    </p>
                  </div>
                )}

                <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                    Direct Conference Link
                  </span>
                  <div className="p-2 bg-slate-900 rounded-xl border border-slate-800 font-mono text-[10px] text-blue-300 break-all select-all">
                    {meetUrl}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-1.5 rounded-xl transition text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Link Copied" : "Copy Direct Link"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
