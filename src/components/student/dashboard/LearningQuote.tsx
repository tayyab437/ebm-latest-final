import React, { useState, useEffect } from "react";
import { LEARNING_QUOTES } from "./dashboard.constants";
import { Quote } from "lucide-react";

export function LearningQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Select a random quote on mount
    const randomQuote = LEARNING_QUOTES[Math.floor(Math.random() * LEARNING_QUOTES.length)];
    setQuote(randomQuote);
  }, []);

  if (!quote) return null;

  return (
    <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-sm relative">
      <Quote className="absolute top-4 right-4 h-6 w-6 text-emerald-200" />
      <div className="pr-6">
        <h3 className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase mb-2">Daily Motivation</h3>
        <p className="text-xs font-medium text-emerald-900 italic leading-relaxed">
          "{quote}"
        </p>
      </div>
    </div>
  );
}
