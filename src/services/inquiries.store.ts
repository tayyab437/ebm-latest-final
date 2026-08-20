import { create } from "zustand";

export interface Inquiry {
  id: string;
  parentName: string;
  studentGrade: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "NEW" | "IN_PROGRESS" | "CONTACTED" | "RESOLVED" | "ARCHIVED";
  notes?: string;
}

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq_101",
    parentName: "Sarah Ahmed",
    studentGrade: "Grade 7 (13 Years)",
    email: "sarah.ahmed@example.com",
    phone: "+92 300 5551234",
    message: "Interested in the 3-Year Accelerated Physics & Mathematics curriculum for my daughter. Please call me after 3 PM EST.",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hrs ago
    status: "NEW",
    notes: ""
  },
  {
    id: "inq_102",
    parentName: "Tariq Malik",
    studentGrade: "Grade 5 (10 Years)",
    email: "tariq.m@example.com",
    phone: "+92 321 9876543",
    message: "Looking for details about the parent monitoring portal, live diagnostic testing, and daily streak rewards for elementary students.",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    status: "IN_PROGRESS",
    notes: "Spoke via WhatsApp. Sent diagnostic test link."
  },
  {
    id: "inq_103",
    parentName: "Nida Khan",
    studentGrade: "O-Level Accelerator (15 Years)",
    email: "nida.khan@example.com",
    phone: "+92 333 8887766",
    message: "We would like to schedule a diagnostic consultation before enrolling in the O-Level Accelerator track for Chemistry and Biology.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    status: "CONTACTED",
    notes: "Consultation booked for Friday."
  }
];

function getStoredInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem("ebm_submitted_inquiries");
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Failed to load inquiries from localStorage:", e);
  }
  // Fallback to initial sample inquiries if empty
  localStorage.setItem("ebm_submitted_inquiries", JSON.stringify(INITIAL_INQUIRIES));
  return INITIAL_INQUIRIES;
}

interface InquiryStore {
  inquiries: Inquiry[];
  isLoading: boolean;
  fetchInquiries: () => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) => Inquiry;
  updateInquiryStatus: (id: string, status: Inquiry["status"], notes?: string) => void;
  deleteInquiry: (id: string) => void;
  getUnreadCount: () => number;
}

export const useInquiryStore = create<InquiryStore>((set, get) => ({
  inquiries: getStoredInquiries(),
  isLoading: false,

  fetchInquiries: () => {
    set({ inquiries: getStoredInquiries() });
  },

  addInquiry: (data) => {
    const newInquiry: Inquiry = {
      id: "inq_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      ...data,
      createdAt: new Date().toISOString(),
      status: "NEW",
      notes: ""
    };
    const current = getStoredInquiries();
    const updated = [newInquiry, ...current];
    localStorage.setItem("ebm_submitted_inquiries", JSON.stringify(updated));
    set({ inquiries: updated });

    // Also try posting to server endpoint if running
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInquiry),
    }).catch(() => {});

    // Notify listeners
    window.dispatchEvent(new CustomEvent("ebm_inquiry_updated"));
    return newInquiry;
  },

  updateInquiryStatus: (id, status, notes) => {
    const current = getStoredInquiries();
    const updated = current.map((item) =>
      item.id === id ? { ...item, status, notes: notes !== undefined ? notes : item.notes } : item
    );
    localStorage.setItem("ebm_submitted_inquiries", JSON.stringify(updated));
    set({ inquiries: updated });

    fetch(`/api/inquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notes }),
    }).catch(() => {});

    window.dispatchEvent(new CustomEvent("ebm_inquiry_updated"));
  },

  deleteInquiry: (id) => {
    const current = getStoredInquiries();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem("ebm_submitted_inquiries", JSON.stringify(updated));
    set({ inquiries: updated });

    fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    }).catch(() => {});

    window.dispatchEvent(new CustomEvent("ebm_inquiry_updated"));
  },

  getUnreadCount: () => {
    return get().inquiries.filter((inq) => inq.status === "NEW").length;
  }
}));
