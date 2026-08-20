import { create } from "zustand";
import { Conversation, Message, AppNotification, Announcement, Template, NotificationPriority, MessageType, MessageStatus, UserSnippet } from "./communication.types";

export interface Contact {
  id: string;
  name: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | "PARENT";
  email: string;
  gradeLevel?: string;
  department?: string;
  profilePictureUrl?: string;
}

interface CommunicationState {
  currentView: "dashboard" | "inbox" | "announcements" | "notifications" | "calendar" | "templates" | "history" | "settings";
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  notifications: AppNotification[];
  announcements: Announcement[];
  templates: Template[];
  isLoading: boolean;
  contacts: Contact[];
  
  setCurrentView: (view: CommunicationState["currentView"]) => void;
  setActiveConversation: (conv: Conversation | null) => void;
  
  // Actions
  fetchConversations: (silent?: boolean) => Promise<void>;
  fetchMessages: (conversationId: string, silent?: boolean) => Promise<void>;
  sendMessage: (conversationId: string, content: string) => Promise<void>;
  fetchNotifications: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  fetchAnnouncements: () => Promise<void>;
  createAnnouncement: (announcement: Partial<Announcement>) => Promise<void>;
  fetchContacts: () => Promise<void>;
  startConversation: (contact: { id: string; name: string; role: string }) => Promise<Conversation>;
}

const getActiveUser = () => {
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
  } catch (e) {
    console.error(e);
  }
  return { id: "u1", name: "You", role: "STUDENT" };
};

const getSavedMessages = (userId: string): Message[] => {
  try {
    const saved = localStorage.getItem(`ebm_messages_${userId}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  
  // Generate beautiful default conversation messages
  const defaults: Message[] = [
    {
      id: "m_d_1",
      conversationId: "conv_r_sarah",
      sender: { id: "t_sarah", name: "Dr. Sarah Jenkins", role: "TEACHER" },
      content: "Hello! Please review the Term 2 curriculum guidelines. Let me know if you have questions.",
      type: MessageType.DIRECT,
      status: MessageStatus.READ,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      id: "m_d_2",
      conversationId: "conv_r_sarah",
      sender: { id: userId, name: "You", role: "STUDENT" },
      content: "Thank you Dr. Sarah. I just completed my Physics Module, I'm working on Chemistry now.",
      type: MessageType.DIRECT,
      status: MessageStatus.READ,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: "m_d_3",
      conversationId: "conv_r_sarah",
      sender: { id: "t_sarah", name: "Dr. Sarah Jenkins", role: "TEACHER" },
      content: "Excellent. Keep up the high engagement. See you in the study group!",
      type: MessageType.DIRECT,
      status: MessageStatus.READ,
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    }
  ];
  
  localStorage.setItem(`ebm_messages_${userId}`, JSON.stringify(defaults));
  return defaults;
};

const getSavedConversations = (userId: string): Conversation[] => {
  try {
    const saved = localStorage.getItem(`ebm_conversations_${userId}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  return [];
};

const saveConversations = (userId: string, convs: Conversation[]) => {
  localStorage.setItem(`ebm_conversations_${userId}`, JSON.stringify(convs));
};

const saveMessages = (userId: string, msgs: Message[]) => {
  localStorage.setItem(`ebm_messages_${userId}`, JSON.stringify(msgs));
};

const mockNotifications: AppNotification[] = [
  {
    id: "n1", title: "New Assignment", content: "Advanced Calculus Homework is due tomorrow.", 
    priority: NotificationPriority.WARNING, isRead: false, createdAt: new Date().toISOString()
  },
  {
    id: "n2", title: "System Update", content: "EBM platform will undergo maintenance at 2 AM.", 
    priority: NotificationPriority.INFO, isRead: true, createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const mockAnnouncements: Announcement[] = [
  {
    id: "a1", title: "Science Fair 2026", content: "Registration for the annual science fair is now open.",
    author: { id: "admin1", name: "Principal Bukhari", role: "PRINCIPAL" },
    targetAudience: ["STUDENT", "TEACHER"], priority: NotificationPriority.INFO, createdAt: new Date().toISOString()
  }
];

export const useCommunicationStore = create<CommunicationState>((set, get) => ({
  currentView: "dashboard",
  conversations: [],
  activeConversation: null,
  messages: [],
  notifications: mockNotifications,
  announcements: mockAnnouncements,
  templates: [
    { id: "temp-1", name: "Unexcused Absence Alert", category: "ATTENDANCE", content: "Dear Parent, this is to inform you that your child was absent from class today without prior leave. Please contact us to justify." },
    { id: "temp-2", name: "Academic Warning Notification", category: "ACADEMIC", content: "Dear Parent, your child's weekly assessment score has fallen below our standard benchmarks. Let us coordinate a milestone restoration meeting." },
    { id: "temp-3", name: "Weekly Progress Summary", category: "GENERAL", content: "Hello! Here is your student's weekly diagnostic performance and study streak summary for your review." }
  ],
  isLoading: false,
  contacts: [],

  setCurrentView: (view) => set({ currentView: view }),
  setActiveConversation: (conv) => {
    set({ activeConversation: conv });
    if (conv) {
      get().fetchMessages(conv.id);
      // Mark read
      const activeUser = getActiveUser();
      const currentConvs = getSavedConversations(activeUser.id);
      const updated = currentConvs.map(c => c.id === conv.id ? { ...c, unreadCount: 0 } : c);
      saveConversations(activeUser.id, updated);
      set({ conversations: updated });
    }
  },

  fetchContacts: async () => {
    try {
      const studentRes = await fetch("/api/teacher/students");
      const studentData = await studentRes.json();
      
      const teacherRes = await fetch("/api/admin/teachers");
      const teacherData = await teacherRes.json();

      let parentsList: Contact[] = [];
      try {
        const parentRes = await fetch("/api/admin/parents");
        const parentData = await parentRes.json();
        if (parentData.success && Array.isArray(parentData.parents)) {
          parentData.parents.forEach((p: any) => {
            parentsList.push({
              id: p.id,
              name: p.name,
              role: "PARENT",
              email: p.email || "",
              gradeLevel: "Parent Partner"
            });
          });
        }
      } catch (pe) {
        console.error("Could not fetch parents from DB:", pe);
      }

      // Add a fallback parent contact if none found
      if (parentsList.length === 0) {
        parentsList.push({
          id: "parent-1",
          name: "Amjad Khan",
          role: "PARENT",
          email: "parent@ebm.edu",
          gradeLevel: "Parent Partner"
        });
      }
      
      const studentsList: Contact[] = [];
      const teachersList: Contact[] = [];
      
      if (studentData.success && Array.isArray(studentData.students)) {
        studentData.students.forEach((s: any) => {
          studentsList.push({
            id: s.id,
            name: s.name,
            role: "STUDENT",
            email: s.email || "",
            gradeLevel: s.gradeLevel || "Grade 10",
            profilePictureUrl: s.profilePictureUrl || undefined
          });
        });
      }
      
      if (teacherData.success && Array.isArray(teacherData.teachers)) {
        teacherData.teachers.forEach((t: any) => {
          teachersList.push({
            id: t.id,
            name: t.name,
            role: "TEACHER",
            email: t.email || "",
            department: t.department || "General Academy",
            profilePictureUrl: t.profilePictureUrl || undefined
          });
        });
      } else {
        // Fallback teachers
        teachersList.push(
          { id: "t_sarah", name: "Dr. Sarah Jenkins", role: "TEACHER", email: "sarah.j@ebm.com", department: "Physics" },
          { id: "t_arshad", name: "Dr. Arshad Khan", role: "TEACHER", email: "arshad.k@ebm.com", department: "Accelerated Mathematics" },
          { id: "t_roberts", name: "Mr. Roberts", role: "TEACHER", email: "roberts@ebm.com", department: "General Sciences" }
        );
      }
      
      // Merge list
      const combined = [...teachersList, ...studentsList, ...parentsList];
      set({ contacts: combined });
    } catch (e) {
      console.error("Failed to fetch communication contacts:", e);
      // Fallback
      set({
        contacts: [
          { id: "t_sarah", name: "Dr. Sarah Jenkins", role: "TEACHER", email: "sarah@ebm.edu", department: "Physics" },
          { id: "t_arshad", name: "Dr. Arshad Khan", role: "TEACHER", email: "arshad@ebm.edu", department: "Accelerated Mathematics" },
          { id: "s_ali", name: "Ali Bukhari", role: "STUDENT", email: "ali@ebm.edu", gradeLevel: "Year 2" },
          { id: "s_zainab", name: "Zainab Malik", role: "STUDENT", email: "zainab@ebm.edu", gradeLevel: "Year 2" },
          { id: "s_hamza", name: "Hamza Ali", role: "STUDENT", email: "hamza@ebm.edu", gradeLevel: "Year 1" },
          { id: "parent-1", name: "Amjad Khan", role: "PARENT", email: "parent@ebm.edu", gradeLevel: "Parent Partner" }
        ]
      });
    }
  },

  fetchConversations: async (silent = false) => {
    if (!silent) set({ isLoading: true });
    const activeUser = getActiveUser();
    
    // Only fetch contacts if not silent
    if (!silent) await get().fetchContacts();
    
    try {
      const res = await fetch(`/api/messages/conversations?userId=${activeUser.id}&userRole=${activeUser.role}&userName=${encodeURIComponent(activeUser.name)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.conversations)) {
        set({ conversations: data.conversations, isLoading: false });
      } else {
        if (!silent) set({ conversations: [], isLoading: false });
      }
    } catch (e) {
      console.error("Failed to fetch conversations from database:", e);
      if (!silent) set({ conversations: [], isLoading: false });
    }
  },

  fetchMessages: async (conversationId: string, silent = false) => {
    if (!silent) set({ isLoading: true });
    try {
      const activeUser = getActiveUser();
      const res = await fetch(`/api/messages?conversationId=${conversationId}&userId=${activeUser.id}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        set({ messages: data.messages, isLoading: false });
      } else {
        set({ messages: [], isLoading: false });
      }
    } catch (e) {
      console.error("Failed to fetch messages from database:", e);
      set({ messages: [], isLoading: false });
    }
  },

  sendMessage: async (conversationId: string, content: string) => {
    const activeUser = getActiveUser();
    const payload = {
      conversationId,
      sender: { id: activeUser.id, name: activeUser.name, role: activeUser.role },
      content,
      type: MessageType.DIRECT,
      status: MessageStatus.SENT
    };
    
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.message) {
        set({ messages: [...get().messages, data.message] });
        // Refresh conversations list to update lastMessage and updatedAt
        await get().fetchConversations();
      }
    } catch (e) {
      console.error("Failed to send message to database:", e);
    }
  },

  startConversation: async (contact) => {
    const activeUser = getActiveUser();
    const payload = {
      type: "DIRECT",
      participants: [
        { id: activeUser.id, name: activeUser.name, role: activeUser.role },
        { id: contact.id, name: contact.name, role: contact.role }
      ]
    };

    try {
      const res = await fetch("/api/messages/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.conversation) {
        const conv = data.conversation;
        // Make sure we have the active conversation and its messages
        set({ activeConversation: conv });
        await get().fetchMessages(conv.id);
        
        // If there are no messages, send initial starting message
        if (get().messages.length === 0) {
          await get().sendMessage(conv.id, `Hi ${contact.name}! I am starting a conversation with you.`);
        }
        await get().fetchConversations();
        return conv;
      }
    } catch (e) {
      console.error("Failed to start conversation:", e);
    }
    
    // Fallback if API fails
    const fallbackConv: Conversation = {
      id: `conv_fallback_${Date.now()}`,
      type: "DIRECT",
      participants: [activeUser, contact],
      unreadCount: 0,
      updatedAt: new Date().toISOString()
    };
    set({ activeConversation: fallbackConv, messages: [] });
    return fallbackConv;
  },

  fetchNotifications: async () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ notifications: mockNotifications, isLoading: false });
    }, 500);
  },

  markNotificationRead: async (id: string) => {
    set(state => ({
      notifications: state.notifications.map(n => n.id === id ? { ...n, isRead: true } : n)
    }));
  },

  fetchAnnouncements: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/announcements");
      const data = await res.json();
      if (data.success && Array.isArray(data.announcements)) {
        set({ announcements: data.announcements, isLoading: false });
      } else {
        set({ announcements: mockAnnouncements, isLoading: false });
      }
    } catch (e) {
      console.error("Failed to fetch announcements from database, falling back to mock data:", e);
      set({ announcements: mockAnnouncements, isLoading: false });
    }
  },

  createAnnouncement: async (ann) => {
    const activeUser = getActiveUser();
    try {
      const payload = {
        title: ann.title || "New Announcement",
        content: ann.content || "",
        author: { id: activeUser.id, name: activeUser.name, role: activeUser.role },
        targetAudience: ann.targetAudience || ["ALL"],
        priority: ann.priority || NotificationPriority.INFO
      };
      
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.announcement) {
        set(state => ({ announcements: [data.announcement, ...state.announcements] }));
      } else {
        throw new Error(data.error || "Failed to save announcement in DB");
      }
    } catch (e) {
      console.error("Failed to persist announcement in database, applying client-side fallback:", e);
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        title: ann.title || "New Announcement",
        content: ann.content || "",
        author: { id: activeUser.id, name: activeUser.name, role: activeUser.role },
        targetAudience: ann.targetAudience || ["ALL"],
        priority: ann.priority || NotificationPriority.INFO,
        createdAt: new Date().toISOString()
      };
      set(state => ({ announcements: [newAnn, ...state.announcements] }));
    }
  }
}));
