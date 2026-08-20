export enum MessageType {
  DIRECT = "DIRECT",
  GROUP = "GROUP",
  ANNOUNCEMENT = "ANNOUNCEMENT",
  SYSTEM = "SYSTEM",
  AI = "AI"
}

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
  FAILED = "FAILED"
}

export enum NotificationPriority {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL",
  EMERGENCY = "EMERGENCY"
}

export interface UserSnippet {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: UserSnippet;
  content: string;
  type: MessageType;
  status: MessageStatus;
  createdAt: string;
  attachments?: string[];
}

export interface Conversation {
  id: string;
  type: "DIRECT" | "GROUP";
  participants: UserSnippet[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
  groupName?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: UserSnippet;
  targetAudience: string[]; // e.g. ["STUDENT", "TEACHER"]
  createdAt: string;
  priority: NotificationPriority;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: string;
}
