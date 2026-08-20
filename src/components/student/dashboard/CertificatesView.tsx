import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Download, Share2, Calendar, ShieldCheck, ChevronRight, X, Printer, Sparkles, CheckCircle2 } from 'lucide-react';
import { useDashboardStore } from './dashboard.store';
import { Certificate } from './dashboard.types';

// ==========================================
// ELEGANT SVG ELEMENTS & ORNAMENTS
// ==========================================

// Official EBM Logo matching uploaded brand assets
const EbmLogo: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
  <div className={`flex flex-col items-center justify-center text-center select-none ${className}`} id="ebm-certificate-logo">
    <div className="font-sans font-black text-4xl sm:text-5xl tracking-tight leading-none text-[#1b75bc]">
      EBM
    </div>
    <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.28em] text-slate-700 uppercase mt-1 leading-none">
      EJAZ BUKHARI METHOD
    </div>
  </div>
);

// Intricate gold corner flourish that is extremely classy and fits perfectly in corners
const OrnateCorner: React.FC<{ position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ position }) => {
  const transform = {
    'top-left': 'top-5 left-5 rotate-0',
    'top-right': 'top-5 right-5 rotate-90',
    'bottom-left': 'bottom-5 left-5 rotate-270',
    'bottom-right': 'bottom-5 right-5 rotate-180'
  }[position];

  return (
    <svg 
      viewBox="0 0 120 120" 
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-amber-600/70 ${transform} pointer-events-none transition-all duration-300`}
    >
      {/* Intricate pinstripe traditional corner design */}
      <path d="M 10,10 L 100,10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 10,10 L 10,100" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M 15,15 L 75,15" fill="none" stroke="currentColor" strokeWidth="0.75" />
      <path d="M 15,15 L 15,75" fill="none" stroke="currentColor" strokeWidth="0.75" />
      {/* Decorative floral loop/swirl */}
      <path d="M 10,10 Q 40,40 20,60 C 15,65 5,50 15,40 C 25,30 30,30 50,50" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M 10,10 Q 40,40 60,20 C 65,15 50,5 40,15 C 30,25 30,30 50,50" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="10" cy="10" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

// Royal Gold Crest & Ribbon Seal
const RoyalGoldSeal: React.FC = () => (
  <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0">
    {/* Elegant ceremonial ribbons draped downwards */}
    <div className="absolute top-1/2 left-[28%] w-5 h-16 sm:h-20 bg-gradient-to-b from-[#1b75bc] to-blue-900 rotate-[18deg] origin-top shadow-md rounded-b" />
    <div className="absolute top-1/2 right-[28%] w-5 h-16 sm:h-20 bg-gradient-to-b from-[#1b75bc] to-blue-900 -rotate-[18deg] origin-top shadow-md rounded-b" />
    {/* Inner gold stripe on ribbon */}
    <div className="absolute top-1/2 left-[33%] w-1.5 h-12 sm:h-16 bg-gradient-to-b from-amber-300 to-amber-500 rotate-[18deg] origin-top" />
    <div className="absolute top-1/2 right-[33%] w-1.5 h-12 sm:h-16 bg-gradient-to-b from-amber-300 to-amber-500 -rotate-[18deg] origin-top" />

    {/* Elegant gold wavy starburst badge */}
    <div className="absolute w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 rounded-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600 shadow-lg border border-amber-500/30 flex items-center justify-center">
      <div className="absolute inset-0.5 rounded-full border border-dashed border-amber-100/40" />
      
      {/* Inner metal gold token */}
      <div className="w-11 h-11 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full bg-gradient-to-tr from-amber-700 via-amber-200 to-amber-500 shadow-inner flex flex-col items-center justify-center border border-amber-300/60">
        <span className="text-[4px] sm:text-[6px] font-black tracking-[0.15em] text-amber-950/80 uppercase">OFFICIAL</span>
        <Award className="h-4.5 w-4.5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-amber-950/90 my-0.5" />
        <span className="text-[4px] sm:text-[6px] font-black tracking-[0.15em] text-amber-950/80 uppercase">EBM SEAL</span>
      </div>
    </div>
  </div>
);

// Elegant cursive hand-signatures with structural baseline labels
const SignatureEjaz: React.FC = () => (
  <svg viewBox="0 0 150 50" className="h-8 sm:h-10 md:h-12 text-blue-900/80 mx-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M 15 35 C 30 15, 45 5, 55 25 C 65 40, 75 10, 85 28 C 95 45, 110 15, 135 25" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 25 22 L 125 22" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2" />
  </svg>
);

const SignatureDean: React.FC = () => (
  <svg viewBox="0 0 150 50" className="h-8 sm:h-10 md:h-12 text-slate-800/80 mx-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M 20 25 C 35 5, 50 45, 65 15 C 80 35, 95 5, 120 25 C 130 15, 138 30, 145 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export const CertificatesView: React.FC = () => {
  const { data } = useDashboardStore();
  const certificates = data?.certificates || [];
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [printSuccess, setPrintSuccess] = useState<string | null>(null);

  const handlePrint = () => {
    const printContent = document.getElementById('certificate-print-area');
    if (!printContent) return;

    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          size: landscape;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          background: white !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        #certificate-print-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999999;
          background: #FAF9F5 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding: 30px !important;
        }
        #certificate-print-wrapper > div {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          box-shadow: none !important;
          border-width: 12px !important;
        }
        body > :not(#certificate-print-wrapper) {
          display: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    const printWrapper = document.createElement('div');
    printWrapper.id = 'certificate-print-wrapper';
    
    const clonedNode = printContent.cloneNode(true) as HTMLElement;
    clonedNode.style.width = "100%";
    clonedNode.style.height = "100%";
    
    printWrapper.appendChild(clonedNode);
    document.body.appendChild(printWrapper);

    setTimeout(() => {
      window.print();
      document.body.removeChild(printWrapper);
      document.head.removeChild(style);
      
      setPrintSuccess("Certificate document successfully sent to printer / PDF exporter!");
      setTimeout(() => setPrintSuccess(null), 4000);
    }, 150);
  };

  if (certificates.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px] bg-white rounded-3xl border border-slate-100 shadow-sm" id="empty-certs-container">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6" id="empty-award-icon-box">
          <Award className="h-10 w-10 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Certificates Earned</h3>
        <p className="text-slate-500 text-center max-w-md">
          Complete your ongoing curriculum grade lessons and assignments with high performance to unlock your premium accredited certificate here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6" id="certificates-view-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="certificates-view-header">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Accredited Certificates</h2>
          <p className="text-slate-500">Official certificates recognizing your academic milestones with Ejaz Bukhari Method</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100" id="verified-badge-pill">
          <ShieldCheck className="h-4 w-4 text-[#1b75bc]" />
          Accredited Registry
        </div>
      </div>

      {printSuccess && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl p-4 flex items-center gap-2 text-sm font-semibold shadow-sm animate-fade-in" id="print-success-alert">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
          {printSuccess}
        </div>
      )}

      {/* Grid of earned certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="certificates-list-grid">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => setSelectedCert(cert)}
            className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden cursor-pointer"
            id={`cert-item-card-${cert.id}`}
          >
            {/* Elegant side ribbon */}
            <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-gradient-to-b from-[#1b75bc] to-blue-800" />
            
            <div className="p-6 md:p-8 pl-8">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <Award className="h-6 w-6 text-[#1b75bc]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#1b75bc] tracking-widest uppercase block">EBM Academic Council</span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#1b75bc] transition-colors mt-0.5">{cert.title}</h3>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button 
                    className="p-1.5 text-slate-400 hover:text-[#1b75bc] hover:bg-slate-50 rounded-lg transition-all" 
                    title="Print / PDF Export"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                      setTimeout(() => handlePrint(), 300);
                    }}
                  >
                    <Printer className="h-4.5 w-4.5" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-all" title="Share" onClick={e => e.stopPropagation()}>
                    <Share2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mt-2.5">
                {cert.description}
              </p>

              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  Conferred: {new Date(cert.issuedAt).toLocaleDateString()}
                </div>
                
                <span className="flex items-center gap-1 text-xs font-bold text-[#1b75bc] group-hover:underline">
                  View Fancy Certificate
                  <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Academic Excellence Promotion card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/5" id="certificate-academic-promotion-card">
        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Award className="w-56 h-56 text-amber-400" />
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black tracking-widest uppercase mb-2">
            <Sparkles className="h-4 w-4" />
            Distinguished Excellence
          </div>
          <h3 className="text-2xl font-bold mb-3">Academic Excellence & Promotion</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Your certificates represent your mastery of the curriculum. Each completed grade unlocks advanced subjects and specialized learning paths tailored to your growth.
          </p>
          <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-blue-50 hover:shadow-lg transition-all text-sm shadow-md">
            Learn More About Promotion
          </button>
        </div>
      </div>

      {/* Redesigned Classical / Fancy Certificate Detailed Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" id="certificate-modal">
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200"
            >
              {/* Modal sticky top header */}
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/90 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Award className="h-5 w-5 text-[#1b75bc]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">Ejaz Bukhari Method Certificate</h3>
                    <p className="text-xs text-slate-500">Official verified credentials</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrint}
                    className="p-2 px-3.5 bg-blue-50 hover:bg-blue-100 text-[#1b75bc] rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold" 
                    title="Print Certificate"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container with centered certificate background frame */}
              <div className="p-4 sm:p-8 md:p-12 max-h-[78vh] overflow-y-auto bg-slate-100/60 flex flex-col items-center justify-start md:justify-center">
                
                {/* 
                  VISUALLY STUNNING ORNATE CERTIFICATE CANVAS
                  Constructed with classic ivory background, elegant borders, balanced padding, 
                  and absolute scaling properties to completely eliminate vertical cut-offs or squishing.
                */}
                <div 
                  id="certificate-print-area"
                  className="relative w-full max-w-4xl bg-[#FCFAF5] rounded-xl shadow-xl border-[10px] sm:border-[16px] border-[#1b75bc] p-6 sm:p-10 md:p-12 lg:p-14 text-center flex flex-col justify-between overflow-hidden select-none shrink-0 min-h-[480px] sm:min-h-[580px] md:min-h-[640px]"
                  style={{ 
                    aspectRatio: '1.294/1', 
                    boxSizing: 'border-box',
                    backgroundImage: 'radial-gradient(circle, rgba(27,117,188,0.015) 8%, transparent 9%)', 
                    backgroundSize: '14px 14px' 
                  }}
                >
                  {/* Subtle watermarked EBM circle logo in center */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                    <div className="w-72 h-72 rounded-full border-[8px] border-double border-[#1b75bc] flex items-center justify-center">
                      <span className="font-sans font-black text-9xl">EBM</span>
                    </div>
                  </div>

                  {/* Ornate Inner Double Golden Inlay Border */}
                  <div className="absolute inset-2 sm:inset-3 border border-amber-500/50 pointer-events-none" />
                  <div className="absolute inset-3 sm:inset-4.5 border border-dashed border-amber-400/25 pointer-events-none" />

                  {/* Corner Ornaments */}
                  <OrnateCorner position="top-left" />
                  <OrnateCorner position="top-right" />
                  <OrnateCorner position="bottom-left" />
                  <OrnateCorner position="bottom-right" />

                  {/* Certificate Brand Header */}
                  <div className="space-y-1 sm:space-y-2 relative z-10">
                    <EbmLogo className="h-10 sm:h-12 md:h-14" />
                    <div className="text-[6px] sm:text-[8px] md:text-[9px] font-extrabold tracking-[0.22em] text-amber-700 uppercase font-sans leading-none mt-1.5 sm:mt-2">
                      BY CHARTER OF THE ACADEMIC COMMITTEE COUNCIL & FACULTY BOARD
                    </div>
                  </div>

                  {/* Main Title Section */}
                  <div className="relative z-10 my-1 sm:my-2">
                    <h1 className="font-serif font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-950 uppercase tracking-[0.18em] leading-none">
                      Certificate of Mastery
                    </h1>
                    <div className="h-0.5 w-24 sm:w-32 md:w-44 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-1 sm:mt-2" />
                  </div>

                  {/* Recipient Details */}
                  <div className="space-y-1 sm:space-y-1.5 relative z-10 my-1 sm:my-2">
                    <p className="font-serif italic text-[10px] sm:text-xs md:text-sm text-slate-500 font-medium">
                      This official credential is proudly conferred upon
                    </p>
                    <h2 className="font-serif font-black text-lg sm:text-2xl md:text-3xl lg:text-4xl text-slate-950 border-b border-amber-500/30 inline-block px-6 sm:px-10 pb-1 uppercase tracking-wide">
                      {data?.studentName || "Student Name"}
                    </h2>
                  </div>

                  {/* Accomplishment Narrative Text */}
                  <div className="space-y-1.5 relative z-10 max-w-xl sm:max-w-2xl mx-auto my-1 sm:my-2">
                    <p className="text-[8px] sm:text-[10px] md:text-[11px] lg:text-xs text-slate-600 leading-relaxed font-medium">
                      for demonstrating exemplary dedication, outstanding module execution, and completing with distinction the academic standards prescribed within the curriculum of
                    </p>
                    <h3 className="font-sans font-black text-sm sm:text-lg md:text-xl text-[#1b75bc] tracking-wider uppercase leading-none">
                      {selectedCert.title}
                    </h3>
                    <p className="text-[7.5px] sm:text-[9px] text-slate-400 italic max-w-md sm:max-w-lg mx-auto leading-tight mt-1">
                      {selectedCert.description}
                    </p>
                  </div>

                  {/* Signatures & Wax Seal Row */}
                  <div className="grid grid-cols-3 items-end gap-2 pt-2 sm:pt-3 mt-1 sm:mt-2 border-t border-amber-500/20 relative z-10">
                    
                    {/* Left Signature: Academic Dean */}
                    <div className="space-y-1 text-center pb-1">
                      <SignatureDean />
                      <div className="h-[1px] bg-slate-300 w-3/4 mx-auto" />
                      <div className="text-[6px] sm:text-[8px] font-black text-slate-500 uppercase tracking-wider leading-none">Dean of Academics</div>
                      <div className="text-[5px] sm:text-[6px] text-slate-400 leading-none">EBM Curriculum Council</div>
                    </div>

                    {/* Middle Signature/Seal: Golden Royal Crest */}
                    <div className="flex justify-center -mb-2 sm:-mb-3">
                      <RoyalGoldSeal />
                    </div>

                    {/* Right Signature: Director/Founder Ejaz Bukhari */}
                    <div className="space-y-1 text-center pb-1">
                      <SignatureEjaz />
                      <div className="h-[1px] bg-slate-300 w-3/4 mx-auto" />
                      <div className="text-[6px] sm:text-[8px] font-black text-slate-700 uppercase tracking-wider leading-none">Ejaz Bukhari</div>
                      <div className="text-[5px] sm:text-[6px] text-slate-400 leading-none">Founder & Director, EBM</div>
                    </div>

                  </div>

                  {/* Precise Verification & Timestamp footers */}
                  <div className="absolute bottom-1 sm:bottom-2 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between text-[6px] sm:text-[8px] text-slate-400 font-medium">
                    <div>DATE: {new Date(selectedCert.issuedAt).toLocaleDateString()}</div>
                    <div className="flex items-center gap-0.5 font-mono">
                      <ShieldCheck className="h-2.5 w-2.5 text-emerald-600 shrink-0" />
                      VERIFIED ID: {selectedCert.id.toUpperCase()}
                    </div>
                  </div>

                </div>

                {/* Print/Share Action controls */}
                <div className="mt-6 flex flex-wrap justify-center gap-4 w-full" id="certificate-action-buttons">
                  <button 
                    onClick={handlePrint}
                    className="px-6 py-3 bg-[#1b75bc] text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all flex items-center gap-2 text-sm"
                  >
                    <Download className="h-4.5 w-4.5" />
                    Download PDF / Print
                  </button>
                  <button className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center gap-2 text-sm">
                    <Share2 className="h-4.5 w-4.5" />
                    Share Certificate
                  </button>
                </div>
                
                <p className="text-center text-xs text-slate-400 mt-4 max-w-sm">
                  Tip: Choose <strong>Landscape</strong> orientation and enable <strong>Background graphics</strong> in your browser print settings for the best quality PDF export!
                </p>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
