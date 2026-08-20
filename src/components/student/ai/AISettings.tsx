import React from "react";
import { Settings, User, Bell, Shield, Database } from "lucide-react";

export function AISettings() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">AI Settings</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Manage your AI tutor preferences and data.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4">
             <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-700 font-bold rounded-xl transition-colors text-sm text-left">
                  <User className="h-4 w-4" /> Personalization
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors text-sm text-left">
                  <Shield className="h-4 w-4" /> Privacy & Data
                </button>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors text-sm text-left">
                  <Database className="h-4 w-4" /> Storage
                </button>
             </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
             <h3 className="font-bold text-slate-800 text-lg mb-6">Personalization</h3>
             
             <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tutor Tone</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500">
                    <option>Encouraging & Friendly</option>
                    <option>Direct & Academic</option>
                    <option>Socratic (Questions First)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">How the AI speaks to you during chat and feedback.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Default Language</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500">
                    <option>English</option>
                    <option>Arabic</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-slate-100">
                   <h4 className="font-bold text-slate-800 text-sm mb-4">Context Usage</h4>
                   
                   <label className="flex items-start gap-3 cursor-pointer">
                     <input type="checkbox" className="mt-1 accent-indigo-600" defaultChecked />
                     <div>
                       <span className="block text-sm font-bold text-slate-700">Use Assessment History</span>
                       <span className="block text-xs text-slate-500 mt-1">Allow AI to look at your past quiz scores to personalize explanations.</span>
                     </div>
                   </label>
                   
                   <label className="flex items-start gap-3 cursor-pointer mt-4">
                     <input type="checkbox" className="mt-1 accent-indigo-600" defaultChecked />
                     <div>
                       <span className="block text-sm font-bold text-slate-700">Use Learning Goals</span>
                       <span className="block text-xs text-slate-500 mt-1">Allow AI to tailor plans based on your target grades.</span>
                     </div>
                   </label>
                </div>

                <div className="pt-6">
                  <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors">
                    Save Changes
                  </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
