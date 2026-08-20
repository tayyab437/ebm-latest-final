import React from "react";
import { Download, FileText, File as FileIcon, X, CheckCircle2 } from "lucide-react";

export function DownloadsView() {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Downloads & Offline Files</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage resources saved to your device</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-full">
            <div className="w-10"></div>
            <div className="flex-1">File Name</div>
            <div className="w-32 hidden sm:block">Size</div>
            <div className="w-32 hidden md:block">Downloaded</div>
            <div className="w-10 text-right"></div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {[
            { id: 1, name: "Kinematics_Worksheet.pdf", size: "2.4 MB", date: "Oct 24", type: "pdf" },
            { id: 2, name: "Algebra_Formulas.pdf", size: "1.1 MB", date: "Oct 22", type: "pdf" },
            { id: 3, name: "English_Vocabulary_List.docx", size: "500 KB", date: "Oct 15", type: "doc" }
          ].map(file => (
            <div key={file.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-4 text-sm w-full">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {file.type === "pdf" ? <FileText className="h-5 w-5 text-red-500" /> : <FileIcon className="h-5 w-5 text-blue-500" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500 sm:hidden mt-0.5">{file.size} • {file.date}</p>
                </div>
                <div className="w-32 hidden sm:block text-slate-500 font-medium text-xs">{file.size}</div>
                <div className="w-32 hidden md:block text-slate-500 font-medium text-xs flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 inline mr-1" />
                  {file.date}
                </div>
                <div className="w-10 flex justify-end">
                  <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
