import React, { useState, useEffect } from "react";
import { useInquiryStore, Inquiry } from "../../../services/inquiries.store";
import { useAdminStore } from "./admin.store";
import { 
  Inbox, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  ExternalLink, 
  Download, 
  UserCheck, 
  X,
  Send,
  Sparkles,
  FileText,
  Building
} from "lucide-react";

export function InquiriesManager() {
  const { inquiries, fetchInquiries, updateInquiryStatus, deleteInquiry } = useInquiryStore();
  const { addAdmission, setCurrentView } = useAdminStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [noteText, setNoteText] = useState("");
  const [conversionSuccess, setConversionSuccess] = useState(false);

  useEffect(() => {
    fetchInquiries();
    const handleUpdate = () => fetchInquiries();
    window.addEventListener("ebm_inquiry_updated", handleUpdate);
    return () => window.removeEventListener("ebm_inquiry_updated", handleUpdate);
  }, [fetchInquiries]);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.studentGrade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" ? true : inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "NEW").length;
  const inProgressCount = inquiries.filter((i) => i.status === "IN_PROGRESS").length;
  const resolvedCount = inquiries.filter((i) => i.status === "RESOLVED" || i.status === "CONTACTED").length;

  const handleOpenDetail = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setNoteText(inquiry.notes || "");
    setConversionSuccess(false);
  };

  const handleSaveNotes = () => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, selectedInquiry.status, noteText);
    setSelectedInquiry({ ...selectedInquiry, notes: noteText });
  };

  const handleStatusChange = (status: Inquiry["status"]) => {
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, status, noteText);
    setSelectedInquiry({ ...selectedInquiry, status });
  };

  const handleConvertToAdmission = async () => {
    if (!selectedInquiry) return;
    const ok = await addAdmission({
      studentName: selectedInquiry.parentName + "'s Ward (" + selectedInquiry.studentGrade + ")",
      email: selectedInquiry.email,
      gradeLevel: selectedInquiry.studentGrade,
      status: "PENDING",
      appliedDate: new Date().toISOString().split("T")[0],
    });
    if (ok) {
      updateInquiryStatus(selectedInquiry.id, "IN_PROGRESS", (selectedInquiry.notes || "") + " [Converted to Admission Candidate]");
      setConversionSuccess(true);
      setTimeout(() => setConversionSuccess(false), 4000);
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Parent Name", "Student Grade/Age", "Email", "Phone", "Message", "Status", "Date"];
    const rows = inquiries.map((i) => [
      i.id,
      `"${i.parentName}"`,
      `"${i.studentGrade}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.message.replace(/"/g, '""')}"`,
      i.status,
      new Date(i.createdAt).toLocaleString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ebm_submitted_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Inquiry["status"]) => {
    switch (status) {
      case "NEW":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            New Inquiry
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            In Progress
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Contacted
          </span>
        );
      case "RESOLVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            Resolved
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Submitted Contact Inquiries</h1>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mt-0.5">Parent & Student Consultation Submissions</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" /> Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Received</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{totalCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Action Required</p>
            <h3 className="text-3xl font-black text-amber-600 mt-1">{newCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">In Follow-Up</p>
            <h3 className="text-3xl font-black text-blue-600 mt-1">{inProgressCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Resolved Leads</p>
            <h3 className="text-3xl font-black text-emerald-600 mt-1">{resolvedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search parent name, email, phone, grade..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl overflow-x-auto w-full md:w-auto">
            {["ALL", "NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === status
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {status === "ALL" ? "All Inquiries" : status.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Inquiries Table / Cards */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredInquiries.length === 0 ? (
          <div className="p-16 text-center text-slate-400 space-y-3">
            <Inbox className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-sm font-bold uppercase tracking-wider">No inquiries found matching your filters</p>
          </div>
        ) : (
          filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              onClick={() => handleOpenDetail(inquiry)}
              className="p-6 hover:bg-slate-50/80 transition-all cursor-pointer group flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-black text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {inquiry.parentName}
                  </h3>
                  {getStatusBadge(inquiry.status)}
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {inquiry.studentGrade}
                  </span>
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  "{inquiry.message}"
                </p>

                <div className="flex items-center gap-6 text-xs text-slate-500 font-medium pt-1 flex-wrap">
                  <a
                    href={`mailto:${inquiry.email}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {inquiry.email}
                  </a>
                  <a
                    href={`tel:${inquiry.phone.replace(/[^0-9+]/g, "")}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-amber-600 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {inquiry.phone}
                  </a>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(inquiry.createdAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-0 border-slate-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDetail(inquiry);
                  }}
                  className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Review Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteInquiry(inquiry.id);
                  }}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal Drawer */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(selectedInquiry.status)}
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedInquiry.id}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">{selectedInquiry.parentName}</h2>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
                  Target: {selectedInquiry.studentGrade}
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Contact Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`mailto:${selectedInquiry.email}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                <Mail className="w-4 h-4" /> Send Email
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Chat
              </a>
              <a
                href={`tel:${selectedInquiry.phone.replace(/[^0-9+]/g, "")}`}
                className="flex items-center justify-center gap-2 p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-bold uppercase tracking-wider transition"
              >
                <Phone className="w-4 h-4" /> Call Phone
              </a>
            </div>

            {/* Message Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Inquiry Message Body</span>
              <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                {selectedInquiry.message}
              </p>
            </div>

            {/* Status Update & Notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Update Lead Status</label>
                <div className="flex flex-wrap gap-2">
                  {(["NEW", "IN_PROGRESS", "CONTACTED", "RESOLVED", "ARCHIVED"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        selectedInquiry.status === st
                          ? "bg-slate-900 text-white shadow"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-wider">Admin Follow-Up Notes</label>
                <textarea
                  rows={3}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Record call outcome, consultation date, or internal action items..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition"
                  >
                    Save Internal Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Conversion CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <button
                onClick={handleConvertToAdmission}
                className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition flex items-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" /> Convert to Admission Candidate
              </button>

              {conversionSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Converted & Added to Admissions List!
                </span>
              )}

              <button
                onClick={() => {
                  deleteInquiry(selectedInquiry.id);
                  setSelectedInquiry(null);
                }}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 uppercase tracking-wider"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
