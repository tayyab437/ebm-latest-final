import React from "react";
import { useExamStore } from "./exam.store";
import { 
  Trophy, 
  Award, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode,
  Search,
  Plus
} from "lucide-react";
import clsx from "clsx";

export function CertificateCenter() {
  const { certificates, fetchCertificates } = useExamStore();

  React.useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">EBM Certification Center</h2>
          <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em] mt-1">Verifiable Credentials & Academic Achievement Ledger</p>
        </div>
        <button className="px-6 py-3 bg-white/5 text-rose-400 border border-rose-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
           <Download className="h-4 w-4" /> Export All (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.length > 0 ? certificates.map((cert) => (
          <div key={cert.id} className="bg-[#0A1120] rounded-[2.5rem] border border-white/5 p-8 relative overflow-hidden group hover:border-rose-500/30 transition-all cursor-pointer">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                <Trophy className="w-32 h-32 text-rose-500" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                   <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                      <ShieldCheck className="h-6 w-6" />
                   </div>
                   <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">{cert.verificationId}</span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mb-2 uppercase group-hover:text-rose-400 transition-colors">{cert.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-8">Issued on {new Date(cert.issueDate).toLocaleDateString()}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                   <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">Verified Status</span>
                   </div>
                   <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center text-center">
                      <QrCode className="h-4 w-4 text-rose-500 mb-1" />
                      <span className="text-[8px] font-black text-white uppercase tracking-widest">Verify Credential</span>
                   </div>
                </div>

                <div className="flex items-center gap-2">
                   <button className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2">
                      <Download className="h-4 w-4" /> Download PDF
                   </button>
                   <button className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all border border-white/5">
                      <Share2 className="h-4 w-4" />
                   </button>
                </div>
             </div>
          </div>
        )) : (
          <div className="lg:col-span-3 h-64 bg-white/[0.02] border border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-10 opacity-40">
             <Award className="h-12 w-12 text-slate-700 mb-4" />
             <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">No Certificates Issued Yet</h4>
             <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest max-w-sm">
                Complete certification exams or specialized skill modules to earn verifiable EBM credentials.
             </p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[2.5rem] border border-white/5 p-12 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5">
            <ShieldCheck className="w-64 h-64 text-emerald-500" />
         </div>
         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
               <h3 className="text-2xl font-black text-white tracking-tight mb-6 uppercase">Enterprise Verification</h3>
               <p className="text-sm font-medium text-slate-400 leading-relaxed mb-10">
                  Every EBM certificate is anchored in our secure academic ledger. Organizations can instantly verify credentials via the EBM Verification Portal using the unique Verification ID or QR code provided on the document.
               </p>
               <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-emerald-400">100%</span>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tamper Proof</span>
                  </div>
                  <div className="w-[1px] h-10 bg-white/10" />
                  <div className="flex flex-col">
                     <span className="text-2xl font-black text-rose-400">Instant</span>
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Verification</span>
                  </div>
               </div>
            </div>
            <div className="bg-white/5 rounded-3xl border border-white/10 p-10">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
                     <Search className="h-6 w-6" />
                  </div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Verify a Credential</h4>
               </div>
               <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Enter Verification ID (e.g. EBM-CERT-XXXXX)" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white outline-none focus:border-rose-500/50 transition-all placeholder:text-slate-700"
                  />
                  <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all">
                     Run Verification Check
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
