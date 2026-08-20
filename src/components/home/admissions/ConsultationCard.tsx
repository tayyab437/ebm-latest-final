import React, { useState } from "react";
import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { CONSULTATION_OPTIONS_DATA } from "./admissions.data";

const OptionIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Calendar className={className} />;
  return <IconComponent className={className} />;
};

export const ConsultationCard: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [callbackNumber, setCallbackNumber] = useState("");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);

  // Simple current-month advisor availability tracker simulation
  const days = [1, 2, 3, 4, 7, 8, 9, 10, 11];
  const slots = ["09:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDay && selectedSlot) {
      setBookingConfirmed(true);
    }
  };

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (callbackNumber) {
      setCallbackSubmitted(true);
    }
  };

  return (
    <div 
      className="p-8 md:p-12 bg-white dark:bg-slate-900/60 border border-slate-250 dark:border-slate-800 rounded-4xl shadow-xl shadow-slate-150/40 dark:shadow-none relative overflow-hidden backdrop-blur-md" 
      id="consultation-section"
    >
      {/* Decorative premium gradient accents */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <span className="text-xs font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2 font-bold">
          Admissions Advisory Liaison
        </span>
        <h3 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 dark:text-white tracking-tight mb-3">
          Schedule an Academic Consultation
        </h3>
        <p className="max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
          Unsure about O-Level diagnostic configurations or custom homeschooling paths? Meet live with our Cambridge-trained advisors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        {/* Left Column - Option Channels & Advisor Details */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Advisor Card Badge */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 overflow-hidden">
              <Icons.UserCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h5 className="text-sm font-sans font-bold text-slate-800 dark:text-slate-100">Dr. Alistair Vance</h5>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/10 text-[9px] font-mono font-medium text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/10">Advisor</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans mt-0.5">Ex-Cambridge Board Evaluator & STEM Lead</p>
            </div>
          </div>

          {/* Quick Communication Paths */}
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            {CONSULTATION_OPTIONS_DATA.map((opt) => (
              <a
                key={opt.id}
                href={opt.contactValue}
                target="_blank"
                rel="noreferrer"
                id={`consultation-link-${opt.id}`}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 dark:hover:border-blue-500/30 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 flex items-start gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 flex items-center justify-center shrink-0">
                  <OptionIcon name={opt.iconName} className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h6 className="text-xs font-sans font-bold text-slate-800 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {opt.title}
                  </h6>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    {opt.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-600 dark:text-blue-400 font-medium mt-2">
                    {opt.actionText} →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Booking Simulator Grid */}
        <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-4">
              Real-time Availability Slot Selection
            </span>

            {bookingConfirmed ? (
              <div className="py-12 text-center">
                <Icons.CheckCircle className="w-14 h-14 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                <h5 className="text-base font-sans font-semibold text-slate-800 dark:text-slate-200">Consultation Scheduled</h5>
                <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
                  A verification link and calendar slot coordinate have been sent to your primary registration contact.
                </p>
                <button
                  onClick={() => {
                    setBookingConfirmed(false);
                    setSelectedDay(null);
                    setSelectedSlot(null);
                  }}
                  className="mt-6 px-4 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-sans transition-colors cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-6">
                {/* Simulated Day Grid */}
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Available Days this month (July)
                  </label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => setSelectedDay(day)}
                        className={`py-2 text-center text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                          selectedDay === day
                            ? "bg-blue-600 border-blue-500 text-white font-semibold"
                            : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Slot Selection */}
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Select Start Time (GMT)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 text-center text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                          selectedSlot === slot
                            ? "bg-indigo-600 border-indigo-500 text-white font-semibold"
                            : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email Registration Confirmation */}
                <div>
                  <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Registration Contact Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="parent@example.com"
                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!selectedDay || !selectedSlot}
                    className={`w-full py-3 px-6 rounded-xl font-sans font-medium text-xs transition-all cursor-pointer ${
                      selectedDay && selectedSlot
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md shadow-blue-500/10"
                        : "bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800/80 cursor-not-allowed"
                    }`}
                  >
                    Confirm Academic Consultation Slot
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Phone callback secondary trigger */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/60">
            {callbackSubmitted ? (
              <p className="text-[11px] font-mono text-blue-600 dark:text-blue-400 text-center">
                ✓ Callback requested. Expect a contact within 15 minutes.
              </p>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="flex gap-2">
                <input
                  required
                  type="tel"
                  placeholder="Enter phone with country code"
                  value={callbackNumber}
                  onChange={(e) => setCallbackNumber(e.target.value)}
                  className="flex-grow px-3 py-2 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/5 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-sans transition-all shrink-0 cursor-pointer"
                >
                  Request Fast Callback
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConsultationCard;
